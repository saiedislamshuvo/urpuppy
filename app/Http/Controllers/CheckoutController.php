<?php
namespace App\Http\Controllers;
use App\Data\PlanData;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Laravel\Cashier\Subscription;
use Stripe\Invoice;
use Stripe\PaymentMethod;
use Stripe\SetupIntent;
use Stripe\Stripe;
class CheckoutController extends Controller
{
    public function __invoke()
    {
        //
    }

    public function payment_methods(Request $request)
    {
        try {
            $user = $request->user();
            $payment_methods = $user->paymentMethods();
            return Inertia::render('Subscription/PaymentMethod', [
                'payment_methods' => $payment_methods,
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Subscription/PaymentMethod', [
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function complete(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        // Validate before using any request data
        $validated = $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'paymentMethod' => 'required',
            'type' => 'required|in:new,change', // Ensure type is either 'new' or 'change'
        ]);

        // Use validated data rather than directly accessing request
        $planId = (int) $validated['plan_id'];
        $paymentMethodId = $validated['paymentMethod'];
        $type = $validated['type'];

        $paymentMethod = PaymentMethod::retrieve($paymentMethodId);
        $cardFingerprint = $paymentMethod->card->fingerprint;

        // Use the validated planId and retrieve it fresh
        $plan = Plan::find($planId);
        if (! $plan) {
            session()->flash('message.error', 'Plan not found');
            return redirect()->back();
        }

        $user = $request->user();
        $existingSubscription = Subscription::where('card_fingerprint', $cardFingerprint)
            ->whereNotNull('trial_ends_at')
            ->where('type', 'free')
            ->exists();

        if ($existingSubscription && $plan->type == 'free') {
            session()->flash('message.error', 'You cannot use this card for a free trial');
            return redirect()->back();
        }

        if ($type === 'new') {
            $subscription = $this->createSubscription($user, $plan, $paymentMethodId);
        } elseif ($type === 'change') {
            $subscription = $this->swapSubscription($user, $plan, $paymentMethodId);
        }

        if (!$subscription) {
            return redirect()->back()->with('message.error', 'Subscription failed');
        }

        $subscription->update([
            'card_fingerprint' => $cardFingerprint,
            'type' => $plan->type,
        ]);

        $this->updateUserRoles($user, $plan, $subscription);

        return success('profile.edit', 'Successfully subscribed to '.$plan->type.' plan');
    }

    protected function swapSubscription($user, $plan, $paymentMethod)
    {
        // Retrieve the user's current subscription
        $currentSubscription = $user->subscription('free') ?? $user->subscription('premium');
        if (! $currentSubscription) {
            session()->flash('message.error', 'No active subscription found to swap');
            return null; // Return null to indicate an error
        }

        $vernigu = $currentSubscription->noProrate()->skipTrial()->swapAndInvoice($plan->stripe_plan_id);
        $user->updateDefaultPaymentMethod($paymentMethod);
        return $currentSubscription;
    }

    public function confirm(Request $request)
    {
        // Sanitize and validate input parameters
        $paymentIntent = $request->query('payment_intent');
        $clientSecret = $request->query('client_secret');

        return inertia('Subscription/BillingConfirmation', [
            'payment_intent' => $paymentIntent,
            'client_secret' => $clientSecret,
        ]);
    }

    public function index(Request $request)
    {
        // Get and validate plan_id from route parameters
        $planId = (int) $request->route('plan_id');

        $user = $request->user();
        // if ($user->isSubscribed()) {
        //     return error('profile.edit', 'You are already subscribed to a plan.');
        // }

        // Sanitize query parameters
        $setupIntentId = $request->query('setup_intent');
        $redirectStatus = $request->query('redirect_status');

        if ($setupIntentId && $redirectStatus) {
            Stripe::setApiKey(config('services.stripe.secret'));

            // Retrieve the SetupIntent from Stripe
            $setupIntent = SetupIntent::retrieve($setupIntentId);
            if ($setupIntent->status === 'succeeded') {
                $paymentMethod = $setupIntent->payment_method;

                // Load plan record fresh from database
                $plan = Plan::find($planId);
                if (! $plan) {
                    return redirect()->back()->with('message.error', 'Plan not founded.');
                }

                try {
                    $subscription = $this->createSubscription($user, $plan, $paymentMethod);
                    
                    // Set the subscription type if subscription was created successfully
                    if ($subscription) {
                        $paymentMethodObj = PaymentMethod::retrieve($paymentMethod);
                        $cardFingerprint = $paymentMethodObj->card->fingerprint ?? null;
                        
                        $subscription->update([
                            'type' => $plan->type,
                            'card_fingerprint' => $cardFingerprint,
                        ]);
                    }
                    
                    // Update user roles based on the plan type
                    $this->updateUserRoles($user, $plan, $subscription);
                    return redirect()->route('checkout.success', ['plan_id' => $planId]);
                } catch (\Exception $e) {
                    Log::error('Subscription Error: '.$e->getMessage());
                    return redirect()->route('checkout.index', ['plan_id' => $planId])
                        ->with('error', 'Payment failed. Please try again.');
                }
            } else {
                return redirect()->route('checkout.index', ['plan_id' => $planId])
                    ->with('error', 'Payment failed. Please try again.');
            }
        }

        // Load plan fresh from database
        $plan = Plan::find($planId);
        if (! $plan) {
            return error('profile.edit', 'Plan not found.');
        }

        return Inertia::render('Subscription/Checkout', [
            'plan_id' => $plan->id,
            'plan' => PlanData::from($plan),
            'intent' => $user->createSetupIntent(),
            'discount' => get_discount($user, $plan->type),
        ]);
    }

    public function success(Request $request)
    {
        // Sanitize query parameters
        $setupIntentId = $request->query('setup_intent');
        $redirectStatus = $request->query('redirect_status');
        $planId = (int) $request->query('plan_id');

        if ($setupIntentId && $redirectStatus) {
            Stripe::setApiKey(config('services.stripe.secret'));
            $setupIntent = SetupIntent::retrieve($setupIntentId);

            if ($setupIntent->status === 'succeeded') {
                return Inertia::render('Checkout/Success', [
                    'setupIntent' => $setupIntent,
                    'redirectStatus' => $redirectStatus,
                    'planId' => $planId,
                ]);
            }
        }

        return Inertia::render('Checkout/Success', [
            'error' => 'Payment failed. Please try again.',
        ]);
    }

    /**
     * Create a subscription for the user.
     */
    protected function createSubscription($user, $plan, $paymentMethod): ?Subscription
    {
        try {
            $subscription = $user->newSubscription($plan->type, $plan->stripe_plan_id)
                ->withMetadata([
                    'plan_id' => (string) $plan->id,
                    'plan_name' => (string) $plan->name,
                    'plan_price' => (string) $plan->price,
                    'user_id' => (string) $user->id,
                    'plan_type' => (string) $plan->type,
                ]);

            if ($discount = get_discount($user, $plan->type)) {
                $subscription->trialDays($discount->trial_days);
            } else if ($plan->type == 'free') {
                $subscription->trialDays($plan->trial_days);
            }

            return $subscription->create($paymentMethod, [
                'email' => $user->email,
            ]);
        } catch (\Exception $e) {
            Log::error('Subscription creation error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Update user roles based on the plan type.
     */
    protected function updateUserRoles($user, $plan, $subscription): void
    {
        if ($plan->type == 'breeder') {
            $user->update(['is_breeder' => true]);
        } elseif ($plan->type == 'premium') {
            $user->update(['is_seller' => true]);
        } elseif ($plan->type == 'free') {
            $user->update(['is_seller' => true]);
        }
    }
}

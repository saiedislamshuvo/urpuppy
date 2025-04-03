<?php

namespace App\Http\Controllers;

use App\Data\PlanData;
use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\SetupIntent;
use Stripe\PaymentIntent;
use Stripe\PaymentMethod;
use Laravel\Cashier\Subscription;
use Illuminate\Support\Facades\Log;
use Stripe\Invoice;

class CheckoutController extends Controller
{
    public function __invoke()
    {
        dd('adi');
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

    $data = $request->validate([
        'plan_id' => 'required|exists:plans,id',
        'paymentMethod' => 'required',
        'type' => 'required|in:new,change', // Ensure type is either 'new' or 'change'
    ]);

    $paymentMethod = PaymentMethod::retrieve($request->paymentMethod);
    $cardFingerprint = $paymentMethod->card->fingerprint;

    $plan = Plan::find($request->plan_id);

    if (!$plan) {
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

    if ($request->type === 'new') {
        $subscription = $this->createSubscription($user, $plan, $request->paymentMethod);
    } else if ($request->type === 'change') {
        $subscription = $this->swapSubscription($user, $plan, $request->paymentMethod);
    }


    $subscription->update([
        'card_fingerprint' => $cardFingerprint,
        'type' => $plan->type
    ]);

    $this->updateUserRoles($user, $plan, $subscription);

    return success('profile.edit', 'Successfully subscribed to ' . $plan->type . ' plan');
}


    protected function swapSubscription($user, $plan, $paymentMethod)
{
    // Retrieve the user's current subscription
    $currentSubscription = $user->subscription('free') ?? $user->subscription('premium');

    if (!$currentSubscription) {
        session()->flash('message.error', 'No active subscription found to swap');
        return null; // Return null to indicate an error
    }

    // Swap the subscription to the new plan without proration
    /* $currentSubscription->swap($plan->stripe_plan_id, [ */
    /*     'skip_proration' => true, // Ensure the user pays the full price of the new plan */
    /* ]); */

    $vernigu = $currentSubscription->noProrate()->skipTrial()->swapAndInvoice($plan->stripe_plan_id);
    /* dd($vernigu); */

    $user->updateDefaultPaymentMethod($paymentMethod);

            /* $invoice = $user->invoice(); */

            /* $stripeInvoice = Invoice::retrieve($invoice->asStripeInvoice()->id); */
    /* $stripeInvoice->finalizeInvoice(); */

    // Pay the invoice immediately
    /* $stripeInvoice->pay(); */


          /* $invoice = $user->createInvoice(); */
    /* $invoice->finalizeInvoice(); // Finalize the invoice */
    /* $invoice->pay(); // Pay the invoice immediately */
    // Create an invoice and pay it immediately
    /* $invoice = $user->invoice(); */
    /* $invoice->payNow(); // Ensure the invoice is paid immediately */

    return $currentSubscription;
}

    public function confirm(Request $request)
    {
        return inertia('Subscription/BillingConfirmation', [
            'payment_intent' => $request->query('payment_intent'),
            'client_secret' => $request->query('client_secret'),
        ]);
    }

    public function index(int|string $plan_id, Request $request)
    {

        $user = $request->user();

        if ($user->isSubscribed()) {
            return error('profile.edit', 'You are already subscribed to a plan.');
        }

        $setupIntentId = $request->query('setup_intent');
        $redirectStatus = $request->query('redirect_status');

        if ($setupIntentId && $redirectStatus) {
            /* Stripe::setApiKey(env('STRIPE_SECRET')); */
            Stripe::setApiKey(config('services.stripe.secret'));

            // Retrieve the SetupIntent from Stripe
            $setupIntent = SetupIntent::retrieve($setupIntentId);

            if ($setupIntent->status === 'succeeded') {
                $paymentMethod = $setupIntent->payment_method;
                $plan = Plan::find($plan_id);

                if (!$plan) {
                    return redirect()->back()->with('message.error', 'Plan not founded.');
                }

                try {
                    $subscription = $this->createSubscription($user, $plan, $paymentMethod);

                    // Update user roles based on the plan type
                    $this->updateUserRoles($user, $plan, $subscription);

                    return redirect()->route('checkout.success', ['plan_id' => $plan_id]);

                } catch (\Exception $e) {
                    Log::error('Subscription Error: ' . $e->getMessage());

                    return redirect()->route('checkout.index', ['plan_id' => $plan_id])
                        ->with('error', 'Payment failed. Please try again.');
                }
            } else {
                return redirect()->route('checkout.index', ['plan_id' => $plan_id])
                    ->with('error', 'Payment failed. Please try again.');
            }
        }

        $plan = Plan::find($plan_id);

        if (!$plan) {
            return error('profile.edit', 'Plan not found.');
            return response()->json(['message' => 'Plan not found'], 404);
        }

        return Inertia::render('Subscription/Checkout', [
            'plan_id' => $plan->id,
            'plan' => PlanData::from($plan),
            'intent' => $user->createSetupIntent(),
        ]);
    }

    public function success(Request $request)
    {
        $setupIntentId = $request->query('setup_intent');
        $redirectStatus = $request->query('redirect_status');

        if ($setupIntentId && $redirectStatus) {
            Stripe::setApiKey(config('services.stripe.secret'));

            $setupIntent = SetupIntent::retrieve($setupIntentId);

            if ($setupIntent->status === 'succeeded') {
                return Inertia::render('Checkout/Success', [
                    'setupIntent' => $setupIntent,
                    'redirectStatus' => $redirectStatus,
                    'planId' => $request->query('plan_id'),
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
    protected function createSubscription($user, $plan, $paymentMethod): Subscription
    {
        $subscription = $user->newSubscription($plan->type, $plan->stripe_plan_id)
            ->withMetadata([
                'plan_id' => (string) $plan->id,
                'plan_name' => (string) $plan->name,
                'plan_price' => (string) $plan->price,
                'user_id' => (string) $user->id,
                'plan_type' => (string) $plan->type,
        ]);

        if ($plan->type == 'free') {
            $subscription->trialDays($plan->trial_days);
        }

        return $subscription->create($paymentMethod, [
                'email' => $user->email,
        ]);;
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
            /* $subscription->cancel(); */
        }
    }
}

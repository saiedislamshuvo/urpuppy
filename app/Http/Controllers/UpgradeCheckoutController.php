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



class UpgradeCheckoutController extends Controller
{
    public function index(int|string $plan_id, Request $request)
    {

        $user = $request->user();

        if (!$user->isSubscribed()) {
            return error('profile.edit', 'You are not subscribed to a plan.');
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

        return Inertia::render('Subscription/CheckoutUpgrade', [
            'plan_id' => $plan->id,
            'plan' => PlanData::from($plan),
            'intent' => $user->createSetupIntent(),
        ]);
    }

    //
}

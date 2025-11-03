<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Stripe\Stripe;

class BillingController extends Controller
{
    public function portal(Request $request)
    {
        return $request->user()->redirectToBillingPortal(route('profile.edit'));
    }

    public function breederRequestRetry(Request $request)
    {
        $request->user()->breeder_requests()->latest()->first()->update([
            'status' => 'pending',
            'message' => 'We are currently reviewing your application.'
        ]);

        return success('profile.edit', 'Your request has been resubmitted.');
    }

    public function createIntent(Request $request)
    {
        try {
            $user = $request->user();
            $plan = Plan::findOrFail($request->plan_id);

            Stripe::setApiKey(config('services.stripe.secret'));

            $setupIntent = $user->createSetupIntent();

            return response()->json([
                'client_secret' => $setupIntent->client_secret,
                'plan_id' => $request->plan_id,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function completeSubscription(Request $request)
    {
        $user = $request->user();
        $paymentMethod = $request->payment_method;
        $plan = Plan::findOrFail($request->plan_id);

        $user->updateDefaultPaymentMethod($paymentMethod);

        $user->newSubscription('standard', $plan->stripe_plan_id)
            ->create($paymentMethod);

        return response()->json(['success' => true]);
    }
}


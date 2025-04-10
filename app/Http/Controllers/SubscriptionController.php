<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Cknow\Money\Money;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index(Request $request)
    {
        /* if (!auth()->check()) { */

        /* } */

        $plans = [];

        /* dd(auth()->user()->subscriptions()->active()->first()->asStripeSubscription()); */

        $subscriptions = auth()->user()->customSubscriptions()->with('plan')
            /* ->whereNull('ends_at') */
            ->where('stripe_status', 'active')
            ->get()->map(function ($subscription) {

                $stripe = $subscription->asStripeSubscription();
                $subscription->cancel_at = Carbon::parse($stripe->cancel_at)->toDateString();
                if ($subscription->upcoming) {
                    $subscription->upcoming = $subscription->upcomingInvoice();
                    $subscription->upcoming_total = Money::USD($subscription->upcoming->total)->format();
                    $subscription->upcoming_date = Carbon::parse($subscription->upcoming->next_payment_attempt)->diffForHumans();
                }

                return $subscription;
            });
        $invoices = auth()->user()->invoices()->map(function ($invoice) {
            $new_invoice = (object) [];
            $new_invoice->date = $invoice?->date()->toDateString();
            $new_invoice->total = $invoice->total();
            $new_invoice->pdf = $invoice->invoice_pdf;

            return $new_invoice;
        });

        return inertia()->render('Subscription/Index', [
            'subscriptions' => $subscriptions,
            'invoices' => $invoices,
        ]);
    }

    public function portal(Request $request)
    {
        return Inertia::location($request->user()->redirectToBillingPortal(route('subscription.index')));
    }

    public function destroy()
    {
        auth()->user()->getActiveSubscriptions()->first()->cancel();
    }
}

<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Cknow\Money\Money;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use Laravel\Octane\Facades\Octane;

class SubscriptionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Concurrently load subscriptions and invoices
        [$subscriptions, $invoices] = Octane::concurrently([
            function() use ($user) {
                return Cache::remember(
                    "user_{$user->id}_subscriptions",
                    now()->addMinutes(15),
                    function() use ($user) {
                        return $user->customSubscriptions()
                            ->with('plan')
                            ->where('stripe_status', 'active')
                            ->get()
                            ->map(function ($subscription) {
                                try {
                                    $stripe = $subscription->asStripeSubscription();
                                    return [
                                        'id' => $subscription->id,
                                        'plan' => $subscription->plan,
                                        'cancel_at' => optional($stripe->cancel_at, fn($d) => Carbon::parse($d)->toDateString()),
                                        'upcoming' => $this->getUpcomingInvoiceData($subscription),
                                        // ... other fields
                                    ];
                                } catch (\Exception $e) {
                                    report($e);
                                    return null;
                                }
                            })->filter();
                    }
                );
            },
            function() use ($user) {
                return Cache::remember(
                    "user_{$user->id}_invoices",
                    now()->addHours(1),
                    function() use ($user) {
                        return $user->invoices()->map(function ($invoice) {
                            return [
                                'date' => optional($invoice->date())->toDateString(),
                                'total' => $invoice->total(),
                                'pdf' => $invoice->invoice_pdf,
                            ];
                        });
                    }
                );
            }
        ]);

        return inertia()->render('Subscription/Index', [
            'subscriptions' => $subscriptions,
            'invoices' => $invoices,
        ]);
    }

    protected function getUpcomingInvoiceData($subscription)
    {
        try {
            $invoice = $subscription->upcomingInvoice();
            return [
                'total' => Money::USD($invoice->total)->format(),
                'date' => Carbon::parse($invoice->next_payment_attempt)->diffForHumans(),
            ];
        } catch (\Exception $e) {
            report($e);
            return null;
        }
    }

    public function portal(Request $request)
    {
        return Inertia::location(
            $request->user()->redirectToBillingPortal(route('subscription.index'))
        );
    }

    public function destroy(Request $request)
    {
        $request->user()->getActiveSubscriptions()->first()->cancel();
        return back()->with('message', 'Subscription cancelled');
    }
}

<?php

namespace App\Listeners;

use Illuminate\Support\Facades\Mail;
use Laravel\Cashier\Cashier;
use Laravel\Cashier\Events\WebhookReceived;

class HandleRenewSubscription
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(WebhookReceived $event): void
    {
        // Ensure we're handling the correct webhook event
        if ($event->payload['type'] !== 'invoice.payment_succeeded') {
            return;
        }

        $invoice = $event->payload['data']['object'];

        // Log to verify the event
        /* \Log::channel('stripe')->info('Processing invoice.payment_succeeded', $invoice); */

        // Check the `billing_reason` field to determine if this is a renewal
        /* if (($invoice['billing_reason'] ?? '') !== 'subscription_cycle') { */
        /*     \Log::channel('stripe')->info('Ignored event: Not a subscription renewal', [ */
        /*         'billing_reason' => $invoice['billing_reason'] ?? 'unknown', */
        /*     ]); */
        /*     return; */
        /* } */

        // Extract necessary data
        $customerId = $invoice['customer'] ?? null;
        $subscriptionId = $invoice['subscription'] ?? null;

        // Fetch the associated user
        $user = $this->getUser($customerId);

        if (! $user) {
            \Log::warning('No user found for Stripe customer ID', ['customer_id' => $customerId]);

            return;
        }

        // Fetch metadata (from the subscription object, not the invoice object)
        $subscription = $this->retrieveSubscription($subscriptionId);
        $metadata = $invoice['metadata'] ?? [];

        // Log metadata for debugging
        \Log::channel('stripe')->info('Subscription metadata', $metadata);

        // Process subscription items
        $items = $invoice['lines']['data'] ?? [];
        foreach ($items as $item) {
            $product = $item['price']['product'] ?? null;
            $priceId = $item['price']['id'] ?? null;
            $amount = $item['price']['unit_amount'] ?? null;
            $currency = $item['price']['currency'] ?? null;
            $type = $metadata['plan_type'] ?? null;

            \Log::info('Processing subscription item', [
                'product' => $product,
                'price_id' => $priceId,
                'amount' => $amount,
                'currency' => $currency,
                'plan_type' => $type,
            ]);
        }

        // Send appropriate email based on the plan type
        switch ($metadata['plan_type'] ?? null) {
            case 'premium':
                Mail::queue(new \App\Mail\RenewSellerMail($user));
                \Log::info('Sent RenewSellerMail to user', ['user_id' => $user->id]);
                break;

            case 'breeder':
                Mail::queue(new \App\Mail\RenewBreederMail($user));
                \Log::info('Sent RenewBreederMail to user', ['user_id' => $user->id]);
                break;

            case 'free':
                Mail::queue(new \App\Mail\FreeAccountMail($user));
                \Log::info('Sent FreeAccountMail to user', ['user_id' => $user->id]);
                break;

            default:
                \Log::info('No email sent: unknown or missing plan type', [
                    'metadata' => $metadata,
                ]);
                break;
        }
    }

    /**
     * Retrieve the user associated with the Stripe customer ID.
     */
    private function getUser($stripeId)
    {
        return Cashier::findBillable($stripeId);
    }

    /**
     * Retrieve the subscription object from Stripe.
     */
    private function retrieveSubscription($subscriptionId)
    {
        try {
            return \Stripe\Subscription::retrieve($subscriptionId);
        } catch (\Exception $e) {
            \Log::error('Failed to retrieve subscription from Stripe', ['subscription_id' => $subscriptionId, 'error' => $e->getMessage()]);

            return [];
        }
    }
}

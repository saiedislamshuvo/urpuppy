<?php

namespace App\Listeners;

use App\Mail\SubscriptionEnded;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Laravel\Cashier\Cashier;
use Laravel\Cashier\Events\WebhookReceived;

class HandleSubscriptionEnded
{
    public function handle(WebhookReceived $event): void
    {
        if ($event->payload['type'] !== 'customer.subscription.updated') {
            return;
        }

        $subscription = $event->payload['data']['object'];

        /* // Process only if the subscription has been canceled */
        /* if (empty($subscription['canceled_at'])) { */
        /*     return; */
        /* } */
        if ($subscription['canceled_at'] == null) {
            return;
        }

        // Ensure the event is not a duplicate using `canceled_at`
        $cacheKey = 'subscription-canceled-'.$subscription['id'].'-'.$subscription['canceled_at'];

        if (Cache::has($cacheKey)) {
            Log::info('Duplicate cancellation event ignored.', ['subscription_id' => $subscription['id']]);

            return;
        }

        // Cache the event for deduplication
        Cache::put($cacheKey, true, now()->addMinutes(10));

        // Fetch the user associated with the subscription
        $user = $this->getUser($subscription['customer']);

        if ($user) {

            // Optional: Log for debugging
            Log::info('Sending cancellation email.', [
                'user_id' => $user->id,
                'canceled_at' => $subscription['canceled_at'],
                'reason' => $subscription['metadata']['cancellation_reason'] ?? null,
            ]);

            $user->is_breeder = false;
            $user->is_seller = false;

            $user->save();

            // Send email with cancellation reason (if provided)
            Mail::queue(new SubscriptionEnded($user, $subscription['metadata']['cancellation_reason'] ?? 'No reason provided'));
        }
    }

    private function getUser($stripeId)
    {
        return Cashier::findBillable($stripeId);
    }
}

<?php

namespace App\Listeners;

use App\Mail\SubscriptionExpired;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Laravel\Cashier\Cashier;
use Laravel\Cashier\Events\WebhookReceived;

class HandleSubscriptionDeleted
{
    public function handle(WebhookReceived $event): void
    {
        if ($event->payload['type'] !== 'customer.subscription.deleted') {
            return;
        }

        $subscription = $event->payload['data']['object'];

        // Ensure the event is not a duplicate using subscription ID
        $cacheKey = 'subscription-deleted-'.$subscription['id'];

        if (Cache::has($cacheKey)) {
            Log::info('Duplicate subscription deletion event ignored.', ['subscription_id' => $subscription['id']]);

            return;
        }

        // Cache the event for deduplication
        Cache::put($cacheKey, true, now()->addHours(24));

        // Fetch the user associated with the subscription
        $user = $this->getUser($subscription['customer']);

        if ($user) {
            // Optional: Log for debugging
            Log::info('Sending subscription expired email.', [
                'user_id' => $user->id,
                'subscription_id' => $subscription['id'],
            ]);

            // Update user status if needed
            $user->is_breeder = false;
            $user->is_seller = false;

            $user->save();

            // Send expiration email
            Mail::queue(new SubscriptionExpired($user));
        }
    }

    private function getUser($stripeId)
    {
        return Cashier::findBillable($stripeId);
    }
}


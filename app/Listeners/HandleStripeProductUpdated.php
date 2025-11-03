<?php

namespace App\Listeners;

use App\Services\StripePlanSyncService;
use Laravel\Cashier\Events\WebhookReceived;

class HandleStripeProductUpdated
{
    public function __construct(private StripePlanSyncService $syncService)
    {
    }

    public function handle(WebhookReceived $event): void
    {
        $eventType = $event->payload['type'];
        $eventData = $event->payload['data']['object'];

        match ($eventType) {
            'product.created', 'product.updated' => $this->syncService->handleProductUpdate($eventData),
            'product.deleted' => $this->syncService->handleProductDelete($eventData),
            'price.created', 'price.updated' => $this->syncService->handlePriceUpdate($eventData),
            'price.deleted' => $this->syncService->handlePriceDelete($eventData),
            default => null,
        };
    }
}

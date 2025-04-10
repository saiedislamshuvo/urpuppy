<?php

namespace App\Listeners;

use App\Models\Plan;
use Laravel\Cashier\Events\WebhookReceived;

class HandleStripeProductUpdated
{
    public function handle(WebhookReceived $event): void
    {
        /* if ($event->payload['type'] !== 'product.updated') { */
        /*     /1* $this->syncProduct($event->payload['data']); *1/ */
        /*     return; */
        /* } */

        if ($event->payload['type'] === 'price.updated') {
            $this->syncPrice($event->payload['data']['object']);

            return;
        }

    }

    /* private function syncProduct($stripeProduct) */
    /* { */
    /* \Log::info($stripeProduct); */
    /* \Log::info('name'); */
    /* Plan::updateOrCreate( */
    /*     ['stripe_plan_id' => $stripeProduct['id']], */
    /*     [ */
    /*         /1* 'name' => $stripeProduct['name'], *1/ */
    /*         /1* 'description' => $stripeProduct['description'] ?? '', *1/ */
    /*         'active' => $stripeProduct['active'], */
    /*     ] */
    /* ); */
    /* } */

    private function syncPrice($stripePrice)
    {

        $product = Plan::where('stripe_product_id', @$stripePrice['product'])->first();

        \Log::info('rugimik');
        \Log::info($product);
        \Log::info($stripePrice);

        if ($product) {
            $product->update([
                'price' => $stripePrice['amount'], // Convert cents to dollars
            ]);
        }
    }
}

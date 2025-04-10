<?php

namespace App\Listeners;

use App\Models\Plan;
use Illuminate\Support\Facades\Mail;
use Laravel\Cashier\Cashier;
use Laravel\Cashier\Events\WebhookReceived;

class HandleSubscriptionCreated
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
        if ($event->payload['type'] !== 'customer.subscription.created') {
            return;
        }

        $subscription = $event->payload['data']['object'];
        $meta_data = @$event->payload['data']['object']['metadata'];

        $user = $this->getUser($subscription['customer']);

        \Log::info(var_dump($user));

        if (! $user) {
            return;
        }

        \Log::info('user found');

        $items = $subscription['items']['data'];

        \Log::channel('stripe')->info('muritik');
        \Log::channel('stripe')->info(@$meta_data);

        /* \Log::info($items); */
        $plan = null;

        foreach ($items as $item) {

            /* \Log::info($item); */
            $product = $item['price']['product'];
            $priceId = $item['price']['id'];

            /* $plan = Plan::query()->where('stipe_plan_id', $priceId)->first(); */

            $amount = $item['price']['unit_amount'];
            $currency = $item['price']['currency'];
            $type = @$meta_data['plan_type'];

        }
        /* $user->update(['is_breeder' => $plan->is_breeder]); */
        /* $user->update(['is_featured' => $plan->is_featured]); */

        /* \Log::info('okay baby boy'); */
        \Log::channel('stripe')->info(@$meta_data['plan_type']);
        /* \Log::info(@$meta_data['plan_type']); */

        if (@$meta_data['plan_type'] == 'premium') {

            $user->update([
                'is_seller' => true,
            ]);

            Mail::queue(new \App\Mail\PremiumAccountMail($user));
        } elseif (@$meta_data['plan_type'] == 'breeder') {

            $user->update([
                'is_breeder' => true,
            ]);

            \Log::info('okay baby boy');
            Mail::queue(new \App\Mail\NewBreederSpecialAccountMail($user));
        } elseif (@$meta_data['plan_type'] == 'free') {

            $user->update([
                'is_seller' => true,
            ]);

            \Log::info('okay baby boy');
            Mail::queue(new \App\Mail\FreeAccountMail($user));
        }
        /* Mail::to($user->email)->send(new ($user, $items)); */
    }

    private function getUser($stripeId)
    {
        return Cashier::findBillable($stripeId);
    }
}

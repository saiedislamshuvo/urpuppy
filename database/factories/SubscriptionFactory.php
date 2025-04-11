<?php

namespace Database\Factories;

use App\Models\Subscription;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Carbon\Carbon;

class SubscriptionFactory extends Factory
{
    protected $model = Subscription::class;

    public function definition()
    {
        return [
            'name' => 'default',
            'stripe_id' => 'sub_' . Str::random(14),
            'stripe_status' => 'active',
            'stripe_price' => 'price_' . Str::random(10),
            'quantity' => 1,
            'type' => 'breeder',
            'trial_ends_at' => Carbon::now()->addDays(14),
            'ends_at' => null,
            'card_fingerprint' => $this->faker->sha256,
            'user_id' => \App\Models\User::factory(),
        ];
    }

    public function onTrial()
    {
        return $this->state([
            'trial_ends_at' => Carbon::now()->addDays(14),
        ]);
    }

    public function cancelled()
    {
        return $this->state([
            'ends_at' => Carbon::now(),
            'stripe_status' => 'canceled',
        ]);
    }
}


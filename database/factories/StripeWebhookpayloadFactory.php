<?php

namespace Database\Factories; // Make sure this is the correct namespace

use Illuminate\Database\Eloquent\Factories\Factory;

class StripeWebhookPayloadFactory extends Factory
{
    public function definition()
    {
        return [
            'id' => 'evt_'.$this->faker->regexify('[A-Za-z0-9]{14}'),
            'object' => 'event',
            'api_version' => '2024-09-30.acacia',
            'created' => now()->timestamp,
            'type' => 'customer.subscription.deleted',
            'data' => [
                'object' => [
                    'id' => 'sub_'.$this->faker->regexify('[A-Za-z0-9]{14}'),
                    'object' => 'subscription',
                    'customer' => 'cus_'.$this->faker->regexify('[A-Za-z0-9]{14}'),
                    'status' => 'active',
                    'current_period_start' => now()->timestamp,
                    'current_period_end' => now()->addMonth()->timestamp,
                    'plan' => [
                        'id' => 'plan_'.$this->faker->regexify('[A-Za-z0-9]{14}'),
                        'amount' => $this->faker->numberBetween(1000, 10000),
                        'currency' => 'usd',
                        'interval' => 'month',
                        'interval_count' => 1,
                        'product' => 'prod_'.$this->faker->regexify('[A-Za-z0-9]{14}'),
                    ],
                    'metadata' => [
                        'plan_id' => $this->faker->randomNumber(),
                        'user_id' => $this->faker->randomNumber(),
                    ],
                ],
            ],
        ];
    }

    // Other states and customizations can go here
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Plan>
 */
class PlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'stripe_plan_id' => '',
            'price' => fake()->numberBetween(100, 1000),
            /* 'order' => fake()->numberBetween(1, 10), */
            'trial_days' => fake()->numberBetween(0, 30),
            'interval' => 'month',
            'active' => true,
            'listing_limit' => 10,
            'image_per_listing' => 5,
            'video_per_listing' => 1,
            'is_featured' => false,
        ];
    }
}

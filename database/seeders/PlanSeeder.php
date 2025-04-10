<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // FREE ACCOUNT
        Plan::create([
            'name' => 'Free Plan',
            'price' => 2499,
            'type' => 'free',
            'interval' => 'month',
            'trial_days' => 3,
            'active' => true,
            'features' => [
                ['name' => 'Post up to 3 listings'],
                ['name' => 'Upload up to 3 images per listing'],
                ['name' => 'Perfect for getting started and testing the platform!'],
            ],
            'listing_limit' => 3,
            'badge_title' => '3-Day Trial',
            'badge_color' => 'secondary',
            'image_per_listing' => 3,
            'video_per_listing' => 1,
            'is_featured' => false,
        ]);

        // SILVER PACKAGE
        Plan::create([
            'name' => 'Silver Plan',
            'price' => 2999,
            'type' => 'premium',
            'savings_label' => 'Save 0% when billed annually',
            'interval' => 'month',
            'interval_count' => 1,
            'is_highlight' => true,
            'trial_days' => 0,
            'active' => true,
            'features' => [
                ['name' => 'Post up to 5 images per listing'],
                ['name' => 'Video uploads to showcase your puppies in action '],
                ['name' => 'Featured listing appearance to boost visibility '],
            ],
            'listing_limit' => 3,
            'image_per_listing' => 3,
            'video_per_listing' => 1,
            'is_featured' => false,
        ]);

        /* // PREMIUM PACKAGE */
        Plan::create([
            'name' => 'Gold Plan',
            'price' => 7499,
            'type' => 'premium',
            'savings_label' => 'Save 16% when billed annually',
            'is_highlight' => true,
            'interval' => 'month',
            'badge_title' => 'Most Popular',
            'badge_color' => 'primary',
            'interval_count' => 3,
            'trial_days' => 0,
            'active' => true,
            'features' => [
                ['name' => 'Post up to 5 images per listing'],
                ['name' => 'Video uploads included for an engaging puppy showcase'],
                ['name' => 'Featured listing appearance to attract buyers'],
                ['name' => 'List up to 10 puppies—ideal for growing breeders '],
            ],
            'listing_limit' => 10,
            'image_per_listing' => 5,
            'video_per_listing' => 1,
            'is_featured' => false,
        ]);

        /* // BREEDER SPECIAL */
        Plan::create([
            'name' => 'Platinum Plan',
            'price' => 19999,
            'type' => 'premium',
            'savings_label' => 'Save 35% when billed annually',
            'interval' => 'year',

            'is_highlight' => true,
            'interval_count' => 1,
            'trial_days' => 0,
            'active' => true,
            'features' => [
                ['name' => 'Unlimited listings (up to 10 puppies per listing) '],
                ['name' => 'Video uploads included to highlight your kennel’s quality'],
                ['name' => 'Featured listing appearance ensures maximum exposure year-round'],
            ],
            'listing_limit' => 0,
            'image_per_listing' => 10,
            'video_per_listing' => 1,
            'is_featured' => false,
        ]);

        Plan::create([
            'name' => 'The All-in-One Breeder Annual Subscription Plan',
            'price' => 7499,
            'type' => 'breeder',
            'savings_label' => 'Save 35% when billed annually',
            'interval' => 'month',

            'is_highlight' => true,
            'interval_count' => 1,
            'trial_days' => 0,
            'active' => true,
            'features' => [
                ['name' => 'Unlimited listings (up to 10 puppies per listing) '],
                ['name' => 'Video uploads included to highlight your kennel’s quality'],
                ['name' => 'Featured listing appearance ensures maximum exposure year-round'],
            ],
            'listing_limit' => 0,
            'image_per_listing' => 10,
            'video_per_listing' => 1,
            'is_featured' => true,
        ]);

    }
}

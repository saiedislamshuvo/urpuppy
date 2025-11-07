<?php

namespace Database\Seeders;

use App\Settings\GeneralSettings;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = app(GeneralSettings::class);

        // Homepage settings
        $settings->site_name  = 'Urpuppy';
        $settings->site_logo = ''; // Demo: Leave empty, image can be uploaded later
        $settings->hero_title = 'Puppies for Sale';
        $settings->hero_subtitle = 'Countless Puppies Available For Sale Across the Country!';
        $settings->hero_background = 'https://urpuppy.com/banner-bg.webp'; // Demo: Leave empty, image can be uploaded later

        $settings->featured_section_title = 'Featured Breeds';
        $settings->featured_button_text = 'View More Breeds';
        $settings->featured_button_link = '/breeds';
        $settings->spotlight_section_title = 'Puppy Spotlight';
        $settings->spotlight_button_text = 'View More Breeds';
        $settings->spotlight_button_link = '/breeds';
        $settings->picks_section_title = 'Top Picks For You';
        $settings->trusted_section_title = 'Trusted Breeders';
        $settings->trusted_button_text = 'Explore All Breeders';
        $settings->trusted_button_link = '/breeders';
        $settings->arrivals_section_title = 'New Arrivals!';
        $settings->arrivals_button_text = 'Discover new';
        $settings->arrivals_button_link = '/puppies';
        $settings->blogs_section_title = 'Latest Posts';
        $settings->blogs_button_text = 'Discover new posts';
        $settings->blogs_button_link = '/blogs';

        // Call to action section
        $settings->cta_section_title = 'Why Choose UrPuppy.com?';
        $settings->cta_button_subtitle = 'Our advantages';
        $settings->cta_button_link = '/why-us';
        $settings->cta_features = [
            [
                'icon' => 'fa-star',
                'title' => 'Reach Thousands of Buyers',
                'description' => 'Our platform connects you with eager pet lovers nationwide.',
            ],
            [
                'icon' => 'fa-shipping-fast',
                'title' => 'Easy-to-Use Tools',
                'description' => 'Upload photos, videos, and descriptions seamlessly.',
            ],
            [
                'icon' => 'fa-heart',
                'title' => 'Boosted Visibility',
                'description' => 'Featured listings help you stand out from the competition.',
            ],
        ];

        // Footer section demo
        $settings->footer_logo = '';
        $settings->footer_coloum1_title = 'Find A Puppy';
        $settings->footer_coloum1 = [
            ['title' => 'View All Puppies', 'link' => '/puppies'],
            ['title' => 'View All Breeds', 'link' => '/breeds'],
        ];
        $settings->footer_coloum2_title = 'Account';
        $settings->footer_coloum2 = [
            ['title' => 'Buyer Register', 'link' => '/account'],
            ['title' => 'Seller Register', 'link' => '/register-seller'],
            ['title' => 'Breeder Register', 'link' => '/register-breeder'],
            
        ];
        $settings->footer_coloum3_title = 'Company';
        $settings->footer_coloum3 = [
            ['title' => 'About Us', 'link' => '/about-us'],
            ['title' => 'Contact', 'link' => '/contact-us'],
            ['title' => 'Blog', 'link' => '/post'],

        ];
        $settings->footer_coloum4_title = 'Support';
        $settings->footer_coloum4 = [
            ['title' => 'Privacy Policy', 'link' => '/privacy-policy'],
            ['title' => 'Terms of Use', 'link' => '/terms-of-use'],
        ];
        $settings->footer_social_media = [
            ['icon' => 'fa-facebook', 'link' => 'https://facebook.com/urpuppy'],
            ['icon' => 'fa-instagram', 'link' => 'https://instagram.com/urpuppy'],
        ];
        $settings->footer_copyright_text = '©2025 Urpuppy.com, LLC. All Rights Reserved';

        // Puppies for Sale page
        $settings->puppies_hero_title = 'Puppies for Sale';
        $settings->puppies_hero_subtitle = 'Countless Puppies Available For Sale Across the Country!';
        $settings->puppies_hero_background = '';

        // breeds page
        $settings->breeds_hero_title = 'Siberian Husky: Your Winter Companion';
        $settings->breeds_hero_subtitle = 'Find Breeds';
        $settings->breeds_hero_background = '';
        $settings->breeds_section_title = 'Choose your breeds';

        // breeders page
        $settings->breeders_hero_title = 'Register as a breeder';
        $settings->breeders_hero_subtitle = 'Find breeders';
        $settings->breeders_hero_background = '';
        $settings->breeders_section_title = 'Choose your Breeder';

        // Legal pages
        $settings->privacy_policy = '<p>Your privacy policy content goes here. This is a placeholder that should be updated with your actual privacy policy.</p>';
        $settings->terms_condition = '<p>Your terms and conditions content goes here. This is a placeholder that should be updated with your actual terms and conditions.</p>';

    }
}

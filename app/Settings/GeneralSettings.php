<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{

    // Homepage settings
    public ?string $site_name = 'Urpuppy';
    public ?string $site_logo = '';
    public ?string $hero_title = 'Puppies for Sale';
    public ?string $hero_subtitle = 'Countless Puppies Available For Sale Across the Country!';
    public ?string $hero_background = 'https://urpuppy.com/banner-bg.webp';
    public ?string $featured_section_title = 'Featured Breeds';
    public ?string $featured_button_text = 'View More Breeds';
    public ?string $featured_button_link = '/breeds';
    public ?string $spotlight_section_title = 'Puppy Spotlight';
    public ?string $spotlight_button_text = 'View More Breeds';
    public ?string $spotlight_button_link = '/breeds';
    public ?string $picks_section_title = 'Top Picks For You';
    public ?string $trusted_section_title = 'Trusted Breeders';
    public ?string $trusted_button_text = 'Explore All Breeders';
    public ?string $trusted_button_link = '/breeders';
    public ?string $arrivals_section_title = 'New Arrivals!';
    public ?string $arrivals_button_text = 'Discover new';
    public ?string $arrivals_button_link = '/puppies';
    public ?string $blogs_section_title = 'Latest Posts';
    public ?string $blogs_button_text = 'Discover new posts';
    public ?string $blogs_button_link = '/blogs';
    
    // Call to action
    public ?string $cta_section_title = 'Why Choose UrPuppy.com?';
    public ?string $cta_button_subtitle = 'Our advantages';
    public ?string $cta_button_link = '/why-us';
    public ?array $cta_features = [
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

    // Footer section
    public ?string $footer_logo = '';
    public ?string $footer_coloum1_title = 'Find A Puppy';
    public ?array $footer_coloum1 = [
        ['title' => 'View All Puppies', 'link' => '/puppies'],
        ['title' => 'View All Breeds', 'link' => '/breeds'],
    ];
    public ?string $footer_coloum2_title = 'Account';
    public ?array $footer_coloum2 = [
        ['title' => 'Buyer Register', 'link' => '/account'],
        ['title' => 'Seller Register', 'link' => '/register-seller'],
        ['title' => 'Breeder Register', 'link' => '/register-breeder'],
    ];
    public ?string $footer_coloum3_title = 'Company';
    public ?array $footer_coloum3 = [
        ['title' => 'About Us', 'link' => '/about-us'],
        ['title' => 'Contact', 'link' => '/contact-us'],
        ['title' => 'Blog', 'link' => '/post'],
    ];
    public ?string $footer_coloum4_title = 'Support';
    public ?array $footer_coloum4 = [
        ['title' => 'Privacy Policy', 'link' => '/privacy-policy'],
        ['title' => 'Terms of Use', 'link' => '/terms-of-use'],
    ];
    public ?array $footer_social_media = [
        ['icon' => 'fa-facebook', 'link' => 'https://facebook.com/urpuppy'],
        ['icon' => 'fa-instagram', 'link' => 'https://instagram.com/urpuppy'],
    ];
    public ?string $footer_copyright_text = '©2025 Urpuppy.com, LLC. All Rights Reserved';

    // Puppies for Sale page
    public ?string $puppies_hero_title = 'Puppies for Sale';
    public ?string $puppies_hero_subtitle = 'Countless Puppies Available For Sale Across the Country!';
    public ?string $puppies_hero_background = '';

    // breeds page
    public ?string $breeds_hero_title = 'Siberian Husky: Your Winter Companion';
    public ?string $breeds_hero_subtitle = 'Find Breeds';
    public ?string $breeds_hero_background = '';
    public ?string $breeds_section_title = 'Choose your breeds';

    // breeders page
    public ?string $breeders_hero_title = 'Register as a breeder';
    public ?string $breeders_hero_subtitle = 'Find breeders';
    public ?string $breeders_hero_background = '';
    public ?string $breeders_section_title = 'Choose your Breeder';

    // Legal pages
    public ?string $privacy_policy = '<p>Your privacy policy content goes here. This is a placeholder that should be updated with your actual privacy policy.</p>';
    public ?string $terms_condition = '<p>Your terms and conditions content goes here. This is a placeholder that should be updated with your actual terms and conditions.</p>';


    public static function group(): string
    {
        return 'general';
    }
}
<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{

    // Homepage settings
    public string $site_name;
    public string $site_logo;
    public string $hero_title;
    public string $hero_subtitle;
    public string $hero_background;
    public string $featured_section_title;
    public string $featured_button_text;
    public string $featured_button_link;
    public string $spotlight_section_title;
    public string $spotlight_button_text;
    public string $spotlight_button_link;
    public string $picks_section_title;
    public string $trusted_section_title;
    public string $trusted_button_text;
    public string $trusted_button_link;
    public string $arrivals_section_title;
    public string $arrivals_button_text;
    public string $arrivals_button_link;
    public string $blogs_section_title;
    public string $blogs_button_text;
    public string $blogs_button_link;
    
    // Call to action
    public string $cta_section_title;
    public string $cta_button_subtitle;
    public string $cta_button_link;
    public array $cta_features;

    // Footer section
    public string $footer_logo;
    public string $footer_coloum1_title;
    public array $footer_coloum1;
    public string $footer_coloum2_title;
    public array $footer_coloum2;
    public string $footer_coloum3_title;
    public array $footer_coloum3;
    public string $footer_coloum4_title;
    public array $footer_coloum4;
    public array $footer_social_media;
    public string $footer_copyright_text;

    // Puppies for Sale page
    public string $puppies_hero_title;
    public string $puppies_hero_subtitle;
    public string $puppies_hero_background;

    // breeds page
    public string $breeds_hero_title;
    public string $breeds_hero_subtitle;
    public string $breeds_hero_background;
    public string $breeds_section_title;

    // breeders page
    public string $breeders_hero_title;
    public string $breeders_hero_subtitle;
    public string $breeders_hero_background;
    public string $breeders_section_title;

    // Legal pages
    public string $privacy_policy;
    public string $terms_condition;


    public static function group(): string
    {
        return 'general';
    }
}
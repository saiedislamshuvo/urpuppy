<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        // homepage settings
        $this->migrator->add('general.site_name', '');
        $this->migrator->add('general.site_logo', '');
        $this->migrator->add('general.hero_title', '');
        $this->migrator->add('general.hero_subtitle', '');
        $this->migrator->add('general.hero_background', '');
        $this->migrator->add('general.featured_section_title', '');
        $this->migrator->add('general.featured_button_text', '');
        $this->migrator->add('general.featured_button_link', '');
        $this->migrator->add('general.spotlight_section_title', '');
        $this->migrator->add('general.spotlight_button_text', '');
        $this->migrator->add('general.spotlight_button_link', '');
        $this->migrator->add('general.picks_section_title', '');
        $this->migrator->add('general.trusted_section_title', '');
        $this->migrator->add('general.trusted_button_text', '');
        $this->migrator->add('general.trusted_button_link', '');
        $this->migrator->add('general.arrivals_section_title', '');
        $this->migrator->add('general.arrivals_button_text', '');
        $this->migrator->add('general.arrivals_button_link', '');
        $this->migrator->add('general.blogs_section_title', '');
        $this->migrator->add('general.blogs_button_text', '');
        $this->migrator->add('general.blogs_button_link', '');
        
        $this->migrator->add('general.cta_section_title', '');
        $this->migrator->add('general.cta_button_subtitle', '');
        $this->migrator->add('general.cta_button_link', '');
        $this->migrator->add('general.cta_features', []);
        
        $this->migrator->add('general.footer_logo', '');
        $this->migrator->add('general.footer_coloum1_title', '');
        $this->migrator->add('general.footer_coloum1', []);
        $this->migrator->add('general.footer_coloum2_title', '');
        $this->migrator->add('general.footer_coloum2', []);
        $this->migrator->add('general.footer_coloum3_title', '');
        $this->migrator->add('general.footer_coloum3', []);
        $this->migrator->add('general.footer_coloum4_title', '');
        $this->migrator->add('general.footer_coloum4', []);
        $this->migrator->add('general.footer_social_media', []);
        $this->migrator->add('general.footer_copyright_text', '');

        // Puppies for Sale page
        $this->migrator->add('general.puppies_hero_title', '');
        $this->migrator->add('general.puppies_hero_subtitle', '');
        $this->migrator->add('general.puppies_hero_background', '');

        // breeds page
        $this->migrator->add('general.breeds_hero_title', '');
        $this->migrator->add('general.breeds_hero_subtitle', '');
        $this->migrator->add('general.breeds_hero_background', '');
        $this->migrator->add('general.breeds_section_title', '');

        // breeders page
        $this->migrator->add('general.breeders_hero_title', '');
        $this->migrator->add('general.breeders_hero_subtitle', '');
        $this->migrator->add('general.breeders_hero_background', '');
        $this->migrator->add('general.breeders_section_title', '');

        // Legal pages
        $this->migrator->add('general.privacy_policy', '');
        $this->migrator->add('general.terms_condition', '');

    }
};

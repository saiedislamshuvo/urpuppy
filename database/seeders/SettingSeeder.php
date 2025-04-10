<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Joaopaulolndev\FilamentGeneralSettings\Models\GeneralSetting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $setting = GeneralSetting::create([
            'site_name' => 'Urpuppy',
            'site_description' => 'Urpuppy ads',
            'support_email' => 'support@urpuppy.com',
            'social_network' => [
                'instagram' => 'https://www.instagram.com/urpupppydotcom',
                'x_twitter' => 'https://x.com/UrpuppyDotCom',
            ],
            'more_configs' => [
                'footer_text' => 'Urpuppy. All rights reserved.',
                'footer_1_content' => '',
            ],
        ]);
    }
}

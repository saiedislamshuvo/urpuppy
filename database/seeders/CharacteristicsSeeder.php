<?php

namespace Database\Seeders;

use App\Models\PuppyTrait;
use Illuminate\Database\Seeder;

class CharacteristicsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PuppyTrait::create([
            'name' => 'Champion Sired',
            'tooltip' => 'Champion Sired',
        ]);

        PuppyTrait::create([
            'name' => 'Show Quality',
            'tooltip' => 'Show Quality',
        ]);

        PuppyTrait::create([
            'name' => 'Champion Bloodline',
            'tooltip' => 'Champion Bloodline',
        ]);

        PuppyTrait::create([
            'name' => 'Registered',
            'tooltip' => 'Registered',
        ]);

        PuppyTrait::create([
            'name' => 'Registrable',
            'tooltip' => 'Registrable',
        ]);

        PuppyTrait::create([
            'name' => 'Current Vaccinations',
            'tooltip' => 'Current Vaccinations',
        ]);

        PuppyTrait::create([
            'name' => 'Veterinary Exam',
            'tooltip' => 'Veterinary Exam',
        ]);

        PuppyTrait::create([
            'name' => 'Health Guarantee',
            'tooltip' => 'Health Guarantee',
        ]);

        PuppyTrait::create([
            'name' => 'Pedigree',
            'tooltip' => 'Pedigree',
        ]);
    }
}

<?php

namespace Database\Seeders;

use Cog\Laravel\Love\ReactionType\Models\ReactionType;
use Illuminate\Database\Seeder;

class LoveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ReactionType::firstOrCreate(['name' => 'Like']);
        ReactionType::firstOrCreate(['name' => 'Unlike']);

    }
}

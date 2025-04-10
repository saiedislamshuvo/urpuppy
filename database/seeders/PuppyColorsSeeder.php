<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PuppyColorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $colors = [
            ['name' => 'Black', 'color' => '#000000'],
            ['name' => 'White', 'color' => '#FFFFFF'],
            ['name' => 'Brown', 'color' => '#8B4513'],
            ['name' => 'Gray', 'color' => '#808080'],
            ['name' => 'Golden', 'color' => '#FFD700'],
            ['name' => 'Cream', 'color' => '#FFFDD0'],
            ['name' => 'Red', 'color' => '#FF0000'],
            ['name' => 'Blue', 'color' => '#0000FF'],
            ['name' => 'Fawn', 'color' => '#E5AA70'],
            ['name' => 'Brindle', 'color' => '#8A3324'],
            ['name' => 'Chocolate', 'color' => '#7B3F00'],
            ['name' => 'Tan', 'color' => '#D2B48C'],
            ['name' => 'Sable', 'color' => '#A0522D'],
            ['name' => 'Silver', 'color' => '#C0C0C0'],
            ['name' => 'Yellow', 'color' => '#FFFF00'],
            ['name' => 'Merle', 'color' => '#D7CCC8'], // Approximation
            ['name' => 'Liver', 'color' => '#734A12'],
            ['name' => 'Pied', 'color' => '#FFF5EE'], // Approximation
            ['name' => 'Harlequin', 'color' => '#F5F5F5'], // Approximation
            ['name' => 'Apricot', 'color' => '#FBCEB1'],
            ['name' => 'Wheaten', 'color' => '#F5DEB3'],
        ];

        foreach ($colors as $color) {
            DB::table('puppy_colors')->insert([
                'name' => $color['name'],
                'color' => $color['color'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

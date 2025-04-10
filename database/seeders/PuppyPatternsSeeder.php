<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PuppyPatternsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $patterns = [
            ['name' => 'Solid'],
            ['name' => 'Brindle'],
            ['name' => 'Merle'],
            ['name' => 'Piebald'],
            ['name' => 'Harlequin'],
            ['name' => 'Sable'],
            ['name' => 'Ticked'],
            ['name' => 'Speckled'],
            ['name' => 'Parti-color'],
            ['name' => 'Roan'],
            ['name' => 'Spotted'],
        ];

        foreach ($patterns as $pattern) {
            DB::table('puppy_patterns')->insert([
                'name' => $pattern['name'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

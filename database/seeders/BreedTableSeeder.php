<?php

namespace Database\Seeders;

use App\Models\Breed; // আপনার মডেলের সঠিক namespace দিন
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File; // File Facade ব্যবহার করার জন্য

class BreedTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $jsonPath = database_path('seeders/breeds.json');

        
        if (!File::exists($jsonPath)) {
            $this->command->error("breeds.json ফাইলটি পাওয়া যায়নি: " . $jsonPath);
            return;
        }

        
        $json = File::get($jsonPath);

        
        $breeds = json_decode($json, true);

        
        if (!is_array($breeds) || empty($breeds)) {
            $this->command->warn("breeds.json ফাইল থেকে কোনো ডেটা পাওয়া যায়নি বা ডেটা ফরম্যাট ভুল।");
            return;
        }

        $this->command->info('breeds.json থেকে ' . count($breeds) . ' টি ব্রিডের ডেটা লোড করা হচ্ছে...');
        
        foreach ($breeds as $breedData) {
            // 'image' ফিল্ডটি null থাকলে সেটি বাদ দিয়ে ডেটা ইনসার্ট করা হচ্ছে
            unset($breedData['image']); 
            
            Breed::create($breedData);
        }

        $this->command->info('ডগ ব্রিড ডেটা সফলভাবে ডেটাবেসে প্রবেশ করানো হয়েছে।');
    }
}
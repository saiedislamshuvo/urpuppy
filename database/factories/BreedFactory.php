<?php

namespace Database\Factories;

use App\Models\Breed;
use Exception;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Breed>
 */
class BreedFactory extends Factory
{
    public function configure(): static
    {
        return $this->afterCreating(function (Breed $breed) {
            $petImagesPath = base_path('tests/test-puppies');
            if (! is_dir($petImagesPath)) {
                Log::warning('Pet images directory not found: '.$petImagesPath);

                return;
            }

            $petImages = File::files($petImagesPath);
            if (empty($petImages)) {
                Log::warning('No images found in the directory: '.$petImagesPath);

                return;
            }

            $avatar = $petImages[array_rand($petImages)];

            try {
                $breed->addMedia($avatar->getPathname())
                    ->preservingOriginal()
                    ->toMediaCollection('media');
            } catch (Exception $e) {
                Log::error('Failed to add media: '.$e->getMessage());
            }

        });

    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->firstName(),
            'slug' => $this->faker->slug(),
            'description' => fake()->paragraph(3, true),
            'history_description' => fake()->paragraph(3, true),
            'size_description' => fake()->paragraph(3, true),
            'coat_description' => fake()->paragraph(3, true),
            'temperament_description' => fake()->paragraph(3, true),
            'lifestyle_description' => fake()->paragraph(3, true),
            'activities_description' => fake()->paragraph(3, true),
        ];
    }
}

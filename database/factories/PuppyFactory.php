<?php

namespace Database\Factories;

use App\Models\Breed;
use App\Models\Puppy;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Puppy>
 */
class PuppyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dogNames = [
            'Buddy', 'Max', 'Bella', 'Charlie', 'Luna', 'Lucy', 'Rocky', 'Cooper',
            'Daisy', 'Sadie', 'Milo', 'Bailey', 'Oliver', 'Toby', 'Chloe', 'Zoe',
            'Duke', 'Rex', 'Leo', 'Scout', 'Jack', 'Shadow', 'Ruby', 'Samson',
            'Frankie', 'Gizmo', 'Ollie', 'Finn', 'Penny', 'Bear', 'Harley', 'Rusty',
        ];

        return [
            'name' => $this->faker->randomElement($dogNames),
            'gender' => collect(['Female', 'Male'])->random(),
            'view_count' => 1,
            'birth_date' => $this->faker->dateTimeBetween('-2 years', 'now'),
            'user_id' => User::factory()->create()->id,
            'price' => (int) $this->faker->numberBetween(10, 50000),
            'description' => $this->faker->paragraph(5, true),
        ];
    }

    /**
     * Configure the factory's behavior.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Puppy $puppy) {
            for ($i = 0; $i < 5; $i++) {
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

                if (config('app.env') !== 'testing') {
                    $avatar = $petImages[array_rand($petImages)];

                    try {
                        $puppy->addMedia($avatar->getPathname())
                            ->preservingOriginal()
                            ->toMediaCollection('puppy_files');
                    } catch (Exception $e) {
                        Log::error('Failed to add media: '.$e->getMessage());
                    }
                }

            }

            $breed = Breed::query()->inRandomOrder()->first();
            $puppy->breeds()->attach($breed);
        });
    }
}

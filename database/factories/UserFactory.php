<?php

namespace Database\Factories;

use App\Models\Breed;
use App\Models\City;
use App\Models\Country;
use App\Models\State;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Configure the factory's behavior.
     */
    public function configure(): static
    {
        try {

            return $this->afterCreating(function (User $user) {
                $avatars = File::files(base_path('tests/test-avatars'));

                if (! empty($avatars) && config('app.env') != 'testing') {
                    $avatar = $avatars[array_rand($avatars)];
                    $user->addMedia($avatar->getPathname())
                        ->preservingOriginal()
                        ->toMediaCollection('avatars');
                }

                $breeds = Breed::inRandomOrder()->limit(4)->get();
                $user->breeds()->saveMany($breeds);

                $initial = rand(2, 3);

                if (config('app.env') != 'testing') {

                    for ($count = 0; $count < $initial; $count++) {
                        $comment = $user->comments()->make([
                            'rating' => rand(1, 5),
                            'body' => fake()->paragraphs(2, true),
                        ]);

                        $reviewer = User::inRandomOrder()->where('id', '!=', $user->id)->first();
                        if ($reviewer != null) {
                            $comment->reviewer()->associate($reviewer);
                            $comment->save();
                        }

                    }
                }
            });

        } catch (Exception $e) {

        }
    }

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        /* $country = Country::query()->where('iso2', 'US')->first(); */
        /* if ($country == null) { */
        /* $country = Country::factory()->create([ */
        /*     'name' => 'united states', */
        /* ]); */
        /* } */
        /* $state = State::query()->where('country_id', $country->id)->inRandomOrder()->first(); */

        /* if ($state == null) { */
        /*     $state = State::factory()->create([ */
        /*         'country_id' => fn () => $country->id, */
        /*     ]); */

        /* } */

        $state = State::query()->inRandomOrder()->first();
        $city = City::query()->inRandomOrder()->where('state_id', $state?->id)->first();
        while (! $state?->cities()->count() && $city == null) {

            $state = State::query()->inRandomOrder()->first();
            $city = City::query()->inRandomOrder()->where('state_id', $state?->id)->first();

            if ($city == null) {
                break;
                /* State::factory()->create([ */

                /* ]); */
                /* City::factory()->create([ */

                /* ]); */
            }

        }

        /* if ($state->cities()->count()) { */
        /* } */

        /* while ($city != null) { */
        /*     $city = $city */
        /* } */

        return [
            /* 'id' => rand(10000, 20000), */
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'company_name' => fake()->company(),
            'company_address' => fake()->address(),
            'company_established_on' => fake()->dateTimeBetween('-10 years', 'now'),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->unique()->phoneNumber(),
            'email_verified_at' => now(),
            'city' => 'city',
            'description' => fake()->paragraphs(5, true),
            'state_id' => $state?->id,
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'website' => fake()->unique()->url,
            'social_fb' => fake()->unique()->url,
            'social_tiktok' => fake()->unique()->url,
            'social_x' => fake()->unique()->url,
            'social_ig' => fake()->unique()->url,
            'enable_notification' => false,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

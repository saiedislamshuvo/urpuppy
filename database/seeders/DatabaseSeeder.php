<?php

namespace Database\Seeders;

use App\Models\Breed;
use App\Models\BreederRequest;
use App\Models\Plan;
use App\Models\Puppy;
use App\Models\Subscription;
use App\Models\User;
use Exception;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class DatabaseSeeder extends Seeder
{
    /*     Free Account */
    /* 3 days free */
    /* Upload up to 10 listing */
    /* 5 images per listing */
    /* 1 video per listing */

    /* Standard Package */
    /* $24.99 per month */
    /* Upload up to 10 listing */
    /* 5 images per listing */
    /* 1 video per listing */

    /* Premium Package */
    /* $69.99 Quarterly */
    /* Upload up to 10 listing */
    /* 5 images per listing */
    /* 1 video per listing */
    /* Appear on feature listing */

    /* Breeder Special */
    /* $179.99 Annually */
    /* Unlimited post */
    /* Upload up to 10 listing */
    /* 5 images per listing */
    /* 1 video per listing */
    /* Appear on feature listing */

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call(RoleSeeder::class);
        $this->call(WorldSeeder::class);

        if (! User::where('email', 'admin@urpuppy.com')->exists()) {
            $user = User::factory()->create([
                'first_name' => 'Yinka',
                'last_name' => 'Admin',
                'email' => 'admin@urpuppy.com',
                'password' => bcrypt('urpuppy12346'),
            ]);

            $user->assignRole('super_admin');
        }

        $this->call(PlanSeeder::class);

        Breed::factory()->times(20)->create();

        //CREATE BREEDER ACCOUNT
        $user = User::factory()->times(4)->create()->each(function ($user) {
            $user->assignRole('breeder');
            $user->is_breeder = true;
            $user->save();

            Subscription::factory()->create([
                'user_id' => $user->id,
                'stripe_status' => 'active',
                'type' => 'breeder',
                'stripe_price' => Plan::first()->stripe_plan_id,
                'ends_at' => now()->addDays(30),
                'quantity' => 1
            ]);

            $request = BreederRequest::factory()->create([
                'user_id' => $user->id,
                'message' => 'Approved',
                'status' => 'approved'
            ]);

            Puppy::factory()->create([
                'user_id' => $user->id,
                'status' => 'published'
            ]);

        });

        $user = User::factory()->times(1)->create()->each(function ($user) {
            $user->assignRole('breeder');
            $user->is_breeder = true;
            $user->save();

            Subscription::factory()->create([
                'user_id' => $user->id,
                'stripe_status' => 'active',
                'type' => 'breeder',
                'stripe_price' => Plan::first()->stripe_plan_id,
                'ends_at' => now()->addDays(30),
                'quantity' => 1
            ]);

            $request = BreederRequest::factory()->create([
                'user_id' => $user->id,
                'message' => 'Approved',
                'status' => 'approved'
            ]);

            $puppies = Puppy::factory()->times(4)->create([
                'user_id' => $user->id,
                'status' => 'published',
            ]);
            $breed = Breed::query()->inRandomOrder()->first();

            $puppies->each(function ($puppy) use ($breed) {
                $puppy->breeds()->attach($breed);

            });
        });






        //CREATE SELLER ACCOUNT
        $user = User::factory()->times(4)->create()->each(function ($user) {
            $user->assignRole('seller');
            $user->save();

            Subscription::factory()->create([
                'user_id' => $user->id,
                'stripe_status' => 'active',
                'type' => 'seller',
                'stripe_price' => Plan::first()->stripe_plan_id,
                'ends_at' => now()->addDays(30),
                'quantity' => 1
            ]);

            Puppy::factory()->create([
                'user_id' => $user->id,
                'status' => 'published'
            ]);
        });



        $this->call(PuppyPatternsSeeder::class);
        $this->call(PuppyColorsSeeder::class);
        $this->call(LoveSeeder::class);

    }
 }

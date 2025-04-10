<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\User;
use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Database\Seeder;

class NavigationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $user = User::query()->where('email', 'admin@urpuppy.com')->first();

        $breederDirectory = Page::create([
            'user_id' => $user->id,
            'title' => $name = 'Breeder Directory',
            'description' => 'Breeder Directory',
            'slug' => 'breeder-directory',
            'content' => 'Breeder Directory',
            'published_at' => now(),
            'post_type' => 'page',
            'ordering' => 3,
        ]);

        $homePage = Page::create([
            'user_id' => $user->id,
            'title' => $name = 'Home',
            'description' => 'Home description',
            'slug' => 'home',
            'content' => 'Home description',
            'published_at' => now(),
            'post_type' => 'page',
            'ordering' => 1,
        ]);

        $breedPage = Page::create([
            'user_id' => $user->id,
            'title' => $name = 'Breeds',
            'description' => 'Breeds',
            'published_at' => now(),
            'slug' => SlugService::createSlug(Page::class, 'slug', $name),
            'content' => 'Breeds',
            'post_type' => 'page',
            'ordering' => 2,
        ]);

        $planPage = Page::create([
            'user_id' => $user->id,
            'title' => $name = 'Plans',
            'description' => 'plans',
            'published_at' => now(),
            'slug' => SlugService::createSlug(Page::class, 'slug', $name),
            'content' => 'Plans',
            'post_type' => 'page',
            'ordering' => 4,
        ]);

        $about_us = '
        <h3><strong>UrPuppy.com</strong></h3><p><br></p><p>Are you ready to welcome a new furry friend into your life? Look no further than UrPuppy.com—the ultimate online destination for finding your perfect puppy! Our platform is designed to make your search not only easy but also enjoyable. With comprehensive information on every dog breed and access to our trusted local breeder directory, you can confidently connect with reputable breeders right in your area.</p><p><br></p><p>Why choose UrPuppy.com? Because we believe finding your new companion should be hassle-free! Our user-friendly interface and free access to listings empower you to explore a world of adorable puppies at your fingertips. Whether you have a specific breed in mind or are just starting your journey, UrPuppy.com is your dedicated partner in this exciting adventure.&nbsp;</p><p><br></p><p>Don’t wait any longer—start your search today and let us help you find the puppy of your dreams!</p>
        ';

        $page_about_us = Page::create([
            'user_id' => $user->id,
            'title' => $name = 'About us',
            'description' => 'plans',
            'published_at' => now(),
            'slug' => SlugService::createSlug(Page::class, 'slug', $name),
            'content' => $about_us,
            'post_type' => 'page',
            'ordering' => 4,
        ]);

        $items = [];

        $items[] = [
            'id' => str()->uuid(),
            'label' => 'Home',
            'type' => 'page_link',
            'data' => [
                'page_id' => $homePage->id,
            ],
            'children' => [],
        ];

        $items[] = [

            'id' => str()->uuid(),
            'label' => 'Breeds',
            'type' => 'page_link',
            'data' => [
                'page_id' => $breedPage->id,
            ],
            'children' => [],
        ];

        $items[] = [

            'id' => str()->uuid(),
            'label' => 'Breeders',
            'type' => 'page_link',
            'data' => [
                'page_id' => $breederDirectory->id,
            ],
            'children' => [],
        ];

        $items[] = [
            'id' => str()->uuid(),
            'label' => $page_about_us->title,
            'type' => 'page_link',
            'data' => [
                'page_id' => $page_about_us->id,
            ],
            'children' => [],
        ];

        /*         $items[] = [ */
        /*             'id' => str()->uuid(), */
        /*             'label' => 'Plan', */
        /*             'type' => 'page_link', */
        /*             'data' => [ */
        /*                 'page_id' => $planPage->id, */
        /*             ], */
        /*             'children' => [], */
        /*         ]; */

        /* Navigation::create([ */
        /*     'name' => 'Store', */
        /*     'handle' => 'store', */
        /*     'items' => $items, */
        /* ]); */

        /* Navigation::create([ */
        /*     'name' => 'Footer Links 1', */
        /*     'handle' => 'footer-links-1', */
        /*     'items' => $items */
        /* ]); */

    }
}

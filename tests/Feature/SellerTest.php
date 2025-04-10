<?php

use App\Models\PuppyPattern;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\withExceptionHandling;
use function PHPUnit\Framework\assertContains;
use function PHPUnit\Framework\assertEquals;

test('seller registration page doesnt work if not logged in', function () {
    get('/seller/create')->assertRedirect('/register');
});

test('seller registration page work if logged in', function () {

    $user = User::factory()->create();
    actingAs($user);
    get('/seller/create')->assertInertia()
        ->assertInertia(function (Assert $page) {
            $page->component('Seller/Registration');

        });
});

test('seller can register', function () {

    $user = User::factory()->create();
    actingAs($user);

    Storage::fake('public');

    $mockedImages = [
        UploadedFile::fake()->image('image1.jpg'),
        UploadedFile::fake()->image('image2.jpg'),
        UploadedFile::fake()->image('image3.jpg'),
        UploadedFile::fake()->image('image4.jpg'),
        UploadedFile::fake()->image('image5.jpg'),
    ];

    $mockedVideo = UploadedFile::fake()->create('video.mp4', 5000, 'video/mp4');

    get('/seller/create');

    withExceptionHandling();

    $post = post('/seller/store', [
        'first_name' => 'Andrew',
        'last_name' => 'Peroramas',
        'email' => 'wolfandrew307@gmail.com',
        'phone' => '1234567890',
        'website' => 'andrew.com',
        'social_fb' => fake()->url(),
        'social_ig' => fake()->url(),
        'social_tiktok' => fake()->url(),
        'social_x' => fake()->url(),
        'city' => 1,
        'state_id' => 1,
        'zip_code' => '1023',
        'puppy_name' => 'Puppy Test',
        'puppy_gender' => 'Male',
        'puppy_price' => 1000,
        'puppy_about' => 'Ako is puppy',
        'puppy_birth_date' => '2023-01-01',
        'pattern_id' => PuppyPattern::factory()->create()->id,
        'has_vaccine' => true,
        'has_health_certificate' => true,
        'has_vet_exam' => true,
        'has_travel_ready' => true,
        'has_delivery_included' => true,
        'images' => $mockedImages,
        'video' => $mockedVideo,
    ]);

    $post->assertSessionHas('success', 'Puppy created successfully');
    $puppy = $user->puppies->first();

    assertEquals($puppy->images->count(), 5);
    assertContains('video.mp4', explode('/', $puppy->video));
    assertEquals($puppy->name, 'Puppy Test');
});

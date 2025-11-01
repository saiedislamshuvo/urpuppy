<?php

use App\Models\Puppy;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

test('shows the breeder listings page', function () {

    $user = User::factory()->create();
    $user->puppies()->saveMany(Puppy::factory()->times(13)->create());

    actingAs($user);

    get('/breeder-listings')
        ->assertInertia(function (Assert $page) {
            $page->component('BreederListing/Index');
            $page->has('listings.data', 10);
        });
});

test('show breeder listing create page', function () {

    $user = User::factory()->create();
    $user->puppies()->saveMany(Puppy::factory()->times(13)->create());

    actingAs($user);

    get('/breeder-listings/create')
        ->assertInertia(function (Assert $page) {
            $page->component('BreederListing/Create');
        });

});

<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\get;

test('shows the breeders page', function () {

    User::factory()->times(20)->create([
        'is_breeder' => true,
    ]);

    get('/breeders')
        ->assertInertia(function (Assert $page) {
            $page->component('Breeders/Index');
            $page->has('breeders.data', 10);
        });
});

test('show single breeders page', function () {

    $data = User::factory()->times(1)->create([
        'is_breeder' => true,
    ]);
    $single = $data->first();

    get('/breeders/'.$single->slug)
        ->assertInertia(function (Assert $page) {
            $page->component('Breeders/Show');
        });

});

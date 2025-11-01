<?php

use App\Models\Breed;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\get;

test('shows the breeds page', function () {

    Breed::query()->delete();
    Breed::factory()->create([
        'name' => 'Pomeranian',
    ]);

    Breed::factory()->create([
        'name' => 'Bameranian',
    ]);

    Breed::factory()->create([
        'name' => 'Aameranian',
    ]);

    Breed::factory()->create([
        'name' => 'Axmeranian',
    ]);

    Breed::factory()->create([
        'name' => 'Axveranian',
    ]);

    get('/breeds')
        ->assertInertia(function (Assert $page) {
            $page->component('Breed/Index');
            $page->has('breeds', 3);
        });
});

test('show single breed page', function () {

    $puppies = Breed::factory()->times(1)->create();
    $puppy = $puppies->first();

    get('/breeds/'.$puppy->slug)
        ->assertInertia(function (Assert $page) {
            $page->component('Breed/Show');
        });

});

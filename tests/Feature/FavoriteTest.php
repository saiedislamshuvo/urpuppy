<?php

use App\Models\Puppy;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\patch;
use function PHPUnit\Framework\assertNull;
use function PHPUnit\Framework\assertTrue;

it('shows favorites list', function () {

    $user = User::factory()->create();
    actingAs($user);

    get('/favorites')->assertStatus(200);

    get('/favorites')->assertInertia(function ($page) {
        $page->has('favorites', 13);
        $page->component('Favorite/Index');
    });
});

it('can toggle favorite', function () {
    $user = User::factory()->create();
    actingAs($user);

    $puppy = Puppy::factory()->create();

    $p = patch('/favorites/'.$puppy->id);
    $p->assertSessionHas('message.success', 'Added to favorites');

    $p = patch('/favorites/'.$puppy->id);
    $p->assertSessionHas('message.success', 'Removed from favorites');
});

test('homepage fetches puppies with favorites', function () {
    $user = User::factory()->create();
    actingAs($user);

    $puppy = Puppy::factory()->create();

    $p = patch('/favorites/'.$puppy->id);

    get('/')->assertInertia(function (Assert $page) {
        assertTrue($page->toArray()['props']['new_arrivals'][0]['is_favorite']);
        assertTrue($page->toArray()['props']['top_pick_puppy']['is_favorite']);
        assertTrue($page->toArray()['props']['puppy_spotlights'][0]['is_favorite']);
    });

    $p = patch('/favorites/'.$puppy->id);

    get('/')->assertInertia(function (Assert $page) {
        assertNull($page->toArray()['props']['new_arrivals'][0]['is_favorite']);
        assertNull($page->toArray()['props']['top_pick_puppy']['is_favorite']);
        assertNull($page->toArray()['props']['puppy_spotlights'][0]['is_favorite']);
    });

});

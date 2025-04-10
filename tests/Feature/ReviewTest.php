<?php

use App\Models\Puppy;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

it('post a review', function () {

    $current_user = User::factory()->create();
    actingAs($current_user);

    $puppy = Puppy::factory()->create();

    get('/puppies/'.$puppy->slug)->assertOk();

    /* dd($puppy->breeder); */

    $comment = post('/comment/'.$puppy->breeder->id, [
        'body' => 'nice puppy',
        'rating' => 4,
    ]);

    /* dd($puppy->comments()->get()); */

    /* dd($comment); */

    $comment->assertSessionHas('message.success', 'Review submitted successfully');

});

it('does not allow user to review twice', function () {

    $current_user = User::factory()->create();
    actingAs($current_user);

    $puppy = Puppy::factory()->create();

    get('/puppies/'.$puppy->slug)->assertOk();

    post('/comment/'.$puppy->breeder->id, [
        'body' => 'nice puppy',
        'rating' => 4,
    ])->tap(function ($response) use ($puppy) {

        $last_comment = post('/comment/'.$puppy->breeder->id, [
            'body' => 'nice puppy',
            'rating' => 5,
        ]);

        $last_comment->assertSessionHas('message.error', 'You can only submit one review per breeder');

    });

});

it('sellers cannot review themselves', function () {

    $current_user = User::factory()->create();
    actingAs($current_user);

    $puppy = Puppy::factory()->create([
        'user_id' => $current_user->id,
    ]);

    get('/puppies/'.$puppy->slug)->assertOk();

    $comment = post('/comment/'.$puppy->breeder->id, [
        'body' => 'nice puppy',
        'rating' => 4,
    ]);

    $comment->assertSessionHas('message.error', 'You cannot review yourself');
});

it('cannot review if not logged in', function () {

    /* $current_user = User::factory()->create(); */
    /* actingAs($current_user); */

    $puppy = Puppy::factory()->create();

    get('/puppies/'.$puppy->slug)->assertOk();

    $comment = post('/comment/'.$puppy->breeder->id, [
        'body' => 'nice puppy',
        'rating' => 4,
    ]);

    $comment->assertSessionHas('message.error', 'You have to login first');
});

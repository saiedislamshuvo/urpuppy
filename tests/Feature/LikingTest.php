<?php

use App\Models\Post;
use App\Models\User;
use Cog\Laravel\Love\ReactionType\Models\ReactionType;

test('test liking on blog', function () {

    \Artisan::call('migrate');

    ReactionType::query()->firstOrCreate([
        'name' => 'Like',
    ]);

    $user = User::factory()->create();
    /* $user->registerAsLoveReacter(); */
    $reacterFacade = $user->viaLoveReacter();

    /* $user->registerAsLoveReacter(); */

    $post = Post::factory()->create();
    $reacterFacade->reactTo($post, 'Like');

    dd($post->like_count);
});

<?php

use App\Models\Breed;
use Laravel\Dusk\Browser;

test('basic example', function () {
    Breed::query()->delete();
    $breed = Breed::factory()->times(5)->create();
    $this->browse(function (Browser $browser) {
        $browser->visit('/')
            ->assertSee('Find Ur Perfect Puppy Today!')
            ->pause(1000)
            ->screenshot('index')
            ->scrollTo('footer')
            ->pause(1000)
            ->screenshot('footer');
    });
});

<?php

use function Pest\Laravel\get;

it('shows the plans page', function () {
    get('/plans')
        ->assertStatus(200);

    get('/plans')->assertInertia(function ($page) {
        $page->component('Plan/Index');
    });
});

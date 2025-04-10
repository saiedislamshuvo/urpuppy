<?php

use App\Models\Puppy;

test('registration screen can be rendered', function () {

    Puppy::factory()->create();
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    $response = $this->post('/register', [
        'first_name' => 'Andrew',
        'is_seller' => false,
        'last_name' => 'Pero',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('home', absolute: false));
});

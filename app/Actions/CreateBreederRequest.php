<?php

namespace App\Actions;

use App\Models\BreederRequest;
use App\Models\User;

class CreateBreederRequest
{
    public function handle(User $user, array $data): BreederRequest
    {
        $breeder_request = BreederRequest::create([
            ...$data,
            'user_id' => $user->id,
        ]);

        return $breeder_request;
        /* return $user->breeder_requests()->create($data); */
    }
}

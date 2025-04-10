<?php

namespace App\Actions;

use App\Models\Puppy;
use App\Models\User;

class CreatePuppy
{
    public function handle(User $user, array $data): Puppy
    {
        /* return $user->puppies()->create($data); */
    }
}

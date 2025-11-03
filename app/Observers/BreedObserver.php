<?php

namespace App\Observers;

use App\Models\Breed;
use App\Models\User;
use Hashids\Hashids;

class BreedObserver
{
    public function deleting(Breed $breed)
    {
        $breed->users()->detach();
    }

    public function saved(Breed $breed)
    {
        cache()->flush();
    }
}

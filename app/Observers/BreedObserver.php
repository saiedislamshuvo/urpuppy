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
        /* if ($user->hasStripeId()) { */
        /*     $user->syncStripeCustomerDetails(); */
        /* } */
    }

    /*     public function created(User $user) */
    /*     { */
    /*         $hashids = new Hashids('urpuppy449958', 10); */
    /*         $id = $hashids->encode($user->id); */

    /*         $user->slug = str()->slug($user->name) . '-' . $id; */
    /*         $user->save(); */
    /*     } */
}

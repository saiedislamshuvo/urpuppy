<?php

namespace App\Observers;

use App\Models\Puppy;
use Illuminate\Support\Facades\Cache;

class PuppyObserver
{
    public function updated(Puppy $user)
    {
        /* Cache::flush(); */
    }

    public function created(Puppy $puppy) {}
}

<?php

namespace App\Observers;

use App\Models\Puppy;
use Illuminate\Support\Facades\Cache;

class PuppyObserver
{
    public function updated(Puppy $puppy) {}

    public function created(Puppy $puppy) {}
}

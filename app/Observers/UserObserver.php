<?php

namespace App\Observers;

use App\Models\User;
use Hashids\Hashids;
use Illuminate\Support\Facades\Cache;

class UserObserver
{
    public function updated(User $user)
    {
        if ($user->hasStripeId()) {
            try {
                $user->syncStripeCustomerDetails();
            } catch (\Exception $e) {
                $user->stripe_id = null;
                $user->save();
                $user->createAsStripeCustomer();
            }
        }

        Cache::flush();
    }

    public function created(User $user)
    {
        $hashids = new Hashids('urpuppy449958', 10);
        $id = $hashids->encode($user->id);

        $user->slug = str()->slug($user->name).'-'.$id;
        $user->save();
        $user->createOrGetStripeCustomer();
    }
}

<?php

namespace App\Models;

use Carbon\Carbon;
use Laravel\Cashier\Subscription as CashierSubscription;

class Subscription extends CashierSubscription
{
    protected $appends = [
        'trial_ends',
    ];

    protected $fillable = [
        'card_fingerprint',
    ];

    public function plan()
    {
        return $this->belongsTo(Plan::class, 'stripe_price', 'stripe_plan_id');
    }

    public function getTrialEndsAttribute()
    {
        return $this->trial_ends_at ? Carbon::parse($this->trial_ends_at)->diffForHumans() : null;
    }

    public function cancelSubscription()
    {
        return $this->cancel();
    }
}

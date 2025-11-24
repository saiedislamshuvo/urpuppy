<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RefundRequest extends Model
{
    protected $fillable = ['user_id', 'subscription_id', 'message', 'status'];

    public function subscription()
    {
        return $this->belongsTo(Subscription::class, 'subscription_id')->with('plan');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

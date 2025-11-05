<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Compare extends Model
{
    protected $fillable = [
        'user_id',
        'compareable_id',
        'compareable_type',
    ];

    public function compareable(): MorphTo
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}


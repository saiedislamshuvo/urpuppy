<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class SavedSearch extends Model
{
    protected $fillable = ['user_id', 'payload', 'name'];

    protected $casts = [
        'payload' => 'array',
    ];

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('M d, Y').', at '.Carbon::parse($value)->format('h:i a');
    }

    public function getPayloadAttribute($value)
    {
        return (array) json_decode($value);
    }
}

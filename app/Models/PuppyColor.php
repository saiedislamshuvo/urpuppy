<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PuppyColor extends Model
{
    /** @use HasFactory<\Database\Factories\PuppyColorFactory> */
    use HasFactory;

    protected $guarded = [];

    public function puppies()
    {
        return $this->belongsToMany(Puppy::class);
    }
}

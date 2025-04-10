<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Nnjeim\World\Models\Country as ModelsCountry;

class Country extends ModelsCountry
{
    use HasFactory;
    /* use SoftDeletes; */

    protected $fillable = [
        'id', 'name', 'status', 'iso2', 'phone_code', 'iso3', 'region', 'subregion',
    ];

    public function states(): HasMany
    {
        return $this->hasMany(State::class);
    }

    public function getNameAttribute($name)
    {
        return ucfirst($name);
    }
}

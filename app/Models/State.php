<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use Nnjeim\World\Models\State as ModelsState;

class State extends ModelsState
{
    use HasFactory;
    /* use Searchable; */
    /* use Sluggable; */
    /* use SoftDeletes; */

    protected $fillable = [
        'id', 'country_id', 'name', 'status',
        'abbreviation'];

    /* public function sluggable(): array */
    /* { */
    /*     return [ */
    /*         'slug' => [ */
    /*             'source' => 'name', */
    /*         ], */
    /*     ]; */
    /* } */

    public function toSearchableArray()
    {
        $array = $this->toArray();

        $array['id'] = (string) $array['id'];
        $array['name'] = strtolower($array['name']);

        /* return array_map('strtolower', $array); */

        return $array;
    }

    /* public function cities(): HasMany */
    /* { */
    /*     return $this->hasMany(City::class); */
    /* } */

    /* public function country(): BelongsTo */
    /* { */
    /*     return $this->belongsTo(Country::class); */
    /* } */

    /* public function getNameAttribute($name) */
    /* { */
    /*     return ucwords($name); */
    /* } */
}

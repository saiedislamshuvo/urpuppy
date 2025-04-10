<?php

namespace App\Models;

use Carbon\Carbon;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use Nnjeim\World\Models\City as ModelsCity;

class City extends ModelsCity
{
    use Sluggable;
    /* use Searchable; */

    public function toSearchableArray()
    {
        $array = $this->toArray();

        $array['id'] = (string) $array['id'];
        $array['name'] = $array['name'];
        /* $array['created_at'] = (int) Carbon::parse($array['created_at'])->timestamp; */

        return $array;
    }

    /* use SoftDeletes; */

    protected $fillable = [
        'id', 'state_id', 'name', 'status',
    ];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name',
            ],
        ];
    }

    public function state(): BelongsTo
    {
        return $this->belongsTo(State::class);
    }

    public function getNameAttribute($name)
    {
        return ucwords($name);
    }
}

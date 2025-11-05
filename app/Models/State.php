<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Nnjeim\World\Models\State as ModelsState;

class State extends ModelsState
{
    use HasFactory;

    protected $fillable = [
        'id', 'country_id', 'name', 'status', 'abbreviation', 'country_code',
    ];

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function toSearchableArray()
    {
        $array = $this->toArray();

        $array['id'] = (string) $array['id'];
        $array['name'] = strtolower($array['name']);
        
        return $array;
    }

}

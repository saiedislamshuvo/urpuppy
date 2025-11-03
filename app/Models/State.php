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

    protected $fillable = [
        'id', 'country_id', 'name', 'status',
        'abbreviation'];

    public function toSearchableArray()
    {
        $array = $this->toArray();

        $array['id'] = (string) $array['id'];
        $array['name'] = strtolower($array['name']);
        
        return $array;
    }

}

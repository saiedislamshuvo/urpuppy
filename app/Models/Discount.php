<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use Sluggable;
    /** @use HasFactory<\Database\Factories\DiscountFactory> */
    use HasFactory;
    protected $guarded = [
        'id'
    ];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name',
            ],
        ];
    }
    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}

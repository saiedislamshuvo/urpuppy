<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /** @use HasFactory<\Database\Factories\ReviewFactory> */
    use HasFactory;

    use \Staudenmeir\LaravelAdjacencyList\Eloquent\HasRecursiveRelationships;

    protected $guarded = [
        'id',
    ];

    protected $appends = ['date'];

    public function seller()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function getDateAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function getReviewOnAttribute()
    {
        return $this->created_at->diffForHumans();
    }
}

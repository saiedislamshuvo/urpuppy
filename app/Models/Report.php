<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    /** @use HasFactory<\Database\Factories\ReportFactory> */
    use HasFactory;

    protected $fillable = ['puppy_id', 'reason', 'user_id'];

    public function puppy()
    {
        return $this->belongsTo(Puppy::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

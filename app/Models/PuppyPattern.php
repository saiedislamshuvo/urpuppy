<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PuppyPattern extends Model
{
    /** @use HasFactory<\Database\Factories\PuppyPatternFactory> */
    use HasFactory;

    protected $fillable = ['name'];
}

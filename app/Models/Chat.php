<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Chat extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'created_by',
        'created_for',
        'puppy_id',
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function createdFor()
    {
        return $this->belongsTo(User::class, 'created_for');
    }

    public function puppy()
    {
        return $this->belongsTo(Puppy::class);
    }

    public function messages()
    {
        return $this->hasMany(ChatMessage::class);
    }

    public function attachments()
    {
        return $this->hasMany(ChatAttachment::class);
    }

    public function lastMessage()
    {
        return $this->hasOne(ChatMessage::class)->latestOfMany();
    }
}

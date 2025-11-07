<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatAttachment extends Model
{
    use HasFactory;

    protected $fillable = [
        'chat_id',
        'chat_message_id',
        'file_path',
        'file_name',
        'file_size',
        'mime_type',
    ];

    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }

    public function message()
    {
        return $this->belongsTo(ChatMessage::class, 'chat_message_id');
    }
}

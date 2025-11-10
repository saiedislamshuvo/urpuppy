<?php

namespace App\Enum;

enum PuppyStatus: string
{
    case DRAFT = 'draft';
    case PUBLISHED = 'published';
    case SOLD = 'sold';
    case PAUSED = 'paused';
}

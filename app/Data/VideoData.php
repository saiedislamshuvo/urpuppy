<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class VideoData extends Data
{
    public function __construct(
        public string $title,
        public string $url,
        public ?string $video_thumbnail,
    ) {}
}

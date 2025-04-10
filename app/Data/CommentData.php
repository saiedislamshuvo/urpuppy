<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CommentData extends Data
{
    public function __construct(
        public int $rating,
        public string $body,
        public ?UserCommentData $reviewer,
        public string $review_on,
    ) {}
}

#[TypeScript]
class UserCommentData extends Data
{
    public function __construct(
        public string $full_name,
        public string $avatar,
        public string $initial_name
    ) {}
}

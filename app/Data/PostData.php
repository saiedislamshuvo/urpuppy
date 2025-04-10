<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PostData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public string $slug,
        public ?string $excerpt,
        public string $banner_url,
        public int $like_count,
        public int $unlike_count,
        public string $content,
        public int $view_count,
        public string $published_at,
        public string $published_at_formatted,
        public AuthorData $author,
        public PostCategoryData $category,
        /** @var \App\Data\CommentData[] */
        public ?DataCollection $comments,

    ) {}
}

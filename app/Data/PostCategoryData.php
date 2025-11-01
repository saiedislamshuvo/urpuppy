<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PostCategoryData extends Data
{
    public function __construct(
        public string $name,
        public string $slug,
        public string $description,
        public bool $is_visible,
    ) {}
}

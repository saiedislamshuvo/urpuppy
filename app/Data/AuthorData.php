<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class AuthorData extends Data
{
    public function __construct(
        public string $name,
        public string $email,
        public string $photo_url,
    ) {}
}

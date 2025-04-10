<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PuppySiblingData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        public string $image,
        public string $gender,
    ) {}
}

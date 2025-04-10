<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PuppyColorData extends Data
{
    public function __construct(
        public string $color,
        public string $name,
    ) {}
}

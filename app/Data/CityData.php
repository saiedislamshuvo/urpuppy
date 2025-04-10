<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CityData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
    ) {}
}

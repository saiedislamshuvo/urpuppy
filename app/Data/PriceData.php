<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PriceData extends Data
{
    public function __construct(
        public int $amount,
        public string $currency,
        public string $formatted,
    ) {}
}

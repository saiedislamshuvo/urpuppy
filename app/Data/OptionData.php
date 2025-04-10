<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class OptionData extends Data
{
    public function __construct(
        #[MapInputName('id')]
        public int $value,
        #[MapInputName('name')]
        public string $label,
    ) {}
}

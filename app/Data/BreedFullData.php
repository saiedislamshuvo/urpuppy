<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class BreedFullData extends Data
{
    public function __construct(
        public string $name,
        public string $slug,
        public string $image,
        public ?string $history_description,
        public ?string $size_description,
        public ?string $coat_description,
        public ?string $temperament_description,
        public ?string $lifestyle_description,
        public ?string $activities_description
    ) {}
}

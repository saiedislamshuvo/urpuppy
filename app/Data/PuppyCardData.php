<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PuppyCardData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        public string $image,
        public string $gender,
        public string $formatted_price,
        public ?bool $is_favorite,
        public ?bool $is_compared,
        public ?bool $is_new,
        public string $age,
        public int $view_count,
        /** @var \App\Data\BreedData[] */
        public DataCollection $breeds,

        public BreederData $seller,
    ) {}

    public function setIsFavorite(bool $isFavorite): self
{
    $this->is_favorite = $isFavorite;
    return $this;
}

    public function setIsCompared(bool $isCompared): self
{
    $this->is_compared = $isCompared;
    return $this;
}
}

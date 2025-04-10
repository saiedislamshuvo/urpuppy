<?php

namespace App\Data;

use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PuppyData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        public string $gender,
        public ?bool $is_favorite,
        public int $price,
        /* public string $breed, */
        /** @var \App\Data\BreedData[] */
        public DataCollection $breeds,
        public string $image,
        /** @var string[] */
        public Collection $preview_images,
        public ?string $video,
        public string $description,
        public string $formatted_price,
        public string $patterns,
        public int $view_count,
        public ?bool $is_new,
        public string $age,
        public BreederData $seller,
        /** @var \App\Data\PuppyColorData[] */
        public ?DataCollection $puppy_colors,
        public ?string $published_at,

        /** @var string[] */
        public ?Collection $features,

        /** @var string[] */
        public ?Collection $characteristics,

    ) {}
}

<?php

namespace App\Data;

use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PuppyEditData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        public string $gender,
        public ?bool $is_favorite,
        public int $price,
        public string $birth_date,
        /* public string $breed, */
        /** @var \App\Data\OptionData[] */
        public DataCollection $breeds,
        /* public string $image, */
        /** @var string[] */
        public Collection $preview_images,
        public string $description,
        public string $formatted_price,
        public string $patterns,
        public int $view_count,
        public string $age,
        public BreederData $seller,
        /** @var \App\Data\OptionData[] */
        public ?DataCollection $puppy_colors,

        /** @var \App\Data\OptionData[] */
        public ?DataCollection $puppy_patterns,

        public ?string $video,

        /** @var \App\Data\OptionData[] */
        public ?DataCollection $siblings,
        public ?string $published_at,

        /** @var string[] */
        public ?Collection $features,

        /** @var string[] */
        public ?Collection $characteristics,

        public bool $has_vaccine,
        public bool $has_health_certificate,
        public bool $has_vet_exam,
        public bool $has_delivery_included,
        /* public bool $are_you_a_breeder, */
        public bool $has_travel_ready,

    ) {}
}

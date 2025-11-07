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
        public ?bool $is_compared,
        public int $price,
        public ?string $birth_date,
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
        /** @var \App\Data\PuppyTraitData[] */
        public ?DataCollection $puppy_traits,
        public ?string $published_at,

        /** @var string[] */
        public ?Collection $features,

        /** @var string[] */
        public ?Collection $characteristics,

        public ?string $seo_title,
        public ?string $seo_description,

        public ?bool $has_vaccine = false,
        public ?bool $has_health_certificate = false,
        public ?bool $has_vet_exam = false,
        public ?bool $has_travel_ready = false,
        public ?bool $has_delivery_included = false,
        public ?bool $has_certificate = false,
        public ?string $certificate_type = null,
        public ?string $certificate_document_url = null,

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

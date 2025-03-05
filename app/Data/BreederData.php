<?php

namespace App\Data;

use App\PuppyStatus;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;




#[TypeScript]
class BreederData extends Data
{

    public function __construct(
        public int $id,
        public string $full_name,
        public string $avatar,
        public string $slug,
        public string $email,
        public ?string $phone,
        public ?string $phone_formatted,
        public ?string $address,
        public ?string $short_address = "",
        public string $member_since,
        /** @var \App\Data\BreedDataCollection[] */
        public ?DataCollection $breeds,

        public bool $is_breeder,
        public ?string $social_fb,
        public ?string $social_tiktok,
        public ?string $social_x,
        public ?string $social_ig,
        public ?string $website,

        public ?string $kennel_name,
        public ?string $company_address,
        public ?string $company_established_on_label,
        public ?string $company_logo
    ) {


    }
}


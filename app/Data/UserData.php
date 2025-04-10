<?php

namespace App\Data;

use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class UserData extends Data
{
    public function __construct(
        public int $id,
        public string $full_name,
        public string $first_name,
        public string $last_name,
        public string $avatar,
        public string $slug,
        public string $email,
        public ?string $phone,
        public ?string $city,
        /* public ?StateData $state, */
        public ?string $zip_code,
        public ?string $address,
        public ?string $short_address,
        public string $initial_name,
        public ?string $email_verified_at,
        public string $member_since,
        public ?bool $profile_completed,
        public ?string $social_fb,
        public ?string $social_ig,
        public ?string $social_tiktok,
        public ?string $social_x,
        /** @var string[] */
        public ?Collection $roles,
        public bool $enable_notification,
        public ?SubscriptionData $premium_plan,
        public ?SubscriptionData $breeder_plan,
        /** @var \App\Data\OptionData[] */
        public DataCollection $breeds,
        public ?string $kennel_name,
        /* public ?StateData $company_state, */
        public ?string $company_city,
        public ?string $company_zip_code,
        public ?string $company_about,
        public ?string $company_phone,
        public ?string $company_state,
        public ?string $company_name,
        public ?string $company_email_address,
        public ?string $gmap_address,
        public ?string $company_address,
        public bool $has_usda_registration,
        public ?string $company_address_formatted,
        public ?string $trial_ends_at,
        public ?string $company_established_on,
        public ?string $company_logo,
        public ?string $video,
        /** @var string[] */
        public Collection $gallery,
    ) {}
}

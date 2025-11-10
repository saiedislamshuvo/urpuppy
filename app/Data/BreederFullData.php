<?php

namespace App\Data;

use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class BreederFullData extends Data
{
    public function __construct(
        public int $id,
        public string $full_name,
        public string $first_name,
        public string $avatar,
        public string $slug,
        public ?string $address,
        public bool $is_breeder,
        public bool $is_seller,
        public ?string $company_logo,
        public ?string $video,
        public string $member_since,

        public ?string $company_name,
        public ?string $company_address,
        public ?string $company_about,
        public ?string $company_email_address,
        public ?string $company_phone,
        public ?string $company_city,
        public ?string $company_state,
        public ?string $company_short_state,
        public ?string $company_street,
        public ?string $company_house_no,
        public ?string $company_zip_code,
        public ?string $company_established_on,
        public ?string $company_established_on_label,
        public ?bool $has_usda_registration,

        // Base user fields for fallback
        public ?string $street,
        public ?string $city,
        public ?string $state,
        public ?string $short_state,
        public ?string $zip_code,

        public ?string $website,
        public ?string $phone,
        public string $email,
        public ?string $social_fb,
        public ?string $social_tiktok,
        public ?string $social_x,
        public ?string $social_ig,
        public ?string $video_thumbnail,

        public ?string $description,

        /* @var string[] */
        public Collection $breeds,

        /* @var string[] */
        public Collection $gallery,

        /** @var \App\Data\CommentData[] */
        public ?DataCollection $comments,

        public ?string $seo_title,
        public ?string $seo_description,
    ) {}
    public static function prepareForPipeline(array $payload): array
    {
        // ZIP: only first 5 digits (remove "-6522")
        if (!empty($payload['company_zip_code'])) {
            $payload['company_zip_code'] = explode('-', $payload['company_zip_code'])[0];
        }

        // Address se ZIP+4 remove
        if (!empty($payload['company_address'])) {
            $payload['company_address'] = preg_replace('/-\d{4}/', '', $payload['company_address']);
        }

        return $payload;
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'trial_days' => $this->trial_days,
            'interval' => $this->interval,
            'interval_count' => $this->interval_count,
            'details' => [
                [
                    'name' => 'Listings',
                    'count' => $this->listing_limit,
                ],
                [
                    'name' => 'Images',
                    'count' => $this->image_per_listing,
                ],
                [
                    'name' => 'Video',
                    'count' => $this->video_per_listing,
                ],
            ],
            /* 'special_features' => [ */
            /*     [ */
            /*         'name' => 'Featured post', */
            /*         'active' => $this->is_featured, */
            /*     ], */
            /*     [ */
            /*         'name' => 'Breeders directory', */
            /*         'active' => $this->is_breeder, */
            /*     ], */
            /* ], */
        ];
    }
}

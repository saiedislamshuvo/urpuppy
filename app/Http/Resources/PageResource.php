<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'slug' => $this->slug,
            'content' => $this->getContent(),
            'seo' => [
                'description' => $this->description,
            ],
            'featured_image' => $this->featured_image,
        ];
    }
}

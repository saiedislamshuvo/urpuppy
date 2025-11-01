<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'content' => $this->content,
            'published_at' => $this->published_at->diffForHumans(),
            'slug' => $this->slug,
            'title' => $this->title,
            'featured_image' => $this->media()->first()?->getUrl() ?? asset('logo.png'),
        ];
    }
}

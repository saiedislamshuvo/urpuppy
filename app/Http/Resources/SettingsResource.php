<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'site_name' => $this->site_name ?? config('app.name'),
            'site_description' => $this->site_description ?? '',
            'theme_color' => $this->theme_color ?? '',

            'support_email' => $this->support_email ?? '',
            'support_phone' => $this->support_phone ?? '',

            'site_logo' => $this->site_logo ?? '',
            'site_favicon' => $this->site_favicon ?? '',
            'seo' => [
                'seo_title' => $this->seo_title ?? '',
                'seo_keywords' => $this->seo_keywords ?? '',
                'seo_metadata' => $this->seo_metadata ?? '',
            ],
            'social_network' => $this->social_network ?? [],
            'more_configs' => @$this?->more_configs ? CustomSettingsResource::make((object) $this->more_configs) : [],
        ];
    }
}

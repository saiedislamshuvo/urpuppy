<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomSettingsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'footer_text' => @$this->footer_text,
            'footer_1_content' => @$this->footer_1_content,
            'announcement_status' => @$this->announcement_status,
            'announcement_message' => @$this->announcement_message,
            /* 'announcement_color' => @$this->announcement_color, */
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class SellerRegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(Request $request): array
    {
        $user = $request->user();
        $rules = [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'phone' => ['nullable', 'string', 'max:100'],
            'website' => ['nullable', 'max:100', 'url'],
            'social_fb' => ['nullable', 'string', 'max:100', 'url'],
            'social_ig' => ['nullable', 'string', 'max:100', 'url'],
            'social_tiktok' => ['nullable', 'string', 'max:100', 'url'],
            'social_x' => ['nullable', 'string', 'max:100', 'url'],
            'zip_code' => ['nullable', 'string', 'max:20'],
        ];

        // If profile is not completed, require phone
        if (! $request->user()->profile_completed) {
            $rules['phone'] = ['required', 'string', 'max:100', 'regex:/^\+?[1-9]\d{1,14}$/'];
        }
        
        // gmap_payload is optional
        $rules['gmap_payload'] = ['nullable'];

        return $rules;
    }

    public function messages()
    {
        return [
            'phone.required' => 'Phone number is required.',
            'social_fb.url' => 'Please enter a valid Facebook URL.',
            'social_ig.url' => 'Please enter a valid Instagram URL.',
            'social_tiktok.url' => 'Please enter a valid TikTok URL.',
            'social_x.url' => 'Please enter a valid X URL.',
        ];
    }
}

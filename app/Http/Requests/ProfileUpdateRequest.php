<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(Request $request): array
    {
        $rules = [
            'first_name' => ['string', 'max:40'],
            'last_name' => ['string', 'max:40'],
            'avatar' => ['nullable', 'max:4096'],
            'current_password' => ['nullable',  'current_password'],
            'new_password' => ['nullable', 'string', 'min:8', 'confirmed'],

            'social_fb' => ['', 'max:100'],
            'enable_notification' => [''],
            'social_ig' => ['', 'max:100'],
            'social_tiktok' => ['', 'max:100'],
            'social_x' => ['', 'max:100'],
            'gmap_payload' => [''],
            'phone' => ['', 'max:20'],
            'email' => [
                'string',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];

        $user = $request->user();

        if ($user?->is_breeder) {
            $rules['kennel_name'] = ['required', 'string', 'max:100', 'blasp_check'];
            $rules['company_email_address'] = ['required', 'max:100'];
            $rules['company_name'] = ['required', 'max:100', 'blasp_check'];
            $rules['company_about'] = ['required', 'string', 'max:255', 'min:40', 'blasp_check'];
            $rules['has_usda_registration'] = [''];
            $rules['company_established_on'] = ['required'];
            $rules['company_logo'] = [''];
        }

        return $rules;
    }
}

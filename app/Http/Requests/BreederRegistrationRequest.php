<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BreederRegistrationRequest extends FormRequest
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
    public function rules(): array
    {
        $rules = [
            'fullname' => ['required', 'string', 'max:100', 'blasp_check'],
            'kennel_name' => ['required', 'string', 'max:100', 'blasp_check'],
            'gmap_payload' => ['nullable'],
            'company_phone' => ['required', 'string', 'max:20', 'regex:/^\+?[1-9]\d{1,14}$/'], // Phone number validation
            /* 'company_address' => ['required', 'string', 'max:255'], */
            'company_email_address' => ['required', 'email', 'string', 'max:100'],
            /* 'city' => ['required', 'string', 'max:100'], */
            /* 'state_id' => ['required', 'integer', 'exists:states,id'], // Ensure state_id exists in the states table */
            /* 'zip_code' => ['required', 'string'], // Validate US zip code format */
            'breeds' => ['required', 'array', 'max:4'], // Limit breeds to a maximum of 4
            /* 'breeds.*' => ['exists:breeds,id'], // Ensure each breed exists in the breeds table */
            'established_date' => ['required', 'date', 'before_or_equal:today'], // Validate date format
            'about_company' => ['required', 'string', 'max:10055', 'min:40'],

            'has_usda_registration' => ['nullable'], // Optional boolean field
            'company_logo' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:12048'],
            'gallery' => ['nullable', 'array', 'max:10'], // Limit gallery to a maximum of 10 images (optional)
            'gallery.*' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg',
                'max:12048', // 2MB max per image
            ],

            'videos' => ['nullable', 'array', 'max:3'], // Limit videos to a maximum of 3
            'videos.*' => [
                'mimes:mpeg,mp4,ogg,webm,mov,avi',
                'max:51200', // 50MB max per video
            ],
            
            // Location fields (optional)
            'location_lat' => ['nullable', 'numeric', 'between:-90,90'],
            'location_lng' => ['nullable', 'numeric', 'between:-180,180'],
            'location_address' => ['nullable', 'string', 'max:255'],
            'location_city' => ['nullable', 'string', 'max:100'],
            'location_street' => ['nullable', 'string', 'max:255'],
            'location_house_no' => ['nullable', 'string', 'max:50'],
            'location_state' => ['nullable', 'string', 'max:100'],
            'location_short_state' => ['nullable', 'string', 'max:2'],
            'location_zip_code' => ['nullable', 'string', 'max:20'],
        ];

        /*         if (!empty(request()->get('company_logo'))) */
        /*         { */
        /* } */

        return $rules;
    }

    public function messages()
    {
        return [
            'company_phone.required' => 'Phone number is required',
            'gmap_payload.required' => 'Location field is required',
        ];
    }
}

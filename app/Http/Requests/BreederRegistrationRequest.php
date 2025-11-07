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
            'company_phone' => ['required', 'string', 'max:20'], // Phone number validation
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
            'gallery' => ['required', 'array', 'max:10'], // Limit gallery to a maximum of 10 images
            'gallery.*' => [
                'required',
                'image',
                'mimes:jpeg,png,jpg',
                'max:12048', // 2MB max per image
            ],

            'videos' => ['nullable', 'array', 'max:3'], // Limit videos to a maximum of 3
            'videos.*' => [
                'mimes:mpeg,mp4,ogg,webm',
                'max:51200', // 50MB max per video
            ],
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
            /* 'city.required' => 'City field is required', */
            /* 'state_id.required' => 'State field is required', */
            'gmap_payload.required' => 'Location field is required',
        ];
    }
}

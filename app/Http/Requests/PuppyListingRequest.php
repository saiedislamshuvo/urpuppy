<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class PuppyListingRequest extends FormRequest
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
            'puppy_name' => ['required', 'string', 'max:100'],
            'puppy_price' => ['required', 'numeric', 'min:0'],
            'puppy_gender' => ['required', 'string', 'in:Male,Female,other'],
            'puppy_about' => ['required', 'string', 'min:40', 'max:10055'],
            'puppy_birth_date' => ['required', 'date', 'before_or_equal:today'],
            'puppy_patterns' => ['required', 'array', 'max:3'],
            'puppy_breeds' => ['required', 'array', 'max:3'],
            'puppy_colors' => ['required', 'array', 'max:3'],
            'has_vaccine' => ['nullable'],
            'has_health_certificate' => ['nullable'],
            'has_vet_exam' => ['nullable'],
            'has_travel_ready' => ['nullable'],
            'has_delivery_included' => ['nullable'],
            'certificate_type' => ['nullable', 'string', 'in:AKC,CKC,Other'],
            'certificate_document' => ['nullable', 'array'],
            'certificate_document.*' => ['file', 'mimes:pdf,jpeg,png,jpg', 'max:10240'],
            'location_lat' => ['nullable', 'numeric', 'between:-90,90'],
            'location_lng' => ['nullable', 'numeric', 'between:-180,180'],
            'location_address' => ['nullable', 'string', 'max:255'],
            'location_city' => ['nullable', 'string', 'max:100'],
            'location_street' => ['nullable', 'string', 'max:255'],
            'location_state' => ['nullable', 'string', 'max:100'],
            'location_short_state' => ['nullable', 'string', 'max:2'],
            'location_zip_code' => ['nullable', 'string', 'max:20'],
            'images' => ['required', 'array'],
            'images.*' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:12048'],
            'videos' => ['nullable', 'array'],
            'videos.*' => ['mimes:mpeg,mp4,ogg,webm', 'max:50512'],
        ];

        // Adjust based on premium plan
        $plan = $user?->premium_plan?->plan ?? $user?->breeder_plan?->plan;

        if ($plan) {
            $rules['images'] = "required|array|max:$plan->image_per_listing";
            $rules['videos'] = "nullable|array|max:$plan->video_per_listing";
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'puppy_price.min' => 'The puppy price must be a positive value.',
            'puppy_gender.in' => 'Please choose a valid gender for the puppy (Male, Female, other).',
            'puppy_about.min' => 'The puppy description must be at least 40 characters.',
            'puppy_about.max' => 'The puppy description must not exceed 10055 characters.',
        ];
    }
}

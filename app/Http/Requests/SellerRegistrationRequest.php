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
            /* 'email' => ['required', 'string', 'email', 'max:100', 'unique:users,email'], // Ensure email is unique */
            'phone' => ['nullable', 'string', 'max:100'], // Allow international phone number formats
            'website' => ['nullable', 'max:100', 'url'],
            'social_fb' => ['nullable', 'string', 'max:100', 'url'],
            'social_ig' => ['nullable', 'string', 'max:100', 'url'],
            'social_tiktok' => ['nullable', 'string', 'max:100', 'url'],
            'social_x' => ['nullable', 'string', 'max:100', 'url'],
            /* 'city' => ['nullable', 'string', 'max:100'], */
            /* 'state_id' => ['nullable', 'exists:states,id'], // Ensuring state_id exists in states table */
            /* 'gmap_payload' => ['required'], */
            'zip_code' => ['nullable', 'string', 'max:20'],
            'puppy_name' => ['required', 'string', 'max:100'],
            'puppy_price' => ['required', 'numeric', 'min:0'], // Ensuring the price is a positive number
            'puppy_gender' => ['required', 'string', 'in:Male,Female,other'], // Define possible values
            'puppy_about' => ['required', 'string', 'min:40', 'max:10055'],
            'puppy_birth_date' => ['required', 'date', 'before_or_equal:today'],
            'puppy_patterns' => ['required', 'array', 'max:3'],
            'puppy_breeds' => ['required', 'array', 'max:3'],
            'puppy_colors' => ['required', 'array', 'max:3'],
            'puppy_siblings' => ['nullable', 'array', 'max:10'],
            'has_vaccine' => ['nullable'],
            'has_health_certificate' => ['nullable'],
            'has_vet_exam' => ['nullable'],
            'has_travel_ready' => ['nullable'],
            'has_delivery_included' => ['nullable'],
            'images' => ['required', 'array'],
            'images.*' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:12048'],
            'videos' => ['nullable', 'array'],
            'videos.*' => ['mimes:mpeg,mp4,ogg,webm', 'max:50512'],
        ];

        if (! $request->user()->profile_completed) {
            $rules['gmap_payload'] = ['required'];
        }

        // Check the user's puppies count
        $puppies_count = $request->user()?->puppies()?->count() ?? 0;

        if ($puppies_count == 0 && $user->roles()->where('name', 'seller')->exists()) {
            // If no puppies are registered, enforce these fields
            $rules['phone'] = ['required', 'string', 'max:100', 'regex:/^\+?[1-9]\d{1,14}$/'];
            /* $rules['city'] = ['required', 'string', 'max:100']; */
            /* $rules['zip_code'] = [ 'string', 'max:20']; */
            /* $rules['state_id'] = ['exists:states,id']; */
        } else {
            // If there are puppies, adjust based on premium plan
            $plan = $user?->premium_plan?->plan ?? $user?->breeder_plan?->plan;

            if ($plan) {
                $rules['images'] = "required|array|max:$plan->image_per_listing";
                $rules['videos'] = "nullable|array|max:$plan->video_per_listing";
            }
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'phone.required' => 'Phone number is required.',
            /* 'city.required' => 'City is required.', */
            'gmap_payload.required' => 'Location field is required',
            /* 'state_id.required' => 'State is required.', */
            'email.unique' => 'The email address is already taken.',
            'puppy_price.min' => 'The puppy price must be a positive value.',
            'puppy_gender.in' => 'Please choose a valid gender for the puppy (male, female, other).',

            'social_fb.url' => 'Please enter a valid Facebook URL.',
            'social_ig.url' => 'Please enter a valid Instagram URL.',
            'social_tiktok.url' => 'Please enter a valid TikTok URL.',
            'social_x.url' => 'Please enter a valid X URL.',

        ];
    }
}

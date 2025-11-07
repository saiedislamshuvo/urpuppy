<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PuppyUpdateRequest extends FormRequest
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
            'puppy_name' => ['required', 'string', 'max:100', 'blasp_check'],
            'puppy_price' => ['required', 'numeric', 'min:1'], // Ensuring the price is a positive number
            'puppy_gender' => ['required', 'string', 'in:Male,Female,other'], // Define possible values
            'puppy_about' => ['required', 'string', 'min:40', 'max:10255'],
            'puppy_birth_date' => ['required', 'date', 'before_or_equal:today'],
            'puppy_patterns' => ['required', 'array', 'max:3'],
            'puppy_breeds' => ['required', 'array', 'max:3'],
            'puppy_colors' => ['required', 'array', 'max:3'],
            'puppy_siblings' => ['nullable', 'array', 'max:10'],
            'has_vaccine' => [''],
            'has_health_certificate' => [''],
            'has_vet_exam' => [''],
            'has_travel_ready' => [''],
            'has_delivery_included' => [''],
            'has_certificate' => [''],
            'certificate_type' => ['nullable', 'string', 'in:AKC,CKC,Other'],
            'certificate_document' => ['nullable', 'array'],
            'certificate_document.*' => ['file', 'mimes:pdf,jpeg,png,jpg', 'max:10240'],
            'images' => ['array', 'required'],
            'videos' => ['array'],
        ];
        $user = $this->user();
        $plan = $user?->premium_plan?->plan;

        if ($plan) {
            $rules['images'] = "required|array|max:$plan->image_per_listing";
            $rules['videos'] = "array|max:$plan->video_per_listing";
        }

        return $rules;
    }

    public function messages()
    {
        return [
            /* 'phone.required' => 'Phone number is required', */
            /* 'city_id.required' => 'City field is required', */
            /* 'state_id.required' => 'State field is required', */
        ];
    }
}

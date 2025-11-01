<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ListingRequest extends FormRequest
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
        return [
            'name' => ['required', 'string', 'max:255'],
            'gender' => ['required'],
            'price' => ['required', 'numeric', 'gt:0'],
            'birth_date' => ['required', 'date', 'before:today'],
            'colors' => ['required'],
            /* 'captcha' => 'required|captcha', */
            /* 'is_ready_to_travel' => [''], */
            'file' => ['required'],
            'video' => [''],
            'characteristics' => [''],
            'puppy_patterns' => [''],
            'breeds' => ['required', 'array', 'min:1', 'max:4'],
        ];
    }

    public function messages()
    {
        return [
            'file.required' => 'Upload puppy images',
            'file.0.required' => 'Upload puppy images',
        ];
    }
}

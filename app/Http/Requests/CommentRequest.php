<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
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
            'rating' => 'required|integer|min:1|max:5',
            'body' => 'required|string|max:255|blasp_check',
        ];
    }

    public function messages()
    {
        return [
            'body.blasp_check' => 'The comment is not allowed',
            'rating.required' => 'Please select a rating',
            'rating.min' => 'Please select a rating',
        ];
    }
}

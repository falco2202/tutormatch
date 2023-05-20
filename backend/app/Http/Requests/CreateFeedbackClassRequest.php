<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFeedbackClassRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'comment' => 'required|string|between:1,255',
            'star' => 'required|numeric|between:0,5'
        ];
    }
    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'comment.required' => 'required',
            'comment.string' => 'string',
            'comment.between' => 'comment_between_min_max',
            'star.required' => 'required',
            'star.numeric' => 'numeric',
            'star.between' => 'star_between_min_max'
        ];
    }
}

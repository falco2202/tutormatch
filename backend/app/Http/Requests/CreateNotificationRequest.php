<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateNotificationRequest extends FormRequest
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
            'classroom_id' => 'required|numeric',
            'title' => 'string|nullable|between:6,255',
            'content' => 'required|string|between:6,500',
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
            'classroom_id.required' => 'required',
            'classroom_id.numeric' => 'numeric',
            'content.required' => 'required',
            'content.string' => 'string',
            'content.between' => 'input_content_between_min_max',
            'title.string' => 'string',
            'title.between' => 'input_title_between_min_max'
        ];
    }
}

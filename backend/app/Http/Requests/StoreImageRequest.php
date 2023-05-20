<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreImageRequest extends FormRequest
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
            'model' => 'required|string|max:50',
            'file' => 'required|image|mimes:jpg,png|max:2000',
            'id' => 'required|numeric'
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
            'model.required' => 'required',
            'model.string' => 'model_must_characters',
            'model.max' => 'model_max_string_length',
            'file.required' => 'required',
            'file.image' => 'file_must_image',
            'file.mimes' =>  'file_type_must_be_valid',
            'file.max' => 'file_max_size_length',
            'file.uploaded' => 'file_max_size_length',
            'id.required' => 'required',
            'id.numeric' => 'id_must_numeric',
        ];
    }
}

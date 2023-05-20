<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'full_name' => 'required|string|between:3,255',
            'password' => 'required|string|between:8,255',
            'email' => 'required|email|unique:users',
            'gender' => 'required|boolean',
            'phone' => 'string|between:8,12|nullable',
            'date_of_birth' => 'date_format:Y-m-d|nullable',
            'm_ward_id' => 'required|numeric|exists:m_wards,id',
            'address' => 'required|string|between:2,255',
            'at_school' => 'string|max:255|nullable',
            'description' => 'string|nullable '
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
            'full_name.required' => 'required',
            'full_name.between' => 'input_full_name_between_min_max',
            'full_name.string' => 'full_name_must_characters',
            'password.required' => 'required',
            'password.between' => 'input_password_between_min_max',
            'password.string' => 'password_must_characters',
            'email.required' => 'required',
            'email.email' => 'email_must_be_a_valid_email_address',
            'email.unique' => 'email_has_already_been_taken',
            'gender.required' => 'required',
            'gender.boolean' => 'gender_must_be_male_or_female',
            'phone.between' => 'input_phone_between_min_max',
            'phone.string' => 'phone_must_characters',
            'date_of_birth.date_format' => 'date_of_birth_does_not_match_Y-m-d',
            'm_ward_id.required' => 'required',
            'm_ward_id.numeric' => 'ward_must_be_a_number',
            'm_ward_id.exists' => 'ward_must_exists_in_database',
            'address.required' => 'required',
            'address.between' => 'input_address_between_min_max',
            'address.string' => 'address_must_characters',
            'at_school.string' => 'at_school_must_characters',
            'at_school.max' => 'at_school_max_string_length',
            'description.string' => 'description_must_characters'
        ];
    }
}

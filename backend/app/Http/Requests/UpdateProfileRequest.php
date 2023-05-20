<?php

namespace App\Http\Requests;

use App\Models\User;
use App\Rules\AgeOlderEighteenRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
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
        $user = auth()->user();
        $rules = [
            'full_name' => 'required|string|between:3,255',
            'gender' => 'required|boolean',
            'phone' => 'string|between:8,12|nullable',
            'at_school' => 'string|max:255|nullable',
            'description' => 'string|nullable',
            'file' => 'image|mimes:jpg,png|max:2000|nullable',
        ];
        if ($user->role !== User::ROLES['CHILDREN']) {
            $rules = array_merge(
                $rules,
                [
                    'date_of_birth' => [
                        'required',
                        'date_format:Y-m-d',
                        new AgeOlderEighteenRule(),
                    ],
                    'm_ward_id' => 'required|numeric',
                    'address' => 'required|string|between:2,255',
                ]
            );
        } else {
            $rules = array_merge(
                $rules,
                ['date_of_birth' => 'required|date_format:Y-m-d|before:today']
            );
        }
        return $rules;
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
            'gender.required' => 'required',
            'gender.boolean' => 'gender_must_be_male_or_female',
            'phone.between' => 'input_phone_between_min_max',
            'phone.string' => 'phone_must_characters',
            'date_of_birth.required' => 'required',
            'date_of_birth.date_format' => 'date_of_birth_does_not_match_Y-m-d',
            'date_of_birth.before' => 'date_of_birth_must_be_a_date_before_today',
            'm_ward_id.required' => 'required',
            'm_ward_id.numeric' => 'ward_must_be_a_number',
            'm_ward_id.exists' => 'ward_must_exists_in_database',
            'address.required' => 'required',
            'address.between' => 'input_address_between_min_max',
            'address.string' => 'address_must_characters',
            'at_school.string' => 'at_school_must_characters',
            'at_school.max' => 'at_school_max_string_length',
            'description.string' => 'description_must_characters',
            'file.image' => 'file_must_image',
            'file.mimes' =>  'file_type_must_be_valid',
            'file.max' => 'file_max_size_length',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClassroomRequest extends FormRequest
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
            'class_name' => 'required|max:255',
            'quantity'  => 'numeric|nullable',
            'subject' => 'required|string|max:255',
            'tuition_fee' => 'nullable|numeric',
            'time' => 'nullable|numeric',
            'date_start' => 'required|date|date_format:Y-m-d',
            'date_end' => 'required|date|date_format:Y-m-d|after:date_start|after_or_equal:today',
            'description' => 'string|nullable',
            'm_ward_id' => 'required|numeric',
            'address' => 'required|max:100',
            'lessons' => 'required|array',
            'lessons.*.day' => 'required|numeric|between:0,6|distinct',
            'lessons.*.start' => 'required|date_format:H:i',
            'lessons.*.end' => 'required|date_format:H:i|after:lessons.*.start',
            'file' => 'image|mimes:jpg,png|max:2000',
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
            'class_name.required' => 'required',
            'class_name.max' => 'class_name_max_string_length',
            'subject.required' => 'required',
            'subject.string' => 'string',
            'subject.max' => 'subject_max_string_length', 
            'tuition_fee.numeric' => 'numeric',
            'date_end.required' => 'required',
            'quantity.numeric' => 'numeric',
            'time.numeric' => 'numeric',
            'description.string' => 'string',
            'address.required' => 'required',
            'address.max' => 'address_max_string_length',
            'm_ward_id.required' => 'required',
            'm_ward_id.numeric' => 'numeric',
            'date_start.required' => 'required',
            'date_start.date_format' => 'date_start_format_Y-m-d',
            'date_end.date_format' => 'date_end_format_Y-m-d',
            'date_end.after' => 'date_end_after_date_start',
            'date_end.after_or_equal' => 'date_end_after_or_equal_today',
            'lessons.required' => 'required',
            'lessons.array' => 'array',
            'lessons.*.day.required' => 'required',
            'lessons.*.day.numeric' => 'numeric',
            'lessons.*.day.between' => 'day_between_min_max',
            'lessons.*.day.distinct' => 'day_already_exists',
            'lessons.*.start.required' => 'required',
            'lessons.*.start.date_format' => 'start_format_hh:mm',
            'lessons.*.end.required' => 'required',
            'lessons.*.end.date_format' => 'end_format_hh:mm',
            'lessons.*.end.after' => 'end_after_start',
            'file.image' => 'file_must_image',
            'file.mimes' =>  'file_type_must_be_valid',
            'file.max' => 'file_max_size_length',
            'file.uploaded' => 'file_max_size_length',
        ];
    }
}

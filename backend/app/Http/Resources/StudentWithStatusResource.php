<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class StudentWithStatusResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $image = empty($this->upload) ? 
            null : $this->upload->uploadImage($this->id, User::class)->first();
        return [
            'id' => $this->id,
            'fullName' => $this->full_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'dateOfBirth' => $this->date_of_birth,
            'gender' => $this->gender,
            'role' => $this->role,
            'status' => !empty($this->pivot) ? $this->pivot->status : null,
            'image' => empty($this->upload) ? null : [
                'id' => $image->id,
                'url' => generate_image_url($image)
            ],
            'countAbsentLessons' => $this->countAbsentLessons,
            'absentLessons' => $this->absentLessons,
            'lessonsUntilNow' => $this->lessonsUntilNow,
        ];
    }
}

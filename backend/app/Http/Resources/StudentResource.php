<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $image = empty($this->upload) ? null : $this->upload->uploadImage($this->id, 'App\Models\User')->first();
        return [
            'id' => $this->id,
            'fullName' => $this->full_name,
            'image' => empty($this->upload) ? null : [
                'id' => $image->id,
                'url' => generate_image_url($image)
            ],
            'email' => $this->email,
            'phone' => $this->phone,
            'dateOfBirth' => $this->date_of_birth,
            'gender' => $this->gender,
            'role' => $this->role,
            'classrooms' => !empty($this->classroomsWithPivot) ?
                ClassroomResource::collection($this->classroomsWithPivot) : null,
        ];
    }
}

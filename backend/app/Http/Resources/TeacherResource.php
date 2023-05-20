<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TeacherResource extends JsonResource
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
            'token' => $this->token,
            'fullName' => $this->full_name,
            'image' => empty($this->upload) ? null : [
                'id' => $image->id,
                'url' => generate_image_url($image)
            ],
            'email' => $this->email,
            'role' => $this->role,
            'phone' => $this->phone,
            'dateOfBirth' =>  $this->date_of_birth,
            'gender' => $this->gender,
            'address' => !empty($this->address) ?
                $this->address->with('ward.city')
                ->where('addressable_id', '=', $this->id)
                ->where('addressable_type', 'App\Models\User')->get()->makeHidden(
                    [
                        'created_at',
                        'updated_at',
                        'deleted_at',
                        'addressable_type',
                        'addressable_id',
                        'ward_id',
                        'city_id',
                    ]
                ) : null,
            'profileTeacher' => [$this->profileTeacher],
            'classrooms' => !empty($this->profileTeacher->classrooms) ?
            ClassroomResource::collection($this->profileTeacher->classrooms) : null
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ChildrenResource extends JsonResource
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
            'role' => $this->role,
            'image' => empty($this->upload) ? null : [
                'id' => $image->id,
                'url' => generate_image_url($image)
            ],
            'email' => $this->email,
            'phone' => $this->phone,
            'dateOfBirth' =>  $this->date_of_birth,
            'gender' => $this->gender,
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ClassroomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $image = empty($this->upload) ? null : $this->upload->uploadImage($this->id, 'App\Models\Classroom')->first();
        return [
            'id' => $this->id,
            'className' => $this->class_name,
            'quantity' => $this->quantity,
            'subject' => $this->subject,
            'tuitionFee' => $this->tuition_fee,
            'time' => $this->time,
            'dateStart' => $this->date_start,
            'dateEnd' => $this->date_end,
            'description' => $this->description,
            'profileTeacher' => new ProfileTeacherResource($this->profileTeacher),
            'image' => empty($this->upload) ? null : [
                'id' => $image->id,
                'url' => generate_image_url($image)
            ],
            'address' => !empty($this->address) ?
                $this->address->with('ward.city')
                ->where('addressable_id', '=', $this->id)
                ->where('addressable_type', 'App\Models\Classroom')->get()->makeHidden(
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
            'avgStar' => round($this->avg_star, 1),
            'countRate' => $this->count_rate,
            'countStudentsInClass' => $this->count_students,
            'pivot' => new ClassroomUserResource($this->pivot),
        ];
    }
}

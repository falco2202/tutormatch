<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'timeStart' => $this->time_start,
            'timeEnd' => $this->time_end,
            'classroomId' => $this->classroom_id,
            'absentStudents' => AbsentStudentResource::collection($this->absentStudents),
        ];
    }
}

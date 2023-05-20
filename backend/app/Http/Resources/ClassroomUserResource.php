<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClassroomUserResource extends JsonResource
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
            'userId' => $this->user_id,
            'classroomId' => $this->classroom_id,
            'comment' =>  $this->comment,
            'star' => $this->star,
            'dateComment' => $this->date_comment,
            'status' => $this->status,
        ];
    }
}

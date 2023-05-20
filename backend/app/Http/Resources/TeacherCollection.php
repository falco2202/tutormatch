<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class TeacherCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'pageSize' => $this->perPage(),
            'total' => $this->total(),
            'totalPage' => ceil($this->total() / $this->perPage()),
            'currentPage' => $this->currentPage(),
            'items' => $this->collection
        ];
    }
}

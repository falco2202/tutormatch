<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ClassroomCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        //TODO: Refactor code các collection
        return [
            'pageSize' => $this->perPage(),
            'total' => $this->total(),
            'totalPage' => ceil($this->total() / $this->perPage()),
            'currentPage' => $this->currentPage(),
            'items' => $this->collection
        ];
    }
}

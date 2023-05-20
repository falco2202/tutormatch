<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
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
            'status' => $this->status,
            'momoTransId' => $this->momo_trans_id,
            'amount' => $this->amount,
            'responseTime' => $this->response_time,
            'info' => $this->info,
            'date' => $this->date,
            'userId' => $this->user_id,
            'user' => new UserResource($this->user)
        ];
    }
}

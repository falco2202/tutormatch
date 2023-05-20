<?php

namespace App\Services;

use App\Models\Address;
use Exception;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;

class AddressService
{
    public function createAddress($model, $address)
    {
        DB::beginTransaction();
        try {
            $lat = 0;
            $long = 0;
            Address::create(
                [
                    'addressable_id' => $address['address_id'],
                    'addressable_type' => $model,
                    'm_ward_id' => $address['m_ward_id'],
                    'address' => $address['address'],
                    'lat' => $lat,
                    'long' => $long
                ]
            );
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw new \Exception($th->getMessage());
        }
    }

    public function updateAddress($model, $address)
    {
        try {
            $model->address->update(
                [
                    'm_ward_id' =>  $address['m_ward_id'],
                    'address' => $address['address'],
                ]
            );
        } catch (Exception $exception) {
            throw $exception;
        }
    }
}

<?php

namespace App\Services;

use App\Models\Payment;
use Carbon\Carbon;

class PaymentService 
{
    protected $payment;

    public function __construct(Payment $payment)
    {
        $this->payment = $payment;
    }
    public function getPaymentInMonthNow($user)
    {
        $monthNow = (Carbon::now())->month;
        try {
            $data = $user->payments()->whereMonth('date', '=', $monthNow)->first();
            return $data;
        } catch (\Throwable $th) {
            logger($th->getMessage());
            throw $th;
        }
    }
}
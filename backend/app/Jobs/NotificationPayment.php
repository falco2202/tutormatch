<?php

namespace App\Jobs;

use App\Models\Payment;
use App\Models\User;
use App\Notifications\Payment as NotificationsPayment;
use App\Services\PaymentService;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class NotificationPayment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $monthNow = (Carbon::now())->month;
        $payments = Payment::where('status', 0)->whereMonth('date', $monthNow)->get();
        foreach ($payments as $payment) {
            $payment->user->notify(new NotificationsPayment($payment));
        }
    }
}

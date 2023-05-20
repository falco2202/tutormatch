<?php

namespace App\Notifications;

use App\Http\Resources\PaymentResource;
use App\Models\Payment as ModelsPayment;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Payment extends Notification implements ShouldQueue
{
    use Queueable;

    protected $title;
    protected $from;
    protected $content;
    protected $payment;
    protected $createdAt;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(ModelsPayment $payment)
    {
        $this->title = __('message.payment_notification_title');
        $this->from = __('message.from_server');
        $this->payment = $payment;
        $dateNow = Carbon::now();
        $this->createdAt = $dateNow->format(config('constant.datetime_format'));
        $dateForContent = $dateNow->format(config('constant.datetime_format_notification'));
        $this->content = __(
            'message.payment_notification',
            ['date' => $dateForContent]
        );
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage())
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'payment' => new PaymentResource($this->payment),
            'from' => $this->from,
            'createdAt' => $this->createdAt,
        ];
    }
}

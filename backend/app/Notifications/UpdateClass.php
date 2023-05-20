<?php

namespace App\Notifications;

use App\Http\Resources\ClassroomResource;
use App\Models\Classroom;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UpdateClass extends Notification implements ShouldQueue
{
    use Queueable;

    protected $classroom;
    protected $title;
    protected $content;
    protected $createdAt;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Classroom $classroom)
    {
        $this->title = __('message.update_classroom_notification_title');
        $this->classroom = $classroom;
        $this->createdAt = Carbon::now()->format(config('constant.datetime_format'));
        $this->content = __(
            'message.update_classroom_notification',
            ['class_name' => $classroom->class_name]
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
            'classroom' => new ClassroomResource($this->classroom),
            'from' => $this->classroom->class_name,
            'createdAt' => $this->createdAt,
        ];
    }
}

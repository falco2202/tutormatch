<?php

namespace App\Notifications;

use App\Http\Resources\UserResource;
use App\Models\ProfileTeacher;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BlockTeacher extends Notification implements ShouldQueue
{
    use Queueable;

    protected $teacher;
    protected $title;
    protected $from;
    protected $content;
    protected $createdAt;
    protected $status;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $teacher, $status)
    {
        $statusString =
            ($status == ProfileTeacher::STATUS['CONFIRM']) ?
            __('message.unblock') : __('message.block');
        $this->title = __('message.block_teacher_notification_title');
        $this->from = __('message.from_server');
        $this->teacher = $teacher;
        $this->createdAt = Carbon::now()->format(config('constant.datetime_format'));
        $this->content = __(
            'message.block_teacher_notification',
            [
                'full_name' => $teacher->full_name,
                'status_string' => $statusString,
                'created_at' => $this->createdAt
            ]
        );
        $this->status = $status;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast', 'database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $name = $notifiable->full_name;
        $isConfirm = $this->status == ProfileTeacher::STATUS['CONFIRM'];
        $subject =
            $isConfirm ?
            trans('message.unlock_account_email_subject')
            :
            trans('message.block_account_email_subject');
        return (new MailMessage())
                    ->view('email.block-teacher', [
                        'name' => $name,
                        'url' => mail_url(),
                        'is_confirm' => $isConfirm
                    ])
                    ->subject($subject);
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
            'teacher' => new UserResource($this->teacher),
            'from' => $this->from,
            'createdAt' => $this->createdAt,
        ];
    }
}

<?php

namespace App\Notifications;

use App\Http\Resources\ClassroomResource;
use App\Http\Resources\UserResource;
use App\Models\Classroom;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ApproveStudent extends Notification implements ShouldQueue
{
    use Queueable;

    protected $classroom;
    protected $student;
    protected $title;
    protected $content;
    protected $createdAt;
    protected $isSendMail;
    protected $status;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Classroom $classroom, User $student, $status, $isSendMail = false)
    {
        $statusString =
            ($status == User::STUDENT_STATUSES['APPROVED']) ?
            __('message.approved') : __('message.canceled');
        $this->title = __('message.approve_student_notification_title');
        $this->classroom = $classroom;
        $this->student = $student;
        $this->content = __(
            'message.approved_student_notification',
            [
                'full_name' => $student->full_name,
                'status_string' => $statusString,
                'class_name' => $classroom->class_name
            ]
        );
        $this->createdAt = Carbon::now()->format(config('constant.datetime_format'));
        $this->isSendMail = $isSendMail;
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
        return $this->isSendMail ? ['broadcast', 'database', 'mail'] : ['broadcast', 'database'];
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
        $studentName = $this->student->full_name;
        $className = $this->classroom->class_name;
        $isApprove = $this->status == User::STUDENT_STATUSES['APPROVED'];
        $subject =
            $isApprove ?
            trans('message.approve_student_email_subject', ['class_name' => $className])
            :
            trans('message.denied_student_email_subject', ['class_name' => $className]);
        $url = $isApprove ?
            mail_url('/classes/detail/', $this->classroom->id)
            :
            mail_url();
        return (new MailMessage())
                    ->view('email.approve-student', [
                        'name' => $name,
                        'student_name' => $studentName,
                        'class_name' => $className,
                        'url' => $url,
                        'is_approve' => $isApprove
                    ])->subject($subject);
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
            'student' => new UserResource($this->student),
            'classroom' => new ClassroomResource($this->classroom),
            'from' => $this->classroom->class_name,
            'createdAt' => $this->createdAt,
        ];
    }
}

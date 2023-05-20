<?php

namespace App\Notifications;

use App\Http\Resources\ClassroomResource;
use App\Http\Resources\LessonResource;
use App\Http\Resources\UserResource;
use App\Models\Classroom;
use App\Models\Lesson;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AttendStudent extends Notification implements ShouldQueue
{
    use Queueable;

    protected $classroom;
    protected $student;
    protected $lesson;
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
    public function __construct(Classroom $classroom, User $student, Lesson $lesson, $status, $isSendMail = false)
    {
        $statusString =
            ($status == User::ATTEND_STUDENT_STATUSES['PRESENT']) ?
            __('message.present') : __('message.absent');
        $this->title = __('message.attend_student_notification_title');
        $this->classroom = $classroom;
        $this->student = $student;
        $this->lesson = $lesson;
        $this->content = __(
            'message.attend_student_notification',
            [
                'full_name' => $student->full_name,
                'status_string' => $statusString,
                'time_start' => $lesson->time_start,
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
        $studentName = $this->student->full_name;
        $day = Carbon::parse($this->lesson->time_start)->format('d/m/Y');
        $subject = trans(
            'message.attend_student_email_subject',
            [
                'class_name' => $this->classroom->class_name,
                'day' => $day
            ]
        );
        $isPresent = $this->status == User::ATTEND_STUDENT_STATUSES['PRESENT'];
        return (new MailMessage())
                    ->view('email.attend-student', [
                        'name' => $notifiable->full_name,
                        'class_name' => $this->classroom->class_name,
                        'day' => $day,
                        'student_name' => $studentName,
                        'is_present' => $isPresent,
                        'url' => mail_url('/classes/detail/', $this->classroom->id)
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
            'lesson' => new LessonResource($this->lesson),
            'from' => $this->classroom->class_name,
            'createdAt' => $this->createdAt,
        ];
    }
}

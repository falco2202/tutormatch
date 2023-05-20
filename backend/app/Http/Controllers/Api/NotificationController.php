<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateNotificationRequest;
use App\Http\Resources\NotificationCollection;
use App\Http\Resources\NotificationResource;
use App\Models\Classroom;
use App\Models\Notification;
use App\Models\NotificationUser;
use App\Models\ProfileTeacher;
use App\Models\User;
use App\Notifications\ClassroomMessage;
use App\Services\StudentService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends ApiController
{
    protected $user;
    protected $classroom;
    protected $studentService;

    public function __construct(User $user, Classroom $classroom, StudentService $studentService)
    {
        $this->user = $user;
        $this->classroom = $classroom;
        $this->studentService = $studentService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $pageSize = $request->get('page_size', config('constant.page_size'));
            $user = auth()->user();
            if (is_null($user)) {
                return $this->resUnauthorized();
            }
            $notifications = $user->notification()->orderByDesc('created_at');
            $data = new NotificationCollection($notifications->paginate($pageSize));
            return $this->resSuccess($data);
        } catch (\Throwable $th) {
                logger($th->getMessage());
                return $this->resInternalError();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateNotificationRequest $request)
    {
        DB::beginTransaction();
        $user = auth()->user();
        try {
            $classroomId = $request->validated('classroom_id');
            $title = $request->validated('title');
            $content = $request->validated('content');
            $classroom = $this->classroom->findOrFail($classroomId);
            if (
                $classroom->teacher_id != $user->id
                || $user->profileTeacher->status != ProfileTeacher::STATUS['CONFIRM']
            ) {
                return $this->resForbidden();
            }
            $students = $this->studentService->listStudentOfClass(
                $classroomId,
                User::STUDENT_STATUSES['APPROVED'],
                null,
                config('constant.max_page_size')
            );
            $classroomMessage = (new ClassroomMessage($classroom, $content, $title))
                                    ->afterCommit();
            foreach ($students as $student) {
                $student->notify($classroomMessage);
                $student->parent->notify($classroomMessage);
            }
            DB::commit();
            return $this->resSuccess(['message' => __('message.success_key.create_notification_success')]);
        } catch (\Throwable $th) {
            DB::rollBack();
            logger($th->getMessage());
            if ($th instanceof ModelNotFoundException) {
                throw $th;
            }
            return $this->resInternalError();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $user = auth()->user();
            $notifications = $user->notification->find($id);
            if (is_null($notifications)) {
                return $this->resNotFound(trans('message.notification'));
            }
            if ($notifications->read_at == null) {
                $notifications->update(['read_at' => now()]);
            }
            return $this->resSuccess(new NotificationResource($notifications));
        } catch (\Throwable $th) {
            logger($th->getMessage());
            return $this->resInternalError();
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        //
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CreateClassroomRequest;
use App\Http\Requests\UpdateClassroomRequest;
use App\Http\Resources\ClassroomCollection;
use App\Http\Resources\ClassroomResource;
use App\Http\Resources\StudentWithStatusResource;
use App\Models\Classroom;
use App\Models\ClassroomUser;
use App\Http\Requests\ApproveStudentRequest;
use App\Http\Requests\CreateFeedbackClassRequest;
use App\Http\Requests\JoinClassRequest;
use App\Http\Resources\LessonResource;
use App\Models\ProfileTeacher;
use App\Models\User;
use App\Notifications\UpdateClass;
use App\Services\AddressService;
use App\Services\ClassroomService;
use App\Services\LessonService;
use App\Services\StudentService;
use App\Services\TeacherService;
use App\Services\UploadService;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ClassroomController extends ApiController
{
    protected $classroomService;
    protected $user;
    protected $teacherService;
    protected $addressService;
    protected $lessonService;
    protected $uploadService;
    protected $studentService;

    public function __construct(
        ClassroomService $classroomService,
        TeacherService $teacherService,
        User $user,
        AddressService $addressService,
        LessonService $lessonService,
        UploadService $uploadService,
        StudentService $studentService
    ) {

        $this->classroomService = $classroomService;
        $this->user = $user;
        $this->teacherService = $teacherService;
        $this->addressService = $addressService;
        $this->lessonService = $lessonService;
        $this->uploadService = $uploadService;
        $this->studentService = $studentService;
    }
    function handleExceptionMessage($th)
    {
        if ($th->getMessage() == trans('message.classroom')) {
            return $this->resNotFound($th->getMessage());
        } elseif ($th->getMessage() == trans('message.unauthorized')) {
            return $this->resForbidden();
        } else {
            return $this->resInternalError();
        }
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $pageSize = $request->get('page_size', config('constant.page_size'));
        $searchValue = $request->get('search_value');
        $orderByAvgStar = $request->get('order_by_avg_star');
        $teacherStatus = $request->get('teacher_status');
        $isStart = $request->get('is_start');
        $ward = $request->get('ward');
        $orderByClass = $request->get('order_by_class');
        $user = auth()->user();
        $data = null;
        try {
            switch ($user->role) {
                case User::ROLES['ADMIN']:
                    $data = $this->classroomService
                        ->listClassroomWithStatusAndAvgStar(
                            $teacherStatus,
                            $orderByAvgStar,
                            $searchValue,
                            $pageSize,
                            $ward,
                            $isStart,
                            $orderByClass
                        );
                    break;
                case User::ROLES['TEACHER']:
                    $data = $this->classroomService
                        ->listClassroomWithTeacherId(
                            $user->id,
                            $orderByAvgStar,
                            $searchValue,
                            $pageSize
                        );
                    break;
                case User::ROLES['PARENT']:
                    $data = $this->classroomService
                        ->listClassroomsOfChild(
                            $searchValue,
                            $orderByClass,
                            $pageSize
                        );
                    break;
                case User::ROLES['CHILDREN']:
                    $data = $this->classroomService
                        ->listClassroomsOfStudent(
                            $searchValue,
                            $orderByClass,
                            $pageSize
                        );
                    break;
                default:
                    throw new HttpException(Response::HTTP_FORBIDDEN);
            }
            return $this->resSuccess($data);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            if ($th instanceof HttpException) {
                throw $th;
            }
            return $this->resInternalError();
        }
    }
    public function global(Request $request)
    {
        $pageSize = $request->get('page_size', config('constant.page_size'));
        $searchValue = $request->get('search_value');
        $orderByAvgStar = $request->get('order_by_avg_star');
        $isStart = $request->get('is_start');
        $ward = $request->get('ward');
        $orderByClass = $request->get('order_by_class');
        try {
            $data = $this->classroomService
                            ->listClassroomWithStatusAndAvgStar(
                                ProfileTeacher::STATUS['CONFIRM'],
                                $orderByAvgStar,
                                $searchValue,
                                $pageSize,
                                $ward,
                                $isStart,
                                $orderByClass
                            );
            return $this->resSuccess($data);
        } catch (Exception $e) {
            logger($e->getMessage());
            return $this->resInternalError();
        }
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateClassroomRequest $request)
    {
        $this->authorize('create', Classroom::class);
        DB::beginTransaction();
        try {
            $teacherStatus = $this->teacherService->getStatusTeacher();
            if ($teacherStatus == ProfileTeacher::STATUS['CONFIRM']) {
                $dayIsValid = $this->lessonService->dayIsValid(
                    $request['date_start'],
                    $request['date_end'],
                    $request['lessons'],
                );
                if ($dayIsValid) {
                    $newClass = $this->classroomService->createClassroom($request);
                    $lessons = $request['lessons'];
                    $start = $request['date_start'];
                    $end = $request['date_end'];
                    $classroomId = $newClass->id;
                    $this->lessonService->createLesson($start, $end, $lessons, $classroomId);
                    $address = [
                        'address_id' => $newClass->id,
                        'm_ward_id' =>  $request['m_ward_id'],
                        'address' => $request['address'],
                    ];
                    $this->addressService->createAddress(Classroom::class, $address);
                    $file = $request->file('file');
                    $this->uploadService->uploadImage($file, Classroom::class, $classroomId);
                    DB::commit();
                    return $this->resSuccess(['message' => __('message.success_key.create_class_success')]);
                } else {
                    return $this->resNotFound('day', trans('message.day.not_found'));
                }
            } elseif ($teacherStatus == ProfileTeacher::STATUS['PENDING']) {
                return $this->resForbidden(trans('message.teacher.status.pending'));
            } else {
                return $this->resForbidden(trans('message.teacher.status.block'));
            }
        } catch (Exception $e) {
            DB::rollBack();
            logger($e->getMessage());
            return $this->resInternalError();
        }
    }
    protected function detailClassroom($classroomId)
    {
        try {
            $listStudent = $this->studentService
                                ->listStudentOfClass(
                                    $classroomId,
                                    User::STUDENT_STATUSES['APPROVED'],
                                    null,
                                    config('constant.max_page_size')
                                );
            $lessons = $this->lessonService->getLessonInClass($classroomId);
            $numLessons = $this->lessonService->getDaysOfWeek($lessons);
            $data = [
                'listStudent' => $listStudent,
                'lessons' => $lessons,
                'numLesson' => Arr::flatten($numLessons, 1)
            ];
            return $data;
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    protected function detailForAdminAndTeacher($classroomId)
    {
        try {
            $detailClass = $this->classroomService->classDetail($classroomId);
            $data = $this->detailClassroom($classroomId);
            $data['detailClass'] = $detailClass;
            return $this->resSuccess($data);
        } catch (\Throwable $th) {
            if ($th instanceof HttpException) {
                throw $th;
            }
            logger($th->getMessage());
            if ($th->getMessage() == trans('message.classroom')) {
                return $this->resNotFound($th->getMessage());
            }
            return $this->handleExceptionMessage($th);
        }
    }
    protected function detailForParent($classroomId)
    {
        try {
            $detailClass = $this->classroomService->globalDetail($classroomId);
            $data = $this->detailClassroom($classroomId);
            $childrenInClassroom = $this->classroomService
                                            ->studentsInClassroomWithParent(
                                                $detailClass->id
                                            );
            $data['detailClass'] = $detailClass;
            $data['childrenInClassroom'] = $childrenInClassroom;
            return $this->resSuccess($data);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            if ($th instanceof HttpException) {
                throw $th;
            }
            if ($th->getMessage() == trans('message.classroom')) {
                return $this->resNotFound($th->getMessage());
            }
            return $this->handleExceptionMessage($th);
        }
    }
    protected function detailForChild($classroomId)
    {
        try {
            $user = auth()->user();
            $detailClass = $this->classroomService->globalDetail($classroomId);
            $data = $this->detailClassroom($classroomId);
            $detailChildren = $this->classroomService
                                        ->getDetailStudentOfClassroom($classroomId, $user);
            $data['detailClass'] = $detailClass;
            $data['childrenInClassroom'] = !empty($detailChildren) ?
                [new StudentWithStatusResource($detailChildren)]
                : [];
            return $this->resSuccess($data);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            if ($th instanceof HttpException) {
                throw $th;
            }
            if ($th->getMessage() == trans('message.classroom')) {
                return $this->resNotFound($th->getMessage());
            }
            return $this->handleExceptionMessage($th);
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
        $user = auth()->user();
        switch ($user->role) {
            case User::ROLES['ADMIN']:
                return $this->detailForAdminAndTeacher($id);
            case User::ROLES['TEACHER']:
                return $this->detailForAdminAndTeacher($id);
            case User::ROLES['PARENT']:
                return $this->detailForParent($id);
            case User::ROLES['CHILDREN']:
                return $this->detailForChild($id);
        }
    }
    public function detailGlobal($id)
    {
        try {
            $classDetail = $this->classroomService->globalDetail($id);
            $listFeedback = $this->classroomService->listFeedbackOfClass($id);
            $lessons = $this->lessonService->getLessonInClass($id);
            $numLessons = $this->lessonService->getDaysOfWeek($lessons);
            return $this->resSuccess([
                'detailClass' => $classDetail,
                'lessons' => $lessons,
                'numLesson' => Arr::flatten($numLessons, 1),
                'feedback' => $listFeedback
            ]);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            if ($th->getMessage() == trans('message.classroom')) {
                return $this->resNotFound($th->getMessage());
            }
            return $this->handleExceptionMessage($th);
        }
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateClassroomRequest $request, $id)
    {
        $classroom = Classroom::find($id);
        if (is_null($classroom)) {
            return $this->resNotFound(trans('message.classroom'));
        }
        $this->authorize('update', $classroom);
        DB::beginTransaction();
        try {
            $teacherStatus = $this->teacherService->getStatusTeacher();
            $oldDateStart = Carbon::parse($classroom->date_start)->toDateString();
            if ($teacherStatus == ProfileTeacher::STATUS['CONFIRM']) {
                $dayIsValid = $this->lessonService->dayIsValid(
                    $request['date_start'],
                    $request['date_end'],
                    $request['lessons'],
                );
                $count = $this->classroomService->countStudentApproveInClass($id);
                if ($count > $request['quantity']) {
                    return $this->resUnprocessable(
                        'validation_error',
                        [
                            'quantity' => [
                                'message' => 'quantity_must_be_greater_than_or_equal_quantity_of_students_approved',
                                'attribute' => 'quantity'
                            ]
                        ]
                    );
                }
                if (Carbon::parse($oldDateStart)->isPast() && $request['date_start'] != $oldDateStart) {
                    return $this->resUnprocessable(
                        'validation_error',
                        [
                            'day_start' => [
                                'message' => 'day_start_must_be_day',
                                'attribute' => 'day_start',
                                'args' => [
                                    'day' => $oldDateStart,
                                ]
                            ]
                        ]
                    );
                }
                if ($dayIsValid) {
                    $classroomUpdate = $this->classroomService->updateClassroom($request, $id);
                    $this->lessonService->updateLesson(
                        $request['date_start'],
                        $request['date_end'],
                        $request['lessons'],
                        $id
                    );
                    $address = [
                        'm_ward_id' =>  $request['m_ward_id'],
                        'address' => $request['address'],
                    ];
                    $this->addressService->updateAddress($classroomUpdate, $address);
                    if (!empty($request->file('file'))) {
                        $file = $request->file('file');
                        $image = $this->uploadService->uploadImage($file, Classroom::class, $id);
                    }
                    $studentsInClass = $this->studentService
                            ->listStudentOfClass(
                                $id,
                                User::STUDENT_STATUSES['APPROVED'],
                                null,
                                config('constant.max_page_size')
                            );
                    foreach ($studentsInClass as $student) {
                        $student->notify((new UpdateClass($classroomUpdate))
                                ->afterCommit());
                        $student->parent->notify((new UpdateClass($classroomUpdate))
                                        ->afterCommit());
                    }
                    DB::commit();
                    return $this->resSuccess(['message' => __('message.success_key.update_class_success')]);
                } else {
                    return $this->resNotFound('day', trans('message.day.not_found'));
                }
            } elseif ($teacherStatus == ProfileTeacher::STATUS['PENDING']) {
                return $this->resForbidden(trans('message.teacher.status.pending'));
            } else {
                return $this->resForbidden(trans('message.teacher.status.block'));
            }
        } catch (Exception $e) {
            DB::rollBack();
            logger($e->getMessage());
            return $this->resInternalError();
        }
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $this->classroomService->classDelete($id);
            return $this->resSuccess(['message' => __('message.success_key.delete_class_success')]);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            return $this->handleExceptionMessage($th);
        }
    }
    public function approve(ApproveStudentRequest $request, $id, $studentId)
    {
        try {
            $studentStatus = $request->validated('student_status');
            $student = $this->classroomService
                                ->approveStudent($id, $studentId, $studentStatus);
            if ($studentStatus == User::STUDENT_STATUSES['APPROVED']) {
                return $this->resSuccess(['message' => __('message.success_key.approval_success'),
                                         ...$student->toArray($request)]);
            } else {
                return $this->resSuccess(['message' => __('message.success_key.denied_success'),
                                         ...$student->toArray($request)]);
            }
        } catch (\Throwable $th) {
            logger($th->getMessage());
            if (
                $th instanceof ModelNotFoundException
                || $th instanceof HttpException
                || $th instanceof ValidationException
            ) {
                throw $th;
            }
            return $this->resInternalError();
        }
    }
    public function attend(Request $request, $id, $lessonId)
    {
        $students = $request->get('students');
        $data = $this->classroomService->attendLesson($id, $lessonId, $students);
        return $this->resSuccess($data);
    }
    public function join(JoinClassRequest $request, $id)
    {
        $studentId = $request->validated('student_id');
        $data = $this->classroomService->joinClass($id, $studentId);
        return $this->resSuccess(['message' => __('message.success_key.class_register_success'),
                                  ...$data->toArray($request)]);
    }
    public function createFeedback(CreateFeedbackClassRequest $request)
    {
        $user = auth()->user();
        try {
            if ($user->role != User::ROLES['PARENT']) {
                return $this->resForbidden();
            }
            $this->classroomService->createFeedbackInClass($request);
            return $this->resSuccess(['message' => __('message.success_key.create_feedback_success')]);
        } catch (Exception $e) {
            logger($e->getMessage());
            if ($e->getMessage() == __('message.feedback')) {
                return $this->resForbidden($e->getMessage());
            } elseif ($e->getMessage() == __('message.not_in_class')) {
                return $this->resForbidden($e->getMessage());
            } else {
                return $this->resInternalError();
            }
        }
    }
}

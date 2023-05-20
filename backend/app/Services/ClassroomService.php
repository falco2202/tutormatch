<?php

namespace App\Services;

use App\Http\Resources\ChildrenResource;
use App\Http\Resources\ClassroomCollection;
use App\Http\Resources\UserResource;
use App\Models\Classroom;
use App\Http\Resources\ClassroomResource;
use App\Http\Resources\ClassroomUserResource;
use App\Http\Resources\LessonResource;
use App\Http\Resources\StudentResource;
use App\Http\Resources\StudentWithStatusResource;
use App\Models\ClassroomUser;
use App\Models\Lesson;
use App\Models\User;
use App\Notifications\ApproveStudent;
use App\Notifications\AttendStudent;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ClassroomService
{
    protected $classrooms;
    protected $users;
    protected $studentService;

    public function __construct(
        Classroom $classrooms,
        User $users,
        StudentService $studentService
    ) {
        $this->classrooms = $classrooms;
        $this->users = $users;
        $this->studentService = $studentService;
    }
    private function withAvgStar($classrooms)
    {
        $confirmStudentStatus = User::STUDENT_STATUSES['APPROVED'];
        return $classrooms
                ->leftJoin('classroom_users', 'classrooms.id', '=', 'classroom_users.classroom_id')
                ->select(
                    'classrooms.*',
                    DB::raw("AVG(classroom_users.star) AS avg_star, 
                            COUNT(classroom_users.star) AS count_rate,
                            COUNT(
                                case classroom_users.status 
                                WHEN {$confirmStudentStatus} THEN 1 ELSE null END
                            ) AS count_students"
                    )
                )
                ->groupBy('classrooms.id');
    }
    public function createClassroom($request)
    {
        DB::beginTransaction();
        try {
            $data = [
                'class_name' => $request['class_name'],
                'quantity' => $request['quantity'] ? $request['quantity'] : 1,
                'subject' => $request['subject'],
                'tuition_fee' => $request['tuition_fee'],
                'time' => $request['time'],
                'date_start' => $request['date_start'],
                'date_end' => $request['date_end'],
                'description' => $request['description'],
                'teacher_id' => auth()->user()->id,
            ];
            $newClass = Classroom::create($data);
            DB::commit();
            return $newClass;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    public function listClassroomWithStatusAndAvgStar(
        $status,
        $orderString,
        $searchValue,
        $pageSize,
        $ward,
        $isStart,
        $orderByClass
    ) {
        try {
            $classrooms = $this->classrooms->with([
                'profileTeacher.user', 'upload', 'address.ward.city'
            ]);

            if (!is_null($status)) {
                $classrooms = $classrooms
                                ->with([
                                    'profileTeacher'
                                    => fn ($query) => $query->where('status', '=', $status),
                                ])
                                ->whereHas('profileTeacher', function ($query) use ($status) {
                                    $query->where('status', '=', $status);
                                });
            }

            if (!empty($searchValue)) {
                $classrooms = $classrooms
                                ->whereHas('profileTeacher', function ($query) use ($searchValue) {
                                    $query->join('users', 'users.id', '=', 'profile_teachers.user_id')
                                    ->where('class_name', 'like', '%' . $searchValue . '%')
                                    ->orWhere('subject', 'like', '%' . $searchValue . '%')
                                    ->orWhere('users.full_name', 'like', '%' . $searchValue . '%');
                                });
            }

            if (!empty($ward)) {
                $classrooms = $classrooms
                                ->whereHas('address', function ($query) use ($ward) {
                                    $query->where('addresses.m_ward_id', $ward);
                                });
            }

            if (!is_null($isStart)) {
                $getNow = Carbon::now();
                if ($isStart) {
                    $classrooms = $classrooms
                                    ->where('date_start', '<=', $getNow)
                                    ->where('date_end', '>', $getNow);
                } else {
                    $classrooms = $classrooms->where('date_start', '>', $getNow);
                }
            }

            if (!empty($orderByClass)) {
                $classrooms = $classrooms->orderBy('class_name', $orderByClass);
            }

            $classrooms = $this->withAvgStar($classrooms);

            if (!empty($orderString)) {
                $classrooms = $classrooms->orderBy('avg_star', $orderString);
            }

            $data = new ClassroomCollection($classrooms->paginate($pageSize));
            return $data;
        } catch (Exception $e) {
            logger($e->getMessage());
            throw $e;
        }
    }
    public function listClassroomWithTeacherId($id, $orderString, $searchValue, $pageSize)
    {
        try {
            $classrooms = $this->classrooms
                                    ->with(['upload', 'address.ward.city'])
                                    ->whereHas('profileTeacher.user', function ($query) use ($id) {
                                        $query->where('id', '=', $id);
                                    });
            if (!empty($searchValue)) {
                $classrooms = $classrooms
                                ->whereHas('profileTeacher.user', function ($query) use ($searchValue, $id) {
                                    $query->where('id', '=', $id)
                                        ->where('class_name', 'like', '%' . $searchValue . '%')
                                        ->orWhere('subject', 'like', '%' . $searchValue . '%');
                                });
            }
            $classrooms = $this->withAvgStar($classrooms);
            if ($orderString) {
                $classrooms = $classrooms->orderBy('avg_star', $orderString);
            }
            $data = new ClassroomCollection($classrooms->paginate($pageSize));
            return $data;
        } catch (\Throwable $th) {
            logger($th->getMessage());
            throw $th;
        }
    }
    public function listClassroomsOfChild($searchValue, $orderByClass, $pageSize)
    {
        $user = auth()->user();
        $classrooms = $this->classrooms->with([
            'profileTeacher.user',
            'upload',
            'address.ward.city',
        ]);
        $idsChildren = $user->childrens()->pluck('id');
        $classrooms = $classrooms->whereHas(
            'classroomUsers',
            function ($query) use ($idsChildren) {
                $query->where('status', User::STUDENT_STATUSES['APPROVED'])
                    ->whereIn('user_id', $idsChildren);
            }
        );
        if (!empty($searchValue)) {
            $classrooms = $classrooms->where('class_name', 'like', '%' . $searchValue . '%');
        }
        if (!empty($orderByClass)) {
            $classrooms = $classrooms->orderBy('classrooms.class_name', $orderByClass);
        }
        $data = new ClassroomCollection($classrooms->paginate($pageSize));
        return $data;
    }
    public function listClassroomsOfStudent($searchValue, $orderByClass, $pageSize)
    {
        $user = auth()->user();
        $classrooms = $this->classrooms->with([
            'profileTeacher.user',
            'upload',
            'address.ward.city',
        ]);
        $classrooms = $classrooms->whereHas(
            'classroomUsers',
            function ($query) use ($user) {
                $query->where('status', User::STUDENT_STATUSES['APPROVED'])
                   ->where('user_id', $user->id);
            }
        );
        if (!empty($searchValue)) {
            $classrooms = $classrooms->where('class_name', 'like', '%' . $searchValue . '%');
        }
        if (!empty($orderByClass)) {
            $classrooms = $classrooms->orderBy('classrooms.class_name', $orderByClass);
        }
        $data = new ClassroomCollection($classrooms->paginate($pageSize));
        return $data;
    }
    public function checkPermissions($classroom, $acceptAdmin = false)
    {
        $user = auth()->user();
        return ($acceptAdmin && $user->role == User::ROLES['ADMIN']) ||
            ($user->role == User::ROLES['TEACHER'] && $user->id == $classroom->teacher_id);
    }
    public function classDelete($id)
    {
        $classroom = Classroom::find($id);
        if (is_null($classroom)) {
            throw new \Exception(trans('message.classroom'));
        }
        if ($this->checkPermissions($classroom, true)) {
            $classroomResource = $classroom->delete();
            return $classroomResource;
        } else {
            throw new \Exception(trans('message.unauthorized'));
        }
    }
    private function getClassroomWithDetail($id, $checkPermissions = false)
    {
        $classroom = Classroom::with('profileTeacher.user');
        $classroomWithAvgStar = $this->withAvgStar($classroom)->find($id);
        if (is_null($classroomWithAvgStar)) {
            throw new \Exception(trans('message.classroom'));
        }
        $classroomResource = new ClassroomResource($classroomWithAvgStar);
        if ($checkPermissions && !$this->checkPermissions($classroomResource, true)) {
            throw new \Exception(trans('message.unauthorized'));
        }
        return $classroomResource;
    }
    public function classDetail($id)
    {
        return $this->getClassroomWithDetail($id, true);
    }
    public function globalDetail($id)
    {
        return $this->getClassroomWithDetail($id, false);
    }
    public function countAbsentLessonsOfClassroom($userId, $classroomId)
    {
        $countAbsentLessons = 0;
        $classroom = $this->classrooms->findOrFail($classroomId);
        $lessons = $classroom->lessons;
        foreach ($lessons as $lesson) {
            $countAbsentLessons += $lesson
                        ->absentStudents()
                        ->where('user_id', $userId)
                        ->count();
        }
        return $countAbsentLessons;
    }
    public function studentsInClassroomWithParent($classroomId)
    {
        $parent = auth()->user();
        $data = [];
        $classroom = $this->classrooms->findOrFail($classroomId);
        $students = $classroom
                        ->userWithPivot()
                        ->where('status', '!=', User::PARENT_COMMENT_STATUS)
                        ->get();
        $idsStudents = $parent
                            ->childrens()
                            ->with('classroomsWithPivot')
                            ->get()->pluck('id')->toArray();
        foreach ($students as $student) {
            if (in_array($student->id, $idsStudents)) {
                $detailStudent = $this->getDetailStudentOfClassroom($classroomId, $student);
                $data[] = new StudentWithStatusResource($detailStudent);
            }
        }
        return $data;
    }
    public function getDetailStudentOfClassroom($classroomId, $student)
    {
        $classroom = $this->classrooms->findOrFail($classroomId);
        $detailStudent = $classroom->users()->where('user_id', $student->id)->first();
        if (empty($detailStudent)) {
            return null;
        }
        $detailStudent = $student;
        $absentLessons = $classroom
                            ->lessons()
                            ->whereHas(
                                'absentStudents',
                                function ($query) use ($student) {
                                    $query->where('user_id', $student->id);
                                }
                            )
                            ->get();
        $lessonsUntilNow = $classroom->lessons()->whereDate('time_end', '<=', Carbon::now())->get();
        $detailStudent['countAbsentLessons'] = $absentLessons->count();
        $detailStudent['absentLessons'] = $absentLessons;
        $detailStudent['lessonsUntilNow'] = $lessonsUntilNow;
        return $detailStudent;
    }
    public function listFeedbackOfClass($id)
    {
        try {
            $classroom = $this->classrooms->find($id);
            $feedback = $classroom->userWithPivot()
                                  ->where('status', User::PARENT_COMMENT_STATUS)
                                  ->orderBy('date_comment', 'DESC')
                                  ->get();
            $feedbackDetails = collect($feedback)->map(function ($user) {
                return [
                    'user' => new UserResource($user),
                    'comment' => $user->pivot->comment,
                    'star' => $user->pivot->star,
                    'date_comment' => $user->pivot->date_comment
                ];
            });
            return $feedbackDetails;
        } catch (\Throwable $th) {
            logger($th->getMessage());
            throw $th;
        }
    }
    public function updateClassroom($dataUpdate, $id)
    {
        try {
            $classroom = $this->classrooms->find($id);
            $classroom->update([
                'class_name' => $dataUpdate['class_name'],
                'subject' => $dataUpdate['subject'],
                'quantity' => $dataUpdate['quantity'],
                'tuition_fee' => $dataUpdate['tuition_fee'],
                'description' => $dataUpdate['description'],
                'time' => $dataUpdate['time'],
                'date_start' => $dataUpdate['date_start'],
                'date_end' => $dataUpdate['date_end'],
                'm_ward_id' => $dataUpdate['m_ward_id'],
                'address' => $dataUpdate['address']
            ]);
            return $classroom;
        } catch (Exception $e) {
            throw $e;
        }
    }
    public function approveStudent($classroomId, $studentId, $status)
    {
        try {
            $classroom = $this->classrooms->findOrFail($classroomId);
            if (!$this->checkPermissions($classroom)) {
                throw new HttpException(Response::HTTP_FORBIDDEN);
            }
            $student = $classroom->userWithPivot()->findOrFail($studentId);
            $countStudentsApproved = $classroom
                                        ->userWithPivot()
                                        ->where(
                                            'status',
                                            User::STUDENT_STATUSES['APPROVED']
                                        )
                                        ->count();
            if (
                $countStudentsApproved >= $classroom->quantity
                && $status == USER::STUDENT_STATUSES['APPROVED']
            ) {
                throw ValidationException::withMessages([
                    'student' => __('message.approved_error')
                ]);
            }
            $classroom->userWithPivot()->updateExistingPivot($student, ['status' => $status]);
            $student->notify(new ApproveStudent($classroom, $student, $status));
            $student->parent->notify(new ApproveStudent($classroom, $student, $status, true));
            return $student->load('parent');
        } catch (\Throwable $th) {
            logger($th->getMessage());
            throw $th;
        }
    }
    public function attendLesson($classroomId, $lessonId, $students)
    {
        try {
            $classroom = $this->classrooms->findOrFail($classroomId);
            if (!$this->checkPermissions($classroom)) {
                throw new HttpException(Response::HTTP_FORBIDDEN);
            }
            $lesson = $classroom->lessons()->findOrFail($lessonId);
            if ($lesson->date_start > Carbon::now()) {
                throw new HttpException(Response::HTTP_FORBIDDEN);
            }
            $studentInLesson = $classroom->userWithPivot()
                                            ->where('status', '!=', User::PARENT_COMMENT_STATUS)
                                            ->get();
            $idsStudentInLesson = $studentInLesson->pluck('id')->toArray();
            DB::beginTransaction();
            foreach ($students as $student) {
                if (!in_array($student['id'], $idsStudentInLesson)) {
                    throw (new ModelNotFoundException())->setModel(User::class);
                }
                $studentAttend = $studentInLesson->find($student['id']);
                $studentAbsent = $lesson
                                    ->absentStudents()
                                    ->where('user_id', $student['id'])->first();
                if (!empty($studentAbsent)) {
                    throw ValidationException::withMessages([
                        'lesson' => __('message.attend_error')
                    ]);
                }
                if ($student['status'] == User::ATTEND_STUDENT_STATUSES['ABSENT']) {
                    $lesson->absentStudents()->create(['user_id' => $student['id']]);
                }
                $studentAttend->notify(
                    new AttendStudent(
                        $classroom,
                        $studentAttend,
                        $lesson,
                        $student['status']
                    )
                );
                $studentAttend->parent->notify(
                    new AttendStudent(
                        $classroom,
                        $studentAttend,
                        $lesson,
                        $student['status'],
                        true
                    )
                );
            }
            DB::commit();
            return new LessonResource($lesson->with('absentStudents.user')->first());
        } catch (\Throwable $th) {
            DB::rollBack();
            logger($th->getMessage());
            throw $th;
        }
    }
    public function joinClass($classroomId, $studentId)
    {
        $user = auth()->user();
        try {
            $classroom = $this->classrooms->findOrFail($classroomId);
            $existStudent = $classroom->userWithPivot()->find($studentId);
            if (!empty($existStudent)) {
                throw ValidationException::withMessages([
                    'student_id' => __('message.join_class_error')
                ]);
            }
            $student = $this->users
                                ->where('role', User::ROLES['CHILDREN'])
                                ->findOrFail($studentId);
            if ($student->parent->id != $user->id) {
                throw new HttpException(Response::HTTP_FORBIDDEN);
            }
            $classroom->users()->attach($studentId);
            $joinedStudent = $classroom->users()->find($studentId);
            return new ChildrenResource($joinedStudent);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            throw $th;
        }
    }
    public function countStudentApproveInClass($classroomId)
    {
        $result = DB::table('classroom_users')
                        ->select(DB::raw('COUNT(classroom_users.id) as count'))
                        ->where('classroom_id', $classroomId)
                        ->where(function ($query) {
                            $query->where('status', User::STUDENT_STATUSES['APPROVED']);
                        })
                        ->get();
        $count = $result->first() ? $result->first()->count : 0;
        return $count;
    }
    public function checkUserFeedbackInClass($userId, $classroomId)
    {
        return ClassroomUser::where(['user_id' => $userId, 'classroom_id' => $classroomId])->first();
    }
    public function checkUserInClass($idsChildren, $classroomId)
    {
        return $this->classrooms->where('id', $classroomId)->whereHas(
            'classroomUsers',
            function ($query) use ($idsChildren) {
                $query->where('status', User::STUDENT_STATUSES['APPROVED'])
                    ->whereIn('user_id', $idsChildren);
            }
        )->first();
    }
    public function createFeedbackInClass($request)
    {
        $user = auth()->user();
        $userId = $user->id;
        $classroomId = $request['classroom_id'];
        $idsChildren = $user->childrens()->pluck('id')->toArray();
        if ($this->checkUserFeedbackInClass($userId, $classroomId)) {
            throw new Exception(__('message.feedback'));
        } elseif (!$this->checkUserInClass($idsChildren, $classroomId)) {
            throw new Exception(__('message.not_in_class'));
        }
        try {
            $data = [
                'comment' => $request['comment'],
                'star' => $request['star'],
                'date_comment' => date('Y-m-d H:i:s'),
                'status' => User::PARENT_COMMENT_STATUS,
                'user_id' => $userId,
                'classroom_id' => $classroomId
            ];
            $newFeedback = ClassroomUser::create($data);
            return $newFeedback;
        } catch (Exception $e) {
            throw $e;
        }
    }
}

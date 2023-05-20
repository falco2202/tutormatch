<?php

namespace App\Services;

use App\Http\Resources\StudentCollection;
use App\Http\Resources\StudentResource;
use App\Models\Classroom;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class StudentService
{
    protected $users;
    protected $classrooms;

    public function __construct(User $users, Classroom $classrooms)
    {
        $this->users = $users;
        $this->classrooms = $classrooms;
    }
    public function listAllStudent($searchValue, $pageSize)
    {
        try {
            $students = $this->users
                                ->with(['parent'])
                                ->where('role', User::ROLES['CHILDREN']);
            if (!empty($searchValue)) {
                $students = $students->searchByValue($searchValue);
            }
            return (new StudentCollection($students->paginate($pageSize)));
        } catch (\Throwable $th) {
            logger($th->getMessage());
            throw $th;
        }
    }
    public function listStudentOfClass($classroomId, $studentStatus, $searchValue, $pageSize)
    {
        $user = auth()->user();
        try {
            $classroom = $this->classrooms->findOrFail($classroomId);
            if (($user->id != $classroom->profileTeacher->user_id)
                && ($user->role != User::ROLES['ADMIN'])
                && $studentStatus != User::STUDENT_STATUSES['APPROVED']
            ) {
                throw new HttpException(Response::HTTP_FORBIDDEN);
            }
            $students = $classroom
                            ->userWithPivot()
                            ->where('status', '!=', User::PARENT_COMMENT_STATUS);
            if (!is_null($studentStatus)) {
                $students = $students->where('status', '=', $studentStatus);
            }
            if (!empty($searchValue)) {
                $students = $students->searchByValue($searchValue);
            }
            return (new StudentCollection($students->paginate($pageSize)));
        } catch (\Throwable $th) {
            logger($th->getMessage());
            throw $th;
        }
    }
    public function listStudentOfParent($searchValue)
    {
        $parent = auth()->user();
        try {
            $students = $parent->childrens()->with('classroomsWithPivot');
            if (!empty($searchValue)) {
                $students = $students->searchByValue($searchValue);
            }
            return StudentResource::collection($students->get());
        } catch (\Throwable $th) {
            logger($th->getMessage());
            throw $th;
        }
    }
    public function detailStudentOfAdmin($id)
    {
        try {
            $student = User::with(['parent'])->where('role', User::ROLES['CHILDREN'])->find($id);
            if (is_null($student)) {
                throw new \Exception(trans('message.student'));
            }
            return (new StudentResource($student));
        } catch (\Throwable $th) {
            logger($th->getMessage());
            throw $th;
        }
    }
    public function detailStudentOfTeacher($id)
    {
        $user = auth()->user();
        try {
            $student = User::with(['classrooms'])->where('role', User::ROLES['CHILDREN'])->find($id);
            if (is_null($student)) {
                throw new \Exception(trans('message.student'));
            }
            $teachersId = $student->classrooms()->pluck('teacher_id')->toArray();
            if (!in_array($user->profileTeacher->user_id, $teachersId)) {
                throw new HttpException(Response::HTTP_FORBIDDEN);
            }
            return (new StudentResource($student));
        } catch (\Throwable $th) {
            logger($th->getMessage());
            throw $th;
        }
    }
    public function detailStudentOfParent($id)
    {
        $user = auth()->user();
        try {
            $student = User::with(['parent'])->where('role', User::ROLES['CHILDREN'])->find($id);
            if (is_null($student)) {
                throw new \Exception(trans('message.student'));
            } elseif ($student->parent->id != $user->id) {
                throw new HttpException(Response::HTTP_FORBIDDEN);
            } else {
                return (new StudentResource($student));
            }
        } catch (\Throwable $th) {
            logger($th->getMessage());
            throw $th;
        }
    }
    public function createChildrenAccount($request)
    {
        $user = auth()->user();
        try {
            $data = [
                'full_name' => $request['full_name'],
                'email' => $request['email'],
                'password' => $request['password'],
                'gender' => $request['gender'],
                'phone' => $request['phone'],
                'role' => User::ROLES['CHILDREN'],
                'date_of_birth' => $request['date_of_birth'],
                'parent_id' => $user->id,
                'email_verified_at' => Carbon::now()
            ];
            $newChildrenAccount = User::create($data);
            return $newChildrenAccount;
        } catch (Exception $e) {
            throw $e;
        }
    }
}

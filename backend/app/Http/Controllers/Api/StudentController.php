<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CreateChildrenAccountRequest;
use App\Models\User;
use App\Services\StudentService;
use App\Services\UploadService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class StudentController extends ApiController
{
    protected $studentService;

    public function __construct(StudentService $studentService)
    {
        $this->studentService = $studentService;
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
        $classroomId = $request->get('classroom_id');
        $studentStatus = $request->get('student_status');
        $user = auth()->user();
        $data = null;
        try {
            switch ($user->role) {
                case User::ROLES['ADMIN']:
                    $data = $this->studentService
                        ->listAllStudent(
                            $searchValue,
                            $pageSize
                        );
                    break;
                case User::ROLES['TEACHER']:
                    $data = $this->studentService
                        ->listStudentOfClass(
                            $classroomId,
                            $studentStatus,
                            $searchValue,
                            $pageSize
                        );
                    break;
                case User::ROLES['PARENT']:
                    $data = $this->studentService
                    ->listStudentOfParent(
                        $searchValue,
                    );
                    break;
            }
            return $this->resSuccess($data);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            if (
                $th instanceof HttpException
                || $th instanceof ModelNotFoundException
            ) {
                throw $th;
            }
            return $this->resInternalError();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function store(CreateChildrenAccountRequest $request)
    {
        $this->authorize('create', User::class);
        try {
            $this->studentService->createChildrenAccount($request);
            return $this->resSuccess(['message' => __('message.success_key.create_account_children_success')]);
        } catch (Exception $e) {
            logger($e->getMessage());
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
        $user = auth()->user();
        $data = null;
        try {
            switch ($user->role) {
                case User::ROLES['ADMIN']:
                    $data = $this->studentService->detailStudentOfAdmin($id);
                    break;
                case User::ROLES['TEACHER']:
                    $data = $this->studentService->detailStudentOfTeacher($id);
                    break;
                case User::ROLES['PARENT']:
                    $data = $this->studentService->detailStudentOfParent($id);
                    break;
                default:
                    return $this->resUnauthorized();
                    break;
            }
            return $this->resSuccess($data);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            if ($th->getMessage() == trans('message.student')) {
                return $this->resNotFound($th->getMessage());
            } elseif (
                $th instanceof HttpException
                || $th instanceof ModelNotFoundException
            ) {
                throw $th;
            } else {
                return $this->resInternalError();
            }
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

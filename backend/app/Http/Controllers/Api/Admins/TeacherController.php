<?php

namespace App\Http\Controllers\Api\Admins;

use App\Http\Controllers\Api\ApiController;
use App\Models\ProfileTeacher;
use App\Http\Resources\TeacherResource;
use App\Http\Resources\TeacherCollection;
use App\Models\User;
use App\Notifications\BlockTeacher;
use App\Notifications\ConfirmTeacher;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TeacherController extends ApiController
{
    protected $user;
    protected $profileTeacher;
    protected $notificationService;

    public function __construct(User $user, ProfileTeacher $profileTeacher)
    {
        $this->user = $user;
        $this->profileTeacher = $profileTeacher;
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
        $teacherStatus = $request->get('status');
        try {
            $teachers = $this->user
                                ->with([
                                    'address.ward.city',
                                    'profileTeacher.classrooms'
                                ])
                                ->where('role', User::ROLES['TEACHER']);
            if (!empty($searchValue)) {
                $teachers = $teachers->searchByValue($searchValue);
            }
            if (!is_null($teacherStatus)) {
                $teachers->whereHas(
                    'profileTeacher',
                    function ($query) use ($teacherStatus) {
                        return $query->where('status', '=', $teacherStatus);
                    }
                );
            }
            $data = new TeacherCollection($teachers->paginate($pageSize));
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $teacher = $this->user->where('role', User::ROLES['TEACHER'])->with('address.ward.city')->find($id);
        if (is_null($teacher)) {
            return $this->resNotFound(User::TEACHER_KEY);
        }
        $teacherResource = new TeacherResource($teacher);
        return $this->resSuccess($teacherResource);
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

    public function block($id)
    {
        try {
            $teacher = $this->profileTeacher
                            ->where('user_id', $id)
                            ->where('status', '<>', ProfileTeacher::STATUS['PENDING'])
                            ->first();
            if (is_null($teacher)) {
                return $this->resNotFound(User::TEACHER_KEY);
            }
            $teacher->status == ProfileTeacher::STATUS['CONFIRM']
                ? $teacher->status = ProfileTeacher::STATUS['BLOCK']
                : $teacher->status = ProfileTeacher::STATUS['CONFIRM'];
            $teacher->save();
            $user = $teacher->user;
            $user->notify(new BlockTeacher($user, $teacher->status));
            if ($teacher->status == ProfileTeacher::STATUS['CONFIRM']) {
                return $this->resSuccess(['message' => __('message.success_key.unlock_success')]);
            } else {
                return $this->resSuccess(['message' => __('message.success_key.lock_success')]);
            }
        } catch (\Throwable $th) {
            logger($th->getMessage());
            return $this->resInternalError();
        }
    }
    public function confirm($id)
    {
        $teacher = $this->profileTeacher
                            ->where('user_id', '=', $id)
                            ->where('status', '=', ProfileTeacher::STATUS['PENDING'])
                            ->first();
        if (is_null($teacher)) {
            return $this->resNotFound(User::TEACHER_KEY);
        } else {
            try {
                $teacher->status = ProfileTeacher::STATUS['CONFIRM'];
                $teacher->save();
                $teacher->user->notify(new ConfirmTeacher());
                return $this->resSuccess(['message' => __('message.success_key.confirm_teacher_success')]);
            } catch (\Throwable $th) {
                logger($th->getMessage());
                return $this->resInternalError();
            }
        }
    }
}

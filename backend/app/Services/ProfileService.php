<?php

namespace App\Services;

use App\Http\Resources\AdminResource;
use App\Http\Resources\ChildrenResource;
use App\Http\Resources\ParentResource;
use App\Http\Resources\TeacherResource;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;

class ProfileService
{
    public function getProfileByRole(User $user)
    {
        switch ($user->role) {
            case User::ROLES['ADMIN']:
                return new AdminResource($user);
            case User::ROLES['TEACHER']:
                return new TeacherResource($user);
            case User::ROLES['PARENT']:
                return new ParentResource($user);
            default:
                return new ChildrenResource($user);
        }
    }
    public function updateProfile($dataUpdate)
    {
        DB::beginTransaction();
        try {
            $user = $this->updateProfileUser($dataUpdate);
            if ($user->role === User::ROLES['TEACHER']) {
                $user = $this->updateProfileTeacher($dataUpdate, $user);
            }
            DB::commit();
            return $user;
        } catch (Exception $e) {
            DB::rollBack();
            logger($e->getMessage());
            throw $e;
        }
    }
    public function updateProfileTeacher($dataUpdate, $user)
    {
        $user->profileTeacher->at_school = $dataUpdate['at_school'];
        $user->profileTeacher->description = $dataUpdate['description'];
        $user->profileTeacher->save();
        return $user;
    }
    public function updateProfileUser($dataUpdate)
    {
        $user = User::find(auth()->user()->id);
        $user->full_name = $dataUpdate['full_name'];
        $user->gender = $dataUpdate['gender'];
        $user->phone = $dataUpdate['phone'];
        $user->date_of_birth = Carbon::parse($dataUpdate['date_of_birth']);
        $user->save();
        return $user;
    }
}

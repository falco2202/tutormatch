<?php

namespace App\Services;

use App\Models\ProfileTeacher;

class TeacherService
{
    public function isTeacherConfirm()
    {
        $user = auth()->user();
        $teacher = ProfileTeacher::where('user_id', $user->id)
                                ->where('status', ProfileTeacher::STATUS['CONFIRM'])->first();
        if (is_null($teacher)) {
            return false;
        } else {
            return true;
        }
    }
    public function getStatusTeacher()
    {
        $user = auth()->user();
        $teacher = ProfileTeacher::where('user_id', $user->id)->first();
        return $teacher ? $teacher->status : null;
    }
}

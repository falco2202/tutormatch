<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Classroom extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'classrooms';
    protected $fillable = [
        'class_name',
        'quantity',
        'subject',
        'tuition_fee',
        'time',
        'date_start',
        'date_end',
        'description',
        'teacher_id',
    ];

    protected $hidden = [
        'updated_at',
        'created_at',
        'deleted_at',
    ];

    public function upload(): MorphOne
    {
        return $this->morphOne(Upload::class, 'uploadable');
    }

    public function address(): MorphOne
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class);
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    public function profileTeacher(): BelongsTo
    {
        return $this->belongsTo(ProfileTeacher::class, 'teacher_id', 'user_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'classroom_users');
    }
    
    public function userWithPivot()
    {
        return $this->users()->withPivot('comment', 'star', 'date_comment', 'status');
    }

    public function classroomUsers(): HasMany
    {
        return $this->hasMany(ClassroomUser::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lesson extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'lessons';

    protected $fillable = [
        'time_start',
        'time_end',
        'classroom_id'
    ];
    protected $hidden = [
        'deleted_at',
        'created_at',
        'updated_at'
    ];

    public function absentStudents()
    {
        return $this->hasMany(AbsentStudent::class);
    }
    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }
}

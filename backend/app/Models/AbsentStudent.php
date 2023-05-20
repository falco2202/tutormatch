<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AbsentStudent extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'absent_students';

    protected $fillable = [
        'lesson_id',
        'user_id',
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

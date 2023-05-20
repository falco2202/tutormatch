<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClassroomUser extends Model
{
    use HasFactory;

    protected $table = 'classroom_users';

    protected $fillable = [
        'comment',
        'star',
        'date_comment',
        'status',
        'user_id',
        'classroom_id'
    ];
    public $timestamps = false;
}

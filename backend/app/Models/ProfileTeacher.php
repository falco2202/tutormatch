<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProfileTeacher extends Model
{
    use HasFactory;
    use SoftDeletes;

    public const STATUS = ['PENDING' => 0, 'CONFIRM' => 1, 'BLOCK' => 2];
    protected $table = 'profile_teachers';
    protected $primaryKey = 'user_id';
    protected $fillable = [
        'user_id',
        'status',
        'at_school',
        'description',
    ];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'updated_at',
        'created_at',
        'deleted_at',
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function classrooms(): HasMany
    {
        return $this->hasMany(Classroom::class, 'teacher_id', 'user_id');
    }
}

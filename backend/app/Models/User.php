<?php

namespace App\Models;

use App\Notifications\CustomVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use SoftDeletes;

    public const ROLES = ['ADMIN' => 0, 'TEACHER' => 1, 'PARENT' => 2, 'CHILDREN' => 3];
    public const PARENT_KEY = 'parent';
    public const TEACHER_KEY = 'teacher';
    public const ADMIN_KEY = 'admin';
    public const STUDENT_KEY = 'student';
    public const STUDENT_STATUSES = ['REGISTERED' => 0, 'APPROVED' => 1, 'CANCELED' => 2];
    public const PARENT_COMMENT_STATUS = 3;
    public const ATTEND_STUDENT_STATUSES = ['ABSENT' => 0, 'PRESENT' => 1];

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'full_name',
        'email',
        'password',
        'phone',
        'date_of_birth',
        'gender',
        'role',
        'parent_id',
        'email_verified_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'updated_at',
        'created_at',
        'pivot'
    ];

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new CustomVerifyEmail);
    }

    public function address(): MorphOne
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function image(): MorphOne
    {
        return $this->morphOne(Upload::class, 'uploadable');
    }
    public function upload(): MorphOne
    {
        return $this->morphOne(Upload::class, 'uploadable');
    }
    public function childrens(): HasMany
    {
        return $this->hasMany(User::class, 'parent_id');
    }
    public function parent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'parent_id');
    }
    protected function password(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => Hash::make($value),
        );
    }

    public function notification(): MorphOne
    {
        return $this->morphOne(Notification::class, 'notifiable');
    }

    public function classrooms(): BelongsToMany
    {
        return $this->belongsToMany(Classroom::class, 'classroom_users');
    }

    public function classroomsWithPivot()
    {
        return $this->classrooms()->withPivot('comment', 'star', 'date_comment', 'status');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function profileTeacher(): HasOne
    {
        return $this->hasOne(ProfileTeacher::class, 'user_id', 'id');
    }
    
    public function scopeSearchByValue(Builder $query, string $searchValue): Builder
    {
        return $query->where('full_name', 'like', '%' . $searchValue . '%')
            ->orWhere('phone', 'like', '%' . $searchValue . '%')
            ->orWhere('email', 'like', '%' . $searchValue . '%');
    }
}

<?php

use App\Events\MessageEvent;
use App\Events\PublicMessageEvent;
use App\Http\Controllers\Api\Admins\ParentController;
use App\Http\Controllers\Api\Admins\TeacherController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\ClassroomController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\UploadController;
use App\Models\Message;
use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::post('/verify-email', 'verifyEmail');
    Route::post('/logout', 'logout')->middleware([
        'auth:sanctum',
        'abilities:' . config('constant.login_token_ability')
    ]);
});

Route::middleware([
    'auth:sanctum',
    'abilities:' . config('constant.login_token_ability'),
    'admin'
])
    ->prefix('admins')->group(function () {
        Route::apiResource('parents', ParentController::class);
        Route::prefix('teachers')->controller(TeacherController::class)->group(function () {
            Route::get('/', 'index');
            Route::get('/{id}', 'show');
            Route::put('/{id}', 'block');
            Route::patch('/{id}', 'confirm');
        });
    });

Route::prefix('classrooms')->controller(ClassroomController::class)->group(function () {
    Route::get('/', 'index');
    Route::middleware([
        'auth:sanctum',
        'abilities:' . config('constant.login_token_ability')
    ])->group(function () {
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::delete('/{id}', 'destroy');
    });
});

Route::prefix('notification')
    ->middleware([
        'auth:sanctum',
        'abilities:' . config('constant.login_token_ability')
    ])
    ->controller(NotificationController::class)->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', 'show');
        Route::post('/', 'store');
    });

Route::middleware([
    'auth:sanctum',
    'abilities:' . config('constant.login_token_ability')
])
    ->prefix('/management/classrooms')
    ->controller(ClassroomController::class)
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', 'show');
        Route::post('/', 'store');
        Route::post('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
        Route::patch('/{id}/students/{studentId}', 'approve');
        Route::post('/{id}/lessons/{lessonId}', 'attend');
        Route::post('/{id}/students', 'join');
        Route::post('/{id}/feedbacks', 'createFeedback');
    });

Route::middleware([
    'auth:sanctum',
    'abilities:' . config('constant.login_token_ability')
])
    ->prefix('students')
    ->controller(StudentController::class)
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', 'show');
        Route::post('/', 'store');
    });

Route::prefix('classrooms')->group(function () {
    Route::get('/', [ClassroomController::class, 'global']);
    Route::get('/{id}', [ClassroomController::class, 'detailGlobal']);
});

Route::middleware([
    'auth:sanctum',
    'abilities:' . config('constant.login_token_ability')
])->prefix('profiles')
    ->controller(ProfileController::class)
    ->group(function () {
        Route::get('/', 'show');
        Route::post('/', 'update');
    });

Route::prefix('cities')->controller(CityController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{id}', 'show');
});

Route::middleware([
    'auth:sanctum',
    'abilities:' . config('constant.login_token_ability'),
    'chat.permission'
])
    ->prefix('chat')
    ->controller(ChatController::class)
    ->group(function () {
        Route::post('/', 'sendMessage');
        Route::get('/', 'getListConversation');
        Route::get('/{id}', 'getListMessagesOfConversation');
    });

Route::middleware([
    'auth:sanctum',
    'abilities:' . config('constant.login_token_ability'),
])->group(function () {
    Route::post('/upload', [UploadController::class, 'upload']);
    Broadcast::routes();
});

<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\AdminResource;
use App\Http\Resources\ChildrenResource;
use App\Http\Resources\ParentResource;
use App\Http\Resources\TeacherResource;
use App\Models\PersonalAccessToken;
use App\Services\AuthService;
use App\Services\ProfileService;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AuthController extends ApiController
{
    protected $user;
    protected $profileService;
    public function __construct(User $user, ProfileService $profileService)
    {
        $this->user = $user;
        $this->profileService = $profileService;
    }

    protected function createAddress($user, $address): void
    {
        // TODO: Lay Longtitude va Latitude tu address
        $lat = 0;
        $long = 0;
        $user->address()->create(
            [
                'm_ward_id' => $address['m_ward_id'],
                'address' => $address['address'],
                'lat' => $lat,
                'long' => $long
            ]
        );
    }
    protected function createProfileTeacher($user, $profileTeacher): void
    {
        $user->profileTeacher()->create(
            [
                'at_school' => !empty($profileTeacher['at_school']) ? $profileTeacher['at_school'] : null,
                'description' => !empty($profileTeacher['description']) ? $profileTeacher['description'] : null,
            ]
        );
    }
    protected function registerUser($userInfo, $isTeacher = false): JsonResponse
    {
        DB::beginTransaction();
        try {
            $newUser = $this->user->create($userInfo);
            $this->createAddress($newUser, $userInfo);
            if ($isTeacher) {
                $this->createProfileTeacher($newUser, $userInfo);
            }
            event(new Registered($newUser));
            DB::commit();
            return $this->resSuccess(['message' => __('message.success_key.register_success')]);
        } catch (\Exception $e) {
            DB::rollBack();
            logger($e->getMessage());
            return $this->resInternalError();
        }
    }
    public function register(RegisterRequest $request): JsonResponse
    {
        $userInfo = $request->validated();
        $isRoleTeacher = $request->get('role_register');
        if (!empty($isRoleTeacher)) {
            $userInfo['role'] = User::ROLES['TEACHER'];
        }
        return $this->registerUser($userInfo, !empty($isRoleTeacher));
    }
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->apiError(
                    __('message.wrong_email_password'),
                    __('message.wrong_email_password'),
                    Response::HTTP_NOT_FOUND
                );
            }
            $user = User::where('email', $request->email)->first();
            if (is_null($user->email_verified_at)) {
                throw ValidationException::withMessages([
                    'verify' => __('message.unconfirmed_account')
                ]);
            }
            $data = $this->profileService->getProfileByRole($user);
            $data['token'] = $user
                                ->createToken(
                                    config('constant.login_token_name'),
                                    [config('constant.login_token_ability')]
                                )
                                ->plainTextToken;
            return $this->resSuccess(['message' => __('message.success_key.login_success'),
                                      ...$data->toArray($request)]);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            throw $th;
        }
    }
    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
            return $this->resSuccess(['message' => __('message.success_key.logout_success')]);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            return $this->resInternalError();
        }
    }
    public function verifyEmail(Request $request)
    {
        DB::beginTransaction();
        try {
            $token = PersonalAccessToken::findToken($request->get('token'));
            if (empty($token)) {
                throw ValidationException::withMessages([
                    'token' => __('message.token_not_found')
                ]);
            }
            if (
                $token->cant(config('constant.verify_email_token_ability')) ||
                !is_null($token->last_used_at)
            ) {
                throw ValidationException::withMessages([
                    'token' => __('message.token_does_not_match')
                ]);
            }
            if ($token->expires_at < Carbon::now()) {
                throw ValidationException::withMessages([
                    'token' => __('message.token_expired')
                ]);
            }
            $user = $token->tokenable;
            $dateNow = Carbon::now()->format(config('constant.datetime_format'));
            $user->update(['email_verified_at' => $dateNow]);
            $token->update(['last_used_at' => $dateNow]);
            DB::commit();
            return $this->resSuccess($user);
        } catch (\Throwable $th) {
            DB::rollBack();
            logger($th->getMessage());
            throw $th;
        }
    }
}

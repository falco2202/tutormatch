<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\AdminResource;
use App\Http\Resources\ChildrenResource;
use App\Http\Resources\ParentResource;
use App\Http\Resources\TeacherResource;
use App\Models\ProfileTeacher;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Services\AddressService;
use App\Services\ProfileService;
use App\Services\UploadService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends ApiController
{
    protected $profileService;
    protected $user;
    protected $addressService;
    protected $uploadService;

    public function __construct(
        ProfileService $profileService,
        User $user,
        AddressService $addressService,
        UploadService $uploadService
    ) {
        $this->profileService = $profileService;
        $this->addressService = $addressService;
        $this->uploadService = $uploadService;
        $this->user = $user;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        try {
            $user = auth()->user();
            if (is_null($user)) {
                throw new \Exception(trans('message.unauthorized'));
            }
            $dataProfile = $this->profileService->getProfileByRole($user);
            return $this->resSuccess($dataProfile);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            return $this->resInternalError();
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateProfileRequest $request)
    {
        DB::beginTransaction();
        try {
            $user = $this->profileService->updateProfile($request);
            if ($user->role !== User::ROLES['CHILDREN']) {
                $this->addressService->updateAddress($user, $request);
            }
            if (!empty($request->file())) {
                $file = $request->file('file');
                $image = $this->uploadService->uploadImage($file, User::class, $user->id);
            }
            DB::commit();
            $dataProfile = $this->profileService->getProfileByRole($user);
            return $this->resSuccess(['message' => __('message.success_key.update_profile_success'),
                                      ...$dataProfile->toArray($request)]);
        } catch (Exception $e) {
            DB::rollBack();
            logger($e->getMessage());
            return $this->resInternalError();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        //
    }
}

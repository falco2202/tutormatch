<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreImageRequest;
use App\Services\UploadService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class UploadController extends ApiController
{
    protected $uploadService;

    public function __construct(UploadService $uploadService)
    {
        $this->uploadService = $uploadService;
    }
    public function upload(StoreImageRequest $request)
    {
        try {
            $image = $this->uploadService->uploadImage(
                $request->file('file'),
                $request->get('model'),
                $request->get('id')
            );
            return $this->resSuccess($image);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            if ($th instanceof ModelNotFoundException) {
                throw $th;
            }
            return $this->resInternalError();
        }
    }
}

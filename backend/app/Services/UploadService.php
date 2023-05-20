<?php

namespace App\Services;

use App\Http\Requests\StoreImage;
use App\Http\Requests\StoreImageRequest;
use App\Models\Classroom;
use App\Models\Upload;
use App\Models\User;
use App\Utils\StringUtil;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UploadService
{
    protected $upload;
    private const PATH = '/images';

    public function __construct(Upload $upload)
    {
        $this->upload = $upload;
    }
    public function uploadImage($file, $modelName, $id)
    {
        try {
            if (($modelName != User::class) && ($modelName != Classroom::class)) {
                throw new NotFoundHttpException('model');
            }
            $path = Storage::disk()->put(self::PATH, $file);
            $model = app($modelName);
            $model = $model->find($id);
            if (empty($model)) {
                throw (new ModelNotFoundException())->setModel($modelName);
            }
            $image = $model->upload()->create(['url' => $path]);
            return $image;
        } catch (\Throwable $th) {
            logger($th->getMessage());
            throw $th;
        }
    }
}

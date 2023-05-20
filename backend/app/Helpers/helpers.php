<?php

use Illuminate\Support\Facades\Storage;

if (! function_exists('generate_image_url')) {
    function generate_image_url($image)
    {
        if (config('filesystems.default') == config('constant.s3_driver')) {
            return Storage::disk(config('constant.s3_driver'))->temporaryUrl(
                $image->url,
                now()->addMinutes(env('S3_TOKEN_EXPIRED_AT', 1000))
            );
        }
        return $image->url;
    }
}
if (! function_exists('mail_url')) {
    function mail_url($path = '/', $id = '')
    {
        return env('FRONTEND_URL') . $path . $id;
    }
}

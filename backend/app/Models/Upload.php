<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Upload extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'uploads';
    protected $fillable = [
        'url',
        'uploadable_type',
        'uploadable_id'
    ];

    public function uploadable()
    {
        return $this->morphTo();
    }
    public function scopeUploadImage(Builder $query, $id, $type): Builder
    {
        return $query->where('uploadable_id', $id)
                     ->where('uploadable_type', $type)
                     ->orderBy('created_at', 'desc');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'addresses';

    protected $fillable = [
        'address',
        'lat',
        'long',
        'm_ward_id',
        'addressable_type',
        'addressable_id',
    ];
    protected $hidden = [
        'm_ward_id',
        'addressable_type',
        'addressable_id'
    ];

    public function addressable()
    {
        return $this->morphTo();
    }

    public function ward()
    {
        return $this->belongsTo(Ward::class, 'm_ward_id');
    }
}

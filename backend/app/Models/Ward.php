<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ward extends Model
{
    use HasFactory;


    protected $table = 'm_wards';

    protected $fillable = [
        'name'
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
        'm_city_id'
    ];

    public function city()
    {
        return $this->belongsTo(City::class, 'm_city_id');
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }
}

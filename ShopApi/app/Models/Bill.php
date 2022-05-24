<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;

    protected $fillable = [
        'totalPrice',
        'address'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function billDetails()
    {
        return $this->hasMany(BillDetail::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'price',
        'type',
        'amount'
    ];

    public function productImages()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function cartDetails(){
        return $this->hasMany(CartDetail::class);
    }

    public function billDetails(){
        return $this->hasMany(BillDetail::class);
    }

}

<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartDetail;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class CartController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = $request->user();
        $cart = Cart::firstOrNew([
            'user_id' => $user['id']
        ]);
        $cart['total_price'] = 0;
        $cart['user_id'] = $user['id'];
        $cart->cartDetails()->delete();
        if($request['cart_details']){
            $cartDetails = $request['cart_details'];
            foreach($cartDetails as $cartDetail){
                $product = Product::find($cartDetail['product_id']);
                $cd = new CartDetail();
                $cd['cart_id'] = $cart['id'];
                $cd['amount'] = $cartDetail['amount'];
                $cd['size'] = $cartDetail['size'];
                $cd['product_id'] = $product['id'];
                $cart['total_price'] = (int)$cart['total_price'] + $product['price']*$cartDetail['amount'];
                $cart['total_product'] = (int)$cart['total_product'] + (int)$cartDetail['amount'];
                $cd->save();
                $cd['price'] = $product['price'];
                $cd['type'] = $product['type'];
                $cd['description'] = $product['description'];

                $image = ProductImage::where([
                    "product_id" => $product['id']
                ])->first();
                if($image != null) $cd['image'] = $image['value'];
                $cartDetailsRes[] = $cd;
            }
        }

        
        $cart->save();
        if($cart['total_price'] == 0){
            $cart['cart_details'] = [];
        } else{
            $cart['cart_details'] = $cartDetailsRes;
        }

        return response($cart, 200);
    }

    public function show(Request $request)
    {
        $user = $request->user();
        $cart = Cart::where([
            'user_id' => $user['id'],
        ])->first();
        if($cart == null){
            $cart = new Cart();
            $cart['total_price'] = 0;
            $cart['total_product'] = 0;
            $cart['user_id'] = $user['id'];
            $cart->save();
        }

        $cartDetails = CartDetail::where(["cart_id" => $cart['id']])->get();
        foreach($cartDetails as $cartDetail){
            $product = Product::find($cartDetail['product_id']);
            $cd = new CartDetail();
            $cd['cart_id'] = $cart['id'];
            $cd['product_id'] = $product['id'];
            $cd['amount'] = $cartDetail['amount'];
            $cd['size'] = $cartDetail['size'];
            $cd['product_name'] = $product['name'];
            $cd['price'] = $product['price'];
            $cd['type'] = $product['type'];
            $cd['description'] = $product['description'];

            $image = ProductImage::where([
                "product_id" => $product['id']
            ])->first();
            if($image != null) $cd['image'] = $image['value'];
            $cartDetailsRes[] = $cd;
        }
 
        if($cart['total_price'] == 0){
            $cart['cart_details'] = [];
        } else {
            $cart['cart_details'] = $cartDetailsRes;
        }

        return response($cart, 200);
    }
}

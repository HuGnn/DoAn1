<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\BillDetail;
use App\Models\Cart;
use App\Models\CartDetail;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Http\Request;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $size = $request->input('size') ? $request->input('size') : 20;
        $bills = Bill::paginate($size);
        if($bills['total'] > 0){
            for ($i=0; $i < sizeof($bills['data']); $i++) { 
                $bills['data'][$i]['bill_details'] = $bills['data'][$i]->billDetails();
            }
        }
    
        return $bills;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();
        if($request['bill_details']){
            $bill = new Bill();
            $bill['total_price'] = 0;
            $bill['user_id'] = $user['id'];
            $bill['address'] = $request['address'];
            $bill->save();
            $billDetails = $request['bill_details'];
            foreach($billDetails as $billDetail){
                $product = Product::find($billDetail['product_id']);
                $db = new BillDetail();
                $db['bill_id'] = $bill['id'];
                $db['amount'] = $billDetail['amount'];
                $db['product_id'] = $product['id'];
                $bill['total_price'] = (int)$bill['total_price'] + ((int)$product['price'])*$billDetail['amount'];
                $product['amount'] = (int)$product['amount'] - (int)$billDetail['amount'] > 0 ? (int)$product['amount'] - (int)$billDetail['amount'] : 0;
                $billDetailsRes[] = $db;
                $db->save();
            }
            $bill->save();
    
            $bills['bill_details'] = $billDetailsRes;
    
            $cart = Cart::where([
                "user_id" => $user['id']
            ])->first();
    
            $cartDetails = CartDetail::where([
                "cart_id" => $cart['id']
            ])->get();
            foreach($cartDetails as $cd){
                $cd->delete();
            }
            $cart->delete();
            return response($bills, 200);
        }
        return response("Success", 200);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $bill = Bill::find($id);
        $billDetails = BillDetail::where([
            'bill_id' => $bill['id']
        ])->get();
        foreach($billDetails as $billDetail){
            $product = Product::find($billDetail['product_id']);
            $billDetail['product_name'] = $product['name'];
            $billDetail['price'] = $product['price'];
            $billDetail['type'] = $product['type'];
            $billDetail['description'] = $product['description'];

            $image = ProductImage::where([
                "product_id" => $product['id']
            ])->first();
            if($image != null) $cd['image'] = $image['value'];
            $billDetailsRes[] = $billDetail;
        }
        $bill['bill_details'] = $billDetailsRes;
        return response($bill, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByUser(Request $request)
    {
        $user = $request->user();
        $size = $request->input('size') ? $request->input('size') : 20;
        $billList = Bill::where('user_id', $user['id'])->paginate($size);
        return response($billList, 200);
    }

}

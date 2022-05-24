<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductImage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $type = $request->input('type') ? $request->input('type') : '';
        $size = $request->input('size') ? $request->input('size') : 20;
        $search = $request->input('search') ? $request->input('search') : '';
        $order = $request->input('order') ? $request->input('order') : '';
        $products = Product::join('product_images', 'products.id', '=', 'product_images.product_id')
        ->where('products.type', 'like', '%'.$type.'%')
        ->where('product_images.name' , '=', 'image0')
        ->where(function($query) use ($search){
            $query->where('products.name', 'like', '%'.$search.'%')->orWhere('products.description', 'like', '%'.$search.'%');
        });
        if($order != ''){
            $products = $products->orderBy('price', $order);
        }
        
        return $products->select(['products.*', 'product_images.name as image_name', 'product_images.value as image_value'])
        ->paginate($size);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {    
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'amount' => 'required',
            'images' => 'required',
            'type' => 'required'
        ]);

        $product = Product::create($request->all());

        $images = $request['images'];
        for ($i=0; $i < sizeof($images); $i++) { 
            $newImage = new ProductImage();
            $newImage['product_id'] = $product['id'];
            $newImage['name'] = 'image'.$i;
            $newImage['value'] = $images[$i];
            $newImage->save();
            if($i == 0){
                $product['image'] = $images[$i];
            }
        }
        

        return $product;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);
        $images = $product->productImages();
        for ($i=0; $i < sizeof($images); $i++) { 
            $newImage = new ProductImage();
            $newImage['product_id'] = $id;
            $newImage['name'] = 'image'.$i;
            $newImage['value'] = $images[$i];
            $imagesRes[] = $newImage;
        }
        $product['images'] = $imagesRes;
        return $product;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        $product->productImages()->delete();
        $product->update($request->all());
        $images = $request['images'];
        for ($i=0; $i < sizeof($images); $i++) { 
            $newImage = new ProductImage();
            $newImage['product_id'] = $id;
            $newImage['name'] = 'image'.$i;
            $newImage['value'] = $images[$i];
            $newImage->save();
            if($i == 0){
                $product['image'] = $images[$i];
            }
        }
        return $product;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        $product->cartDetails()->delete();
        $product->productImages()->delete();
        $product->billDetails()->delete();
        return $product->delete();
    }


    
}

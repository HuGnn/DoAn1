<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/user/register', [AuthController::class, 'register']);
Route::post('/user/login', [AuthController::class, 'login']);


Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);


Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/user/logout', [AuthController::class, 'logout']);
    Route::get('/user/bill', [BillController::class, 'showByUser']);
    Route::post('/bill', [BillController::class, 'store']);
    Route::get('/bill', [BillController::class, 'index']);
    Route::get('/bill/{id}', [BillController::class, 'show']);
    Route::put('/user/cart', [CartController::class, 'update']);
    Route::get('/user/cart', [CartController::class, 'show']);
});


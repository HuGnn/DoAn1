<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        $field = $request->validate([
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|string',
        ]);

        $user = User::create([
            'first_name' => $field['first_name'],
            'last_name' => $field['last_name'],
            'address' => $field['address'],
            'phone' => $field['phone'],
            'email' => $field['email'],
            'password' => bcrypt($field['password']),
            'role' => 'user'
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            $user,
            $token
        ];
        
        return response($response, 201);
    }

    public function login(Request $request){
        $field = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $field['email'])->first();
        
        if(!$user || !Hash::check($field['password'], $user->password)){
            return response([
                'message' => 'Bad creds'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 200);

    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return [
            'message' => "Logout success!"
        ];
    }

  
}

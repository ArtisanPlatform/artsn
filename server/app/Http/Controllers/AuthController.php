<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(UserRegisterRequest $request)
    {
        try {
            $user = User::create([
                "name" => $request->name,
                "email" => $request->email,
                "password" => Hash::make($request->password),
            ]);

            return response()->json([
                "message" => "User registered successfully",
                "user" => $user,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Error while registering new user",
                "error" => $e->getMessage(),
            ], 500);
        }
    }


    public function login(UserLoginRequest $request)
    {
        try {
            $credentials = $request->only('email', 'password');

            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'message' => 'Invalid email or password',
                ], 401);
            }

            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Error while logging user",
                "error" => $e->getMessage(),
            ], 500);
        }
    }
}

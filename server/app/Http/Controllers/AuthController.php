<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use Carbon\Carbon;

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
                ], 400);
            }

            $user = Auth::user();
            $accessToken = $user->createToken('access_token', ['*'], now()->addWeek())->plainTextToken;
            $refreshToken = $user->createToken('refresh_token', ['*'], now()->addDays(8))->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'accessToken' => $accessToken,
                'refreshToken' => $refreshToken,
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Error while logging user",
                "error" => $e->getMessage(),
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            "message" => "Logged out successfully"
        ]);
    }

    public function refreshToken(Request $request)
    {
        try {
            $refreshToken = $request->input('refreshToken');

            if (!$refreshToken) {
                return response()->json(['message' => 'Invalid token'], 400);
            }

            $refresh_token = PersonalAccessToken::findToken($refreshToken);

            if (!$refresh_token) {
                return response()->json(['message' => 'Token not found'], 404);
            }

            $user = $request->user;

            if ($refresh_token->expires_at && !Carbon::parse($refresh_token->expires_at)->isPast()) {

                $accessToken = $user->createToken('access_token', ['*'], now()->addWeek())->plainTextToken;
                $refreshToken = $user->createToken('refresh_token', ['*'], now()->addDays(8))->plainTextToken;

                return response()->json(['accessToken' => $accessToken, "refreshToken" => $refreshToken], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                "error" => $e->getMessage(),
            ], 500);
        }
    }

    public function me(Request $request)
    {
        return response()->json([
            "user" => $request->user,
        ]);
    }
}

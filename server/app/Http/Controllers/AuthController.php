<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserUpdateRequest;
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
        $credentials = $request->only('email', 'password');
        $user = User::query()->where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid email or password',
            ], 400);
        }

        $user->tokens()->delete();; //delete previous tokens.
        $accessToken = $user->createToken('access_token', ['*'], now()->addWeek())->plainTextToken;
        $refreshToken = $user->createToken('refresh_token', ['*'], now()->addDays(8))->plainTextToken;

        // Auth::login($user);

        return response()->json([
            'message' => 'Login successful',
            'accessToken' => $accessToken,
            'refreshToken' => $refreshToken,
            // 'user' => Auth::user(),
        ], 200);
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

    public function me()
    {
        $user = Auth::user()->load('projects');
        return response()->json([
            "user" => $user,
        ]);
    }

    //update user details
    public function update(UserUpdateRequest $request)
    {

        $user = Auth::user();
        $validated = $request->validated();

        if (!empty($validated['currentPassword']) && !empty($validated['newPassword'])) {
            if (!Hash::check($validated['currentPassword'], $user->password)) {
                return response()->json(['message' => 'Current password is incorrect.'], 422);
            }

            $user->password = bcrypt($validated['newPassword']);
        }

        if (!empty($validated['name'])) {
            $user->name = $validated['name'];
        }

        if (!empty($validated['email'])) {
            $user->email = $validated['email'];
        }

        return response()->json([
            'message' => 'User updated successfully.',
            'user' => $user,
        ]);
    }

    public function updateImage(Request $request)
    {
        $user = Auth::user();

        if (!$request->hasFile('profile_image')) {
            return response()->json([
                "message" => "Image is required"
            ], 400);
        }

        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('profile_images', 'public');
            $user->profile_image = $path;
        }

        $user->save();

        return response()->json([
            "message" => "Image updated successfully",
            "path" => $path
        ], 200);
    }
}

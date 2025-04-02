<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::post('/refresh-token', [AuthController::class, 'refreshToken'])->middleware(AuthMiddleware::class);
    Route::get('/me', [AuthController::class, 'me'])->middleware(AuthMiddleware::class);
});

Route::middleware(['auth', 'auth:sanctum'])->prefix('project')->group(function () {
    Route::post('/create', [ProjectController::class, 'create']);
    Route::put('/{project}/edit', [ProjectController::class, 'edit']);
    Route::delete('/{project}/delete', [ProjectController::class, 'delete']);
    Route::post('/{project}/add-member', [ProjectController::class, 'addTeamMember']);
    Route::post('/{project}/remove-member', [ProjectController::class, 'removeTeamMember']);
});

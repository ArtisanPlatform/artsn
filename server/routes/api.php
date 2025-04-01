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

Route::middleware(['projects'])->prefix('project')->group(function () {
    Route::post('/create', [ProjectController::class, 'create']);
    Route::put('/edit/{id}', [ProjectController::class, 'edit']);
    Route::delete('/delete/{id}', [ProjectController::class, 'delete']);
});

<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/hello', function () {
    return response()->json(['message' => 'Hello, World!']);
});

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

Route::middleware(['auth', 'auth:sanctum'])->prefix('task')->group(function () {
    Route::post('/{project}/create', [TaskController::class, 'create']);
    Route::put('/{project}/edit/{task}', [TaskController::class, 'edit']);
    Route::delete('/{project}/delete/{task}', [TaskController::class, 'delete']);
    Route::post('/{project}/assign/{task}', [TaskController::class, 'assignTaskToUser']);
    Route::post('/{project}/unassign/{task}', [TaskController::class, 'unAssignTask']);
});

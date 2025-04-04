<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Project;
use App\Models\Task;
use App\Services\TaskService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    protected $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    public function create(TaskRequest $request, Project $project)
    {
        try {
            $project = $this->taskService->createTask([
                'name' => $request->name,
                'description' => $request->description,
                'user_id' => Auth::user()->id,
                'project_id' => $project->id,
                'progress' => $request->progress,
                'status' => $request->status,
                'labels' => $request->labels
            ]);

            return response()->json([
                'message' => "Task created successfully",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function edit(TaskRequest $request, Project $project, Task $task)
    {
        try {
            if (!$this->isOwner($project, $task)) {
                throw new Exception('Not owner of the project / task.');
            }

            $this->taskService->editTask($task, [
                'name' => $request->name,
                'description' => $request->description,
                'user_id' => Auth::user()->id,
                'project_id' => $project->id,
                'progress' => $request->progress,
                'status' => $request->status,
                'labels' => $request->labels
            ]);
            return response()->json([
                'message' => "Task edited successfully",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Error editing this task",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function delete(Project $project, Task $task)
    {
        try {
            if (!$this->isOwner($project, $task)) {
                throw new Exception("Not owner of the task.");
            }
            $this->taskService->deleteTask($project, $task);

            return response()->json([
                "message" => "Task deleted",
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "message" => "Error while deleting task",
                "error" => $th->getMessage()
            ], 500);
        }
    }

    public function assignTaskToUser(Request $request, Project $project, Task $task)
    {
        $assign_user_id = $request->input('assignUserId');
        try {
            if (!$this->isOwner($project, $task)) {
                throw new Exception("Not owner of the task.");
            }

            $this->taskService->assignTaskToUser($project, $task, $assign_user_id);

            return response()->json([
                "message" => "Task assigned successfully"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "message" => "Error while assigning task to user.",
                "error" => $th->getMessage()
            ], 500);
        }
    }

    public function unAssignTask(Project $project, Task $task)
    {
        try {
            if (!$this->isOwner($project, $task)) {
                throw new Exception("Not owner of the task.");
            }

            $this->taskService->removeTaskFromUser($project, $task);

            return response()->json([
                "message" => "Task unassigned successfully"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "message" => "Error while unassigning task.",
                "error" => $th->getMessage()
            ], 500);
        }
    }

    private function isOwner(Project $project, Task $task)
    {
        if ($project->user_id !== Auth::user()->id || $task->user_id !== Auth::user()->id) {
            return false;
        }

        return true;
    }
}

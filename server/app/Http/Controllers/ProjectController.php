<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Models\User;
use App\Services\ProjectService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;

class ProjectController extends Controller
{
    protected $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function create(ProjectRequest $request)
    {
        try {
            $project = $this->projectService->createProject([
                'name' => $request->name,
                'description' => $request->description,
                'user_id' => $request->user->id,
            ]);

            return response()->json([
                'message' => "Project created successfully",
                'project' => $project,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function edit(Request $request, Project $project)
    {
        try {
            if (!$this->isOwner($project, Auth::user())) {
                throw new Exception('Not owner of the project.');
            };

            $updatedProject = $this->projectService->updateProject($project, [
                'user_id' => Auth::user()->id,
                'name' => $request->name,
                'description' => $request->description,
            ]);

            return response()->json([
                'message' => "Project updated successfully.",
                'project' => $updatedProject
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function delete(Request $request, Project $project)
    {
        try {
            if (!$this->isOwner($project, Auth::user())) {
                throw new Exception('Not owner of the project.');
            };

            $this->projectService->deleteProject($project);

            return response()->json([
                'message' => "Project deleted.",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function addTeamMember(Request $request, Project $project)
    {
        try {
            if (!$this->isOwner($project, Auth::user())) {
                throw new Exception('Not owner of the project.');
            };

            $this->projectService->addTeamMember($project, $request->teamMemberId);
            return response()->json([
                "message" => "Team member added"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Error adding new team member.",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function removeTeamMember(Request $request, Project $project)
    {
        try {
            if (!$this->isOwner($project, Auth::user())) {
                throw new Exception('Not owner of the project.');
            };

            $this->projectService->removeTeamMember($project, $request->teamMemberId);

            return response()->json([
                "message" => "Team member removed successfully."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Error removing team member.",
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function getAllTasks(Project $project)
    {
        try {
            if (!$this->isOwner($project, Auth::user())) {
                throw new Exception('Not owner of the project.');
            };

            $cacheKey = "project_tasks_{$project->id}";

            $tasks = Cache::remember($cacheKey, 600, function () use ($project) {
                return $this->projectService->getTasks($project);
            });

            return response()->json([
                "tasks" => $tasks
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Error gettimg tasks for specified project.",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function isOwner(Project $project, User $user)
    {
        if ($project->user_id !== $user->id) {
            return false;
        }

        return true;
    }
}

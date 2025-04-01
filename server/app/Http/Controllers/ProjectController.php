<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function create(ProjectRequest $request)
    {
        try {
            $project = Project::create([
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
                'message' => "Error while creating project.",
                'error' => $e->getMessage(),
                'user' => $request->user
            ], 500);
        }
    }

    public function edit(Request $request, $id)
    {
        try {
            $user_id = $request->user->id;
            $project = Project::where('id', $id)->where('user_id', $user_id)->first();

            if (!$project) {
                return response()->json([
                    'message' => "Project not found or you don't have permission to edit it."
                ], 404);
            }

            $project->name = $request->name;
            $project->description = $request->description;

            $project->save();

            return response()->json([
                'message' => "Project updated successfully.",
                'project' => $project
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error while editing project.",
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function delete(Request $request, $id)
    {
        try {
            $user_id = $request->user->id;
            $project = Project::where('id', $id)->where('user_id', $user_id)->first();

            if (!$project) {
                return response()->json([
                    'message' => "Project not found or you don't have permission to delete it."
                ], 404);
            }


            $project->delete();

            return response()->json([
                'message' => "Project deleted.",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

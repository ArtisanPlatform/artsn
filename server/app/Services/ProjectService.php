<?php

namespace App\Services;

use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ProjectService
{
    public function createProject(array $data)
    {
        try {
            return Project::create([
                'name' => $data['name'],
                'description' => $data['description'],
                'user_id' => $data['user_id'],
            ]);
        } catch (\Exception $e) {
            Log::error("Error creating project: " . $e->getMessage());
            throw new \Exception("Error while creating project.");
        }
    }

    public function updateProject(Project $project, array $data)
    {
        $project->update([
            'name' => $data['name'],
            'description' => $data['description'],
        ]);

        return $project;
    }

    public function deleteProject(Project $project)
    {
        try {
            $project->delete();
        } catch (\Exception $e) {
            Log::error("Error deleting project: " . $e->getMessage());
            throw new \Exception("Error while deleting project.");
        }
    }

    public function addTeamMember(Project $project, $teamMemberId)
    {

        $team_member = User::where('id', $teamMemberId);

        if (!$team_member) {
            throw new \Exception("Team member doesn't exists.");
        }

        if ($project->users()->where('user_id', $teamMemberId)->exists()) {
            throw new \Exception("The specified team member is already part of the project.");
        }
        $project->users()->attach($teamMemberId);
    }

    public function removeTeamMember(Project $project, $teamMemberId)
    {
        $team_member = User::where('id', $teamMemberId);

        if (!$team_member) {
            throw new \Exception("Team member doesn't exists.");
        }

        // Check if the team member is not part of the project
        if (!$project->users()->where('user_id', $teamMemberId)->exists()) {
            throw new \Exception("The specified team member is not assigned to this project.");
        }

        $project->users()->detach($teamMemberId);

        return true;
    }

    public function getTasks(Project $project)
    {
        $statuses = collect([
            'To Do',
            'In Progress',
            'Need Review',
            'Done',
        ]);

        $tasks = $project->tasks;


        $grouped = $tasks->groupBy('status');

        $result = $statuses->map(function ($status) use ($grouped) {
            $tasksForStatus = $grouped->get($status, collect());

            return [
                'id' => Str::slug($status),
                'title' => $status,
                'count' => $tasksForStatus->count(),
                'tasks' => $tasksForStatus->values(),
            ];
        });

        return $result;
    }
}

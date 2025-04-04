<?php

namespace App\Services;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Exception;

class TaskService
{
    public function createTask(array $data)
    {
        return Task::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'user_id' => $data['user_id'],
            'project_id' => $data['project_id'],
            'progress' => $data['progress'],
            'status' => $data['status'],
            'labels' => $data['labels'],
        ]);
    }

    public function editTask(Task $task, array $data)
    {
        $task->update([
            'name' => $data['name'],
            'description' => $data['description'],
            'user_id' => $data['user_id'],
            'project_id' => $data['project_id'],
            'progress' => $data['progress'],
            'status' => $data['status'],
            'labels' => $data['labels'],
        ]);

        return $task;
    }

    public function deleteTask(Project $project, Task $task)
    {
        if ($project->id !== $task->project_id) {
            throw new Exception("Task does not belong to this project.");
        }

        $task->delete();
        return true;
    }

    public function assignTaskToUser(Project $project, Task $task, int $user_id)
    {
        if ($project->id !== $task->project_id) {
            throw new Exception("Task not belong to this project");
        }

        if (!$task->project->users()->where('user_id', $user_id)->exists()) {
            throw new Exception("The selected user is not a member of this project.");
        }
        $task->assigned_user_id = $user_id;
        $task->save();
    }

    public function removeTaskFromUser(Project $project, Task $task)
    {
        if ($project->id !== $task->project_id) {
            throw new Exception("Task not belong to this project");
        }

        $task->assigned_user_id = null;
        $task->save();
    }
}

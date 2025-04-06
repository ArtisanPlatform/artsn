<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = ['To Do', 'In Progress', 'Need Review', 'Done'];

        return [
            'name' => Str::limit($this->faker->unique()->sentence(3), 50),
            'description' => Str::limit($this->faker->paragraph(), 60),
            'progress' => $this->faker->numberBetween(0, 100),
            'labels' => $this->faker->randomElements(['frontend', 'backend', 'devops', 'ui', 'testing'], rand(1, 3)),
            'status' => $this->faker->randomElement($status),
            'project_id' => Project::factory(),
            'user_id' => User::factory(),
            'assigned_user_id' => User::factory(),
        ];
    }
}

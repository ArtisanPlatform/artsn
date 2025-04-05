<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        /// Create 10 users
        User::factory()
            ->count(10)
            ->create()
            ->each(function ($user) {
                // Each user owns 2 projects
                Project::factory()
                    ->count(2)
                    ->create(['user_id' => $user->id])
                    ->each(function ($project) use ($user) {
                        // Attach 3 random users to the project
                        $project->users()->attach(User::inRandomOrder()->take(3)->pluck('id'));

                        // Each project has 5 tasks
                        Task::factory()
                            ->count(5)
                            ->create([
                                'project_id' => $project->id,
                                'user_id' => $user->id,
                                'assigned_user_id' => User::inRandomOrder()->first()->id,
                            ]);
                    });
            });
    }
}

<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $owner = User::where('email', 'cao@email.al')->first();

        $project = Project::create([
            'name' => 'Demo Project',
            'description' => 'A demo project for testing.',
            'user_id' => $owner->id,
        ]);

        // Attach 3 random users to the project
        $project->users()->attach(User::inRandomOrder()->limit(3)->pluck('id'));
    }
}

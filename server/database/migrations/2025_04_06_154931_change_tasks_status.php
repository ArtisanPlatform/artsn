<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE tasks DROP CONSTRAINT tasks_status_check;");
        DB::statement("ALTER TABLE tasks ALTER COLUMN status TYPE VARCHAR(20);");

        DB::table('tasks')->where('status', 'Pending')->update(['status' => 'To Do']);
        DB::table('tasks')->where('status', 'On Hold')->update(['status' => 'Need Review']);

        DB::statement("ALTER TABLE tasks ADD CONSTRAINT tasks_status_check CHECK (status IN ('To Do', 'In Progress', 'Need Review', 'Done'));");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE tasks DROP CONSTRAINT tasks_status_check;");
        DB::statement("ALTER TABLE tasks ALTER COLUMN status TYPE VARCHAR(20);");

        DB::table('tasks')->where('status', 'To Do')->update(['status' => 'Pending']);
        DB::table('tasks')->where('status', 'Need Review')->update(['status' => 'On Hold']);

        DB::statement("ALTER TABLE tasks ADD CONSTRAINT tasks_status_check CHECK (status IN ('Pending', 'In Progress', 'On Hold', 'Done'));");
    }
};

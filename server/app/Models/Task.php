<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'labels', 'progress', 'status', 'project_id', 'user_id'];
    protected $casts = [
        'labels' => 'array',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }


    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;
    protected $fillable = ["name", "description", "user_id"];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_project');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}

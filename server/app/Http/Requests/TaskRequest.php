<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['Pending', 'In Progress', 'On Hold', 'Done'])],
            'progress' => ['required', 'integer', 'min:0', 'max:100'],
            'labels' => ['nullable', 'array'],
            'labels.*' => ['string', 'max:50'],
        ];
    }
}

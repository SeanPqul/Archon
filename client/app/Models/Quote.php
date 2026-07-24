<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'truck',
        'phone',
        'additional_details',
        'privacy_accepted_at',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'privacy_accepted_at' => 'datetime',
        ];
    }
}

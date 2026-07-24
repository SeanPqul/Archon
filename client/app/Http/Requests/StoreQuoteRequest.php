<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreQuoteRequest extends FormRequest
{
    /**
     * @var list<string>
     */
    private const TRUCKS = [
        'howo-v7-x-dump-truck',
        'howo-v7-dump-truck',
        'howo-tx-dump-truck',
        'howo-a7-t7-prime-mover',
        'howo-7-prime-truck',
        'howo-a7-t7-dump-truck',
    ];

    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email:rfc', 'max:255'],
            'truck' => ['required', 'string', Rule::in(self::TRUCKS)],
            'phone' => ['required', 'string', 'max:30'],
            'additional_details' => ['nullable', 'string', 'max:2000'],
            'privacy_accepted' => ['accepted'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'truck.required' => 'Please select a truck.',
            'truck.in' => 'Please select a valid truck.',
            'privacy_accepted.accepted' => 'Please accept the privacy and terms agreement.',
        ];
    }
}

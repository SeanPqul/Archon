<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuoteRequest;
use App\Models\Quote;
use Illuminate\Http\RedirectResponse;

class QuoteController extends Controller
{
    public function store(StoreQuoteRequest $request): RedirectResponse
    {
        Quote::create([
            ...$request->safe()->except('privacy_accepted'),
            'privacy_accepted_at' => now(),
        ]);

        return back()->with('quote_success', 'Your quotation request has been received.');
    }
}

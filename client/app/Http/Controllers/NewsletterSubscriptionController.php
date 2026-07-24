<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNewsletterSubscriptionRequest;
use App\Models\NewsletterSubscription;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\RedirectResponse;

class NewsletterSubscriptionController extends Controller
{
    public function store(StoreNewsletterSubscriptionRequest $request): RedirectResponse
    {
        try {
            $subscription = NewsletterSubscription::firstOrCreate([
                'email' => mb_strtolower($request->validated('newsletter_email')),
            ]);
        } catch (UniqueConstraintViolationException) {
            return back()->withErrors([
                'newsletter_email' => 'This email is already subscribed.',
            ]);
        }

        if (! $subscription->wasRecentlyCreated) {
            return back()->withErrors([
                'newsletter_email' => 'This email is already subscribed.',
            ]);
        }

        return back()->with('newsletter_success', 'You are now subscribed to Archon updates.');
    }
}

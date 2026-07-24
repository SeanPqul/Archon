<?php

use App\Models\NewsletterSubscription;
use App\Models\Quote;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('the homepage renders the Archon Inertia page', function () {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Home')
            ->where('ogImage', url('/assets/images/img-banner.png'))
            ->has('flash'));
});

test('a valid quotation request is stored', function () {
    $response = $this->post(route('quotes.store'), [
        'full_name' => 'Sean Applicant',
        'email' => 'sean@example.com',
        'truck' => 'howo-v7-x-dump-truck',
        'phone' => '+63 917 000 0000',
        'additional_details' => 'Please send available configurations.',
        'privacy_accepted' => true,
    ]);

    $response
        ->assertRedirect()
        ->assertSessionHas('quote_success');

    expect(Quote::query()->count())->toBe(1);

    $this->assertDatabaseHas('quotes', [
        'full_name' => 'Sean Applicant',
        'email' => 'sean@example.com',
        'truck' => 'howo-v7-x-dump-truck',
    ]);
});

test('quotation validation rejects incomplete and invalid input', function () {
    $this->from(route('home'))
        ->post(route('quotes.store'), [
            'full_name' => '',
            'email' => 'not-an-email',
            'truck' => 'unknown-truck',
            'phone' => '',
            'privacy_accepted' => false,
        ])
        ->assertRedirect(route('home'))
        ->assertSessionHasErrors([
            'full_name',
            'email',
            'truck',
            'phone',
            'privacy_accepted',
        ]);

    expect(Quote::query()->count())->toBe(0);
});

test('a valid newsletter subscription is stored once', function () {
    $this->from(route('home'))
        ->post(route('newsletter-subscriptions.store'), [
            'newsletter_email' => 'buyer@example.com',
        ])
        ->assertRedirect(route('home'))
        ->assertSessionHas('newsletter_success');

    $this->assertDatabaseHas('newsletter_subscriptions', [
        'email' => 'buyer@example.com',
    ]);

    $this->from(route('home'))
        ->post(route('newsletter-subscriptions.store'), [
            'newsletter_email' => 'buyer@example.com',
        ])
        ->assertRedirect(route('home'))
        ->assertSessionHasErrors('newsletter_email');

    expect(NewsletterSubscription::query()->count())->toBe(1);
});

test('quotation submissions are rate limited', function () {
    foreach (range(1, 5) as $attempt) {
        $this->withServerVariables(['REMOTE_ADDR' => '198.51.100.40'])
            ->post(route('quotes.store'), [])
            ->assertSessionHasErrors('full_name');
    }

    $this->withServerVariables(['REMOTE_ADDR' => '198.51.100.40'])
        ->post(route('quotes.store'), [])
        ->assertStatus(429);
});

test('newsletter submissions are rate limited', function () {
    foreach (range(1, 10) as $attempt) {
        $this->withServerVariables(['REMOTE_ADDR' => '198.51.100.41'])
            ->post(route('newsletter-subscriptions.store'), [])
            ->assertSessionHasErrors('newsletter_email');
    }

    $this->withServerVariables(['REMOTE_ADDR' => '198.51.100.41'])
        ->post(route('newsletter-subscriptions.store'), [])
        ->assertStatus(429);
});

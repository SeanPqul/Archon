<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsletterSubscriptionController;
use App\Http\Controllers\QuoteController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::post('/quotes', [QuoteController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('quotes.store');
Route::post('/newsletter-subscriptions', [NewsletterSubscriptionController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('newsletter-subscriptions.store');

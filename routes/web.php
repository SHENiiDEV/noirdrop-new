<?php

use App\Http\Controllers\ProductGeneratorController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
});

use App\Http\Controllers\ContactController;

Route::get('/how-it-works', fn () => Inertia::render('HowItWorks'))->name('how-it-works');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');
Route::get('/support', fn () => Inertia::render('Support'))->name('support');
Route::get('/about', fn () => Inertia::render('About'))->name('about');

Route::get('/terms', fn () => Inertia::render('Legal/Terms'))->name('legal.terms');
Route::get('/privacy', fn () => Inertia::render('Legal/Privacy'))->name('legal.privacy');
Route::get('/refunds', fn () => Inertia::render('Legal/Refunds'))->name('legal.refunds');
Route::get('/imprint', fn () => Inertia::render('Legal/Imprint'))->name('legal.imprint');

Route::post('/generate', [ProductGeneratorController::class, 'generate'])->name('generate');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [ProductGeneratorController::class, 'index'])->name('dashboard');
    Route::get('/history', [ProductGeneratorController::class, 'history'])->name('history');
    Route::post('/buy-tokens', [ProductGeneratorController::class, 'buyTokens'])->name('buy-tokens');
    Route::get('/wallet/invoice/{payment}', [ProductGeneratorController::class, 'downloadInvoice'])->name('wallet.invoice');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';


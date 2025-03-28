<?php

use App\Http\Controllers\AnalyticsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\LinksController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/links', [LinksController::class, 'index'])->name('links.index');
    Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';


Route::post('/shorten', [LinkController::class, 'store']);
Route::get('/{shortCode}', [LinkController::class, 'redirect']);
Route::delete('/links/{id}', [LinkController::class, 'destroy']);

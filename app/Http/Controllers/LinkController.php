<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Faker\Factory as Faker;

class LinkController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('welcome');
    }
    public function store(Request $request)
    {
        $request->validate([
            'original_url' => 'required|url',
        ]);

        // Initialize Faker
        $faker = Faker::create();

        // Generate a 6-character shortcode using words
        do {
            $shortCode = '';
            while (strlen($shortCode) < 6) {
                $word = strtolower($faker->word()); // Get a random word
                $remainingLength = 6 - strlen($shortCode);
                $shortCode .= substr($word, 0, $remainingLength); // Add only needed characters
            }
        } while (Link::where('short_code', $shortCode)->exists()); // Ensure uniqueness

        // Store in the database
        Link::create([
            'original_url' => $request->original_url,
            'short_code' => $shortCode,
            'clicks' => 0,
        ]);

        return Inertia::render('welcome', [
            'short_url' => url('/' . $shortCode),
        ]);
    }
    public function destroy($id)
    {
        $link = Link::findOrFail($id);
        $link->delete();
        return redirect()->back()->with('message', 'Link deleted successfully!');
    }
    public function redirect($shortCode)
    {
        $link = Link::where('short_code', $shortCode)->firstOrFail();
        $link->increment('clicks');
        return redirect($link->original_url);
    }
}

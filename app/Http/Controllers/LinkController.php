<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\LinkAnalytics;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Http;

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
    public function redirect($shortCode, Request $request)
    {
        $link = Link::where('short_code', $shortCode)->firstOrFail();
        $link->increment('clicks');

        // Detect User Data
        $ip = $request->ip();
        $userAgent = $request->header('User-Agent');
        $device = $this->detectDevice($userAgent);
        $browser = $this->detectBrowser($userAgent);
        $location = $this->getLocationFromIp($ip); // Get location from IP

        LinkAnalytics::create([
            'link_id' => $link->id,
            'ip_address' => $ip,
            'device' => $device,
            'browser' => $browser,
            'location' => $location
        ]);

        return redirect($link->original_url);
    }
    // Helper function to detect device type
    private function detectDevice($userAgent)
    {
        if (strpos($userAgent, 'Mobile') !== false) return 'Mobile';
        if (strpos($userAgent, 'Tablet') !== false) return 'Tablet';
        return 'Desktop';
    }
    // Helper function to detect browser
    private function detectBrowser($userAgent)
    {
        if (strpos($userAgent, 'Chrome') !== false) return 'Chrome';
        if (strpos($userAgent, 'Firefox') !== false) return 'Firefox';
        if (strpos($userAgent, 'Safari') !== false) return 'Safari';
        return 'Other';
    }

    // Get location from IP (Using external API)
    private function getLocationFromIp($ip)
    {
        $response = Http::get("http://ip-api.com/json/{$ip}");

        if ($response->successful()) {
            $data = $response->json();

            // Check if 'country' and 'city' exist in the response
            $country = $data['country'] ?? 'Unknown Country';
            $city = $data['city'] ?? 'Unknown City';

            return "{$country}, {$city}";
        }

        return 'Unknown Location';
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    public function index(): Response
    {
        $links = Link::latest()->with('analytics')->paginate(5); // Paginate 5 per page

        $totalClicks = Link::sum('clicks'); // Get total clicks for all links

        $formattedLinks = $links->map(function ($link) {
            return [
                'id' => $link->id,
                'original_url' => $link->original_url,
                'short_code' => $link->short_code,
                'clicks' => $link->clicks,
                'analytics' => $link->analytics->map(function ($analytics) {
                    return [
                        'ip_address' => $analytics->ip_address,
                        'device' => $analytics->device,
                        'browser' => $analytics->browser,
                        'location' => $analytics->location,
                        'created_at' => $analytics->created_at,
                    ];
                }),
            ];
        });

        return Inertia::render('analytics', [
            'links' => $formattedLinks,
            'totalClicks' => $totalClicks, // Send total click count
            'pagination' => [
                'current_page' => $links->currentPage(),
                'last_page' => $links->lastPage(),
                'per_page' => $links->perPage(),
                'total' => $links->total(),
                'prev_page_url' => $links->previousPageUrl(),
                'next_page_url' => $links->nextPageUrl(),
            ],
        ]);
    }
}

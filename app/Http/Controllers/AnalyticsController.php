<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    public function index(): Response
    {
        $links = Link::latest()->paginate(5); // Paginate with 5 per page

        return Inertia::render('analytics', [
            'links' => $links->items(), // Data for current page
            'pagination' => [
                'current_page' => $links->currentPage(),
                'last_page' => $links->lastPage(),
                'per_page' => $links->perPage(),
                'total' => $links->total(),
                'prev_page_url' => $links->previousPageUrl(),
                'next_page_url' => $links->nextPageUrl(),
                'links' => $links->linkCollection()->toArray(),
            ],
        ]);
    }
}

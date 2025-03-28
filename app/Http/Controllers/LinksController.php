<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class LinksController extends Controller
{
    public function index(): Response
    {
        $links = Link::latest()->get(); // Fetch all links (modify as needed)

        return Inertia::render('links', [
            'links' => $links, // Pass links to the frontend
        ]);
    }
}

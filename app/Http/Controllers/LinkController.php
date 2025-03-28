<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

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
        $shortCode = substr(md5(uniqid()), 0, 6);
        $shortUrl = url('/' . $shortCode);

        $link = Link::create([
            'original_url' => $request->original_url,
            'short_code' => $shortCode,
        ]);

        return Inertia::render('welcome', [
            'short_url' => $shortUrl,
        ]);
    }
    public function redirect($shortCode)
    {
        $link = Link::where('short_code', $shortCode)->firstOrFail();
        return redirect($link->original_url);
    }
}

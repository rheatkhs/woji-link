<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Link;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class LinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create(); // Initialize Faker

        for ($i = 0; $i < 100; $i++) {
            Link::create([
                'original_url' => $faker->url, // Generate realistic URLs
                'short_code' => Str::random(6), // Generate a 6-character short code
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('link_analytics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('link_id')->constrained()->onDelete('cascade'); // Relationship to Links table
            $table->string('ip_address');
            $table->string('device')->nullable();
            $table->string('browser')->nullable();
            $table->string('location')->nullable(); // Country, City, etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('link_analytics');
    }
};

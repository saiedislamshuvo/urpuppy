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
        Schema::create('puppy_sibling', function (Blueprint $table) {
            $table->id();
            $table->foreignId('puppy_id')->cascadeOnDelete();
            $table->foreignId('sibling_id')->cascadeOnDelete();
            $table->unique(['puppy_id', 'sibling_id']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('puppy_sibling');
    }
};

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
        Schema::table('users', function (Blueprint $table) {
            $table->decimal('lat', 10, 8)->default(0); // Latitude: 10 total digits, 8 decimal places
            $table->decimal('lng', 11, 8)->default(0); // Longitude: 11 total digits, 8 decimal places
            $table->string('state')->nullable();
            $table->string('street')->nullable();
            $table->string('company_street')->nullable();
            $table->string('company_state')->nullable();
            $table->string('gmap_address')->nullable();
            $table->string('gmap_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};

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
            $table->string('phone')->nullable();
            $table->text('description')->nullable();
            $table->string('website')->nullable();
            $table->string('social_fb')->nullable();
            $table->string('social_tiktok')->nullable();
            $table->string('social_x')->nullable();
            $table->string('social_ig')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('phone');
            $table->dropColumn('description');
            $table->dropColumn('website');
            $table->dropColumn('social_fb');
            $table->dropColumn('social_tiktok');
            $table->dropColumn('social_x');
            $table->dropColumn('social_ig');
        });
    }
};

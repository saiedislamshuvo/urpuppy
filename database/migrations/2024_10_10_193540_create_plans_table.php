<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('stripe_plan_id');
            $table->integer('price');
            $table->integer('order');
            $table->integer('trial_days')->default(0);
            $table->string('interval');
            $table->integer('interval_count')->default(1);
            $table->boolean('active')->default(false);
            $table->integer('listing_limit')->nullable();
            $table->integer('image_per_listing')->default(5);
            $table->integer('video_per_listing')->default(1);
            $table->boolean('is_breeder')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};

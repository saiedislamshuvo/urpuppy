<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('breeds', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique()->nullable();
            $table->text('description')->nullable();

            $table->integer('min_life')->nullable();
            $table->integer('max_life')->nullable();

            $table->integer('male_weight_max')->nullable();
            $table->integer('male_weight_min')->nullable();

            $table->integer('female_weight_max')->nullable();
            $table->integer('female_weight_min')->nullable();

            $table->text('content')->nullable();

            $table->text('history_description')->nullable();
            $table->text('size_description')->nullable();
            $table->text('coat_description')->nullable();
            $table->text('temperament_description')->nullable();
            $table->text('lifestyle_description')->nullable();
            $table->text('activities_description')->nullable();
            $table->boolean('hypoallergenic')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('breeds');
    }
};

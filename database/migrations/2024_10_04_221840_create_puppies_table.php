<?php

use App\Enum\PuppyStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('puppies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->nullable();
            $table->string('gender');
            $table->text('description')->nullable();
            $table->integer('price');
            $table->dateTime('birth_date');
            $table->boolean('is_ready_to_travel');
            $table->foreignId('user_id');
            $table->string('status')->default(PuppyStatus::PUBLISHED);
            /* $table->foreignId('breed_id')->references('id')->on('breeds'); */
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('puppies');
    }
};

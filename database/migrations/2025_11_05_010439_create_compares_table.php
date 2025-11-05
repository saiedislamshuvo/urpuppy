<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('compares', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->index()->comment('user_id');
            $table->morphs('compareable');
            $table->timestamps();
            
            $table->unique(['user_id', 'compareable_id', 'compareable_type'], 'unique_user_compare');
        });
    }

    public function down()
    {
        Schema::dropIfExists('compares');
    }
};


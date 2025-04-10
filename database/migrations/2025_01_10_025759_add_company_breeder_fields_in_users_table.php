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
            $table->string('kennel_name')->nullable();
            $table->string('company_email_address')->nullable();
            $table->string('company_phone')->nullable();
            $table->string('company_city_id')->nullable();
            $table->string('company_state_id')->nullable();
            $table->string('company_zip_code')->nullable();
            $table->string('company_about')->nullable();
            $table->boolean('has_usda_registration')->default(false);
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

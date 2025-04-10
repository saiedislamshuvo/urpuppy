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
        Schema::table('puppies', function (Blueprint $table) {
            $table->boolean('has_health_certificate')->default(false);
            $table->boolean('has_vaccine')->default(false);
            $table->boolean('has_vet_exam')->default(false);
            $table->boolean('has_travel_ready')->default(false);
            $table->boolean('has_delivery_included')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('puppies', function (Blueprint $table) {
            $table->dropColumn('has_health_certificate');
            $table->dropColumn('has_vaccine');
            $table->dropColumn('has_vet_exam');
            $table->dropColumn('has_travel_ready');
            $table->dropColumn('has_delivery_included');
        });
    }
};

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
            $table->decimal('lat', 10, 8)->nullable()->after('certificate_document_url');
            $table->decimal('lng', 11, 8)->nullable()->after('lat');
            $table->string('address')->nullable()->after('lng');
            $table->string('city')->nullable()->after('address');
            $table->string('street')->nullable()->after('city');
            $table->string('state')->nullable()->after('street');
            $table->string('short_state', 2)->nullable()->after('state');
            $table->string('zip_code')->nullable()->after('short_state');
            $table->foreignId('state_id')->nullable()->after('zip_code')->constrained('states')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('puppies', function (Blueprint $table) {
            $table->dropForeign(['state_id']);
            $table->dropColumn([
                'lat',
                'lng',
                'address',
                'city',
                'street',
                'state',
                'short_state',
                'zip_code',
                'state_id',
            ]);
        });
    }
};

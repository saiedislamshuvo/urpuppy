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
            $table->boolean('has_certificate')->default(false)->after('has_delivery_included');
            $table->string('certificate_type')->nullable()->after('has_certificate');
            $table->text('certificate_document_url')->nullable()->after('certificate_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('puppies', function (Blueprint $table) {
            $table->dropColumn(['has_certificate', 'certificate_type', 'certificate_document_url']);
        });
    }
};

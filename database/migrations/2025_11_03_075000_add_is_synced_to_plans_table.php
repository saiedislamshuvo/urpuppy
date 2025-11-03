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
        Schema::table('plans', function (Blueprint $table) {
            $table->boolean('is_synced')->default(false)->after('active');
            $table->text('sync_error')->nullable()->after('is_synced');
            $table->timestamp('last_synced_at')->nullable()->after('sync_error');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('plans', function (Blueprint $table) {
            $table->dropColumn(['is_synced', 'sync_error', 'last_synced_at']);
        });
    }
};

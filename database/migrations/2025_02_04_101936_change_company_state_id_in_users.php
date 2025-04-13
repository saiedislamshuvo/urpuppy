<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
                if (DB::getDriverName() === 'sqlite') {
        $table->unsignedBigInteger('company_state_id')->nullable()->change();
    } elseif (DB::getDriverName() === 'pgsql') {
        DB::statement('ALTER TABLE users ALTER COLUMN company_state_id DROP NOT NULL');
    }
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

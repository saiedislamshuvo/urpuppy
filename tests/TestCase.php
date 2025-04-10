<?php

namespace Tests;

use Database\Seeders\WorldSeeder;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Artisan;

abstract class TestCase extends BaseTestCase
{
    /* protected static $seederHasRun = false; */

    /* protected function setUp(): void */
    /* { */
    /* parent::setUp(); */

    // Ensure database is refreshed and seeder runs only once
    /* if (!self::$seederHasRun) { */
    /* Artisan::call('migrate:fresh'); */
    /* Artisan::call('db:seed --class=WorldSeeder'); */
    /* $this->refreshDatabase(); // Refresh the database schema */
    /* Artisan::call('db:seed', ['--class' => WorldSeeder::class]); // Seed the database */
    /* self::$seederHasRun = true; */
    /* } */
    /* } */
}

<?php

use App\Console\Commands\SyncViewsToDatabase;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

/* Artisan::command('inspire', function () { */
/*     $this->comment(Inspiring::quote()); */
/* })->purpose('Display an inspiring quote')->hourly(); */

Schedule::command(SyncViewsToDatabase::class)->hourly();


Schedule::command('images:convert-webp')->daily();
Schedule::command('sitemap:generate')->daily();
Schedule::command('app:send-wishlist')->daily();
Schedule::command('subscriptions:check-expiration')->daily();
Schedule::command('app:send-inactive-chat-notification')->everyThirtyMinutes();

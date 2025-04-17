<?php

namespace App\Console\Commands;

use App\Models\Contact;
use App\Models\Post;
use App\Models\Puppy;
use App\Models\Report;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Laravel\Cashier\SubscriptionItem;

class ResetDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:reset-database';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Puppy::truncate();

        $users = User::withTrashed()
        ->where('email', '!=', 'admin@urpuppy.com')
        ->get();

        foreach ($users as $user) {
            $user->forceDelete();
        }
        Artisan::call('optimize:clear');
        Report::truncate();
        Contact::truncate();
        Subscription::truncate();
        SubscriptionItem::truncate();
    }
}

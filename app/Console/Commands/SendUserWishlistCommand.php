<?php

namespace App\Console\Commands;

use App\Mail\WishlistMail;
use App\Models\User;
use App\Notifications\UserWishlistMail;
use App\Services\PuppyService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendUserWishlistCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-wishlist';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    protected PuppyService $puppyService;

    public function __construct(PuppyService $puppyService)
    {
        parent::__construct();
        $this->puppyService = $puppyService;
    }

    public function handle()
    {
        $buyers = User::role('buyer')->whereHas('saved_searches')->with('saved_searches')->get();

        foreach ($buyers as $buyer) {
            $allPuppies = collect();

            foreach ($buyer->saved_searches as $search) {
                $filters = (array) $search->payload['filter'] ?? [];

                $last24Hours = now()->subDays(5);
                $puppies = $this->puppyService->getPuppiesCli($filters)->where('created_at', '>=', $last24Hours)->get();
                $allPuppies = $allPuppies->merge($puppies)->unique('id');
            }

            if ($allPuppies->isNotEmpty()) {

                Mail::queue(new WishlistMail($buyer, $allPuppies));
                /* $buyer->notify(new UserWishlistMail($allPuppies)); */
                /* $this->info("Sending wishlist to {$buyer->email} with " . $allPuppies->count() . " puppies."); */

            } else {
                $this->info("No matching puppies for {$buyer->email}.");
            }
        }

        $this->info('Wishlist processing complete.');
    }
}

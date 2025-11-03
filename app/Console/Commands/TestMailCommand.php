<?php

namespace App\Console\Commands;

use App\Mail\AccountDeletionMail;
use App\Mail\AdminNewContact;
use App\Mail\BreederAccountApproved;
use App\Mail\BreederAccountRejected;
use App\Mail\FreeAccountMail;
use App\Mail\NewBreederSpecialAccountMail;
use App\Mail\PremiumAccountMail;
use App\Mail\RenewBreederMail;
use App\Mail\RenewSellerMail;
use App\Mail\SubscriptionEnded;
use App\Mail\SupportTeamEmailResponseMail;
use App\Mail\WishlistMail;
use App\Services\PuppyService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestMailCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-mail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    public function __construct(PuppyService $puppyService)
    {
        parent::__construct();
        $this->puppyService = $puppyService;
    }

    protected PuppyService $puppyService;

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = \App\Models\User::find(1);

        $payload = [
            'first_name' => 'Sasha',
            'last_name' => 'Iyamu',
            'email' => 'info@yurpuppy.com',
            'account_type' => 'Breeder',
            'subject' => 'I need help',
            'message' => 'lorem ipsum dolor sit amet  lorem ipsum dolor sit amet  lorem ipsum dolor sit amet  ',
        ];

        $to = 'saiedislam.shuvo1124@gmail.com';

        $allPuppies = collect();
        Mail::queue((new AdminNewContact($payload))->to($to));
        Mail::queue((new BreederAccountApproved($user))->to($to));
        Mail::queue((new BreederAccountRejected($user, 'Bad images'))->to($to));
        Mail::queue((new FreeAccountMail($user))->to($to));
        Mail::queue((new NewBreederSpecialAccountMail($user))->to($to));
        Mail::queue((new PremiumAccountMail($user))->to($to));
        Mail::queue((new RenewBreederMail($user))->to($to));
        Mail::queue((new RenewSellerMail($user))->to($to));
        Mail::queue((new SubscriptionEnded($user))->to($to));
        Mail::queue((new SupportTeamEmailResponseMail($user->first_name, $to, 'lorem ipsum dolor sit amet'))->to($to));

        $loop = $this->puppyService->getPuppiesCli([])->where('created_at', '>=', now()->subDays(3))->orderByDesc('created_at')->limit(3)->get();
        $allPuppies = $allPuppies->merge($loop)->unique('id');

        try {

            Mail::queue((new WishlistMail($user, $allPuppies))->to('businessguy1982@yahoo.com'));

        } catch (\Throwable $th) {
            \Log::error($th->getMessage());
        }
    }
}

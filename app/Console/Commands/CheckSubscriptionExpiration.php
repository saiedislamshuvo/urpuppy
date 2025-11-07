<?php

namespace App\Console\Commands;

use App\Mail\SubscriptionExpiringSoon;
use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class CheckSubscriptionExpiration extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'subscriptions:check-expiration';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for subscriptions expiring soon and send warning emails';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Checking for subscriptions expiring soon...');

        // Get active subscriptions
        $subscriptions = Subscription::where('stripe_status', 'active')
            ->orWhere('stripe_status', 'trialing')
            ->with('user')
            ->get();

        $sentCount = 0;
        $warningDays = [7, 3, 1]; // Send warnings 7 days, 3 days, and 1 day before expiration

        foreach ($subscriptions as $subscription) {
            try {
                // Get Stripe subscription to check actual expiration
                $stripeSubscription = $subscription->asStripeSubscription();
                $endsAt = Carbon::createFromTimestamp($stripeSubscription->current_period_end);

                $daysUntilExpiration = now()->diffInDays($endsAt, false);

                // Check if we should send a warning for this subscription
                if (in_array($daysUntilExpiration, $warningDays)) {
                    // Check if we've already sent a warning for this day
                    $cacheKey = "subscription-expiring-warning-{$subscription->id}-{$daysUntilExpiration}";

                    if (!cache()->has($cacheKey) && $subscription->user) {
                        // Send warning email
                        Mail::queue(new SubscriptionExpiringSoon($subscription->user, $daysUntilExpiration));

                        // Cache to prevent duplicate emails
                        cache()->put($cacheKey, true, now()->addDays(2));

                        $sentCount++;
                        $this->info("Sent expiration warning to user {$subscription->user->id} ({$daysUntilExpiration} days remaining)");
                    }
                }
            } catch (\Exception $e) {
                Log::error('Error checking subscription expiration', [
                    'subscription_id' => $subscription->id,
                    'error' => $e->getMessage(),
                ]);
                $this->error("Error processing subscription {$subscription->id}: {$e->getMessage()}");
            }
        }

        $this->info("Sent {$sentCount} expiration warning email(s).");

        return Command::SUCCESS;
    }
}


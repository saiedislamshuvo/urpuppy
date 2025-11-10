<?php

namespace App\Console\Commands;

use App\Models\Puppy;
use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class PauseListingsOnExpiration extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'subscriptions:pause-expired-listings';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pause puppy listings when subscriptions expire';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Checking for expired subscriptions and pausing listings...');

        // Get all active/trialing subscriptions and check if they've expired
        $activeSubscriptions = Subscription::whereIn('stripe_status', ['active', 'trialing'])
            ->with('user')
            ->get();

        $pausedCount = 0;

        foreach ($activeSubscriptions as $subscription) {
            try {
                $user = $subscription->user;
                
                if (!$user) {
                    continue;
                }

                // Check Stripe subscription to see if current_period_end has passed
                try {
                    $stripeSubscription = $subscription->asStripeSubscription();
                    $currentPeriodEnd = Carbon::createFromTimestamp($stripeSubscription->current_period_end);
                    
                    // If current_period_end is in the past, subscription has expired
                    if ($currentPeriodEnd->isPast()) {
                        // Check if user has any other active subscriptions
                        $hasOtherActiveSubscription = $user->getActiveSubscriptions()
                            ->where('id', '!=', $subscription->id)
                            ->filter(function ($sub) {
                                try {
                                    $stripe = $sub->asStripeSubscription();
                                    return Carbon::createFromTimestamp($stripe->current_period_end)->isFuture();
                                } catch (\Exception $e) {
                                    return false;
                                }
                            })
                            ->isNotEmpty();

                        // Only pause if no other active subscriptions
                        if (!$hasOtherActiveSubscription) {
                            // Get all published puppies for this user
                            $publishedPuppies = Puppy::where('user_id', $user->id)
                                ->where('status', 'published')
                                ->whereNull('paused_at')
                                ->get();

                            foreach ($publishedPuppies as $puppy) {
                                $puppy->markAsPaused();
                                $pausedCount++;
                            }

                            if ($publishedPuppies->count() > 0) {
                                $this->info("Paused {$publishedPuppies->count()} listings for user {$user->id} (subscription expired)");
                            }
                        }
                    }
                } catch (\Exception $e) {
                    // If we can't fetch from Stripe, check ends_at as fallback
                    if ($subscription->ends_at && Carbon::parse($subscription->ends_at)->isPast()) {
                        $hasOtherActiveSubscription = $user->getActiveSubscriptions()
                            ->where('id', '!=', $subscription->id)
                            ->isNotEmpty();

                        if (!$hasOtherActiveSubscription) {
                            $publishedPuppies = Puppy::where('user_id', $user->id)
                                ->where('status', 'published')
                                ->whereNull('paused_at')
                                ->get();

                            foreach ($publishedPuppies as $puppy) {
                                $puppy->markAsPaused();
                                $pausedCount++;
                            }

                            if ($publishedPuppies->count() > 0) {
                                $this->info("Paused {$publishedPuppies->count()} listings for user {$user->id} (subscription expired - fallback)");
                            }
                        }
                    }
                }
            } catch (\Exception $e) {
                Log::error('Error pausing listings for expired subscription', [
                    'subscription_id' => $subscription->id,
                    'error' => $e->getMessage(),
                ]);
                $this->error("Error processing subscription {$subscription->id}: {$e->getMessage()}");
            }
        }

        // Also check for subscriptions that have ended based on Stripe status
        // This handles cases where ends_at might not be set but status indicates expiration
        $inactiveSubscriptions = Subscription::whereIn('stripe_status', ['canceled', 'past_due', 'unpaid'])
            ->with('user')
            ->get();

        foreach ($inactiveSubscriptions as $subscription) {
            try {
                $user = $subscription->user;
                
                if (!$user) {
                    continue;
                }

                // Check if user has any active subscriptions
                $hasActiveSubscription = $user->getActiveSubscriptions()
                    ->where('id', '!=', $subscription->id)
                    ->isNotEmpty();

                // Only pause if user has no other active subscriptions
                if (!$hasActiveSubscription) {
                    // Get all published puppies for this user
                    $publishedPuppies = Puppy::where('user_id', $user->id)
                        ->where('status', 'published')
                        ->whereNull('paused_at')
                        ->get();

                    foreach ($publishedPuppies as $puppy) {
                        $puppy->markAsPaused();
                        $pausedCount++;
                    }

                    if ($publishedPuppies->count() > 0) {
                        $this->info("Paused {$publishedPuppies->count()} listings for user {$user->id} (no active subscription)");
                    }
                }
            } catch (\Exception $e) {
                Log::error('Error pausing listings for inactive subscription', [
                    'subscription_id' => $subscription->id,
                    'error' => $e->getMessage(),
                ]);
                $this->error("Error processing subscription {$subscription->id}: {$e->getMessage()}");
            }
        }

        $this->info("Paused {$pausedCount} listing(s) total.");

        return Command::SUCCESS;
    }
}


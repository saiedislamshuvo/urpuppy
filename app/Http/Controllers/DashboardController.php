<?php

namespace App\Http\Controllers;

use App\Models\Puppy;
use App\Models\Chat;
use App\Models\ChatMessage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the user's dashboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Get puppy statistics for the current user
        $totalPuppies = Puppy::where('user_id', $user->id)->count();
        
        $publishedPuppies = Puppy::where('user_id', $user->id)
            ->whereRaw("status = 'published'")
            ->count();
        
        $pendingPuppies = Puppy::where('user_id', $user->id)
            ->whereRaw("status = 'draft'")
            ->count();
        
        // Consider puppies as expired if subscription has expired
        // Get active subscriptions to check expiration
        $activeSubscriptions = $user->getActiveSubscriptions()->load('plan');
        $hasActiveSubscription = false;
        
        if ($activeSubscriptions->isNotEmpty()) {
            if ($user->is_breeder) {
                $hasActiveSubscription = $activeSubscriptions->filter(function ($subscription) {
                    if ($subscription->type === 'breeder') {
                        return true;
                    }
                    if (!$subscription->type && $subscription->plan) {
                        return $subscription->plan->type === 'breeder';
                    }
                    return false;
                })->isNotEmpty();
            } else {
                $hasActiveSubscription = $activeSubscriptions->filter(function ($subscription) {
                    if (in_array($subscription->type, ['free', 'seller', 'premium'])) {
                        return true;
                    }
                    if (!$subscription->type && $subscription->plan) {
                        return in_array($subscription->plan->type, ['free', 'seller', 'premium']);
                    }
                    return false;
                })->isNotEmpty();
            }
        }
        
        // If no active subscription, all published/paused puppies are considered expired
        // Otherwise, only paused puppies due to subscription expiration are expired
        if (!$hasActiveSubscription) {
            $expiredPuppies = Puppy::where('user_id', $user->id)
                ->where(function ($query) {
                    $query->where('status', 'paused')
                          ->orWhere('status', 'published');
                })
                ->count();
        } else {
            // Only count paused puppies as expired (those paused due to subscription expiration)
            $expiredPuppies = Puppy::where('user_id', $user->id)
                ->where('status', 'paused')
                ->whereNotNull('paused_at')
                ->count();
        }

        // Enhanced Analytics - Only for sellers/breeders
        $analytics = [];
        if ($user->is_seller || $user->is_breeder) {
            // Get all user's puppies with view counts
            $userPuppies = Puppy::where('user_id', $user->id)->get();
            
            // Total views across all listings
            $totalViews = $userPuppies->sum('view_count');
            
            // Get all chats related to user's puppies
            $puppyIds = $userPuppies->pluck('id');
            $chats = Chat::whereIn('puppy_id', $puppyIds)->get();
            
            // Total messages across all chats for user's puppies
            $chatIds = $chats->pluck('id');
            $totalMessages = ChatMessage::whereIn('chat_id', $chatIds)->count();
            
            // Total inquiries (unique chats per puppy)
            $totalInquiries = $chats->count();
            
            // Top performing puppies (by views)
            $topPuppiesByViews = $userPuppies
                ->sortByDesc('view_count')
                ->take(5)
                ->map(function ($puppy) use ($chats) {
                    $puppyChats = $chats->where('puppy_id', $puppy->id);
                    $puppyChatIds = $puppyChats->pluck('id');
                    $puppyMessages = ChatMessage::whereIn('chat_id', $puppyChatIds)->count();
                    
                    return [
                        'id' => $puppy->id,
                        'name' => $puppy->name,
                        'slug' => $puppy->slug,
                        'views' => $puppy->view_count ?? 0,
                        'inquiries' => $puppyChats->count(),
                        'messages' => $puppyMessages,
                    ];
                })
                ->values();
            
            // Calculate average views per listing
            $avgViewsPerListing = $totalPuppies > 0 ? round($totalViews / $totalPuppies, 1) : 0;
            
            // Calculate average inquiries per listing
            $avgInquiriesPerListing = $totalPuppies > 0 ? round($totalInquiries / $totalPuppies, 1) : 0;
            
            // Views in last 7 days (if we track view history, otherwise use total)
            // For now, we'll use total views as we don't have historical tracking
            $viewsLast7Days = $totalViews; // Placeholder - can be enhanced with view history table
            
            $analytics = [
                'total_views' => $totalViews,
                'total_messages' => $totalMessages,
                'total_inquiries' => $totalInquiries,
                'avg_views_per_listing' => $avgViewsPerListing,
                'avg_inquiries_per_listing' => $avgInquiriesPerListing,
                'views_last_7_days' => $viewsLast7Days,
                'top_puppies' => $topPuppiesByViews,
            ];
        }

        // Build next_steps array in priority order
        $nextSteps = [];
        
        // Step 1: Email Verification (for all users)
        $emailVerified = $user->hasVerifiedEmail();
        $nextSteps[] = [
            'key' => 'verify_email',
            'title' => 'Verify Your Email',
            'message' => 'Please verify your email address to continue.',
            'action_url' => route('verification.notice'),
            'completed' => $emailVerified,
            'priority' => 1,
        ];
        
        // Only check further steps for sellers/breeders
        if ($user->is_seller || $user->is_breeder) {
            // Step 2: Profile Completion
            $profileCompleted = true;
            if ($user->is_breeder) {
                $profileCompleted = $user->breeder_profile_completed ?? false;
            } elseif ($user->is_seller) {
                $profileCompleted = $user->profile_complete ?? false;
            }
            $profileUrl = $user->is_breeder ? route('breeders.create') : route('seller.create');
            $nextSteps[] = [
                'key' => 'complete_profile',
                'title' => 'Complete Profile Setup',
                'message' => $user->is_breeder 
                    ? 'Complete your breeder profile setup to start listing.' 
                    : 'Complete your seller profile setup to start listing.',
                'action_url' => $profileUrl,
                'completed' => $profileCompleted,
                'priority' => 2,
            ];
            
            // Step 3: Approval Status (for breeders only)
            if ($user->is_breeder) {
                $breederRequest = $user->breeder_requests()->latest()->first();
                $isApproved = $breederRequest && $breederRequest->status === 'approved';
                $isPending = $breederRequest && $breederRequest->status === 'pending';
                $isRejected = $breederRequest && $breederRequest->status === 'rejected';
                
                if ($isPending) {
                    $nextSteps[] = [
                        'key' => 'wait_approval',
                        'title' => 'Pending Breeder Request',
                        'message' => $breederRequest->message ?? 'Your profile has been submitted and is pending approval. Please wait for confirmation.',
                        'action_url' => null,
                        'completed' => false,
                        'priority' => 3,
                        'status' => 'pending',
                        'type' => 'info',
                    ];
                } elseif ($isRejected) {
                    $nextSteps[] = [
                        'key' => 'request_rejected',
                        'title' => 'Breeder Request Rejected',
                        'message' => $breederRequest->message ?? 'Your breeder request has been rejected.',
                        'action_url' => '/breeder/request/retry',
                        'completed' => false,
                        'priority' => 3,
                        'status' => 'rejected',
                        'type' => 'error',
                    ];
                } elseif ($isApproved) {
                    $nextSteps[] = [
                        'key' => 'approval_completed',
                        'title' => 'Approval Completed',
                        'message' => 'Your breeder account has been approved.',
                        'action_url' => null,
                        'completed' => true,
                        'priority' => 3,
                        'status' => 'approved',
                        'type' => 'success',
                    ];
                } else {
                    // No request yet, but profile is completed
                    if ($profileCompleted) {
                        $nextSteps[] = [
                            'key' => 'wait_approval',
                            'title' => 'Waiting for Approval',
                            'message' => 'Your profile will be reviewed. Please wait for approval.',
                            'action_url' => null,
                            'completed' => false,
                            'priority' => 3,
                            'status' => 'pending',
                            'type' => 'info',
                        ];
                    }
                }
            }
            
            // Step 4: Plan Purchase
            $activeSubscriptions = $user->getActiveSubscriptions()->load('plan');
            $hasPlan = false;
            
            if ($activeSubscriptions->isNotEmpty()) {
                if ($user->is_breeder) {
                    $hasPlan = $activeSubscriptions->filter(function ($subscription) {
                        if ($subscription->type === 'breeder') {
                            return true;
                        }
                        if (!$subscription->type && $subscription->plan) {
                            return $subscription->plan->type === 'breeder';
                        }
                        return false;
                    })->isNotEmpty();
                } else {
                    $hasPlan = $activeSubscriptions->filter(function ($subscription) {
                        if (in_array($subscription->type, ['free', 'premium'])) {
                            return true;
                        }
                        if (!$subscription->type && $subscription->plan) {
                            return in_array($subscription->plan->type, ['free', 'premium']);
                        }
                        return false;
                    })->isNotEmpty();
                }
            }
            
            // Only show plan step if previous steps are completed
            $canShowPlanStep = $emailVerified && $profileCompleted;
            if ($user->is_breeder) {
                $canShowPlanStep = $canShowPlanStep && ($breederRequest && $breederRequest->status === 'approved');
            }
            
            if ($canShowPlanStep) {
                $planUrl = $user->is_breeder ? route('plans.breeder') : route('plans.index');
                $nextSteps[] = [
                    'key' => 'purchase_plan',
                    'title' => 'Purchase a Plan',
                    'message' => $user->is_breeder 
                        ? 'Subscribe to a breeder plan to start listing puppies.' 
                        : 'Subscribe to a plan to start listing puppies.',
                    'action_url' => $planUrl,
                    'completed' => $hasPlan,
                    'priority' => 4,
                ];
            }
        }

        // Get subscription report data (only for sellers/breeders)
        $subscriptionReport = null;
        if (($user->is_seller || $user->is_breeder) && $hasActiveSubscription) {
            $subscriptionReport = $this->getSubscriptionReport($user, $activeSubscriptions);
        }

        return Inertia::render('Dashboard', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'initial_name' => $user->initial_name,
                'is_seller' => $user->is_seller,
                'is_breeder' => $user->is_breeder,
                'role_badge' => $user->role_badge,
            ],
            'statistics' => [
                'total_puppies' => $totalPuppies,
                'published_puppies' => $publishedPuppies,
                'pending_puppies' => $pendingPuppies,
                'expired_puppies' => $expiredPuppies,
            ],
            'analytics' => $analytics,
            'next_steps' => $nextSteps,
            'subscription_report' => $subscriptionReport,
        ]);
    }

    /**
     * Get subscription report data for dashboard
     */
    private function getSubscriptionReport($user, $activeSubscriptions)
    {
        $report = [];
        
        // Get the relevant subscription based on user type
        $relevantSubscription = null;
        if ($user->is_breeder) {
            $relevantSubscription = $activeSubscriptions->first(function ($subscription) {
                if ($subscription->type === 'breeder') {
                    return true;
                }
                if (!$subscription->type && $subscription->plan) {
                    return $subscription->plan->type === 'breeder';
                }
                return false;
            });
        } else {
            $relevantSubscription = $activeSubscriptions->first(function ($subscription) {
                if (in_array($subscription->type, ['free', 'seller', 'premium'])) {
                    return true;
                }
                if (!$subscription->type && $subscription->plan) {
                    return in_array($subscription->plan->type, ['free', 'seller', 'premium']);
                }
                return false;
            });
        }

        if (!$relevantSubscription || !$relevantSubscription->plan) {
            return null;
        }

        $plan = $relevantSubscription->plan;
        $totalListings = $user->puppies()->count();
        $listingLimit = $plan->listing_limit ?? 0;
        $listingsRemaining = $listingLimit > 0 ? max(0, $listingLimit - $totalListings) : 'Unlimited';

        // Get Stripe subscription data
        try {
            $stripeSubscription = $relevantSubscription->asStripeSubscription();
            $nextBillingDate = $stripeSubscription->current_period_end 
                ? Carbon::createFromTimestamp($stripeSubscription->current_period_end)->format('d M Y')
                : null;
            
            $daysRemaining = $stripeSubscription->current_period_end 
                ? max(0, now()->diffInDays(Carbon::createFromTimestamp($stripeSubscription->current_period_end), false))
                : null;
            
            $isCancelled = $stripeSubscription->cancel_at_period_end ?? false;
        } catch (\Exception $e) {
            $nextBillingDate = null;
            $daysRemaining = null;
            $isCancelled = false;
        }

        return [
            'plan_name' => $plan->name,
            'plan_type' => $plan->type,
            'total_listings' => $totalListings,
            'listing_limit' => $listingLimit,
            'listings_remaining' => $listingsRemaining,
            'next_billing_date' => $nextBillingDate,
            'days_remaining' => $daysRemaining,
            'is_cancelled' => $isCancelled,
            'subscription_status' => $relevantSubscription->stripe_status,
        ];
    }
}


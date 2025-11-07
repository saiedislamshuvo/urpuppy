<?php

namespace App\Http\Controllers;

use App\Models\Puppy;
use Carbon\Carbon;
use Illuminate\Http\Request;
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
        
        // Consider puppies older than 6 months as expired
        $expiredPuppies = Puppy::where('user_id', $user->id)
            ->where('created_at', '<', Carbon::now()->subMonths(6))
            ->count();

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
            $profileCompleted = $user->profile_completed ?? false;
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

        return Inertia::render('Dashboard', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'initial_name' => $user->initial_name,
                'is_seller' => $user->is_seller,
                'is_breeder' => $user->is_breeder,
            ],
            'statistics' => [
                'total_puppies' => $totalPuppies,
                'published_puppies' => $publishedPuppies,
                'pending_puppies' => $pendingPuppies,
                'expired_puppies' => $expiredPuppies,
            ],
            'next_steps' => $nextSteps,
        ]);
    }
}


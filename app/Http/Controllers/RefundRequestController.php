<?php

namespace App\Http\Controllers;

use App\Models\RefundRequest;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RefundRequestController extends Controller
{
    /**
     * Display the refund request page.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        // Get active subscriptions
        $activeSubscriptions = $user->getActiveSubscriptions()->load('plan');
        
        // Get subscription IDs that already have pending refund requests
        $subscriptionsWithPendingRequests = RefundRequest::where('user_id', $user->id)
            ->where('status', 'pending')
            ->pluck('subscription_id')
            ->toArray();
        
        // Filter out subscriptions with pending requests
        $availableSubscriptions = $activeSubscriptions->filter(function ($subscription) use ($subscriptionsWithPendingRequests) {
            return !in_array($subscription->id, $subscriptionsWithPendingRequests);
        });
        
        // Get user's refund requests
        $refundRequests = RefundRequest::where('user_id', $user->id)
            ->with(['subscription.plan'])
            ->orderBy('created_at', 'desc')
            ->get();
        
        return Inertia::render('RefundRequest/Index', [
            'activeSubscriptions' => $availableSubscriptions->map(function ($subscription) {
                return [
                    'id' => $subscription->id,
                    'type' => $subscription->type,
                    'stripe_status' => $subscription->stripe_status,
                    'plan' => $subscription->plan ? [
                        'id' => $subscription->plan->id,
                        'name' => $subscription->plan->name,
                        'type' => $subscription->plan->type,
                    ] : null,
                ];
            }),
            'refundRequests' => $refundRequests->map(function ($refundRequest) {
                return [
                    'id' => $refundRequest->id,
                    'subscription_id' => $refundRequest->subscription_id,
                    'message' => $refundRequest->message,
                    'status' => $refundRequest->status,
                    'created_at' => $refundRequest->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $refundRequest->updated_at->format('Y-m-d H:i:s'),
                    'subscription' => $refundRequest->subscription ? [
                        'id' => $refundRequest->subscription->id,
                        'type' => $refundRequest->subscription->type,
                        'plan' => $refundRequest->subscription->plan ? [
                            'name' => $refundRequest->subscription->plan->name,
                        ] : null,
                    ] : null,
                ];
            }),
        ]);
    }

    /**
     * Store a new refund request.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        
        $validated = $request->validate([
            'subscription_id' => 'required|exists:subscriptions,id',
            'message' => 'required|string|min:10|max:1000',
        ]);
        
        // Verify the subscription belongs to the user and is active
        $subscription = Subscription::where('id', $validated['subscription_id'])
            ->where('user_id', $user->id)
            ->whereIn('stripe_status', ['active', 'trialing'])
            ->first();
        
        if (!$subscription) {
            return back()->withErrors([
                'subscription_id' => 'The selected subscription is not available for refund request.',
            ]);
        }
        
        // Check if there's already a pending refund request for this subscription
        $existingRequest = RefundRequest::where('user_id', $user->id)
            ->where('subscription_id', $validated['subscription_id'])
            ->where('status', 'pending')
            ->first();
        
        if ($existingRequest) {
            return back()->withErrors([
                'subscription_id' => 'You already have a pending refund request for this subscription.',
            ]);
        }
        
        // Create the refund request
        RefundRequest::create([
            'user_id' => $user->id,
            'subscription_id' => $validated['subscription_id'],
            'message' => $validated['message'],
            'status' => 'pending',
        ]);
        
        return back()->with('success', 'Refund request submitted successfully. We will review it shortly.');
    }
}


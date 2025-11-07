<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureHasPlan
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        // Only check for sellers and breeders
        if ($user->is_seller || $user->is_breeder) {
            // For breeders: Check approval status first
            if ($user->is_breeder) {
                $breederRequest = $user->breeder_requests()->latest()->first();
                
                // If request exists and status is not approved, block access
                if ($breederRequest && $breederRequest->status != 'approved') {
                    if ($breederRequest->status == 'pending') {
                        return redirect()->route('dashboard')
                            ->with('message.error', 'Your breeder account is pending approval. Please wait for confirmation before proceeding.');
                    }
                    
                    if ($breederRequest->status == 'rejected') {
                        return redirect()->route('dashboard')
                            ->with('message.error', 'Your breeder request has been rejected. Please contact support or request again.');
                    }
                }
            }

            // Check for active subscriptions directly, eager load plan relationship
            $activeSubscriptions = $user->getActiveSubscriptions()->load('plan');
            $hasPlan = false;

            if ($activeSubscriptions->isNotEmpty()) {
                if ($user->is_breeder) {
                    // For breeders, check if any subscription has type 'breeder' or plan type 'breeder'
                    $hasPlan = $activeSubscriptions->filter(function ($subscription) {
                        if ($subscription->type === 'breeder') {
                            return true;
                        }
                        // Fallback: check plan relationship if type is not set
                        if (!$subscription->type && $subscription->plan) {
                            return $subscription->plan->type === 'breeder';
                        }
                        return false;
                    })->isNotEmpty();
                } else {
                    // For sellers, check if any subscription has type 'free' or 'premium' or plan type matches
                    $hasPlan = $activeSubscriptions->filter(function ($subscription) {
                        if (in_array($subscription->type, ['free', 'seller'])) {
                            return true;
                        }
                        // Fallback: check plan relationship if type is not set
                        if (!$subscription->type && $subscription->plan) {
                            return in_array($subscription->plan->type, ['free', 'seller']);
                        }
                        return false;
                    })->isNotEmpty();
                }
            }

            if (!$hasPlan) {
                // Redirect to appropriate plan page
                if ($user->is_breeder) {
                    return redirect()->route('plans.breeder')
                        ->with('message.error', 'Please subscribe to a plan before creating listings.');
                } else {
                    return redirect()->route('plans.index')
                        ->with('message.error', 'Please subscribe to a plan before creating listings.');
                }
            }
        }

        return $next($request);
    }
}

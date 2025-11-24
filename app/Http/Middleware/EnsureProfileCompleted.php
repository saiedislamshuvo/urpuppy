<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureProfileCompleted
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

        // Step 1: Check email verification first (for all users)
        if (!$user->hasVerifiedEmail()) {
            return redirect()->route('verification.notice')
                ->with('message.error', 'Please verify your email address before continuing.');
        }

        // Step 2: Check if profile is completed
        $profile_completed = false;
        if ($user->is_breeder) {
            $profile_completed = $user->breeder_profile_completed ?? false;
        } elseif ($user->is_seller) {
            $profile_completed = $user->profile_completed ?? false;
        } else {
            $profile_completed = $user->profile_completed ?? false;
        }
        
        if (!$profile_completed) {
            // For breeders, redirect to breeder profile setup
            if ($user->is_breeder) {
                return redirect()->route('breeders.create')
                    ->with('message.error', 'Please complete your breeder profile setup before continuing.');
            }

            // For sellers, redirect to seller profile setup
            if ($user->is_seller) {
                return redirect()->route('seller.create')
                    ->with('message.error', 'Please complete your seller profile setup before continuing.');
            }

            // For other users, redirect to profile edit
            return redirect()->route('profile.edit', ['tab' => 'Account Settings'])
                ->with('message.error', 'Please complete your profile before continuing.');
        }

        return $next($request);
    }
}

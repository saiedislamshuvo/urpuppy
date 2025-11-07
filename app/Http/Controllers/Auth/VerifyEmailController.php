<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmailVerificationRequest;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request, int $id): RedirectResponse
    {
        $user = User::findOrFail($id);
        $role = $user->is_breeder ? 'breeder' : ($user->is_seller ? 'seller' : 'buyer');

        $redirect_url = 'home';

        if ($role == 'breeder') {
            // For breeders, check if profile is completed, then redirect to plans
            if (!$user->profile_completed) {
                $redirect_url = 'breeders.create';
            } else {
                $redirect_url = 'plans.breeder';
            }
        } elseif ($role == 'seller') {
            // For sellers, check if profile is completed, then redirect to plans
            if (!$user->profile_completed) {
                $redirect_url = 'seller.create';
            } else {
                $redirect_url = 'plans.index';
            }
        }

        if ($user->hasVerifiedEmail()) {
            // Refresh to get latest profile_completed status
            $user->refresh();
            // Recalculate redirect URL based on current status
            if ($role == 'breeder') {
                $redirect_url = !$user->profile_completed ? 'breeders.create' : 'plans.breeder';
            } elseif ($role == 'seller') {
                $redirect_url = !$user->profile_completed ? 'seller.create' : 'plans.index';
            }
            return redirect()->intended(route($redirect_url, absolute: false).'?verified=1&role='.$role);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        // Refresh to get latest profile_completed status
        $user->refresh();
        
        // Recalculate redirect URL based on current status
        if ($role == 'breeder') {
            $redirect_url = !$user->profile_completed ? 'breeders.create' : 'plans.breeder';
        } elseif ($role == 'seller') {
            $redirect_url = !$user->profile_completed ? 'seller.create' : 'plans.index';
        }

        return redirect()->intended(route($redirect_url, absolute: false).'?verified=1'.'&role='.$role)
            ->with('message.success', 'Email verified successfully! Please purchase a plan to start listing puppies.');
    }
}

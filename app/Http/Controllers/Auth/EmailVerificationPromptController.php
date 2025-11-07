<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        $user = $request->user();
        
        // If email is already verified, redirect based on completion status
        if ($user->hasVerifiedEmail()) {
            $user->refresh();
            
            if ($user->is_breeder) {
                $route = !$user->profile_completed ? 'breeders.create' : 'plans.breeder';
            } elseif ($user->is_seller) {
                $route = !$user->profile_completed ? 'seller.create' : 'plans.index';
            } else {
                $route = 'home';
            }
            
            return redirect()->intended(route($route, absolute: false));
        }

        return Inertia::render('Auth/VerifyEmail', [
            'status' => session('status'),
            'puppy' => guest_puppy(),
        ]);
    }
}

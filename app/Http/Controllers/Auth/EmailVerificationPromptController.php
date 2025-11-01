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
        $route = 'home';

        if ($user->roles()->where('name', 'breeder')->exists()) {
            $route = 'breeders.create';
        } elseif ($user->roles()->where('name', 'seller')->exists()) {
            $route = 'seller.create';
        }

        return $user->hasVerifiedEmail()
                    ? redirect()->intended(route($route, absolute: false))
            : Inertia::render('Auth/VerifyEmail', ['status' => session('status'),
                'puppy' => guest_puppy(),

            ]);
    }
}

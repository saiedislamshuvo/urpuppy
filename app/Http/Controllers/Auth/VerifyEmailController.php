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
        $role = $request->query('role');

        $redirect_url = 'home';

        if ($role == 'breeder') {
            $redirect_url = 'breeders.create';
        } elseif ($role == 'seller') {
            $redirect_url = 'seller.create';
        }

        if ($user->hasVerifiedEmail()) {
            return redirect()->intended(route($redirect_url, absolute: false).'?verified=1&role='.$role);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect()->intended(route($redirect_url, absolute: false).'?verified=1'.'&role='.$role);
    }
}

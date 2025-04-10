<?php

namespace App\Http\Controllers\Auth;

use App\Data\PuppyData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Puppy;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        if (request()->get('redirect') == 'back') {
            session()->put('redirect', url()->previous());
        }

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'puppy' => PuppyData::optional(Puppy::with(['breeds', 'seller'])->hasSubscribedUsers()->inRandomOrder()->first()),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        /* dd('login'); */
        /* inertia()->clearHistory(); */
        $request->authenticate();

        $request->session()->regenerate();

        /* dd($request->user()->puppies()->count()); */
        if ($request->user()->puppies()->count() && ! $request->user()->is_subscribed) {
            /* return redirect()->intended(route('plans.index', absolute: false)); */
        }

        return redirect()->intended(session('redirect') ?? route('home', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        inertia()->clearHistory();

        return redirect('/');
    }
}

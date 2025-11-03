<?php

namespace App\Http\Controllers\Auth;

use App\Data\PuppyData;
use App\Http\Controllers\Controller;
use App\Models\Puppy;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'puppy' => PuppyData::optional(Puppy::with(['breeds', 'seller'])->hasSubscribedUsers()->inRandomOrder()->first()),
        ]);
    }

    public function createBreeder(): Response
    {
        return Inertia::render('Auth/RegisterBreeder', [
            'puppy' => PuppyData::optional(Puppy::with(['breeds', 'seller'])->hasSubscribedUsers()->inRandomOrder()->first()),
        ]);
    }

    public function createSeller(): Response
    {
        return Inertia::render('Auth/RegisterSeller', [
            'puppy' => PuppyData::optional(Puppy::with(['breeds', 'seller'])->hasSubscribedUsers()->inRandomOrder()->first()),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, string $role): RedirectResponse
    {
        if (! in_array($role, ['breeder', 'buyer', 'seller'])) {
            return response()->json(['error' => 'Invalid role'], 400);
        }

        $validated = $request->validate([
            'first_name' => 'required|string|max:40',
            'last_name' => 'required|string|max:40',
            'state_id' => '',
            'city_id' => '',
            'email' => 'confirmed|required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        if (User::where('email', $validated['email'])->exists()) {
            return response()->json(['error' => 'Email exist'], 400);
        }

        $user = User::create([
            'first_name' => ucwords($request->first_name),
            'last_name' => ucwords($request->last_name),
            'email' => strtolower($validated['email']),
            'state_id' => $request?->state_id,
            'city_id' => $request?->city_id,
            'zip_code' => $request->zip_code,
            'is_seller' => $role == 'seller',
            'is_breeder' => $role == 'breeder',
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        if ($role == 'breeder' || $role == 'seller') {
            return redirect(route('plans.index', absolute: false))->with('message.success', 'You have to purchase a plan to start selling');
        }

        return redirect(route('home', absolute: false))->with('message.success', 'You have been registered successfully.');
    }
}

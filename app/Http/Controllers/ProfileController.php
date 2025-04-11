<?php

namespace App\Http\Controllers;

use App\Data\PlanData;
use App\Data\PuppyCardData;
use App\Data\SavedSearchData;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\BreedResource;
use App\Mail\AccountDeletionMail;
use App\Models\Breed;
use App\Models\Country;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

        $breeds = Cache::remember("user_{$user->id}_breeds", now()->addHours(12), function() {
            return BreedResource::collection(Breed::select('id', 'name')->orderBy('name')->get());
        });

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'puppies' => PuppyCardData::collect($user->puppies()->with('breeds', 'seller')->paginate(12)),
            'status' => session('status'),
            'plan' => PlanData::optional($user?->premium_plan?->plan),
            'breeder_plan' => PlanData::optional($user?->breeder_plan?->plan),
            'saved_searches' => SavedSearchData::collect($user->saved_searches()->latest()->get()),
            'plan_next_billing' => $this->getStripeDate($user?->premium_plan),
            'plan_cancel_at' => $this->getStripeCancelStatus($user?->premium_plan),
            'breeder_next_billing' => $this->getStripeDate($user?->breeder_plan),
            'breeder_cancel_at' => $this->getStripeCancelStatus($user?->breeder_plan),
            'breeder_requests' => $user->breeder_requests()->latest()->first(),
            'tab' => $request->tab ?? 'Account Settings',
            'breeds' => $breeds,
        ]);
    }

    private function getStripeDate($plan)
    {
        if (!$plan) return null;

        return Cache::remember("stripe_date_{$plan->id}", now()->addHours(1), function() use ($plan) {
            try {
                $subscription = $plan->asStripeSubscription();
                return $subscription->current_period_end
                    ? Carbon::parse($subscription->current_period_end)->format('d M Y')
                    : null;
            } catch (\Exception $e) {
                return null;
            }
        });
    }

    private function getStripeCancelStatus($plan)
    {
        if (!$plan) return null;

        return Cache::remember("stripe_cancel_{$plan->id}", now()->addHours(1), function() use ($plan) {
            try {
                $subscription = $plan->asStripeSubscription();
                return $subscription->cancel_at_period_end ?? null;
            } catch (\Exception $e) {
                return null;
            }
        });
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $user = $request->user();

        // Handle state/city data
        if (is_array(@$input['state_id'])) {
            $input['state_id'] = $input['state_id']['id'];
        }

        if (@$input['company_state'] && !is_array(@$input['company_state'])) {
            $input['company_state_id'] = $input['company_state'];
        }

        if (is_array(@$input['company_state'])) {
            $input['company_state_id'] = $input['company_state']['id'];
        }

        // Handle map data
        if (is_array(@$input['gmap_payload'])) {
            $map = $input['gmap_payload'];
            $input['city'] = $map['city'];
            $input['state'] = $map['state'];
            $input['street'] = $map['street'];
            $input['short_state'] = $map['shortState'];
            $input['zip_code'] = $map['zipCode'];
            $input['gmap_address'] = $map['address'];
        }

        // Update user data
        $user->fill($input);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        // Handle avatar
        if (!empty($input['avatar'])) {
            $user->clearMediaCollection('avatars');
            $user->addMedia($input['avatar'])->toMediaCollection('avatars');
        }

        // Handle company logo
        if (isset($input['company_logo']) && !is_string($input['company_logo'])) {
            $user->clearMediaCollection('company_logo');
            $user->addMedia($input['company_logo'])->toMediaCollection('company_logo');
        }

        // Handle password change
        if (!empty($input['current_password']) && !empty($input['new_password'])) {
            $user->password = Hash::make($input['new_password']);
        }

        $user->save();

        return Redirect::route('profile.edit')->with([
            'message.success' => 'Profile updated successfully.',
        ]);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();
        Auth::logout();

        // Queue the deletion email
        Mail::to($user)->queue(new AccountDeletionMail($user));

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/')->with([
            'message.success' => 'Account deleted successfully.',
        ]);
    }

    public function destroyAvatar(Request $request)
    {
        $request->user()->clearMediaCollection('avatars');
        return redirect()->back()->with([
            'message.success' => 'Avatar deleted successfully.',
        ]);
    }
}

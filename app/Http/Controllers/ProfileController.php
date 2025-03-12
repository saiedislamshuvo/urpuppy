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
        /* dd($user->subscriptions()->active()->first()); */

    /* $countryState = Country::where('iso2', 'US')->first()?->states(); */

    /* $states = $countryState?->select('id', 'name')->get()->map(fn($state) => [ */
    /*     'value' => $state->id, */
    /*     'label' => ucwords($state->name), */
    /* ]) ?? []; */

    /* $selectedStateId = request('state_id') ?: $user->state_id ?? $countryState?->first()?->id; */
    /*     dd($selectedStateId); */
    /* $stateCities = $countryState?->where('id', $selectedStateId)?->first(); */

    /* $cities = $stateCities?->cities()->exists() */
    /*     ? $stateCities->cities()->select('id', 'name')->get()->map(fn($city) => [ */
    /*         'value' => $city->id, */
    /*         'label' => ucwords($city->name), */
    /*     ]) */
    /*     : []; */

    $breeds = BreedResource::collection(Breed::select('id', 'name')->orderBy('name')->get());


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
        /* 'states' => $states, */
        /* 'cities' => $cities, */
    ]);
}


    private function getStripeDate($plan)
{
    try {
        if (!$plan) {
            return null;
        }

        // Retrieve the subscription from Stripe
        $subscription = $plan->asStripeSubscription();

        // Check if the subscription exists and has a current_period_end
        if ($subscription && isset($subscription->current_period_end)) {
            return Carbon::parse($subscription->current_period_end)->format('d M Y');
        }

        return null;
    } catch (\Stripe\Exception\InvalidRequestException $e) {
        // Handle the case where the subscription does not exist
        return null;
    } catch (Exception $e) {
        // Handle any other exceptions
        return null;
    }
}

private function getStripeCancelStatus($plan)
{
    try {
        if (!$plan) {
            return null;
        }

        // Retrieve the subscription from Stripe
        $subscription = $plan->asStripeSubscription();

        // Check if the subscription exists and has the `cancel_at_period_end` property
        if ($subscription && isset($subscription->cancel_at_period_end)) {
            return $subscription->cancel_at_period_end;
        }

        return null;
    } catch (\Stripe\Exception\InvalidRequestException $e) {
        // Handle the case where the subscription does not exist
        return null;
    } catch (Exception $e) {
        // Handle any other exceptions
        return null;
    }
}


    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {

        $input = $request->validated();
        $avatar = $input['avatar'];




        /* unset($input['avatar']); */
        /* /1* unset($input['company_logo']); *1/ */

        if (is_array(@$input['state_id'])) {
            $input['state_id'] = $input['state_id']['id'];
        }

        if (@$input['company_state'] && !is_array(@$input['company_state'])) {
            $input['company_state_id'] = $input['company_state'];
        }

        if (is_array(@$input['company_state'])) {
            $input['company_state_id'] = $input['company_state']['id'];
        }

        if (is_array(@$input['city'])) {
            $input['city'] = $input['city'];
        }

        if (is_array(@$input['gmap_payload'])) {
            $map = $input['gmap_payload'];
            $input['city'] = $map['city'];
            $input['state'] = $map['state'];
            $input['street'] = $map['street'];
            $input['short_state'] = $map['shortState'];
            $input['zip_code'] = $map['zipCode'];
            $input['gmap_address'] = $map['address'];
        }

        $request->user()->fill($input);


        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        if ($avatar) {
        $request->user()->clearMediaCollection('avatars');
        $request->user()->addMedia($avatar)->toMediaCollection('avatars');
        }

if (isset($input['company_logo']) && !is_string($input['company_logo'])) {
         $company_logo = $input['company_logo'];
        $request->user()->clearMediaCollection('company_logo');
        $request->user()->addMedia($company_logo)->toMediaCollection('company_logo');
        }

        if ($input['current_password'] != null && $input['new_password']) {
            $request->user()->password = Hash::make($input['new_password']);
        }


        $request->user()->save();

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

        $user->delete();

        Mail::queue(new AccountDeletionMail($user));

        /* inertia()->clearHistory(); */

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
            'message.success' => 'Avatar deleted successfully.'
        ]);
    }
}

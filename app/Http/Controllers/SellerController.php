<?php

namespace App\Http\Controllers;

use App\Data\PuppyData;
use App\Http\Requests\SellerRegistrationRequest;
use App\Models\State;
use App\Models\User;
use App\Services\FavoriteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SellerController extends Controller
{
    public function show(Request $request, string $slug)
    {
        $seller = Cache::remember(
            "seller_{$slug}_profile",
            now()->addHours(6),
            fn() => User::where('slug', $slug)->firstOrFail()
        );

        $puppies = Cache::remember(
            "seller_{$slug}_puppies_page_{$request->page}",
            now()->addHours(2),
            fn() => $seller->puppies()
                ->with(['media', 'siblings', 'breeds', 'seller', 'puppy_patterns', 'puppy_colors'])
                ->paginate(12)
        );

        return inertia('Seller/AllPuppies', [
            'seller_name' => $seller?->company_name ?? $seller->full_name,
            'all_puppies' => app(FavoriteService::class)->applyFavorites(PuppyData::collect($puppies)),
        ]);
    }

    // Puppy deletion is now handled by PuppyListingController

    /**
     * Show the seller profile registration form.
     * This is only for seller profile information, not puppy creation.
     */
    public function create(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return error('login', 'You are not logged in')->setStatusCode(301);
        }

        if (!$user->is_seller && !$user->is_breeder) {
            return error('home', 'You are not a seller/breeder');
        }

        // Get user's default location
        $defaultLocation = null;
        if ($user && ($user->lat && $user->lng)) {
            $defaultLocation = [
                'lat' => $user->lat,
                'lng' => $user->lng,
                'address' => $user->gmap_address ?? $user->address ?? '',
                'city' => $user->city ?? '',
                'street' => $user->street ?? '',
                'state' => $user->state ?? '',
                'shortState' => $user->short_state ?? '',
                'zipCode' => $user->zip_code ?? '',
            ];
        }

        return inertia('Seller/Registration', [
            'puppy_count' => $user->puppies()->count(),
            'puppy_edit' => null,
            'defaultLocation' => $defaultLocation,
        ]);
    }

    /**
     * Update seller profile information.
     * This only handles seller profile updates, not puppy creation.
     */
    public function updateProfile(SellerRegistrationRequest $request)
    {
        try {
            $user = $request->user();
            $data = $request->validated();

            // Update profile
            $this->updateUserProfile($user, $data);

            // Refresh user to get latest data
            $user->refresh();

            // If email is verified, check for plan
            if (!$user->premium_plan && !$user->breeder_plan) {
                return redirect(route('plans.index', absolute: false))
                    ->with('message.success', 'Profile setup completed! Please purchase a plan to start listing puppies.');
            }

            return success('profile.edit', 'Profile updated successfully');
        } catch (\Exception $e) {
            Log::error('Error in updateProfile method: ' . $e->getMessage());
            return error('profile.edit', 'An error occurred while updating your profile. Please try again.');
        }
    }

    protected function updateUserProfile(User $user, array $data): void
    {
        $updateData = [
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'phone' => $data['phone'],
            'website' => $data['website'],
            'social_fb' => $data['social_fb'],
            'social_ig' => $data['social_ig'],
            'social_tiktok' => $data['social_tiktok'],
            'social_x' => $data['social_x'],
            'profile_completed' => true,
        ];

        // Check if location fields are provided (new format)
        $hasLocationData = isset($data['location_lat']) || isset($data['location_lng']) || 
                          isset($data['location_address']) || isset($data['location_city']) || 
                          isset($data['location_state']) || isset($data['location_zip_code']);

        if ($hasLocationData) {
            // Use new location fields format
            $updateData['lat'] = $data['location_lat'] ?? null;
            $updateData['lng'] = $data['location_lng'] ?? null;
            $updateData['gmap_address'] = $data['location_address'] ?? null;
            $updateData['city'] = $data['location_city'] ?? null;
            $updateData['street'] = $data['location_street'] ?? null;
            $updateData['state'] = $data['location_state'] ?? null;
            $updateData['short_state'] = $data['location_short_state'] ?? null;
            $updateData['zip_code'] = $data['location_zip_code'] ?? $data['zip_code'] ?? null;

            // Look up state_id based on state name or abbreviation
            $stateId = null;
            if (!empty($data['location_state'])) {
                // First try to find by exact state name
                $state = State::where('name', $data['location_state'])->first();
                
                // If not found and short_state is provided, try abbreviation
                if (!$state && !empty($data['location_short_state'])) {
                    $state = State::where('abbreviation', strtoupper($data['location_short_state']))->first();
                }
                
                // If still not found, try case-insensitive search by name
                if (!$state) {
                    $state = State::whereRaw('LOWER(name) = ?', [strtolower($data['location_state'])])->first();
                }
                
                if ($state) {
                    $stateId = $state->id;
                }
            }
            
            $updateData['state_id'] = $stateId;
        } elseif (isset($data['gmap_payload']) && is_array($data['gmap_payload'])) {
            // Fallback to old gmap_payload format for backward compatibility
            $updateData['gmap_address'] = $data['gmap_payload']['address'] ?? null;
            $updateData['city'] = $data['gmap_payload']['city'] ?? null;
            $updateData['street'] = $data['gmap_payload']['street'] ?? null;
            $updateData['state'] = $data['gmap_payload']['state'] ?? null;
            $updateData['short_state'] = $data['gmap_payload']['shortState'] ?? null;
            $updateData['zip_code'] = $data['gmap_payload']['zipCode'] ?? $data['zip_code'] ?? null;
            $updateData['lat'] = $data['gmap_payload']['lat'] ?? null;
            $updateData['lng'] = $data['gmap_payload']['lng'] ?? null;
        } else {
            // If zip_code is provided separately, use it
            if (isset($data['zip_code'])) {
                $updateData['zip_code'] = $data['zip_code'];
            }
        }

        $user->update($updateData);
    }

}
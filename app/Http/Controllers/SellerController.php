<?php

namespace App\Http\Controllers;

use App\Data\PuppyData;
use App\Http\Requests\SellerRegistrationRequest;
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

        return inertia('Seller/Registration', [
            'puppy_count' => $user->puppies()->count(),
            'puppy_edit' => null,
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
        $user->update([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'phone' => $data['phone'],
            'website' => $data['website'],
            'social_fb' => $data['social_fb'],
            'social_ig' => $data['social_ig'],
            'social_tiktok' => $data['social_tiktok'],
            'social_x' => $data['social_x'],
            'gmap_address' => $data['gmap_payload']['address'] ?? null,
            'city' => $data['gmap_payload']['city'] ?? null,
            'street' => $data['gmap_payload']['street'] ?? null,
            'state' => $data['gmap_payload']['state'] ?? null,
            'short_state' => $data['gmap_payload']['shortState'] ?? null,
            'zip_code' => $data['gmap_payload']['zipCode'] ?? $data['zip_code'] ?? null,
            'profile_completed' => true,
        ]);
    }

}
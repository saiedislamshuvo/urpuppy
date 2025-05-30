<?php

namespace App\Http\Controllers;

use App\Data\PuppyData;
use App\Data\PuppyEditData;
use App\Http\Requests\PuppyUpdateRequest;
use App\Http\Requests\SellerRegistrationRequest;
use App\Jobs\GenerateVideoThumbnail;
use App\Jobs\ProcessPuppyMedia;
use App\Models\Puppy;
use App\Models\User;
use App\Services\FavoriteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Laravel\Octane\Facades\Octane;

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

    public function destroy(int $id)
    {
        $puppy = Puppy::findOrFail($id);
        $puppy->delete();

        // Clear relevant cache
        Cache::forget("seller_{$puppy->seller->slug}_puppies_*");

        return success('register.seller', 'Puppy deleted successfully');
    }

    public function create(Request $request, $id = null)
    {
        $user = $request->user();

        // Check all conditions in parallel
        [$hasBreederPlan, $breederRequest, $hasKennelName, $isVerified, $isSeller] = Octane::concurrently([
            fn() => $user?->breeder_plan,
            fn() => $user?->breeder_requests()->latest()->first()?->status,
            fn() => !empty($user?->kennel_name),
            fn() => $user?->email_verified_at,
            fn() => $user?->roles->contains('seller') || $user?->roles->contains('breeder'),
        ]);

        if (!$user) {
            return error('register.seller', 'You are not logged in');
        }

        if (!$isVerified) {
            return error('verification.notice', 'Verify first.');
        }

        if (!$isSeller) {
            return error('home', 'You are not a seller/breeder');
        }

        if (!$hasBreederPlan && $user->roles->contains('breeder')) {
            if ($breederRequest != 'approved') {
                return error('profile.edit', 'Your request has not been approved yet');
            }

            if ($hasKennelName) {
                return error('plans.breeder', 'Please subscribe to a plan');
            }

            return error('breeders.create', 'Register as a breeder to create puppies');
        }

        if (!$user->premium_plan && $user->puppies()->count() == 1 && $user->roles->contains('seller')) {
            return success('plans.index', 'Subscribe to any plan to activate your listing');
        }

        $patterns = pattern_options();
$breeds = breed_options();
$colors = color_options();
$siblings = sibling_options($request, $id);


        return inertia('Seller/Registration', [
            'puppy_count' => $user->puppies()->count(),
            'puppy_edit' => $id ? PuppyEditData::from(
                Puppy::with(['media', 'siblings', 'breeds', 'seller', 'puppy_patterns', 'puppy_colors'])
                    ->findOrFail($id)
            ) : null,
            'patterns' => $patterns,
            'breeds' => $breeds,
            'colors' => $colors,
            'siblings' => $siblings,
        ]);
    }

    public function store(SellerRegistrationRequest $request)
    {
        try {
            return DB::transaction(function () use ($request) {
                $user = $request->user();

                // Check plan requirements
                if (!$user->breeder_plan && !$user->premium_plan && $user->puppies()->count() > 1) {
                    return success('plans.index', 'Subscribe to any plan to activate your listing');
                }

                $data = $request->validated();

                // Update profile if needed
                if (!$user->profile_completed) {
                    $this->updateUserProfile($user, $data);
                }

                // Check listing limit
                if ($user->puppies()->count() >= ($user->premium_plan?->plan?->listing_limit ?? 0) &&
                    $user->premium_plan?->plan?->listing_limit != 0) {
                    return error('home', 'You have reached your listing limit');
                }

                // Create puppy
                $created_puppy = $user->puppies()->create($this->formatPuppyData($data));

                // Process relationships
                $this->processPuppyRelationships($created_puppy, $data);

                // Process media in background
                $this->dispatchMediaJobs($created_puppy, $data);

                // Clear history and cache
                inertia()->clearHistory();
                Cache::forget("seller_{$user->slug}_puppies_*");

                       if (
                !$user->breeder_plan &&
                !$user->premium_plan &&
                $user->profile_completed
            ) {
                return success('plans.index', 'Subscribe to any plan to activate your listing');
            }

                return success('puppies.show', 'Puppy created successfully', $created_puppy->slug);
            });
        } catch (\Exception $e) {
            Log::error('Error in store method: ' . $e->getMessage());
            return error('home', 'An error occurred while creating the puppy. Please try again.');
        }
    }

    public function update(PuppyUpdateRequest $request, int $id)
    {
        try {
            return DB::transaction(function () use ($request, $id) {
                $data = $request->validated();
                $user = $request->user();

                // Update puppy
                $puppy = $user->puppies()->findOrFail($id);
                $puppy->update($this->formatPuppyData($data));

                // Process relationships
                $this->processPuppyRelationships($puppy, $data, true);

                // Process media in background
                $this->dispatchMediaJobs($puppy, $data, true);

                // Clear history and cache
                inertia()->clearHistory();
                Cache::forget("seller_{$user->slug}_puppies_*");

                return success('puppies.show', 'Puppy updated successfully', $puppy->slug);
            });
        } catch (\Exception $e) {
            Log::error('Error in update method: ' . $e->getMessage());
            return error('home', 'An error occurred while updating the puppy. Please try again.');
        }
    }

    protected function updateUserProfile(User $user, array $data): void
    {
        $user->update([
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
            'zip_code' => $data['gmap_payload']['zipCode'] ?? null,
            'profile_completed' => true,
        ]);
    }

    protected function formatPuppyData(array $data): array
    {
        return [
            'name' => ucwords($data['puppy_name']),
            'gender' => $data['puppy_gender'],
            'description' => $data['puppy_about'],
            'birth_date' => $data['puppy_birth_date'],
            'price' => $data['puppy_price'],
            'has_vaccine' => $data['has_vaccine'] == 'yes',
            'has_health_certificate' => $data['has_health_certificate'] == 'yes',
            'has_vet_exam' => $data['has_vet_exam'] == 'yes',
            'has_travel_ready' => $data['has_travel_ready'] == 'yes',
            'has_delivery_included' => $data['has_delivery_included'] == 'yes',
        ];
    }

    protected function processPuppyRelationships(Puppy $puppy, array $data, bool $isUpdate = false): void
    {
        $relationships = [
            'puppy_patterns' => $data['puppy_patterns'] ?? [],
            'breeds' => $data['puppy_breeds'] ?? [],
            'puppy_colors' => $data['puppy_colors'] ?? [],
        ];

        foreach ($relationships as $relation => $items) {
            if ($isUpdate) {
                $puppy->$relation()->detach();
            }

            if (!empty($items)) {
                $items = isset(collect($items)->first()['value'])
                    ? collect($items)->unique('value')->pluck('value')->toArray()
                    : $items;

                $puppy->$relation()->attach($items);
            }
        }

        // Handle siblings separately
        if (isset($data['puppy_siblings']) && !empty($data['puppy_siblings'])) {
            if ($isUpdate) {
                $puppy->siblings()->detach();
            }

            $siblings = isset(collect($data['puppy_siblings'])->first()['value'])
                ? collect($data['puppy_siblings'])->unique('value')->pluck('value')->toArray()
                : $data['puppy_siblings'];

            $puppy->attachSiblings($siblings);
        }
    }

    protected function dispatchMediaJobs(Puppy $puppy, array $data, bool $isUpdate = false): void
    {
        if ($isUpdate) {
            $puppy->clearMediaCollection('video');
            $puppy->clearMediaCollection('puppy_files');
        }

        // Process videos
        if (isset($data['videos'])) {
            ProcessPuppyMedia::dispatch($puppy, $data['videos'], 'video');
        }

        // Process images
        if (isset($data['images'])) {
            $filePaths = collect($data['images'])->map(function ($image) {
                $path = $image->store('temp/uploads', config('media-library.disk_name'));
                return Storage::disk(config('media-library.disk_name'))->url($path);
            })->toArray();

            ProcessPuppyMedia::dispatch($puppy, $filePaths, 'puppy_files');
        }
    }
}

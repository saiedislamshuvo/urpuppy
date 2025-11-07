<?php

namespace App\Http\Controllers;

use App\Data\PuppyEditData;
use App\Http\Requests\PuppyListingRequest;
use App\Jobs\ProcessPuppyMedia;
use App\Mail\NewPuppyListingPosted;
use App\Models\Puppy;
use App\Models\State;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PuppyListingController extends Controller
{
    /**
     * Show the form for creating a new puppy listing.
     * Middleware handles: auth, verified, profile.completed, has.plan
     */
    public function create(Request $request): Response
    {
        $patterns = pattern_options();
        $breeds = breed_options();
        $colors = color_options();
        $user = $request->user();

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

        return Inertia::render('PuppyListing/Create', [
            'patterns' => $patterns,
            'breeds' => $breeds,
            'colors' => $colors,
            'defaultLocation' => $defaultLocation,
        ]);
    }

    /**
     * Show the form for editing a puppy listing.
     */
    public function edit(Request $request, int $id): Response
    {
        $user = $request->user();
        $puppy = $user->puppies()->findOrFail($id);

        $patterns = pattern_options();
        $breeds = breed_options();
        $colors = color_options();

        // Get user's default location for fallback
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

        return Inertia::render('PuppyListing/Edit', [
            'puppy_edit' => PuppyEditData::from(
                Puppy::with(['media', 'breeds', 'seller', 'puppy_patterns', 'puppy_colors'])
                    ->findOrFail($id)
            ),
            'patterns' => $patterns,
            'breeds' => $breeds,
            'colors' => $colors,
            'defaultLocation' => $defaultLocation,
        ]);
    }

    /**
     * Store a newly created puppy listing.
     */
    public function store(PuppyListingRequest $request)
    {
        try {
            return DB::transaction(function () use ($request) {
                $user = $request->user();

                // Check listing limit
                if ($user->puppies()->count() >= ($user->premium_plan?->plan?->listing_limit ?? 0) &&
                    $user->premium_plan?->plan?->listing_limit != 0) {
                    return error('home', 'You have reached your listing limit');
                }

                $data = $request->validated();

                // Create puppy
                $created_puppy = $user->puppies()->create($this->formatPuppyData($data));

                // Process relationships
                $this->processPuppyRelationships($created_puppy, $data);

                // Process media in background
                $this->dispatchMediaJobs($created_puppy, $data);

                // Clear cache
                Cache::forget("seller_{$user->slug}_puppies_*");

                // Send email notification to user if they have notifications enabled
                if ($user->enable_notification ?? true) {
                    Mail::queue(new NewPuppyListingPosted($user, $created_puppy));
                }

                return success('puppies.show', 'Puppy created successfully', $created_puppy->slug);
            });
        } catch (\Exception $e) {
            Log::error('Error in store method: ' . $e->getMessage());
            return error('home', 'An error occurred while creating the puppy. Please try again.');
        }
    }

    /**
     * Update a puppy listing.
     */
    public function update(PuppyListingRequest $request, int $id)
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

                // Clear cache
                Cache::forget("seller_{$user->slug}_puppies_*");

                return success('puppies.show', 'Puppy updated successfully', $puppy->slug);
            });
        } catch (\Exception $e) {
            Log::error('Error in update method: ' . $e->getMessage());
            return error('home', 'An error occurred while updating the puppy. Please try again.');
        }
    }

    /**
     * Remove the specified puppy listing.
     */
    public function destroy(Request $request, int $id)
    {
        $user = $request->user();
        $puppy = $user->puppies()->findOrFail($id);
        $puppy->delete();

        // Clear relevant cache
        Cache::forget("seller_{$user->slug}_puppies_*");

        return success('profile.edit', 'Puppy deleted successfully');
    }

    protected function formatPuppyData(array $data): array
    {
        $certificateType = $data['certificate_type'] ?? null;
        
        $puppyData = [
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
            'has_certificate' => !empty($certificateType),
            'certificate_type' => $certificateType,
        ];

        // Add location data if provided (check for any location field)
        $hasLocationData = isset($data['location_lat']) || isset($data['location_lng']) || 
                          isset($data['location_address']) || isset($data['location_city']) || 
                          isset($data['location_state']) || isset($data['location_zip_code']);
        
        if ($hasLocationData) {
            $puppyData['lat'] = $data['location_lat'] ?? null;
            $puppyData['lng'] = $data['location_lng'] ?? null;
            $puppyData['address'] = $data['location_address'] ?? null;
            $puppyData['city'] = $data['location_city'] ?? null;
            $puppyData['street'] = $data['location_street'] ?? null;
            $puppyData['state'] = $data['location_state'] ?? null;
            $puppyData['short_state'] = $data['location_short_state'] ?? null;
            $puppyData['zip_code'] = $data['location_zip_code'] ?? null;
            
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
            
            $puppyData['state_id'] = $stateId;
        }

        return $puppyData;
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

        // Process certificate documents
        if (isset($data['certificate_document']) && !empty($data['certificate_document'])) {
            if ($isUpdate) {
                $puppy->clearMediaCollection('certificates');
            }
            
            $filePaths = collect($data['certificate_document'])->map(function ($file) {
                $path = $file->store('temp/uploads', config('media-library.disk_name'));
                return Storage::disk(config('media-library.disk_name'))->url($path);
            })->toArray();

            ProcessPuppyMedia::dispatch($puppy, $filePaths, 'certificates');
            
            // Store the first document URL in the database for quick reference
            if (!empty($filePaths)) {
                $puppy->update(['certificate_document_url' => $filePaths[0]]);
            }
        }
    }
}

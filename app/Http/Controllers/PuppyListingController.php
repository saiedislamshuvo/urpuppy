<?php

namespace App\Http\Controllers;

use App\Data\PuppyEditData;
use App\Http\Requests\PuppyListingRequest;
use App\Jobs\ProcessPuppyMedia;
use App\Models\Puppy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
        $siblings = sibling_options($request, null);

        return Inertia::render('PuppyListing/Create', [
            'patterns' => $patterns,
            'breeds' => $breeds,
            'colors' => $colors,
            'siblings' => $siblings,
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
        $siblings = sibling_options($request, $id);

        return Inertia::render('PuppyListing/Edit', [
            'puppy_edit' => PuppyEditData::from(
                Puppy::with(['media', 'siblings', 'breeds', 'seller', 'puppy_patterns', 'puppy_colors'])
                    ->findOrFail($id)
            ),
            'patterns' => $patterns,
            'breeds' => $breeds,
            'colors' => $colors,
            'siblings' => $siblings,
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
            'has_certificate' => $data['has_certificate'] == 'yes',
            'certificate_type' => $data['certificate_type'] ?? null,
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

<?php

namespace App\Http\Controllers;

use App\Actions\CreatePuppy;
use App\Data\BreedOptionData;
use App\Data\ColorData;
use App\Data\PatternData;
use App\Data\PuppyData;
use App\Data\PuppyEditData;
use App\Data\SiblingData;
use App\Http\Requests\PuppyUpdateRequest;
use App\Http\Requests\SellerRegistrationRequest;
use App\Jobs\GenerateVideoThumbnail;
use App\Jobs\ProcessPuppyMedia;
use App\Models\Breed;
use App\Models\Puppy;
use App\Models\PuppyColor;
use App\Models\PuppyPattern;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class SellerController extends Controller
{
    public function show(Request $request, string $slug)
    {
        $seller = User::where('slug', $slug)->firstOrFail();

        return inertia('Seller/AllPuppies', [
            'seller_name' => $seller?->company_name ?? $seller->full_name,
            'all_puppies' => PuppyData::collect($seller->puppies()->with(['media', 'siblings', 'breeds', 'seller', 'puppy_patterns', 'puppy_colors'])->paginate(12)),
        ]);
    }

    public function destroy(int $id) {

        $puppy = Puppy::findOrFail($id);
        $puppy->delete();

        success('register.seller', 'Puppy deleted successfully');
    }

    public function create(Request $request, $id = null)
    {
        if (!$request->user()?->breeder_plan && $request->user()?->roles?->contains('breeder')) {

            if ($request->user()->breeder_requests()->latest()->first()?->status != 'approved') {
                return error('profile.edit', 'Your request has not been approved yet');
            }

            if (!empty($request->user()->kennel_name)) {
                return error('plans.breeder', 'Please subscribe to a plan');
            }

            return error('breeders.create', 'Register as a breeder to create puppies');
        }

        if (!$request->user()) {
            return error('register.seller', 'You are not logged in');
        }

        if (!$request->user()->email_verified_at) {
            return error('verification.notice', 'Verify first.');
        }

        if (! $request->user()?->roles->contains('seller') && ! $request->user()->roles?->contains('breeder')) {
            return error('home', 'You are not a seller/breeder');
        }

        if (
        !$request->user()?->premium_plan && $request->user()->puppies()->count() == 1  &&
            $request->user()->roles?->contains('seller')
    ) {
            return success('plans.index', 'Subscribe to any plan to activate your listing');
        }

        if (!auth()->user()) {
            return success('register');
            /* return inertia_location(route('register')); */
        }


        return inertia('Seller/Registration', [
            'puppy_count' => $request->user()->puppies()->count(),
            'puppy_edit' => $id ? PuppyEditData::from(Puppy::with(['media', 'siblings', 'breeds', 'seller', 'puppy_patterns', 'puppy_colors'])->findOrFail($id)) : null,
            'patterns' => pattern_options(),
            'breeds' => breed_options(),
            'colors' => color_options(),
            'siblings' => sibling_options($request, $id)
        ]);
    }

    public function store(SellerRegistrationRequest $request)
{
    try {
        return DB::transaction(function () use ($request) {
            $user = $request->user();

            // Check if the user needs to subscribe to a plan
            if (
                !$user->breeder_plan &&
                !$user->premium_plan &&
                $user->puppies()->count() > 1
            ) {
                return success('plans.index', 'Subscribe to any plan to activate your listing');
            }

            $data = $request->validated();

            // Update user profile if not completed
            if (!$user->profile_completed) {
                $user->update([
                    'phone' => $data['phone'],
                    'website' => $data['website'],
                    'social_fb' => $data['social_fb'],
                    'social_ig' => $data['social_ig'],
                    'social_tiktok' => $data['social_tiktok'],
                    'social_x' => $data['social_x'],

                    'gmap_address' => @$data['gmap_payload']['address'],
                    'city' => @$data['gmap_payload']['city'],
                    'street' => @$data['gmap_payload']['street'],
                    'state' => @$data['gmap_payload']['state'],
                    'short_state' => @$data['gmap_payload']['shortState'],
                    'zip_code' => @$data['gmap_payload']['zipCode'],

                    'profile_completed' => true,
                ]);
            }

            // Check listing limit based on the user's plan
            $current_plan = $user->premium_plan?->plan;
            if ($user->puppies()->count() >= $current_plan?->listing_limit && $current_plan?->listing_limit != 0) {
                return error('home', 'You have reached your listing limit');
            }

            // Create the puppy
            $created_puppy = $user->puppies()->create([
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
            ]);

            // Attach relationships
            $created_puppy->puppy_patterns()->attach($data['puppy_patterns']);
            $created_puppy->breeds()->attach($data['puppy_breeds']);
            $created_puppy->puppy_colors()->attach($data['puppy_colors']);

            // Attach siblings if provided
            if (isset($data['puppy_siblings']) && $data['puppy_siblings']) {
                $created_puppy->attachSiblings($data['puppy_siblings']);
            }

            // Process videos
            if (isset($data['videos'])) {
                /* collect($data['videos'])->each(function ($video) use ($created_puppy) { */
                    try {
                        /* $media = $created_puppy->addMedia($video)->toMediaCollection('video'); */
                        ProcessPuppyMedia::dispatch($created_puppy, $data['videos'], 'video');
                        /* GenerateVideoThumbnail::dispatch($media); */
                    } catch (\Exception $e) {
                        Log::error('Error adding media: ' . $e->getMessage());
                        throw $e; // Re-throw the exception to trigger a rollback
                    }
                /* }); */
            }

            // Process images
            /* collect($data['images'])->each(function ($image) use ($created_puppy) { */
            /*     $created_puppy->addMedia($image)->toMediaCollection('puppy_files'); */
            /* }); */

            /* ProcessPuppyMedia::dispatch($created_puppy, $data['images'], 'puppy_files'); */
                    try {
         DB::transaction(function () use ($request, $data, $created_puppy) {
        $created_puppy->clearMediaCollection('puppy_files');

            // Store files temporarily and pass paths to the job
            $filePaths = [];
            if (isset($data['images'])) {
                $filePaths = collect($data['images'])->map(function ($image) {
                    $path = $image->store('temp/uploads', 'public');
                    return storage_path('app/public/' . $path);
                })->toArray();
            }

            if (!empty($filePaths)) {
                ProcessPuppyMedia::dispatch($created_puppy, $filePaths, 'puppy_files');
            }

        });
    } catch (\Exception $e) {
        Log::error('Error in store method: ' . $e->getMessage());
        return error('home', 'An error occurred while creating the puppy. Please try again.');
    }


            inertia()->clearHistory();

            // Final check for plan subscription
            if (
                !$user->breeder_plan &&
                !$user->premium_plan &&
                $user->profile_completed
            ) {
                return success('plans.index', 'Subscribe to any plan to activate your listing');
            }

            // Return success response
            return success('puppies.show', 'Puppy created successfully', $created_puppy->slug);
        });
    } catch (\Exception $e) {
        // Log the error and return an error response
        Log::error('Error in store method: ' . $e->getMessage());
        return error('home', 'An error occurred while creating the puppy. Please try again.');
    }
}


    public function update(PuppyUpdateRequest $request, int $id)
{
    // Start the transaction
    /* DB::beginTransaction(); */

    try {
        return DB::transaction(function () use ($request, $id) {

        $data = $request->validated();
        $user = $request->user();

        // Update the puppy details
        $user->puppies()->where('id', $id)->update([
            'name' => $data['puppy_name'],
            'gender' => $data['puppy_gender'],
            'description' => $data['puppy_about'],
            'birth_date' => $data['puppy_birth_date'],
            'price' => $data['puppy_price'],
            'has_vaccine' => $data['has_vaccine'] == 'yes' ? true : false,
            'has_health_certificate' => $data['has_health_certificate'] == 'yes' ? true : false,
            'has_vet_exam' => $data['has_vet_exam'] == 'yes' ? true : false,
            'has_travel_ready' => $data['has_travel_ready'] == 'yes' ? true : false,
            'has_delivery_included' => $data['has_delivery_included'] == 'yes' ? true : false,
        ]);

        $update_puppy = $user->puppies()->where('id', $id)->firstOrFail();

        // Update puppy patterns
        $update_puppy->puppy_patterns()->detach();
        $patterns_input = $data['puppy_patterns'];
        if (isset(collect($patterns_input)->first()['value'])) {
            $patterns_input = collect($patterns_input)->unique('value')->pluck('value');
        }
        $update_puppy->puppy_patterns()->attach($patterns_input);

        // Update puppy breeds
        $update_puppy->breeds()->detach();
        $breeds_input = $data['puppy_breeds'];
        if (isset(collect($breeds_input)->first()['value'])) {
            $breeds_input = collect($breeds_input)->unique('value')->pluck('value');
        }
        $update_puppy->breeds()->attach($breeds_input);

        // Update puppy colors
        $update_puppy->puppy_colors()->detach();
        $colors_input = $data['puppy_colors'];
        if (isset(collect($colors_input)->first()['value'])) {
            $colors_input = collect($colors_input)->unique('value')->pluck('value');
        }
        $update_puppy->puppy_colors()->attach($colors_input);

        // Update puppy siblings
        if (isset($data['puppy_siblings']) && $data['puppy_siblings']) {
            $siblings_input = $data['puppy_siblings'];
            if (isset(collect($siblings_input)->first()['value'])) {
                $siblings_input = collect($siblings_input)->unique('value')->pluck('value');
            }

            $update_puppy->siblings()->detach();
            $update_puppy->attachSiblings($siblings_input);
        }

        // Update videos
        if (isset($data['videos'])) {
            $update_puppy->clearMediaCollection('video');
            collect($data['videos'])->each(function ($image) use ($update_puppy) {
                try {
                    $media = $update_puppy->addMedia($image)->toMediaCollection('video');
                    GenerateVideoThumbnail::dispatch($media);
                } catch (\Exception $e) {
                    Log::error('Error adding media: ' . $e->getMessage());
                    throw $e; // Re-throw the exception to trigger a rollback
                }
            });
        }

        // Update images
        if (isset($data['images'])) {
            $update_puppy->clearMediaCollection('puppy_files');
            DB::transaction(function () use ($request, $data, $update_puppy) {
        $update_puppy->clearMediaCollection('puppy_files');

            // Store files temporarily and pass paths to the job
            $filePaths = [];
            if (isset($data['images'])) {
                $filePaths = collect($data['images'])->map(function ($image) {
                       $path = $image->store('temp/uploads', 's3');
                        return Storage::disk('s3')->path($path);
                })->toArray();
            }

            if (!empty($filePaths)) {
                ProcessPuppyMedia::dispatch($update_puppy, $filePaths, 'puppy_files');
            }

        });
        }


        inertia()->clearHistory();

        // Commit the transaction
        /* DB::commit(); */

        return success('puppies.show', 'Puppy updated successfully', $update_puppy->slug);

        });

    } catch (\Exception $e) {
        // Rollback the transaction in case of an exception
        /* DB::rollBack(); */
        Log::error('Error in update method: ' . $e->getMessage());

        // Return an error response
        return error('home', 'An error occurred while updating the puppy. Please try again.');
    }
}


}

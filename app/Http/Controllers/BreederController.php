<?php
namespace App\Http\Controllers;
use App\Data\BreederFullData;
use App\Data\BreedOptionData;
use App\Data\PuppyCardData;
use App\Http\Requests\BreederRegistrationRequest;
use App\Jobs\GenerateVideoThumbnail;
use App\Mail\AdminNotifyMail;
use App\Models\Breed;
use App\Models\State;
use App\Models\User;
use App\Services\FavoriteService;
use App\Services\CompareService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Laravel\Octane\Facades\Octane;

class BreederController extends Controller
{
    public function index(Request $request)
    {
        $breed = request()->breed;
        $state = request()->state;
        $filterKey = "breeders_filter_{$breed}_{$state}";

        $useCache = ($breed != 'undefined' && $state != 'undefined');

        $breeders = $useCache
            ? Cache::remember($filterKey, now()->addHours(1), function() use ($breed, $state) {
                return $this->getFilteredBreeders($breed, $state);
              })
            : $this->getFilteredBreeders($breed, $state);


        return inertia()->render('Breeders/Index', [
            'breeders' => BreederFullData::collect($breeders),
            'seo_title' => 'Searched for ' . $breed ?? 'A breed',
            'seo_description' => 'Searching for ' . $breed ?? 'A breed',
        ]);
    }

    private function getFilteredBreeders($breed, $state)
    {
        $query = User::with([
            'breeds',
            'media',
            'state',
            'company_state',
        ]);

        if ($breed && $breed != 'undefined' && $breed != 'All') {
            $query = $query->whereHas('breeds', function ($q) use ($breed) {
                $q->where('name', $breed);
            });
        }

        if ($state && $state != 'undefined' && $state != 'All') {
            $query->where(function ($q) use ($state) {
                $q->whereHas('state', function ($sq) use ($state) {
                    $sq->where('name', $state);
                })
                ->orWhereHas('company_state', function ($sq) use ($state) {
                    $sq->where('name', $state);
                });
            });
        }

        return $query->breeders()->orderBy('first_name')->paginate(12);
    }

    public function create(Request $request)
    {
        if (!$request->user()) {
            return redirect()->to('login')->setStatusCode(301);
        }

        if (! $request->user()->is_breeder) {
            return redirect()->to(route('home'))->with([
                'message.error' => 'You are not a breeder',
            ]);
        }

        $user = $request->user();
        
        // Get user's default location (company location if available, otherwise personal location)
        $defaultLocation = null;
        // Check if user has company location data or personal location
        $hasCompanyLocation = !empty($user->company_address) || !empty($user->company_city);
        $hasPersonalLocation = $user->lat && $user->lng;
        
        if ($user && ($hasCompanyLocation || $hasPersonalLocation)) {
            // Prefer company location, fallback to personal location
            // Note: company_lat/lng may not exist in DB, so we'll use personal lat/lng as fallback
            $lat = ($hasCompanyLocation && property_exists($user, 'company_lat') && $user->company_lat) 
                ? $user->company_lat 
                : ($user->lat ?? null);
            $lng = ($hasCompanyLocation && property_exists($user, 'company_lng') && $user->company_lng) 
                ? $user->company_lng 
                : ($user->lng ?? null);
            $defaultLocation = [
                'lat' => $lat,
                'lng' => $lng,
                'address' => $user->company_address ?? $user->gmap_address ?? $user->address ?? '',
                'city' => $user->company_city ?? $user->city ?? '',
                'street' => $user->company_street ?? $user->street ?? '',
                'state' => $user->company_state ?? $user->state ?? '',
                'shortState' => $user->company_short_state ?? $user->short_state ?? '',
                'zipCode' => $user->company_zip_code ?? $user->zip_code ?? '',
            ];
        }

        $breeds = Cache::remember('breed_options', now()->addDay(), function() {
            return BreedOptionData::collect(Breed::query()->get());
        });

        return inertia('Breeders/Registration', [
            'breeds' => $breeds,
            'defaultLocation' => $defaultLocation,
        ]);
    }

    public function store(BreederRegistrationRequest $request)
    {
        return DB::transaction(function () use ($request) {
            if (! $request->user()->is_breeder) {
                return error('home', 'You are not a breeder');
            }

            $data = $request->validated();
            $user = $request->user();

            $updateData = [
                'kennel_name' => $data['kennel_name'],
                'company_name' => $data['fullname'],
                'company_email_address' => $data['company_email_address'],
                'company_phone' => $data['company_phone'],
                'company_established_on' => $data['established_date'],
                'company_about' => $data['about_company'],
                'has_usda_registration' => $data['has_usda_registration'] == 'yes',
                'breeder_profile_completed' => true,
                'profile_completed' => true,
            ];

            // Check if location fields are provided (new format)
            $hasLocationData = isset($data['location_lat']) || isset($data['location_lng']) || 
                              isset($data['location_address']) || isset($data['location_city']) || 
                              isset($data['location_state']) || isset($data['location_zip_code']);

            if ($hasLocationData) {
                // Use new location fields format
                $updateData['company_lat'] = $data['location_lat'] ?? null;
                $updateData['company_lng'] = $data['location_lng'] ?? null;
                $updateData['company_address'] = $data['location_address'] ?? null;
                $updateData['company_city'] = $data['location_city'] ?? null;
                $updateData['company_street'] = $data['location_street'] ?? null;
                $updateData['company_state'] = $data['location_state'] ?? null;
                $updateData['company_short_state'] = $data['location_short_state'] ?? null;
                $updateData['company_zip_code'] = $data['location_zip_code'] ?? null;

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
                
                $updateData['company_state_id'] = $stateId;
            } elseif (isset($data['gmap_payload']) && is_array($data['gmap_payload'])) {
                // Fallback to old gmap_payload format for backward compatibility
                $updateData['company_address'] = $data['gmap_payload']['address'] ?? null;
                $updateData['company_city'] = $data['gmap_payload']['city'] ?? null;
                $updateData['company_street'] = $data['gmap_payload']['street'] ?? null;
                $updateData['company_state'] = $data['gmap_payload']['state'] ?? null;
                $updateData['company_short_state'] = $data['gmap_payload']['shortState'] ?? null;
                $updateData['company_zip_code'] = $data['gmap_payload']['zipCode'] ?? null;
                $updateData['company_lat'] = $data['gmap_payload']['lat'] ?? null;
                $updateData['company_lng'] = $data['gmap_payload']['lng'] ?? null;
            }

            $user->update($updateData);

            if ($breeds = $data['breeds']) {
                $user->breeds()->detach();
                $breedIds = collect($breeds)->map(function ($breed) {
                    return is_array($breed) ? $breed['value'] : $breed;
                });
                $user->breeds()->attach($breedIds);
            }

            $user->breeder_requests()->create([
                'message' => 'Reviewing your application',
                'status' => 'pending',
            ]);

            $mediaProcessing = [];

            if (isset($data['gallery'])) {
                $mediaProcessing[] = function() use ($user, $data) {
                    $user->clearMediaCollection('gallery');
                    collect($data['gallery'])->each(function ($image) use ($user) {
                        $user->addMedia($image)->toMediaCollection('gallery');
                    });
                };
            }

            if (isset($data['videos'])) {
                $mediaProcessing[] = function() use ($user, $data) {
                    $user->clearMediaCollection('videos');
                    collect($data['videos'])->each(function ($video) use ($user) {
                        try {
                            $media = $user->addMedia($video)->toMediaCollection('videos');
                            GenerateVideoThumbnail::dispatch($media);
                        } catch (\Exception $e) {
                            \Log::error('Error adding media: '.$e->getMessage());
                        }
                    });
                };
            }

            if (!empty($data['company_logo'])) {
                $mediaProcessing[] = function() use ($user, $data) {
                    $user->clearMediaCollection('company_logo');
                    $user->addMedia($data['company_logo'])->toMediaCollection('company_logo');
                };
            }

            if (count($mediaProcessing) > 1) {
                Octane::concurrently($mediaProcessing);
            } elseif (count($mediaProcessing) === 1) {
                $mediaProcessing[0]();
            }

            Mail::queue(new AdminNotifyMail([
                'subject' => 'New Breeder Application',
                'message' => 'You have a new breeder application. Please go to admin page to review',
            ]));

            inertia()->clearHistory();
            return success('home', 'Your application has been submitted for review');
        });
    }

    public function show($slug = null)
    {
        if ($slug == null) {
            return redirect()->back();
        }

        $userId = User::decodeSlug($slug);
        $cacheKey = "breeder_profile_{$userId}";

        $results = Octane::concurrently([
            'breeder' => function() use ($userId, $cacheKey) {
                return Cache::remember($cacheKey, now()->addMinutes(30), function() use ($userId) {
                    return User::with([
                        'breeds:name',
                        'comments' => function ($query) {
                            $query->orderBy('created_at', 'desc');
                        },
                        'comments.reviewer',
                        'comments.reviewer.media',
                        'media',
                    ])->find($userId);
                });
            },
            'puppies' => function() use ($userId) {
                $cacheKey = "breeder_puppies_{$userId}";
                return Cache::remember($cacheKey, now()->addMinutes(10), function() use ($userId) {
                    $user = User::find($userId);
                    return $user ? $user->puppies()
                        ->with(['breeds:id,name,slug', 'seller', 'media', 'favorites'])
                        ->take(4)
                        ->get() : collect();
                });
            }
        ]);

        $breeder = $results['breeder'];
        $puppies = $results['puppies'];

        if ($breeder?->breeder_plan === null) {
            return redirect()->back()->with([
                'message.error' => 'This user is not a breeder',
            ])->setStatusCode(404);
        }

        return inertia('Breeders/Show', [
            'rating_count' => $breeder->comments->count(),
            'rating_average' => $breeder->comments->pluck('rating')->avg(),
            'breeder' => BreederFullData::from($breeder),
            'puppies' => app(CompareService::class)->applyCompares(
                app(FavoriteService::class)->applyFavorites(PuppyCardData::collect($puppies))
            ),
        ]);
    }
}

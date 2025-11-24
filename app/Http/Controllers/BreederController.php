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
            'breed' => $breed,
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
                $q->whereRaw('LOWER(name) = ?', [strtolower($breed)]);
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
        
        $breeds = Cache::remember('breed_options', now()->addDay(), function() {
            return BreedOptionData::collect(Breed::query()->get());
        });

        // Get media data
        $gallery = $user->getMedia('gallery')->sortBy('order_column')->map(function ($media) {
            return $media->getUrl('preview');
        })->values()->toArray();
        
        $videos = $user->getMedia('videos')->map(function ($media) {
            return $media->getUrl();
        })->values()->toArray();
        
        // Get subscription limits
        $plan = $user->is_breeder ? $user->breeder_plan?->plan : $user->premium_plan?->plan;
        $imageLimit = $plan?->image_per_listing ?? 10;
        $videoLimit = $plan?->video_per_listing ?? 3;

        return inertia('Breeders/Registration', [
            'breeds' => $breeds,
            'gallery' => $gallery,
            'videos' => $videos,
            'media_limits' => [
                'images' => $imageLimit,
                'videos' => $videoLimit,
            ],
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

            if(isset($data['gmap_payload']) && is_array($data['gmap_payload'])) {
                $updateData['lat'] = !empty($data['gmap_payload']['lat']) ? $data['gmap_payload']['lat'] : null;
                $updateData['lng'] = !empty($data['gmap_payload']['lng']) ? $data['gmap_payload']['lng'] : null;
                $updateData['company_address'] = !empty($data['gmap_payload']['address']) ? $data['gmap_payload']['address'] : null;
                $updateData['company_city'] = !empty($data['gmap_payload']['city']) ? $data['gmap_payload']['city'] : null;
                $updateData['company_street'] = !empty($data['gmap_payload']['street']) ? $data['gmap_payload']['street'] : null;
                $updateData['company_state'] = !empty($data['gmap_payload']['state']) ? $data['gmap_payload']['state'] : null;
                $updateData['company_short_state'] = !empty($data['gmap_payload']['shortState']) ? $data['gmap_payload']['shortState'] : null;
                $updateData['company_zip_code'] = !empty($data['gmap_payload']['zipCode']) ? $data['gmap_payload']['zipCode'] : null;
                $updateData['gmap_address'] = !empty($data['gmap_payload']['address']) ? $data['gmap_payload']['address'] : null;
            } else {
                // Fallback to old gmap_payload format for backward compatibility
                // Use new location fields format - use lat/lng for coordinates (same as sellers)
                // Convert empty strings to null, but always update if key exists
                $updateData['lat'] = $data['location_lat'] ?? '0';
                $updateData['lng'] = $data['location_lng'] ?? '0';
                $updateData['company_address'] = $data['location_address'] ?? '';
                $updateData['company_city'] = $data['location_city'] ?? '';
                $updateData['company_street'] = $data['location_street'] ?? '';
                $updateData['company_house_no'] = $data['location_house_no'] ?? '';
                $updateData['company_state'] = $data['location_state'] ?? '';
                $updateData['company_short_state'] = $data['location_short_state'] ?? '';
                $updateData['company_zip_code'] = $data['location_zip_code'] ?? '';
                $updateData['gmap_address'] = $data['location_address'] ?? '';
            }

            // Look up state_id based on state name or abbreviation (only if location fields were processed)
            if (!empty($updateData['company_state'])) {
                $stateId = null;
                $stateName = $updateData['company_state'] ?? null;
                $stateAbbreviation = $updateData['company_short_state'] ?? null;
                
                if (!empty($stateName)) {
                    // First try to find by exact state name
                    $state = State::where('name', $stateName)->first();
                    
                    // If not found and short_state is provided, try abbreviation
                    if (!$state && !empty($stateAbbreviation)) {
                        $state = State::where('abbreviation', strtoupper($stateAbbreviation))->first();
                    }
                    
                    // If still not found, try case-insensitive search by name
                    if (!$state) {
                        $state = State::whereRaw('LOWER(name) = ?', [strtolower($stateName)])->first();
                    }
                    
                    if ($state) {
                        $stateId = $state->id;
                    }
                } elseif (!empty($stateAbbreviation)) {
                    // If only abbreviation is provided, try to find by abbreviation
                    $state = State::where('abbreviation', strtoupper($stateAbbreviation))->first();
                    if ($state) {
                        $stateId = $state->id;
                    }
                }

                $updateData['company_state_id'] = $stateId;
                $updateData['state_id'] = $stateId;
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
                    // Separate files and URLs from the submitted data
                    $files = collect($data['gallery'])->filter(fn($item) => $item instanceof \Illuminate\Http\UploadedFile);
                    $submittedUrls = collect($data['gallery'])->filter(fn($item) => is_string($item))->toArray();
                    
                    // Get existing media URLs
                    $existingMedia = $user->getMedia('gallery');
                    $existingUrls = $existingMedia->map(fn($media) => $media->getUrl('preview'))->toArray();
                    
                    // Find URLs that should be deleted (existing but not in submitted)
                    // Normalize URLs for comparison
                    $normalizeUrl = function($url) {
                        $parsed = parse_url($url);
                        $path = $parsed['path'] ?? $url;
                        return trim($path, '/');
                    };
                    
                    $normalizedSubmitted = array_map($normalizeUrl, $submittedUrls);
                    $normalizedExisting = array_map($normalizeUrl, $existingUrls);
                    $urlsToDelete = array_diff($normalizedExisting, $normalizedSubmitted);
                    
                    // Delete media that are no longer in the submitted list
                    foreach ($existingMedia as $media) {
                        $mediaUrl = $normalizeUrl($media->getUrl('preview'));
                        if (in_array($mediaUrl, $urlsToDelete)) {
                            $media->delete();
                        }
                    }
                    
                    // Add new files only (skip URL strings)
                    $files->each(function ($image) use ($user) {
                        $user->addMedia($image)->toMediaCollection('gallery');
                    });
                };
            }

            if (isset($data['videos'])) {
                $mediaProcessing[] = function() use ($user, $data) {
                    // Separate files and URLs from the submitted data
                    $files = collect($data['videos'])->filter(fn($item) => $item instanceof \Illuminate\Http\UploadedFile);
                    $submittedUrls = collect($data['videos'])->filter(fn($item) => is_string($item))->toArray();
                    
                    // Get existing media URLs
                    $existingMedia = $user->getMedia('videos');
                    $existingUrls = $existingMedia->map(fn($media) => $media->getUrl())->toArray();
                    
                    // Find URLs that should be deleted (existing but not in submitted)
                    $urlsToDelete = array_diff($existingUrls, $submittedUrls);
                    
                    // Delete media that are no longer in the submitted list
                    foreach ($urlsToDelete as $urlToDelete) {
                        $media = $existingMedia->first(function ($media) use ($urlToDelete) {
                            return $media->getUrl() === $urlToDelete;
                        });
                        if ($media) {
                            $media->delete();
                        }
                    }
                    
                    // Add new files only (skip URL strings)
                    $files->each(function ($video) use ($user) {
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

            // Mail::queue(new AdminNotifyMail([
            //     'subject' => 'New Breeder Application',
            //     'message' => 'You have a new breeder application. Please go to admin page to review',
            // ]));

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

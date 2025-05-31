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
        if (! $request->user()) {
            return redirect()->to(route('register.breeder'));
        }

        if (! $request->user()->email_verified_at) {
            return error('verification.notice', 'Verify first.');
        }

        if (! $request->user()->roles->contains('breeder')) {
            return redirect()->to(route('home'))->with([
                'message.error' => 'You are not a breeder',
            ]);
        }

        $breeds = Cache::remember('breed_options', now()->addDay(), function() {
            return BreedOptionData::collect(Breed::query()->get());
        });

        return inertia('Breeders/Registration', [
            'breeds' => $breeds,
        ]);
    }

    public function store(BreederRegistrationRequest $request)
    {
        return DB::transaction(function () use ($request) {
            if (! $request->user()->roles->contains('breeder')) {
                return error('home', 'You are not a breeder');
            }

            $data = $request->validated();
            $user = $request->user();

            $user->update([
                'kennel_name' => $data['kennel_name'],
                'company_name' => $data['fullname'],
                'company_email_address' => $data['company_email_address'],
                'company_phone' => $data['company_phone'],
                'company_established_on' => $data['established_date'],
                'company_about' => $data['about_company'],
                'has_usda_registration' => $data['has_usda_registration'] == 'yes',
                'breeder_profile_completed' => true,
                'company_address' => @$data['gmap_payload']['address'],
                'company_city' => @$data['gmap_payload']['city'],
                'company_street' => @$data['gmap_payload']['street'],
                'company_state' => @$data['gmap_payload']['state'],
                'company_short_state' => @$data['gmap_payload']['shortState'],
                'company_zip_code' => @$data['gmap_payload']['zipCode'],
            ]);

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
            ], 301);
        }

        return inertia('Breeders/Show', [
            'rating_count' => $breeder->comments->count(),
            'rating_average' => $breeder->comments->pluck('rating')->avg(),
            'breeder' => BreederFullData::from($breeder),
            'puppies' => app(FavoriteService::class)->applyFavorites(PuppyCardData::collect($puppies)),
        ]);
    }
}

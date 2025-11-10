<?php

namespace App\Http\Controllers;

use App\Data\BreedData;
use App\Data\BreederFullData;
use App\Data\PostData;
use App\Data\PuppyCardData;
use App\Data\PuppyData;
use App\Models\Breed;
use App\Models\Post;
use App\Models\Puppy;
use App\Models\State;
use App\Models\User;
use App\Services\FavoriteService;
use App\Services\CompareService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Laravel\Octane\Facades\Octane;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        // Generate cache keys with user context
        $userId = auth()->id() ?? 'guest';
        $cacheKeys = [
            'top_picks' => "top_picks_{$userId}",
            'spotlights' => "spotlights_{$userId}",
            'new_arrivals' => "new_arrivals_{$userId}",
            'featured_breeds' => 'featured_breeds' // Shared across users
        ];

        // Fetch all data concurrently using Octane
        $results = Octane::concurrently([
            'top_picks' => function() use ($cacheKeys) {
                return Cache::remember($cacheKeys['top_picks'], now()->addHours(2), function() {
                    return Puppy::with('breeds', 'seller')
                        ->hasSubscribedUsers()
                        ->inRandomOrder()
                        ->first();
                });
            },
            'spotlights' => function() use ($cacheKeys) {
                return Cache::remember($cacheKeys['spotlights'], now()->addHours(2), function() {
                    return Puppy::with('breeds', 'seller')
                        ->hasSubscribedUsers()
                        ->inRandomOrder()
                        ->take(4)
                        ->get();
                });
            },
            'new_arrivals' => function() use ($cacheKeys) {
                return Cache::remember($cacheKeys['new_arrivals'], now()->addHours(2), function() {
                    return Puppy::with('breeds:name,slug', 'seller')
                        ->hasSubscribedUsers()
                        ->newArrivals()
                        ->orderByDesc('id')
                        ->take(4)
                        ->get();
                });
            },
            'featured_breeds' => function() use ($cacheKeys) {
                return Cache::remember($cacheKeys['featured_breeds'], now()->addDay(), function() {
                    $breeds = Breed::with('media')
                        ->inRandomOrder()
                        ->take(8)
                        ->get();
                    
                    return $breeds->map(function ($breed) {
                        // Create BreedData with random_breeder_slug
                        return BreedData::from([
                            'name' => $breed->name,
                            'slug' => $breed->slug,
                            'image' => $breed->image,
                        ]);
                    });
                });
            },
            'posts' => function() {
                return Post::with(['category', 'author'])
                    ->orderBy('created_at', 'desc')
                    ->take(4)
                    ->get();
            },
            'trusted_breeders' => function() {
                return User::with(['breeds' => fn($q) => $q->select('name')])
                    ->breeders()
                    ->take(4)
                    ->inRandomOrder()
                    ->get();
            }
        ]);

        $topPick = $results['top_picks']
            ? app(CompareService::class)->applyCompareToSingle(
                app(FavoriteService::class)->applyFavoriteToSingle(PuppyData::from($results['top_picks']))
            )
            : null;

        $spotlights = app(CompareService::class)->applyCompares(
            app(FavoriteService::class)->applyFavorites(PuppyCardData::collect($results['spotlights']))
        );

        $newArrivals = app(CompareService::class)->applyCompares(
            app(FavoriteService::class)->applyFavorites(PuppyCardData::collect($results['new_arrivals']))
        );

        // return $newArrivals;

        return Inertia::render('Home/Index', [
            'breed_filter_list' => inertia()->optional(fn() =>
                Breed::select(['name'])
                    ->distinct()
                    ->orderBy('name')
                    ->pluck('name')
            ),
            'state_filter_list' => inertia()->optional(fn() =>
                State::select(['name'])
                    ->distinct()
                    ->orderBy('name')
                    ->pluck('name')
            ),
            'top_pick_puppy' => $topPick,
            'puppy_spotlights' => $spotlights,
            'videos' => get_videos(),
            'trusted_breeders' => BreederFullData::collect($results['trusted_breeders']),
            'price_filter_range' => [@$request->query('filter')['price'][0] ?? 1,  @$request->query('filter')['price'][1] ?? 50000],
            'new_arrivals' => $newArrivals,
            'featured_breeds' => BreedData::collect($results['featured_breeds']),
            'post_data' => PostData::collect($results['posts']),
        ]);
    }
}

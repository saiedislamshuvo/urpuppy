<?php

namespace App\Http\Controllers;

use App\Data\BreedData;
use App\Data\BreederFullData;
use App\Data\PostData;
use App\Data\PuppyData;
use App\Models\Breed;
use App\Models\Post;
use App\Models\Puppy;
use App\Models\State;
use App\Models\User;
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
                    return Breed::with('media')
                        ->inRandomOrder()
                        ->take(8)
                        ->get();
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

        // Process favorites if user is authenticated
        $favoritesMap = [];
        if (auth()->check()) {
            // Collect all puppy IDs from spotlights and new arrivals
            $puppyIds = $results['spotlights']->pluck('id')
                ->merge($results['new_arrivals']->pluck('id'));

            // Add top pick ID if exists
            if ($results['top_picks']) {
                $puppyIds->push($results['top_picks']->id);
            }

            $favoritesMap = auth()->user()
                ->favorites()
                ->whereIn('favoriteable_id', $puppyIds)
                ->pluck('favoriteable_id')
                ->flip()
                ->toArray();
        }

        // Transform data with favorites information
        $topPick = $results['top_picks']
            ? PuppyData::from($results['top_picks'])->setIsFavorite(isset($favoritesMap[$results['top_picks']->id]))
            : null;

        $spotlights = PuppyData::collect($results['spotlights'])
            ->each(function ($puppy) use ($favoritesMap) {
                $puppy->setIsFavorite(isset($favoritesMap[$puppy->id]));
            });

        $newArrivals = PuppyData::collect($results['new_arrivals'])
            ->each(function ($puppy) use ($favoritesMap) {
                $puppy->setIsFavorite(isset($favoritesMap[$puppy->id]));
            });

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
            'new_arrivals' => $newArrivals,
            'featured_breeds' => BreedData::collect($results['featured_breeds']),
            'post_data' => PostData::collect($results['posts']),
        ]);
    }
}

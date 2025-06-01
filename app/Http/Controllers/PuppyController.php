<?php
namespace App\Http\Controllers;
use App\Data\PuppyCardData;
use App\Data\PuppyData;
use App\Data\PuppySiblingData;
use App\Http\Resources\FeaturedBreedResource;
use App\Models\Breed;
use App\Models\Puppy;
use App\Services\FavoriteService;
use App\Services\PuppyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Laravel\Octane\Facades\Octane;

class PuppyController extends Controller
{
    public function index(Request $request, PuppyService $puppyService)
    {
        $filters = $request->all();

        $puppies = $puppyService->getPuppies($request, paginate: true);
        $puppiesData = app(FavoriteService::class)->applyFavorites(PuppyData::collect($puppies));

        return inertia()->render('Puppy/Index', [
            'price_filter_range' => [@$request->query('filter')['price'][0] ?? 1,  @$request->query('filter')['price'][1] ?? 50000],
            'puppies' => $puppiesData,
            'has_search' => count($filters),
            'payload' => $filters,
        ]);
    }

    public function show(Request $request, string $slug)
    {
        try {
            $puppy = Puppy::with([
                'media',
                'breeds',
                'seller',
                'puppy_colors',
                'puppy_traits',
                'siblings',
                'puppy_patterns',
                'comments' => function ($query) {
                    $query->orderByDesc('created_at');
                },
                'comments.breeder',
            ])->hasSubscribedUsers()->where('slug', $slug)->firstOrFail();

            defer(function () use ($puppy) {
                $puppy->logView();
            });

            $results = Octane::concurrently([
                'featuredPuppies' => function() {
                    return Cache::remember('featured_puppies', 1800, function () {
                        return Puppy::with('breeds', 'media', 'seller')
                            ->inRandomOrder()
                            ->limit(5)
                            ->get();
                    });
                },
                'featured_breeds' => function() {
                    return FeaturedBreedResource::collection(
                        Breed::withCount('puppies')
                        ->orderByDesc('puppies_count')
                        ->take(10)
                        ->get()
                    );
                },
                'siblings' => function() use ($puppy) {
                    return PuppySiblingData::collect(
                        $puppy->siblings()->with('media')->get()
                    );
                },
                'related_puppies' => function() use ($puppy) {
    $cacheKey = "puppy_{$puppy->id}_related_puppies";
    $cacheDuration = 1800;

    return Cache::remember($cacheKey, $cacheDuration, function() use ($puppy) {
        $query = Puppy::with('breeds', 'media', 'seller')
            ->hasSubscribedUsers()
            ->where('id', '!=', $puppy->id)
            ->inRandomOrder()
            ->limit(4);

        if ($puppy->breeds && $puppy->breeds->count() > 0) {
            $query->whereHas('breeds', function ($q) use ($puppy) {
                $q->whereIn('breeds.id', $puppy->breeds->pluck('id'));
            });
        }

        return PuppyCardData::collect($query->get());
    });
}

            ]);

            return inertia()->render('Puppy/Show', [
                'featured_puppies' => $results['featuredPuppies'],
                'siblings' => $results['siblings'],
                'featured_breeds' => $results['featured_breeds'],
                'related_puppies' => app(FavoriteService::class)->applyFavorites($results['related_puppies']),
                'puppy' => PuppyData::from($puppy),
            ]);

        } catch (\Exception $e) {
            return redirect()->route('home')->with([
                'message.error' => 'This puppy is not available',
            ])->setStatusCode(404);
        }
    }
}

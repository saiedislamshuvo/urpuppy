<?php

namespace App\Http\Controllers;

use App\Data\BreedData;
use App\Data\PuppyCardData;
use App\Data\PuppyData;
use App\Data\PuppySiblingData;
use App\Data\StateData;
use App\Filter\FilterAge;
use App\Filter\FilterBreeds;
use App\Filter\FilterPrice;
use App\Filter\FilterGender;
use App\Filter\FilterState;
use App\Http\Resources\FeaturedBreedResource;
use App\Models\Breed;
use App\Models\Puppy;
use App\Models\SavedSearch;
use App\Models\State;
use App\Services\PuppyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class PuppyController extends Controller
{


public function index(Request $request, PuppyService $puppyService)
{
    $filters = $request->all();
    $userId = auth()->id(); // Get the user ID safely

    $puppies = $puppyService->getPuppies($request, paginate: true);
    /* $states = $puppyService->getStates(); */

    return inertia()->render('Puppy/Index', [
        'puppies' => PuppyData::collect($puppies),
        /* 'states' => $states, */
        'has_search' => count($filters),
        'payload' => $filters,
    ]);
}

    public function show(Request $request, string $slug)
    {

        /* dd($slug); */
        // Fetch the primary puppy data
        try {

        $puppy = Puppy::with([
            'media',
            'breeds',
            /* 'attributes', */
            'seller',
            /* 'breeder.attributes', */
            'puppy_colors',
            'puppy_traits',
            'siblings',
            'puppy_patterns',
            'comments' => function ($query) {
                $query->orderByDesc('created_at');
            },
            'comments.breeder',
        ])->hasSubscribedUsers()->where('slug', $slug)->firstOrFail();

/*         if (! $puppy->seller->is_seller ) { */
/*             return redirect()->route('home')->with([ */
/*                 'message.error' => 'This puppy is not available', */
/*             ]); */
/*         } */


        /* if ($puppy) */

        if ( auth()->user()) {
            $user_favorites = auth()->user()->favorites()->pluck('favoriteable_id');

        if (in_array($puppy->id, $user_favorites->toArray())){
            $puppy->is_favorite = true;
        }
        }




        // Log view on deferred execution
        defer(function () use ($puppy) {
            $puppy->logView();
        });

        // Cache the featured puppies for 30 minutes (1800 seconds)
        $featuredPuppies = Cache::remember('featured_puppies', 1800, function () {
            return Puppy::with('breeds', 'media', 'seller')
                ->inRandomOrder()
                ->limit(5)
                ->get();
        });

        $featured_breeds = FeaturedBreedResource::collection(Breed::withCount('puppies')->orderByDesc('puppies_count')->take(10)->get());

        $related_puppies = [];

        if ($puppy->breeds) {
            $related_puppies = Puppy::with('breeds', 'media', 'seller')
                ->whereHas('breeds', function ($query) use ($puppy) {
                    $query->whereIn('breeds.id', $puppy->breeds->pluck('id'));
                })
                ->where('id', '!=', $puppy->id)
                ->inRandomOrder()
                ->limit(4)
                ->get();
        }

/*             $siblings = Puppy::with('breeds', 'media', 'breeder') */
/*                 ->where('id', '!=', $puppy->id) */
/*                 ->inRandomOrder() */
/*                 ->limit(4) */
/*                 ->get(); */


        return inertia()->render('Puppy/Show', [
            'featured_puppies' => $featuredPuppies,
            'siblings'  => PuppySiblingData::collect($puppy->siblings()->with('media')->get()),
            'featured_breeds' => $featured_breeds,
            'related_puppies' => PuppyCardData::collect(Puppy::with('breeds', 'media', 'seller')->hasSubscribedUsers()->where('id', '!=', $puppy->id)->inRandomOrder()->limit(4)->get()),
            'puppy' => PuppyData::from($puppy),
        ]);

        } catch (\Exception $e) {
            /* dd($e->getMessage()); */
            return redirect()->route('home')->with([
                'message.error' => 'This puppy is not available',
            ]);
        }

        /* ->title($puppy->name.' - Urpuppy') */
        /* ->ogLocale('en_US') */
        /* ->description($puppy?->description ?? '') */
        /* ->ogTitle($puppy->name.' - Urpuppy') */
        /* ->ogDescription($puppy?->description ?? '') */
        /* ->ogType('website') */
        /* ->ogImage($puppy->image) */
        /* ->ogUrl(route('puppies.show', $puppy->slug)) */
        /* ->twitterCard('summary_large_image') */
        /* ->twitterTitle($puppy->name.' - Urpuppy') */
        /* ->twitterSite('@urpuppy') */
        /* ->twitterImage($puppy->image) */
        /* ->twitterDescription($puppy?->description ?? ''); */
    }
}

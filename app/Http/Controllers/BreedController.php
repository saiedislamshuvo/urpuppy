<?php

namespace App\Http\Controllers;

use App\Data\BreedData;
use App\Data\BreedFullData;
use App\Filter\FilterByInitialLetter;
use App\Http\Resources\BreedResource;
use App\Models\Breed;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class BreedController extends Controller
{
    public function index()
    {
        $breeds = QueryBuilder::for(Breed::class)->select([
            'id', 'name', 'slug',
        ])
            ->when(request()->input('filter.name') == null, function ($query, $letter) {
                $query->where('name', 'like', 'A%');

            })
            ->allowedFilters([
                AllowedFilter::custom('name', new FilterByInitialLetter),
            ])
            ->latest()->get();

        /*         $breeds = Cache::remember('breeds_cache', Carbon::now()->addHours(12), function () { */

        /*             return BreedResource::collection( */

        /*                 Breed::select(['id', 'name', 'slug']) */
        /*                     ->orderBy('name') */
        /*                     ->get() */
        /*             ); */
        /*         }); */
        /* dd(request()->input('letter')); */

        return inertia()->render('Breed/Index', [
            'breeds' => BreedData::collect($breeds),
            'breed_filter_list' => inertia()->optional(fn () => Breed::select(['name'])->distinct()->orderBy('name')->pluck('name')
            ),
            'letter_param' => request()->input('filter.name') ?? 'A',
        ]);
        /* ->title('Breeds') */
        /* ->description('Find your perfect puppy! Discover diverse dog breeds, connect with trusted breeders, and register as a buyer or breeder to make pet ownership easy and secure.') */
        /* ->image(asset('logo.png')) */
        /* ->ogTitle('Breeds') */
        /* ->ogDescription('Find your perfect puppy! Discover diverse dog breeds, connect with trusted breeders, and register as a buyer or breeder to make pet ownership easy and secure.') */
        /* ->ogImage(asset('logo.png')) */
        /* ->ogUrl(route('breeds.index')) */
        /* ->twitterTitle('Breeds') */
        /* ->twitterSite('@urpuppy') */
        /* ->twitterImage(asset('logo.png')) */
        /* ->twitterDescription('Find your perfect puppy! Discover diverse dog breeds, connect with trusted breeders, and register as a buyer or breeder to make pet ownership easy and secure.'); */
    }

    public function show(string $name_or_slug)
    {
        /* dd($slug); */
        // Cache individual breed by slug for 12 hours using Carbon
        /* $breed = Cache::remember("breed_cache_{$slug}", Carbon::now()->addHours(12), function () use ($slug) { */
        /*     return Breed::query()->where('slug', $slug)->firstOrFail(); */
        /* }); */
        $breed = Breed::query()->where('slug', $name_or_slug)->orWhere('name', $name_or_slug)->firstOrFail();

        return inertia()->render('Breed/Show', [
            'breed' => BreedFullData::from($breed),
        ]);
        /* ->title($breed->name) */
        /* ->description($breed->description ?? "Find your perfect puppy! Discover diverse dog breeds, connect with trusted breeders, and register as a buyer or breeder to make pet ownership easy and secure." ) */
        /* ->image($breed->thumbnail ?? asset('logo.png')) */
        /* ->ogTitle($breed->name) */
        /* ->ogDescription($breed->description ?? "Find your perfect puppy! Discover diverse dog breeds, connect with trusted breeders, and register as a buyer or breeder to make pet ownership easy and secure." ) */
        /* ->ogImage($breed->thumbnail ?? asset('logo.png')) */
        /* ->ogUrl(route('breed.show', $breed->slug)) */
        /* ->twitterTitle($breed->name) */
        /* ->twitterSite('@urpuppy') */
        /* ->twitterImage($breed->thumbnail ?? asset('logo.png')) */
        /* ->twitterDescription($breed->description ?? "Find your perfect puppy! Discover diverse dog breeds, connect with trusted breeders, and register as a buyer or breeder to make pet ownership easy and secure." ); */

    }
}

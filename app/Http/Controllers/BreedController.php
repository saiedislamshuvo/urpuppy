<?php
namespace App\Http\Controllers;
use App\Data\BreedData;
use App\Data\BreedFullData;
use App\Filter\FilterByInitialLetter;
use App\Http\Resources\BreedResource;
use App\Models\Breed;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Laravel\Octane\Facades\Octane;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class BreedController extends Controller
{
    public function index()
    {
        $letter = request()->input('filter.name') ?? 'A';
        $cacheKey = "breeds_by_letter_{$letter}";

        $results = Octane::concurrently([
            'breeds' => function() use ($letter, $cacheKey) {
                return Cache::remember($cacheKey, now()->addHours(24), function() use ($letter) {
                    return QueryBuilder::for(Breed::class)->select([
                        'id', 'name', 'slug',
                    ])
                        ->allowedFilters([
                            AllowedFilter::custom('name', new FilterByInitialLetter),
                        ])
                        ->orderBy('name')->get();
                });
            },
            'breed_filter_list' => function() {
                return Cache::remember('breed_name_list', now()->addDays(7), function() {
                    return Breed::select(['name'])->distinct()->orderBy('name')->pluck('name');
                });
            }
        ]);

        return inertia()->render('Breed/Index', [
            'breeds' => BreedData::collect($results['breeds']),
            'breed_filter_list' => inertia()->optional(fn () => $results['breed_filter_list']),
            'letter_param' => $letter,
        ]);
    }

    public function show(string $name_or_slug)
    {
        $cacheKey = "breed_detail_{$name_or_slug}";

        $breed = Cache::remember($cacheKey, now()->addHours(6), function() use ($name_or_slug) {
            return Breed::query()
                ->where('slug', $name_or_slug)
                ->orWhere('name', $name_or_slug)
                ->firstOrFail();
        });

        return inertia()->render('Breed/Show', [
            'breed' => BreedFullData::from($breed),
        ]);
    }
}

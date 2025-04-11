<?php

namespace App\Services;

use App\Filter\FilterAge;
use App\Filter\FilterBreeds;
use App\Filter\FilterGender;
use App\Filter\FilterPrice;
use App\Filter\FilterState;
use App\Models\Puppy;
use App\Models\State;
use Illuminate\Database\Eloquent\Collection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class PuppyService
{
    public function getPuppies($filters = [], $paginate = true)
    {
        $puppiesQuery = QueryBuilder::for(Puppy::class)
            ->select([
                'id', 'user_id', 'name', 'price', 'birth_date', 'slug',
                'gender', 'created_at',
                'view_count', 'is_featured', 'description',
            ])
            ->with([
                'breeds:id,name,slug',
                'seller:id,first_name,email,phone,last_name,short_state,city,created_at,slug,is_breeder',
                'favorites',
                'media',
            ])
            ->allowedFilters([
                AllowedFilter::custom('breed', new FilterBreeds),
                AllowedFilter::custom('age', new FilterAge),
                AllowedFilter::custom('state', new FilterState),
                AllowedFilter::custom('price', new FilterPrice),
                AllowedFilter::custom('gender', new FilterGender),
            ])
            ->hasSubscribedUsers();

        // Apply additional filters if provided
        /* if (!empty($filters)) { */
        /*     $puppiesQuery->allowedFilters($filters); */
        /* } */

        // Handle pagination
        /* if ($paginate) { */
        $puppies = $puppiesQuery->paginate(12);
        /* } else { */
        /*     $puppies = $puppiesQuery->get(); */
        /* } */

        return $puppies;
    }

    public function getStates(): Collection
    {
        return State::select(['id', 'name'])
            ->whereHas('country', fn ($query) => $query->where('country_code', 'US'))
            ->orderBy('name')
            ->get()
            ->map(fn ($state) => tap($state, fn ($s) => $s->name = ucwords($s->name)));
    }

    public function getPuppiesCli($filters)
    {

        $puppies = Puppy::select([
            'id', 'user_id', 'name', 'price', 'birth_date', 'slug',
            'gender', 'created_at',
            'view_count', 'is_featured', 'description',
        ])
            ->with([
                'breeds:id,name,slug',
                'seller:id,first_name,email,phone,last_name,state_id,city,created_at,slug,is_breeder',
                'favorites',
                'media',
                'seller.state:id,name,abbreviation',
            ])->hasSubscribedUsers();

        if (! empty($filters)) {

            if (@$filters['breed'] != 'All' && $filters['breed'] != 0) {
                $puppies->whereHas('breeds', fn ($query) => $query->where('name', $filters['breed']));
            }

            if (@$filters['state'] != 'All' && $filters['state'] != 0) {
                $puppies->whereHas('seller', fn ($query) => $query->whereHas('state', fn ($q) => $q->where('name', $filters['state'])));
            }

            if (@$filters['gender'] != 'All' && $filters['gender'] != 0) {
                $puppies->where('gender', $filters['gender']);
            }

            if (@$filters['price'] != 'All' && $filters['price'] != 0) {
                $prices = collect($filters['price'])->map(function ($value) {
                    return (int) $value;
                })->toArray();
                $puppies->whereBetween('price', $prices);
            }

            if (@$filters['age'] != 'All' && $filters['age'] != 0) {
                $back = now()->subWeeks($filters['age'] === '0' ? 100000 : $filters['age']);
                $puppies->whereBetween('birth_date', [$back,  now()]);
            }

        }

        return $puppies;

        /* dd($puppies->count()); */

    }
}

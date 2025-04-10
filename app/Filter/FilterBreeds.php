<?php

namespace App\Filter;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class FilterBreeds implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        if ($value == '0' || $value == 'All') {
        } else {

            $query->whereHas('breeds', function (Builder $query) use ($value) {
                $query->where('name', 'LIKE', "%{$value}%");
            });
        }
    }
}

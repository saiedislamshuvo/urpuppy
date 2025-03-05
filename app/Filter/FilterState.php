<?php

namespace App\Filter;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class FilterState implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        if ($value == "0" || $value == "All") {

        } else {

        $query->whereHas('seller', function ($query) use ($value) {
                $query->where('state', $value);
        });
        }


    }
}

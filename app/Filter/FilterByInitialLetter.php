<?php

namespace App\Filter;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class FilterByInitialLetter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        if ($value != 'All') {
            $query->where('name', 'like', "{$value}%");
        }
    }
}

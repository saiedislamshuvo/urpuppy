<?php

namespace App\Filter;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class FilterPrice implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $value = array_map('intval', $value);  // Use 'intval' for integers if needed
        $query->whereBetween('price', $value);
    }
}

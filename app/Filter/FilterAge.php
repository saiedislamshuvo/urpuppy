<?php

namespace App\Filter;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class FilterAge implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        // Handle array range [min_months, max_months]
        if (is_array($value) && count($value) === 2) {
            $minMonths = (int) $value[0];
            $maxMonths = (int) $value[1];
            
            // Calculate birth date range
            // A puppy that is maxMonths old was born maxMonths ago (oldest puppies we want)
            $backMin = now()->subMonths($maxMonths >= 18 ? 1000 : $maxMonths);
            
            // A puppy that is minMonths old was born minMonths ago (youngest puppies we want)
            $backMax = now()->subMonths($minMonths);
            
            $query->whereBetween('birth_date', [$backMin, $backMax]);
        } 
        // Handle legacy single value (weeks)
        else if ($value != '0' && $value != 'All' && !is_array($value)) {
            $back = now()->subWeeks($value === '0' ? 100000 : $value);
            $query->whereBetween('birth_date', [$back, now()]);
        }
    }
}

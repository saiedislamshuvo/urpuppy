<?php

namespace App\Filter;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class FilterGender implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        if ($value == '0' || $value == 'All') {

        } else {
            $query->where('gender', $value);
        }

        /* $value = [$value[0] . '00',   $value[1] . '00']; */
        /* dd($value); */
        /* $value = array_map('intval', $value);  // Use 'intval' for integers if needed */
        /* $value = collect($value)->map(fn ($price) => $price . '00')->toArray(); */
    }
}

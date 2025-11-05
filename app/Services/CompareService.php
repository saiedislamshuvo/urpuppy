<?php
namespace App\Services;

use App\Data\PuppyCardData;
use App\Data\PuppyData;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class CompareService
{
    public function applyCompares($puppies)
    {
        if (!auth()->check()) {
            return $puppies;
        }

        if ($puppies instanceof LengthAwarePaginator) {
            $items = collect($puppies->items());
            $puppyIds = $items->pluck('id');
        } else {
            $puppyIds = $puppies->pluck('id');
        }

        $comparesMap = auth()->user()
            ->compares()
            ->where('compareable_type', 'App\Models\Puppy')
            ->whereIn('compareable_id', $puppyIds)
            ->pluck('compareable_id')
            ->flip()
            ->toArray();

        if ($puppies instanceof LengthAwarePaginator) {
            foreach ($puppies->items() as $puppy) {
                $puppy->setIsCompared(isset($comparesMap[$puppy->id]));
            }
        } else {
            $puppies->each(function ($puppy) use ($comparesMap) {
                $puppy->setIsCompared(isset($comparesMap[$puppy->id]));
            });
        }

        return $puppies;
    }

    public function applyCompareToSingle($puppy)
    {
        if (!auth()->check()) {
            return $puppy;
        }

        $isCompared = auth()->user()
            ->compares()
            ->where('compareable_type', 'App\Models\Puppy')
            ->where('compareable_id', $puppy->id)
            ->exists();

        $puppy->setIsCompared($isCompared);

        return $puppy;
    }
}


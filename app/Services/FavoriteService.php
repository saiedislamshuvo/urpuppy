<?php
namespace App\Services;

use App\Data\PuppyCardData;
use App\Data\PuppyData;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class FavoriteService
{
    public function applyFavorites($puppies)
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

        $favoritesMap = auth()->user()
            ->favorites()
            ->whereIn('favoriteable_id', $puppyIds)
            ->pluck('favoriteable_id')
            ->flip()
            ->toArray();

        if ($puppies instanceof LengthAwarePaginator) {
            foreach ($puppies->items() as $puppy) {
                $puppy->setIsFavorite(isset($favoritesMap[$puppy->id]));
            }
        } else {
            $puppies->each(function ($puppy) use ($favoritesMap) {
                $puppy->setIsFavorite(isset($favoritesMap[$puppy->id]));
            });
        }

        return $puppies;
    }

        public function applyFavoriteToSingle($puppy)
    {
        if (!auth()->check()) {
            return $puppy;
        }

        $isFavorite = auth()->user()
            ->favorites()
            ->where('favoriteable_id', $puppy->id)
            ->exists();

        $puppy->setIsFavorite($isFavorite);

        return $puppy;
    }
}

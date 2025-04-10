<?php

namespace App\Http\Controllers;

use App\Models\Puppy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class FavoriteController extends Controller
{
    public function __invoke(Request $request, Puppy $puppy)
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->to(route('login'))->with('message.error', 'You must be logged in to add to favorites');
        }

        if (! $user?->email_verified_at) {
            return redirect()->to(route('verification.notice'))->with('message.error', 'Please verify your email first');
        }

        if ($puppy->user_id === $user->id) {
            return redirect()->back()->with('message.error', 'You cannot favorite your own puppy');
        }

        $message = 'Added to favorites';
        if ($user->hasFavorited($puppy)) {
            $message = 'Removed from favorites';
        }

        $user->toggleFavorite($puppy);

        /* Cache::flush(); */

        /* $this->clearPuppiesCache(); */
        /* $user = $user->attachFavoriteStatus($puppy); */
        /* $user->save(); */

        /* $cacheKeys = Cache::getRedis()->keys('*'); */
        return redirect()->back()->with('message.success', $message);

        /* dd($check); */
        /* $post = $user->attachFavoriteStatus($post); */

        /* return inertia()->render('Home', [ */
        /*     'message.success' => 'kantut kita' */
        /* ]); */

        /* return $request->user()->favorites()->toggle($request->puppy_id); */
    }

    public function index(Request $request)
    {
        $favorites = $request->user()->getFavoriteItems(Puppy::class)->with('breeds', 'seller')->paginate(12);

        if (auth()->user()) {
            $user_favorites = auth()->user()->favorites()->pluck('favoriteable_id');
        }

        $favorites->getCollection()->transform(function ($puppy) use ($user_favorites) {
            if (isset($user_favorites) && $user_favorites->contains($puppy->id)) {
                $puppy->is_favorite = true;
            }

            return $puppy;
        });

        return inertia()->render('Favorite/Index', [
            'favorite_puppies' => $favorites,
        ]);
        /* ->title('Your favorites'); */
    }

    protected function clearPuppiesCache()
    {
        $cacheKeys = Cache::getRedis()->keys('*');

        /* cache()->forget('*'); */

        foreach ($cacheKeys as $key) {
            if (str_contains($key, 'puppies')) {
                Cache::forget($key);
            }
        }

        $remainingKeys = array_filter($cacheKeys, fn ($key) => ! str_starts_with($key, 'puppies'));
        Cache::put('all_cache_keys', $remainingKeys);
    }
}

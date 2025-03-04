<?php

namespace App\Http\Controllers;

use App\Data\BreedData;
use App\Data\BreederFullData;
use App\Data\PostData;
use App\Data\PuppyData;
use App\Http\Resources\BreedResource;
use App\Models\Breed;
use App\Models\City;
use App\Models\Post;
use App\Models\Puppy;
use App\Models\State;
use App\Models\User;
use App\PuppyStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {

    $top_picks = Puppy::with('breeds', 'seller')->hasSubscribedUsers()->inRandomOrder()->first();

    $spotlights = PuppyData::collect(Puppy::with('breeds', 'seller')->hasSubscribedUsers()->inRandomOrder()->take(4)->get());

    $new = PuppyData::collect(Puppy::with('breeds:name,slug', 'seller')->hasSubscribedUsers()->newArrivals()->orderByDesc('id')->take(4)->get());

    if ( auth()->user()) {
        $user_favorites = auth()->user()->favorites()->pluck('favoriteable_id');

    if ($top_picks != null) {
      $top_picks = PuppyData::from($top_picks);

            if (in_array($top_picks->id, $user_favorites->toArray())){

                $top_picks->is_favorite = true;
            }
    }

    $spotlights->map(function ($puppy) use ($user_favorites) {

            if (in_array($puppy->id , $user_favorites->toArray())){

                $puppy->is_favorite = true;
            }
    });

    $new->map(function ($puppy) use ($user_favorites) {

            if (in_array($puppy->id , $user_favorites->toArray())){

                $puppy->is_favorite = true;
            }
    });

    }

    $featured_breeds = Cache::remember('featured_breeds', now()->addDay(), function () {
        return Breed::with('media')->inRandomOrder()->take(8)->get();
    });

    return Inertia::render('Home/Index', [
        'breed_filter_list' => inertia()->optional(fn () =>
                Breed::select(['name'])->distinct()->orderBy('name')->pluck('name')
            ) ,
        /* 'favorites' => auth()->user() ? auth()->user()->favorites()->pluck('favoriteable_id') : [], */

        'state_filter_list' => inertia()->optional(fn () =>
                State::select(['name'])->distinct()->orderBy('name')->pluck('name')

            ) ,
        'top_pick_puppy' => $top_picks,

        'puppy_spotlights' => $spotlights ,
        'videos' => get_videos(),
        'trusted_breeders' => BreederFullData::collect(User::with(['breeds' => fn ($q) => $q->select('name') ])->breeders()->take(4)->inRandomOrder()->get()),
        'new_arrivals' => $new,
        'featured_breeds' => BreedData::collect($featured_breeds),
        'post_data' => PostData::collect(Post::with(['category', 'author'])->orderBy('created_at', 'desc')->take(4)->get()),

        /* 'canLogin' => Route::has('login'), */
        /* 'canRegister' => Route::has('register'), */
        /* 'laravelVersion' => Application::VERSION, */
        /* 'phpVersion' => PHP_VERSION, */
    ]);

    }

}

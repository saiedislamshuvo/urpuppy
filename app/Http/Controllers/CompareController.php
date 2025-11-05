<?php

namespace App\Http\Controllers;

use App\Models\Puppy;
use App\Data\PuppyData;
use App\Services\CompareService;
use App\Services\FavoriteService;
use Illuminate\Http\Request;

class CompareController extends Controller
{
    public function __invoke(Request $request, Puppy $puppy)
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->to(route('login'))->with('message.error', 'You must be logged in to add to compare');
        }

        if ($puppy->user_id === $user->id) {
            return redirect()->back()->with('message.error', 'You cannot compare your own puppy');
        }

        // Check if already compared
        if ($user->hasCompared($puppy)) {
            return redirect()->to(route('compares.index'))->with('message.info', 'This puppy is already in your compare list');
        }

        $user->toggleCompare($puppy);

        return redirect()->to(route('compares.index'))->with('message.success', 'Added to compare');
    }

    public function index(Request $request)
    {
        $compares = $request->user()->getCompareItems(Puppy::class)->with('breeds', 'seller')->paginate(12);
        
        $puppiesData = PuppyData::collect($compares);
        $puppiesData = app(CompareService::class)->applyCompares(
            app(FavoriteService::class)->applyFavorites($puppiesData)
        );

        return inertia()->render('Compare/Index', [
            'compare_puppies' => $puppiesData,
        ]);
    }
}


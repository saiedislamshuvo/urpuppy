<?php

namespace App\Http\Controllers;

use App\Models\Puppy;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the user's dashboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Get puppy statistics for the current user
        $totalPuppies = Puppy::where('user_id', $user->id)->count();
        
        $publishedPuppies = Puppy::where('user_id', $user->id)
            ->whereRaw("status = 'published'")
            ->count();
        
        $pendingPuppies = Puppy::where('user_id', $user->id)
            ->whereRaw("status = 'draft'")
            ->count();
        
        // Consider puppies older than 6 months as expired
        $expiredPuppies = Puppy::where('user_id', $user->id)
            ->where('created_at', '<', Carbon::now()->subMonths(6))
            ->count();

        return Inertia::render('Dashboard', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'initial_name' => $user->initial_name,
            ],
            'statistics' => [
                'total_puppies' => $totalPuppies,
                'published_puppies' => $publishedPuppies,
                'pending_puppies' => $pendingPuppies,
                'expired_puppies' => $expiredPuppies,
            ],
        ]);
    }
}


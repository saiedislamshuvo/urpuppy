<?php

namespace App\Http\Controllers;

use App\Models\Puppy;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function store(Request $request, string $slug)
    {
        if (! $request->user()) {
            return redirect()->back()->with('message.error', 'You have to login first');
        }

        $validated = $request->validate([
            'reason' => 'required|string|max:255',
            'customOptionInput' => 'max:255|nullable',
        ]);

        $puppy = Puppy::where('slug', $slug)->first();

        $is_reported_today = $puppy->reports()->whereDate('created_at', Carbon::today())->exists();

        if ($is_reported_today) {
            return redirect()->back()->with('message.error', 'This has been reported today');
        }

        if ($validated['reason'] == 'other') {
            $validated['reason'] = $validated['customOptionInput'];
        }

        $report = $puppy->reports()->create([
            'reason' => $validated['reason'],
            'user_id' => auth()->id(),
        ]);

        return redirect()->back()->with('message.success', 'Report created successfully.');
    }

    public function create(string $slug)
    {
        return inertia()->modal('Report', [
            'slug' => $slug,
        ])->baseRoute('puppies.show', $slug);
    }
}

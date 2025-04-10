<?php

namespace App\Http\Controllers;

use App\Models\SavedSearch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SavedSearchController extends Controller
{
    public function destroy(int $id)
    {
        $savedSearch = SavedSearch::find($id);
        $savedSearch->delete();

        return redirect()->back()->with([
            'message.success' => 'Deleted saved search',
            'redirect_tab' => 'Saved Search',
        ]);
    }

    public function show()
    {
        return Inertia::modal('SavedSearchModal', [

        ])->baseRoute('puppies.index');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable',
            'payload' => 'required',
        ]);

        $data = json_decode($validated['payload'], true);

        $result = [];
        parse_str(http_build_query($data), $result);
        $validated['payload'] = $result;

        try {
            $request->user()->saved_searches()->create($validated);
        } catch (\Throwable $th) {

            return redirect()->back()->with([
                'message.error' => 'Failed to create saved search',
            ]);
        }

        return redirect()->back()->with([
            'message.success' => 'Saved search created',
        ]);

        return inertia()->back()->with([
            'message.success' => 'Saved search created',
        ]);
    }
}

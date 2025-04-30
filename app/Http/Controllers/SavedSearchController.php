<?php

namespace App\Http\Controllers;

use App\Models\SavedSearch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SavedSearchController extends Controller
{
    public function destroy(int $id)
    {
        $savedSearch = SavedSearch::find($id);

        if ($savedSearch) {
            $savedSearch->delete();
        }

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
            'name' => 'nullable|string',
            'payload' => 'required|json',
        ]);

        $data = json_decode($validated['payload'], true);

        $result = [];
        parse_str(http_build_query($data), $result);
        $validated['payload'] = $result;

        try {
            $request->user()->saved_searches()->create($validated);

            return redirect()->back()->with([
                'message.success' => 'Saved search created',
            ]);
        } catch (\Throwable $th) {
            report($th);

            return redirect()->back()->with([
                'message.error' => 'Failed to create saved search',
            ]);
        }
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:5120',
        ]);

        $path = $request->file('image')->store('temp/uploads', config('media-library.disk_name'));

        return response()->json([
            'url' => Storage::disk(config('media-library.disk_name'))->url($path),
        ]);
    }
}


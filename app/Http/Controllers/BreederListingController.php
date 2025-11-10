<?php

namespace App\Http\Controllers;

use App\Http\Requests\ListingRequest;
use App\Models\Breed;
use App\Models\Puppy;
use App\Models\PuppyColor;
use App\Models\PuppyPattern;
use App\Models\PuppyTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class BreederListingController extends Controller
{
    public function index(Request $request)
    {

        $searchQuery = $request->input('search');

        $listings = auth()->user()->puppies()->with('breeds');

        if ($searchQuery) {
            $puppyIds = Puppy::search($searchQuery)->keys();
            $listings->whereIn('id', $puppyIds);
        }

        return inertia()->render('BreederListing/Index', [
            'query' => $searchQuery,
            'listings' => $listings->latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return inertia()->render('BreederListing/Create',
            [
                'colors' => PuppyColor::select('id', 'name', 'color')->get(),
                'puppy_patterns' => PuppyPattern::select('id', 'name')->get(),
                'characteristics' => PuppyTrait::select('id', 'name', 'tooltip')->get(),
                'breeds' => Breed::select('id', 'name')->get()->map(function ($state) {

                    return [
                        'value' => $state->id,
                        'label' => ucwords($state->name),
                    ];
                })]);
    }

    public function store(ListingRequest $request)
    {
        if (! $request->user()->isSubscribed()) {
            return redirect()->route('home')->with('message.error', 'Please subscribe to create listings');
        }

        Cache::flush();
        $data = array_merge($request->except('breeds', 'file', 'misc', 'captcha', 'video', 'colors', 'characteristics', 'puppy_patterns'), [
            'user_id' => auth()->id(),
        ]);

        $data['price'] = $data['price'] * 100;

        $puppy = Puppy::create($data);

        if ($request->has('colors')) {
            $puppy->puppy_colors()->sync($request->get('colors'));
        }

        if ($request->has('characteristics')) {
            $puppy->puppy_traits()->sync($request->get('characteristics'));
        }

        if ($request->has('puppy_patterns')) {
            $patterns = collect($request->get('puppy_patterns'))->map(function ($pattern) {
                return $pattern['value'];
            });
            $puppy->puppy_patterns()->sync($patterns);
        }

        if ($request->has('breeds')) {
            $breeds = collect($request->get('breeds'))->map(function ($breed) {
                return $breed['value'];
            });
            $puppy->breeds()->sync($breeds);
        }

        if ($request->has('misc') && $misc = $request->get('misc')) {

            $puppy->deleteAttribute('has_passport', 'has_vaccination', 'has_vet_exam', 'is_registered', 'delivery_included');

            foreach ($misc as $key => $value) {
                $puppy->attachAttribute($key, $value);
            }
        }

        if ($request->hasFile('video')) {
            /* $puppy->clearMediaCollection('videos'); */
            $puppy->addMedia($request->file('video'))->toMediaCollection('videos');
        }

        if ($request->hasFile('file')) {
            foreach ($request->file('file') as $file) {
                $puppy->addMedia($file)->toMediaCollection('puppy_files');
            }
        }

        return redirect()->route('listing.index')->with('message.success', 'Listing created successfully');
    }

    public function edit(Puppy $puppy)
    {
        return inertia()->render('Shop/CreateListing',
            [
                'puppy' => $puppy->load(['media', 'attributes', 'puppy_colors', 'puppy_patterns', 'puppy_traits', 'breeds']),
                'colors' => PuppyColor::select('id', 'name', 'color')->get(),
                'puppy_patterns' => PuppyPattern::select('id', 'name')->get(),
                'characteristics' => PuppyTrait::select('id', 'name', 'tooltip')->get(),
                'breeds' => Breed::select('id', 'name')->get()->map(function ($state) {
                    return [
                        'value' => $state->id,
                        'label' => ucwords($state->name),
                    ];
                }),
            ]

        );
    }

    public function update(ListingRequest $request, int $id)
    {
        if (! $request->user()->isSubscribed()) {
            return redirect()->route('home')->with('message.error', 'Please subscribe to create listings');
        }

        // Find the puppy instance
        $puppy = Puppy::find($id);

        // Check if puppy exists
        if (! $puppy) {
            return response()->json(['error' => 'Puppy not found'], 404);
        }

        $data = $request->except('breed_id', 'breeds', 'file', 'misc', 'captcha', 'breeds', 'video', 'colors', 'characteristics', 'puppy_patterns');

        if ($request->has('characteristics')) {
            $puppy->puppy_traits()->sync($request->get('characteristics'));
        }

        if ($request->has('puppy_patterns')) {
            $patterns = collect($request->get('puppy_patterns'))->map(function ($pattern) {
                return $pattern['value'];
            });
            $puppy->puppy_patterns()->sync($patterns);
        }

        if ($request->has('breeds')) {
            $breeds = collect($request->get('breeds'))->map(function ($breed) {
                return $breed['value'];
            });
            $puppy->breeds()->sync($breeds);
        }

        if ($request->has('colors')) {
            $puppy->puppy_colors()->sync($request->get('colors'));
        }

        if ($request->has('misc') && $misc = $request->get('misc')) {

            $puppy->deleteAttribute('has_passport', 'has_vaccination', 'has_vet_exam', 'is_registered', 'delivery_included');

            foreach ($misc as $key => $value) {
                if ($value == '0') {
                    continue;
                }
                $puppy->attachAttribute($key, $value);
            }
        }

        $data['price'] = $data['price'] * 100;

        // Update puppy attributes except for 'file'
        $puppy->update(
            $data
        );

        if ($request->hasFile('video')) {
            $puppy->clearMediaCollection('videos');
            $puppy->addMedia($request->file('video'))->toMediaCollection('videos');
        }

        // Check if there are any files to update
        if ($request->hasFile('file')) {
            $puppy->clearMediaCollection('puppy_files');
            /* dd($request->file('file') ); */
            foreach ($request->file('file') as $file) {
                $puppy->addMedia($file)->toMediaCollection('puppy_files');
            }
        }

        Cache::flush();

        /* dd($puppy->media->map(function ($item) { */
        /*     return $item->getUrl(); */
        /* })); */

        return redirect()->route('puppies.show', $puppy->slug)->with('message.success', 'Listing updated successfully');
    }
}

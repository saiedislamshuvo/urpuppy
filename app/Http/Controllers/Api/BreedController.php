<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Breed;
use Illuminate\Http\Request;

class BreedController extends Controller
{
    public function __invoke(Request $request)
    {
        // Start the query
        $breedsQuery = Breed::query();

        // Apply search filter if 'search' parameter is provided
        if ($request->filled('search')) {
            $searchTerm = strtolower($request->search);
            $breedsQuery->whereRaw('LOWER(name) LIKE ?', ['%'.$searchTerm.'%']);
        }

        // Apply sorting by name
        $breedsQuery->orderBy('name');

        // Determine pagination size
        $pagination = $request->has('all') ? 1000 : 10;

        // Paginate the results
        $breeds = $breedsQuery->select('id', 'name')->paginate($pagination);

        // Transform the data
        $breeds->getCollection()->transform(function ($breed) {
            return [
                'value' => $breed->id,
                'label' => ucwords($breed->name),
            ];
        });

        // Prepend 'All' option if 'all' parameter is present
        if ($request->has('all')) {
            $breeds->prepend([
                'value' => 'All',
                'label' => 'All',
            ]);
        }

        // Return the JSON response
        return response()->json($breeds);
    }
}

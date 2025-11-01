<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function __invoke(Request $request)
    {
        $countries = Country::query();

        if ($request->has('search')) {
            $countries->where('name', 'like', '%'.$request->search.'%');
        }

        $countries = $countries->select('id', 'name')->paginate(10);

        $countries->getCollection()->transform(function ($city) {
            return [
                'value' => $city->id,
                'label' => ucwords($city->name),
            ];
        });

        return $countries;
    }
}

<?php

use App\Http\Controllers\Api\BreedController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\StateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::get('/puppy/countries', CountryController::class);
Route::get('/puppy/states', StateController::class);
Route::get('/puppy/cities', CityController::class);
Route::get('/puppy/breeds', BreedController::class);

Route::middleware(['throttle:60,1'])->group(function () {
    Route::get('/geocode', function (Request $request) {
        if (Cache::get('geocode_usage') > config('services.google.maps_daily_limit')) {
            abort(429, 'Daily limit exceeded');
        }

        Cache::increment('geocode_usage');

        $response = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
            'address' => $request->input('address'),
            'key' => config('services.google.maps_key'),
        ]);

        return $response->json();
    });

    Route::get('/reverse-geocode', function (Request $request) {
        $response = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
            'latlng' => $request->input('lat').','.$request->input('lng'),
            'key' => config('services.google.maps_key'),
        ]);

        return $response->json();
    });
});

<?php

use App\Http\Controllers\Api\BreedController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\StateController;
use App\Http\Controllers\ChatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::get('/puppy/countries', CountryController::class);
Route::get('/puppy/states', StateController::class);
Route::get('/puppy/cities', CityController::class);
Route::get('/puppy/breeds', BreedController::class);

// Chat API routes - use web middleware for session-based auth
Route::middleware(['web', 'auth:web'])->group(function () {
    Route::post('/chat', [ChatController::class, 'store'])->name('api.chat.store');
    Route::get('/chat/{id}', [ChatController::class, 'show'])->name('api.chat.show');
    Route::post('/chat/{id}/message', [ChatController::class, 'sendMessage'])->name('api.chat.sendMessage');
    Route::post('/chat/upload-attachment', [ChatController::class, 'uploadAttachment'])->name('api.chat.uploadAttachment');
    Route::post('/chat/{id}/read', [ChatController::class, 'markAsRead'])->name('api.chat.markAsRead');
    Route::get('/chat/unread/count', [ChatController::class, 'getUnreadCount'])->name('api.chat.unreadCount');
});

Route::middleware(['throttle:60,1'])->group(function () {
    Route::get('/geocode', function (Request $request) {
        $provider = config('services.map.provider', 'google');
        $address = $request->input('address');

        if ($provider === 'mapbox') {
            // Use Mapbox Geocoding API
            $accessToken = config('services.mapbox.access_token');
            if (!$accessToken) {
                abort(500, 'Mapbox access token not configured');
            }

            $response = Http::get('https://api.mapbox.com/geocoding/v5/mapbox.places/' . urlencode($address) . '.json', [
                'access_token' => $accessToken,
                'country' => 'us',
                'limit' => 1,
            ]);

            $data = $response->json();
            
            if (empty($data['features'])) {
                return ['results' => []];
            }

            // Transform Mapbox response to Google Maps format
            $feature = $data['features'][0];
            $center = $feature['center'];
            
            return [
                'results' => [
                    [
                        'formatted_address' => $feature['place_name'] ?? '',
                        'geometry' => [
                            'location' => [
                                'lat' => (float) $center[1],
                                'lng' => (float) $center[0],
                            ],
                        ],
                        'address_components' => transformMapboxAddress($feature),
                    ],
                ],
            ];
        } elseif ($provider === 'openstreetmap') {
            // Use Nominatim API for OpenStreetMap
            $response = Http::get('https://nominatim.openstreetmap.org/search', [
                'q' => $address,
                'format' => 'json',
                'addressdetails' => 1,
                'limit' => 1,
                'countrycodes' => 'us', // Restrict to USA
            ])->withHeaders([
                'User-Agent' => config('app.name', 'Laravel'),
            ]);

            $data = $response->json();
            
            if (empty($data)) {
                return ['results' => []];
            }

            // Transform Nominatim response to Google Maps format
            $result = $data[0];
            return [
                'results' => [
                    [
                        'formatted_address' => $result['display_name'] ?? '',
                        'geometry' => [
                            'location' => [
                                'lat' => (float) $result['lat'],
                                'lng' => (float) $result['lon'],
                            ],
                        ],
                        'address_components' => transformNominatimAddress($result['address'] ?? []),
                    ],
                ],
            ];
        } else {
            // Google Maps
            if (Cache::get('geocode_usage') > config('services.google.maps_daily_limit')) {
                abort(429, 'Daily limit exceeded');
            }

            Cache::increment('geocode_usage');

            $response = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
                'address' => $address,
                'key' => config('services.google.maps_key'),
            ]);

            return $response->json();
        }
    });

    Route::get('/reverse-geocode', function (Request $request) {
        $provider = config('services.map.provider', 'google');
        $lat = $request->input('lat');
        $lng = $request->input('lng');

        if ($provider === 'mapbox') {
            // Use Mapbox Geocoding API
            $accessToken = config('services.mapbox.access_token');
            if (!$accessToken) {
                abort(500, 'Mapbox access token not configured');
            }

            $response = Http::get('https://api.mapbox.com/geocoding/v5/mapbox.places/' . $lng . ',' . $lat . '.json', [
                'access_token' => $accessToken,
                'limit' => 1,
            ]);

            $data = $response->json();
            
            if (empty($data['features'])) {
                return ['results' => []];
            }

            // Transform Mapbox response to Google Maps format
            $feature = $data['features'][0];
            
            return [
                'results' => [
                    [
                        'formatted_address' => $feature['place_name'] ?? '',
                        'geometry' => [
                            'location' => [
                                'lat' => (float) $lat,
                                'lng' => (float) $lng,
                            ],
                        ],
                        'address_components' => transformMapboxAddress($feature),
                    ],
                ],
            ];
        } elseif ($provider === 'openstreetmap') {
            // Use Nominatim API for OpenStreetMap
            $response = Http::get('https://nominatim.openstreetmap.org/reverse', [
                'lat' => $lat,
                'lon' => $lng,
                'format' => 'json',
                'addressdetails' => 1,
            ])->withHeaders([
                'User-Agent' => config('app.name', 'Laravel'),
            ]);

            $data = $response->json();
            
            if (empty($data)) {
                return ['results' => []];
            }

            // Transform Nominatim response to Google Maps format
            return [
                'results' => [
                    [
                        'formatted_address' => $data['display_name'] ?? '',
                        'geometry' => [
                            'location' => [
                                'lat' => (float) $lat,
                                'lng' => (float) $lng,
                            ],
                        ],
                        'address_components' => transformNominatimAddress($data['address'] ?? []),
                    ],
                ],
            ];
        } else {
            // Google Maps
            $response = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
                'latlng' => $lat.','.$lng,
                'key' => config('services.google.maps_key'),
            ]);

            return $response->json();
        }
    });
});

// Helper function to transform Nominatim address to Google Maps format
if (!function_exists('transformNominatimAddress')) {
    function transformNominatimAddress($address) {
        $components = [];
        
        if (isset($address['house_number'])) {
            $components[] = [
                'long_name' => $address['house_number'],
                'short_name' => $address['house_number'],
                'types' => ['street_number'],
            ];
        }
        
        if (isset($address['road'])) {
            $components[] = [
                'long_name' => $address['road'],
                'short_name' => $address['road'],
                'types' => ['route'],
            ];
        }
        
        if (isset($address['city']) || isset($address['town']) || isset($address['village'])) {
            $city = $address['city'] ?? $address['town'] ?? $address['village'];
            $components[] = [
                'long_name' => $city,
                'short_name' => $city,
                'types' => ['locality'],
            ];
        }
        
        if (isset($address['state'])) {
            $components[] = [
                'long_name' => $address['state'],
                'short_name' => $address['state_code'] ?? $address['state'],
                'types' => ['administrative_area_level_1'],
            ];
        }
        
        if (isset($address['postcode'])) {
            $components[] = [
                'long_name' => $address['postcode'],
                'short_name' => $address['postcode'],
                'types' => ['postal_code'],
            ];
        }
        
        return $components;
    }
}

// Helper function to transform Mapbox address to Google Maps format
if (!function_exists('transformMapboxAddress')) {
    function transformMapboxAddress($feature) {
        $components = [];
        $context = $feature['context'] ?? [];
        
        // Extract address components from Mapbox context
        foreach ($context as $item) {
            $id = $item['id'] ?? '';
            
            if (strpos($id, 'address') !== false) {
                $components[] = [
                    'long_name' => $item['text'] ?? '',
                    'short_name' => $item['text'] ?? '',
                    'types' => ['street_number', 'route'],
                ];
            } elseif (strpos($id, 'place') !== false) {
                $components[] = [
                    'long_name' => $item['text'] ?? '',
                    'short_name' => $item['text'] ?? '',
                    'types' => ['locality'],
                ];
            } elseif (strpos($id, 'region') !== false) {
                $components[] = [
                    'long_name' => $item['text'] ?? '',
                    'short_name' => $item['short_code'] ?? $item['text'] ?? '',
                    'types' => ['administrative_area_level_1'],
                ];
            } elseif (strpos($id, 'postcode') !== false) {
                $components[] = [
                    'long_name' => $item['text'] ?? '',
                    'short_name' => $item['text'] ?? '',
                    'types' => ['postal_code'],
                ];
            }
        }
        
        return $components;
    }
}

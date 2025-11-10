@php
    $mapboxToken = config('services.mapbox.access_token');
    $record = $getRecord();
    $initialLat = $record?->lat ?? $getDefaultLat();
    $initialLng = $record?->lng ?? $getDefaultLng();
    $initialAddress = $record?->address ?? '';
    
    // Get state paths for related fields
    $latPath = 'lat';
    $lngPath = 'lng';
    $addressPath = 'address';
    $streetPath = 'street';
    $cityPath = 'city';
    $zipCodePath = 'zip_code';
@endphp

<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <div 
        x-data="{
            lat: @js($initialLat),
            lng: @js($initialLng),
            address: @js($initialAddress),
            map: null,
            marker: null,
            searchInput: '',
            mapboxToken: @js($mapboxToken),
            
            init() {
                this.$watch('lat', (value) => {
                    if (value !== null && value !== undefined) {
                        $wire.set('data.{{ $latPath }}', parseFloat(value));
                    }
                });
                
                this.$watch('lng', (value) => {
                    if (value !== null && value !== undefined) {
                        $wire.set('data.{{ $lngPath }}', parseFloat(value));
                    }
                });
                
                this.$watch('address', (value) => {
                    if (value) {
                        $wire.set('data.{{ $addressPath }}', value);
                    }
                });
                
                this.$nextTick(() => {
                    this.initMap();
                });
            },
            
            initMap() {
                if (!this.mapboxToken) {
                    console.error('Mapbox token not configured');
                    return;
                }
                
                if (typeof mapboxgl === 'undefined') {
                    console.error('Mapbox GL JS not loaded');
                    return;
                }
                
                mapboxgl.accessToken = this.mapboxToken;
                
                const center = this.lat && this.lng 
                    ? [this.lng, this.lat] 
                    : [-122.4194, 37.7749];
                
                this.map = new mapboxgl.Map({
                    container: 'mapbox-{{ $getId() }}',
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: center,
                    zoom: {{ $getZoom() }},
                    maxBounds: [
                        [-124.84, 24.39], // Southwest
                        [-66.94, 49.38]   // Northeast
                    ]
                });
                
                this.map.addControl(new mapboxgl.NavigationControl());
                
                this.map.on('load', () => {
                    if (this.lat && this.lng) {
                        this.addMarker([this.lng, this.lat]);
                    }
                });
                
                this.map.on('click', (e) => {
                    const { lng, lat } = e.lngLat;
                    this.lng = lng;
                    this.lat = lat;
                    this.addMarker([lng, lat]);
                    this.reverseGeocode(lat, lng);
                });
            },
            
            addMarker(coordinates) {
                if (this.marker) {
                    this.marker.remove();
                }
                
                this.marker = new mapboxgl.Marker({ draggable: true })
                    .setLngLat(coordinates)
                    .addTo(this.map);
                
                this.marker.on('dragend', () => {
                    const { lng, lat } = this.marker.getLngLat();
                    this.lng = lng;
                    this.lat = lat;
                    this.reverseGeocode(lat, lng);
                });
            },
            
            async reverseGeocode(lat, lng) {
                try {
                    const response = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}`);
                    const data = await response.json();
                    
                    if (data.results && data.results.length > 0) {
                        this.address = data.results[0].formatted_address;
                        $wire.set('data.{{ $addressPath }}', this.address);
                        
                        // Extract address components
                        const components = data.results[0].address_components;
                        let street = '';
                        let city = '';
                        let zipCode = '';
                        
                        components.forEach(component => {
                            if (component.types.includes('street_number')) {
                                street = component.long_name + ' ';
                            }
                            if (component.types.includes('route')) {
                                street += component.long_name;
                            }
                            if (component.types.includes('locality')) {
                                city = component.long_name;
                            }
                            if (component.types.includes('postal_code')) {
                                zipCode = component.long_name;
                            }
                        });
                        
                        if (street) $wire.set('data.{{ $streetPath }}', street.trim());
                        if (city) $wire.set('data.{{ $cityPath }}', city);
                        if (zipCode) $wire.set('data.{{ $zipCodePath }}', zipCode);
                    }
                } catch (error) {
                    console.error('Reverse geocoding failed:', error);
                }
            },
            
            async searchLocation() {
                if (!this.searchInput.trim()) return;
                
                try {
                    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(this.searchInput)}.json?access_token=${this.mapboxToken}&country=US&limit=1`);
                    const data = await response.json();
                    
                    if (data.features && data.features.length > 0) {
                        const [lng, lat] = data.features[0].center;
                        this.lat = lat;
                        this.lng = lng;
                        this.address = data.features[0].place_name;
                        $wire.set('data.{{ $addressPath }}', this.address);
                        
                        this.map.flyTo({ center: [lng, lat], zoom: 15 });
                        this.addMarker([lng, lat]);
                        this.reverseGeocode(lat, lng);
                    }
                } catch (error) {
                    console.error('Geocoding failed:', error);
                }
            },
            
            getCurrentLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            this.lat = latitude;
                            this.lng = longitude;
                            this.map.flyTo({ center: [longitude, latitude], zoom: 15 });
                            this.addMarker([longitude, latitude]);
                            this.reverseGeocode(latitude, longitude);
                        },
                        (error) => {
                            console.error('Geolocation error:', error);
                        }
                    );
                }
            }
        }"
        class="space-y-4"
    >
        <div class="flex gap-2">
            <input
                type="text"
                x-model="searchInput"
                @keyup.enter="searchLocation()"
                placeholder="Search for an address..."
                class="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
                type="button"
                @click="searchLocation()"
                class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
                Search
            </button>
            <button
                type="button"
                @click="getCurrentLocation()"
                class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
                Use Current Location
            </button>
        </div>
        
        <div 
            id="mapbox-{{ $getId() }}"
            class="w-full rounded-lg border border-gray-300 dark:border-gray-600"
            style="height: 400px;"
        ></div>
        
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Latitude</label>
                <input
                    type="number"
                    step="any"
                    x-model="lat"
                    readonly
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
            </div>
            <div>
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Longitude</label>
                <input
                    type="number"
                    step="any"
                    x-model="lng"
                    readonly
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
            </div>
        </div>
        
        <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
            <input
                type="text"
                x-model="address"
                readonly
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
        </div>
    </div>
</x-dynamic-component>

@once
    @push('scripts')
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet" />
    @endpush
@endonce


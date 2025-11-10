import React, { useState, useCallback, useRef, useEffect } from "react";
import {
    GoogleMap,
    Marker,
    useLoadScript,
    StandaloneSearchBox,
} from "@react-google-maps/api";
import TextInput from "../TextInput";
import Button from "../ui/Button";

interface Location {
    lat: number;
    lng: number;
}

interface AddressDetails {
    street: string;
    city: string;
    state: string;
    shortState: string;
    zipCode: string;
}

interface GoogleMapInputProps {
    onLocationSelect: (location: {
        address: string;
        lat: number;
        lng: number;
        street: string;
        city: string;
        state: string;
        shortState: string;
        zipCode: string;
    }) => void;
    initialAddress?: string;
    initialLocation?: { lat: number | null; lng: number | null } | null;
    skipInitialLocationSelect?: boolean;
}

const mapContainerStyle = { width: "100%", height: "400px" };
const center: Location = { lat: 39.8283, lng: -98.5795 }; // Center of USA
const usaBounds = {
    north: 49.38,
    south: 24.39,
    west: -124.84,
    east: -66.94,
};

const GoogleMapInput: React.FC<GoogleMapInputProps> = ({
    onLocationSelect,
    initialAddress: propInitialAddress,
    initialLocation: propInitialLocation,
    skipInitialLocationSelect = false,
}) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAouIjqr5Keqg40KQm9LT0uY-wZUAcT7oc",
        libraries: ["places"], // Required for autocomplete
    });

    // Use initialLocation if provided and valid, otherwise use center
    const hasInitialLocation = propInitialLocation && propInitialLocation.lat != null && propInitialLocation.lng != null;
    const defaultCenter = hasInitialLocation && propInitialLocation.lat != null && propInitialLocation.lng != null
        ? { lat: propInitialLocation.lat, lng: propInitialLocation.lng }
        : center;
    const [marker, setMarker] = useState<Location | null>(hasInitialLocation ? defaultCenter : null);
    const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
    const [address, setAddress] = useState<string>("");
    const [error, setError] = useState<string>("");
    const searchBoxRef = useRef<google.maps.places.SearchBox | null>();
    const inputRef = useRef<HTMLInputElement | null>(null); // Ref for the input field
    const [initialAddress, setInitialAddress] = useState<string | undefined>(propInitialAddress);
    const lastFetchedLocation = useRef<{ lat: number; lng: number } | null>(null);
    const hasFetchedInitial = useRef<boolean>(false);

    useEffect(() => {
        // Inject CSS to hide Google branding & UI elements
        const style = document.createElement("style");
        style.innerHTML = `
      .gm-style-cc, .gm-style-cc + div, .gm-style-mtc,
      .gm-fullscreen-control, .gm-svpc, .gm-style img[alt="Google"],
      .gmnoprint a, .gmnoprint span, .gm-style > div > div > a,
      .gm-style div[style*="position: absolute; bottom: 0px; right: 0px;"],
      .gm-style-wtc {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
    `;
        document.head.appendChild(style);
    }, []);

    const fetchAddress = useCallback(async ({ lat, lng }: Location) => {
        // Check if we've already fetched for this exact location
        if (lastFetchedLocation.current &&
            Math.abs(lastFetchedLocation.current.lat - lat) < 0.0001 &&
            Math.abs(lastFetchedLocation.current.lng - lng) < 0.0001) {
            return; // Skip if same location
        }

        // Update last fetched location
        lastFetchedLocation.current = { lat, lng };

        try {
            const response = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}`);
            const data = await response.json();

            if (data.results.length > 0) {
                const formattedAddress = data.results[0].formatted_address;
                setAddress(formattedAddress);
                if (inputRef.current) {
                    inputRef.current.value = formattedAddress;
                }

                const addressComponents = data.results[0].address_components;
                const addressDetails: AddressDetails = {
                    street: "",
                    city: "",
                    state: "",
                    shortState: "",
                    zipCode: "",
                };

                let streetNumber = "";
                let route = "";

                addressComponents.forEach((component: any) => {
                    if (component.types.includes("street_number")) {
                        streetNumber = component.long_name;
                    }
                    if (component.types.includes("route")) {
                        route = component.long_name;
                    }
                    if (component.types.includes("locality")) {
                        addressDetails.city = component.long_name;
                    }
                    if (component.types.includes("administrative_area_level_1")) {
                        addressDetails.state = component.long_name;
                        addressDetails.shortState = component.short_name;
                    }
                    if (component.types.includes("postal_code")) {
                        addressDetails.zipCode = component.long_name;
                    }
                });

                // Combine street number and route, trim to remove any extra spaces
                addressDetails.street = `${streetNumber} ${route}`.trim();

                // Always call onLocationSelect - the handler will decide what to update
                // If skipInitialLocationSelect is true, handler will only update lat/lng
                onLocationSelect({ address: formattedAddress, lat, lng, ...addressDetails });
            }
        } catch (error) {
            setError("Failed to fetch address. Please try again.");
        }
    }, [onLocationSelect]);

    useEffect(() => {
        // Only fetch on initial load, not on every prop change
        if (!hasFetchedInitial.current) {
            // If initialLocation is provided and valid, use it directly
            if (propInitialLocation && propInitialLocation.lat != null && propInitialLocation.lng != null) {
                const location: Location = { lat: propInitialLocation.lat, lng: propInitialLocation.lng };
                setMarker(location);
                // Fetch address for the initial location only once
                fetchAddress(location);
                hasFetchedInitial.current = true;
            } else if (initialAddress) {
                fetchCoordinates(initialAddress);
                hasFetchedInitial.current = true;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount - we intentionally don't want to re-run on prop changes

    // Fit bounds to USA when map loads and there's no marker
    useEffect(() => {
        if (mapRef && !marker) {
            const hasInitialLocation = propInitialLocation && propInitialLocation.lat != null && propInitialLocation.lng != null;
            if (!hasInitialLocation && !initialAddress) {
                // Fit bounds to show USA when no location data
                const bounds = new google.maps.LatLngBounds(
                    new google.maps.LatLng(usaBounds.south, usaBounds.west),
                    new google.maps.LatLng(usaBounds.north, usaBounds.east)
                );
                mapRef.fitBounds(bounds);
            }
        }
    }, [mapRef, marker, propInitialLocation, initialAddress]);

    const fetchCoordinates = async (address: string) => {
        try {
            const response = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
            const data = await response.json();

            if (data.results.length > 0) {
                const location = data.results[0].geometry.location;
                const newLocation: Location = { lat: location.lat, lng: location.lng };
                setMarker(newLocation);
                fetchAddress(newLocation);
            }
        } catch (error) {
            console.error("Error fetching coordinates:", error);
            setError("Failed to fetch coordinates for the initial address.");
        }
    };


    // Get current location using Geolocation API
    const getCurrentLocation = (e: any) => {
        e.preventDefault();

        if (navigator.geolocation) {
            setError(""); // Clear previous errors
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newLocation: Location = { lat: latitude, lng: longitude };
                    setMarker(newLocation);
                    fetchAddress(newLocation); // Fetch address for the current location
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            setError("Location access denied. Please enable location services and try again.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            setError("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            setError("The request to get location timed out.");
                            break;
                        default:
                            setError("An unknown error occurred while fetching your location.");
                    }
                },
                { timeout: 10000 } // 10 seconds timeout
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
        const newLocation: Location = {
            lat: event?.latLng?.lat() ?? 0,
            lng: event?.latLng?.lng() ?? 0,
        };
        setMarker(newLocation);
        fetchAddress(newLocation);
    }, [fetchAddress]);

    const handleMarkerDragEnd = useCallback((event: google.maps.MapMouseEvent) => {
        const newLocation: Location = {
            lat: event?.latLng?.lat() ?? 0,
            lng: event?.latLng?.lng() ?? 0,
        };
        setMarker(newLocation);
        fetchAddress(newLocation);
    }, [fetchAddress]);

    // Handle when the search box is loaded
    const onSearchBoxLoad = (ref: google.maps.places.SearchBox) => {
        searchBoxRef.current = ref;
    };

    const onPlacesChanged = () => {
        if (searchBoxRef.current) {
            const places = searchBoxRef.current.getPlaces();

            if (places && places.length > 0) {
                const place = places[0];

                // Extract country from place address components
                const countryComponent = place.address_components?.find((component) =>
                    component.types.includes("country")
                );

                if (countryComponent?.short_name !== "US") {
                    setError("Please select a location within the USA.");
                    if (initialAddress && inputRef.current) {
                        inputRef.current.value = "";
                    }
                    setInitialAddress("");
                    return; // Stop further execution
                }

                setError(""); // Clear error if valid USA address

                const newLocation: Location = {
                    lat: place.geometry?.location?.lat() || center.lat,
                    lng: place.geometry?.location?.lng() || center.lng,
                };

                setMarker(newLocation);
                fetchAddress(newLocation);
            }
        }
    };

    // Custom map styles to hide traffic lights, stores, and other POIs
    const mapStyles = [
        {
            featureType: "poi", // Points of interest (stores, landmarks, etc.)
            elementType: "all",
            stylers: [{ visibility: "off" }], // Hide all POIs
        },
        {
            featureType: "transit", // Traffic lights, bus stops, etc.
            elementType: "all",
            stylers: [{ visibility: "off" }], // Hide all transit features
        },
        {
            featureType: "road", // Roads and streets
            elementType: "labels", // Labels for roads
            stylers: [{ visibility: "on" }], // Show road labels
        },
        {
            featureType: "administrative", // City, state, and country labels
            elementType: "labels", // Labels for administrative areas
            stylers: [{ visibility: "on" }], // Show administrative labels
        },
        {
            featureType: "landscape", // Natural features like parks
            elementType: "all",
            stylers: [{ visibility: "on" }], // Hide landscape features
        },
    ];

    if (!isLoaded) return <p>Loading Map...</p>;

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    marginBottom: "10px",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ width: "70%" }}>
                    <StandaloneSearchBox onLoad={onSearchBoxLoad} onPlacesChanged={onPlacesChanged}>
                        <input
                            type="text"
                            placeholder="Search for an address..."
                            className="form-control"
                            style={{ width: "100%", padding: "10px", marginRight: "10px" }}
                            ref={inputRef}
                            autoComplete="off"
                        />
                    </StandaloneSearchBox>
                </div>
                <Button
                    type="button"
                    variant={"secondary"}
                    onClick={getCurrentLocation}
                    style={{ padding: "10px" }}
                >
                    Use Current Location
                </Button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={marker || center}
                zoom={marker ? 18 : 3}
                onLoad={(map) => {
                    setMapRef(map);
                    // Fit bounds to show USA when no marker
                    const hasInitialLocation = propInitialLocation && propInitialLocation.lat != null && propInitialLocation.lng != null;
                    if (!marker && !hasInitialLocation && !initialAddress) {
                        setTimeout(() => {
                            const bounds = new google.maps.LatLngBounds(
                                new google.maps.LatLng(usaBounds.south, usaBounds.west),
                                new google.maps.LatLng(usaBounds.north, usaBounds.east)
                            );
                            map.fitBounds(bounds);
                        }, 200);
                    }
                }}
                onClick={handleMapClick}
                options={{
                    disableDefaultUI: true, // Removes all UI elements
                    zoomControl: true, // Enables zoom buttons manually
                    streetViewControl: false, // Disables Pegman (Street View)
                    fullscreenControl: false, // Removes fullscreen button
                    mapTypeControl: false, // Removes map type selection
                    keyboardShortcuts: false, // Disables keyboard shortcuts
                    styles: mapStyles, // Apply custom map styles
                    restriction: {
                        latLngBounds: usaBounds,
                        strictBounds: true, // Prevents panning outside the bounds
                    },
                }}
            >
                {marker && (
                    <Marker icon={""} position={marker} draggable onDragEnd={handleMarkerDragEnd} />
                )}
            </GoogleMap>
        </div>
    );
};

export default GoogleMapInput;


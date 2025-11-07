import React, { useState, useRef, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { usePage } from "@inertiajs/react";
import TextInput from "../TextInput";
import Button from "../ui/Button";

// Fix for default marker icon in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

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

interface MapboxMapInputProps {
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
    initialLocation?: { lat: number; lng: number } | null;
}

const center: Location = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco

// Component to handle map clicks
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click: (e) => {
            onMapClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

const MapboxMapInput: React.FC<MapboxMapInputProps> = ({
    onLocationSelect,
    initialAddress: propInitialAddress,
    initialLocation: propInitialLocation,
}) => {
    // Use initialLocation if provided, otherwise use center
    const defaultCenter = propInitialLocation ? { lat: propInitialLocation.lat, lng: propInitialLocation.lng } : center;
    const [marker, setMarker] = useState<Location | null>(defaultCenter);
    const [address, setAddress] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [initialAddress, setInitialAddress] = useState<string | undefined>(propInitialAddress);
    const inputRef = useRef<HTMLInputElement | null>(null);
    // Get mapbox token from Inertia page props
    const mapboxAccessToken = (usePage().props as any).mapboxAccessToken || '';

    // USA bounds
    const usaBounds: L.LatLngBoundsExpression = [
        [24.39, -124.84], // Southwest
        [49.38, -66.94], // Northeast
    ];

    const fetchAddress = useCallback(async ({ lat, lng }: Location) => {
        try {
            const response = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
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

                onLocationSelect({
                    address: formattedAddress,
                    lat,
                    lng,
                    ...addressDetails,
                });
                setError("");
            }
        } catch (error) {
            console.error("Error fetching address:", error);
            setError("Failed to fetch address. Please try again.");
        }
    }, [onLocationSelect]);

    useEffect(() => {
        // If initialLocation is provided, use it directly
        if (propInitialLocation) {
            const location: Location = { lat: propInitialLocation.lat, lng: propInitialLocation.lng };
            setMarker(location);
            // Fetch address for the initial location
            fetchAddress(location);
        } else if (initialAddress) {
            fetchCoordinates(initialAddress);
        }
    }, [initialAddress, propInitialLocation, fetchAddress]);

    const fetchCoordinates = async (address: string) => {
        try {
            const response = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                const newLocation: Location = { lat: location.lat, lng: location.lng };
                setMarker(newLocation);
                fetchAddress(newLocation);
            } else {
                setError("Address not found. Please try a different address.");
            }
        } catch (error) {
            console.error("Error fetching coordinates:", error);
            setError("Failed to fetch coordinates for the address.");
        }
    };


    const getCurrentLocation = (e: React.MouseEvent) => {
        e.preventDefault();

        if (navigator.geolocation) {
            setError("");
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newLocation: Location = { lat: latitude, lng: longitude };
                    setMarker(newLocation);
                    fetchAddress(newLocation);
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
                { timeout: 10000 }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    const handleMapClick = useCallback((lat: number, lng: number) => {
        const newLocation: Location = { lat, lng };
        setMarker(newLocation);
        fetchAddress(newLocation);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const searchAddress = inputRef.current?.value || "";
        if (searchAddress) {
            fetchCoordinates(searchAddress);
        }
    };

    const handleMarkerDragEnd = (e: L.DragEndEvent) => {
        const marker = e.target;
        const position = marker.getLatLng();
        const newLocation: Location = { lat: position.lat, lng: position.lng };
        setMarker(newLocation);
        fetchAddress(newLocation);
    };

    // Mapbox tile URL - uses Mapbox styles with access token
    const mapboxTileUrl = mapboxAccessToken
        ? `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // Fallback to OSM if no token

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
                <form
                    onSubmit={handleSearch}
                    style={{
                        width: "70%",
                        display: "flex",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search for an address..."
                        className="form-control"
                        style={{ width: "100%", padding: "10px", marginRight: "10px" }}
                        ref={inputRef}
                        autoComplete="off"
                    />
                </form>
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

            <MapContainer
                center={marker ? [marker.lat, marker.lng] : [center.lat, center.lng]}
                zoom={18}
                style={{ width: "100%", height: "400px", zIndex: "0" }}
                bounds={usaBounds}
                maxBounds={usaBounds}
                maxBoundsViscosity={1.0}
            >
                <TileLayer
                    attribution={mapboxAccessToken
                        ? '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }
                    url={mapboxTileUrl}
                />
                {marker && (
                    <Marker
                        position={[marker.lat, marker.lng]}
                        draggable
                        eventHandlers={{
                            dragend: handleMarkerDragEnd,
                        }}
                    />
                )}
                <MapClickHandler onMapClick={handleMapClick} />
            </MapContainer>
        </div>
    );
};

export default MapboxMapInput;


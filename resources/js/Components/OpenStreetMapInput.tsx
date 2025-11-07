import React, { useState, useRef, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import TextInput from "./TextInput";
import Button from "./ui/Button";

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

interface OpenStreetMapInputProps {
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

const OpenStreetMapInput: React.FC<OpenStreetMapInputProps> = ({
    onLocationSelect,
    initialAddress: propInitialAddress,
}) => {
    const [marker, setMarker] = useState<Location | null>(center);
    const [address, setAddress] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [initialAddress, setInitialAddress] = useState<string | undefined>(propInitialAddress);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // USA bounds
    const usaBounds: L.LatLngBoundsExpression = [
        [24.39, -124.84], // Southwest
        [49.38, -66.94], // Northeast
    ];

    useEffect(() => {
        if (initialAddress) {
            fetchCoordinates(initialAddress);
        }
    }, [initialAddress]);

    const fetchCoordinates = async (address: string) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=us`
            );
            const data = await response.json();

            if (data.length > 0) {
                const location = data[0];
                const newLocation: Location = {
                    lat: parseFloat(location.lat),
                    lng: parseFloat(location.lon),
                };
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

    const fetchAddress = async ({ lat, lng }: Location) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();

            if (data && data.address) {
                const formattedAddress = data.display_name || "";
                setAddress(formattedAddress);
                if (inputRef.current) {
                    inputRef.current.value = formattedAddress;
                }

                const addr = data.address;
                const addressDetails: AddressDetails = {
                    street: `${addr.house_number || ""} ${addr.road || ""}`.trim(),
                    city: addr.city || addr.town || addr.village || "",
                    state: addr.state || "",
                    shortState: addr.state_code || "",
                    zipCode: addr.postcode || "",
                };

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
                center={marker || center}
                zoom={18}
                style={{ width: "100%", height: "400px" }}
                bounds={usaBounds}
                maxBounds={usaBounds}
                maxBoundsViscosity={1.0}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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

export default OpenStreetMapInput;


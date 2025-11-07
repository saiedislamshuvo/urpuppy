import React from "react";
import { usePage } from "@inertiajs/react";
import GoogleMapInput from "./GoogleMapInput";
import OpenStreetMapInput from "./OpenStreetMapInput";

interface MapInputProps {
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

const MapInput: React.FC<MapInputProps> = ({ onLocationSelect, initialAddress }) => {
  const { mapProvider } = usePage().props as { mapProvider?: string };

  // Default to openstreetmap if not specified
  const provider = mapProvider || "openstreetmap";

  if (provider === "google") {
    return <GoogleMapInput onLocationSelect={onLocationSelect} initialAddress={initialAddress} />;
  }

  return <OpenStreetMapInput onLocationSelect={onLocationSelect} initialAddress={initialAddress} />;
};

export default MapInput;

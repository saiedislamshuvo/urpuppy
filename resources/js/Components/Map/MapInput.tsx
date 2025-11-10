import React from 'react';
import GoogleMapInput from './GoogleMapInput';
import OpenStreetMapInput from './OpenStreetMapInput';
import MapboxMapInput from './MapboxMapInput';

export interface LocationData {
  address: string;
  lat: number | null;
  lng: number | null;
  street: string;
  houseNo?: string;
  city: string;
  state: string;
  shortState: string;
  zipCode: string;
}

interface MapInputProps {
  onLocationSelect: (location: LocationData) => void;
  initialAddress?: string;
  initialLocation?: { lat: number | null; lng: number | null } | null;
  provider?: 'google' | 'mapbox' | 'openstreetmap' | 'none';
  skipInitialLocationSelect?: boolean; // If true, don't call onLocationSelect on initial load
}

const MapInput: React.FC<MapInputProps> = ({
  onLocationSelect,
  initialAddress,
  initialLocation,
  provider = 'openstreetmap',
  skipInitialLocationSelect = false,
}) => {
  // If provider is 'none', default to openstreetmap
  const mapProvider = provider === 'none' ? 'openstreetmap' : provider;

  switch (mapProvider) {
    case 'google':
      return (
        <GoogleMapInput
          onLocationSelect={onLocationSelect}
          initialAddress={initialAddress}
          initialLocation={initialLocation}
          skipInitialLocationSelect={skipInitialLocationSelect}
        />
      );
    case 'mapbox':
      return (
        <MapboxMapInput
          onLocationSelect={onLocationSelect}
          initialAddress={initialAddress}
          initialLocation={initialLocation}
          skipInitialLocationSelect={skipInitialLocationSelect}
        />
      );
    case 'openstreetmap':
    default:
      return (
        <OpenStreetMapInput
          onLocationSelect={onLocationSelect}
          initialAddress={initialAddress}
          initialLocation={initialLocation}
          skipInitialLocationSelect={skipInitialLocationSelect}
        />
      );
  }
};

export default MapInput;

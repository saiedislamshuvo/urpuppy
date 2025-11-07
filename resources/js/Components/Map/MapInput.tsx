import React from 'react';
import GoogleMapInput from './GoogleMapInput';
import OpenStreetMapInput from './OpenStreetMapInput';
import MapboxMapInput from './MapboxMapInput';

export interface LocationData {
  address: string;
  lat: number;
  lng: number;
  street: string;
  city: string;
  state: string;
  shortState: string;
  zipCode: string;
}

interface MapInputProps {
  onLocationSelect: (location: LocationData) => void;
  initialAddress?: string;
  initialLocation?: { lat: number; lng: number } | null;
  provider?: 'google' | 'mapbox' | 'openstreetmap' | 'none';
}

const MapInput: React.FC<MapInputProps> = ({
  onLocationSelect,
  initialAddress,
  initialLocation,
  provider = 'openstreetmap',
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
        />
      );
    case 'mapbox':
      return (
        <MapboxMapInput
          onLocationSelect={onLocationSelect}
          initialAddress={initialAddress}
          initialLocation={initialLocation}
        />
      );
    case 'openstreetmap':
    default:
      return (
        <OpenStreetMapInput
          onLocationSelect={onLocationSelect}
          initialAddress={initialAddress}
          initialLocation={initialLocation}
        />
      );
  }
};

export default MapInput;

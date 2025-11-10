<?php

namespace App\Filament\Forms\Components;

use Filament\Forms\Components\Field;

class MapboxLocationPicker extends Field
{
    protected string $view = 'filament.forms.components.mapbox-location-picker';

    protected float | \Closure | null $defaultLat = 37.7749;
    protected float | \Closure | null $defaultLng = -122.4194;
    protected int $zoom = 10;

    public function defaultLocation(float $lat, float $lng): static
    {
        $this->defaultLat = $lat;
        $this->defaultLng = $lng;

        return $this;
    }

    public function zoom(int $zoom): static
    {
        $this->zoom = $zoom;

        return $this;
    }

    public function getDefaultLat(): ?float
    {
        return $this->evaluate($this->defaultLat);
    }

    public function getDefaultLng(): ?float
    {
        return $this->evaluate($this->defaultLng);
    }

    public function getZoom(): int
    {
        return $this->zoom;
    }

    protected function setUp(): void
    {
        parent::setUp();

        // This component doesn't save its own state, it updates other fields
        $this->dehydrated(false);
    }
}


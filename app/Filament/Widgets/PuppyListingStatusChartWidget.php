<?php

namespace App\Filament\Widgets;

use App\Models\Puppy;
use Filament\Widgets\ChartWidget;

class PuppyListingStatusChartWidget extends ChartWidget
{
    protected static ?string $heading = 'Puppy Listing Status';

    protected static ?int $sort = 5;

    protected function getData(): array
    {
        $published = Puppy::where('status', 'published')->count();
        $draft = Puppy::where('status', 'draft')->count();
        $sold = Puppy::whereNotNull('sold_at')->count();
        $paused = Puppy::whereNotNull('paused_at')->count();

        return [
            'datasets' => [
                [
                    'label' => 'Listings',
                    'data' => [$published, $draft, $sold, $paused],
                    'backgroundColor' => [
                        'rgb(34, 197, 94)',  // Green for published
                        'rgb(107, 114, 128)', // Gray for draft
                        'rgb(59, 130, 246)', // Blue for sold
                        'rgb(234, 179, 8)',  // Yellow for paused
                    ],
                ],
            ],
            'labels' => ['Published', 'Draft', 'Sold', 'Paused'],
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}


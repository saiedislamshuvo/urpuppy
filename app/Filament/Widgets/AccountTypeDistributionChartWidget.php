<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\ChartWidget;

class AccountTypeDistributionChartWidget extends ChartWidget
{
    protected static ?string $heading = 'Account Type Distribution';

    protected static ?int $sort = 6;
    
    protected function getData(): array
    {
        $breeders = User::where('is_breeder', true)->count();
        $sellers = User::where('is_seller', true)
            ->where('is_breeder', false)
            ->count();
        $buyers = User::where('is_seller', false)
            ->where('is_breeder', false)
            ->where('is_admin', false)
            ->where('is_superadmin', false)
            ->count();

        return [
            'datasets' => [
                [
                    'data' => [$breeders, $sellers, $buyers],
                    'backgroundColor' => [
                        'rgb(249, 115, 22)', // Orange for breeders
                        'rgb(59, 130, 246)', // Blue for sellers
                        'rgb(234, 179, 8)',  // Yellow for buyers
                    ],
                ],
            ],
            'labels' => ['Breeders', 'Sellers', 'Buyers'],
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}


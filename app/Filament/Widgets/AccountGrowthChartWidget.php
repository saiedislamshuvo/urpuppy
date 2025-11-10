<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class AccountGrowthChartWidget extends ChartWidget
{
    protected static ?string $heading = 'Account Growth Over Time';

    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $months = [];
        $data = [];

        // Get last 6 months of data
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $months[] = $date->format('M Y');
            
            $count = User::whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();
            
            $data[] = $count;
        }

        return [
            'datasets' => [
                [
                    'label' => 'New Accounts',
                    'data' => $data,
                    'backgroundColor' => 'rgba(249, 115, 22, 0.2)',
                    'borderColor' => 'rgb(249, 115, 22)',
                    'fill' => true,
                ],
            ],
            'labels' => $months,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}


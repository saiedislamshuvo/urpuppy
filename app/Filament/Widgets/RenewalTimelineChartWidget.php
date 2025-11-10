<?php

namespace App\Filament\Widgets;

use App\Models\Subscription;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class RenewalTimelineChartWidget extends ChartWidget
{
    protected static ?string $heading = 'Upcoming Renewals (Next 90 Days)';

    protected static ?int $sort = 4;


    protected function getData(): array
    {
        $now = Carbon::now();
        $labels = [];
        $data = [];

        // Get renewals for next 90 days, grouped by week
        for ($i = 0; $i < 12; $i++) {
            $weekStart = $now->copy()->addWeeks($i)->startOfWeek();
            $weekEnd = $weekStart->copy()->endOfWeek();
            
            $labels[] = $weekStart->format('M d');
            
            $count = Subscription::whereIn('stripe_status', ['active', 'trialing'])
                ->whereNotNull('ends_at')
                ->whereBetween('ends_at', [$weekStart, $weekEnd])
                ->distinct('user_id')
                ->count('user_id');
            
            $data[] = $count;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Renewals',
                    'data' => $data,
                    'backgroundColor' => 'rgba(234, 179, 8, 0.2)',
                    'borderColor' => 'rgb(234, 179, 8)',
                    'fill' => true,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}


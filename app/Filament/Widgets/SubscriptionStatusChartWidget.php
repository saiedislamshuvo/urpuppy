<?php

namespace App\Filament\Widgets;

use App\Models\Subscription;
use Filament\Widgets\ChartWidget;

class SubscriptionStatusChartWidget extends ChartWidget
{
    protected static ?string $heading = 'Subscription Status Overview';

    protected static ?int $sort = 3;

    protected function getData(): array
    {
        $active = Subscription::where('stripe_status', 'active')->distinct('user_id')->count('user_id');
        $trialing = Subscription::where('stripe_status', 'trialing')->distinct('user_id')->count('user_id');
        $canceled = Subscription::where('stripe_status', 'canceled')->distinct('user_id')->count('user_id');
        $pastDue = Subscription::where('stripe_status', 'past_due')->distinct('user_id')->count('user_id');
        $unpaid = Subscription::where('stripe_status', 'unpaid')->distinct('user_id')->count('user_id');

        return [
            'datasets' => [
                [
                    'label' => 'Subscriptions',
                    'data' => [$active, $trialing, $canceled, $pastDue, $unpaid],
                    'backgroundColor' => [
                        'rgb(34, 197, 94)',  // Green for active
                        'rgb(59, 130, 246)', // Blue for trialing
                        'rgb(239, 68, 68)',  // Red for canceled
                        'rgb(234, 179, 8)',  // Yellow for past_due
                        'rgb(107, 114, 128)', // Gray for unpaid
                    ],
                ],
            ],
            'labels' => ['Active', 'Trialing', 'Canceled', 'Past Due', 'Unpaid'],
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}


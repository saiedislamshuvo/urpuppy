<?php

namespace App\Filament\Widgets;

use App\Models\BreederRequest;
use App\Models\User;
use Filament\Widgets\ChartWidget;

class BreederStatusChartWidget extends ChartWidget
{
    protected static ?string $heading = 'Breeder Account Status';

    protected static ?int $sort = 7;


    protected function getData(): array
    {
        $pending = User::where('is_breeder', true)
            ->whereHas('breeder_requests', function ($query) {
                $query->where('id', function ($subquery) {
                    $subquery->select('id')
                        ->from('breeder_requests')
                        ->whereColumn('breeder_requests.user_id', 'users.id')
                        ->orderByDesc('created_at')
                        ->limit(1);
                })->where('status', 'pending');
            })
            ->count();

        $approved = User::where('is_breeder', true)
            ->whereHas('breeder_requests', function ($query) {
                $query->where('id', function ($subquery) {
                    $subquery->select('id')
                        ->from('breeder_requests')
                        ->whereColumn('breeder_requests.user_id', 'users.id')
                        ->orderByDesc('created_at')
                        ->limit(1);
                })->where('status', 'approved');
            })
            ->count();

        $rejected = User::where('is_breeder', true)
            ->whereHas('breeder_requests', function ($query) {
                $query->where('id', function ($subquery) {
                    $subquery->select('id')
                        ->from('breeder_requests')
                        ->whereColumn('breeder_requests.user_id', 'users.id')
                        ->orderByDesc('created_at')
                        ->limit(1);
                })->where('status', 'rejected');
            })
            ->count();

        return [
            'datasets' => [
                [
                    'data' => [$pending, $approved, $rejected],
                    'backgroundColor' => [
                        'rgb(234, 179, 8)',  // Yellow for pending
                        'rgb(34, 197, 94)',  // Green for approved
                        'rgb(239, 68, 68)',  // Red for rejected
                    ],
                ],
            ],
            'labels' => ['Pending', 'Approved', 'Rejected'],
        ];
    }

    protected function getType(): string
    {
        return 'pie';
    }
}


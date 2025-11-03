<?php

namespace App\Filament\Breeder\Widgets;

use App\Models\Puppy;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Carbon\Carbon;

class BreederStat extends BaseWidget
{
    protected static string $view = 'filament.widgets.stats-overview-widget';
    protected int | string | array $columnSpan = 'full';
    protected function getStats(): array
    {
        $userId = auth()->id();

        // Get counts for different puppy statuses
        $totalPuppies = Puppy::where('user_id', $userId)->count();
        
        $publishedPuppies = Puppy::where('user_id', $userId)
            ->whereRaw("status = 'published'")
            ->count();
        
        $pendingPuppies = Puppy::where('user_id', $userId)
            ->whereRaw("status = 'draft'")
            ->count();
        
        // Consider puppies older than 6 months as expired
        $expiredPuppies = Puppy::where('user_id', $userId)
            ->where('created_at', '<', Carbon::now()->subMonths(6))
            ->count();

        return [
            Stat::make('Total Puppies', $totalPuppies)
                ->description('All your puppy listings')
                ->descriptionIcon('heroicon-m-squares-2x2')
                ->color('primary')
                ->chart([7, 3, 4, 5, 6, 3, 5]),
            
            Stat::make('Published Puppies', $publishedPuppies)
                ->description('Live and visible to buyers')
                ->descriptionIcon('heroicon-m-eye')
                ->color('success')
                ->chart([3, 2, 4, 5, 6, 5, 7]),
            
            Stat::make('Pending Puppies', $pendingPuppies)
                ->description('Drafts awaiting publication')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning')
                ->chart([2, 3, 2, 1, 3, 2, 1]),
            
            Stat::make('Expired Puppies', $expiredPuppies)
                ->description('Listings that are older')
                ->descriptionIcon('heroicon-m-x-circle')
                ->color('danger')
                ->chart([1, 1, 2, 1, 2, 3, 2]),
        ];
    }
}


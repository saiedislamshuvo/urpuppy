<?php

namespace App\Filament\Breeder\Pages;

use App\Filament\Clusters\DashboardCluster;
use Filament\Pages\Page;
use App\Filament\Breeder\Widgets\BreederStat;
use App\Filament\Breeder\Widgets\SubscriptionList;

class BreederDashboard extends Page
{
    protected static string $view = 'filament.breeder.pages.breeder-dashboard';

    protected static ?string $navigationLabel = 'Dashboard';

    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';

    protected static ?int $navigationSort = 1;

    protected static ?string $cluster = DashboardCluster::class;

    public function getHeaderWidgets(): array
    {
        return [
            BreederStat::class,
            SubscriptionList::class,
        ];
    }
}

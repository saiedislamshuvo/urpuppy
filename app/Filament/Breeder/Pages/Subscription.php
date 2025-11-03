<?php

namespace App\Filament\Breeder\Pages;

use App\Filament\Clusters\DashboardCluster;
use Filament\Pages\Page;
use App\Filament\Breeder\Widgets\SubscriptionList;

class Subscription extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-credit-card';
    protected static ?int $navigationSort = 5;

    protected static string $view = 'filament.breeder.pages.subscription';

    protected static ?string $cluster = DashboardCluster::class;

    public function getHeaderWidgets(): array
    {
        return [
            SubscriptionList::class,
        ];
    }
}

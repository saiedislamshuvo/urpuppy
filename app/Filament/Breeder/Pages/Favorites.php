<?php

namespace App\Filament\Breeder\Pages;

use App\Filament\Clusters\DashboardCluster;
use Filament\Pages\Page;

class Favorites extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-heart';
    protected static ?string $navigationLabel = 'Favorites';
    protected static ?int $navigationSort = 3;

    protected static string $view = 'filament.breeder.pages.favorites';
    
    protected static ?string $cluster = DashboardCluster::class;
}

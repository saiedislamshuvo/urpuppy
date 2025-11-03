<?php

namespace App\Filament\Breeder\Pages;

use App\Filament\Clusters\DashboardCluster;
use Filament\Pages\Page;

class Chat extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-bottom-center';
    protected static ?int $navigationSort = 4;
    protected static string $view = 'filament.breeder.pages.chat';

    protected static ?string $cluster = DashboardCluster::class;
}

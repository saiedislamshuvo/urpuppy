<?php

namespace App\Filament\Breeder\Pages;

use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Actions\Action;
use App\Models\Transaction;
use Carbon\Carbon;
use App\Filament\Breeder\Widgets\BreederStat;
use App\Filament\Breeder\Widgets\SubscriptionList;

class Dashboard extends BaseDashboard
{
    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';
    
    public function getWidgets(): array
    {
        return [
            BreederStat::class,
            SubscriptionList::class,
        ];
    }

}


<?php

namespace App\Filament\Resources\PlanResource\Pages;

use App\Filament\Resources\PlanResource;
use App\Services\StripePlanSyncService;
use Filament\Actions\Action;
use Filament\Actions\CreateAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ListRecords;

class ListPlans extends ListRecords
{
    protected static string $resource = PlanResource::class;

    public function reorderTable(array $order): void
    {
        static::getResource()::getModel()::setNewOrder($order);
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('sync_from_stripe')
                ->label('Sync from Stripe')
                ->icon('heroicon-o-arrow-path-rounded-square')
                ->color('warning')
                ->requiresConfirmation()
                ->modalHeading('Import Plans from Stripe')
                ->modalDescription('This will sync all plans from Stripe to your database. Existing plans will be updated.')
                ->action(function (StripePlanSyncService $syncService) {
                    $results = $syncService->syncFromStripe();
                    
                    Notification::make()
                        ->title('Stripe sync completed')
                        ->body("Created: {$results['created']}, Updated: {$results['updated']}")
                        ->success()
                        ->send();
                }),
            CreateAction::make(),
        ];
    }
}

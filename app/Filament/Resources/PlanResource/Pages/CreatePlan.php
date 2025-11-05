<?php

namespace App\Filament\Resources\PlanResource\Pages;

use App\Filament\Resources\PlanResource;
use App\Services\StripePlanSyncService;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;

class CreatePlan extends CreateRecord
{
    protected static string $resource = PlanResource::class;

    protected function afterCreate(): void
    {
        $plan = $this->record;
        $syncService = app(StripePlanSyncService::class);
        
        $success = $syncService->syncToStripe($plan);
        
        if ($success) {
            Notification::make()
                ->title('Plan created and synced to Stripe successfully')
                ->success()
                ->send();
        } else {
            Notification::make()
                ->title('Plan created, but Stripe sync failed')
                ->body($plan->sync_error ?? 'Unknown error')
                ->warning()
                ->send();
        }
    }
}

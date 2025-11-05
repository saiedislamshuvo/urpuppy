<?php

namespace App\Filament\Resources\PlanResource\Pages;

use App\Filament\Resources\PlanResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPlan extends EditRecord
{
    protected static string $resource = PlanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        // Handle trial_days - if not in predefined options, set to custom
        $predefinedTrialDays = [0, 1, 2, 3, 5, 7, 10, 15];
        if (isset($data['trial_days']) && !in_array((int)$data['trial_days'], $predefinedTrialDays)) {
            $data['trial_days_custom'] = (int)$data['trial_days'];
            $data['trial_days'] = 'custom';
        } else {
            $data['trial_days'] = (string)($data['trial_days'] ?? '0');
        }

        // Handle listing_limit - if not in predefined options, set to custom
        $predefinedListingLimits = [10, 25, 50, 100, 200];
        if (isset($data['listing_limit'])) {
            if ($data['listing_limit'] === null) {
                $data['listing_limit'] = 'unlimited';
            } elseif (!in_array((int)$data['listing_limit'], $predefinedListingLimits)) {
                $data['listing_limit_custom'] = (int)$data['listing_limit'];
                $data['listing_limit'] = 'custom';
            } else {
                $data['listing_limit'] = (string)$data['listing_limit'];
            }
        } else {
            $data['listing_limit'] = 'unlimited';
        }

        // Convert image_per_listing and video_per_listing to strings for radio buttons
        if (isset($data['image_per_listing'])) {
            $data['image_per_listing'] = $data['image_per_listing'] === null ? 'unlimited' : (string)$data['image_per_listing'];
        }
        if (isset($data['video_per_listing'])) {
            $data['video_per_listing'] = $data['video_per_listing'] === null ? 'unlimited' : (string)$data['video_per_listing'];
        }

        return $data;
    }
}

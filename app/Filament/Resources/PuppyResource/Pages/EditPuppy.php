<?php

namespace App\Filament\Resources\PuppyResource\Pages;

use App\Filament\Resources\PuppyResource;
use App\Models\State;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPuppy extends EditRecord
{
    protected static string $resource = PuppyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $state = State::find($data['state_id']);
        if ($state) {
            $data['state'] = $state->name;
            $data['short_state'] = $state->abbreviation;
        }

        return $data;
    }
}

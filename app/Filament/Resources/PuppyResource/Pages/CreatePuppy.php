<?php

namespace App\Filament\Resources\PuppyResource\Pages;

use App\Models\State;
use App\Filament\Resources\PuppyResource;
use Filament\Resources\Pages\CreateRecord;

class CreatePuppy extends CreateRecord
{
    protected static string $resource = PuppyResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $state = State::find($data['state_id']);
        if ($state) {
            $data['state'] = $state->name;
            $data['short_state'] = $state->abbreviation;
        }

        return $data;
    }
}

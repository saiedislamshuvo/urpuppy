<?php

namespace App\Filament\Breeder\Resources\PuppyResource\Pages;

use App\Filament\Breeder\Resources\PuppyResource;
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
}

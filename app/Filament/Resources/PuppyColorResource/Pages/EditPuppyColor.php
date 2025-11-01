<?php

namespace App\Filament\Resources\PuppyColorResource\Pages;

use App\Filament\Resources\PuppyColorResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPuppyColor extends EditRecord
{
    protected static string $resource = PuppyColorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

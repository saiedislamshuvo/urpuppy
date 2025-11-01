<?php

namespace App\Filament\Resources\PuppyPatternResource\Pages;

use App\Filament\Resources\PuppyPatternResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPuppyPattern extends EditRecord
{
    protected static string $resource = PuppyPatternResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

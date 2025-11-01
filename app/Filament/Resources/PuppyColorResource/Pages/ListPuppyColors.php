<?php

namespace App\Filament\Resources\PuppyColorResource\Pages;

use App\Filament\Resources\PuppyColorResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPuppyColors extends ListRecords
{
    protected static string $resource = PuppyColorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}

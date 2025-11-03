<?php

namespace App\Filament\Breeder\Resources\PuppyResource\Pages;

use App\Filament\Breeder\Resources\PuppyResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPuppies extends ListRecords
{
    protected static string $resource = PuppyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}

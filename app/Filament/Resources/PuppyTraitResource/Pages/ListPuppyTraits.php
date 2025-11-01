<?php

namespace App\Filament\Resources\PuppyTraitResource\Pages;

use App\Filament\Resources\PuppyTraitResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPuppyTraits extends ListRecords
{
    protected static string $resource = PuppyTraitResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}

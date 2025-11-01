<?php

namespace App\Filament\Resources\PuppyPatternResource\Pages;

use App\Filament\Resources\PuppyPatternResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPuppyPatterns extends ListRecords
{
    protected static string $resource = PuppyPatternResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}

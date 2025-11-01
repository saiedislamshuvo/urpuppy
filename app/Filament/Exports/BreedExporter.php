<?php

namespace App\Filament\Exports;

use App\Models\Breed;
use Filament\Actions\Exports\ExportColumn;
use Filament\Actions\Exports\Exporter;
use Filament\Actions\Exports\Models\Export;

class BreedExporter extends Exporter
{
    protected static ?string $model = Breed::class;

    public static function getColumns(): array
    {
        return [
            ExportColumn::make('id')
                ->label('ID'),
            ExportColumn::make('name'),
            ExportColumn::make('slug'),
            ExportColumn::make('description'),
            ExportColumn::make('min_life'),
            ExportColumn::make('max_life'),
            ExportColumn::make('male_weight_max'),
            ExportColumn::make('male_weight_min'),
            ExportColumn::make('female_weight_max'),
            ExportColumn::make('female_weight_min'),
            ExportColumn::make('content'),
            ExportColumn::make('history_description'),
            ExportColumn::make('size_description'),
            ExportColumn::make('coat_description'),
            ExportColumn::make('temperament_description'),
            ExportColumn::make('lifestyle_description'),
            ExportColumn::make('activities_description'),
            ExportColumn::make('hypoallergenic'),
            ExportColumn::make('created_at'),
            ExportColumn::make('updated_at'),
        ];
    }

    public static function getCompletedNotificationBody(Export $export): string
    {
        $body = 'Your breed export has completed and '.number_format($export->successful_rows).' '.str('row')->plural($export->successful_rows).' exported.';

        if ($failedRowsCount = $export->getFailedRowsCount()) {
            $body .= ' '.number_format($failedRowsCount).' '.str('row')->plural($failedRowsCount).' failed to export.';
        }

        return $body;
    }
}

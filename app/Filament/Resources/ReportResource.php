<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReportResource\Pages;
use App\Models\Report;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class ReportResource extends Resource
{
    protected static ?string $model = Report::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function getNavigationGroup(): ?string
    {
        return 'Messages'; // This will group the resource under "Content"
    }


    public static function canCreate(): bool
    {
        return false;
    }

    public static function canEdit(Model $record): bool
    {
        return false;
    }

    /* public static function form(Form $form): Form */
    /* { */
    /*     return $form */
    /*         ->schema([ */
    /*             Forms\Components\TextInput::make('puppy_id') */
    /*                 ->required() */
    /*                 ->numeric(), */
    /*             Forms\Components\Textarea::make('reason') */
    /*                 ->required() */
    /*                 ->columnSpanFull(), */
    /*             Forms\Components\TextInput::make('user_id') */
    /*                 ->required() */
    /*                 ->numeric(), */
    /*         ]); */
    /* } */

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('puppy.name')
                    ->url(fn (Report $record): string => route('puppies.show', $record?->puppy?->slug ?? 'none'))
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.full_name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->mutateRecordDataUsing(function ($data) {

                        return $data;

                    })
                    ->form([])
                    ->modalContent(function (Tables\Actions\ViewAction $action) {
                        $record = $action->getRecord();

                        return view('filament.pages.reports.view', [
                            'report' => $record->toArray(),
                        ]);
                    }),

                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                            Tables\Actions\BulkActionGroup::make([
                                Tables\Actions\DeleteBulkAction::make(),
                            ]),
                        ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListReports::route('/'),
            /* 'create' => Pages\CreateReport::route('/create'), */
            /* 'view' => Pages\ViewUser::route('/{record}'), */
            /* 'edit' => Pages\EditReport::route('/{record}/edit'), */
        ];
    }
}

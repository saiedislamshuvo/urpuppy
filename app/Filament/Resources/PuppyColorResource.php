<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PuppyColorResource\Pages;
use App\Models\PuppyColor;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ColorColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class PuppyColorResource extends Resource
{
    protected static ?string $model = PuppyColor::class;

    protected static ?string $navigationIcon = 'phosphor-palette';

    public static function getNavigationSort(): ?int
    {
        return 4;
    }

    public static function getNavigationGroup(): ?string
    {
        return 'UrPuppy'; // This will group the resource under "Content"
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name'),
                ColorPicker::make('color'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name'),
                ColorColumn::make('color'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()->slideOver(),
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
            'index' => Pages\ListPuppyColors::route('/'),
            /* 'create' => Pages\CreatePuppyColor::route('/create'), */
            /* 'edit' => Pages\EditPuppyColor::route('/{record}/edit'), */
        ];
    }
}

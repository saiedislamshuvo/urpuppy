<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PuppyPatternResource\Pages;
use App\Models\PuppyPattern;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PuppyPatternResource extends Resource
{
    protected static ?string $model = PuppyPattern::class;

    protected static ?string $navigationIcon = 'phosphor-cube-transparent';
    protected static ?string $navigationLabel = 'Puppy Coat';


    public static function getNavigationSort(): ?int
    {
        return 3;
    }

    public static function getNavigationGroup(): ?string
    {
        return 'UrPuppy'; // This will group the resource under "Content"
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
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
            'index' => Pages\ListPuppyPatterns::route('/'),
            /* 'create' => Pages\CreatePuppyPattern::route('/create'), */
            /* 'edit' => Pages\EditPuppyPattern::route('/{record}/edit'), */
        ];
    }
}

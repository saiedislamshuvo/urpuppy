<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BreederRequestResource\Pages;
use App\Models\BreederRequest;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BreederRequestResource extends Resource
{
    protected static ?string $model = BreederRequest::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                /* Forms\Components\TextInput::make('user_id') */
                /*     ->required() */
                /*     ->numeric(), */
                Forms\Components\Select::make('status')->options([
                    'pending' => 'Pending',
                    'rejected' => 'rejected',
                    'approved' => 'Approved',
                ]),
                /* Forms\Components\TextInput::make('status') */
                /*     ->required() */
                /*     ->maxLength(255), */
                Forms\Components\TextInput::make('message')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public static function getNavigationGroup(): ?string
    {
        return 'Messages'; // This will group the resource under "Content"
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.full_name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')->badge()
                    ->searchable(),
                Tables\Columns\TextColumn::make('message')
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])->defaultSort('created_at', 'desc')
            ->filters([
                //
            ])
            ->actions([
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
            'index' => Pages\ListBreederRequests::route('/'),
            'create' => Pages\CreateBreederRequest::route('/create'),
            'edit' => Pages\EditBreederRequest::route('/{record}/edit'),
        ];
    }
}

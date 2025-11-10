<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BreederRequestResource\Pages;
use App\Models\BreederRequest;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class BreederRequestResource extends Resource
{
    protected static ?string $model = BreederRequest::class;

    protected static ?string $navigationIcon = 'heroicon-o-square-2-stack';


    public static function getNavigationSort(): ?int
    {
        return 6;
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('status', 'pending')->count();
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->with('user');
    }

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
                    ->label('User Name')
                    ->searchable()
                    ->sortable()
                    ->url(fn ($record): string => $record->user?->slug ? route('breeders.show', $record->user->slug) : '#')
                    ->openUrlInNewTab(),
                Tables\Columns\TextColumn::make('user.email')
                    ->label('Email')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('user.phone')
                    ->label('Phone')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('user.kennel_name')
                    ->label('Kennel Name')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('user.company_name')
                    ->label('Company Name')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('user.company_phone')
                    ->label('Company Phone')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('user.company_email_address')
                    ->label('Company Email')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('user.company_city')
                    ->label('City')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('user.company_state')
                    ->label('State')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'approved' => 'success',
                        'rejected' => 'danger',
                        default => 'gray',
                    })
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('message')
                    ->searchable()
                    ->limit(50)
                    ->tooltip(fn ($record): string => $record->message),
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
                Tables\Actions\ViewAction::make(),
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
            'view' => Pages\ViewBreederRequest::route('/{record}'),
            'edit' => Pages\EditBreederRequest::route('/{record}/edit'),
        ];
    }
}

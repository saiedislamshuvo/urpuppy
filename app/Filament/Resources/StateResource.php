<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StateResource\Pages;
use App\Filament\Resources\StateResource\RelationManagers;
use App\Models\Country;
use App\Models\State;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class StateResource extends Resource
{
    protected static ?string $model = State::class;

    protected static ?string $navigationIcon = 'heroicon-o-map-pin';

    protected static ?string $navigationLabel = 'States';

    protected static ?string $modelLabel = 'State';

    protected static ?string $pluralModelLabel = 'States';

    protected static ?string $recordTitleAttribute = 'name';


    public static function getNavigationGroup(): ?string
    {
        return 'System'; // This will group the resource under "Content"
    }

    public static function getNavigationSort(): ?int
    {
        return 12;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('State Information')
                    ->description('Enter the details about the state or province')
                    ->icon('heroicon-o-map-pin')
                    ->schema([
                        Forms\Components\Grid::make(2)
                            ->schema([
                                Forms\Components\Select::make('country_id')
                                    ->label('Country')
                                    ->relationship('country', 'name')
                                    ->required()
                                    ->searchable()
                                    ->preload()
                                    ->native(false)
                                    ->placeholder('Select a country')
                                    ->helperText('Choose the country this state belongs to')
                                    ->default(fn () => Country::first()?->id)
                                    ->live()
                                    ->afterStateUpdated(function (Set $set, $state) {
                                        if ($state) {
                                            $country = Country::find($state);
                                            if ($country) {
                                                $set('country_code', $country->iso3 ?? 'USA');
                                            }
                                        }
                                    })
                                    ->columnSpan(1),
                                
                                Forms\Components\TextInput::make('name')
                                    ->label('State Name')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('e.g., California, Ontario, New South Wales')
                                    ->helperText('Enter the full name of the state or province')
                                    ->columnSpan(1),
                            ]),
                        
                        Forms\Components\Grid::make(2)
                            ->schema([
                                Forms\Components\TextInput::make('country_code')
                                    ->label('Country Code')
                                    ->maxLength(3)
                                    ->default(function (Get $get, $record) {
                                        // If editing existing record, use its country
                                        if ($record && $record->country) {
                                            return $record->country->iso3 ?? 'USA';
                                        }
                                        // If creating new, use selected country or first country
                                        $countryId = $get('country_id');
                                        if ($countryId) {
                                            $country = Country::find($countryId);
                                            return $country?->iso3 ?? 'USA';
                                        }
                                        return Country::first()?->iso3 ?? 'USA';
                                    })
                                    ->placeholder('e.g., USA, CAN, AUS')
                                    ->helperText('ISO country code (automatically filled from selected country, but can be edited)')
                                    ->columnSpan(1),
                                
                                Forms\Components\TextInput::make('abbreviation')
                                    ->label('State Abbreviation')
                                    ->maxLength(10)
                                    ->placeholder('e.g., CA, ON, NSW')
                                    ->helperText('Common abbreviation or postal code for the state')
                                    ->columnSpan(1),
                            ]),
                    ])
                    ->columns(2)
                    ->collapsible(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('country.name')
                    ->label('Country')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('primary'),
                
                Tables\Columns\TextColumn::make('name')
                    ->label('State Name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                
                Tables\Columns\TextColumn::make('country_code')
                    ->label('Country Code')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('gray'),
                
                Tables\Columns\TextColumn::make('abbreviation')
                    ->label('Abbreviation')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('success'),
                
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Updated')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('country_id')
                    ->label('Country')
                    ->relationship('country', 'name')
                    ->searchable()
                    ->preload(),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\DeleteAction::make(),
                ])->iconButton(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('name', 'asc')
            ->emptyStateHeading('No states found')
            ->emptyStateDescription('Create your first state to get started.')
            ->emptyStateIcon('heroicon-o-map-pin');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageStates::route('/'),
        ];
    }
}

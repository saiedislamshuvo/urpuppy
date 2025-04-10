<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PuppyResource\Pages\CreatePuppy;
use App\Filament\Resources\PuppyResource\Pages\EditPuppy;
use App\Filament\Resources\PuppyResource\Pages\ListPuppies;
use App\Models\Puppy;
use App\PuppyStatus;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class PuppyResource extends Resource
{
    protected static ?string $model = Puppy::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function getNavigationGroup(): ?string
    {
        return 'UrPuppy'; // This will group the resource under "Content"
    }

    public static function canEdit(Model $record): bool
    {
        return false;
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getNavigationSort(): ?int
    {
        return -2;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Checkbox::make('is_featured')->label('Is featured'),
                TextInput::make('name'),
                Select::make('status')->enum(PuppyStatus::class)->options([
                    'published' => 'Published',
                    'draft' => 'Draft',
                ]),

                /* Select::make('breed_id') */
                /* ->relationship(name: 'breed', titleAttribute: 'name')->searchable(), */
                /* SpatieMediaLibraryFileUpload::make('image') */
                /*     ->collection('media'), */
                /* DatePicker::make('birth_date') */
                /*     ->required() */
                /*     ->maxDate(now()), */
                /* Checkbox::make('is_ready_to_travel'), */

                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->searchable()->sortable()->url(function ($record) {
                    return route('puppies.show', $record?->slug);
                })->openUrlInNewTab()->color('primary'),
                TextColumn::make('price')->money()->searchable()->sortable(),
                TextColumn::make('seller.full_name')
                    ->searchable(true, function ($query, $search) {
                        $query->whereHas('seller', function ($query) use ($search) {
                            $query->where(function ($q) use ($search) {
                                $q->where('first_name', 'like', "%{$search}%")
                                    ->orWhere('last_name', 'like', "%{$search}%");
                            });

                        });

                    })
                    ->sortable('first_name'),

                ToggleColumn::make('status')
                    ->label('Published'),
                TextColumn::make('is_featured'),
                TextColumn::make('gender')->searchable(),

            ])
            ->filters([
                //
            ])
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])->defaultSort('created_at', 'desc');
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
            'index' => ListPuppies::route('/'),
            'create' => CreatePuppy::route('/create'),
            'edit' => EditPuppy::route('/{record}/edit'),
        ];
    }
}

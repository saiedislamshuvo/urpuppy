<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PuppyResource\Pages\CreatePuppy;
use App\Filament\Resources\PuppyResource\Pages\EditPuppy;
use App\Filament\Resources\PuppyResource\Pages\ListPuppies;
use App\Models\Puppy;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Group;
use Filament\Resources\Resource;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class PuppyResource extends Resource
{
    protected static ?string $model = Puppy::class;

    protected static ?string $navigationIcon = 'phosphor-dog';

    protected static ?string $navigationLabel = 'Puppies List';

    protected static ?string $modelLabel = 'Puppy';

    protected static ?string $pluralModelLabel = 'Puppies';

    protected static ?string $recordTitleAttribute = 'name';

    public static function getNavigationGroup(): ?string
    {
        return 'UrPuppy';
    }
     public static function getNavigationSort(): ?int
    {
        return 1 ;
    }


    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return static::getModel()::count() > 50 ? 'success' : 'primary';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Group::make()
                    ->schema([
                        Section::make('Basic Information')
                            ->description('Enter the core details about the puppy')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('name')
                                            ->required()
                                            ->maxLength(255)
                                            ->label('Puppy Name')
                                            ->placeholder('e.g., Max, Bella, Charlie')
                                            ->helperText('Enter a unique and memorable name for the puppy')
                                            ->columnSpan(1),
                                        
                                        Select::make('gender')
                                            ->required()
                                            ->options([
                                                'male' => 'Male',
                                                'female' => 'Female',
                                            ])
                                            ->native(false)
                                            ->label('Gender')
                                            ->placeholder('Select gender')
                                            ->columnSpan(1),
                                    ]),
                                
                                Grid::make(2)
                                    ->schema([
                                        DatePicker::make('birth_date')
                                            ->required()
                                            ->maxDate(now())
                                            ->native(false)
                                            ->displayFormat('M d, Y')
                                            ->label('Birth Date')
                                            ->helperText('Puppies must be at least 8 weeks old before leaving')
                                            ->columnSpan(1),
                                        
                                        TextInput::make('price')
                                            ->required()
                                            ->numeric()
                                            ->prefix('$')
                                            ->label('Price')
                                            ->placeholder('0')
                                            ->minValue(0)
                                            ->helperText('Enter price in dollars')
                                            ->columnSpan(1),
                                    ]),
                            ])
                            ->collapsible(),
                        
                        Section::make('Description')
                            ->description('Provide detailed information about the puppy')
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                Textarea::make('description')
                                    ->rows(6)
                                    ->maxLength(65535)
                                    ->label('Puppy Description')
                                    ->placeholder('Describe the puppy\'s personality, temperament, training, and any other notable characteristics...')
                                    ->helperText('A detailed description helps potential buyers make informed decisions'),
                            ])
                            ->collapsible(),
                        
                        Section::make('Breeds & Characteristics')
                            ->description('Define the breed(s) and physical characteristics')
                            ->icon('heroicon-o-sparkles')
                            ->schema([
                                Select::make('breeds')
                                    ->relationship(name: 'breeds', titleAttribute: 'name')
                                    ->multiple()
                                    ->searchable()
                                    ->preload()
                                    ->label('Breeds')
                                    ->placeholder('Select one or more breeds')
                                    ->helperText('Select all applicable breeds for mixed breeds')
                                    ->columnSpanFull(),
                                
                                Grid::make(3)
                                    ->schema([
                                        Select::make('puppy_colors')
                                            ->relationship(name: 'puppy_colors', titleAttribute: 'name')
                                            ->multiple()
                                            ->searchable()
                                            ->preload()
                                            ->label('Colors')
                                            ->placeholder('Select colors')
                                            ->columnSpan(1),
                                        
                                        Select::make('puppy_patterns')
                                            ->relationship(name: 'puppy_patterns', titleAttribute: 'name')
                                            ->multiple()
                                            ->searchable()
                                            ->preload()
                                            ->label('Patterns')
                                            ->placeholder('Select patterns')
                                            ->columnSpan(1),
                                        
                                        Select::make('puppy_traits')
                                            ->relationship(name: 'puppy_traits', titleAttribute: 'name')
                                            ->multiple()
                                            ->searchable()
                                            ->preload()
                                            ->label('Traits')
                                            ->placeholder('Select traits')
                                            ->columnSpan(1),
                                    ]),
                            ])
                            ->collapsible(),
                        
                        Section::make('Media')
                            ->description('Upload photos and videos of the puppy')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                SpatieMediaLibraryFileUpload::make('puppy_files')
                                    ->collection('puppy_files')
                                    ->multiple()
                                    ->reorderable()
                                    ->maxFiles(10)
                                    ->label('Images')
                                    ->image()
                                    ->imageEditor()
                                    ->imageEditorAspectRatios([
                                        null,
                                        '16:9',
                                        '4:3',
                                        '1:1',
                                    ])
                                    ->maxSize(5120)
                                    ->helperText('Upload up to 10 high-quality images. Drag to reorder. Max 5MB per image.')
                                    ->columnSpanFull(),
                                
                                SpatieMediaLibraryFileUpload::make('video')
                                    ->collection('video')
                                    ->label('Video')
                                    ->acceptedFileTypes(['video/*'])
                                    ->maxSize(51200)
                                    ->helperText('Optional: Upload a video showcasing the puppy. Max 50MB.')
                                    ->columnSpanFull(),
                            ])
                            ->collapsible(),
                    ])
                    ->columnSpan(['lg' => 2]),
                
                Group::make()
                    ->schema([
                        Section::make('Seller Information')
                            ->icon('heroicon-o-user')
                            ->schema([
                                Select::make('user_id')
                                    ->relationship(name: 'seller', titleAttribute: 'email')
                                    ->searchable(['email', 'first_name', 'last_name'])
                                    ->required()
                                    ->label('Seller')
                                    ->placeholder('Search by email or name')
                                    ->helperText('Select the seller/breeder')
                                    ->getOptionLabelFromRecordUsing(fn ($record) => $record->full_name . ' (' . $record->email . ')'),
                            ]),
                        
                        Section::make('Status & Visibility')
                            ->icon('heroicon-o-eye')
                            ->schema([
                                Toggle::make('status')
                                    ->label('Published')
                                    ->default(true)
                                    ->helperText('Make this listing visible to the public')
                                    ->inline(false),
                                
                                Toggle::make('is_featured')
                                    ->label('Featured Listing')
                                    ->default(false)
                                    ->helperText('Show this puppy in featured sections')
                                    ->inline(false),
                            ]),
                        
                        Section::make('Health & Care')
                            ->icon('heroicon-o-heart')
                            ->description('Health and care certifications')
                            ->schema([
                                Toggle::make('has_health_certificate')
                                    ->label('Health Certificate')
                                    ->default(false)
                                    ->inline(false),
                                
                                Toggle::make('has_vaccine')
                                    ->label('Vaccinated')
                                    ->default(false)
                                    ->inline(false),
                                
                                Toggle::make('has_vet_exam')
                                    ->label('Vet Examination')
                                    ->default(false)
                                    ->inline(false),
                                
                                Toggle::make('has_travel_ready')
                                    ->label('Travel Ready')
                                    ->default(false)
                                    ->helperText('Has all documents for travel')
                                    ->inline(false),
                                
                                Toggle::make('has_delivery_included')
                                    ->label('Delivery Included')
                                    ->default(false)
                                    ->helperText('Seller offers delivery service')
                                    ->inline(false),
                            ]),
                    ])
                    ->columnSpan(['lg' => 1]),
            ])
            ->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->label('Image')
                    ->circular()
                    ->defaultImageUrl(asset('paw.svg')),
                    
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->url(function ($record) {
                    return route('puppies.show', $record?->slug);
                    })
                    ->openUrlInNewTab()
                    ->color('primary')
                    ->weight('bold'),
                
                TextColumn::make('breeds.name')
                    ->searchable()
                    ->badge()
                    ->separator(',')
                    ->limit(20),
                
                TextColumn::make('gender')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'male' => 'info',
                        'female' => 'warning',
                        default => 'gray',
                    }),
                
                TextColumn::make('price')
                    ->money('USD')
                    ->searchable()
                    ->sortable(),
                
                TextColumn::make('age')
                    ->label('Age')
                    ->sortable(query: function (Builder $query, string $direction): Builder {
                        return $query->orderBy('birth_date', $direction === 'asc' ? 'desc' : 'asc');
                    }),
                
                TextColumn::make('seller.full_name')
                    ->searchable(true, function ($query, $search) {
                        $query->whereHas('seller', function ($query) use ($search) {
                            $query->where(function ($q) use ($search) {
                                $q->where('first_name', 'like', "%{$search}%")
                                    ->orWhere('last_name', 'like', "%{$search}%")
                                    ->orWhere('email', 'like', "%{$search}%");
                            });
                        });
                    })
                    ->sortable('first_name')
                    ->label('Seller'),
                
                IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured')
                    ->sortable(),

                ToggleColumn::make('status')
                    ->label('Published'),
                
                IconColumn::make('has_vaccine')
                    ->boolean()
                    ->label('Vaccinated'),
                
                IconColumn::make('has_health_certificate')
                    ->boolean()
                    ->label('Health Cert'),
                
                TextColumn::make('view_count')
                    ->label('Views')
                    ->sortable()
                    ->numeric(),
                
                // TextColumn::make('created_at')
                //     ->dateTime()
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),
                
                // TextColumn::make('updated_at')
                //     ->dateTime()
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('gender')
                    ->options([
                        'male' => 'Male',
                        'female' => 'Female',
                    ]),
                
                TernaryFilter::make('status')
                    ->label('Published')
                    ->boolean()
                    ->trueLabel('Published only')
                    ->falseLabel('Draft only')
                    ->native(false),
                
                TernaryFilter::make('is_featured')
                    ->label('Featured')
                    ->boolean()
                    ->trueLabel('Featured only')
                    ->falseLabel('Not featured')
                    ->native(false),
                
                SelectFilter::make('breeds')
                    ->relationship('breeds', 'name')
                    ->searchable()
                    ->preload()
                    ->multiple(),
                
                TernaryFilter::make('has_vaccine')
                    ->label('Vaccinated')
                    ->boolean(),
                
                TernaryFilter::make('has_health_certificate')
                    ->label('Health Certificate')
                    ->boolean(),
                
                TernaryFilter::make('has_vet_exam')
                    ->label('Vet Exam')
                    ->boolean(),
                
                Filter::make('price')
                    ->form([
                        TextInput::make('price_from')
                            ->numeric()
                            ->prefix('$'),
                        TextInput::make('price_to')
                            ->numeric()
                            ->prefix('$'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['price_from'],
                                fn (Builder $query, $price): Builder => $query->where('price', '>=', $price),
                            )
                            ->when(
                                $data['price_to'],
                                fn (Builder $query, $price): Builder => $query->where('price', '<=', $price),
                            );
                    }),
            ])
            ->actions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
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

<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PlanResource\Pages\CreatePlan;
use App\Filament\Resources\PlanResource\Pages\EditPlan;
use App\Filament\Resources\PlanResource\Pages\ListPlans;
use App\Models\Plan;
use App\Services\StripePlanSyncService;
use Filament\Forms\Components\Actions;
use Filament\Forms\Components\Actions\Action as FormAction;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Grid;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables\Actions\Action;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Pelmered\FilamentMoneyField\Forms\Components\MoneyInput;

class PlanResource extends Resource
{
    protected static ?string $model = Plan::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function getNavigationGroup(): ?string
    {
        return 'Stripe';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Grid::make(12)
                    ->schema([
                        Section::make('Stripe Sync Status')
                            ->description('Automatically synced with Stripe. Click sync to update.')
                            ->schema([
                                Grid::make(3)
                                    ->schema([
                                        Placeholder::make('sync_status')
                                            ->label('Sync Status')
                                            ->content(fn(?Plan $record) => $record?->is_synced 
                                                ? '✅ Synced with Stripe' 
                                                : '❌ Not synced')
                                            ->visible(fn($livewire) => $livewire instanceof EditPlan),
                                        
                                        Placeholder::make('last_synced_at')
                                            ->label('Last Synced')
                                            ->content(fn(?Plan $record) => $record?->last_synced_at?->diffForHumans() ?? 'Never')
                                            ->visible(fn($livewire) => $livewire instanceof EditPlan),
                                        
                                        Actions::make([
                                            FormAction::make('sync_to_stripe')
                                                ->label('Sync to Stripe')
                                                ->icon('heroicon-o-arrow-path')
                                                ->color('primary')
                                                ->requiresConfirmation()
                                                ->modalHeading('Sync Plan to Stripe')
                                                ->modalDescription('This will sync this plan to Stripe. Continue?')
                                                ->action(function (Plan $record, StripePlanSyncService $syncService) {
                                                    $success = $syncService->syncToStripe($record);
                                                    
                                                    if ($success) {
                                                        Notification::make()
                                                            ->title('Plan synced successfully')
                                                            ->success()
                                                            ->send();
                                                        
                                                        return redirect()->route('filament.admin.resources.plans.edit', $record);
                                                    } else {
                                                        Notification::make()
                                                            ->title('Sync failed')
                                                            ->body($record->sync_error ?? 'Unknown error')
                                                            ->danger()
                                                            ->send();
                                                    }
                                                })
                                                ->visible(fn($livewire) => $livewire instanceof EditPlan),
                                        ])
                                            ->alignEnd(),
                                    ]),
                                
                                Placeholder::make('sync_error')
                                    ->label('Sync Error')
                                    ->content(fn(?Plan $record) => $record?->sync_error ?? 'No errors')
                                    ->visible(fn(?Plan $record) => !empty($record?->sync_error))
                                    ->extraAttributes([
                                        'class' => 'text-danger-600 dark:text-danger-400',
                                    ])
                                    ->columnSpanFull(),
                                
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('stripe_plan_id')
                                            ->label('Stripe Price ID')
                                            ->disabled()
                                            ->dehydrated(false)
                                            ->helperText('Auto-generated by Stripe')
                                            ->visible(fn($livewire) => $livewire instanceof EditPlan),
                                        
                                        TextInput::make('stripe_product_id')
                                            ->label('Stripe Product ID')
                                            ->disabled()
                                            ->dehydrated(false)
                                            ->helperText('Auto-generated by Stripe')
                                            ->visible(fn($livewire) => $livewire instanceof EditPlan),
                                    ])
                                    ->visible(fn($livewire) => $livewire instanceof EditPlan),
                            ])
                            ->collapsible()
                            ->columnSpan(5),

                        Section::make('Plan Information')
                            ->description('Essential plan information')
                            ->schema([
                                TextInput::make('name')
                                    ->required()
                                    ->maxLength(255)
                                    ->columnSpanFull(),
                                
                                MoneyInput::make('price')
                                    ->required()
                                    ->default(0),
                                
                                Select::make('type')
                                    ->options([
                                        'breeder' => 'Breeder',
                                        'seller' => 'Seller',
                                    ])
                                    ->default('seller')
                                    ->required(),
                            ])
                            ->columns(2)
                            ->collapsible()
                            ->collapsed(false)
                            ->columnSpan(7),
                    ]),

                Grid::make(2)
                    ->schema([
                        Section::make('Billing & Trial')
                            ->description('Billing cycle and trial period settings')
                            ->schema([
                                Select::make('interval')
                                    ->label('Billing Interval')
                                    ->options([
                                        'month' => 'Monthly',
                                        'year' => 'Yearly',
                                        'quarter' => 'Quarterly',
                                    ])
                                    ->default('month')
                                    ->required()
                                    ->columnSpanFull(),
                                
                                TextInput::make('trial_days')
                                    ->label('Trial Days')
                                    ->numeric()
                                    ->required()
                                    ->default(0)
                                    ->helperText('Number of free trial days')
                                    ->columnSpanFull(),
                            ])
                            ->collapsible()
                            ->collapsed(false)
                            ->columnSpan(1),

                        Section::make('Plan Limits')
                            ->description('Usage limits for this plan')
                            ->schema([
                                TextInput::make('listing_limit')
                                    ->label('Listing Limit')
                                    ->numeric()
                                    ->helperText('Leave empty for unlimited')
                                    ->columnSpanFull(),
                                
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('image_per_listing')
                                            ->label('Images per Listing')
                                            ->numeric()
                                            ->required()
                                            ->default(5),
                                        
                                        TextInput::make('video_per_listing')
                                            ->label('Videos per Listing')
                                            ->numeric()
                                            ->required()
                                            ->default(1),
                                    ]),
                            ])
                            ->collapsible()
                            ->collapsed(false)
                            ->columnSpan(1),
                    ]),

                Grid::make(2)
                    ->schema([
                        Section::make('Plan Branding')
                            ->description('Visual elements and marketing features')
                            ->schema([
                                SpatieMediaLibraryFileUpload::make('logo')
                                    ->label('Plan Logo')
                                    ->image()
                                    ->rules([
                                        'max:10040',
                                    ])
                                    ->validationMessages([
                                        'max' => 'Image size should be less than 10MB',
                                    ])
                                    ->disk(config('media-library.disk_name'))
                                    ->collection('logo')
                                    ->columnSpanFull(),
                                
                                Repeater::make('features')
                                    ->label('Plan Features')
                                    ->schema([
                                        TextInput::make('name')
                                            ->required()
                                            ->placeholder('e.g., Unlimited listings')
                                            ->maxLength(255),
                                    ])
                                    ->defaultItems(3)
                                    ->addActionLabel('Add Feature')
                                    ->reorderableWithButtons()
                                    ->columnSpanFull(),
                                
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('badge_title')
                                            ->label('Badge Title')
                                            ->maxLength(50)
                                            ->placeholder('e.g., Popular'),
                                        
                                        Select::make('badge_color')
                                            ->label('Badge Color')
                                            ->options([
                                                'primary' => 'Primary',
                                                'secondary' => 'Secondary',
                                            ])
                                            ->placeholder('Select color'),
                                    ]),
                                
                                TextInput::make('savings_label')
                                    ->label('Savings Label')
                                    ->maxLength(100)
                                    ->placeholder('e.g., Save 20%')
                                    ->columnSpanFull(),
                            ])
                            ->columns(2)
                            ->collapsible()
                            ->collapsed(false)
                            ->columnSpan(1),

                        Section::make('Settings')
                            ->description('Plan status and visibility options')
                            ->schema([
                                Checkbox::make('active')
                                    ->label('Active')
                                    ->helperText('Inactive plans will be hidden from users. Plans must be synced with Stripe to be active.')
                                    ->default(true)
                                    ->columnSpanFull(),
                                
                                Checkbox::make('is_featured')
                                    ->label('Featured Plan')
                                    ->helperText('Mark this plan as featured')
                                    ->default(false)
                                    ->columnSpanFull(),
                                
                                Checkbox::make('is_highlight')
                                    ->label('Highlight on Pricing Page')
                                    ->helperText('Draw attention to this plan')
                                    ->default(false)
                                    ->columnSpanFull(),
                                
                                Checkbox::make('is_breeder')
                                    ->label('Breeder Plan')
                                    ->helperText('Enable breeder-specific features')
                                    ->default(false)
                                    ->columnSpanFull(),
                            ])
                            ->collapsible()
                            ->collapsed(false)
                            ->columnSpan(1),
                    ]),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('money_formatted')->label('Price')->searchable(),
                TextColumn::make('interval')
                    ->label('Interval')
                    ->badge()
                    ->formatStateUsing(fn($state) => match($state) {
                        'month' => 'Monthly',
                        'year' => 'Yearly',
                        'quarter' => 'Quarterly',
                        default => ucfirst($state ?? 'N/A'),
                    })
                    ->color(fn($state) => match($state) {
                        'month' => 'info',
                        'year' => 'success',
                        'quarter' => 'warning',
                        default => 'gray',
                    })
                    ->sortable(),
                TextColumn::make('type')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'seller' => 'success',
                        'breeder' => 'warning',
                        default => 'gray',
                    }),
                IconColumn::make('is_synced')
                    ->label('Synced')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('danger')
                    ->tooltip(fn(Plan $record) => $record->sync_error 
                        ? "Error: {$record->sync_error}" 
                        : ($record->is_synced ? 'Synced with Stripe' : 'Not synced')),
                TextColumn::make('last_synced_at')
                    ->label('Last Synced')
                    ->dateTime()
                    ->since()
                    ->placeholder('Never')
                    ->sortable(),
                IconColumn::make('active')
                    ->boolean()
                    ->label('Active'),
            ])
            ->reorderable('order_column')
            ->defaultSort('order_column')
            ->paginated(false)
            ->filters([
                //
            ])
            ->actions([
                EditAction::make(),
                Action::make('sync')
                    ->label('Sync to Stripe')
                    ->icon('heroicon-o-arrow-path')
                    ->color('primary')
                    ->requiresConfirmation()
                    ->action(function (Plan $record, StripePlanSyncService $syncService) {
                        $success = $syncService->syncToStripe($record);
                        
                        if ($success) {
                            Notification::make()
                                ->title('Plan synced successfully')
                                ->success()
                                ->send();
                        } else {
                            Notification::make()
                                ->title('Sync failed')
                                ->body($record->sync_error ?? 'Unknown error')
                                ->danger()
                                ->send();
                        }
                    }),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
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
            'index' => ListPlans::route('/'),
            'create' => CreatePlan::route('/create'),
            'edit' => EditPlan::route('/{record}/edit'),
        ];
    }
}

<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DiscountResource\Pages;
use App\Filament\Resources\DiscountResource\RelationManagers;
use App\Jobs\SendEmailBlastJob;
use App\Models\Discount;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class DiscountResource extends Resource
{
    protected static ?string $model = Discount::class;

    protected static ?string $navigationIcon = 'phosphor-seal-percent';
    protected static ?string $navigationLabel = 'Coupon Card';


     public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return static::getModel()::count() > 50 ? 'success' : 'primary';
    }


    public static function getNavigationGroup(): ?string
    {
        return 'Stripe'; // This will group the resource under "Content"
    }
    public static function getNavigationSort(): ?int
    {
        return 11;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required(),
                Forms\Components\TextInput::make('slug'),
                Forms\Components\TextInput::make('code'),
                Forms\Components\DatePicker::make('start_date')
                    ->required(),
                Forms\Components\DatePicker::make('end_date')
                    ->required(),
                Forms\Components\TextInput::make('trial_days')
                    ->required()
                    ->numeric(),
                Forms\Components\Select::make('account_type')
                    ->required()
                    ->options([
                    'breeder' => 'Breeder',
                    'seller' => 'Seller',
                ]),
                Forms\Components\Textarea::make('targeted_emails')
                    ->rows(14)
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('code')
                    ->searchable(),
                Tables\Columns\TextColumn::make('start_date')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('end_date')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('plan_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('trial_days')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('account_type')
                    ->searchable(),
                Tables\Columns\TextColumn::make('slug')
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
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('customAction')
                ->label('Email Blast')
                ->visible(fn (Discount $record) => !$record->is_sent)
                ->color('success')
                ->icon('heroicon-o-envelope')
                    ->action(function ($record) {
                         dispatch(new SendEmailBlastJob($record->id));

                         Notification::make()
                        ->title('Email blast queued')
                        ->body('Emails will be sent with 30-second intervals')
                        ->success()
                        ->send();

                        $record->update([
                            'is_sent' => true
                        ]);
                    })
                ->tooltip('Send all emails'),
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
            'index' => Pages\ListDiscounts::route('/'),
            'create' => Pages\CreateDiscount::route('/create'),
            'edit' => Pages\EditDiscount::route('/{record}/edit'),
        ];
    }
}

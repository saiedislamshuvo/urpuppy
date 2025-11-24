<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RefundRequestResource\Pages;
use App\Models\RefundRequest;
use App\Models\User; // <- FIX: This line was missing for the user relationship to work correctly
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Pages\EditRecord;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class RefundRequestResource extends Resource
{
    protected static ?string $model = RefundRequest::class;

    protected static ?string $navigationIcon = 'heroicon-o-receipt-percent';

    protected static ?string $navigationGroup = 'Sales & Billing';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Request Details')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->relationship('user', 'first_name')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->disabled(fn ($livewire) => $livewire instanceof EditRecord)
                            ->label('User'),

                        Forms\Components\Select::make('subscription_id')
                            ->relationship(
                                'subscription',
                                'id',
                                fn ($query) => $query->with('plan')
                            )
                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->plan?->name ?? "Subscription #{$record->id}")
                            ->searchable()
                            ->preload()
                            ->required()
                            ->disabled(fn ($livewire) => $livewire instanceof EditRecord)
                            ->label('Subscription'),

                        Forms\Components\Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'approved' => 'Approved',
                                'cancelled' => 'Cancelled',
                                'declined' => 'Declined',
                            ])
                            ->default('pending')
                            ->required()
                            ->native(false)
                            ->columnSpan(1),
                            
                        Forms\Components\Textarea::make('message')
                            ->rows(3)
                            ->label('Refund Reason/Message')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('Request ID')
                    ->searchable(),

                Tables\Columns\TextColumn::make('user.first_name')
                    ->label('Requested By')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('subscription_id')
                    ->label('Subscription ID')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'approved' => 'success',
                        'declined' => 'danger',
                        'cancelled' => 'info',
                    })
                    ->searchable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->label('Requested At')
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'cancelled' => 'Cancelled',
                        'declined' => 'Declined',
                    ])
                    ->label('Filter by Status'),

                Tables\Filters\SelectFilter::make('user')
                    ->relationship('user', 'id')
                    ->searchable()
                    ->preload(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('Approve')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->hidden(fn (Model $record): bool => $record->status === 'approved')
                    ->action(function (Model $record) {
                        $record->status = 'approved';
                        $record->save();
                        \Filament\Notifications\Notification::make()
                            ->title('Refund Approved')
                            ->success()
                            ->send();
                    })
                    ->requiresConfirmation(),
                // Add a Decline Action for completeness
                Tables\Actions\Action::make('Decline')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->hidden(fn (Model $record): bool => in_array($record->status, ['approved', 'declined']))
                    ->action(function (Model $record) {
                        $record->status = 'declined';
                        $record->save();
                        \Filament\Notifications\Notification::make()
                            ->title('Refund Declined')
                            ->danger()
                            ->send();
                    })
                    ->requiresConfirmation(),
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
            'index' => Pages\ListRefundRequests::route('/'),
            'create' => Pages\CreateRefundRequest::route('/create'),
            'edit' => Pages\EditRefundRequest::route('/{record}/edit'),
        ];
    }
    
    public static function getGlobalSearchResultTitle(Model $record): string
    {
        return 'Refund Request #' . $record->id . ' by ' . ($record->user->full_name ?? 'N/A');
    }
}
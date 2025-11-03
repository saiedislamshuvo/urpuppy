<?php

namespace App\Filament\Breeder\Widgets;

use App\Models\Subscription;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;

class SubscriptionList extends BaseWidget
{
    protected static ?int $sort = 2;

    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Subscription::query()
                    ->where('user_id', auth()->id())
                    ->with('plan')
                    ->orderBy('created_at', 'desc')
            )
            ->heading('My Subscriptions')
            ->columns([
                Tables\Columns\TextColumn::make('plan.name')
                    ->label('Plan Name')
                    ->default('N/A')
                    ->badge()
                    ->color(fn ($record) => match($record->stripe_status) {
                        'active' => 'success',
                        'trialing' => 'info',
                        'canceled' => 'warning',
                        'incomplete' => 'danger',
                        default => 'gray',
                    }),
                
                Tables\Columns\TextColumn::make('type')
                    ->label('Type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'breeder' => 'primary',
                        'premium' => 'warning',
                        'free' => 'success',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => ucfirst($state)),
                
                Tables\Columns\TextColumn::make('stripe_status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'active' => 'success',
                        'trialing' => 'info',
                        'canceled' => 'warning',
                        'incomplete', 'incomplete_expired', 'past_due' => 'danger',
                        'unpaid' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => ucfirst(str_replace('_', ' ', $state))),
                
                Tables\Columns\TextColumn::make('trial_ends_at')
                    ->label('Trial Ends')
                    ->dateTime('M d, Y')
                    ->placeholder('No trial')
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('ends_at')
                    ->label('Ends At')
                    ->dateTime('M d, Y')
                    ->placeholder('Active')
                    ->description(fn ($record) => $record->ends_at ? 'Subscription will end on this date' : null)
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Started On')
                    ->dateTime('M d, Y')
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\Action::make('view_stripe')
                    ->label('View in Stripe')
                    ->icon('heroicon-o-arrow-top-right-on-square')
                    ->url(fn ($record) => "https://dashboard.stripe.com/subscriptions/{$record->stripe_id}")
                    ->openUrlInNewTab()
                    ->color('primary')
                    ->visible(fn () => auth()->user()?->hasRole('super_admin')),
            ])
            ->defaultSort('created_at', 'desc')
            ->emptyStateHeading('No subscriptions found')
            ->emptyStateDescription('You don\'t have any subscriptions yet.')
            ->emptyStateIcon('heroicon-o-credit-card');
    }
}


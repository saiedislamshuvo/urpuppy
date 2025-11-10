<?php

namespace App\Filament\Resources\BreederRequestResource\Pages;

use App\Filament\Resources\BreederRequestResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Filament\Notifications\Notification;

class ViewBreederRequest extends ViewRecord
{
    protected static string $resource = BreederRequestResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('mark_approved')
                ->label('Mark as Approved')
                ->icon('heroicon-o-check-circle')
                ->color('success')
                ->requiresConfirmation()
                ->modalHeading('Mark as Approved')
                ->modalDescription('Are you sure you want to mark this request as approved?')
                ->action(function () {
                    $this->record->update(['status' => 'approved']);
                    Notification::make()
                        ->title('Breeder request marked as approved')
                        ->success()
                        ->send();
                    $this->redirect(static::getResource()::getUrl('view', ['record' => $this->record]));
                })
                ->visible(fn () => $this->record->status !== 'approved'),
            Actions\Action::make('reject')
                ->label('Reject')
                ->icon('heroicon-o-x-circle')
                ->color('danger')
                ->requiresConfirmation()
                ->modalHeading('Reject Breeder Request')
                ->modalDescription('Are you sure you want to reject this breeder request?')
                ->action(function () {
                    $this->record->update(['status' => 'rejected']);
                    Notification::make()
                        ->title('Breeder request rejected')
                        ->success()
                        ->send();
                    $this->redirect(static::getResource()::getUrl('view', ['record' => $this->record]));
                })
                ->visible(fn () => $this->record->status !== 'rejected'),
            Actions\EditAction::make(),
            Actions\Action::make('view_breeder')
                ->label('View Breeder Profile')
                ->url(fn () => $this->record->user?->slug ? route('breeders.show', $this->record->user->slug) : '#')
                ->openUrlInNewTab()
                ->icon('heroicon-o-arrow-top-right-on-square')
                ->visible(fn () => $this->record->user?->slug !== null),
        ];
    }

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Request Information')
                    ->schema([
                        Infolists\Components\TextEntry::make('status')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'pending' => 'warning',
                                'approved' => 'success',
                                'rejected' => 'danger',
                                default => 'gray',
                            }),
                        Infolists\Components\TextEntry::make('message')
                            ->columnSpanFull(),
                        Infolists\Components\TextEntry::make('created_at')
                            ->dateTime(),
                        Infolists\Components\TextEntry::make('updated_at')
                            ->dateTime(),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('User Information')
                    ->schema([
                        Infolists\Components\TextEntry::make('user.full_name')
                            ->label('Full Name'),
                        Infolists\Components\TextEntry::make('user.email')
                            ->label('Email')
                            ->copyable()
                            ->copyMessage('Email copied!'),
                        Infolists\Components\TextEntry::make('user.phone')
                            ->label('Phone')
                            ->copyable()
                            ->copyMessage('Phone copied!'),
                        Infolists\Components\TextEntry::make('user.first_name')
                            ->label('First Name'),
                        Infolists\Components\TextEntry::make('user.last_name')
                            ->label('Last Name'),
                        Infolists\Components\TextEntry::make('user.email_verified_at')
                            ->label('Email Verified At')
                            ->dateTime()
                            ->placeholder('Not verified'),
                        Infolists\Components\TextEntry::make('user.member_since')
                            ->label('Member Since')
                            ->date(),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Personal Address')
                    ->schema([
                        Infolists\Components\TextEntry::make('user.address')
                            ->label('Address')
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.city')
                            ->label('City')
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.state')
                            ->label('State')
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.short_state')
                            ->label('State Abbreviation')
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.zip_code')
                            ->label('Zip Code')
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.gmap_address')
                            ->label('Google Maps Address')
                            ->placeholder('Not provided')
                            ->columnSpanFull(),
                    ])
                    ->columns(2)
                    ->collapsible(),

                Infolists\Components\Section::make('Breeder/Company Information')
                    ->schema([
                        Infolists\Components\TextEntry::make('user.kennel_name')
                            ->label('Kennel Name')
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.company_name')
                            ->label('Company Name')
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.company_email_address')
                            ->label('Company Email')
                            ->copyable()
                            ->copyMessage('Email copied!')
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.company_phone')
                            ->label('Company Phone')
                            ->copyable()
                            ->copyMessage('Phone copied!')
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.company_established_on')
                            ->label('Established On')
                            ->date()
                            ->placeholder('Not provided'),
                        Infolists\Components\IconEntry::make('user.has_usda_registration')
                            ->label('USDA Registration')
                            ->boolean()
                            ->placeholder('Not specified'),
                        Infolists\Components\TextEntry::make('user.company_about')
                            ->label('About Company')
                            ->placeholder('Not provided')
                            ->columnSpanFull(),
                    ])
                    ->columns(2)
                    ->collapsible(),

                Infolists\Components\Section::make('Company Address')
                    ->schema([
                        Infolists\Components\TextEntry::make('user.company_address')
                            ->label('Address')
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.company_city')
                            ->label('City')
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.company_state')
                            ->label('State')
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.company_short_state')
                            ->label('State Abbreviation')
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.company_zip_code')
                            ->label('Zip Code')
                            ->placeholder('Not provided'),
                    ])
                    ->columns(2)
                    ->collapsible(),

                Infolists\Components\Section::make('Social Media')
                    ->schema([
                        Infolists\Components\TextEntry::make('user.social_fb')
                            ->label('Facebook')
                            ->url(fn ($record) => $record->user?->social_fb)
                            ->openUrlInNewTab()
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.social_ig')
                            ->label('Instagram')
                            ->url(fn ($record) => $record->user?->social_ig)
                            ->openUrlInNewTab()
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.social_tiktok')
                            ->label('TikTok')
                            ->url(fn ($record) => $record->user?->social_tiktok)
                            ->openUrlInNewTab()
                            ->placeholder('Not provided'),
                        Infolists\Components\TextEntry::make('user.social_x')
                            ->label('X (Twitter)')
                            ->url(fn ($record) => $record->user?->social_x)
                            ->openUrlInNewTab()
                            ->placeholder('Not provided'),
                    ])
                    ->columns(2)
                    ->collapsible(),
            ]);
    }
}


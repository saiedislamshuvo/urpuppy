<?php

namespace App\Filament\Resources\UserResource\Pages;

use Filament\Actions\Action;
use Filament\Actions\EditAction;
use Filament\Facades\Filament;
use Filament\Resources\Pages\ViewRecord;
use Phpsa\FilamentAuthentication\Actions\ImpersonateLink;
use Phpsa\FilamentAuthentication\FilamentAuthentication;

class ViewUser extends ViewRecord
{
    public static function getResource(): string
    {
        return FilamentAuthentication::getPlugin()->getResource('UserResource');
    }

    protected function getHeaderActions(): array
    {
        return collect([
            EditAction::make(),
            $this->impersonateAction(),
        ])->filter()->toArray();
    }

    protected function impersonateAction(): ?Action
    {
        /** @var \Illuminate\Contracts\Auth\Authenticatable */
        $record = $this->getRecord();
        $user = Filament::auth()->user();
        if ($user === null || ImpersonateLink::allowed($user, $record) === false) {
            return null;
        }

        return Action::make('impersonate')
            ->label(__('filament-authentication::filament-authentication.button.impersonate'))
            ->action(fn () => ImpersonateLink::impersonate($record));
    }
}

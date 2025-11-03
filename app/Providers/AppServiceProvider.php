<?php

namespace App\Providers;

use App\Models\User;
use Filament\Actions\CreateAction;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Table;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Filament\Support\Assets\Css;
use Filament\Support\Facades\FilamentAsset;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        CreateAction::configureUsing(function ($action) {
            return $action->slideOver()->closeModalByClickingAway(false);
        });

        Table::configureUsing(function (Table $table): void {
            $table->paginationPageOptions([20, 50, 100, 200, 'all']);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->isProduction() ) {
            URL::forceScheme('https');
        }
        FilamentAsset::register([
            Css::make('local-stylesheet', asset('css/style.css')),
        ]);

        Vite::useAggressivePrefetching();

        VerifyEmail::createUrlUsing(function ($notifiable) {
            return URL::temporarySignedRoute(
                'verification.verify',
                now()->addMinutes(60),
                [
                    'id' => $notifiable->getKey(),
                    'hash' => sha1($notifiable->getEmailForVerification()),
                    'role' => $notifiable->roles->first(),
                ]
            );
        });

        VerifyEmail::toMailUsing(function ($notifiable, $url) {

            $roles = $notifiable->roles;

            if ($roles->contains('buyer')) {

                $mail = (new MailMessage)
                    ->subject('New Buyer Account')
                    ->greeting('Hi! '.$notifiable->full_name)
                    ->line('Thank you for signing up with UrPuppy.com! To complete your registration, please verify your email address by clicking the button below:')
                    ->action('Verify Your Account', $url)
                    ->line('This step helps us ensure your account is secure and ready to go. If you didn’t sign up for an account with UrPuppy.com, please disregard this email.')
                    ->line('Thank you for choosing UrPuppy.com!');

            } elseif ($roles->contains('seller')) {
                $mail = (new MailMessage)
                    ->subject('New Seller Account')
                    ->greeting('Hi! '.$notifiable->full_name)
                    ->line('Thank you for signing up with UrPuppy.com! To complete your registration, please verify your email address by clicking the button below:')
                    ->action('Verify Your Account', $url)
                    ->line('This step helps us ensure your account is secure and ready to go. If you didn’t sign up for an account with UrPuppy.com, please disregard this email.')
                    ->line('Thank you for choosing UrPuppy.com!');

            } elseif ($roles->contains('breeder')) {

                $mail = (new MailMessage)
                    ->subject('New Breeder Account')
                    ->greeting('Hi! '.$notifiable->full_name)
                    ->line('Thank you for signing up with UrPuppy.com! To complete your registration, please verify your email address by clicking the button below:')
                    ->action('Verify Your Account', $url)
                    ->line('This step helps us ensure your account is secure and ready to go. If you didn’t sign up for an account with UrPuppy.com, please disregard this email.')
                    ->line('Thank you for choosing UrPuppy.com!');

            } else {

                $mail = (new MailMessage)
                    ->subject('New Account')
                    ->greeting('Hi! '.$notifiable->full_name)
                    ->line('Thank you for signing up with UrPuppy.com! To complete your registration, please verify your email address by clicking the button below:')
                    ->action('Verify Your Account', $url)
                    ->line('This step helps us ensure your account is secure and ready to go. If you didn’t sign up for an account with UrPuppy.com, please disregard this email.')
                    ->line('Thank you for choosing UrPuppy.com!');
            }

            return $mail;
        });

    }
}

<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\View\PanelsRenderHook;
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use App\Filament\Breeder\Pages\Dashboard as BreederDashboard;
use Filament\Navigation\MenuItem;
use Filament\Navigation\NavigationBuilder;
use Filament\Navigation\NavigationItem;

class BreederPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('breeder')
            ->path('breeder')
            ->brandLogo('/logo-dark.svg')
            ->darkModeBrandLogo('/logo.svg')
            ->brandLogoHeight('32px')
            ->login()
            ->colors([
                'primary' => Color::Orange,
            ])
            ->discoverResources(in: app_path('Filament/Breeder/Resources'), for: 'App\\Filament\\Breeder\\Resources')
            ->discoverPages(in: app_path('Filament/Breeder/Pages'), for: 'App\\Filament\\Breeder\\Pages')
            ->discoverClusters(in: app_path('Filament/Clusters'), for: 'App\\Filament\\Clusters')
            ->pages([
                BreederDashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Breeder/Widgets'), for: 'App\\Filament\\Breeder\\Widgets')
            ->widgets([
                Widgets\AccountWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ])
            ->topNavigation()
            ->navigation(function (NavigationBuilder $builder) {
                return $builder->items([
                    NavigationItem::make('Puppies for Sale')->url('/puppies'),
                    NavigationItem::make('Breeds')->url('/breeds'),
                    NavigationItem::make('Breeders')->url('/breeders'),
                    NavigationItem::make('+ List Ur Puppy')->url('/'),             
                ]);
            })
            ->spa()
            // ->darkMode(false)
            ->breadcrumbs(false)
            // ->navigation(false)
            ->globalSearch(false)
            ->renderHook(PanelsRenderHook::BODY_END, fn () => view('components.footer'));
    }
}

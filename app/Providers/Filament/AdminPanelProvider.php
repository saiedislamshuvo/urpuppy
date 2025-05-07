<?php

namespace App\Providers\Filament;

use BezhanSalleh\FilamentShield\FilamentShieldPlugin;
use CmsMulti\FilamentClearCache\FilamentClearCachePlugin;
use Filament\Http\Middleware\Authenticate;
use Vormkracht10\FilamentMails\FilamentMailsPlugin;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\NavigationItem;
use Vormkracht10\FilamentMails\Facades\FilamentMails;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
/* use Filament\SpatieLaravelTranslatablePlugin; */
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Phpsa\FilamentAuthentication\Widgets\LatestUsersWidget;
use Stephenjude\FilamentBlog\BlogPlugin;
use TomatoPHP\FilamentUsers\FilamentUsersPlugin;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->databaseNotifications()
            ->path('admin')
            ->brandLogo('/logo-dark.svg')
            ->darkModeBrandLogo('/logo.svg')
            ->login()
            ->colors([
                'primary' => Color::Orange,
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->widgets([
                Widgets\AccountWidget::class,
                LatestUsersWidget::class,
            ])
            ->font('Poppins')
            ->breadcrumbs(false)
            ->globalSearchDebounce('750ms')
            ->sidebarWidth('70')
            ->maxContentWidth('full')
            ->sidebarFullyCollapsibleOnDesktop()
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
            ->navigationItems([
                NavigationItem::make('Log')
                    ->url('/log-viewer', shouldOpenInNewTab: true)
                    ->icon('heroicon-o-book-open')
                    ->group('Settings'),

            ])
            ->routes(fn () => FilamentMails::routes())
            ->authMiddleware([
                Authenticate::class,
            ])->plugins([
                /* FilamentUsersPlugin::make(), */
                BlogPlugin::make(),
                /* FilamentGeneralSettingsPlugin::make() */
                /*     ->setSort(16) */
                /*     ->setIcon('heroicon-o-cog') */
                /*     ->setNavigationGroup('Settings'), */

                /* SpatieLaravelTranslatablePlugin::make()->defaultLocales([config('app.locale')]), */
                /* SkyPlugin::make()->navigationGroupLabel('CMS')->hideResources([ */
                /*     LibraryResource::class, */
                /* ]), */
                FilamentClearCachePlugin::make(),
                \Phpsa\FilamentAuthentication\FilamentAuthentication::make(),
                FilamentMailsPlugin::make()

                /* \BezhanSalleh\FilamentGoogleAnalytics\FilamentGoogleAnalyticsPlugin::make(), */
                /* \BezhanSalleh\FilamentShield\FilamentShieldPlugin::make() */
                /* FilamentShieldPlugin::make(), */
            ]);
    }
}

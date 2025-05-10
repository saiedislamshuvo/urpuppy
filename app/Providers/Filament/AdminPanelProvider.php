<?php

namespace App\Providers\Filament;

use App\Filament\Resources\BreederRequestResource;
use App\Filament\Resources\BreedResource;
use App\Filament\Resources\ContactResource;
use App\Filament\Resources\DiscountResource;
use App\Filament\Resources\PlanResource;
use App\Filament\Resources\PuppyColorResource;
use App\Filament\Resources\PuppyPatternResource;
use App\Filament\Resources\PuppyResource;
use App\Filament\Resources\ReportResource;
use App\Filament\Resources\SubscriptionResource;
use App\Filament\Resources\UserResource;
use BezhanSalleh\FilamentShield\FilamentShieldPlugin;
use CmsMulti\FilamentClearCache\FilamentClearCachePlugin;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\NavigationBuilder;
use Filament\Navigation\NavigationGroup;
use Filament\Navigation\NavigationItem;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
/* use Filament\SpatieLaravelTranslatablePlugin; */
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Phpsa\FilamentAuthentication\Resources\RoleResource;
use Phpsa\FilamentAuthentication\Widgets\LatestUsersWidget;
use Stephenjude\FilamentBlog\BlogPlugin;
use Stephenjude\FilamentBlog\Resources\AuthorResource;
use Stephenjude\FilamentBlog\Resources\CategoryResource;
use Stephenjude\FilamentBlog\Resources\PostResource;
use TomatoPHP\FilamentUsers\FilamentUsersPlugin;
use Vormkracht10\FilamentMails\Facades\FilamentMails;
use Vormkracht10\FilamentMails\FilamentMailsPlugin;
use Vormkracht10\FilamentMails\Resources\MailResource;

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
            ->navigation(function (NavigationBuilder $builder) {

                $is_admin = auth()->user()->roles->contains('super_admin') || auth()->user()->roles->contains('admin');

                $admin_items = [];

                if ($is_admin) {
                    $admin_items = [
                        NavigationGroup::make('UrPuppy')->items([
                            ...PuppyResource::getNavigationItems(),
                            ...BreedResource::getNavigationItems(),
                            ...PuppyColorResource::getNavigationItems(),
                            ...PuppyPatternResource::getNavigationItems(),

                        ]),
                        NavigationGroup::make('Messages')->items([
                            ...BreederRequestResource::getNavigationItems(),
                            ...ReportResource::getNavigationItems(),
                            ...ContactResource::getNavigationItems(),

                        ]),
                        NavigationGroup::make('Stripe')->items([
                            ...PlanResource::getNavigationItems(),
                            ...SubscriptionResource::getNavigationItems(),
                            ...DiscountResource::getNavigationItems(),

                        ]),
                        NavigationGroup::make('Emails')->items([
                            ...MailResource::getNavigationItems(),

                        ]),
                        NavigationGroup::make('Blog')->items([
                            ...PostResource::getNavigationItems(),
                            ...CategoryResource::getNavigationItems(),
                            ...AuthorResource::getNavigationItems(),

                        ]),
                        NavigationGroup::make('Authentication')->items([
                            ...UserResource::getNavigationItems(),
                            ...RoleResource::getNavigationItems(),

                        ]),

                        NavigationGroup::make('Settings')->items([
                            NavigationItem::make('Log')
                                ->url('/log-viewer', shouldOpenInNewTab: true)
                                ->icon('heroicon-o-book-open'),
                            NavigationItem::make('Horizon')
                                ->url('/horizon', shouldOpenInNewTab: true)
                                ->icon('heroicon-o-book-open'),

                        ]),

                    ];
                } else {
                    $admin_items = [
                        NavigationGroup::make('Blog')->items([
                            ...PostResource::getNavigationItems(),
                            ...CategoryResource::getNavigationItems(),
                            ...AuthorResource::getNavigationItems(),

                        ]),
                    ];
                }

                return $builder
                    ->items([
                        NavigationItem::make('Dashboard')
                            ->icon('heroicon-o-book-open')
                            ->url('/admin'),
                    ])
                    ->groups($admin_items);
            })
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
                FilamentMailsPlugin::make(),

                /* \BezhanSalleh\FilamentGoogleAnalytics\FilamentGoogleAnalyticsPlugin::make(), */
                /* \BezhanSalleh\FilamentShield\FilamentShieldPlugin::make() */
                /* FilamentShieldPlugin::make(), */
            ]);
    }
}

<?php

return [
    App\Providers\AppServiceProvider::class,
        App\Providers\PrometheusServiceProvider::class,
    App\Providers\Filament\AdminPanelProvider::class,
    App\Providers\HorizonServiceProvider::class,
    Rollbar\Laravel\RollbarServiceProvider::class,
];

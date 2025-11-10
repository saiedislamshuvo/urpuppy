<?php

namespace App\Filament\Widgets;

use App\Models\BreederRequest;
use App\Models\Puppy;
use App\Models\Subscription;
use App\Models\User;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{   
    protected function getStats(): array
    {
        $now = Carbon::now();
        $thirtyDaysFromNow = $now->copy()->addDays(30);

        // Total Active Accounts (users with active/trialing subscriptions)
        $activeAccounts = User::whereHas('customSubscriptions', function ($query) {
            $query->whereIn('stripe_status', ['active', 'trialing']);
        })->count();

        // Total Breeder Accounts
        $totalBreederAccounts = User::where('is_breeder', true)->count();

        // Total Seller Accounts (sellers who are not breeders)
        $totalSellerAccounts = User::where('is_seller', true)
            ->where('is_breeder', false)
            ->count();

        // Total Buyer Accounts (users who are not sellers or breeders)
        $totalBuyerAccounts = User::where('is_seller', false)
            ->where('is_breeder', false)
            ->where('is_admin', false)
            ->where('is_superadmin', false)
            ->count();

        // Renewing in 30 Days
        $renewingIn30Days = Subscription::whereIn('stripe_status', ['active', 'trialing'])
            ->whereNotNull('ends_at')
            ->whereBetween('ends_at', [$now, $thirtyDaysFromNow])
            ->distinct('user_id')
            ->count('user_id');

        // Expired Accounts
        $expiredAccounts = Subscription::where(function ($query) use ($now) {
            $query->whereIn('stripe_status', ['canceled', 'past_due', 'unpaid'])
                ->orWhere(function ($q) use ($now) {
                    $q->whereNotNull('ends_at')
                        ->where('ends_at', '<', $now);
                });
        })
            ->distinct('user_id')
            ->count('user_id');

        // Pending Breeder Accounts
        $pendingBreederAccounts = User::where('is_breeder', true)
            ->whereHas('breeder_requests', function ($query) {
                $query->where('id', function ($subquery) {
                    $subquery->select('id')
                        ->from('breeder_requests')
                        ->whereColumn('breeder_requests.user_id', 'users.id')
                        ->orderByDesc('created_at')
                        ->limit(1);
                })->where('status', 'pending');
            })
            ->count();

        // Approved Breeder Accounts
        $approvedBreederAccounts = User::where('is_breeder', true)
            ->whereHas('breeder_requests', function ($query) {
                $query->where('id', function ($subquery) {
                    $subquery->select('id')
                        ->from('breeder_requests')
                        ->whereColumn('breeder_requests.user_id', 'users.id')
                        ->orderByDesc('created_at')
                        ->limit(1);
                })->where('status', 'approved');
            })
            ->count();

        // Pending Puppy Listings
        $pendingPuppyListings = Puppy::where('status', 'draft')->count();

        // Total Puppy Listings
        $totalPuppyListings = Puppy::count();

        // Published Puppy Listings
        $publishedPuppyListings = Puppy::where('status', 'published')->count();

        // Sold Puppy Listings
        $soldPuppyListings = Puppy::whereNotNull('sold_at')->count();

        // Paused Puppy Listings
        $pausedPuppyListings = Puppy::whereNotNull('paused_at')->count();

        return [
            Stat::make('Total Active Accounts', $activeAccounts)
                ->description('Users with active subscriptions')
                ->descriptionIcon('heroicon-o-check-circle')
                ->color('success')
                ->chart([7, 3, 4, 5, 6, 3, 5]),

            Stat::make('Total Breeder Accounts', $totalBreederAccounts)
                ->description('All breeder profiles')
                ->descriptionIcon('heroicon-o-user-group')
                ->color('primary')
                ->chart([7, 3, 4, 5, 6, 3, 5]),

            Stat::make('Total Seller Accounts', $totalSellerAccounts)
                ->description('Consumer sellers (not breeders)')
                ->descriptionIcon('heroicon-o-shopping-bag')
                ->color('info')
                ->chart([7, 3, 4, 5, 6, 3, 5]),

            Stat::make('Total Buyer Accounts', $totalBuyerAccounts)
                ->description('Buyer profiles')
                ->descriptionIcon('heroicon-o-users')
                ->color('warning')
                ->chart([7, 3, 4, 5, 6, 3, 5]),

            Stat::make('Renewing in 30 Days', $renewingIn30Days)
                ->description('Subscriptions expiring soon')
                ->descriptionIcon('heroicon-o-clock')
                ->color('warning')
                ->chart([7, 3, 4, 5, 6, 3, 5]),

            Stat::make('Expired Accounts', $expiredAccounts)
                ->description('Expired or canceled subscriptions')
                ->descriptionIcon('heroicon-o-x-circle')
                ->color('danger')
                ->chart([7, 3, 4, 5, 6, 3, 5]),

            Stat::make('Pending Breeder Accounts', $pendingBreederAccounts)
                ->description('Awaiting approval')
                ->descriptionIcon('heroicon-o-clock')
                ->color('warning')
                ->chart([7, 3, 4, 5, 6, 3, 5]),

            Stat::make('Approved Breeder Accounts', $approvedBreederAccounts)
                ->description('Verified breeders')
                ->descriptionIcon('heroicon-o-check-badge')
                ->color('success')
                ->chart([7, 3, 4, 5, 6, 3, 5]),

            // Stat::make('Total Puppy Listings', $totalPuppyListings)
            //     ->description('All puppy listings')
            //     ->descriptionIcon('heroicon-o-queue-list')
            //     ->color('primary')
            //     ->chart([7, 3, 4, 5, 6, 3, 5]),

            Stat::make('Pending Puppy Listings', $pendingPuppyListings)
                ->description('Draft listings')
                ->descriptionIcon('heroicon-o-document-text')
                ->color('info')
                ->chart([7, 3, 4, 5, 6, 3, 5]),

            Stat::make('Published Puppy Listings', $publishedPuppyListings)
                ->description('Active published listings')
                ->descriptionIcon('heroicon-o-check-circle')
                ->color('success')
                ->chart([7, 3, 4, 5, 6, 3, 5]),

            Stat::make('Sold Puppy Listings', $soldPuppyListings)
                ->description('Successfully sold')
                ->descriptionIcon('heroicon-o-check-badge')
                ->color('success')
                ->chart([7, 3, 4, 5, 6, 3, 5]),

            Stat::make('Paused Puppy Listings', $pausedPuppyListings)
                ->description('Temporarily paused')
                ->descriptionIcon('heroicon-o-pause-circle')
                ->color('warning')
                ->chart([7, 3, 4, 5, 6, 3, 5]),
        ];
    }

    protected function getColumns(): int
    {
        return 4;
    }
}


<?php

namespace App\Models;

use Cknow\Money\Money;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Stripe\Plan as StripePlan;
use Stripe\Stripe;

class Plan extends Model implements HasMedia, Sortable
{
    use HasFactory, SortableTrait;
    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'price',
        'active',
        'interval',
        'listing_limit',
        'stripe_plan_id',
        'stripe_product_id',
        'trial_days',
        'is_featured',
        'is_highlight',
        'type',
        'features',
        'badge_title',
        'badge_color',
        'is_breeder',
        'savings_label',
        'order_column',
        'image_per_listing',
        'video_per_listing',
        'is_synced',
        'sync_error',
        'last_synced_at',
    ];

    protected $casts = [
        'interval' => 'json',
        'features' => 'json',
        'is_synced' => 'boolean',
        'active' => 'boolean',
        'is_breeder' => 'boolean',
        'is_featured' => 'boolean',
        'is_highlight' => 'boolean',
        'last_synced_at' => 'datetime',
    ];

    protected $appends = [
        'money_formatted',
        'logo',
        'plan_days',
        /* 'plan_id', */
    ];

    public static function stripePlan(): array
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        return StripePlan::all()->data;
    }

    protected static function booted(): void
    {
        static::saved(function (self $plan): void {
            // Skip syncing if we're in local environment or if this is a quiet update
            if (app()->isLocal() || $plan->wasRecentlyCreated === false && !$plan->isDirty()) {
                return;
            }

            // Sync to Stripe automatically after save
            // We'll dispatch this to a job in production for better performance
            if (app()->isProduction()) {
                // Dispatch sync job (you can create this later)
                dispatch(function () use ($plan) {
                    app(\App\Services\StripePlanSyncService::class)->syncToStripe($plan);
                });
            } else {
                // Sync immediately in non-production environments
                app(\App\Services\StripePlanSyncService::class)->syncToStripe($plan);
            }
        });
    }

    public function getPlanDaysAttribute()
    {
        if ($this->type == 'free') {
            return 'FREE';
        }

        $total = 0;
        if ($this->interval === 'year') {
            $total = $this->interval_count * 365;
        } elseif ($this->interval === 'month') {
            $total = $this->interval_count * 30;
        }

        return $total.' Days';
    }

    protected static function createStripePlan(self $plan): ?StripePlan
    {
        $lastCreatedPlan = null;
        if (! app()->isLocal()) {

            $lastCreatedPlan = StripePlan::create([
                'amount' => $plan->money,
                'currency' => $plan->currency_code,
                'interval' => $plan->interval,
                'interval_count' => $plan->interval_count,
                'product' => [
                    'name' => $plan->name,
                ],
            ]);

        }

        return $lastCreatedPlan;
    }

    public function getLogoAttribute()
    {
        return $this->getFirstMedia('logo')?->getUrl();
    }

    protected static function updateStripePlan(self $plan): void
    {
        if (empty($plan->stripe_plan_id)) {
            return; // No stripe_plan_id available to update
        }

        try {
            // Update the existing Stripe plan
            $stripePlan = StripePlan::update($plan->stripe_plan_id, [
                'amount' => $plan->money,
                'currency' => $plan->currency_code,
            ]);
        } catch (Exception $e) {
            // Handle the exception if something goes wrong
            Log::error('Failed to update Stripe plan: '.$e->getMessage());
        }
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('active', true);
    }

    public function getCurrencyCodeAttribute(): string
    {
        return Money::USD($this->price)->getMoney()->getCurrency()->getCode();
    }

    /* public function getPlanIdAttribute(): ?string */
    /* { */
    /*     Stripe::setApiKey(config('services.stripe.secret')); */
    /*     $plans = StripePlan::all()->data; */

    /*     return $plans[0]->id ?? null; */
    /* } */

    public function getMoneyAttribute(): int
    {
        return Money::USD($this->price)->getMoney()->getAmount();
    }

    public function getMoneyFormattedAttribute(): string
    {
        /* if ($this->interval === 'year') { */
        /*     return Money::USD($this->price / 12)->formatByIntl(); */
        /* } */

        return Money::USD($this->price)->formatByIntl();
    }
}

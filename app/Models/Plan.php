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
    ];

    protected $casts = [
        'interval' => 'json',
        'features' => 'json',
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
        static::saving(function (self $model): void {
            /* if (empty($model->stripe_plan_id)) { */
            /*     $model->stripe_plan_id = ''; */
            /* } */
        });

        static::saved(function (self $plan): void {
            Stripe::setApiKey(config('services.stripe.secret'));
            /* $stripePlan = self::createStripePlan($plan); */

            if ($plan->stripe_plan_id === 0 || empty($plan->stripe_plan_id) && $plan->price > 0 ) {

                $stripePlan = self::createStripePlan($plan);
                $plan->updateQuietly([
                    'stripe_plan_id' => $stripePlan->id,
                    'stripe_product_id' => $stripePlan->product,
                ]);

            } else {

                /*                 if ($plan->wasChanged('price')) { */
                /*                     $newStripePlan = self::createStripePlan($plan); */
                /*                     $plan->updateQuietly(['stripe_plan_id' => $newStripePlan->id]); */
                /*                 } */
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

    protected static function createStripePlan(self $plan): StripePlan
    {
        $lastCreatedPlan = null;
        $lastCreatedPlan = StripePlan::create([
            'amount' => $plan->money,
            'currency' => $plan->currency_code,
            'interval' => $plan->interval,
            'interval_count' => $plan->interval_count,
            'product' => [
                'name' => $plan->name,
            ],
        ]);

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

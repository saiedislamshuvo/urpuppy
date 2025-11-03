<?php

namespace App\Services;

use App\Models\Plan;
use Exception;
use Illuminate\Support\Facades\Log;
use Stripe\Exception\ApiErrorException;
use Stripe\Plan as StripePlan;
use Stripe\Price;
use Stripe\Product;
use Stripe\Stripe;

class StripePlanSyncService
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    /**
     * Sync all plans from Stripe to local database
     */
    public function syncFromStripe(): array
    {
        $results = [
            'created' => 0,
            'updated' => 0,
            'errors' => [],
        ];

        try {
            // Get all active prices from Stripe (prices are the new way, plans are legacy)
            $prices = Price::all(['active' => true, 'limit' => 100]);

            foreach ($prices->data as $stripePrice) {
                try {
                    // Only sync recurring prices
                    if ($stripePrice->type !== 'recurring') {
                        continue;
                    }

                    // Get product details
                    $product = Product::retrieve($stripePrice->product);

                    // Find or create plan
                    $plan = Plan::where('stripe_plan_id', $stripePrice->id)
                        ->orWhere('stripe_product_id', $product->id)
                        ->first();

                    $planData = [
                        'stripe_plan_id' => $stripePrice->id,
                        'stripe_product_id' => $product->id,
                        'name' => $product->name,
                        'price' => $stripePrice->unit_amount ? $stripePrice->unit_amount / 100 : 0,
                        'interval' => $stripePrice->recurring->interval ?? 'month',
                        'active' => (bool) ($stripePrice->active && $product->active),
                        'is_synced' => true,
                        'sync_error' => null,
                        'last_synced_at' => now(),
                    ];

                    if ($plan) {
                        $plan->update($planData);
                        $results['updated']++;
                    } else {
                        // Set defaults for new plans
                        $planData = array_merge([
                            'type' => 'seller',
                            'trial_days' => 0,
                            'listing_limit' => null,
                            'image_per_listing' => 5,
                            'video_per_listing' => 1,
                            'is_breeder' => false,
                            'is_featured' => false,
                            'is_highlight' => false,
                        ], $planData);

                        Plan::create($planData);
                        $results['created']++;
                    }
                } catch (Exception $e) {
                    $results['errors'][] = "Error syncing price {$stripePrice->id}: {$e->getMessage()}";
                    Log::error('Stripe plan sync error', [
                        'price_id' => $stripePrice->id,
                        'error' => $e->getMessage(),
                    ]);
                }
            }
        } catch (ApiErrorException $e) {
            $results['errors'][] = "Stripe API error: {$e->getMessage()}";
            Log::error('Stripe API error during sync', ['error' => $e->getMessage()]);
        }

        return $results;
    }

    /**
     * Sync a local plan to Stripe (create or update)
     */
    public function syncToStripe(Plan $plan): bool
    {
        try {
            // Skip free plans
            if ($plan->price <= 0) {
                $plan->update([
                    'is_synced' => true,
                    'sync_error' => null,
                    'last_synced_at' => now(),
                ]);
                return true;
            }

            $productData = [
                'name' => $plan->name,
                'active' => (bool) $plan->active,
            ];

            // Create or update product
            if ($plan->stripe_product_id) {
                try {
                    $product = Product::update($plan->stripe_product_id, $productData);
                } catch (ApiErrorException $e) {
                    // Product not found, create new one
                    $product = Product::create($productData);
                }
            } else {
                $product = Product::create($productData);
            }

            // Create or update price
            // Note: Stripe prices are immutable, so we create a new one if changes are detected
            if ($plan->stripe_plan_id) {
                try {
                    $existingPrice = Price::retrieve($plan->stripe_plan_id);
                    
                    // Check if price details have changed
                    $priceChanged = 
                        $existingPrice->unit_amount != ($plan->price * 100) ||
                        $existingPrice->recurring->interval != $plan->interval;

                    if ($priceChanged) {
                        // Create new price since Stripe prices are immutable
                        $newPrice = $this->createStripePrice($plan, $product->id);
                        
                        // Deactivate old price
                        Price::update($plan->stripe_plan_id, ['active' => false]);
                        
                        $plan->stripe_plan_id = $newPrice->id;
                    } else {
                        // Just update the active status
                        Price::update($plan->stripe_plan_id, ['active' => (bool) $plan->active]);
                    }
                } catch (ApiErrorException $e) {
                    // Price not found, create new one
                    $newPrice = $this->createStripePrice($plan, $product->id);
                    $plan->stripe_plan_id = $newPrice->id;
                }
            } else {
                // Create new price
                $newPrice = $this->createStripePrice($plan, $product->id);
                $plan->stripe_plan_id = $newPrice->id;
            }

            // Update plan with sync status
            $plan->updateQuietly([
                'stripe_product_id' => $product->id,
                'stripe_plan_id' => $plan->stripe_plan_id,
                'is_synced' => true,
                'sync_error' => null,
                'last_synced_at' => now(),
            ]);

            return true;
        } catch (Exception $e) {
            Log::error('Error syncing plan to Stripe', [
                'plan_id' => $plan->id,
                'error' => $e->getMessage(),
            ]);

            $plan->updateQuietly([
                'is_synced' => false,
                'sync_error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Create a new Stripe price
     */
    private function createStripePrice(Plan $plan, string $productId): Price
    {
        return Price::create([
            'unit_amount' => (int) ($plan->price * 100),
            'currency' => 'usd',
            'recurring' => [
                'interval' => $plan->interval,
                'interval_count' => 1,
            ],
            'product' => $productId,
            'active' => (bool) $plan->active,
        ]);
    }

    /**
     * Handle Stripe product update webhook
     */
    public function handleProductUpdate(array $stripeProduct): void
    {
        try {
            $plan = Plan::where('stripe_product_id', $stripeProduct['id'])->first();

            if ($plan) {
                $plan->update([
                    'name' => $stripeProduct['name'],
                    'active' => (bool) $stripeProduct['active'],
                    'is_synced' => true,
                    'sync_error' => null,
                    'last_synced_at' => now(),
                ]);
            }
        } catch (Exception $e) {
            Log::error('Error handling Stripe product update', [
                'product_id' => $stripeProduct['id'],
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Handle Stripe price update webhook
     */
    public function handlePriceUpdate(array $stripePrice): void
    {
        try {
            $plan = Plan::where('stripe_plan_id', $stripePrice['id'])->first();

            if ($plan) {
                $plan->update([
                    'price' => $stripePrice['unit_amount'] ? $stripePrice['unit_amount'] / 100 : 0,
                    'active' => (bool) $stripePrice['active'],
                    'is_synced' => true,
                    'sync_error' => null,
                    'last_synced_at' => now(),
                ]);
            }
        } catch (Exception $e) {
            Log::error('Error handling Stripe price update', [
                'price_id' => $stripePrice['id'],
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Handle Stripe product deletion webhook
     */
    public function handleProductDelete(array $stripeProduct): void
    {
        try {
            $plan = Plan::where('stripe_product_id', $stripeProduct['id'])->first();

            if ($plan) {
                $plan->update([
                    'active' => false,
                    'is_synced' => true,
                    'last_synced_at' => now(),
                ]);
            }
        } catch (Exception $e) {
            Log::error('Error handling Stripe product delete', [
                'product_id' => $stripeProduct['id'],
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Handle Stripe price deletion webhook
     */
    public function handlePriceDelete(array $stripePrice): void
    {
        try {
            $plan = Plan::where('stripe_plan_id', $stripePrice['id'])->first();

            if ($plan) {
                $plan->update([
                    'active' => false,
                    'is_synced' => true,
                    'last_synced_at' => now(),
                ]);
            }
        } catch (Exception $e) {
            Log::error('Error handling Stripe price delete', [
                'price_id' => $stripePrice['id'],
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Mark unsynced plans as inactive
     */
    public function deactivateUnsyncedPlans(): int
    {
        return Plan::where('is_synced', false)
            ->where('active', true)
            ->update(['active' => false]);
    }
}


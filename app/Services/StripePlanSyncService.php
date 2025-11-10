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

                    // Sync features from Stripe metadata
                    if (!empty($product->metadata) && isset($product->metadata['features']) && !empty($product->metadata['features'])) {
                        try {
                            $featuresJson = $product->metadata['features'];
                            
                            // Log for debugging
                            Log::info('Syncing features from Stripe', [
                                'product_id' => $product->id,
                                'features_json' => $featuresJson,
                            ]);
                            
                            $featuresArray = json_decode($featuresJson, true);
                            
                            // Handle case where features might already be an array (not JSON string)
                            if (!is_array($featuresArray) && is_string($featuresJson)) {
                                // Try to decode again or treat as single feature
                                $featuresArray = [$featuresJson];
                            }
                            
                            if (is_array($featuresArray) && !empty($featuresArray)) {
                                // Convert to the format expected by the form (array of objects with 'name' key)
                                $planData['features'] = array_values(array_map(function($feature) {
                                    // Handle both string and array formats
                                    if (is_array($feature)) {
                                        return ['name' => $feature['name'] ?? $feature[0] ?? ''];
                                    }
                                    return ['name' => (string)$feature];
                                }, array_filter($featuresArray, function($f) {
                                    // Filter out empty features
                                    if (is_array($f)) {
                                        return !empty($f['name'] ?? $f[0] ?? '');
                                    }
                                    return !empty(trim((string)$f));
                                })));
                                
                                Log::info('Features parsed successfully', [
                                    'product_id' => $product->id,
                                    'features_count' => count($planData['features']),
                                    'features' => $planData['features'],
                                ]);
                            } else {
                                Log::warning('Features array is empty or invalid', [
                                    'product_id' => $product->id,
                                    'features_array' => $featuresArray,
                                ]);
                                $planData['features'] = [];
                            }
                        } catch (Exception $e) {
                            Log::error('Failed to parse features from Stripe metadata', [
                                'product_id' => $product->id,
                                'features_json' => $product->metadata['features'] ?? null,
                                'error' => $e->getMessage(),
                                'trace' => $e->getTraceAsString(),
                            ]);
                            // Don't set features if parsing fails
                        }
                    } else {
                        // If no features in Stripe, set to empty array to clear local features
                        $planData['features'] = [];
                        Log::info('No features found in Stripe metadata', [
                            'product_id' => $product->id,
                            'metadata' => $product->metadata ?? null,
                        ]);
                    }

                    if ($plan) {
                        $plan->update($planData);
                        
                        // Sync images from Stripe
                        $this->syncImagesFromStripe($plan, $product);
                        
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

                        $plan = Plan::create($planData);
                        
                        // Sync images from Stripe
                        $this->syncImagesFromStripe($plan, $product);
                        
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

            // Prepare product data with images and features
            $productData = [
                'name' => $plan->name,
                'active' => (bool) $plan->active,
            ];

            // Add logo image if available
            $logoMedia = $plan->getFirstMedia('logo');
            if ($logoMedia) {
                $logoUrl = $logoMedia->getUrl();
                // Ensure it's a full URL (not relative)
                if (!filter_var($logoUrl, FILTER_VALIDATE_URL)) {
                    $logoUrl = url($logoUrl);
                }
                $productData['images'] = [$logoUrl];
            }

            // Prepare metadata - start with existing metadata if updating
            $metadata = [];
            if ($plan->stripe_product_id) {
                try {
                    $existingProduct = Product::retrieve($plan->stripe_product_id);
                    // Preserve existing metadata
                    if (!empty($existingProduct->metadata) && is_array($existingProduct->metadata)) {
                        $metadata = $existingProduct->metadata;
                    }
                } catch (ApiErrorException $e) {
                    // Product doesn't exist yet, start with empty metadata
                    $metadata = [];
                }
            }

            // Add features to metadata
            if ($plan->features) {
                $features = is_array($plan->features) ? $plan->features : json_decode($plan->features, true);
                if ($features && is_array($features) && !empty($features)) {
                    // Convert features array to JSON string for metadata
                    $featuresList = array_map(function($feature) {
                        return is_array($feature) ? ($feature['name'] ?? '') : $feature;
                    }, $features);
                    // Filter out empty features
                    $featuresList = array_filter($featuresList, function($feature) {
                        return !empty(trim($feature));
                    });
                    if (!empty($featuresList)) {
                        $metadata['features'] = json_encode(array_values($featuresList));
                    }
                }
            }

            // Only add metadata if we have something to set
            if (!empty($metadata)) {
                $productData['metadata'] = $metadata;
            }

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
                $updateData = [
                    'name' => $stripeProduct['name'],
                    'active' => (bool) $stripeProduct['active'],
                    'is_synced' => true,
                    'sync_error' => null,
                    'last_synced_at' => now(),
                ];

                // Sync features from metadata
                if (isset($stripeProduct['metadata']['features']) && !empty($stripeProduct['metadata']['features'])) {
                    try {
                        $featuresJson = $stripeProduct['metadata']['features'];
                        $featuresArray = json_decode($featuresJson, true);
                        if (is_array($featuresArray) && !empty($featuresArray)) {
                            // Convert to the format expected by the form (array of objects with 'name' key)
                            $updateData['features'] = array_map(function($feature) {
                                // Handle both string and array formats
                                if (is_array($feature)) {
                                    return ['name' => $feature['name'] ?? $feature[0] ?? ''];
                                }
                                return ['name' => (string)$feature];
                            }, array_filter($featuresArray, function($f) {
                                // Filter out empty features
                                if (is_array($f)) {
                                    return !empty($f['name'] ?? $f[0] ?? '');
                                }
                                return !empty(trim((string)$f));
                            }));
                        } else {
                            // If features array is empty, set to empty array
                            $updateData['features'] = [];
                        }
                    } catch (Exception $e) {
                        Log::warning('Failed to parse features from Stripe webhook', [
                            'product_id' => $stripeProduct['id'],
                            'features_json' => $stripeProduct['metadata']['features'] ?? null,
                            'error' => $e->getMessage(),
                        ]);
                    }
                } else {
                    // If no features in Stripe, set to empty array to clear local features
                    $updateData['features'] = [];
                }

                $plan->update($updateData);

                // Sync images from Stripe
                try {
                    $product = Product::retrieve($stripeProduct['id']);
                    $this->syncImagesFromStripe($plan, $product);
                } catch (Exception $e) {
                    Log::warning('Failed to sync images from Stripe webhook', [
                        'product_id' => $stripeProduct['id'],
                        'error' => $e->getMessage(),
                    ]);
                }
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

    /**
     * Sync images from Stripe product to local media library
     */
    public function syncImagesFromStripe(Plan $plan, Product $product): void
    {
        try {
            // Only sync if Stripe has images
            if (empty($product->images) || !is_array($product->images)) {
                return;
            }

            // Get the first image (logo)
            $stripeImageUrl = $product->images[0] ?? null;
            if (!$stripeImageUrl) {
                return;
            }

            // Check if we already have this image
            $existingLogo = $plan->getFirstMedia('logo');
            if ($existingLogo) {
                // Check if the URL matches (skip if same)
                $existingUrl = $existingLogo->getUrl();
                if ($existingUrl === $stripeImageUrl || str_contains($existingUrl, parse_url($stripeImageUrl, PHP_URL_PATH))) {
                    return;
                }
            }

            // Clear existing logo collection
            $plan->clearMediaCollection('logo');

            // Download and add image from Stripe URL
            try {
                $plan->addMediaFromUrl($stripeImageUrl)
                    ->toMediaCollection('logo');
                
                Log::info('Synced image from Stripe to plan', [
                    'plan_id' => $plan->id,
                    'image_url' => $stripeImageUrl,
                ]);
            } catch (Exception $e) {
                Log::warning('Failed to download image from Stripe', [
                    'plan_id' => $plan->id,
                    'image_url' => $stripeImageUrl,
                    'error' => $e->getMessage(),
                ]);
            }
        } catch (Exception $e) {
            Log::error('Error syncing images from Stripe', [
                'plan_id' => $plan->id,
                'product_id' => $product->id ?? null,
                'error' => $e->getMessage(),
            ]);
        }
    }
}


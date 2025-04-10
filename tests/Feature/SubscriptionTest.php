<?php

use App\Mail\FreeAccountMail;
use App\Mail\NewBreederSpecialAccountMail;
use App\Mail\PremiumAccountMail;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;
use Str;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\postJson;

test('shows the subscriptions page', function () {
    $user = User::factory()->create();
    actingAs($user);

    get('/subscriptions')
        ->assertInertia(function (Assert $page) {
            $page->component('Subscription/Index');
            /* $page->has('breeds.data', 20); */
        });
});

test('it_processes_stripe_payment_webhook_for_premium_account', function () {
    Mail::fake();

    $user = User::factory()->create();

    $this->actingAs($user);

    $plan = Plan::factory()->create([
        'name' => 'Monthly',
        'type' => 'premium',
        'price' => 1000, // Price in cents
        'order_column' => 1,
    ]);

    /* dd($plan); */

    $user->createOrGetStripeCustomer();

    $webhookPayload = [
        'id' => 'evt_'.Str::random(14),
        'object' => 'event',
        'status' => 'complete',
        'api_version' => '2024-09-30.acacia',
        'created' => now()->timestamp,
        'type' => 'customer.subscription.created',
        'data' => [
            'status' => 'active',
            'object' => [
                'id' => 'sub_'.Str::random(14),

                'status' => 'active',
                'object' => 'subscription',
                'application' => null,
                'application_fee_percent' => null,
                'automatic_tax' => [
                    'enabled' => false,
                    'liability' => null,
                ],
                'billing_cycle_anchor' => now()->timestamp,
                'billing_cycle_anchor_config' => null,
                'billing_thresholds' => null,
                'cancel_at' => null,
                'cancel_at_period_end' => false,
                'canceled_at' => null,
                'cancellation_details' => [
                    'comment' => null,
                    'feedback' => null,
                    'reason' => null,
                ],
                'collection_method' => 'charge_automatically',
                'created' => now()->timestamp,
                'currency' => 'usd',
                'current_period_end' => now()->addMonth()->timestamp,
                'current_period_start' => now()->timestamp,
                'customer' => $user->stripe_id,
                'days_until_due' => null,
                'default_payment_method' => null,
                'default_source' => null,
                'default_tax_rates' => [],
                'description' => null,
                'discount' => null,
                'discounts' => [],
                'ended_at' => null,
                'invoice_settings' => [
                    'account_tax_ids' => null,
                    'issuer' => [
                        'type' => 'self',
                    ],
                ],
                'items' => [
                    'object' => 'list',
                    'data' => [
                        [
                            'id' => 'si_'.Str::random(14),
                            'object' => 'subscription_item',
                            'billing_thresholds' => null,
                            'created' => now()->timestamp,
                            'discounts' => [],
                            'metadata' => [],
                            'plan' => [
                                'id' => $plan->stripe_plan_id,
                                'object' => 'plan',
                                'active' => true,
                                'aggregate_usage' => null,
                                'amount' => $plan->price,
                                'amount_decimal' => rand(1000, 10000),
                                'billing_scheme' => 'per_unit',
                                'created' => now()->timestamp,
                                'currency' => 'usd',
                                'interval' => 'month',
                                'interval_count' => 1,
                                'livemode' => false,
                                'metadata' => ['type' => 'standard'],
                                'meter' => null,
                                'nickname' => null,
                                'product' => 'prod_'.Str::random(14),
                                'tiers_mode' => null,
                                'transform_usage' => null,
                                'trial_period_days' => null,
                                'usage_type' => 'licensed',
                            ],
                            'price' => [
                                'id' => $plan->stripe_plan_id,
                                'object' => 'price',
                                'active' => true,
                                'billing_scheme' => 'per_unit',
                                'created' => now()->timestamp,
                                'currency' => 'usd',
                                'custom_unit_amount' => null,
                                'livemode' => false,
                                'lookup_key' => null,
                                'metadata' => ['type' => 'standard'],
                                'nickname' => null,
                                'product' => 'prod_'.Str::random(14),
                                'recurring' => [
                                    'aggregate_usage' => null,
                                    'interval' => 'month',
                                    'interval_count' => 1,
                                    'meter' => null,
                                    'trial_period_days' => null,
                                    'usage_type' => 'licensed',
                                ],
                                'tax_behavior' => 'unspecified',
                                'tiers_mode' => null,
                                'transform_quantity' => null,
                                'type' => 'recurring',
                                'unit_amount' => $plan->price,
                                'unit_amount_decimal' => rand(1000, 10000),
                            ],
                            'quantity' => 1,
                            'subscription' => 'sub_'.Str::random(14),
                            'tax_rates' => [],
                        ],
                    ],
                    'has_more' => false,
                    'total_count' => 1,
                    'url' => '/v1/subscription_items?subscription=sub_'.Str::random(14),
                ],
                'latest_invoice' => 'in_'.Str::random(14),
                'livemode' => false,
                'metadata' => [

                    'status' => 'active',
                    'plan_type' => $plan->type,
                    'is_on_session_checkout' => 'true',
                    'type' => 'standard',
                    'name' => 'standard',
                ],
                'next_pending_invoice_item_invoice' => null,
            ],
        ],
    ];

    $response = postJson('http://localhost/stripe/webhook', $webhookPayload);

    Mail::assertQueued(PremiumAccountMail::class);
});

test('it_processes_stripe_payment_webhook_for_breeder_account', function () {
    Mail::fake();

    $user = User::factory()->create();

    $this->actingAs($user);

    $plan = Plan::factory()->create([
        'name' => 'Monthly',
        'type' => 'breeder',
        'price' => 1000, // Price in cents
        'order_column' => 1,
    ]);

    /* dd($plan); */

    $user->createOrGetStripeCustomer();

    $webhookPayload = [
        'id' => 'evt_'.Str::random(14),
        'object' => 'event',
        'status' => 'complete',
        'api_version' => '2024-09-30.acacia',
        'created' => now()->timestamp,
        'type' => 'customer.subscription.created',
        'data' => [
            'status' => 'active',
            'object' => [
                'id' => 'sub_'.Str::random(14),

                'status' => 'active',
                'object' => 'subscription',
                'application' => null,
                'application_fee_percent' => null,
                'automatic_tax' => [
                    'enabled' => false,
                    'liability' => null,
                ],
                'billing_cycle_anchor' => now()->timestamp,
                'billing_cycle_anchor_config' => null,
                'billing_thresholds' => null,
                'cancel_at' => null,
                'cancel_at_period_end' => false,
                'canceled_at' => null,
                'cancellation_details' => [
                    'comment' => null,
                    'feedback' => null,
                    'reason' => null,
                ],
                'collection_method' => 'charge_automatically',
                'created' => now()->timestamp,
                'currency' => 'usd',
                'current_period_end' => now()->addMonth()->timestamp,
                'current_period_start' => now()->timestamp,
                'customer' => $user->stripe_id,
                'days_until_due' => null,
                'default_payment_method' => null,
                'default_source' => null,
                'default_tax_rates' => [],
                'description' => null,
                'discount' => null,
                'discounts' => [],
                'ended_at' => null,
                'invoice_settings' => [
                    'account_tax_ids' => null,
                    'issuer' => [
                        'type' => 'self',
                    ],
                ],
                'items' => [
                    'object' => 'list',
                    'data' => [
                        [
                            'id' => 'si_'.Str::random(14),
                            'object' => 'subscription_item',
                            'billing_thresholds' => null,
                            'created' => now()->timestamp,
                            'discounts' => [],
                            'metadata' => [],
                            'plan' => [
                                'id' => $plan->stripe_plan_id,
                                'object' => 'plan',
                                'active' => true,
                                'aggregate_usage' => null,
                                'amount' => $plan->price,
                                'amount_decimal' => rand(1000, 10000),
                                'billing_scheme' => 'per_unit',
                                'created' => now()->timestamp,
                                'currency' => 'usd',
                                'interval' => 'month',
                                'interval_count' => 1,
                                'livemode' => false,
                                'metadata' => ['type' => 'standard'],
                                'meter' => null,
                                'nickname' => null,
                                'product' => 'prod_'.Str::random(14),
                                'tiers_mode' => null,
                                'transform_usage' => null,
                                'trial_period_days' => null,
                                'usage_type' => 'licensed',
                            ],
                            'price' => [
                                'id' => $plan->stripe_plan_id,
                                'object' => 'price',
                                'active' => true,
                                'billing_scheme' => 'per_unit',
                                'created' => now()->timestamp,
                                'currency' => 'usd',
                                'custom_unit_amount' => null,
                                'livemode' => false,
                                'lookup_key' => null,
                                'metadata' => ['type' => 'standard'],
                                'nickname' => null,
                                'product' => 'prod_'.Str::random(14),
                                'recurring' => [
                                    'aggregate_usage' => null,
                                    'interval' => 'month',
                                    'interval_count' => 1,
                                    'meter' => null,
                                    'trial_period_days' => null,
                                    'usage_type' => 'licensed',
                                ],
                                'tax_behavior' => 'unspecified',
                                'tiers_mode' => null,
                                'transform_quantity' => null,
                                'type' => 'recurring',
                                'unit_amount' => $plan->price,
                                'unit_amount_decimal' => rand(1000, 10000),
                            ],
                            'quantity' => 1,
                            'subscription' => 'sub_'.Str::random(14),
                            'tax_rates' => [],
                        ],
                    ],
                    'has_more' => false,
                    'total_count' => 1,
                    'url' => '/v1/subscription_items?subscription=sub_'.Str::random(14),
                ],
                'latest_invoice' => 'in_'.Str::random(14),
                'livemode' => false,
                'metadata' => [

                    'status' => 'active',
                    'plan_type' => $plan->type,
                    'is_on_session_checkout' => 'true',
                    'type' => 'standard',
                    'name' => 'standard',
                ],
                'next_pending_invoice_item_invoice' => null,
            ],
        ],
    ];

    $response = postJson('http://localhost/stripe/webhook', $webhookPayload);

    Mail::assertQueued(NewBreederSpecialAccountMail::class);
});

test('it_processes_stripe_payment_webhook_for_free_account', function () {
    Mail::fake();

    $user = User::factory()->create();

    $this->actingAs($user);

    $plan = Plan::factory()->create([
        'name' => 'Monthly',
        'type' => 'free',
        'price' => 1000, // Price in cents
        'order_column' => 1,
    ]);

    /* dd($plan); */

    $user->createOrGetStripeCustomer();

    $webhookPayload = [
        'id' => 'evt_'.Str::random(14),
        'object' => 'event',
        'status' => 'complete',
        'api_version' => '2024-09-30.acacia',
        'created' => now()->timestamp,
        'type' => 'customer.subscription.created',
        'data' => [
            'status' => 'active',
            'object' => [
                'id' => 'sub_'.Str::random(14),

                'status' => 'active',
                'object' => 'subscription',
                'application' => null,
                'application_fee_percent' => null,
                'automatic_tax' => [
                    'enabled' => false,
                    'liability' => null,
                ],
                'billing_cycle_anchor' => now()->timestamp,
                'billing_cycle_anchor_config' => null,
                'billing_thresholds' => null,
                'cancel_at' => null,
                'cancel_at_period_end' => false,
                'canceled_at' => null,
                'cancellation_details' => [
                    'comment' => null,
                    'feedback' => null,
                    'reason' => null,
                ],
                'collection_method' => 'charge_automatically',
                'created' => now()->timestamp,
                'currency' => 'usd',
                'current_period_end' => now()->addMonth()->timestamp,
                'current_period_start' => now()->timestamp,
                'customer' => $user->stripe_id,
                'days_until_due' => null,
                'default_payment_method' => null,
                'default_source' => null,
                'default_tax_rates' => [],
                'description' => null,
                'discount' => null,
                'discounts' => [],
                'ended_at' => null,
                'invoice_settings' => [
                    'account_tax_ids' => null,
                    'issuer' => [
                        'type' => 'self',
                    ],
                ],
                'items' => [
                    'object' => 'list',
                    'data' => [
                        [
                            'id' => 'si_'.Str::random(14),
                            'object' => 'subscription_item',
                            'billing_thresholds' => null,
                            'created' => now()->timestamp,
                            'discounts' => [],
                            'metadata' => [],
                            'plan' => [
                                'id' => $plan->stripe_plan_id,
                                'object' => 'plan',
                                'active' => true,
                                'aggregate_usage' => null,
                                'amount' => $plan->price,
                                'amount_decimal' => rand(1000, 10000),
                                'billing_scheme' => 'per_unit',
                                'created' => now()->timestamp,
                                'currency' => 'usd',
                                'interval' => 'month',
                                'interval_count' => 1,
                                'livemode' => false,
                                'metadata' => ['type' => 'standard'],
                                'meter' => null,
                                'nickname' => null,
                                'product' => 'prod_'.Str::random(14),
                                'tiers_mode' => null,
                                'transform_usage' => null,
                                'trial_period_days' => null,
                                'usage_type' => 'licensed',
                            ],
                            'price' => [
                                'id' => $plan->stripe_plan_id,
                                'object' => 'price',
                                'active' => true,
                                'billing_scheme' => 'per_unit',
                                'created' => now()->timestamp,
                                'currency' => 'usd',
                                'custom_unit_amount' => null,
                                'livemode' => false,
                                'lookup_key' => null,
                                'metadata' => ['type' => 'standard'],
                                'nickname' => null,
                                'product' => 'prod_'.Str::random(14),
                                'recurring' => [
                                    'aggregate_usage' => null,
                                    'interval' => 'month',
                                    'interval_count' => 1,
                                    'meter' => null,
                                    'trial_period_days' => null,
                                    'usage_type' => 'licensed',
                                ],
                                'tax_behavior' => 'unspecified',
                                'tiers_mode' => null,
                                'transform_quantity' => null,
                                'type' => 'recurring',
                                'unit_amount' => $plan->price,
                                'unit_amount_decimal' => rand(1000, 10000),
                            ],
                            'quantity' => 1,
                            'subscription' => 'sub_'.Str::random(14),
                            'tax_rates' => [],
                        ],
                    ],
                    'has_more' => false,
                    'total_count' => 1,
                    'url' => '/v1/subscription_items?subscription=sub_'.Str::random(14),
                ],
                'latest_invoice' => 'in_'.Str::random(14),
                'livemode' => false,
                'metadata' => [

                    'status' => 'active',
                    'plan_type' => $plan->type,
                    'is_on_session_checkout' => 'true',
                    'type' => 'standard',
                    'name' => 'standard',
                ],
                'next_pending_invoice_item_invoice' => null,
            ],
        ],
    ];

    $response = postJson('http://localhost/stripe/webhook', $webhookPayload);

    Mail::assertQueued(FreeAccountMail::class);
});

test('it_processes_stripe_payment_webhook_for_renewal_for_premium_account', function () {
    Mail::fake();

    $user = User::factory()->create();

    $this->actingAs($user);

    $plan = Plan::factory()->create([
        'name' => 'Monthly',
        'type' => 'premium', // Assuming this is for a premium account
        'price' => 1000, // Price in cents
        'order_column' => 1,
    ]);

    $user->createOrGetStripeCustomer();

    // Simulate the webhook payload for invoice.payment_succeeded (renewal)
    $webhookPayload = [
        'id' => 'evt_'.Str::random(14),
        'object' => 'event',
        'status' => 'complete',
        'api_version' => '2024-09-30.acacia',
        'created' => now()->timestamp,
        'type' => 'invoice.payment_succeeded',
        'data' => [
            'object' => [
                'id' => 'in_'.Str::random(14),
                'object' => 'invoice',
                'amount_paid' => $plan->price, // Simulating payment of the subscription
                'billing_reason' => 'subscription_cycle', // This ensures it's a renewal
                'customer' => $user->stripe_id,
                'subscription' => 'sub_'.Str::random(14),
                'lines' => [
                    'object' => 'list',
                    'data' => [
                        [
                            'id' => 'si_'.Str::random(14),
                            'object' => 'subscription_item',
                            'price' => [
                                'id' => $plan->stripe_plan_id,
                                'object' => 'price',
                                'unit_amount' => $plan->price,
                                'currency' => 'usd',
                                'product' => 'prod_'.Str::random(14),
                            ],
                            'quantity' => 1,
                            'subscription' => 'sub_'.Str::random(14),
                        ],
                    ],
                ],
                'livemode' => false,
                'metadata' => [
                    'plan_type' => $plan->type, // Make sure the plan type is set here
                ],
            ],
        ],
    ];

    // Simulate a POST request to the webhook route
    $response = postJson('http://localhost/stripe/webhook', $webhookPayload);
    /* dd($response); */

    // Assert that the correct mail for premium account was queued
    Mail::assertQueued(\App\Mail\RenewSellerMail::class);
});

test('it_processes_stripe_payment_webhook_for_renewal_for_breeder_account', function () {
    Mail::fake();

    $user = User::factory()->create();

    $this->actingAs($user);

    $plan = Plan::factory()->create([
        'name' => 'Monthly',
        'type' => 'breeder', // Assuming this is for a premium account
        'price' => 1000, // Price in cents
        'order_column' => 1,
    ]);

    $user->createOrGetStripeCustomer();

    // Simulate the webhook payload for invoice.payment_succeeded (renewal)
    $webhookPayload = [
        'id' => 'evt_'.Str::random(14),
        'object' => 'event',
        'status' => 'complete',
        'api_version' => '2024-09-30.acacia',
        'created' => now()->timestamp,
        'type' => 'invoice.payment_succeeded',
        'data' => [
            'object' => [
                'id' => 'in_'.Str::random(14),
                'object' => 'invoice',
                'amount_paid' => $plan->price, // Simulating payment of the subscription
                'billing_reason' => 'subscription_cycle', // This ensures it's a renewal
                'customer' => $user->stripe_id,
                'subscription' => 'sub_'.Str::random(14),
                'lines' => [
                    'object' => 'list',
                    'data' => [
                        [
                            'id' => 'si_'.Str::random(14),
                            'object' => 'subscription_item',
                            'price' => [
                                'id' => $plan->stripe_plan_id,
                                'object' => 'price',
                                'unit_amount' => $plan->price,
                                'currency' => 'usd',
                                'product' => 'prod_'.Str::random(14),
                            ],
                            'quantity' => 1,
                            'subscription' => 'sub_'.Str::random(14),
                        ],
                    ],
                ],
                'livemode' => false,
                'metadata' => [
                    'plan_type' => $plan->type, // Make sure the plan type is set here
                ],
            ],
        ],
    ];

    // Simulate a POST request to the webhook route
    $response = postJson('http://localhost/stripe/webhook', $webhookPayload);

    // Assert that the correct mail for premium account was queued
    Mail::assertQueued(\App\Mail\RenewBreederMail::class);
});

test('it_processes_stripe_payment_webhook_for_subscription_ended', function () {
    Mail::fake();

    $user = User::factory()->create();

    $this->actingAs($user);

    $plan = Plan::factory()->create([
        'name' => 'Monthly',
        'type' => 'breeder', // Assuming this is for a premium account
        'price' => 1000, // Price in cents
        'order_column' => 1,
    ]);

    $user->createOrGetStripeCustomer();

    // Simulate the webhook payload for invoice.payment_succeeded (renewal)
    $webhookPayload = [
        'id' => 'evt_'.Str::random(14),
        'object' => 'event',
        'status' => 'complete',
        'api_version' => '2024-09-30.acacia',
        'created' => now()->timestamp,
        'type' => 'customer.subscription.updated',
        'data' => [
            'object' => [
                'id' => 'in_'.Str::random(14),
                'canceled_at' => now()->timestamp,
                'object' => 'invoice',
                'amount_paid' => $plan->price, // Simulating payment of the subscription
                /* 'billing_reason' => 'subscription_cycle', // This ensures it's a renewal */
                'customer' => $user->stripe_id,
                'subscription' => 'sub_'.Str::random(14),
                'lines' => [
                    'object' => 'list',
                    'data' => [
                        [
                            'id' => 'si_'.Str::random(14),
                            'object' => 'subscription_item',
                            'price' => [
                                'id' => $plan->stripe_plan_id,
                                'object' => 'price',
                                'unit_amount' => $plan->price,
                                'currency' => 'usd',
                                'product' => 'prod_'.Str::random(14),
                            ],
                            'quantity' => 1,
                            'subscription' => 'sub_'.Str::random(14),
                        ],
                    ],
                ],
                'livemode' => false,
                'metadata' => [
                    'plan_type' => $plan->type, // Make sure the plan type is set here
                    'cancellation_reason' => 'sheeshilentiks',
                ],
            ],
        ],
    ];

    // Simulate a POST request to the webhook route
    $response = postJson('http://localhost/stripe/webhook', $webhookPayload);

    // Assert that the correct mail for premium account was queued
    Mail::assertQueued(\App\Mail\SubscriptionEnded::class);
});

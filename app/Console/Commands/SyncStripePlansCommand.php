<?php

namespace App\Console\Commands;

use App\Services\StripePlanSyncService;
use Illuminate\Console\Command;

class SyncStripePlansCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stripe:sync-plans
                            {--deactivate-unsynced : Deactivate plans that are not synced with Stripe}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync plans from Stripe to the local database';

    /**
     * Execute the console command.
     */
    public function handle(StripePlanSyncService $syncService)
    {
        $this->info('Starting Stripe plans sync...');

        $results = $syncService->syncFromStripe();

        $this->info("✓ Created: {$results['created']} plans");
        $this->info("✓ Updated: {$results['updated']} plans");

        if (count($results['errors']) > 0) {
            $this->error("✗ Errors: " . count($results['errors']));
            foreach ($results['errors'] as $error) {
                $this->error("  - {$error}");
            }
        }

        if ($this->option('deactivate-unsynced')) {
            $deactivated = $syncService->deactivateUnsyncedPlans();
            $this->info("✓ Deactivated {$deactivated} unsynced plans");
        }

        $this->info('Sync completed!');

        return Command::SUCCESS;
    }
}

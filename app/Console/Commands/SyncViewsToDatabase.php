<?php

namespace App\Console\Commands;

use App\Models\Post;
use App\Models\Puppy;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
use Mavinoo\Batch\BatchFacade as Batch;

class SyncViewsToDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-views-db';

    protected $models = [
        Puppy::class,
        Post::class,
    ];

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync all redis view state to database';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        collect($this->models)->each(function ($model) {

            $views = $model::select('id')->pluck('id')->map(function ($id) use ($model) {
                return ['id' => $id, 'view_count' => Redis::pfcount(sprintf('%s.%s.views', (new $model)->getTable(), $id))];
            })->toArray();

            Batch::update(new $model, $views, 'id');
            /* batch()->update(new $model(), $views, 'id'); */
        });
    }
}

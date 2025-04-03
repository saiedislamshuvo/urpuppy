<?php

namespace App\Jobs;

use App\Models\Puppy;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProcessPuppyMedia implements ShouldQueue
{
    /**
     * Create a new job instance.
     */

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public Puppy $puppy,
        public array $filePaths,
        public string $collection
    ) {}

    public function handle()
    {
        /* foreach ($this->files as $file) { */
        foreach ($this->filePaths as $url) {
            try {
                $media = $this->puppy->addMediaFromUrl($url)->toMediaCollection($this->collection);
                if ($this->collection === 'video') {
                    GenerateVideoThumbnail::dispatch($media);
                }

                $path = parse_url($url, PHP_URL_PATH);
                Storage::disk('s3')->delete(ltrim($path, '/'));

            } catch (\Exception $e) {
                Log::error("Media processing failed: {$e->getMessage()}");
            }
        }

        Cache::forget('topics');
        Cache::forget('spotlights');
        Cache::forget('new');
    }

}

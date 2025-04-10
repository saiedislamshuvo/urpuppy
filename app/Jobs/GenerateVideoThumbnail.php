<?php

namespace App\Jobs;

use FFMpeg\Coordinate\TimeCode;
use FFMpeg\FFMpeg;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class GenerateVideoThumbnail implements ShouldQueue
{
    use Queueable;

    public Media $media;

    /**
     * Create a new job instance.
     */
    public function __construct(Media $media)
    {
        $this->media = $media;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $videoPath = $this->media->getPath();
            $videoPath = "http://minio:9000/urpuppy/$videoPath";

            $thumbnailPath = public_path('timecode.jpg');

            $ffmpeg = FFMpeg::create([
                'ffmpeg.binaries' => '/usr/bin/ffmpeg', // Update the path if needed
                'ffprobe.binaries' => '/usr/bin/ffprobe',
                'timeout' => 3600,
                'ffmpeg.threads' => 12,
            ]);

            $video = $ffmpeg->open($videoPath);
            $test = $video->frame(TimeCode::fromSeconds(1))->save($thumbnailPath);

            $t = $this->media->model->addMedia($thumbnailPath)
                ->toMediaCollection('thumbnails');

            // Delete the temporary thumbnail
            Storage::delete($thumbnailPath);
        } catch (\Exception $e) {
            \Log::error("Failed to generate thumbnail for video ID {$this->media->id}: ".$e->getMessage());
        }
    }
}

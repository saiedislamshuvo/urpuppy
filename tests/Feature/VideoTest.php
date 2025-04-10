<?php

use App\Jobs\GenerateVideoThumbnail;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use function PHPUnit\Framework\assertCount;
use function PHPUnit\Framework\assertNotNull;

test('can get helper videos', function () {

    Storage::fake('public');

    $petImagesPath = base_path('tests/test-videos');
    $mockedVideo = File::files($petImagesPath)[0];

    $image = User::factory()->create();
    $image->addMedia($mockedVideo)->preservingOriginal()->toMediaCollection('videos');

    User::factory()->create();
    User::factory()->create();

    assertCount(1, get_videos());
    assertNotNull(get_videos()->first());
});

test('can get helper videos max of 3', function () {
    $petImagesPath = base_path('tests/test-videos');
    $mockedVideo = File::files($petImagesPath)[0];

    $this->withoutExceptionHandling();
    Storage::fake('public');

    /* $mockedVideo = UploadedFile::fake()->create('video.mp4', 5000, 'video/mp4'); */

    $image = User::factory()->create();
    $image->addMedia($mockedVideo)->preservingOriginal()->toMediaCollection('videos');

    /* $mockedVideo = UploadedFile::fake()->create('video.mp4', 5000, 'video/mp4'); */
    $image = User::factory()->create();
    $image->addMedia($mockedVideo)->preservingOriginal()->toMediaCollection('videos');

    /* $mockedVideo = UploadedFile::fake()->create('video.mp4', 5000, 'video/mp4'); */
    $image = User::factory()->create();
    $image->addMedia($mockedVideo)->preservingOriginal()->toMediaCollection('videos');

    /* $mockedVideo = UploadedFile::fake()->create('video.mp4', 5000, 'video/mp4'); */
    $image = User::factory()->create();
    $image->addMedia($mockedVideo)->preservingOriginal()->toMediaCollection('videos');
    assertCount(3, get_videos());
});

test('it can generate thumbnail on video', function () {

    $petImagesPath = base_path('tests/test-videos');
    $videos = File::files($petImagesPath);

    /* $mockedVideo = UploadedFile::fake()->create($videos[0], 5000, 'video/mp4'); */
    $image = User::factory()->create();
    $image->addMedia($videos[0])
        ->preservingOriginal()
        ->toMediaCollection('videos');

    $d = GenerateVideoThumbnail::dispatchSync($image->getFirstMedia('videos'));

    $thumb = $image->media()->get();
    $new = User::query()->where('id', $image->id)->first();
    assertNotNull($new->getFirstMedia('thumbnails'));

});

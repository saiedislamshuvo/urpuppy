<?php

use App\Data\PuppyData;
use App\Models\Breed;
use App\Models\Country;
use App\Models\Puppy;
use App\Models\State;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\get;
use function PHPUnit\Framework\assertFalse;
use function PHPUnit\Framework\assertTrue;

test('shows the puppies page', function () {

    Puppy::factory()->times(20)->create();

    get('/puppies')
        ->assertInertia(function (Assert $page) {
            $page->component('Puppy/Index');
            $page->has('puppies.data', 12);
        });
});

test('show single puppy page', function () {

    $puppies = Puppy::factory()->times(20)->create();
    $puppy = $puppies->first();

    $sengil = get('/puppies/'.$puppy->slug)
        ->assertInertia(function (Assert $page) {
            $page->component('Puppy/Show');
            /* $page->has('puppies.data', 12); */
        });

});

test('can filter by breed', function () {
    Puppy::factory()->times(3)->create();
    $puppy = Puppy::factory()->create([

    ]);

    $bre = Breed::factory()->create([
        'name' => 'lugimok',
    ]);

    $puppy->breeds()->attach($bre);

    get('/puppies?filter[breed]=lugimok')
        ->assertInertia(function (Assert $page) {
            $page->component('Puppy/Index');
            $page->has('puppies.data', 1);
        });

});

test('can filter by gender', function () {
    $puppy = Puppy::factory()->times(3)->create([
        'gender' => 'Male',
    ]);

    $gend = Puppy::factory()->create([
        'gender' => 'Female',
    ]);

    get('/puppies?filter[gender]=Male')
        ->assertInertia(function (Assert $page) {
            $page->component('Puppy/Index');
            $page->has('puppies.data', 3);
        });
});

test('can filter by age min of 1 week', function () {
    Puppy::factory()->times(2)->create([
        'birth_date' => now()->subDays(10),
    ]);

    Puppy::factory()->create([
        'birth_date' => now()->subDays(4),
    ]);

    get('/puppies?filter[age]=1')
        ->assertInertia(function (Assert $page) {
            $page->component('Puppy/Index');
            $page->has('puppies.data', 1);
        });
});

test('can filter by age min of 3 weeks', function () {
    Puppy::factory()->times(2)->create([
        'birth_date' => now()->subDays(10),
    ]);

    Puppy::factory()->create([
        'birth_date' => now()->subDays(4),
    ]);

    Puppy::factory()->create([
        'birth_date' => now()->subDays(22),
    ]);

    get('/puppies?filter[age]=1')
        ->assertInertia(function (Assert $page) {
            $page->component('Puppy/Index');
            $page->has('puppies.data', 1);
        });
});

test('can filter by price range', function () {
    Puppy::factory()->create([
        'price' => 150,
    ]);

    Puppy::factory()->create([
        'price' => 300,
    ]);

    get('/puppies?filter[price][0]=151&filter[price][1]=321')
        ->assertInertia(function (Assert $page) {
            $page->component('Puppy/Index');
            $page->has('puppies.data', 1);
        });
});

test('can filter by state', function () {
    $country = Country::create([
        'name' => 'USA',
        'iso2' => 'US',
        'region' => 'US',
        'subregion' => 'US',
        'iso3' => 'US',
        'phone_code' => '+23',
    ]);
    $state = State::create([
        'name' => 'Lagos',
        'country_id' => $country->id,
    ]);
    /* State::factory()->create([ */

    /* ]); */
    Puppy::factory()->create([

    ]);

    get('/puppies?filter[state]=Lagos')
        ->assertInertia(function (Assert $page) {
            $page->component('Puppy/Index');
            $page->has('puppies.data', 1);
        });
});

test('puppy siblings are bidirectional', function () {

    $puppy1 = Puppy::factory()->create(['name' => 'Puppy 1']);
    $puppy2 = Puppy::factory()->create(['name' => 'Puppy 2']);
    $puppy3 = Puppy::factory()->create(['name' => 'Puppy 3']);

    $puppy1->attachSiblings([$puppy2, $puppy3]);

    assertTrue($puppy2->siblings->contains($puppy1));
    assertTrue($puppy3->siblings->contains($puppy1));
    assertTrue($puppy1->siblings->contains($puppy2));
});

test('puppy should be marked as new if it is less than 5 days old post', function () {

    Storage::fake('s3');
    $fakeVideo = UploadedFile::fake()->create('test-video.mp4', 5000, 'video/mp4');
    $puppy1 = Puppy::factory()->create(['name' => 'Puppy 1']);
    $puppy1->addMedia($fakeVideo)->toMediaCollection('video');
    $pup = PuppyData::from($puppy1->load('breeds', 'seller'));

    assertTrue($pup->is_new);

});

test('puppy should not be  new if it is greater than 5 days old post', function () {

    Carbon::setTestNow(Carbon::now());

    Storage::fake('s3');
    $fakeVideo = UploadedFile::fake()->create('test-video.mp4', 5000, 'video/mp4');
    $puppy1 = Puppy::factory()->create(['name' => 'Puppy 1']);
    $puppy1->addMedia($fakeVideo)->toMediaCollection('video');
    $pup = PuppyData::from($puppy1->load('breeds', 'seller'));
    dump($pup->published_at);

    $this->freezeTime();

    $this->travelTo(Carbon::now()->addDays(6));
    $new = Puppy::where('id', $pup->id)->first();
    assertFalse($new->is_new);

});

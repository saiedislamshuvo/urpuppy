<?php

namespace App\Http\Controllers;

use App\Data\BreedData;
use App\Data\BreederData;
use App\Data\BreederFullData;
use App\Data\BreedOptionData;
use App\Http\Requests\BreederRegistrationRequest;
use App\Jobs\GenerateVideoThumbnail;
use App\Mail\AdminNotifyMail;
use App\Models\Breed;
use App\Models\State;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class BreederController extends Controller
{
    public function index(Request $request)
    {

        /* dd(request()->all()); */
        $breeders = User::with([
            'breeds',
            'media',
            'state',
            'company_state',

        ]);

        if (request()->breed && request()->breed != 'undefined' && request()->breed != 'All') {
          $breeders = $breeders->whereHas('breeds' , function ($query) {
                $query->where('name', request()->breed);
            });
        }

        /* dd($breeders->whereHas('state')->first()->state); */
        if (request()->state && request()->state != 'undefined' && request()->state != 'All') {
            $breeders->where(function ($query) {
            $query->whereHas('state', function ($query) {
                $query->where('name', request()->state);
            })
            ->orWhereHas('company_state', function ($query) {
                $query->where('name', request()->state);
            });
            });

        }

        $breeders = $breeders->breeders()->orderBy('full_name')->reorder()->paginate(12);

        return inertia()->render('Breeders/Index', [
            'breeders' => BreederFullData::collect($breeders),
            /* 'breed_filter_list' => fn () => */
            /*     Breed::select(['name'])->distinct()->orderBy('name')->pluck('name') */
            /*  , */
            /* 'state_filter_list' => fn () => */
            /*     State::select(['name'])->distinct()->orderBy('name')->pluck('name') */
            /*  , */
        ]);

    }

    public function create(Request $request)
    {

        if (!$request->user()) {
            return redirect()->to(route('register.breeder'));
        }

        if (!$request->user()->email_verified_at) {
            return error('verification.notice', 'Verify first.');
        }

        if (! $request->user()->roles->contains('breeder')) {
            return redirect()->to(route('home'))->with([
                'message.error' => 'You are not a breeder'
            ]);
        }

        /* if ($request->user()->is_breeder) { */
        /*     return redirect()->to(route('home'))->with([ */
        /*         'message.error' => 'You are already a breeder' */
        /*     ]); */
        /* } */

        return inertia('Breeders/Registration', [
            'breeds' => BreedOptionData::collect(Breed::query()->get())
        ]);
    }

    public function store(BreederRegistrationRequest $request)
    {

        return DB::transaction(function () use ($request) {


        if (! $request->user()->roles->contains('breeder')) {
            return error('home', 'You are not a breeder');
        }


        $data = $request->validated();
        $user = $request->user();

        $user->update([
            'kennel_name' => $data['kennel_name'],
            'company_name' => $data['fullname'],
            'company_email_address' => $data['company_email_address'],
            'company_phone' => $data['company_phone'],
            'company_established_on' => $data['established_date'],

            'company_about' => $data['about_company'],
            'has_usda_registration' => $data['has_usda_registration'] == 'yes' ? true : false,
            'profile_completed' => true,


            'company_address' => @$data['gmap_payload']['address'],
            'company_city' => @$data['gmap_payload']['city'],
            'company_street' => @$data['gmap_payload']['street'],
            'company_state' => @$data['gmap_payload']['state'],
            'company_short_state' => @$data['gmap_payload']['shortState'],
            'company_zip_code' => @$data['gmap_payload']['zipCode'],

        ]);

        if ($breeds = $data['breeds']) {
                $user->breeds()->detach();
                $garm = collect($breeds)->map(function ($breed) use ($user) {
                    return is_array($breed) ?  $breed['value'] : $breed;
                });
                $user->breeds()->attach($garm);
        }

            /* dd('adi'); */
        $b = $user->breeder_requests()->create([
            'message' => 'Reviewing your application',
            'status' => 'pending'
        ]);

        /* dd($data['gallery']); */

        if (isset($data['gallery'])) {
            $user->clearMediaCollection('gallery');

            collect($data['gallery'])->each(function ($image) use ($user) {
                $user->addMedia($image)->toMediaCollection('gallery');
            });
        }

        if (isset($data['videos'])) {
            $user->clearMediaCollection('videos');
        collect($data['videos'])->each(function ($image) use ($user) {
            try {
            $media = $user->addMedia($image)->toMediaCollection('videos');
            GenerateVideoThumbnail::dispatch($media);

} catch (\Exception $e) {
    \Log::error('Error adding media: ' . $e->getMessage());
}

        });
}

        /* $video = collect($data['videos'])->first(); */

        /* $media = $user->addMedia($video)->toMediaCollection('videos'); */
        /* GenerateVideoThumbnail::dispatch($media); */

        if (!empty($data['company_logo'])) {
            $user->clearMediaCollection('company_logo');
            $user->addMedia($data['company_logo'])->toMediaCollection('company_logo');
        }



        Mail::queue(new AdminNotifyMail([
            'subject' => 'New Breeder Application',
            'message' => 'You have a new breeder application. Please go to admin page to review',
        ]));

        inertia()->clearHistory();

        /* if (!$request->user()->is_subscribed && $request->user()->puppies()->count() == 1) { */
        /* return redirect()->to(route('plans.index'))->with([ */
        /*     'message.success' => 'Subscribe to any plan to activate your listing' */
        /* ]); */
        /* } */

        return success('home', 'Your application has been submitted for review');

        });


        /* return redirect()->to(route('plans.breeder'))->with([ */
        /*     'message.success' => 'Subscribe to activate your breeders account' */
        /* ]); */

    }

    public function show($slug = null)
    {
        if ($slug == null) {
            return redirect()->back();
        }
        $userId = User::decodeSlug($slug);

        $breeder = User::with([
            'breeds:name',
            'comments' => function ($query) {
                $query->orderBy('created_at', 'desc');
            },
            'comments.reviewer',
            'comments.reviewer.media',
            'media',
            /* 'attributes' => function ($query) { */
            /*     $query->select('title', 'value', 'attributable_id'); */
            /* }, */
        ])->find($userId);

        if ($breeder?->breeder_plan === null) {
            return redirect()->back()->with([
                'message.error' => 'This user is not a breeder'
            ]);
        }


        /* if ($breeder) { */
        /*     $breeder->attr = $breeder->attributes */
        /*         ->mapWithKeys(fn ($attribute) => (object)[$attribute->title => $attribute->value]); */
        /* } */

        /* dd($breeder->comments->first(), $breeder->comments[1]); */

        if (!auth()->user()) {

            /* $breeder->attr['public_email'] = null; */
            /* $breeder->attr['public_mobile'] = null; */

        }
        /* dd($breeder->attr); */

        $puppies = $breeder->puppies()->with(['breeds:id,name,slug','seller', 'media', 'favorites'])->get();

        return inertia('Breeders/Show', [
            'rating_count' => $breeder->comments->count(),
            'rating_average' => $breeder->comments->pluck('rating')->avg(),
            'breeder' => BreederFullData::from($breeder),
            'puppies' => $puppies,
        ]);
            /* ->title('Breeder: '.$breeder->name) */
            /* ->description('Find your perfect puppy! Discover diverse dog breeds, connect with trusted breeders, and register as a buyer or breeder to make pet ownership easy and secure.') */
            /* ->image($breeder->avatar) */
            /* ->ogTitle('Breeder: '.$breeder->name) */
            /* ->ogDescription('Find your perfect puppy! Discover diverse dog breeds, connect with trusted breeders, and register as a buyer or breeder to make pet ownership easy and secure.') */
            /* ->ogImage($breeder->avatar) */
            /* ->ogUrl(route('breeder-directory')) */
            /* ->twitterTitle('Breeder: '.$breeder->name) */
            /* ->twitterSite('@urpuppy') */
            /* ->twitterImage($breeder->avatar) */
            /* ->twitterDescription('Find your perfect puppy! Discover diverse dog breeds, connect with trusted breeders, and register as a buyer or breeder to make pet ownership easy and secure.'); */
    }

    /* public function listings($slug) */
    /* { */
    /*     $breeder = User::query()->where('slug', $slug)->first(); */
    /*     $puppies = $breeder->puppies()->with(['breeds','media', 'favorites'])->paginate(12); */

    /*     return inertia()->render('Breeder/Listings', */
    /*         [ */
    /*             'puppies' => $puppies, */
    /*             'breeder' => $breeder */
    /*         ] */
    /*     )->title('Breeder: '.$breeder->name); */
    /* } */
}

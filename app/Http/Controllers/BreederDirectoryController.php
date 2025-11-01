<?php

namespace App\Http\Controllers;

use App\Models\Breed;
use App\Models\State;
use App\Models\User;

class BreederDirectoryController extends Controller
{
    public function index()
    {
        $breeders = User::with([
            'media',
            'state',

        ])->breeders()->get();

        /* dd($breeders); */

        return inertia()->render('BreederDirectory/Index', [
            'breeders' => $breeders,
        ]);

        /* ->title('Breeders') */
        /* ->description('Find your perfect puppy! Discover diverse dog breeds, connect with trusted breeders, and register as a buyer or breeder to make pet ownership easy and secure.') */
        /* ->image(asset('logo.png')) */
        /* ->ogTitle('Breeders') */
        /* ->ogDescription('Find your perfect puppy! Discover diverse dog breeds, connect with trusted breeders, and register as a buyer or breeder to make pet ownership easy and secure.') */
        /* ->ogImage(asset('logo.png')) */
        /* ->ogUrl(route('home')) */
        /* ->twitterTitle('Breeders') */
        /* ->twitterSite("@urpuppy") */
        /* ->twitterImage(asset('logo.png')) */
        /* ->twitterDescription('Find your perfect puppy! Discover diverse dog breeds, connect with trusted breeders, and register as a buyer or breeder to make pet ownership easy and secure.') */
        /* ; */
    }

    public function breedIndex(string $slug)
    {
        $breed_id = Breed::query()->where('slug', $slug)->first()->id;

        return inertia()->render('BreederDirectory/Index', [
            'breeders' => User::whereHas('breeds', function ($query) use ($breed_id) {
                $query->where('id', $breed_id);
            })->with([
                'media',
                'state',
                'city',

            ])->breeders()->get(),
        ])
            ->title('Breeders')
            ->description('Find your perfect puppy! Discover diverse dog breeds, connect with trusted breeders, and register as a buyer or breeder to make pet ownership easy and secure.')
            ->image(asset('logo.png'))
            ->ogTitle('Breeders')
            ->ogDescription('Find your perfect puppy! Discover diverse dog breeds, connect with trusted breeders, and register as a buyer or breeder to make pet ownership easy and secure.')
            ->ogImage(asset('logo.png'))
            ->ogUrl(route('home'))
            ->twitterTitle('Breeders')
            ->twitterSite('@urpuppy')
            ->twitterImage(asset('logo.png'))
            ->twitterDescription('Find your perfect puppy! Discover diverse dog breeds, connect with trusted breeders, and register as a buyer or breeder to make pet ownership easy and secure.');
    }

    public function stateIndex(string $slug)
    {
        $state_id = State::query()->where('slug', $slug)->first()->id;

        return inertia()->render('BreederDirectory/Index', [
            'breeders' => User::where('state_id', $state_id)->with([
                'media',
                'state',
                'city',

            ])->breeders()->get(),
        ]);
    }
}

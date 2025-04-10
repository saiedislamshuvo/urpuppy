<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileBreedsController extends Controller
{
    // update
    public function update(Request $request)
    {
        $breeds = $request->validate([
            'breeds' => 'required|array|max:4|min:1',
        ])['breeds'];

        $request->user()->breeds()->sync(array_column($breeds, 'value'));

        cache()->flush();

        return redirect()->back();
        /* return view('profile.breeds'); */
    }
}

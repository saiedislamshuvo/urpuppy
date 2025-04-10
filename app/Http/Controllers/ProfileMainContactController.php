<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileMainContactController extends Controller
{
    public function update(Request $request)
    {
        $validations = [];

        if ($request->has('public_email') && $request['public_email'] != null) {
            $validations['public_email'] = 'email';
        }

        $validations['public_mobile'] = '';
        $validations['website'] = '';
        $input = $request->validate($validations);

        $user = auth()->user();

        /* dd($user, @$input['public_email'], @$input['public_mobile'], @$input['website']); */
        $user->deleteAttributeByTitle('public_email');
        $user->deleteAttributeByTitle('public_mobile');
        $user->deleteAttributeByTitle('website');

        if (@$input['public_email']) {
            $user->attachAttribute('public_email', @$input['public_email']);
        }

        if (@$input['public_mobile']) {
            $test = $user->attachAttribute('public_mobile', @$input['public_mobile']);
        }

        if (@$input['website']) {
            $user->attachAttribute('website', @$input['website']);
        }

        cache()->flush();

        return redirect()->back();
    }
}

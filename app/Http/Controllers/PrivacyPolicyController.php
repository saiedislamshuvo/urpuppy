<?php

namespace App\Http\Controllers;

class PrivacyPolicyController extends Controller
{
    public function index()
    {
        return inertia()->render('PrivacyPolicy');
    }

    public function terms()
    {
        return inertia()->render('TermsConditions');
    }
}

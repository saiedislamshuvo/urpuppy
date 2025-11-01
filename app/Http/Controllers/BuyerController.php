<?php

namespace App\Http\Controllers;

class BuyerController extends Controller
{
    public function index()
    {
        return inertia('Buyer/Dashboard');
    }
}

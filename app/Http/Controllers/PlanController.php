<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use App\Models\Plan;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function index(Request $request)
    {

        if ($request->user()?->premium_plan) {
            return redirect()->route('profile.edit', [
                'tab' => 'My Subscription',
            ]);
        }

        $plans = Plan::ordered()->active()->where('is_featured', false)->get();

        return inertia()->render('Plan/Index', [
            'plans' => $plans,
            'discount' => get_discount($request->user(), 'seller'),
        ]);
    }

    public function breeder(Request $request)
    {
        if ($request->user()?->breeder_plan) {
            return redirect()->route('profile.edit', [
                'tab' => 'My Subscription',
            ]);
        }

        if ($request->user()->company_phone == null) {
            return redirect()->route('breeders.create')->with([
                'message.error' => 'Please fill up the details here',
            ]);
        }

        $plan = Plan::ordered()->active()->where('is_featured', true)->first();

        return inertia()->render('Plan/Breeder', [
            'plan' => $plan,
            'discount' => get_discount($request->user(), 'breeder'),
        ]);
    }
}

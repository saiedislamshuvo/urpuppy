<?php

namespace App\Http\Controllers;

use App\Data\PlanData;
use App\Models\Plan;

class UpgradePlanController extends Controller
{
    public function index()
    {

        if (! auth()->user()?->is_seller) {
            return error('profile.edit', 'You are not a seller.');
        }

        if (auth()->user()->premium_plan == null) {
            return error('profile.edit', 'You are not subscribed to a plan.');
        }

        return inertia()->render('Plan/Upgrade', [
            'plans' => PlanData::collect(Plan::ordered()->active()->where('is_featured', false)->where('id', '!=', auth()->user()->premium_plan?->id)->where('type', 'premium')->get()),
        ]);
    }

    public function __invoke(int $plan_id)
    {
        dd($plan_id);
    }
}

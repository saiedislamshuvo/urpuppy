<?php

namespace App\Http\Controllers;

use App\Data\PlanData;
use App\Models\Discount;
use App\Models\Plan;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user) {
            // Check for active subscriptions with plans (not just subscriptions)
            $activeSubscriptions = $user->getActiveSubscriptions()->load('plan');
            $hasPlan = false;
            
            if ($activeSubscriptions->isNotEmpty()) {
                $hasPlan = $activeSubscriptions->filter(function ($subscription) {
                    // Only redirect if subscription has a plan assigned
                    if (!$subscription->plan) {
                        return false;
                    }
                    if (in_array($subscription->type, ['free', 'seller'])) {
                        return true;
                    }
                    // Fallback: check plan relationship if type is not set
                    if (!$subscription->type && $subscription->plan) {
                        return in_array($subscription->plan->type, ['free', 'seller']);
                    }
                    return false;
                })->isNotEmpty();
            }
            
            if ($hasPlan) {
                return redirect()->route('profile.subscription');
            }
        }

        $plans = Plan::ordered()->active()->where('is_breeder', false)->get();

        return inertia()->render('Plan/Index', [
            'plans' => $plans ?? [],
            'discount' => $user ? get_discount($user, 'seller') : null,
        ]);
    }

    public function breeder(Request $request)
    {
        $user = $request->user();
        
        if ($user) {
            // Check for active breeder subscription with plan (not just subscription)
            $activeSubscriptions = $user->getActiveSubscriptions()->load('plan');
            $hasBreederPlan = false;
            
            if ($activeSubscriptions->isNotEmpty()) {
                $hasBreederPlan = $activeSubscriptions->filter(function ($subscription) {
                    // Only redirect if subscription has a plan assigned
                    if (!$subscription->plan) {
                        return false;
                    }
                    if ($subscription->type === 'breeder') {
                        return true;
                    }
                    // Fallback: check plan relationship if type is not set
                    if (!$subscription->type && $subscription->plan) {
                        return $subscription->plan->type === 'breeder';
                    }
                    return false;
                })->isNotEmpty();
            }
            
            if ($hasBreederPlan) {
                return redirect()->route('profile.subscription');
            }

            if ($user->company_phone == null) {
                return redirect()->route('breeders.create')->with([
                    'message.error' => 'Please fill up the details here',
                ]);
            }
        }

        $plan = Plan::ordered()->active()->where('type', 'breeder')->first();

        if (!$plan) {
            return redirect()->route('plans.index')
                ->with('message.error', 'Breeder plan not found.');
        }

        return inertia()->render('Plan/Breeder', [
            'plan' => PlanData::from($plan),
            'discount' => $user ? get_discount($user, 'breeder') : null,
        ]);
    }
}

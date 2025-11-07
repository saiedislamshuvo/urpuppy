<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use App\Models\Plan;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user) {
            // Check for active subscriptions directly, eager load plan relationship
            $activeSubscriptions = $user->getActiveSubscriptions()->load('plan');
            $hasPlan = false;
            
            if ($activeSubscriptions->isNotEmpty()) {
                $hasPlan = $activeSubscriptions->filter(function ($subscription) {
                    if (in_array($subscription->type, ['free', 'premium'])) {
                        return true;
                    }
                    // Fallback: check plan relationship if type is not set
                    if (!$subscription->type && $subscription->plan) {
                        return in_array($subscription->plan->type, ['free', 'premium']);
                    }
                    return false;
                })->isNotEmpty();
            }
            
            if ($hasPlan) {
                return redirect()->route('profile.edit', [
                    'tab' => 'My Subscription',
                ]);
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
            // Check for active breeder subscription directly, eager load plan relationship
            $activeSubscriptions = $user->getActiveSubscriptions()->load('plan');
            $hasBreederPlan = false;
            
            if ($activeSubscriptions->isNotEmpty()) {
                $hasBreederPlan = $activeSubscriptions->filter(function ($subscription) {
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
                return redirect()->route('profile.edit', [
                    'tab' => 'My Subscription',
                ]);
            }

            if ($user->company_phone == null) {
                return redirect()->route('breeders.create')->with([
                    'message.error' => 'Please fill up the details here',
                ]);
            }
        }

        $plan = Plan::ordered()->active()->where('type', 'breeder')->first();

        return inertia()->render('Plan/Breeder', [
            'plan' => $plan,
            'discount' => $user ? get_discount($user, 'breeder') : null,
        ]);
    }
}

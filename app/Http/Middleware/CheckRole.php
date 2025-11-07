<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $role_name = $role == 'breeder' ? 'Breeder' : ($role == 'seller' ? 'Seller' : 'Buyer');
        if($role_name == 'Breeder' && !auth()->user()->is_breeder) {
            abort(403, 'Unauthorized action.');
        }
        if($role_name == 'Seller' && !auth()->user()->is_seller) {
            abort(403, 'Unauthorized action.');
        }
        if($role_name == 'Buyer' && !auth()->user()->is_buyer) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ContentSecurityPolicy
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

                $csp = "default-src 'self'; script-src 'self' https://pagead2.googlesyndication.com https://analytics.761073128.xyz https://ep2.adtrafficquality.google https://maps.googleapis.com 'unsafe-inline'; script-src-elem 'self' https://pagead2.googlesyndication.com https://analytics.761073128.xyz https://ep2.adtrafficquality.google https://maps.googleapis.com 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data: https://maps.googleapis.com; font-src 'self' data:; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; connect-src 'self' https://analytics.761073128.xyz https://ep1.adtrafficquality.google https://maps.googleapis.com;";

        $response->headers->set('Content-Security-Policy', $csp);

        return $response;
    }
}

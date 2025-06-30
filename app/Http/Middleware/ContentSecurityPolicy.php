<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ContentSecurityPolicy
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $directives = [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://*.stripe.com https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://analytics.urpuppy.com https://ep2.adtrafficquality.google",
            "script-src-elem 'self' https://js.stripe.com https://*.stripe.com https://pagead2.googlesyndication.com https://www.google.com https://www.gstatic.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "img-src 'self' data: https: https://maps.googleapis.com",
            "font-src 'self' data: https://fonts.gstatic.com",
            "frame-src 'self' https://js.stripe.com https://*.stripe.com https://hooks.stripe.com https://m.stripe.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://ep2.adtrafficquality.google https://www.google.com/recaptcha",
            "connect-src 'self' https://analytics.urpuppy.com https://ep1.adtrafficquality.google https://maps.googleapis.com https://js.stripe.com https://api.stripe.com https://m.stripe.com https://*.stripe.com https://d1ycq56gu6gk7x.cloudfront.net",
        ];

        $csp = implode('; ', $directives).';';

        $response->headers->set('Content-Security-Policy', $csp);
        $response->headers->set('X-Content-Security-Policy', $csp);
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        return $response;
    }
}

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="author" content="UrPuppy.com">
    <meta name="robots" content="index, follow">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Security-Policy" content="default-src *;
    img-src * 'self' data: https: http:;
    script-src 'self' 'unsafe-inline' 'unsafe-eval' *;
    style-src  'self' 'unsafe-inline' *">

    <link fetchpriority="high" rel="preload" as="image" href="{{ asset('banner-bg.webp') }}">
    <link rel="icon" type="image/png" href="{{ asset('images/logos/favicon.png') }}">


    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2165217194424630"
        crossorigin="anonymous"></script>

    <!-- <script src="https://analytics.urpuppy.com/api/script.js" data-site-id="1" defer></script> -->

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia

    <noscript>
        <style>
            [data-aos] {
                opacity: 1 !important;
                transform: none !important;
            }
        </style>
    </noscript>
</body>

</html>

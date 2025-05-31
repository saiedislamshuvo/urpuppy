<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="author" content="UrPuppy.com">
    <meta name="robots" content="index, follow">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Your go-to platform for adorable puppies and pet-related content.">

    <link fetchpriority="high" rel="preload" as="image" href="{{ asset('banner-bg.webp') }}">
    <link rel="icon" type="image/png" href="{{ asset('images/logos/favicon.png') }}">

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2165217194424630"
        crossorigin="anonymous"></script>

    <script defer src="https://analytics.761073128.xyz/script.js" data-website-id="ff04b39a-2c33-43df-9854-8edb4ae01c4a">
    </script>

    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Urpuppy.com",
            "email": "support@urpuppy.com",
            "contactPoint": {
                "@type": "ContactPoint",
                "areaServed": "US"
            },
            "image": "https://urpuppy.com/logo.png"
        }
    </script>


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


<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#151616">
        <meta name="robots" content="index,follow">

        <link rel="icon" href="/assets/footer-logo.png" type="image/png">
        <link rel="apple-touch-icon" href="/assets/footer-logo.png">
        <link rel="canonical" href="{{ url('/') }}">

        @fonts

        @vite(['resources/css/app.css', 'resources/js/app.ts', "resources/js/pages/{$page['component']}.vue"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Archon') }}</title>
        </x-inertia::head>
        <script type="application/ld+json">
            {!! json_encode([
                '@context' => 'https://schema.org',
                '@type' => 'LocalBusiness',
                'name' => 'Archon Special Machineries Inc.',
                'description' => 'Distributor of trucks and heavy equipment in the Philippines.',
                'email' => 'archon.salesdivision@gmail.com',
                'telephone' => '+63 917 133 0643',
                'address' => [
                    '@type' => 'PostalAddress',
                    'streetAddress' => 'Door 14-18 Asiaprime Center, G. Del Pilar St., Corner Dacudao Avenue, Brgy. Agdao Proper',
                    'addressLocality' => 'Davao City',
                    'addressCountry' => 'PH',
                ],
                'url' => url('/'),
            ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
        </script>
    </head>
    <body class="bg-archon font-sans antialiased">
        <x-inertia::app />
        <div id="modal-root"></div>
    </body>
</html>

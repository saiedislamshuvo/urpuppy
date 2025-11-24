<?php

namespace App\Http\Middleware;

use App\Data\UserData;
use App\Models\Puppy;
use App\Settings\GeneralSettings;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Jenssegers\Agent\Agent;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Get full URL for image path
     *
     * @param string|null $imagePath
     * @return string
     */
    private function getImageUrl(?string $imagePath): string
    {
        if (empty($imagePath)) {
            return '';
        }

        // If already a full URL, return as is
        if (str_starts_with($imagePath, 'http://') || str_starts_with($imagePath, 'https://')) {
            return $imagePath;
        }

        // Otherwise, use url() helper to generate full URL
        return url('storage/' . $imagePath);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        /* $min = Puppy::min('price') ?? 1; */

        /* $max = Puppy::max('price') ?? 500; */

        /* if ($min == $max) { */
        /*     $min = 0; */
        /* } */

        $agent = new Agent;

        $user = auth()->user()?->load('media', 'breeds');
        $settings = app(GeneralSettings::class);
        
        return [
            ...parent::share($request),
            'auth' => [
                'user' => UserData::optional($user),
            ],
            'csrf_token' => csrf_token(),
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
            ],
            'url' => fn () => $request->fullUrl(),
            'isMobile' => $agent->isMobile(),
            'mapProvider' => config('services.map.provider', 'openstreetmap'),
            'mapboxAccessToken' => config('services.mapbox.access_token'),
            'phoneVerificationRequired' => config('services.phone.verification_required', true),
            'settings' => [
                'site_name' => $settings->site_name ?? '',
                'site_logo' => $this->getImageUrl($settings->site_logo),
                'hero_title' => $settings->hero_title ?? '',
                'hero_subtitle' => $settings->hero_subtitle ?? '',
                'hero_background' => $this->getImageUrl($settings->hero_background),
                'featured_section_title' => $settings->featured_section_title ?? '',
                'featured_button_text' => $settings->featured_button_text ?? '',
                'featured_button_link' => $settings->featured_button_link ?? '',
                'spotlight_section_title' => $settings->spotlight_section_title ?? '',
                'spotlight_button_text' => $settings->spotlight_button_text ?? '',
                'spotlight_button_link' => $settings->spotlight_button_link ?? '',
                'picks_section_title' => $settings->picks_section_title ?? '',
                'trusted_section_title' => $settings->trusted_section_title ?? '',
                'trusted_button_text' => $settings->trusted_button_text ?? '',
                'trusted_button_link' => $settings->trusted_button_link ?? '',
                'arrivals_section_title' => $settings->arrivals_section_title ?? '',
                'arrivals_button_text' => $settings->arrivals_button_text ?? '',
                'arrivals_button_link' => $settings->arrivals_button_link ?? '',
                'blogs_section_title' => $settings->blogs_section_title ?? '',
                'blogs_button_text' => $settings->blogs_button_text ?? '',
                'blogs_button_link' => $settings->blogs_button_link ?? '',
                'cta_section_title' => $settings->cta_section_title ?? '',
                'cta_button_subtitle' => $settings->cta_button_subtitle ?? '',
                'cta_button_link' => $settings->cta_button_link ?? '',
                'cta_features' => $settings->cta_features ?? [],
                'footer_logo' => $this->getImageUrl($settings->footer_logo),
                'footer_coloum1_title' => $settings->footer_coloum1_title ?? '',
                'footer_coloum1' => $settings->footer_coloum1 ?? [],
                'footer_coloum2_title' => $settings->footer_coloum2_title ?? '',
                'footer_coloum2' => $settings->footer_coloum2 ?? [],
                'footer_coloum3_title' => $settings->footer_coloum3_title ?? '',
                'footer_coloum3' => $settings->footer_coloum3 ?? [],
                'footer_coloum4_title' => $settings->footer_coloum4_title ?? '',
                'footer_coloum4' => $settings->footer_coloum4 ?? [],
                'footer_social_media' => $settings->footer_social_media ?? [],
                'footer_copyright_text' => $settings->footer_copyright_text ?? '',
                'puppies_hero_title' => $settings->puppies_hero_title ?? '',
                'puppies_hero_subtitle' => $settings->puppies_hero_subtitle ?? '',
                'puppies_hero_background' => $this->getImageUrl($settings->puppies_hero_background),
                'breeds_hero_title' => $settings->breeds_hero_title ?? '',
                'breeds_hero_subtitle' => $settings->breeds_hero_subtitle ?? '',
                'breeds_hero_background' => $this->getImageUrl($settings->breeds_hero_background),
                'breeds_section_title' => $settings->breeds_section_title ?? '',
                'breeders_hero_title' => $settings->breeders_hero_title ?? '',
                'breeders_hero_subtitle' => $settings->breeders_hero_subtitle ?? '',
                'breeders_hero_background' => $this->getImageUrl($settings->breeders_hero_background),
                'breeders_section_title' => $settings->breeders_section_title ?? '',
            ],
        ];
    }
}

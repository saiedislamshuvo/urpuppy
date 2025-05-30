<?php

use App\Data\BreedOptionData;
use App\Data\ColorData;
use App\Data\DiscountData;
use App\Data\PatternData;
use App\Data\PuppyCardData;
use App\Data\SiblingData;
use App\Data\VideoData;
use App\Models\Breed;
use App\Models\Discount;
use App\Models\Puppy;
use App\Models\PuppyColor;
use App\Models\PuppyPattern;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

if (! function_exists('guest_puppy')) {
    function guest_puppy(): ?PuppyCardData
    {
        return PuppyCardData::optional(Puppy::with(['breeds', 'seller'])->whereHas('seller')->whereHas('breeds')->inRandomOrder()->first());
    }
}

if (! function_exists('get_videos')) {
    function get_videos(): Collection
    {

        $user = User::query()->with(['media' => function ($query) {}])->get()->map(function ($user) {
            if ($user->getMedia('videos')->isEmpty()) {
                return;
            }

            return ['url' => $user->getFirstMediaUrl('videos'), 'title' => ucwords($user->comany_name ?? $user->full_name ?? ''), 'video_thumbnail' => $user->getFirstMediaUrl('thumbnails')];
        })->filter(function ($data) {
            if ($data && $data['url'] && $data['video_thumbnail']) {
                return $data;
            }
        })->values();

        $puppy = Puppy::query()->with(['media' => function ($query) {}])->get()->map(function ($puppy) {
            if ($puppy->getMedia('video')->isEmpty()) {
                return;
            }

            return ['url' => $puppy->getFirstMediaUrl('video'), 'title' => ucwords($puppy->name ?? ''),
                'video_thumbnail' => $puppy->getFirstMediaUrl('thumbnails'),
            ];
        })->filter(function ($data) {
            if ($data && $data['url'] && $data['video_thumbnail']) {
                return $data;
            }
        })->values();

        return VideoData::collect($user->merge($puppy)->take(3)->values());
    }
}

if (! function_exists('pattern_options')) {

    function pattern_options()
    {
        return PatternData::collect(PuppyPattern::query()->orderBy('name')->select('id', 'name')->orderBy('name')->get());
    }

}

if (! function_exists('color_options')) {

    function color_options()
    {
        return ColorData::collect(PuppyColor::query()->orderBy('name')->select('id', 'name')->orderBy('name')->get());
    }

}

/* if (!function_exists('sibling_options')) { */

function sibling_options(Request $request, ?int $id)
{
    return SiblingData::collect($request->user()->puppies()->where('id', '!=', $id)->get());
}

/* } */

if (! function_exists('breed_options')) {

    function breed_options()
    {
        return BreedOptionData::collect(Breed::select('id', 'name')->orderBy('name')->get());
    }

}

if (! function_exists('success')) {
    function success(string $route = 'home', ?string $message = null, $param = null)
    {
        if ($message != null) {
            session()->flash('message.success', $message);
        }

        if ($param == null) {
            return redirect()->route($route);
        }

        return redirect()->route($route, $param);
    }
}

if (! function_exists('error')) {
    function error(string $route = 'home', ?string $message = null, $param = null)
    {
        if ($message != null) {
            session()->flash('message.error', $message);
        }

        if ($param == null) {

            return redirect()->route($route);
        }

        return redirect()->route($route, $param);

    }
}

if (! function_exists('get_discount')) {
    function get_discount(User $user, string $account_type): ?DiscountData
    {
        $now = now();

        $discounts = Discount::where('account_type', $account_type)
            ->where('start_date', '<=', $now)
            ->where('end_date', '>=', $now)
            ->get();
        $discount = $discounts?->first();
        if ($discount?->targeted_emails == null) {
            return DiscountData::optional($discount) ?? null;
        }

        $matching_discounts = $discounts->filter(function ($discount) use ($user) {
            $emails = explode("\n", $discount->targeted_emails);

            return in_array($user->email, array_map('trim', $emails));
        });

        return DiscountData::optional($matching_discounts->first()) ?? null;
    }
}

if (! function_exists('imgconv64')) {
    /**
     * Convert an image file to base64.
     *
     * @param  string  $imagePath
     * @return string
     */
    function imgconv64($imagePath)
    {
        if (file_exists($imagePath)) {
            $imageData = base64_encode(file_get_contents($imagePath));
            $imageInfo = pathinfo($imagePath);
            $mimeType = mime_content_type($imagePath);

            return 'data:'.$mimeType.';base64,'.$imageData;
        }

        return null;
    }
}

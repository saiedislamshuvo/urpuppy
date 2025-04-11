<?php

namespace App\Models;

use App\Models\Traits\LogsView;
use App\Observers\PuppyObserver;
use Carbon\Carbon;
use Cknow\Money\Money;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model; // Correct Media class
use Illuminate\Http\Request;
use Laravel\Scout\Searchable;
/* use Milwad\LaravelAttributes\Traits\Attributable; */
use Overtrue\LaravelFavorite\Traits\Favoriteable;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sitemap\Contracts\Sitemapable;
use Spatie\Sitemap\Tags\Url;

#[ObservedBy([PuppyObserver::class])]
class Puppy extends Model implements HasMedia, Sitemapable
{
    /* use Attributable; */
    use Favoriteable;

    /** @use HasFactory<\Database\Factories\PuppyFactory> */
    use HasFactory;

    use InteractsWithMedia;
    use LogsView;

    /* use Searchable; */
    use Sluggable;

    protected $appends = ['patterns', 'image', 'images', 'video', 'listed_on', 'age', 'short_description', 'is_favorited_by_current_user', 'thumbnails', 'preview_images', 'formatted_price', 'published_at'];

    protected $hidden = ['media'];

    protected $guarded = [];

    public static function booted()
    {
        static::saving(function ($model) {
            if ($model->user_id == null && auth()->user()?->id != null) {
                $model->user_id = auth()->user()->id;
            }
            $model->birth_date = Carbon::parse($model->birth_date)->toDateString();
        });

        /* static::creating(function ($model) { */

        /* if (!request()->user()) { */
        /*     return; */
        /* } */

        /* $user = request()->user(); */

        /* $plan = $user->premium_plan->plan; */

        /* /1* dd(request('videos')); *1/ */

        /* }); */

    }

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name',
            ],
        ];
    }

    protected function status(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => $value == 'published',
            set: fn (string $value) => $value ? 'published' : 'draft',
        );
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $thumbnailconversion = $this->addmediaconversion('thumb')
            /* ->crop('crop-center', 50, 50) */
            ->format('webp')
            ->width(125)
            ->optimize()
            ->quality(75)
            ->height(125);

        if ($media && $media->gettypefrommime() === 'thumb') {
            $thumbnailconversion->extractvideoframeatsecond(50);
        }

        $this->addMediaConversion('grid')
            ->width(400)
            ->fit(Fit::Contain, desiredWidth: 400, desiredHeight: 500)
            ->format('webp')
            ->quality(75)
            ->optimize()
            ->sharpen(5);

        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 800, 450)  // Reduced from 1280x720 to 800x450 (same aspect ratio)
            ->optimize()
            ->format('webp')
            ->quality(75)
            ->sharpen(3);
    }

    /*     public function toSearchableArray() */
    /*     { */
    /*         $array = $this->toArray(); */

    /*         // Convert `id` and `breed_id` to strings for consistency */
    /*         $array['id'] = (string) $array['id']; */
    /*         /1* $array['breed_id'] = (string) $array['breed_id']; *1/ */

    /*         // Get all associated breeds and extract their names */
    /*         $array['breeds'] = $this->breeds->pluck('name')->toArray(); */

    /*         // Ensure `price` and `created_at` are in the desired format */
    /*         $array['price'] = isset($array['price']['amount']) ? (string) $array['price']['amount'] : null; */
    /*         $array['created_at'] = (int) Carbon::parse($array['created_at'])->timestamp; */

    /*         return $array; */
    /*     } */

    public function toSitemapTag(): Url|string|array
    {
        return route('puppies.show', $this->slug);
    }

    public function getPublishedAtAttribute()
    {
        return $this?->created_at?->diffForHumans();

    }

    /* public function getCollectionSchema(): array */
    /* { */
    /*     /1* dd('wew'); *1/ */
    /*     return [ */
    /*         'name' => $this->getTable(), */
    /*         'fields' => [ */
    /*             [ */
    /*                 'name' => 'name', */
    /*                 'type' => 'string', */
    /*             ], */
    /*             [ */
    /*                 'name' => 'created_at', */
    /*                 'type' => 'int32', */
    /*             ], */
    /*         ], */
    /*         'default_sorting_field' => 'created_at', */
    /*     ]; */
    /* } */

    /* public function typesenseQueryBy(): array */
    /* { */
    /*     return [ */
    /*         'name', */
    /*     ]; */
    /* } */

    public function getFormattedPriceAttribute()
    {
        return '$'.number_format($this->price);
        /* $price = intdiv($price, 100); // Convert cents to dollars */
        /* $mon = Money::USD($price,['precision' => 0]) */
        /* ; */
        /* dd($mon); */
    }

    public function getImagesAttribute()
    {
        return $this->getMedia('puppy_files');
    }

    public function breed()
    {
        return $this->belongsTo(Breed::class);
    }

    /* public function media() */
    /* { */
    /*     return $this->hasMany(Media::class); // Adjust as necessary for your setup */
    /* } */

    /* public function breeds() */
    /* { */
    /*     return $this->hasMany(Breed::class); */
    /* } */

    public function seller()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function scopeHasSubscribedUsers($query)
    {
        $query->where('status', 'published');

        $query->whereHas('seller', function ($q) {

            $q->whereHas('subscriptions', function ($subQuery) {
                $subQuery->where(function ($query) {
                    $query->where('stripe_status', 'active')->orWhere('stripe_status', 'trialing');
                });
            });
        });
    }

    public function scopeNewArrivals($query)
    {
        return $query->where('created_at', '>', Carbon::now()->subDays(5));
    }

    public function getVideoAttribute()
    {
        // Fetch the first media item
        $mediaItem = $this?->getFirstMedia('video');

        // Check for 'grid' URL, then 'preview', then return null
        if ($mediaItem) {
            try {
                return $mediaItem->getUrl();
            } catch (\Spatie\MediaLibrary\Exceptions\ConversionDoesNotExist $e) {
                // Handle the case where the conversion does not exist
                return null; // or handle as needed
            }

        }

        return null; // Return null if no media item exists
    }

    public function getImageAttribute()
    {
        // Fetch the first media item
        $mediaItem = $this?->getMedia('puppy_files')->sortBy('order_column')->first();

        /* dd($mediaItem); */

        // Check for 'grid' URL, then 'preview', then return null
        if ($mediaItem) {
            try {
                return $mediaItem?->getUrl('grid') ?? $mediaItem?->getUrl('preview') ?? $mediaItem->getUrl() ?? asset('paw.svg');
            } catch (\Spatie\MediaLibrary\Exceptions\ConversionDoesNotExist $e) {
                // Handle the case where the conversion does not exist
                return asset('paw.svg'); // or handle as needed
            }

        }

        return asset('paw.svg'); // Return null if no media item exists
    }

    public function getPreviewImagesAttribute()
    {
        $mediaItems = $this->getMedia('puppy_files');

        if ($mediaItems->isNotEmpty()) {
            return $mediaItems->map(function ($item) {
                try {
                    return $item->getUrl('preview') ?? asset('paw.svg');
                } catch (\Spatie\MediaLibrary\Exceptions\ConversionDoesNotExist $e) {
                    // Handle the case where the conversion does not exist
                    return collect(asset('paw.svg')); // or handle as needed
                }
            });
        }

        return collect(asset('paw.svg')); // or handle as needed
    }

    public function getThumbnailsAttribute()
    {
        // Fetch media items from the 'puppy_files' collection
        $mediaItems = $this->getMedia('puppy_files');

        if ($mediaItems->isNotEmpty()) {
            // Map to get URLs for thumbnail size
            return $mediaItems->map(function ($item) {
                try {
                    return $item->getUrl('thumb');
                } catch (\Spatie\MediaLibrary\Exceptions\ConversionDoesNotExist $e) {
                    // Handle the case where the conversion does not exist
                    return null; // or handle as needed
                }
            });
        }

        return null; // Return null if no media items found
    }

    public function getListedOnAttribute()
    {
        return $this?->created_at?->diffForHumans();
    }

    public function getCharacteristicsAttribute()
    {
        $characteristic = collect([
        ]);

        /* if ($this->health_certificate) { */
        /*     $characteristic->add('Travel Ready'); */
        /* } */

        /* if ($this->has_vaccine) { */
        /*     $characteristic->add('Vaccinated'); */
        /* } */

        return $characteristic;
    }

    public function getFeaturesAttribute()
    {
        $features = collect([
        ]);

        if ($this->has_travel_ready) {
            $features->add('Travel Ready');
        }

        if ($this->has_vaccine) {
            $features->add('Vaccinated');
        }

        if ($this->has_vet_exam) {
            $features->add('Vet Exam');
        }

        if ($this->has_health_certificate) {
            $features->add('Health Certificate');
        }

        if ($this->has_delivery_included) {
            $features->add('Delivery Included');
        }

        return $features;
    }

    public function getAgeAttribute()
    {
        $birthDate = Carbon::parse($this->birth_date);
        $now = Carbon::now();

        $days = (int) $birthDate->diffInDays($now);

        if ($days < 7) {
            $dayWord = $days === 1 ? 'day' : 'days';

            return "{$days} {$dayWord}";
        }

        $weeks = (int) floor($days / 7);
        $weekWord = $weeks === 1 ? 'week' : 'weeks';

        return "{$weeks} {$weekWord}";
    }

    public function getShortDescriptionAttribute()
    {
        $limit = 100;
        $description = $this->description;

        if ($description == null) {
            return '';
        }

        if (strlen($description) <= $limit) {
            return $description;
        }

        $shortened = substr($description, 0, $limit);

        return substr($shortened, 0, strrpos($shortened, ' ')).'..';
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function getIsFavoritedByCurrentUserAttribute()
    {
        /* dd($this->isFavoritedBy(auth()->user())); */
        /* dd($this->isFavoritedBy(auth()->user())); */
        /* dd(aut)->user()); */
        /* dd($this->isFavoritedBy(auth()->user())); */
        if (auth()->user() != null) {
            return $this->isFavoritedBy(auth()->user());
        }

        return false;
    }

    public function puppy_colors()
    {
        return $this->belongsToMany(PuppyColor::class);
    }

    public function puppy_traits()
    {
        return $this->belongsToMany(PuppyTrait::class);
    }

    public function puppy_patterns()
    {
        return $this->belongsToMany(PuppyPattern::class);
    }

    public function breeds()
    {
        return $this->belongsToMany(Breed::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    public function siblings()
    {
        return $this->belongsToMany(
            self::class,
            'puppy_sibling',
            'puppy_id',
            'sibling_id'
        );
    }

    public function getVideoThumbnailAttribute()
    {
        // Fetch the first media item
        $mediaItem = $this?->getFirstMedia('thumbnails');

        if ($mediaItem) {
            try {
                return $mediaItem->getUrl();
            } catch (\Spatie\MediaLibrary\Exceptions\ConversionDoesNotExist $e) {
                // Handle the case where the conversion does not exist
                return null; // or handle as needed
            }

        }

        return null; // Return null if no media item exists
    }

    public function getPatternsAttribute()
    {
        return implode(', ', $this->puppy_patterns()->pluck('name')->toArray());
    }

    public function attachSiblings($siblings)
    {
        $this->siblings()->syncWithoutDetaching($siblings);

        foreach ($siblings as $sibling) {
            if ($sibling instanceof self) {
                $sibling->siblings()->syncWithoutDetaching([$this->id]);
            } else {
                self::find($sibling)->siblings()->syncWithoutDetaching([$this->id]);
            }
        }
    }

    public function getIsNewAttribute()
    {
        return $this->created_at->diffInDays(now()) <= 5 ? true : false;
    }
}

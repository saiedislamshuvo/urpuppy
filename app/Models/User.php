<?php

namespace App\Models;

use App\Observers\UserObserver;
use Carbon\Carbon;
use Cog\Contracts\Love\Reacterable\Models\Reacterable as ReacterableInterface;
use Cog\Laravel\Love\Reacterable\Models\Traits\Reacterable;
use Fico7489\Laravel\Pivot\Traits\PivotEventTrait;
use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasName;
use Filament\Models\Contracts\HasAvatar;
/* use Filament\Models\Contracts\HasName; */
/* use Filament\Panel; */
use Filament\Panel;
use Hashids\Hashids;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Lab404\Impersonate\Models\Impersonate;
use Laravel\Cashier\Billable;
use Overtrue\LaravelFavorite\Traits\Favoriter;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Sitemap\Contracts\Sitemapable;
use Spatie\Sitemap\Tags\Url;

#[ObservedBy([UserObserver::class])]
class User extends Authenticatable implements FilamentUser, HasMedia, HasName, HasAvatar, MustVerifyEmail, ReacterableInterface, Sitemapable
{
    use Billable, Favoriter, HasFactory, HasRoles, InteractsWithMedia, Notifiable, Reacterable;
    // FilamentUser
    // HasName
    use Impersonate;
    use SoftDeletes;

    /* use PivotEventTrait; */

    /*  public static function boot() */
    /* { */
    /*       parent::boot(); */

    /*  } */

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'first_name',
        'last_name',
        'has_federal_license',
        'has_state_license',
        'email',
        'password',
        'x_id',
        'state_id',
        'city_id',
        'trial_ends_at',
        'pm_last_four',
        'pm_type',
        'zip_code',
        'is_breeder',
        'is_seller',
        'stripe_id',
        'phone',
        'company_name',
        'company_address',
        'company_established_on',
        'company_phone',
        'company_email_address',
        'company_zip_code',
        'profile_completed',
        'company_city_id',
        'company_city',
        'city',
        'company_state_id',
        'company_about',
        'has_usda_registration',
        'kennel_name',
        'social_fb',
        'social_ig',
        'social_tiktok',
        'social_x',

        'enable_notification',

        'lat',
        'lng',
        'state',
        'short_state',
        'street',
        'company_street',
        'company_state',
        'company_short_state',
        'gmap_address',
        'gmap_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = [
        'has_password',
        'is_subscribed',
        /* 'active_subscriptions', */
        'avatar',
        'member_since',
        'address',
        'gallery',
        'full_name',
        /* 'custom_attributes', */
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function toSitemapTag(): Url|string|array
    {
        return route('breeders.show', $this->slug);
    }

    public function getActiveSubscriptions()
    {
        return Subscription::where(function ($query) {
            $query->where('stripe_status', 'active')->orWhere('stripe_status', 'trialing');
        })->where('user_id', $this->id)->get();

    }

    public function getPremiumPlanAttribute()
    {
        try {
            $freePlan = $this->getActiveSubscriptions()?->where('type', 'free')->first();

            if ($freePlan) {
                return $freePlan;
            }

            return $this->getActiveSubscriptions()?->where('type', 'premium')?->first();

        } catch (Exception $e) {

        }
    }

    public function getBreederPlanAttribute()
    {
        return $this->getActiveSubscriptions()?->where('type', 'breeder')->first();
    }

    public static function decodeSlug($slug)
    {
        $hashedId = substr(strrchr($slug, '-'), 1);
        $hashids = new Hashids('urpuppy449958', 10);
        $decoded = $hashids->decode($hashedId);

        return ! empty($decoded) ? $decoded[0] : null;
    }

    public function registerMediaCollections(): void
    {
        // Define an 'images' media collection
        $this->addMediaCollection('gallery');

        /* $this->addMediaCollection('videos'); */
    }

    public function getGalleryAttribute()
    {
        return $this->getMedia('gallery')->sortBy('order_column')->map(function ($media) {
            return $media->getUrl('preview');
        });
    }

    public function getCompanyLogoAttribute()
    {
        // Fetch the first media item
        $mediaItem = $this?->getFirstMedia('company_logo');

        // Check for 'grid' URL, then 'preview', then return null
        if ($mediaItem) {
            try {
                return $mediaItem->getUrl('thumbnail') ?? asset('paw.svg');
            } catch (\Spatie\MediaLibrary\Exceptions\ConversionDoesNotExist $e) {
                // Handle the case where the conversion does not exist
                return asset('paw.svg'); // or handle as needed
            }

        }

        return asset('paw.svg'); // Return null if no media item exists
    }

    public function getInitialNameAttribute()
    {
        return ucfirst($this->first_name[0]).''.ucfirst($this->last_name[0]);
    }

    public function getNameAttribute()
    {
        return $this->first_name.' '.$this->last_name;
    }

    public function getVideoAttribute()
    {
        // Fetch the first media item
        $mediaItem = $this?->getFirstMedia('videos');

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

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('avatar')
            ->width(100)
            ->height(100)
            ->sharpen(10);

        $this->addMediaConversion('thumbnail')
            ->fit(Fit::Contain, 800, 450)  // Reduced from 1280x720 to 800x450 (same aspect ratio)
            ->optimize()
            ->format('webp')
            ->performOnCollections('company_logo')
            ->quality(75)
            ->sharpen(3);

        $this->addMediaConversion('thumbnail')
            ->fit(Fit::Contain, 150, 150)  // Reduced from 1280x720 to 800x450 (same aspect ratio)
            ->performOnCollections('gallery')
            ->optimize()
            ->format('webp')
            ->quality(75)
            ->sharpen(3);

        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 800, 450)  // Reduced from 1280x720 to 800x450 (same aspect ratio)
            ->performOnCollections('gallery')
            ->optimize()
            ->format('webp')
            ->quality(75)
            ->sharpen(3);
    }

    public function getFilamentName(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return true; //str_ends_with($this->email, 'support@urpuppy.com') || str_ends_with($this->email, 'editor@urpuppy.com');
    }

    public function scopeBreeders($query)
    {

        return $query->where('is_breeder', true)
            ->whereHas('breeder_requests', function ($q) {
                $q->where('id', function ($subquery) {
                    $subquery->select('id')
                        ->from('breeder_requests')
                        ->whereColumn('breeder_requests.user_id', 'users.id') // Adjust based on your relationship
                        ->orderByDesc('created_at')
                        ->limit(1);
                })->where('status', 'approved');
            });

    }

    public function getHasPasswordAttribute()
    {
        return ! is_null($this->password);
    }

    public function getMemberSinceAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    public function getAvatarAttribute()
    {
        return $this->getFirstMediaUrl('avatars');
    }

    public function state()
    {
        return $this->belongsTo(State::class);
    }

    /* public function city() */
    /* { */
    /*     return $this->belongsTo(City::class); */
    /* } */

    public function company_state()
    {
        return $this->belongsTo(State::class, 'company_state_id');
    }

    /* public function company_city() */
    /* { */
    /*     return $this->belongsTo(City::class, 'company_city_id'); */
    /* } */

    /* public function stripeAddress() */
    /* { */
    /*     return [ */
    /*         'line_1' */
    /*     ]; */
    /* } */

    public function customSubscriptions()
    {
        return $this->hasMany(Subscription::class, 'user_id', 'id');
    }

    public function getIsSubscribedAttribute()
    {
        return $this->active_subscriptions_count > 0;
    }

    public function getAddressAttribute()
    {
 if (request()->routeIs('home')) {

        $city  = $this->city ?? '';
        $state = $this->short_state ?? $this->state?->abbreviation ?? '';

        return trim($city . ' ' . $state);
    }
    if ($this->gmap_address) {
        return $this->gmap_address;
    }

    return trim(($this->city ?? '') . ' ' . ($this->state ?? ''));
  /*      return $this->city.' '.$this->short_state;

/*        return $this->gmap_address;
        /* $state = $this->state?->abbreviation ?? $this->state?->name; */
        /* $address = $this->city . ' ' . $state ; */
        /* if ($this->city == null &&  $state == null) { */
        /*     return $this->company_address_formatted; */
        /* } */

        /* return $address; */
    }

    public function getShortAddressAttribute()
    {
        $state = $this->short_state;
        $city_name = substr($this->city ?? '', 0, 6).(strlen($this->city ?? '') > 6 ? '.' : '');

        if (! empty($state) && ! empty($city_name)) {
            return $city_name.' '.$state;
        }

        $state = $this->short_company_state;
        $city_name = substr($this->company_city ?? '', 0, 6).(strlen($this->company_city ?? '') > 6 ? '.' : '');

        return $city_name.' '.$state;
    }

    public function getOriginalCompanyAddressAttribute($value) {}

    public function getCompanyAddressFormattedAttribute($value)
    {
        return $this->company_address;
        /* $state = $this->company_state?->abbreviation ?? $this->company_state?->name; */
        /* return  ( $value ?? "" ) .', '. $this->company_city . ' ' . $state ; */
    }

    public function isSubscribed()
    {
        return $this->subscriptions()->active()->count();
    }

    public function puppies()
    {
        return $this->hasMany(Puppy::class);
    }

    /*     public function getAttributesAttribute($value) */
    /*     { */
    /*         dd($value); */
    /*     } */

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function breeds()
    {
        return $this->belongsToMany(Breed::class);
    }

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function getCompanyEstablishedOnLabelAttribute()
    {
        if ($this->company_established_on == null) {
            return '';
        }
        $establishedDate = Carbon::parse($this->company_established_on);

        if (! $establishedDate) {
            return null;
        }

        $now = now();
        $years = (int) $establishedDate->diffInYears($now);
        $months = $establishedDate->copy()->addYears($years)->diffInMonths($now);

        if ($years > 0) {
            return (int) $years.' year'.($years > 1 ? 's' : '');
        } elseif ($months > 0) {
            return (int) $months.' month'.($months > 1 ? 's' : '');
        }

        return 'Less than a month';
    }

    public function saved_searches()
    {
        return $this->hasMany(SavedSearch::class);
    }

    public function getTrialEndsAtAttribute()
    {
        return $this->getActiveSubscriptions()?->first()?->trial_ends_at?->format('d M Y');
    }

    public function getRolesAttribute()
    {
        return $this->roles()->pluck('name');

    }

    public function getPhoneFormattedAttribute()
    {
        if (! $this->phone) {
            return 'N/A'; // Default value if phone is null
        }

        // Remove country code (+1) if it exists
        $phone = preg_replace('/^\+1/', '', $this->phone);

        // Ensure it's exactly 10 digits
        if (preg_match('/^(\d{3})(\d{3})(\d{4})$/', $phone, $matches)) {
            return "{$matches[1]}-{$matches[2]}-{$matches[3]}";
        }

        return $this->phone; // Return original if not a valid 10-digit number
    }

    /*      static::pivotUpdated(function ($model, $relationName, $pivotIds, $pivotIdsAttributes) { */
    /*         echo 'pivotUpdated'; */
    /*         echo get_class($model); */
    /*         echo $relationName; */
    /*         print_r($pivotIds); */
    /*         print_r($pivotIdsAttributes); */
    /*     }); */

    /* public function getCustomAttributesAttribute() */
    /* { */
    /*     return $this->attributes()->get()->pluck('value', 'title'); */
    /* } */

    public function getFilamentAvatarUrl(): ?string
    {
        $firstInitial = $this->first_name ? strtoupper(mb_substr($this->first_name, 0, 1)) : '';
        $lastInitial = $this->last_name ? strtoupper(mb_substr($this->last_name, 0, 1)) : '';
        if ($firstInitial && $lastInitial) {
            $name = $firstInitial . $lastInitial;
        } elseif ($firstInitial) {
            $name = $firstInitial;
        } elseif ($lastInitial) {
            $name = $lastInitial;
        } else {
            $name = '';
        }
        if($name == '') {
            return $this->avatar;
        }
        return 'https://ui-avatars.com/api/?name='. $name .'&color=FFFFFF&background=f97316';
    }

    public function breeder_requests()
    {
        return $this->hasMany(BreederRequest::class);
    }

    public function getIsApprovedAttribute()
    {
        return $this->breeder_requests()->where('status', 'approved')->latest()->first() ? true : false;

    }

    public function getSeoTitleAttribute()
    {
        return strip_tags($this->company_name ?? "");
    }

    public function getSeoDescriptionAttribute()
    {
        return strip_tags($this->description ?? "");
    }
}

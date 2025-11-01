<?php

namespace App\Models;

use App\Observers\BreedObserver;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sitemap\Contracts\Sitemapable;
use Spatie\Sitemap\Tags\Url;

#[ObservedBy([BreedObserver::class])]
class Breed extends Model implements HasMedia, Sitemapable
{
    /** @use HasFactory<\Database\Factories\BreedFactory> */
    use HasFactory;

    use InteractsWithMedia;
    use Sluggable;

    protected $appends = [
        'thumbnail',
        'image',
    ];

    public function toSitemapTag(): Url|string|array
    {
        return route('breeds.show', $this->slug);
    }

    protected $guarded = [
        'id',
    ];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name',
            ],
        ];
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumbnail')
            ->width(720)
            ->format('webp')
            ->quality(80)
            ->performOnCollections('media');
    }

    public function getThumbnailAttribute()
    {
        $mediaItem = $this->getFirstMedia('media');

        return $mediaItem ? $mediaItem->getUrl('thumbnail') : @$this->media[0]?->getUrl() ?? asset('paw.svg');
    }

    public function getImageAttribute()
    {
        $mediaItem = $this->getFirstMedia('media');

        $bag = $mediaItem ? $mediaItem->getUrl('thumbnail') : $mediaItem ?? asset('paw.svg');

        return $bag;
    }

    public function media(): MorphMany
    {
        return $this->morphMany($this->getMediaModel(), 'model');
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function puppies()
    {
        return $this->belongsToMany(Puppy::class);
    }

    public function getSeoTitleAttribute()
    {
        return strip_tags($this->name);
    }

    public function getSeoDescriptionAttribute()
    {
        return str_limit(  strip_tags($this->description ?? $this->history_description), 160 );
    }

}

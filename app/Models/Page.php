<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sitemap\Contracts\Sitemapable;
use Spatie\Sitemap\Tags\Url;

class Page extends Post implements Sitemapable
{
    /* extends Post */
    use InteractsWithMedia, Sluggable;

    protected $table = 'posts';

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title',
            ],
        ];
    }

    public function toSitemapTag(): Url|string|array
    {
        return route('custom.page', $this->slug);

    }
}

<?php

namespace App\Models;

use App\Models\Traits\LogsView;
use Cog\Contracts\Love\Reactable\Models\Reactable as ReactableInterface;
use Cog\Laravel\Love\Reactable\Models\Traits\Reactable;
// Correct Media class
use Stephenjude\FilamentBlog\Models\Post as ModelsPost;

class Post extends ModelsPost implements ReactableInterface
{
    use LogsView;
    use Reactable;

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable')->orderBy('created_at', 'desc');
    }

    // Accessor for like count
    public function getLikeCountAttribute()
    {
        return $this->viaLoveReactant()
            ->getReactionCounterOfType('Like')
            ?->getCount() ?? 0;
    }

    // Accessor for unlike count
    public function getUnlikeCountAttribute()
    {
        return $this->viaLoveReactant()
            ->getReactionCounterOfType('Unlike')
            ?->getCount() ?? 0;
    }
}

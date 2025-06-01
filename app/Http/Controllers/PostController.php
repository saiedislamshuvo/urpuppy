<?php

namespace App\Http\Controllers;

use App\Data\CommentData;
use App\Data\PostData;
use App\Models\Post;
use Cog\Laravel\Love\ReactionType\Models\ReactionType;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return inertia()->render('Post/Index', [
            'posts' => PostData::collect(Post::orderBy('created_at', 'desc')->with(['category', 'author'])->paginate(12)),
        ]);
    }

    public function show(Request $request, string $slug)
    {
        $user = $request->user();
        $reacterFacade = null;
        $post = PostData::from($post_model = Post::with(['category', 'author', 'comments', 'comments.reviewer'])->where('slug', $slug)->firstOrFail());

        defer(function () use ($post_model) {
            $post_model->logView();
        });

        if ($user && ! $user?->isRegisteredAsLoveReacter()) {
            $user->registerAsLoveReacter();

            $reacterFacade = $user->viaLoveReacter();
        }

        if (! $post_model?->isRegisteredAsLoveReactant()) {
            $post_model->registerAsLoveReactant();
        }

        return inertia()->render('Post/Show',

            ['post' => $post,
                'comments' => CommentData::collect($post_model->comments()->with('reviewer')->paginate(12)),

                'is_liked' => $user ? $reacterFacade?->hasReactedTo($post_model, 'Like') : false,
                'is_unliked' => $user ? $reacterFacade?->hasReactedTo($post_model, 'Unlike') : false,
            ]);
    }

    public function comment(Request $request, int $id)
    {
        Post::find($id)->comments()->create([
            'user_id' => $request->user()->id,
            'body' => $request->body,
        ]);

        return redirect()->back()->with([
            'message.success' => 'Comment added successfully',
        ]);

    }

    public function toggleReaction(Request $request, $postId, $reactionType)
    {
        $user = $request->user();
        $post = Post::with(['author', 'category'])->findOrFail($postId);

        if (! $user->isRegisteredAsLoveReacter()) {
            $user->registerAsLoveReacter();
        }

        $reacterFacade = $user->viaLoveReacter();

        if (! $post->isRegisteredAsLoveReactant()) {
            $post->registerAsLoveReactant();
        }

        if (! in_array($reactionType, ['Like', 'Unlike'])) {
            return response()->json(['error' => 'Invalid reaction type'], 400);
        }

        if (! ReactionType::where('name', $reactionType)->exists()) {
            return response()->json(['error' => "Reaction type `{$reactionType}` not exists."], 400);
        }

        $oppositeType = $reactionType === 'Like' ? 'Unlike' : 'Like';

        if ($reacterFacade->hasReactedTo($post, $oppositeType)) {
            $reacterFacade->unreactTo($post, $oppositeType);
        }

        if ($reacterFacade->hasReactedTo($post, $reactionType)) {
            $reacterFacade->unreactTo($post, $reactionType);
        } else {
            $reacterFacade->reactTo($post, $reactionType);
        }

        // Refresh the post data
        $post->refresh();

        return redirect()->back()->with([
            'post' => PostData::from($post),
            'is_liked' => $reacterFacade->hasReactedTo($post, 'Like'),
            'is_unliked' => $reacterFacade->hasReactedTo($post, 'Unlike'),
        ]);
    }
}

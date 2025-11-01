<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\User;

class CommentController extends Controller
{
    public function store(CommentRequest $request, User $seller)
    {
        if ($request->user() == null) {
            return redirect()->back()->with('message.error', 'You have to login first');
        }

        if ($seller->id == $request->user()->id) {
            return redirect()->back()->with('message.error', 'You cannot review yourself');
        }

        if ($seller->comments()->where('user_id', $request->user()->id)->exists()) {
            return redirect()->back()->with('message.error', 'You can only submit one review per breeder');
        }

        $comment = $seller->comments()->make($request->validated());
        $comment->seller()->associate($request->user());
        $comment->save();

        return redirect()->back()->with('message.success', 'Review submitted successfully');
    }
}

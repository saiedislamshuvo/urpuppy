<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;

class MediaController extends Controller
{
    /**
     * Display the media management page
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // Check if user is authenticated
        if (!$user) {
            return redirect()->route('login');
        }
        
        // Check if user is a breeder
        if (!$user->is_breeder) {
            return redirect()->route('dashboard')->with([
                'message.error' => 'Only breeders can access the media management page.',
            ]);
        }
        
        // Get media data
        $gallery = $user->getMedia('gallery')->sortBy('order_column')->map(function ($media) {
            return $media->getUrl('preview');
        })->values()->toArray();
        
        $videos = $user->getMedia('videos')->map(function ($media) {
            return $media->getUrl();
        })->values()->toArray();
        
        // Get subscription limits
        $plan = $user->is_breeder ? $user->breeder_plan?->plan : $user->premium_plan?->plan;
        $imageLimit = $plan?->image_per_listing ?? 10;
        $videoLimit = $plan?->video_per_listing ?? 3;

        return inertia('Media/Index', [
            'gallery' => $gallery,
            'videos' => $videos,
            'media_limits' => [
                'images' => $imageLimit,
                'videos' => $videoLimit,
            ],
        ]);
    }

    /**
     * Update media (handle form submission from media page)
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        
        // Check if user is authenticated
        if (!$user) {
            return redirect()->route('login');
        }
        
        // Check if user is a breeder
        if (!$user->is_breeder) {
            return redirect()->route('dashboard')->with([
                'message.error' => 'Only breeders can access the media management page.',
            ]);
        }
        
        $validator = Validator::make($request->all(), [
            'gallery' => ['nullable', 'array', 'max:10'],
            'gallery.*' => [
                'nullable',
                'file',
                'image',
                'mimes:jpeg,png,jpg,gif,svg,webp',
                'max:12048', // Max 12MB per image
            ],
            'videos' => ['nullable', 'array', 'max:3'],
            'videos.*' => [
                'file',
                'mimes:mp4,mov,avi,webm',
                'max:51200', // Max 50MB per video
            ],
        ]);
        if ($validator->fails()) {
            dd($validator->errors());
            return Redirect::back()->withErrors($validator)->withInput();
        }

        // Handle gallery images - only process new File uploads
        if (isset($request->gallery) && is_array($request->gallery)) {
            // Only get File objects (new uploads), ignore strings (existing URLs)
            $files = collect($request->gallery)->filter(fn($item) => $item instanceof \Illuminate\Http\UploadedFile);
            // Add new files only
            $files->each(function ($image) use ($user) {
                $user->addMedia($image)->toMediaCollection('gallery');
            });
        }
        if (isset($request->videos) && is_array($request->videos)) {
            $files = collect($request->videos)->filter(fn($item) => $item instanceof \Illuminate\Http\UploadedFile);
            $files->each(function ($video) use ($user) {
                $user->addMedia($video)->toMediaCollection('videos');
            });
        }

        return Redirect::route('media.index', [], 303)->with([
            'message.success' => 'Media updated successfully.',
        ]);
    }

    /**
     * Upload media (images or videos) for user profile
     */
    public function upload(Request $request)
    {
        $user = Auth::user();
        
        $validator = Validator::make($request->all(), [
            'type' => 'required|in:gallery,videos',
            'files' => 'required|array',
            'files.*' => $request->input('type') === 'gallery' 
                ? 'image|mimes:jpeg,png,jpg,gif,webp|max:12048'
                : 'mimes:mpeg,mp4,ogg,webm,mov,avi|max:51200',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $type = $request->input('type');
        $files = $request->file('files');
        
        // Get subscription limits
        $plan = $user->is_breeder ? $user->breeder_plan?->plan : $user->premium_plan?->plan;
        
        $maxFiles = $type === 'gallery' 
            ? ($plan?->image_per_listing ?? 10) 
            : ($plan?->video_per_listing ?? 3);
        
        // Get current media count
        $currentMedia = $user->getMedia($type);
        $currentCount = $currentMedia->count();
        
        // Check if adding these files would exceed the limit
        if ($currentCount + count($files) > $maxFiles) {
            return response()->json([
                'success' => false,
                'message' => "You can only upload {$maxFiles} {$type}. You currently have {$currentCount} and are trying to add " . count($files) . " more.",
            ], 422);
        }

        $uploadedUrls = [];
        
        foreach ($files as $file) {
            $media = $user->addMedia($file)->toMediaCollection($type);
            $url = $type === 'gallery' 
                ? $media->getUrl('preview')
                : $media->getUrl();
            $uploadedUrls[] = $url;
        }

        return response()->json([
            'success' => true,
            'urls' => $uploadedUrls,
            'current_count' => $currentCount + count($files),
            'max_files' => $maxFiles,
        ]);
    }

    /**
     * Delete media from user profile
     */
    public function delete(Request $request)
    {
        $user = Auth::user();
        
        $validator = Validator::make($request->all(), [
            'type' => 'required|in:gallery,videos',
            'url' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $type = $request->input('type');
        $url = $request->input('url');
        
        // Find the media item by URL
        $media = $user->getMedia($type)->first(function ($item) use ($url, $type) {
            $itemUrl = $type === 'gallery' 
                ? $item->getUrl('preview')
                : $item->getUrl();
            
            // Normalize URLs for comparison
            $normalizeUrl = function($url) {
                $parsed = parse_url($url);
                $path = $parsed['path'] ?? $url;
                return trim($path, '/');
            };
            
            return $normalizeUrl($itemUrl) === $normalizeUrl($url);
        });

        if (!$media) {
            return response()->json([
                'success' => false,
                'message' => 'Media not found.',
            ], 404);
        }

        $media->delete();

        // Get updated counts
        $currentMedia = $user->getMedia($type);
        $plan = $user->is_breeder ? $user->breeder_plan?->plan : $user->premium_plan?->plan;
        $maxFiles = $type === 'gallery' 
            ? ($plan?->image_per_listing ?? 10) 
            : ($plan?->video_per_listing ?? 3);

        return response()->json([
            'success' => true,
            'message' => 'Media deleted successfully.',
            'current_count' => $currentMedia->count(),
            'max_files' => $maxFiles,
        ]);
    }

    /**
     * Get media limits for the current user
     */
    public function limits(Request $request)
    {
        $user = Auth::user();
        
        $plan = $user->is_breeder ? $user->breeder_plan?->plan : $user->premium_plan?->plan;
        
        $galleryCount = $user->getMedia('gallery')->count();
        $videosCount = $user->getMedia('videos')->count();
        
        return response()->json([
            'gallery' => [
                'current' => $galleryCount,
                'max' => $plan?->image_per_listing ?? 10,
            ],
            'videos' => [
                'current' => $videosCount,
                'max' => $plan?->video_per_listing ?? 3,
            ],
        ]);
    }
}

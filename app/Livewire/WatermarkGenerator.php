<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\WithFileUploads;
use Livewire\WithPagination;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class WatermarkGenerator extends Component
{
    use WithFileUploads;
    use WithPagination;

    // Watermark configuration
    public $watermarkType = 'image'; // Default to image watermark
    
    // Default watermark settings (not exposed to user)
    public $watermarkText = 'urpuppy.com';
    public $watermarkImageUrl = '/logo.svg'; // Default watermark image (same as used in GenericFileUpload)
    public $opacity = 0.3;
    public $position = 'tile';
    public $color = '#ffffff';
    
    // Watermarked files to upload (generated in frontend)
    public $watermarkedFiles = [];
    
    // Preview
    public $previewUrl = null;
    public $originalImageUrl = null;
    public $isProcessing = false;
    public $message = null;
    public $messageType = null; // 'success', 'error', 'warning'
    
    // Media ID if editing existing media
    public $selectedMediaId = null;
    
    // Pagination
    protected int $perPage = 12;

    protected $rules = [
        'watermarkType' => 'required|in:text,image',
        'watermarkedFiles.*' => 'image|max:10240', // 10MB max
    ];

    public function mount($mediaId = null)
    {
        if ($mediaId) {
            $this->selectedMediaId = $mediaId;
            $media = Media::find($mediaId);
            if ($media) {
                $this->originalImageUrl = $media->getUrl();
            }
        }
    }
    
    public function getImagesProperty(): LengthAwarePaginator
    {
        return Media::where('mime_type', 'like', 'image/%')
            ->orderBy('created_at', 'desc')
            ->paginate($this->perPage, pageName: 'page');
    }
    
    public function getImagesArray()
    {
        return $this->getImagesProperty()
            ->map(function ($media) {
                try {
                    return [
                        'id' => $media->id,
                        'url' => $media->getUrl(),
                        'name' => $media->name,
                        'model_type' => $media->model_type,
                        'model_id' => $media->model_id,
                        'collection' => $media->collection_name,
                        'size' => $media->size,
                        'created_at' => $media->created_at,
                    ];
                } catch (\Exception $e) {
                    return null;
                }
            })
            ->filter()
            ->values();
    }
    
    public function selectMedia($mediaId): void
    {
        $this->selectedMediaId = $mediaId;
        $media = Media::find($mediaId);
        if ($media) {
            $this->originalImageUrl = $media->getUrl();
            $this->previewUrl = null; // Reset preview when selecting new media
            $this->message = null;
        }
    }
    
    public function formatBytes($bytes, $precision = 2)
    {
        if ($bytes == 0) {
            return '0 Bytes';
        }

        $units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        $base = log($bytes, 1024);
        $unit = $units[floor($base)];

        return round(pow(1024, $base - floor($base)), $precision) . ' ' . $unit;
    }
    
    public function updatedWatermarkType()
    {
        $this->resetValidation();
        $this->previewUrl = null;
    }

    /**
     * Upload watermarked file from base64 (generated in frontend)
     * If selectedMediaId is set, updates the existing media record instead of creating a new one
     */
    public function uploadWatermarkedFile($base64Data, $filename = 'watermarked-image.jpg')
    {
        $this->isProcessing = true;
        $this->message = null;

        try {
            $user = Auth::user();
            if (!$user) {
                throw new \Exception('User not authenticated');
            }

            // Decode base64 data
            $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Data));
            
            if (!$imageData) {
                throw new \Exception('Invalid image data');
            }

            // Save to temporary file
            $tempPath = sys_get_temp_dir() . '/' . uniqid('watermark_', true) . '.jpg';
            file_put_contents($tempPath, $imageData);

            // Check if we're updating an existing media record
            if ($this->selectedMediaId) {
                $existingMedia = Media::find($this->selectedMediaId);
                
                if (!$existingMedia) {
                    throw new \Exception('Media record not found');
                }

                // Store all existing media attributes to preserve them
                $oldAttributes = [
                    'model_type' => $existingMedia->model_type,
                    'model_id' => $existingMedia->model_id,
                    'uuid' => $existingMedia->uuid,
                    'collection_name' => $existingMedia->collection_name,
                    'name' => $existingMedia->name,
                    'file_name' => $existingMedia->file_name,
                    'disk' => $existingMedia->disk,
                    'conversions_disk' => $existingMedia->conversions_disk,
                    'manipulations' => $existingMedia->manipulations,
                    'custom_properties' => $existingMedia->custom_properties,
                    'order_column' => $existingMedia->order_column,
                    'created_at' => $existingMedia->created_at,
                    'updated_at' => $existingMedia->updated_at,
                ];
                
                // Get the owner model to add media to
                $ownerModel = $existingMedia->model;
                if (!$ownerModel) {
                    throw new \Exception('Media owner model not found');
                }
                
                // Delete the old media using Spatie (this removes files and conversions)
                $oldMediaId = $existingMedia->id;
                $existingMedia->delete();
                
                // Add the new watermarked file using Spatie's addMedia method
                // This will automatically generate conversions from the watermarked file
                $media = $ownerModel->addMedia($tempPath)
                    ->usingName($oldAttributes['name'])
                    ->usingFileName($oldAttributes['file_name'])
                    ->toMediaCollection($oldAttributes['collection_name']);
                
                // Update the new media record with all old attributes (except ID which can't be changed)
                $media->update([
                    'uuid' => $oldAttributes['uuid'],
                    'disk' => $oldAttributes['disk'] ?? 'public',
                    'conversions_disk' => $oldAttributes['conversions_disk'],
                    'manipulations' => $oldAttributes['manipulations'],
                    'custom_properties' => $oldAttributes['custom_properties'],
                    'order_column' => $oldAttributes['order_column'],
                    'created_at' => $oldAttributes['created_at'],
                    'updated_at' => now(),
                ]);
                
                // Update selectedMediaId to the new media ID
                $this->selectedMediaId = $media->id;
                
                // Clear caches
                Cache::flush();
                
                // Get fresh URL with cache-busting timestamp
                $baseUrl = $media->getUrl();
                $this->originalImageUrl = $baseUrl . (strpos($baseUrl, '?') !== false ? '&' : '?') . 'v=' . time();
                
                \Log::info('Media replaced using Spatie methods', [
                    'old_media_id' => $oldMediaId,
                    'new_media_id' => $media->id,
                    'collection' => $oldAttributes['collection_name'],
                    'preserved_attributes' => array_keys($oldAttributes),
                ]);

                $this->message = 'Successfully updated watermarked image.';
            } else {
                // Create new media record (original behavior)
                // Ensure it uses the public disk
                $media = $user->addMedia($tempPath)
                    ->usingName($filename)
                    ->usingFileName($filename)
                    ->toMediaCollection('gallery');
                
                // Ensure the disk is set to public
                if ($media->disk !== 'public') {
                    $media->update(['disk' => 'public']);
                }

                $this->message = 'Successfully uploaded watermarked image.';
            }

            // Clean up temp file
            @unlink($tempPath);

            $this->messageType = 'success';
            $this->dispatch('watermark-uploaded');
            
        } catch (\Exception $e) {
            \Log::error('Watermark upload failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            $this->message = 'Failed to upload watermarked image: ' . $e->getMessage();
            $this->messageType = 'error';
        } finally {
            $this->isProcessing = false;
        }
    }

    public function render()
    {
        return view('livewire.watermark-generator');
    }
}

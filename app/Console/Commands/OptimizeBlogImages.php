<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver; // or Imagick\Driver
use App\Models\Post;

class OptimizeBlogImages extends Command
{
    protected $signature = 'images:convert-webp';
    protected $description = 'Convert all blog images (JPG, JPEG, PNG) to WebP and update post banners';

    public function handle()
    {
        $targetWidth = 1200;
        $targetHeight = 800;
        $quality = 85;

        // Initialize ImageManager with GD driver
        $manager = new ImageManager(new Driver());
        $disk = Storage::disk('s3');

        // Step 1: Process all images in blog/ folder (convert to WebP if needed, resize all)
        $this->info("Step 1: Processing all images in blog/ folder...");
        $files = $disk->files('blog/');
        $processedFiles = [];

        foreach ($files as $filePath) {
            // Skip non-image files
            if (!preg_match('/\.(jpg|jpeg|png|webp)$/i', $filePath)) {
                continue;
            }

            $this->info("Processing: $filePath");

            try {
                // Get image from storage
                $imageData = $disk->get($filePath);

                if (!$imageData) {
                    $this->error("Failed to read file: $filePath");
                    continue;
                }

                // Create image instance from binary data
                $image = $manager->read($imageData);

                // Get original dimensions
                $originalWidth = $image->width();
                $originalHeight = $image->height();
                $this->info("  Original size: {$originalWidth}x{$originalHeight}");

                // Resize to target dimensions with cover mode
                $image->cover($targetWidth, $targetHeight);
                $this->info("  Resized to: {$image->width()}x{$image->height()} (cover mode)");

                // Determine output path - convert to WebP if not already
                $isWebP = preg_match('/\.webp$/i', $filePath);
                $outputPath = $isWebP ? $filePath : preg_replace('/\.(jpg|jpeg|png)$/i', '.webp', $filePath);

                // Encode image data
                $outputData = $isWebP ? $image->toWebp($quality) : $image->toWebp($quality);

                if (!$outputData) {
                    $this->error("Failed to encode image: $filePath (empty result)");
                    continue;
                }

                // Check if output file already exists (and is different from input)
                if ($outputPath !== $filePath && $disk->exists($outputPath)) {
                    $this->warn("Output file already exists: $outputPath (skipping)");
                    $processedFiles[$filePath] = $outputPath;
                    continue;
                }

                // Upload to storage with correct MIME
                $success = $disk->put($outputPath, $outputData, [
                    'visibility' => 'public',
                    'ContentType' => 'image/webp',
                ]);

                if ($success) {
                    // Get file sizes for comparison
                    $originalSize = strlen($imageData);
                    $outputSize = strlen($outputData);
                    $savings = round((($originalSize - $outputSize) / $originalSize) * 100, 1);

                    $this->info("✅ Processed: $outputPath");
                    $this->info("  File size: " . $this->formatBytes($originalSize) . " → " . $this->formatBytes($outputSize) . " ({$savings}% change)");

                    $processedFiles[$filePath] = $outputPath;

                    // If we created a new WebP file and the original wasn't WebP, mark original for deletion
                    if (!$isWebP && $outputPath !== $filePath) {
                        $processedFiles[$filePath] = $outputPath;
                    }
                } else {
                    $this->error("Failed to save: $outputPath");
                }

            } catch (\Exception $e) {
                $this->error("❌ Error processing $filePath: " . $e->getMessage());
            }
        }

        // Step 2: Update post banners to use WebP files
        $this->info("\nStep 2: Updating post banners to use WebP files...");
        $posts = Post::query()->get();

        foreach ($posts as $post) {
            if (!$post->banner) {
                continue;
            }

            $this->info("Processing post ID: {$post->id} - Banner: {$post->banner}");

            // Check if current banner is an image file in blog/ folder (not already WebP)
            if (preg_match('/^blog\/.*\.(jpg|jpeg|png)$/i', $post->banner)) {
                // Create WebP path
                $webpPath = preg_replace('/\.(jpg|jpeg|png)$/i', '.webp', $post->banner);

                // Check if WebP version exists
                if ($disk->exists($webpPath)) {
                    // Update post banner to WebP
                    $post->update(['banner' => $webpPath]);
                    $this->info("✅ Updated post {$post->id} banner to: {$webpPath}");
                } else {
                    $this->warn("WebP not found for: {$post->banner} (expected: {$webpPath})");
                }
            } else {
                $this->info("Skipping post {$post->id} - already WebP or not in blog/ folder");
            }
        }

        // Step 3: Delete old image files (JPG, JPEG, PNG) that were converted
        $this->info("\nStep 3: Cleaning up old image files...");

        foreach ($processedFiles as $originalPath => $webpPath) {
            // Only delete if the original is not WebP and different from the processed path
            if ($originalPath !== $webpPath && $disk->exists($originalPath) && !preg_match('/\.webp$/i', $originalPath)) {
                $disk->delete($originalPath);
                $this->info("🗑️ Deleted original: {$originalPath}");
            }
        }

        // Clean up any remaining old format files in blog/ folder
        $remainingFiles = $disk->files('blog/');
        foreach ($remainingFiles as $filePath) {
            if (preg_match('/\.(jpg|jpeg|png)$/i', $filePath)) {
                $disk->delete($filePath);
                $this->info("🗑️ Deleted orphaned file: {$filePath}");
            }
        }

        $this->info("\n✅ Process completed!");
        $this->info("- Processed " . count($processedFiles) . " images");
        $this->info("- Updated post banners to use WebP files");
        $this->info("- Deleted old image files");
    }

    /**
     * Format bytes to human readable format
     */
    private function formatBytes($bytes, $precision = 2)
    {
        $units = array('B', 'KB', 'MB', 'GB', 'TB');

        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, $precision) . ' ' . $units[$i];
    }
}

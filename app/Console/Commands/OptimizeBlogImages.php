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
        // Initialize ImageManager with GD driver
        $manager = new ImageManager(new Driver());
        $disk = Storage::disk('public');

        // Step 1: Convert all images in blog/ folder to WebP
        $this->info("Step 1: Converting all images in blog/ folder to WebP...");
        $files = $disk->files('blog/');
        $convertedFiles = [];

        foreach ($files as $filePath) {
            if (!preg_match('/\.(jpg|jpeg|png)$/i', $filePath)) {
                continue; // skip non-supported files
            }

            $this->info("Converting: $filePath");

            try {
                // Get image from storage
                $imageData = $disk->get($filePath);

                if (!$imageData) {
                    $this->error("Failed to read file: $filePath");
                    continue;
                }

                // Create image instance from binary data
                $image = $manager->read($imageData);

                // Convert to WebP with 70% quality
                $webpData = $image->toWebp(70);

                if (!$webpData) {
                    $this->error("Failed to encode WebP: $filePath (empty result)");
                    continue;
                }

                // Create .webp filename
                $webpPath = preg_replace('/\.(jpg|jpeg|png)$/i', '.webp', $filePath);

                // Check if WebP already exists
                if ($disk->exists($webpPath)) {
                    $this->warn("WebP already exists: $webpPath (skipping conversion)");
                    $convertedFiles[$filePath] = $webpPath;
                    continue;
                }

                // Upload WebP to storage with correct MIME
                $success = $disk->put($webpPath, $webpData, [
                    'visibility' => 'public',
                    'ContentType' => 'image/webp',
                ]);

                if ($success) {
                    $this->info("✅ Converted to WebP: $webpPath");
                    $convertedFiles[$filePath] = $webpPath;
                } else {
                    $this->error("Failed to save WebP: $webpPath");
                }

            } catch (\Exception $e) {
                $this->error("❌ Error converting $filePath: " . $e->getMessage());
            }
        }

        // Step 2: Update post banners from old formats to WebP
        $this->info("\nStep 2: Updating post banners to use WebP files...");
        $posts = Post::query()->get();

        foreach ($posts as $post) {
            if (!$post->banner) {
                continue;
            }

            $this->info("Processing post ID: {$post->id} - Banner: {$post->banner}");

            // Check if current banner is an image file in blog/ folder
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
                $this->info("Skipping post {$post->id} - not an image in blog/ folder or already WebP");
            }
        }

        // Step 3: Delete old image files (JPG, JPEG, PNG)
        $this->info("\nStep 3: Cleaning up old image files...");

        foreach ($convertedFiles as $originalPath => $webpPath) {
            if ($disk->exists($originalPath)) {
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
        $this->info("- Converted " . count($convertedFiles) . " images to WebP");
        $this->info("- Updated post banners to use WebP files");
        $this->info("- Deleted old image files");
    }
}

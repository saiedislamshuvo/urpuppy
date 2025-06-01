<?php

namespace App\Console\Commands;

use App\Models\Breed;
use App\Models\Puppy;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Spatie\Sitemap\SitemapGenerator;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'GenerateSitemap';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sitemap = SitemapGenerator::create(config('app.url'))
            ->getSitemap()
            ->add(Puppy::where('status', 'published')->get())
            ->add(route('breeds.index'))
            ->add(Breed::all())
            ->add(User::breeders()->get());

        // Create a temporary file handle
        $tempFile = tmpfile();
        fwrite($tempFile, $sitemap->render());
        rewind($tempFile);

        /* Storage::disk('s3')->put('sitemap.xml', $sitemap->render()); */

        if (Storage::disk('s3')->exists('sitemap.xml')) {
    Storage::disk('s3')->delete('sitemap.xml');
}

        // Stream to S3
         Storage::disk('s3')->writeStream('sitemap.xml', $tempFile);

        // Close the file handle
        fclose($tempFile);

        $this->info('Sitemap generated and uploaded to S3 successfully!');
    }
}

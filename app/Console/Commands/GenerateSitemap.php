<?php

namespace App\Console\Commands;

use App\Models\Breed;
use App\Models\Puppy;
use App\Models\User;
use Illuminate\Console\Command;
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
        SitemapGenerator::create(config('app.url'))
            ->getSitemap()
            ->add(Puppy::all())
            ->add(route('breeds.index'))
            ->add(Breed::all())
            ->add(User::all())
            ->writeToFile(public_path('sitemap.xml'));
    }
}

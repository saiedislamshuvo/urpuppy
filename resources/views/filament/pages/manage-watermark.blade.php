<x-filament-panels::page>
    <div class="space-y-6">
        {{-- Live Preview Section with Livewire Component --}}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Live Preview & Generator
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Select an image from the gallery below to see a live preview of the watermark.
            </p>
            @livewire('watermark-generator', [
                'mediaId' => null
            ], key('watermark-generator'))
        </div>
    </div>
</x-filament-panels::page>


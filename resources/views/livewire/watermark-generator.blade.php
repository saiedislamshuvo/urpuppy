<div class="watermark-generator">
    <div class="space-y-4">

    @if($message)
        <div class="mb-4 p-4 rounded-lg @if($messageType === 'success') bg-success-50 dark:bg-success-900/20 text-success-800 dark:text-success-200 @elseif($messageType === 'error') bg-danger-50 dark:bg-danger-900/20 text-danger-800 dark:text-danger-200 @else bg-warning-50 dark:bg-warning-900/20 text-warning-800 dark:text-warning-200 @endif border @if($messageType === 'success') border-success-200 dark:border-success-800 @elseif($messageType === 'error') border-danger-200 dark:border-danger-800 @else border-warning-200 dark:border-warning-800 @endif">
            {{ $message }}
        </div>
    @endif

    @if($errors->any())
        <div class="mb-4 p-4 rounded-lg bg-danger-50 dark:bg-danger-900/20 text-danger-800 dark:text-danger-200 border border-danger-200 dark:border-danger-800">
            <ul class="list-disc list-inside">
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <div class="space-y-6">
        <!-- Watermark Type -->
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Watermark Type</label>
            <select wire:model.live="watermarkType" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400">
                <option value="text">Text Watermark</option>
                <option value="image">Image Watermark</option>
            </select>
            @error('watermarkType') <span class="text-danger-600 dark:text-danger-400 text-sm">{{ $message }}</span> @enderror
        </div>

        <!-- Image Comparison Section - Two Columns -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Selected Images Column -->
            <div>
                @php
                    $selectedImages = $this->getSelectedImagesData();
                @endphp
                @if(!empty($selectedImages))
                    <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Selected Images ({{ count($selectedImages) }})
                        </label>
                        <div id="selectedImagesContainer" class="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                            @foreach($selectedImages as $image)
                                <div class="relative">
                                    <img 
                                        data-media-id="{{ $image['id'] }}"
                                        src="{{ $image['url'] }}" 
                                        alt="{{ $image['name'] }}" 
                                        class="w-full h-auto object-cover rounded-md shadow-md border border-gray-200 dark:border-gray-700"
                                    >
                                    <div class="mt-1 text-xs text-gray-600 dark:text-gray-400 truncate" title="{{ $image['name'] }}">
                                        {{ $image['name'] }}
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        <!-- Hidden image for watermark generation (uses first selected) -->
                        @if(!empty($selectedImages))
                            <img id="originalImage" src="{{ $selectedImages[0]['url'] }}" alt="Selected" style="display: none;">
                        @endif
                    </div>
                @else
                    <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <p class="text-sm text-yellow-800 dark:text-yellow-200">
                            Please select images from the gallery below to generate watermarked previews.
                        </p>
                    </div>
                @endif
            </div>

            <!-- Preview Column -->
            <div id="previewSection" style="display: none;">
                <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Watermarked Previews</label>
                    <div id="previewImagesContainer" class="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                        <!-- Preview images will be inserted here by JavaScript -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Buttons at Bottom -->
        <div class="flex flex-wrap gap-4 mt-6">
            <button 
                type="button" 
                id="generatePreviewBtn"
                class="fi-btn relative grid-flow-col items-center justify-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-sm font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 fi-btn-color-primary fi-color-primary bg-primary-600 text-white hover:bg-primary-500 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus:ring-primary-400"
                @if(empty($selectedMediaIds)) disabled @endif
            >
                Generate Preview
            </button>

            <button 
                type="button" 
                id="uploadWatermarkedBtn"
                class="fi-btn relative grid-flow-col items-center justify-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-sm font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 fi-btn-color-primary fi-color-primary bg-primary-600 text-white hover:bg-primary-500 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus:ring-primary-400"
                style="display: none;"
            >
                <span id="uploadBtnText">Upload Watermarked Image</span>
            </button>

            <button 
                type="button"
                id="downloadPreviewBtn"
                class="fi-btn relative grid-flow-col items-center justify-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-sm font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 fi-btn-color-primary fi-color-primary bg-primary-600 text-white hover:bg-primary-500 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus:ring-primary-400"
                style="display: none;"
            >
                Download Preview
            </button>
        </div>
    </div>

    @if($isProcessing)
        <div class="mt-4 text-center">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 dark:border-primary-400"></div>
            <p class="mt-2 text-gray-600 dark:text-gray-400">Processing image...</p>
        </div>
    @endif
    </div>

    <!-- Image Gallery -->
    <div class="mt-8 pt-6">
        <div class="flex items-center justify-between mb-4">
            <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Select Image from Gallery
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    Click on an image to preview, or use checkboxes for bulk selection.
                </p>
            </div>
            @if(count($selectedMediaIds) > 0)
                <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-600 dark:text-gray-400">
                        {{ count($selectedMediaIds) }} selected
                    </span>
                    <button 
                        wire:click="deselectAll"
                        class="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                        Clear
                    </button>
                </div>
            @else
                <button 
                    wire:click="selectAll"
                    class="px-4 py-2 text-sm bg-primary-500 text-white rounded hover:bg-primary-600"
                >
                    Select All
                </button>
            @endif
        </div>

        @if($this->getImagesProperty()->count() > 0)
            <div class="masonry-gallery">
                @foreach($this->getImagesArray() as $image)
                    <div 
                        class="masonry-item relative group rounded-lg overflow-hidden border-2 transition-all mb-4 break-inside-avoid
                            {{ in_array($image['id'], $selectedMediaIds) ? 'border-blue-500 ring-2 ring-blue-500 dark:ring-blue-400' : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600' }}"
                    >
                        <!-- Bulk Selection Checkbox -->
                        <div 
                            class="absolute top-2 left-2 z-10"
                            wire:click.stop="toggleBulkSelection({{ $image['id'] }})"
                        >
                            <div class="w-6 h-6 rounded bg-white dark:bg-gray-800 shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700
                                {{ in_array($image['id'], $selectedMediaIds) ? 'bg-blue-500' : '' }}">
                                @if(in_array($image['id'], $selectedMediaIds))
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                @else
                                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                @endif
                            </div>
                        </div>

                        <!-- Image - clicking also toggles selection -->
                        <div 
                            class="bg-gray-100 dark:bg-gray-900 cursor-pointer"
                            wire:click="toggleBulkSelection({{ $image['id'] }})"
                        >
                            <img 
                                src="{{ $image['url'] }}" 
                                alt="{{ $image['name'] }}"
                                class="w-full h-auto object-cover"
                                loading="lazy"
                            >
                        </div>

                        <!-- Image Info Overlay -->
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p class="text-white text-xs truncate" title="{{ $image['name'] }}">
                                {{ $image['name'] }}
                            </p>
                            <p class="text-white/80 text-xs">
                                {{ $this->formatBytes($image['size'] ?? 0) }}
                            </p>
                        </div>
                    </div>
                @endforeach
            </div>

            <!-- Pagination -->
            @if($this->getImagesProperty()->hasPages())
                <div class="mt-6">
                    <div class="flex items-center justify-between">
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                            <span>
                                Showing
                                @if ($this->getImagesProperty()->firstItem())
                                    <span class="font-medium">{{ $this->getImagesProperty()->firstItem() }}</span>
                                    to
                                    <span class="font-medium">{{ $this->getImagesProperty()->lastItem() }}</span>
                                @else
                                    {{ $this->getImagesProperty()->count() }}
                                @endif
                                of
                                <span class="font-medium">{{ $this->getImagesProperty()->total() }}</span>
                                results
                            </span>
                        </div>
                        <div class="flex items-center gap-1">
                            @if ($this->getImagesProperty()->onFirstPage())
                                <span class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            @else
                                <button wire:click="previousPage('page')" class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 leading-5 rounded-md hover:text-gray-400 focus:outline-none focus:ring ring-gray-300 focus:ring-opacity-50 focus:border-primary-300 active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:active:bg-gray-700 dark:focus:border-primary-800 dark:focus:ring-primary-800">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            @endif

                            @php
                                $currentPage = $this->getImagesProperty()->currentPage();
                                $lastPage = $this->getImagesProperty()->lastPage();
                                $startPage = max(1, $currentPage - 2);
                                $endPage = min($lastPage, $currentPage + 2);
                            @endphp

                            @if($startPage > 1)
                                <button wire:click="gotoPage(1, 'page')" class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:ring-opacity-50 focus:border-primary-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:active:bg-gray-700 dark:focus:border-primary-800 dark:focus:ring-primary-800">
                                    1
                                </button>
                                @if($startPage > 2)
                                    <span class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">...</span>
                                @endif
                            @endif

                            @foreach (range($startPage, $endPage) as $page)
                                @if ($page == $this->getImagesProperty()->currentPage())
                                    <span aria-current="page">
                                        <span class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-primary-600 border border-primary-600 cursor-default leading-5 dark:bg-primary-500 dark:border-primary-500">{{ $page }}</span>
                                    </span>
                                @else
                                    <button wire:click="gotoPage({{ $page }}, 'page')" class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:ring-opacity-50 focus:border-primary-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:active:bg-gray-700 dark:focus:border-primary-800 dark:focus:ring-primary-800">
                                        {{ $page }}
                                    </button>
                                @endif
                            @endforeach

                            @if($endPage < $lastPage)
                                @if($endPage < $lastPage - 1)
                                    <span class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">...</span>
                                @endif
                                <button wire:click="gotoPage({{ $lastPage }}, 'page')" class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:ring-opacity-50 focus:border-primary-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:active:bg-gray-700 dark:focus:border-primary-800 dark:focus:ring-primary-800">
                                    {{ $lastPage }}
                                </button>
                            @endif

                            @if ($this->getImagesProperty()->hasMorePages())
                                <button wire:click="nextPage('page')" class="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md leading-5 hover:text-gray-400 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:ring-opacity-50 focus:border-primary-300 active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:active:bg-gray-700 dark:focus:border-primary-800 dark:focus:ring-primary-800">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            @else
                                <span class="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default rounded-r-md leading-5 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            @endif
                        </div>
                    </div>
                </div>
            @endif
        @else
            <div class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No images found</h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">There are no images in the system yet.</p>
            </div>
        @endif
    </div>


    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let watermarkedBlob = null;
            let originalImageUrl = null;

            // Watermark generation function (similar to GenericFileUpload.tsx)
            function addWatermarkToImage(imageUrl, watermarkConfig) {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    
                    img.onload = function() {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        if (!ctx) {
                            reject(new Error('Canvas context not available'));
                            return;
                        }
                        
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        
                        const opacity = watermarkConfig.opacity ?? 0.6;
                        const fontSize = watermarkConfig.fontSize ?? Math.max(img.width, img.height) / 10;
                        const color = watermarkConfig.color ?? '#ffffff';
                        const position = watermarkConfig.position ?? 'tile';
                        const text = watermarkConfig.text ?? 'urpuppy.com';
                        const watermarkImageUrl = watermarkConfig.imageUrl;
                        
                        // Function to create the final blob
                        const createBlob = () => {
                            canvas.toBlob((blob) => {
                                if (blob) {
                                    resolve(blob);
                                } else {
                                    reject(new Error('Failed to create watermarked image'));
                                }
                            }, 'image/jpeg', 0.92);
                        };
                        
                        // Handle image watermark
                        if (watermarkConfig.type === 'image' && watermarkImageUrl) {
                            const watermarkImg = new Image();
                            watermarkImg.crossOrigin = 'anonymous';
                            
                            watermarkImg.onload = function() {
                                ctx.save();
                                ctx.globalAlpha = opacity;
                                
                                // Calculate watermark size - use original size calculation
                                const targetCols = 2; // Average of 2-3 watermarks
                                const padding = 0.15; // 15% padding from edges
                                const availableWidth = img.width * (1 - padding * 2);
                                const watermarkWidth = availableWidth / (targetCols + (targetCols - 1) * 1); // Original size calculation
                                const watermarkAspect = watermarkImg.width / watermarkImg.height;
                                const watermarkHeight = watermarkWidth / watermarkAspect;
                                
                                if (position === 'tile') {
                                    // Fixed pattern: max 4 rows, 3 watermarks per row, staggered
                                    const maxRows = 4;
                                    const watermarksPerRow = 3;
                                    
                                    // Calculate spacing to evenly distribute 3 watermarks across image width with more gap
                                    const padding = 0.0; // 10% padding from edges
                                    const availableWidth = img.width * (1 - padding * 2);
                                    // Increase horizontal spacing - use larger divisor for more gap
                                    const spacingX = availableWidth / (watermarksPerRow - 0.5); // More gap between watermarks
                                    const startX = img.width * padding; // Start position
                                    
                                    // Calculate vertical spacing to evenly distribute rows
                                    const availableHeight = img.height * (1 - padding * 2);
                                    const spacingY = availableHeight / (maxRows + 1);
                                    const startY = img.height * padding;
                                    
                                    // Draw watermarks in staggered pattern
                                    for (let row = 0; row < maxRows; row++) {
                                        // Offset every other row (odd rows: row 1, 3, etc. - but 0-indexed so row 1, 3)
                                        const rowOffset = (row % 2 === 1) ? spacingX / 2 : 0;
                                        const y = startY + (row + 1) * spacingY - watermarkHeight / 2;
                                        
                                        for (let col = 0; col < watermarksPerRow; col++) {
                                            const x = startX + col * spacingX + spacingX / 2 + rowOffset - watermarkWidth / 2;
                                            if (x >= 0 && x + watermarkWidth <= img.width && y >= 0 && y + watermarkHeight <= img.height) {
                                                ctx.drawImage(watermarkImg, x, y, watermarkWidth, watermarkHeight);
                                            }
                                        }
                                    }
                                } else {
                                    // Position watermark at specific location
                                    let x = 0;
                                    let y = 0;
                                    
                                    if (position === 'center') {
                                        x = (img.width - watermarkWidth) / 2;
                                        y = (img.height - watermarkHeight) / 2;
                                    } else {
                                        if (position.includes('top')) y = 20;
                                        if (position.includes('bottom')) y = img.height - watermarkHeight - 20;
                                        if (position.includes('left')) x = 20;
                                        if (position.includes('right')) x = img.width - watermarkWidth - 20;
                                    }
                                    
                                    ctx.drawImage(watermarkImg, x, y, watermarkWidth, watermarkHeight);
                                }
                                
                                ctx.restore();
                                createBlob();
                            };
                            
                            watermarkImg.onerror = () => {
                                // If watermark image fails to load, continue without watermark
                                console.warn('Watermark image failed to load: ' + watermarkImageUrl);
                                createBlob();
                            };
                            
                            // Use full URL if watermarkImageUrl is relative
                            const fullWatermarkUrl = watermarkImageUrl.startsWith('http') ? watermarkImageUrl : window.location.origin + watermarkImageUrl;
                            watermarkImg.src = fullWatermarkUrl;
                            return; // Exit early, blob creation happens in watermarkImg.onload
                        }
                        
                        // Handle text watermark (existing code)
                        if (watermarkConfig.type === 'text' && text) {
                            ctx.save();
                            ctx.globalAlpha = opacity;
                            ctx.fillStyle = color;
                            ctx.font = `bold ${fontSize}px Arial`;
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            
                            const textWidth = ctx.measureText(text).width;
                            
                            if (position === 'tile') {
                                // Fixed pattern: max 4 rows, 3 watermarks per row, staggered
                                const maxRows = 4;
                                const watermarksPerRow = 3;
                                
                                // Calculate spacing to evenly distribute 3 watermarks across image width with more gap
                                const padding = 0.1; // 10% padding from edges
                                const availableWidth = img.width * (1 - padding * 2);
                                // Increase horizontal spacing - use larger divisor for more gap
                                const spacingX = availableWidth / (watermarksPerRow - 0.5); // More gap between watermarks
                                const startX = img.width * padding; // Start position
                                
                                // Calculate vertical spacing to evenly distribute rows
                                const availableHeight = img.height * (1 - padding * 2);
                                const spacingY = availableHeight / (maxRows + 1);
                                const startY = img.height * padding;
                                
                                // Draw watermarks in staggered pattern
                                for (let row = 0; row < maxRows; row++) {
                                    // Offset every other row (odd rows: row 1, 3, etc. - but 0-indexed so row 1, 3)
                                    const rowOffset = (row % 2 === 1) ? spacingX / 2 : 0;
                                    const y = startY + (row + 1) * spacingY;
                                    
                                    for (let col = 0; col < watermarksPerRow; col++) {
                                        const x = startX + col * spacingX + spacingX / 2 + rowOffset;
                                        if (x >= 0 && x <= img.width && y >= 0 && y <= img.height) {
                                            ctx.fillText(text, x, y);
                                        }
                                    }
                                }
                            } else {
                                let x = img.width / 2;
                                let y = img.height / 2;
                                
                                if (position.includes('top')) y = fontSize * 1.5;
                                if (position.includes('bottom')) y = img.height - fontSize * 1.5;
                                if (position.includes('left')) x = textWidth / 2 + 20;
                                if (position.includes('right')) x = img.width - textWidth / 2 - 20;
                                
                                ctx.fillText(text, x, y);
                            }
                            ctx.restore();
                        }
                        
                        // Create blob (for text watermark or no watermark)
                        createBlob();
                    };
                    
                    img.onerror = () => reject(new Error('Failed to load image'));
                    img.src = imageUrl;
                });
            }
            
            // Generate preview button
            const generateBtn = document.getElementById('generatePreviewBtn');
            const previewSection = document.getElementById('previewSection');
            const previewCanvas = document.getElementById('previewCanvas');
            const previewImage = document.getElementById('previewImage');
            const downloadBtn = document.getElementById('downloadPreviewBtn');
            const uploadBtn = document.getElementById('uploadWatermarkedBtn');
            const fileInput = document.getElementById('watermarkedFileInput');
            
            if (generateBtn) {
                generateBtn.addEventListener('click', async function() {
                    // Get all selected images from the selected images box
                    const selectedImageElements = document.querySelectorAll('#selectedImagesContainer img[data-media-id]');
                    if (selectedImageElements.length === 0) {
                        alert('Please select images from the gallery first.');
                        return;
                    }
                    
                    generateBtn.disabled = true;
                    generateBtn.textContent = 'Generating...';
                    
                    try {
                        // Get watermark config from Livewire
                        const watermarkConfig = {
                            type: @js($watermarkType),
                            text: @js($watermarkText),
                            imageUrl: @js($watermarkImageUrl),
                            opacity: @js($opacity),
                            position: @js($position),
                            color: @js($color),
                        };
                        
                        // Get preview container
                        const previewContainer = document.getElementById('previewImagesContainer');
                        previewContainer.innerHTML = ''; // Clear previous previews
                        
                        // Generate watermarked images for all selected images
                        const watermarkedBlobs = [];
                        for (let i = 0; i < selectedImageElements.length; i++) {
                            const imgElement = selectedImageElements[i];
                            const imageUrl = imgElement.src;
                            const mediaId = imgElement.getAttribute('data-media-id');
                            
                            if (!mediaId) {
                                console.warn('Media ID not found for image:', imageUrl);
                                continue;
                            }
                            
                            try {
                                // Generate watermarked image
                                const blob = await addWatermarkToImage(imageUrl, watermarkConfig);
                                // Store mediaId as string to match PHP array keys
                                watermarkedBlobs.push({ blob, mediaId: String(mediaId), originalUrl: imageUrl });
                                
                                // Create preview image element
                                const url = URL.createObjectURL(blob);
                                const previewDiv = document.createElement('div');
                                previewDiv.className = 'relative';
                                const previewImg = document.createElement('img');
                                previewImg.src = url;
                                previewImg.className = 'w-full h-auto object-cover rounded-md shadow-md border border-gray-200 dark:border-gray-700';
                                previewImg.alt = 'Watermarked Preview';
                                previewDiv.appendChild(previewImg);
                                previewContainer.appendChild(previewDiv);
                            } catch (error) {
                                console.error('Error generating watermark for image:', error);
                            }
                        }
                        
                        // Store first blob for single upload (backward compatibility)
                        if (watermarkedBlobs.length > 0) {
                            watermarkedBlob = watermarkedBlobs[0].blob;
                            originalImageUrl = watermarkedBlobs[0].originalUrl;
                        }
                        
                        // Store all blobs for bulk operations
                        window.allWatermarkedBlobs = watermarkedBlobs;
                        
                        // Display preview section
                        previewSection.style.display = 'block';
                        uploadBtn.style.display = 'inline-flex';
                        downloadBtn.style.display = 'inline-flex';
                        
                        // Update upload button text based on selection
                        const selectedIds = @js($selectedMediaIds);
                        const hasBulkSelection = selectedIds && selectedIds.length > 0;
                        const uploadBtnText = document.getElementById('uploadBtnText');
                        if (uploadBtnText) {
                            if (hasBulkSelection) {
                                uploadBtnText.textContent = `Apply to ${selectedIds.length} Selected`;
                            } else {
                                uploadBtnText.textContent = 'Upload Watermarked Image';
                            }
                        }
                    } catch (error) {
                        console.error('Error generating watermarks:', error);
                        alert('Failed to generate watermarks: ' + error.message);
                    } finally {
                        generateBtn.disabled = false;
                        generateBtn.textContent = 'Generate Preview';
                    }
                });
            }
            
            // Download preview button
            if (downloadBtn) {
                downloadBtn.addEventListener('click', function() {
                    if (watermarkedBlob) {
                        const url = URL.createObjectURL(watermarkedBlob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'watermarked-image.jpg';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    }
                });
            }
            
            // Upload button - convert blob to base64 and send to Livewire
            if (uploadBtn) {
                uploadBtn.addEventListener('click', async function() {
                    // Check if we have bulk selection
                    const selectedIds = @js($selectedMediaIds);
                    const hasBulkSelection = selectedIds && selectedIds.length > 0;
                    
                    if (hasBulkSelection) {
                        // Bulk upload - use applyWatermarkToSelected
                        if (!watermarkedBlob && (!window.allWatermarkedBlobs || window.allWatermarkedBlobs.length === 0)) {
                            alert('Please generate a preview first.');
                            return;
                        }
                        
                        uploadBtn.disabled = true;
                        const uploadBtnText = document.getElementById('uploadBtnText');
                        const originalText = uploadBtnText ? uploadBtnText.textContent : 'Upload Watermarked Image';
                        if (uploadBtnText) uploadBtnText.textContent = 'Processing...';
                        
                        try {
                            // Convert all watermarked blobs to base64 with their media IDs
                            if (!window.allWatermarkedBlobs || window.allWatermarkedBlobs.length === 0) {
                                alert('No watermarked images available. Please generate a preview first.');
                                uploadBtn.disabled = false;
                                if (uploadBtnText) uploadBtnText.textContent = originalText;
                                return;
                            }
                            
                            // Convert all blobs to base64 and create a map of mediaId => base64Data
                            const watermarkedImages = {};
                            let processedCount = 0;
                            const totalCount = window.allWatermarkedBlobs.length;
                            
                            window.allWatermarkedBlobs.forEach((item) => {
                                const reader = new FileReader();
                                reader.onloadend = function() {
                                    watermarkedImages[item.mediaId] = reader.result;
                                    processedCount++;
                                    
                                    // When all images are processed, send to backend
                                    if (processedCount === totalCount) {
                                        @this.call('applyWatermarkToSelected', watermarkedImages);
                                    }
                                };
                                reader.readAsDataURL(item.blob);
                            });
                        } catch (error) {
                            console.error('Error applying bulk watermark:', error);
                            alert('Failed to apply watermark: ' + error.message);
                            uploadBtn.disabled = false;
                            if (uploadBtnText) uploadBtnText.textContent = originalText;
                        }
                    } else {
                        // No bulk selection, but should still work with selected images
                        // Use bulk method if we have selected images, otherwise single
                        const selectedImageElements = document.querySelectorAll('#selectedImagesContainer img[data-media-id]');
                        if (selectedImageElements.length > 0) {
                            // Use bulk method even for single image
                            if (!watermarkedBlob && (!window.allWatermarkedBlobs || window.allWatermarkedBlobs.length === 0)) {
                                alert('Please generate a preview first.');
                                return;
                            }
                            
                            uploadBtn.disabled = true;
                            const uploadBtnText = document.getElementById('uploadBtnText');
                            const originalText = uploadBtnText ? uploadBtnText.textContent : 'Upload Watermarked Image';
                            if (uploadBtnText) uploadBtnText.textContent = 'Uploading...';
                            
                            try {
                                // Convert all watermarked blobs to base64 with their media IDs
                                if (!window.allWatermarkedBlobs || window.allWatermarkedBlobs.length === 0) {
                                    alert('No watermarked images available. Please generate a preview first.');
                                    uploadBtn.disabled = false;
                                    if (uploadBtnText) uploadBtnText.textContent = originalText;
                                    return;
                                }
                                
                                // Convert all blobs to base64 and create a map of mediaId => base64Data
                                const watermarkedImages = {};
                                let processedCount = 0;
                                const totalCount = window.allWatermarkedBlobs.length;
                                
                                window.allWatermarkedBlobs.forEach((item) => {
                                    const reader = new FileReader();
                                    reader.onloadend = function() {
                                        watermarkedImages[item.mediaId] = reader.result;
                                        processedCount++;
                                        
                                        // When all images are processed, send to backend
                                        if (processedCount === totalCount) {
                                            @this.call('applyWatermarkToSelected', watermarkedImages);
                                        }
                                    };
                                    reader.readAsDataURL(item.blob);
                                });
                            } catch (error) {
                                console.error('Error uploading watermark:', error);
                                alert('Failed to upload: ' + error.message);
                                uploadBtn.disabled = false;
                                if (uploadBtnText) uploadBtnText.textContent = originalText;
                            }
                        } else {
                            // Fallback to single upload if no selection
                            if (!watermarkedBlob) {
                                alert('Please generate a preview first.');
                                return;
                            }
                            
                            uploadBtn.disabled = true;
                            const uploadBtnText = document.getElementById('uploadBtnText');
                            const originalText = uploadBtnText ? uploadBtnText.textContent : 'Upload Watermarked Image';
                            if (uploadBtnText) uploadBtnText.textContent = 'Uploading...';
                            
                            try {
                                const reader = new FileReader();
                                reader.onloadend = function() {
                                    const base64Data = reader.result;
                                    const filename = 'watermarked-' + Date.now() + '.jpg';
                                    @this.call('uploadWatermarkedFile', base64Data, filename);
                                };
                                reader.readAsDataURL(watermarkedBlob);
                            } catch (error) {
                                console.error('Error uploading watermark:', error);
                                alert('Failed to upload: ' + error.message);
                                uploadBtn.disabled = false;
                                if (uploadBtnText) uploadBtnText.textContent = originalText;
                            }
                        }
                    }
                });
            }
            
            
            // Listen for Livewire updates to reset state and update button text
            document.addEventListener('livewire:init', () => {
                Livewire.on('watermark-uploaded', () => {
                    watermarkedBlob = null;
                    window.allWatermarkedBlobs = null;
                    previewSection.style.display = 'none';
                    uploadBtn.style.display = 'none';
                    downloadBtn.style.display = 'none';
                    uploadBtn.disabled = false;
                    const uploadBtnText = document.getElementById('uploadBtnText');
                    if (uploadBtnText) {
                        uploadBtnText.textContent = 'Upload Watermarked Image';
                    }
                });
                
                // Update button text when selection changes
                Livewire.hook('morph.updated', ({ el, component }) => {
                    const selectedIds = @js($selectedMediaIds);
                    const hasBulkSelection = selectedIds && selectedIds.length > 0;
                    const uploadBtnText = document.getElementById('uploadBtnText');
                    if (uploadBtnText && uploadBtn.style.display !== 'none') {
                        if (hasBulkSelection) {
                            uploadBtnText.textContent = `Apply to ${selectedIds.length} Selected`;
                        } else {
                            uploadBtnText.textContent = 'Upload Watermarked Image';
                        }
                    }
                });
            });
        });
    </script>

    @push('styles')
        <style>
            .masonry-gallery {
                column-count: 2;
                column-gap: 1rem;
            }
            
            @media (min-width: 640px) {
                .masonry-gallery {
                    column-count: 3;
                }
            }
            
            @media (min-width: 768px) {
                .masonry-gallery {
                    column-count: 4;
                }
            }
            
            @media (min-width: 1024px) {
                .masonry-gallery {
                    column-count: 5;
                }
            }
            
            @media (min-width: 1280px) {
                .masonry-gallery {
                    column-count: 6;
                }
            }
            
            .masonry-item {
                display: inline-block;
                width: 100%;
                break-inside: avoid;
                page-break-inside: avoid;
                -webkit-column-break-inside: avoid;
            }
        </style>
    @endpush
</div>

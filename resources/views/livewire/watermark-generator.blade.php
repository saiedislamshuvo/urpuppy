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
            <!-- Selected Image Column -->
            <div>
                @if($selectedMediaId && $originalImageUrl)
                    <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Original Image</label>
                        <div class="relative">
                            <img id="originalImage" src="{{ $originalImageUrl }}" alt="Selected" class="max-w-full h-auto rounded-md shadow-lg">
                            <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Media ID: {{ $selectedMediaId }}
                            </div>
                        </div>
                    </div>
                @else
                    <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <p class="text-sm text-yellow-800 dark:text-yellow-200">
                            Please select an image from the gallery below to generate a watermarked preview.
                        </p>
                    </div>
                @endif
            </div>

            <!-- Preview Column -->
            <div id="previewSection" style="display: none;">
                <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Watermarked Preview</label>
                    <div class="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                        <canvas id="previewCanvas" class="max-w-full h-auto rounded-md shadow-lg" style="display: none;"></canvas>
                        <img id="previewImage" class="max-w-full h-auto rounded-md shadow-lg" style="display: none;" alt="Watermarked Preview">
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
                @if(!$selectedMediaId) disabled @endif
            >
                Generate Preview
            </button>

            <button 
                type="button" 
                id="uploadWatermarkedBtn"
                class="fi-btn relative grid-flow-col items-center justify-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-sm font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 fi-btn-color-primary fi-color-primary bg-primary-600 text-white hover:bg-primary-500 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus:ring-primary-400"
                style="display: none;"
            >
                Upload Watermarked Image
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
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Select Image from Gallery
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Click on an image below to select it for watermark generation.
        </p>

        @if($this->getImagesProperty()->count() > 0)
            <div class="masonry-gallery">
                @foreach($this->getImagesArray() as $image)
                    <div 
                        wire:click="selectMedia({{ $image['id'] }})"
                        class="masonry-item relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all mb-4 break-inside-avoid
                            {{ $selectedMediaId == $image['id'] ? 'border-primary-500 ring-2 ring-primary-500 dark:ring-primary-400' : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600' }}"
                    >
                        <!-- Checkbox Overlay -->
                        <div class="absolute top-2 left-2 z-10">
                            <div class="w-6 h-6 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center
                                {{ $selectedMediaId == $image['id'] ? 'bg-primary-500' : '' }}">
                                @if($selectedMediaId == $image['id'])
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                @endif
                            </div>
                        </div>

                        <!-- Image -->
                        <div class="bg-gray-100 dark:bg-gray-900">
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
                        
                        const opacity = watermarkConfig.opacity ?? 0.3;
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
                                
                                // Calculate watermark size - fewer watermarks with more spacing
                                // Target: 2-3 watermarks horizontally with generous spacing
                                const targetCols = 2; // Average of 2-3 watermarks
                                const padding = 0.15; // 15% padding from edges
                                const availableWidth = img.width * (1 - padding * 2);
                                const watermarkWidth = availableWidth / (targetCols + (targetCols - 1) * 1); // More spacing between watermarks
                                const watermarkAspect = watermarkImg.width / watermarkImg.height;
                                const watermarkHeight = watermarkWidth / watermarkAspect;
                                
                                if (position === 'tile') {
                                    // Tile with much more spacing - fewer watermarks overall
                                    const spacingX = watermarkWidth * 2.5; // 2x spacing between watermarks horizontally (doubled)
                                    const spacingY = watermarkHeight * 5; // 4x spacing between rows (more vertical space)
                                    
                                    // Calculate how many rows would fit with normal spacing
                                    const originalRows = Math.ceil(img.height / (watermarkHeight * 1.2));
                                    // Remove 2 rows and distribute the remaining space
                                    const targetRows = Math.max(1, originalRows - 2);
                                    const adjustedSpacingY = img.height / (targetRows + 1); // Distribute space evenly
                                    
                                    // Calculate columns with more spacing
                                    const cols = Math.max(2, Math.ceil(img.width / spacingX)); // At least 2 columns
                                    
                                    for (let row = 0; row < targetRows; row++) {
                                        const rowOffset = (row % 2 === 1) ? spacingX / 2 : 0;
                                        const y = (row + 1) * adjustedSpacingY - watermarkHeight / 2; // Center vertically in the space
                                        for (let col = 0; col < cols; col++) {
                                            const x = col * spacingX + rowOffset;
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
                                // Calculate spacing based on text dimensions to prevent overlapping
                                // Measure text height (approximate)
                                const textMetrics = ctx.measureText(text);
                                const textHeight = fontSize * 1.2; // Approximate text height
                                
                                // Use the larger of width or height, with padding
                                const spacingX = Math.max(textWidth * 1.8, fontSize * 3);
                                const spacingY = Math.max(textHeight * 2, fontSize * 3);
                                
                                const rows = Math.ceil(img.height / spacingY);
                                const cols = Math.ceil(img.width / spacingX);
                                
                                for (let row = 0; row < rows; row++) {
                                    // Offset every other row to the left for better coverage
                                    const rowOffset = (row % 2 === 1) ? spacingX / 2 : 0;
                                    
                                    for (let col = 0; col < cols; col++) {
                                        const x = col * spacingX + spacingX / 2 + rowOffset;
                                        const y = row * spacingY + spacingY / 2;
                                        
                                        // Only draw if within image bounds
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
                    const originalImg = document.getElementById('originalImage');
                    if (!originalImg || !originalImg.src) {
                        alert('Please select an image from the gallery first.');
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
                        
                        // Generate watermarked image
                        const blob = await addWatermarkToImage(originalImg.src, watermarkConfig);
                        watermarkedBlob = blob;
                        originalImageUrl = originalImg.src;
                        
                        // Display preview
                        const url = URL.createObjectURL(blob);
                        previewImage.src = url;
                        previewImage.style.display = 'block';
                        previewCanvas.style.display = 'none';
                        previewSection.style.display = 'block';
                        uploadBtn.style.display = 'inline-flex';
                        downloadBtn.style.display = 'inline-flex';
                    } catch (error) {
                        console.error('Error generating watermark:', error);
                        alert('Failed to generate watermark: ' + error.message);
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
                    if (!watermarkedBlob) {
                        alert('Please generate a preview first.');
                        return;
                    }
                    
                    uploadBtn.disabled = true;
                    uploadBtn.textContent = 'Uploading...';
                    
                    try {
                        // Convert blob to base64
                        const reader = new FileReader();
                        reader.onloadend = function() {
                            const base64Data = reader.result;
                            const filename = 'watermarked-' + Date.now() + '.jpg';
                            
                            // Call Livewire method with parameters
                            @this.call('uploadWatermarkedFile', base64Data, filename);
                        };
                        reader.readAsDataURL(watermarkedBlob);
                    } catch (error) {
                        console.error('Error uploading watermark:', error);
                        alert('Failed to upload: ' + error.message);
                        uploadBtn.disabled = false;
                        uploadBtn.textContent = 'Upload Watermarked Image';
                    }
                });
            }
            
            // Listen for Livewire updates to reset state
            document.addEventListener('livewire:init', () => {
                Livewire.on('watermark-uploaded', () => {
                    watermarkedBlob = null;
                    previewSection.style.display = 'none';
                    uploadBtn.style.display = 'none';
                    downloadBtn.style.display = 'none';
                    uploadBtn.disabled = false;
                    uploadBtn.textContent = 'Upload Watermarked Image';
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

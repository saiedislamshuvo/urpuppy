import React, { useRef, useCallback, useState, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from './ui/Button';

export type FileType = 'images' | 'videos' | 'documents' | 'all' | string[];

export interface WatermarkConfig {
    text?: string;
    imageUrl?: string;
    opacity?: number;
    fontSize?: number;
    color?: string;
    position?: 'tile' | 'center' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

interface GenericFileUploadProps {
    required?: boolean;
    name: string;
    setData: (key: string, value: (File | string)[]) => void;
    errors?: any;
    defaultFiles?: string[];
    defaultUrls?: string[];
    fileType?: FileType;
    accept?: string; // MIME types like "image/*,video/*" or specific like ".jpg,.png,.mp4"
    maxSize?: number; // in bytes, default 50MB
    watermark?: WatermarkConfig;
    multiple?: boolean;
    label?: string;
    description?: string;
    innerText?: string;
    borderColor?: string;
    hoverBorderColor?: string;
    backgroundColor?: string;
}

// Helper function to get accepted file types
const getAcceptedFileTypes = (fileType: FileType): string[] => {
    if (Array.isArray(fileType)) {
        return fileType;
    }

    const typeMap: Record<string, string[]> = {
        images: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
        videos: ['video/mp4', 'video/mov', 'video/quicktime', 'video/avi', 'video/webm'],
        documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        all: [],
    };

    return typeMap[fileType] || [];
};

// Helper function to get file extensions from MIME type
const getExtensionsFromMimeType = (mimeType: string): string[] => {
    const extensionMap: Record<string, string[]> = {
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/jpg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/gif': ['.gif'],
        'image/webp': ['.webp'],
        'video/mp4': ['.mp4'],
        'video/quicktime': ['.mov'],
        'video/mov': ['.mov'],
        'video/avi': ['.avi'],
        'video/webm': ['.webm'],
        'application/pdf': ['.pdf'],
        'application/msword': ['.doc'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    };
    return extensionMap[mimeType] || [];
};

// Helper function to get accept string for dropzone
// react-dropzone expects: { 'image/*': ['.jpg', '.png'], 'application/pdf': ['.pdf'] }
const getAcceptString = (fileType: FileType, customAccept?: string): Record<string, string[]> | undefined => {
    if (customAccept) {
        // Parse custom accept string like ".jpg,.png,.mp4" or "image/*,video/*"
        const types: Record<string, string[]> = {};
        customAccept.split(',').forEach(type => {
            type = type.trim();
            if (type.startsWith('.')) {
                // Extension like .jpg
                const ext = type;
                const mimeType = getMimeTypeFromExtension(ext.substring(1));
                if (mimeType) {
                    // Group by MIME category with wildcard
                    const category = mimeType.split('/')[0];
                    const mimeKey = `${category}/*`;
                    if (!types[mimeKey]) types[mimeKey] = [];
                    if (!types[mimeKey].includes(ext)) {
                        types[mimeKey].push(ext);
                    }
                }
            } else if (type.includes('/*')) {
                // MIME type like image/* - this is already in the correct format
                // We need to provide extensions for it
                const category = type.split('/')[0];
                if (category === 'image') {
                    types[type] = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
                } else if (category === 'video') {
                    types[type] = ['.mp4', '.mov', '.avi', '.webm'];
                } else if (category === 'application') {
                    types[type] = ['.pdf', '.doc', '.docx'];
                }
            } else if (type.includes('/')) {
                // Full MIME type like image/jpeg
                const exts = getExtensionsFromMimeType(type);
                if (exts.length > 0) {
                    if (!types[type]) types[type] = [];
                    exts.forEach(ext => {
                        if (!types[type].includes(ext)) {
                            types[type].push(ext);
                        }
                    });
                }
            }
        });
        return Object.keys(types).length > 0 ? types : undefined;
    }

    const acceptedTypes = getAcceptedFileTypes(fileType);
    if (acceptedTypes.length === 0) return undefined;

    // Group by MIME category (image/*, video/*, etc.) with extensions
    const grouped: Record<string, string[]> = {};
    acceptedTypes.forEach(mimeType => {
        const category = mimeType.split('/')[0];
        const mimeKey = `${category}/*`;
        const exts = getExtensionsFromMimeType(mimeType);

        if (exts.length > 0) {
            if (!grouped[mimeKey]) grouped[mimeKey] = [];
            exts.forEach(ext => {
                if (!grouped[mimeKey].includes(ext)) {
                    grouped[mimeKey].push(ext);
                }
            });
        }
    });

    return grouped;
};

const getMimeTypeFromExtension = (ext: string): string | null => {
    const mimeTypes: Record<string, string> = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
        mp4: 'video/mp4',
        mov: 'video/quicktime',
        avi: 'video/avi',
        webm: 'video/webm',
        pdf: 'application/pdf',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    return mimeTypes[ext.toLowerCase()] || null;
};

// Watermark function for images
const addWatermarkToImage = async (
    file: File,
    watermark: WatermarkConfig
): Promise<File> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
        }

        img.onload = async () => {
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw original image
            ctx.drawImage(img, 0, 0);

            const opacity = watermark.opacity ?? 0.3;
            const fontSize = watermark.fontSize ?? Math.max(img.width, img.height) / 20;
            const color = watermark.color ?? '#ffffff';
            const position = watermark.position ?? 'tile';

            // Apply watermark
            if (watermark.text) {
                ctx.save();
                ctx.globalAlpha = opacity;
                ctx.fillStyle = color;
                ctx.font = `bold ${fontSize}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Calculate text width for both tile and single position modes
                const textWidth = ctx.measureText(watermark.text).width;

                if (position === 'tile') {
                    // Tile watermark across the image
                    const spacing = textWidth * 1.5;
                    const rows = Math.ceil(img.height / spacing);
                    const cols = Math.ceil(img.width / spacing);

                    for (let row = 0; row < rows; row++) {
                        for (let col = 0; col < cols; col++) {
                            const x = (col * spacing) + (spacing / 2);
                            const y = (row * spacing) + (spacing / 2);
                            ctx.fillText(watermark.text, x, y);
                        }
                    }
                } else {
                    // Single watermark at specified position
                    let x = img.width / 2;
                    let y = img.height / 2;

                    if (position.includes('top')) y = fontSize * 1.5;
                    if (position.includes('bottom')) y = img.height - fontSize * 1.5;
                    if (position.includes('left')) x = textWidth / 2 + 20;
                    if (position.includes('right')) x = img.width - textWidth / 2 - 20;

                    ctx.fillText(watermark.text, x, y);
                }
                ctx.restore();
            } else if (watermark.imageUrl) {
                // Image watermark
                const watermarkImg = new Image();
                watermarkImg.crossOrigin = 'anonymous';
                watermarkImg.onload = () => {
                    ctx.save();
                    ctx.globalAlpha = opacity;

                    const watermarkSize = Math.min(img.width, img.height) * 0.2;
                    const watermarkAspect = watermarkImg.width / watermarkImg.height;
                    const wmWidth = watermarkSize;
                    const wmHeight = watermarkSize / watermarkAspect;

                    if (position === 'tile') {
                        // Tile watermark image across the image
                        const spacing = watermarkSize * 1.5;
                        const rows = Math.ceil(img.height / spacing);
                        const cols = Math.ceil(img.width / spacing);

                        for (let row = 0; row < rows; row++) {
                            for (let col = 0; col < cols; col++) {
                                const x = col * spacing;
                                const y = row * spacing;
                                ctx.drawImage(watermarkImg, x, y, wmWidth, wmHeight);
                            }
                        }
                    } else {
                        // Single watermark at specified position
                        let x = (img.width - wmWidth) / 2;
                        let y = (img.height - wmHeight) / 2;

                        if (position.includes('top')) y = 20;
                        if (position.includes('bottom')) y = img.height - wmHeight - 20;
                        if (position.includes('left')) x = 20;
                        if (position.includes('right')) x = img.width - wmWidth - 20;

                        ctx.drawImage(watermarkImg, x, y, wmWidth, wmHeight);
                    }

                    ctx.restore();

                    // Convert canvas to blob and then to File
                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                const watermarkedFile = new File([blob], file.name, {
                                    type: file.type,
                                    lastModified: Date.now(),
                                });
                                resolve(watermarkedFile);
                            } else {
                                reject(new Error('Failed to create watermarked image'));
                            }
                        },
                        file.type,
                        0.92
                    );
                };
                watermarkImg.onerror = () => reject(new Error('Failed to load watermark image'));
                watermarkImg.src = watermark.imageUrl;
                return;
            } else {
                // No watermark, return original
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const watermarkedFile = new File([blob], file.name, {
                                type: file.type,
                                lastModified: Date.now(),
                            });
                            resolve(watermarkedFile);
                        } else {
                            reject(new Error('Failed to create image'));
                        }
                    },
                    file.type,
                    0.92
                );
                return;
            }

            // Convert canvas to blob and then to File (for text watermark)
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const watermarkedFile = new File([blob], file.name, {
                            type: file.type,
                            lastModified: Date.now(),
                        });
                        resolve(watermarkedFile);
                    } else {
                        reject(new Error('Failed to create watermarked image'));
                    }
                },
                file.type,
                0.92
            );
        };

        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
};

function GenericFileUpload({
    required = false,
    name,
    setData,
    errors,
    defaultFiles = [],
    defaultUrls = [],
    fileType = 'all',
    accept,
    maxSize = 50 * 1024 * 1024, // 50MB default
    watermark,
    multiple = true,
    label,
    description,
    innerText,
    borderColor = '#FF8C00',
    hoverBorderColor = '#00a65a',
    backgroundColor = '#f0f9ff',
}: GenericFileUploadProps) {
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [urlItems, setUrlItems] = useState<Array<{ url: string; id: string }>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [initializedUrls, setInitializedUrls] = useState<string[]>([]);
    const [previews, setPreviews] = useState<Record<string, string>>({});

    // Function to check if a file is within the size limit
    const isFileSizeValid = (file: File): boolean => {
        return file.size <= maxSize;
    };

    // Function to check if file type is accepted
    const isFileTypeAccepted = (file: File): boolean => {
        if (fileType === 'all' && !accept) return true;

        const acceptedTypes = getAcceptedFileTypes(fileType);
        if (acceptedTypes.length === 0 && !accept) return true;

        if (accept) {
            // Parse custom accept string
            const acceptList = accept.split(',').map(t => t.trim());
            const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
            const fileMime = file.type;

            return acceptList.some(accepted => {
                if (accepted.startsWith('.')) {
                    return accepted.substring(1).toLowerCase() === fileExt;
                } else if (accepted.includes('/*')) {
                    const category = accepted.split('/')[0];
                    return fileMime.startsWith(category + '/');
                } else {
                    return fileMime === accepted;
                }
            });
        }

        return acceptedTypes.includes(file.type);
    };

    // Function to convert a URL to a File object
    const urlToFile = async (url: string): Promise<File> => {
        if (typeof url !== 'string' || url.trim() === '') {
            throw new Error('Invalid URL: URL must be a non-empty string.');
        }

        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const filename = url.split('/').pop() || 'file';
            const fileExtension = filename.split('.').pop() || blob.type.split('/')[1] || 'jpg';
            return new File([blob], filename, { type: blob.type });
        } catch (error) {
            console.error(`Error converting URL to File:`, error);
            throw error;
        }
    };

    // Create preview URL for file
    const createPreview = (file: File): string => {
        if (file.type.startsWith('image/')) {
            return URL.createObjectURL(file);
        } else if (file.type.startsWith('video/')) {
            return URL.createObjectURL(file);
        }
        return '';
    };

    // Ensure previews are created for all files that need them
    useEffect(() => {
        setPreviews(prev => {
            const missingPreviews: Record<string, string> = {};
            files.forEach(file => {
                if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                    const previewKey = (file as any).__previewKey || `${file.name}-${file.size}-${file.lastModified}`;
                    if (!prev[previewKey]) {
                        const preview = createPreview(file);
                        if (preview) {
                            missingPreviews[previewKey] = preview;
                            (file as any).__previewKey = previewKey;
                        }
                    }
                }
            });
            // Only update if there are actually new previews
            if (Object.keys(missingPreviews).length > 0) {
                return { ...prev, ...missingPreviews };
            }
            return prev;
        });
    }, [files]);

    // Clean up blob URLs when files are removed or component unmounts
    useEffect(() => {
        return () => {
            // Cleanup all preview URLs on unmount
            Object.values(previews).forEach(url => {
                if (url && url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [previews]);

    // Initialize URLs - display them directly without converting to Files
    useEffect(() => {
        const validDefaultUrls = defaultUrls.filter(url => typeof url === 'string' && url.trim() !== '');
        const newUrls = validDefaultUrls.filter(url => !initializedUrls.includes(url));
        if (newUrls.length === 0) return;

        // Store URLs directly for display
        const urlItemsToAdd = newUrls.map(url => ({
            url,
            id: `url-${url}-${Date.now()}-${Math.random()}`
        }));

        setUrlItems(prev => [...prev, ...urlItemsToAdd]);
        setInitializedUrls(prev => [...prev, ...newUrls]);
    }, [defaultUrls.join(',')]);

    // Sync form data whenever files or urlItems change
    // Only sync if we have defaultUrls or urlItems (for backward compatibility)
    // When defaultUrls is empty and urlItems is empty, the parent component handles the data directly
    useEffect(() => {
        if (defaultUrls.length > 0 || urlItems.length > 0) {
            const remainingUrls = urlItems.map(item => item.url);
            setData(name, [...files, ...remainingUrls]);
        } else if (files.length > 0) {
            // If no defaultUrls and no urlItems, only sync files (parent will handle merging)
            // This allows the parent to track new files without interfering with existing media
            setData(name, files);
        }
        // Note: We don't sync when files.length is 0 and defaultUrls/urlItems are empty
        // to prevent clearing form data when the component resets
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files, urlItems, name]);

    const onDrop = useCallback(
        async (incomingFiles: File[]) => {
            // Filter valid files
            const validFiles = incomingFiles.filter(file => {
                if (!isFileSizeValid(file)) {
                    return false;
                }
                if (!isFileTypeAccepted(file)) {
                    return false;
                }
                return true;
            });

            // Notify the user if any files were rejected
            if (validFiles.length !== incomingFiles.length) {
                alert('Some files were rejected due to size limit or invalid file type.');
            }

            if (validFiles.length === 0) return;

            setIsProcessing(true);

            try {
                // Process images with watermark if needed
                const processedFiles: File[] = [];
                const newPreviews: Record<string, string> = {};

                for (const file of validFiles) {
                    // Create a stable preview key based on file properties
                    const previewKey = `${file.name}-${file.size}-${file.lastModified}`;

                    // Create preview immediately from original file for instant display
                    const preview = createPreview(file);
                    if (!preview) {
                        console.warn('Failed to create preview for file:', file.name);
                    }

                    let processedFile = file;

                    // Apply watermark to images if watermark config is provided
                    if (watermark && file.type.startsWith('image/')) {
                        try {
                            processedFile = await addWatermarkToImage(file, watermark);
                            // Update preview with watermarked version
                            const watermarkedPreview = createPreview(processedFile);
                            if (watermarkedPreview) {
                                // Revoke old preview URL
                                if (preview) {
                                    URL.revokeObjectURL(preview);
                                }
                                newPreviews[previewKey] = watermarkedPreview;
                            } else if (preview) {
                                // Keep original preview if watermark preview fails
                                newPreviews[previewKey] = preview;
                            }
                        } catch (error) {
                            console.error('Error applying watermark:', error);
                            // Continue with original file if watermark fails
                            processedFile = file;
                            if (preview) {
                                newPreviews[previewKey] = preview;
                            }
                        }
                    } else {
                        // No watermark, use original preview
                        if (preview) {
                            newPreviews[previewKey] = preview;
                        }
                    }

                    // Store the preview key with the file for lookup
                    (processedFile as any).__previewKey = previewKey;
                    processedFiles.push(processedFile);
                }

                // Update previews first to ensure they're available when rendering
                setPreviews(prev => ({ ...prev, ...newPreviews }));

                // Use functional updates to avoid dependency on files
                setFiles(prevFiles => {
                    const newFiles = [...prevFiles, ...processedFiles];

                    // Update form data with functional updates
                    setUrlItems(prevUrlItems => {
                        const remainingUrls = prevUrlItems.map(item => item.url);
                        setData(name, [...newFiles, ...remainingUrls]);
                        return prevUrlItems;
                    });

                    if (hiddenInputRef.current) {
                        const dataTransfer = new DataTransfer();
                        newFiles.forEach((v) => {
                            dataTransfer.items.add(v);
                        });
                        hiddenInputRef.current.files = dataTransfer.files;
                    }

                    return newFiles;
                });
            } catch (error) {
                console.error('Error processing files:', error);
            } finally {
                setIsProcessing(false);
            }
        },
        [name, setData, watermark, maxSize, fileType, accept]
    );

    const acceptConfig = getAcceptString(fileType, accept);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        multiple,
        maxSize,
        accept: acceptConfig,
        noClick: false,
        noKeyboard: false,
        onDropRejected: (rejectedFiles) => {
            const reasons = rejectedFiles.map(f => f.errors.map(e => e.message).join(', ')).join('; ');
            alert(`Some files were rejected: ${reasons}`);
        },
    });

    // Get input props and add name attribute, capture ref
    const inputProps = getInputProps();
    const mergedInputProps = {
        ...inputProps,
        name,
        // @ts-ignore - getInputProps may have internal ref handling, but we need to capture it
        ref: (node: HTMLInputElement | null) => {
            // Store ref for form submission
            (hiddenInputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        },
    };

    const handleRemove = useCallback(
        (itemToRemove: File | { url: string; id: string }, e: React.MouseEvent) => {
            e.stopPropagation();

            // Check if it's a File or URL item
            if (itemToRemove instanceof File) {
                // Clean up blob URL for this file
                const previewKey = (itemToRemove as any).__previewKey || `${itemToRemove.name}-${itemToRemove.size}-${itemToRemove.lastModified}`;
                setPreviews(prev => {
                    const url = prev[previewKey];
                    if (url && url.startsWith('blob:')) {
                        URL.revokeObjectURL(url);
                    }
                    const newPreviews = { ...prev };
                    delete newPreviews[previewKey];
                    return newPreviews;
                });

                setFiles(prevFiles => {
                    const newFiles = prevFiles.filter((f) => f !== itemToRemove);

                    // Update form data with remaining files and URLs
                    setUrlItems(prevUrlItems => {
                        const remainingUrls = prevUrlItems.map(item => item.url);
                        setData(name, [...newFiles, ...remainingUrls]);
                        return prevUrlItems;
                    });

                    if (hiddenInputRef.current) {
                        const dataTransfer = new DataTransfer();
                        newFiles.forEach((v) => {
                            dataTransfer.items.add(v);
                        });
                        hiddenInputRef.current.files = dataTransfer.files;
                    }

                    return newFiles;
                });
            } else {
                // Remove URL item
                setUrlItems(prevUrlItems => {
                    const newUrlItems = prevUrlItems.filter((item) => item.id !== itemToRemove.id);
                    // Remove from initialized URLs so it can be re-added if needed
                    setInitializedUrls(prev => prev.filter(url => url !== itemToRemove.url));

                    // Update form data with remaining URLs
                    setFiles(prevFiles => {
                        const remainingUrls = newUrlItems.map(item => item.url);
                        setData(name, [...prevFiles, ...remainingUrls]);
                        return prevFiles;
                    });

                    return newUrlItems;
                });
            }
        },
        [name, setData]
    );

    const handleAddMoreClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        open();
    };

    const getFileIcon = (file: File): string => {
        if (file.type.startsWith('image/')) return '🖼️';
        if (file.type.startsWith('video/')) return '🎥';
        if (file.type === 'application/pdf') return '📄';
        if (file.type.includes('word') || file.type.includes('document')) return '📝';
        return '📎';
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="generic-file-upload">
            {label && (
                <label className="form-label fw-semibold mb-2">
                    {label} {required && <span className="text-danger">*</span>}
                </label>
            )}
            {description && <p className="text-muted small mb-3">{description}</p>}

            <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? 'dz-drag-hover' : ''} ${isProcessing ? 'processing' : ''}`}
                style={{
                    '--border-color': borderColor,
                    '--hover-border-color': hoverBorderColor,
                    '--background-color': backgroundColor,
                } as React.CSSProperties}
            >
                <input {...mergedInputProps} />
                {isLoading || isProcessing ? (
                    <div className="dz-message">
                        <div className="dz-message-text">
                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p>{isLoading ? 'Loading files...' : 'Processing files...'}</p>
                        </div>
                    </div>
                ) : files.length === 0 && urlItems.length === 0 ? (
                    <div className="dz-message">
                        <div className="dz-message-text">
                            <p className="mb-1">{innerText || 'Drop files here or click to upload'}</p>
                            <p className="text-muted small">
                                {acceptConfig && Object.keys(acceptConfig).length > 0
                                    ? `Accepted: ${Object.keys(acceptConfig).map(key => {
                                        const category = key.replace('/*', '');
                                        const extensions = acceptConfig[key]?.join(', ') || '';
                                        return category.charAt(0).toUpperCase() + category.slice(1) + (extensions ? ` (${extensions})` : '');
                                    }).join(', ')}`
                                    : 'All file types accepted'}
                                {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="dz-preview-container mt-0">
                        {/* Render URL items (existing images) */}
                        {urlItems.map((urlItem, index) => {
                            const errorKey = `${name}.${index}`;
                            const fileError = errors?.[errorKey] ?? null;
                            const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(urlItem.url);
                            const isVideo = /\.(mp4|mov|avi|webm)$/i.test(urlItem.url);

                            return (
                                <div key={urlItem.id} className="dz-preview dz-file-preview">
                                    <div className="dz-image">
                                        {isImage ? (
                                            <img src={urlItem.url} alt="Preview" onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('d-none');
                                            }} />
                                        ) : isVideo ? (
                                            <video src={urlItem.url} controls={false} muted>
                                                <source src={urlItem.url} />
                                            </video>
                                        ) : (
                                            <div className="dz-file-representation">📄</div>
                                        )}
                                        {isVideo && (
                                            <div className="dz-video-overlay">
                                                <span className="dz-video-icon">▶</span>
                                            </div>
                                        )}
                                        {isImage && (
                                            <div className="dz-file-representation d-none">🖼️</div>
                                        )}
                                    </div>
                                    <div className="dz-details">
                                        <div className="dz-filename" title={urlItem.url}>
                                            {urlItem.url.split('/').pop() || 'File'}
                                        </div>
                                        <div className="dz-size">Existing file</div>
                                        {fileError && (
                                            <div className="text-danger small mt-1">{fileError}</div>
                                        )}
                                    </div>
                                    <div
                                        className="dz-remove"
                                        onClick={(e) => handleRemove(urlItem, e)}
                                        role="button"
                                        tabIndex={0}
                                        aria-label="Remove file"
                                    >
                                        ✕
                                    </div>
                                </div>
                            );
                        })}
                        {/* Render File items (newly uploaded) */}
                        {files.map((file, index) => {
                            const errorKey = `${name}.${urlItems.length + index}`;
                            const fileError = errors?.[errorKey] ?? null;

                            // Get preview URL from state using preview key
                            const previewKey = (file as any).__previewKey || `${file.name}-${file.size}-${file.lastModified}`;
                            const previewUrl = previews[previewKey] || null;

                            return (
                                <div key={`${file.name}-${file.size}-${file.lastModified}-${index}`} className="dz-preview dz-file-preview">
                                    <div className="dz-image">
                                        {previewUrl ? (
                                            file.type.startsWith('image/') ? (
                                                <img
                                                    src={previewUrl}
                                                    alt={file.name}
                                                    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                        const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                                                        if (fallback) fallback.classList.remove('d-none');
                                                    }}
                                                />
                                            ) : file.type.startsWith('video/') ? (
                                                <video src={previewUrl} controls={false} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                                                    <source src={previewUrl} type={file.type} />
                                                </video>
                                            ) : (
                                                <div className="dz-file-representation">{getFileIcon(file)}</div>
                                            )
                                        ) : (
                                            <div className="dz-file-representation">{getFileIcon(file)}</div>
                                        )}
                                        {/* Fallback icon (hidden by default) */}
                                        <div className="dz-file-representation d-none">{getFileIcon(file)}</div>
                                        {file.type.startsWith('video/') && (
                                            <div className="dz-video-overlay">
                                                <span className="dz-video-icon">▶</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="dz-details">
                                        <div className="dz-filename" title={file.name}>
                                            {file.name}
                                        </div>
                                        <div className="dz-size">{formatFileSize(file.size)}</div>
                                        {fileError && (
                                            <div className="text-danger small mt-1">{fileError}</div>
                                        )}
                                    </div>
                                    <div
                                        className="dz-remove"
                                        onClick={(e) => handleRemove(file, e)}
                                        role="button"
                                        tabIndex={0}
                                        aria-label="Remove file"
                                    >
                                        ✕
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {(files.length > 0 || urlItems.length > 0) && multiple && (
                <button
                    type="button"
                    onClick={handleAddMoreClick}
                    className="btn btn-outline-primary btn-sm mt-3"
                    disabled={isProcessing}
                >
                    Add More Files
                </button>
            )}

            {errors?.[name] && (
                <div className="text-danger small mt-2">{errors[name]}</div>
            )}

            <style>{`
        .generic-file-upload .dropzone {
          border: 2px dashed var(--border-color, #FF8C00);
          border-radius: 8px;
          background: white;
          min-height: 150px;
          padding: 20px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .generic-file-upload .dropzone.dz-drag-hover {
          border-color: var(--hover-border-color, #00a65a);
          background: var(--background-color, #f0f9ff);
        }

        .generic-file-upload .dropzone.processing {
          opacity: 0.7;
          pointer-events: none;
        }

        .generic-file-upload .dz-message {
          text-align: center;
          margin: 2em 0;
        }

        .generic-file-upload .dz-message-text {
          margin-bottom: 1em;
        }

        .generic-file-upload .dz-message-text p {
          margin: 0.5em 0;
        }

        .generic-file-upload .dz-preview-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .generic-file-upload .dz-preview {
          background: white;
          border-radius: 8px;
          border: 1px solid #ddd;
          padding: 8px;
          position: relative;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .generic-file-upload .dz-preview:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .generic-file-upload .dz-image {
          width: 100%;
          height: 120px;
          overflow: hidden;
          border-radius: 6px;
          background: #f6f6f6;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .generic-file-upload .dz-image img,
        .generic-file-upload .dz-image video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .generic-file-upload .dz-video-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.6);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .generic-file-upload .dz-video-icon {
          color: white;
          font-size: 16px;
          margin-left: 2px;
        }

        .generic-file-upload .dz-file-representation {
          font-size: 48px;
          color: #666;
        }

        .generic-file-upload .dz-details {
          font-size: 12px;
          margin-top: 8px;
          padding: 0 4px;
        }

        .generic-file-upload .dz-filename {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 4px;
          font-weight: 500;
          color: #333;
        }

        .generic-file-upload .dz-size {
          color: #666;
          font-size: 11px;
        }

        .generic-file-upload .dz-remove {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 24px;
          height: 24px;
          background: #ff0000;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.2s ease;
          z-index: 10;
        }

        .generic-file-upload .dz-preview:hover .dz-remove {
          opacity: 1;
        }

        .generic-file-upload .dz-remove:hover {
          transform: scale(1.1);
          background: #cc0000;
        }

        .generic-file-upload .spinner-border-sm {
          width: 1rem;
          height: 1rem;
          border-width: 0.15em;
        }
      `}</style>
        </div>
    );
}

export default GenericFileUpload;


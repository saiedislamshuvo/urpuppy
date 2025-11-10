import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

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
    setData: (key: string, value: File[]) => void;
    errors?: any;
    defaultUrls?: string[]; // For displaying existing files
    fileType?: FileType;
    accept?: string;
    maxSize?: number;
    watermark?: WatermarkConfig;
    multiple?: boolean;
    label?: string;
    description?: string;
    innerText?: string;
    borderColor?: string;
    hoverBorderColor?: string;
    backgroundColor?: string;
    resetKey?: number | string; // When this changes, reset the component
}

// Helper to get accept config for dropzone
const getAcceptConfig = (accept?: string): Record<string, string[]> | undefined => {
    if (!accept) return undefined;

    const types: Record<string, string[]> = {};
    accept.split(',').forEach(type => {
        type = type.trim();
        if (type.startsWith('.')) {
            const ext = type;
            const category = ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif' || ext === '.webp'
                ? 'image'
                : ext === '.mp4' || ext === '.mov' || ext === '.avi' || ext === '.webm'
                    ? 'video'
                    : 'application';
            const mimeKey = `${category}/*`;
            if (!types[mimeKey]) types[mimeKey] = [];
            if (!types[mimeKey].includes(ext)) {
                types[mimeKey].push(ext);
            }
        }
    });

    return Object.keys(types).length > 0 ? types : undefined;
};

// Simple watermark function for images
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

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const opacity = watermark.opacity ?? 0.3;
            const fontSize = watermark.fontSize ?? Math.max(img.width, img.height) / 20;
            const color = watermark.color ?? '#ffffff';
            const position = watermark.position ?? 'tile';

            if (watermark.text) {
                ctx.save();
                ctx.globalAlpha = opacity;
                ctx.fillStyle = color;
                ctx.font = `bold ${fontSize}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const textWidth = ctx.measureText(watermark.text).width;

                if (position === 'tile') {
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
                    let x = img.width / 2;
                    let y = img.height / 2;

                    if (position.includes('top')) y = fontSize * 1.5;
                    if (position.includes('bottom')) y = img.height - fontSize * 1.5;
                    if (position.includes('left')) x = textWidth / 2 + 20;
                    if (position.includes('right')) x = img.width - textWidth / 2 - 20;

                    ctx.fillText(watermark.text, x, y);
                }
                ctx.restore();
            }

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
    defaultUrls = [],
    fileType = 'all',
    accept,
    maxSize = 50 * 1024 * 1024,
    watermark,
    multiple = true,
    label,
    description,
    innerText,
    borderColor = '#FF8C00',
    hoverBorderColor = '#00a65a',
    backgroundColor = '#f0f9ff',
    resetKey,
}: GenericFileUploadProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<Record<string, string>>({});
    const [isProcessing, setIsProcessing] = useState(false);

    // Filter and sanitize default URLs
    const existingUrls = defaultUrls.filter((url): url is string => typeof url === 'string' && url.trim() !== '');

    // Reset files when resetKey changes
    useEffect(() => {
        if (resetKey !== undefined) {
            // Cleanup preview URLs before resetting
            setPreviews(prev => {
                Object.values(prev).forEach(url => {
                    if (url && url.startsWith('blob:')) {
                        URL.revokeObjectURL(url);
                    }
                });
                return {};
            });
            setFiles([]);
            setData(name, []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetKey]);

    // Create preview URLs
    useEffect(() => {
        const newPreviews: Record<string, string> = {};
        files.forEach(file => {
            const key = `${file.name}-${file.size}-${file.lastModified}`;
            if (!previews[key] && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
                newPreviews[key] = URL.createObjectURL(file);
            }
        });

        if (Object.keys(newPreviews).length > 0) {
            setPreviews(prev => ({ ...prev, ...newPreviews }));
        }
    }, [files]);

    // Cleanup preview URLs
    useEffect(() => {
        return () => {
            Object.values(previews).forEach(url => {
                if (url && url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, []);

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            if (acceptedFiles.length === 0) return;

            setIsProcessing(true);

            try {
                let processedFiles: File[] = [];

                for (const file of acceptedFiles) {
                    // Check file size
                    if (file.size > maxSize) {
                        alert(`File ${file.name} exceeds maximum size of ${formatFileSize(maxSize)}`);
                        continue;
                    }

                    // Apply watermark if needed
                    if (watermark && file.type.startsWith('image/')) {
                        try {
                            const watermarkedFile = await addWatermarkToImage(file, watermark);
                            processedFiles.push(watermarkedFile);
                        } catch (error) {
                            console.error('Error applying watermark:', error);
                            processedFiles.push(file); // Use original if watermark fails
                        }
                    } else {
                        processedFiles.push(file);
                    }
                }

                if (processedFiles.length > 0) {
                    setFiles(prev => {
                        const updated = multiple ? [...prev, ...processedFiles] : processedFiles;
                        setData(name, updated);
                        return updated;
                    });
                }
            } catch (error) {
                console.error('Error processing files:', error);
                alert('Error processing files. Please try again.');
            } finally {
                setIsProcessing(false);
            }
        },
        [name, setData, watermark, maxSize, multiple]
    );

    const acceptConfig = getAcceptConfig(accept);

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

    const handleRemove = (fileToRemove: File, e: React.MouseEvent) => {
        e.stopPropagation();

        // Cleanup preview URL
        const key = `${fileToRemove.name}-${fileToRemove.size}-${fileToRemove.lastModified}`;
        if (previews[key]) {
            URL.revokeObjectURL(previews[key]);
            setPreviews(prev => {
                const newPreviews = { ...prev };
                delete newPreviews[key];
                return newPreviews;
            });
        }

        setFiles(prev => {
            const updated = prev.filter(f => f !== fileToRemove);
            setData(name, updated);
            return updated;
        });
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const getFileIcon = (file: File): string => {
        if (file.type.startsWith('image/')) return '🖼️';
        if (file.type.startsWith('video/')) return '🎥';
        if (file.type === 'application/pdf') return '📄';
        return '📎';
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
                <input {...getInputProps()} name={name} />
                {isProcessing ? (
                    <div className="dz-message">
                        <div className="dz-message-text">
                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p>Processing files...</p>
                        </div>
                    </div>
                ) : files.length === 0 && existingUrls.length === 0 ? (
                    <div className="dz-message">
                        <div className="dz-message-text">
                            <p className="mb-1">{innerText || 'Drop files here or click to upload'}</p>
                            <p className="text-muted small">
                                {accept && `Accepted: ${accept}`}
                                {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="dz-preview-container mt-0">
                        {/* Render existing URLs */}
                        {existingUrls.map((url, index) => {
                            const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url) || url.includes('preview') || url.includes('image');
                            const isVideo = /\.(mp4|mov|avi|webm)$/i.test(url) || url.includes('video');
                            const isDocument = /\.(pdf|doc|docx)$/i.test(url);

                            return (
                                <div key={`existing-${url}-${index}`} className="dz-preview dz-file-preview">
                                    <div className="dz-image">
                                        {isImage ? (
                                            <img
                                                src={url}
                                                alt={`Existing file ${index + 1}`}
                                                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        ) : isVideo ? (
                                            <video src={url} controls={false} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                                                <source src={url} />
                                            </video>
                                        ) : (
                                            <div className="dz-file-representation">
                                                {isDocument ? '📄' : '📎'}
                                            </div>
                                        )}
                                        {isVideo && (
                                            <div className="dz-video-overlay">
                                                <span className="dz-video-icon">▶</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="dz-details">
                                        <div className="dz-filename" title={url}>
                                            {url.split('/').pop() || 'Existing file'}
                                        </div>
                                        <div className="dz-size">Existing file</div>
                                    </div>
                                </div>
                            );
                        })}
                        {/* Render new files */}
                        {files.map((file, index) => {
                            const key = `${file.name}-${file.size}-${file.lastModified}`;
                            const previewUrl = previews[key];
                            const isImage = file.type.startsWith('image/');
                            const isVideo = file.type.startsWith('video/');

                            return (
                                <div key={`${key}-${index}`} className="dz-preview dz-file-preview">
                                    <div className="dz-image">
                                        {previewUrl ? (
                                            isImage ? (
                                                <img
                                                    src={previewUrl}
                                                    alt={file.name}
                                                    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            ) : isVideo ? (
                                                <video src={previewUrl} controls={false} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                                                    <source src={previewUrl} type={file.type} />
                                                </video>
                                            ) : (
                                                <div className="dz-file-representation">{getFileIcon(file)}</div>
                                            )
                                        ) : (
                                            <div className="dz-file-representation">{getFileIcon(file)}</div>
                                        )}
                                        {isVideo && (
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

            {(files.length > 0 || existingUrls.length > 0) && multiple && files.length > 0 && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        open();
                    }}
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

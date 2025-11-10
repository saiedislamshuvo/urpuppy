import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import GenericFileUpload from './GenericFileUpload';
import InputLabel from './InputLabel';
import InputError from './InputError';
import { router } from '@inertiajs/react';

interface MediaUploadSectionProps {
    label: string;
    description?: string;
    name: string;
    setData: (key: string, value: (File | string)[]) => void;
    errors?: any;
    defaultUrls?: string[];
    fileType: 'images' | 'videos';
    accept: string;
    maxSize?: number;
    watermark?: {
        text?: string;
        imageUrl?: string;
        opacity?: number;
        fontSize?: number;
        color?: string;
        position?: 'tile' | 'center' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    };
    required?: boolean;
    maxFiles?: number; // Subscription limit
    currentCount?: number; // Current number of files
    onDelete?: (url: string) => void; // Callback for delete
    deleteEndpoint?: string; // API endpoint for deleting media
}

const MediaUploadSection: React.FC<MediaUploadSectionProps> = ({
    label,
    description,
    name,
    setData,
    errors,
    defaultUrls = [],
    fileType,
    accept,
    maxSize = 50 * 1024 * 1024,
    watermark,
    required = false,
    maxFiles,
    currentCount = 0,
    onDelete,
    deleteEndpoint,
}) => {
    // Filter out File objects and ensure we only have strings
    const sanitizedDefaultUrls = useMemo(() => {
        return defaultUrls.filter((url): url is string => typeof url === 'string' && url.trim() !== '');
    }, [defaultUrls]);

    const [existingMedia, setExistingMedia] = useState<string[]>(sanitizedDefaultUrls);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [uploadKey, setUploadKey] = useState(0); // Key to reset GenericFileUpload

    // Update existing media only when defaultUrls actually changes
    const defaultUrlsKey = useMemo(() => sanitizedDefaultUrls.join(','), [sanitizedDefaultUrls]);

    useEffect(() => {
        const currentKey = existingMedia.join(',');
        if (defaultUrlsKey !== currentKey) {
            setExistingMedia(sanitizedDefaultUrls);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultUrlsKey]);

    const handleDelete = async (url: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!deleteEndpoint) {
            // If no delete endpoint, just remove from local state
            const updated = existingMedia.filter(u => u !== url);
            setExistingMedia(updated);
            // Update parent - only send new files, not existing URLs
            setData(name, newFiles);
            if (onDelete) {
                onDelete(url);
            }
            return;
        }

        setIsDeleting(url);
        try {
            // Determine the media type based on the name prop
            const mediaType = name === 'gallery' ? 'gallery' : 'videos';

            const response = await fetch(deleteEndpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ url, type: mediaType }),
            });

            if (response.ok) {
                const updated = existingMedia.filter(u => u !== url);
                setExistingMedia(updated);
                // Update parent - only send new files, not existing URLs
                setData(name, newFiles);
                if (onDelete) {
                    onDelete(url);
                }
            } else {
                alert('Failed to delete media. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting media:', error);
            alert('An error occurred while deleting media.');
        } finally {
            setIsDeleting(null);
        }
    };

    const isImage = fileType === 'images';
    const remainingSlots = maxFiles ? maxFiles - currentCount : undefined;

    return (
        <div className="media-upload-section">
            <InputLabel value={label} isRequired={required} />
            {description && <p className="text-muted small mb-3">{description}</p>}

            {maxFiles && (
                <div className="mb-3">
                    <small className="text-muted">
                        {currentCount} / {maxFiles} {isImage ? 'images' : 'videos'} uploaded
                        {remainingSlots !== undefined && remainingSlots > 0 && (
                            <span className="text-success"> ({remainingSlots} remaining)</span>
                        )}
                        {remainingSlots !== undefined && remainingSlots <= 0 && (
                            <span className="text-danger"> (Limit reached)</span>
                        )}
                    </small>
                </div>
            )}

            {/* Display existing media above upload box */}
            {existingMedia.length > 0 && (
                <div className="existing-media-grid mb-4">
                    <div className="row g-3">
                        {existingMedia.map((url, index) => {
                            // Ensure url is a string before checking
                            const urlString = typeof url === 'string' ? url : String(url);
                            const isImageFile = /\.(jpg|jpeg|png|gif|webp)$/i.test(urlString) || urlString.includes('preview');
                            const isVideoFile = /\.(mp4|mov|avi|webm)$/i.test(urlString) || urlString.includes('videos');

                            return (
                                <div key={`${url}-${index}`} className="col-md-3 col-sm-4 col-6">
                                    <div className="existing-media-item position-relative">
                                        <div className="existing-media-preview">
                                            {isImageFile ? (
                                                <img
                                                    src={urlString}
                                                    alt={`Media ${index + 1}`}
                                                    className="img-fluid rounded"
                                                    style={{
                                                        width: '100%',
                                                        height: '150px',
                                                        objectFit: 'cover',
                                                    }}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                            ) : isVideoFile ? (
                                                <video
                                                    src={urlString}
                                                    className="img-fluid rounded"
                                                    style={{
                                                        width: '100%',
                                                        height: '150px',
                                                        objectFit: 'cover',
                                                    }}
                                                    controls={false}
                                                    muted
                                                >
                                                    <source src={urlString} />
                                                </video>
                                            ) : (
                                                <div className="d-flex align-items-center justify-content-center bg-light rounded" style={{ height: '150px' }}>
                                                    <span className="fs-1">📄</span>
                                                </div>
                                            )}
                                            {isVideoFile && (
                                                <div className="video-overlay">
                                                    <span className="video-icon">▶</span>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded-circle"
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                padding: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 10,
                                            }}
                                            onClick={(e) => handleDelete(urlString, e)}
                                            disabled={isDeleting === urlString}
                                            title="Delete"
                                        >
                                            {isDeleting === urlString ? (
                                                <span className="spinner-border spinner-border-sm" role="status">
                                                    <span className="visually-hidden">Deleting...</span>
                                                </span>
                                            ) : (
                                                '×'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Upload box - don't pass defaultUrls since we show existing media above */}
            <GenericFileUpload
                key={uploadKey} // Reset component when key changes
                name={name}
                setData={useCallback((name, files) => {
                    // GenericFileUpload returns new files only (File objects, not URLs)
                    // Filter to ensure we only get File objects - never send existing URLs
                    const uploadedFiles = files.filter((f: any) => f instanceof File) as File[];

                    if (uploadedFiles.length > 0) {
                        // Update newFiles state and form data
                        setNewFiles(prev => {
                            const allNewFiles = [...prev, ...uploadedFiles];
                            // Only send new File objects to parent - existing URLs are never included
                            // The parent form should only contain File objects, not strings
                            setData(name, allNewFiles);
                            return allNewFiles;
                        });
                        // Clear the upload box after files are added by resetting the key
                        // This will unmount and remount GenericFileUpload with empty state
                        setTimeout(() => {
                            setUploadKey(prev => prev + 1);
                        }, 100);
                    }
                    // If uploadedFiles.length is 0, don't update - this happens when component resets
                }, [name, setData])}
                errors={errors}
                defaultUrls={[]}
                fileType={fileType}
                accept={accept}
                maxSize={maxSize}
                watermark={watermark}
                multiple={true}
                label=""
                description=""
                innerText={`Drag and drop ${isImage ? 'images' : 'videos'} here, or click to upload`}
            />

            {errors?.[name] && <InputError message={errors[name]} />}

            <style>{`
                .existing-media-item {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .existing-media-item:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .existing-media-preview {
                    position: relative;
                    background: #f6f6f6;
                }

                .video-overlay {
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

                .video-icon {
                    color: white;
                    font-size: 16px;
                    margin-left: 2px;
                }
            `}</style>
        </div>
    );
};

export default MediaUploadSection;


import React, { useState, useEffect, useMemo } from 'react';
import GenericFileUpload from './GenericFileUpload';
import InputLabel from './InputLabel';
import InputError from './InputError';

interface MediaUploadSectionProps {
    label: string;
    description?: string;
    name: string;
    setData: (key: string, value: File[]) => void;
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
    maxFiles?: number;
    currentCount?: number;
    onDelete?: (url: string) => void;
    deleteEndpoint?: string;
    resetKey?: number | string; // When this changes, reset the upload box
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
    resetKey,
}) => {
    // Filter and sanitize default URLs
    const sanitizedDefaultUrls = useMemo(() => {
        return defaultUrls.filter((url): url is string => typeof url === 'string' && url.trim() !== '');
    }, [defaultUrls]);

    const [existingMedia, setExistingMedia] = useState<string[]>(sanitizedDefaultUrls);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    // Update existing media when defaultUrls changes
    useEffect(() => {
        setExistingMedia(sanitizedDefaultUrls);
    }, [sanitizedDefaultUrls.join(',')]);

    const handleDelete = async (url: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!deleteEndpoint) {
            // If no delete endpoint, just remove from local state
            setExistingMedia(prev => prev.filter(u => u !== url));
            if (onDelete) {
                onDelete(url);
            }
            return;
        }

        setIsDeleting(url);
        try {
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
                setExistingMedia(prev => prev.filter(u => u !== url));
                if (onDelete) {
                    onDelete(url);
                }
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to delete media. Please try again.');
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

            {/* Display existing media */}
            {existingMedia.length > 0 && (
                <div className="existing-media-grid mb-4">
                    <div className="row g-3">
                        {existingMedia.map((url, index) => {
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

            {/* Upload box for new files */}
            <GenericFileUpload
                name={name}
                setData={setData}
                errors={errors}
                fileType={fileType}
                accept={accept}
                maxSize={maxSize}
                watermark={watermark}
                multiple={true}
                label=""
                description=""
                innerText={`Drag and drop ${isImage ? 'images' : 'videos'} here, or click to upload`}
                resetKey={resetKey}
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

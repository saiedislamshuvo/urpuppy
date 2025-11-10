import DashboardLayout from '@/Layouts/DashboardLayout';
import { PageProps } from '@/types';
import MediaUploadSection from '@/Components/MediaUploadSection';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import { useMemo } from 'react';

export default function MediaIndex({
    gallery = [],
    videos = [],
    media_limits,
}: PageProps<{
    gallery?: string[];
    videos?: string[];
    media_limits?: {
        images: number;
        videos: number;
    };
}>) {
    // Filter out any File objects and ensure we only have strings
    const sanitizedGallery = useMemo(() => {
        return (gallery ?? []).filter((item): item is string => typeof item === 'string');
    }, [gallery]);

    const sanitizedVideos = useMemo(() => {
        return (videos ?? []).filter((item): item is string => typeof item === 'string');
    }, [videos]);

    const { data, setData, post, errors, processing } = useForm<{
        gallery: File[];
        videos: File[];
    }>({
        gallery: [], // Only new files, not existing URLs
        videos: [], // Only new files, not existing URLs
    });

    // Use the original gallery/videos from props for displaying existing media
    // Form data only contains new File objects

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Form data only contains new File objects (no existing URLs)
        const galleryFiles = (data.gallery ?? []) as File[];
        const videoFiles = (data.videos ?? []) as File[];

        // Only submit if there are new files to upload
        if (galleryFiles.length > 0 || videoFiles.length > 0) {
            post('/my-media/update', {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    // Clear the form data after successful submission
                    setData('gallery', []);
                    setData('videos', []);
                }
            });
        }
    };

    return (
        <DashboardLayout activeTab="My Media" metaTitle="My Media">
            <div className="card border mt-4">
                <div className="card-body">
                    <h2 className="mb-0">My Media</h2>
                    <p className="text-muted mb-4">
                        Upload and manage your images and videos. Your subscription plan determines how many media files you can upload.
                    </p>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Images Section - Full Width */}
                        <div className="mb-5">
                            <MediaUploadSection
                                label="Upload Images"
                                description="Upload images to showcase your business (JPG, PNG, GIF, WebP)"
                                name="gallery"
                                setData={(name, files: any) => {
                                    // Only accept File objects, filter out any strings
                                    const fileObjects = files.filter((f: any) => f instanceof File);
                                    setData('gallery', fileObjects);
                                }}
                                errors={errors}
                                defaultUrls={sanitizedGallery}
                                fileType="images"
                                accept=".jpg,.jpeg,.png,.gif,.webp"
                                maxSize={12 * 1024 * 1024} // 12MB
                                watermark={{
                                    text: 'urpuppy.com',
                                    opacity: 0.3,
                                    position: 'tile',
                                    color: '#ffffff'
                                }}
                                required={false}
                                maxFiles={media_limits?.images}
                                currentCount={sanitizedGallery.length}
                                deleteEndpoint="/api/media/delete"
                            />
                            {errors.gallery && <InputError message={errors.gallery} />}
                        </div>

                        {/* Videos Section - Full Width */}
                        <div className="mb-4">
                            <MediaUploadSection
                                label="Upload Videos"
                                description="Upload videos to showcase your business (MP4, MOV, AVI, WebM)"
                                name="videos"
                                setData={(name, files: any) => {
                                    // Only accept File objects, filter out any strings
                                    const fileObjects = files.filter((f: any) => f instanceof File);
                                    setData('videos', fileObjects);
                                }}
                                errors={errors}
                                defaultUrls={sanitizedVideos}
                                fileType="videos"
                                accept=".mp4,.mov,.avi,.webm"
                                maxSize={50 * 1024 * 1024} // 50MB
                                required={false}
                                maxFiles={media_limits?.videos}
                                currentCount={sanitizedVideos.length}
                                deleteEndpoint="/api/media/delete"
                            />
                            {errors.videos && <InputError message={errors.videos} />}
                        </div>

                        <div className="mt-4">
                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}


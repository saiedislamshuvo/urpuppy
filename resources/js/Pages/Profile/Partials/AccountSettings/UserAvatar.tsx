import { router, usePage } from "@inertiajs/react";
import React, { useRef, useState } from "react";

interface AvatarInputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AvatarInput: React.FC<AvatarInputProps> = ({ onChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
    const user  = usePage().props.auth.user
  const [imagePreview, setImagePreview] = useState<string>(user.avatar);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string); // Set the image preview URL
        }
      };
      reader.readAsDataURL(file);
    }

    // Invoke the external onChange handler if provided
    if (onChange) {
      onChange(event);
    }
  };

  const handleDeletePicture = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined") return;

    if (!window.confirm("Are you sure you want to delete your profile picture?"))
    {
        return;
    }

    e.preventDefault();
    setImagePreview(""); // Reset to default image
    if (fileInputRef.current) {
      router.delete(`/profile/avatar`);
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  return (
    <div className="d-md-flex align-items-center gap-4">
      <span className="d-block round-120 flex-shrink-0 position-relative overflow-hidden rounded-circle mb-3 mb-md-0 ">
                <div
  className="d-flex align-items-center justify-content-center bg-secondary border border-1 text-white w-100 h-100"
  style={{ position: 'relative' }}
>
  {imagePreview ? (
    <img
      src={imagePreview}
      id="image-preview"
      alt="Preview"
      className="object-fit-cover w-100 h-100"
    />
  ) : (
    <span>No image</span>
  )}
</div>

      </span>
      <div className="d-sm-flex align-items-center gap-6">
        <div className="position-relative">
          <label
            className="custom-file-label btn btn-primary"
            htmlFor="file-upload"
          >
            Change Picture
          </label>
          <input
            ref={fileInputRef}
            className="form-control change-img-preview"
            type="file"
            id="file-upload"
            placeholder="Change Picture"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <a
                    rel='nofollow'
          className="btn btn-outline-extralight border btn-white text-dark d-block"
          href="#"
          onClick={handleDeletePicture}
        >
          Delete Picture
        </a>
      </div>
    </div>
  );
};

export default AvatarInput;


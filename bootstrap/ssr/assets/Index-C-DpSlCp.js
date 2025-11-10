import { r as reactExports, S as Se, j as jsxRuntimeExports } from "../ssr.js";
import { D as DashboardLayout } from "./DashboardLayout-T7nYCU5z.js";
import { M as MediaUploadSection } from "./MediaUploadSection-qil0EyyD.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
import "util";
import "stream";
import "path";
import "http";
import "https";
import "url";
import "fs";
import "crypto";
import "assert";
import "tty";
import "os";
import "zlib";
import "events";
import "process";
import "./Layout-CVJc5AuP.js";
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
import "./MetaTags-D4JDM_I7.js";
import "./GenericFileUpload-BR4QEQmv.js";
import "./index-BJOsIyUP.js";
import "./index-DgY4nH2N.js";
import "./InputLabel-DAgP54zY.js";
function MediaIndex({
  gallery = [],
  videos = [],
  media_limits
}) {
  const sanitizedGallery = reactExports.useMemo(() => {
    return (gallery ?? []).filter((item) => typeof item === "string");
  }, [gallery]);
  const sanitizedVideos = reactExports.useMemo(() => {
    return (videos ?? []).filter((item) => typeof item === "string");
  }, [videos]);
  const { data, setData, post, errors, processing } = Se({
    gallery: [],
    // Only new files, not existing URLs
    videos: []
    // Only new files, not existing URLs
  });
  const [galleryResetKey, setGalleryResetKey] = reactExports.useState(0);
  const [videosResetKey, setVideosResetKey] = reactExports.useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const galleryFiles = data.gallery ?? [];
    const videoFiles = data.videos ?? [];
    if (galleryFiles.length > 0 || videoFiles.length > 0) {
      post("/my-media/update", {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          setData("gallery", []);
          setData("videos", []);
          setGalleryResetKey((prev) => prev + 1);
          setVideosResetKey((prev) => prev + 1);
        }
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { activeTab: "My Media", metaTitle: "My Media", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-0", children: "My Media" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-4", children: "Upload and manage your images and videos. Your subscription plan determines how many media files you can upload." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, encType: "multipart/form-data", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MediaUploadSection,
          {
            label: "Upload Images",
            description: "Upload images to showcase your business (JPG, PNG, GIF, WebP)",
            name: "gallery",
            setData: (name, files) => {
              setData("gallery", files);
            },
            errors,
            defaultUrls: sanitizedGallery,
            fileType: "images",
            accept: ".jpg,.jpeg,.png,.gif,.webp",
            maxSize: 12 * 1024 * 1024,
            watermark: {
              text: "urpuppy.com",
              opacity: 0.3,
              position: "tile",
              color: "#ffffff"
            },
            required: false,
            maxFiles: media_limits == null ? void 0 : media_limits.images,
            currentCount: sanitizedGallery.length,
            deleteEndpoint: "/api/media/delete",
            resetKey: galleryResetKey
          }
        ),
        errors.gallery && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.gallery })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MediaUploadSection,
          {
            label: "Upload Videos",
            description: "Upload videos to showcase your business (MP4, MOV, AVI, WebM)",
            name: "videos",
            setData: (name, files) => {
              setData("videos", files);
            },
            errors,
            defaultUrls: sanitizedVideos,
            fileType: "videos",
            accept: ".mp4,.mov,.avi,.webm",
            maxSize: 50 * 1024 * 1024,
            required: false,
            maxFiles: media_limits == null ? void 0 : media_limits.videos,
            currentCount: sanitizedVideos.length,
            deleteEndpoint: "/api/media/delete",
            resetKey: videosResetKey
          }
        ),
        errors.videos && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.videos })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn btn-primary", disabled: processing, children: processing ? "Saving..." : "Save Changes" }) })
    ] })
  ] }) }) });
}
export {
  MediaIndex as default
};

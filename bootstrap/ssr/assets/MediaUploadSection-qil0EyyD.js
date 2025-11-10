import { r as reactExports, j as jsxRuntimeExports } from "../ssr.js";
import { G as GenericFileUpload } from "./GenericFileUpload-BR4QEQmv.js";
import { I as InputLabel } from "./InputLabel-DAgP54zY.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
const MediaUploadSection = ({
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
  resetKey
}) => {
  const sanitizedDefaultUrls = reactExports.useMemo(() => {
    return defaultUrls.filter((url) => typeof url === "string" && url.trim() !== "");
  }, [defaultUrls]);
  const [existingMedia, setExistingMedia] = reactExports.useState(sanitizedDefaultUrls);
  const [isDeleting, setIsDeleting] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setExistingMedia(sanitizedDefaultUrls);
  }, [sanitizedDefaultUrls.join(",")]);
  const handleDelete = async (url, e) => {
    var _a;
    e.preventDefault();
    e.stopPropagation();
    if (!deleteEndpoint) {
      setExistingMedia((prev) => prev.filter((u) => u !== url));
      if (onDelete) {
        onDelete(url);
      }
      return;
    }
    setIsDeleting(url);
    try {
      const mediaType = name === "gallery" ? "gallery" : "videos";
      const response = await fetch(deleteEndpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": ((_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content")) || ""
        },
        body: JSON.stringify({ url, type: mediaType })
      });
      if (response.ok) {
        setExistingMedia((prev) => prev.filter((u) => u !== url));
        if (onDelete) {
          onDelete(url);
        }
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete media. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("An error occurred while deleting media.");
    } finally {
      setIsDeleting(null);
    }
  };
  const isImage = fileType === "images";
  const remainingSlots = maxFiles ? maxFiles - currentCount : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "media-upload-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: label, isRequired: required }),
    description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted small mb-3", children: description }),
    maxFiles && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { className: "text-muted", children: [
      currentCount,
      " / ",
      maxFiles,
      " ",
      isImage ? "images" : "videos",
      " uploaded",
      remainingSlots !== void 0 && remainingSlots > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-success", children: [
        " (",
        remainingSlots,
        " remaining)"
      ] }),
      remainingSlots !== void 0 && remainingSlots <= 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-danger", children: " (Limit reached)" })
    ] }) }),
    existingMedia.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "existing-media-grid mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row g-3", children: existingMedia.map((url, index) => {
      const urlString = typeof url === "string" ? url : String(url);
      const isImageFile = /\.(jpg|jpeg|png|gif|webp)$/i.test(urlString) || urlString.includes("preview");
      const isVideoFile = /\.(mp4|mov|avi|webm)$/i.test(urlString) || urlString.includes("videos");
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-3 col-sm-4 col-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "existing-media-item position-relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "existing-media-preview", children: [
          isImageFile ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: urlString,
              alt: `Media ${index + 1}`,
              className: "img-fluid rounded",
              style: {
                width: "100%",
                height: "150px",
                objectFit: "cover"
              },
              onError: (e) => {
                e.target.style.display = "none";
              }
            }
          ) : isVideoFile ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              src: urlString,
              className: "img-fluid rounded",
              style: {
                width: "100%",
                height: "150px",
                objectFit: "cover"
              },
              controls: false,
              muted: true,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: urlString })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex align-items-center justify-content-center bg-light rounded", style: { height: "150px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fs-1", children: "📄" }) }),
          isVideoFile && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "video-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "video-icon", children: "▶" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded-circle",
            style: {
              width: "28px",
              height: "28px",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10
            },
            onClick: (e) => handleDelete(urlString, e),
            disabled: isDeleting === urlString,
            title: "Delete",
            children: isDeleting === urlString ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spinner-border spinner-border-sm", role: "status", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "visually-hidden", children: "Deleting..." }) }) : "×"
          }
        )
      ] }) }, `${url}-${index}`);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GenericFileUpload,
      {
        name,
        setData,
        errors,
        fileType,
        accept,
        maxSize,
        watermark,
        multiple: true,
        label: "",
        description: "",
        innerText: `Drag and drop ${isImage ? "images" : "videos"} here, or click to upload`,
        resetKey
      }
    ),
    (errors == null ? void 0 : errors[name]) && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors[name] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
            ` })
  ] });
};
export {
  MediaUploadSection as M
};

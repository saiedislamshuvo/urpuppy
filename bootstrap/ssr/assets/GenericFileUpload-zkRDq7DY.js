import { r as reactExports, j as jsxRuntimeExports } from "../ssr.js";
import { u as useDropzone } from "./index-BQVxnAyW.js";
const getAcceptConfig = (accept) => {
  if (!accept) return void 0;
  const types = {};
  accept.split(",").forEach((type) => {
    type = type.trim();
    if (type.startsWith(".")) {
      const ext = type;
      const category = ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".gif" || ext === ".webp" ? "image" : ext === ".mp4" || ext === ".mov" || ext === ".avi" || ext === ".webm" ? "video" : "application";
      const mimeKey = `${category}/*`;
      if (!types[mimeKey]) types[mimeKey] = [];
      if (!types[mimeKey].includes(ext)) {
        types[mimeKey].push(ext);
      }
    }
  });
  return Object.keys(types).length > 0 ? types : void 0;
};
const addWatermarkToImage = async (file, watermark) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Canvas context not available"));
      return;
    }
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const opacity = watermark.opacity ?? 0.3;
      const fontSize = watermark.fontSize ?? Math.max(img.width, img.height) / 20;
      const color = watermark.color ?? "#ffffff";
      const position = watermark.position ?? "tile";
      const applyWatermark = (watermarkImg) => {
        ctx.save();
        ctx.globalAlpha = opacity;
        if (watermark.imageUrl && watermarkImg) {
          const targetCols = 2;
          const padding = 0.15;
          const availableWidth = img.width * (1 - padding * 2);
          const watermarkWidth = availableWidth / (targetCols + (targetCols - 1) * 1);
          const watermarkAspect = watermarkImg.width / watermarkImg.height;
          const watermarkHeight = watermarkWidth / watermarkAspect;
          if (position === "tile") {
            const maxRows = 3;
            const watermarksPerRow = 2;
            const tilePadding = 0;
            const tileAvailableWidth = img.width * (1 - tilePadding * 2);
            const spacingX = tileAvailableWidth / (watermarksPerRow - 0.5);
            const startX = img.width * tilePadding;
            const tileAvailableHeight = img.height * (1 - tilePadding * 2);
            const spacingY = tileAvailableHeight / (maxRows + 1);
            const startY = img.height * tilePadding;
            for (let row = 0; row < maxRows; row++) {
              const rowOffset = row % 2 === 1 ? spacingX / 2 : 0;
              const y = startY + (row + 1) * spacingY - watermarkHeight / 2;
              for (let col = 0; col < watermarksPerRow; col++) {
                const x = startX + col * spacingX + spacingX / 2 + rowOffset - watermarkWidth / 2;
                if (x >= 0 && x + watermarkWidth <= img.width && y >= 0 && y + watermarkHeight <= img.height) {
                  ctx.drawImage(watermarkImg, x, y, watermarkWidth, watermarkHeight);
                }
              }
            }
          } else {
            let x = 0;
            let y = 0;
            if (position === "center") {
              x = (img.width - watermarkWidth) / 2;
              y = (img.height - watermarkHeight) / 2;
            } else {
              if (position.includes("top")) y = 20;
              if (position.includes("bottom")) y = img.height - watermarkHeight - 20;
              if (position.includes("left")) x = 20;
              if (position.includes("right")) x = img.width - watermarkWidth - 20;
            }
            ctx.drawImage(watermarkImg, x, y, watermarkWidth, watermarkHeight);
          }
        } else if (watermark.text) {
          ctx.fillStyle = color;
          ctx.font = `bold ${fontSize}px Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const textWidth = ctx.measureText(watermark.text).width;
          if (position === "tile") {
            const maxRows = 4;
            const watermarksPerRow = 3;
            const padding = 0.1;
            const availableWidth = img.width * (1 - padding * 2);
            const spacingX = availableWidth / (watermarksPerRow - 0.5);
            const startX = img.width * padding;
            const availableHeight = img.height * (1 - padding * 2);
            const spacingY = availableHeight / (maxRows + 1);
            const startY = img.height * padding;
            for (let row = 0; row < maxRows; row++) {
              const rowOffset = row % 2 === 1 ? spacingX / 2 : 0;
              const y = startY + (row + 1) * spacingY;
              for (let col = 0; col < watermarksPerRow; col++) {
                const x = startX + col * spacingX + spacingX / 2 + rowOffset;
                if (x >= 0 && x <= img.width && y >= 0 && y <= img.height) {
                  ctx.fillText(watermark.text, x, y);
                }
              }
            }
          } else {
            let x = img.width / 2;
            let y = img.height / 2;
            if (position.includes("top")) y = fontSize * 1.5;
            if (position.includes("bottom")) y = img.height - fontSize * 1.5;
            if (position.includes("left")) x = textWidth / 2 + 20;
            if (position.includes("right")) x = img.width - textWidth / 2 - 20;
            ctx.fillText(watermark.text, x, y);
          }
        }
        ctx.restore();
      };
      if (watermark.imageUrl) {
        const watermarkImg = new Image();
        watermarkImg.crossOrigin = "anonymous";
        watermarkImg.onload = () => {
          applyWatermark(watermarkImg);
          finishWatermarking();
        };
        watermarkImg.onerror = () => {
          console.warn("Watermark image failed to load: " + watermark.imageUrl);
          if (watermark.text) {
            applyWatermark();
            finishWatermarking();
          } else {
            finishWatermarking();
          }
        };
        const fullWatermarkUrl = watermark.imageUrl.startsWith("http") || watermark.imageUrl.startsWith("//") ? watermark.imageUrl : window.location.origin + watermark.imageUrl;
        watermarkImg.src = fullWatermarkUrl;
        return;
      } else if (watermark.text) {
        applyWatermark();
        finishWatermarking();
      } else {
        finishWatermarking();
      }
      function finishWatermarking() {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const watermarkedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(watermarkedFile);
            } else {
              reject(new Error("Failed to create watermarked image"));
            }
          },
          file.type,
          0.92
        );
      }
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
};
function GenericFileUpload({
  required = false,
  name,
  setData,
  errors,
  defaultUrls = [],
  fileType = "all",
  accept,
  maxSize = 50 * 1024 * 1024,
  watermark,
  multiple = true,
  label,
  description,
  innerText,
  borderColor = "#FF8C00",
  hoverBorderColor = "#00a65a",
  backgroundColor = "#f0f9ff",
  resetKey
}) {
  const [files, setFiles] = reactExports.useState([]);
  const [previews, setPreviews] = reactExports.useState({});
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const existingUrls = defaultUrls.filter((url) => typeof url === "string" && url.trim() !== "");
  reactExports.useEffect(() => {
    if (resetKey !== void 0) {
      setPreviews((prev) => {
        Object.values(prev).forEach((url) => {
          if (url && url.startsWith("blob:")) {
            URL.revokeObjectURL(url);
          }
        });
        return {};
      });
      setFiles([]);
      setData(name, []);
    }
  }, [resetKey]);
  reactExports.useEffect(() => {
    const newPreviews = {};
    files.forEach((file) => {
      const key = `${file.name}-${file.size}-${file.lastModified}`;
      if (!previews[key] && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
        newPreviews[key] = URL.createObjectURL(file);
      }
    });
    if (Object.keys(newPreviews).length > 0) {
      setPreviews((prev) => ({ ...prev, ...newPreviews }));
    }
  }, [files]);
  reactExports.useEffect(() => {
    return () => {
      Object.values(previews).forEach((url) => {
        if (url && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);
  const onDrop = reactExports.useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      setIsProcessing(true);
      try {
        let processedFiles = [];
        for (const file of acceptedFiles) {
          if (file.size > maxSize) {
            alert(`File ${file.name} exceeds maximum size of ${formatFileSize(maxSize)}`);
            continue;
          }
          if (watermark && file.type.startsWith("image/")) {
            try {
              const watermarkedFile = await addWatermarkToImage(file, watermark);
              processedFiles.push(watermarkedFile);
            } catch (error) {
              console.error("Error applying watermark:", error);
              processedFiles.push(file);
            }
          } else {
            processedFiles.push(file);
          }
        }
        if (processedFiles.length > 0) {
          setFiles((prev) => {
            const updated = multiple ? [...prev, ...processedFiles] : processedFiles;
            setData(name, updated);
            return updated;
          });
        }
      } catch (error) {
        console.error("Error processing files:", error);
        alert("Error processing files. Please try again.");
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
      const reasons = rejectedFiles.map((f) => f.errors.map((e) => e.message).join(", ")).join("; ");
      alert(`Some files were rejected: ${reasons}`);
    }
  });
  const handleRemove = (fileToRemove, e) => {
    e.stopPropagation();
    const key = `${fileToRemove.name}-${fileToRemove.size}-${fileToRemove.lastModified}`;
    if (previews[key]) {
      URL.revokeObjectURL(previews[key]);
      setPreviews((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[key];
        return newPreviews;
      });
    }
    setFiles((prev) => {
      const updated = prev.filter((f) => f !== fileToRemove);
      setData(name, updated);
      return updated;
    });
  };
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };
  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) return "🖼️";
    if (file.type.startsWith("video/")) return "🎥";
    if (file.type === "application/pdf") return "📄";
    return "📎";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "generic-file-upload", children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "form-label fw-semibold mb-2", children: [
      label,
      " ",
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-danger", children: "*" })
    ] }),
    description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted small mb-3", children: description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ...getRootProps(),
        className: `dropzone ${isDragActive ? "dz-drag-hover" : ""} ${isProcessing ? "processing" : ""}`,
        style: {
          "--border-color": borderColor,
          "--hover-border-color": hoverBorderColor,
          "--background-color": backgroundColor
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...getInputProps(), name }),
          isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-message", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-message-text", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner-border spinner-border-sm me-2", role: "status", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "visually-hidden", children: "Loading..." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Processing files..." })
          ] }) }) : files.length === 0 && existingUrls.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-message", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-message-text", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1", children: innerText || "Drop files here or click to upload" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted small", children: [
              accept && `Accepted: ${accept}`,
              maxSize && ` • Max size: ${formatFileSize(maxSize)}`
            ] })
          ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-preview-container mt-0", children: [
            existingUrls.map((url, index) => {
              const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url) || url.includes("preview") || url.includes("image");
              const isVideo = /\.(mp4|mov|avi|webm)$/i.test(url) || url.includes("video");
              const isDocument = /\.(pdf|doc|docx)$/i.test(url);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-preview dz-file-preview", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-image", children: [
                  isImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: url,
                      alt: `Existing file ${index + 1}`,
                      style: { display: "block", width: "100%", height: "100%", objectFit: "cover" },
                      onError: (e) => {
                        e.target.style.display = "none";
                      }
                    }
                  ) : isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: url, controls: false, muted: true, style: { width: "100%", height: "100%", objectFit: "cover" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: url }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-file-representation", children: isDocument ? "📄" : "📎" }),
                  isVideo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-video-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dz-video-icon", children: "▶" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-details", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-filename", title: url, children: url.split("/").pop() || "Existing file" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-size", children: "Existing file" })
                ] })
              ] }, `existing-${url}-${index}`);
            }),
            files.map((file, index) => {
              const key = `${file.name}-${file.size}-${file.lastModified}`;
              const previewUrl = previews[key];
              const isImage = file.type.startsWith("image/");
              const isVideo = file.type.startsWith("video/");
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-preview dz-file-preview", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-image", children: [
                  previewUrl ? isImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: previewUrl,
                      alt: file.name,
                      style: { display: "block", width: "100%", height: "100%", objectFit: "cover" }
                    }
                  ) : isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: previewUrl, controls: false, muted: true, style: { width: "100%", height: "100%", objectFit: "cover" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: previewUrl, type: file.type }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-file-representation", children: getFileIcon(file) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-file-representation", children: getFileIcon(file) }),
                  isVideo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-video-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dz-video-icon", children: "▶" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-details", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-filename", title: file.name, children: file.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-size", children: formatFileSize(file.size) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "dz-remove",
                    onClick: (e) => handleRemove(file, e),
                    role: "button",
                    tabIndex: 0,
                    "aria-label": "Remove file",
                    children: "✕"
                  }
                )
              ] }, `${key}-${index}`);
            })
          ] })
        ]
      }
    ),
    (files.length > 0 || existingUrls.length > 0) && multiple && files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          open();
        },
        className: "btn btn-outline-primary btn-sm mt-3",
        disabled: isProcessing,
        children: "Add More Files"
      }
    ),
    (errors == null ? void 0 : errors[name]) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-danger small mt-2", children: errors[name] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
      ` })
  ] });
}
export {
  GenericFileUpload as G
};

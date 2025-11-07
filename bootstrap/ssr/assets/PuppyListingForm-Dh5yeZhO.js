import { r as reactExports, j as jsxRuntimeExports, q, S as Se } from "../ssr.js";
import { T as TextInput } from "./TextInput-CTPfMhdJ.js";
import { I as InputLabel } from "./InputLabel-DAgP54zY.js";
import { u as useDropzone, S as SemiHeading, a as SelectInput, Y as YesOrNoRadioInput } from "./SelectInput-DvSD7_5Y.js";
import { D as DateInput, M as MapInput } from "./MapInput-CiFWd45o.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
import { l as lodashExports } from "./lodash-CtkUkZej.js";
const getAcceptedFileTypes = (fileType) => {
  if (Array.isArray(fileType)) {
    return fileType;
  }
  const typeMap = {
    images: ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"],
    videos: ["video/mp4", "video/mov", "video/quicktime", "video/avi", "video/webm"],
    documents: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    all: []
  };
  return typeMap[fileType] || [];
};
const getAcceptString = (fileType, customAccept) => {
  if (customAccept) {
    const types = {};
    customAccept.split(",").forEach((type) => {
      type = type.trim();
      if (type.startsWith(".")) {
        const ext = type.substring(1);
        const mimeType = getMimeTypeFromExtension(ext);
        if (mimeType) {
          const category = mimeType.split("/")[0];
          if (!types[category]) types[category] = [];
          types[category].push(mimeType);
        }
      } else if (type.includes("/*")) {
        const category = type.split("/")[0];
        types[category] = [type];
      }
    });
    return Object.keys(types).length > 0 ? types : void 0;
  }
  const acceptedTypes = getAcceptedFileTypes(fileType);
  if (acceptedTypes.length === 0) return void 0;
  const grouped = {};
  acceptedTypes.forEach((mimeType) => {
    const category = mimeType.split("/")[0];
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(mimeType);
  });
  return grouped;
};
const getMimeTypeFromExtension = (ext) => {
  const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    mp4: "video/mp4",
    mov: "video/quicktime",
    avi: "video/avi",
    webm: "video/webm",
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  };
  return mimeTypes[ext.toLowerCase()] || null;
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
    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const opacity = watermark.opacity ?? 0.3;
      const fontSize = watermark.fontSize ?? Math.max(img.width, img.height) / 20;
      const color = watermark.color ?? "#ffffff";
      const position = watermark.position ?? "tile";
      if (watermark.text) {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const textWidth = ctx.measureText(watermark.text).width;
        if (position === "tile") {
          const spacing = textWidth * 1.5;
          const rows = Math.ceil(img.height / spacing);
          const cols = Math.ceil(img.width / spacing);
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const x = col * spacing + spacing / 2;
              const y = row * spacing + spacing / 2;
              ctx.fillText(watermark.text, x, y);
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
        ctx.restore();
      } else if (watermark.imageUrl) {
        const watermarkImg = new Image();
        watermarkImg.crossOrigin = "anonymous";
        watermarkImg.onload = () => {
          ctx.save();
          ctx.globalAlpha = opacity;
          const watermarkSize = Math.min(img.width, img.height) * 0.2;
          const watermarkAspect = watermarkImg.width / watermarkImg.height;
          const wmWidth = watermarkSize;
          const wmHeight = watermarkSize / watermarkAspect;
          if (position === "tile") {
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
            let x = (img.width - wmWidth) / 2;
            let y = (img.height - wmHeight) / 2;
            if (position.includes("top")) y = 20;
            if (position.includes("bottom")) y = img.height - wmHeight - 20;
            if (position.includes("left")) x = 20;
            if (position.includes("right")) x = img.width - wmWidth - 20;
            ctx.drawImage(watermarkImg, x, y, wmWidth, wmHeight);
          }
          ctx.restore();
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
        };
        watermarkImg.onerror = () => reject(new Error("Failed to load watermark image"));
        watermarkImg.src = watermark.imageUrl;
        return;
      } else {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const watermarkedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(watermarkedFile);
            } else {
              reject(new Error("Failed to create image"));
            }
          },
          file.type,
          0.92
        );
        return;
      }
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
  defaultFiles = [],
  defaultUrls = [],
  fileType = "all",
  accept,
  maxSize = 50 * 1024 * 1024,
  // 50MB default
  watermark,
  multiple = true,
  label,
  description,
  innerText,
  borderColor = "#FF8C00",
  hoverBorderColor = "#00a65a",
  backgroundColor = "#f0f9ff"
}) {
  const hiddenInputRef = reactExports.useRef(null);
  const [files, setFiles] = reactExports.useState([]);
  const [urlItems, setUrlItems] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [initializedUrls, setInitializedUrls] = reactExports.useState([]);
  const [previews, setPreviews] = reactExports.useState({});
  const isFileSizeValid = (file) => {
    return file.size <= maxSize;
  };
  const isFileTypeAccepted = (file) => {
    var _a;
    if (fileType === "all" && !accept) return true;
    const acceptedTypes = getAcceptedFileTypes(fileType);
    if (acceptedTypes.length === 0 && !accept) return true;
    if (accept) {
      const acceptList = accept.split(",").map((t) => t.trim());
      const fileExt = ((_a = file.name.split(".").pop()) == null ? void 0 : _a.toLowerCase()) || "";
      const fileMime = file.type;
      return acceptList.some((accepted) => {
        if (accepted.startsWith(".")) {
          return accepted.substring(1).toLowerCase() === fileExt;
        } else if (accepted.includes("/*")) {
          const category = accepted.split("/")[0];
          return fileMime.startsWith(category + "/");
        } else {
          return fileMime === accepted;
        }
      });
    }
    return acceptedTypes.includes(file.type);
  };
  const createPreview = (file) => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    } else if (file.type.startsWith("video/")) {
      return URL.createObjectURL(file);
    }
    return "";
  };
  reactExports.useEffect(() => {
    return () => {
      Object.values(previews).forEach((url) => {
        if (url && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previews]);
  reactExports.useEffect(() => {
    return () => {
    };
  }, [files]);
  reactExports.useEffect(() => {
    const missingPreviews = {};
    files.forEach((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const previewKey = file.__previewKey || `${file.name}-${file.size}-${file.lastModified}`;
        if (!previews[previewKey]) {
          const preview = createPreview(file);
          if (preview) {
            missingPreviews[previewKey] = preview;
            file.__previewKey = previewKey;
          }
        }
      }
    });
    if (Object.keys(missingPreviews).length > 0) {
      setPreviews((prev) => ({ ...prev, ...missingPreviews }));
    }
  }, [files]);
  reactExports.useEffect(() => {
    const validDefaultUrls = defaultUrls.filter((url) => typeof url === "string" && url.trim() !== "");
    const newUrls = validDefaultUrls.filter((url) => !initializedUrls.includes(url));
    if (newUrls.length === 0) return;
    const urlItemsToAdd = newUrls.map((url) => ({
      url,
      id: `url-${url}-${Date.now()}-${Math.random()}`
    }));
    setUrlItems((prev) => [...prev, ...urlItemsToAdd]);
    setInitializedUrls((prev) => [...prev, ...newUrls]);
    setData(name, files);
  }, [defaultUrls.join(",")]);
  const onDrop = reactExports.useCallback(
    async (incomingFiles) => {
      const validFiles = incomingFiles.filter((file) => {
        if (!isFileSizeValid(file)) {
          return false;
        }
        if (!isFileTypeAccepted(file)) {
          return false;
        }
        return true;
      });
      if (validFiles.length !== incomingFiles.length) {
        alert("Some files were rejected due to size limit or invalid file type.");
      }
      if (validFiles.length === 0) return;
      setIsProcessing(true);
      try {
        const processedFiles = [];
        const newPreviews = {};
        for (const file of validFiles) {
          const previewKey = `${file.name}-${file.size}-${file.lastModified}`;
          const preview = createPreview(file);
          if (!preview) {
            console.warn("Failed to create preview for file:", file.name);
          }
          let processedFile = file;
          if (watermark && file.type.startsWith("image/")) {
            try {
              processedFile = await addWatermarkToImage(file, watermark);
              const watermarkedPreview = createPreview(processedFile);
              if (watermarkedPreview) {
                if (preview) {
                  URL.revokeObjectURL(preview);
                }
                newPreviews[previewKey] = watermarkedPreview;
              } else if (preview) {
                newPreviews[previewKey] = preview;
              }
            } catch (error) {
              console.error("Error applying watermark:", error);
              processedFile = file;
              if (preview) {
                newPreviews[previewKey] = preview;
              }
            }
          } else {
            if (preview) {
              newPreviews[previewKey] = preview;
            }
          }
          processedFile.__previewKey = previewKey;
          processedFiles.push(processedFile);
        }
        setPreviews((prev) => ({ ...prev, ...newPreviews }));
        const newFiles = [...files, ...processedFiles];
        setFiles(newFiles);
        setData(name, newFiles);
        if (hiddenInputRef.current) {
          const dataTransfer = new DataTransfer();
          newFiles.forEach((v) => {
            dataTransfer.items.add(v);
          });
          hiddenInputRef.current.files = dataTransfer.files;
        }
      } catch (error) {
        console.error("Error processing files:", error);
      } finally {
        setIsProcessing(false);
      }
    },
    [files, name, setData, watermark]
  );
  const acceptConfig = getAcceptString(fileType, accept);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    maxSize,
    accept: acceptConfig,
    onDropRejected: (rejectedFiles) => {
      const reasons = rejectedFiles.map((f) => f.errors.map((e) => e.message).join(", ")).join("; ");
      alert(`Some files were rejected: ${reasons}`);
    }
  });
  const handleRemove = reactExports.useCallback(
    (itemToRemove, e) => {
      e.stopPropagation();
      if (itemToRemove instanceof File) {
        const newFiles = files.filter((f) => f !== itemToRemove);
        setFiles(newFiles);
        setData(name, newFiles);
        if (hiddenInputRef.current) {
          const dataTransfer = new DataTransfer();
          newFiles.forEach((v) => {
            dataTransfer.items.add(v);
          });
          hiddenInputRef.current.files = dataTransfer.files;
        }
      } else {
        const newUrlItems = urlItems.filter((item) => item.id !== itemToRemove.id);
        setUrlItems(newUrlItems);
        setInitializedUrls((prev) => prev.filter((url) => url !== itemToRemove.url));
      }
    },
    [files, name, setData, urlItems]
  );
  const handleAddMoreClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };
  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) return "🖼️";
    if (file.type.startsWith("video/")) return "🎥";
    if (file.type === "application/pdf") return "📄";
    if (file.type.includes("word") || file.type.includes("document")) return "📝";
    return "📎";
  };
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              name,
              style: { opacity: 0, position: "absolute", pointerEvents: "none" },
              ref: hiddenInputRef,
              multiple
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...getInputProps() }),
          isLoading || isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-message", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-message-text", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner-border spinner-border-sm me-2", role: "status", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "visually-hidden", children: "Loading..." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: isLoading ? "Loading files..." : "Processing files..." })
          ] }) }) : files.length === 0 && urlItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-message", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-message-text", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1", children: innerText || "Drop files here or click to upload" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted small", children: [
              acceptConfig && Object.keys(acceptConfig).length > 0 ? `Accepted: ${Object.keys(acceptConfig).join(", ")}` : "All file types accepted",
              maxSize && ` • Max size: ${formatFileSize(maxSize)}`
            ] })
          ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-preview-container", children: [
            urlItems.map((urlItem, index) => {
              const errorKey = `${name}.${index}`;
              const fileError = (errors == null ? void 0 : errors[errorKey]) ?? null;
              const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(urlItem.url);
              const isVideo = /\.(mp4|mov|avi|webm)$/i.test(urlItem.url);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-preview dz-file-preview", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-image", children: [
                  isImage ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: urlItem.url, alt: "Preview", onError: (e) => {
                    var _a;
                    e.target.style.display = "none";
                    (_a = e.target.nextElementSibling) == null ? void 0 : _a.classList.remove("d-none");
                  } }) : isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: urlItem.url, controls: false, muted: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: urlItem.url }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-file-representation", children: "📄" }),
                  isVideo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-video-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dz-video-icon", children: "▶" }) }),
                  isImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-file-representation d-none", children: "🖼️" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-details", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-filename", title: urlItem.url, children: urlItem.url.split("/").pop() || "File" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-size", children: "Existing file" }),
                  fileError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-danger small mt-1", children: fileError })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "dz-remove",
                    onClick: (e) => handleRemove(urlItem, e),
                    role: "button",
                    tabIndex: 0,
                    "aria-label": "Remove file",
                    children: "✕"
                  }
                )
              ] }, urlItem.id);
            }),
            files.map((file, index) => {
              const errorKey = `${name}.${urlItems.length + index}`;
              const fileError = (errors == null ? void 0 : errors[errorKey]) ?? null;
              const previewUrl = file.type.startsWith("image/") || file.type.startsWith("video/") ? URL.createObjectURL(file) : null;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-preview dz-file-preview", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-image", children: [
                  previewUrl ? file.type.startsWith("image/") ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: previewUrl,
                      alt: file.name,
                      style: { display: "block", width: "100%", height: "100%", objectFit: "cover" },
                      onError: (e) => {
                        console.error("Image preview failed to load:", previewUrl, "File:", file.name);
                        e.target.style.display = "none";
                        const fallback = e.target.nextElementSibling;
                        if (fallback) fallback.classList.remove("d-none");
                      },
                      onLoad: () => {
                        console.log("Image preview loaded successfully:", previewUrl);
                      }
                    }
                  ) : file.type.startsWith("video/") ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: previewUrl, controls: false, muted: true, style: { width: "100%", height: "100%", objectFit: "cover" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: previewUrl, type: file.type }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-file-representation", children: getFileIcon(file) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-file-representation", children: getFileIcon(file) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-file-representation d-none", children: getFileIcon(file) }),
                  file.type.startsWith("video/") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-video-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dz-video-icon", children: "▶" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-details", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-filename", title: file.name, children: file.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-size", children: formatFileSize(file.size) }),
                  fileError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-danger small mt-1", children: fileError })
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
              ] }, `${file.name}-${file.size}-${index}`);
            })
          ] })
        ]
      }
    ),
    (files.length > 0 || urlItems.length > 0) && multiple && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleAddMoreClick,
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
const PuppyListingForm = ({
  puppy_edit
}) => {
  const patterns = q().props.patterns;
  const colors = q().props.colors;
  const breeds = q().props.breeds;
  const mapProvider = q().props.mapProvider;
  const defaultLocation = q().props.defaultLocation;
  const getInitialLocation = () => {
    if (puppy_edit && puppy_edit.lat && puppy_edit.lng) {
      return {
        lat: puppy_edit.lat,
        lng: puppy_edit.lng,
        address: puppy_edit.address ?? "",
        city: puppy_edit.city ?? "",
        street: puppy_edit.street ?? "",
        state: puppy_edit.state ?? "",
        shortState: puppy_edit.short_state ?? "",
        zipCode: puppy_edit.zip_code ?? ""
      };
    }
    return defaultLocation;
  };
  const initialLocation = getInitialLocation();
  const initialFormData = {
    images: (puppy_edit == null ? void 0 : puppy_edit.preview_images) ?? [],
    puppy_breeds: (puppy_edit == null ? void 0 : puppy_edit.breeds) ?? [],
    videos: (puppy_edit == null ? void 0 : puppy_edit.video) != null ? [puppy_edit == null ? void 0 : puppy_edit.video] : [],
    has_vaccine: (puppy_edit == null ? void 0 : puppy_edit.has_vaccine) ? "yes" : "no",
    has_health_certificate: (puppy_edit == null ? void 0 : puppy_edit.has_health_certificate) ? "yes" : "no",
    has_vet_exam: (puppy_edit == null ? void 0 : puppy_edit.has_vet_exam) ? "yes" : "no",
    has_delivery_included: (puppy_edit == null ? void 0 : puppy_edit.has_delivery_included) ? "yes" : "no",
    has_travel_ready: (puppy_edit == null ? void 0 : puppy_edit.has_travel_ready) ? "yes" : "no",
    certificate_type: (puppy_edit == null ? void 0 : puppy_edit.certificate_type) ?? null,
    puppy_price: puppy_edit == null ? void 0 : puppy_edit.price,
    puppy_name: (puppy_edit == null ? void 0 : puppy_edit.name) ?? "",
    puppy_gender: (puppy_edit == null ? void 0 : puppy_edit.gender) ?? "Male",
    puppy_about: (puppy_edit == null ? void 0 : puppy_edit.description) ?? "",
    puppy_patterns: (puppy_edit == null ? void 0 : puppy_edit.puppy_patterns) ?? [],
    puppy_colors: (puppy_edit == null ? void 0 : puppy_edit.puppy_colors) ?? [],
    puppy_birth_date: (puppy_edit == null ? void 0 : puppy_edit.birth_date) ?? "",
    certificate_document: (puppy_edit == null ? void 0 : puppy_edit.certificate_document) ?? [],
    location_lat: (initialLocation == null ? void 0 : initialLocation.lat) ?? null,
    location_lng: (initialLocation == null ? void 0 : initialLocation.lng) ?? null,
    location_address: (initialLocation == null ? void 0 : initialLocation.address) ?? null,
    location_city: (initialLocation == null ? void 0 : initialLocation.city) ?? null,
    location_street: (initialLocation == null ? void 0 : initialLocation.street) ?? null,
    location_state: (initialLocation == null ? void 0 : initialLocation.state) ?? null,
    location_short_state: (initialLocation == null ? void 0 : initialLocation.shortState) ?? null,
    location_zip_code: (initialLocation == null ? void 0 : initialLocation.zipCode) ?? null
  };
  const { post, put, data, setData, errors, processing } = Se(initialFormData);
  const handleLocationSelect = (location) => {
    setData({
      ...data,
      location_lat: location.lat,
      location_lng: location.lng,
      location_address: location.address,
      location_city: location.city,
      location_street: location.street,
      location_state: location.state,
      location_short_state: location.shortState,
      location_zip_code: location.zipCode
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (puppy_edit) {
      put(`/puppies-listing/${puppy_edit == null ? void 0 : puppy_edit.id}`);
    } else {
      post(`/puppies-listing`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "puppy-details border-bottom mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SemiHeading, { title: "Puppy Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Puppy Name", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { value: data.puppy_name ?? "", onChange: (e) => setData("puppy_name", e.target.value) }),
            errors.puppy_name && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_name })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Puppy Price", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { value: data.puppy_price ?? "", onChange: (e) => setData("puppy_price", lodashExports.parseInt(e.target.value)) }),
            errors.puppy_price && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_price })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Gender", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: data.puppy_gender ?? "Male", onChange: (e) => setData("puppy_gender", e.target.value), className: "form-select shadow-none", "aria-label": "Default select example", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Male", children: "Male" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Female", children: "Female" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Breeds", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectInput, { value: data.puppy_breeds ?? [], setData, multiple: true, name: "puppy_breeds", options: breeds }),
            errors.puppy_breeds && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_breeds })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Pattern/Coat ", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectInput, { value: data.puppy_patterns ?? [], setData, multiple: true, name: "puppy_patterns", options: patterns }),
            errors.puppy_patterns && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_patterns })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Color", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectInput, { value: data.puppy_colors ?? [], setData, multiple: true, name: "puppy_colors", options: colors }),
            errors.puppy_colors && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_colors })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Date of Birth", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DateInput, { name: "puppy_birth_date", setData, value: data.puppy_birth_date ?? "" }),
              errors.puppy_birth_date && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_birth_date })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "why-stand-out border-bottom mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SemiHeading, { title: "Why I Stand Out" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-lg-4 col-xxl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(YesOrNoRadioInput, { title: "Health Certificate", value: data.has_health_certificate ?? "no", name: "has_health_certificate", setData }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-lg-4 col-xxl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            YesOrNoRadioInput,
            {
              title: "Vaccinated",
              value: data.has_vaccine ?? "no",
              name: "has_vaccine",
              setData
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-lg-4 col-xxl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            YesOrNoRadioInput,
            {
              title: "Vet Exam",
              value: data.has_vet_exam ?? "no",
              name: "has_vet_exam",
              setData
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-lg-4 col-xxl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            YesOrNoRadioInput,
            {
              title: "Travel Ready",
              value: data.has_travel_ready ?? "no",
              name: "has_travel_ready",
              setData
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-lg-4 col-xxl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            YesOrNoRadioInput,
            {
              title: "Delivery Included",
              name: "has_delivery_included",
              value: data.has_delivery_included ?? "no",
              setData
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "certificate-details border-bottom mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SemiHeading, { title: "Certificate & Registration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border round", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 fw-semibold", children: "Certificate Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-check form-check-inline mb-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    className: "form-check-input",
                    type: "radio",
                    name: "certificate_type",
                    id: "certificate_akc",
                    value: "AKC",
                    checked: data.certificate_type === "AKC",
                    onChange: (e) => setData("certificate_type", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "form-check-label fs-2",
                    htmlFor: "certificate_akc",
                    onClick: () => setData("certificate_type", "AKC"),
                    children: "AKC"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-check form-check-inline mb-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    className: "form-check-input",
                    type: "radio",
                    name: "certificate_type",
                    id: "certificate_ckc",
                    value: "CKC",
                    checked: data.certificate_type === "CKC",
                    onChange: (e) => setData("certificate_type", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "form-check-label fs-2",
                    htmlFor: "certificate_ckc",
                    onClick: () => setData("certificate_type", "CKC"),
                    children: "CKC"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-check form-check-inline mb-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    className: "form-check-input",
                    type: "radio",
                    name: "certificate_type",
                    id: "certificate_other",
                    value: "Other",
                    checked: data.certificate_type === "Other",
                    onChange: (e) => setData("certificate_type", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "form-check-label fs-2",
                    htmlFor: "certificate_other",
                    onClick: () => setData("certificate_type", "Other"),
                    children: "Other"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-check form-check-inline mb-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    className: "form-check-input",
                    type: "radio",
                    name: "certificate_type",
                    id: "certificate_none",
                    value: "None",
                    checked: data.certificate_type === "None",
                    onChange: (e) => {
                      setData({
                        ...data,
                        certificate_type: e.target.value,
                        certificate_document: []
                      });
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "form-check-label fs-2",
                    htmlFor: "certificate_none",
                    onClick: () => {
                      setData({
                        ...data,
                        certificate_type: "None",
                        certificate_document: []
                      });
                    },
                    children: "None"
                  }
                )
              ] })
            ] }),
            data.certificate_type && data.certificate_type !== "None" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12 mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 fw-semibold", children: "Upload Certificate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GenericFileUpload,
                {
                  defaultUrls: data.certificate_document ?? [],
                  setData: (name, files) => setData("certificate_document", files),
                  errors,
                  name: "certificate_document",
                  required: false,
                  fileType: "documents",
                  accept: ".pdf,.doc,.docx",
                  label: "Certificate Document",
                  description: "Upload PDF or Word document",
                  borderColor: "#ff8c00",
                  hoverBorderColor: "#ff8c00",
                  backgroundColor: "#fff5e6"
                }
              ),
              errors.certificate_document && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.certificate_document })
            ] }) })
          ] }) }),
          errors.certificate_type && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.certificate_type })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "puppy-bio border-bottom mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Puppy Bio", isRequired: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: data.puppy_about ?? "", onChange: (e) => setData("puppy_about", e.target.value), className: "form-control rounded-1", id: "About", rows: 3, placeholder: "" }),
        errors.puppy_about && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_about })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "location-details border-bottom mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SemiHeading, { title: "Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Puppy Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted small mb-3", children: defaultLocation ? "Default location from your account is pre-filled. You can change it if needed." : "Select the location for this puppy listing. You can use the map to search or manually enter the address below." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MapInput,
            {
              provider: mapProvider,
              onLocationSelect: handleLocationSelect,
              initialAddress: initialLocation == null ? void 0 : initialLocation.address,
              initialLocation: initialLocation ? { lat: initialLocation.lat, lng: initialLocation.lng } : null
            }
          ),
          errors.location_lat && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_lat }),
          errors.location_lng && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_lng })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Full Address", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextInput,
              {
                value: data.location_address ?? "",
                onChange: (e) => setData("location_address", e.target.value),
                placeholder: "Enter full address"
              }
            ),
            errors.location_address && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_address })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "House & Street No", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextInput,
              {
                value: data.location_street ?? "",
                onChange: (e) => setData("location_street", e.target.value),
                placeholder: "Street address"
              }
            ),
            errors.location_street && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_street })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "City", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextInput,
              {
                value: data.location_city ?? "",
                onChange: (e) => setData("location_city", e.target.value),
                placeholder: "City"
              }
            ),
            errors.location_city && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_city })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "State", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextInput,
              {
                value: data.location_state ?? "",
                onChange: (e) => setData("location_state", e.target.value),
                placeholder: "State name"
              }
            ),
            errors.location_state && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_state })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "State Code", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextInput,
              {
                value: data.location_short_state ?? "",
                onChange: (e) => setData("location_short_state", e.target.value.toUpperCase()),
                placeholder: "e.g., CA, NY, TX",
                maxLength: 2
              }
            ),
            errors.location_short_state && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_short_state })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Zip Code", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextInput,
              {
                value: data.location_zip_code ?? "",
                onChange: (e) => setData("location_zip_code", e.target.value),
                placeholder: "Zip code"
              }
            ),
            errors.location_zip_code && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_zip_code })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "upload-details border-bottom mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-6 mb-4 mb-lg-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            GenericFileUpload,
            {
              defaultUrls: data.images ?? [],
              setData: (name, files) => setData("images", files),
              errors,
              name: "images",
              required: true,
              fileType: "images",
              accept: ".jpg,.jpeg,.png,.gif,.webp",
              label: "Upload Images",
              description: "Upload puppy images (JPG, PNG, GIF, WebP)",
              innerText: "Drag and drop a images here, or click to upload",
              watermark: {
                text: "urpuppy.com",
                opacity: 0.3,
                position: "tile",
                fontSize: void 0,
                color: "#ffffff"
              }
            }
          ),
          errors.images && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.images })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            GenericFileUpload,
            {
              name: "videos",
              errors,
              setData: (name, files) => setData("videos", files),
              defaultUrls: data.videos ?? [],
              required: false,
              fileType: "videos",
              accept: ".mp4,.mov,.avi,.webm",
              label: "Upload Video",
              description: "Upload puppy video (MP4, MOV, AVI, WebM)",
              innerText: "Drag and drop a video here, or click to upload"
            }
          ),
          errors.videos && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.videos })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: processing, type: "submit", className: "btn btn-primary d-flex align-items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-arrow-right.svg", alt: "urpuppy-img" }),
      " ",
      puppy_edit ? "Update Listing" : "Create Listing"
    ] })
  ] });
};
export {
  PuppyListingForm as P
};

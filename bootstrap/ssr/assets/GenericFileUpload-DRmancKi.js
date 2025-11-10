import { r as reactExports, j as jsxRuntimeExports } from "../ssr.js";
import { u as useDropzone } from "./index-BJOsIyUP.js";
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
const getExtensionsFromMimeType = (mimeType) => {
  const extensionMap = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/jpg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/gif": [".gif"],
    "image/webp": [".webp"],
    "video/mp4": [".mp4"],
    "video/quicktime": [".mov"],
    "video/mov": [".mov"],
    "video/avi": [".avi"],
    "video/webm": [".webm"],
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
  };
  return extensionMap[mimeType] || [];
};
const getAcceptString = (fileType, customAccept) => {
  if (customAccept) {
    const types = {};
    customAccept.split(",").forEach((type) => {
      type = type.trim();
      if (type.startsWith(".")) {
        const ext = type;
        const mimeType = getMimeTypeFromExtension(ext.substring(1));
        if (mimeType) {
          const category = mimeType.split("/")[0];
          const mimeKey = `${category}/*`;
          if (!types[mimeKey]) types[mimeKey] = [];
          if (!types[mimeKey].includes(ext)) {
            types[mimeKey].push(ext);
          }
        }
      } else if (type.includes("/*")) {
        const category = type.split("/")[0];
        if (category === "image") {
          types[type] = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        } else if (category === "video") {
          types[type] = [".mp4", ".mov", ".avi", ".webm"];
        } else if (category === "application") {
          types[type] = [".pdf", ".doc", ".docx"];
        }
      } else if (type.includes("/")) {
        const exts = getExtensionsFromMimeType(type);
        if (exts.length > 0) {
          if (!types[type]) types[type] = [];
          exts.forEach((ext) => {
            if (!types[type].includes(ext)) {
              types[type].push(ext);
            }
          });
        }
      }
    });
    return Object.keys(types).length > 0 ? types : void 0;
  }
  const acceptedTypes = getAcceptedFileTypes(fileType);
  if (acceptedTypes.length === 0) return void 0;
  const grouped = {};
  acceptedTypes.forEach((mimeType) => {
    const category = mimeType.split("/")[0];
    const mimeKey = `${category}/*`;
    const exts = getExtensionsFromMimeType(mimeType);
    if (exts.length > 0) {
      if (!grouped[mimeKey]) grouped[mimeKey] = [];
      exts.forEach((ext) => {
        if (!grouped[mimeKey].includes(ext)) {
          grouped[mimeKey].push(ext);
        }
      });
    }
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
    setPreviews((prev) => {
      const missingPreviews = {};
      files.forEach((file) => {
        if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
          const previewKey = file.__previewKey || `${file.name}-${file.size}-${file.lastModified}`;
          if (!prev[previewKey]) {
            const preview = createPreview(file);
            if (preview) {
              missingPreviews[previewKey] = preview;
              file.__previewKey = previewKey;
            }
          }
        }
      });
      if (Object.keys(missingPreviews).length > 0) {
        return { ...prev, ...missingPreviews };
      }
      return prev;
    });
  }, [files]);
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
    const validDefaultUrls = defaultUrls.filter((url) => typeof url === "string" && url.trim() !== "");
    const newUrls = validDefaultUrls.filter((url) => !initializedUrls.includes(url));
    if (newUrls.length === 0) return;
    const urlItemsToAdd = newUrls.map((url) => ({
      url,
      id: `url-${url}-${Date.now()}-${Math.random()}`
    }));
    setUrlItems((prev) => [...prev, ...urlItemsToAdd]);
    setInitializedUrls((prev) => [...prev, ...newUrls]);
  }, [defaultUrls.join(",")]);
  reactExports.useEffect(() => {
    if (defaultUrls.length > 0 || urlItems.length > 0) {
      const remainingUrls = urlItems.map((item) => item.url);
      setData(name, [...files, ...remainingUrls]);
    } else if (files.length > 0) {
      setData(name, files);
    }
  }, [files, urlItems, name]);
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
        setFiles((prevFiles) => {
          const newFiles = [...prevFiles, ...processedFiles];
          setUrlItems((prevUrlItems) => {
            const remainingUrls = prevUrlItems.map((item) => item.url);
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
        console.error("Error processing files:", error);
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
      const reasons = rejectedFiles.map((f) => f.errors.map((e) => e.message).join(", ")).join("; ");
      alert(`Some files were rejected: ${reasons}`);
    }
  });
  const inputProps = getInputProps();
  const mergedInputProps = {
    ...inputProps,
    name,
    // @ts-ignore - getInputProps may have internal ref handling, but we need to capture it
    ref: (node) => {
      hiddenInputRef.current = node;
    }
  };
  const handleRemove = reactExports.useCallback(
    (itemToRemove, e) => {
      e.stopPropagation();
      if (itemToRemove instanceof File) {
        const previewKey = itemToRemove.__previewKey || `${itemToRemove.name}-${itemToRemove.size}-${itemToRemove.lastModified}`;
        setPreviews((prev) => {
          const url = prev[previewKey];
          if (url && url.startsWith("blob:")) {
            URL.revokeObjectURL(url);
          }
          const newPreviews = { ...prev };
          delete newPreviews[previewKey];
          return newPreviews;
        });
        setFiles((prevFiles) => {
          const newFiles = prevFiles.filter((f) => f !== itemToRemove);
          setUrlItems((prevUrlItems) => {
            const remainingUrls = prevUrlItems.map((item) => item.url);
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
        setUrlItems((prevUrlItems) => {
          const newUrlItems = prevUrlItems.filter((item) => item.id !== itemToRemove.id);
          setInitializedUrls((prev) => prev.filter((url) => url !== itemToRemove.url));
          setFiles((prevFiles) => {
            const remainingUrls = newUrlItems.map((item) => item.url);
            setData(name, [...prevFiles, ...remainingUrls]);
            return prevFiles;
          });
          return newUrlItems;
        });
      }
    },
    [name, setData]
  );
  const handleAddMoreClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    open();
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...mergedInputProps }),
          isLoading || isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-message", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-message-text", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner-border spinner-border-sm me-2", role: "status", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "visually-hidden", children: "Loading..." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: isLoading ? "Loading files..." : "Processing files..." })
          ] }) }) : files.length === 0 && urlItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-message", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-message-text", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1", children: innerText || "Drop files here or click to upload" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted small", children: [
              acceptConfig && Object.keys(acceptConfig).length > 0 ? `Accepted: ${Object.keys(acceptConfig).map((key) => {
                var _a;
                const category = key.replace("/*", "");
                const extensions = ((_a = acceptConfig[key]) == null ? void 0 : _a.join(", ")) || "";
                return category.charAt(0).toUpperCase() + category.slice(1) + (extensions ? ` (${extensions})` : "");
              }).join(", ")}` : "All file types accepted",
              maxSize && ` • Max size: ${formatFileSize(maxSize)}`
            ] })
          ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-preview-container mt-0", children: [
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
              const previewKey = file.__previewKey || `${file.name}-${file.size}-${file.lastModified}`;
              const previewUrl = previews[previewKey] || null;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-preview dz-file-preview", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-image", children: [
                  previewUrl ? file.type.startsWith("image/") ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: previewUrl,
                      alt: file.name,
                      style: { display: "block", width: "100%", height: "100%", objectFit: "cover" },
                      onError: (e) => {
                        e.target.style.display = "none";
                        const fallback = e.target.nextElementSibling;
                        if (fallback) fallback.classList.remove("d-none");
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
              ] }, `${file.name}-${file.size}-${file.lastModified}-${index}`);
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
export {
  GenericFileUpload as G
};

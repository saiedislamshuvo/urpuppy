import { r as reactExports, j as jsxRuntimeExports } from "../ssr.js";
import { u as useDropzone } from "./SelectInput-DvSD7_5Y.js";
import { B as Button } from "./Button-C_TFTgI3.js";
function FileUpload({
  required,
  name,
  setData,
  errors,
  defaultFiles = [],
  defaultUrls = []
}) {
  const hiddenInputRef = reactExports.useRef(null);
  const [files, setFiles] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [initializedUrls, setInitializedUrls] = reactExports.useState([]);
  const isFileSizeValid = (file) => {
    const maxSize = 50 * 1024 * 1024;
    return file.size <= maxSize;
  };
  const urlToFile = async (url) => {
    if (typeof url !== "string" || url.trim() === "") {
      throw new Error("Invalid URL: URL must be a non-empty string.");
    }
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split("/").pop() || "image";
      const fileExtension = blob.type.split("/")[1] || "jpg";
      return new File([blob], `${filename}.${fileExtension}`, { type: blob.type });
    } catch (error) {
      console.error(`Error converting URL to File:`, error);
      throw error;
    }
  };
  reactExports.useEffect(() => {
    const validDefaultUrls = defaultUrls.filter((url) => typeof url === "string" && url.trim() !== "");
    const newUrls = validDefaultUrls.filter((url) => !initializedUrls.includes(url));
    if (newUrls.length === 0) return;
    const loadUrlFiles = async () => {
      setIsLoading(true);
      try {
        const filePromises = newUrls.map((url) => urlToFile(url));
        const loadedFiles = await Promise.all(filePromises);
        setFiles((prevFiles) => {
          const newFiles = [...prevFiles, ...loadedFiles];
          setData(name, newFiles);
          if (hiddenInputRef.current) {
            const dataTransfer = new DataTransfer();
            newFiles.forEach((file) => {
              dataTransfer.items.add(file);
            });
            hiddenInputRef.current.files = dataTransfer.files;
          }
          return newFiles;
        });
        setInitializedUrls((prev) => [...prev, ...newUrls]);
      } catch (error) {
        console.error("Error loading files from URLs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUrlFiles();
  }, [defaultUrls.join(",")]);
  const onDrop = reactExports.useCallback(
    (incomingFiles) => {
      const validFiles = incomingFiles.filter((file) => isFileSizeValid(file));
      if (validFiles.length !== incomingFiles.length) {
        alert("Some files were rejected because they exceed the 50MB size limit.");
      }
      const newFiles = [...files, ...validFiles];
      setFiles(newFiles);
      setData(name, newFiles);
      if (hiddenInputRef.current) {
        const dataTransfer = new DataTransfer();
        newFiles.forEach((v) => {
          dataTransfer.items.add(v);
        });
        hiddenInputRef.current.files = dataTransfer.files;
      }
    },
    [files, name, setData]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 50 * 1024 * 1024,
    // 50MB in bytes
    onDropRejected: (rejectedFiles) => {
      alert("Some files were rejected because they exceed the 50MB size limit.");
    }
  });
  const handleRemove = reactExports.useCallback(
    (fileToRemove, e) => {
      e.stopPropagation();
      const newFiles = files.filter((f) => f !== fileToRemove);
      setFiles(newFiles);
      setData(name, newFiles);
      if (hiddenInputRef.current) {
        const dataTransfer = new DataTransfer();
        newFiles.forEach((v) => {
          dataTransfer.items.add(v);
        });
        hiddenInputRef.current.files = dataTransfer.files;
      }
    },
    [files, name, setData]
  );
  const handleAddMoreClick = (e) => {
    e.preventDefault();
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...getRootProps(), className: `dropzone ${isDragActive ? "dz-drag-hover" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "file",
          name,
          style: { opacity: 0, position: "absolute" },
          ref: hiddenInputRef,
          multiple: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...getInputProps() }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-message", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-message-text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading images..." }) }) }) : files.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-message", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-message-text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Drop files here or click to upload" }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-preview-container", children: files.map((file, index) => {
        const errorKey = `${name}.${index}`;
        const fileError = (errors == null ? void 0 : errors[errorKey]) ?? null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-preview dz-file-preview", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-image", children: file.type.startsWith("image/") ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: URL.createObjectURL(file), alt: file.name }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-file-representation", children: "📄" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-details", children: fileError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-danger", style: { color: "red", marginTop: "5px", padding: "5px" }, children: fileError }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "dz-remove",
              onClick: (e) => handleRemove(file, e),
              role: "button",
              tabIndex: 0,
              children: "✕"
            }
          )
        ] }, file.name + file.size);
      }) })
    ] }),
    files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: handleAddMoreClick, style: { marginTop: "20px" }, children: "Add More Files" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .dropzone {
          border: 2px dashed #0087F7;
          border-radius: 5px;
          background: white;
          min-height: 150px;
          padding: 20px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dropzone.dz-drag-hover {
          border-color: #00a65a;
          background: #f0f9ff;
        }

        .dz-message {
          text-align: center;
          margin: 2em 0;
        }

        .dz-message-text {
          margin-bottom: 1em;
        }

        .dz-preview-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .dz-preview {
          background: white;
          border-radius: 4px;
          border: 1px solid #ddd;
          padding: 6px;
          position: relative;
        }

        .dz-image {
          width: 100%;
          height: 120px;
          overflow: hidden;
          border-radius: 4px;
          background: #f6f6f6;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dz-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .dz-file-representation {
          font-size: 48px;
          color: #666;
        }

        .dz-details {
          font-size: 13px;
        }

        .dz-filename {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 4px;
        }

        .dz-size {
          color: #666;
          font-size: 12px;
        }

        .dz-remove {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 20px;
          height: 20px;
          background: #ff0000;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 12px;
          font-weight: bold;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .dz-preview:hover .dz-remove {
          opacity: 1;
        }

        button {
          background-color: #0087f7;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #005bb5;
        }
      ` })
  ] });
}
export {
  FileUpload as F
};

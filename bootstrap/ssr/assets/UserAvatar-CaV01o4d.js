import { r as reactExports, q, j as jsxRuntimeExports, f as fe } from "../ssr.js";
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
const AvatarInput = ({ onChange }) => {
  const fileInputRef = reactExports.useRef(null);
  const user = q().props.auth.user;
  const [imagePreview, setImagePreview] = reactExports.useState(user.avatar);
  const handleFileChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        var _a2;
        if ((_a2 = e.target) == null ? void 0 : _a2.result) {
          setImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
    if (onChange) {
      onChange(event);
    }
  };
  const handleDeletePicture = (e) => {
    if (typeof window === "undefined") return;
    if (!window.confirm("Are you sure you want to delete your profile picture?")) {
      return;
    }
    e.preventDefault();
    setImagePreview("");
    if (fileInputRef.current) {
      fe.delete(`/profile/avatar`);
      fileInputRef.current.value = "";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-md-flex align-items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "d-block round-120 flex-shrink-0 position-relative overflow-hidden rounded-circle mb-3 mb-md-0 ", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "d-flex align-items-center justify-content-center bg-secondary border border-1 text-white w-100 h-100",
        style: { position: "relative" },
        children: imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: imagePreview,
            id: "image-preview",
            alt: "Preview",
            className: "object-fit-cover w-100 h-100"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "No image" })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-sm-flex align-items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "position-relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            className: "custom-file-label btn btn-primary",
            htmlFor: "file-upload",
            children: "Change Picture"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileInputRef,
            className: "form-control change-img-preview",
            type: "file",
            id: "file-upload",
            placeholder: "Change Picture",
            onChange: handleFileChange,
            style: { display: "none" }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          rel: "nofollow",
          className: "btn btn-outline-extralight border btn-white text-dark d-block",
          href: "#",
          onClick: handleDeletePicture,
          children: "Delete Picture"
        }
      )
    ] })
  ] });
};
export {
  AvatarInput as default
};

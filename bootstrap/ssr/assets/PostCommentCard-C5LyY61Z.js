import { j as jsxRuntimeExports } from "../ssr.js";
import { A as Avatar } from "./Avatar-Bsv7zAP7.js";
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
const PostCommentCard = ({
  comment
}) => {
  var _a, _b, _c;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { image_url: (_a = comment.reviewer) == null ? void 0 : _a.avatar, size: "sm", initial_name: (_b = comment.reviewer) == null ? void 0 : _b.initial_name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center  gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          fontWeight: "500",
          color: "rgba(8, 49, 78, 1)"
        }, className: "fs-3", children: (_c = comment.reviewer) == null ? void 0 : _c.full_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-circle", style: {
          backgroundColor: "rgba(8, 49, 78, 0.4)",
          width: "4px",
          height: "4px"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: comment.review_on })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: comment.body })
    ] }) })
  ] }) }) });
};
export {
  PostCommentCard as default
};

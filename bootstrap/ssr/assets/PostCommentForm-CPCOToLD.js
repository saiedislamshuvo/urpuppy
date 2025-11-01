import { S as Se, j as jsxRuntimeExports } from "../ssr.js";
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
const PostCommentForm = ({ post_id }) => {
  const { data, setData, post, reset } = Se({
    body: ""
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: (e) => {
    e.preventDefault();
    post(
      `/posts/${post_id}/comment`,
      {
        preserveScroll: true
      }
    );
    reset("body");
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 position-relative post-reviews", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        value: data.body,
        onChange: (e) => {
          const value = e.target.value.replace(/\n/g, "").slice(0, 255);
          setData("body", value);
        },
        onKeyDown: (e) => {
          if (e.key === "Enter") e.preventDefault();
        },
        className: "form-control rounded-2 pe-5",
        id: "exampleFormControlTextarea1",
        placeholder: "Write a review",
        maxLength: 255,
        style: { resize: "none", whiteSpace: "nowrap", overflow: "hidden", height: "150px" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: "btn btn-primary position-absolute d-inline-flex align-items-center gap-2",
        style: {
          bottom: "0.75rem",
          right: "0.75rem"
        },
        children: "Submit Comment"
      }
    )
  ] }) }) });
};
export {
  PostCommentForm as default
};

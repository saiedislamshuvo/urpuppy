import { j as jsxRuntimeExports, J as Je, f as fe } from "../ssr.js";
import { P as PuppyCard } from "./Card-C5cxi3h3.js";
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
import "./Tooltip-fHI3Ksjq.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./index-DbhDZzck.js";
const MyPuppies = ({ puppies }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: (puppies == null ? void 0 : puppies.data) && puppies.data.length ? puppies == null ? void 0 : puppies.data.map((puppy) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-md-6 col-lg-5 col-xl-5 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyCard, { className: "", puppy }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Edit", className: "btn btn-primary mt-2 btn-sm", style: { marginRight: "4px" }, href: `/seller/create/${puppy.id}`, children: "Edit " }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Je,
      {
        "aria-label": "Delete",
        href: "/subscriptions",
        method: "delete",
        as: "button",
        onClick: (e) => {
          e.preventDefault();
          if (window.confirm("Are you sure?")) {
            fe.delete(`/seller/delete/${puppy.id}`);
          }
        },
        "data-bs-toggle": "modal",
        "data-bs-target": "#CancelPlan",
        className: "btn btn-secondary btn-sm mt-2 ",
        children: "Delete"
      }
    )
  ] }, puppy.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-8 text-center py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: "/images/svgs/icon-paws-dark.svg",
        alt: "My Puppies",
        width: "120",
        height: "120",
        className: "text-muted"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "h4 mb-3", children: "No puppies listed yet" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-4", children: "Start listing your puppies to reach potential buyers!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Je,
      {
        href: "/seller/create",
        className: "btn btn-primary",
        "aria-label": "Create new puppy listing",
        children: "List Your First Puppy"
      }
    )
  ] }) }) }) }) });
};
export {
  MyPuppies as default
};

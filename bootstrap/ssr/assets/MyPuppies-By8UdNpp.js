import { j as jsxRuntimeExports, J as Je, f as fe } from "../ssr.js";
import { P as PuppyCard } from "./Card-CnUy_aL9.js";
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
import "./Tooltip-BCRubnSZ.js";
import "./floating-ui.dom-D9vmQZx1.js";
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
  ] }, puppy.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-4", children: "No puppies found.." }) }) });
};
export {
  MyPuppies as default
};

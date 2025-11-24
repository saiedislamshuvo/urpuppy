import { j as jsxRuntimeExports, J as Je, f as fe } from "../ssr.js";
import { P as PuppyCard } from "./Card-B4vz22uj.js";
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
import "./Tooltip-BuYpnPkl.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./index-DbhDZzck.js";
const MyPuppies = ({ puppies }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: (puppies == null ? void 0 : puppies.data) && puppies.data.length ? puppies == null ? void 0 : puppies.data.map((puppy) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-md-6 col-lg-5 col-xl-5 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyCard, { className: "", puppy }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Edit", className: "btn btn-primary mt-2 btn-sm", style: { marginRight: "4px" }, href: `/puppies-listing/${puppy.id}/edit`, children: "Edit " }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        "aria-label": puppy.is_sold === true ? "Unmark as Sold" : "Mark as Sold",
        onClick: (e) => {
          e.preventDefault();
          if (puppy.is_sold === true) {
            fe.post(`/puppies-listing/${puppy.id}/unmark-sold`, {}, {
              preserveScroll: true,
              onSuccess: () => {
              }
            });
          } else {
            fe.post(`/puppies-listing/${puppy.id}/mark-sold`, {}, {
              preserveScroll: true,
              onSuccess: () => {
              }
            });
          }
        },
        className: `btn btn-sm mt-2 ${puppy.is_sold === true ? "btn-outline-secondary" : "btn-secondary"}`,
        style: { marginRight: "4px" },
        children: puppy.is_sold === true ? "Unmark as Sold" : "Mark as Sold"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Je,
      {
        "aria-label": "Delete",
        href: "/profile",
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
        className: "btn btn-danger btn-sm mt-2 ",
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
        href: "/puppies-listing/create",
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

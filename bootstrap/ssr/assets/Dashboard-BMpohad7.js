import { j as jsxRuntimeExports } from "../ssr.js";
import { D as DashboardLayout } from "./DashboardLayout-DchRuGZY.js";
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
import "./Layout-Drj2wi7W.js";
import "./index-DzrIk5T7.js";
import "./MetaTags-D4JDM_I7.js";
function Dashboard({
  user,
  statistics
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { activeTab: "Dashboard", metaTitle: "Dashboard", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 mb-md-5", children: "Dashboard" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4 col-md-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { image_url: user.avatar, initial_name: user.initial_name, size: "sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-0", children: user.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-0 fs-2 d-flex align-items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-mail-dark.svg", alt: "urpuppy-img", width: "14" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { rel: "nofollow", className: "text-muted", href: "mailto:support@urpuppy.com", children: user.email })
        ] })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-3 col-md-6 mb-4 mb-md-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border h-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-muted mb-2 fs-4", children: "Total Puppies" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-primary mb-0", children: statistics.total_puppies }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-0 fs-3 mt-2", children: "All your puppy listings" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-3 col-md-6 mb-4 mb-md-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border h-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-muted mb-2 fs-4", children: "Published" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-success mb-0", children: statistics.published_puppies }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-0 fs-3 mt-2", children: "Live and visible to buyers" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-3 col-md-6 mb-4 mb-md-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border h-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-muted mb-2 fs-4", children: "Pending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-warning mb-0", children: statistics.pending_puppies }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-0 fs-3 mt-2", children: "Drafts awaiting publication" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-3 col-md-6 mb-4 mb-md-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border h-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-muted mb-2 fs-4", children: "Expired" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-danger mb-0", children: statistics.expired_puppies }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-0 fs-3 mt-2", children: "Listings older than 6 months" })
      ] }) }) })
    ] })
  ] });
}
export {
  Dashboard as default
};

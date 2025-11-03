import { j as jsxRuntimeExports } from "../ssr.js";
import { B as Breadcrumb } from "./Breadcrumb-D8nxHqVE.js";
import { C as CheckoutV2Form } from "./CheckoutV2Form-BdnFj7aE.js";
import { H as Heading } from "./Heading-vwwW7yNV.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { P as PlanCard } from "./PlanCard-otVviZqT.js";
import { L as Layout } from "./Layout-BlHTUbAr.js";
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
import "./index-BbhV0dfa.js";
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
const Checkout = ({ plan_id, intent, plan, discount }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { navType: "secondary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: "Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-wrapper position-relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "information pt-4 pb-8 pb-lg-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { links: [{ label: "Plan", link: "/plans" }, { label: "Checkout", link: "/checkout" }] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PlanCard, { button: false, plan, discount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { title: "Checkout", description: "Checkout now" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutV2Form, { clientSecret: intent == null ? void 0 : intent.client_secret, plan_id })
      ] })
    ] }) }) })
  ] });
};
export {
  Checkout as default
};

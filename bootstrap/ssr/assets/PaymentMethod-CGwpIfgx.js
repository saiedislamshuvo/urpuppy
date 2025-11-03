import { j as jsxRuntimeExports } from "../ssr.js";
import { B as Breadcrumb } from "./Breadcrumb-D8nxHqVE.js";
import { H as Heading } from "./Heading-vwwW7yNV.js";
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
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
const PaymentMethodForm = ({ payment_methods }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "PaymentMethod" });
};
const PaymentMethod = ({ payment_methods }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { navType: "secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-wrapper position-relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "information pt-4 pb-8 pb-lg-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { links: [{ label: "Plan", link: "/" }, { label: "Checkout", link: "/checkout" }] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { title: "Checkout", description: "Create a new listing for your puppy." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PaymentMethodForm,
        {
          payment_methods
        }
      )
    ] })
  ] }) }) }) });
};
export {
  PaymentMethod as default
};

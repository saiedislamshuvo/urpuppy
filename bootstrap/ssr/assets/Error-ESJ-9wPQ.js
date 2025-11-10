import { j as jsxRuntimeExports, J as Je } from "../ssr.js";
import { G as Guest } from "./GuestLayout-CHYZF_0f.js";
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
import "./Card-Kjm6uc3j.js";
import "./Tooltip-fHI3Ksjq.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./index-DbhDZzck.js";
import "./index-DzrIk5T7.js";
function ErrorPage({ status, puppy }) {
  const title = {
    503: "503: Service Unavailable",
    500: "500: Server Error",
    404: "404: Page Not Found",
    403: "403: Forbidden"
  }[status];
  const description = {
    503: "Sorry, we are doing some maintenance. Please check back soon.",
    500: "Whoops, something went wrong on our servers.",
    404: "Sorry, the page you are looking for could not be found.",
    403: "Sorry, you are forbidden from accessing this page."
  }[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Guest, { puppy, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: description }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Go back", href: "/", children: "Go back" })
  ] });
}
export {
  ErrorPage as default
};

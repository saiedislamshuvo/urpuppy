import { S as Se, q, T as Te, j as jsxRuntimeExports, a as je, J as Je } from "../ssr.js";
import { B as Button } from "./Button-C_TFTgI3.js";
import { G as Guest } from "./GuestLayout-BKODJEbB.js";
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
import "./Card-C5cxi3h3.js";
import "./Tooltip-fHI3Ksjq.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./index-DbhDZzck.js";
import "./index-DzrIk5T7.js";
function VerifyEmail({ status, puppy }) {
  var _a, _b, _c, _d, _e, _f;
  const { post } = Se({});
  const is_breeder = (_c = (_b = (_a = q().props) == null ? void 0 : _a.auth) == null ? void 0 : _b.user) == null ? void 0 : _c.is_breeder;
  const is_seller = (_f = (_e = (_d = q().props) == null ? void 0 : _d.auth) == null ? void 0 : _e.user) == null ? void 0 : _f.is_seller;
  const roles = [is_breeder ? "breeder" : is_seller ? "seller" : "buyer"];
  Te(3e3, { only: ["status"] });
  const submit = (e) => {
    e.preventDefault();
    post("/email/verification-notification");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Guest, { header: "Email Verification", puppy, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(je, { title: "Email Verification" }),
    (roles == null ? void 0 : roles.includes("breeder")) ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Thank you for signing up for our breeder directory. To get started, please verify your email by clicking the link in the email we just sent you." }) }) : (roles == null ? void 0 : roles.includes("seller")) ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Thank you for signing up for a seller account. To get started, please verify your email by clicking the link in the email we just sent you." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Thank you for signing up for a buyer account. To get started, please verify your email by clicking the link in the email we just sent you." }) }),
    status === "verification-link-sent" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 mb-2", children: "Didn't receive it?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: " d-flex justify-content-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", href: "", children: "Resend Verification Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Je,
          {
            "aria-label": "Log Out",
            href: "/logout",
            method: "post",
            as: "button",
            className: "btn btn-secondary",
            children: "Log Out"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-4", children: "Need help? Contact us anytime!" })
    ] })
  ] });
}
export {
  VerifyEmail as default
};

import { q, r as reactExports, j as jsxRuntimeExports, a as je, J as Je, f as fe } from "../ssr.js";
import { P as PuppyCard } from "./Card-Kjm6uc3j.js";
import { R as RegistrationForm } from "./RegistrationForm-CMgpjXyH.js";
import { V as Vt } from "./index-DzrIk5T7.js";
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
import "./InputError-BrGvvBAw.js";
import "./InputLabel-DAgP54zY.js";
import "./TextInput-CTPfMhdJ.js";
import "./Button-C_TFTgI3.js";
function RegisterBreeder({ puppy }) {
  const { flash } = q().props;
  reactExports.useEffect(() => {
    var _a;
    if ((_a = flash == null ? void 0 : flash.message) == null ? void 0 : _a.success) {
      Vt.success(flash.message.success, {
        duration: 3e3
      });
    }
  }, [flash]);
  reactExports.useEffect(() => {
    var _a;
    if ((_a = flash == null ? void 0 : flash.message) == null ? void 0 : _a.error) {
      Vt.error(flash.message.error, {
        duration: 3e3
      });
    }
  }, [flash]);
  const handleRoleChange = (e) => {
    const role = e.target.value;
    if (role === "buyer") {
      fe.visit("/register");
    } else if (role === "seller") {
      fe.visit("/register-seller");
    } else if (role === "breeder") {
      fe.visit("/register-breeder");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(je, { title: "Register Breeder" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "page-wrapper login-bg position-relative overflow-hidden min-vh-100 d-flex align-items-center justify-content-center",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card position-relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-7 order-last order-lg-first", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-info d-flex flex-column justify-content-center h-100 py-5 px-3 ps-lg-0 position-relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Breeder Registration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 pb-2", children: "Become a Part of Our Breeding Community – List Your Business!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RegistrationForm,
              {
                role: "breeder",
                title: "Breeder Registration",
                description: "Become a Part of Our Breeding Community – List Your Business!"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-5 order-first order-lg-last", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "login-right-bg signup-right-bg position-relative overflow-hidden h-100 d-flex align-items-center justify-content-center p-4 p-lg-5 pt-9",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 pb-2 position-absolute top-0 start-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    className: "form-select",
                    value: "buyer",
                    onChange: handleRoleChange,
                    "aria-label": "Select registration type",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "buyer", children: "Buyer" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "seller", children: "Seller" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "breeder", children: "Breeder" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 pb-0 position-absolute top-0 end-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Home", href: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/logos/logo-white.svg", alt: "logo-white" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card login-right-card mb-0 mt-3 mt-md-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyCard, { puppy, className: "puppy-spotlight-item rounded-1 overflow-hidden" }, puppy == null ? void 0 : puppy.id) }) })
              ]
            }
          ) })
        ] }) }) })
      }
    )
  ] });
}
export {
  RegisterBreeder as default
};

import { S as Se, q, r as reactExports, j as jsxRuntimeExports, a as je, J as Je } from "../ssr.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
import { I as InputLabel } from "./InputLabel-DAgP54zY.js";
import { P as PuppyCard } from "./Card-IvUDPQVf.js";
import { T as TextInput } from "./TextInput-CTPfMhdJ.js";
import { B as Button } from "./Button-C_TFTgI3.js";
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
import "./Tooltip-BCRubnSZ.js";
import "./floating-ui.dom-D9vmQZx1.js";
import "./index-DbhDZzck.js";
function RegisterBreeder({ puppy }) {
  const { data, setData, post, processing, errors, reset } = Se({
    first_name: "",
    last_name: "",
    email: "",
    email_confirmation: "",
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post("/register/breeder", {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  const { flash } = q().props;
  reactExports.useEffect(() => {
    var _a;
    if ((_a = flash == null ? void 0 : flash.message) == null ? void 0 : _a.success) {
      Vt.success(
        flash.message.success,
        {
          duration: 3e3
        }
      );
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(je, { title: "Register Breeder" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "page-wrapper login-bg position-relative overflow-hidden min-vh-100 d-flex align-items-center justify-content-center",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card position-relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-7 order-last order-lg-first", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-info d-flex flex-column justify-content-center h-100 py-5 px-3 ps-lg-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Breeder Registration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 pb-2", children: "Become a Part of Our Breeding Community – List Your Business!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { htmlFor: "name", value: "First Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TextInput,
                    {
                      id: "first_name",
                      name: "first_name",
                      value: data.first_name,
                      autoComplete: "name",
                      isFocused: true,
                      onChange: (e) => setData("first_name", e.target.value),
                      required: true
                    }
                  ),
                  errors.first_name && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.first_name })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { htmlFor: "name", value: "Last Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TextInput,
                    {
                      id: "last_name",
                      name: "last_name",
                      value: data.last_name,
                      autoComplete: "last_name",
                      isFocused: true,
                      onChange: (e) => setData("last_name", e.target.value),
                      required: true
                    }
                  ),
                  errors.last_name && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.last_name })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { htmlFor: "email", value: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TextInput,
                  {
                    name: "email",
                    value: data.email,
                    type: "email",
                    autoComplete: "name",
                    isFocused: true,
                    onChange: (e) => setData("email", e.target.value),
                    required: true
                  }
                ),
                errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.email })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { htmlFor: "email_confirmation", value: "Confirm Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TextInput,
                  {
                    id: "email_confirmation",
                    type: "email",
                    name: "email_confirmation",
                    value: data.email_confirmation,
                    autoComplete: "email_confirmation",
                    isFocused: true,
                    onChange: (e) => setData("email_confirmation", e.target.value),
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { htmlFor: "password", value: "Password" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TextInput,
                    {
                      id: "password",
                      name: "password",
                      value: data.password,
                      type: "password",
                      autoComplete: "password",
                      isFocused: true,
                      onChange: (e) => setData("password", e.target.value),
                      required: true
                    }
                  ),
                  errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.password })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TextInput,
                    {
                      id: "password_confirmation",
                      name: "password_confirmation",
                      value: data.password_confirmation,
                      type: "password",
                      autoComplete: "password_confirmation",
                      isFocused: true,
                      onChange: (e) => setData("password_confirmation", e.target.value),
                      required: true
                    }
                  )
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4", children: [
                "By signing up for a urpuppy account, you confirm that you have read, understand and agreed ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Terms of Service", className: "text-decoration-underline fw-semibold", href: "/terms-of-use", children: "Terms of Service" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: processing, size: "full", href: "", type: "button", children: "Signup" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fs-4 mb-0", children: "I already have an account?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Login", className: "text-dark fw-semibold text-decoration-underline ms-2", href: "/login", children: "Login" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-5 order-first order-lg-last", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "login-right-bg signup-right-bg position-relative overflow-hidden h-100 d-flex align-items-center justify-content-center p-4 p-lg-5 pt-9",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 pb-0 position-absolute top-0 end-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Home", href: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/logos/logo-white.svg", alt: "logo-white" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card login-right-card mb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyCard, { puppy, className: "puppy-spotlight-item rounded-1 overflow-hidden" }, puppy == null ? void 0 : puppy.id) }) })
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

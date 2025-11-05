import { S as Se, j as jsxRuntimeExports, a as je, J as Je } from "../ssr.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
import { I as InputLabel } from "./InputLabel-DAgP54zY.js";
import { T as TextInput } from "./TextInput-CTPfMhdJ.js";
import { B as Button } from "./Button-C_TFTgI3.js";
import { G as Guest } from "./GuestLayout-B4_hA4Jc.js";
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
import "./Card-CnUy_aL9.js";
import "./Tooltip-BCRubnSZ.js";
import "./floating-ui.dom-D9vmQZx1.js";
import "./index-DbhDZzck.js";
import "./index-DzrIk5T7.js";
function ForgotPassword({ status, puppy }) {
  const { data, setData, post, errors, reset } = Se({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post("/forgot-password");
    reset();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Guest, { puppy, header: "Forgot Password", subHeader: "\n                Forgot your password? No problem. Just let us know your email\n                address and we will email you a password reset link that will\n                allow you to choose a new one.\n            ", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(je, { title: "Forgot Password" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Email Address" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TextInput,
        {
          id: "email",
          type: "email",
          name: "email",
          value: data.email,
          placeholder: "user@example.com",
          isFocused: true,
          onChange: (e) => setData("email", e.target.value)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.email, className: "mt-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { href: "", type: "button", className: "btn mt-3 btn-primary w-100 mb-3", children: "Email Password Reset Link" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fs-4 mb-0", children: "I have an account?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Login", className: "text-dark fw-semibold text-decoration-underline ms-2", href: "/login", children: "Login" })
    ] })
  ] });
}
export {
  ForgotPassword as default
};

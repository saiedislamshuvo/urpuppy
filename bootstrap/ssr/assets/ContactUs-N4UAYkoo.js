import { S as Se, j as jsxRuntimeExports } from "../ssr.js";
import { H as Hero } from "./Hero-D_7BoKIM.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { T as TextInput } from "./TextInput-CTPfMhdJ.js";
import { L as Layout } from "./Layout-q9Zm-kbI.js";
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
const ContactUs = ({ url }) => {
  const { data, setData, reset, post, errors } = Se({
    first_name: "",
    last_name: "",
    email: "",
    account_type: "seller",
    subject: "",
    message: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/contact-us");
    reset();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { url, title: "Contact us" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { title: "Contact us", bgImage: "/images/contact/contact-bg.jpg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "get-in-touch py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row align-items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6 border-end pe-xl-10 order-last order-lg-first", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contact-form pe-xl-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "fs-10 mb-4 mb-lg-8", children: "Get in Touch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { action: "", onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "First Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { value: data.first_name, onChange: (e) => setData("first_name", e.target.value) }),
              errors.first_name && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.first_name })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Last Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { value: data.last_name, onChange: (e) => setData("last_name", e.target.value) }),
              errors.last_name && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.last_name })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { type: "email", value: data.email, onChange: (e) => setData("email", e.target.value) }),
              errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.email })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Account Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: data.account_type, onChange: (e) => setData("account_type", e.target.value), className: "form-select shadow-none", "aria-label": "Default select example", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "seller", children: "Seller" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "breeder", children: "Breeder" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "buyer", children: "Buyer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "general_inquiry", children: "General Inquiry" })
              ] }),
              errors.account_type && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.account_type })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Subject" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { value: data.subject, onChange: (e) => setData("subject", e.target.value) }),
              errors.subject && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.subject })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Message" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: data.message, onChange: (e) => setData("message", e.target.value), rows: 3, className: "h-20 form-control rounded-1", id: "Message", placeholder: "" }),
              errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.message })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn btn-primary w-100", children: "Submit" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6 ps-xl-10 order-first order-lg-last mb-7 mb-lg-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "position-relative overflow-hidden rounded-1 ps-xl-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/images/contact/contact-img.jpg",
          alt: "contact-image",
          className: "w-100 h-auto object-fit-cover rounded-1"
        }
      ) }) })
    ] }) }) })
  ] });
};
export {
  ContactUs as default
};

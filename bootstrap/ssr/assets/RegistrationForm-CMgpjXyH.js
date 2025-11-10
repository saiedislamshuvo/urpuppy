import { S as Se, r as reactExports, j as jsxRuntimeExports, J as Je } from "../ssr.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
import { I as InputLabel } from "./InputLabel-DAgP54zY.js";
import { T as TextInput } from "./TextInput-CTPfMhdJ.js";
import { B as Button } from "./Button-C_TFTgI3.js";
const roleConfig = {
  buyer: {
    title: "Buyer Registration",
    description: "Explore the best dog breeds! Signup to discover more.",
    endpoint: "/register/buyer"
  },
  seller: {
    title: "Seller Registration",
    description: "Explore the best dog breeds! Signup to discover more.",
    endpoint: "/register/seller"
  },
  breeder: {
    title: "Breeder Registration",
    description: "Become a Part of Our Breeding Community – List Your Business!",
    endpoint: "/register/breeder"
  }
};
function RegistrationForm({ role, title, description }) {
  const { data, setData, post, processing, errors, reset } = Se({
    first_name: "",
    last_name: "",
    email: "",
    email_confirmation: "",
    password: "",
    password_confirmation: ""
  });
  const [loading, setLoading] = reactExports.useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (role === "seller") {
      setLoading(true);
    }
    post(roleConfig[role].endpoint, {
      onFinish: () => {
        reset("password", "password_confirmation");
        if (role === "seller") {
          setLoading(false);
        }
      },
      onSuccess: () => {
        if (role === "seller") {
          setLoading(false);
        }
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, children: [
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
      "By signing up for a urpuppy account, you confirm that you have read, understand and agreed",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Je,
        {
          "aria-label": "Terms of Service",
          className: "text-decoration-underline fw-semibold",
          href: "/terms-of-use",
          children: "Terms of Service"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        disabled: processing,
        loading: role === "seller" ? loading : void 0,
        size: "full",
        href: "",
        type: "button",
        children: "Signup"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fs-4 mb-0", children: "I already have an account?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Je,
        {
          "aria-label": "Login",
          className: "text-dark fw-semibold text-decoration-underline ms-2",
          href: "/login",
          children: "Login"
        }
      )
    ] })
  ] });
}
export {
  RegistrationForm as R
};

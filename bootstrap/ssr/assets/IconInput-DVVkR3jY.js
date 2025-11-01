import { j as jsxRuntimeExports } from "../ssr.js";
const IconInput = ({ icon, onChange, value }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dropdown", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: "btn btn-secondary p-0 shadow-none bg-white border d-flex align-items-center justify-content-center round-36 rounded-circle flex-shrink-0",
        "data-bs-toggle": "dropdown",
        "aria-expanded": "false",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: icon, alt: "urpuppy-img" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "ul",
      {
        className: "dropdown-menu dropdown-menu-end social-icon px-6 shadow-sm",
        style: { minWidth: "max-content" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange, type: "text", name: "ContactPerson", id: "ContactPerson", className: "form-control" })
      }
    )
  ] });
};
export {
  IconInput as I
};

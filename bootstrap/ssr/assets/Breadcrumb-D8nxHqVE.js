import { j as jsxRuntimeExports, J as Je } from "../ssr.js";
const Breadcrumb = ({
  links = []
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "breadcrumb", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "breadcrumb align-items-center mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "breadcrumb-item fw-semibold d-flex align-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { className: "text-dark d-flex align-items-center", href: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-home.svg", alt: "urpuppy-img", width: "16", height: "16" }) }) }),
    links.map((link, index) => {
      const isLast = index === links.length - 1;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "li",
        {
          className: `breadcrumb-item fw-semibold d-flex align-items-center ${isLast ? "active" : ""}`,
          "aria-current": isLast ? "page" : void 0,
          children: isLast ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", children: link.label }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { className: "text-dark d-flex align-items-center", href: (link == null ? void 0 : link.link) ?? "", children: link.label })
        },
        index
      );
    })
  ] }) });
};
export {
  Breadcrumb as B
};

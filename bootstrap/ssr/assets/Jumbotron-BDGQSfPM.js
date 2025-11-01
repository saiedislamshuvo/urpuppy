import { j as jsxRuntimeExports } from "../ssr.js";
const Jumbotron = ({ title, description, image }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "get-started-today p-4 p-lg-5 pe-0 pe-lg-0 bg-primary rounded-1 overflow-hidden bg-opacity-25", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row align-items-center justify-content-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-5 mb-8 mb-lg-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pe-4 pe-lg-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fs-4", children: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          rel: "nofollow",
          href: "#",
          className: "link text-decoration-underline fs-4 text-dark fw-semibold d-flex align-items-center gap-6",
          children: [
            "Subscribe Now",
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "15", viewBox: "0 0 16 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M1 7.5H15M15 7.5L9 13.5M15 7.5L9 1.5", stroke: "#08314E", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-5 me-n1 text-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: "urpuppy-img" }) })
  ] }) });
};
export {
  Jumbotron as J
};

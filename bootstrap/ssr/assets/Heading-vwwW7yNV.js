import { j as jsxRuntimeExports } from "../ssr.js";
const Heading = ({ title, description }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-1 fs-8", children: title }),
    description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: description })
  ] });
};
export {
  Heading as H
};

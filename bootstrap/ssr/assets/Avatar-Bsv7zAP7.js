import { j as jsxRuntimeExports } from "../ssr.js";
const InitialName = ({ initial_name = "UP", size = "sm" }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    userSelect: "none",
    cursor: "pointer"
  }, className: " w-100 h-100 bg-primary d-flex align-items-center justify-content-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${size == "sm" ? "fs-4" : "fs-9"}  fw-bold`, children: initial_name }) });
};
const Avatar = ({ image_url, initial_name, size = "md" }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        width: size == "md" ? "96px" : "50px",
        height: size == "md" ? "96px" : "50px"
      },
      className: `${size == "md" ? "round-96" : "rounded-40 "}  object-fit-cover rounded-circle position-relative overflow-hidden`,
      children: image_url != "" && image_url != null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: image_url,
          alt: "urpuppy-img",
          className: "object-fit-cover w-100 h-100"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(InitialName, { initial_name, size })
    }
  );
};
export {
  Avatar as A
};

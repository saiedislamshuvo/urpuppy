import { j as jsxRuntimeExports } from "../ssr.js";
import { L as Layout } from "./Layout-DRA0jG_Q.js";
import { P as PuppyCard } from "./Card-C5cxi3h3.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { P as Pagination } from "./Pagination-DXd8plba.js";
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
import "./Tooltip-fHI3Ksjq.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./index-DbhDZzck.js";
const Index = ({ favorite_puppies }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: "Favorites" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "hero-section position-relative d-flex align-items-center pt-11 pb-10",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container position-relative z-1 pt-lg-1 mt-lg-3 mb-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-xl-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "text-white text-center fs-11 mb-1",
            "data-aos": "fade-up",
            "data-aos-delay": "100",
            "data-aos-duration": "1000",
            children: "My Favorite Puppies"
          }
        ) }) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "puppy-spotlight py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: favorite_puppies.data && favorite_puppies.data.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mb-4 mb-lg-8", children: favorite_puppies.data.map((puppy) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyCard, { puppy }, puppy.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pagination, { links: favorite_puppies.links })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-8 text-center py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "svg",
        {
          width: "120",
          height: "120",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
          className: "text-muted",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "h4 mb-3", children: "No favorites yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-0", children: "Start adding puppies to your favorites to see them here!" })
    ] }) }) }) })
  ] });
};
export {
  Index as default
};

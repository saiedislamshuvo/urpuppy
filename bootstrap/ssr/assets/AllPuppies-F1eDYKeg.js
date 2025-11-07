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
const AllPuppies = ({ seller_name, all_puppies, url }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { url, title: "Favorites" }),
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
            children: seller_name
          }
        ) }) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "puppy-spotlight py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mb-4 mb-lg-8", children: all_puppies.data && all_puppies.data.length > 0 && all_puppies.data.map((puppy) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyCard, { puppy }, puppy.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pagination, { links: all_puppies.links })
    ] }) })
  ] });
};
export {
  AllPuppies as default
};

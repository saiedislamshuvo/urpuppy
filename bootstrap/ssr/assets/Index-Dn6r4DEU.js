import { j as jsxRuntimeExports } from "../ssr.js";
import { L as Layout } from "./Layout-BlHTUbAr.js";
import Banner from "./Banner-Fr3GXwLe.js";
import { C as Card } from "./Card-30Wpc5Pl.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
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
import "./BreedFilter-DL9MHlJG.js";
import "./react-select.esm-CTxScYKD.js";
import "./index-Bj-wIX-d.js";
import "./extends-BwmuZ0dU.js";
import "./index-D7h8hQJR.js";
import "./floating-ui.dom-D9vmQZx1.js";
import "./GenericModal-BiNUNH8g.js";
import "./Modal-BhWCa4N9.js";
import "./index-DbhDZzck.js";
import "./StateFilter-7f873q5R.js";
const Index = ({ posts, url }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Banner, { header: "Blog", size: "md", enable_filter: false, subheader: "" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { url, title: "Blog", description: "Blog", image: "" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "puppy-spotlight py-7 py-md-5 py-xl-9", id: "scroll-target", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mb-4 mb-lg-8", children: posts.data.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: posts.data.map((post, index) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { post }, index);
    }) }) : "No posts found" }) }) })
  ] });
};
export {
  Index as default
};

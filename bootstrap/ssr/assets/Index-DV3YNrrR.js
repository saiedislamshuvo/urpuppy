import { j as jsxRuntimeExports } from "../ssr.js";
import { L as Layout } from "./Layout-DdG4gm-d.js";
import Banner from "./Banner-DcN4hzU1.js";
import { C as Card } from "./Card-DZU2LbEg.js";
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
import "./BreedFilter-BJk0nsmz.js";
import "./index-C9Hr-vST.js";
import "./react-select.esm-tWlRM8_L.js";
import "./setPrototypeOf-DxvfjWzF.js";
import "./extends-BwmuZ0dU.js";
import "./hoist-non-react-statics.cjs-BnF7CivY.js";
import "./index-DgY4nH2N.js";
import "./index-D7h8hQJR.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./GenericModal-BuSM2RnD.js";
import "./Modal-CCl1U1i1.js";
import "./index-DbhDZzck.js";
import "./divWithClassName-CPmFGv-w.js";
import "./StateFilter-FffLDch6.js";
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

import { j as jsxRuntimeExports } from "../ssr.js";
import { H as Hero } from "./Hero-D_7BoKIM.js";
import { J as Jumbotron } from "./Jumbotron-BDGQSfPM.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { P as PlanUpgradeCard } from "./PlanUpgradeCard-B6iGqXfs.js";
import { S as SecondaryJumbotron } from "./SecondaryJumbotron-D9BuoUCE.js";
import { L as Layout } from "./Layout-DRA0jG_Q.js";
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
const Index = ({ plans }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: "Change Plans" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { title: "Join the Pack", bgImage: "/images/subscription-plans/subscription-plans-bg.jpg", description: "Exclusive Subscription Plans for Pet Lovers. " }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "subscription-plans pb-0 pb-md-0 py-7 py-md-5 py-xl-9 pb-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mt-8", children: (plans == null ? void 0 : plans.length) > 0 && plans.map(
      (plan) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-xl-3 mb-7 mb-xl-0 d-flex align-items-stretch", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlanUpgradeCard, { plan }) })
    ) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-extralight my-4 my-lg-5 py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryJumbotron, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Jumbotron,
      {
        title: "Get Started Today!",
        description: "Choose the plan that fits your budget and start selling your puppies with confidence. Whether you’re a\n                  first-time seller or an experienced breeder, UrPuppy.com has the perfect plan for you!\n",
        image: "../images/subscription-plans/get-started-today.png"
      }
    ) }) })
  ] });
};
export {
  Index as default
};

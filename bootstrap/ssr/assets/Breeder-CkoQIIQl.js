import { j as jsxRuntimeExports, J as Je } from "../ssr.js";
import { H as Hero } from "./Hero-D_7BoKIM.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { L as Layout } from "./Layout-DW-GDqDp.js";
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
const Breeder = ({ plan, discount }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: "Breeder plan" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { title: "Join the Pack", bgImage: "/images/subscription-plans/subscription-plans-bg.jpg", description: "Exclusive Subscription Plans for Breeders." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "breeder-annual-plan py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-2 border-info position-relative overflow-hidden rounded-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-5 border-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card mb-lg-0 h-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body py-lg-7 d-flex flex-column justify-content-between h-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: plan.logo ?? "", alt: "plan-logo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "fs-8 mt-6", children: plan.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Designed to meet the needs of all dog breeders, this plan gives you everything you need to succeed on Urpuppy.com" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-dark fs-5 mb-0", children: "All this for just" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "fs-12 mb-1", children: [
            plan.money_formatted,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "fs-5 text-muted", children: [
              "/",
              plan.plan_days
            ] })
          ] }),
          discount && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-0 text-muted", children: [
            "Free trial for ",
            discount.trial_days,
            " days"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 text-muted", children: "Billed annually." })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card mb-lg-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body py-lg-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-unstyled mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "d-flex align-items-start gap-6 mb-3 pb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "round-40 bg-success bg-opacity-25 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-paws-success.svg", alt: "paws-success" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-1 fs-3 font-work-sans", children: "Featured Directory Listing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: "Secure top-tier placement in the Urpuppy.com Breeders Directory for maximum visibility and buyer engagement." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "d-flex align-items-start gap-6 mb-3 pb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "round-40 bg-success bg-opacity-25 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-video-display.svg", alt: "video-display" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-1 fs-3 font-work-sans", children: "Full Multimedia Uploads" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: "Showcase your puppies with stunning images and videos to grab attention and attract more buyers." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "d-flex align-items-start gap-6 mb-3 pb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "round-40 bg-success bg-opacity-25 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-link.svg", alt: "icon-link" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-1 fs-3 font-work-sans", children: "Social Media Integration" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: "Add your social media links to grow your following and enhance your online presence." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "d-flex align-items-start gap-6 mb-3 pb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "round-40 bg-success bg-opacity-25 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-megephone.svg", alt: "megaphone" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-1 fs-3 font-work-sans", children: "Exclusive Bulletin Placement" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: "Gain additional exposure by being featured in our subscriber bulletin, reaching a broader audience of potential buyers." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "d-flex align-items-start gap-6 mb-3 pb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "round-40 bg-success bg-opacity-25 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-share-success.svg", alt: "share-success" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-1 fs-3 font-work-sans", children: "Social Media Sharing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: "Share your breeder profile directly on your social media platforms to further promote your business." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "d-flex align-items-start gap-6 mb-3 pb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "round-40 bg-success bg-opacity-25 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-call-user.svg", alt: "icon-call-user" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-1 fs-3 font-work-sans", children: "Priority Customer Support" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: "Enjoy fast, dedicated assistance whenever you need it." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "d-flex align-items-start gap-6 mb-3 pb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "round-40 bg-success bg-opacity-25 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-chat-heart.svg", alt: "icon-chat-hearth" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-1 fs-3 font-work-sans", children: "Customer Reviews" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: "Receive reviews from satisfied buyers to build trust and credibility within the community." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row align-items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Je,
            {
              "aria-label": "Get a Plan",
              href: `/checkout/${plan.id}`,
              className: "btn btn-primary d-block px-2",
              children: "Get a Plan"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-7 border-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fs-2", children: "Join Urpuppy.com today and elevate your breeding business to new heights!" }) })
        ] })
      ] }) }) })
    ] }) }) }) }) }) })
  ] });
};
export {
  Breeder as default
};

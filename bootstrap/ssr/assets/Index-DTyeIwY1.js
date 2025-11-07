import { r as reactExports, j as jsxRuntimeExports, J as Je } from "../ssr.js";
import { B as BannerSlider, S as SmallBannerWithContent } from "./SmallBannerWithContent-Di0kTaz5.js";
import { B as BreedFilter } from "./BreedFilter-DOc73LPo.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
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
import "./create-element-if-not-defined-BxImSDkK.js";
import "./pagination-CxTwo8xt.js";
import "./autoplay-DKsRVzkf.js";
import "./react-select.esm-BiLtaqGQ.js";
import "./index-ttmgawJR.js";
import "./extends-BwmuZ0dU.js";
import "./index-D7h8hQJR.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./GenericModal-BDVjRvTQ.js";
import "./Modal-B70mnUk-.js";
import "./index-DbhDZzck.js";
import "./divWithClassName-rs9BDQyr.js";
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
const Index = ({ breeds, letter_param = "A" }) => {
  const [filter, setFilter] = reactExports.useState({
    breed: {
      value: "",
      label: "All breeds"
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BannerSlider, { slidesPerView: 1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SmallBannerWithContent, { title: "Siberian Husky: Your Winter Companion" }, "1")
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: "Breeds" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "find-ur-breeds bg-extralight position-relative z-1 py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-7 pb-1 text-center", "data-aos": "fade-up", "data-aos-delay": "100", "data-aos-duration": "1000", children: "Find Breeds" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid-filter", "data-aos": "fade-up", "data-aos-delay": "200", "data-aos-duration": "1000", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex  justify-content-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "breed d-flex gap-2 ", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreedFilter, { setBreed: setFilter }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Je,
          {
            "aria-label": "search",
            href: `/breeds/${filter.breed.value}`,
            className: "btn btn-primary round-48 flex-shrink-0 p-2 d-flex align-items-center justify-content-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-search.svg", alt: "icon-search" })
          }
        )
      ] }) })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "choose-your-breeds py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex align-items-center justify-content-between mb-4 mb-lg-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-0", "data-aos": "fade-right", "data-aos-delay": "100", "data-aos-duration": "1000", children: "Choose your breeds" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "choose-breeds-tab", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ul",
          {
            className: "nav nav-pills mb-8 flex-xxl-nowrap",
            id: "pills-tab",
            role: "tablist",
            "data-aos": "fade-up",
            "data-aos-delay": "200",
            "data-aos-duration": "1000",
            children: ["All", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].map(
              (letter, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "nav-item", role: "presentation", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Je,
                {
                  preserveState: true,
                  preserveScroll: true,
                  prefetch: true,
                  cacheFor: "1m",
                  "aria-label": "search",
                  href: `/breeds?filter[name]=${letter}`,
                  as: "button",
                  className: `nav-link ${letter_param === letter ? "active" : ""}`,
                  id: `pills-${letter}-tab`,
                  "data-bs-toggle": "pill",
                  "data-bs-target": `#pills-${letter}`,
                  children: [
                    " ",
                    letter
                  ]
                },
                index
              ) }, index)
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "tab-content tab-content",
            "data-aos": "fade-up",
            "data-aos-duration": "1000",
            "data-aos-delay": "300",
            id: "pills-tabContent",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tab-pane active", id: "pills-a", role: "tabpanel", "aria-labelledby": "pills-a-tab", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: breeds.map((breed, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-sm-6 col-lg-4 col-xl-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Je,
              {
                "aria-label": "search",
                prefetch: true,
                cacheFor: "1m",
                href: `/breeds/${breed.slug}`,
                className: "breeds-items d-flex align-items-center gap-6 py-3 px-6 d-block rounded-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "breeds-items-img  flex-shrink-0 round-40 rounded position-relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: breed.image, className: "w-100 h-100 object-fit-cover", alt: breed.name }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "breeds-items-title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-0 font-work-sans fw-semibold fs-3", children: breed.name }) })
                ]
              }
            ) }, index)) }) })
          }
        )
      ] })
    ] }) })
  ] });
};
export {
  Index as default
};

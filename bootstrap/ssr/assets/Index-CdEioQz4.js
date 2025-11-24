import { q, r as reactExports, j as jsxRuntimeExports, J as Je } from "../ssr.js";
import { B as BannerSlider, S as SmallBannerWithContent } from "./SmallBannerWithContent-Di0kTaz5.js";
import { B as BreederCard } from "./BreederCard-Dgm9bW5t.js";
import { B as BreedFilter } from "./BreedFilter-BJk0nsmz.js";
import { S as StateFilter } from "./StateFilter-FffLDch6.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { P as Pagination } from "./Pagination-DXd8plba.js";
import { L as Layout } from "./Layout-DdG4gm-d.js";
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
import "./ShareButton-E7C8Yo7Y.js";
import "./index-BZNbmzld.js";
import "./index-DbhDZzck.js";
import "net";
import "./Tooltip-fHI3Ksjq.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./index-C9Hr-vST.js";
import "./react-select.esm-tWlRM8_L.js";
import "./setPrototypeOf-DxvfjWzF.js";
import "./extends-BwmuZ0dU.js";
import "./hoist-non-react-statics.cjs-BnF7CivY.js";
import "./index-DgY4nH2N.js";
import "./index-D7h8hQJR.js";
import "./GenericModal-BuSM2RnD.js";
import "./Modal-CCl1U1i1.js";
import "./divWithClassName-CPmFGv-w.js";
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
const Index = ({ breeders, breed, seo_title, seo_description, url }) => {
  var _a, _b;
  const { settings } = q().props;
  const heroTitle = (settings == null ? void 0 : settings.breeders_hero_title) || "Featured breeders";
  const heroBackground = (settings == null ? void 0 : settings.breeders_hero_background) || "/images/breeds-slider/hero-inner-slider-2.jpg";
  const sectionTitle = (settings == null ? void 0 : settings.breeders_section_title) || "Choose your Breeder";
  const headertitle = breed ? `Trusted ${breed} Breeders – Verified, Reviewed & Available Near You` : heroTitle;
  const [filter, setFilter] = reactExports.useState({
    breed: {
      value: "",
      label: "All breeds"
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: seo_title, description: seo_description, url }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BannerSlider, { slidesPerView: 1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SmallBannerWithContent, { title: headertitle, pill: "Feature", background_image: heroBackground }, 1)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "find-ur-breeds bg-extralight position-relative z-1 py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-7 col-xl-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-7 pb-1 text-center", "data-aos": "fade-up", "data-aos-delay": "100", "data-aos-duration": "1000", children: "Find Breeders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid-filter d-none d-lg-block aos-init aos-animate", "data-aos": "fade-up", "data-aos-delay": "200", "data-aos-duration": "1000", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center justify-content-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "breed d-flex gap-2 border-end algin-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreedFilter, { title: "Find a breed", setBreed: setFilter }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "breed d-flex gap-2 ", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StateFilter, { setState: setFilter }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Je,
          {
            "aria-label": "Search",
            preserveState: true,
            href: `/breeders?breed=${(_a = filter == null ? void 0 : filter.breed) == null ? void 0 : _a.value}&state=${(_b = filter == null ? void 0 : filter.state) == null ? void 0 : _b.value}`,
            className: "btn btn-primary round-48 flex-shrink-0 p-2 d-flex align-items-center justify-content-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-search.svg", alt: "urpuppy-img" })
          }
        )
      ] }) })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "choose-your-breeds py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex align-items-center justify-content-between mb-4 mb-lg-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-0", "data-aos": "fade-right", "data-aos-delay": "100", "data-aos-duration": "1000", children: sectionTitle }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mb-4 mb-lg-8", children: breeders.data && breeders.data.map((breeder) => /* @__PURE__ */ jsxRuntimeExports.jsx(BreederCard, { hasBorder: true, breeder }, breeder.slug)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pagination, { links: breeders.links })
    ] }) })
  ] });
};
export {
  Index as default
};

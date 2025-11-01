import { j as jsxRuntimeExports, J as Je } from "../ssr.js";
import { S as ShareButton } from "./ShareButton-BZt6Z0c4.js";
const BreederCard = ({ breeder, hasBorder = false }) => {
  var _a;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `card position-relative overflow-hidden ${hasBorder && "border"}`,
      "data-aos": "fade-up",
      "data-aos-delay": "300",
      "data-aos-duration": "1000",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-xl-4 d-flex align-items-lg-stretch", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Click to view breeder", preserveState: true, href: `/breeders/${breeder.slug}`, className: "trusted-breeders-img position-relative overflow-hidden w-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            loading: "lazy",
            className: "w-100 object-fit-cover product-card-responsive-height",
            src: breeder.company_logo ?? breeder.avatar,
            alt: "urpuppy-img"
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-xl-8 d-flex align-items-lg-stretch", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "trusted-breeders-details card-body ps-xl-0 pe-4 d-flex align-items-start justify-content-between gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Click to view breeder", preserveState: true, href: `/breeders/${breeder.slug}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "btn-link fs-5 font-work-sans mb-6", children: breeder.company_name }) }),
                breeder.breeds.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-6 mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-paws-dark.svg", alt: "urpuppy-img", width: "24", height: "24" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: (_a = breeder == null ? void 0 : breeder.breeds[0]) == null ? void 0 : _a.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-6 mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-map-pin.svg", alt: "urpuppy-img", width: "24", height: "24" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 flex-xl-shrink-0", children: breeder.company_address })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-user-dark.svg", alt: "urpuppy-img", width: "24", height: "24" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: breeder.full_name })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex align-items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShareButton, { slug: breeder.slug, route: "breeders" }) })
            ]
          }
        ) })
      ] })
    }
  ) });
};
export {
  BreederCard as B
};

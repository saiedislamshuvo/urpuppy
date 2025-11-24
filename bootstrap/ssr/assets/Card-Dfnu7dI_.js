import { j as jsxRuntimeExports, J as Je } from "../ssr.js";
import { T as Tooltip } from "./Tooltip-fHI3Ksjq.js";
const FavoriteButton = ({ puppyId, sellerId, isFavorite, uniqueId = null }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Je,
      {
        method: "get",
        preserveState: true,
        preserveScroll: true,
        href: `/favorites/${puppyId}`,
        "data-bs-toggle": "tooltip",
        "data-bs-title": "Add To Favourite",
        className: "bg-white border d-flex align-items-center justify-content-center round-40 rounded-circle",
        children: isFavorite ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-heart-red.svg", alt: "urpuppy-img" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-heart.svg", alt: "urpuppy-img" })
      }
    ), tooltipMessage: "Add To Favorite", id: `favorite-${uniqueId ?? puppyId}` })
  ] });
};
const CompareButton = ({ puppyId, sellerId, isCompared, uniqueId = null }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Je,
      {
        method: "get",
        preserveState: false,
        preserveScroll: false,
        href: `/compares/${puppyId}`,
        "data-bs-toggle": "tooltip",
        "data-bs-title": "Add To Compare",
        className: "bg-white border d-flex align-items-center justify-content-center round-40 rounded-circle",
        children: isCompared ? /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "20", viewBox: "0 0 16 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 1H12C12.7956 1 13.5587 1.31607 14.1213 1.87868C14.6839 2.44129 15 3.20435 15 4V15M11 8V19L6 16L1 19V8C1 7.20435 1.31607 6.44129 1.87868 5.87868C2.44129 5.31607 3.20435 5 4 5H8C8.79565 5 9.55871 5.31607 10.1213 5.87868C10.6839 6.44129 11 7.20435 11 8Z", fill: "#E88325", stroke: "#E88325", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "20", viewBox: "0 0 16 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 1H12C12.7956 1 13.5587 1.31607 14.1213 1.87868C14.6839 2.44129 15 3.20435 15 4V15M11 8V19L6 16L1 19V8C1 7.20435 1.31607 6.44129 1.87868 5.87868C2.44129 5.31607 3.20435 5 4 5H8C8.79565 5 9.55871 5.31607 10.1213 5.87868C10.6839 6.44129 11 7.20435 11 8Z", stroke: "#08314E", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
      }
    ), tooltipMessage: "Add To Compare", id: `compare-${uniqueId ?? puppyId}` })
  ] });
};
const PuppyCard = ({ puppy, className = "col-md-6 col-lg-4 col-xl-3 mb-4", height = "225px", location = "card" }) => {
  var _a, _b, _c;
  if (!puppy) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "h-100 puppy-spotlight-item rounded-1 overflow-hidden",
      "data-aos": "fade-up",
      "data-aos-delay": "600",
      "data-aos-duration": "1000",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Je, { prefetch: true, preserveScroll: false, href: `/puppies/${puppy.slug}`, className: "puppy-spotlight-img position-relative overflow-hidden d-block d-block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: puppy.image, alt: "urpuppy-img", className: "w-100 object-fit-cover product-card-responsive-height", style: { minHeight: "210px" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "d-flex align-items-baseline justify-content-between position-absolute top-0 start-0 w-100 p-3 pb-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex align-items-center gap-2", children: puppy.is_new ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "puppy-spotlight-img position-relative overflow-hidden d-block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge text-bg-success", children: "NEW" }) }) : null }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex flex-column gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FavoriteButton, { uniqueId: location + puppy.id, sellerId: (_a = puppy.seller) == null ? void 0 : _a.id, puppyId: puppy.id, isFavorite: puppy.is_favorite }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CompareButton, { uniqueId: location + puppy.id, sellerId: (_b = puppy.seller) == null ? void 0 : _b.id, puppyId: puppy.id, isCompared: puppy.is_compared })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "puppy-spotlight-details", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "fs-8 font-work-sans", children: puppy.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-map-pin.svg", alt: "urpuppy-img", width: "20", height: "20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 text-truncate", children: `${(puppy == null ? void 0 : puppy.city) || ""}${((puppy == null ? void 0 : puppy.city) || "").length > 0 ? ", " : ""}${(puppy == null ? void 0 : puppy.state) || ""}` })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-paws-dark.svg", alt: "urpuppy-img", width: "20", height: "20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: ((_c = puppy.breeds[0]) == null ? void 0 : _c.name) ?? null })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-female.svg", alt: "urpuppy-img", width: "20", height: "20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 text-capitalize", children: puppy.gender || "" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center justify-content-end gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-calendar.svg", alt: "urpuppy-img", width: "20", height: "20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: puppy.age })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-top d-flex align-items-center justify-content-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "fs-5 font-work-sans", children: puppy.formatted_price }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Je, { prefetch: true, preserveScroll: false, href: `/puppies/${puppy.slug}`, className: "btn btn-primary d-flex align-items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-paws.svg", alt: "urpuppy-img" }),
              "View more"
            ] })
          ] })
        ] })
      ]
    }
  ) }) });
};
export {
  CompareButton as C,
  FavoriteButton as F,
  PuppyCard as P
};

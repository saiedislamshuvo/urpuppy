import { j as jsxRuntimeExports, J as Je, a as je } from "../ssr.js";
import { I as ImageSlider } from "./ImageSlider-BppB0ClT.js";
import { F as FavoriteButton, P as PuppyCard } from "./Card-CrW8n-BK.js";
import { L as Layout } from "./Layout-DW-GDqDp.js";
import { S as ShareButton } from "./ShareButton-BZt6Z0c4.js";
import { S as SellerCard } from "./SellerCard-CDG9hARm.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { T as Tooltip } from "./Tooltip-BCRubnSZ.js";
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
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
import "./index-BZNbmzld.js";
import "./index-DbhDZzck.js";
import "net";
import "./floating-ui.dom-D9vmQZx1.js";
const SiblingCard = ({ puppy }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-6 mb-3 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "charlies-siblings", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "urpuppy-img", href: `/puppies/${puppy.slug}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "charlies-siblings-img position-relative overflow-hidden rounded-1 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: puppy.image,
        alt: "urpuppy-img",
        style: {
          height: "120px"
        },
        className: "object-fit-cover w-100 "
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "urpuppy-img", href: `/puppies/${puppy.slug}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-1", children: puppy.name }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-female.svg", alt: "urpuppy-img", width: "16", height: "16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fs-2", children: puppy.gender })
    ] })
  ] }) });
};
const List = ({ label }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hstack gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-check.svg", alt: "urpuppy-img" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: label })
  ] });
};
const PuppyJsonLd = ({ puppy, url }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Puppy",
    name: puppy.seo_title,
    description: puppy.seo_description ?? "",
    image: puppy.image,
    url
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(je, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "script",
    {
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
    }
  ) });
};
const Show = ({ related_puppies, puppy, siblings, url }) => {
  var _a, _b, _c, _d, _e, _f;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { url, title: `${(_a = puppy == null ? void 0 : puppy.breeds[0]) == null ? void 0 : _a.name} - ${puppy.seo_title}`, description: puppy.seo_description ?? "", image: puppy.preview_images[0] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyJsonLd, { puppy, url }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-wrapper position-relative overflow-hidden", children: [
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
              children: (_b = puppy == null ? void 0 : puppy.breeds[0]) == null ? void 0 : _b.name
            }
          ) }) }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "golden-retriever py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { href: "/puppies", className: "text-primary", children: "Back" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-8 col-xl-9", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-xl-7 mb-4 mb-md-5 mb-xl-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "top-picks-slider me-xl-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "sync1", className: "owl-carousel owl-theme mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageSlider, { videos: [puppy.video ?? ""], images: puppy.preview_images }) }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-xl-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "top-picks-details", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-start justify-content-between mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "fs-10 mb-0", children: puppy.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FavoriteButton, { sellerId: puppy.seller.id, puppyId: puppy.id, isFavorite: puppy.is_favorite }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        onClick: () => {
                          if (typeof window !== "undefined") {
                            window.print();
                          }
                        },
                        href: "#",
                        "data-bs-toggle": "tooltip",
                        "data-bs-title": "Print",
                        className: "bg-white border d-flex align-items-center justify-content-center round-40 rounded-circle",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-print.svg", alt: "print" })
                      }
                    ), id: `print`, tooltipMessage: "Print" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ShareButton,
                      {
                        slug: puppy.slug
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-6 col-md-4 mb-6 border-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-time.svg", alt: "time", width: "18", height: "18" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fs-2", children: puppy.published_at })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-6 col-md-4 mb-6 border-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-map-pin.svg", alt: "map", width: "18", height: "18" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fs-2", children: puppy.seller.address })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-6 col-md-4 mb-6 border-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-calendar.svg", alt: "calendar", width: "18", height: "18" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fs-2", children: puppy.age })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-6 col-md-4 mb-6 border-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-female.svg", alt: "female", width: "18", height: "18" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fs-2", children: puppy.gender })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-6 col-md-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-eye.svg", alt: "eye", width: "18", height: "18" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-0 fs-2", children: [
                      puppy.view_count,
                      " Views"
                    ] })
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 fs-2 fw-medium", children: "Our price" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4", children: puppy.formatted_price }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hstack gap-6 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fw-medium", children: "Pattern:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: puppy.patterns })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "colors hstack gap-6 mb-4 pb-4 border-bottom", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fw-medium", children: "Colors:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hstack gap-6", children: puppy.puppy_colors && puppy.puppy_colors.map((color) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hstack gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 d-block round-20 rounded-circle", style: { background: color.color } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: color.name })
                  ] }, color.name)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mb-3 fs-8", children: [
                  "About ",
                  puppy.name
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6", children: puppy.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center align-items-start gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-flag.svg", alt: "flag" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Je,
                    {
                      style: {
                        background: "transparent",
                        border: "none"
                      },
                      href: `/report/${puppy.slug}`,
                      method: "post",
                      data: {
                        reason: "report"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-0 fs-2 fw-semibold text-muted text-decoration-underline", children: "Report This Listing" })
                    }
                  )
                ] })
              ] }) })
            ] }) }) }),
            puppy.characteristics && ((_c = puppy.characteristics) == null ? void 0 : _c.length) > 0 || puppy.features && puppy.features.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
              puppy.characteristics && ((_d = puppy.characteristics) == null ? void 0 : _d.length) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "charlies-characteristics pb-3 border-bottom", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "mb-3 pb-1 fs-5", children: [
                  puppy.name,
                  "’s Characteristics"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex align-items-center flex-wrap gap-4 pb-1", children: puppy.characteristics.map((characteristic, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(List, { label: characteristic }, index)) })
              ] }),
              puppy.features && ((_e = puppy.features) == null ? void 0 : _e.length) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "charlies-features mt-3 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "mb-3 pb-1 fs-5", children: [
                  puppy.name,
                  "’s Features"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex align-items-center flex-wrap gap-4", children: puppy.features && puppy.features.map((feature, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(List, { label: feature }, index)) })
              ] })
            ] }) }),
            puppy.seller.is_breeder && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card position-relative overflow-hidden border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-xl-4 d-flex align-items-lg-stretch", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { href: `/breeders/${puppy.seller.slug}`, className: "trusted-breeders-img position-relative overflow-hidden w-100 text-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "object-fit-cover rounded-circle position-relative overflow-hidden", src: puppy.seller.company_logo ?? "", alt: puppy.seller.kennel_name ?? "company logo", width: "230", height: "230" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-xl-8 d-flex align-items-lg-stretch", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "trusted-breeders-details card-body ps-xl-0 pe-4 d-flex align-items-start justify-content-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { href: `/breeders/${puppy.seller.slug}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "btn-link fs-8 font-work-sans mb-6", children: "Offered By" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "company-details mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hstack gap-6 mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fw-medium text-dark", children: "Name:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: puppy.seller.kennel_name })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hstack gap-6 mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fw-medium text-dark", children: "Address:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: puppy.seller.company_address })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hstack gap-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fw-medium text-dark", children: "Years in Business:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: puppy.seller.company_established_on_label })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { href: `/breeders/${puppy.seller.slug}`, className: "btn btn-outline-extralight border btn-white text-dark", children: "View More" })
              ] }) }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-4 col-xl-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SellerCard, { seller: puppy.seller }),
            siblings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "fs-5 mb-3 pb-1", children: [
                puppy.name,
                puppy.name.endsWith("s") ? "'" : "'s",
                " Siblings"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: siblings.map((sibling) => /* @__PURE__ */ jsxRuntimeExports.jsx(SiblingCard, { puppy: sibling }, sibling.slug)) })
            ] }) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bringing-through-puppies bg-extralight py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex align-items-center justify-content-between mb-4 mb-lg-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-0", "data-aos": "fade-right", "data-aos-delay": "100", "data-aos-duration": "1000", children: [
          "Other ",
          (_f = puppy == null ? void 0 : puppy.breeds[0]) == null ? void 0 : _f.name,
          " Listing"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: related_puppies && related_puppies.map((puppy2) => /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyCard, { className: "col-md-6 col-xl-3 mb-4 mb-xl-0", puppy: puppy2 }, puppy2.slug)) })
      ] }) })
    ] })
  ] });
};
export {
  Show as default
};

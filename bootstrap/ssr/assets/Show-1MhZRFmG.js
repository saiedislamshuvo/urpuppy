import { j as jsxRuntimeExports, a as je, J as Je } from "../ssr.js";
import { B as Breadcrumb } from "./Breadcrumb-D8nxHqVE.js";
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
const BreedJsonLd = ({ breed, url }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DogBreed",
    name: breed.seo_title,
    description: breed.seo_description ?? "",
    image: breed.image,
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
const Show = ({ breed, url }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { navType: "secondary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { url, title: breed.seo_title ?? "", description: breed.seo_description ?? "", image: breed.image }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreedJsonLd, { breed, url }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-wrapper position-relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "information pt-4 pb-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { links: [
        {
          label: "Breeds",
          link: "/breeds"
        },
        {
          label: breed.name,
          link: ""
        }
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "information-img position-relative overflow-hidden rounded-1 mb-4 mb-lg-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { style: {
          height: "535px"
        }, src: breed.image, alt: breed.name, className: "object-fit-cover w-100" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "information-details ms-xl-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "fs-10 mb-4", children: breed.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-xl-flex align-items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Je,
              {
                "aria-label": "Puppies for sale",
                href: `/puppies?filter[breed]=${breed.name}`,
                className: "btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 mb-3 mb-xl-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      width: "17",
                      height: "17",
                      viewBox: "0 0 17 17",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M1.3335 3.83334V7.04918C1.3335 7.49668 1.511 7.92584 1.82766 8.24251L8.591 15.0058C8.7477 15.1626 8.93374 15.2869 9.13849 15.3717C9.34325 15.4565 9.5627 15.5002 9.78433 15.5002C10.006 15.5002 10.2254 15.4565 10.4302 15.3717C10.6349 15.2869 10.821 15.1626 10.9777 15.0058L15.006 10.9775C15.1627 10.8208 15.287 10.6348 15.3719 10.43C15.4567 10.2253 15.5003 10.0058 15.5003 9.78418C15.5003 9.56255 15.4567 9.34309 15.3719 9.13834C15.287 8.93359 15.1627 8.74755 15.006 8.59084L8.24183 1.82751C7.92553 1.51126 7.49661 1.33352 7.04933 1.33334H3.8335C3.17045 1.33334 2.53457 1.59674 2.06573 2.06558C1.59689 2.53442 1.3335 3.1703 1.3335 3.83334Z",
                          stroke: "#E88325",
                          strokeWidth: "1.25",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      )
                    }
                  ),
                  "View ",
                  breed.name,
                  " Puppies For Sale"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Je,
              {
                "aria-label": "View Breeders",
                href: `/breeders?breed=${breed.name}`,
                className: "btn btn-outline-extralight border btn-white text-dark d-flex align-items-center justify-content-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "w-auto", src: "/images/svgs/icon-paws-dark.svg", alt: "icon-paw-dark", width: "15", height: "15" }),
                  "View ",
                  breed.name,
                  " Breeders"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "accordion accordion-flush", id: "accordionFlushExample", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "accordion-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "accordion-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "accordion-button collapsed fs-5 fw-medium",
                  type: "button",
                  "data-bs-toggle": "collapse",
                  "data-bs-target": "#flush-collapseOne",
                  "aria-expanded": "false",
                  "aria-controls": "flush-collapseOne",
                  children: "History"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  id: "flush-collapseOne",
                  className: "accordion-collapse collapse show",
                  "data-bs-parent": "#accordionFlushExample",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-body pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", dangerouslySetInnerHTML: { __html: breed.history_description ?? "" } }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "accordion-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "accordion-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "accordion-button collapsed fs-5 fw-medium",
                  type: "button",
                  "data-bs-toggle": "collapse",
                  "data-bs-target": "#flush-collapseTwo",
                  "aria-expanded": "false",
                  "aria-controls": "flush-collapseTwo",
                  children: "Size"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  id: "flush-collapseTwo",
                  className: "accordion-collapse collapse",
                  "data-bs-parent": "#accordionFlushExample",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-body pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", dangerouslySetInnerHTML: { __html: breed.size_description ?? "" } }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "accordion-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "accordion-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "accordion-button collapsed fs-5 fw-medium",
                  type: "button",
                  "data-bs-toggle": "collapse",
                  "data-bs-target": "#flush-collapseThree",
                  "aria-expanded": "false",
                  "aria-controls": "flush-collapseThree",
                  children: "Temperament"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  id: "flush-collapseThree",
                  className: "accordion-collapse collapse",
                  "data-bs-parent": "#accordionFlushExample",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-body pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", dangerouslySetInnerHTML: { __html: breed.temperament_description ?? "" } }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "accordion-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "accordion-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "accordion-button collapsed fs-5 fw-medium",
                  type: "button",
                  "data-bs-toggle": "collapse",
                  "data-bs-target": "#flush-collapsefour",
                  "aria-expanded": "false",
                  "aria-controls": "flush-collapsefour",
                  children: "Coat"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  id: "flush-collapsefour",
                  className: "accordion-collapse collapse",
                  "data-bs-parent": "#accordionFlushExample",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-body pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", dangerouslySetInnerHTML: { __html: breed.coat_description ?? "" } }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "accordion-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "accordion-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "accordion-button collapsed fs-5 fw-medium",
                  type: "button",
                  "data-bs-toggle": "collapse",
                  "data-bs-target": "#flush-collapsefive",
                  "aria-expanded": "false",
                  "aria-controls": "flush-collapsefive",
                  children: "Lifestyle"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  id: "flush-collapsefive",
                  className: "accordion-collapse collapse",
                  "data-bs-parent": "#accordionFlushExample",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-body pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", dangerouslySetInnerHTML: { __html: breed.lifestyle_description ?? "" } }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "accordion-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "accordion-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "accordion-button collapsed fs-5 fw-medium",
                  type: "button",
                  "data-bs-toggle": "collapse",
                  "data-bs-target": "#flush-collapsesix",
                  "aria-expanded": "false",
                  "aria-controls": "flush-collapsesix",
                  children: "Activities"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  id: "flush-collapsesix",
                  className: "accordion-collapse collapse",
                  "data-bs-parent": "#accordionFlushExample",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-body pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", dangerouslySetInnerHTML: { __html: breed.activities_description ?? "" } }) })
                }
              )
            ] })
          ] })
        ] }) })
      ] }) }) })
    ] }) }) })
  ] }) });
};
export {
  Show as default
};

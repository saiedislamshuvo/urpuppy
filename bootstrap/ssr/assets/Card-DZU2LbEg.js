import { j as jsxRuntimeExports, J as Je } from "../ssr.js";
const Card = ({ post }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-lg-4 col-xl-3 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "puppy-spotlight-item rounded-1 overflow-hidden",
      "data-aos": "fade-up",
      "data-aos-delay": "600",
      "data-aos-duration": "1000",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Je, { "aria-label": "View Details", prefetch: true, preserveScroll: false, href: `/posts/${post.slug}`, className: "puppy-spotlight-img position-relative overflow-hidden d-block d-block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: post.banner_url, alt: "urpuppy-img", className: "w-100 object-fit-cover product-card-responsive-height" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "d-flex align-items-center justify-content-between position-absolute top-0 start-0 w-100 p-3 pb-0"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "puppy-spotlight-details", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          post.category && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fs-2 mb-1 text-uppercase fw-medium", children: post.category.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "View Details", prefetch: true, preserveScroll: false, href: `/posts/${post.slug}`, className: "puppy-spotlight-img position-relative overflow-hidden d-block d-block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "fs-6 font-work-sans", children: post.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: post.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3", children: post.excerpt.length > 100 ? post.excerpt.substring(0, 93) + "..." : post.excerpt }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Je,
                {
                  href: `/posts/${post.slug}`,
                  className: "btn btn-primary btn-sm mt-2",
                  prefetch: true,
                  preserveScroll: false,
                  children: "Read More"
                }
              ),
              post.author && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2 my-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-user-circle.svg", alt: "urpuppy-img", className: "rounded-circle", width: "18", height: "18" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: post.author.name })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-12 justify-content-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-calendar.svg", alt: "urpuppy-img", width: "20", height: "20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: post.published_at_formatted })
              ] })
            ] })
          ] })
        ] }) })
      ]
    }
  ) }) });
};
export {
  Card as C
};

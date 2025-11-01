import { j as jsxRuntimeExports, J as Je } from "../ssr.js";
const PaginationButton = ({ page, isActive = false, className = "page-link " }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${className} ${isActive ? "active" : ""}`, dangerouslySetInnerHTML: { __html: page } });
};
const Pagination = ({ links, target = "scroll-target" }) => {
  const mergeQueryParams = (url) => {
    if (typeof window === "undefined") return url;
    const currentParams = new URLSearchParams(window.location.search);
    const urlObj = new URL(url, window.location.origin);
    currentParams.forEach((value, key) => {
      if (!urlObj.searchParams.has(key)) {
        urlObj.searchParams.append(key, value);
      }
    });
    return urlObj.toString();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "table-responsive pb-3 pb-lg-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "pagination mb-0 align-items-center justify-content-center ", children: links && links.length > 3 && links.map((link, index) => {
    if (!link.url) return null;
    const isFirst = index === 0;
    const isLast = index === links.length - 1;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "li",
      {
        className: `page-item me-lg-6 `,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Je,
          {
            href: mergeQueryParams(link.url),
            preserveScroll: true,
            target,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              PaginationButton,
              {
                className: `page-link ${link.active ? "active" : ""} ${isFirst ? "border-0 me-4 text-dark" : ""} ${isLast ? "border-0 text-dark d-hidedn" : ""} `,
                page: link.label,
                isActive: link.active
              }
            )
          }
        )
      },
      index
    );
  }) }) });
};
export {
  Pagination as P
};

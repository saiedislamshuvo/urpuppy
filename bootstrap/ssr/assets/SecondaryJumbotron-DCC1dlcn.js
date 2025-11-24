import { q, j as jsxRuntimeExports, J as Je } from "../ssr.js";
const SecondaryJumbotron = () => {
  const { settings } = q().props;
  const sectionTitle = (settings == null ? void 0 : settings.cta_section_title) || "Why Choose UrPuppy.com?";
  const buttonSubtitle = (settings == null ? void 0 : settings.cta_button_subtitle) || "Our advantages";
  const buttonLink = (settings == null ? void 0 : settings.cta_button_link) || "/about-us";
  const features = (settings == null ? void 0 : settings.cta_features) || [
    {
      icon: "fa-reach-thousands-buyers",
      title: "Reach Thousands of Buyers",
      description: "Our platform connects you with eager pet lovers nationwide."
    },
    {
      icon: "fa-easy-to-use-tool",
      title: "Easy-to-Use Tools",
      description: "Upload photos, videos, and descriptions seamlessly."
    },
    {
      icon: "fa-boosted-visibility",
      title: "Boosted Visibility",
      description: "Featured listings help you stand out from the competition."
    }
  ];
  const iconMap = {
    "fa-reach-thousands-buyers": "/images/svgs/icon-reach-thousands-buyers.svg",
    "fa-easy-to-use-tool": "/images/svgs/icon-easy-to-use-tool.svg",
    "fa-boosted-visibility": "/images/svgs/icon-boosted-visibility.svg"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "fs-10 mb-5 mb-lg-0", children: sectionTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { href: buttonLink, className: "btn btn-primary my-2 my-lg-4", children: buttonSubtitle })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mt-4", children: features.map((feature, index) => {
      var _a, _b, _c, _d;
      const iconSrc = ((_a = feature.icon) == null ? void 0 : _a.startsWith("/")) || ((_b = feature.icon) == null ? void 0 : _b.startsWith("http")) ? feature.icon : iconMap[feature.icon] || `/images/svgs/icon-${((_c = feature.icon) == null ? void 0 : _c.replace("fa-", "")) || "default"}.svg`;
      const isFontAwesome = ((_d = feature.icon) == null ? void 0 : _d.startsWith("fa-")) && !iconMap[feature.icon];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-md-4 mb-7 mb-md-0", children: [
        isFontAwesome ? /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: `${feature.icon} fs-1 text-primary` }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: iconSrc, alt: feature.title || "feature" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "fs-5 font-work-sans mt-3", children: feature.title || "Feature" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: feature.description || "" })
      ] }, index);
    }) }) })
  ] });
};
export {
  SecondaryJumbotron as S
};

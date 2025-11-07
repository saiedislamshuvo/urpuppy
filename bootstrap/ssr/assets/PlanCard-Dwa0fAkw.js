import { j as jsxRuntimeExports, J as Je } from "../ssr.js";
const PlanCard = ({ plan, button = true, discount }) => {
  const planBadge = () => {
    if (discount && plan.type === "premium") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-top fw-medium px-6 py-1 bg-info text-white fs-3 me-6", children: [
        discount.trial_days,
        "-Day Trial"
      ] });
    }
    if (plan.badge_color === "primary") {
      if (plan.badge_title) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-top fw-medium px-6 py-1 bg-info text-white fs-3 me-6", children: plan.badge_title });
      }
    } else {
      if (plan.badge_title)
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-top fw-medium px-6 py-1 bg-dark bg-opacity-10 text-muted fs-3 me-6", children: plan.badge_title });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card subscription-plans-box border border-2 position-relative w-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-end position-absolute top-0 end-0 mt-n4 z-n1", children: planBadge() }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center justify-content-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-dark fs-5 mb-0", children: plan.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: plan.logo ?? "", alt: "urpuppy-img", width: "48", height: "48" })
      ] }),
      plan.type == "free" ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-9", children: [
        " ",
        plan.plan_days,
        " "
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-6", children: [
        plan.money_formatted,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "fs-5 text-muted", children: [
          "/",
          plan.plan_days
        ] })
      ] }) }),
      discount && plan.type === "premium" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-0 text-muted", children: [
        "Free trial for ",
        discount.trial_days,
        " days"
      ] }),
      plan.savings_label && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-dark mb-4 pb-2", children: plan.savings_label }),
      button && (plan.is_highlight ? /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { prefetch: true, className: "btn btn-primary w-100 mb-7", href: `/checkout/${plan.id}`, children: "Select plan" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { prefetch: true, className: "btn btn-outline-extralight border btn-white text-dark w-100 mb-7", href: `/checkout/${plan.id}`, children: "Select plan" })),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1", children: plan.features && plan.features.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Features:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-unstyled mb-0 d-flex flex-column gap-6", children: plan.features.map((feature, key) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "d-flex align-items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-check-filled.svg", alt: "urpuppy-img", className: "flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "fs-3 mb-0 font-work-sans fw-normal", children: feature.name })
        ] }, key)) })
      ] }) })
    ] })
  ] });
};
export {
  PlanCard as P
};

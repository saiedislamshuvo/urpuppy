import { q, j as jsxRuntimeExports, J as Je } from "../ssr.js";
import { D as DashboardLayout } from "./DashboardLayout-gPtbtbBl.js";
import SubscriptionCard from "./SubscriptionCard-BCstsyTB.js";
import { A as AlertDismissible } from "./AlertDismissible-CiayuAgv.js";
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
import "./Layout-DdG4gm-d.js";
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
import "./MetaTags-D4JDM_I7.js";
import "./index-DbhDZzck.js";
import "./extends-BwmuZ0dU.js";
import "./setPrototypeOf-DxvfjWzF.js";
import "./divWithClassName-iz9ghyPo.js";
import "./index-DgY4nH2N.js";
import "./index-D7h8hQJR.js";
function MySubscription({
  plan,
  breeder_plan,
  premium_subscription,
  breeder_subscription,
  plan_next_billing,
  plan_cancel_at,
  breeder_next_billing,
  breeder_cancel_at,
  breeder_requests
}) {
  const user = q().props.auth.user;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { activeTab: "My Subscription", metaTitle: "My Subscription", children: [
    (breeder_requests == null ? void 0 : breeder_requests.status) != "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      (breeder_requests == null ? void 0 : breeder_requests.status) == "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDismissible, { variant: "primary", heading: "Pending Breeder Request", message: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: (breeder_requests == null ? void 0 : breeder_requests.message) ?? "" }),
        " "
      ] }) }),
      (breeder_requests == null ? void 0 : breeder_requests.status) == "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDismissible, { variant: "danger", heading: "Your Breeder Request has been rejected", message: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          (breeder_requests == null ? void 0 : breeder_requests.message) ?? "",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Je,
            {
              "aria-label": "Retry",
              method: "post",
              className: "border-0 bg-transparent text-primary text-decoration-underline ",
              href: "/breeder/request/retry",
              children: " Request Again"
            }
          )
        ] }),
        " "
      ] }) })
    ] }),
    !(user == null ? void 0 : user.breeder_plan) && (breeder_requests == null ? void 0 : breeder_requests.status) == "approved" && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDismissible, { variant: "success", heading: "Your application has been approved", message: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "You can now proceed to payment for your breeder plan ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { href: "/plans/breeder", children: "Choose a plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
      ] }),
      " "
    ] }) }),
    ((user == null ? void 0 : user.is_seller) && !(user == null ? void 0 : user.profile_completed) || (user == null ? void 0 : user.is_breeder) && !(user == null ? void 0 : user.breeder_profile_completed)) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDismissible,
      {
        variant: "warning",
        heading: "Complete Your Profile",
        message: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          (user == null ? void 0 : user.is_breeder) && !(user == null ? void 0 : user.breeder_profile_completed) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Please complete your breeder profile to access subscription plans.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Je,
              {
                "aria-label": "Complete Profile",
                href: "/breeders/create",
                method: "get",
                as: "button",
                className: "btn btn-primary mt-2",
                children: "Complete Profile"
              }
            )
          ] }),
          (user == null ? void 0 : user.is_seller) && !(user == null ? void 0 : user.profile_completed) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Please complete your seller profile to access subscription plans.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Je,
              {
                "aria-label": "Complete Profile",
                href: "/seller/create",
                method: "get",
                as: "button",
                className: "btn btn-primary mt-2",
                children: "Complete Profile"
              }
            )
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tab-content", id: "pills-tabContent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: ` tab-pane fade show active `,
        id: "pills-my-subscription",
        role: "tabpanel",
        "aria-labelledby": "pills-my-subscription-tab",
        tabIndex: 0,
        children: [
          (plan || breeder_plan) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { rel: "nofollow", className: "btn btn-secondary", href: "/billing", children: "Manage subscription" }) }) }),
          premium_subscription && !plan && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "mb-3 pb-3 border-bottom fs-7", children: "Active Subscription" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-md-flex align-items-start justify-content-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 mb-md-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-dark fs-5 mb-2", children: [
                  "Subscription Type: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: premium_subscription.type })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted mb-2", children: [
                  "Status: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge bg-primary", children: "You need to purchase a plan" })
                ] }),
                premium_subscription.ends_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted mb-0", children: [
                  "Ends at: ",
                  new Date(premium_subscription.ends_at).toLocaleDateString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Je,
                {
                  href: "/plans",
                  className: "btn btn-primary",
                  "aria-label": "Purchase a plan",
                  children: "Purchase Plan"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 pt-3 border-top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDismissible,
              {
                variant: "warning",
                heading: "Plan Not Assigned",
                message: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: "Your subscription is active but no plan is assigned. Please purchase a plan to continue." })
              }
            ) })
          ] }) }),
          breeder_subscription && !breeder_plan && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "mb-3 pb-3 border-bottom fs-7", children: "Active Subscription" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-md-flex align-items-start justify-content-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 mb-md-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-dark fs-5 mb-2", children: [
                  "Subscription Type: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: breeder_subscription.type })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted mb-2", children: [
                  "Status: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge bg-primary", children: "You need to purchase a plan" })
                ] }),
                breeder_subscription.ends_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted mb-0", children: [
                  "Ends at: ",
                  new Date(breeder_subscription.ends_at).toLocaleDateString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Je,
                {
                  href: "/plans/breeder",
                  className: "btn btn-primary",
                  "aria-label": "Purchase a breeder plan",
                  children: "Purchase Plan"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 pt-3 border-top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDismissible,
              {
                variant: "warning",
                heading: "Plan Not Assigned",
                message: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: "Your subscription is active but no plan is assigned. Please purchase a plan to continue." })
              }
            ) })
          ] }) }),
          plan && /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionCard, { next_billing: plan_next_billing, cancel_at: plan_cancel_at, plan }, "plan"),
          breeder_plan && /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionCard, { next_billing: breeder_next_billing, cancel_at: breeder_cancel_at, plan: breeder_plan }, "breeder_plan"),
          !premium_subscription && !breeder_subscription && !plan && !breeder_plan && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-8 text-center py-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/images/svgs/icon-card.svg",
                alt: "Subscription",
                width: "120",
                height: "120",
                className: "text-muted"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "h4 mb-3", children: "No subscription purchased" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-4", children: "Choose a plan to unlock premium features and reach more buyers!" }),
            (user == null ? void 0 : user.is_seller) && (user == null ? void 0 : user.profile_completed) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Je,
              {
                href: "/plans",
                className: "btn btn-primary",
                "aria-label": "Choose a plan",
                children: "Choose a Plan"
              }
            ),
            (user == null ? void 0 : user.is_breeder) && (user == null ? void 0 : user.breeder_profile_completed) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Je,
              {
                href: "/plans/breeder",
                className: "btn btn-primary",
                "aria-label": "Choose a breeder plan",
                children: "Choose a Plan"
              }
            )
          ] }) }) }) })
        ]
      }
    ) })
  ] });
}
export {
  MySubscription as default
};

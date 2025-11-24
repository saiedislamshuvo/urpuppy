import { j as jsxRuntimeExports, J as Je } from "../ssr.js";
import { D as DashboardLayout } from "./DashboardLayout-BpzRkgtx.js";
import { A as Avatar } from "./Avatar-Bsv7zAP7.js";
import { A as AlertDismissible } from "./AlertDismissible-CfoL4dnV.js";
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
import "./index-DzrIk5T7.js";
import "./MetaTags-D4JDM_I7.js";
import "./index-DbhDZzck.js";
import "./extends-BwmuZ0dU.js";
import "./setPrototypeOf-DxvfjWzF.js";
import "./divWithClassName-CPmFGv-w.js";
import "./index-DgY4nH2N.js";
import "./index-D7h8hQJR.js";
function Dashboard({
  user,
  statistics,
  analytics,
  next_steps,
  subscription_report
}) {
  const incompleteSteps = (next_steps == null ? void 0 : next_steps.filter((step) => !step.completed)) || [];
  const hasIncompleteSteps = incompleteSteps.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { activeTab: "Dashboard", metaTitle: "Dashboard", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 mb-md-5", children: user.role_badge ? `${user.role_badge} Dashboard` : "Dashboard" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4 col-md-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { image_url: user.avatar, initial_name: user.initial_name, size: "sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-0", children: user.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-0 fs-2 d-flex align-items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-mail-dark.svg", alt: "urpuppy-img", width: "14" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { rel: "nofollow", className: "text-muted", href: "mailto:support@urpuppy.com", children: user.email })
        ] })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-3 col-md-6 mb-4 mb-md-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border h-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-muted mb-2 fs-4", children: "Total Puppies" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-primary mb-0", children: statistics.total_puppies }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-0 fs-3 mt-2", children: "All your puppy listings" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-3 col-md-6 mb-4 mb-md-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border h-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-muted mb-2 fs-4", children: "Published" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-success mb-0", children: statistics.published_puppies }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-0 fs-3 mt-2", children: "Live and visible to buyers" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-3 col-md-6 mb-4 mb-md-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border h-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-muted mb-2 fs-4", children: "Pending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-warning mb-0", children: statistics.pending_puppies }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-0 fs-3 mt-2", children: "Drafts awaiting publication" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-3 col-md-6 mb-4 mb-md-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border h-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-muted mb-2 fs-4", children: "Expired" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-danger mb-0", children: statistics.expired_puppies }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-0 fs-3 mt-2", children: "Paused due to expired subscription" })
      ] }) }) })
    ] }),
    subscription_report && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "mb-4 fs-5", children: "Subscription Report" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "table mb-0", style: { borderCollapse: "collapse", border: "none" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #e0e0e0", borderTop: "none", borderLeft: "none", borderBottom: "1px solid #e0e0e0", padding: "1rem", backgroundColor: "#f8f9fa", fontWeight: 600, minWidth: "200px" }, children: "Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #e0e0e0", borderTop: "none", borderRight: "none", borderBottom: "1px solid #e0e0e0", padding: "1rem", backgroundColor: "#f8f9fa", fontWeight: 600, textAlign: "center", minWidth: "200px" }, children: "Details" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderLeft: "none", borderTop: "none", padding: "1rem", fontWeight: 500, backgroundColor: "#f8f9fa", verticalAlign: "middle" }, children: "Plan Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderRight: "none", borderTop: "none", padding: "1rem", textAlign: "center", verticalAlign: "middle" }, children: subscription_report.plan_name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderLeft: "none", borderTop: "none", padding: "1rem", fontWeight: 500, backgroundColor: "#f8f9fa", verticalAlign: "middle" }, children: "Total Listings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderRight: "none", borderTop: "none", padding: "1rem", textAlign: "center", verticalAlign: "middle" }, children: subscription_report.total_listings })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderLeft: "none", borderTop: "none", padding: "1rem", fontWeight: 500, backgroundColor: "#f8f9fa", verticalAlign: "middle" }, children: "Listing Limit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderRight: "none", borderTop: "none", padding: "1rem", textAlign: "center", verticalAlign: "middle" }, children: subscription_report.listing_limit === 0 ? "Unlimited" : subscription_report.listing_limit })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderLeft: "none", borderTop: "none", padding: "1rem", fontWeight: 500, backgroundColor: "#f8f9fa", verticalAlign: "middle" }, children: "Listings Remaining" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderRight: "none", borderTop: "none", padding: "1rem", textAlign: "center", verticalAlign: "middle" }, children: typeof subscription_report.listings_remaining === "string" ? subscription_report.listings_remaining : subscription_report.listings_remaining })
          ] }),
          subscription_report.next_billing_date && /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderLeft: "none", borderTop: "none", padding: "1rem", fontWeight: 500, backgroundColor: "#f8f9fa", verticalAlign: "middle" }, children: "Next Billing Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderRight: "none", borderTop: "none", padding: "1rem", textAlign: "center", verticalAlign: "middle" }, children: subscription_report.next_billing_date })
          ] }),
          subscription_report.days_remaining !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderLeft: "none", borderTop: "none", padding: "1rem", fontWeight: 500, backgroundColor: "#f8f9fa", verticalAlign: "middle" }, children: "Days Remaining" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: { border: "1px solid #e0e0e0", borderRight: "none", borderTop: "none", padding: "1rem", textAlign: "center", verticalAlign: "middle" }, children: [
              subscription_report.days_remaining,
              " ",
              subscription_report.days_remaining === 1 ? "day" : "days"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderLeft: "none", borderTop: "none", padding: "1rem", fontWeight: 500, backgroundColor: "#f8f9fa", verticalAlign: "middle" }, children: "Subscription Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: { border: "1px solid #e0e0e0", borderRight: "none", borderTop: "none", padding: "1rem", textAlign: "center", verticalAlign: "middle" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge ${subscription_report.subscription_status === "active" ? "bg-success" : subscription_report.subscription_status === "trialing" ? "bg-info" : "bg-warning"}`, children: subscription_report.subscription_status.charAt(0).toUpperCase() + subscription_report.subscription_status.slice(1) }),
              subscription_report.is_cancelled && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge bg-danger ms-2", children: "Cancelled" })
            ] })
          ] })
        ] })
      ] }) })
    ] }) }) }) }),
    hasIncompleteSteps && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert-warning", role: "alert", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "alert-heading mb-3", children: "Complete Your Setup to Start Listing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3", children: "Please complete the following steps before creating your first listing:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex flex-column gap-2", children: incompleteSteps.map((step) => {
        if (step.key === "wait_approval" || step.key === "request_rejected" || step.key === "approval_completed") {
          const variant = step.type === "error" ? "danger" : step.type === "success" ? "success" : "primary";
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDismissible,
            {
              variant,
              heading: step.title,
              message: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                step.message,
                step.action_url && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Je,
                    {
                      "aria-label": step.title,
                      method: "post",
                      className: "border-0 bg-transparent text-primary text-decoration-underline",
                      href: step.action_url,
                      children: "Request Again"
                    }
                  )
                ] })
              ] })
            }
          ) }, step.key);
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex flex-column flex-md-row align-items-md-center justify-content-between p-3 border border-primary rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fw-semibold d-block mb-1", children: step.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted small", children: step.message })
          ] }),
          step.action_url && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Je,
            {
              href: step.action_url,
              className: "btn btn-sm btn-primary mt-3 mt-md-0",
              children: step.key === "verify_email" ? "Verify Now" : step.key === "complete_profile" ? "Complete Now" : step.key === "purchase_plan" ? "View Plans" : "Take Action"
            }
          )
        ] }, step.key);
      }) })
    ] }) }) })
  ] });
}
export {
  Dashboard as default
};

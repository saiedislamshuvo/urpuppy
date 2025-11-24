import { S as Se, q, j as jsxRuntimeExports } from "../ssr.js";
import { D as DashboardLayout } from "./DashboardLayout-gPtbtbBl.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
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
function RefundRequestIndex({
  activeSubscriptions,
  refundRequests
}) {
  const { data, setData, post, processing, errors, reset } = Se({
    subscription_id: "",
    message: ""
  });
  const { flash } = q().props;
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/refund-request", {
      preserveScroll: true,
      onSuccess: () => {
        reset();
      }
    });
  };
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: "bg-warning", label: "Pending" },
      approved: { class: "bg-success", label: "Approved" },
      declined: { class: "bg-danger", label: "Declined" },
      cancelled: { class: "bg-info", label: "Cancelled" }
    };
    const config = statusConfig[status] || { class: "bg-secondary", label: status };
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge ${config.class}`, children: config.label });
  };
  const hasActiveSubscription = activeSubscriptions.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { activeTab: "Refund Request", metaTitle: "Refund Request", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 mb-md-5", children: "Refund Request" }) }) }),
    (flash == null ? void 0 : flash.success) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDismissible,
      {
        variant: "success",
        heading: "Success",
        message: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: flash.success })
      }
    ) }) }),
    !hasActiveSubscription && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body text-center py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/images/svgs/icon-card.svg",
          alt: "No Subscription",
          width: "120",
          height: "120",
          className: "text-muted"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "h4 mb-3", children: "No Active Subscription" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-4", children: "You need an active subscription to request a refund. Please purchase a subscription plan first." })
    ] }) }) }) }),
    hasActiveSubscription && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "mb-4 fs-5", children: "Submit Refund Request" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-12 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "subscription_id", className: "form-label", children: [
            "Select Subscription ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-danger", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "subscription_id",
              className: `form-select ${errors.subscription_id ? "is-invalid" : ""}`,
              value: data.subscription_id,
              onChange: (e) => setData("subscription_id", e.target.value),
              required: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Choose a subscription..." }),
                activeSubscriptions.map((subscription) => {
                  var _a;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: subscription.id, children: [
                    ((_a = subscription.plan) == null ? void 0 : _a.name) || `Subscription #${subscription.id}`,
                    " ",
                    "(",
                    subscription.type,
                    ") - ",
                    subscription.stripe_status
                  ] }, subscription.id);
                })
              ]
            }
          ),
          errors.subscription_id && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.subscription_id })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-12 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "message", className: "form-label", children: [
            "Refund Reason ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-danger", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "message",
              className: `form-control rounded ${errors.message ? "is-invalid" : ""}`,
              rows: 5,
              value: data.message,
              onChange: (e) => setData("message", e.target.value),
              placeholder: "Please provide a detailed reason for your refund request (minimum 10 characters)...",
              required: true,
              minLength: 10,
              maxLength: 1e3
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-text", children: [
            data.message.length,
            "/1000 characters"
          ] }),
          errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            className: "btn btn-primary",
            disabled: processing || !data.subscription_id || !data.message.trim() || data.message.length < 10,
            children: processing ? "Submitting..." : "Submit Refund Request"
          }
        ) })
      ] }) })
    ] }) }) }) }),
    refundRequests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "mb-4 fs-5", children: "Your Refund Requests" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "table table-hover", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Request ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Subscription" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Requested At" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Message" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: refundRequests.map((request) => {
          var _a, _b;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
              "#",
              request.id
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
              ((_b = (_a = request.subscription) == null ? void 0 : _a.plan) == null ? void 0 : _b.name) || `Subscription #${request.subscription_id}`,
              request.subscription && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted ms-2", children: [
                "(",
                request.subscription.type,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: getStatusBadge(request.status) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: new Date(request.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { maxWidth: "300px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 text-truncate", title: request.message, children: request.message }) }) })
          ] }, request.id);
        }) })
      ] }) })
    ] }) }) }) }),
    hasActiveSubscription && refundRequests.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body text-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-0", children: "You haven't submitted any refund requests yet." }) }) }) }) })
  ] });
}
export {
  RefundRequestIndex as default
};

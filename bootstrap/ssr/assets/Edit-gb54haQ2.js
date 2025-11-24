import { j as jsxRuntimeExports, J as Je, f as fe, q, r as reactExports } from "../ssr.js";
import { D as DashboardLayout } from "./DashboardLayout-BpzRkgtx.js";
import UserProfile from "./UserProfile-Y1MDd8QC.js";
import MyPuppies from "./MyPuppies-ZlnGIg4P.js";
import { B as Button } from "./Button-C_TFTgI3.js";
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
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
import "./MetaTags-D4JDM_I7.js";
import "./InputLabel-DAgP54zY.js";
import "./TextInput-CTPfMhdJ.js";
import "./UserAvatar-CaV01o4d.js";
import "./InputError-BrGvvBAw.js";
import "./IconInput-DVVkR3jY.js";
import "./Modal-CCl1U1i1.js";
import "./index-DbhDZzck.js";
import "./divWithClassName-CPmFGv-w.js";
import "./setPrototypeOf-DxvfjWzF.js";
import "./index-DgY4nH2N.js";
import "./index-D7h8hQJR.js";
import "./MapInput-Bo1DSz82.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./PhoneVerification-BSU1rcRk.js";
import "./Card-Dfnu7dI_.js";
import "./Tooltip-fHI3Ksjq.js";
import "./extends-BwmuZ0dU.js";
const SavedSearchCard = ({ saved_search }) => {
  const handleSearch = () => {
    const payload = Object.entries(saved_search.payload.filter).map(([key, obj]) => ({
      [key]: (obj == null ? void 0 : obj.value) ?? obj
    }));
    const flattenedPayload = payload.reduce((acc, current) => {
      const [key, value] = Object.entries(current)[0];
      acc[key] = value;
      return acc;
    }, {});
    fe.visit(`/puppies`, {
      data: { filter: flattenedPayload },
      only: [
        "puppies",
        "breed_filter_list",
        "state_filter_list"
      ],
      method: "get",
      preserveState: true
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-4", children: saved_search.name ?? saved_search.created_at }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: handleSearch, className: "btn btn-primary fs-2", href: "#", children: "View Search" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Delete saved search", className: "btn btn-outline-extralight border btn-white text-dark fs-2", href: `/saved-search/${saved_search.id}`, children: "Delete" })
    ] })
  ] }) });
};
function Edit({
  mustVerifyEmail,
  status,
  puppies,
  saved_searches,
  breeder_requests,
  tab
}) {
  const errors = q().props.errors ?? {};
  const user = q().props.auth.user;
  const [currentTab, setCurrentTab] = reactExports.useState(tab ?? "Account Settings");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { activeTab: tab ?? "Account Settings", metaTitle: "Profile", children: [
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
    mustVerifyEmail && (user == null ? void 0 : user.email_verified_at) == null && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDismissible, { variant: "primary", heading: "Verify your email", message: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        " Before you get started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Je,
          {
            "aria-label": "Resend verification email",
            href: "/email/verification-notification",
            method: "post",
            as: "button",
            className: "border-0 bg-transparent text-primary text-decoration-underline ",
            children: "Click here to re-send the verification email."
          }
        )
      ] }),
      " "
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-content", id: "pills-tabContent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: errors && Object.keys(errors).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "alert alert-danger", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: Object.keys(errors).map((key, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: errors[key] }, index)) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: ` tab-pane fade  ${currentTab == "Account Settings" ? "show active" : ""} `,
          id: "pills-account-settings",
          role: "tabpanel",
          "aria-labelledby": "pills-account-settings-tab",
          tabIndex: 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserProfile, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: ` tab-pane fade ${currentTab == "Saved Search" ? "show active" : ""} `,
          id: "pills-saved-search",
          role: "tabpanel",
          "aria-labelledby": "pills-saved-search-tab",
          tabIndex: 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body pb-0", children: saved_searches && saved_searches.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: saved_searches.map((saved_search, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-xx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SavedSearchCard, { saved_search }, index) })) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-8 text-center py-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/images/svgs/icon-bookmarks.svg",
                alt: "Saved Search",
                width: "120",
                height: "120",
                className: "text-muted"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "h4 mb-3", children: "No saved searches yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-0", children: "Save your favorite search criteria to quickly find puppies that match your preferences!" })
          ] }) }) }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: ` tab-pane fade ${currentTab == "My Puppies" ? "show active" : ""} `,
          id: "pills-my-puppies",
          role: "tabpanel",
          "aria-labelledby": "pills-my-puppies-tab",
          tabIndex: 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body pb-0", children: puppies && /* @__PURE__ */ jsxRuntimeExports.jsx(MyPuppies, { puppies }) }) })
        }
      )
    ] })
  ] });
}
export {
  Edit as default
};

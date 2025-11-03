import { q, j as jsxRuntimeExports, J as Je } from "../ssr.js";
import { L as Layout } from "./Layout-BlHTUbAr.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
const ListPill = ({ name, href, logo, tab, isRoute = false }) => {
  const { url } = q();
  let isActive = false;
  if (isRoute) {
    if (href.startsWith("/dashboard")) {
      isActive = url.startsWith("/dashboard");
    } else if (href.includes("tab=")) {
      const tabParam = href.split("tab=")[1].split("&")[0];
      isActive = url.includes(`tab=${encodeURIComponent(tabParam)}`) || url.includes(`tab=${encodeURIComponent(name)}`) || url === "/profile" && name === "Account Settings" && tab === "Account Settings";
    } else if (href === "/profile") {
      isActive = url === "/profile" && name === "Account Settings" && !url.includes("tab=") || url.includes("/profile") && tab === name;
    } else {
      isActive = url === href || name === tab;
    }
  } else {
    isActive = name === tab;
  }
  if (isRoute) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "nav-item", role: "presentation", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Je,
      {
        href,
        className: `nav-link d-flex align-items-center gap-3 rounded-pill d-block w-100 fw-medium text-start ${isActive ? "active" : ""}`,
        role: "tab",
        "aria-selected": isActive,
        children: [
          logo && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "urpuppy-img", width: "20", height: "20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "d-none d-md-block", children: name })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "nav-item", role: "presentation", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      className: `nav-link d-flex align-items-center gap-3 rounded-pill d-block w-100 fw-medium text-start ${isActive ? "active" : ""}`,
      "data-bs-toggle": "pill",
      "data-bs-target": href,
      type: "button",
      role: "tab",
      "aria-controls": href,
      "aria-selected": isActive,
      children: [
        logo && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "urpuppy-img", width: "20", height: "20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "d-none d-md-block", children: name })
      ]
    }
  ) });
};
const NavigationSettings = [
  {
    name: "Dashboard",
    route: "/dashboard",
    logo: "../images/svgs/icon-home.svg",
    showForRoles: ["seller", "breeder"]
  },
  {
    name: "Account Settings",
    route: "/profile",
    routeParam: "tab=Account Settings",
    logo: "../images/svgs/icon-user-dark.svg",
    showForRoles: ["all"]
  },
  {
    name: "My Subscription",
    route: "/profile",
    routeParam: "tab=My Subscription",
    logo: "../images/svgs/icon-card.svg",
    showForRoles: ["seller", "breeder"]
  },
  {
    name: "Saved Search",
    route: "/profile",
    routeParam: "tab=Saved Search",
    logo: "../images/svgs/icon-bookmarks.svg",
    showForRoles: ["buyer"]
  },
  {
    name: "Favorites",
    route: "/favorites",
    logo: "../images/svgs/icon-heart.svg",
    showForRoles: ["all"]
  },
  {
    name: "My Puppies",
    route: "/profile",
    routeParam: "tab=My Puppies",
    logo: "../images/svgs/icon-paws-dark.svg",
    showForRoles: ["seller", "breeder"]
  }
];
function DashboardLayout({
  children,
  activeTab,
  title,
  metaTitle,
  navType = "secondary"
}) {
  const { auth } = q().props;
  const user = auth == null ? void 0 : auth.user;
  const getFilteredNavigation = () => {
    return NavigationSettings.filter((item) => {
      if (item.showForRoles.includes("all")) {
        return true;
      }
      if (item.showForRoles.includes("buyer") && !(user == null ? void 0 : user.is_seller) && !(user == null ? void 0 : user.is_breeder)) {
        return true;
      }
      if (item.showForRoles.includes("seller") && (user == null ? void 0 : user.is_seller)) {
        return true;
      }
      if (item.showForRoles.includes("breeder") && (user == null ? void 0 : user.is_breeder)) {
        return true;
      }
      return false;
    });
  };
  const getRoute = (item) => {
    if (item.routeParam) {
      return `${item.route}?${item.routeParam}`;
    }
    return item.route;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { navType, children: [
    metaTitle && /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: metaTitle }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-wrapper position-relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "account-settings py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      title && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 mb-md-5", children: title }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ul",
            {
              className: "nav nav-pills justify-content-center flex-lg-column gap-2 mb-4 mb-lg-0",
              id: "pills-tab",
              role: "tablist",
              children: getFilteredNavigation().map((item, index) => {
                const route = getRoute(item);
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ListPill,
                  {
                    tab: activeTab || "",
                    name: item.name,
                    logo: item.logo,
                    href: route,
                    isRoute: true
                  },
                  index
                );
              })
            }
          ),
          ((user == null ? void 0 : user.is_seller) || (user == null ? void 0 : user.is_breeder)) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Je,
            {
              href: "/seller/create",
              method: "get",
              as: "button",
              className: "btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+ List Ur Puppy" })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-9", children })
      ] })
    ] }) }) })
  ] });
}
export {
  DashboardLayout as D
};

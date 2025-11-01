import { r as reactExports, q, j as jsxRuntimeExports, J as Je } from "../ssr.js";
import Banner from "./Banner-BvA3qVgh.js";
import { P as PuppyCard } from "./Card-CrW8n-BK.js";
import { P as Pagination } from "./Pagination-DXd8plba.js";
import { L as Layout } from "./Layout-DW-GDqDp.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { M as Modal } from "./Modal-BtmenwCz.js";
import { T as TextInput } from "./TextInput-CTPfMhdJ.js";
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
import "./BreedFilter-kQyA1QOo.js";
import "./react-select.esm-BYLPphZM.js";
import "./index-ttmgawJR.js";
import "./extends-BwmuZ0dU.js";
import "./index-D7h8hQJR.js";
import "./floating-ui.dom-D9vmQZx1.js";
import "./GenericModal-Du41bhoJ.js";
import "./StateFilter-CWN9eHJ5.js";
import "./Tooltip-BCRubnSZ.js";
import "./index-DbhDZzck.js";
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
function SavedSearchModal({ has_search }) {
  var _a;
  const [show, setShow] = reactExports.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = q().props.auth.user;
  const [searchTitle, setSearchTitle] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: has_search == true && typeof window !== "undefined" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-end", children: [
    user && ((_a = user.roles) == null ? void 0 : _a.includes("buyer")) && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { rel: "nofollow", onClick: handleShow, href: "#", className: "btn btn-outline-extralight border btn-white text-dark", "data-bs-toggle": "modal", "data-bs-target": "#SaveThisSearch", children: "Save This Search" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal, { show, onHide: handleClose, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal.Body, { className: "py-8 px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-center text-primary", children: "Save This Search" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center", children: `You might name your search "Notifications for Puppy Availability." This label will remind you that you're seeking updates on new puppies that become available.` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("form", { action: "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Search Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { onChange: (e) => setSearchTitle(e.target.value), placeholder: "January 1, 2025 at 12:22 am" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal.Footer, { className: "d-flex justify-content-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Save Search", className: "btn btn-primary", href: "/saved-search", method: "post", data: {
          name: searchTitle,
          payload: JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.search)))
        }, onClick: handleClose, children: "Save Search" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { rel: "nofollow", onClick: handleClose, href: "#", className: "btn btn-outline-extralight border btn-white text-dark", "data-bs-toggle": "modal", "data-bs-target": "#SaveThisSearch", children: "Cancel" })
      ] })
    ] })
  ] }) }) });
}
const Index = ({ puppies, states, breeds, has_search, seo_title, seo_description, url }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: seo_title, description: seo_description, url }),
    !has_search ? /* @__PURE__ */ jsxRuntimeExports.jsx(Banner, { size: "md", header: "Puppies for Sale", subheader: "Countless Puppies Available For Sale Across the Country!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Banner, { size: "md", header: `${puppies.total} Results`, subheader: "Below the search bar, you can filter your preferred breeds." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "puppy-spotlight py-7 py-md-5 py-xl-9", id: "scroll-target", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SavedSearchModal, { has_search }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mb-4 mb-lg-8", children: (puppies == null ? void 0 : puppies.data) && (puppies == null ? void 0 : puppies.data.map((puppy) => /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyCard, { puppy }, puppy.id))) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pagination, { links: puppies.links })
    ] })
  ] });
};
export {
  Index as default
};

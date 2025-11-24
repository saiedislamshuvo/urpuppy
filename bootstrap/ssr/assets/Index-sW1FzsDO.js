import { j as jsxRuntimeExports, J as Je, r as reactExports, q } from "../ssr.js";
import Banner from "./Banner-DcN4hzU1.js";
import { F as FavoriteButton, C as CompareButton, P as PuppyCard } from "./Card-Dfnu7dI_.js";
import { P as Pagination } from "./Pagination-DXd8plba.js";
import { L as Layout } from "./Layout-DdG4gm-d.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { M as Modal } from "./Modal-CCl1U1i1.js";
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
import "./BreedFilter-BJk0nsmz.js";
import "./index-C9Hr-vST.js";
import "./react-select.esm-tWlRM8_L.js";
import "./setPrototypeOf-DxvfjWzF.js";
import "./extends-BwmuZ0dU.js";
import "./hoist-non-react-statics.cjs-BnF7CivY.js";
import "./index-DgY4nH2N.js";
import "./index-D7h8hQJR.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./GenericModal-BuSM2RnD.js";
import "./StateFilter-FffLDch6.js";
import "./Tooltip-fHI3Ksjq.js";
import "./index-DbhDZzck.js";
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
import "./divWithClassName-CPmFGv-w.js";
const ListCard = ({ puppy, className = "mb-3", location = "list" }) => {
  var _a, _b, _c;
  if (!puppy) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "puppy-spotlight-item rounded-1 overflow-hidden bg-white shadow-sm",
      "data-aos": "fade-up",
      "data-aos-delay": "600",
      "data-aos-duration": "1000",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Je, { prefetch: true, preserveScroll: false, href: `/puppies/${puppy.slug}`, className: "puppy-spotlight-img position-relative overflow-hidden d-block flex-shrink-0", style: { width: "150px", minWidth: "140px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: puppy.image, alt: "urpuppy-img", className: "w-100 h-100 object-fit-cover", style: { minHeight: "140px" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex align-items-baseline justify-content-between position-absolute top-0 start-0 w-100 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex align-items-center gap-1 flex-wrap", children: puppy.is_new ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge text-bg-success", style: { fontSize: "0.65rem" }, children: "NEW" }) : null }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "puppy-spotlight-details flex-grow-1 d-flex flex-column", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pt-2 flex-grow-1 d-flex flex-column", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center justify-content-between mb-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "fs-8 font-work-sans mb-0 flex-grow-1", children: puppy.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex gap-1 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FavoriteButton, { uniqueId: location + puppy.id, sellerId: (_a = puppy.seller) == null ? void 0 : _a.id, puppyId: puppy.id, isFavorite: puppy.is_favorite }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CompareButton, { uniqueId: location + puppy.id, sellerId: (_b = puppy.seller) == null ? void 0 : _b.id, puppyId: puppy.id, isCompared: puppy.is_compared })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row g-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2 mb-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-map-pin.svg", alt: "urpuppy-img", width: "16", height: "16" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 small", children: `${(puppy == null ? void 0 : puppy.city) || ""}${((puppy == null ? void 0 : puppy.city) || "").length > 0 ? ", " : ""}${(puppy == null ? void 0 : puppy.state) || ""}` })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-paws-dark.svg", alt: "urpuppy-img", width: "16", height: "16" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 small", children: ((_c = puppy.breeds[0]) == null ? void 0 : _c.name) ?? null })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-female.svg", alt: "urpuppy-img", width: "16", height: "16" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 small text-capitalize", children: puppy.gender })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center justify-content-end gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-calendar.svg", alt: "urpuppy-img", width: "16", height: "16" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 small", children: puppy.age })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2 border-top d-flex align-items-center justify-content-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "fs-5 font-work-sans mb-0", children: puppy.formatted_price }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Je, { prefetch: true, preserveScroll: false, href: `/puppies/${puppy.slug}`, className: "btn btn-primary btn-sm d-flex align-items-center gap-1 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-paws.svg", alt: "urpuppy-img", width: "14", height: "14" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View" })
            ] })
          ] })
        ] })
      ] })
    }
  ) });
};
function SavedSearchModal({ has_search }) {
  const [show, setShow] = reactExports.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = q().props.auth.user;
  const [searchTitle, setSearchTitle] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: has_search == true && typeof window !== "undefined" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-end", children: [
    user && !(user.is_breeder || user.is_seller) && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { rel: "nofollow", onClick: handleShow, href: "#", className: "btn btn-outline-extralight border btn-white text-dark", "data-bs-toggle": "modal", "data-bs-target": "#SaveThisSearch", children: "Save This Search" }),
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
const Index = ({ puppies, states, breeds, breed, has_search, seo_title, seo_description, url }) => {
  const { settings } = q().props;
  const defaultHeader = (settings == null ? void 0 : settings.puppies_hero_title) || "Puppies for Sale";
  const defaultSubheader = (settings == null ? void 0 : settings.puppies_hero_subtitle) || "Countless Puppies Available For Sale Across the Country!";
  const defaultBackground = (settings == null ? void 0 : settings.puppies_hero_background) || void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: seo_title, description: seo_description, url }),
    !has_search ? /* @__PURE__ */ jsxRuntimeExports.jsx(Banner, { size: "md", header: defaultHeader, subheader: defaultSubheader, backgroundImage: defaultBackground }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Banner, { size: "md", header: `${puppies.total} Results`, subheader: `Available ${breed || ""} Puppies Based on Your Search` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "puppy-spotlight py-7 py-md-5 py-xl-9", id: "scroll-target", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SavedSearchModal, { has_search }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mb-4 mb-lg-8 d-none d-md-flex", children: (puppies == null ? void 0 : puppies.data) && (puppies == null ? void 0 : puppies.data.map((puppy) => /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyCard, { puppy }, puppy.id))) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-block d-md-none mb-4 mb-lg-8", children: (puppies == null ? void 0 : puppies.data) && (puppies == null ? void 0 : puppies.data.map((puppy) => /* @__PURE__ */ jsxRuntimeExports.jsx(ListCard, { puppy }, puppy.id))) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pagination, { links: puppies.links })
    ] })
  ] });
};
export {
  Index as default
};

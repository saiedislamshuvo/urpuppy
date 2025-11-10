import { j as jsxRuntimeExports, J as Je } from "../ssr.js";
import { L as Layout } from "./Layout-CVJc5AuP.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { P as Pagination } from "./Pagination-DXd8plba.js";
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
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
const Index = ({ compare_puppies }) => {
  const puppies = compare_puppies.data || [];
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };
  const compareFields = [
    { key: "image", label: "Image & Name" },
    { key: "gender", label: "Gender" },
    { key: "birth_date", label: "Date of Birth" },
    { key: "price", label: "Price" },
    { key: "breed", label: "Breed" },
    { key: "color", label: "Color" },
    { key: "patterns", label: "Patterns" },
    { key: "traits", label: "Traits" },
    { key: "health_certificate", label: "Health Certificate" },
    { key: "vaccinated", label: "Vaccinated" },
    { key: "vet_examination", label: "Vet Examination" },
    { key: "travel_ready", label: "Travel Ready" },
    { key: "delivery_included", label: "Delivery Included" }
  ];
  const getFieldValue = (puppy, fieldKey) => {
    var _a, _b, _c;
    switch (fieldKey) {
      case "image":
        return { type: "image", value: puppy };
      case "gender":
        return { type: "text", value: puppy.gender || "N/A" };
      case "birth_date":
        return { type: "text", value: formatDate(puppy.birth_date) };
      case "price":
        return { type: "text", value: puppy.formatted_price || "N/A" };
      case "breed":
        return { type: "text", value: ((_a = puppy.breeds) == null ? void 0 : _a.map((b) => b.name).join(", ")) || "N/A" };
      case "color":
        return { type: "text", value: ((_b = puppy.puppy_colors) == null ? void 0 : _b.map((c) => c.name).join(", ")) || "N/A" };
      case "patterns":
        return { type: "text", value: puppy.patterns || "N/A" };
      case "traits":
        return { type: "text", value: ((_c = puppy.puppy_traits) == null ? void 0 : _c.map((t) => t.name).join(", ")) || "N/A" };
      case "health_certificate":
        return { type: "boolean", value: puppy.has_health_certificate ?? false };
      case "vaccinated":
        return { type: "boolean", value: puppy.has_vaccine ?? false };
      case "vet_examination":
        return { type: "boolean", value: puppy.has_vet_exam ?? false };
      case "travel_ready":
        return { type: "boolean", value: puppy.has_travel_ready ?? false };
      case "delivery_included":
        return { type: "boolean", value: puppy.has_delivery_included ?? false };
      default:
        return { type: "text", value: "N/A" };
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: "Compare" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "hero-section position-relative d-flex align-items-center pt-11 pb-10",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container position-relative z-1 pt-lg-1 mt-lg-3 mb-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-xl-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "text-white text-center fs-11 mb-1",
            "data-aos": "fade-up",
            "data-aos-delay": "100",
            "data-aos-duration": "1000",
            children: "My Compare List"
          }
        ) }) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "puppy-spotlight py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: puppies.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-responsive mb-4 mb-lg-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "table mb-0", style: { borderCollapse: "collapse", border: "none" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #e0e0e0", borderTop: "none", borderLeft: "none", borderBottom: "1px solid #e0e0e0", padding: "1rem", backgroundColor: "#f8f9fa", fontWeight: 600, minWidth: "200px" }, children: "Information" }),
          puppies.map((puppy) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { border: "1px solid #e0e0e0", borderTop: "none", borderRight: "none", borderBottom: "1px solid #e0e0e0", padding: "1rem", backgroundColor: "#f8f9fa", fontWeight: 600, textAlign: "center", minWidth: "200px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { href: `/puppies/${puppy.slug}`, className: "text-decoration-none text-dark", children: puppy.name }) }, puppy.id))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          compareFields.map((field, fieldIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderLeft: "none", borderTop: "none", padding: "1rem", fontWeight: 500, backgroundColor: "#f8f9fa", verticalAlign: "middle" }, children: field.label }),
            puppies.map((puppy) => {
              const fieldData = getFieldValue(puppy, field.key);
              return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderRight: "none", borderTop: "none", padding: "1rem", textAlign: "center", verticalAlign: "middle" }, children: fieldData.type === "image" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex flex-column align-items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { href: `/puppies/${puppy.slug}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: puppy.image,
                    alt: puppy.name,
                    style: { width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px", marginBottom: "0.5rem" }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { href: `/puppies/${puppy.slug}`, className: "text-decoration-none text-dark fw-medium", children: puppy.name }),
                puppy.breeds && puppy.breeds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-0 small", children: puppy.breeds[0].name })
              ] }) : fieldData.type === "boolean" ? fieldData.value ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge bg-success", children: "Yes" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge bg-secondary", children: "No" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: String(fieldData.value) }) }, puppy.id);
            })
          ] }, field.key)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderLeft: "none", borderTop: "none", padding: "1rem", fontWeight: 500, backgroundColor: "#f8f9fa", verticalAlign: "middle" }, children: "Remove from Compare" }),
            puppies.map((puppy) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid #e0e0e0", borderRight: "none", borderTop: "none", padding: "1rem", textAlign: "center", verticalAlign: "middle" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Je,
              {
                method: "patch",
                href: `/compares/${puppy.id}`,
                preserveState: false,
                preserveScroll: false,
                className: "d-inline-flex align-items-center justify-content-center",
                style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "1px solid #dc3545",
                  backgroundColor: "transparent",
                  color: "#dc3545",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.2s"
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.backgroundColor = "#dc3545";
                  e.currentTarget.style.color = "white";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#dc3545";
                },
                onClick: (e) => {
                  if (!confirm("Are you sure you want to remove this puppy from compare?")) {
                    e.preventDefault();
                  }
                },
                title: "Remove from Compare",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 4L4 12M4 4L12 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
              }
            ) }, puppy.id))
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mb-4 mb-lg-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Je, { href: "/puppies", className: "btn btn-primary d-inline-flex align-items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-paws.svg", alt: "urpuppy-img" }),
        "Add More Puppies to Compare"
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pagination, { links: compare_puppies.links })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "No puppies in your compare list yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Je, { href: "/puppies", className: "btn btn-primary d-inline-flex align-items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-paws.svg", alt: "urpuppy-img" }),
        "Add Puppies to Compare"
      ] })
    ] }) }) })
  ] });
};
export {
  Index as default
};

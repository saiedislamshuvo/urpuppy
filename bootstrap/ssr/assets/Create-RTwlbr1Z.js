import { q, S as Se, j as jsxRuntimeExports, a as je } from "../ssr.js";
import { B as Breadcrumb } from "./Breadcrumb-D8nxHqVE.js";
import { T as TextInput } from "./TextInput-CTPfMhdJ.js";
import { I as InputLabel } from "./InputLabel-DAgP54zY.js";
import { S as SemiHeading, a as SelectInput, Y as YesOrNoRadioInput, F as FileUpload } from "./SelectInput-suCCsBZq.js";
import { D as DateInput } from "./DateInput-BjZcxFYe.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
import { l as lodashExports } from "./lodash-CtkUkZej.js";
import { H as Heading } from "./Heading-vwwW7yNV.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { D as DashboardLayout } from "./DashboardLayout-C5wTgSwk.js";
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
import "./index-Bj-wIX-d.js";
import "./Button-C_TFTgI3.js";
import "./react-select.esm-CTxScYKD.js";
import "./extends-BwmuZ0dU.js";
import "./index-D7h8hQJR.js";
import "./floating-ui.dom-D9vmQZx1.js";
import "./Layout-q9Zm-kbI.js";
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
const PuppyListingForm = ({
  puppy_edit
}) => {
  const patterns = q().props.patterns;
  const colors = q().props.colors;
  const siblings = q().props.siblings;
  const breeds = q().props.breeds;
  const initialFormData = {
    images: (puppy_edit == null ? void 0 : puppy_edit.preview_images) ?? [],
    puppy_breeds: (puppy_edit == null ? void 0 : puppy_edit.breeds) ?? [],
    videos: (puppy_edit == null ? void 0 : puppy_edit.video) != null ? [puppy_edit == null ? void 0 : puppy_edit.video] : [],
    has_vaccine: (puppy_edit == null ? void 0 : puppy_edit.has_vaccine) ? "yes" : "no",
    has_health_certificate: (puppy_edit == null ? void 0 : puppy_edit.has_health_certificate) ? "yes" : "no",
    has_vet_exam: (puppy_edit == null ? void 0 : puppy_edit.has_vet_exam) ? "yes" : "no",
    has_delivery_included: (puppy_edit == null ? void 0 : puppy_edit.has_delivery_included) ? "yes" : "no",
    has_travel_ready: (puppy_edit == null ? void 0 : puppy_edit.has_travel_ready) ? "yes" : "no",
    has_certificate: (puppy_edit == null ? void 0 : puppy_edit.has_certificate) ? "yes" : "no",
    certificate_type: (puppy_edit == null ? void 0 : puppy_edit.certificate_type) ?? null,
    puppy_price: puppy_edit == null ? void 0 : puppy_edit.price,
    puppy_name: (puppy_edit == null ? void 0 : puppy_edit.name) ?? "",
    puppy_gender: (puppy_edit == null ? void 0 : puppy_edit.gender) ?? "Male",
    puppy_about: (puppy_edit == null ? void 0 : puppy_edit.description) ?? "",
    puppy_patterns: (puppy_edit == null ? void 0 : puppy_edit.puppy_patterns) ?? [],
    puppy_colors: (puppy_edit == null ? void 0 : puppy_edit.puppy_colors) ?? [],
    puppy_birth_date: (puppy_edit == null ? void 0 : puppy_edit.birth_date) ?? "",
    puppy_siblings: (puppy_edit == null ? void 0 : puppy_edit.siblings) ?? [],
    certificate_document: (puppy_edit == null ? void 0 : puppy_edit.certificate_document) ?? []
  };
  const { post, put, data, setData, errors, processing } = Se(initialFormData);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (puppy_edit) {
      put(`/account/puppies/${puppy_edit == null ? void 0 : puppy_edit.id}`);
    } else {
      post(`/account/puppies`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "puppy-details border-bottom mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SemiHeading, { title: "Puppy Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Puppy Name", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { value: data.puppy_name ?? "", onChange: (e) => setData("puppy_name", e.target.value) }),
            errors.puppy_name && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_name })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Puppy Price", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { value: data.puppy_price ?? "", onChange: (e) => setData("puppy_price", lodashExports.parseInt(e.target.value)) }),
            errors.puppy_price && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_price })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Gender", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: data.puppy_gender ?? "Male", onChange: (e) => setData("puppy_gender", e.target.value), className: "form-select shadow-none", "aria-label": "Default select example", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Male", children: "Male" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Female", children: "Female" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Date of Birth", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DateInput, { name: "puppy_birth_date", setData, value: data.puppy_birth_date ?? "" }),
            errors.puppy_birth_date && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_birth_date })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Puppy Bio", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: data.puppy_about ?? "", onChange: (e) => setData("puppy_about", e.target.value), className: "form-control rounded-1", id: "About", rows: 3, placeholder: "" }),
            errors.puppy_about && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_about })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Breeds", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectInput, { value: data.puppy_breeds ?? [], setData, multiple: true, name: "puppy_breeds", options: breeds }),
            errors.puppy_breeds && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_breeds })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Pattern/Coat ", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectInput, { value: data.puppy_patterns ?? [], setData, multiple: true, name: "puppy_patterns", options: patterns }),
            errors.puppy_patterns && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_patterns })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Color", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectInput, { value: data.puppy_colors ?? [], setData, multiple: true, name: "puppy_colors", options: colors }),
            errors.puppy_colors && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_colors })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label d-block", children: "Siblings Of" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectInput, { value: data.puppy_siblings ?? [], setData, multiple: true, name: "puppy_siblings", options: siblings })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "why-stand-out border-bottom mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SemiHeading, { title: "Why I Stand Out" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-lg-4 col-xxl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(YesOrNoRadioInput, { title: "Health Certificate", value: data.has_health_certificate ?? "no", name: "has_health_certificate", setData }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-lg-4 col-xxl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            YesOrNoRadioInput,
            {
              title: "Vaccinated",
              value: data.has_vaccine ?? "no",
              name: "has_vaccine",
              setData
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-lg-4 col-xxl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            YesOrNoRadioInput,
            {
              title: "Vet Exam",
              value: data.has_vet_exam ?? "no",
              name: "has_vet_exam",
              setData
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-lg-4 col-xxl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            YesOrNoRadioInput,
            {
              title: "Travel Ready",
              value: data.has_travel_ready ?? "no",
              name: "has_travel_ready",
              setData
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-lg-4 col-xxl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            YesOrNoRadioInput,
            {
              title: "Delivery Included",
              name: "has_delivery_included",
              value: data.has_delivery_included ?? "no",
              setData
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-lg-4 col-xxl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            YesOrNoRadioInput,
            {
              title: "Certificate",
              value: data.has_certificate ?? "no",
              name: "has_certificate",
              setData
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "certificate-details border-bottom mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SemiHeading, { title: "Certificate Details (Optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Certificate Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: data.certificate_type || "",
                onChange: (e) => setData("certificate_type", e.target.value || null),
                className: "form-select shadow-none",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Certificate Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "AKC", children: "AKC" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CKC", children: "CKC" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Other", children: "Other" })
                ]
              }
            ),
            errors.certificate_type && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.certificate_type })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Upload Certificate Document" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FileUpload,
              {
                defaultUrls: data.certificate_document ?? [],
                setData: (name, files) => setData("certificate_document", files),
                errors,
                name: "certificate_document",
                required: false
              }
            ),
            errors.certificate_document && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.certificate_document })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "upload-details", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-6 mb-4 mb-lg-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "fs-5 mb-3 pb-1", children: "Upload a Image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FileUpload,
            {
              defaultUrls: data.images ?? [],
              setData: (name, files) => setData("images", files),
              errors,
              name: "images",
              required: true
            }
          ),
          errors.images && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.images })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "fs-5 mb-3 pb-1", children: "Upload a Video" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FileUpload,
            {
              name: "videos",
              errors,
              setData: (name, files) => setData("videos", files),
              defaultUrls: data.videos ?? [],
              required: true
            }
          ),
          errors.videos && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.videos })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: processing, type: "submit", className: "btn btn-primary d-flex align-items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-arrow-right.svg", alt: "urpuppy-img" }),
      " ",
      puppy_edit ? "Update Listing" : "Create Listing"
    ] })
  ] });
};
const Create = ({ url }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { activeTab: "My Puppies", metaTitle: "Create Puppy Listing", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: "Create Puppy Listing", url }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(je, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "robots", content: "noindex" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { links: [
        { label: "My Puppies", link: "/profile/edit?tab=My Puppies" },
        { label: "Create Listing", link: "#" }
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { title: "List your puppy", description: "Create a new listing for your puppy." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyListingForm, { puppy_edit: null })
    ] })
  ] });
};
export {
  Create as default
};

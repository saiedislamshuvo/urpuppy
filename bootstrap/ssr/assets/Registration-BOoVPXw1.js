import { q, S as Se, r as reactExports, j as jsxRuntimeExports, a as je } from "../ssr.js";
import { B as Breadcrumb } from "./Breadcrumb-D8nxHqVE.js";
import { T as TextInput } from "./TextInput-CTPfMhdJ.js";
import { I as InputLabel } from "./InputLabel-DAgP54zY.js";
import { I as IconInput } from "./IconInput-DVVkR3jY.js";
import { S as SemiHeading, a as SelectInput, Y as YesOrNoRadioInput, F as FileUpload } from "./SelectInput-suCCsBZq.js";
import { D as DateInput } from "./DateInput-BjZcxFYe.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
import { l as lodashExports } from "./lodash-CtkUkZej.js";
import { P as PhoneNumberInput, M as MapInput } from "./MapInput-CKvZeGou.js";
import { H as Heading } from "./Heading-vwwW7yNV.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { L as Layout } from "./Layout-q9Zm-kbI.js";
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
import "./index-DbhDZzck.js";
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
const SellerRegistrationForm = ({
  puppy_edit,
  puppy_count: puppyCountProp
}) => {
  const patterns = q().props.patterns;
  const colors = q().props.colors;
  const siblings = q().props.siblings;
  const breeds = q().props.breeds;
  const puppy_count = puppyCountProp ?? q().props.puppy_count;
  const user = q().props.auth.user;
  const isSellerRegistration = !puppy_count && !puppy_edit;
  const initialFormData = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    website: (user == null ? void 0 : user.website) ?? null,
    phone: (user == null ? void 0 : user.phone) ?? "",
    social_fb: (user == null ? void 0 : user.social_fb) ?? null,
    social_ig: (user == null ? void 0 : user.social_ig) ?? null,
    social_tiktok: (user == null ? void 0 : user.social_tiktok) ?? null,
    social_x: (user == null ? void 0 : user.social_x) ?? null,
    zip_code: user.zip_code ?? "",
    gmap_payload: null,
    // Only add puppy fields if not in seller registration mode
    ...!isSellerRegistration ? {
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
      city_id: user.city ?? null,
      city: user.city ?? null,
      state_id: null,
      puppy_about: (puppy_edit == null ? void 0 : puppy_edit.description) ?? "",
      puppy_patterns: (puppy_edit == null ? void 0 : puppy_edit.puppy_patterns) ?? [],
      puppy_colors: (puppy_edit == null ? void 0 : puppy_edit.puppy_colors) ?? [],
      puppy_birth_date: (puppy_edit == null ? void 0 : puppy_edit.birth_date) ?? "",
      puppy_siblings: (puppy_edit == null ? void 0 : puppy_edit.siblings) ?? [],
      image_upload: [],
      certificate_document: (puppy_edit == null ? void 0 : puppy_edit.certificate_document) ?? []
    } : {}
  };
  const { data, setData, post, errors, processing } = Se(initialFormData);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSellerRegistration) {
      post("/seller/profile");
      return;
    }
    if (puppy_edit) {
      post(`/seller/update/${puppy_edit == null ? void 0 : puppy_edit.id}`);
    } else {
      post(`/seller/store`);
    }
  };
  const [selectedGMap, setSelectedGMap] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (selectedGMap) {
      setData("gmap_payload", selectedGMap);
    }
  }, [selectedGMap]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
      isSellerRegistration && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contact-details border-bottom mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "fs-5 mb-3 pb-1", children: "Contact Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { isRequired: true, value: "First Name " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { onChange: (e) => setData("first_name", e.target.value), value: data.first_name }),
              errors.first_name && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.first_name })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { isRequired: true, value: "Last Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { onChange: (e) => setData("last_name", e.target.value), value: data.last_name }),
              errors.last_name && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.last_name })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { isRequired: true, value: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { onChange: (e) => setData("email", e.target.value), value: data.email }),
              errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.email })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { isRequired: true, value: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PhoneNumberInput,
                {
                  onChange: (e) => setData("phone", e),
                  value: data.phone,
                  className: "phone-input form-control"
                }
              ),
              errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.phone })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Website (Optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { type: "text", onChange: (e) => setData("website", e.target.value) }),
              errors.website && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.website })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Social Links (Optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-unstyled d-flex align-items-center gap-6 social-icon mb-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconInput, { value: data.social_fb ?? "", onChange: (e) => setData("social_fb", e.target.value), icon: "/images/svgs/icon-facebook-dark.svg" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconInput, { value: data.social_x ?? "", onChange: (e) => setData("social_x", e.target.value), icon: "/images/svgs/icon-twitter-dark.svg" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconInput, { value: data.social_tiktok ?? "", onChange: (e) => setData("social_tiktok", e.target.value), icon: "/images/svgs/icon-tiktok-dark.svg" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconInput, { value: data.social_ig ?? "", onChange: (e) => setData("social_ig", e.target.value), icon: "/images/svgs/icon-instagram-dark.svg" }) })
              ] }),
              errors.social_fb && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.social_fb }),
              errors.social_tiktok && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.social_tiktok }),
              errors.social_ig && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.social_ig }),
              errors.social_x && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.social_x })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "location-details border-bottom mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SemiHeading, { title: "Location Details (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted small mb-3", children: "You can optionally select your location on the map below. You can search for an address, click on the map, or use your current location." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MapInput,
            {
              initialAddress: user.address ?? "",
              onLocationSelect: setSelectedGMap
            }
          ),
          errors.gmap_payload && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.gmap_payload })
        ] })
      ] }),
      !isSellerRegistration && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
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
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: processing, type: "submit", className: "btn btn-primary d-flex align-items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-arrow-right.svg", alt: "urpuppy-img" }),
      " ",
      isSellerRegistration ? "Submit Profile" : "Submit Registration"
    ] })
  ] });
};
const Registration = ({ url, puppy_count, puppy_edit }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { navType: "secondary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: "Seller Registration", url }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(je, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "robots", content: "noindex" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-wrapper position-relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "information pt-4 pb-8 pb-lg-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { links: [
        { label: "Seller Registration", link: "/" }
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        !puppy_count ? /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { title: "Seller Registration", description: "Create your seller profile to connect with buyers and showcase your listings." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { title: "List your puppy", description: "Create a new listing for your puppy." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SellerRegistrationForm, { puppy_edit, puppy_count })
      ] })
    ] }) }) })
  ] });
};
export {
  Registration as default
};

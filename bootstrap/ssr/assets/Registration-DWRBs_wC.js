import { q, S as Se, r as reactExports, j as jsxRuntimeExports, a as je } from "../ssr.js";
import { B as Breadcrumb } from "./Breadcrumb-D8nxHqVE.js";
import { T as TextInput } from "./TextInput-CTPfMhdJ.js";
import { I as InputLabel } from "./InputLabel-DAgP54zY.js";
import { S as SemiHeading, a as SelectInput, Y as YesOrNoRadioInput, F as FileUpload } from "./SelectInput-DiOFFGRj.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
import { P as PhoneNumberInput, M as MapInput, D as DateInput } from "./MapInput-BZhFXzCL.js";
import { B as Button } from "./Button-C_TFTgI3.js";
import { H as Heading } from "./Heading-vwwW7yNV.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { L as Layout } from "./Layout-DW-GDqDp.js";
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
import "./index-ttmgawJR.js";
import "./react-select.esm-BYLPphZM.js";
import "./extends-BwmuZ0dU.js";
import "./index-D7h8hQJR.js";
import "./floating-ui.dom-D9vmQZx1.js";
import "./index-DbhDZzck.js";
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
const BreederRegistrationForm = ({ breeds }) => {
  const user = q().props.auth.user;
  const { data, setData, post, errors, processing } = Se({
    health_certificate: "yes",
    vaccinated: "yes",
    company_address: user.company_address ?? "",
    vet_exam: "yes",
    has_usda_registration: "no",
    about_company: (user == null ? void 0 : user.company_about) ?? "",
    established_date: (user == null ? void 0 : user.company_established_on) ?? "",
    company_phone: (user == null ? void 0 : user.company_phone) ?? "",
    kennel_name: (user == null ? void 0 : user.kennel_name) ?? "",
    fullname: (user == null ? void 0 : user.company_name) ?? "",
    company_email_address: (user == null ? void 0 : user.company_email_address) ?? "",
    travel_ready: "yes",
    delivery_included: "yes",
    breeds: (user == null ? void 0 : user.breeds) ?? [],
    city: null,
    state_id: null,
    zip_code: "",
    are_you_a_breeder: "yes",
    gallery: (user == null ? void 0 : user.gallery) ?? [],
    company_logo: null,
    videos: (user == null ? void 0 : user.video) != null ? [user == null ? void 0 : user.video] : [],
    gmap_payload: null
  });
  const [selectedGMap, setSelectedGMap] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (selectedGMap) {
      setData("gmap_payload", selectedGMap);
    }
  }, [selectedGMap]);
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/breeders");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, encType: "multipart/form-data", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contact-details border-bottom mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "fs-5 mb-3 pb-1", children: "Contact Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { isRequired: true, value: "Full Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { value: data.fullname, onChange: (e) => setData("fullname", e.target.value) }),
          errors.fullname && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.fullname })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "contact-details border-bottom mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { isRequired: true, value: "Kennel Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { value: data.kennel_name, onChange: (e) => setData("kennel_name", e.target.value) }),
          errors.kennel_name && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.kennel_name })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { isRequired: true, value: "Upload a Company Logo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { className: " file-upload-wrapper", type: "file", onChange: (e) => setData("company_logo", e.target.files[0]) }),
          errors.company_logo && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.company_logo })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "contact-details border-bottom mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { isRequired: true, value: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { value: data.company_email_address, type: "email", onChange: (e) => setData("company_email_address", e.target.value) }),
          errors.company_email_address && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.company_email_address })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { isRequired: true, value: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PhoneNumberInput,
            {
              value: data.company_phone,
              onChange: (e) => setData("company_phone", e),
              className: "phone-input form-control"
            }
          ),
          errors.company_phone && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.company_phone })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "location-details border-bottom mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SemiHeading, { title: "Location Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MapInput,
          {
            initialAddress: user.company_address ?? "",
            onLocationSelect: setSelectedGMap
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "location-details border-bottom mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Breed Type ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fs-1", children: " ( Max 4 Type ) " })
          ] }), isRequired: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectInput, { value: data.breeds, name: "breeds", setData, multiple: true, options: breeds }),
          errors.breeds && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.breeds })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "When did you start your business?", isRequired: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DateInput, { name: "established_date", setData, value: data.established_date }),
          errors.established_date && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.established_date })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "About Us", isRequired: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { value: data.about_company, onChange: (e) => setData("about_company", e.target.value) }),
          errors.about_company && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.about_company })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "why-stand-out border-bottom mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-lg-4 col-xxl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(YesOrNoRadioInput, { title: "USDA Registered", value: data.has_usda_registration, name: "has_usda_registration", setData }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "upload-details", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-6 mb-4 mb-lg-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "fs-5 mb-3 pb-1", children: "Upload a Image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FileUpload,
            {
              errors,
              setData: (name, files) => setData("gallery", files),
              defaultUrls: data.gallery,
              name: "gallery",
              required: true
            }
          ),
          errors.gallery && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.gallery })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "fs-5 mb-3 pb-1", children: "Upload a Video" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FileUpload,
            {
              name: "videos",
              setData: (name, files) => setData("videos", files),
              defaultUrls: data.videos,
              required: true
            }
          ),
          errors.videos && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.videos })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: processing, type: "button", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "../images/svgs/icon-arrow-right.svg",
          alt: "urpuppy-img"
        }
      ),
      " Submit Registration"
    ] })
  ] });
};
const Registration = ({ breeds }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { navType: "secondary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: "Registration" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(je, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "robots", content: "noindex" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-wrapper position-relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "information pt-4 pb-8 pb-lg-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { links: [
        {
          label: "Registration",
          link: "/register"
        }
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { title: "Breeder Registration", description: "Create your Breeder profile to connect" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BreederRegistrationForm, { breeds })
      ] })
    ] }) }) })
  ] });
};
export {
  Registration as default
};

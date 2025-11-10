import { q, S as Se, j as jsxRuntimeExports } from "../ssr.js";
import { T as TextInput } from "./TextInput-CTPfMhdJ.js";
import { I as InputLabel } from "./InputLabel-DAgP54zY.js";
import { S as SemiHeading, a as SelectInput, Y as YesOrNoRadioInput } from "./SelectInput-CKQ7NZN0.js";
import { G as GenericFileUpload } from "./GenericFileUpload-DRmancKi.js";
import { D as DateInput, M as MapInput } from "./MapInput-Bo1DSz82.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
import { l as lodashExports } from "./lodash-CtkUkZej.js";
const PuppyListingForm = ({
  puppy_edit
}) => {
  const patterns = q().props.patterns;
  const colors = q().props.colors;
  const breeds = q().props.breeds;
  const mapProvider = q().props.mapProvider;
  const defaultLocation = q().props.defaultLocation;
  const getInitialLocation = () => {
    if (puppy_edit && puppy_edit.lat && puppy_edit.lng) {
      return {
        lat: puppy_edit.lat,
        lng: puppy_edit.lng,
        address: puppy_edit.address ?? "",
        city: puppy_edit.city ?? "",
        street: puppy_edit.street ?? "",
        state: puppy_edit.state ?? "",
        shortState: puppy_edit.short_state ?? "",
        zipCode: puppy_edit.zip_code ?? ""
      };
    }
    return defaultLocation;
  };
  const initialLocation = getInitialLocation();
  const initialFormData = {
    images: (puppy_edit == null ? void 0 : puppy_edit.preview_images) ?? [],
    puppy_breeds: (puppy_edit == null ? void 0 : puppy_edit.breeds) ?? [],
    videos: (puppy_edit == null ? void 0 : puppy_edit.video) != null ? [puppy_edit == null ? void 0 : puppy_edit.video] : [],
    has_vaccine: (puppy_edit == null ? void 0 : puppy_edit.has_vaccine) ? "yes" : "no",
    has_health_certificate: (puppy_edit == null ? void 0 : puppy_edit.has_health_certificate) ? "yes" : "no",
    has_vet_exam: (puppy_edit == null ? void 0 : puppy_edit.has_vet_exam) ? "yes" : "no",
    has_delivery_included: (puppy_edit == null ? void 0 : puppy_edit.has_delivery_included) ? "yes" : "no",
    has_travel_ready: (puppy_edit == null ? void 0 : puppy_edit.has_travel_ready) ? "yes" : "no",
    certificate_type: (puppy_edit == null ? void 0 : puppy_edit.certificate_type) ?? null,
    puppy_price: puppy_edit == null ? void 0 : puppy_edit.price,
    puppy_name: (puppy_edit == null ? void 0 : puppy_edit.name) ?? "",
    puppy_gender: (puppy_edit == null ? void 0 : puppy_edit.gender) ?? "Male",
    puppy_about: (puppy_edit == null ? void 0 : puppy_edit.description) ?? "",
    puppy_patterns: (puppy_edit == null ? void 0 : puppy_edit.puppy_patterns) ?? [],
    puppy_colors: (puppy_edit == null ? void 0 : puppy_edit.puppy_colors) ?? [],
    puppy_birth_date: (puppy_edit == null ? void 0 : puppy_edit.birth_date) ?? "",
    certificate_document: (puppy_edit == null ? void 0 : puppy_edit.certificate_document) ?? [],
    location_lat: (initialLocation == null ? void 0 : initialLocation.lat) ?? null,
    location_lng: (initialLocation == null ? void 0 : initialLocation.lng) ?? null,
    location_address: (initialLocation == null ? void 0 : initialLocation.address) ?? null,
    location_city: (initialLocation == null ? void 0 : initialLocation.city) ?? null,
    location_street: (initialLocation == null ? void 0 : initialLocation.street) ?? null,
    location_state: (initialLocation == null ? void 0 : initialLocation.state) ?? null,
    location_short_state: (initialLocation == null ? void 0 : initialLocation.shortState) ?? null,
    location_zip_code: (initialLocation == null ? void 0 : initialLocation.zipCode) ?? null
  };
  const { post, put, data, setData, errors, processing } = Se(initialFormData);
  const handleLocationSelect = (location) => {
    setData({
      ...data,
      location_lat: location.lat,
      location_lng: location.lng,
      location_address: location.address,
      location_city: location.city,
      location_street: location.street,
      location_state: location.state,
      location_short_state: location.shortState,
      location_zip_code: location.zipCode
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (puppy_edit) {
      put(`/puppies-listing/${puppy_edit == null ? void 0 : puppy_edit.id}`);
    } else {
      post(`/puppies-listing`);
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Breeds", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectInput, { value: data.puppy_breeds ?? [], setData, multiple: true, name: "puppy_breeds", options: breeds }),
            errors.puppy_breeds && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_breeds })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Date of Birth", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DateInput, { name: "puppy_birth_date", setData, value: data.puppy_birth_date ?? "" }),
              errors.puppy_birth_date && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_birth_date })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Gender", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: data.puppy_gender ?? "Male", onChange: (e) => setData("puppy_gender", e.target.value), className: "form-select shadow-none", "aria-label": "Default select example", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Male", children: "Male" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Female", children: "Female" })
            ] })
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
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "certificate-details border-bottom mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SemiHeading, { title: "Certificate & Registration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border round", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 fw-semibold", children: "Certificate Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-check form-check-inline mb-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    className: "form-check-input",
                    type: "radio",
                    name: "certificate_type",
                    id: "certificate_akc",
                    value: "AKC",
                    checked: data.certificate_type === "AKC",
                    onChange: (e) => setData("certificate_type", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "form-check-label fs-2",
                    htmlFor: "certificate_akc",
                    onClick: () => setData("certificate_type", "AKC"),
                    children: "AKC"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-check form-check-inline mb-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    className: "form-check-input",
                    type: "radio",
                    name: "certificate_type",
                    id: "certificate_ckc",
                    value: "CKC",
                    checked: data.certificate_type === "CKC",
                    onChange: (e) => setData("certificate_type", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "form-check-label fs-2",
                    htmlFor: "certificate_ckc",
                    onClick: () => setData("certificate_type", "CKC"),
                    children: "CKC"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-check form-check-inline mb-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    className: "form-check-input",
                    type: "radio",
                    name: "certificate_type",
                    id: "certificate_other",
                    value: "Other",
                    checked: data.certificate_type === "Other",
                    onChange: (e) => setData("certificate_type", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "form-check-label fs-2",
                    htmlFor: "certificate_other",
                    onClick: () => setData("certificate_type", "Other"),
                    children: "Other"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-check form-check-inline mb-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    className: "form-check-input",
                    type: "radio",
                    name: "certificate_type",
                    id: "certificate_none",
                    value: "None",
                    checked: data.certificate_type === "None",
                    onChange: (e) => {
                      setData({
                        ...data,
                        certificate_type: e.target.value,
                        certificate_document: []
                      });
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "form-check-label fs-2",
                    htmlFor: "certificate_none",
                    onClick: () => {
                      setData({
                        ...data,
                        certificate_type: "None",
                        certificate_document: []
                      });
                    },
                    children: "None"
                  }
                )
              ] })
            ] }),
            data.certificate_type && data.certificate_type !== "None" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12 mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 fw-semibold", children: "Upload Certificate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GenericFileUpload,
                {
                  defaultUrls: data.certificate_document ?? [],
                  setData: (name, files) => setData("certificate_document", files),
                  errors,
                  name: "certificate_document",
                  required: false,
                  fileType: "documents",
                  accept: ".pdf,.doc,.docx",
                  label: "Certificate Document",
                  description: "Upload PDF or Word document",
                  borderColor: "#ff8c00",
                  hoverBorderColor: "#ff8c00",
                  backgroundColor: "#fff5e6"
                }
              ),
              errors.certificate_document && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.certificate_document })
            ] }) })
          ] }) }),
          errors.certificate_type && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.certificate_type })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "puppy-bio border-bottom mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Puppy Bio", isRequired: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: data.puppy_about ?? "", onChange: (e) => setData("puppy_about", e.target.value), className: "form-control rounded-1", id: "About", rows: 3, placeholder: "" }),
        errors.puppy_about && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.puppy_about })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "location-details border-bottom mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SemiHeading, { title: "Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Puppy Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted small mb-3", children: defaultLocation ? "Default location from your account is pre-filled. You can change it if needed." : "Select the location for this puppy listing. You can use the map to search or manually enter the address below." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MapInput,
            {
              provider: mapProvider,
              onLocationSelect: handleLocationSelect,
              initialAddress: initialLocation == null ? void 0 : initialLocation.address,
              initialLocation: initialLocation && initialLocation.lat != null && initialLocation.lng != null ? { lat: initialLocation.lat, lng: initialLocation.lng } : null
            }
          ),
          errors.location_lat && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_lat }),
          errors.location_lng && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_lng })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Full Address", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextInput,
              {
                value: data.location_address ?? "",
                onChange: (e) => setData("location_address", e.target.value),
                placeholder: "Enter full address"
              }
            ),
            errors.location_address && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_address })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "House & Street No", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextInput,
              {
                value: data.location_street ?? "",
                onChange: (e) => setData("location_street", e.target.value),
                placeholder: "Street address"
              }
            ),
            errors.location_street && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_street })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "City", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextInput,
              {
                value: data.location_city ?? "",
                onChange: (e) => setData("location_city", e.target.value),
                placeholder: "City"
              }
            ),
            errors.location_city && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_city })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "State", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextInput,
              {
                value: data.location_state ?? "",
                onChange: (e) => setData("location_state", e.target.value),
                placeholder: "State name"
              }
            ),
            errors.location_state && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_state })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "State Code", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextInput,
              {
                value: data.location_short_state ?? "",
                onChange: (e) => setData("location_short_state", e.target.value.toUpperCase()),
                placeholder: "e.g., CA, NY, TX",
                maxLength: 2
              }
            ),
            errors.location_short_state && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_short_state })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Zip Code", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextInput,
              {
                value: data.location_zip_code ?? "",
                onChange: (e) => setData("location_zip_code", e.target.value),
                placeholder: "Zip code"
              }
            ),
            errors.location_zip_code && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_zip_code })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "upload-details border-bottom mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-6 mb-4 mb-lg-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            GenericFileUpload,
            {
              defaultUrls: data.images ?? [],
              setData: (name, files) => setData("images", files),
              errors,
              name: "images",
              required: true,
              fileType: "images",
              accept: ".jpg,.jpeg,.png,.gif,.webp",
              label: "Upload Images",
              description: "Upload puppy images (JPG, PNG, GIF, WebP)",
              innerText: "Drag and drop a images here, or click to upload",
              watermark: {
                text: "urpuppy.com",
                opacity: 0.3,
                position: "tile",
                fontSize: void 0,
                color: "#ffffff"
              }
            }
          ),
          errors.images && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.images })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            GenericFileUpload,
            {
              name: "videos",
              errors,
              setData: (name, files) => setData("videos", files),
              defaultUrls: data.videos ?? [],
              required: false,
              fileType: "videos",
              accept: ".mp4,.mov,.avi,.webm",
              label: "Upload Video",
              description: "Upload puppy video (MP4, MOV, AVI, WebM)",
              innerText: "Drag and drop a video here, or click to upload"
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
export {
  PuppyListingForm as P
};

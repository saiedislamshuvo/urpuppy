import { q, R as React, r as reactExports, S as Se, j as jsxRuntimeExports, f as fe, a as je } from "../ssr.js";
import { B as Breadcrumb } from "./Breadcrumb-D8nxHqVE.js";
import { T as TextInput } from "./TextInput-CTPfMhdJ.js";
import { I as InputLabel } from "./InputLabel-DAgP54zY.js";
import { S as SemiHeading, a as SelectInput, Y as YesOrNoRadioInput } from "./SelectInput-BE0JG6ya.js";
import { M as MediaUploadSection } from "./MediaUploadSection-BhpzLGo7.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
import { M as MapInput, D as DateInput } from "./MapInput-UCdFIrt9.js";
import { B as Button } from "./Button-C_TFTgI3.js";
import { A as AsyncPaginate } from "./index-Cs9ZHUfq.js";
import { P as PhoneVerification } from "./PhoneVerification-DdW05rv3.js";
import { H as Heading } from "./Heading-vwwW7yNV.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { L as Layout } from "./Layout-DdG4gm-d.js";
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
import "./GenericFileUpload-zkRDq7DY.js";
import "./index-BQVxnAyW.js";
import "./index-DgY4nH2N.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./index-D7h8hQJR.js";
import "./setPrototypeOf-DxvfjWzF.js";
import "./extends-BwmuZ0dU.js";
import "./hoist-non-react-statics.cjs-BnF7CivY.js";
import "./index-DbhDZzck.js";
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
const BreederRegistrationForm = ({ breeds, gallery = [], videos = [], media_limits }) => {
  const user = q().props.auth.user;
  const mapProvider = q().props.mapProvider;
  const phoneVerificationRequired = q().props.phoneVerificationRequired ?? true;
  const getInitialLocation = () => {
    return {
      lat: user.lat ?? "",
      lng: user.lng ?? "",
      address: user.company_address ?? user.address ?? user.gmap_address ?? "",
      city: user.company_city ?? user.city ?? "",
      street: user.company_street ?? user.street ?? "",
      houseNo: user.company_house_no ?? "",
      state: user.company_state ?? user.state ?? "",
      shortState: user.company_short_state ?? user.short_state ?? "",
      zipCode: user.company_zip_code ?? user.zip_code ?? ""
    };
  };
  const initialLocation = getInitialLocation();
  console.log("initialLocation", initialLocation);
  const extractStateCode = (shortState) => {
    if (!shortState) return "";
    if (shortState.includes("-")) {
      return shortState.split("-").pop() || shortState;
    }
    return shortState;
  };
  const hasSavedLocationData = user && (user.company_address || user.company_city || user.company_street || user.company_house_no || user.company_state || user.company_short_state || user.company_zip_code);
  const isInitialLoad = React.useRef(true);
  const [selectedState, setSelectedState] = reactExports.useState(() => {
    const stateName = (initialLocation == null ? void 0 : initialLocation.state) ?? user.company_state ?? null;
    if (stateName) {
      return { label: stateName, value: stateName };
    }
    return null;
  });
  const [stateCodeOptions, setStateCodeOptions] = reactExports.useState([]);
  const [selectedStateCode, setSelectedStateCode] = reactExports.useState(() => {
    const stateCode = extractStateCode((initialLocation == null ? void 0 : initialLocation.shortState) ?? user.company_short_state ?? "");
    if (stateCode) {
      return { label: stateCode, value: stateCode };
    }
    return null;
  });
  const { data, setData, errors, processing } = Se({
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
    gallery: [],
    // Only new files, existing URLs are passed separately to MediaUploadSection
    company_logo: null,
    videos: [],
    // Only new files, existing URLs are passed separately to MediaUploadSection
    gmap_payload: null,
    // Location fields - pre-fill from user data if exists, otherwise empty
    location_lat: (initialLocation == null ? void 0 : initialLocation.lat) ?? null,
    location_lng: (initialLocation == null ? void 0 : initialLocation.lng) ?? null,
    location_address: (initialLocation == null ? void 0 : initialLocation.address) ?? (user.company_address ?? null),
    location_city: (initialLocation == null ? void 0 : initialLocation.city) ?? (user.company_city ?? null),
    location_street: (initialLocation == null ? void 0 : initialLocation.street) ?? (user.company_street ?? null),
    location_house_no: (initialLocation == null ? void 0 : initialLocation.houseNo) ?? (user.company_house_no ?? null),
    location_state: (initialLocation == null ? void 0 : initialLocation.state) ?? (user.company_state ?? null),
    location_short_state: (initialLocation == null ? void 0 : initialLocation.shortState) ?? (user.company_short_state ?? null),
    location_zip_code: (initialLocation == null ? void 0 : initialLocation.zipCode) ?? (user.company_zip_code ?? null)
  });
  const fetchStates = async (search, loadedOptions, { page }) => {
    try {
      const response = await fetch(
        `/api/puppy/states?page=${page}&search=${search}&all=false`
      );
      const data2 = await response.json();
      const transformedOptions = data2.data.map((state) => ({
        label: state.label,
        // State name
        value: state.label,
        // Use name as value instead of ID
        abbreviation: state.abbreviation
        // Include abbreviation for auto-fill
      }));
      if (page === 1 && !search) {
        const codes = transformedOptions.filter((state) => state.abbreviation).map((state) => ({
          label: state.abbreviation,
          value: state.abbreviation,
          stateName: state.label
        }));
        setStateCodeOptions(codes);
      }
      return {
        options: transformedOptions,
        hasMore: data2.current_page !== data2.last_page,
        additional: { page: data2.current_page + 1 }
      };
    } catch (error) {
      return {
        options: [],
        hasMore: false,
        additional: { page: 1 }
      };
    }
  };
  React.useEffect(() => {
    const loadStateCodes = async () => {
      try {
        const response = await fetch("/api/puppy/states?all=true");
        const data2 = await response.json();
        const codes = data2.data.filter((state) => state.abbreviation).map((state) => ({
          label: state.abbreviation,
          value: state.abbreviation,
          stateName: state.label
        }));
        setStateCodeOptions(codes);
      } catch (error) {
        console.error("Error loading state codes:", error);
      }
    };
    loadStateCodes();
  }, []);
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    if (selectedOption) {
      const stateCode = selectedOption.abbreviation || "";
      const stateCodeOption = stateCode ? { label: stateCode, value: stateCode } : null;
      setSelectedStateCode(stateCodeOption);
      setData({
        ...data,
        location_state: selectedOption.value,
        // Use the name as value
        location_short_state: stateCode
        // Auto-fill state code
      });
    } else {
      setSelectedStateCode(null);
      setData({
        ...data,
        location_state: null,
        location_short_state: null
      });
    }
  };
  const handleStateCodeChange = (selectedOption) => {
    setSelectedStateCode(selectedOption);
    if (selectedOption) {
      const correspondingCode = stateCodeOptions.find(
        (code) => code.value === selectedOption.value
      );
      if (correspondingCode && correspondingCode.stateName) {
        const stateOption = { label: correspondingCode.stateName, value: correspondingCode.stateName };
        setSelectedState(stateOption);
        setData({
          ...data,
          location_state: correspondingCode.stateName,
          location_short_state: selectedOption.value
        });
      } else {
        setData({
          ...data,
          location_short_state: selectedOption.value
        });
      }
    } else {
      setSelectedState(null);
      setData({
        ...data,
        location_state: null,
        location_short_state: null
      });
    }
  };
  const handleZipCodeChange = async (e) => {
    const zipCode = e.target.value;
    setData("location_zip_code", zipCode);
    if (zipCode && /^\d{5}$/.test(zipCode) && mapProvider) {
      try {
        const response = await fetch(`/api/geocode?address=${encodeURIComponent(zipCode)}`);
        const geocodeData = await response.json();
        if (geocodeData.results && geocodeData.results.length > 0) {
          const addressComponents = geocodeData.results[0].address_components;
          let city = "";
          let state = "";
          let stateCode = "";
          addressComponents.forEach((component) => {
            if (component.types.includes("locality")) {
              city = component.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
              state = component.long_name;
              stateCode = extractStateCode(component.short_name);
            }
          });
          if (city) {
            setData("location_city", city);
          }
          if (state && stateCode) {
            const stateOption = { label: state, value: state };
            setSelectedState(stateOption);
            const stateCodeOption = { label: stateCode, value: stateCode };
            setSelectedStateCode(stateCodeOption);
            setData({
              ...data,
              location_city: city || data.location_city,
              location_state: state,
              location_short_state: stateCode,
              location_zip_code: zipCode
            });
          }
        }
      } catch (error) {
        console.error("Error looking up zip code:", error);
      }
    }
  };
  const handleLocationSelect = (location) => {
    if (isInitialLoad.current && hasSavedLocationData) {
      setData({
        ...data,
        location_lat: location.lat,
        location_lng: location.lng
        // Don't update address fields - keep existing saved values
      });
      isInitialLoad.current = false;
      return;
    }
    const stateCode = extractStateCode(location.shortState);
    if (location.state) {
      const stateOption = { label: location.state, value: location.state };
      setSelectedState(stateOption);
    }
    if (stateCode) {
      const stateCodeOption = { label: stateCode, value: stateCode };
      setSelectedStateCode(stateCodeOption);
    }
    setData({
      ...data,
      location_lat: location.lat,
      location_lng: location.lng,
      location_address: location.address,
      location_city: location.city,
      location_street: location.street,
      location_house_no: location.houseNo ?? null,
      location_state: location.state,
      // This will be the state name
      location_short_state: stateCode,
      // Use extracted state code
      location_zip_code: location.zipCode
    });
    isInitialLoad.current = false;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const existingGalleryUrls = gallery.length > 0 ? gallery : (user == null ? void 0 : user.gallery) ?? [];
    const existingVideoUrls = videos.length > 0 ? videos : (user == null ? void 0 : user.video) != null ? [user == null ? void 0 : user.video] : [];
    const existingGalleryUrlsFiltered = existingGalleryUrls.filter((url) => typeof url === "string");
    const newGalleryFiles = Array.isArray(data.gallery) ? data.gallery.filter((item) => item instanceof File) : [];
    const galleryToSubmit = [
      ...existingGalleryUrlsFiltered,
      // Existing URLs
      ...newGalleryFiles
      // New files only
    ];
    const existingVideoUrlsFiltered = existingVideoUrls.filter((url) => typeof url === "string");
    const newVideoFiles = Array.isArray(data.videos) ? data.videos.filter((item) => item instanceof File) : [];
    const videosToSubmit = [
      ...existingVideoUrlsFiltered,
      // Existing URLs
      ...newVideoFiles
      // New files only
    ];
    const submitData = {
      ...data,
      gallery: galleryToSubmit.length > 0 ? galleryToSubmit : null,
      videos: videosToSubmit.length > 0 ? videosToSubmit : null
    };
    fe.post("/breeders", submitData);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, encType: "multipart/form-data", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contact-details border-bottom mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "fs-5 mb-3 pb-1", children: "Contact Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { isRequired: true, value: "First Name" }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-6", children: [
          user && /* @__PURE__ */ jsxRuntimeExports.jsx(
            PhoneVerification,
            {
              phoneNumber: data.company_phone || user.company_phone,
              phoneType: "company_phone",
              isVerified: user.company_phone_verified_at ? true : false,
              onPhoneChange: (phone) => setData("company_phone", phone),
              label: "Phone",
              required: true,
              skipVerification: !phoneVerificationRequired
            }
          ),
          errors.company_phone && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.company_phone })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "location-details border-bottom mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SemiHeading, { title: "Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Company Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted small mb-3", children: "Select your company location. You can use the map to search or manually enter the address below." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MapInput,
            {
              provider: mapProvider,
              onLocationSelect: handleLocationSelect,
              initialAddress: (initialLocation == null ? void 0 : initialLocation.address) ?? data.location_address ?? void 0,
              initialLocation: initialLocation && initialLocation.lat != null && initialLocation.lng != null && !isNaN(Number(initialLocation.lat)) && !isNaN(Number(initialLocation.lng)) && (Number(initialLocation.lat) !== 0 || Number(initialLocation.lng) !== 0) ? { lat: Number(initialLocation.lat), lng: Number(initialLocation.lng) } : data.location_lat != null && data.location_lng != null && !isNaN(Number(data.location_lat)) && !isNaN(Number(data.location_lng)) && (Number(data.location_lat) !== 0 || Number(data.location_lng) !== 0) ? { lat: Number(data.location_lat), lng: Number(data.location_lng) } : null,
              skipInitialLocationSelect: hasSavedLocationData
            }
          ),
          errors.location_lat && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_lat }),
          errors.location_lng && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_lng })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "House No" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextInput,
              {
                value: data.location_house_no ?? "",
                onChange: (e) => setData("location_house_no", e.target.value),
                placeholder: "House/Apt number"
              }
            ),
            errors.location_house_no && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_house_no })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Street (Optional)" }),
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
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
              AsyncPaginate,
              {
                loadOptions: fetchStates,
                onChange: handleStateChange,
                value: selectedState,
                placeholder: "Select state",
                styles: {
                  option: (baseStyles, state) => ({
                    backgroundColor: state.isSelected ? "var(--bs-primary)" : state.isFocused ? "#f0f0f0" : "white",
                    padding: "6px 10px"
                  }),
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: state.isFocused ? "1px solid var(--bs-primary)" : "1px solid rgba(8, 49, 78, 0.2)",
                    borderRadius: "100px",
                    outlineColor: "red",
                    boxShadow: "none",
                    "&:hover": {
                      border: "auto"
                    },
                    padding: "3px 4px"
                  })
                },
                additional: { page: 1 }
              }
            ),
            errors.location_state && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_state })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "State Code", isRequired: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AsyncPaginate,
              {
                loadOptions: async (search, loadedOptions, { page }) => {
                  const filtered = stateCodeOptions.filter(
                    (code) => code.label.toLowerCase().includes(search.toLowerCase())
                  );
                  return {
                    options: filtered,
                    hasMore: false,
                    additional: { page: 1 }
                  };
                },
                onChange: handleStateCodeChange,
                value: selectedStateCode,
                placeholder: "Select state code",
                options: stateCodeOptions,
                styles: {
                  option: (baseStyles, state) => ({
                    backgroundColor: state.isSelected ? "var(--bs-primary)" : state.isFocused ? "#f0f0f0" : "white",
                    padding: "6px 10px"
                  }),
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: state.isFocused ? "1px solid var(--bs-primary)" : "1px solid rgba(8, 49, 78, 0.2)",
                    borderRadius: "100px",
                    outlineColor: "red",
                    boxShadow: "none",
                    "&:hover": {
                      border: "auto"
                    },
                    padding: "3px 4px"
                  })
                },
                additional: { page: 1 }
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
                onChange: handleZipCodeChange,
                placeholder: "Zip code"
              }
            ),
            errors.location_zip_code && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.location_zip_code })
          ] }) })
        ] })
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DateInput, { name: "established_date", setData, value: data.established_date }),
            errors.established_date && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.established_date })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "About Us", isRequired: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: data.about_company,
              onChange: (e) => setData("about_company", e.target.value),
              className: "form-control rounded-1",
              rows: 5,
              placeholder: "Tell us about your company..."
            }
          ),
          errors.about_company && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.about_company })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "why-stand-out border-bottom mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-lg-4 col-xxl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(YesOrNoRadioInput, { title: "USDA Registered", value: data.has_usda_registration, name: "has_usda_registration", setData }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "upload-details", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-6 mb-4 mb-lg-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MediaUploadSection,
            {
              label: "Upload Images",
              description: "Upload company images (JPG, PNG, GIF, WebP)",
              name: "gallery",
              setData: (name, files) => setData("gallery", files),
              errors,
              defaultUrls: gallery.length > 0 ? gallery : (user == null ? void 0 : user.gallery) ?? [],
              fileType: "images",
              accept: ".jpg,.jpeg,.png,.gif,.webp",
              maxSize: 12 * 1024 * 1024,
              watermark: {
                text: "urpuppy.com",
                opacity: 0.3,
                position: "tile",
                color: "#ffffff"
              },
              required: false,
              maxFiles: media_limits == null ? void 0 : media_limits.images,
              currentCount: (gallery.length > 0 ? gallery : (user == null ? void 0 : user.gallery) ?? []).length + (Array.isArray(data.gallery) ? data.gallery.filter((item) => item instanceof File).length : 0),
              deleteEndpoint: "/api/media/delete"
            }
          ),
          errors.gallery && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.gallery })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MediaUploadSection,
            {
              label: "Upload Videos",
              description: "Upload company videos (MP4, MOV, AVI, WebM)",
              name: "videos",
              setData: (name, files) => setData("videos", files),
              errors,
              defaultUrls: videos.length > 0 ? videos : (user == null ? void 0 : user.video) != null ? [user == null ? void 0 : user.video] : [],
              fileType: "videos",
              accept: ".mp4,.mov,.avi,.webm",
              maxSize: 50 * 1024 * 1024,
              required: false,
              maxFiles: media_limits == null ? void 0 : media_limits.videos,
              currentCount: (videos.length > 0 ? videos : (user == null ? void 0 : user.video) != null ? [user == null ? void 0 : user.video] : []).length + (Array.isArray(data.videos) ? data.videos.filter((item) => item instanceof File).length : 0),
              deleteEndpoint: "/api/media/delete"
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
const Registration = ({ breeds, gallery = [], videos = [], media_limits }) => {
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(BreederRegistrationForm, { breeds, gallery, videos, media_limits })
      ] })
    ] }) }) })
  ] });
};
export {
  Registration as default
};

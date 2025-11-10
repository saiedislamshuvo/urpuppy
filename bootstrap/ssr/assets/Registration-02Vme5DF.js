import { r as reactExports, j as jsxRuntimeExports, q, S as Se, a as je } from "../ssr.js";
import { B as Breadcrumb } from "./Breadcrumb-D8nxHqVE.js";
import { T as TextInput } from "./TextInput-CTPfMhdJ.js";
import { I as InputLabel } from "./InputLabel-DAgP54zY.js";
import { I as IconInput } from "./IconInput-DVVkR3jY.js";
import { S as SemiHeading, a as SelectInput, Y as YesOrNoRadioInput } from "./SelectInput-CKQ7NZN0.js";
import { u as useDropzone } from "./index-BJOsIyUP.js";
import { B as Button } from "./Button-C_TFTgI3.js";
import { M as MapInput, D as DateInput } from "./MapInput-Bo1DSz82.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
import { l as lodashExports } from "./lodash-CtkUkZej.js";
import { P as PhoneVerification } from "./PhoneVerification-BSU1rcRk.js";
import { A as AsyncPaginate } from "./index-C9Hr-vST.js";
import { H as Heading } from "./Heading-vwwW7yNV.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { L as Layout } from "./Layout-CVJc5AuP.js";
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
import "./react-select.esm-tWlRM8_L.js";
import "./setPrototypeOf-DxvfjWzF.js";
import "./extends-BwmuZ0dU.js";
import "./hoist-non-react-statics.cjs-BnF7CivY.js";
import "./index-DgY4nH2N.js";
import "./index-D7h8hQJR.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./index-DbhDZzck.js";
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
function FileUpload({
  required,
  name,
  setData,
  errors,
  defaultFiles = [],
  defaultUrls = []
}) {
  const hiddenInputRef = reactExports.useRef(null);
  const [files, setFiles] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [initializedUrls, setInitializedUrls] = reactExports.useState([]);
  const isFileSizeValid = (file) => {
    const maxSize = 50 * 1024 * 1024;
    return file.size <= maxSize;
  };
  const urlToFile = async (url) => {
    if (typeof url !== "string" || url.trim() === "") {
      throw new Error("Invalid URL: URL must be a non-empty string.");
    }
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split("/").pop() || "image";
      const fileExtension = blob.type.split("/")[1] || "jpg";
      return new File([blob], `${filename}.${fileExtension}`, { type: blob.type });
    } catch (error) {
      console.error(`Error converting URL to File:`, error);
      throw error;
    }
  };
  reactExports.useEffect(() => {
    const validDefaultUrls = defaultUrls.filter((url) => typeof url === "string" && url.trim() !== "");
    const newUrls = validDefaultUrls.filter((url) => !initializedUrls.includes(url));
    if (newUrls.length === 0) return;
    const loadUrlFiles = async () => {
      setIsLoading(true);
      try {
        const filePromises = newUrls.map((url) => urlToFile(url));
        const loadedFiles = await Promise.all(filePromises);
        setFiles((prevFiles) => {
          const newFiles = [...prevFiles, ...loadedFiles];
          setData(name, newFiles);
          if (hiddenInputRef.current) {
            const dataTransfer = new DataTransfer();
            newFiles.forEach((file) => {
              dataTransfer.items.add(file);
            });
            hiddenInputRef.current.files = dataTransfer.files;
          }
          return newFiles;
        });
        setInitializedUrls((prev) => [...prev, ...newUrls]);
      } catch (error) {
        console.error("Error loading files from URLs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUrlFiles();
  }, [defaultUrls.join(",")]);
  const onDrop = reactExports.useCallback(
    (incomingFiles) => {
      const validFiles = incomingFiles.filter((file) => isFileSizeValid(file));
      if (validFiles.length !== incomingFiles.length) {
        alert("Some files were rejected because they exceed the 50MB size limit.");
      }
      const newFiles = [...files, ...validFiles];
      setFiles(newFiles);
      setData(name, newFiles);
      if (hiddenInputRef.current) {
        const dataTransfer = new DataTransfer();
        newFiles.forEach((v) => {
          dataTransfer.items.add(v);
        });
        hiddenInputRef.current.files = dataTransfer.files;
      }
    },
    [files, name, setData]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 50 * 1024 * 1024,
    // 50MB in bytes
    onDropRejected: (rejectedFiles) => {
      alert("Some files were rejected because they exceed the 50MB size limit.");
    }
  });
  const handleRemove = reactExports.useCallback(
    (fileToRemove, e) => {
      e.stopPropagation();
      const newFiles = files.filter((f) => f !== fileToRemove);
      setFiles(newFiles);
      setData(name, newFiles);
      if (hiddenInputRef.current) {
        const dataTransfer = new DataTransfer();
        newFiles.forEach((v) => {
          dataTransfer.items.add(v);
        });
        hiddenInputRef.current.files = dataTransfer.files;
      }
    },
    [files, name, setData]
  );
  const handleAddMoreClick = (e) => {
    e.preventDefault();
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...getRootProps(), className: `dropzone ${isDragActive ? "dz-drag-hover" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "file",
          name,
          style: { opacity: 0, position: "absolute" },
          ref: hiddenInputRef,
          multiple: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...getInputProps() }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-message", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-message-text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading images..." }) }) }) : files.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-message", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-message-text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Drop files here or click to upload" }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-preview-container", children: files.map((file, index) => {
        const errorKey = `${name}.${index}`;
        const fileError = (errors == null ? void 0 : errors[errorKey]) ?? null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dz-preview dz-file-preview", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-image", children: file.type.startsWith("image/") ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: URL.createObjectURL(file), alt: file.name }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-file-representation", children: "📄" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dz-details", children: fileError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-danger", style: { color: "red", marginTop: "5px", padding: "5px" }, children: fileError }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "dz-remove",
              onClick: (e) => handleRemove(file, e),
              role: "button",
              tabIndex: 0,
              children: "✕"
            }
          )
        ] }, file.name + file.size);
      }) })
    ] }),
    files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: handleAddMoreClick, style: { marginTop: "20px" }, children: "Add More Files" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .dropzone {
          border: 2px dashed #0087F7;
          border-radius: 5px;
          background: white;
          min-height: 150px;
          padding: 20px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dropzone.dz-drag-hover {
          border-color: #00a65a;
          background: #f0f9ff;
        }

        .dz-message {
          text-align: center;
          margin: 2em 0;
        }

        .dz-message-text {
          margin-bottom: 1em;
        }

        .dz-preview-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .dz-preview {
          background: white;
          border-radius: 4px;
          border: 1px solid #ddd;
          padding: 6px;
          position: relative;
        }

        .dz-image {
          width: 100%;
          height: 120px;
          overflow: hidden;
          border-radius: 4px;
          background: #f6f6f6;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dz-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .dz-file-representation {
          font-size: 48px;
          color: #666;
        }

        .dz-details {
          font-size: 13px;
        }

        .dz-filename {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 4px;
        }

        .dz-size {
          color: #666;
          font-size: 12px;
        }

        .dz-remove {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 20px;
          height: 20px;
          background: #ff0000;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 12px;
          font-weight: bold;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .dz-preview:hover .dz-remove {
          opacity: 1;
        }

        button {
          background-color: #0087f7;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #005bb5;
        }
      ` })
  ] });
}
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
  const mapProvider = q().props.mapProvider;
  const defaultLocation = q().props.defaultLocation;
  const isSellerRegistration = !puppy_count && !puppy_edit;
  const getInitialLocation = () => {
    if (user && user.lat && user.lng) {
      return {
        lat: user.lat,
        lng: user.lng,
        address: user.gmap_address ?? user.address ?? "",
        city: user.city ?? "",
        street: user.street ?? "",
        houseNo: user.house_no ?? "",
        state: user.state ?? "",
        shortState: user.short_state ?? "",
        zipCode: user.zip_code ?? ""
      };
    }
    return defaultLocation;
  };
  const initialLocation = getInitialLocation();
  const extractStateCode = (shortState) => {
    if (!shortState) return "";
    if (shortState.includes("-")) {
      return shortState.split("-").pop() || shortState;
    }
    return shortState;
  };
  const [selectedState, setSelectedState] = reactExports.useState(() => {
    const stateName = (initialLocation == null ? void 0 : initialLocation.state) ?? null;
    if (stateName) {
      return { label: stateName, value: stateName };
    }
    return null;
  });
  const [stateCodeOptions, setStateCodeOptions] = reactExports.useState([]);
  const [selectedStateCode, setSelectedStateCode] = reactExports.useState(() => {
    const stateCode = extractStateCode((initialLocation == null ? void 0 : initialLocation.shortState) ?? "");
    if (stateCode) {
      return { label: stateCode, value: stateCode };
    }
    return null;
  });
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
    // Location fields
    location_lat: (initialLocation == null ? void 0 : initialLocation.lat) ?? null,
    location_lng: (initialLocation == null ? void 0 : initialLocation.lng) ?? null,
    location_address: (initialLocation == null ? void 0 : initialLocation.address) ?? null,
    location_city: (initialLocation == null ? void 0 : initialLocation.city) ?? null,
    location_street: (initialLocation == null ? void 0 : initialLocation.street) ?? null,
    location_house_no: (initialLocation == null ? void 0 : initialLocation.houseNo) ?? null,
    location_state: (initialLocation == null ? void 0 : initialLocation.state) ?? null,
    location_short_state: (initialLocation == null ? void 0 : initialLocation.shortState) ?? null,
    location_zip_code: (initialLocation == null ? void 0 : initialLocation.zipCode) ?? null,
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
  reactExports.useEffect(() => {
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
        location_short_state: ""
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
      location_short_state: stateCode,
      // Use extracted state code
      location_zip_code: location.zipCode
    });
  };
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
              user && /* @__PURE__ */ jsxRuntimeExports.jsx(
                PhoneVerification,
                {
                  phoneNumber: data.phone || user.phone,
                  phoneType: "phone",
                  isVerified: user.phone_verified_at ? true : false
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(SemiHeading, { title: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { value: "Your Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted small mb-3", children: defaultLocation ? "Default location from your account is pre-filled. You can change it if needed." : "Select your location. You can use the map to search or manually enter the address below." }),
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

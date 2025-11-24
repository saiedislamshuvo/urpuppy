import { r as reactExports, q, j as jsxRuntimeExports } from "../ssr.js";
import { S as SelectFilterInput, a as SelectPaginate } from "./BreedFilter-BrdOE-Xz.js";
const StateFilter = ({ setState, defaultValue, mobile = false }) => {
  const [value, setValue] = reactExports.useState(defaultValue);
  const isMobile = q().props.isMobile;
  const [options, setOptions] = reactExports.useState([]);
  const handleInputChange = (e) => {
    setValue(e);
    setState((prev) => ({
      ...prev,
      state: { label: e.label, value: e.label }
    }));
  };
  const fetchStates = async (search, loadedOptions, { page }) => {
    try {
      const response = await fetch(
        `/api/puppy/states?page=${page}&search=${search}&all=true`
      );
      const data = await response.json();
      if (isMobile) {
        setOptions(data.data);
      }
      return {
        options: data.data,
        hasMore: data.current_page !== data.last_page,
        additional: { page: data.current_page + 1 }
      };
    } catch (error) {
      return {
        options: [],
        hasMore: false,
        additional: { page: 1 }
      };
    }
  };
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (mobile) {
      fetchStates("", null, { page: 1 });
    }
  }, [mobile]);
  reactExports.useEffect(() => {
    if (isModalOpen && !mobile) {
      fetchStates("", null, { page: 1 });
    }
  }, [isModalOpen, mobile]);
  const mobileSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "5px",
      border: "1px solid #ddd",
      width: "100%",
      minHeight: "40px",
      backgroundColor: "white",
      padding: "0px 8px",
      boxShadow: "none",
      fontSize: "1rem"
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "var(--bs-primary)" : "white",
      color: state.isFocused ? "white" : "black",
      padding: "12px"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--bs-secondary)"
    })
  };
  reactExports.useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-map-pin.svg", alt: "urpuppy-img" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-box w-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "font-work-sans mb-0", children: "State" }),
      mobile ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectFilterInput,
        {
          options,
          onChange: handleInputChange,
          value,
          styles: mobileSelectStyles
        }
      ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectPaginate,
        {
          loadOptions: fetchStates,
          selectedItem: value,
          handleInputChange,
          setIsModalOpen,
          options
        }
      )
    ] })
  ] });
};
export {
  StateFilter as S
};

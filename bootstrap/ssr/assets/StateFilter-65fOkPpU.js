import { r as reactExports, q, j as jsxRuntimeExports } from "../ssr.js";
import { S as SelectPaginate } from "./BreedFilter-BMG1NT-R.js";
const StateFilter = ({ setState, defaultValue }) => {
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
    fetchStates("", null, { page: 1 });
  }, [isModalOpen]);
  const handleMobileInputChange = (selected) => {
    setState((prev) => ({
      ...prev,
      state: { label: selected.value, value: selected.value }
    }));
    setValue({
      label: selected.value,
      value: selected.value
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-map-pin.svg", alt: "urpuppy-img" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-box", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "font-work-sans mb-0", children: "State" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectPaginate,
        {
          loadOptions: fetchStates,
          selectedItem: value,
          handleInputChange,
          handleMobileInputChange,
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

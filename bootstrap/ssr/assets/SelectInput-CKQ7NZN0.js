import { j as jsxRuntimeExports, r as reactExports } from "../ssr.js";
import { S as StateManagedSelect$1 } from "./react-select.esm-tWlRM8_L.js";
const SemiHeading = ({ title, isRequired }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("h6", { className: "fs-5 mb-3 pb-1", children: [
    title,
    isRequired && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-danger ms-1", children: "*" })
  ] });
};
const YesOrNoRadioInput = ({ title, name, value, setData }) => {
  const handleChange = (newValue) => {
    setData(name, newValue);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border round", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 fw-semibold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-check form-check-inline mb-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "form-check-input",
            type: "radio",
            name,
            value: "yes",
            checked: value === "yes",
            onChange: () => handleChange("yes")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            onClick: () => handleChange("yes"),
            className: "form-check-label fs-2",
            children: "Yes"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-check form-check-inline mb-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "form-check-input",
            type: "radio",
            name,
            value: "no",
            checked: value === "no",
            onChange: () => handleChange("no")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            onClick: () => handleChange("no"),
            className: "form-check-label fs-2",
            children: "No"
          }
        )
      ] })
    ] })
  ] }) });
};
const SelectInput = ({ multiple = false, options, setData, name, value }) => {
  const [selectedValue, setSelectedValue] = reactExports.useState(null);
  const formatInitialValue = (value2) => {
    if (!value2) return null;
    if (multiple) {
      const values = Array.isArray(value2) ? value2 : [value2];
      return values.map((val) => {
        if (typeof val === "object" && "value" in val && "label" in val) {
          return val;
        }
        const option = options.find((opt) => opt.value === val);
        return option || null;
      }).filter(Boolean);
    } else {
      if (typeof value2 === "object" && "value" in value2 && "label" in value2) {
        return value2;
      }
      const option = options.find((opt) => opt.value === value2);
      return option || null;
    }
  };
  reactExports.useEffect(() => {
    const formattedValue = formatInitialValue(value);
    setSelectedValue(formattedValue);
  }, [value, options]);
  const handleChange = (val) => {
    setSelectedValue(val);
    if (multiple) {
      const values = val ? val.map((option) => option.value) : [];
      setData(name, values);
    } else {
      const value2 = val ? val.value : null;
      setData(name, value2);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    StateManagedSelect$1,
    {
      value: selectedValue,
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
        }),
        multiValue: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "var(--bs-primary)",
          borderRadius: "50px",
          color: "white"
        }),
        multiValueLabel: (baseStyles) => ({
          ...baseStyles,
          color: "white"
        }),
        multiValueRemove: (baseStyles) => ({
          ...baseStyles,
          color: "white",
          cursor: "pointer",
          ":hover": {
            borderTopRightRadius: "50px",
            borderBottomRightRadius: "50px",
            backgroundColor: "#f54242",
            color: "#fff"
          }
        })
      },
      onChange: handleChange,
      isMulti: multiple,
      options
    }
  );
};
export {
  SemiHeading as S,
  YesOrNoRadioInput as Y,
  SelectInput as a
};

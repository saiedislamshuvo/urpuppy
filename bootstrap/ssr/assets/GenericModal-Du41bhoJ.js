import { r as reactExports, j as jsxRuntimeExports } from "../ssr.js";
import { M as Modal } from "./Modal-BtmenwCz.js";
function GenericModal({ title, buttonTitle, children, setIsModalOpen, handleOk, ...props }) {
  const [show, setShow] = reactExports.useState(false);
  if (setIsModalOpen) {
    setIsModalOpen(show);
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  reactExports.useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-end", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: handleShow, className: "", "data-bs-toggle": "modal", "data-bs-target": "#SaveThisSearch", children: buttonTitle }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal, { show, className: "modal-lg", ...props, onHide: handleClose, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal.Body, { className: "py-8 px-4", style: {
        maxHeight: "60vh",
        overflow: "hidden"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-center text-primary", children: title }),
        children
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal.Footer, { className: "d-flex justify-content-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { rel: "nofollow", onClick: handleClose, href: "#", className: "btn btn-outline-extralight border btn-white text-dark", "data-bs-toggle": "modal", "data-bs-target": "#SaveThisSearch", children: "Cancel" }),
        handleOk && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { rel: "nofollow", onClick: handleClose, href: "#", className: "btn  border btn-primary text-white", "data-bs-toggle": "modal", "data-bs-target": "#SaveThisSearch", children: "Select" })
      ] })
    ] })
  ] }) });
}
export {
  GenericModal as G
};

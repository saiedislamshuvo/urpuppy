import { c as classNames } from "./index-DbhDZzck.js";
import { h as canUseDOM, o as ownerDocument, i as canUseDOM$1, l as listen, j as css, k as ownerDocument$1, m as utils, a as useEventCallback, c as useIsomorphicEffect, e as useMounted, f as usePrevious, s as style, u as useBootstrapPrefix, g as useEventCallback$1, C as CloseButton, d as divWithClassName, n as useMergedRefs$2, p as useIsRTL, r as removeEventListener, F as Fade, q as addEventListener, t as transitionEnd } from "./divWithClassName-rs9BDQyr.js";
import { r as reactExports, d as getAugmentedNamespace, b as requireReact, j as jsxRuntimeExports } from "../ssr.js";
import { r as reactDomExports } from "./index-D7h8hQJR.js";
var size;
function scrollbarSize(recalc) {
  if (!size && size !== 0 || recalc) {
    if (canUseDOM) {
      var scrollDiv = document.createElement("div");
      scrollDiv.style.position = "absolute";
      scrollDiv.style.top = "-9999px";
      scrollDiv.style.width = "50px";
      scrollDiv.style.height = "50px";
      scrollDiv.style.overflow = "scroll";
      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }
  return size;
}
function useCallbackRef() {
  return reactExports.useState(null);
}
function useUpdatedRef$2(value) {
  const valueRef = reactExports.useRef(value);
  valueRef.current = value;
  return valueRef;
}
function useWillUnmount$2(fn) {
  const onUnmount = useUpdatedRef$2(fn);
  reactExports.useEffect(() => () => onUnmount.current(), []);
}
function activeElement(doc) {
  if (doc === void 0) {
    doc = ownerDocument();
  }
  try {
    var active = doc.activeElement;
    if (!active || !active.nodeName) return null;
    return active;
  } catch (e) {
    return doc.body;
  }
}
const activeElement$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: activeElement
}, Symbol.toStringTag, { value: "Module" }));
const require$$0$2 = /* @__PURE__ */ getAugmentedNamespace(activeElement$1);
function contains(context, node) {
  if (context.contains) return context.contains(node);
  if (context.compareDocumentPosition) return context === node || !!(context.compareDocumentPosition(node) & 16);
}
const contains$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contains
}, Symbol.toStringTag, { value: "Module" }));
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(contains$1);
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(canUseDOM$1);
const require$$3 = /* @__PURE__ */ getAugmentedNamespace(listen);
var useWillUnmount$1 = {};
var useUpdatedRef$1 = {};
useUpdatedRef$1.__esModule = true;
useUpdatedRef$1.default = useUpdatedRef;
var _react$8 = requireReact();
function useUpdatedRef(value) {
  const valueRef = (0, _react$8.useRef)(value);
  valueRef.current = value;
  return valueRef;
}
useWillUnmount$1.__esModule = true;
useWillUnmount$1.default = useWillUnmount;
var _useUpdatedRef = _interopRequireDefault$8(useUpdatedRef$1);
var _react$7 = requireReact();
function _interopRequireDefault$8(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function useWillUnmount(fn) {
  const onUnmount = (0, _useUpdatedRef.default)(fn);
  (0, _react$7.useEffect)(() => () => onUnmount.current(), []);
}
var ModalManager$1 = {};
const require$$0$1 = /* @__PURE__ */ getAugmentedNamespace(css);
var DataKey = {};
DataKey.__esModule = true;
DataKey.PROPERTY_PREFIX = DataKey.ATTRIBUTE_PREFIX = void 0;
DataKey.dataAttr = dataAttr;
DataKey.dataProp = dataProp;
const ATTRIBUTE_PREFIX = DataKey.ATTRIBUTE_PREFIX = `data-rr-ui-`;
const PROPERTY_PREFIX = DataKey.PROPERTY_PREFIX = `rrUi`;
function dataAttr(property) {
  return `${ATTRIBUTE_PREFIX}${property}`;
}
function dataProp(property) {
  return `${PROPERTY_PREFIX}${property}`;
}
var getScrollbarWidth = {};
getScrollbarWidth.__esModule = true;
getScrollbarWidth.default = getBodyScrollbarWidth;
function getBodyScrollbarWidth(ownerDocument2 = document) {
  const window2 = ownerDocument2.defaultView;
  return Math.abs(window2.innerWidth - ownerDocument2.documentElement.clientWidth);
}
ModalManager$1.__esModule = true;
var default_1$1 = ModalManager$1.default = ModalManager$1.OPEN_DATA_ATTRIBUTE = void 0;
var _css = _interopRequireDefault$7(require$$0$1);
var _DataKey = DataKey;
var _getScrollbarWidth = _interopRequireDefault$7(getScrollbarWidth);
function _interopRequireDefault$7(e) {
  return e && e.__esModule ? e : { default: e };
}
const OPEN_DATA_ATTRIBUTE = ModalManager$1.OPEN_DATA_ATTRIBUTE = (0, _DataKey.dataAttr)("modal-open");
class ModalManager {
  constructor({
    ownerDocument: ownerDocument2,
    handleContainerOverflow = true,
    isRTL = false
  } = {}) {
    this.handleContainerOverflow = handleContainerOverflow;
    this.isRTL = isRTL;
    this.modals = [];
    this.ownerDocument = ownerDocument2;
  }
  getScrollbarWidth() {
    return (0, _getScrollbarWidth.default)(this.ownerDocument);
  }
  getElement() {
    return (this.ownerDocument || document).body;
  }
  setModalAttributes(_modal) {
  }
  removeModalAttributes(_modal) {
  }
  setContainerStyle(containerState) {
    const style2 = {
      overflow: "hidden"
    };
    const paddingProp = this.isRTL ? "paddingLeft" : "paddingRight";
    const container = this.getElement();
    containerState.style = {
      overflow: container.style.overflow,
      [paddingProp]: container.style[paddingProp]
    };
    if (containerState.scrollBarWidth) {
      style2[paddingProp] = `${parseInt((0, _css.default)(container, paddingProp) || "0", 10) + containerState.scrollBarWidth}px`;
    }
    container.setAttribute(OPEN_DATA_ATTRIBUTE, "");
    (0, _css.default)(container, style2);
  }
  reset() {
    [...this.modals].forEach((m) => this.remove(m));
  }
  removeContainerStyle(containerState) {
    const container = this.getElement();
    container.removeAttribute(OPEN_DATA_ATTRIBUTE);
    Object.assign(container.style, containerState.style);
  }
  add(modal) {
    let modalIdx = this.modals.indexOf(modal);
    if (modalIdx !== -1) {
      return modalIdx;
    }
    modalIdx = this.modals.length;
    this.modals.push(modal);
    this.setModalAttributes(modal);
    if (modalIdx !== 0) {
      return modalIdx;
    }
    this.state = {
      scrollBarWidth: this.getScrollbarWidth(),
      style: {}
    };
    if (this.handleContainerOverflow) {
      this.setContainerStyle(this.state);
    }
    return modalIdx;
  }
  remove(modal) {
    const modalIdx = this.modals.indexOf(modal);
    if (modalIdx === -1) {
      return;
    }
    this.modals.splice(modalIdx, 1);
    if (!this.modals.length && this.handleContainerOverflow) {
      this.removeContainerStyle(this.state);
    }
    this.removeModalAttributes(modal);
  }
  isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  }
}
default_1$1 = ModalManager$1.default = ModalManager;
var useWaitForDOMRef$1 = {};
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(ownerDocument$1);
var useWindow$1 = {};
useWindow$1.__esModule = true;
useWindow$1.WindowProvider = void 0;
useWindow$1.default = useWindow;
var _react$6 = requireReact();
var _canUseDOM$2 = _interopRequireDefault$6(require$$2);
function _interopRequireDefault$6(e) {
  return e && e.__esModule ? e : { default: e };
}
const Context = /* @__PURE__ */ (0, _react$6.createContext)(_canUseDOM$2.default ? window : void 0);
useWindow$1.WindowProvider = Context.Provider;
function useWindow() {
  return (0, _react$6.useContext)(Context);
}
useWaitForDOMRef$1.__esModule = true;
useWaitForDOMRef$1.default = useWaitForDOMRef;
useWaitForDOMRef$1.resolveContainerRef = void 0;
var _ownerDocument = _interopRequireDefault$5(require$$0);
var _canUseDOM$1 = _interopRequireDefault$5(require$$2);
var _react$5 = requireReact();
var _useWindow$1 = _interopRequireDefault$5(useWindow$1);
function _interopRequireDefault$5(e) {
  return e && e.__esModule ? e : { default: e };
}
const resolveContainerRef = (ref, document2) => {
  if (!_canUseDOM$1.default) return null;
  if (ref == null) return (document2 || (0, _ownerDocument.default)()).body;
  if (typeof ref === "function") ref = ref();
  if (ref && "current" in ref) ref = ref.current;
  if (ref && ("nodeType" in ref || ref.getBoundingClientRect)) return ref;
  return null;
};
useWaitForDOMRef$1.resolveContainerRef = resolveContainerRef;
function useWaitForDOMRef(ref, onResolved) {
  const window2 = (0, _useWindow$1.default)();
  const [resolvedRef, setRef] = (0, _react$5.useState)(() => resolveContainerRef(ref, window2 == null ? void 0 : window2.document));
  if (!resolvedRef) {
    const earlyRef = resolveContainerRef(ref);
    if (earlyRef) setRef(earlyRef);
  }
  (0, _react$5.useEffect)(() => {
    if (onResolved && resolvedRef) {
      onResolved(resolvedRef);
    }
  }, [onResolved, resolvedRef]);
  (0, _react$5.useEffect)(() => {
    const nextRef = resolveContainerRef(ref);
    if (nextRef !== resolvedRef) {
      setRef(nextRef);
    }
  }, [ref, resolvedRef]);
  return resolvedRef;
}
var ImperativeTransition$1 = {};
var useMergedRefs$1 = {};
useMergedRefs$1.__esModule = true;
useMergedRefs$1.default = void 0;
useMergedRefs$1.mergeRefs = mergeRefs;
var _react$4 = requireReact();
const toFnRef = (ref) => !ref || typeof ref === "function" ? ref : (value) => {
  ref.current = value;
};
function mergeRefs(refA, refB) {
  const a = toFnRef(refA);
  const b = toFnRef(refB);
  return (value) => {
    if (a) a(value);
    if (b) b(value);
  };
}
function useMergedRefs(refA, refB) {
  return (0, _react$4.useMemo)(() => mergeRefs(refA, refB), [refA, refB]);
}
var _default = useMergedRefs;
useMergedRefs$1.default = _default;
var NoopTransition$1 = {};
NoopTransition$1.__esModule = true;
NoopTransition$1.default = void 0;
var _useEventCallback$2 = _interopRequireDefault$4(useEventCallback);
var _useMergedRefs$2 = _interopRequireDefault$4(useMergedRefs$1);
var _react$3 = requireReact();
var _utils$3 = utils;
function _interopRequireDefault$4(e) {
  return e && e.__esModule ? e : { default: e };
}
function NoopTransition({
  children,
  in: inProp,
  onExited,
  mountOnEnter,
  unmountOnExit
}) {
  const ref = (0, _react$3.useRef)(null);
  const hasEnteredRef = (0, _react$3.useRef)(inProp);
  const handleExited = (0, _useEventCallback$2.default)(onExited);
  (0, _react$3.useEffect)(() => {
    if (inProp) hasEnteredRef.current = true;
    else {
      handleExited(ref.current);
    }
  }, [inProp, handleExited]);
  const combinedRef = (0, _useMergedRefs$2.default)(ref, (0, _utils$3.getChildRef)(children));
  const child = /* @__PURE__ */ (0, _react$3.cloneElement)(children, {
    ref: combinedRef
  });
  if (inProp) return child;
  if (unmountOnExit) {
    return null;
  }
  if (!hasEnteredRef.current && mountOnEnter) {
    return null;
  }
  return child;
}
NoopTransition$1.default = NoopTransition;
var RTGTransition$1 = {};
var useRTGTransitionProps$1 = {};
useRTGTransitionProps$1.__esModule = true;
useRTGTransitionProps$1.default = useRTGTransitionProps;
var _react$2 = requireReact();
var _useMergedRefs$1 = _interopRequireDefault$3(useMergedRefs$1);
var _utils$2 = utils;
const _excluded$2 = ["onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "addEndListener", "children"];
function _interopRequireDefault$3(e) {
  return e && e.__esModule ? e : { default: e };
}
function _objectWithoutPropertiesLoose$2(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.indexOf(n) >= 0) continue;
    t[n] = r[n];
  }
  return t;
}
function useRTGTransitionProps(_ref) {
  let {
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    addEndListener,
    children
  } = _ref, props = _objectWithoutPropertiesLoose$2(_ref, _excluded$2);
  const nodeRef = (0, _react$2.useRef)(null);
  const mergedRef = (0, _useMergedRefs$1.default)(nodeRef, (0, _utils$2.getChildRef)(children));
  const normalize = (callback) => (param) => {
    if (callback && nodeRef.current) {
      callback(nodeRef.current, param);
    }
  };
  const handleEnter = (0, _react$2.useCallback)(normalize(onEnter), [onEnter]);
  const handleEntering = (0, _react$2.useCallback)(normalize(onEntering), [onEntering]);
  const handleEntered = (0, _react$2.useCallback)(normalize(onEntered), [onEntered]);
  const handleExit = (0, _react$2.useCallback)(normalize(onExit), [onExit]);
  const handleExiting = (0, _react$2.useCallback)(normalize(onExiting), [onExiting]);
  const handleExited = (0, _react$2.useCallback)(normalize(onExited), [onExited]);
  const handleAddEndListener = (0, _react$2.useCallback)(normalize(addEndListener), [addEndListener]);
  return Object.assign({}, props, {
    nodeRef
  }, onEnter && {
    onEnter: handleEnter
  }, onEntering && {
    onEntering: handleEntering
  }, onEntered && {
    onEntered: handleEntered
  }, onExit && {
    onExit: handleExit
  }, onExiting && {
    onExiting: handleExiting
  }, onExited && {
    onExited: handleExited
  }, addEndListener && {
    addEndListener: handleAddEndListener
  }, {
    children: typeof children === "function" ? (status, innerProps) => (
      // TODO: Types for RTG missing innerProps, so need to cast.
      children(status, Object.assign({}, innerProps, {
        ref: mergedRef
      }))
    ) : /* @__PURE__ */ (0, _react$2.cloneElement)(children, {
      ref: mergedRef
    })
  });
}
RTGTransition$1.__esModule = true;
RTGTransition$1.default = void 0;
var React$1 = _interopRequireWildcard$2(requireReact());
var _useRTGTransitionProps = _interopRequireDefault$2(useRTGTransitionProps$1);
var _jsxRuntime$2 = jsxRuntimeExports;
const _excluded$1 = ["component"];
function _interopRequireDefault$2(e) {
  return e && e.__esModule ? e : { default: e };
}
function _getRequireWildcardCache$2(e) {
  if ("function" != typeof WeakMap) return null;
  var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
  return (_getRequireWildcardCache$2 = function(e2) {
    return e2 ? t : r;
  })(e);
}
function _interopRequireWildcard$2(e, r) {
  if (e && e.__esModule) return e;
  if (null === e || "object" != typeof e && "function" != typeof e) return { default: e };
  var t = _getRequireWildcardCache$2(r);
  if (t && t.has(e)) return t.get(e);
  var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n.default = e, t && t.set(e, n), n;
}
function _objectWithoutPropertiesLoose$1(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.indexOf(n) >= 0) continue;
    t[n] = r[n];
  }
  return t;
}
const RTGTransition = /* @__PURE__ */ React$1.forwardRef((_ref, ref) => {
  let {
    component: Component
  } = _ref, props = _objectWithoutPropertiesLoose$1(_ref, _excluded$1);
  const transitionProps = (0, _useRTGTransitionProps.default)(props);
  return /* @__PURE__ */ (0, _jsxRuntime$2.jsx)(Component, Object.assign({
    ref
  }, transitionProps));
});
RTGTransition$1.default = RTGTransition;
ImperativeTransition$1.__esModule = true;
ImperativeTransition$1.default = ImperativeTransition;
ImperativeTransition$1.renderTransition = renderTransition;
ImperativeTransition$1.useTransition = useTransition;
var _useMergedRefs = _interopRequireDefault$1(useMergedRefs$1);
var _useEventCallback$1 = _interopRequireDefault$1(useEventCallback);
var _useIsomorphicEffect = _interopRequireDefault$1(useIsomorphicEffect);
var _react$1 = _interopRequireWildcard$1(requireReact());
var _NoopTransition = _interopRequireDefault$1(NoopTransition$1);
var _RTGTransition = _interopRequireDefault$1(RTGTransition$1);
var _utils$1 = utils;
var _jsxRuntime$1 = jsxRuntimeExports;
function _getRequireWildcardCache$1(e) {
  if ("function" != typeof WeakMap) return null;
  var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
  return (_getRequireWildcardCache$1 = function(e2) {
    return e2 ? t : r;
  })(e);
}
function _interopRequireWildcard$1(e, r) {
  if (e && e.__esModule) return e;
  if (null === e || "object" != typeof e && "function" != typeof e) return { default: e };
  var t = _getRequireWildcardCache$1(r);
  if (t && t.has(e)) return t.get(e);
  var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n.default = e, t && t.set(e, n), n;
}
function _interopRequireDefault$1(e) {
  return e && e.__esModule ? e : { default: e };
}
function useTransition({
  in: inProp,
  onTransition
}) {
  const ref = (0, _react$1.useRef)(null);
  const isInitialRef = (0, _react$1.useRef)(true);
  const handleTransition = (0, _useEventCallback$1.default)(onTransition);
  (0, _useIsomorphicEffect.default)(() => {
    if (!ref.current) {
      return void 0;
    }
    let stale = false;
    handleTransition({
      in: inProp,
      element: ref.current,
      initial: isInitialRef.current,
      isStale: () => stale
    });
    return () => {
      stale = true;
    };
  }, [inProp, handleTransition]);
  (0, _useIsomorphicEffect.default)(() => {
    isInitialRef.current = false;
    return () => {
      isInitialRef.current = true;
    };
  }, []);
  return ref;
}
function ImperativeTransition({
  children,
  in: inProp,
  onExited,
  onEntered,
  transition
}) {
  const [exited, setExited] = (0, _react$1.useState)(!inProp);
  if (inProp && exited) {
    setExited(false);
  }
  const ref = useTransition({
    in: !!inProp,
    onTransition: (options) => {
      const onFinish = () => {
        if (options.isStale()) return;
        if (options.in) {
          onEntered == null ? void 0 : onEntered(options.element, options.initial);
        } else {
          setExited(true);
          onExited == null ? void 0 : onExited(options.element);
        }
      };
      Promise.resolve(transition(options)).then(onFinish, (error) => {
        if (!options.in) setExited(true);
        throw error;
      });
    }
  });
  const combinedRef = (0, _useMergedRefs.default)(ref, (0, _utils$1.getChildRef)(children));
  return exited && !inProp ? null : /* @__PURE__ */ (0, _react$1.cloneElement)(children, {
    ref: combinedRef
  });
}
function renderTransition(component, runTransition, props) {
  if (component) {
    return /* @__PURE__ */ (0, _jsxRuntime$1.jsx)(_RTGTransition.default, Object.assign({}, props, {
      component
    }));
  }
  if (runTransition) {
    return /* @__PURE__ */ (0, _jsxRuntime$1.jsx)(ImperativeTransition, Object.assign({}, props, {
      transition: runTransition
    }));
  }
  return /* @__PURE__ */ (0, _jsxRuntime$1.jsx)(_NoopTransition.default, Object.assign({}, props));
}
var default_1 = void 0;
var _activeElement = _interopRequireDefault(require$$0$2);
var _contains = _interopRequireDefault(require$$1);
var _canUseDOM = _interopRequireDefault(require$$2);
var _listen = _interopRequireDefault(require$$3);
var _react = _interopRequireWildcard(requireReact());
var React = _react;
var _reactDom = _interopRequireDefault(reactDomExports);
var _useMounted = _interopRequireDefault(useMounted);
var _useWillUnmount = _interopRequireDefault(useWillUnmount$1);
var _usePrevious = _interopRequireDefault(usePrevious);
var _useEventCallback = _interopRequireDefault(useEventCallback);
var _ModalManager = _interopRequireDefault(ModalManager$1);
var _useWaitForDOMRef = _interopRequireDefault(useWaitForDOMRef$1);
var _useWindow = _interopRequireDefault(useWindow$1);
var _ImperativeTransition = ImperativeTransition$1;
var _utils = utils;
var _jsxRuntime = jsxRuntimeExports;
const _excluded = ["show", "role", "className", "style", "children", "backdrop", "keyboard", "onBackdropClick", "onEscapeKeyDown", "transition", "runTransition", "backdropTransition", "runBackdropTransition", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "renderDialog", "renderBackdrop", "manager", "container", "onShow", "onHide", "onExit", "onExited", "onExiting", "onEnter", "onEntering", "onEntered"];
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
  return (_getRequireWildcardCache = function(e2) {
    return e2 ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (e && e.__esModule) return e;
  if (null === e || "object" != typeof e && "function" != typeof e) return { default: e };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n.default = e, t && t.set(e, n), n;
}
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.indexOf(n) >= 0) continue;
    t[n] = r[n];
  }
  return t;
}
let manager;
function getManager(window2) {
  if (!manager) manager = new _ModalManager.default({
    ownerDocument: window2 == null ? void 0 : window2.document
  });
  return manager;
}
function useModalManager(provided) {
  const window2 = (0, _useWindow.default)();
  const modalManager = provided || getManager(window2);
  const modal = (0, _react.useRef)({
    dialog: null,
    backdrop: null
  });
  return Object.assign(modal.current, {
    add: () => modalManager.add(modal.current),
    remove: () => modalManager.remove(modal.current),
    isTopModal: () => modalManager.isTopModal(modal.current),
    setDialogRef: (0, _react.useCallback)((ref) => {
      modal.current.dialog = ref;
    }, []),
    setBackdropRef: (0, _react.useCallback)((ref) => {
      modal.current.backdrop = ref;
    }, [])
  });
}
const Modal$2 = /* @__PURE__ */ (0, _react.forwardRef)((_ref, ref) => {
  let {
    show = false,
    role = "dialog",
    className,
    style: style2,
    children,
    backdrop = true,
    keyboard = true,
    onBackdropClick,
    onEscapeKeyDown,
    transition,
    runTransition,
    backdropTransition,
    runBackdropTransition,
    autoFocus = true,
    enforceFocus = true,
    restoreFocus = true,
    restoreFocusOptions,
    renderDialog,
    renderBackdrop = (props) => /* @__PURE__ */ (0, _jsxRuntime.jsx)("div", Object.assign({}, props)),
    manager: providedManager,
    container: containerRef,
    onShow,
    onHide = () => {
    },
    onExit,
    onExited,
    onExiting,
    onEnter,
    onEntering,
    onEntered
  } = _ref, rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  const ownerWindow = (0, _useWindow.default)();
  const container = (0, _useWaitForDOMRef.default)(containerRef);
  const modal = useModalManager(providedManager);
  const isMounted = (0, _useMounted.default)();
  const prevShow = (0, _usePrevious.default)(show);
  const [exited, setExited] = (0, _react.useState)(!show);
  const lastFocusRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, () => modal, [modal]);
  if (_canUseDOM.default && !prevShow && show) {
    lastFocusRef.current = (0, _activeElement.default)(ownerWindow == null ? void 0 : ownerWindow.document);
  }
  if (show && exited) {
    setExited(false);
  }
  const handleShow = (0, _useEventCallback.default)(() => {
    modal.add();
    removeKeydownListenerRef.current = (0, _listen.default)(document, "keydown", handleDocumentKeyDown);
    removeFocusListenerRef.current = (0, _listen.default)(
      document,
      "focus",
      // the timeout is necessary b/c this will run before the new modal is mounted
      // and so steals focus from it
      () => setTimeout(handleEnforceFocus),
      true
    );
    if (onShow) {
      onShow();
    }
    if (autoFocus) {
      var _modal$dialog$ownerDo, _modal$dialog;
      const currentActiveElement = (0, _activeElement.default)((_modal$dialog$ownerDo = (_modal$dialog = modal.dialog) == null ? void 0 : _modal$dialog.ownerDocument) != null ? _modal$dialog$ownerDo : ownerWindow == null ? void 0 : ownerWindow.document);
      if (modal.dialog && currentActiveElement && !(0, _contains.default)(modal.dialog, currentActiveElement)) {
        lastFocusRef.current = currentActiveElement;
        modal.dialog.focus();
      }
    }
  });
  const handleHide = (0, _useEventCallback.default)(() => {
    modal.remove();
    removeKeydownListenerRef.current == null ? void 0 : removeKeydownListenerRef.current();
    removeFocusListenerRef.current == null ? void 0 : removeFocusListenerRef.current();
    if (restoreFocus) {
      var _lastFocusRef$current;
      (_lastFocusRef$current = lastFocusRef.current) == null ? void 0 : _lastFocusRef$current.focus == null ? void 0 : _lastFocusRef$current.focus(restoreFocusOptions);
      lastFocusRef.current = null;
    }
  });
  (0, _react.useEffect)(() => {
    if (!show || !container) return;
    handleShow();
  }, [
    show,
    container,
    /* should never change: */
    handleShow
  ]);
  (0, _react.useEffect)(() => {
    if (!exited) return;
    handleHide();
  }, [exited, handleHide]);
  (0, _useWillUnmount.default)(() => {
    handleHide();
  });
  const handleEnforceFocus = (0, _useEventCallback.default)(() => {
    if (!enforceFocus || !isMounted() || !modal.isTopModal()) {
      return;
    }
    const currentActiveElement = (0, _activeElement.default)(ownerWindow == null ? void 0 : ownerWindow.document);
    if (modal.dialog && currentActiveElement && !(0, _contains.default)(modal.dialog, currentActiveElement)) {
      modal.dialog.focus();
    }
  });
  const handleBackdropClick = (0, _useEventCallback.default)((e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onBackdropClick == null ? void 0 : onBackdropClick(e);
    if (backdrop === true) {
      onHide();
    }
  });
  const handleDocumentKeyDown = (0, _useEventCallback.default)((e) => {
    if (keyboard && (0, _utils.isEscKey)(e) && modal.isTopModal()) {
      onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);
      if (!e.defaultPrevented) {
        onHide();
      }
    }
  });
  const removeFocusListenerRef = (0, _react.useRef)();
  const removeKeydownListenerRef = (0, _react.useRef)();
  const handleHidden = (...args) => {
    setExited(true);
    onExited == null ? void 0 : onExited(...args);
  };
  if (!container) {
    return null;
  }
  const dialogProps = Object.assign({
    role,
    ref: modal.setDialogRef,
    // apparently only works on the dialog role element
    "aria-modal": role === "dialog" ? true : void 0
  }, rest, {
    style: style2,
    className,
    tabIndex: -1
  });
  let dialog = renderDialog ? renderDialog(dialogProps) : /* @__PURE__ */ (0, _jsxRuntime.jsx)("div", Object.assign({}, dialogProps, {
    children: /* @__PURE__ */ React.cloneElement(children, {
      role: "document"
    })
  }));
  dialog = (0, _ImperativeTransition.renderTransition)(transition, runTransition, {
    unmountOnExit: true,
    mountOnEnter: true,
    appear: true,
    in: !!show,
    onExit,
    onExiting,
    onExited: handleHidden,
    onEnter,
    onEntering,
    onEntered,
    children: dialog
  });
  let backdropElement = null;
  if (backdrop) {
    backdropElement = renderBackdrop({
      ref: modal.setBackdropRef,
      onClick: handleBackdropClick
    });
    backdropElement = (0, _ImperativeTransition.renderTransition)(backdropTransition, runBackdropTransition, {
      in: !!show,
      appear: true,
      mountOnEnter: true,
      unmountOnExit: true,
      children: backdropElement
    });
  }
  return /* @__PURE__ */ (0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /* @__PURE__ */ _reactDom.default.createPortal(/* @__PURE__ */ (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [backdropElement, dialog]
    }), container)
  });
});
Modal$2.displayName = "Modal";
default_1 = Object.assign(Modal$2, {
  Manager: _ModalManager.default
});
function hasClass(element, className) {
  if (element.classList) return element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}
function addClass(element, className) {
  if (element.classList) element.classList.add(className);
  else if (!hasClass(element, className)) if (typeof element.className === "string") element.className = element.className + " " + className;
  else element.setAttribute("class", (element.className && element.className.baseVal || "") + " " + className);
}
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
function qsa(element, selector) {
  return toArray(element.querySelectorAll(selector));
}
function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === "string") {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute("class", replaceClassName(element.className && element.className.baseVal || "", className));
  }
}
const Selector = {
  FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
  STICKY_CONTENT: ".sticky-top",
  NAVBAR_TOGGLER: ".navbar-toggler"
};
class BootstrapModalManager extends default_1$1 {
  adjustAndStore(prop, element, adjust) {
    const actual = element.style[prop];
    element.dataset[prop] = actual;
    style(element, {
      [prop]: `${parseFloat(style(element, prop)) + adjust}px`
    });
  }
  restore(prop, element) {
    const value = element.dataset[prop];
    if (value !== void 0) {
      delete element.dataset[prop];
      style(element, {
        [prop]: value
      });
    }
  }
  setContainerStyle(containerState) {
    super.setContainerStyle(containerState);
    const container = this.getElement();
    addClass(container, "modal-open");
    if (!containerState.scrollBarWidth) return;
    const paddingProp = this.isRTL ? "paddingLeft" : "paddingRight";
    const marginProp = this.isRTL ? "marginLeft" : "marginRight";
    qsa(container, Selector.FIXED_CONTENT).forEach((el) => this.adjustAndStore(paddingProp, el, containerState.scrollBarWidth));
    qsa(container, Selector.STICKY_CONTENT).forEach((el) => this.adjustAndStore(marginProp, el, -containerState.scrollBarWidth));
    qsa(container, Selector.NAVBAR_TOGGLER).forEach((el) => this.adjustAndStore(marginProp, el, containerState.scrollBarWidth));
  }
  removeContainerStyle(containerState) {
    super.removeContainerStyle(containerState);
    const container = this.getElement();
    removeClass(container, "modal-open");
    const paddingProp = this.isRTL ? "paddingLeft" : "paddingRight";
    const marginProp = this.isRTL ? "marginLeft" : "marginRight";
    qsa(container, Selector.FIXED_CONTENT).forEach((el) => this.restore(paddingProp, el));
    qsa(container, Selector.STICKY_CONTENT).forEach((el) => this.restore(marginProp, el));
    qsa(container, Selector.NAVBAR_TOGGLER).forEach((el) => this.restore(marginProp, el));
  }
}
let sharedManager;
function getSharedManager(options) {
  if (!sharedManager) sharedManager = new BootstrapModalManager(options);
  return sharedManager;
}
const ModalBody = /* @__PURE__ */ reactExports.forwardRef(({
  className,
  bsPrefix,
  as: Component = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal-body");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Component, {
    ref,
    className: classNames(className, bsPrefix),
    ...props
  });
});
ModalBody.displayName = "ModalBody";
const ModalContext = /* @__PURE__ */ reactExports.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onHide() {
  }
});
const ModalDialog = /* @__PURE__ */ reactExports.forwardRef(({
  bsPrefix,
  className,
  contentClassName,
  centered,
  size: size2,
  fullscreen,
  children,
  scrollable,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal");
  const dialogClass = `${bsPrefix}-dialog`;
  const fullScreenClass = typeof fullscreen === "string" ? `${bsPrefix}-fullscreen-${fullscreen}` : `${bsPrefix}-fullscreen`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    ...props,
    ref,
    className: classNames(dialogClass, className, size2 && `${bsPrefix}-${size2}`, centered && `${dialogClass}-centered`, scrollable && `${dialogClass}-scrollable`, fullscreen && fullScreenClass),
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      className: classNames(`${bsPrefix}-content`, contentClassName),
      children
    })
  });
});
ModalDialog.displayName = "ModalDialog";
const ModalFooter = /* @__PURE__ */ reactExports.forwardRef(({
  className,
  bsPrefix,
  as: Component = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal-footer");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Component, {
    ref,
    className: classNames(className, bsPrefix),
    ...props
  });
});
ModalFooter.displayName = "ModalFooter";
const AbstractModalHeader = /* @__PURE__ */ reactExports.forwardRef(({
  closeLabel = "Close",
  closeVariant,
  closeButton = false,
  onHide,
  children,
  ...props
}, ref) => {
  const context = reactExports.useContext(ModalContext);
  const handleClick = useEventCallback$1(() => {
    context == null || context.onHide();
    onHide == null || onHide();
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    ref,
    ...props,
    children: [children, closeButton && /* @__PURE__ */ jsxRuntimeExports.jsx(CloseButton, {
      "aria-label": closeLabel,
      variant: closeVariant,
      onClick: handleClick
    })]
  });
});
const ModalHeader = /* @__PURE__ */ reactExports.forwardRef(({
  bsPrefix,
  className,
  closeLabel = "Close",
  closeButton = false,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal-header");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AbstractModalHeader, {
    ref,
    ...props,
    className: classNames(className, bsPrefix),
    closeLabel,
    closeButton
  });
});
ModalHeader.displayName = "ModalHeader";
const DivStyledAsH4 = divWithClassName("h4");
const ModalTitle = /* @__PURE__ */ reactExports.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH4,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal-title");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Component, {
    ref,
    className: classNames(className, bsPrefix),
    ...props
  });
});
ModalTitle.displayName = "ModalTitle";
function DialogTransition(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Fade, {
    ...props,
    timeout: null
  });
}
function BackdropTransition(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Fade, {
    ...props,
    timeout: null
  });
}
const Modal = /* @__PURE__ */ reactExports.forwardRef(({
  bsPrefix,
  className,
  style: style2,
  dialogClassName,
  contentClassName,
  children,
  dialogAs: Dialog = ModalDialog,
  "data-bs-theme": dataBsTheme,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  "aria-label": ariaLabel,
  /* BaseModal props */
  show = false,
  animation = true,
  backdrop = true,
  keyboard = true,
  onEscapeKeyDown,
  onShow,
  onHide,
  container,
  autoFocus = true,
  enforceFocus = true,
  restoreFocus = true,
  restoreFocusOptions,
  onEntered,
  onExit,
  onExiting,
  onEnter,
  onEntering,
  onExited,
  backdropClassName,
  manager: propsManager,
  ...props
}, ref) => {
  const [modalStyle, setStyle] = reactExports.useState({});
  const [animateStaticModal, setAnimateStaticModal] = reactExports.useState(false);
  const waitingForMouseUpRef = reactExports.useRef(false);
  const ignoreBackdropClickRef = reactExports.useRef(false);
  const removeStaticModalAnimationRef = reactExports.useRef(null);
  const [modal, setModalRef] = useCallbackRef();
  const mergedRef = useMergedRefs$2(ref, setModalRef);
  const handleHide = useEventCallback$1(onHide);
  const isRTL = useIsRTL();
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal");
  const modalContext = reactExports.useMemo(() => ({
    onHide: handleHide
  }), [handleHide]);
  function getModalManager() {
    if (propsManager) return propsManager;
    return getSharedManager({
      isRTL
    });
  }
  function updateDialogStyle(node) {
    if (!canUseDOM) return;
    const containerIsOverflowing = getModalManager().getScrollbarWidth() > 0;
    const modalIsOverflowing = node.scrollHeight > ownerDocument(node).documentElement.clientHeight;
    setStyle({
      paddingRight: containerIsOverflowing && !modalIsOverflowing ? scrollbarSize() : void 0,
      paddingLeft: !containerIsOverflowing && modalIsOverflowing ? scrollbarSize() : void 0
    });
  }
  const handleWindowResize = useEventCallback$1(() => {
    if (modal) {
      updateDialogStyle(modal.dialog);
    }
  });
  useWillUnmount$2(() => {
    removeEventListener(window, "resize", handleWindowResize);
    removeStaticModalAnimationRef.current == null || removeStaticModalAnimationRef.current();
  });
  const handleDialogMouseDown = () => {
    waitingForMouseUpRef.current = true;
  };
  const handleMouseUp = (e) => {
    if (waitingForMouseUpRef.current && modal && e.target === modal.dialog) {
      ignoreBackdropClickRef.current = true;
    }
    waitingForMouseUpRef.current = false;
  };
  const handleStaticModalAnimation = () => {
    setAnimateStaticModal(true);
    removeStaticModalAnimationRef.current = transitionEnd(modal.dialog, () => {
      setAnimateStaticModal(false);
    });
  };
  const handleStaticBackdropClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    handleStaticModalAnimation();
  };
  const handleClick = (e) => {
    if (backdrop === "static") {
      handleStaticBackdropClick(e);
      return;
    }
    if (ignoreBackdropClickRef.current || e.target !== e.currentTarget) {
      ignoreBackdropClickRef.current = false;
      return;
    }
    onHide == null || onHide();
  };
  const handleEscapeKeyDown = (e) => {
    if (keyboard) {
      onEscapeKeyDown == null || onEscapeKeyDown(e);
    } else {
      e.preventDefault();
      if (backdrop === "static") {
        handleStaticModalAnimation();
      }
    }
  };
  const handleEnter = (node, isAppearing) => {
    if (node) {
      updateDialogStyle(node);
    }
    onEnter == null || onEnter(node, isAppearing);
  };
  const handleExit = (node) => {
    removeStaticModalAnimationRef.current == null || removeStaticModalAnimationRef.current();
    onExit == null || onExit(node);
  };
  const handleEntering = (node, isAppearing) => {
    onEntering == null || onEntering(node, isAppearing);
    addEventListener(window, "resize", handleWindowResize);
  };
  const handleExited = (node) => {
    if (node) node.style.display = "";
    onExited == null || onExited(node);
    removeEventListener(window, "resize", handleWindowResize);
  };
  const renderBackdrop = reactExports.useCallback((backdropProps) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    ...backdropProps,
    className: classNames(`${bsPrefix}-backdrop`, backdropClassName, !animation && "show")
  }), [animation, backdropClassName, bsPrefix]);
  const baseModalStyle = {
    ...style2,
    ...modalStyle
  };
  baseModalStyle.display = "block";
  const renderDialog = (dialogProps) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    role: "dialog",
    ...dialogProps,
    style: baseModalStyle,
    className: classNames(className, bsPrefix, animateStaticModal && `${bsPrefix}-static`, !animation && "show"),
    onClick: backdrop ? handleClick : void 0,
    onMouseUp: handleMouseUp,
    "data-bs-theme": dataBsTheme,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, {
      ...props,
      onMouseDown: handleDialogMouseDown,
      className: dialogClassName,
      contentClassName,
      children
    })
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ModalContext.Provider, {
    value: modalContext,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(default_1, {
      show,
      ref: mergedRef,
      backdrop,
      container,
      keyboard: true,
      autoFocus,
      enforceFocus,
      restoreFocus,
      restoreFocusOptions,
      onEscapeKeyDown: handleEscapeKeyDown,
      onShow,
      onHide,
      onEnter: handleEnter,
      onEntering: handleEntering,
      onEntered,
      onExit: handleExit,
      onExiting,
      onExited: handleExited,
      manager: getModalManager(),
      transition: animation ? DialogTransition : void 0,
      backdropTransition: animation ? BackdropTransition : void 0,
      renderBackdrop,
      renderDialog
    })
  });
});
Modal.displayName = "Modal";
const Modal$1 = Object.assign(Modal, {
  Body: ModalBody,
  Header: ModalHeader,
  Title: ModalTitle,
  Footer: ModalFooter,
  Dialog: ModalDialog,
  TRANSITION_DURATION: 300,
  BACKDROP_TRANSITION_DURATION: 150
});
export {
  Modal$1 as M
};

import { j as jsxRuntimeExports, J as Je, f as fe, r as reactExports, b as requireReact, q } from "../ssr.js";
import { L as Layout } from "./Layout-DW-GDqDp.js";
import SubscriptionCard from "./SubscriptionCard-BCstsyTB.js";
import UserProfile from "./UserProfile-C0zxl16L.js";
import MyPuppies from "./MyPuppies-DFO04juH.js";
import { B as Button$2 } from "./Button-C_TFTgI3.js";
import { c as classNames } from "./index-DbhDZzck.js";
import { _ as _extends } from "./extends-BwmuZ0dU.js";
import { _ as _objectWithoutPropertiesLoose$2 } from "./index-ttmgawJR.js";
import { u as useBootstrapPrefix, d as divWithClassName, a as useEventCallback, b as useCommittedRef, c as useIsomorphicEffect, e as useMounted, f as usePrevious, F as Fade, g as useEventCallback$1, C as CloseButton } from "./Modal-BtmenwCz.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
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
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
import "./InputLabel-DAgP54zY.js";
import "./TextInput-CTPfMhdJ.js";
import "./UserAvatar-CaV01o4d.js";
import "./InputError-BrGvvBAw.js";
import "./IconInput-DVVkR3jY.js";
import "./MapInput-BZhFXzCL.js";
import "./index-D7h8hQJR.js";
import "./Card-CrW8n-BK.js";
import "./Tooltip-BCRubnSZ.js";
import "./floating-ui.dom-D9vmQZx1.js";
const ListPill = ({ name, href, logo, tab }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "nav-item", role: "presentation", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      className: `nav-link d-flex align-items-center gap-3 rounded-pill d-block w-100 fw-medium text-start ${name === tab ? "active" : ""} `,
      "data-bs-toggle": "pill",
      "data-bs-target": href,
      type: "button",
      role: "tab",
      "aria-controls": href,
      "aria-selected": "false",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: logo,
            alt: "urpuppy-img",
            width: "20",
            height: "20"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "d-none d-md-block", children: name }),
        " "
      ]
    }
  ) });
};
const SavedSearchCard = ({ saved_search }) => {
  const handleSearch = () => {
    const payload = Object.entries(saved_search.payload.filter).map(([key, obj]) => ({
      [key]: (obj == null ? void 0 : obj.value) ?? obj
    }));
    const flattenedPayload = payload.reduce((acc, current) => {
      const [key, value] = Object.entries(current)[0];
      acc[key] = value;
      return acc;
    }, {});
    fe.visit(`/puppies`, {
      data: { filter: flattenedPayload },
      only: [
        "puppies",
        "breed_filter_list",
        "state_filter_list"
      ],
      method: "get",
      preserveState: true
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-4", children: saved_search.name ?? saved_search.created_at }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button$2, { type: "button", onClick: handleSearch, className: "btn btn-primary fs-2", href: "#", children: "View Search" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Delete saved search", className: "btn btn-outline-extralight border btn-white text-dark fs-2", href: `/saved-search/${saved_search.id}`, children: "Delete" })
    ] })
  ] }) });
};
process.env.NODE_ENV;
function defaultKey(key) {
  return "default" + key.charAt(0).toUpperCase() + key.substr(1);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint);
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(input);
}
function useUncontrolledProp(propValue, defaultValue, handler) {
  var wasPropRef = reactExports.useRef(propValue !== void 0);
  var _useState = reactExports.useState(defaultValue), stateValue = _useState[0], setState = _useState[1];
  var isProp = propValue !== void 0;
  var wasProp = wasPropRef.current;
  wasPropRef.current = isProp;
  if (!isProp && wasProp && stateValue !== defaultValue) {
    setState(defaultValue);
  }
  return [isProp ? propValue : stateValue, reactExports.useCallback(function(value) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (handler) handler.apply(void 0, [value].concat(args));
    setState(value);
  }, [handler])];
}
function useUncontrolled(props, config) {
  return Object.keys(config).reduce(function(result, fieldName) {
    var _extends2;
    var _ref = result, defaultValue = _ref[defaultKey(fieldName)], propsValue = _ref[fieldName], rest = _objectWithoutPropertiesLoose$2(_ref, [defaultKey(fieldName), fieldName].map(_toPropertyKey));
    var handlerName = config[fieldName];
    var _useUncontrolledProp = useUncontrolledProp(propsValue, defaultValue, props[handlerName]), value = _useUncontrolledProp[0], handler = _useUncontrolledProp[1];
    return _extends({}, rest, (_extends2 = {}, _extends2[fieldName] = value, _extends2[handlerName] = handler, _extends2));
  }, props);
}
const DivStyledAsH4 = divWithClassName("h4");
DivStyledAsH4.displayName = "DivStyledAsH4";
const AlertHeading = /* @__PURE__ */ reactExports.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH4,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "alert-heading");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Component, {
    ref,
    className: classNames(className, bsPrefix),
    ...props
  });
});
AlertHeading.displayName = "AlertHeading";
var cjs = {};
var useCallbackRef$1 = {};
useCallbackRef$1.__esModule = true;
useCallbackRef$1.default = useCallbackRef;
var _react$7 = requireReact();
function useCallbackRef() {
  return (0, _react$7.useState)(null);
}
var useEventListener$1 = {};
useEventListener$1.__esModule = true;
useEventListener$1.default = useEventListener;
var _react$6 = requireReact();
var _useEventCallback$1 = _interopRequireDefault$6(useEventCallback);
function _interopRequireDefault$6(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function useEventListener(eventTarget, event, listener, capture = false) {
  const handler = (0, _useEventCallback$1.default)(listener);
  (0, _react$6.useEffect)(() => {
    const target = typeof eventTarget === "function" ? eventTarget() : eventTarget;
    target.addEventListener(event, handler, capture);
    return () => target.removeEventListener(event, handler, capture);
  }, [eventTarget]);
}
var useGlobalListener$1 = {};
useGlobalListener$1.__esModule = true;
useGlobalListener$1.default = useGlobalListener;
var _useEventListener$1 = _interopRequireDefault$5(useEventListener$1);
var _react$5 = requireReact();
function _interopRequireDefault$5(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function useGlobalListener(event, handler, capture = false) {
  const documentTarget = (0, _react$5.useCallback)(() => document, []);
  return (0, _useEventListener$1.default)(documentTarget, event, handler, capture);
}
var useInterval$1 = {};
useInterval$1.__esModule = true;
useInterval$1.default = void 0;
var _react$4 = requireReact();
var _useCommittedRef$2 = _interopRequireDefault$4(useCommittedRef);
function _interopRequireDefault$4(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function useInterval(fn, ms, paused = false, runImmediately = false) {
  let handle;
  const fnRef = (0, _useCommittedRef$2.default)(fn);
  const pausedRef = (0, _useCommittedRef$2.default)(paused);
  const tick = () => {
    if (pausedRef.current) return;
    fnRef.current();
    schedule();
  };
  const schedule = () => {
    clearTimeout(handle);
    handle = setTimeout(tick, ms);
  };
  (0, _react$4.useEffect)(() => {
    if (runImmediately) {
      tick();
    } else {
      schedule();
    }
    return () => clearTimeout(handle);
  }, [paused, runImmediately]);
}
var _default$1 = useInterval;
useInterval$1.default = _default$1;
var useRafInterval$1 = {};
useRafInterval$1.__esModule = true;
useRafInterval$1.default = void 0;
var _react$3 = requireReact();
var _useCommittedRef$1 = _interopRequireDefault$3(useCommittedRef);
function _interopRequireDefault$3(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function useRafInterval(fn, ms, paused = false) {
  let handle;
  let start = (/* @__PURE__ */ new Date()).getTime();
  const fnRef = (0, _useCommittedRef$1.default)(fn);
  const pausedRef = (0, _useCommittedRef$1.default)(paused);
  function loop() {
    const current = (/* @__PURE__ */ new Date()).getTime();
    const delta = current - start;
    if (pausedRef.current) return;
    if (delta >= ms && fnRef.current) {
      fnRef.current();
      start = (/* @__PURE__ */ new Date()).getTime();
    }
    cancelAnimationFrame(handle);
    handle = requestAnimationFrame(loop);
  }
  (0, _react$3.useEffect)(() => {
    handle = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(handle);
  }, []);
}
var _default = useRafInterval;
useRafInterval$1.default = _default;
var useMergeState$1 = {};
useMergeState$1.__esModule = true;
useMergeState$1.default = useMergeState;
var _react$2 = requireReact();
function useMergeState(initialState) {
  const [state, setState] = (0, _react$2.useState)(initialState);
  const updater = (0, _react$2.useCallback)((update) => {
    if (update === null) return;
    if (typeof update === "function") {
      setState((state2) => {
        const nextState = update(state2);
        return nextState == null ? state2 : Object.assign({}, state2, nextState);
      });
    } else {
      setState((state2) => Object.assign({}, state2, update));
    }
  }, [setState]);
  return [state, updater];
}
var useMergeStateFromProps$1 = {};
useMergeStateFromProps$1.__esModule = true;
useMergeStateFromProps$1.default = useMergeStateFromProps;
var _useMergeState$1 = _interopRequireDefault$2(useMergeState$1);
function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function useMergeStateFromProps(props, gDSFP, initialState) {
  const [state, setState] = (0, _useMergeState$1.default)(initialState);
  const nextState = gDSFP(props, state);
  if (nextState !== null) setState(nextState);
  return [state, setState];
}
var useImage$1 = {};
useImage$1.__esModule = true;
useImage$1.default = useImage;
var _react$1 = requireReact();
function useImage(imageOrUrl, crossOrigin) {
  const [state, setState] = (0, _react$1.useState)({
    image: null,
    error: null
  });
  (0, _react$1.useEffect)(() => {
    if (!imageOrUrl) return void 0;
    let image;
    if (typeof imageOrUrl === "string") {
      image = new Image();
      if (crossOrigin) image.crossOrigin = crossOrigin;
      image.src = imageOrUrl;
    } else {
      image = imageOrUrl;
      if (image.complete && image.naturalHeight > 0) {
        setState({
          image,
          error: null
        });
        return;
      }
    }
    function onLoad() {
      setState({
        image,
        error: null
      });
    }
    function onError(error) {
      setState({
        image,
        error
      });
    }
    image.addEventListener("load", onLoad);
    image.addEventListener("error", onError);
    return () => {
      image.removeEventListener("load", onLoad);
      image.removeEventListener("error", onError);
    };
  }, [imageOrUrl, crossOrigin]);
  return state;
}
var useResizeObserver$1 = {};
useResizeObserver$1.__esModule = true;
useResizeObserver$1.default = useResizeObserver;
var _react = requireReact();
var _useIsomorphicEffect = _interopRequireDefault$1(useIsomorphicEffect);
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const targetMap = /* @__PURE__ */ new WeakMap();
let resizeObserver;
function getResizeObserver() {
  return resizeObserver = resizeObserver || new window.ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const handler = targetMap.get(entry.target);
      if (handler) handler(entry.contentRect);
    });
  });
}
function useResizeObserver(element) {
  const [rect, setRect] = (0, _react.useState)(null);
  (0, _useIsomorphicEffect.default)(() => {
    if (!element) return;
    getResizeObserver().observe(element);
    setRect(element.getBoundingClientRect());
    targetMap.set(element, (rect2) => {
      setRect(rect2);
    });
    return () => {
      targetMap.delete(element);
    };
  }, [element]);
  return rect;
}
cjs.__esModule = true;
var _useCallbackRef = _interopRequireDefault(useCallbackRef$1);
cjs.useCallbackRef = _useCallbackRef.default;
var _useCommittedRef = _interopRequireDefault(useCommittedRef);
cjs.useCommittedRef = _useCommittedRef.default;
var _useEventCallback = _interopRequireDefault(useEventCallback);
cjs.useEventCallback = _useEventCallback.default;
var _useEventListener = _interopRequireDefault(useEventListener$1);
cjs.useEventListener = _useEventListener.default;
var _useGlobalListener = _interopRequireDefault(useGlobalListener$1);
cjs.useGlobalListener = _useGlobalListener.default;
var _useInterval = _interopRequireDefault(useInterval$1);
cjs.useInterval = _useInterval.default;
var _useRafInterval = _interopRequireDefault(useRafInterval$1);
cjs.useRafInterval = _useRafInterval.default;
var _useMergeState = _interopRequireDefault(useMergeState$1);
cjs.useMergeState = _useMergeState.default;
var _useMergeStateFromProps = _interopRequireDefault(useMergeStateFromProps$1);
cjs.useMergeStateFromProps = _useMergeStateFromProps.default;
var _useMounted = _interopRequireDefault(useMounted);
cjs.useMounted = _useMounted.default;
var _usePrevious = _interopRequireDefault(usePrevious);
cjs.usePrevious = _usePrevious.default;
var _useImage = _interopRequireDefault(useImage$1);
cjs.useImage = _useImage.default;
var _useResizeObserver = _interopRequireDefault(useResizeObserver$1);
cjs.useResizeObserver = _useResizeObserver.default;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var Button$1 = {};
Button$1.__esModule = true;
Button$1.default = void 0;
Button$1.isTrivialHref = isTrivialHref$1;
Button$1.useButtonProps = useButtonProps;
var React$1 = _interopRequireWildcard$1(requireReact());
var _jsxRuntime$1 = jsxRuntimeExports;
const _excluded$1 = ["as", "disabled"];
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
function _objectWithoutPropertiesLoose$1(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.indexOf(n) >= 0) continue;
    t[n] = r[n];
  }
  return t;
}
function isTrivialHref$1(href) {
  return !href || href.trim() === "#";
}
function useButtonProps({
  tagName,
  disabled,
  href,
  target,
  rel,
  role,
  onClick,
  tabIndex = 0,
  type
}) {
  if (!tagName) {
    if (href != null || target != null || rel != null) {
      tagName = "a";
    } else {
      tagName = "button";
    }
  }
  const meta = {
    tagName
  };
  if (tagName === "button") {
    return [{
      type: type || "button",
      disabled
    }, meta];
  }
  const handleClick = (event) => {
    if (disabled || tagName === "a" && isTrivialHref$1(href)) {
      event.preventDefault();
    }
    if (disabled) {
      event.stopPropagation();
      return;
    }
    onClick == null ? void 0 : onClick(event);
  };
  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      handleClick(event);
    }
  };
  if (tagName === "a") {
    href || (href = "#");
    if (disabled) {
      href = void 0;
    }
  }
  return [{
    role: role != null ? role : "button",
    // explicitly undefined so that it overrides the props disabled in a spread
    // e.g. <Tag {...props} {...hookProps} />
    disabled: void 0,
    tabIndex: disabled ? void 0 : tabIndex,
    href,
    target: tagName === "a" ? target : void 0,
    "aria-disabled": !disabled ? void 0 : disabled,
    rel: tagName === "a" ? rel : void 0,
    onClick: handleClick,
    onKeyDown: handleKeyDown
  }, meta];
}
const Button = /* @__PURE__ */ React$1.forwardRef((_ref, ref) => {
  let {
    as: asProp,
    disabled
  } = _ref, props = _objectWithoutPropertiesLoose$1(_ref, _excluded$1);
  const [buttonProps, {
    tagName: Component
  }] = useButtonProps(Object.assign({
    tagName: asProp,
    disabled
  }, props));
  return /* @__PURE__ */ (0, _jsxRuntime$1.jsx)(Component, Object.assign({}, props, buttonProps, {
    ref
  }));
});
Button.displayName = "Button";
Button$1.default = Button;
var default_1 = void 0;
var React = _interopRequireWildcard(requireReact());
var _hooks = cjs;
var _Button = Button$1;
var _jsxRuntime = jsxRuntimeExports;
const _excluded = ["onKeyDown"];
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
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.indexOf(n) >= 0) continue;
    t[n] = r[n];
  }
  return t;
}
function isTrivialHref(href) {
  return !href || href.trim() === "#";
}
const Anchor = /* @__PURE__ */ React.forwardRef((_ref, ref) => {
  let {
    onKeyDown
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const [buttonProps] = (0, _Button.useButtonProps)(Object.assign({
    tagName: "a"
  }, props));
  const handleKeyDown = (0, _hooks.useEventCallback)((e) => {
    buttonProps.onKeyDown(e);
    onKeyDown == null ? void 0 : onKeyDown(e);
  });
  if (isTrivialHref(props.href) || props.role === "button") {
    return /* @__PURE__ */ (0, _jsxRuntime.jsx)("a", Object.assign({
      ref
    }, props, buttonProps, {
      onKeyDown: handleKeyDown
    }));
  }
  return /* @__PURE__ */ (0, _jsxRuntime.jsx)("a", Object.assign({
    ref
  }, props, {
    onKeyDown
  }));
});
Anchor.displayName = "Anchor";
default_1 = Anchor;
const AlertLink = /* @__PURE__ */ reactExports.forwardRef(({
  className,
  bsPrefix,
  as: Component = default_1,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "alert-link");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Component, {
    ref,
    className: classNames(className, bsPrefix),
    ...props
  });
});
AlertLink.displayName = "AlertLink";
const Alert = /* @__PURE__ */ reactExports.forwardRef((uncontrolledProps, ref) => {
  const {
    bsPrefix,
    show = true,
    closeLabel = "Close alert",
    closeVariant,
    className,
    children,
    variant = "primary",
    onClose,
    dismissible,
    transition = Fade,
    ...props
  } = useUncontrolled(uncontrolledProps, {
    show: "onClose"
  });
  const prefix = useBootstrapPrefix(bsPrefix, "alert");
  const handleClose = useEventCallback$1((e) => {
    if (onClose) {
      onClose(false, e);
    }
  });
  const Transition = transition === true ? Fade : transition;
  const alert = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    role: "alert",
    ...!Transition ? props : void 0,
    ref,
    className: classNames(className, prefix, variant && `${prefix}-${variant}`, dismissible && `${prefix}-dismissible`),
    children: [dismissible && /* @__PURE__ */ jsxRuntimeExports.jsx(CloseButton, {
      onClick: handleClose,
      "aria-label": closeLabel,
      variant: closeVariant
    }), children]
  });
  if (!Transition) return show ? alert : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Transition, {
    unmountOnExit: true,
    ...props,
    ref: void 0,
    in: show,
    children: alert
  });
});
Alert.displayName = "Alert";
const Alert$1 = Object.assign(Alert, {
  Link: AlertLink,
  Heading: AlertHeading
});
function AlertDismissible({ variant = "danger", message = "", heading = "" }) {
  const [show, setShow] = reactExports.useState(true);
  if (show) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert$1, { variant, onClose: () => setShow(false), dismissible: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Alert$1.Heading, { children: heading }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: message })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
}
const NavigationSettings = [
  { name: "Account Settings", href: "#pills-account-settings", id: "pills-account-settings-tab", logo: "../images/svgs/icon-user-dark.svg" },
  { name: "My Subscription", href: "#pills-my-subscription", id: "pills-my-subscription-tab", logo: "../images/svgs/icon-card.svg" },
  { name: "Saved Search", href: "#pills-saved-search", id: "pills-saved-search-tab", logo: "../images/svgs/icon-bookmarks.svg" },
  { name: "My Puppies", href: "#pills-my-puppies", id: "pills-my-puppies-tab", logo: "../images/svgs/icon-paws-dark.svg" }
];
function Edit({
  mustVerifyEmail,
  status,
  plan,
  breeder_plan,
  puppies,
  saved_searches,
  plan_next_billing,
  plan_cancel_at,
  breeder_next_billing,
  breeder_cancel_at,
  breeder_requests,
  tab
}) {
  var _a, _b, _c, _d;
  const errors = q().props.errors;
  const user = q().props.auth.user;
  const [currentTab, setCurrentTab] = reactExports.useState(tab ?? "Account Settings");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Layout,
    {
      navType: "secondary",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: "Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-wrapper position-relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "account-settings py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
          breeder_requests && (breeder_requests == null ? void 0 : breeder_requests.status) != "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            (breeder_requests == null ? void 0 : breeder_requests.status) == "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDismissible, { variant: "primary", heading: "Pending Breeder Request", message: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: breeder_requests.message }),
              " "
            ] }) }),
            (breeder_requests == null ? void 0 : breeder_requests.status) == "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDismissible, { variant: "danger", heading: "Your Breeder Request has been rejected", message: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                breeder_requests.message,
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Je,
                  {
                    "aria-label": "Retry",
                    method: "post",
                    className: "border-0 bg-transparent text-primary text-decoration-underline ",
                    href: "/breeder/request/retry",
                    children: " Request Again"
                  }
                )
              ] }),
              " "
            ] }) })
          ] }),
          !(user == null ? void 0 : user.breeder_plan) && (breeder_requests == null ? void 0 : breeder_requests.status) == "approved" && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDismissible, { variant: "success", heading: "Your application has been approved", message: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "You can now proceed to payment for your breeder plan ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { href: "/plans/breeder", children: "Choose a plan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
            ] }),
            " "
          ] }) }),
          mustVerifyEmail && user.email_verified_at == null && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDismissible, { variant: "primary", heading: "Verify your email", message: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              " Before you get started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Je,
                {
                  "aria-label": "Resend verification email",
                  href: "/email/verification-notification",
                  method: "post",
                  as: "button",
                  className: "border-0 bg-transparent text-primary text-decoration-underline ",
                  children: "Click here to re-send the verification email."
                }
              )
            ] }),
            " "
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "ul",
              {
                className: "nav nav-pills justify-content-center flex-lg-column gap-2 mb-4 mb-lg-0",
                id: "pills-tab",
                role: "tablist",
                children: NavigationSettings.map((item, index) => {
                  var _a2, _b2;
                  if (item.name == "Saved Search") {
                    if (!((_a2 = user == null ? void 0 : user.roles) == null ? void 0 : _a2.includes("buyer"))) {
                      return;
                    }
                  }
                  if (item.name == "My Subscription" || item.name == "My Puppies") {
                    if ((_b2 = user == null ? void 0 : user.roles) == null ? void 0 : _b2.includes("buyer")) {
                      return;
                    }
                  }
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(ListPill, { tab, name: item.name, logo: item.logo, href: item.href }, index);
                })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-content", id: "pills-tabContent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: errors && Object.values(errors).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "alert alert-danger", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: Object.keys(errors).map((key, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: errors[key] }, index)) }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: ` tab-pane fade  ${currentTab == "Account Settings" ? "show active" : ""} `,
                  id: "pills-account-settings",
                  role: "tabpanel",
                  "aria-labelledby": "pills-account-settings-tab",
                  tabIndex: 0,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserProfile, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: ` tab-pane fade ${currentTab == "My Subscription" ? "show active" : ""} `,
                  id: "pills-my-subscription",
                  role: "tabpanel",
                  "aria-labelledby": "pills-my-subscription-tab",
                  tabIndex: 0,
                  children: [
                    (plan || breeder_plan) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { rel: "nofollow", className: "btn btn-secondary", href: "/billing", children: "Manage subscription" }) }) }),
                    plan && /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionCard, { next_billing: plan_next_billing, cancel_at: plan_cancel_at, plan }, "plan"),
                    breeder_plan && /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionCard, { next_billing: breeder_next_billing, cancel_at: breeder_cancel_at, plan: breeder_plan }, "breeder_plan"),
                    !plan && !breeder_plan && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
                      ((_a = user == null ? void 0 : user.roles) == null ? void 0 : _a.includes("seller")) && (user == null ? void 0 : user.profile_completed) && /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Choose Plan", href: "/plans", method: "get", as: "button", className: "btn btn-primary", children: "Choose Plan" }) }),
                      ((_b = user == null ? void 0 : user.roles) == null ? void 0 : _b.includes("breeder")) && (user == null ? void 0 : user.profile_completed) && /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Choose Plan", href: "/plans/breeder", method: "get", as: "button", className: "btn btn-primary", children: "Choose Plan" }) }),
                      !(user == null ? void 0 : user.profile_completed) && /* @__PURE__ */ jsxRuntimeExports.jsxs("h6", { className: "mb-4", children: [
                        ((_c = user == null ? void 0 : user.roles) == null ? void 0 : _c.includes("breeder")) && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Complete Profile", href: "/breeders/create", method: "get", as: "button", className: "btn btn-primary", children: "Complete Profile" }) }) }),
                        ((_d = user == null ? void 0 : user.roles) == null ? void 0 : _d.includes("seller")) && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Complete Profile", href: "/seller/create", method: "get", as: "button", className: "btn btn-primary", children: "Complete Profile" }) }) })
                      ] })
                    ] }) }) })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: ` tab-pane fade ${currentTab == "Saved Search" ? "show active" : ""} `,
                  id: "pills-saved-search",
                  role: "tabpanel",
                  "aria-labelledby": "pills-saved-search-tab",
                  tabIndex: 0,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: saved_searches.length > 0 ? saved_searches.map((saved_search, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-xx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SavedSearchCard, { saved_search }, index) })) : /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-4", children: " No Saved Search" }) }) }) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: ` tab-pane fade ${currentTab == "My Puppies" ? "show active" : ""} `,
                  id: "pills-my-puppies",
                  role: "tabpanel",
                  "aria-labelledby": "pills-my-puppies-tab",
                  tabIndex: 0,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MyPuppies, { puppies }) }) })
                }
              )
            ] }) })
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  Edit as default
};

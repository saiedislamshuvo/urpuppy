import { j as jsxRuntimeExports, r as reactExports, S as Se, q, a as je, J as Je } from "../ssr.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
import { I as InputLabel } from "./InputLabel-DAgP54zY.js";
import { P as PrimaryButton } from "./PrimaryButton-qr4fO_6y.js";
import { P as PuppyCard } from "./Card-Kjm6uc3j.js";
import { T as TextInput } from "./TextInput-CTPfMhdJ.js";
import { P as PropTypes } from "./index-DgY4nH2N.js";
import { h as hoistNonReactStatics$1 } from "./hoist-non-react-statics.cjs-BnF7CivY.js";
import { V as Vt } from "./index-DzrIk5T7.js";
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
import "./Tooltip-fHI3Ksjq.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./index-DbhDZzck.js";
function Checkbox({
  className = "",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "form-check-input primary" + className
    }
  );
}
var _excluded = ["sitekey", "onChange", "theme", "type", "tabindex", "onExpired", "onErrored", "size", "stoken", "grecaptcha", "badge", "hl", "isolated"];
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _inheritsLoose$1(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
var ReCAPTCHA = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose$1(ReCAPTCHA2, _React$Component);
  function ReCAPTCHA2() {
    var _this;
    _this = _React$Component.call(this) || this;
    _this.handleExpired = _this.handleExpired.bind(_assertThisInitialized(_this));
    _this.handleErrored = _this.handleErrored.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleRecaptchaRef = _this.handleRecaptchaRef.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = ReCAPTCHA2.prototype;
  _proto.getCaptchaFunction = function getCaptchaFunction(fnName) {
    if (this.props.grecaptcha) {
      if (this.props.grecaptcha.enterprise) {
        return this.props.grecaptcha.enterprise[fnName];
      }
      return this.props.grecaptcha[fnName];
    }
    return null;
  };
  _proto.getValue = function getValue() {
    var getResponse = this.getCaptchaFunction("getResponse");
    if (getResponse && this._widgetId !== void 0) {
      return getResponse(this._widgetId);
    }
    return null;
  };
  _proto.getWidgetId = function getWidgetId() {
    if (this.props.grecaptcha && this._widgetId !== void 0) {
      return this._widgetId;
    }
    return null;
  };
  _proto.execute = function execute() {
    var execute2 = this.getCaptchaFunction("execute");
    if (execute2 && this._widgetId !== void 0) {
      return execute2(this._widgetId);
    } else {
      this._executeRequested = true;
    }
  };
  _proto.executeAsync = function executeAsync() {
    var _this2 = this;
    return new Promise(function(resolve, reject) {
      _this2.executionResolve = resolve;
      _this2.executionReject = reject;
      _this2.execute();
    });
  };
  _proto.reset = function reset() {
    var resetter = this.getCaptchaFunction("reset");
    if (resetter && this._widgetId !== void 0) {
      resetter(this._widgetId);
    }
  };
  _proto.forceReset = function forceReset() {
    var resetter = this.getCaptchaFunction("reset");
    if (resetter) {
      resetter();
    }
  };
  _proto.handleExpired = function handleExpired() {
    if (this.props.onExpired) {
      this.props.onExpired();
    } else {
      this.handleChange(null);
    }
  };
  _proto.handleErrored = function handleErrored() {
    if (this.props.onErrored) {
      this.props.onErrored();
    }
    if (this.executionReject) {
      this.executionReject();
      delete this.executionResolve;
      delete this.executionReject;
    }
  };
  _proto.handleChange = function handleChange(token) {
    if (this.props.onChange) {
      this.props.onChange(token);
    }
    if (this.executionResolve) {
      this.executionResolve(token);
      delete this.executionReject;
      delete this.executionResolve;
    }
  };
  _proto.explicitRender = function explicitRender() {
    var render = this.getCaptchaFunction("render");
    if (render && this._widgetId === void 0) {
      var wrapper = document.createElement("div");
      this._widgetId = render(wrapper, {
        sitekey: this.props.sitekey,
        callback: this.handleChange,
        theme: this.props.theme,
        type: this.props.type,
        tabindex: this.props.tabindex,
        "expired-callback": this.handleExpired,
        "error-callback": this.handleErrored,
        size: this.props.size,
        stoken: this.props.stoken,
        hl: this.props.hl,
        badge: this.props.badge,
        isolated: this.props.isolated
      });
      this.captcha.appendChild(wrapper);
    }
    if (this._executeRequested && this.props.grecaptcha && this._widgetId !== void 0) {
      this._executeRequested = false;
      this.execute();
    }
  };
  _proto.componentDidMount = function componentDidMount() {
    this.explicitRender();
  };
  _proto.componentDidUpdate = function componentDidUpdate() {
    this.explicitRender();
  };
  _proto.handleRecaptchaRef = function handleRecaptchaRef(elem) {
    this.captcha = elem;
  };
  _proto.render = function render() {
    var _this$props = this.props;
    _this$props.sitekey;
    _this$props.onChange;
    _this$props.theme;
    _this$props.type;
    _this$props.tabindex;
    _this$props.onExpired;
    _this$props.onErrored;
    _this$props.size;
    _this$props.stoken;
    _this$props.grecaptcha;
    _this$props.badge;
    _this$props.hl;
    _this$props.isolated;
    var childProps = _objectWithoutPropertiesLoose$1(_this$props, _excluded);
    return /* @__PURE__ */ reactExports.createElement("div", _extends$1({}, childProps, {
      ref: this.handleRecaptchaRef
    }));
  };
  return ReCAPTCHA2;
}(reactExports.Component);
ReCAPTCHA.displayName = "ReCAPTCHA";
ReCAPTCHA.propTypes = {
  sitekey: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  grecaptcha: PropTypes.object,
  theme: PropTypes.oneOf(["dark", "light"]),
  type: PropTypes.oneOf(["image", "audio"]),
  tabindex: PropTypes.number,
  onExpired: PropTypes.func,
  onErrored: PropTypes.func,
  size: PropTypes.oneOf(["compact", "normal", "invisible"]),
  stoken: PropTypes.string,
  hl: PropTypes.string,
  badge: PropTypes.oneOf(["bottomright", "bottomleft", "inline"]),
  isolated: PropTypes.bool
};
ReCAPTCHA.defaultProps = {
  onChange: function onChange() {
  },
  theme: "light",
  type: "image",
  tabindex: 0,
  size: "normal",
  badge: "bottomright"
};
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
var SCRIPT_MAP = {};
var idCount = 0;
function makeAsyncScript(getScriptURL, options) {
  options = options || {};
  return function wrapWithAsyncScript(WrappedComponent) {
    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || "Component";
    var AsyncScriptLoader = /* @__PURE__ */ function(_Component) {
      _inheritsLoose(AsyncScriptLoader2, _Component);
      function AsyncScriptLoader2(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.state = {};
        _this.__scriptURL = "";
        return _this;
      }
      var _proto = AsyncScriptLoader2.prototype;
      _proto.asyncScriptLoaderGetScriptLoaderID = function asyncScriptLoaderGetScriptLoaderID() {
        if (!this.__scriptLoaderID) {
          this.__scriptLoaderID = "async-script-loader-" + idCount++;
        }
        return this.__scriptLoaderID;
      };
      _proto.setupScriptURL = function setupScriptURL() {
        this.__scriptURL = typeof getScriptURL === "function" ? getScriptURL() : getScriptURL;
        return this.__scriptURL;
      };
      _proto.asyncScriptLoaderHandleLoad = function asyncScriptLoaderHandleLoad(state) {
        var _this2 = this;
        this.setState(state, function() {
          return _this2.props.asyncScriptOnLoad && _this2.props.asyncScriptOnLoad(_this2.state);
        });
      };
      _proto.asyncScriptLoaderTriggerOnScriptLoaded = function asyncScriptLoaderTriggerOnScriptLoaded() {
        var mapEntry = SCRIPT_MAP[this.__scriptURL];
        if (!mapEntry || !mapEntry.loaded) {
          throw new Error("Script is not loaded.");
        }
        for (var obsKey in mapEntry.observers) {
          mapEntry.observers[obsKey](mapEntry);
        }
        delete window[options.callbackName];
      };
      _proto.componentDidMount = function componentDidMount() {
        var _this3 = this;
        var scriptURL = this.setupScriptURL();
        var key = this.asyncScriptLoaderGetScriptLoaderID();
        var _options = options, globalName2 = _options.globalName, callbackName2 = _options.callbackName, scriptId = _options.scriptId;
        if (globalName2 && typeof window[globalName2] !== "undefined") {
          SCRIPT_MAP[scriptURL] = {
            loaded: true,
            observers: {}
          };
        }
        if (SCRIPT_MAP[scriptURL]) {
          var entry = SCRIPT_MAP[scriptURL];
          if (entry && (entry.loaded || entry.errored)) {
            this.asyncScriptLoaderHandleLoad(entry);
            return;
          }
          entry.observers[key] = function(entry2) {
            return _this3.asyncScriptLoaderHandleLoad(entry2);
          };
          return;
        }
        var observers = {};
        observers[key] = function(entry2) {
          return _this3.asyncScriptLoaderHandleLoad(entry2);
        };
        SCRIPT_MAP[scriptURL] = {
          loaded: false,
          observers
        };
        var script = document.createElement("script");
        script.src = scriptURL;
        script.async = true;
        for (var attribute in options.attributes) {
          script.setAttribute(attribute, options.attributes[attribute]);
        }
        if (scriptId) {
          script.id = scriptId;
        }
        var callObserverFuncAndRemoveObserver = function callObserverFuncAndRemoveObserver2(func) {
          if (SCRIPT_MAP[scriptURL]) {
            var mapEntry = SCRIPT_MAP[scriptURL];
            var observersMap = mapEntry.observers;
            for (var obsKey in observersMap) {
              if (func(observersMap[obsKey])) {
                delete observersMap[obsKey];
              }
            }
          }
        };
        if (callbackName2 && typeof window !== "undefined") {
          window[callbackName2] = function() {
            return _this3.asyncScriptLoaderTriggerOnScriptLoaded();
          };
        }
        script.onload = function() {
          var mapEntry = SCRIPT_MAP[scriptURL];
          if (mapEntry) {
            mapEntry.loaded = true;
            callObserverFuncAndRemoveObserver(function(observer) {
              if (callbackName2) {
                return false;
              }
              observer(mapEntry);
              return true;
            });
          }
        };
        script.onerror = function() {
          var mapEntry = SCRIPT_MAP[scriptURL];
          if (mapEntry) {
            mapEntry.errored = true;
            callObserverFuncAndRemoveObserver(function(observer) {
              observer(mapEntry);
              return true;
            });
          }
        };
        document.body.appendChild(script);
      };
      _proto.componentWillUnmount = function componentWillUnmount() {
        var scriptURL = this.__scriptURL;
        if (options.removeOnUnmount === true) {
          var allScripts = document.getElementsByTagName("script");
          for (var i = 0; i < allScripts.length; i += 1) {
            if (allScripts[i].src.indexOf(scriptURL) > -1) {
              if (allScripts[i].parentNode) {
                allScripts[i].parentNode.removeChild(allScripts[i]);
              }
            }
          }
        }
        var mapEntry = SCRIPT_MAP[scriptURL];
        if (mapEntry) {
          delete mapEntry.observers[this.asyncScriptLoaderGetScriptLoaderID()];
          if (options.removeOnUnmount === true) {
            delete SCRIPT_MAP[scriptURL];
          }
        }
      };
      _proto.render = function render() {
        var globalName2 = options.globalName;
        var _this$props = this.props;
        _this$props.asyncScriptOnLoad;
        var forwardedRef = _this$props.forwardedRef, childProps = _objectWithoutPropertiesLoose(_this$props, ["asyncScriptOnLoad", "forwardedRef"]);
        if (globalName2 && typeof window !== "undefined") {
          childProps[globalName2] = typeof window[globalName2] !== "undefined" ? window[globalName2] : void 0;
        }
        childProps.ref = forwardedRef;
        return reactExports.createElement(WrappedComponent, childProps);
      };
      return AsyncScriptLoader2;
    }(reactExports.Component);
    var ForwardedComponent = reactExports.forwardRef(function(props, ref) {
      return reactExports.createElement(AsyncScriptLoader, _extends({}, props, {
        forwardedRef: ref
      }));
    });
    ForwardedComponent.displayName = "AsyncScriptLoader(" + wrappedComponentName + ")";
    ForwardedComponent.propTypes = {
      asyncScriptOnLoad: PropTypes.func
    };
    return hoistNonReactStatics$1(ForwardedComponent, WrappedComponent);
  };
}
var callbackName = "onloadcallback";
var globalName = "grecaptcha";
function getOptions() {
  return typeof window !== "undefined" && window.recaptchaOptions || {};
}
function getURL() {
  var dynamicOptions = getOptions();
  var hostname = dynamicOptions.useRecaptchaNet ? "recaptcha.net" : "www.google.com";
  if (dynamicOptions.enterprise) {
    return "https://" + hostname + "/recaptcha/enterprise.js?onload=" + callbackName + "&render=explicit";
  }
  return "https://" + hostname + "/recaptcha/api.js?onload=" + callbackName + "&render=explicit";
}
const RecaptchaWrapper = makeAsyncScript(getURL, {
  callbackName,
  globalName,
  attributes: getOptions().nonce ? {
    nonce: getOptions().nonce
  } : {}
})(ReCAPTCHA);
function Login({
  status,
  canResetPassword,
  puppy,
  recaptchaSiteKey
}) {
  const recaptchaRef = reactExports.useRef(null);
  const { data, setData, post, processing, errors, reset } = Se({
    email: "",
    password: "",
    remember: false,
    "g-recaptcha-response": ""
  });
  const submit = (e) => {
    e.preventDefault();
    if (recaptchaSiteKey && !data["g-recaptcha-response"]) {
      Vt.error("Please complete the reCAPTCHA verification");
      return;
    }
    post("/login", {
      onFinish: () => {
        reset("password");
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      },
      onError: () => {
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      }
    });
  };
  const { flash } = q().props;
  reactExports.useEffect(() => {
    var _a;
    if ((_a = flash == null ? void 0 : flash.message) == null ? void 0 : _a.success) {
      Vt.success(
        flash.message.success,
        {
          duration: 3e3
        }
      );
    }
  }, [flash]);
  reactExports.useEffect(() => {
    var _a;
    if ((_a = flash == null ? void 0 : flash.message) == null ? void 0 : _a.error) {
      Vt.error(flash.message.error, {
        duration: 3e3
      });
    }
  }, [flash]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(je, { title: "Log in" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "page-wrapper login-bg position-relative overflow-hidden min-vh-100 d-flex align-items-center justify-content-center",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card position-relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-7 order-last order-lg-first", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-info d-flex flex-column justify-content-center h-100 py-7 py-lg-0 px-3 ps-lg-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Let's Login" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 pb-2", children: "Explore the best dog breeds! Log in now to discover more." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 pb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { htmlFor: "email", value: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TextInput,
                  {
                    id: "email",
                    type: "email",
                    name: "email",
                    value: data.email,
                    autoComplete: "username",
                    isFocused: true,
                    onChange: (e) => setData("email", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 pb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(InputLabel, { htmlFor: "password", value: "Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TextInput,
                  {
                    id: "password",
                    type: "password",
                    name: "password",
                    value: data.password,
                    autoComplete: "current-password",
                    onChange: (e) => setData("password", e.target.value)
                  }
                )
              ] }),
              errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.email, className: "mt-2" }),
              errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.password, className: "mt-2" }),
              errors["g-recaptcha-response"] && /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors["g-recaptcha-response"], className: "mt-2" }),
              recaptchaSiteKey && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                RecaptchaWrapper,
                {
                  ref: recaptchaRef,
                  sitekey: recaptchaSiteKey,
                  onChange: (value) => setData("g-recaptcha-response", value || "")
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center justify-content-between mb-4 pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-check", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      name: "remember",
                      className: "form-check-input primary",
                      checked: data.remember,
                      onChange: (e) => setData("remember", e.target.checked)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-check-label text-dark fs-3", children: "Remember me" })
                ] }),
                canResetPassword && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Je,
                  {
                    "aria-label": "Forgot Password",
                    href: "/forgot-password",
                    className: "text-dark fs-3 fw-semibold text-decoration-underline",
                    children: "Forgot your password?"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PrimaryButton,
                {
                  type: "submit",
                  className: "btn btn-primary w-100 mb-3",
                  disabled: processing,
                  children: processing ? "Logging in..." : "Login"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fs-4 mb-0", children: "I don’t have an account?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Create Account", className: "text-dark fw-semibold text-decoration-underline ms-2", href: "/register", children: "Create Account" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-5 order-first order-lg-last", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "login-right-bg position-relative overflow-hidden h-100 d-flex align-items-center justify-content-center p-4 pt-10 py-lg-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 pb-0 position-absolute top-0 end-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Home", prefetch: true, cacheFor: "5m", href: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/logos/logo-white.svg", alt: "logo" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card login-right-card mb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyCard, { className: "puppy-spotlight-item rounded-1 overflow-hidden", puppy }) }) })
              ]
            }
          ) })
        ] }) }) })
      }
    )
  ] });
}
export {
  Login as default
};

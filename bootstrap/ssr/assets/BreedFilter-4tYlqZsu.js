import { r as reactExports, U, j as jsxRuntimeExports, q } from "../ssr.js";
import { i as index, c as components, S as StateManagedSelect$1 } from "./react-select.esm-CTxScYKD.js";
import { G as GenericModal } from "./GenericModal-CVw8Q7rY.js";
var EMPTY_VALUE = Symbol("useLazyRef empty value");
var useLazyRef = (init) => {
  const resultRef = reactExports.useRef(EMPTY_VALUE);
  if (resultRef.current === EMPTY_VALUE) {
    resultRef.current = init();
  }
  return resultRef;
};
function useIsMountedRef() {
  var isMountedRef = reactExports.useRef(false);
  reactExports.useEffect(function() {
    isMountedRef.current = true;
    return function() {
      isMountedRef.current = false;
    };
  }, []);
  return isMountedRef;
}
var useLatest = function useLatest2(value) {
  var ref = U.useRef(value);
  index(function() {
    ref.current = value;
  });
  return ref;
};
function Ok(result) {
  const self = {
    isOk: () => true,
    isOkAnd: (fn) => fn(result),
    isErr: () => false,
    isErrAnd: () => false,
    ok: () => Some(result),
    err: () => None(),
    map: (fn) => Ok(fn(result)),
    mapOr: (_, fn) => fn(result),
    mapOrElse: (_, fn) => fn(result),
    mapErr: () => Ok(result),
    expect: () => result,
    expectErr: (msg) => {
      throw new Error(msg);
    },
    unwrap: () => result,
    unwrapErr: () => {
      throw new Error(`${result}`);
    },
    unwrapOr: () => result,
    unwrapOrElse: () => result,
    and: (res) => res,
    andThen: (getRes) => getRes(result),
    or: () => Ok(result),
    orElse: () => Ok(result)
  };
  return self;
}
function Err(err) {
  const self = {
    isOk: () => false,
    isOkAnd: () => false,
    isErr: () => true,
    isErrAnd: (fn) => fn(err),
    ok: () => None(),
    err: () => Some(err),
    map: () => Err(err),
    mapOr: (defaultValue) => defaultValue,
    mapOrElse: (getDefaultValue) => getDefaultValue(err),
    mapErr: (fn) => Err(fn(err)),
    expect: (msg) => {
      throw new Error(msg);
    },
    expectErr: () => err,
    unwrap: () => {
      throw new Error(`${err}`);
    },
    unwrapErr: () => err,
    unwrapOr: (defaultValue) => defaultValue,
    unwrapOrElse: (getDefaultValue) => getDefaultValue(err),
    and: () => Err(err),
    andThen: () => Err(err),
    or: (res) => res,
    orElse: (getRes) => getRes(err)
  };
  return self;
}
function None() {
  const self = {
    and: () => None(),
    andThen: () => None(),
    expect: (msg) => {
      throw new Error(msg);
    },
    filter: () => self,
    isSome: () => false,
    isSomeAnd: () => false,
    isNone: () => true,
    map: () => None(),
    mapOr: (defaultValue) => defaultValue,
    mapOrElse: (getDefaultValue) => getDefaultValue(),
    okOr: (err) => Err(err),
    okOrElse: (getErr) => Err(getErr()),
    or: (opt) => opt,
    orElse: (fn) => fn(),
    unwrap: () => {
      throw new Error("panic! call `unwrap` on a `None` value");
    },
    unwrapOr: (defaultValue) => defaultValue,
    unwrapOrElse: (getDefaultValue) => getDefaultValue(),
    xor: (opt) => {
      if (opt.isSome()) {
        return opt;
      }
      return self;
    }
  };
  return self;
}
function Some(value) {
  const self = {
    and: (opt) => opt,
    andThen: (fn) => fn(value),
    expect: () => value,
    filter: (fn) => {
      if (fn(value)) {
        return self;
      }
      return None();
    },
    isSome: () => true,
    isSomeAnd: (fn) => fn(value),
    isNone: () => false,
    map: (fn) => Some(fn(value)),
    mapOr: (_, fn) => fn(value),
    mapOrElse: (_, fn) => fn(value),
    okOr: () => Ok(value),
    okOrElse: () => Ok(value),
    or: () => self,
    orElse: () => self,
    unwrap: () => value,
    unwrapOr: () => value,
    unwrapOrElse: () => value,
    xor: (opt) => {
      if (opt.isNone()) {
        return self;
      }
      return None();
    }
  };
  return self;
}
function getResult(promise) {
  return promise.then(
    (response) => Ok(response),
    (err) => Err(err)
  );
}
var e = setTimeout;
function t(t2, n2) {
  var u = n2.useCachedSetTimeout ? e : setTimeout;
  return new Promise(function(e2) {
    u(e2, t2);
  });
}
function n(e2) {
  var n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, u = n2.useCachedSetTimeout, r = t(e2, { useCachedSetTimeout: u });
  function o(e3) {
    return r.then(function() {
      return e3;
    });
  }
  return o.then = function() {
    return r.then.apply(r, arguments);
  }, o.catch = Promise.resolve().catch, o;
}
var composeRefs$1 = {};
Object.defineProperty(composeRefs$1, "__esModule", { value: true });
function composeRefs() {
  var refs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    refs[_i] = arguments[_i];
  }
  if (refs.length === 2) {
    return composeTwoRefs(refs[0], refs[1]) || null;
  }
  var composedRef = refs.slice(1).reduce(function(semiCombinedRef, refToInclude) {
    return composeTwoRefs(semiCombinedRef, refToInclude);
  }, refs[0]);
  return composedRef || null;
}
var _default = composeRefs$1.default = composeRefs;
var composedRefCache = /* @__PURE__ */ new WeakMap();
function composeTwoRefs(ref1, ref2) {
  if (ref1 && ref2) {
    var ref1Cache = composedRefCache.get(ref1) || /* @__PURE__ */ new WeakMap();
    composedRefCache.set(ref1, ref1Cache);
    var composedRef = ref1Cache.get(ref2) || function(instance) {
      updateRef(ref1, instance);
      updateRef(ref2, instance);
    };
    ref1Cache.set(ref2, composedRef);
    return composedRef;
  }
  if (!ref1) {
    return ref2;
  } else {
    return ref1;
  }
}
function updateRef(ref, instance) {
  if (typeof ref === "function") {
    ref(instance);
  } else {
    ref.current = instance;
  }
}
var defaultReduceOptions = (prevOptions, loadedOptions) => [...prevOptions, ...loadedOptions];
var AVAILABLE_DELTA = 10;
var defaultShouldLoadMore = (scrollHeight, clientHeight, scrollTop) => {
  const bottomBorder = scrollHeight - clientHeight - AVAILABLE_DELTA;
  return bottomBorder < scrollTop;
};
var getInitialCache = (params) => ({
  isFirstLoad: true,
  options: [],
  hasMore: true,
  isLoading: false,
  lockedUntil: 0,
  additional: params.additional
});
var getInitialOptionsCache = ({
  options,
  defaultOptions,
  additional,
  defaultAdditional
}) => {
  const initialOptions = defaultOptions === true ? null : Array.isArray(defaultOptions) ? defaultOptions : options;
  if (initialOptions) {
    return {
      "": {
        isFirstLoad: false,
        isLoading: false,
        options: initialOptions,
        hasMore: true,
        lockedUntil: 0,
        additional: defaultAdditional || additional
      }
    };
  }
  return {};
};
var errorText = '[react-select-async-paginate] response of "loadOptions" should be an object with "options" prop, which contains array of options.';
var checkIsResponse = (response) => {
  if (!response) {
    return false;
  }
  const { options, hasMore } = response;
  if (!Array.isArray(options)) {
    return false;
  }
  if (typeof hasMore !== "boolean" && typeof hasMore !== "undefined") {
    return false;
  }
  return true;
};
var validateResponse = (response) => {
  if (!checkIsResponse(response)) {
    console.error(errorText, "Received:", response);
    throw new Error(errorText);
  }
  return true;
};
var requestOptions = async (caller, paramsRef, optionsCacheRef, debounceTimeout, setOptionsCache, reduceOptions, isMountedRef) => {
  const currentInputValue = paramsRef.current.inputValue;
  const isCacheEmpty = !optionsCacheRef.current[currentInputValue];
  const currentOptions = isCacheEmpty ? getInitialCache(paramsRef.current) : optionsCacheRef.current[currentInputValue];
  if (currentOptions.isLoading || !currentOptions.hasMore || currentOptions.lockedUntil > Date.now()) {
    return;
  }
  setOptionsCache(
    (prevOptionsCache) => ({
      ...prevOptionsCache,
      [currentInputValue]: {
        ...currentOptions,
        isLoading: true
      }
    })
  );
  if (debounceTimeout > 0 && caller === "input-change") {
    await n(debounceTimeout);
    const newInputValue = paramsRef.current.inputValue;
    if (currentInputValue !== newInputValue) {
      setOptionsCache((prevOptionsCache) => {
        if (isCacheEmpty) {
          const { [currentInputValue]: itemForDelete, ...restCache } = prevOptionsCache;
          return restCache;
        }
        return {
          ...prevOptionsCache,
          [currentInputValue]: {
            ...currentOptions,
            isLoading: false
          }
        };
      });
      return;
    }
  }
  const { loadOptions, reloadOnErrorTimeout = 0 } = paramsRef.current;
  const result = await getResult(
    Promise.resolve().then(
      () => loadOptions(
        currentInputValue,
        currentOptions.options,
        currentOptions.additional
      )
    )
  );
  if (!isMountedRef.current) {
    return;
  }
  if (result.isErr()) {
    setOptionsCache((prevOptionsCache) => ({
      ...prevOptionsCache,
      [currentInputValue]: {
        ...currentOptions,
        isLoading: false,
        lockedUntil: Date.now() + reloadOnErrorTimeout
      }
    }));
    return;
  }
  const response = result.unwrap();
  if (validateResponse(response)) {
    const { options, hasMore } = response;
    const newAdditional = Object.hasOwn(response, "additional") ? response.additional : currentOptions.additional;
    setOptionsCache((prevOptionsCache) => ({
      ...prevOptionsCache,
      [currentInputValue]: {
        ...currentOptions,
        options: reduceOptions(currentOptions.options, options, newAdditional),
        hasMore: !!hasMore,
        isLoading: false,
        isFirstLoad: false,
        additional: newAdditional
      }
    }));
  }
};
var increaseStateId = (prevStateId) => prevStateId + 1;
var useAsyncPaginateBase = (params, deps = []) => {
  const {
    defaultOptions,
    loadOptionsOnMenuOpen = true,
    debounceTimeout = 0,
    inputValue,
    menuIsOpen,
    filterOption = null,
    reduceOptions = defaultReduceOptions,
    shouldLoadMore = defaultShouldLoadMore,
    mapOptionsForMenu = void 0
  } = params;
  const menuIsOpenRef = useLatest(menuIsOpen);
  const isMountedRef = useIsMountedRef();
  const reduceOptionsRef = useLatest(reduceOptions);
  const loadOptionsOnMenuOpenRef = useLatest(loadOptionsOnMenuOpen);
  const isInitRef = reactExports.useRef(true);
  const paramsRef = reactExports.useRef(params);
  paramsRef.current = params;
  const [_stateId, setStateId] = reactExports.useState(0);
  const optionsCacheRef = useLazyRef(() => getInitialOptionsCache(params));
  const callRequestOptionsRef = useLatest(
    (caller) => {
      requestOptions(
        caller,
        paramsRef,
        optionsCacheRef,
        debounceTimeout,
        (reduceState) => {
          optionsCacheRef.current = reduceState(optionsCacheRef.current);
          if (isMountedRef.current) {
            setStateId(increaseStateId);
          }
        },
        reduceOptionsRef.current,
        isMountedRef
      );
    }
  );
  const handleScrolledToBottom = reactExports.useCallback(() => {
    const currentInputValue = paramsRef.current.inputValue;
    const currentOptions2 = optionsCacheRef.current[currentInputValue];
    if (currentOptions2) {
      callRequestOptionsRef.current("menu-scroll");
    }
  }, [callRequestOptionsRef, optionsCacheRef]);
  reactExports.useEffect(() => {
    if (isInitRef.current) {
      isInitRef.current = false;
    } else {
      optionsCacheRef.current = {};
      setStateId(increaseStateId);
    }
    if (defaultOptions === true) {
      callRequestOptionsRef.current("autoload");
    }
  }, deps);
  reactExports.useEffect(() => {
    if (menuIsOpenRef.current && !optionsCacheRef.current[inputValue]) {
      callRequestOptionsRef.current("input-change");
    }
  }, [callRequestOptionsRef, inputValue, menuIsOpenRef, optionsCacheRef]);
  reactExports.useEffect(() => {
    if (menuIsOpen && !optionsCacheRef.current[""] && loadOptionsOnMenuOpenRef.current) {
      callRequestOptionsRef.current("menu-toggle");
    }
  }, [
    callRequestOptionsRef,
    loadOptionsOnMenuOpenRef,
    menuIsOpen,
    optionsCacheRef
  ]);
  const currentOptions = optionsCacheRef.current[inputValue] || getInitialCache(params);
  const options = reactExports.useMemo(() => {
    if (!mapOptionsForMenu) {
      return currentOptions.options;
    }
    return mapOptionsForMenu(currentOptions.options);
  }, [currentOptions.options, mapOptionsForMenu]);
  return {
    handleScrolledToBottom,
    shouldLoadMore,
    filterOption,
    isLoading: currentOptions.isLoading || currentOptions.lockedUntil > Date.now(),
    isFirstLoad: currentOptions.isFirstLoad,
    options
  };
};
var useAsyncPaginate = (params, deps = []) => {
  const {
    inputValue: inputValueParam,
    menuIsOpen: menuIsOpenParam,
    defaultInputValue: defaultInputValueParam,
    defaultMenuIsOpen: defaultMenuIsOpenParam,
    onInputChange: onInputChangeParam,
    onMenuClose: onMenuCloseParam,
    onMenuOpen: onMenuOpenParam
  } = params;
  const [inputValueState, setInputValue] = reactExports.useState(
    defaultInputValueParam || ""
  );
  const [menuIsOpenState, setMenuIsOpen] = reactExports.useState(!!defaultMenuIsOpenParam);
  const inputValue = typeof inputValueParam === "string" ? inputValueParam : inputValueState;
  const menuIsOpen = typeof menuIsOpenParam === "boolean" ? menuIsOpenParam : menuIsOpenState;
  const onInputChange = reactExports.useCallback(
    (nextInputValue, actionMeta) => {
      if (onInputChangeParam) {
        onInputChangeParam(nextInputValue, actionMeta);
      }
      setInputValue(nextInputValue);
    },
    [onInputChangeParam]
  );
  const onMenuClose = reactExports.useCallback(() => {
    if (onMenuCloseParam) {
      onMenuCloseParam();
    }
    setMenuIsOpen(false);
  }, [onMenuCloseParam]);
  const onMenuOpen = reactExports.useCallback(() => {
    if (onMenuOpenParam) {
      onMenuOpenParam();
    }
    setMenuIsOpen(true);
  }, [onMenuOpenParam]);
  const baseResult = useAsyncPaginateBase(
    {
      ...params,
      inputValue,
      menuIsOpen
    },
    deps
  );
  return {
    ...baseResult,
    inputValue,
    menuIsOpen,
    onInputChange,
    onMenuClose,
    onMenuOpen
  };
};
var CHECK_TIMEOUT = 300;
function wrapMenuList(MenuList2) {
  function WrappedMenuList(props) {
    const { selectProps, innerRef } = props;
    const { handleScrolledToBottom, shouldLoadMore } = selectProps;
    const checkTimeoutRef = reactExports.useRef(null);
    const menuListRef = reactExports.useRef(null);
    const shouldHandle = reactExports.useCallback(() => {
      const el = menuListRef.current;
      if (!el) {
        return false;
      }
      const { scrollTop, scrollHeight, clientHeight } = el;
      return shouldLoadMore(scrollHeight, clientHeight, scrollTop);
    }, [shouldLoadMore]);
    const checkAndHandle = reactExports.useCallback(() => {
      if (shouldHandle()) {
        if (handleScrolledToBottom) {
          handleScrolledToBottom();
        }
      }
    }, [shouldHandle, handleScrolledToBottom]);
    const setCheckAndHandleTimeout = reactExports.useMemo(() => {
      const res = () => {
        checkAndHandle();
        checkTimeoutRef.current = setTimeout(res, CHECK_TIMEOUT);
      };
      return res;
    }, [checkAndHandle]);
    reactExports.useEffect(() => {
      setCheckAndHandleTimeout();
      return () => {
        if (checkTimeoutRef.current) {
          clearTimeout(checkTimeoutRef.current);
        }
      };
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuList2,
      {
        ...props,
        innerRef: _default(innerRef, menuListRef)
      }
    );
  }
  return WrappedMenuList;
}
var MenuList = wrapMenuList(
  // biome-ignore lint/suspicious/noExplicitAny: fix types
  components.MenuList
);
var useComponents = (components2) => reactExports.useMemo(
  () => ({
    MenuList,
    ...components2
  }),
  [components2]
);
var defaultCacheUniqs = [];
var defaultComponents2 = {};
function withAsyncPaginate(SelectComponent) {
  function WithAsyncPaginate(props) {
    const {
      components: components2 = defaultComponents2,
      selectRef = void 0,
      isLoading: isLoadingProp,
      cacheUniqs = defaultCacheUniqs,
      ...rest
    } = props;
    const asyncPaginateProps = useAsyncPaginate(rest, cacheUniqs);
    const processedComponents = useComponents(
      components2
    );
    const isLoading = typeof isLoadingProp === "boolean" ? isLoadingProp : asyncPaginateProps.isLoading;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectComponent,
      {
        ...props,
        ...asyncPaginateProps,
        isLoading,
        components: processedComponents,
        ref: selectRef
      }
    );
  }
  return WithAsyncPaginate;
}
var AsyncPaginate = withAsyncPaginate(StateManagedSelect$1);
const filterStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "5px",
    border: "none",
    width: "100%",
    height: "21px",
    minHeight: "unset",
    backgroundColor: "transparent",
    padding: "0px",
    boxShadow: "none",
    fontSize: "0.875rem"
  }),
  input: (provided, state) => ({
    ...provided,
    height: "21px",
    width: "150px",
    padding: "0px",
    margin: "0px"
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "var(--bs-secondary)",
    height: "21px"
  }),
  group: (provided, state) => ({
    ...provided,
    height: "21px"
  }),
  indicatorsContainer: (provided, state) => ({
    display: "none",
    height: "21px"
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "var(--bs-primary)" : null,
    color: state.isFocused ? "white" : null
  })
};
const SelectFilterInput = ({ options, onChange, ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    StateManagedSelect$1,
    {
      styles: filterStyles,
      onChange,
      value: props.value,
      options
    }
  );
};
var Ce = { exports: {} }, te = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Je;
function Cr() {
  if (Je)
    return te;
  Je = 1;
  var g = U, l = Symbol.for("react.element"), o = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, f = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, u = { key: true, ref: true, __self: true, __source: true };
  function E(R, p, k) {
    var h, C = {}, _ = null, S = null;
    k !== void 0 && (_ = "" + k), p.key !== void 0 && (_ = "" + p.key), p.ref !== void 0 && (S = p.ref);
    for (h in p)
      m.call(p, h) && !u.hasOwnProperty(h) && (C[h] = p[h]);
    if (R && R.defaultProps)
      for (h in p = R.defaultProps, p)
        C[h] === void 0 && (C[h] = p[h]);
    return { $$typeof: l, type: R, key: _, ref: S, props: C, _owner: f.current };
  }
  return te.Fragment = o, te.jsx = E, te.jsxs = E, te;
}
var ne = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qe;
function Or() {
  return qe || (qe = 1, process.env.NODE_ENV !== "production" && function() {
    var g = U, l = Symbol.for("react.element"), o = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), E = Symbol.for("react.provider"), R = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), w = Symbol.iterator, N = "@@iterator";
    function V(e2) {
      if (e2 === null || typeof e2 != "object")
        return null;
      var r = w && e2[w] || e2[N];
      return typeof r == "function" ? r : null;
    }
    var P = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function d(e2) {
      {
        for (var r = arguments.length, t2 = new Array(r > 1 ? r - 1 : 0), n2 = 1; n2 < r; n2++)
          t2[n2 - 1] = arguments[n2];
        $("error", e2, t2);
      }
    }
    function $(e2, r, t2) {
      {
        var n2 = P.ReactDebugCurrentFrame, c = n2.getStackAddendum();
        c !== "" && (r += "%s", t2 = t2.concat([c]));
        var v = t2.map(function(s) {
          return String(s);
        });
        v.unshift("Warning: " + r), Function.prototype.apply.call(console[e2], console, v);
      }
    }
    var J = false, M = false, q2 = false, ae = false, K = false, L;
    L = Symbol.for("react.module.reference");
    function pe(e2) {
      return !!(typeof e2 == "string" || typeof e2 == "function" || e2 === m || e2 === u || K || e2 === f || e2 === k || e2 === h || ae || e2 === S || J || M || q2 || typeof e2 == "object" && e2 !== null && (e2.$$typeof === _ || e2.$$typeof === C || e2.$$typeof === E || e2.$$typeof === R || e2.$$typeof === p || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e2.$$typeof === L || e2.getModuleId !== void 0));
    }
    function z(e2, r, t2) {
      var n2 = e2.displayName;
      if (n2)
        return n2;
      var c = r.displayName || r.name || "";
      return c !== "" ? t2 + "(" + c + ")" : t2;
    }
    function oe(e2) {
      return e2.displayName || "Context";
    }
    function j(e2) {
      if (e2 == null)
        return null;
      if (typeof e2.tag == "number" && d("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e2 == "function")
        return e2.displayName || e2.name || null;
      if (typeof e2 == "string")
        return e2;
      switch (e2) {
        case m:
          return "Fragment";
        case o:
          return "Portal";
        case u:
          return "Profiler";
        case f:
          return "StrictMode";
        case k:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof e2 == "object")
        switch (e2.$$typeof) {
          case R:
            var r = e2;
            return oe(r) + ".Consumer";
          case E:
            var t2 = e2;
            return oe(t2._context) + ".Provider";
          case p:
            return z(e2, e2.render, "ForwardRef");
          case C:
            var n2 = e2.displayName || null;
            return n2 !== null ? n2 : j(e2.type) || "Memo";
          case _: {
            var c = e2, v = c._payload, s = c._init;
            try {
              return j(s(v));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var D = Object.assign, Y = 0, X, G, Z, ie, se, a, T;
    function Q() {
    }
    Q.__reactDisabledLog = true;
    function Xe() {
      {
        if (Y === 0) {
          X = console.log, G = console.info, Z = console.warn, ie = console.error, se = console.group, a = console.groupCollapsed, T = console.groupEnd;
          var e2 = {
            configurable: true,
            enumerable: true,
            value: Q,
            writable: true
          };
          Object.defineProperties(console, {
            info: e2,
            log: e2,
            warn: e2,
            error: e2,
            group: e2,
            groupCollapsed: e2,
            groupEnd: e2
          });
        }
        Y++;
      }
    }
    function Ze() {
      {
        if (Y--, Y === 0) {
          var e2 = {
            configurable: true,
            enumerable: true,
            writable: true
          };
          Object.defineProperties(console, {
            log: D({}, e2, {
              value: X
            }),
            info: D({}, e2, {
              value: G
            }),
            warn: D({}, e2, {
              value: Z
            }),
            error: D({}, e2, {
              value: ie
            }),
            group: D({}, e2, {
              value: se
            }),
            groupCollapsed: D({}, e2, {
              value: a
            }),
            groupEnd: D({}, e2, {
              value: T
            })
          });
        }
        Y < 0 && d("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var he = P.ReactCurrentDispatcher, ge;
    function ue(e2, r, t2) {
      {
        if (ge === void 0)
          try {
            throw Error();
          } catch (c) {
            var n2 = c.stack.trim().match(/\n( *(at )?)/);
            ge = n2 && n2[1] || "";
          }
        return `
` + ge + e2;
      }
    }
    var me = false, ce;
    {
      var Qe = typeof WeakMap == "function" ? WeakMap : Map;
      ce = new Qe();
    }
    function Ie(e2, r) {
      if (!e2 || me)
        return "";
      {
        var t2 = ce.get(e2);
        if (t2 !== void 0)
          return t2;
      }
      var n2;
      me = true;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var v;
      v = he.current, he.current = null, Xe();
      try {
        if (r) {
          var s = function() {
            throw Error();
          };
          if (Object.defineProperty(s.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(s, []);
            } catch (x) {
              n2 = x;
            }
            Reflect.construct(e2, [], s);
          } else {
            try {
              s.call();
            } catch (x) {
              n2 = x;
            }
            e2.call(s.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (x) {
            n2 = x;
          }
          e2();
        }
      } catch (x) {
        if (x && n2 && typeof x.stack == "string") {
          for (var i = x.stack.split(`
`), O = n2.stack.split(`
`), y = i.length - 1, b = O.length - 1; y >= 1 && b >= 0 && i[y] !== O[b]; )
            b--;
          for (; y >= 1 && b >= 0; y--, b--)
            if (i[y] !== O[b]) {
              if (y !== 1 || b !== 1)
                do
                  if (y--, b--, b < 0 || i[y] !== O[b]) {
                    var I = `
` + i[y].replace(" at new ", " at ");
                    return e2.displayName && I.includes("<anonymous>") && (I = I.replace("<anonymous>", e2.displayName)), typeof e2 == "function" && ce.set(e2, I), I;
                  }
                while (y >= 1 && b >= 0);
              break;
            }
        }
      } finally {
        me = false, he.current = v, Ze(), Error.prepareStackTrace = c;
      }
      var B = e2 ? e2.displayName || e2.name : "", U2 = B ? ue(B) : "";
      return typeof e2 == "function" && ce.set(e2, U2), U2;
    }
    function er(e2, r, t2) {
      return Ie(e2, false);
    }
    function rr(e2) {
      var r = e2.prototype;
      return !!(r && r.isReactComponent);
    }
    function le(e2, r, t2) {
      if (e2 == null)
        return "";
      if (typeof e2 == "function")
        return Ie(e2, rr(e2));
      if (typeof e2 == "string")
        return ue(e2);
      switch (e2) {
        case k:
          return ue("Suspense");
        case h:
          return ue("SuspenseList");
      }
      if (typeof e2 == "object")
        switch (e2.$$typeof) {
          case p:
            return er(e2.render);
          case C:
            return le(e2.type, r, t2);
          case _: {
            var n2 = e2, c = n2._payload, v = n2._init;
            try {
              return le(v(c), r, t2);
            } catch {
            }
          }
        }
      return "";
    }
    var ee = Object.prototype.hasOwnProperty, Ae = {}, Fe = P.ReactDebugCurrentFrame;
    function fe(e2) {
      if (e2) {
        var r = e2._owner, t2 = le(e2.type, e2._source, r ? r.type : null);
        Fe.setExtraStackFrame(t2);
      } else
        Fe.setExtraStackFrame(null);
    }
    function tr(e2, r, t2, n2, c) {
      {
        var v = Function.call.bind(ee);
        for (var s in e2)
          if (v(e2, s)) {
            var i = void 0;
            try {
              if (typeof e2[s] != "function") {
                var O = Error((n2 || "React class") + ": " + t2 + " type `" + s + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e2[s] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw O.name = "Invariant Violation", O;
              }
              i = e2[s](r, s, n2, t2, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (y) {
              i = y;
            }
            i && !(i instanceof Error) && (fe(c), d("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n2 || "React class", t2, s, typeof i), fe(null)), i instanceof Error && !(i.message in Ae) && (Ae[i.message] = true, fe(c), d("Failed %s type: %s", t2, i.message), fe(null));
          }
      }
    }
    var nr = Array.isArray;
    function Ee(e2) {
      return nr(e2);
    }
    function ar(e2) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t2 = r && e2[Symbol.toStringTag] || e2.constructor.name || "Object";
        return t2;
      }
    }
    function or(e2) {
      try {
        return Me(e2), false;
      } catch {
        return true;
      }
    }
    function Me(e2) {
      return "" + e2;
    }
    function Ne(e2) {
      if (or(e2))
        return d("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ar(e2)), Me(e2);
    }
    var re = P.ReactCurrentOwner, ir = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    }, We, $e;
    function sr(e2) {
      if (ee.call(e2, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e2, "ref").get;
        if (r && r.isReactWarning)
          return false;
      }
      return e2.ref !== void 0;
    }
    function ur(e2) {
      if (ee.call(e2, "key")) {
        var r = Object.getOwnPropertyDescriptor(e2, "key").get;
        if (r && r.isReactWarning)
          return false;
      }
      return e2.key !== void 0;
    }
    function cr(e2, r) {
      if (typeof e2.ref == "string" && re.current && r) ;
    }
    function lr(e2, r) {
      {
        var t2 = function() {
          We || (We = true, d("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t2.isReactWarning = true, Object.defineProperty(e2, "key", {
          get: t2,
          configurable: true
        });
      }
    }
    function fr(e2, r) {
      {
        var t2 = function() {
          $e || ($e = true, d("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t2.isReactWarning = true, Object.defineProperty(e2, "ref", {
          get: t2,
          configurable: true
        });
      }
    }
    var dr = function(e2, r, t2, n2, c, v, s) {
      var i = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: l,
        // Built-in properties that belong on the element
        type: e2,
        key: r,
        ref: t2,
        props: s,
        // Record the component responsible for creating this element.
        _owner: v
      };
      return i._store = {}, Object.defineProperty(i._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      }), Object.defineProperty(i, "_self", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: n2
      }), Object.defineProperty(i, "_source", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: c
      }), Object.freeze && (Object.freeze(i.props), Object.freeze(i)), i;
    };
    function vr(e2, r, t2, n2, c) {
      {
        var v, s = {}, i = null, O = null;
        t2 !== void 0 && (Ne(t2), i = "" + t2), ur(r) && (Ne(r.key), i = "" + r.key), sr(r) && (O = r.ref, cr(r, c));
        for (v in r)
          ee.call(r, v) && !ir.hasOwnProperty(v) && (s[v] = r[v]);
        if (e2 && e2.defaultProps) {
          var y = e2.defaultProps;
          for (v in y)
            s[v] === void 0 && (s[v] = y[v]);
        }
        if (i || O) {
          var b = typeof e2 == "function" ? e2.displayName || e2.name || "Unknown" : e2;
          i && lr(s, b), O && fr(s, b);
        }
        return dr(e2, i, O, c, n2, re.current, s);
      }
    }
    var be = P.ReactCurrentOwner, Ye = P.ReactDebugCurrentFrame;
    function H(e2) {
      if (e2) {
        var r = e2._owner, t2 = le(e2.type, e2._source, r ? r.type : null);
        Ye.setExtraStackFrame(t2);
      } else
        Ye.setExtraStackFrame(null);
    }
    var Re;
    Re = false;
    function _e(e2) {
      return typeof e2 == "object" && e2 !== null && e2.$$typeof === l;
    }
    function Le() {
      {
        if (be.current) {
          var e2 = j(be.current.type);
          if (e2)
            return `

Check the render method of \`` + e2 + "`.";
        }
        return "";
      }
    }
    function pr(e2) {
      {
        return "";
      }
    }
    var Ue = {};
    function hr(e2) {
      {
        var r = Le();
        if (!r) {
          var t2 = typeof e2 == "string" ? e2 : e2.displayName || e2.name;
          t2 && (r = `

Check the top-level render call using <` + t2 + ">.");
        }
        return r;
      }
    }
    function Ve(e2, r) {
      {
        if (!e2._store || e2._store.validated || e2.key != null)
          return;
        e2._store.validated = true;
        var t2 = hr(r);
        if (Ue[t2])
          return;
        Ue[t2] = true;
        var n2 = "";
        e2 && e2._owner && e2._owner !== be.current && (n2 = " It was passed a child from " + j(e2._owner.type) + "."), H(e2), d('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t2, n2), H(null);
      }
    }
    function Ge(e2, r) {
      {
        if (typeof e2 != "object")
          return;
        if (Ee(e2))
          for (var t2 = 0; t2 < e2.length; t2++) {
            var n2 = e2[t2];
            _e(n2) && Ve(n2, r);
          }
        else if (_e(e2))
          e2._store && (e2._store.validated = true);
        else if (e2) {
          var c = V(e2);
          if (typeof c == "function" && c !== e2.entries)
            for (var v = c.call(e2), s; !(s = v.next()).done; )
              _e(s.value) && Ve(s.value, r);
        }
      }
    }
    function gr(e2) {
      {
        var r = e2.type;
        if (r == null || typeof r == "string")
          return;
        var t2;
        if (typeof r == "function")
          t2 = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === p || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === C))
          t2 = r.propTypes;
        else
          return;
        if (t2) {
          var n2 = j(r);
          tr(t2, e2.props, "prop", n2, e2);
        } else if (r.PropTypes !== void 0 && !Re) {
          Re = true;
          var c = j(r);
          d("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", c || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && d("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function mr(e2) {
      {
        for (var r = Object.keys(e2.props), t2 = 0; t2 < r.length; t2++) {
          var n2 = r[t2];
          if (n2 !== "children" && n2 !== "key") {
            H(e2), d("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n2), H(null);
            break;
          }
        }
        e2.ref !== null && (H(e2), d("Invalid attribute `ref` supplied to `React.Fragment`."), H(null));
      }
    }
    var He = {};
    function Be(e2, r, t2, n2, c, v) {
      {
        var s = pe(e2);
        if (!s) {
          var i = "";
          (e2 === void 0 || typeof e2 == "object" && e2 !== null && Object.keys(e2).length === 0) && (i += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var O = pr();
          O ? i += O : i += Le();
          var y;
          e2 === null ? y = "null" : Ee(e2) ? y = "array" : e2 !== void 0 && e2.$$typeof === l ? (y = "<" + (j(e2.type) || "Unknown") + " />", i = " Did you accidentally export a JSX literal instead of a component?") : y = typeof e2, d("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", y, i);
        }
        var b = vr(e2, r, t2, c, v);
        if (b == null)
          return b;
        if (s) {
          var I = r.children;
          if (I !== void 0)
            if (n2)
              if (Ee(I)) {
                for (var B = 0; B < I.length; B++)
                  Ge(I[B], e2);
                Object.freeze && Object.freeze(I);
              } else
                d("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ge(I, e2);
        }
        if (ee.call(r, "key")) {
          var U2 = j(e2), x = Object.keys(r).filter(function(Tr) {
            return Tr !== "key";
          }), Te = x.length > 0 ? "{key: someKey, " + x.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!He[U2 + Te]) {
            var _r = x.length > 0 ? "{" + x.join(": ..., ") + ": ...}" : "{}";
            d(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Te, U2, _r, U2), He[U2 + Te] = true;
          }
        }
        return e2 === m ? mr(b) : gr(b), b;
      }
    }
    function Er(e2, r, t2) {
      return Be(e2, r, t2, true);
    }
    function yr(e2, r, t2) {
      return Be(e2, r, t2, false);
    }
    var br = yr, Rr = Er;
    ne.Fragment = m, ne.jsx = br, ne.jsxs = Rr;
  }()), ne;
}
process.env.NODE_ENV === "production" ? Ce.exports = Cr() : Ce.exports = Or();
var W = Ce.exports;
const Sr = 216, wr = 36, xr = "off", we = reactExports.createContext(null);
we.displayName = "PickerDataContext";
function xe(g) {
  const l = reactExports.useContext(we);
  if (l === null) {
    const o = new Error(`<${g} /> is missing a parent <Picker /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o, xe), o;
  }
  return l;
}
const ke = reactExports.createContext(null);
ke.displayName = "PickerActionsContext";
function je(g) {
  const l = reactExports.useContext(ke);
  if (l === null) {
    const o = new Error(`<${g} /> is missing a parent <Picker /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o, je), o;
  }
  return l;
}
function kr(g, l = (o) => o) {
  return g.slice().sort((o, m) => {
    const f = l(o), u = l(m);
    if (f === null || u === null)
      return 0;
    const E = f.compareDocumentPosition(u);
    return E & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : E & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function jr(g, l) {
  switch (l.type) {
    case "REGISTER_OPTION": {
      const { key: o, option: m } = l;
      let f = [...g[o] || [], m];
      return f = kr(f, (u) => u.element.current), {
        ...g,
        [o]: f
      };
    }
    case "UNREGISTER_OPTION": {
      const { key: o, option: m } = l;
      return {
        ...g,
        [o]: (g[o] || []).filter((f) => f !== m)
      };
    }
    default:
      throw Error(`Unknown action: ${l.type}`);
  }
}
function Dr(g) {
  const {
    style: l,
    children: o,
    value: m,
    onChange: f,
    height: u = Sr,
    itemHeight: E = wr,
    wheelMode: R = xr,
    ...p
  } = g, k = reactExports.useMemo(
    () => ({
      height: E,
      marginTop: -(E / 2),
      position: "absolute",
      top: "50%",
      left: 0,
      width: "100%",
      pointerEvents: "none"
    }),
    [E]
  ), h = reactExports.useMemo(
    () => ({
      height: `${u}px`,
      position: "relative",
      display: "flex",
      justifyContent: "center",
      overflow: "hidden",
      maskImage: "linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent)",
      WebkitMaskImage: "linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent)"
    }),
    [u]
  ), [C, _] = reactExports.useReducer(jr, {}), S = reactExports.useMemo(
    () => ({ height: u, itemHeight: E, wheelMode: R, value: m, optionGroups: C }),
    [u, E, m, C, R]
  ), w = reactExports.useCallback((P, d) => {
    if (m[P] === d)
      return false;
    const $ = { ...m, [P]: d };
    return f($, P), true;
  }, [f, m]), N = reactExports.useCallback((P, d) => (_({ type: "REGISTER_OPTION", key: P, option: d }), () => _({ type: "UNREGISTER_OPTION", key: P, option: d })), []), V = reactExports.useMemo(
    () => ({ registerOption: N, change: w }),
    [N, w]
  );
  return /* @__PURE__ */ W.jsxs(
    "div",
    {
      style: {
        ...h,
        ...l
      },
      ...p,
      children: [
        /* @__PURE__ */ W.jsx(ke.Provider, { value: V, children: /* @__PURE__ */ W.jsx(we.Provider, { value: S, children: o }) }),
        /* @__PURE__ */ W.jsxs(
          "div",
          {
            style: k,
            children: [
              /* @__PURE__ */ W.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: 0,
                    bottom: "auto",
                    left: 0,
                    right: "auto",
                    width: "100%",
                    height: "1px",
                    background: "#d9d9d9",
                    transform: "scaleY(0.5)"
                  }
                }
              ),
              /* @__PURE__ */ W.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: "auto",
                    bottom: 0,
                    left: 0,
                    right: "auto",
                    width: "100%",
                    height: "1px",
                    background: "#d9d9d9",
                    transform: "scaleY(0.5)"
                  }
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const De = reactExports.createContext(null);
De.displayName = "PickerColumnDataContext";
function ze(g) {
  const l = reactExports.useContext(De);
  if (l === null) {
    const o = new Error(`<${g} /> is missing a parent <Picker.Column /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o, ze), o;
  }
  return l;
}
function Ir({
  style: g,
  children: l,
  name: o,
  ...m
}) {
  const { height: f, itemHeight: u, wheelMode: E, value: R, optionGroups: p } = xe("Picker.Column"), k = reactExports.useMemo(
    () => R[o],
    [R, o]
  ), h = reactExports.useMemo(
    () => p[o] || [],
    [o, p]
  ), C = reactExports.useMemo(
    () => {
      let a = h.findIndex((T) => T.value === k);
      return a < 0 && (a = 0), a;
    },
    [h, k]
  ), _ = reactExports.useMemo(
    () => f / 2 - u * h.length + u / 2,
    [f, u, h]
  ), S = reactExports.useMemo(
    () => f / 2 - u / 2,
    [f, u]
  ), [w, N] = reactExports.useState(0);
  reactExports.useEffect(() => {
    N(f / 2 - u / 2 - C * u);
  }, [f, u, C]);
  const V = je("Picker.Column"), P = reactExports.useRef(w);
  P.current = w;
  const d = reactExports.useCallback(() => {
    let a = 0;
    const T = P.current;
    T >= S ? a = 0 : T <= _ ? a = h.length - 1 : a = -Math.round((T - S) / u), V.change(o, h[a].value) || N(f / 2 - u / 2 - a * u);
  }, [V, f, u, o, S, _, h]), [$, J] = reactExports.useState(0), [M, q2] = reactExports.useState(false), [ae, K] = reactExports.useState(0), L = reactExports.useCallback((a) => {
    a < _ ? a = _ - Math.pow(_ - a, 0.8) : a > S && (a = S + Math.pow(a - S, 0.8)), N(a);
  }, [S, _]), pe = reactExports.useCallback((a) => {
    K(a.targetTouches[0].pageY), J(w);
  }, [w]), z = reactExports.useCallback((a) => {
    a.cancelable && a.preventDefault(), M || q2(true);
    const T = $ + a.targetTouches[0].pageY - ae;
    L(T);
  }, [M, $, ae, L]), oe = reactExports.useCallback(() => {
    M && (q2(false), K(0), J(0), d());
  }, [d, M]), j = reactExports.useCallback(() => {
    M && (q2(false), K(0), N($), J(0));
  }, [M, $]), D = reactExports.useRef(null), Y = reactExports.useCallback((a) => {
    if (a.deltaY === 0)
      return;
    let T = a.deltaY * 0.1;
    Math.abs(T) < u && (T = u * Math.sign(T)), E === "normal" && (T = -T);
    const Q = w + T;
    L(Q);
  }, [u, w, L, E]), X = reactExports.useCallback(() => {
    d();
  }, [d]), G = reactExports.useCallback((a) => {
    E !== "off" && (a.cancelable && a.preventDefault(), Y(a), D.current && clearTimeout(D.current), D.current = setTimeout(() => {
      X();
    }, 200));
  }, [X, Y, D, E]), Z = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const a = Z.current;
    return a && (a.addEventListener("touchmove", z, { passive: false }), a.addEventListener("wheel", G, { passive: false })), () => {
      a && (a.removeEventListener("touchmove", z), a.removeEventListener("wheel", G));
    };
  }, [z, G]);
  const ie = reactExports.useMemo(
    () => ({
      flex: "1 1 0%",
      maxHeight: "100%",
      transitionProperty: "transform",
      transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
      transitionDuration: M ? "0ms" : "300ms",
      transform: `translate3d(0, ${w}px, 0)`
    }),
    [w, M]
  ), se = reactExports.useMemo(
    () => ({ key: o }),
    [o]
  );
  return /* @__PURE__ */ W.jsx(
    "div",
    {
      style: {
        ...ie,
        ...g
      },
      ref: Z,
      onTouchStart: pe,
      onTouchEnd: oe,
      onTouchCancel: j,
      ...m,
      children: /* @__PURE__ */ W.jsx(De.Provider, { value: se, children: l })
    }
  );
}
function Ar(g) {
  return typeof g == "function";
}
function Fr({
  style: g,
  children: l,
  value: o,
  ...m
}) {
  const f = reactExports.useRef(null), { itemHeight: u, value: E } = xe("Picker.Item"), R = je("Picker.Item"), { key: p } = ze("Picker.Item");
  reactExports.useEffect(
    () => R.registerOption(p, { value: o, element: f }),
    [p, R, o]
  );
  const k = reactExports.useMemo(
    () => ({
      height: `${u}px`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }),
    [u]
  ), h = reactExports.useCallback(() => {
    R.change(p, o);
  }, [R, p, o]);
  return /* @__PURE__ */ W.jsx(
    "div",
    {
      style: {
        ...k,
        ...g
      },
      ref: f,
      onClick: h,
      ...m,
      children: Ar(l) ? l({ selected: E[p] === o }) : l
    }
  );
}
const Nr = Object.assign(Dr, {
  Column: Ir,
  Item: Fr
});
function MobilePicker({ options, title = "value", setMobileFilter }) {
  const [pickerValue, setPickerValue] = reactExports.useState({
    value: "All"
  });
  const handleChange = (value) => {
    setPickerValue(value);
    setMobileFilter(value);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Nr, { value: pickerValue, onChange: handleChange, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Nr.Column, { name: title, children: options == null ? void 0 : options.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Nr.Item, { value: label, children: label }, value)) }, "key") });
}
const SelectPaginate = ({
  loadOptions,
  selectedItem,
  handleInputChange,
  setIsModalOpen,
  options,
  handleMobileInputChange,
  title = ""
}) => {
  const isMobile = q().props.isMobile;
  return !isMobile ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    AsyncPaginate,
    {
      styles: filterStyles,
      loadOptions,
      additional: { page: 1 },
      value: selectedItem,
      onChange: handleInputChange
    },
    selectedItem ? selectedItem.value : "no-state"
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(GenericModal, { title, setIsModalOpen, centered: true, buttonTitle: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {}, className: "filter-custom-label", children: selectedItem == null ? void 0 : selectedItem.value }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(MobilePicker, { setMobileFilter: handleMobileInputChange, options }) });
};
const BreedFilter = ({ setBreed, title = "Breed", defaultValue }) => {
  const isMobile = q().props.isMobile;
  const [selectedBreed, setSelectedBreed] = reactExports.useState(defaultValue);
  const [options, setOptions] = reactExports.useState([]);
  const handleInputChange = (selected) => {
    setBreed((prev) => ({
      ...prev,
      breed: { label: selected.label, value: selected.label }
    }));
    setSelectedBreed(selected);
  };
  const fetchBreeds = async (search, loadedOptions, { page }) => {
    try {
      const response = await fetch(
        `/api/puppy/breeds?page=${page}&search=${search}&all=true`
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
    fetchBreeds("", null, { page: 1 });
  }, [isModalOpen]);
  const handleMobileInputChange = (selected) => {
    setBreed((prev) => ({
      ...prev,
      breed: { label: selected.value, value: selected.value }
    }));
    setSelectedBreed({
      label: selected.value,
      value: selected.value
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-breed.svg", alt: "Breed Icon" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-box", style: {
      paddingRight: "20px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "font-work-sans mb-0", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectPaginate,
        {
          loadOptions: fetchBreeds,
          selectedItem: selectedBreed,
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
  BreedFilter as B,
  MobilePicker as M,
  SelectPaginate as S,
  SelectFilterInput as a
};

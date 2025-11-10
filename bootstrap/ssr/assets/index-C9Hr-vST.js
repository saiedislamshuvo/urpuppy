import { i as index, c as components, S as StateManagedSelect$1 } from "./react-select.esm-tWlRM8_L.js";
import { r as reactExports, U, j as jsxRuntimeExports } from "../ssr.js";
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
export {
  AsyncPaginate as A
};

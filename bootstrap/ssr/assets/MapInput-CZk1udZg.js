import { c as commonjsGlobal, g as getDefaultExportFromCjs, j as jsxRuntimeExports, r as reactExports, U } from "../ssr.js";
import { r as reactDomExports } from "./index-D7h8hQJR.js";
import { c as clsx, B as Button } from "./Button-C_TFTgI3.js";
import { P as PropTypes } from "./index-Bj-wIX-d.js";
import { c as classNames } from "./index-DbhDZzck.js";
var __spreadArray$3 = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var clipboardEvents = ["onCopy", "onCut", "onPaste"];
var compositionEvents = [
  "onCompositionEnd",
  "onCompositionStart",
  "onCompositionUpdate"
];
var focusEvents = ["onFocus", "onBlur"];
var formEvents = ["onInput", "onInvalid", "onReset", "onSubmit"];
var imageEvents = ["onLoad", "onError"];
var keyboardEvents = ["onKeyDown", "onKeyPress", "onKeyUp"];
var mediaEvents = [
  "onAbort",
  "onCanPlay",
  "onCanPlayThrough",
  "onDurationChange",
  "onEmptied",
  "onEncrypted",
  "onEnded",
  "onError",
  "onLoadedData",
  "onLoadedMetadata",
  "onLoadStart",
  "onPause",
  "onPlay",
  "onPlaying",
  "onProgress",
  "onRateChange",
  "onSeeked",
  "onSeeking",
  "onStalled",
  "onSuspend",
  "onTimeUpdate",
  "onVolumeChange",
  "onWaiting"
];
var mouseEvents = [
  "onClick",
  "onContextMenu",
  "onDoubleClick",
  "onMouseDown",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp"
];
var dragEvents = [
  "onDrag",
  "onDragEnd",
  "onDragEnter",
  "onDragExit",
  "onDragLeave",
  "onDragOver",
  "onDragStart",
  "onDrop"
];
var selectionEvents = ["onSelect"];
var touchEvents = ["onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart"];
var pointerEvents = [
  "onPointerDown",
  "onPointerMove",
  "onPointerUp",
  "onPointerCancel",
  "onGotPointerCapture",
  "onLostPointerCapture",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerOver",
  "onPointerOut"
];
var uiEvents = ["onScroll"];
var wheelEvents = ["onWheel"];
var animationEvents = [
  "onAnimationStart",
  "onAnimationEnd",
  "onAnimationIteration"
];
var transitionEvents = ["onTransitionEnd"];
var otherEvents = ["onToggle"];
var changeEvents = ["onChange"];
var allEvents = __spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3(__spreadArray$3([], clipboardEvents, true), compositionEvents, true), focusEvents, true), formEvents, true), imageEvents, true), keyboardEvents, true), mediaEvents, true), mouseEvents, true), dragEvents, true), selectionEvents, true), touchEvents, true), pointerEvents, true), uiEvents, true), wheelEvents, true), animationEvents, true), transitionEvents, true), changeEvents, true), otherEvents, true);
function makeEventProps(props, getArgs) {
  var eventProps = {};
  allEvents.forEach(function(eventName) {
    var eventHandler = props[eventName];
    if (!eventHandler) {
      return;
    }
    {
      eventProps[eventName] = eventHandler;
    }
  });
  return eventProps;
}
const copyProperty = (to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
};
const canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
const changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
const wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
const toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
const toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
const changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  Object.defineProperty(to, "toString", { ...toStringDescriptor, value: newToString });
};
const mimicFn$1 = (to, from, { ignoreNonConfigurable = false } = {}) => {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
};
var mimicFn_1 = mimicFn$1;
var dist$1 = { exports: {} };
var pDefer = () => {
  const ret = {};
  ret.promise = new Promise((resolve, reject) => {
    ret.resolve = resolve;
    ret.reject = reject;
  });
  return ret;
};
(function(module, exports) {
  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result2) {
        result2.done ? resolve(result2.value) : new P(function(resolve2) {
          resolve2(result2.value);
        }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  const p_defer_1 = __importDefault(pDefer);
  function mapAgeCleaner2(map, property = "maxAge") {
    let processingKey;
    let processingTimer;
    let processingDeferred;
    const cleanup = () => __awaiter(this, void 0, void 0, function* () {
      if (processingKey !== void 0) {
        return;
      }
      const setupTimer = (item) => __awaiter(this, void 0, void 0, function* () {
        processingDeferred = p_defer_1.default();
        const delay = item[1][property] - Date.now();
        if (delay <= 0) {
          map.delete(item[0]);
          processingDeferred.resolve();
          return;
        }
        processingKey = item[0];
        processingTimer = setTimeout(() => {
          map.delete(item[0]);
          if (processingDeferred) {
            processingDeferred.resolve();
          }
        }, delay);
        if (typeof processingTimer.unref === "function") {
          processingTimer.unref();
        }
        return processingDeferred.promise;
      });
      try {
        for (const entry of map) {
          yield setupTimer(entry);
        }
      } catch (_a) {
      }
      processingKey = void 0;
    });
    const reset = () => {
      processingKey = void 0;
      if (processingTimer !== void 0) {
        clearTimeout(processingTimer);
        processingTimer = void 0;
      }
      if (processingDeferred !== void 0) {
        processingDeferred.reject(void 0);
        processingDeferred = void 0;
      }
    };
    const originalSet = map.set.bind(map);
    map.set = (key, value) => {
      if (map.has(key)) {
        map.delete(key);
      }
      const result2 = originalSet(key, value);
      if (processingKey && processingKey === key) {
        reset();
      }
      cleanup();
      return result2;
    };
    cleanup();
    return map;
  }
  exports.default = mapAgeCleaner2;
  module.exports = mapAgeCleaner2;
  module.exports.default = mapAgeCleaner2;
})(dist$1, dist$1.exports);
var distExports = dist$1.exports;
const mimicFn = mimicFn_1;
const mapAgeCleaner = distExports;
const decoratorInstanceMap = /* @__PURE__ */ new WeakMap();
const cacheStore = /* @__PURE__ */ new WeakMap();
const mem = (fn, { cacheKey, cache = /* @__PURE__ */ new Map(), maxAge } = {}) => {
  if (typeof maxAge === "number") {
    mapAgeCleaner(cache);
  }
  const memoized = function(...arguments_) {
    const key = cacheKey ? cacheKey(arguments_) : arguments_[0];
    const cacheItem = cache.get(key);
    if (cacheItem) {
      return cacheItem.data;
    }
    const result2 = fn.apply(this, arguments_);
    cache.set(key, {
      data: result2,
      maxAge: maxAge ? Date.now() + maxAge : Number.POSITIVE_INFINITY
    });
    return result2;
  };
  mimicFn(memoized, fn, {
    ignoreNonConfigurable: true
  });
  cacheStore.set(memoized, cache);
  return memoized;
};
mem.decorator = (options = {}) => (target, propertyKey, descriptor) => {
  const input = target[propertyKey];
  if (typeof input !== "function") {
    throw new TypeError("The decorated value must be a function");
  }
  delete descriptor.value;
  delete descriptor.writable;
  descriptor.get = function() {
    if (!decoratorInstanceMap.has(this)) {
      const value = mem(input, options);
      decoratorInstanceMap.set(this, value);
      return value;
    }
    return decoratorInstanceMap.get(this);
  };
};
mem.clear = (fn) => {
  const cache = cacheStore.get(fn);
  if (!cache) {
    throw new TypeError("Can't clear a function that was not memoized!");
  }
  if (typeof cache.clear !== "function") {
    throw new TypeError("The cache Map can't be cleared!");
  }
  cache.clear();
};
var dist = mem;
const mem$1 = /* @__PURE__ */ getDefaultExportFromCjs(dist);
function isString(el) {
  return typeof el === "string";
}
function isUnique(el, index, arr) {
  return arr.indexOf(el) === index;
}
function isAllLowerCase(el) {
  return el.toLowerCase() === el;
}
function fixCommas(el) {
  return el.indexOf(",") === -1 ? el : el.split(",");
}
function normalizeLocale(locale) {
  if (!locale) {
    return locale;
  }
  if (locale === "C" || locale === "posix" || locale === "POSIX") {
    return "en-US";
  }
  if (locale.indexOf(".") !== -1) {
    var _a = locale.split(".")[0], actualLocale = _a === void 0 ? "" : _a;
    return normalizeLocale(actualLocale);
  }
  if (locale.indexOf("@") !== -1) {
    var _b = locale.split("@")[0], actualLocale = _b === void 0 ? "" : _b;
    return normalizeLocale(actualLocale);
  }
  if (locale.indexOf("-") === -1 || !isAllLowerCase(locale)) {
    return locale;
  }
  var _c = locale.split("-"), splitEl1 = _c[0], _d = _c[1], splitEl2 = _d === void 0 ? "" : _d;
  return "".concat(splitEl1, "-").concat(splitEl2.toUpperCase());
}
function getUserLocalesInternal(_a) {
  var _b = _a === void 0 ? {} : _a, _c = _b.useFallbackLocale, useFallbackLocale = _c === void 0 ? true : _c, _d = _b.fallbackLocale, fallbackLocale = _d === void 0 ? "en-US" : _d;
  var languageList = [];
  if (typeof navigator !== "undefined") {
    var rawLanguages = navigator.languages || [];
    var languages = [];
    for (var _i = 0, rawLanguages_1 = rawLanguages; _i < rawLanguages_1.length; _i++) {
      var rawLanguagesItem = rawLanguages_1[_i];
      languages = languages.concat(fixCommas(rawLanguagesItem));
    }
    var rawLanguage = navigator.language;
    var language = rawLanguage ? fixCommas(rawLanguage) : rawLanguage;
    languageList = languageList.concat(languages, language);
  }
  if (useFallbackLocale) {
    languageList.push(fallbackLocale);
  }
  return languageList.filter(isString).map(normalizeLocale).filter(isUnique);
}
var getUserLocales = mem$1(getUserLocalesInternal, { cacheKey: JSON.stringify });
function getUserLocaleInternal(options) {
  return getUserLocales(options)[0] || null;
}
var getUserLocale = mem$1(getUserLocaleInternal, { cacheKey: JSON.stringify });
function makeGetEdgeOfNeighbor(getPeriod, getEdgeOfPeriod, defaultOffset) {
  return function makeGetEdgeOfNeighborInternal(date, offset) {
    if (offset === void 0) {
      offset = defaultOffset;
    }
    var previousPeriod = getPeriod(date) + offset;
    return getEdgeOfPeriod(previousPeriod);
  };
}
function makeGetEnd(getBeginOfNextPeriod) {
  return function makeGetEndInternal(date) {
    return new Date(getBeginOfNextPeriod(date).getTime() - 1);
  };
}
function makeGetRange(getStart, getEnd2) {
  return function makeGetRangeInternal(date) {
    return [getStart(date), getEnd2(date)];
  };
}
function getYear(date) {
  if (date instanceof Date) {
    return date.getFullYear();
  }
  if (typeof date === "number") {
    return date;
  }
  var year = parseInt(date, 10);
  if (typeof date === "string" && !isNaN(year)) {
    return year;
  }
  throw new Error("Failed to get year from date: ".concat(date, "."));
}
function getMonth(date) {
  if (date instanceof Date) {
    return date.getMonth();
  }
  throw new Error("Failed to get month from date: ".concat(date, "."));
}
function getMonthHuman(date) {
  if (date instanceof Date) {
    return date.getMonth() + 1;
  }
  throw new Error("Failed to get human-readable month from date: ".concat(date, "."));
}
function getDate(date) {
  if (date instanceof Date) {
    return date.getDate();
  }
  throw new Error("Failed to get year from date: ".concat(date, "."));
}
function getCenturyStart(date) {
  var year = getYear(date);
  var centuryStartYear = year + (-year + 1) % 100;
  var centuryStartDate = /* @__PURE__ */ new Date();
  centuryStartDate.setFullYear(centuryStartYear, 0, 1);
  centuryStartDate.setHours(0, 0, 0, 0);
  return centuryStartDate;
}
var getPreviousCenturyStart = makeGetEdgeOfNeighbor(getYear, getCenturyStart, -100);
var getNextCenturyStart = makeGetEdgeOfNeighbor(getYear, getCenturyStart, 100);
var getCenturyEnd = makeGetEnd(getNextCenturyStart);
var getPreviousCenturyEnd = makeGetEdgeOfNeighbor(getYear, getCenturyEnd, -100);
var getCenturyRange = makeGetRange(getCenturyStart, getCenturyEnd);
function getDecadeStart(date) {
  var year = getYear(date);
  var decadeStartYear = year + (-year + 1) % 10;
  var decadeStartDate = /* @__PURE__ */ new Date();
  decadeStartDate.setFullYear(decadeStartYear, 0, 1);
  decadeStartDate.setHours(0, 0, 0, 0);
  return decadeStartDate;
}
var getPreviousDecadeStart = makeGetEdgeOfNeighbor(getYear, getDecadeStart, -10);
var getNextDecadeStart = makeGetEdgeOfNeighbor(getYear, getDecadeStart, 10);
var getDecadeEnd = makeGetEnd(getNextDecadeStart);
var getPreviousDecadeEnd = makeGetEdgeOfNeighbor(getYear, getDecadeEnd, -10);
var getDecadeRange = makeGetRange(getDecadeStart, getDecadeEnd);
function getYearStart(date) {
  var year = getYear(date);
  var yearStartDate = /* @__PURE__ */ new Date();
  yearStartDate.setFullYear(year, 0, 1);
  yearStartDate.setHours(0, 0, 0, 0);
  return yearStartDate;
}
var getPreviousYearStart = makeGetEdgeOfNeighbor(getYear, getYearStart, -1);
var getNextYearStart = makeGetEdgeOfNeighbor(getYear, getYearStart, 1);
var getYearEnd = makeGetEnd(getNextYearStart);
var getPreviousYearEnd = makeGetEdgeOfNeighbor(getYear, getYearEnd, -1);
var getYearRange = makeGetRange(getYearStart, getYearEnd);
function makeGetEdgeOfNeighborMonth(getEdgeOfPeriod, defaultOffset) {
  return function makeGetEdgeOfNeighborMonthInternal(date, offset) {
    if (offset === void 0) {
      offset = defaultOffset;
    }
    var year = getYear(date);
    var month = getMonth(date) + offset;
    var previousPeriod = /* @__PURE__ */ new Date();
    previousPeriod.setFullYear(year, month, 1);
    previousPeriod.setHours(0, 0, 0, 0);
    return getEdgeOfPeriod(previousPeriod);
  };
}
function getMonthStart(date) {
  var year = getYear(date);
  var month = getMonth(date);
  var monthStartDate = /* @__PURE__ */ new Date();
  monthStartDate.setFullYear(year, month, 1);
  monthStartDate.setHours(0, 0, 0, 0);
  return monthStartDate;
}
var getPreviousMonthStart = makeGetEdgeOfNeighborMonth(getMonthStart, -1);
var getNextMonthStart = makeGetEdgeOfNeighborMonth(getMonthStart, 1);
var getMonthEnd = makeGetEnd(getNextMonthStart);
var getPreviousMonthEnd = makeGetEdgeOfNeighborMonth(getMonthEnd, -1);
var getMonthRange = makeGetRange(getMonthStart, getMonthEnd);
function makeGetEdgeOfNeighborDay(getEdgeOfPeriod, defaultOffset) {
  return function makeGetEdgeOfNeighborDayInternal(date, offset) {
    if (offset === void 0) {
      offset = defaultOffset;
    }
    var year = getYear(date);
    var month = getMonth(date);
    var day = getDate(date) + offset;
    var previousPeriod = /* @__PURE__ */ new Date();
    previousPeriod.setFullYear(year, month, day);
    previousPeriod.setHours(0, 0, 0, 0);
    return getEdgeOfPeriod(previousPeriod);
  };
}
function getDayStart(date) {
  var year = getYear(date);
  var month = getMonth(date);
  var day = getDate(date);
  var dayStartDate = /* @__PURE__ */ new Date();
  dayStartDate.setFullYear(year, month, day);
  dayStartDate.setHours(0, 0, 0, 0);
  return dayStartDate;
}
var getNextDayStart = makeGetEdgeOfNeighborDay(getDayStart, 1);
var getDayEnd = makeGetEnd(getNextDayStart);
var getDayRange = makeGetRange(getDayStart, getDayEnd);
function getDaysInMonth(date) {
  return getDate(getMonthEnd(date));
}
function padStart(num, val) {
  if (val === void 0) {
    val = 2;
  }
  var numStr = "".concat(num);
  if (numStr.length >= val) {
    return num;
  }
  return "0000".concat(numStr).slice(-val);
}
function getISOLocalMonth(date) {
  var year = padStart(getYear(date), 4);
  var month = padStart(getMonthHuman(date));
  return "".concat(year, "-").concat(month);
}
function getISOLocalDate(date) {
  var year = padStart(getYear(date), 4);
  var month = padStart(getMonthHuman(date));
  var day = padStart(getDate(date));
  return "".concat(year, "-").concat(month, "-").concat(day);
}
var CALENDAR_TYPES = {
  GREGORY: "gregory",
  HEBREW: "hebrew",
  ISLAMIC: "islamic",
  ISO_8601: "iso8601"
};
var CALENDAR_TYPE_LOCALES = {
  gregory: [
    "en-CA",
    "en-US",
    "es-AR",
    "es-BO",
    "es-CL",
    "es-CO",
    "es-CR",
    "es-DO",
    "es-EC",
    "es-GT",
    "es-HN",
    "es-MX",
    "es-NI",
    "es-PA",
    "es-PE",
    "es-PR",
    "es-SV",
    "es-VE",
    "pt-BR"
  ],
  hebrew: ["he", "he-IL"],
  islamic: [
    // ar-LB, ar-MA intentionally missing
    "ar",
    "ar-AE",
    "ar-BH",
    "ar-DZ",
    "ar-EG",
    "ar-IQ",
    "ar-JO",
    "ar-KW",
    "ar-LY",
    "ar-OM",
    "ar-QA",
    "ar-SA",
    "ar-SD",
    "ar-SY",
    "ar-YE",
    "dv",
    "dv-MV",
    "ps",
    "ps-AR"
  ]
};
var WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];
var formatterCache$1 = /* @__PURE__ */ new Map();
function getFormatter$1(options) {
  return function formatter(locale, date) {
    var localeWithDefault = locale || getUserLocale();
    if (!formatterCache$1.has(localeWithDefault)) {
      formatterCache$1.set(localeWithDefault, /* @__PURE__ */ new Map());
    }
    var formatterCacheLocale = formatterCache$1.get(localeWithDefault);
    if (!formatterCacheLocale.has(options)) {
      formatterCacheLocale.set(options, new Intl.DateTimeFormat(localeWithDefault || void 0, options).format);
    }
    return formatterCacheLocale.get(options)(date);
  };
}
function toSafeHour$1(date) {
  var safeDate = new Date(date);
  return new Date(safeDate.setHours(12));
}
function getSafeFormatter$1(options) {
  return function(locale, date) {
    return getFormatter$1(options)(locale, toSafeHour$1(date));
  };
}
var formatDayOptions = { day: "numeric" };
var formatLongDateOptions = {
  day: "numeric",
  month: "long",
  year: "numeric"
};
var formatMonthOptions$1 = { month: "long" };
var formatMonthYearOptions = {
  month: "long",
  year: "numeric"
};
var formatShortWeekdayOptions = { weekday: "short" };
var formatWeekdayOptions = { weekday: "long" };
var formatYearOptions = { year: "numeric" };
var formatDay = getSafeFormatter$1(formatDayOptions);
var formatLongDate = getSafeFormatter$1(formatLongDateOptions);
var formatMonth$1 = getSafeFormatter$1(formatMonthOptions$1);
var formatMonthYear = getSafeFormatter$1(formatMonthYearOptions);
var formatShortWeekday = getSafeFormatter$1(formatShortWeekdayOptions);
var formatWeekday = getSafeFormatter$1(formatWeekdayOptions);
var formatYear = getSafeFormatter$1(formatYearOptions);
var SUNDAY = WEEKDAYS[0];
var FRIDAY = WEEKDAYS[5];
var SATURDAY = WEEKDAYS[6];
function getDayOfWeek(date, calendarType) {
  if (calendarType === void 0) {
    calendarType = CALENDAR_TYPES.ISO_8601;
  }
  var weekday = date.getDay();
  switch (calendarType) {
    case CALENDAR_TYPES.ISO_8601:
      return (weekday + 6) % 7;
    case CALENDAR_TYPES.ISLAMIC:
      return (weekday + 1) % 7;
    case CALENDAR_TYPES.HEBREW:
    case CALENDAR_TYPES.GREGORY:
      return weekday;
    default:
      throw new Error("Unsupported calendar type.");
  }
}
function getBeginOfCenturyYear(date) {
  var beginOfCentury = getCenturyStart(date);
  return getYear(beginOfCentury);
}
function getBeginOfDecadeYear(date) {
  var beginOfDecade = getDecadeStart(date);
  return getYear(beginOfDecade);
}
function getBeginOfWeek(date, calendarType) {
  if (calendarType === void 0) {
    calendarType = CALENDAR_TYPES.ISO_8601;
  }
  var year = getYear(date);
  var monthIndex = getMonth(date);
  var day = date.getDate() - getDayOfWeek(date, calendarType);
  return new Date(year, monthIndex, day);
}
function getWeekNumber(date, calendarType) {
  if (calendarType === void 0) {
    calendarType = CALENDAR_TYPES.ISO_8601;
  }
  var calendarTypeForWeekNumber = calendarType === CALENDAR_TYPES.GREGORY ? CALENDAR_TYPES.GREGORY : CALENDAR_TYPES.ISO_8601;
  var beginOfWeek = getBeginOfWeek(date, calendarType);
  var year = getYear(date) + 1;
  var dayInWeekOne;
  var beginOfFirstWeek;
  do {
    dayInWeekOne = new Date(year, 0, calendarTypeForWeekNumber === CALENDAR_TYPES.ISO_8601 ? 4 : 1);
    beginOfFirstWeek = getBeginOfWeek(dayInWeekOne, calendarType);
    year -= 1;
  } while (date < beginOfFirstWeek);
  return Math.round((beginOfWeek.getTime() - beginOfFirstWeek.getTime()) / (864e5 * 7)) + 1;
}
function getBegin$1(rangeType, date) {
  switch (rangeType) {
    case "century":
      return getCenturyStart(date);
    case "decade":
      return getDecadeStart(date);
    case "year":
      return getYearStart(date);
    case "month":
      return getMonthStart(date);
    case "day":
      return getDayStart(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getBeginPrevious(rangeType, date) {
  switch (rangeType) {
    case "century":
      return getPreviousCenturyStart(date);
    case "decade":
      return getPreviousDecadeStart(date);
    case "year":
      return getPreviousYearStart(date);
    case "month":
      return getPreviousMonthStart(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getBeginNext(rangeType, date) {
  switch (rangeType) {
    case "century":
      return getNextCenturyStart(date);
    case "decade":
      return getNextDecadeStart(date);
    case "year":
      return getNextYearStart(date);
    case "month":
      return getNextMonthStart(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getBeginPrevious2(rangeType, date) {
  switch (rangeType) {
    case "decade":
      return getPreviousDecadeStart(date, -100);
    case "year":
      return getPreviousYearStart(date, -10);
    case "month":
      return getPreviousMonthStart(date, -12);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getBeginNext2(rangeType, date) {
  switch (rangeType) {
    case "decade":
      return getNextDecadeStart(date, 100);
    case "year":
      return getNextYearStart(date, 10);
    case "month":
      return getNextMonthStart(date, 12);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getEnd$1(rangeType, date) {
  switch (rangeType) {
    case "century":
      return getCenturyEnd(date);
    case "decade":
      return getDecadeEnd(date);
    case "year":
      return getYearEnd(date);
    case "month":
      return getMonthEnd(date);
    case "day":
      return getDayEnd(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getEndPrevious(rangeType, date) {
  switch (rangeType) {
    case "century":
      return getPreviousCenturyEnd(date);
    case "decade":
      return getPreviousDecadeEnd(date);
    case "year":
      return getPreviousYearEnd(date);
    case "month":
      return getPreviousMonthEnd(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getEndPrevious2(rangeType, date) {
  switch (rangeType) {
    case "decade":
      return getPreviousDecadeEnd(date, -100);
    case "year":
      return getPreviousYearEnd(date, -10);
    case "month":
      return getPreviousMonthEnd(date, -12);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getRange(rangeType, date) {
  switch (rangeType) {
    case "century":
      return getCenturyRange(date);
    case "decade":
      return getDecadeRange(date);
    case "year":
      return getYearRange(date);
    case "month":
      return getMonthRange(date);
    case "day":
      return getDayRange(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getValueRange(rangeType, date1, date2) {
  var rawNextValue = [date1, date2].sort(function(a, b) {
    return a.getTime() - b.getTime();
  });
  return [getBegin$1(rangeType, rawNextValue[0]), getEnd$1(rangeType, rawNextValue[1])];
}
function toYearLabel(locale, formatYear$1, dates) {
  return dates.map(function(date) {
    return (formatYear$1 || formatYear)(locale, date);
  }).join(" – ");
}
function getCenturyLabel(locale, formatYear2, date) {
  return toYearLabel(locale, formatYear2, getCenturyRange(date));
}
function getDecadeLabel(locale, formatYear2, date) {
  return toYearLabel(locale, formatYear2, getDecadeRange(date));
}
function isCurrentDayOfWeek(date) {
  return date.getDay() === (/* @__PURE__ */ new Date()).getDay();
}
function isWeekend(date, calendarType) {
  if (calendarType === void 0) {
    calendarType = CALENDAR_TYPES.ISO_8601;
  }
  var weekday = date.getDay();
  switch (calendarType) {
    case CALENDAR_TYPES.ISLAMIC:
    case CALENDAR_TYPES.HEBREW:
      return weekday === FRIDAY || weekday === SATURDAY;
    case CALENDAR_TYPES.ISO_8601:
    case CALENDAR_TYPES.GREGORY:
      return weekday === SATURDAY || weekday === SUNDAY;
    default:
      throw new Error("Unsupported calendar type.");
  }
}
var className$6 = "react-calendar__navigation";
function Navigation(_a) {
  var activeStartDate = _a.activeStartDate, drillUp = _a.drillUp, _b = _a.formatMonthYear, formatMonthYear$1 = _b === void 0 ? formatMonthYear : _b, _c = _a.formatYear, formatYear$1 = _c === void 0 ? formatYear : _c, locale = _a.locale, maxDate = _a.maxDate, minDate = _a.minDate, _d = _a.navigationAriaLabel, navigationAriaLabel = _d === void 0 ? "" : _d, navigationAriaLive = _a.navigationAriaLive, navigationLabel = _a.navigationLabel, _e = _a.next2AriaLabel, next2AriaLabel = _e === void 0 ? "" : _e, _f = _a.next2Label, next2Label = _f === void 0 ? "»" : _f, _g = _a.nextAriaLabel, nextAriaLabel = _g === void 0 ? "" : _g, _h = _a.nextLabel, nextLabel = _h === void 0 ? "›" : _h, _j = _a.prev2AriaLabel, prev2AriaLabel = _j === void 0 ? "" : _j, _k = _a.prev2Label, prev2Label = _k === void 0 ? "«" : _k, _l = _a.prevAriaLabel, prevAriaLabel = _l === void 0 ? "" : _l, _m = _a.prevLabel, prevLabel = _m === void 0 ? "‹" : _m, setActiveStartDate = _a.setActiveStartDate, showDoubleView = _a.showDoubleView, view = _a.view, views = _a.views;
  var drillUpAvailable = views.indexOf(view) > 0;
  var shouldShowPrevNext2Buttons = view !== "century";
  var previousActiveStartDate = getBeginPrevious(view, activeStartDate);
  var previousActiveStartDate2 = shouldShowPrevNext2Buttons ? getBeginPrevious2(view, activeStartDate) : void 0;
  var nextActiveStartDate = getBeginNext(view, activeStartDate);
  var nextActiveStartDate2 = shouldShowPrevNext2Buttons ? getBeginNext2(view, activeStartDate) : void 0;
  var prevButtonDisabled = function() {
    if (previousActiveStartDate.getFullYear() < 0) {
      return true;
    }
    var previousActiveEndDate = getEndPrevious(view, activeStartDate);
    return minDate && minDate >= previousActiveEndDate;
  }();
  var prev2ButtonDisabled = shouldShowPrevNext2Buttons && function() {
    if (previousActiveStartDate2.getFullYear() < 0) {
      return true;
    }
    var previousActiveEndDate = getEndPrevious2(view, activeStartDate);
    return minDate && minDate >= previousActiveEndDate;
  }();
  var nextButtonDisabled = maxDate && maxDate < nextActiveStartDate;
  var next2ButtonDisabled = shouldShowPrevNext2Buttons && maxDate && maxDate < nextActiveStartDate2;
  function onClickPrevious() {
    setActiveStartDate(previousActiveStartDate, "prev");
  }
  function onClickPrevious2() {
    setActiveStartDate(previousActiveStartDate2, "prev2");
  }
  function onClickNext() {
    setActiveStartDate(nextActiveStartDate, "next");
  }
  function onClickNext2() {
    setActiveStartDate(nextActiveStartDate2, "next2");
  }
  function renderLabel(date) {
    var label = function() {
      switch (view) {
        case "century":
          return getCenturyLabel(locale, formatYear$1, date);
        case "decade":
          return getDecadeLabel(locale, formatYear$1, date);
        case "year":
          return formatYear$1(locale, date);
        case "month":
          return formatMonthYear$1(locale, date);
        default:
          throw new Error("Invalid view: ".concat(view, "."));
      }
    }();
    return navigationLabel ? navigationLabel({
      date,
      label,
      locale: locale || getUserLocale() || void 0,
      view
    }) : label;
  }
  function renderButton() {
    var labelClassName = "".concat(className$6, "__label");
    return jsxRuntimeExports.jsxs("button", { "aria-label": navigationAriaLabel, "aria-live": navigationAriaLive, className: labelClassName, disabled: !drillUpAvailable, onClick: drillUp, style: { flexGrow: 1 }, type: "button", children: [jsxRuntimeExports.jsx("span", { className: "".concat(labelClassName, "__labelText ").concat(labelClassName, "__labelText--from"), children: renderLabel(activeStartDate) }), showDoubleView ? jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { className: "".concat(labelClassName, "__divider"), children: " – " }), jsxRuntimeExports.jsx("span", { className: "".concat(labelClassName, "__labelText ").concat(labelClassName, "__labelText--to"), children: renderLabel(nextActiveStartDate) })] }) : null] });
  }
  return jsxRuntimeExports.jsxs("div", { className: className$6, children: [prev2Label !== null && shouldShowPrevNext2Buttons ? jsxRuntimeExports.jsx("button", { "aria-label": prev2AriaLabel, className: "".concat(className$6, "__arrow ").concat(className$6, "__prev2-button"), disabled: prev2ButtonDisabled, onClick: onClickPrevious2, type: "button", children: prev2Label }) : null, prevLabel !== null && jsxRuntimeExports.jsx("button", { "aria-label": prevAriaLabel, className: "".concat(className$6, "__arrow ").concat(className$6, "__prev-button"), disabled: prevButtonDisabled, onClick: onClickPrevious, type: "button", children: prevLabel }), renderButton(), nextLabel !== null && jsxRuntimeExports.jsx("button", { "aria-label": nextAriaLabel, className: "".concat(className$6, "__arrow ").concat(className$6, "__next-button"), disabled: nextButtonDisabled, onClick: onClickNext, type: "button", children: nextLabel }), next2Label !== null && shouldShowPrevNext2Buttons ? jsxRuntimeExports.jsx("button", { "aria-label": next2AriaLabel, className: "".concat(className$6, "__arrow ").concat(className$6, "__next2-button"), disabled: next2ButtonDisabled, onClick: onClickNext2, type: "button", children: next2Label }) : null] });
}
var __assign$k = function() {
  __assign$k = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$k.apply(this, arguments);
};
var __rest$g = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function toPercent(num) {
  return "".concat(num, "%");
}
function Flex(_a) {
  var children = _a.children, className2 = _a.className, count = _a.count, direction = _a.direction, offset = _a.offset, style = _a.style, wrap = _a.wrap, otherProps = __rest$g(_a, ["children", "className", "count", "direction", "offset", "style", "wrap"]);
  return jsxRuntimeExports.jsx("div", __assign$k({ className: className2, style: __assign$k({ display: "flex", flexDirection: direction, flexWrap: wrap ? "wrap" : "nowrap" }, style) }, otherProps, { children: reactExports.Children.map(children, function(child, index) {
    var marginInlineStart = offset && index === 0 ? toPercent(100 * offset / count) : null;
    return reactExports.cloneElement(child, __assign$k(__assign$k({}, child.props), { style: {
      flexBasis: toPercent(100 / count),
      flexShrink: 0,
      flexGrow: 0,
      overflow: "hidden",
      marginLeft: marginInlineStart,
      marginInlineStart,
      marginInlineEnd: 0
    } }));
  }) }));
}
function between$1(value, min, max) {
  if (min && min > value) {
    return min;
  }
  if (max && max < value) {
    return max;
  }
  return value;
}
function isValueWithinRange(value, range) {
  return range[0] <= value && range[1] >= value;
}
function isRangeWithinRange(greaterRange, smallerRange) {
  return greaterRange[0] <= smallerRange[0] && greaterRange[1] >= smallerRange[1];
}
function doRangesOverlap(range1, range2) {
  return isValueWithinRange(range1[0], range2) || isValueWithinRange(range1[1], range2);
}
function getRangeClassNames(valueRange, dateRange, baseClassName2) {
  var isRange = doRangesOverlap(dateRange, valueRange);
  var classes = [];
  if (isRange) {
    classes.push(baseClassName2);
    var isRangeStart = isValueWithinRange(valueRange[0], dateRange);
    var isRangeEnd = isValueWithinRange(valueRange[1], dateRange);
    if (isRangeStart) {
      classes.push("".concat(baseClassName2, "Start"));
    }
    if (isRangeEnd) {
      classes.push("".concat(baseClassName2, "End"));
    }
    if (isRangeStart && isRangeEnd) {
      classes.push("".concat(baseClassName2, "BothEnds"));
    }
  }
  return classes;
}
function isCompleteValue(value) {
  if (Array.isArray(value)) {
    return value[0] !== null && value[1] !== null;
  }
  return value !== null;
}
function getTileClasses(args) {
  if (!args) {
    throw new Error("args is required");
  }
  var value = args.value, date = args.date, hover = args.hover;
  var className2 = "react-calendar__tile";
  var classes = [className2];
  if (!date) {
    return classes;
  }
  var now = /* @__PURE__ */ new Date();
  var dateRange = function() {
    if (Array.isArray(date)) {
      return date;
    }
    var dateType = args.dateType;
    if (!dateType) {
      throw new Error("dateType is required when date is not an array of two dates");
    }
    return getRange(dateType, date);
  }();
  if (isValueWithinRange(now, dateRange)) {
    classes.push("".concat(className2, "--now"));
  }
  if (!value || !isCompleteValue(value)) {
    return classes;
  }
  var valueRange = function() {
    if (Array.isArray(value)) {
      return value;
    }
    var valueType = args.valueType;
    if (!valueType) {
      throw new Error("valueType is required when value is not an array of two dates");
    }
    return getRange(valueType, value);
  }();
  if (isRangeWithinRange(valueRange, dateRange)) {
    classes.push("".concat(className2, "--active"));
  } else if (doRangesOverlap(valueRange, dateRange)) {
    classes.push("".concat(className2, "--hasActive"));
  }
  var valueRangeClassNames = getRangeClassNames(valueRange, dateRange, "".concat(className2, "--range"));
  classes.push.apply(classes, valueRangeClassNames);
  var valueArray = Array.isArray(value) ? value : [value];
  if (hover && valueArray.length === 1) {
    var hoverRange = hover > valueRange[0] ? [valueRange[0], hover] : [hover, valueRange[0]];
    var hoverRangeClassNames = getRangeClassNames(hoverRange, dateRange, "".concat(className2, "--hover"));
    classes.push.apply(classes, hoverRangeClassNames);
  }
  return classes;
}
function TileGroup(_a) {
  var className2 = _a.className, _b = _a.count, count = _b === void 0 ? 3 : _b, dateTransform = _a.dateTransform, dateType = _a.dateType, end = _a.end, hover = _a.hover, offset = _a.offset, renderTile = _a.renderTile, start = _a.start, _c = _a.step, step = _c === void 0 ? 1 : _c, value = _a.value, valueType = _a.valueType;
  var tiles = [];
  for (var point = start; point <= end; point += step) {
    var date = dateTransform(point);
    tiles.push(renderTile({
      classes: getTileClasses({
        date,
        dateType,
        hover,
        value,
        valueType
      }),
      date
    }));
  }
  return jsxRuntimeExports.jsx(Flex, { className: className2, count, offset, wrap: true, children: tiles });
}
function Tile(props) {
  var activeStartDate = props.activeStartDate, children = props.children, classes = props.classes, date = props.date, formatAbbr = props.formatAbbr, locale = props.locale, maxDate = props.maxDate, maxDateTransform = props.maxDateTransform, minDate = props.minDate, minDateTransform = props.minDateTransform, onClick = props.onClick, onMouseOver = props.onMouseOver, style = props.style, tileClassNameProps = props.tileClassName, tileContentProps = props.tileContent, tileDisabled = props.tileDisabled, view = props.view;
  var tileClassName = reactExports.useMemo(function() {
    var args = { activeStartDate, date, view };
    return typeof tileClassNameProps === "function" ? tileClassNameProps(args) : tileClassNameProps;
  }, [activeStartDate, date, tileClassNameProps, view]);
  var tileContent = reactExports.useMemo(function() {
    var args = { activeStartDate, date, view };
    return typeof tileContentProps === "function" ? tileContentProps(args) : tileContentProps;
  }, [activeStartDate, date, tileContentProps, view]);
  return jsxRuntimeExports.jsxs("button", { className: clsx(classes, tileClassName), disabled: minDate && minDateTransform(minDate) > date || maxDate && maxDateTransform(maxDate) < date || (tileDisabled === null || tileDisabled === void 0 ? void 0 : tileDisabled({ activeStartDate, date, view })), onClick: onClick ? function(event) {
    return onClick(date, event);
  } : void 0, onFocus: onMouseOver ? function() {
    return onMouseOver(date);
  } : void 0, onMouseOver: onMouseOver ? function() {
    return onMouseOver(date);
  } : void 0, style, type: "button", children: [formatAbbr ? jsxRuntimeExports.jsx("abbr", { "aria-label": formatAbbr(locale, date), children }) : children, tileContent] });
}
var __assign$j = function() {
  __assign$j = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$j.apply(this, arguments);
};
var __rest$f = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var className$5 = "react-calendar__century-view__decades__decade";
function Decade(_a) {
  var _b = _a.classes, classes = _b === void 0 ? [] : _b, currentCentury = _a.currentCentury, _c = _a.formatYear, formatYear$1 = _c === void 0 ? formatYear : _c, otherProps = __rest$f(_a, ["classes", "currentCentury", "formatYear"]);
  var date = otherProps.date, locale = otherProps.locale;
  var classesProps = [];
  if (classes) {
    classesProps.push.apply(classesProps, classes);
  }
  {
    classesProps.push(className$5);
  }
  if (getCenturyStart(date).getFullYear() !== currentCentury) {
    classesProps.push("".concat(className$5, "--neighboringCentury"));
  }
  return jsxRuntimeExports.jsx(Tile, __assign$j({}, otherProps, { classes: classesProps, maxDateTransform: getDecadeEnd, minDateTransform: getDecadeStart, view: "century", children: getDecadeLabel(locale, formatYear$1, date) }));
}
var __assign$i = function() {
  __assign$i = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$i.apply(this, arguments);
};
var __rest$e = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function Decades(props) {
  var activeStartDate = props.activeStartDate, hover = props.hover, showNeighboringCentury = props.showNeighboringCentury, value = props.value, valueType = props.valueType, otherProps = __rest$e(props, ["activeStartDate", "hover", "showNeighboringCentury", "value", "valueType"]);
  var start = getBeginOfCenturyYear(activeStartDate);
  var end = start + (showNeighboringCentury ? 119 : 99);
  return jsxRuntimeExports.jsx(TileGroup, { className: "react-calendar__century-view__decades", dateTransform: getDecadeStart, dateType: "decade", end, hover, renderTile: function(_a) {
    var date = _a.date, otherTileProps = __rest$e(_a, ["date"]);
    return jsxRuntimeExports.jsx(Decade, __assign$i({}, otherProps, otherTileProps, { activeStartDate, currentCentury: start, date }), date.getTime());
  }, start, step: 10, value, valueType });
}
var __assign$h = function() {
  __assign$h = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$h.apply(this, arguments);
};
function CenturyView(props) {
  function renderDecades() {
    return jsxRuntimeExports.jsx(Decades, __assign$h({}, props));
  }
  return jsxRuntimeExports.jsx("div", { className: "react-calendar__century-view", children: renderDecades() });
}
var __assign$g = function() {
  __assign$g = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$g.apply(this, arguments);
};
var __rest$d = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var className$4 = "react-calendar__decade-view__years__year";
function Year(_a) {
  var _b = _a.classes, classes = _b === void 0 ? [] : _b, currentDecade = _a.currentDecade, _c = _a.formatYear, formatYear$1 = _c === void 0 ? formatYear : _c, otherProps = __rest$d(_a, ["classes", "currentDecade", "formatYear"]);
  var date = otherProps.date, locale = otherProps.locale;
  var classesProps = [];
  if (classes) {
    classesProps.push.apply(classesProps, classes);
  }
  {
    classesProps.push(className$4);
  }
  if (getDecadeStart(date).getFullYear() !== currentDecade) {
    classesProps.push("".concat(className$4, "--neighboringDecade"));
  }
  return jsxRuntimeExports.jsx(Tile, __assign$g({}, otherProps, { classes: classesProps, maxDateTransform: getYearEnd, minDateTransform: getYearStart, view: "decade", children: formatYear$1(locale, date) }));
}
var __assign$f = function() {
  __assign$f = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$f.apply(this, arguments);
};
var __rest$c = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function Years(props) {
  var activeStartDate = props.activeStartDate, hover = props.hover, showNeighboringDecade = props.showNeighboringDecade, value = props.value, valueType = props.valueType, otherProps = __rest$c(props, ["activeStartDate", "hover", "showNeighboringDecade", "value", "valueType"]);
  var start = getBeginOfDecadeYear(activeStartDate);
  var end = start + (showNeighboringDecade ? 11 : 9);
  return jsxRuntimeExports.jsx(TileGroup, { className: "react-calendar__decade-view__years", dateTransform: getYearStart, dateType: "year", end, hover, renderTile: function(_a) {
    var date = _a.date, otherTileProps = __rest$c(_a, ["date"]);
    return jsxRuntimeExports.jsx(Year, __assign$f({}, otherProps, otherTileProps, { activeStartDate, currentDecade: start, date }), date.getTime());
  }, start, value, valueType });
}
var __assign$e = function() {
  __assign$e = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$e.apply(this, arguments);
};
function DecadeView(props) {
  function renderYears() {
    return jsxRuntimeExports.jsx(Years, __assign$e({}, props));
  }
  return jsxRuntimeExports.jsx("div", { className: "react-calendar__decade-view", children: renderYears() });
}
var __assign$d = function() {
  __assign$d = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$d.apply(this, arguments);
};
var __rest$b = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var __spreadArray$2 = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var className$3 = "react-calendar__year-view__months__month";
function Month(_a) {
  var _b = _a.classes, classes = _b === void 0 ? [] : _b, _c = _a.formatMonth, formatMonth2 = _c === void 0 ? formatMonth$1 : _c, _d = _a.formatMonthYear, formatMonthYear$1 = _d === void 0 ? formatMonthYear : _d, otherProps = __rest$b(_a, ["classes", "formatMonth", "formatMonthYear"]);
  var date = otherProps.date, locale = otherProps.locale;
  return jsxRuntimeExports.jsx(Tile, __assign$d({}, otherProps, { classes: __spreadArray$2(__spreadArray$2([], classes, true), [className$3], false), formatAbbr: formatMonthYear$1, maxDateTransform: getMonthEnd, minDateTransform: getMonthStart, view: "year", children: formatMonth2(locale, date) }));
}
var __assign$c = function() {
  __assign$c = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$c.apply(this, arguments);
};
var __rest$a = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function Months(props) {
  var activeStartDate = props.activeStartDate, hover = props.hover, value = props.value, valueType = props.valueType, otherProps = __rest$a(props, ["activeStartDate", "hover", "value", "valueType"]);
  var start = 0;
  var end = 11;
  var year = getYear(activeStartDate);
  return jsxRuntimeExports.jsx(TileGroup, { className: "react-calendar__year-view__months", dateTransform: function(monthIndex) {
    var date = /* @__PURE__ */ new Date();
    date.setFullYear(year, monthIndex, 1);
    return getMonthStart(date);
  }, dateType: "month", end, hover, renderTile: function(_a) {
    var date = _a.date, otherTileProps = __rest$a(_a, ["date"]);
    return jsxRuntimeExports.jsx(Month, __assign$c({}, otherProps, otherTileProps, { activeStartDate, date }), date.getTime());
  }, start, value, valueType });
}
var __assign$b = function() {
  __assign$b = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$b.apply(this, arguments);
};
function YearView(props) {
  function renderMonths() {
    return jsxRuntimeExports.jsx(Months, __assign$b({}, props));
  }
  return jsxRuntimeExports.jsx("div", { className: "react-calendar__year-view", children: renderMonths() });
}
var __assign$a = function() {
  __assign$a = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$a.apply(this, arguments);
};
var __rest$9 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var className$2 = "react-calendar__month-view__days__day";
function Day(_a) {
  var calendarType = _a.calendarType, _b = _a.classes, classes = _b === void 0 ? [] : _b, currentMonthIndex = _a.currentMonthIndex, _c = _a.formatDay, formatDay$1 = _c === void 0 ? formatDay : _c, _d = _a.formatLongDate, formatLongDate$1 = _d === void 0 ? formatLongDate : _d, otherProps = __rest$9(_a, ["calendarType", "classes", "currentMonthIndex", "formatDay", "formatLongDate"]);
  var date = otherProps.date, locale = otherProps.locale;
  var classesProps = [];
  if (classes) {
    classesProps.push.apply(classesProps, classes);
  }
  {
    classesProps.push(className$2);
  }
  if (isWeekend(date, calendarType)) {
    classesProps.push("".concat(className$2, "--weekend"));
  }
  if (date.getMonth() !== currentMonthIndex) {
    classesProps.push("".concat(className$2, "--neighboringMonth"));
  }
  return jsxRuntimeExports.jsx(Tile, __assign$a({}, otherProps, { classes: classesProps, formatAbbr: formatLongDate$1, maxDateTransform: getDayEnd, minDateTransform: getDayStart, view: "month", children: formatDay$1(locale, date) }));
}
var __assign$9 = function() {
  __assign$9 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$9.apply(this, arguments);
};
var __rest$8 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function Days(props) {
  var activeStartDate = props.activeStartDate, calendarType = props.calendarType, hover = props.hover, showFixedNumberOfWeeks = props.showFixedNumberOfWeeks, showNeighboringMonth = props.showNeighboringMonth, value = props.value, valueType = props.valueType, otherProps = __rest$8(props, ["activeStartDate", "calendarType", "hover", "showFixedNumberOfWeeks", "showNeighboringMonth", "value", "valueType"]);
  var year = getYear(activeStartDate);
  var monthIndex = getMonth(activeStartDate);
  var hasFixedNumberOfWeeks = showFixedNumberOfWeeks || showNeighboringMonth;
  var dayOfWeek = getDayOfWeek(activeStartDate, calendarType);
  var offset = hasFixedNumberOfWeeks ? 0 : dayOfWeek;
  var start = (hasFixedNumberOfWeeks ? -dayOfWeek : 0) + 1;
  var end = function() {
    if (showFixedNumberOfWeeks) {
      return start + 6 * 7 - 1;
    }
    var daysInMonth = getDaysInMonth(activeStartDate);
    if (showNeighboringMonth) {
      var activeEndDate = /* @__PURE__ */ new Date();
      activeEndDate.setFullYear(year, monthIndex, daysInMonth);
      activeEndDate.setHours(0, 0, 0, 0);
      var daysUntilEndOfTheWeek = 7 - getDayOfWeek(activeEndDate, calendarType) - 1;
      return daysInMonth + daysUntilEndOfTheWeek;
    }
    return daysInMonth;
  }();
  return jsxRuntimeExports.jsx(TileGroup, { className: "react-calendar__month-view__days", count: 7, dateTransform: function(day) {
    var date = /* @__PURE__ */ new Date();
    date.setFullYear(year, monthIndex, day);
    return getDayStart(date);
  }, dateType: "day", hover, end, renderTile: function(_a) {
    var date = _a.date, otherTileProps = __rest$8(_a, ["date"]);
    return jsxRuntimeExports.jsx(Day, __assign$9({}, otherProps, otherTileProps, { activeStartDate, calendarType, currentMonthIndex: monthIndex, date }), date.getTime());
  }, offset, start, value, valueType });
}
var className$1 = "react-calendar__month-view__weekdays";
var weekdayClassName = "".concat(className$1, "__weekday");
function Weekdays(props) {
  var calendarType = props.calendarType, _a = props.formatShortWeekday, formatShortWeekday$1 = _a === void 0 ? formatShortWeekday : _a, _b = props.formatWeekday, formatWeekday$1 = _b === void 0 ? formatWeekday : _b, locale = props.locale, onMouseLeave = props.onMouseLeave;
  var anyDate = /* @__PURE__ */ new Date();
  var beginOfMonth = getMonthStart(anyDate);
  var year = getYear(beginOfMonth);
  var monthIndex = getMonth(beginOfMonth);
  var weekdays = [];
  for (var weekday = 1; weekday <= 7; weekday += 1) {
    var weekdayDate = new Date(year, monthIndex, weekday - getDayOfWeek(beginOfMonth, calendarType));
    var abbr = formatWeekday$1(locale, weekdayDate);
    weekdays.push(jsxRuntimeExports.jsx("div", { className: clsx(weekdayClassName, isCurrentDayOfWeek(weekdayDate) && "".concat(weekdayClassName, "--current"), isWeekend(weekdayDate, calendarType) && "".concat(weekdayClassName, "--weekend")), children: jsxRuntimeExports.jsx("abbr", { "aria-label": abbr, title: abbr, children: formatShortWeekday$1(locale, weekdayDate).replace(".", "") }) }, weekday));
  }
  return jsxRuntimeExports.jsx(Flex, { className: className$1, count: 7, onFocus: onMouseLeave, onMouseOver: onMouseLeave, children: weekdays });
}
var __assign$8 = function() {
  __assign$8 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$8.apply(this, arguments);
};
var __rest$7 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var className = "react-calendar__tile";
function WeekNumber(props) {
  var onClickWeekNumber = props.onClickWeekNumber, weekNumber = props.weekNumber;
  var children = jsxRuntimeExports.jsx("span", { children: weekNumber });
  if (onClickWeekNumber) {
    var date_1 = props.date, onClickWeekNumber_1 = props.onClickWeekNumber, weekNumber_1 = props.weekNumber, otherProps = __rest$7(props, ["date", "onClickWeekNumber", "weekNumber"]);
    return jsxRuntimeExports.jsx("button", __assign$8({}, otherProps, { className, onClick: function(event) {
      return onClickWeekNumber_1(weekNumber_1, date_1, event);
    }, type: "button", children }));
  } else {
    props.date;
    props.onClickWeekNumber;
    props.weekNumber;
    var otherProps = __rest$7(props, ["date", "onClickWeekNumber", "weekNumber"]);
    return jsxRuntimeExports.jsx("div", __assign$8({}, otherProps, { className, children }));
  }
}
function WeekNumbers(props) {
  var activeStartDate = props.activeStartDate, calendarType = props.calendarType, onClickWeekNumber = props.onClickWeekNumber, onMouseLeave = props.onMouseLeave, showFixedNumberOfWeeks = props.showFixedNumberOfWeeks;
  var numberOfWeeks = function() {
    if (showFixedNumberOfWeeks) {
      return 6;
    }
    var numberOfDays = getDaysInMonth(activeStartDate);
    var startWeekday = getDayOfWeek(activeStartDate, calendarType);
    var days = numberOfDays - (7 - startWeekday);
    return 1 + Math.ceil(days / 7);
  }();
  var dates = function() {
    var year = getYear(activeStartDate);
    var monthIndex = getMonth(activeStartDate);
    var day = getDate(activeStartDate);
    var result2 = [];
    for (var index = 0; index < numberOfWeeks; index += 1) {
      result2.push(getBeginOfWeek(new Date(year, monthIndex, day + index * 7), calendarType));
    }
    return result2;
  }();
  var weekNumbers = dates.map(function(date) {
    return getWeekNumber(date, calendarType);
  });
  return jsxRuntimeExports.jsx(Flex, { className: "react-calendar__month-view__weekNumbers", count: numberOfWeeks, direction: "column", onFocus: onMouseLeave, onMouseOver: onMouseLeave, style: { flexBasis: "calc(100% * (1 / 8)", flexShrink: 0 }, children: weekNumbers.map(function(weekNumber, weekIndex) {
    var date = dates[weekIndex];
    if (!date) {
      throw new Error("date is not defined");
    }
    return jsxRuntimeExports.jsx(WeekNumber, { date, onClickWeekNumber, weekNumber }, weekNumber);
  }) });
}
var __assign$7 = function() {
  __assign$7 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$7.apply(this, arguments);
};
var __rest$6 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function getCalendarTypeFromLocale(locale) {
  if (locale) {
    for (var _i = 0, _a = Object.entries(CALENDAR_TYPE_LOCALES); _i < _a.length; _i++) {
      var _b = _a[_i], calendarType = _b[0], locales = _b[1];
      if (locales.includes(locale)) {
        return calendarType;
      }
    }
  }
  return CALENDAR_TYPES.ISO_8601;
}
function MonthView(props) {
  var activeStartDate = props.activeStartDate, locale = props.locale, onMouseLeave = props.onMouseLeave, showFixedNumberOfWeeks = props.showFixedNumberOfWeeks;
  var _a = props.calendarType, calendarType = _a === void 0 ? getCalendarTypeFromLocale(locale) : _a, formatShortWeekday2 = props.formatShortWeekday, formatWeekday2 = props.formatWeekday, onClickWeekNumber = props.onClickWeekNumber, showWeekNumbers = props.showWeekNumbers, childProps = __rest$6(props, ["calendarType", "formatShortWeekday", "formatWeekday", "onClickWeekNumber", "showWeekNumbers"]);
  function renderWeekdays() {
    return jsxRuntimeExports.jsx(Weekdays, { calendarType, formatShortWeekday: formatShortWeekday2, formatWeekday: formatWeekday2, locale, onMouseLeave });
  }
  function renderWeekNumbers() {
    if (!showWeekNumbers) {
      return null;
    }
    return jsxRuntimeExports.jsx(WeekNumbers, { activeStartDate, calendarType, onClickWeekNumber, onMouseLeave, showFixedNumberOfWeeks });
  }
  function renderDays() {
    return jsxRuntimeExports.jsx(Days, __assign$7({ calendarType }, childProps));
  }
  var className2 = "react-calendar__month-view";
  return jsxRuntimeExports.jsx("div", { className: clsx(className2, showWeekNumbers ? "".concat(className2, "--weekNumbers") : ""), children: jsxRuntimeExports.jsxs("div", { style: {
    display: "flex",
    alignItems: "flex-end"
  }, children: [renderWeekNumbers(), jsxRuntimeExports.jsxs("div", { style: {
    flexGrow: 1,
    width: "100%"
  }, children: [renderWeekdays(), renderDays()] })] }) });
}
var __assign$6 = function() {
  __assign$6 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$6.apply(this, arguments);
};
var baseClassName$1 = "react-calendar";
var allViews$1 = ["century", "decade", "year", "month"];
var allValueTypes$1 = ["decade", "year", "month", "day"];
var defaultMinDate$1 = /* @__PURE__ */ new Date();
defaultMinDate$1.setFullYear(1, 0, 1);
defaultMinDate$1.setHours(0, 0, 0, 0);
var defaultMaxDate$1 = /* @__PURE__ */ new Date(864e13);
function toDate$1(value) {
  if (value instanceof Date) {
    return value;
  }
  return new Date(value);
}
function getLimitedViews(minDetail, maxDetail) {
  return allViews$1.slice(allViews$1.indexOf(minDetail), allViews$1.indexOf(maxDetail) + 1);
}
function isViewAllowed(view, minDetail, maxDetail) {
  var views = getLimitedViews(minDetail, maxDetail);
  return views.indexOf(view) !== -1;
}
function getView(view, minDetail, maxDetail) {
  if (!view) {
    return maxDetail;
  }
  if (isViewAllowed(view, minDetail, maxDetail)) {
    return view;
  }
  return maxDetail;
}
function getValueType$1(view) {
  var index = allViews$1.indexOf(view);
  return allValueTypes$1[index];
}
function getValue$1(value, index) {
  var rawValue = Array.isArray(value) ? value[index] : value;
  if (!rawValue) {
    return null;
  }
  var valueDate = toDate$1(rawValue);
  if (Number.isNaN(valueDate.getTime())) {
    throw new Error("Invalid date: ".concat(value));
  }
  return valueDate;
}
function getDetailValue$1(_a, index) {
  var value = _a.value, minDate = _a.minDate, maxDate = _a.maxDate, maxDetail = _a.maxDetail;
  var valuePiece = getValue$1(value, index);
  if (!valuePiece) {
    return null;
  }
  var valueType = getValueType$1(maxDetail);
  var detailValueFrom = function() {
    switch (index) {
      case 0:
        return getBegin$1(valueType, valuePiece);
      case 1:
        return getEnd$1(valueType, valuePiece);
      default:
        throw new Error("Invalid index value: ".concat(index));
    }
  }();
  return between$1(detailValueFrom, minDate, maxDate);
}
var getDetailValueFrom$1 = function(args) {
  return getDetailValue$1(args, 0);
};
var getDetailValueTo$1 = function(args) {
  return getDetailValue$1(args, 1);
};
var getDetailValueArray$1 = function(args) {
  return [getDetailValueFrom$1, getDetailValueTo$1].map(function(fn) {
    return fn(args);
  });
};
function getActiveStartDate(_a) {
  var maxDate = _a.maxDate, maxDetail = _a.maxDetail, minDate = _a.minDate, minDetail = _a.minDetail, value = _a.value, view = _a.view;
  var rangeType = getView(view, minDetail, maxDetail);
  var valueFrom = getDetailValueFrom$1({
    value,
    minDate,
    maxDate,
    maxDetail
  }) || /* @__PURE__ */ new Date();
  return getBegin$1(rangeType, valueFrom);
}
function getInitialActiveStartDate(_a) {
  var activeStartDate = _a.activeStartDate, defaultActiveStartDate = _a.defaultActiveStartDate, defaultValue = _a.defaultValue, defaultView = _a.defaultView, maxDate = _a.maxDate, maxDetail = _a.maxDetail, minDate = _a.minDate, minDetail = _a.minDetail, value = _a.value, view = _a.view;
  var rangeType = getView(view, minDetail, maxDetail);
  var valueFrom = activeStartDate || defaultActiveStartDate;
  if (valueFrom) {
    return getBegin$1(rangeType, valueFrom);
  }
  return getActiveStartDate({
    maxDate,
    maxDetail,
    minDate,
    minDetail,
    value: value || defaultValue,
    view: view || defaultView
  });
}
function getIsSingleValue(value) {
  return value && (!Array.isArray(value) || value.length === 1);
}
function areDatesEqual(date1, date2) {
  return date1 instanceof Date && date2 instanceof Date && date1.getTime() === date2.getTime();
}
var Calendar = reactExports.forwardRef(function Calendar2(props, ref) {
  var activeStartDateProps = props.activeStartDate, allowPartialRange = props.allowPartialRange, calendarType = props.calendarType, className2 = props.className, defaultActiveStartDate = props.defaultActiveStartDate, defaultValue = props.defaultValue, defaultView = props.defaultView, formatDay2 = props.formatDay, formatLongDate2 = props.formatLongDate, formatMonth2 = props.formatMonth, formatMonthYear2 = props.formatMonthYear, formatShortWeekday2 = props.formatShortWeekday, formatWeekday2 = props.formatWeekday, formatYear2 = props.formatYear, _a = props.goToRangeStartOnSelect, goToRangeStartOnSelect = _a === void 0 ? true : _a, inputRef = props.inputRef, locale = props.locale, _b = props.maxDate, maxDate = _b === void 0 ? defaultMaxDate$1 : _b, _c = props.maxDetail, maxDetail = _c === void 0 ? "month" : _c, _d = props.minDate, minDate = _d === void 0 ? defaultMinDate$1 : _d, _e = props.minDetail, minDetail = _e === void 0 ? "century" : _e, navigationAriaLabel = props.navigationAriaLabel, navigationAriaLive = props.navigationAriaLive, navigationLabel = props.navigationLabel, next2AriaLabel = props.next2AriaLabel, next2Label = props.next2Label, nextAriaLabel = props.nextAriaLabel, nextLabel = props.nextLabel, onActiveStartDateChange = props.onActiveStartDateChange, onChangeProps = props.onChange, onClickDay = props.onClickDay, onClickDecade = props.onClickDecade, onClickMonth = props.onClickMonth, onClickWeekNumber = props.onClickWeekNumber, onClickYear = props.onClickYear, onDrillDown = props.onDrillDown, onDrillUp = props.onDrillUp, onViewChange = props.onViewChange, prev2AriaLabel = props.prev2AriaLabel, prev2Label = props.prev2Label, prevAriaLabel = props.prevAriaLabel, prevLabel = props.prevLabel, _f = props.returnValue, returnValue = _f === void 0 ? "start" : _f, selectRange = props.selectRange, showDoubleView = props.showDoubleView, showFixedNumberOfWeeks = props.showFixedNumberOfWeeks, _g = props.showNavigation, showNavigation = _g === void 0 ? true : _g, showNeighboringCentury = props.showNeighboringCentury, showNeighboringDecade = props.showNeighboringDecade, _h = props.showNeighboringMonth, showNeighboringMonth = _h === void 0 ? true : _h, showWeekNumbers = props.showWeekNumbers, tileClassName = props.tileClassName, tileContent = props.tileContent, tileDisabled = props.tileDisabled, valueProps = props.value, viewProps = props.view;
  var _j = reactExports.useState(defaultActiveStartDate), activeStartDateState = _j[0], setActiveStartDateState = _j[1];
  var _k = reactExports.useState(null), hoverState = _k[0], setHoverState = _k[1];
  var _l = reactExports.useState(Array.isArray(defaultValue) ? defaultValue.map(function(el) {
    return el !== null ? toDate$1(el) : null;
  }) : defaultValue !== null && defaultValue !== void 0 ? toDate$1(defaultValue) : null), valueState = _l[0], setValueState = _l[1];
  var _m = reactExports.useState(defaultView), viewState = _m[0], setViewState = _m[1];
  var activeStartDate = activeStartDateProps || activeStartDateState || getInitialActiveStartDate({
    activeStartDate: activeStartDateProps,
    defaultActiveStartDate,
    defaultValue,
    defaultView,
    maxDate,
    maxDetail,
    minDate,
    minDetail,
    value: valueProps,
    view: viewProps
  });
  var value = function() {
    var rawValue = function() {
      if (selectRange && getIsSingleValue(valueState)) {
        return valueState;
      }
      return valueProps !== void 0 ? valueProps : valueState;
    }();
    if (!rawValue) {
      return null;
    }
    return Array.isArray(rawValue) ? rawValue.map(function(el) {
      return el !== null ? toDate$1(el) : null;
    }) : rawValue !== null ? toDate$1(rawValue) : null;
  }();
  var valueType = getValueType$1(maxDetail);
  var view = getView(viewProps || viewState, minDetail, maxDetail);
  var views = getLimitedViews(minDetail, maxDetail);
  var hover = selectRange ? hoverState : null;
  var drillDownAvailable = views.indexOf(view) < views.length - 1;
  var drillUpAvailable = views.indexOf(view) > 0;
  var getProcessedValue = reactExports.useCallback(function(value2) {
    var processFunction = function() {
      switch (returnValue) {
        case "start":
          return getDetailValueFrom$1;
        case "end":
          return getDetailValueTo$1;
        case "range":
          return getDetailValueArray$1;
        default:
          throw new Error("Invalid returnValue.");
      }
    }();
    return processFunction({
      maxDate,
      maxDetail,
      minDate,
      value: value2
    });
  }, [maxDate, maxDetail, minDate, returnValue]);
  var setActiveStartDate = reactExports.useCallback(function(nextActiveStartDate, action) {
    setActiveStartDateState(nextActiveStartDate);
    var args = {
      action,
      activeStartDate: nextActiveStartDate,
      value,
      view
    };
    if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
      onActiveStartDateChange(args);
    }
  }, [activeStartDate, onActiveStartDateChange, value, view]);
  var onClickTile = reactExports.useCallback(function(value2, event) {
    var callback = function() {
      switch (view) {
        case "century":
          return onClickDecade;
        case "decade":
          return onClickYear;
        case "year":
          return onClickMonth;
        case "month":
          return onClickDay;
        default:
          throw new Error("Invalid view: ".concat(view, "."));
      }
    }();
    if (callback)
      callback(value2, event);
  }, [onClickDay, onClickDecade, onClickMonth, onClickYear, view]);
  var drillDown = reactExports.useCallback(function(nextActiveStartDate, event) {
    if (!drillDownAvailable) {
      return;
    }
    onClickTile(nextActiveStartDate, event);
    var nextView = views[views.indexOf(view) + 1];
    if (!nextView) {
      throw new Error("Attempted to drill down from the lowest view.");
    }
    setActiveStartDateState(nextActiveStartDate);
    setViewState(nextView);
    var args = {
      action: "drillDown",
      activeStartDate: nextActiveStartDate,
      value,
      view: nextView
    };
    if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
      onActiveStartDateChange(args);
    }
    if (onViewChange && view !== nextView) {
      onViewChange(args);
    }
    if (onDrillDown) {
      onDrillDown(args);
    }
  }, [
    activeStartDate,
    drillDownAvailable,
    onActiveStartDateChange,
    onClickTile,
    onDrillDown,
    onViewChange,
    value,
    view,
    views
  ]);
  var drillUp = reactExports.useCallback(function() {
    if (!drillUpAvailable) {
      return;
    }
    var nextView = views[views.indexOf(view) - 1];
    if (!nextView) {
      throw new Error("Attempted to drill up from the highest view.");
    }
    var nextActiveStartDate = getBegin$1(nextView, activeStartDate);
    setActiveStartDateState(nextActiveStartDate);
    setViewState(nextView);
    var args = {
      action: "drillUp",
      activeStartDate: nextActiveStartDate,
      value,
      view: nextView
    };
    if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
      onActiveStartDateChange(args);
    }
    if (onViewChange && view !== nextView) {
      onViewChange(args);
    }
    if (onDrillUp) {
      onDrillUp(args);
    }
  }, [
    activeStartDate,
    drillUpAvailable,
    onActiveStartDateChange,
    onDrillUp,
    onViewChange,
    value,
    view,
    views
  ]);
  var onChange2 = reactExports.useCallback(function(rawNextValue, event) {
    var previousValue = value;
    onClickTile(rawNextValue, event);
    var isFirstValueInRange = selectRange && !getIsSingleValue(previousValue);
    var nextValue;
    if (selectRange) {
      if (isFirstValueInRange) {
        nextValue = getBegin$1(valueType, rawNextValue);
      } else {
        if (!previousValue) {
          throw new Error("previousValue is required");
        }
        if (Array.isArray(previousValue)) {
          throw new Error("previousValue must not be an array");
        }
        nextValue = getValueRange(valueType, previousValue, rawNextValue);
      }
    } else {
      nextValue = getProcessedValue(rawNextValue);
    }
    var nextActiveStartDate = (
      // Range selection turned off
      !selectRange || // Range selection turned on, first value
      isFirstValueInRange || // Range selection turned on, second value, goToRangeStartOnSelect toggled on
      goToRangeStartOnSelect ? getActiveStartDate({
        maxDate,
        maxDetail,
        minDate,
        minDetail,
        value: nextValue,
        view
      }) : null
    );
    event.persist();
    setActiveStartDateState(nextActiveStartDate);
    setValueState(nextValue);
    var args = {
      action: "onChange",
      activeStartDate: nextActiveStartDate,
      value: nextValue,
      view
    };
    if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
      onActiveStartDateChange(args);
    }
    if (onChangeProps) {
      if (selectRange) {
        var isSingleValue = getIsSingleValue(nextValue);
        if (!isSingleValue) {
          onChangeProps(nextValue || null, event);
        } else if (allowPartialRange) {
          if (Array.isArray(nextValue)) {
            throw new Error("value must not be an array");
          }
          onChangeProps([nextValue || null, null], event);
        }
      } else {
        onChangeProps(nextValue || null, event);
      }
    }
  }, [
    activeStartDate,
    allowPartialRange,
    getProcessedValue,
    goToRangeStartOnSelect,
    maxDate,
    maxDetail,
    minDate,
    minDetail,
    onActiveStartDateChange,
    onChangeProps,
    onClickTile,
    selectRange,
    value,
    valueType,
    view
  ]);
  function onMouseOver(nextHover) {
    setHoverState(nextHover);
  }
  function onMouseLeave() {
    setHoverState(null);
  }
  reactExports.useImperativeHandle(ref, function() {
    return {
      activeStartDate,
      drillDown,
      drillUp,
      onChange: onChange2,
      setActiveStartDate,
      value,
      view
    };
  }, [activeStartDate, drillDown, drillUp, onChange2, setActiveStartDate, value, view]);
  function renderContent(next) {
    var currentActiveStartDate = next ? getBeginNext(view, activeStartDate) : getBegin$1(view, activeStartDate);
    var onClick = drillDownAvailable ? drillDown : onChange2;
    var commonProps = {
      activeStartDate: currentActiveStartDate,
      hover,
      locale,
      maxDate,
      minDate,
      onClick,
      onMouseOver: selectRange ? onMouseOver : void 0,
      tileClassName,
      tileContent,
      tileDisabled,
      value,
      valueType
    };
    switch (view) {
      case "century": {
        return jsxRuntimeExports.jsx(CenturyView, __assign$6({ formatYear: formatYear2, showNeighboringCentury }, commonProps));
      }
      case "decade": {
        return jsxRuntimeExports.jsx(DecadeView, __assign$6({ formatYear: formatYear2, showNeighboringDecade }, commonProps));
      }
      case "year": {
        return jsxRuntimeExports.jsx(YearView, __assign$6({ formatMonth: formatMonth2, formatMonthYear: formatMonthYear2 }, commonProps));
      }
      case "month": {
        return jsxRuntimeExports.jsx(MonthView, __assign$6({ calendarType, formatDay: formatDay2, formatLongDate: formatLongDate2, formatShortWeekday: formatShortWeekday2, formatWeekday: formatWeekday2, onClickWeekNumber, onMouseLeave: selectRange ? onMouseLeave : void 0, showFixedNumberOfWeeks: typeof showFixedNumberOfWeeks !== "undefined" ? showFixedNumberOfWeeks : showDoubleView, showNeighboringMonth, showWeekNumbers }, commonProps));
      }
      default:
        throw new Error("Invalid view: ".concat(view, "."));
    }
  }
  function renderNavigation() {
    if (!showNavigation) {
      return null;
    }
    return jsxRuntimeExports.jsx(Navigation, { activeStartDate, drillUp, formatMonthYear: formatMonthYear2, formatYear: formatYear2, locale, maxDate, minDate, navigationAriaLabel, navigationAriaLive, navigationLabel, next2AriaLabel, next2Label, nextAriaLabel, nextLabel, prev2AriaLabel, prev2Label, prevAriaLabel, prevLabel, setActiveStartDate, showDoubleView, view, views });
  }
  var valueArray = Array.isArray(value) ? value : [value];
  return jsxRuntimeExports.jsxs("div", { className: clsx(baseClassName$1, selectRange && valueArray.length === 1 && "".concat(baseClassName$1, "--selectRange"), showDoubleView && "".concat(baseClassName$1, "--doubleView"), className2), ref: inputRef, children: [renderNavigation(), jsxRuntimeExports.jsxs("div", { className: "".concat(baseClassName$1, "__viewContainer"), onBlur: selectRange ? onMouseLeave : void 0, onMouseLeave: selectRange ? onMouseLeave : void 0, children: [renderContent(), showDoubleView ? renderContent(true) : null] })] });
});
function getRect(element) {
  return element.getBoundingClientRect();
}
function detectElementOverflow(element, container) {
  return {
    get collidedTop() {
      return getRect(element).top < getRect(container).top;
    },
    get collidedBottom() {
      return getRect(element).bottom > getRect(container).bottom;
    },
    get collidedLeft() {
      return getRect(element).left < getRect(container).left;
    },
    get collidedRight() {
      return getRect(element).right > getRect(container).right;
    },
    get overflowTop() {
      return getRect(container).top - getRect(element).top;
    },
    get overflowBottom() {
      return getRect(element).bottom - getRect(container).bottom;
    },
    get overflowLeft() {
      return getRect(container).left - getRect(element).left;
    },
    get overflowRight() {
      return getRect(element).right - getRect(container).right;
    }
  };
}
var __DEV__ = process.env.NODE_ENV !== "production";
var warning = function() {
};
if (__DEV__) {
  var printWarning = function printWarning2(format2, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = "Warning: " + format2.replace(/%s/g, function() {
      return args[argIndex++];
    });
    if (typeof console !== "undefined") {
      console.error(message);
    }
    try {
      throw new Error(message);
    } catch (x) {
    }
  };
  warning = function(condition, format2, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format2 === void 0) {
      throw new Error(
        "`warning(condition, format, ...args)` requires a warning message argument"
      );
    }
    if (!condition) {
      printWarning.apply(null, [format2].concat(args));
    }
  };
}
var warning_1 = warning;
const warning$1 = /* @__PURE__ */ getDefaultExportFromCjs(warning_1);
var __assign$5 = function() {
  __assign$5 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$5.apply(this, arguments);
};
var __rest$5 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var isBrowser$2 = typeof document !== "undefined";
var isMutationObserverSupported = isBrowser$2 && "MutationObserver" in window;
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function findScrollContainer(element) {
  var parent = element.parentElement;
  while (parent) {
    var overflow = window.getComputedStyle(parent).overflow;
    if (overflow.split(" ").every(function(o) {
      return o === "auto" || o === "scroll";
    })) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return document.documentElement;
}
function alignAxis(_a) {
  var axis = _a.axis, container = _a.container, element = _a.element, invertAxis = _a.invertAxis, scrollContainer = _a.scrollContainer, secondary = _a.secondary, spacing = _a.spacing;
  var style = window.getComputedStyle(element);
  var parent = container.parentElement;
  if (!parent) {
    return;
  }
  var scrollContainerCollisions = detectElementOverflow(parent, scrollContainer);
  var documentCollisions = detectElementOverflow(parent, document.documentElement);
  var isX = axis === "x";
  var startProperty = isX ? "left" : "top";
  var endProperty = isX ? "right" : "bottom";
  var sizeProperty = isX ? "width" : "height";
  var overflowStartProperty = "overflow".concat(capitalize(startProperty));
  var overflowEndProperty = "overflow".concat(capitalize(endProperty));
  var scrollProperty = "scroll".concat(capitalize(startProperty));
  var uppercasedSizeProperty = capitalize(sizeProperty);
  var offsetSizeProperty = "offset".concat(uppercasedSizeProperty);
  var clientSizeProperty = "client".concat(uppercasedSizeProperty);
  var minSizeProperty = "min-".concat(sizeProperty);
  var scrollbarWidth = scrollContainer[offsetSizeProperty] - scrollContainer[clientSizeProperty];
  var startSpacing = typeof spacing === "object" ? spacing[startProperty] : spacing;
  var availableStartSpace = -Math.max(scrollContainerCollisions[overflowStartProperty], documentCollisions[overflowStartProperty] + document.documentElement[scrollProperty]) - startSpacing;
  var endSpacing = typeof spacing === "object" ? spacing[endProperty] : spacing;
  var availableEndSpace = -Math.max(scrollContainerCollisions[overflowEndProperty], documentCollisions[overflowEndProperty] - document.documentElement[scrollProperty]) - endSpacing - scrollbarWidth;
  if (secondary) {
    availableStartSpace += parent[clientSizeProperty];
    availableEndSpace += parent[clientSizeProperty];
  }
  var offsetSize = element[offsetSizeProperty];
  function displayStart() {
    element.style[startProperty] = "auto";
    element.style[endProperty] = secondary ? "0" : "100%";
  }
  function displayEnd() {
    element.style[startProperty] = secondary ? "0" : "100%";
    element.style[endProperty] = "auto";
  }
  function displayIfFits(availableSpace, display) {
    var fits2 = offsetSize <= availableSpace;
    if (fits2) {
      display();
    }
    return fits2;
  }
  function displayStartIfFits() {
    return displayIfFits(availableStartSpace, displayStart);
  }
  function displayEndIfFits() {
    return displayIfFits(availableEndSpace, displayEnd);
  }
  function displayWhereverShrinkedFits() {
    var moreSpaceStart = availableStartSpace > availableEndSpace;
    var rawMinSize = style.getPropertyValue(minSizeProperty);
    var minSize = rawMinSize ? parseInt(rawMinSize, 10) : null;
    function shrinkToSize(size) {
      warning$1(!minSize || size >= minSize, "<Fit />'s child will not fit anywhere with its current ".concat(minSizeProperty, " of ").concat(minSize, "px."));
      var newSize = Math.max(size, minSize || 0);
      warning$1(false, "<Fit />'s child needed to have its ".concat(sizeProperty, " decreased to ").concat(newSize, "px."));
      element.style[sizeProperty] = "".concat(newSize, "px");
    }
    if (moreSpaceStart) {
      shrinkToSize(availableStartSpace);
      displayStart();
    } else {
      shrinkToSize(availableEndSpace);
      displayEnd();
    }
  }
  var fits;
  if (invertAxis) {
    fits = displayStartIfFits() || displayEndIfFits();
  } else {
    fits = displayEndIfFits() || displayStartIfFits();
  }
  if (!fits) {
    displayWhereverShrinkedFits();
  }
}
function alignMainAxis(args) {
  alignAxis(args);
}
function alignSecondaryAxis(args) {
  alignAxis(__assign$5(__assign$5({}, args), { axis: args.axis === "x" ? "y" : "x", secondary: true }));
}
function alignBothAxis(args) {
  var invertAxis = args.invertAxis, invertSecondaryAxis = args.invertSecondaryAxis, commonArgs = __rest$5(args, ["invertAxis", "invertSecondaryAxis"]);
  alignMainAxis(__assign$5(__assign$5({}, commonArgs), { invertAxis }));
  alignSecondaryAxis(__assign$5(__assign$5({}, commonArgs), { invertAxis: invertSecondaryAxis }));
}
function Fit(_a) {
  var children = _a.children, invertAxis = _a.invertAxis, invertSecondaryAxis = _a.invertSecondaryAxis, _b = _a.mainAxis, mainAxis = _b === void 0 ? "y" : _b, _c = _a.spacing, spacing = _c === void 0 ? 8 : _c;
  var container = reactExports.useRef(void 0);
  var element = reactExports.useRef(void 0);
  var elementWidth = reactExports.useRef(void 0);
  var elementHeight = reactExports.useRef(void 0);
  var scrollContainer = reactExports.useRef(void 0);
  var fit = reactExports.useCallback(function() {
    if (!scrollContainer.current || !container.current || !element.current) {
      return;
    }
    var currentElementWidth = element.current.clientWidth;
    var currentElementHeight = element.current.clientHeight;
    if (elementWidth.current === currentElementWidth && elementHeight.current === currentElementHeight) {
      return;
    }
    elementWidth.current = currentElementWidth;
    elementHeight.current = currentElementHeight;
    var parent = container.current.parentElement;
    if (!parent) {
      return;
    }
    var style = window.getComputedStyle(element.current);
    var position = style.position;
    if (position !== "absolute") {
      element.current.style.position = "absolute";
    }
    var parentStyle = window.getComputedStyle(parent);
    var parentPosition = parentStyle.position;
    if (parentPosition !== "relative" && parentPosition !== "absolute") {
      parent.style.position = "relative";
    }
    alignBothAxis({
      axis: mainAxis,
      container: container.current,
      element: element.current,
      invertAxis,
      invertSecondaryAxis,
      scrollContainer: scrollContainer.current,
      spacing
    });
  }, [invertAxis, invertSecondaryAxis, mainAxis, spacing]);
  var child = reactExports.Children.only(children);
  reactExports.useEffect(function() {
    fit();
    function onMutation() {
      fit();
    }
    if (isMutationObserverSupported && element.current) {
      var mutationObserver = new MutationObserver(onMutation);
      mutationObserver.observe(element.current, {
        attributes: true,
        attributeFilter: ["class", "style"]
      });
    }
  }, [fit]);
  function assignRefs(domElement) {
    if (!domElement || !(domElement instanceof HTMLElement)) {
      return;
    }
    element.current = domElement;
    scrollContainer.current = findScrollContainer(domElement);
  }
  return jsxRuntimeExports.jsx("span", { ref: function(domContainer) {
    if (!domContainer) {
      return;
    }
    container.current = domContainer;
    var domElement = domContainer === null || domContainer === void 0 ? void 0 : domContainer.firstElementChild;
    assignRefs(domElement);
  }, style: { display: "contents" }, children: child });
}
function Divider(_a) {
  var children = _a.children;
  return jsxRuntimeExports.jsx("span", { className: "react-date-picker__inputGroup__divider", children });
}
var allowedVariants = ["normal", "small-caps"];
function getFontShorthand(element) {
  if (!element) {
    return "";
  }
  var style = window.getComputedStyle(element);
  if (style.font) {
    return style.font;
  }
  var isFontDefined = style.fontFamily !== "";
  if (!isFontDefined) {
    return "";
  }
  var fontVariant = allowedVariants.includes(style.fontVariant) ? style.fontVariant : "normal";
  return "".concat(style.fontStyle, " ").concat(fontVariant, " ").concat(style.fontWeight, " ").concat(style.fontSize, " / ").concat(style.lineHeight, " ").concat(style.fontFamily);
}
var cachedCanvas;
function measureText(text, font) {
  var canvas = cachedCanvas || (cachedCanvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  if (!context) {
    return null;
  }
  context.font = font;
  var width = context.measureText(text).width;
  return Math.ceil(width);
}
function updateInputWidth(element) {
  if (typeof document === "undefined" || !element) {
    return null;
  }
  var font = getFontShorthand(element);
  var text = element.value || element.placeholder;
  var width = measureText(text, font);
  if (width === null) {
    return null;
  }
  element.style.width = "".concat(width, "px");
  return width;
}
var isBrowser$1 = typeof document !== "undefined";
var useIsomorphicLayoutEffect = isBrowser$1 ? reactExports.useLayoutEffect : reactExports.useEffect;
var isIEOrEdgeLegacy = isBrowser$1 && /(MSIE|Trident\/|Edge\/)/.test(navigator.userAgent);
var isFirefox = isBrowser$1 && /Firefox/.test(navigator.userAgent);
function onFocus(event) {
  var target = event.target;
  if (isIEOrEdgeLegacy) {
    requestAnimationFrame(function() {
      return target.select();
    });
  } else {
    target.select();
  }
}
function updateInputWidthOnLoad(element) {
  if (document.readyState === "complete") {
    return;
  }
  function onLoad() {
    updateInputWidth(element);
  }
  window.addEventListener("load", onLoad);
}
function updateInputWidthOnFontLoad(element) {
  if (!document.fonts) {
    return;
  }
  var font = getFontShorthand(element);
  if (!font) {
    return;
  }
  var isFontLoaded = document.fonts.check(font);
  if (isFontLoaded) {
    return;
  }
  function onLoadingDone() {
    updateInputWidth(element);
  }
  document.fonts.addEventListener("loadingdone", onLoadingDone);
}
function getSelectionString(input) {
  if (input && "selectionStart" in input && input.selectionStart !== null && "selectionEnd" in input && input.selectionEnd !== null) {
    return input.value.slice(input.selectionStart, input.selectionEnd);
  }
  if ("getSelection" in window) {
    var selection = window.getSelection();
    return selection && selection.toString();
  }
  return null;
}
function makeOnKeyPress(maxLength) {
  if (maxLength === null) {
    return void 0;
  }
  return function onKeyPress(event) {
    if (isFirefox) {
      return;
    }
    var key = event.key, input = event.target;
    var value = input.value;
    var isNumberKey = key.length === 1 && /\d/.test(key);
    var selection = getSelectionString(input);
    if (!isNumberKey || !(selection || value.length < maxLength)) {
      event.preventDefault();
    }
  };
}
function Input$1(_a) {
  var ariaLabel = _a.ariaLabel, autoFocus = _a.autoFocus, className2 = _a.className, disabled = _a.disabled, inputRef = _a.inputRef, max = _a.max, min = _a.min, name = _a.name, nameForClass = _a.nameForClass, onChange2 = _a.onChange, onKeyDown2 = _a.onKeyDown, onKeyUp = _a.onKeyUp, _b = _a.placeholder, placeholder = _b === void 0 ? "--" : _b, required = _a.required, showLeadingZeros = _a.showLeadingZeros, step = _a.step, value = _a.value;
  useIsomorphicLayoutEffect(function() {
    if (!inputRef || !inputRef.current) {
      return;
    }
    updateInputWidth(inputRef.current);
    updateInputWidthOnLoad(inputRef.current);
    updateInputWidthOnFontLoad(inputRef.current);
  }, [inputRef, value]);
  var hasLeadingZero = showLeadingZeros && value && Number(value) < 10 && (value === "0" || !value.toString().startsWith("0"));
  var maxLength = max ? max.toString().length : null;
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [hasLeadingZero ? jsxRuntimeExports.jsx("span", { className: "".concat(className2, "__leadingZero"), children: "0" }) : null, jsxRuntimeExports.jsx("input", {
    "aria-label": ariaLabel,
    autoComplete: "off",
    autoFocus,
    className: clsx("".concat(className2, "__input"), "".concat(className2, "__").concat(nameForClass || name), hasLeadingZero && "".concat(className2, "__input--hasLeadingZero")),
    "data-input": "true",
    disabled,
    inputMode: "numeric",
    max,
    min,
    name,
    onChange: onChange2,
    onFocus,
    onKeyDown: onKeyDown2,
    onKeyPress: makeOnKeyPress(maxLength),
    onKeyUp: function(event) {
      updateInputWidth(event.target);
      if (onKeyUp) {
        onKeyUp(event);
      }
    },
    placeholder,
    // Assertion is needed for React 18 compatibility
    ref: inputRef,
    required,
    step,
    type: "number",
    value: value !== null ? value : ""
  })] });
}
function between(value, min, max) {
  if (min && min > value) {
    return min;
  }
  if (max && max < value) {
    return max;
  }
  return value;
}
function isValidNumber$1(num) {
  return num !== null && num !== false && !Number.isNaN(Number(num));
}
function safeMin() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return Math.min.apply(Math, args.filter(isValidNumber$1));
}
function safeMax() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return Math.max.apply(Math, args.filter(isValidNumber$1));
}
var __assign$4 = function() {
  __assign$4 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$4.apply(this, arguments);
};
var __rest$4 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function DayInput(_a) {
  var maxDate = _a.maxDate, minDate = _a.minDate, month = _a.month, year = _a.year, otherProps = __rest$4(_a, ["maxDate", "minDate", "month", "year"]);
  var currentMonthMaxDays = function() {
    if (!month) {
      return 31;
    }
    return getDaysInMonth(new Date(Number(year), Number(month) - 1, 1));
  }();
  function isSameMonth(date) {
    return year === getYear(date).toString() && month === getMonthHuman(date).toString();
  }
  var maxDay = safeMin(currentMonthMaxDays, maxDate && isSameMonth(maxDate) && getDate(maxDate));
  var minDay = safeMax(1, minDate && isSameMonth(minDate) && getDate(minDate));
  return jsxRuntimeExports.jsx(Input$1, __assign$4({ max: maxDay, min: minDay, name: "day" }, otherProps));
}
var __assign$3 = function() {
  __assign$3 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$3.apply(this, arguments);
};
var __rest$3 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function MonthInput(_a) {
  var maxDate = _a.maxDate, minDate = _a.minDate, year = _a.year, otherProps = __rest$3(_a, ["maxDate", "minDate", "year"]);
  function isSameYear(date) {
    return date && year === getYear(date).toString();
  }
  var maxMonth = safeMin(12, maxDate && isSameYear(maxDate) && getMonthHuman(maxDate));
  var minMonth = safeMax(1, minDate && isSameYear(minDate) && getMonthHuman(minDate));
  return jsxRuntimeExports.jsx(Input$1, __assign$3({ max: maxMonth, min: minMonth, name: "month" }, otherProps));
}
var formatterCache = /* @__PURE__ */ new Map();
function getFormatter(options) {
  return function formatter(locale, date) {
    var localeWithDefault = locale || getUserLocale();
    if (!formatterCache.has(localeWithDefault)) {
      formatterCache.set(localeWithDefault, /* @__PURE__ */ new Map());
    }
    var formatterCacheLocale = formatterCache.get(localeWithDefault);
    if (!formatterCacheLocale.has(options)) {
      formatterCacheLocale.set(options, new Intl.DateTimeFormat(localeWithDefault || void 0, options).format);
    }
    return formatterCacheLocale.get(options)(date);
  };
}
function toSafeHour(date) {
  var safeDate = new Date(date);
  return new Date(safeDate.setHours(12));
}
function getSafeFormatter(options) {
  return function(locale, date) {
    return getFormatter(options)(locale, toSafeHour(date));
  };
}
var formatMonthOptions = { month: "long" };
var formatShortMonthOptions = { month: "short" };
var formatMonth = getSafeFormatter(formatMonthOptions);
var formatShortMonth = getSafeFormatter(formatShortMonthOptions);
var __spreadArray$1 = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
function MonthSelect(_a) {
  var ariaLabel = _a.ariaLabel, autoFocus = _a.autoFocus, className2 = _a.className, disabled = _a.disabled, inputRef = _a.inputRef, locale = _a.locale, maxDate = _a.maxDate, minDate = _a.minDate, onChange2 = _a.onChange, onKeyDown2 = _a.onKeyDown, _b = _a.placeholder, placeholder = _b === void 0 ? "--" : _b, required = _a.required, short = _a.short, value = _a.value, year = _a.year;
  function isSameYear(date) {
    return date && year === getYear(date).toString();
  }
  var maxMonth = safeMin(12, maxDate && isSameYear(maxDate) && getMonthHuman(maxDate));
  var minMonth = safeMax(1, minDate && isSameYear(minDate) && getMonthHuman(minDate));
  var dates = __spreadArray$1([], Array(12), true).map(function(el, index) {
    return new Date(2019, index, 1);
  });
  var name = "month";
  var formatter = short ? formatShortMonth : formatMonth;
  return jsxRuntimeExports.jsxs("select", {
    "aria-label": ariaLabel,
    autoFocus,
    className: clsx("".concat(className2, "__input"), "".concat(className2, "__").concat(name)),
    "data-input": "true",
    "data-select": "true",
    disabled,
    name,
    onChange: onChange2,
    onKeyDown: onKeyDown2,
    // Assertion is needed for React 18 compatibility
    ref: inputRef,
    required,
    value: value !== null ? value : "",
    children: [!value && jsxRuntimeExports.jsx("option", { value: "", children: placeholder }), dates.map(function(date) {
      var month = getMonthHuman(date);
      var disabled2 = month < minMonth || month > maxMonth;
      return jsxRuntimeExports.jsx("option", { disabled: disabled2, value: month, children: formatter(locale, date) }, month);
    })]
  });
}
var __assign$2 = function() {
  __assign$2 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$2.apply(this, arguments);
};
var __rest$2 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function YearInput(_a) {
  var maxDate = _a.maxDate, minDate = _a.minDate, _b = _a.placeholder, placeholder = _b === void 0 ? "----" : _b, valueType = _a.valueType, otherProps = __rest$2(_a, ["maxDate", "minDate", "placeholder", "valueType"]);
  var maxYear = safeMin(275760, maxDate && getYear(maxDate));
  var minYear = safeMax(1, minDate && getYear(minDate));
  var yearStep = function() {
    if (valueType === "century") {
      return 10;
    }
    return 1;
  }();
  return jsxRuntimeExports.jsx(Input$1, __assign$2({ max: maxYear, min: minYear, name: "year", placeholder, step: yearStep }, otherProps));
}
function NativeInput(_a) {
  var ariaLabel = _a.ariaLabel, disabled = _a.disabled, maxDate = _a.maxDate, minDate = _a.minDate, name = _a.name, onChange2 = _a.onChange, required = _a.required, value = _a.value, valueType = _a.valueType;
  var nativeInputType = function() {
    switch (valueType) {
      case "decade":
      case "year":
        return "number";
      case "month":
        return "month";
      case "day":
        return "date";
      default:
        throw new Error("Invalid valueType");
    }
  }();
  var nativeValueParser = function() {
    switch (valueType) {
      case "decade":
      case "year":
        return getYear;
      case "month":
        return getISOLocalMonth;
      case "day":
        return getISOLocalDate;
      default:
        throw new Error("Invalid valueType");
    }
  }();
  function stopPropagation(event) {
    event.stopPropagation();
  }
  return jsxRuntimeExports.jsx("input", { "aria-label": ariaLabel, disabled, hidden: true, max: maxDate ? nativeValueParser(maxDate) : void 0, min: minDate ? nativeValueParser(minDate) : void 0, name, onChange: onChange2, onFocus: stopPropagation, required, style: {
    visibility: "hidden",
    position: "absolute",
    zIndex: "-999"
  }, type: nativeInputType, value: value ? nativeValueParser(value) : "" });
}
function getBegin(rangeType, date) {
  switch (rangeType) {
    case "decade":
      return getDecadeStart(date);
    case "year":
      return getYearStart(date);
    case "month":
      return getMonthStart(date);
    case "day":
      return getDayStart(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getEnd(rangeType, date) {
  switch (rangeType) {
    case "decade":
      return getDecadeEnd(date);
    case "year":
      return getYearEnd(date);
    case "month":
      return getMonthEnd(date);
    case "day":
      return getDayEnd(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
var __assign$1 = function() {
  __assign$1 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var getFormatterOptionsCache = {};
var defaultMinDate = /* @__PURE__ */ new Date();
defaultMinDate.setFullYear(1, 0, 1);
defaultMinDate.setHours(0, 0, 0, 0);
var defaultMaxDate = /* @__PURE__ */ new Date(864e13);
var allViews = ["century", "decade", "year", "month"];
var allValueTypes = __spreadArray(__spreadArray([], allViews.slice(1), true), ["day"], false);
function toDate(value) {
  if (value instanceof Date) {
    return value;
  }
  return new Date(value);
}
function getValueType(view) {
  var index = allViews.indexOf(view);
  return allValueTypes[index];
}
function getValue(value, index) {
  var rawValue = Array.isArray(value) ? value[index] : value;
  if (!rawValue) {
    return null;
  }
  var valueDate = toDate(rawValue);
  if (isNaN(valueDate.getTime())) {
    throw new Error("Invalid date: ".concat(value));
  }
  return valueDate;
}
function getDetailValue(_a, index) {
  var value = _a.value, minDate = _a.minDate, maxDate = _a.maxDate, maxDetail = _a.maxDetail;
  var valuePiece = getValue(value, index);
  if (!valuePiece) {
    return null;
  }
  var valueType = getValueType(maxDetail);
  var detailValueFrom = function() {
    switch (index) {
      case 0:
        return getBegin(valueType, valuePiece);
      case 1:
        return getEnd(valueType, valuePiece);
      default:
        throw new Error("Invalid index value: ".concat(index));
    }
  }();
  return between(detailValueFrom, minDate, maxDate);
}
var getDetailValueFrom = function(args) {
  return getDetailValue(args, 0);
};
var getDetailValueTo = function(args) {
  return getDetailValue(args, 1);
};
var getDetailValueArray = function(args) {
  return [getDetailValueFrom, getDetailValueTo].map(function(fn) {
    return fn(args);
  });
};
function isInternalInput(element) {
  return element.dataset.input === "true";
}
function findInput(element, property) {
  var nextElement = element;
  do {
    nextElement = nextElement[property];
  } while (nextElement && !isInternalInput(nextElement));
  return nextElement;
}
function focus(element) {
  if (element) {
    element.focus();
  }
}
function renderCustomInputs(placeholder, elementFunctions, allowMultipleInstances) {
  var usedFunctions = [];
  var pattern = new RegExp(Object.keys(elementFunctions).map(function(el) {
    return "".concat(el, "+");
  }).join("|"), "g");
  var matches = placeholder.match(pattern);
  return placeholder.split(pattern).reduce(function(arr, element, index) {
    var divider = element && // eslint-disable-next-line react/no-array-index-key
    jsxRuntimeExports.jsx(Divider, { children: element }, "separator_".concat(index));
    arr.push(divider);
    var currentMatch = matches && matches[index];
    if (currentMatch) {
      var renderFunction = elementFunctions[currentMatch] || elementFunctions[Object.keys(elementFunctions).find(function(elementFunction) {
        return currentMatch.match(elementFunction);
      })];
      if (!renderFunction) {
        return arr;
      }
      if (!allowMultipleInstances && usedFunctions.includes(renderFunction)) {
        arr.push(currentMatch);
      } else {
        arr.push(renderFunction(currentMatch, index));
        usedFunctions.push(renderFunction);
      }
    }
    return arr;
  }, []);
}
function DateInput$1(_a) {
  var autoFocus = _a.autoFocus, className2 = _a.className, dayAriaLabel = _a.dayAriaLabel, dayPlaceholder = _a.dayPlaceholder, disabled = _a.disabled, format2 = _a.format, _b = _a.isCalendarOpen, isCalendarOpenProps = _b === void 0 ? null : _b, locale = _a.locale, maxDate = _a.maxDate, _c = _a.maxDetail, maxDetail = _c === void 0 ? "month" : _c, minDate = _a.minDate, monthAriaLabel = _a.monthAriaLabel, monthPlaceholder = _a.monthPlaceholder, _d = _a.name, name = _d === void 0 ? "date" : _d, nativeInputAriaLabel = _a.nativeInputAriaLabel, onChangeProps = _a.onChange, onInvalidChange = _a.onInvalidChange, required = _a.required, _e = _a.returnValue, returnValue = _e === void 0 ? "start" : _e, showLeadingZeros = _a.showLeadingZeros, valueProps = _a.value, yearAriaLabel = _a.yearAriaLabel, yearPlaceholder = _a.yearPlaceholder;
  var _f = reactExports.useState(null), year = _f[0], setYear = _f[1];
  var _g = reactExports.useState(null), month = _g[0], setMonth = _g[1];
  var _h = reactExports.useState(null), day = _h[0], setDay = _h[1];
  var _j = reactExports.useState(null), value = _j[0], setValue = _j[1];
  var yearInput = reactExports.useRef(null);
  var monthInput = reactExports.useRef(null);
  var monthSelect = reactExports.useRef(null);
  var dayInput = reactExports.useRef(null);
  var _k = reactExports.useState(isCalendarOpenProps), isCalendarOpen = _k[0], setIsCalendarOpen = _k[1];
  var lastPressedKey = reactExports.useRef(void 0);
  reactExports.useEffect(function() {
    setIsCalendarOpen(isCalendarOpenProps);
  }, [isCalendarOpenProps]);
  reactExports.useEffect(function() {
    var nextValue = getDetailValueFrom({
      value: valueProps,
      minDate,
      maxDate,
      maxDetail
    });
    if (nextValue) {
      setYear(getYear(nextValue).toString());
      setMonth(getMonthHuman(nextValue).toString());
      setDay(getDate(nextValue).toString());
      setValue(nextValue);
    } else {
      setYear(null);
      setMonth(null);
      setDay(null);
      setValue(null);
    }
  }, [
    valueProps,
    minDate,
    maxDate,
    maxDetail,
    // Toggling calendar visibility resets values
    isCalendarOpen
  ]);
  var valueType = getValueType(maxDetail);
  var formatDate = function() {
    var level = allViews.indexOf(maxDetail);
    var formatterOptions = getFormatterOptionsCache[level] || function() {
      var options = { year: "numeric" };
      if (level >= 2) {
        options.month = "numeric";
      }
      if (level >= 3) {
        options.day = "numeric";
      }
      getFormatterOptionsCache[level] = options;
      return options;
    }();
    return getFormatter(formatterOptions);
  }();
  function getProcessedValue(value2) {
    var processFunction = function() {
      switch (returnValue) {
        case "start":
          return getDetailValueFrom;
        case "end":
          return getDetailValueTo;
        case "range":
          return getDetailValueArray;
        default:
          throw new Error("Invalid returnValue.");
      }
    }();
    return processFunction({
      value: value2,
      minDate,
      maxDate,
      maxDetail
    });
  }
  var placeholder = format2 || function() {
    var year2 = 2017;
    var monthIndex = 11;
    var day2 = 11;
    var date = new Date(year2, monthIndex, day2);
    var formattedDate = formatDate(locale, date);
    var datePieces = ["year", "month", "day"];
    var datePieceReplacements = ["y", "M", "d"];
    function formatDatePiece(name2, dateToFormat) {
      var formatterOptions = getFormatterOptionsCache[name2] || function() {
        var _a2;
        var options = (_a2 = {}, _a2[name2] = "numeric", _a2);
        getFormatterOptionsCache[name2] = options;
        return options;
      }();
      return getFormatter(formatterOptions)(locale, dateToFormat).match(/\d{1,}/);
    }
    var placeholder2 = formattedDate;
    datePieces.forEach(function(datePiece, index) {
      var match = formatDatePiece(datePiece, date);
      if (match) {
        var formattedDatePiece = match[0];
        var datePieceReplacement = datePieceReplacements[index];
        placeholder2 = placeholder2.replace(formattedDatePiece, datePieceReplacement);
      }
    });
    placeholder2 = placeholder2.replace("17", "y");
    return placeholder2;
  }();
  var divider = function() {
    var dividers = placeholder.match(/[^0-9a-z]/i);
    return dividers ? dividers[0] : null;
  }();
  function onClick(event) {
    if (event.target === event.currentTarget) {
      var firstInput = event.target.children[1];
      focus(firstInput);
    }
  }
  function onKeyDown2(event) {
    lastPressedKey.current = event.key;
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight":
      case divider: {
        event.preventDefault();
        var input = event.target;
        var property = event.key === "ArrowLeft" ? "previousElementSibling" : "nextElementSibling";
        var nextInput = findInput(input, property);
        focus(nextInput);
        break;
      }
    }
  }
  function onKeyUp(event) {
    var key = event.key, input = event.target;
    var isLastPressedKey = lastPressedKey.current === key;
    if (!isLastPressedKey) {
      return;
    }
    var isNumberKey = !isNaN(Number(key));
    if (!isNumberKey) {
      return;
    }
    var max = input.getAttribute("max");
    if (!max) {
      return;
    }
    var value2 = input.value;
    if (Number(value2) * 10 > Number(max) || value2.length >= max.length) {
      var property = "nextElementSibling";
      var nextInput = findInput(input, property);
      focus(nextInput);
    }
  }
  function onChangeExternal() {
    if (!onChangeProps) {
      return;
    }
    function filterBoolean(value2) {
      return Boolean(value2);
    }
    var formElements = [
      dayInput.current,
      monthInput.current,
      monthSelect.current,
      yearInput.current
    ].filter(filterBoolean);
    var values = {};
    formElements.forEach(function(formElement) {
      values[formElement.name] = "valueAsNumber" in formElement ? formElement.valueAsNumber : Number(formElement.value);
    });
    var isEveryValueEmpty = formElements.every(function(formElement) {
      return !formElement.value;
    });
    if (isEveryValueEmpty) {
      onChangeProps(null, false);
      return;
    }
    var isEveryValueFilled = formElements.every(function(formElement) {
      return formElement.value;
    });
    var isEveryValueValid = formElements.every(function(formElement) {
      return formElement.validity.valid;
    });
    if (isEveryValueFilled && isEveryValueValid) {
      var year_1 = Number(values.year || (/* @__PURE__ */ new Date()).getFullYear());
      var monthIndex = Number(values.month || 1) - 1;
      var day_1 = Number(values.day || 1);
      var proposedValue = /* @__PURE__ */ new Date();
      proposedValue.setFullYear(year_1, monthIndex, day_1);
      proposedValue.setHours(0, 0, 0, 0);
      var processedValue = getProcessedValue(proposedValue);
      onChangeProps(processedValue, false);
      return;
    }
    if (!onInvalidChange) {
      return;
    }
    onInvalidChange();
  }
  function onChange2(event) {
    var _a2 = event.target, name2 = _a2.name, value2 = _a2.value;
    switch (name2) {
      case "year":
        setYear(value2);
        break;
      case "month":
        setMonth(value2);
        break;
      case "day":
        setDay(value2);
        break;
    }
    onChangeExternal();
  }
  function onChangeNative(event) {
    var value2 = event.target.value;
    if (!onChangeProps) {
      return;
    }
    var processedValue = function() {
      if (!value2) {
        return null;
      }
      var _a2 = value2.split("-"), yearString = _a2[0], monthString = _a2[1], dayString = _a2[2];
      var year2 = Number(yearString);
      var monthIndex = Number(monthString) - 1 || 0;
      var day2 = Number(dayString) || 1;
      var proposedValue = /* @__PURE__ */ new Date();
      proposedValue.setFullYear(year2, monthIndex, day2);
      proposedValue.setHours(0, 0, 0, 0);
      return proposedValue;
    }();
    onChangeProps(processedValue, false);
  }
  var commonInputProps = {
    className: className2,
    disabled,
    maxDate: maxDate || defaultMaxDate,
    minDate: minDate || defaultMinDate,
    onChange: onChange2,
    onKeyDown: onKeyDown2,
    onKeyUp,
    // This is only for showing validity when editing
    required: Boolean(required || isCalendarOpen)
  };
  function renderDay(currentMatch, index) {
    if (currentMatch && currentMatch.length > 2) {
      throw new Error("Unsupported token: ".concat(currentMatch));
    }
    var showLeadingZerosFromFormat = currentMatch && currentMatch.length === 2;
    return jsxRuntimeExports.jsx(DayInput, __assign$1({}, commonInputProps, {
      ariaLabel: dayAriaLabel,
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus: index === 0 && autoFocus,
      inputRef: dayInput,
      month,
      placeholder: dayPlaceholder,
      showLeadingZeros: showLeadingZerosFromFormat || showLeadingZeros,
      value: day,
      year
    }), "day");
  }
  function renderMonth(currentMatch, index) {
    if (currentMatch && currentMatch.length > 4) {
      throw new Error("Unsupported token: ".concat(currentMatch));
    }
    if (currentMatch.length > 2) {
      return jsxRuntimeExports.jsx(MonthSelect, __assign$1({}, commonInputProps, {
        ariaLabel: monthAriaLabel,
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus: index === 0 && autoFocus,
        inputRef: monthSelect,
        locale,
        placeholder: monthPlaceholder,
        short: currentMatch.length === 3,
        value: month,
        year
      }), "month");
    }
    var showLeadingZerosFromFormat = currentMatch && currentMatch.length === 2;
    return jsxRuntimeExports.jsx(MonthInput, __assign$1({}, commonInputProps, {
      ariaLabel: monthAriaLabel,
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus: index === 0 && autoFocus,
      inputRef: monthInput,
      placeholder: monthPlaceholder,
      showLeadingZeros: showLeadingZerosFromFormat || showLeadingZeros,
      value: month,
      year
    }), "month");
  }
  function renderYear(currentMatch, index) {
    return jsxRuntimeExports.jsx(YearInput, __assign$1({}, commonInputProps, {
      ariaLabel: yearAriaLabel,
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus: index === 0 && autoFocus,
      inputRef: yearInput,
      placeholder: yearPlaceholder,
      value: year,
      valueType
    }), "year");
  }
  function renderCustomInputsInternal() {
    var elementFunctions = {
      d: renderDay,
      M: renderMonth,
      y: renderYear
    };
    var allowMultipleInstances = typeof format2 !== "undefined";
    return renderCustomInputs(placeholder, elementFunctions, allowMultipleInstances);
  }
  function renderNativeInput() {
    return jsxRuntimeExports.jsx(NativeInput, { ariaLabel: nativeInputAriaLabel, disabled, maxDate: maxDate || defaultMaxDate, minDate: minDate || defaultMinDate, name, onChange: onChangeNative, required, value, valueType }, "date");
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    jsxRuntimeExports.jsxs("div", { className: className2, onClick, children: [renderNativeInput(), renderCustomInputsInternal()] })
  );
}
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest$1 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var baseClassName = "react-date-picker";
var outsideActionEvents = ["mousedown", "focusin", "touchstart"];
var iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 19,
  height: 19,
  viewBox: "0 0 19 19",
  stroke: "black",
  strokeWidth: 2
};
var CalendarIcon = jsxRuntimeExports.jsxs("svg", __assign({}, iconProps, { className: "".concat(baseClassName, "__calendar-button__icon ").concat(baseClassName, "__button__icon"), children: [jsxRuntimeExports.jsx("rect", { fill: "none", height: "15", width: "15", x: "2", y: "2" }), jsxRuntimeExports.jsx("line", { x1: "6", x2: "6", y1: "0", y2: "4" }), jsxRuntimeExports.jsx("line", { x1: "13", x2: "13", y1: "0", y2: "4" })] }));
var ClearIcon = jsxRuntimeExports.jsxs("svg", __assign({}, iconProps, { className: "".concat(baseClassName, "__clear-button__icon ").concat(baseClassName, "__button__icon"), children: [jsxRuntimeExports.jsx("line", { x1: "4", x2: "15", y1: "4", y2: "15" }), jsxRuntimeExports.jsx("line", { x1: "15", x2: "4", y1: "4", y2: "15" })] }));
function DatePicker(props) {
  var autoFocus = props.autoFocus, calendarAriaLabel = props.calendarAriaLabel, _a = props.calendarIcon, calendarIcon = _a === void 0 ? CalendarIcon : _a, className2 = props.className, clearAriaLabel = props.clearAriaLabel, _b = props.clearIcon, clearIcon = _b === void 0 ? ClearIcon : _b, _c = props.closeCalendar, shouldCloseCalendarOnSelect = _c === void 0 ? true : _c, dataTestid = props["data-testid"], dayAriaLabel = props.dayAriaLabel, dayPlaceholder = props.dayPlaceholder, disableCalendar = props.disableCalendar, disabled = props.disabled, format2 = props.format, id = props.id, _d = props.isOpen, isOpenProps = _d === void 0 ? null : _d, locale = props.locale, maxDate = props.maxDate, _e = props.maxDetail, maxDetail = _e === void 0 ? "month" : _e, minDate = props.minDate, monthAriaLabel = props.monthAriaLabel, monthPlaceholder = props.monthPlaceholder, _f = props.name, name = _f === void 0 ? "date" : _f, nativeInputAriaLabel = props.nativeInputAriaLabel, onCalendarClose = props.onCalendarClose, onCalendarOpen = props.onCalendarOpen, onChangeProps = props.onChange, onFocusProps = props.onFocus, onInvalidChange = props.onInvalidChange, _g = props.openCalendarOnFocus, openCalendarOnFocus = _g === void 0 ? true : _g, required = props.required, _h = props.returnValue, returnValue = _h === void 0 ? "start" : _h, shouldCloseCalendar = props.shouldCloseCalendar, shouldOpenCalendar = props.shouldOpenCalendar, showLeadingZeros = props.showLeadingZeros, value = props.value, yearAriaLabel = props.yearAriaLabel, yearPlaceholder = props.yearPlaceholder, otherProps = __rest$1(props, ["autoFocus", "calendarAriaLabel", "calendarIcon", "className", "clearAriaLabel", "clearIcon", "closeCalendar", "data-testid", "dayAriaLabel", "dayPlaceholder", "disableCalendar", "disabled", "format", "id", "isOpen", "locale", "maxDate", "maxDetail", "minDate", "monthAriaLabel", "monthPlaceholder", "name", "nativeInputAriaLabel", "onCalendarClose", "onCalendarOpen", "onChange", "onFocus", "onInvalidChange", "openCalendarOnFocus", "required", "returnValue", "shouldCloseCalendar", "shouldOpenCalendar", "showLeadingZeros", "value", "yearAriaLabel", "yearPlaceholder"]);
  var _j = reactExports.useState(isOpenProps), isOpen = _j[0], setIsOpen = _j[1];
  var wrapper = reactExports.useRef(null);
  var calendarWrapper = reactExports.useRef(null);
  reactExports.useEffect(function() {
    setIsOpen(isOpenProps);
  }, [isOpenProps]);
  function openCalendar(_a2) {
    var reason = _a2.reason;
    if (shouldOpenCalendar) {
      if (!shouldOpenCalendar({ reason })) {
        return;
      }
    }
    setIsOpen(true);
    if (onCalendarOpen) {
      onCalendarOpen();
    }
  }
  var closeCalendar = reactExports.useCallback(function(_a2) {
    var reason = _a2.reason;
    if (shouldCloseCalendar) {
      if (!shouldCloseCalendar({ reason })) {
        return;
      }
    }
    setIsOpen(false);
    if (onCalendarClose) {
      onCalendarClose();
    }
  }, [onCalendarClose, shouldCloseCalendar]);
  function toggleCalendar() {
    if (isOpen) {
      closeCalendar({ reason: "buttonClick" });
    } else {
      openCalendar({ reason: "buttonClick" });
    }
  }
  function onChange2(value2, shouldCloseCalendar2) {
    if (shouldCloseCalendar2 === void 0) {
      shouldCloseCalendar2 = shouldCloseCalendarOnSelect;
    }
    if (shouldCloseCalendar2) {
      closeCalendar({ reason: "select" });
    }
    if (onChangeProps) {
      onChangeProps(value2);
    }
  }
  function onFocus2(event) {
    if (onFocusProps) {
      onFocusProps(event);
    }
    if (
      // Internet Explorer still fires onFocus on disabled elements
      disabled || isOpen || !openCalendarOnFocus || event.target.dataset.select === "true"
    ) {
      return;
    }
    openCalendar({ reason: "focus" });
  }
  var onKeyDown2 = reactExports.useCallback(function(event) {
    if (event.key === "Escape") {
      closeCalendar({ reason: "escape" });
    }
  }, [closeCalendar]);
  function clear() {
    onChange2(null);
  }
  function stopPropagation(event) {
    event.stopPropagation();
  }
  var onOutsideAction = reactExports.useCallback(function(event) {
    var wrapperEl = wrapper.current;
    var calendarWrapperEl = calendarWrapper.current;
    var target = "composedPath" in event ? event.composedPath()[0] : event.target;
    if (target && wrapperEl && !wrapperEl.contains(target) && (!calendarWrapperEl || !calendarWrapperEl.contains(target))) {
      closeCalendar({ reason: "outsideAction" });
    }
  }, [calendarWrapper, closeCalendar, wrapper]);
  var handleOutsideActionListeners = reactExports.useCallback(function(shouldListen) {
    if (shouldListen === void 0) {
      shouldListen = isOpen;
    }
    outsideActionEvents.forEach(function(event) {
      if (shouldListen) {
        document.addEventListener(event, onOutsideAction);
      } else {
        document.removeEventListener(event, onOutsideAction);
      }
    });
    if (shouldListen) {
      document.addEventListener("keydown", onKeyDown2);
    } else {
      document.removeEventListener("keydown", onKeyDown2);
    }
  }, [isOpen, onOutsideAction, onKeyDown2]);
  reactExports.useEffect(function() {
    handleOutsideActionListeners();
    return function() {
      handleOutsideActionListeners(false);
    };
  }, [handleOutsideActionListeners]);
  function renderInputs() {
    var valueFrom = (Array.isArray(value) ? value : [value])[0];
    var ariaLabelProps = {
      dayAriaLabel,
      monthAriaLabel,
      nativeInputAriaLabel,
      yearAriaLabel
    };
    var placeholderProps = {
      dayPlaceholder,
      monthPlaceholder,
      yearPlaceholder
    };
    return jsxRuntimeExports.jsxs("div", { className: "".concat(baseClassName, "__wrapper"), children: [jsxRuntimeExports.jsx(DateInput$1, __assign({}, ariaLabelProps, placeholderProps, {
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus,
      className: "".concat(baseClassName, "__inputGroup"),
      disabled,
      format: format2,
      isCalendarOpen: isOpen,
      locale,
      maxDate,
      maxDetail,
      minDate,
      name,
      onChange: onChange2,
      onInvalidChange,
      required,
      returnValue,
      showLeadingZeros,
      value: valueFrom
    })), clearIcon !== null && jsxRuntimeExports.jsx("button", { "aria-label": clearAriaLabel, className: "".concat(baseClassName, "__clear-button ").concat(baseClassName, "__button"), disabled, onClick: clear, onFocus: stopPropagation, type: "button", children: typeof clearIcon === "function" ? reactExports.createElement(clearIcon) : clearIcon }), calendarIcon !== null && !disableCalendar && jsxRuntimeExports.jsx("button", { "aria-expanded": isOpen || false, "aria-label": calendarAriaLabel, className: "".concat(baseClassName, "__calendar-button ").concat(baseClassName, "__button"), disabled, onClick: toggleCalendar, onFocus: stopPropagation, type: "button", children: typeof calendarIcon === "function" ? reactExports.createElement(calendarIcon) : calendarIcon })] });
  }
  function renderCalendar() {
    if (isOpen === null || disableCalendar) {
      return null;
    }
    var calendarProps = props.calendarProps, portalContainer = props.portalContainer, value2 = props.value;
    var className3 = "".concat(baseClassName, "__calendar");
    var classNames2 = clsx(className3, "".concat(className3, "--").concat(isOpen ? "open" : "closed"));
    var calendar = jsxRuntimeExports.jsx(Calendar, __assign({ locale, maxDate, maxDetail, minDate, onChange: function(value3) {
      return onChange2(value3);
    }, value: value2 }, calendarProps));
    return portalContainer ? reactDomExports.createPortal(jsxRuntimeExports.jsx("div", { ref: calendarWrapper, className: classNames2, children: calendar }), portalContainer) : jsxRuntimeExports.jsx(Fit, { children: jsxRuntimeExports.jsx("div", { ref: function(ref) {
      if (ref && !isOpen) {
        ref.removeAttribute("style");
      }
    }, className: classNames2, children: calendar }) });
  }
  var eventProps = reactExports.useMemo(function() {
    return makeEventProps(otherProps);
  }, [otherProps]);
  return jsxRuntimeExports.jsxs("div", __assign({ className: clsx(baseClassName, "".concat(baseClassName, "--").concat(isOpen ? "open" : "closed"), "".concat(baseClassName, "--").concat(disabled ? "disabled" : "enabled"), className2), "data-testid": dataTestid, id }, eventProps, { onFocus: onFocus2, ref: wrapper, children: [renderInputs(), renderCalendar()] }));
}
const DateInput = ({ setData, value, name }) => {
  const resetCalendar = () => {
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DatePicker,
    {
      onCalendarClose: resetCalendar,
      onFocus: resetCalendar,
      onChange: (e) => setData(
        name,
        e == null ? void 0 : e.toLocaleString()
      ),
      calendarIcon: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "icon icon-tabler icons-tabler-outline icon-tabler-calendar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 3v4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 3v4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 11h16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M11 15h1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 15v3" })
      ] }),
      clearIcon: null,
      name: "birth_date",
      value
    }
  );
};
const metadata$1 = { "version": 4, "country_calling_codes": { "1": ["US", "AG", "AI", "AS", "BB", "BM", "BS", "CA", "DM", "DO", "GD", "GU", "JM", "KN", "KY", "LC", "MP", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI"], "7": ["RU", "KZ"], "20": ["EG"], "27": ["ZA"], "30": ["GR"], "31": ["NL"], "32": ["BE"], "33": ["FR"], "34": ["ES"], "36": ["HU"], "39": ["IT", "VA"], "40": ["RO"], "41": ["CH"], "43": ["AT"], "44": ["GB", "GG", "IM", "JE"], "45": ["DK"], "46": ["SE"], "47": ["NO", "SJ"], "48": ["PL"], "49": ["DE"], "51": ["PE"], "52": ["MX"], "53": ["CU"], "54": ["AR"], "55": ["BR"], "56": ["CL"], "57": ["CO"], "58": ["VE"], "60": ["MY"], "61": ["AU", "CC", "CX"], "62": ["ID"], "63": ["PH"], "64": ["NZ"], "65": ["SG"], "66": ["TH"], "81": ["JP"], "82": ["KR"], "84": ["VN"], "86": ["CN"], "90": ["TR"], "91": ["IN"], "92": ["PK"], "93": ["AF"], "94": ["LK"], "95": ["MM"], "98": ["IR"], "211": ["SS"], "212": ["MA", "EH"], "213": ["DZ"], "216": ["TN"], "218": ["LY"], "220": ["GM"], "221": ["SN"], "222": ["MR"], "223": ["ML"], "224": ["GN"], "225": ["CI"], "226": ["BF"], "227": ["NE"], "228": ["TG"], "229": ["BJ"], "230": ["MU"], "231": ["LR"], "232": ["SL"], "233": ["GH"], "234": ["NG"], "235": ["TD"], "236": ["CF"], "237": ["CM"], "238": ["CV"], "239": ["ST"], "240": ["GQ"], "241": ["GA"], "242": ["CG"], "243": ["CD"], "244": ["AO"], "245": ["GW"], "246": ["IO"], "247": ["AC"], "248": ["SC"], "249": ["SD"], "250": ["RW"], "251": ["ET"], "252": ["SO"], "253": ["DJ"], "254": ["KE"], "255": ["TZ"], "256": ["UG"], "257": ["BI"], "258": ["MZ"], "260": ["ZM"], "261": ["MG"], "262": ["RE", "YT"], "263": ["ZW"], "264": ["NA"], "265": ["MW"], "266": ["LS"], "267": ["BW"], "268": ["SZ"], "269": ["KM"], "290": ["SH", "TA"], "291": ["ER"], "297": ["AW"], "298": ["FO"], "299": ["GL"], "350": ["GI"], "351": ["PT"], "352": ["LU"], "353": ["IE"], "354": ["IS"], "355": ["AL"], "356": ["MT"], "357": ["CY"], "358": ["FI", "AX"], "359": ["BG"], "370": ["LT"], "371": ["LV"], "372": ["EE"], "373": ["MD"], "374": ["AM"], "375": ["BY"], "376": ["AD"], "377": ["MC"], "378": ["SM"], "380": ["UA"], "381": ["RS"], "382": ["ME"], "383": ["XK"], "385": ["HR"], "386": ["SI"], "387": ["BA"], "389": ["MK"], "420": ["CZ"], "421": ["SK"], "423": ["LI"], "500": ["FK"], "501": ["BZ"], "502": ["GT"], "503": ["SV"], "504": ["HN"], "505": ["NI"], "506": ["CR"], "507": ["PA"], "508": ["PM"], "509": ["HT"], "590": ["GP", "BL", "MF"], "591": ["BO"], "592": ["GY"], "593": ["EC"], "594": ["GF"], "595": ["PY"], "596": ["MQ"], "597": ["SR"], "598": ["UY"], "599": ["CW", "BQ"], "670": ["TL"], "672": ["NF"], "673": ["BN"], "674": ["NR"], "675": ["PG"], "676": ["TO"], "677": ["SB"], "678": ["VU"], "679": ["FJ"], "680": ["PW"], "681": ["WF"], "682": ["CK"], "683": ["NU"], "685": ["WS"], "686": ["KI"], "687": ["NC"], "688": ["TV"], "689": ["PF"], "690": ["TK"], "691": ["FM"], "692": ["MH"], "850": ["KP"], "852": ["HK"], "853": ["MO"], "855": ["KH"], "856": ["LA"], "880": ["BD"], "886": ["TW"], "960": ["MV"], "961": ["LB"], "962": ["JO"], "963": ["SY"], "964": ["IQ"], "965": ["KW"], "966": ["SA"], "967": ["YE"], "968": ["OM"], "970": ["PS"], "971": ["AE"], "972": ["IL"], "973": ["BH"], "974": ["QA"], "975": ["BT"], "976": ["MN"], "977": ["NP"], "992": ["TJ"], "993": ["TM"], "994": ["AZ"], "995": ["GE"], "996": ["KG"], "998": ["UZ"] }, "countries": { "AC": ["247", "00", "(?:[01589]\\d|[46])\\d{4}", [5, 6]], "AD": ["376", "00", "(?:1|6\\d)\\d{7}|[135-9]\\d{5}", [6, 8, 9], [["(\\d{3})(\\d{3})", "$1 $2", ["[135-9]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["1"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]]], "AE": ["971", "00", "(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}", [5, 6, 7, 8, 9, 10, 11, 12], [["(\\d{3})(\\d{2,9})", "$1 $2", ["60|8"]], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[236]|[479][2-8]"], "0$1"], ["(\\d{3})(\\d)(\\d{5})", "$1 $2 $3", ["[479]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"]], "0"], "AF": ["93", "00", "[2-7]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]], "0"], "AG": ["1", "011", "(?:268|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([457]\\d{6})$|1", "268$1", 0, "268"], "AI": ["1", "011", "(?:264|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2457]\\d{6})$|1", "264$1", 0, "264"], "AL": ["355", "00", "(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}", [6, 7, 8, 9], [["(\\d{3})(\\d{3,4})", "$1 $2", ["80|9"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[2-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2358][2-5]|4"], "0$1"], ["(\\d{3})(\\d{5})", "$1 $2", ["[23578]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["6"], "0$1"]], "0"], "AM": ["374", "00", "(?:[1-489]\\d|55|60|77)\\d{6}", [8], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[89]0"], "0 $1"], ["(\\d{3})(\\d{5})", "$1 $2", ["2|3[12]"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["1|47"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[3-9]"], "0$1"]], "0"], "AO": ["244", "00", "[29]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[29]"]]]], "AR": ["54", "00", "(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}", [10, 11], [["(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])", "2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", 1], ["(\\d)(\\d{4})(\\d{2})(\\d{4})", "$2 15-$3-$4", ["9(?:2[2-469]|3[3-578])", "9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))", "9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 0, "$1 $2 $3-$4"], ["(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 15-$3-$4", ["91"], "0$1", 0, "$1 $2 $3-$4"], ["(\\d{3})(\\d{3})(\\d{5})", "$1-$2-$3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 15-$3-$4", ["9"], "0$1", 0, "$1 $2 $3-$4"]], "0", 0, "0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?", "9$1"], "AS": ["1", "011", "(?:[58]\\d\\d|684|900)\\d{7}", [10], 0, "1", 0, "([267]\\d{6})$|1", "684$1", 0, "684"], "AT": ["43", "00", "1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{3,12})", "$1 $2", ["1(?:11|[2-9])"], "0$1"], ["(\\d{3})(\\d{2})", "$1 $2", ["517"], "0$1"], ["(\\d{2})(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"], ["(\\d{3})(\\d{3,10})", "$1 $2", ["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"], "0$1"], ["(\\d{4})(\\d{3,9})", "$1 $2", ["[2-467]|5[2-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5"], "0$1"]], "0"], "AU": ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{7}(?:\\d(?:\\d{2})?)?|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}", [5, 6, 7, 8, 9, 10, 12], [["(\\d{2})(\\d{3,4})", "$1 $2", ["16"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["14|4"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:30|[89])"]]], "0", 0, "(183[12])|0", 0, 0, 0, [["(?:(?:(?:2(?:[0-26-9]\\d|3[0-8]|4[02-9]|5[0135-9])|7(?:[013-57-9]\\d|2[0-8]))\\d|3(?:(?:[0-3589]\\d|6[1-9]|7[0-35-9])\\d|4(?:[0-578]\\d|90)))\\d\\d|8(?:51(?:0(?:0[03-9]|[12479]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-7])|1(?:[0235689]\\d|1[0-69]|4[0-589]|7[0-47-9])|2(?:0[0-79]|[18][13579]|2[14-9]|3[0-46-9]|[4-6]\\d|7[89]|9[0-4])|3\\d\\d)|(?:6[0-8]|[78]\\d)\\d{3}|9(?:[02-9]\\d{3}|1(?:(?:[0-58]\\d|6[0135-9])\\d|7(?:0[0-24-9]|[1-9]\\d)|9(?:[0-46-9]\\d|5[0-79])))))\\d{3}", [9]], ["4(?:79[01]|83[0-389]|94[0-4])\\d{5}|4(?:[0-36]\\d|4[047-9]|5[0-25-9]|7[02-8]|8[0-24-9]|9[0-37-9])\\d{6}", [9]], ["180(?:0\\d{3}|2)\\d{3}", [7, 10]], ["190[0-26]\\d{6}", [10]], 0, 0, 0, ["163\\d{2,6}", [5, 6, 7, 8, 9]], ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]], ["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]]], "0011"], "AW": ["297", "00", "(?:[25-79]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[25-9]"]]]], "AX": ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}", [5, 6, 7, 8, 9, 10, 11, 12], 0, "0", 0, 0, 0, 0, "18", 0, "00"], "AZ": ["994", "00", "365\\d{6}|(?:[124579]\\d|60|88)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[28]|2|365|46", "1[28]|2|365[45]|46", "1[28]|2|365(?:4|5[02])|46"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[13-9]"], "0$1"]], "0"], "BA": ["387", "00", "6\\d{8}|(?:[35689]\\d|49|70)\\d{6}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[1-3]|[7-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]|6[56]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6"], "0$1"]], "0"], "BB": ["1", "011", "(?:246|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "246$1", 0, "246"], "BD": ["880", "00", "[1-469]\\d{9}|8[0-79]\\d{7,8}|[2-79]\\d{8}|[2-9]\\d{7}|[3-9]\\d{6}|[57-9]\\d{5}", [6, 7, 8, 9, 10], [["(\\d{2})(\\d{4,6})", "$1-$2", ["31[5-8]|[459]1"], "0$1"], ["(\\d{3})(\\d{3,7})", "$1-$2", ["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:[15]|28|4[14])|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"], "0$1"], ["(\\d{4})(\\d{3,6})", "$1-$2", ["[13-9]|2[23]"], "0$1"], ["(\\d)(\\d{7,8})", "$1-$2", ["2"], "0$1"]], "0"], "BE": ["32", "00", "4\\d{8}|[1-9]\\d{7}", [8, 9], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:80|9)0"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[239]|4[23]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[15-8]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4"], "0$1"]], "0"], "BF": ["226", "00", "[025-7]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[025-7]"]]]], "BG": ["359", "00", "00800\\d{7}|[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}", [6, 7, 8, 9, 12], [["(\\d)(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["43[1-6]|70[1-9]"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:70|8)0"], "0$1"], ["(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[1-7]|7"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[48]|9[08]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"]], "0"], "BH": ["973", "00", "[136-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[13679]|8[02-4679]"]]]], "BI": ["257", "00", "(?:[267]\\d|31)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2367]"]]]], "BJ": ["229", "00", "(?:01\\d|[24-689])\\d{7}", [8, 10], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-689]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["0"]]]], "BL": ["590", "00", "(?:590\\d|7090)\\d{5}|(?:69|80|9\\d)\\d{7}", [9], 0, "0", 0, 0, 0, 0, 0, [["590(?:2[7-9]|3[3-7]|5[12]|87)\\d{4}"], ["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}"], ["80[0-5]\\d{6}"], 0, 0, 0, 0, 0, ["9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}"]]], "BM": ["1", "011", "(?:441|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "441$1", 0, "441"], "BN": ["673", "00", "[2-578]\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-578]"]]]], "BO": ["591", "00(?:1\\d)?", "8001\\d{5}|(?:[2-467]\\d|50)\\d{6}", [8, 9], [["(\\d)(\\d{7})", "$1 $2", ["[235]|4[46]"]], ["(\\d{8})", "$1", ["[67]"]], ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["8"]]], "0", 0, "0(1\\d)?"], "BQ": ["599", "00", "(?:[34]1|7\\d)\\d{5}", [7], 0, 0, 0, 0, 0, 0, "[347]"], "BR": ["55", "00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)", "(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-46-9]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}", [8, 9, 10, 11], [["(\\d{4})(\\d{4})", "$1-$2", ["300|4(?:0[02]|37)", "4(?:02|37)0|[34]00"]], ["(\\d{3})(\\d{2,3})(\\d{4})", "$1 $2 $3", ["(?:[358]|90)0"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"], "($1)"], ["(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["[16][1-9]|[2-57-9]"], "($1)"]], "0", 0, "(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?", "$2"], "BS": ["1", "011", "(?:242|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([3-8]\\d{6})$|1", "242$1", 0, "242"], "BT": ["975", "00", "[17]\\d{7}|[2-8]\\d{6}", [7, 8], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-68]|7[246]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[67]|7"]]]], "BW": ["267", "00", "(?:0800|(?:[37]|800)\\d)\\d{6}|(?:[2-6]\\d|90)\\d{5}", [7, 8, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["90"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[24-6]|3[15-9]"]], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37]"]], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["8"]]]], "BY": ["375", "810", "(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}", [6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{3})", "$1 $2", ["800"], "8 $1"], ["(\\d{3})(\\d{2})(\\d{2,4})", "$1 $2 $3", ["800"], "8 $1"], ["(\\d{4})(\\d{2})(\\d{3})", "$1 $2-$3", ["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"], "8 0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["1(?:[56]|7[467])|2[1-3]"], "8 0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-4]"], "8 0$1"], ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[89]"], "8 $1"]], "8", 0, "0|80?", 0, 0, 0, 0, "8~10"], "BZ": ["501", "00", "(?:0800\\d|[2-8])\\d{6}", [7, 11], [["(\\d{3})(\\d{4})", "$1-$2", ["[2-8]"]], ["(\\d)(\\d{3})(\\d{4})(\\d{3})", "$1-$2-$3-$4", ["0"]]]], "CA": ["1", "011", "[2-9]\\d{9}|3\\d{6}", [7, 10], 0, "1", 0, 0, 0, 0, 0, [["(?:2(?:04|[23]6|[48]9|50|63)|3(?:06|43|54|6[578]|82)|4(?:03|1[68]|[26]8|3[178]|50|74)|5(?:06|1[49]|48|79|8[147])|6(?:04|[18]3|39|47|72)|7(?:0[59]|42|53|78|8[02])|8(?:[06]7|19|25|7[39])|9(?:0[25]|42))[2-9]\\d{6}", [10]], ["", [10]], ["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", [10]], ["900[2-9]\\d{6}", [10]], ["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|(?:5(?:2[125-9]|33|44|66|77|88)|6(?:22|33))[2-9]\\d{6}", [10]], 0, ["310\\d{4}", [7]], 0, ["600[2-9]\\d{6}", [10]]]], "CC": ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", [6, 7, 8, 9, 10, 12], 0, "0", 0, "([59]\\d{7})$|0", "8$1", 0, 0, [["8(?:51(?:0(?:02|31|60|89)|1(?:18|76)|223)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}", [9]], ["4(?:79[01]|83[0-389]|94[0-4])\\d{5}|4(?:[0-36]\\d|4[047-9]|5[0-25-9]|7[02-8]|8[0-24-9]|9[0-37-9])\\d{6}", [9]], ["180(?:0\\d{3}|2)\\d{3}", [7, 10]], ["190[0-26]\\d{6}", [10]], 0, 0, 0, 0, ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]], ["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]]], "0011"], "CD": ["243", "00", "(?:(?:[189]|5\\d)\\d|2)\\d{7}|[1-68]\\d{6}", [7, 8, 9, 10], [["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], ["(\\d{2})(\\d{5})", "$1 $2", ["[1-6]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["5"], "0$1"]], "0"], "CF": ["236", "00", "(?:[27]\\d{3}|8776)\\d{4}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[278]"]]]], "CG": ["242", "00", "222\\d{6}|(?:0\\d|80)\\d{7}", [9], [["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[02]"]]]], "CH": ["41", "00", "8\\d{11}|[2-9]\\d{8}", [9, 12], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[047]|90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]|81"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["8"], "0$1"]], "0"], "CI": ["225", "00", "[02]\\d{9}", [10], [["(\\d{2})(\\d{2})(\\d)(\\d{5})", "$1 $2 $3 $4", ["2"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3 $4", ["0"]]]], "CK": ["682", "00", "[2-578]\\d{4}", [5], [["(\\d{2})(\\d{3})", "$1 $2", ["[2-578]"]]]], "CL": ["56", "(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0", "12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}", [9, 10, 11], [["(\\d{5})(\\d{4})", "$1 $2", ["219", "2196"], "($1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["44"]], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[1-36]"], "($1)"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["9[2-9]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"], "($1)"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{3})(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"]]]], "CM": ["237", "00", "[26]\\d{8}|88\\d{6,7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["88"]], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[26]|88"]]]], "CN": ["86", "00|1(?:[12]\\d|79)\\d\\d00", "(?:(?:1[03-689]|2\\d)\\d\\d|6)\\d{8}|1\\d{10}|[126]\\d{6}(?:\\d(?:\\d{2})?)?|86\\d{5,6}|(?:[3-579]\\d|8[0-57-9])\\d{5,9}", [7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2[0-57-9])[19]|3(?:[157]|35|49|9[1-68])|4(?:1[124-9]|2[179]|6[47-9]|7|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:07|1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3|4[13]|5[1-5]|7[0-79]|9[0-35-9])|(?:4[35]|59|85)[1-9]", "(?:10|2[0-57-9])(?:1[02]|9[56])|8078|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))1", "10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|80781|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))12", "10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|807812|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123", "10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:078|1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123"], "0$1"], ["(\\d{3})(\\d{5,6})", "$1 $2", ["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]", "(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]", "85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])", "85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["(?:4|80)0"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|2(?:[02-57-9]|1[1-9])", "10|2(?:[02-57-9]|1[1-9])", "10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"], "0$1", 1], ["(\\d{3})(\\d{7,8})", "$1 $2", ["9"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[3-578]"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-9]"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["[12]"], "0$1", 1]], "0", 0, "(1(?:[12]\\d|79)\\d\\d)|0", 0, 0, 0, 0, "00"], "CO": ["57", "00(?:4(?:[14]4|56)|[579])", "(?:46|60\\d\\d)\\d{6}|(?:1\\d|[39])\\d{9}", [8, 10, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["46"]], ["(\\d{3})(\\d{7})", "$1 $2", ["6|90"], "($1)"], ["(\\d{3})(\\d{7})", "$1 $2", ["3[0-357]|91"]], ["(\\d)(\\d{3})(\\d{7})", "$1-$2-$3", ["1"], "0$1", 0, "$1 $2 $3"]], "0", 0, "0([3579]|4(?:[14]4|56))?"], "CR": ["506", "00", "(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}", [8, 10], [["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[3-9]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[89]"]]], 0, 0, "(19(?:0[0-2468]|1[09]|20|66|77|99))"], "CU": ["53", "119", "(?:[2-7]|8\\d\\d)\\d{7}|[2-47]\\d{6}|[34]\\d{5}", [6, 7, 8, 10], [["(\\d{2})(\\d{4,6})", "$1 $2", ["2[1-4]|[34]"], "(0$1)"], ["(\\d)(\\d{6,7})", "$1 $2", ["7"], "(0$1)"], ["(\\d)(\\d{7})", "$1 $2", ["[56]"], "0$1"], ["(\\d{3})(\\d{7})", "$1 $2", ["8"], "0$1"]], "0"], "CV": ["238", "0", "(?:[2-59]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-589]"]]]], "CW": ["599", "00", "(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["[3467]"]], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["9[4-8]"]]], 0, 0, 0, 0, 0, "[69]"], "CX": ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", [6, 7, 8, 9, 10, 12], 0, "0", 0, "([59]\\d{7})$|0", "8$1", 0, 0, [["8(?:51(?:0(?:01|30|59|88)|1(?:17|46|75)|2(?:22|35))|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}", [9]], ["4(?:79[01]|83[0-389]|94[0-4])\\d{5}|4(?:[0-36]\\d|4[047-9]|5[0-25-9]|7[02-8]|8[0-24-9]|9[0-37-9])\\d{6}", [9]], ["180(?:0\\d{3}|2)\\d{3}", [7, 10]], ["190[0-26]\\d{6}", [10]], 0, 0, 0, 0, ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]], ["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]]], "0011"], "CY": ["357", "00", "(?:[279]\\d|[58]0)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[257-9]"]]]], "CZ": ["420", "00", "(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}", [9, 10, 11, 12], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]|9[015-7]"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["96"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]]], "DE": ["49", "00", "[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:2[024-9]|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[015]\\d|2[13]|31|[46][1-8])\\d{1,9}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [["(\\d{2})(\\d{3,13})", "$1 $2", ["3[02]|40|[68]9"], "0$1"], ["(\\d{3})(\\d{3,12})", "$1 $2", ["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1", "2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"], "0$1"], ["(\\d{4})(\\d{2,11})", "$1 $2", ["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]", "[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["138"], "0$1"], ["(\\d{5})(\\d{2,10})", "$1 $2", ["3"], "0$1"], ["(\\d{3})(\\d{5,11})", "$1 $2", ["181"], "0$1"], ["(\\d{3})(\\d)(\\d{4,10})", "$1 $2 $3", ["1(?:3|80)|9"], "0$1"], ["(\\d{3})(\\d{7,8})", "$1 $2", ["1[67]"], "0$1"], ["(\\d{3})(\\d{7,12})", "$1 $2", ["8"], "0$1"], ["(\\d{5})(\\d{6})", "$1 $2", ["185", "1850", "18500"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{4})(\\d{7})", "$1 $2", ["18[68]"], "0$1"], ["(\\d{4})(\\d{7})", "$1 $2", ["15[1279]"], "0$1"], ["(\\d{5})(\\d{6})", "$1 $2", ["15[03568]", "15(?:[0568]|31)"], "0$1"], ["(\\d{3})(\\d{8})", "$1 $2", ["18"], "0$1"], ["(\\d{3})(\\d{2})(\\d{7,8})", "$1 $2 $3", ["1(?:6[023]|7)"], "0$1"], ["(\\d{4})(\\d{2})(\\d{7})", "$1 $2 $3", ["15[279]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{8})", "$1 $2 $3", ["15"], "0$1"]], "0"], "DJ": ["253", "00", "(?:2\\d|77)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[27]"]]]], "DK": ["45", "00", "[2-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-9]"]]]], "DM": ["1", "011", "(?:[58]\\d\\d|767|900)\\d{7}", [10], 0, "1", 0, "([2-7]\\d{6})$|1", "767$1", 0, "767"], "DO": ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "8001|8[024]9"], "DZ": ["213", "00", "(?:[1-4]|[5-79]\\d|80)\\d{7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-4]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-8]"], "0$1"]], "0"], "EC": ["593", "00", "1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}", [8, 9, 10, 11], [["(\\d)(\\d{3})(\\d{4})", "$1 $2-$3", ["[2-7]"], "(0$1)", 0, "$1-$2-$3"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"]]], "0"], "EE": ["372", "00", "8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}", [7, 8, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]], ["(\\d{4})(\\d{3,4})", "$1 $2", ["[45]|8(?:00|[1-49])", "[45]|8(?:00[1-9]|[1-49])"]], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["7"]], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]]], "EG": ["20", "00", "[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}", [8, 9, 10], [["(\\d)(\\d{7,8})", "$1 $2", ["[23]"], "0$1"], ["(\\d{2})(\\d{6,7})", "$1 $2", ["1[35]|[4-6]|8[2468]|9[235-7]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{2})(\\d{8})", "$1 $2", ["1"], "0$1"]], "0"], "EH": ["212", "00", "[5-8]\\d{8}", [9], 0, "0", 0, 0, 0, 0, "528[89]"], "ER": ["291", "00", "[178]\\d{6}", [7], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[178]"], "0$1"]], "0"], "ES": ["34", "00", "[5-9]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-9]"]]]], "ET": ["251", "00", "(?:11|[2-579]\\d)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-579]"], "0$1"]], "0"], "FI": ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}", [5, 6, 7, 8, 9, 10, 11, 12], [["(\\d{5})", "$1", ["20[2-59]"], "0$1"], ["(\\d{3})(\\d{3,7})", "$1 $2", ["(?:[1-3]0|[68])0|70[07-9]"], "0$1"], ["(\\d{2})(\\d{4,8})", "$1 $2", ["[14]|2[09]|50|7[135]"], "0$1"], ["(\\d{2})(\\d{6,10})", "$1 $2", ["7"], "0$1"], ["(\\d)(\\d{4,9})", "$1 $2", ["(?:19|[2568])[1-8]|3(?:0[1-9]|[1-9])|9"], "0$1"]], "0", 0, 0, 0, 0, "1[03-79]|[2-9]", 0, "00"], "FJ": ["679", "0(?:0|52)", "45\\d{5}|(?:0800\\d|[235-9])\\d{6}", [7, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["[235-9]|45"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "FK": ["500", "00", "[2-7]\\d{4}", [5]], "FM": ["691", "00", "(?:[39]\\d\\d|820)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[389]"]]]], "FO": ["298", "00", "[2-9]\\d{5}", [6], [["(\\d{6})", "$1", ["[2-9]"]]], 0, 0, "(10(?:01|[12]0|88))"], "FR": ["33", "00", "[1-9]\\d{8}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"]], "0"], "GA": ["241", "00", "(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}", [7, 8], [["(\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["11|[67]"], "0$1"]], 0, 0, "0(11\\d{6}|60\\d{6}|61\\d{6}|6[256]\\d{6}|7[467]\\d{6})", "$1"], "GB": ["44", "00", "[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}", [7, 9, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["800", "8001", "80011", "800111", "8001111"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["845", "8454", "84546", "845464"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["800"], "0$1"], ["(\\d{5})(\\d{4,5})", "$1 $2", ["1(?:38|5[23]|69|76|94)", "1(?:(?:38|69)7|5(?:24|39)|768|946)", "1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"], "0$1"], ["(\\d{4})(\\d{5,6})", "$1 $2", ["1(?:[2-69][02-9]|[78])"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[25]|7(?:0|6[02-9])", "[25]|7(?:0|6(?:[03-9]|2[356]))"], "0$1"], ["(\\d{4})(\\d{6})", "$1 $2", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1389]"], "0$1"]], "0", 0, 0, 0, 0, 0, [["(?:1(?:1(?:3(?:[0-58]\\d\\d|73[0-35])|4(?:(?:[0-5]\\d|70)\\d|69[7-9])|(?:(?:5[0-26-9]|[78][0-49])\\d|6(?:[0-4]\\d|50))\\d)|(?:2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d|1(?:[0-7]\\d|8[0-3]))|(?:3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d)\\d)|2(?:0[013478]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|7(?:26(?:6[13-9]|7[0-7])|(?:442|688)\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}", [9, 10]], ["7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}", [10]], ["80[08]\\d{7}|800\\d{6}|8001111"], ["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d", [7, 10]], ["70\\d{8}", [10]], 0, ["(?:3[0347]|55)\\d{8}", [10]], ["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", [10]], ["56\\d{8}", [10]]], 0, " x"], "GD": ["1", "011", "(?:473|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "473$1", 0, "473"], "GE": ["995", "00", "(?:[3-57]\\d\\d|800)\\d{6}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["32"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[57]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[348]"], "0$1"]], "0"], "GF": ["594", "00", "(?:[56]94\\d|7093)\\d{5}|(?:80|9\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]|9[47]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[89]"], "0$1"]], "0"], "GG": ["44", "00", "(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?", [7, 9, 10], 0, "0", 0, "([25-9]\\d{5})$|0", "1481$1", 0, 0, [["1481[25-9]\\d{5}", [10]], ["7(?:(?:781|839)\\d|911[17])\\d{5}", [10]], ["80[08]\\d{7}|800\\d{6}|8001111"], ["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d", [7, 10]], ["70\\d{8}", [10]], 0, ["(?:3[0347]|55)\\d{8}", [10]], ["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", [10]], ["56\\d{8}", [10]]]], "GH": ["233", "00", "(?:[235]\\d{3}|800)\\d{5}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"]], "0"], "GI": ["350", "00", "(?:[25]\\d|60)\\d{6}", [8], [["(\\d{3})(\\d{5})", "$1 $2", ["2"]]]], "GL": ["299", "00", "(?:19|[2-689]\\d|70)\\d{4}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["19|[2-9]"]]]], "GM": ["220", "00", "[2-9]\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]]], "GN": ["224", "00", "722\\d{6}|(?:3|6\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["3"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[67]"]]]], "GP": ["590", "00", "(?:590\\d|7090)\\d{5}|(?:69|80|9\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-79]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [["590(?:0[1-68]|[14][0-24-9]|2[0-68]|3[1-9]|5[3-579]|[68][0-689]|7[08]|9\\d)\\d{4}"], ["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}"], ["80[0-5]\\d{6}"], 0, 0, 0, 0, 0, ["9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}"]]], "GQ": ["240", "00", "222\\d{6}|(?:3\\d|55|[89]0)\\d{7}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235]"]], ["(\\d{3})(\\d{6})", "$1 $2", ["[89]"]]]], "GR": ["30", "00", "5005000\\d{3}|8\\d{9,11}|(?:[269]\\d|70)\\d{8}", [10, 11, 12], [["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["21|7"]], ["(\\d{4})(\\d{6})", "$1 $2", ["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2689]"]], ["(\\d{3})(\\d{3,4})(\\d{5})", "$1 $2 $3", ["8"]]]], "GT": ["502", "00", "80\\d{6}|(?:1\\d{3}|[2-7])\\d{7}", [8, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["[2-8]"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]]], "GU": ["1", "011", "(?:[58]\\d\\d|671|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "671$1", 0, "671"], "GW": ["245", "00", "[49]\\d{8}|4\\d{6}", [7, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["40"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"]]]], "GY": ["592", "001", "(?:[2-8]\\d{3}|9008)\\d{3}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]]], "HK": ["852", "00(?:30|5[09]|[126-9]?)", "8[0-46-9]\\d{6,7}|9\\d{4,7}|(?:[2-7]|9\\d{3})\\d{7}", [5, 6, 7, 8, 9, 11], [["(\\d{3})(\\d{2,5})", "$1 $2", ["900", "9003"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{3})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "HN": ["504", "00", "8\\d{10}|[237-9]\\d{7}", [8, 11], [["(\\d{4})(\\d{4})", "$1-$2", ["[237-9]"]]]], "HR": ["385", "00", "(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}", [6, 7, 8, 9], [["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["6[01]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{4})(\\d{3})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6|7[245]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-57]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]], "0"], "HT": ["509", "00", "(?:[2-489]\\d|55)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[2-589]"]]]], "HU": ["36", "00", "[235-7]\\d{8}|[1-9]\\d{7}", [8, 9], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "(06 $1)"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"], "(06 $1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "06 $1"]], "06"], "ID": ["62", "00[89]", "00[1-9]\\d{9,14}|(?:[1-36]|8\\d{5})\\d{6}|00\\d{9}|[1-9]\\d{8,10}|[2-9]\\d{7}", [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["15"]], ["(\\d{2})(\\d{5,9})", "$1 $2", ["2[124]|[36]1"], "(0$1)"], ["(\\d{3})(\\d{5,7})", "$1 $2", ["800"], "0$1"], ["(\\d{3})(\\d{5,8})", "$1 $2", ["[2-79]"], "(0$1)"], ["(\\d{3})(\\d{3,4})(\\d{3})", "$1-$2-$3", ["8[1-35-9]"], "0$1"], ["(\\d{3})(\\d{6,8})", "$1 $2", ["1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"], ["(\\d{3})(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["8"], "0$1"]], "0"], "IE": ["353", "00", "(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}", [7, 8, 9, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["2[24-9]|47|58|6[237-9]|9[35-9]"], "(0$1)"], ["(\\d{3})(\\d{5})", "$1 $2", ["[45]0"], "(0$1)"], ["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2569]|4[1-69]|7[14]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["81"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[78]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["4"], "(0$1)"], ["(\\d{2})(\\d)(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"], "IL": ["972", "0(?:0|1[2-9])", "1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}", [7, 8, 9, 10, 11, 12], [["(\\d{4})(\\d{3})", "$1-$2", ["125"]], ["(\\d{4})(\\d{2})(\\d{2})", "$1-$2-$3", ["121"]], ["(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-489]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1-$2-$3", ["12"]], ["(\\d{4})(\\d{6})", "$1-$2", ["159"]], ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3-$4", ["1[7-9]"]], ["(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})", "$1-$2 $3-$4", ["15"]]], "0"], "IM": ["44", "00", "1624\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "([25-8]\\d{5})$|0", "1624$1", 0, "74576|(?:16|7[56])24"], "IN": ["91", "00", "(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}", [8, 9, 10, 11, 12, 13], [["(\\d{8})", "$1", ["5(?:0|2[23]|3[03]|[67]1|88)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"], 0, 1], ["(\\d{4})(\\d{4,5})", "$1 $2", ["180", "1800"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], 0, 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["11|2[02]|33|4[04]|79[1-7]|80[2-46]", "11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])", "11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"], "0$1", 1], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807", "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]", "1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"], "0$1", 1], ["(\\d{5})(\\d{5})", "$1 $2", ["[6-9]"], "0$1", 1], ["(\\d{4})(\\d{2,4})(\\d{4})", "$1 $2 $3", ["1(?:6|8[06])", "1(?:6|8[06]0)"], 0, 1], ["(\\d{4})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["18"], 0, 1]], "0"], "IO": ["246", "00", "3\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["3"]]]], "IQ": ["964", "00", "(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-6]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], "0"], "IR": ["98", "00", "[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}", [4, 5, 6, 7, 10], [["(\\d{4,5})", "$1", ["96"], "0$1"], ["(\\d{2})(\\d{4,5})", "$1 $2", ["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[1-8]"], "0$1"]], "0"], "IS": ["354", "00|1(?:0(?:01|[12]0)|100)", "(?:38\\d|[4-9])\\d{6}", [7, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["[4-9]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["3"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "IT": ["39", "00", "0\\d{5,10}|1\\d{8,10}|3(?:[0-8]\\d{7,10}|9\\d{7,8})|(?:43|55|70)\\d{8}|8\\d{5}(?:\\d{2,4})?", [6, 7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{4,6})", "$1 $2", ["0[26]"]], ["(\\d{3})(\\d{3,6})", "$1 $2", ["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"]], ["(\\d{4})(\\d{2,6})", "$1 $2", ["0(?:[13-579][2-46-8]|8[236-8])"]], ["(\\d{4})(\\d{4})", "$1 $2", ["894"]], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|5"]], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1(?:44|[679])|[378]|43"]], ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]|14"]], ["(\\d{2})(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["3"]]], 0, 0, 0, 0, 0, 0, [["0669[0-79]\\d{1,6}|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}", [6, 7, 8, 9, 10, 11]], ["3[2-9]\\d{7,8}|(?:31|43)\\d{8}", [9, 10]], ["80(?:0\\d{3}|3)\\d{3}", [6, 9]], ["(?:0878\\d{3}|89(?:2\\d|3[04]|4(?:[0-4]|[5-9]\\d\\d)|5[0-4]))\\d\\d|(?:1(?:44|6[346])|89(?:38|5[5-9]|9))\\d{6}", [6, 8, 9, 10]], ["1(?:78\\d|99)\\d{6}", [9, 10]], ["3[2-8]\\d{9,10}", [11, 12]], 0, 0, ["55\\d{8}", [10]], ["84(?:[08]\\d{3}|[17])\\d{3}", [6, 9]]]], "JE": ["44", "00", "1534\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "([0-24-8]\\d{5})$|0", "1534$1", 0, 0, [["1534[0-24-8]\\d{5}"], ["7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97\\d))\\d{5}"], ["80(?:07(?:35|81)|8901)\\d{4}"], ["(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}"], ["701511\\d{4}"], 0, ["(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}"], ["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}"], ["56\\d{8}"]]], "JM": ["1", "011", "(?:[58]\\d\\d|658|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "658|876"], "JO": ["962", "00", "(?:(?:[2689]|7\\d)\\d|32|53)\\d{6}", [8, 9], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2356]|87"], "(0$1)"], ["(\\d{3})(\\d{5,6})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["70"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], "0"], "JP": ["81", "010", "00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}", [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], [["(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"], ["(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51)|9(?:80|9[16])", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["[36]|4(?:2[09]|7[01])", "[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[0459]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[26-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9]|9[29])|5(?:2|3(?:[045]|9[0-8])|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|3(?:[29]|60)|49|51|6(?:[0-24]|36|5[0-3589]|7[23]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3(?:[045]|9(?:[0-58]|6[4-9]|7[0-35689]))|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|60|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[2-57-9]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|7(?:2[2-468]|3[78])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["[14]|[289][2-9]|5[3-9]|7[2-4679]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[257-9]"], "0$1"]], "0", 0, "(000[259]\\d{6})$|(?:(?:003768)0?)|0", "$1"], "KE": ["254", "000", "(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}", [7, 8, 9, 10], [["(\\d{2})(\\d{5,7})", "$1 $2", ["[24-6]"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["[17]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], "0"], "KG": ["996", "00", "8\\d{9}|[235-9]\\d{8}", [9, 10], [["(\\d{4})(\\d{5})", "$1 $2", ["3(?:1[346]|[24-79])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235-79]|88"], "0$1"], ["(\\d{3})(\\d{3})(\\d)(\\d{2,3})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"], "KH": ["855", "00[14-9]", "1\\d{9}|[1-9]\\d{7,8}", [8, 9, 10], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-9]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0"], "KI": ["686", "00", "(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}", [5, 8], 0, "0"], "KM": ["269", "00", "[3478]\\d{6}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[3478]"]]]], "KN": ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-7]\\d{6})$|1", "869$1", 0, "869"], "KP": ["850", "00|99", "85\\d{6}|(?:19\\d|[2-7])\\d{7}", [8, 10], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"]], "0"], "KR": ["82", "00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))", "00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}", [5, 6, 8, 9, 10, 11, 12, 13, 14], [["(\\d{2})(\\d{3,4})", "$1-$2", ["(?:3[1-3]|[46][1-4]|5[1-5])1"], "0$1"], ["(\\d{4})(\\d{4})", "$1-$2", ["1"]], ["(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[36]0|8"], "0$1"], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["[1346]|5[1-5]"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], ["(\\d{2})(\\d{5})(\\d{4})", "$1-$2-$3", ["5"], "0$1"]], "0", 0, "0(8(?:[1-46-8]|5\\d\\d))?"], "KW": ["965", "00", "18\\d{5}|(?:[2569]\\d|41)\\d{6}", [7, 8], [["(\\d{4})(\\d{3,4})", "$1 $2", ["[169]|2(?:[235]|4[1-35-9])|52"]], ["(\\d{3})(\\d{5})", "$1 $2", ["[245]"]]]], "KY": ["1", "011", "(?:345|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "345$1", 0, "345"], "KZ": ["7", "810", "(?:33622|8\\d{8})\\d{5}|[78]\\d{9}", [10, 14], 0, "8", 0, 0, 0, 0, "33|7", 0, "8~10"], "LA": ["856", "00", "[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}", [8, 9, 10], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2[13]|3[14]|[4-8]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["30[0135-9]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[23]"], "0$1"]], "0"], "LB": ["961", "00", "[27-9]\\d{7}|[13-9]\\d{6}", [7, 8], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27-9]"]]], "0"], "LC": ["1", "011", "(?:[58]\\d\\d|758|900)\\d{7}", [10], 0, "1", 0, "([2-8]\\d{6})$|1", "758$1", 0, "758"], "LI": ["423", "00", "[68]\\d{8}|(?:[2378]\\d|90)\\d{5}", [7, 9], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2379]|8(?:0[09]|7)", "[2379]|8(?:0(?:02|9)|7)"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["69"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]], "0", 0, "(1001)|0"], "LK": ["94", "00", "[1-9]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[1-689]"], "0$1"]], "0"], "LR": ["231", "00", "(?:[245]\\d|33|77|88)\\d{7}|(?:2\\d|[4-6])\\d{6}", [7, 8, 9], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["4[67]|[56]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-578]"], "0$1"]], "0"], "LS": ["266", "00", "(?:[256]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2568]"]]]], "LT": ["370", "00", "(?:[3469]\\d|52|[78]0)\\d{6}", [8], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["52[0-7]"], "(0-$1)", 1], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0 $1", 1], ["(\\d{2})(\\d{6})", "$1 $2", ["37|4(?:[15]|6[1-8])"], "(0-$1)", 1], ["(\\d{3})(\\d{5})", "$1 $2", ["[3-6]"], "(0-$1)", 1]], "0", 0, "[08]"], "LU": ["352", "00", "35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}", [4, 5, 6, 7, 8, 9, 10, 11], [["(\\d{2})(\\d{3})", "$1 $2", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]], ["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["20[2-689]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4", ["2(?:[0367]|4[3-8])"]], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["80[01]|90[015]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["20"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4 $5", ["2(?:[0367]|4[3-8])"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})", "$1 $2 $3 $4", ["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"]]], 0, 0, "(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)"], "LV": ["371", "00", "(?:[268]\\d|90)\\d{6}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[269]|8[01]"]]]], "LY": ["218", "00", "[2-9]\\d{8}", [9], [["(\\d{2})(\\d{7})", "$1-$2", ["[2-9]"], "0$1"]], "0"], "MA": ["212", "00", "[5-8]\\d{8}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5[45]"], "0$1"], ["(\\d{4})(\\d{5})", "$1-$2", ["5(?:2[2-46-9]|3[3-9]|9)|8(?:0[89]|92)"], "0$1"], ["(\\d{2})(\\d{7})", "$1-$2", ["8"], "0$1"], ["(\\d{3})(\\d{6})", "$1-$2", ["[5-7]"], "0$1"]], "0", 0, 0, 0, 0, 0, [["5(?:2(?:[0-25-79]\\d|3[1-578]|4[02-46-8]|8[0235-7])|3(?:[0-47]\\d|5[02-9]|6[02-8]|8[014-9]|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}"], ["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[0167]\\d|2[0-467]|5[0-3]|8[0-5]))\\d{6}"], ["80[0-7]\\d{6}"], ["89\\d{7}"], 0, 0, 0, 0, ["(?:592(?:4[0-2]|93)|80[89]\\d\\d)\\d{4}"]]], "MC": ["377", "00", "(?:[3489]|6\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[389]"]], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["6"], "0$1"]], "0"], "MD": ["373", "00", "(?:[235-7]\\d|[89]0)\\d{6}", [8], [["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["22|3"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[25-7]"], "0$1"]], "0"], "ME": ["382", "00", "(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "0$1"]], "0"], "MF": ["590", "00", "(?:590\\d|7090)\\d{5}|(?:69|80|9\\d)\\d{7}", [9], 0, "0", 0, 0, 0, 0, 0, [["590(?:0[079]|[14]3|[27][79]|3[03-7]|5[0-268]|87)\\d{4}"], ["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}"], ["80[0-5]\\d{6}"], 0, 0, 0, 0, 0, ["9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}"]]], "MG": ["261", "00", "[23]\\d{8}", [9], [["(\\d{2})(\\d{2})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["[23]"], "0$1"]], "0", 0, "([24-9]\\d{6})$|0", "20$1"], "MH": ["692", "011", "329\\d{4}|(?:[256]\\d|45)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1-$2", ["[2-6]"]]], "1"], "MK": ["389", "00", "[2-578]\\d{7}", [8], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2|34[47]|4(?:[37]7|5[47]|64)"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[347]"], "0$1"], ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[58]"], "0$1"]], "0"], "ML": ["223", "00", "[24-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-9]"]]]], "MM": ["95", "00", "1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}", [6, 7, 8, 9, 10], [["(\\d)(\\d{2})(\\d{3})", "$1 $2 $3", ["16|2"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["4(?:[2-46]|5[3-5])|5|6(?:[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-5]|(?:60|86)[23]"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]|452|678|86", "[12]|452|6788|86"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[4-7]|8[1-35]"], "0$1"], ["(\\d)(\\d{3})(\\d{4,6})", "$1 $2 $3", ["9(?:2[0-4]|[35-9]|4[137-9])"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["92"], "0$1"], ["(\\d)(\\d{5})(\\d{4})", "$1 $2 $3", ["9"], "0$1"]], "0"], "MN": ["976", "001", "[12]\\d{7,9}|[5-9]\\d{7}", [8, 9, 10], [["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[12]1"], "0$1"], ["(\\d{4})(\\d{4})", "$1 $2", ["[5-9]"]], ["(\\d{3})(\\d{5,6})", "$1 $2", ["[12]2[1-3]"], "0$1"], ["(\\d{4})(\\d{5,6})", "$1 $2", ["[12](?:27|3[2-8]|4[2-68]|5[1-4689])", "[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"], "0$1"], ["(\\d{5})(\\d{4,5})", "$1 $2", ["[12]"], "0$1"]], "0"], "MO": ["853", "00", "0800\\d{3}|(?:28|[68]\\d)\\d{6}", [7, 8], [["(\\d{4})(\\d{3})", "$1 $2", ["0"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[268]"]]]], "MP": ["1", "011", "[58]\\d{9}|(?:67|90)0\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "670$1", 0, "670"], "MQ": ["596", "00", "(?:596\\d|7091)\\d{5}|(?:69|[89]\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-79]|8(?:0[6-9]|[36])"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"], "MR": ["222", "00", "(?:[2-4]\\d\\d|800)\\d{5}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-48]"]]]], "MS": ["1", "011", "(?:[58]\\d\\d|664|900)\\d{7}", [10], 0, "1", 0, "([34]\\d{6})$|1", "664$1", 0, "664"], "MT": ["356", "00", "3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2357-9]"]]]], "MU": ["230", "0(?:0|[24-7]0|3[03])", "(?:[57]|8\\d\\d)\\d{7}|[2-468]\\d{6}", [7, 8, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-46]|8[013]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[57]"]], ["(\\d{5})(\\d{5})", "$1 $2", ["8"]]], 0, 0, 0, 0, 0, 0, 0, "020"], "MV": ["960", "0(?:0|19)", "(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}", [7, 10], [["(\\d{3})(\\d{4})", "$1-$2", ["[34679]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "MW": ["265", "00", "(?:[1289]\\d|31|77)\\d{7}|1\\d{6}", [7, 9], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[137-9]"], "0$1"]], "0"], "MX": ["52", "0[09]", "[2-9]\\d{9}", [10], [["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["33|5[56]|81"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-9]"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "MY": ["60", "00", "1\\d{8,9}|(?:3\\d|[4-9])\\d{7}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1-$2 $3", ["[4-79]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1-$2 $3", ["1(?:[02469]|[378][1-9]|53)|8", "1(?:[02469]|[37][1-9]|53|8(?:[1-46-9]|5[7-9]))|8"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1-$2 $3", ["3"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3-$4", ["1(?:[367]|80)"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2 $3", ["15"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2 $3", ["1"], "0$1"]], "0"], "MZ": ["258", "00", "(?:2|8\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2|8[2-79]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]]], "NA": ["264", "00", "[68]\\d{7,8}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["87"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]], "0"], "NC": ["687", "00", "(?:050|[2-57-9]\\d\\d)\\d{3}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[02-57-9]"]]]], "NE": ["227", "00", "[027-9]\\d{7}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["08"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[089]|2[013]|7[0467]"]]]], "NF": ["672", "00", "[13]\\d{5}", [6], [["(\\d{2})(\\d{4})", "$1 $2", ["1[0-3]"]], ["(\\d)(\\d{5})", "$1 $2", ["[13]"]]], 0, 0, "([0-258]\\d{4})$", "3$1"], "NG": ["234", "009", "38\\d{6}|[78]\\d{9,13}|(?:20|9\\d)\\d{8}", [8, 10, 11, 12, 13, 14], [["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["3"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[7-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["20[129]"], "0$1"], ["(\\d{4})(\\d{2})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[78]"], "0$1"], ["(\\d{3})(\\d{5})(\\d{5,6})", "$1 $2 $3", ["[78]"], "0$1"]], "0"], "NI": ["505", "00", "(?:1800|[25-8]\\d{3})\\d{4}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[125-8]"]]]], "NL": ["31", "00", "(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|8\\d{6,9}|9\\d{6,10}|1\\d{4,5}", [5, 6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{4,7})", "$1 $2", ["[89]0"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["66"], "0$1"], ["(\\d)(\\d{8})", "$1 $2", ["6"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-578]|91"], "0$1"], ["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3", ["9"], "0$1"]], "0"], "NO": ["47", "00", "(?:0|[2-9]\\d{3})\\d{4}", [5, 8], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]"]]], 0, 0, 0, 0, 0, "[02-689]|7[0-8]"], "NP": ["977", "00", "(?:1\\d|9)\\d{9}|[1-9]\\d{7}", [8, 10, 11], [["(\\d)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"], ["(\\d{2})(\\d{6})", "$1-$2", ["1[01]|[2-8]|9(?:[1-59]|[67][2-6])"], "0$1"], ["(\\d{3})(\\d{7})", "$1-$2", ["9"]]], "0"], "NR": ["674", "00", "(?:444|(?:55|8\\d)\\d|666)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[4-68]"]]]], "NU": ["683", "00", "(?:[4-7]|888\\d)\\d{3}", [4, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["8"]]]], "NZ": ["64", "0(?:0|161)", "[1289]\\d{9}|50\\d{5}(?:\\d{2,3})?|[27-9]\\d{7,8}|(?:[34]\\d|6[0-35-9])\\d{6}|8\\d{4,6}", [5, 6, 7, 8, 9, 10], [["(\\d{2})(\\d{3,8})", "$1 $2", ["8[1-79]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["50[036-8]|8|90", "50(?:[0367]|88)|8|90"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["24|[346]|7[2-57-9]|9[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:10|74)|[589]"], "0$1"], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1|2[028]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,5})", "$1 $2 $3", ["2(?:[169]|7[0-35-9])|7"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, "00"], "OM": ["968", "00", "(?:1505|[279]\\d{3}|500)\\d{4}|800\\d{5,6}", [7, 8, 9], [["(\\d{3})(\\d{4,6})", "$1 $2", ["[58]"]], ["(\\d{2})(\\d{6})", "$1 $2", ["2"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[179]"]]]], "PA": ["507", "00", "(?:00800|8\\d{3})\\d{6}|[68]\\d{7}|[1-57-9]\\d{6}", [7, 8, 10, 11], [["(\\d{3})(\\d{4})", "$1-$2", ["[1-57-9]"]], ["(\\d{4})(\\d{4})", "$1-$2", ["[68]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]]], "PE": ["51", "00|19(?:1[124]|77|90)00", "(?:[14-8]|9\\d)\\d{7}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["80"], "(0$1)"], ["(\\d)(\\d{7})", "$1 $2", ["1"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[4-8]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"]]], "0", 0, 0, 0, 0, 0, 0, "00", " Anexo "], "PF": ["689", "00", "4\\d{5}(?:\\d{2})?|8\\d{7,8}", [6, 8, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["44"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4|8[7-9]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]]], "PG": ["675", "00|140[1-3]", "(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["18|[2-69]|85"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[78]"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "PH": ["63", "00", "(?:[2-7]|9\\d)\\d{8}|2\\d{5}|(?:1800|8)\\d{7,9}", [6, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{5})", "$1 $2", ["2"], "(0$1)"], ["(\\d{4})(\\d{4,6})", "$1 $2", ["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"], "(0$1)"], ["(\\d{5})(\\d{4})", "$1 $2", ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"], "(0$1)"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|8[2-8]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1"]]], "0"], "PK": ["92", "00", "122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}", [8, 9, 10, 11, 12], [["(\\d{3})(\\d{3})(\\d{2,7})", "$1 $2 $3", ["[89]0"], "0$1"], ["(\\d{4})(\\d{5})", "$1 $2", ["1"]], ["(\\d{3})(\\d{6,7})", "$1 $2", ["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])", "9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"], "(0$1)"], ["(\\d{2})(\\d{7,8})", "$1 $2", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"], "(0$1)"], ["(\\d{5})(\\d{5})", "$1 $2", ["58"], "(0$1)"], ["(\\d{3})(\\d{7})", "$1 $2", ["3"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[24-9]"], "(0$1)"]], "0"], "PL": ["48", "00", "(?:6|8\\d\\d)\\d{7}|[1-9]\\d{6}(?:\\d{2})?|[26]\\d{5}", [6, 7, 8, 9, 10], [["(\\d{5})", "$1", ["19"]], ["(\\d{3})(\\d{3})", "$1 $2", ["11|20|64"]], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1", "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["64"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["21|39|45|5[0137]|6[0469]|7[02389]|8(?:0[14]|8)"]], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[2-8]|[2-7]|8[1-79]|9[145]"]], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["8"]]]], "PM": ["508", "00", "[45]\\d{5}|(?:708|8\\d\\d)\\d{6}", [6, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[45]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"], "PR": ["1", "011", "(?:[589]\\d\\d|787)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "787|939"], "PS": ["970", "00", "[2489]2\\d{6}|(?:1\\d|5)\\d{8}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2489]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0"], "PT": ["351", "00", "1693\\d{5}|(?:[26-9]\\d|30)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[12]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["16|[236-9]"]]]], "PW": ["680", "01[12]", "(?:[24-8]\\d\\d|345|900)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]]], "PY": ["595", "00", "59\\d{4,6}|9\\d{5,10}|(?:[2-46-8]\\d|5[0-8])\\d{4,7}", [6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{3,6})", "$1 $2", ["[2-9]0"], "0$1"], ["(\\d{2})(\\d{5})", "$1 $2", ["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"], "(0$1)"], ["(\\d{3})(\\d{4,5})", "$1 $2", ["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["87"]], ["(\\d{3})(\\d{6})", "$1 $2", ["9(?:[5-79]|8[1-7])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"]]], "0"], "QA": ["974", "00", "800\\d{4}|(?:2|800)\\d{6}|(?:0080|[3-7])\\d{7}", [7, 8, 9, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["2[16]|8"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[3-7]"]]]], "RE": ["262", "00", "709\\d{6}|(?:26|[689]\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[26-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [["26(?:2\\d\\d|3(?:0\\d|1[0-6]))\\d{4}"], ["(?:69(?:2\\d\\d|3(?:[06][0-6]|1[013]|2[0-2]|3[0-39]|4\\d|5[0-5]|7[0-37]|8[0-8]|9[0-479]))|7092[0-3])\\d{4}"], ["80\\d{7}"], ["89[1-37-9]\\d{6}"], 0, 0, 0, 0, ["9(?:399[0-3]|479[0-6]|76(?:2[278]|3[0-37]))\\d{4}"], ["8(?:1[019]|2[0156]|84|90)\\d{6}"]]], "RO": ["40", "00", "(?:[236-8]\\d|90)\\d{7}|[23]\\d{5}", [6, 9], [["(\\d{3})(\\d{3})", "$1 $2", ["2[3-6]", "2[3-6]\\d9"], "0$1"], ["(\\d{2})(\\d{4})", "$1 $2", ["219|31"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[236-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, 0, " int "], "RS": ["381", "00", "38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}", [6, 7, 8, 9, 10, 11, 12], [["(\\d{3})(\\d{3,9})", "$1 $2", ["(?:2[389]|39)0|[7-9]"], "0$1"], ["(\\d{2})(\\d{5,10})", "$1 $2", ["[1-36]"], "0$1"]], "0"], "RU": ["7", "810", "8\\d{13}|[347-9]\\d{9}", [10, 14], [["(\\d{4})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-8]|2[1-9])", "7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:1[23]|[2-9]2))", "7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"], "8 ($1)", 1], ["(\\d{5})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-68]|2[1-9])", "7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))", "7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"], "8 ($1)", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[349]|8(?:[02-7]|1[1-8])"], "8 ($1)", 1], ["(\\d{4})(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["8"], "8 ($1)"]], "8", 0, 0, 0, 0, "3[04-689]|[489]", 0, "8~10"], "RW": ["250", "00", "(?:06|[27]\\d\\d|[89]00)\\d{6}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0$1"]], "0"], "SA": ["966", "00", "92\\d{7}|(?:[15]|8\\d)\\d{8}", [9, 10], [["(\\d{4})(\\d{5})", "$1 $2", ["9"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["81"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]], "0"], "SB": ["677", "0[01]", "[6-9]\\d{6}|[1-6]\\d{4}", [5, 7], [["(\\d{2})(\\d{5})", "$1 $2", ["6[89]|7|8[4-9]|9(?:[1-8]|9[0-8])"]]]], "SC": ["248", "010|0[0-2]", "(?:[2489]\\d|64)\\d{5}", [7], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[246]|9[57]"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "SD": ["249", "00", "[19]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[19]"], "0$1"]], "0"], "SE": ["46", "00", "(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}", [6, 7, 8, 9, 10, 12], [["(\\d{2})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["20"], "0$1", 0, "$1 $2 $3"], ["(\\d{3})(\\d{4})", "$1-$2", ["9(?:00|39|44|9)"], "0$1", 0, "$1 $2"], ["(\\d{2})(\\d{3})(\\d{2})", "$1-$2 $3", ["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3"], ["(\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3"], ["(\\d{3})(\\d{2,3})(\\d{3})", "$1-$2 $3", ["9(?:00|39|44)"], "0$1", 0, "$1 $2 $3"], ["(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["10|7"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{3})", "$1-$2 $3 $4", ["9"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4 $5", ["[26]"], "0$1", 0, "$1 $2 $3 $4 $5"]], "0"], "SG": ["65", "0[0-3]\\d", "(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}", [8, 10, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["[369]|8(?:0[1-9]|[1-9])"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]], ["(\\d{4})(\\d{4})(\\d{3})", "$1 $2 $3", ["7"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]]], "SH": ["290", "00", "(?:[256]\\d|8)\\d{3}", [4, 5], 0, 0, 0, 0, 0, 0, "[256]"], "SI": ["386", "00|10(?:22|66|88|99)", "[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}", [5, 6, 7, 8], [["(\\d{2})(\\d{3,6})", "$1 $2", ["8[09]|9"], "0$1"], ["(\\d{3})(\\d{5})", "$1 $2", ["59|8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37][01]|4[0139]|51|6"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-57]"], "(0$1)"]], "0", 0, 0, 0, 0, 0, 0, "00"], "SJ": ["47", "00", "0\\d{4}|(?:[489]\\d|79)\\d{6}", [5, 8], 0, 0, 0, 0, 0, 0, "79"], "SK": ["421", "00", "[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}", [6, 7, 9], [["(\\d)(\\d{2})(\\d{3,4})", "$1 $2 $3", ["21"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["[3-5][1-8]1", "[3-5][1-8]1[67]"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1/$2 $3 $4", ["[3-5]"], "0$1"]], "0"], "SL": ["232", "00", "(?:[237-9]\\d|66)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[236-9]"], "(0$1)"]], "0"], "SM": ["378", "00", "(?:0549|[5-7]\\d)\\d{6}", [8, 10], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]], ["(\\d{4})(\\d{6})", "$1 $2", ["0"]]], 0, 0, "([89]\\d{5})$", "0549$1"], "SN": ["221", "00", "(?:[378]\\d|93)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[379]"]]]], "SO": ["252", "00", "[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}", [6, 7, 8, 9], [["(\\d{2})(\\d{4})", "$1 $2", ["8[125]"]], ["(\\d{6})", "$1", ["[134]"]], ["(\\d)(\\d{6})", "$1 $2", ["[15]|2[0-79]|3[0-46-8]|4[0-7]"]], ["(\\d)(\\d{7})", "$1 $2", ["(?:2|90)4|[67]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[348]|64|79|90"]], ["(\\d{2})(\\d{5,7})", "$1 $2", ["1|28|6[0-35-9]|7[67]|9[2-9]"]]], "0"], "SR": ["597", "00", "(?:[2-5]|68|[78]\\d)\\d{5}", [6, 7], [["(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3", ["56"]], ["(\\d{3})(\\d{3})", "$1-$2", ["[2-5]"]], ["(\\d{3})(\\d{4})", "$1-$2", ["[6-8]"]]]], "SS": ["211", "00", "[19]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[19]"], "0$1"]], "0"], "ST": ["239", "00", "(?:22|9\\d)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[29]"]]]], "SV": ["503", "00", "[267]\\d{7}|(?:80\\d|900)\\d{4}(?:\\d{4})?", [7, 8, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["[89]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[267]"]], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[89]"]]]], "SX": ["1", "011", "7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "(5\\d{6})$|1", "721$1", 0, "721"], "SY": ["963", "00", "[1-359]\\d{8}|[1-5]\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-4]|5[1-3]"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[59]"], "0$1", 1]], "0"], "SZ": ["268", "00", "0800\\d{4}|(?:[237]\\d|900)\\d{6}", [8, 9], [["(\\d{4})(\\d{4})", "$1 $2", ["[0237]"]], ["(\\d{5})(\\d{4})", "$1 $2", ["9"]]]], "TA": ["290", "00", "8\\d{3}", [4], 0, 0, 0, 0, 0, 0, "8"], "TC": ["1", "011", "(?:[58]\\d\\d|649|900)\\d{7}", [10], 0, "1", 0, "([2-479]\\d{6})$|1", "649$1", 0, "649"], "TD": ["235", "00|16", "(?:22|[689]\\d|77)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[26-9]"]]], 0, 0, 0, 0, 0, 0, 0, "00"], "TG": ["228", "00", "[279]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[279]"]]]], "TH": ["66", "00[1-9]", "(?:001800|[2-57]|[689]\\d)\\d{7}|1\\d{7,9}", [8, 9, 10, 13], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[13-9]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0"], "TJ": ["992", "810", "[0-57-9]\\d{8}", [9], [["(\\d{6})(\\d)(\\d{2})", "$1 $2 $3", ["331", "3317"]], ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["44[02-479]|[34]7"]], ["(\\d{4})(\\d)(\\d{4})", "$1 $2 $3", ["3(?:[1245]|3[12])"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[0-57-9]"]]], 0, 0, 0, 0, 0, 0, 0, "8~10"], "TK": ["690", "00", "[2-47]\\d{3,6}", [4, 5, 6, 7]], "TL": ["670", "00", "7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-489]|70"]], ["(\\d{4})(\\d{4})", "$1 $2", ["7"]]]], "TM": ["993", "810", "(?:[1-6]\\d|71)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["12"], "(8 $1)"], ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-5]"], "(8 $1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[67]"], "8 $1"]], "8", 0, 0, 0, 0, 0, 0, "8~10"], "TN": ["216", "00", "[2-57-9]\\d{7}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-57-9]"]]]], "TO": ["676", "00", "(?:0800|(?:[5-8]\\d\\d|999)\\d)\\d{3}|[2-8]\\d{4}", [5, 7], [["(\\d{2})(\\d{3})", "$1-$2", ["[2-4]|50|6[09]|7[0-24-69]|8[05]"]], ["(\\d{4})(\\d{3})", "$1 $2", ["0"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[5-9]"]]]], "TR": ["90", "00", "4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}", [7, 10, 12, 13], [["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["512|8[01589]|90"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5(?:[0-59]|61)", "5(?:[0-59]|61[06])", "5(?:[0-59]|61[06]1)"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24][1-8]|3[1-9]"], "(0$1)", 1], ["(\\d{3})(\\d{3})(\\d{6,7})", "$1 $2 $3", ["80"], "0$1", 1]], "0"], "TT": ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-46-8]\\d{6})$|1", "868$1", 0, "868"], "TV": ["688", "00", "(?:2|7\\d\\d|90)\\d{4}", [5, 6, 7], [["(\\d{2})(\\d{3})", "$1 $2", ["2"]], ["(\\d{2})(\\d{4})", "$1 $2", ["90"]], ["(\\d{2})(\\d{5})", "$1 $2", ["7"]]]], "TW": ["886", "0(?:0[25-79]|19)", "[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}", [7, 8, 9, 10, 11], [["(\\d{2})(\\d)(\\d{4})", "$1 $2 $3", ["202"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[258]0"], "0$1"], ["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[23568]|4(?:0[02-48]|[1-47-9])|7[1-9]", "[23568]|4(?:0[2-48]|[1-47-9])|(?:400|7)[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["7"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, 0, "#"], "TZ": ["255", "00[056]", "(?:[25-8]\\d|41|90)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[24]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["5"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[67]"], "0$1"]], "0"], "UA": ["380", "00", "[89]\\d{9}|[3-9]\\d{8}", [9, 10], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]", "6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"], "0$1"], ["(\\d{4})(\\d{5})", "$1 $2", ["3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6[0135689]|7[4-6])|6(?:[12][3-7]|[459])", "3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][3-7]|[459])"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|89|9[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, "0~0"], "UG": ["256", "00[057]", "800\\d{6}|(?:[29]0|[347]\\d)\\d{7}", [9], [["(\\d{4})(\\d{5})", "$1 $2", ["202", "2024"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["[27-9]|4(?:6[45]|[7-9])"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["[34]"], "0$1"]], "0"], "US": ["1", "011", "[2-9]\\d{9}|3\\d{6}", [10], [["(\\d{3})(\\d{4})", "$1-$2", ["310"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3", ["[2-9]"], 0, 1, "$1-$2-$3"]], "1", 0, 0, 0, 0, 0, [["(?:3052(?:0[0-8]|[1-9]\\d)|5056(?:[0-35-9]\\d|4[0-468]))\\d{4}|(?:2742|305[3-9]|472[247-9]|505[2-57-9]|983[2-47-9])\\d{6}|(?:2(?:0[1-35-9]|1[02-9]|2[03-57-9]|3[1459]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-47-9]|1[02-9]|2[0135-79]|3[0-24679]|4[167]|5[0-2]|6[01349]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[349]|7[0589]|8[04])|5(?:0[1-47-9]|1[0235-8]|20|3[0149]|4[01]|5[179]|6[1-47]|7[0-5]|8[0256])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[0156]|5[01679]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-8]|3[0-247]|4[037]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[068]|3[0-2589]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01357-9]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}"], [""], ["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"], ["900[2-9]\\d{6}"], ["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}"], 0, 0, 0, ["305209\\d{4}"]]], "UY": ["598", "0(?:0|1[3-9]\\d)", "0004\\d{2,9}|[1249]\\d{7}|(?:[49]\\d|80)\\d{5}", [6, 7, 8, 9, 10, 11, 12, 13], [["(\\d{3})(\\d{3,4})", "$1 $2", ["0"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[49]0|8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{4})(\\d{4})", "$1 $2", ["[124]"]], ["(\\d{3})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{2,4})", "$1 $2 $3 $4", ["0"]]], "0", 0, 0, 0, 0, 0, 0, "00", " int. "], "UZ": ["998", "00", "(?:20|33|[5-9]\\d)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[235-9]"]]]], "VA": ["39", "00", "0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}", [6, 7, 8, 9, 10, 11, 12], 0, 0, 0, 0, 0, 0, "06698"], "VC": ["1", "011", "(?:[58]\\d\\d|784|900)\\d{7}", [10], 0, "1", 0, "([2-7]\\d{6})$|1", "784$1", 0, "784"], "VE": ["58", "00", "[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}", [10], [["(\\d{3})(\\d{7})", "$1-$2", ["[24-689]"], "0$1"]], "0"], "VG": ["1", "011", "(?:284|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-578]\\d{6})$|1", "284$1", 0, "284"], "VI": ["1", "011", "[58]\\d{9}|(?:34|90)0\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "340$1", 0, "340"], "VN": ["84", "00", "[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}", [7, 8, 9, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["80"], "0$1", 1], ["(\\d{4})(\\d{4,6})", "$1 $2", ["1"], 0, 1], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["6"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[357-9]"], "0$1", 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2[48]"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["2"], "0$1", 1]], "0"], "VU": ["678", "00", "[57-9]\\d{6}|(?:[238]\\d|48)\\d{3}", [5, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["[57-9]"]]]], "WF": ["681", "00", "(?:40|72|8\\d{4})\\d{4}|[89]\\d{5}", [6, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[47-9]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]]], "WS": ["685", "0", "(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}", [5, 6, 7, 10], [["(\\d{5})", "$1", ["[2-5]|6[1-9]"]], ["(\\d{3})(\\d{3,7})", "$1 $2", ["[68]"]], ["(\\d{2})(\\d{5})", "$1 $2", ["7"]]]], "XK": ["383", "00", "2\\d{7,8}|3\\d{7,11}|(?:4\\d\\d|[89]00)\\d{5}", [8, 9, 10, 11, 12], [["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-4]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2|39"], "0$1"], ["(\\d{2})(\\d{7,10})", "$1 $2", ["3"], "0$1"]], "0"], "YE": ["967", "00", "(?:1|7\\d)\\d{7}|[1-7]\\d{6}", [7, 8, 9], [["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-6]|7(?:[24-6]|8[0-7])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"], "0$1"]], "0"], "YT": ["262", "00", "7093\\d{5}|(?:80|9\\d)\\d{7}|(?:26|63)9\\d{6}", [9], 0, "0", 0, 0, 0, 0, 0, [["269(?:0[0-467]|15|5[0-4]|6\\d|[78]0)\\d{4}"], ["(?:639(?:0[0-79]|1[019]|[267]\\d|3[09]|40|5[05-9]|9[04-79])|7093[5-7])\\d{4}"], ["80\\d{7}"], 0, 0, 0, 0, 0, ["9(?:(?:39|47)8[01]|769\\d)\\d{4}"]]], "ZA": ["27", "00", "[1-79]\\d{8}|8\\d{4,9}", [5, 6, 7, 8, 9, 10], [["(\\d{2})(\\d{3,4})", "$1 $2", ["8[1-4]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["8[1-4]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["860"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]], "0"], "ZM": ["260", "00", "800\\d{6}|(?:21|[579]\\d|63)\\d{7}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[28]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["[579]"], "0$1"]], "0"], "ZW": ["263", "00", "2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}", [5, 6, 7, 8, 9, 10], [["(\\d{3})(\\d{3,5})", "$1 $2", ["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"], "0$1"], ["(\\d)(\\d{3})(\\d{2,4})", "$1 $2 $3", ["[49]"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["80"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2", "2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)", "2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"], "0$1"], ["(\\d{4})(\\d{6})", "$1 $2", ["8"], "0$1"], ["(\\d{2})(\\d{3,5})", "$1 $2", ["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["29[013-9]|39|54"], "0$1"], ["(\\d{4})(\\d{3,5})", "$1 $2", ["(?:25|54)8", "258|5483"], "0$1"]], "0"] }, "nonGeographic": { "800": ["800", 0, "(?:00|[1-9]\\d)\\d{6}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["\\d"]]], 0, 0, 0, 0, 0, 0, [0, 0, ["(?:00|[1-9]\\d)\\d{6}"]]], "808": ["808", 0, "[1-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[1-9]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, ["[1-9]\\d{7}"]]], "870": ["870", 0, "7\\d{11}|[235-7]\\d{8}", [9, 12], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235-7]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[356]|774[45])\\d{8}|7[6-8]\\d{7}"], 0, 0, 0, 0, 0, 0, ["2\\d{8}", [9]]]], "878": ["878", 0, "10\\d{10}", [12], [["(\\d{2})(\\d{5})(\\d{5})", "$1 $2 $3", ["1"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["10\\d{10}"]]], "881": ["881", 0, "6\\d{9}|[0-36-9]\\d{8}", [9, 10], [["(\\d)(\\d{3})(\\d{5})", "$1 $2 $3", ["[0-37-9]"]], ["(\\d)(\\d{3})(\\d{5,6})", "$1 $2 $3", ["6"]]], 0, 0, 0, 0, 0, 0, [0, ["6\\d{9}|[0-36-9]\\d{8}"]]], "882": ["882", 0, "[13]\\d{6}(?:\\d{2,5})?|[19]\\d{7}|(?:[25]\\d\\d|4)\\d{7}(?:\\d{2})?", [7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{5})", "$1 $2", ["16|342"]], ["(\\d{2})(\\d{6})", "$1 $2", ["49"]], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["1[36]|9"]], ["(\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["3[23]"]], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["16"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|23|3(?:[15]|4[57])|4|51"]], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["34"]], ["(\\d{2})(\\d{4,5})(\\d{5})", "$1 $2 $3", ["[1-35]"]]], 0, 0, 0, 0, 0, 0, [0, ["342\\d{4}|(?:337|49)\\d{6}|(?:3(?:2|47|7\\d{3})|50\\d{3})\\d{7}", [7, 8, 9, 10, 12]], 0, 0, 0, ["348[57]\\d{7}", [11]], 0, 0, ["1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:345\\d|9[89])\\d{6}|(?:10|2(?:3|85\\d)|3(?:[15]|[69]\\d\\d)|4[15-8]|51)\\d{8}"]]], "883": ["883", 0, "(?:[1-4]\\d|51)\\d{6,10}", [8, 9, 10, 11, 12], [["(\\d{3})(\\d{3})(\\d{2,8})", "$1 $2 $3", ["[14]|2[24-689]|3[02-689]|51[24-9]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["510"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["21"]], ["(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["51[13]"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[235]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["(?:2(?:00\\d\\d|10)|(?:370[1-9]|51\\d0)\\d)\\d{7}|51(?:00\\d{5}|[24-9]0\\d{4,7})|(?:1[0-79]|2[24-689]|3[02-689]|4[0-4])0\\d{5,9}"]]], "888": ["888", 0, "\\d{11}", [11], [["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, ["\\d{11}"]]], "979": ["979", 0, "[1359]\\d{8}", [9], [["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[1359]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, ["[1359]\\d{8}"]]] } };
function edit(value, caret, operation) {
  switch (operation) {
    case "Backspace":
      if (caret > 0) {
        value = value.slice(0, caret - 1) + value.slice(caret);
        caret--;
      }
      break;
    case "Delete":
      value = value.slice(0, caret) + value.slice(caret + 1);
      break;
  }
  return {
    value,
    caret
  };
}
function parse$1(text, caret_position, parse_character) {
  var context = {};
  var value = "";
  var focused_input_character_index = 0;
  var index = 0;
  while (index < text.length) {
    var character = parse_character(text[index], value, context);
    if (character !== void 0) {
      value += character;
      if (caret_position !== void 0) {
        if (caret_position === index) {
          focused_input_character_index = value.length - 1;
        } else if (caret_position > index) {
          focused_input_character_index = value.length;
        }
      }
    }
    index++;
  }
  if (caret_position === void 0) {
    focused_input_character_index = value.length;
  }
  var result2 = {
    value,
    caret: focused_input_character_index
  };
  return result2;
}
function _createForOfIteratorHelperLoose$c(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray$f(o)) || allowArrayLike) {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$f(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$f(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$f(o, minLen);
}
function _arrayLikeToArray$f(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function count_occurences(symbol, string) {
  var count = 0;
  for (var _iterator = _createForOfIteratorHelperLoose$c(string.split("")), _step; !(_step = _iterator()).done; ) {
    var character = _step.value;
    if (character === symbol) {
      count++;
    }
  }
  return count;
}
function closeBraces(retained_template, template) {
  var placeholder = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "x";
  var empty_placeholder = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : " ";
  var cut_before = retained_template.length;
  var opening_braces = count_occurences("(", retained_template);
  var closing_braces = count_occurences(")", retained_template);
  var dangling_braces = opening_braces - closing_braces;
  while (dangling_braces > 0 && cut_before < template.length) {
    retained_template += template[cut_before].replace(placeholder, empty_placeholder);
    if (template[cut_before] === ")") {
      dangling_braces--;
    }
    cut_before++;
  }
  return retained_template;
}
function _createForOfIteratorHelperLoose$b(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray$e(o)) || allowArrayLike) {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$e(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$e(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$e(o, minLen);
}
function _arrayLikeToArray$e(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function template_formatter(template) {
  var placeholder = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "x";
  var shouldCloseBraces = arguments.length > 2 ? arguments[2] : void 0;
  if (!template) {
    return function(value) {
      return {
        text: value
      };
    };
  }
  var placeholdersCountInTemplate = count_occurences(placeholder, template);
  return function(value) {
    if (!value) {
      return {
        text: "",
        template
      };
    }
    var characterIndexInValue = 0;
    var templateWithFilledInPlaceholders = "";
    for (var _iterator = _createForOfIteratorHelperLoose$b(template.split("")), _step; !(_step = _iterator()).done; ) {
      var character = _step.value;
      if (character !== placeholder) {
        templateWithFilledInPlaceholders += character;
        continue;
      }
      templateWithFilledInPlaceholders += value[characterIndexInValue];
      characterIndexInValue++;
      if (characterIndexInValue === value.length) {
        if (value.length < placeholdersCountInTemplate) {
          break;
        }
      }
    }
    if (shouldCloseBraces) {
      templateWithFilledInPlaceholders = closeBraces(templateWithFilledInPlaceholders, template);
    }
    return {
      text: templateWithFilledInPlaceholders,
      template
    };
  };
}
function format$1(value, caret, formatter) {
  if (typeof formatter === "string") {
    formatter = template_formatter(formatter);
  }
  var _ref = formatter(value) || {}, text = _ref.text, template = _ref.template;
  if (text === void 0) {
    text = value;
  }
  if (template) {
    if (caret === void 0) {
      caret = text.length;
    } else {
      var index = 0;
      var found = false;
      var possibly_last_input_character_index = -1;
      while (index < text.length && index < template.length) {
        if (text[index] !== template[index]) {
          if (caret === 0) {
            found = true;
            caret = index;
            break;
          }
          possibly_last_input_character_index = index;
          caret--;
        }
        index++;
      }
      if (!found) {
        caret = possibly_last_input_character_index + 1;
      }
    }
  }
  return {
    text,
    caret
  };
}
function isReadOnly(element) {
  return element.hasAttribute("readonly");
}
function getSelection(element) {
  if (element.selectionStart === element.selectionEnd) {
    return;
  }
  return {
    start: element.selectionStart,
    end: element.selectionEnd
  };
}
var Keys = {
  Backspace: 8,
  Delete: 46
};
function getOperation(event) {
  switch (event.keyCode) {
    case Keys.Backspace:
      return "Backspace";
    case Keys.Delete:
      return "Delete";
  }
}
function getCaretPosition$1(element) {
  return element.selectionStart;
}
function setCaretPosition(element, caret_position) {
  if (caret_position === void 0) {
    return;
  }
  if (isAndroid()) {
    setTimeout(function() {
      return element.setSelectionRange(caret_position, caret_position);
    }, 0);
  } else {
    element.setSelectionRange(caret_position, caret_position);
  }
}
function isAndroid() {
  if (typeof navigator !== "undefined") {
    return ANDROID_USER_AGENT_REG_EXP.test(navigator.userAgent);
  }
}
var ANDROID_USER_AGENT_REG_EXP = /Android/i;
function onChange(event, input, _parse, _format, on_change) {
  formatInputText(input, _parse, _format, void 0, on_change);
}
function onKeyDown(event, input, _parse, _format, on_change) {
  if (isReadOnly(input)) {
    return;
  }
  var operation = getOperation(event);
  switch (operation) {
    case "Delete":
    case "Backspace":
      event.preventDefault();
      var selection = getSelection(input);
      if (selection) {
        eraseSelection(input, selection);
        return formatInputText(input, _parse, _format, void 0, on_change);
      }
      return formatInputText(input, _parse, _format, operation, on_change);
  }
}
function eraseSelection(input, selection) {
  var text = input.value;
  text = text.slice(0, selection.start) + text.slice(selection.end);
  input.value = text;
  setCaretPosition(input, selection.start);
}
function formatInputText(input, _parse, _format, operation, on_change) {
  var _parse2 = parse$1(input.value, getCaretPosition$1(input), _parse), value = _parse2.value, caret = _parse2.caret;
  if (operation) {
    var newValueAndCaret = edit(value, caret, operation);
    value = newValueAndCaret.value;
    caret = newValueAndCaret.caret;
  }
  var formatted = format$1(value, caret, _format);
  var text = formatted.text;
  caret = formatted.caret;
  input.value = text;
  setCaretPosition(input, caret);
  if (on_change) {
    on_change(value);
  }
}
var _excluded$b = ["ref", "parse", "format", "value", "defaultValue", "controlled", "onChange", "onKeyDown"];
function ownKeys$o(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$o(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$o(Object(source), true).forEach(function(key) {
      _defineProperty$9(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$o(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$9(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutProperties$a(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$a(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$a(source, excluded) {
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
function useInput(_ref) {
  var ref = _ref.ref, parse2 = _ref.parse, format2 = _ref.format, value = _ref.value, defaultValue = _ref.defaultValue, _ref$controlled = _ref.controlled, controlled = _ref$controlled === void 0 ? true : _ref$controlled, onChange$1 = _ref.onChange, onKeyDown$1 = _ref.onKeyDown, rest = _objectWithoutProperties$a(_ref, _excluded$b);
  var internalRef = reactExports.useRef();
  var setRef = reactExports.useCallback(function(instance) {
    internalRef.current = instance;
    if (ref) {
      if (typeof ref === "function") {
        ref(instance);
      } else {
        ref.current = instance;
      }
    }
  }, [ref]);
  var _onChange = reactExports.useCallback(function(event) {
    return onChange(event, internalRef.current, parse2, format2, onChange$1);
  }, [internalRef, parse2, format2, onChange$1]);
  var _onKeyDown = reactExports.useCallback(function(event) {
    if (onKeyDown$1) {
      onKeyDown$1(event);
    }
    if (event.defaultPrevented) {
      return;
    }
    return onKeyDown(event, internalRef.current, parse2, format2, onChange$1);
  }, [internalRef, parse2, format2, onChange$1, onKeyDown$1]);
  var commonProps = _objectSpread$o(_objectSpread$o({}, rest), {}, {
    ref: setRef,
    onChange: _onChange,
    onKeyDown: _onKeyDown
  });
  if (controlled) {
    return _objectSpread$o(_objectSpread$o({}, commonProps), {}, {
      value: format2(isEmptyValue(value) ? "" : value).text
    });
  }
  return _objectSpread$o(_objectSpread$o({}, commonProps), {}, {
    defaultValue: format2(isEmptyValue(defaultValue) ? "" : defaultValue).text
  });
}
function isEmptyValue(value) {
  return value === void 0 || value === null;
}
var _excluded$a = ["inputComponent", "parse", "format", "value", "defaultValue", "onChange", "controlled", "onKeyDown", "type"];
function ownKeys$n(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$n(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$n(Object(source), true).forEach(function(key) {
      _defineProperty$8(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$n(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$8(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutProperties$9(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$9(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$9(source, excluded) {
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
function Input(_ref, ref) {
  var _ref$inputComponent = _ref.inputComponent, InputComponent = _ref$inputComponent === void 0 ? "input" : _ref$inputComponent, parse2 = _ref.parse, format2 = _ref.format, value = _ref.value, defaultValue = _ref.defaultValue, onChange2 = _ref.onChange, controlled = _ref.controlled, onKeyDown2 = _ref.onKeyDown, _ref$type = _ref.type, type = _ref$type === void 0 ? "text" : _ref$type, rest = _objectWithoutProperties$9(_ref, _excluded$a);
  var inputProps = useInput(_objectSpread$n({
    ref,
    parse: parse2,
    format: format2,
    value,
    defaultValue,
    onChange: onChange2,
    controlled,
    onKeyDown: onKeyDown2,
    type
  }, rest));
  return /* @__PURE__ */ U.createElement(InputComponent, inputProps);
}
Input = /* @__PURE__ */ U.forwardRef(Input);
Input.propTypes = {
  // Parses a single characher of `<input/>` text.
  parse: PropTypes.func.isRequired,
  // Formats `value` into `<input/>` text.
  format: PropTypes.func.isRequired,
  // Renders `<input/>` by default.
  inputComponent: PropTypes.elementType,
  // `<input/>` `type` attribute.
  type: PropTypes.string,
  // Is parsed from <input/> text.
  value: PropTypes.string,
  // An initial value for an "uncontrolled" <input/>.
  defaultValue: PropTypes.string,
  // This handler is called each time `<input/>` text is changed.
  onChange: PropTypes.func,
  // Whether this input should be "controlled" or "uncontrolled".
  // The default value is `true` meaning "uncontrolled".
  controlled: PropTypes.bool,
  // Passthrough
  onKeyDown: PropTypes.func,
  onCut: PropTypes.func,
  onPaste: PropTypes.func
};
function compare(a, b) {
  a = a.split("-");
  b = b.split("-");
  var pa = a[0].split(".");
  var pb = b[0].split(".");
  for (var i = 0; i < 3; i++) {
    var na = Number(pa[i]);
    var nb = Number(pb[i]);
    if (na > nb) return 1;
    if (nb > na) return -1;
    if (!isNaN(na) && isNaN(nb)) return 1;
    if (isNaN(na) && !isNaN(nb)) return -1;
  }
  if (a[1] && b[1]) {
    return a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0;
  }
  return !a[1] && b[1] ? 1 : a[1] && !b[1] ? -1 : 0;
}
var objectConstructor = {}.constructor;
function isObject(object) {
  return object !== void 0 && object !== null && object.constructor === objectConstructor;
}
function _typeof$4(obj) {
  "@babel/helpers - typeof";
  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$4(obj);
}
function _classCallCheck$9(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$8(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$9(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$8(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var V3 = "1.2.0";
var V4 = "1.7.35";
var DEFAULT_EXT_PREFIX = " ext. ";
var CALLING_CODE_REG_EXP = /^\d+$/;
var Metadata = /* @__PURE__ */ function() {
  function Metadata2(metadata2) {
    _classCallCheck$9(this, Metadata2);
    validateMetadata(metadata2);
    this.metadata = metadata2;
    setVersion.call(this, metadata2);
  }
  _createClass$9(Metadata2, [{
    key: "getCountries",
    value: function getCountries2() {
      return Object.keys(this.metadata.countries).filter(function(_) {
        return _ !== "001";
      });
    }
  }, {
    key: "getCountryMetadata",
    value: function getCountryMetadata(countryCode) {
      return this.metadata.countries[countryCode];
    }
  }, {
    key: "nonGeographic",
    value: function nonGeographic() {
      if (this.v1 || this.v2 || this.v3) return;
      return this.metadata.nonGeographic || this.metadata.nonGeographical;
    }
  }, {
    key: "hasCountry",
    value: function hasCountry(country) {
      return this.getCountryMetadata(country) !== void 0;
    }
  }, {
    key: "hasCallingCode",
    value: function hasCallingCode(callingCode) {
      if (this.getCountryCodesForCallingCode(callingCode)) {
        return true;
      }
      if (this.nonGeographic()) {
        if (this.nonGeographic()[callingCode]) {
          return true;
        }
      } else {
        var countryCodes = this.countryCallingCodes()[callingCode];
        if (countryCodes && countryCodes.length === 1 && countryCodes[0] === "001") {
          return true;
        }
      }
    }
  }, {
    key: "isNonGeographicCallingCode",
    value: function isNonGeographicCallingCode(callingCode) {
      if (this.nonGeographic()) {
        return this.nonGeographic()[callingCode] ? true : false;
      } else {
        return this.getCountryCodesForCallingCode(callingCode) ? false : true;
      }
    }
    // Deprecated.
  }, {
    key: "country",
    value: function country(countryCode) {
      return this.selectNumberingPlan(countryCode);
    }
  }, {
    key: "selectNumberingPlan",
    value: function selectNumberingPlan(countryCode, callingCode) {
      if (countryCode && CALLING_CODE_REG_EXP.test(countryCode)) {
        callingCode = countryCode;
        countryCode = null;
      }
      if (countryCode && countryCode !== "001") {
        if (!this.hasCountry(countryCode)) {
          throw new Error("Unknown country: ".concat(countryCode));
        }
        this.numberingPlan = new NumberingPlan(this.getCountryMetadata(countryCode), this);
      } else if (callingCode) {
        if (!this.hasCallingCode(callingCode)) {
          throw new Error("Unknown calling code: ".concat(callingCode));
        }
        this.numberingPlan = new NumberingPlan(this.getNumberingPlanMetadata(callingCode), this);
      } else {
        this.numberingPlan = void 0;
      }
      return this;
    }
  }, {
    key: "getCountryCodesForCallingCode",
    value: function getCountryCodesForCallingCode(callingCode) {
      var countryCodes = this.countryCallingCodes()[callingCode];
      if (countryCodes) {
        if (countryCodes.length === 1 && countryCodes[0].length === 3) {
          return;
        }
        return countryCodes;
      }
    }
  }, {
    key: "getCountryCodeForCallingCode",
    value: function getCountryCodeForCallingCode(callingCode) {
      var countryCodes = this.getCountryCodesForCallingCode(callingCode);
      if (countryCodes) {
        return countryCodes[0];
      }
    }
  }, {
    key: "getNumberingPlanMetadata",
    value: function getNumberingPlanMetadata(callingCode) {
      var countryCode = this.getCountryCodeForCallingCode(callingCode);
      if (countryCode) {
        return this.getCountryMetadata(countryCode);
      }
      if (this.nonGeographic()) {
        var metadata2 = this.nonGeographic()[callingCode];
        if (metadata2) {
          return metadata2;
        }
      } else {
        var countryCodes = this.countryCallingCodes()[callingCode];
        if (countryCodes && countryCodes.length === 1 && countryCodes[0] === "001") {
          return this.metadata.countries["001"];
        }
      }
    }
    // Deprecated.
  }, {
    key: "countryCallingCode",
    value: function countryCallingCode() {
      return this.numberingPlan.callingCode();
    }
    // Deprecated.
  }, {
    key: "IDDPrefix",
    value: function IDDPrefix() {
      return this.numberingPlan.IDDPrefix();
    }
    // Deprecated.
  }, {
    key: "defaultIDDPrefix",
    value: function defaultIDDPrefix() {
      return this.numberingPlan.defaultIDDPrefix();
    }
    // Deprecated.
  }, {
    key: "nationalNumberPattern",
    value: function nationalNumberPattern() {
      return this.numberingPlan.nationalNumberPattern();
    }
    // Deprecated.
  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      return this.numberingPlan.possibleLengths();
    }
    // Deprecated.
  }, {
    key: "formats",
    value: function formats() {
      return this.numberingPlan.formats();
    }
    // Deprecated.
  }, {
    key: "nationalPrefixForParsing",
    value: function nationalPrefixForParsing() {
      return this.numberingPlan.nationalPrefixForParsing();
    }
    // Deprecated.
  }, {
    key: "nationalPrefixTransformRule",
    value: function nationalPrefixTransformRule() {
      return this.numberingPlan.nationalPrefixTransformRule();
    }
    // Deprecated.
  }, {
    key: "leadingDigits",
    value: function leadingDigits() {
      return this.numberingPlan.leadingDigits();
    }
    // Deprecated.
  }, {
    key: "hasTypes",
    value: function hasTypes() {
      return this.numberingPlan.hasTypes();
    }
    // Deprecated.
  }, {
    key: "type",
    value: function type(_type) {
      return this.numberingPlan.type(_type);
    }
    // Deprecated.
  }, {
    key: "ext",
    value: function ext() {
      return this.numberingPlan.ext();
    }
  }, {
    key: "countryCallingCodes",
    value: function countryCallingCodes() {
      if (this.v1) return this.metadata.country_phone_code_to_countries;
      return this.metadata.country_calling_codes;
    }
    // Deprecated.
  }, {
    key: "chooseCountryByCountryCallingCode",
    value: function chooseCountryByCountryCallingCode(callingCode) {
      return this.selectNumberingPlan(callingCode);
    }
  }, {
    key: "hasSelectedNumberingPlan",
    value: function hasSelectedNumberingPlan() {
      return this.numberingPlan !== void 0;
    }
  }]);
  return Metadata2;
}();
var NumberingPlan = /* @__PURE__ */ function() {
  function NumberingPlan2(metadata2, globalMetadataObject) {
    _classCallCheck$9(this, NumberingPlan2);
    this.globalMetadataObject = globalMetadataObject;
    this.metadata = metadata2;
    setVersion.call(this, globalMetadataObject.metadata);
  }
  _createClass$9(NumberingPlan2, [{
    key: "callingCode",
    value: function callingCode() {
      return this.metadata[0];
    }
    // Formatting information for regions which share
    // a country calling code is contained by only one region
    // for performance reasons. For example, for NANPA region
    // ("North American Numbering Plan Administration",
    //  which includes USA, Canada, Cayman Islands, Bahamas, etc)
    // it will be contained in the metadata for `US`.
  }, {
    key: "getDefaultCountryMetadataForRegion",
    value: function getDefaultCountryMetadataForRegion() {
      return this.globalMetadataObject.getNumberingPlanMetadata(this.callingCode());
    }
    // Is always present.
  }, {
    key: "IDDPrefix",
    value: function IDDPrefix() {
      if (this.v1 || this.v2) return;
      return this.metadata[1];
    }
    // Is only present when a country supports multiple IDD prefixes.
  }, {
    key: "defaultIDDPrefix",
    value: function defaultIDDPrefix() {
      if (this.v1 || this.v2) return;
      return this.metadata[12];
    }
  }, {
    key: "nationalNumberPattern",
    value: function nationalNumberPattern() {
      if (this.v1 || this.v2) return this.metadata[1];
      return this.metadata[2];
    }
    // "possible length" data is always present in Google's metadata.
  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      if (this.v1) return;
      return this.metadata[this.v2 ? 2 : 3];
    }
  }, {
    key: "_getFormats",
    value: function _getFormats(metadata2) {
      return metadata2[this.v1 ? 2 : this.v2 ? 3 : 4];
    }
    // For countries of the same region (e.g. NANPA)
    // formats are all stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".
  }, {
    key: "formats",
    value: function formats() {
      var _this = this;
      var formats2 = this._getFormats(this.metadata) || this._getFormats(this.getDefaultCountryMetadataForRegion()) || [];
      return formats2.map(function(_) {
        return new Format(_, _this);
      });
    }
  }, {
    key: "nationalPrefix",
    value: function nationalPrefix() {
      return this.metadata[this.v1 ? 3 : this.v2 ? 4 : 5];
    }
  }, {
    key: "_getNationalPrefixFormattingRule",
    value: function _getNationalPrefixFormattingRule(metadata2) {
      return metadata2[this.v1 ? 4 : this.v2 ? 5 : 6];
    }
    // For countries of the same region (e.g. NANPA)
    // national prefix formatting rule is stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".
  }, {
    key: "nationalPrefixFormattingRule",
    value: function nationalPrefixFormattingRule() {
      return this._getNationalPrefixFormattingRule(this.metadata) || this._getNationalPrefixFormattingRule(this.getDefaultCountryMetadataForRegion());
    }
  }, {
    key: "_nationalPrefixForParsing",
    value: function _nationalPrefixForParsing() {
      return this.metadata[this.v1 ? 5 : this.v2 ? 6 : 7];
    }
  }, {
    key: "nationalPrefixForParsing",
    value: function nationalPrefixForParsing() {
      return this._nationalPrefixForParsing() || this.nationalPrefix();
    }
  }, {
    key: "nationalPrefixTransformRule",
    value: function nationalPrefixTransformRule() {
      return this.metadata[this.v1 ? 6 : this.v2 ? 7 : 8];
    }
  }, {
    key: "_getNationalPrefixIsOptionalWhenFormatting",
    value: function _getNationalPrefixIsOptionalWhenFormatting() {
      return !!this.metadata[this.v1 ? 7 : this.v2 ? 8 : 9];
    }
    // For countries of the same region (e.g. NANPA)
    // "national prefix is optional when formatting" flag is
    // stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".
  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
      return this._getNationalPrefixIsOptionalWhenFormatting(this.metadata) || this._getNationalPrefixIsOptionalWhenFormatting(this.getDefaultCountryMetadataForRegion());
    }
  }, {
    key: "leadingDigits",
    value: function leadingDigits() {
      return this.metadata[this.v1 ? 8 : this.v2 ? 9 : 10];
    }
  }, {
    key: "types",
    value: function types() {
      return this.metadata[this.v1 ? 9 : this.v2 ? 10 : 11];
    }
  }, {
    key: "hasTypes",
    value: function hasTypes() {
      if (this.types() && this.types().length === 0) {
        return false;
      }
      return !!this.types();
    }
  }, {
    key: "type",
    value: function type(_type2) {
      if (this.hasTypes() && getType(this.types(), _type2)) {
        return new Type(getType(this.types(), _type2), this);
      }
    }
  }, {
    key: "ext",
    value: function ext() {
      if (this.v1 || this.v2) return DEFAULT_EXT_PREFIX;
      return this.metadata[13] || DEFAULT_EXT_PREFIX;
    }
  }]);
  return NumberingPlan2;
}();
var Format = /* @__PURE__ */ function() {
  function Format2(format2, metadata2) {
    _classCallCheck$9(this, Format2);
    this._format = format2;
    this.metadata = metadata2;
  }
  _createClass$9(Format2, [{
    key: "pattern",
    value: function pattern() {
      return this._format[0];
    }
  }, {
    key: "format",
    value: function format2() {
      return this._format[1];
    }
  }, {
    key: "leadingDigitsPatterns",
    value: function leadingDigitsPatterns() {
      return this._format[2] || [];
    }
  }, {
    key: "nationalPrefixFormattingRule",
    value: function nationalPrefixFormattingRule() {
      return this._format[3] || this.metadata.nationalPrefixFormattingRule();
    }
  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
      return !!this._format[4] || this.metadata.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    }
  }, {
    key: "nationalPrefixIsMandatoryWhenFormattingInNationalFormat",
    value: function nationalPrefixIsMandatoryWhenFormattingInNationalFormat() {
      return this.usesNationalPrefix() && !this.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    }
    // Checks whether national prefix formatting rule contains national prefix.
  }, {
    key: "usesNationalPrefix",
    value: function usesNationalPrefix() {
      return this.nationalPrefixFormattingRule() && // Check that national prefix formatting rule is not a "dummy" one.
      !FIRST_GROUP_ONLY_PREFIX_PATTERN.test(this.nationalPrefixFormattingRule()) ? true : false;
    }
  }, {
    key: "internationalFormat",
    value: function internationalFormat() {
      return this._format[5] || this.format();
    }
  }]);
  return Format2;
}();
var FIRST_GROUP_ONLY_PREFIX_PATTERN = /^\(?\$1\)?$/;
var Type = /* @__PURE__ */ function() {
  function Type2(type, metadata2) {
    _classCallCheck$9(this, Type2);
    this.type = type;
    this.metadata = metadata2;
  }
  _createClass$9(Type2, [{
    key: "pattern",
    value: function pattern() {
      if (this.metadata.v1) return this.type;
      return this.type[0];
    }
  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      if (this.metadata.v1) return;
      return this.type[1] || this.metadata.possibleLengths();
    }
  }]);
  return Type2;
}();
function getType(types, type) {
  switch (type) {
    case "FIXED_LINE":
      return types[0];
    case "MOBILE":
      return types[1];
    case "TOLL_FREE":
      return types[2];
    case "PREMIUM_RATE":
      return types[3];
    case "PERSONAL_NUMBER":
      return types[4];
    case "VOICEMAIL":
      return types[5];
    case "UAN":
      return types[6];
    case "PAGER":
      return types[7];
    case "VOIP":
      return types[8];
    case "SHARED_COST":
      return types[9];
  }
}
function validateMetadata(metadata2) {
  if (!metadata2) {
    throw new Error("[libphonenumber-js] `metadata` argument not passed. Check your arguments.");
  }
  if (!isObject(metadata2) || !isObject(metadata2.countries)) {
    throw new Error("[libphonenumber-js] `metadata` argument was passed but it's not a valid metadata. Must be an object having `.countries` child object property. Got ".concat(isObject(metadata2) ? "an object of shape: { " + Object.keys(metadata2).join(", ") + " }" : "a " + typeOf(metadata2) + ": " + metadata2, "."));
  }
}
var typeOf = function typeOf2(_) {
  return _typeof$4(_);
};
function getCountryCallingCode(country, metadata2) {
  metadata2 = new Metadata(metadata2);
  if (metadata2.hasCountry(country)) {
    return metadata2.country(country).countryCallingCode();
  }
  throw new Error("Unknown country: ".concat(country));
}
function isSupportedCountry(country, metadata2) {
  return metadata2.countries.hasOwnProperty(country);
}
function setVersion(metadata2) {
  var version = metadata2.version;
  if (typeof version === "number") {
    this.v1 = version === 1;
    this.v2 = version === 2;
    this.v3 = version === 3;
    this.v4 = version === 4;
  } else {
    if (!version) {
      this.v1 = true;
    } else if (compare(version, V3) === -1) {
      this.v2 = true;
    } else if (compare(version, V4) === -1) {
      this.v3 = true;
    } else {
      this.v4 = true;
    }
  }
}
function checkNumberLength(nationalNumber, metadata2) {
  return checkNumberLengthForType(nationalNumber, void 0, metadata2);
}
function checkNumberLengthForType(nationalNumber, type, metadata2) {
  var type_info = metadata2.type(type);
  var possible_lengths = type_info && type_info.possibleLengths() || metadata2.possibleLengths();
  if (!possible_lengths) {
    return "IS_POSSIBLE";
  }
  var actual_length = nationalNumber.length;
  var minimum_length = possible_lengths[0];
  if (minimum_length === actual_length) {
    return "IS_POSSIBLE";
  }
  if (minimum_length > actual_length) {
    return "TOO_SHORT";
  }
  if (possible_lengths[possible_lengths.length - 1] < actual_length) {
    return "TOO_LONG";
  }
  return possible_lengths.indexOf(actual_length, 1) >= 0 ? "IS_POSSIBLE" : "INVALID_LENGTH";
}
function isPossiblePhoneNumber(input, options, metadata2) {
  if (options === void 0) {
    options = {};
  }
  metadata2 = new Metadata(metadata2);
  if (options.v2) {
    if (!input.countryCallingCode) {
      throw new Error("Invalid phone number object passed");
    }
    metadata2.selectNumberingPlan(input.countryCallingCode);
  } else {
    if (!input.phone) {
      return false;
    }
    if (input.country) {
      if (!metadata2.hasCountry(input.country)) {
        throw new Error("Unknown country: ".concat(input.country));
      }
      metadata2.country(input.country);
    } else {
      if (!input.countryCallingCode) {
        throw new Error("Invalid phone number object passed");
      }
      metadata2.selectNumberingPlan(input.countryCallingCode);
    }
  }
  if (metadata2.possibleLengths()) {
    return isPossibleNumber(input.phone || input.nationalNumber, metadata2);
  } else {
    if (input.countryCallingCode && metadata2.isNonGeographicCallingCode(input.countryCallingCode)) {
      return true;
    } else {
      throw new Error('Missing "possibleLengths" in metadata. Perhaps the metadata has been generated before v1.0.18.');
    }
  }
}
function isPossibleNumber(nationalNumber, metadata2) {
  switch (checkNumberLength(nationalNumber, metadata2)) {
    case "IS_POSSIBLE":
      return true;
    default:
      return false;
  }
}
function matchesEntirely(text, regular_expression) {
  text = text || "";
  return new RegExp("^(?:" + regular_expression + ")$").test(text);
}
function _createForOfIteratorHelperLoose$a(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray$d(o)) || allowArrayLike) {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$d(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$d(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$d(o, minLen);
}
function _arrayLikeToArray$d(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
var NON_FIXED_LINE_PHONE_TYPES = ["MOBILE", "PREMIUM_RATE", "TOLL_FREE", "SHARED_COST", "VOIP", "PERSONAL_NUMBER", "PAGER", "UAN", "VOICEMAIL"];
function getNumberType(input, options, metadata2) {
  options = options || {};
  if (!input.country && !input.countryCallingCode) {
    return;
  }
  metadata2 = new Metadata(metadata2);
  metadata2.selectNumberingPlan(input.country, input.countryCallingCode);
  var nationalNumber = options.v2 ? input.nationalNumber : input.phone;
  if (!matchesEntirely(nationalNumber, metadata2.nationalNumberPattern())) {
    return;
  }
  if (isNumberTypeEqualTo(nationalNumber, "FIXED_LINE", metadata2)) {
    if (metadata2.type("MOBILE") && metadata2.type("MOBILE").pattern() === "") {
      return "FIXED_LINE_OR_MOBILE";
    }
    if (!metadata2.type("MOBILE")) {
      return "FIXED_LINE_OR_MOBILE";
    }
    if (isNumberTypeEqualTo(nationalNumber, "MOBILE", metadata2)) {
      return "FIXED_LINE_OR_MOBILE";
    }
    return "FIXED_LINE";
  }
  for (var _iterator = _createForOfIteratorHelperLoose$a(NON_FIXED_LINE_PHONE_TYPES), _step; !(_step = _iterator()).done; ) {
    var type = _step.value;
    if (isNumberTypeEqualTo(nationalNumber, type, metadata2)) {
      return type;
    }
  }
}
function isNumberTypeEqualTo(nationalNumber, type, metadata2) {
  type = metadata2.type(type);
  if (!type || !type.pattern()) {
    return false;
  }
  if (type.possibleLengths() && type.possibleLengths().indexOf(nationalNumber.length) < 0) {
    return false;
  }
  return matchesEntirely(nationalNumber, type.pattern());
}
function isValidNumber(input, options, metadata2) {
  options = options || {};
  metadata2 = new Metadata(metadata2);
  metadata2.selectNumberingPlan(input.country, input.countryCallingCode);
  if (metadata2.hasTypes()) {
    return getNumberType(input, options, metadata2.metadata) !== void 0;
  }
  var nationalNumber = options.v2 ? input.nationalNumber : input.phone;
  return matchesEntirely(nationalNumber, metadata2.nationalNumberPattern());
}
function getPossibleCountriesForNumber(callingCode, nationalNumber, metadata2) {
  var _metadata = new Metadata(metadata2);
  var possibleCountries = _metadata.getCountryCodesForCallingCode(callingCode);
  if (!possibleCountries) {
    return [];
  }
  return possibleCountries.filter(function(country) {
    return couldNationalNumberBelongToCountry(nationalNumber, country, metadata2);
  });
}
function couldNationalNumberBelongToCountry(nationalNumber, country, metadata2) {
  var _metadata = new Metadata(metadata2);
  _metadata.selectNumberingPlan(country);
  if (_metadata.numberingPlan.possibleLengths().indexOf(nationalNumber.length) >= 0) {
    return true;
  }
  return false;
}
var MIN_LENGTH_FOR_NSN = 2;
var MAX_LENGTH_FOR_NSN = 17;
var MAX_LENGTH_COUNTRY_CODE = 3;
var VALID_DIGITS = "0-9０-９٠-٩۰-۹";
var DASHES = "-‐-―−ー－";
var SLASHES = "／/";
var DOTS = "．.";
var WHITESPACE = "  ­​⁠　";
var BRACKETS = "()（）［］\\[\\]";
var TILDES = "~⁓∼～";
var VALID_PUNCTUATION = "".concat(DASHES).concat(SLASHES).concat(DOTS).concat(WHITESPACE).concat(BRACKETS).concat(TILDES);
var PLUS_CHARS = "+＋";
var CAPTURING_DIGIT_PATTERN = new RegExp("([" + VALID_DIGITS + "])");
function stripIddPrefix(number, country, callingCode, metadata2) {
  if (!country) {
    return;
  }
  var countryMetadata = new Metadata(metadata2);
  countryMetadata.selectNumberingPlan(country, callingCode);
  var IDDPrefixPattern = new RegExp(countryMetadata.IDDPrefix());
  if (number.search(IDDPrefixPattern) !== 0) {
    return;
  }
  number = number.slice(number.match(IDDPrefixPattern)[0].length);
  var matchedGroups = number.match(CAPTURING_DIGIT_PATTERN);
  if (matchedGroups && matchedGroups[1] != null && matchedGroups[1].length > 0) {
    if (matchedGroups[1] === "0") {
      return;
    }
  }
  return number;
}
function extractNationalNumberFromPossiblyIncompleteNumber(number, metadata2) {
  if (number && metadata2.numberingPlan.nationalPrefixForParsing()) {
    var prefixPattern = new RegExp("^(?:" + metadata2.numberingPlan.nationalPrefixForParsing() + ")");
    var prefixMatch = prefixPattern.exec(number);
    if (prefixMatch) {
      var nationalNumber;
      var carrierCode;
      var capturedGroupsCount = prefixMatch.length - 1;
      var hasCapturedGroups = capturedGroupsCount > 0 && prefixMatch[capturedGroupsCount];
      if (metadata2.nationalPrefixTransformRule() && hasCapturedGroups) {
        nationalNumber = number.replace(prefixPattern, metadata2.nationalPrefixTransformRule());
        if (capturedGroupsCount > 1) {
          carrierCode = prefixMatch[1];
        }
      } else {
        var prefixBeforeNationalNumber = prefixMatch[0];
        nationalNumber = number.slice(prefixBeforeNationalNumber.length);
        if (hasCapturedGroups) {
          carrierCode = prefixMatch[1];
        }
      }
      var nationalPrefix;
      if (hasCapturedGroups) {
        var possiblePositionOfTheFirstCapturedGroup = number.indexOf(prefixMatch[1]);
        var possibleNationalPrefix = number.slice(0, possiblePositionOfTheFirstCapturedGroup);
        if (possibleNationalPrefix === metadata2.numberingPlan.nationalPrefix()) {
          nationalPrefix = metadata2.numberingPlan.nationalPrefix();
        }
      } else {
        nationalPrefix = prefixMatch[0];
      }
      return {
        nationalNumber,
        nationalPrefix,
        carrierCode
      };
    }
  }
  return {
    nationalNumber: number
  };
}
function extractNationalNumber(number, metadata2) {
  var _extractNationalNumbe = extractNationalNumberFromPossiblyIncompleteNumber(number, metadata2), carrierCode = _extractNationalNumbe.carrierCode, nationalNumber = _extractNationalNumbe.nationalNumber;
  if (nationalNumber !== number) {
    if (!shouldHaveExtractedNationalPrefix(number, nationalNumber, metadata2)) {
      return {
        nationalNumber: number
      };
    }
    if (metadata2.possibleLengths()) {
      if (!isPossibleIncompleteNationalNumber(nationalNumber, metadata2)) {
        return {
          nationalNumber: number
        };
      }
    }
  }
  return {
    nationalNumber,
    carrierCode
  };
}
function shouldHaveExtractedNationalPrefix(nationalNumberBefore, nationalNumberAfter, metadata2) {
  if (matchesEntirely(nationalNumberBefore, metadata2.nationalNumberPattern()) && !matchesEntirely(nationalNumberAfter, metadata2.nationalNumberPattern())) {
    return false;
  }
  return true;
}
function isPossibleIncompleteNationalNumber(nationalNumber, metadata2) {
  switch (checkNumberLength(nationalNumber, metadata2)) {
    case "TOO_SHORT":
    case "INVALID_LENGTH":
      return false;
    default:
      return true;
  }
}
function extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(number, country, callingCode, metadata2) {
  var countryCallingCode = country ? getCountryCallingCode(country, metadata2) : callingCode;
  if (number.indexOf(countryCallingCode) === 0) {
    metadata2 = new Metadata(metadata2);
    metadata2.selectNumberingPlan(country, callingCode);
    var possibleShorterNumber = number.slice(countryCallingCode.length);
    var _extractNationalNumbe = extractNationalNumber(possibleShorterNumber, metadata2), possibleShorterNationalNumber = _extractNationalNumbe.nationalNumber;
    var _extractNationalNumbe2 = extractNationalNumber(number, metadata2), nationalNumber = _extractNationalNumbe2.nationalNumber;
    if (!matchesEntirely(nationalNumber, metadata2.nationalNumberPattern()) && matchesEntirely(possibleShorterNationalNumber, metadata2.nationalNumberPattern()) || checkNumberLength(nationalNumber, metadata2) === "TOO_LONG") {
      return {
        countryCallingCode,
        number: possibleShorterNumber
      };
    }
  }
  return {
    number
  };
}
function extractCountryCallingCode(number, country, callingCode, metadata2) {
  if (!number) {
    return {};
  }
  var isNumberWithIddPrefix;
  if (number[0] !== "+") {
    var numberWithoutIDD = stripIddPrefix(number, country, callingCode, metadata2);
    if (numberWithoutIDD && numberWithoutIDD !== number) {
      isNumberWithIddPrefix = true;
      number = "+" + numberWithoutIDD;
    } else {
      if (country || callingCode) {
        var _extractCountryCallin = extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(number, country, callingCode, metadata2), countryCallingCode = _extractCountryCallin.countryCallingCode, shorterNumber = _extractCountryCallin.number;
        if (countryCallingCode) {
          return {
            countryCallingCodeSource: "FROM_NUMBER_WITHOUT_PLUS_SIGN",
            countryCallingCode,
            number: shorterNumber
          };
        }
      }
      return {
        // No need to set it to `UNSPECIFIED`. It can be just `undefined`.
        // countryCallingCodeSource: 'UNSPECIFIED',
        number
      };
    }
  }
  if (number[1] === "0") {
    return {};
  }
  metadata2 = new Metadata(metadata2);
  var i = 2;
  while (i - 1 <= MAX_LENGTH_COUNTRY_CODE && i <= number.length) {
    var _countryCallingCode = number.slice(1, i);
    if (metadata2.hasCallingCode(_countryCallingCode)) {
      metadata2.selectNumberingPlan(_countryCallingCode);
      return {
        countryCallingCodeSource: isNumberWithIddPrefix ? "FROM_NUMBER_WITH_IDD" : "FROM_NUMBER_WITH_PLUS_SIGN",
        countryCallingCode: _countryCallingCode,
        number: number.slice(i)
      };
    }
    i++;
  }
  return {};
}
function applyInternationalSeparatorStyle(formattedNumber) {
  return formattedNumber.replace(new RegExp("[".concat(VALID_PUNCTUATION, "]+"), "g"), " ").trim();
}
var FIRST_GROUP_PATTERN = /(\$\d)/;
function formatNationalNumberUsingFormat(number, format2, _ref) {
  var useInternationalFormat = _ref.useInternationalFormat, withNationalPrefix = _ref.withNationalPrefix;
  _ref.carrierCode;
  _ref.metadata;
  var formattedNumber = number.replace(new RegExp(format2.pattern()), useInternationalFormat ? format2.internationalFormat() : (
    // This library doesn't use `domestic_carrier_code_formatting_rule`,
    // because that one is only used when formatting phone numbers
    // for dialing from a mobile phone, and this is not a dialing library.
    // carrierCode && format.domesticCarrierCodeFormattingRule()
    // 	// First, replace the $CC in the formatting rule with the desired carrier code.
    // 	// Then, replace the $FG in the formatting rule with the first group
    // 	// and the carrier code combined in the appropriate way.
    // 	? format.format().replace(FIRST_GROUP_PATTERN, format.domesticCarrierCodeFormattingRule().replace('$CC', carrierCode))
    // 	: (
    // 		withNationalPrefix && format.nationalPrefixFormattingRule()
    // 			? format.format().replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule())
    // 			: format.format()
    // 	)
    withNationalPrefix && format2.nationalPrefixFormattingRule() ? format2.format().replace(FIRST_GROUP_PATTERN, format2.nationalPrefixFormattingRule()) : format2.format()
  ));
  if (useInternationalFormat) {
    return applyInternationalSeparatorStyle(formattedNumber);
  }
  return formattedNumber;
}
var SINGLE_IDD_PREFIX_REG_EXP = /^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/;
function getIddPrefix(country, callingCode, metadata2) {
  var countryMetadata = new Metadata(metadata2);
  countryMetadata.selectNumberingPlan(country, callingCode);
  if (countryMetadata.defaultIDDPrefix()) {
    return countryMetadata.defaultIDDPrefix();
  }
  if (SINGLE_IDD_PREFIX_REG_EXP.test(countryMetadata.IDDPrefix())) {
    return countryMetadata.IDDPrefix();
  }
}
var RFC3966_EXTN_PREFIX = ";ext=";
var getExtensionDigitsPattern = function getExtensionDigitsPattern2(maxLength) {
  return "([".concat(VALID_DIGITS, "]{1,").concat(maxLength, "})");
};
function createExtensionPattern(purpose) {
  var extLimitAfterExplicitLabel = "20";
  var extLimitAfterLikelyLabel = "15";
  var extLimitAfterAmbiguousChar = "9";
  var extLimitWhenNotSure = "6";
  var possibleSeparatorsBetweenNumberAndExtLabel = "[  \\t,]*";
  var possibleCharsAfterExtLabel = "[:\\.．]?[  \\t,-]*";
  var optionalExtnSuffix = "#?";
  var explicitExtLabels = "(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|доб|anexo)";
  var ambiguousExtLabels = "(?:[xｘ#＃~～]|int|ｉｎｔ)";
  var ambiguousSeparator = "[- ]+";
  var possibleSeparatorsNumberExtLabelNoComma = "[  \\t]*";
  var autoDiallingAndExtLabelsFound = "(?:,{2}|;)";
  var rfcExtn = RFC3966_EXTN_PREFIX + getExtensionDigitsPattern(extLimitAfterExplicitLabel);
  var explicitExtn = possibleSeparatorsBetweenNumberAndExtLabel + explicitExtLabels + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterExplicitLabel) + optionalExtnSuffix;
  var ambiguousExtn = possibleSeparatorsBetweenNumberAndExtLabel + ambiguousExtLabels + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterAmbiguousChar) + optionalExtnSuffix;
  var americanStyleExtnWithSuffix = ambiguousSeparator + getExtensionDigitsPattern(extLimitWhenNotSure) + "#";
  var autoDiallingExtn = possibleSeparatorsNumberExtLabelNoComma + autoDiallingAndExtLabelsFound + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterLikelyLabel) + optionalExtnSuffix;
  var onlyCommasExtn = possibleSeparatorsNumberExtLabelNoComma + "(?:,)+" + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterAmbiguousChar) + optionalExtnSuffix;
  return rfcExtn + "|" + explicitExtn + "|" + ambiguousExtn + "|" + americanStyleExtnWithSuffix + "|" + autoDiallingExtn + "|" + onlyCommasExtn;
}
var MIN_LENGTH_PHONE_NUMBER_PATTERN = "[" + VALID_DIGITS + "]{" + MIN_LENGTH_FOR_NSN + "}";
var VALID_PHONE_NUMBER = "[" + PLUS_CHARS + "]{0,1}(?:[" + VALID_PUNCTUATION + "]*[" + VALID_DIGITS + "]){3,}[" + VALID_PUNCTUATION + VALID_DIGITS + "]*";
var VALID_PHONE_NUMBER_START_REG_EXP = new RegExp("^[" + PLUS_CHARS + "]{0,1}(?:[" + VALID_PUNCTUATION + "]*[" + VALID_DIGITS + "]){1,2}$", "i");
var VALID_PHONE_NUMBER_WITH_EXTENSION = VALID_PHONE_NUMBER + // Phone number extensions
"(?:" + createExtensionPattern() + ")?";
var VALID_PHONE_NUMBER_PATTERN = new RegExp(
  // Either a short two-digit-only phone number
  "^" + MIN_LENGTH_PHONE_NUMBER_PATTERN + "$|^" + VALID_PHONE_NUMBER_WITH_EXTENSION + "$",
  "i"
);
function isViablePhoneNumber(number) {
  return number.length >= MIN_LENGTH_FOR_NSN && VALID_PHONE_NUMBER_PATTERN.test(number);
}
function isViablePhoneNumberStart(number) {
  return VALID_PHONE_NUMBER_START_REG_EXP.test(number);
}
function formatRFC3966(_ref) {
  var number = _ref.number, ext = _ref.ext;
  if (!number) {
    return "";
  }
  if (number[0] !== "+") {
    throw new Error('"formatRFC3966()" expects "number" to be in E.164 format.');
  }
  return "tel:".concat(number).concat(ext ? ";ext=" + ext : "");
}
function _createForOfIteratorHelperLoose$9(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray$c(o)) || allowArrayLike) {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$c(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$c(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$c(o, minLen);
}
function _arrayLikeToArray$c(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function ownKeys$m(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$m(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$m(Object(source), true).forEach(function(key) {
      _defineProperty$7(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$m(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$7(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var DEFAULT_OPTIONS = {
  formatExtension: function formatExtension(formattedNumber, extension, metadata2) {
    return "".concat(formattedNumber).concat(metadata2.ext()).concat(extension);
  }
};
function formatNumber(input, format2, options, metadata2) {
  if (options) {
    options = _objectSpread$m(_objectSpread$m({}, DEFAULT_OPTIONS), options);
  } else {
    options = DEFAULT_OPTIONS;
  }
  metadata2 = new Metadata(metadata2);
  if (input.country && input.country !== "001") {
    if (!metadata2.hasCountry(input.country)) {
      throw new Error("Unknown country: ".concat(input.country));
    }
    metadata2.country(input.country);
  } else if (input.countryCallingCode) {
    metadata2.selectNumberingPlan(input.countryCallingCode);
  } else return input.phone || "";
  var countryCallingCode = metadata2.countryCallingCode();
  var nationalNumber = options.v2 ? input.nationalNumber : input.phone;
  var number;
  switch (format2) {
    case "NATIONAL":
      if (!nationalNumber) {
        return "";
      }
      number = formatNationalNumber$1(nationalNumber, input.carrierCode, "NATIONAL", metadata2, options);
      return addExtension(number, input.ext, metadata2, options.formatExtension);
    case "INTERNATIONAL":
      if (!nationalNumber) {
        return "+".concat(countryCallingCode);
      }
      number = formatNationalNumber$1(nationalNumber, null, "INTERNATIONAL", metadata2, options);
      number = "+".concat(countryCallingCode, " ").concat(number);
      return addExtension(number, input.ext, metadata2, options.formatExtension);
    case "E.164":
      return "+".concat(countryCallingCode).concat(nationalNumber);
    case "RFC3966":
      return formatRFC3966({
        number: "+".concat(countryCallingCode).concat(nationalNumber),
        ext: input.ext
      });
    case "IDD":
      if (!options.fromCountry) {
        return;
      }
      var formattedNumber = formatIDD(nationalNumber, input.carrierCode, countryCallingCode, options.fromCountry, metadata2);
      return addExtension(formattedNumber, input.ext, metadata2, options.formatExtension);
    default:
      throw new Error('Unknown "format" argument passed to "formatNumber()": "'.concat(format2, '"'));
  }
}
function formatNationalNumber$1(number, carrierCode, formatAs, metadata2, options) {
  var format2 = chooseFormatForNumber(metadata2.formats(), number);
  if (!format2) {
    return number;
  }
  return formatNationalNumberUsingFormat(number, format2, {
    useInternationalFormat: formatAs === "INTERNATIONAL",
    withNationalPrefix: format2.nationalPrefixIsOptionalWhenFormattingInNationalFormat() && options && options.nationalPrefix === false ? false : true,
    carrierCode,
    metadata: metadata2
  });
}
function chooseFormatForNumber(availableFormats, nationalNnumber) {
  for (var _iterator = _createForOfIteratorHelperLoose$9(availableFormats), _step; !(_step = _iterator()).done; ) {
    var format2 = _step.value;
    if (format2.leadingDigitsPatterns().length > 0) {
      var lastLeadingDigitsPattern = format2.leadingDigitsPatterns()[format2.leadingDigitsPatterns().length - 1];
      if (nationalNnumber.search(lastLeadingDigitsPattern) !== 0) {
        continue;
      }
    }
    if (matchesEntirely(nationalNnumber, format2.pattern())) {
      return format2;
    }
  }
}
function addExtension(formattedNumber, ext, metadata2, formatExtension2) {
  return ext ? formatExtension2(formattedNumber, ext, metadata2) : formattedNumber;
}
function formatIDD(nationalNumber, carrierCode, countryCallingCode, fromCountry, metadata2) {
  var fromCountryCallingCode = getCountryCallingCode(fromCountry, metadata2.metadata);
  if (fromCountryCallingCode === countryCallingCode) {
    var formattedNumber = formatNationalNumber$1(nationalNumber, carrierCode, "NATIONAL", metadata2);
    if (countryCallingCode === "1") {
      return countryCallingCode + " " + formattedNumber;
    }
    return formattedNumber;
  }
  var iddPrefix = getIddPrefix(fromCountry, void 0, metadata2.metadata);
  if (iddPrefix) {
    return "".concat(iddPrefix, " ").concat(countryCallingCode, " ").concat(formatNationalNumber$1(nationalNumber, null, "INTERNATIONAL", metadata2));
  }
}
function ownKeys$l(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$l(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$l(Object(source), true).forEach(function(key) {
      _defineProperty$6(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$l(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$6(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck$8(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$7(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$8(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$7(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var PhoneNumber = /* @__PURE__ */ function() {
  function PhoneNumber2(countryOrCountryCallingCode, nationalNumber, metadata2) {
    _classCallCheck$8(this, PhoneNumber2);
    if (!countryOrCountryCallingCode) {
      throw new TypeError("First argument is required");
    }
    if (typeof countryOrCountryCallingCode !== "string") {
      throw new TypeError("First argument must be a string");
    }
    if (typeof countryOrCountryCallingCode === "string") {
      if (countryOrCountryCallingCode[0] === "+" && !nationalNumber) {
        throw new TypeError("`metadata` argument not passed");
      }
      if (isObject(nationalNumber) && isObject(nationalNumber.countries)) {
        metadata2 = nationalNumber;
        var e164Number = countryOrCountryCallingCode;
        if (!E164_NUMBER_REGEXP.test(e164Number)) {
          throw new Error('Invalid `number` argument passed: must consist of a "+" followed by digits');
        }
        var _extractCountryCallin = extractCountryCallingCode(e164Number, void 0, void 0, metadata2), _countryCallingCode = _extractCountryCallin.countryCallingCode, number = _extractCountryCallin.number;
        nationalNumber = number;
        countryOrCountryCallingCode = _countryCallingCode;
        if (!nationalNumber) {
          throw new Error("Invalid `number` argument passed: too short");
        }
      }
    }
    if (!nationalNumber) {
      throw new TypeError("`nationalNumber` argument is required");
    }
    if (typeof nationalNumber !== "string") {
      throw new TypeError("`nationalNumber` argument must be a string");
    }
    validateMetadata(metadata2);
    var _getCountryAndCountry = getCountryAndCountryCallingCode(countryOrCountryCallingCode, metadata2), country = _getCountryAndCountry.country, countryCallingCode = _getCountryAndCountry.countryCallingCode;
    this.country = country;
    this.countryCallingCode = countryCallingCode;
    this.nationalNumber = nationalNumber;
    this.number = "+" + this.countryCallingCode + this.nationalNumber;
    this.getMetadata = function() {
      return metadata2;
    };
  }
  _createClass$8(PhoneNumber2, [{
    key: "setExt",
    value: function setExt(ext) {
      this.ext = ext;
    }
  }, {
    key: "getPossibleCountries",
    value: function getPossibleCountries() {
      if (this.country) {
        return [this.country];
      }
      return getPossibleCountriesForNumber(this.countryCallingCode, this.nationalNumber, this.getMetadata());
    }
  }, {
    key: "isPossible",
    value: function isPossible() {
      return isPossiblePhoneNumber(this, {
        v2: true
      }, this.getMetadata());
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return isValidNumber(this, {
        v2: true
      }, this.getMetadata());
    }
  }, {
    key: "isNonGeographic",
    value: function isNonGeographic() {
      var metadata2 = new Metadata(this.getMetadata());
      return metadata2.isNonGeographicCallingCode(this.countryCallingCode);
    }
  }, {
    key: "isEqual",
    value: function isEqual(phoneNumber) {
      return this.number === phoneNumber.number && this.ext === phoneNumber.ext;
    }
    // This function was originally meant to be an equivalent for `validatePhoneNumberLength()`,
    // but later it was found out that it doesn't include the possible `TOO_SHORT` result
    // returned from `parsePhoneNumberWithError()` in the original `validatePhoneNumberLength()`,
    // so eventually I simply commented out this method from the `PhoneNumber` class
    // and just left the `validatePhoneNumberLength()` function, even though that one would require
    // and additional step to also validate the actual country / calling code of the phone number.
    // validateLength() {
    // 	const metadata = new Metadata(this.getMetadata())
    // 	metadata.selectNumberingPlan(this.countryCallingCode)
    // 	const result = checkNumberLength(this.nationalNumber, metadata)
    // 	if (result !== 'IS_POSSIBLE') {
    // 		return result
    // 	}
    // }
  }, {
    key: "getType",
    value: function getType2() {
      return getNumberType(this, {
        v2: true
      }, this.getMetadata());
    }
  }, {
    key: "format",
    value: function format2(_format, options) {
      return formatNumber(this, _format, options ? _objectSpread$l(_objectSpread$l({}, options), {}, {
        v2: true
      }) : {
        v2: true
      }, this.getMetadata());
    }
  }, {
    key: "formatNational",
    value: function formatNational(options) {
      return this.format("NATIONAL", options);
    }
  }, {
    key: "formatInternational",
    value: function formatInternational(options) {
      return this.format("INTERNATIONAL", options);
    }
  }, {
    key: "getURI",
    value: function getURI(options) {
      return this.format("RFC3966", options);
    }
  }]);
  return PhoneNumber2;
}();
var isCountryCode = function isCountryCode2(value) {
  return /^[A-Z]{2}$/.test(value);
};
function getCountryAndCountryCallingCode(countryOrCountryCallingCode, metadataJson) {
  var country;
  var countryCallingCode;
  var metadata2 = new Metadata(metadataJson);
  if (isCountryCode(countryOrCountryCallingCode)) {
    country = countryOrCountryCallingCode;
    metadata2.selectNumberingPlan(country);
    countryCallingCode = metadata2.countryCallingCode();
  } else {
    countryCallingCode = countryOrCountryCallingCode;
  }
  return {
    country,
    countryCallingCode
  };
}
var E164_NUMBER_REGEXP = /^\+\d+$/;
function _typeof$3(obj) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$3(obj);
}
function _createClass$7(Constructor, protoProps, staticProps) {
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _classCallCheck$7(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$1(Derived), result2;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$1(this).constructor;
      result2 = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result2 = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$1(this, result2);
  };
}
function _possibleConstructorReturn$1(self, call) {
  if (call && (_typeof$3(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$1(self);
}
function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2)) return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf$1(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
    return _setPrototypeOf$1(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct$1()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2) _setPrototypeOf$1(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$1(o, p);
}
function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$1(o);
}
var ParseError = /* @__PURE__ */ function(_Error) {
  _inherits$1(ParseError2, _Error);
  var _super = _createSuper(ParseError2);
  function ParseError2(code) {
    var _this;
    _classCallCheck$7(this, ParseError2);
    _this = _super.call(this, code);
    Object.setPrototypeOf(_assertThisInitialized$1(_this), ParseError2.prototype);
    _this.name = _this.constructor.name;
    return _this;
  }
  return _createClass$7(ParseError2);
}(/* @__PURE__ */ _wrapNativeSuper(Error));
var EXTN_PATTERN = new RegExp("(?:" + createExtensionPattern() + ")$", "i");
function extractExtension(number) {
  var start = number.search(EXTN_PATTERN);
  if (start < 0) {
    return {};
  }
  var numberWithoutExtension = number.slice(0, start);
  var matches = number.match(EXTN_PATTERN);
  var i = 1;
  while (i < matches.length) {
    if (matches[i]) {
      return {
        number: numberWithoutExtension,
        ext: matches[i]
      };
    }
    i++;
  }
}
function _createForOfIteratorHelperLoose$8(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray$b(o)) || allowArrayLike) {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$b(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$b(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$b(o, minLen);
}
function _arrayLikeToArray$b(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
var DIGITS = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "０": "0",
  // Fullwidth digit 0
  "１": "1",
  // Fullwidth digit 1
  "２": "2",
  // Fullwidth digit 2
  "３": "3",
  // Fullwidth digit 3
  "４": "4",
  // Fullwidth digit 4
  "５": "5",
  // Fullwidth digit 5
  "６": "6",
  // Fullwidth digit 6
  "７": "7",
  // Fullwidth digit 7
  "８": "8",
  // Fullwidth digit 8
  "９": "9",
  // Fullwidth digit 9
  "٠": "0",
  // Arabic-indic digit 0
  "١": "1",
  // Arabic-indic digit 1
  "٢": "2",
  // Arabic-indic digit 2
  "٣": "3",
  // Arabic-indic digit 3
  "٤": "4",
  // Arabic-indic digit 4
  "٥": "5",
  // Arabic-indic digit 5
  "٦": "6",
  // Arabic-indic digit 6
  "٧": "7",
  // Arabic-indic digit 7
  "٨": "8",
  // Arabic-indic digit 8
  "٩": "9",
  // Arabic-indic digit 9
  "۰": "0",
  // Eastern-Arabic digit 0
  "۱": "1",
  // Eastern-Arabic digit 1
  "۲": "2",
  // Eastern-Arabic digit 2
  "۳": "3",
  // Eastern-Arabic digit 3
  "۴": "4",
  // Eastern-Arabic digit 4
  "۵": "5",
  // Eastern-Arabic digit 5
  "۶": "6",
  // Eastern-Arabic digit 6
  "۷": "7",
  // Eastern-Arabic digit 7
  "۸": "8",
  // Eastern-Arabic digit 8
  "۹": "9"
  // Eastern-Arabic digit 9
};
function parseDigit(character) {
  return DIGITS[character];
}
function parseDigits(string) {
  var result2 = "";
  for (var _iterator = _createForOfIteratorHelperLoose$8(string.split("")), _step; !(_step = _iterator()).done; ) {
    var character = _step.value;
    var digit = parseDigit(character);
    if (digit) {
      result2 += digit;
    }
  }
  return result2;
}
function _createForOfIteratorHelperLoose$7(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray$a(o)) || allowArrayLike) {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$a(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$a(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$a(o, minLen);
}
function _arrayLikeToArray$a(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function parseIncompletePhoneNumber(string) {
  var result2 = "";
  for (var _iterator = _createForOfIteratorHelperLoose$7(string.split("")), _step; !(_step = _iterator()).done; ) {
    var character = _step.value;
    result2 += parsePhoneNumberCharacter(character, result2) || "";
  }
  return result2;
}
function parsePhoneNumberCharacter(character, prevParsedCharacters, emitEvent) {
  if (character === "+") {
    if (prevParsedCharacters) {
      if (typeof emitEvent === "function") {
        emitEvent("end");
      }
      return;
    }
    return "+";
  }
  return parseDigit(character);
}
function _createForOfIteratorHelperLoose$6(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray$9(o)) || allowArrayLike) {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$9(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$9(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen);
}
function _arrayLikeToArray$9(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function getCountryByNationalNumber(nationalPhoneNumber, _ref) {
  var countries = _ref.countries;
  _ref.defaultCountry;
  var metadata2 = _ref.metadata;
  metadata2 = new Metadata(metadata2);
  for (var _iterator = _createForOfIteratorHelperLoose$6(countries), _step; !(_step = _iterator()).done; ) {
    var country = _step.value;
    metadata2.country(country);
    if (metadata2.leadingDigits()) {
      if (nationalPhoneNumber && nationalPhoneNumber.search(metadata2.leadingDigits()) === 0) {
        return country;
      }
    } else if (getNumberType({
      phone: nationalPhoneNumber,
      country
    }, void 0, metadata2.metadata)) {
      return country;
    }
  }
}
function getCountryByCallingCode(callingCode, _ref) {
  var nationalPhoneNumber = _ref.nationalNumber, defaultCountry = _ref.defaultCountry, metadata2 = _ref.metadata;
  var possibleCountries = metadata2.getCountryCodesForCallingCode(callingCode);
  if (!possibleCountries) {
    return;
  }
  if (possibleCountries.length === 1) {
    return possibleCountries[0];
  }
  return getCountryByNationalNumber(nationalPhoneNumber, {
    countries: possibleCountries,
    defaultCountry,
    metadata: metadata2.metadata
  });
}
var PLUS_SIGN = "+";
var RFC3966_VISUAL_SEPARATOR_ = "[\\-\\.\\(\\)]?";
var RFC3966_PHONE_DIGIT_ = "([" + VALID_DIGITS + "]|" + RFC3966_VISUAL_SEPARATOR_ + ")";
var RFC3966_GLOBAL_NUMBER_DIGITS_ = "^\\" + PLUS_SIGN + RFC3966_PHONE_DIGIT_ + "*[" + VALID_DIGITS + "]" + RFC3966_PHONE_DIGIT_ + "*$";
var RFC3966_GLOBAL_NUMBER_DIGITS_PATTERN_ = new RegExp(RFC3966_GLOBAL_NUMBER_DIGITS_, "g");
var ALPHANUM_ = VALID_DIGITS;
var RFC3966_DOMAINLABEL_ = "[" + ALPHANUM_ + "]+((\\-)*[" + ALPHANUM_ + "])*";
var VALID_ALPHA_ = "a-zA-Z";
var RFC3966_TOPLABEL_ = "[" + VALID_ALPHA_ + "]+((\\-)*[" + ALPHANUM_ + "])*";
var RFC3966_DOMAINNAME_ = "^(" + RFC3966_DOMAINLABEL_ + "\\.)*" + RFC3966_TOPLABEL_ + "\\.?$";
var RFC3966_DOMAINNAME_PATTERN_ = new RegExp(RFC3966_DOMAINNAME_, "g");
var RFC3966_PREFIX_ = "tel:";
var RFC3966_PHONE_CONTEXT_ = ";phone-context=";
var RFC3966_ISDN_SUBADDRESS_ = ";isub=";
function extractPhoneContext(numberToExtractFrom) {
  var indexOfPhoneContext = numberToExtractFrom.indexOf(RFC3966_PHONE_CONTEXT_);
  if (indexOfPhoneContext < 0) {
    return null;
  }
  var phoneContextStart = indexOfPhoneContext + RFC3966_PHONE_CONTEXT_.length;
  if (phoneContextStart >= numberToExtractFrom.length) {
    return "";
  }
  var phoneContextEnd = numberToExtractFrom.indexOf(";", phoneContextStart);
  if (phoneContextEnd >= 0) {
    return numberToExtractFrom.substring(phoneContextStart, phoneContextEnd);
  } else {
    return numberToExtractFrom.substring(phoneContextStart);
  }
}
function isPhoneContextValid(phoneContext) {
  if (phoneContext === null) {
    return true;
  }
  if (phoneContext.length === 0) {
    return false;
  }
  return RFC3966_GLOBAL_NUMBER_DIGITS_PATTERN_.test(phoneContext) || RFC3966_DOMAINNAME_PATTERN_.test(phoneContext);
}
function extractFormattedPhoneNumberFromPossibleRfc3966NumberUri(numberToParse, _ref) {
  var extractFormattedPhoneNumber2 = _ref.extractFormattedPhoneNumber;
  var phoneContext = extractPhoneContext(numberToParse);
  if (!isPhoneContextValid(phoneContext)) {
    throw new ParseError("NOT_A_NUMBER");
  }
  var phoneNumberString;
  if (phoneContext === null) {
    phoneNumberString = extractFormattedPhoneNumber2(numberToParse) || "";
  } else {
    phoneNumberString = "";
    if (phoneContext.charAt(0) === PLUS_SIGN) {
      phoneNumberString += phoneContext;
    }
    var indexOfRfc3966Prefix = numberToParse.indexOf(RFC3966_PREFIX_);
    var indexOfNationalNumber;
    if (indexOfRfc3966Prefix >= 0) {
      indexOfNationalNumber = indexOfRfc3966Prefix + RFC3966_PREFIX_.length;
    } else {
      indexOfNationalNumber = 0;
    }
    var indexOfPhoneContext = numberToParse.indexOf(RFC3966_PHONE_CONTEXT_);
    phoneNumberString += numberToParse.substring(indexOfNationalNumber, indexOfPhoneContext);
  }
  var indexOfIsdn = phoneNumberString.indexOf(RFC3966_ISDN_SUBADDRESS_);
  if (indexOfIsdn > 0) {
    phoneNumberString = phoneNumberString.substring(0, indexOfIsdn);
  }
  if (phoneNumberString !== "") {
    return phoneNumberString;
  }
}
var MAX_INPUT_STRING_LENGTH = 250;
var PHONE_NUMBER_START_PATTERN = new RegExp("[" + PLUS_CHARS + VALID_DIGITS + "]");
var AFTER_PHONE_NUMBER_END_PATTERN = new RegExp("[^" + VALID_DIGITS + "#]+$");
function parse(text, options, metadata2) {
  options = options || {};
  metadata2 = new Metadata(metadata2);
  if (options.defaultCountry && !metadata2.hasCountry(options.defaultCountry)) {
    if (options.v2) {
      throw new ParseError("INVALID_COUNTRY");
    }
    throw new Error("Unknown country: ".concat(options.defaultCountry));
  }
  var _parseInput = parseInput(text, options.v2, options.extract), formattedPhoneNumber = _parseInput.number, ext = _parseInput.ext, error = _parseInput.error;
  if (!formattedPhoneNumber) {
    if (options.v2) {
      if (error === "TOO_SHORT") {
        throw new ParseError("TOO_SHORT");
      }
      throw new ParseError("NOT_A_NUMBER");
    }
    return {};
  }
  var _parsePhoneNumber = parsePhoneNumber$3(formattedPhoneNumber, options.defaultCountry, options.defaultCallingCode, metadata2), country = _parsePhoneNumber.country, nationalNumber = _parsePhoneNumber.nationalNumber, countryCallingCode = _parsePhoneNumber.countryCallingCode, countryCallingCodeSource = _parsePhoneNumber.countryCallingCodeSource, carrierCode = _parsePhoneNumber.carrierCode;
  if (!metadata2.hasSelectedNumberingPlan()) {
    if (options.v2) {
      throw new ParseError("INVALID_COUNTRY");
    }
    return {};
  }
  if (!nationalNumber || nationalNumber.length < MIN_LENGTH_FOR_NSN) {
    if (options.v2) {
      throw new ParseError("TOO_SHORT");
    }
    return {};
  }
  if (nationalNumber.length > MAX_LENGTH_FOR_NSN) {
    if (options.v2) {
      throw new ParseError("TOO_LONG");
    }
    return {};
  }
  if (options.v2) {
    var phoneNumber = new PhoneNumber(countryCallingCode, nationalNumber, metadata2.metadata);
    if (country) {
      phoneNumber.country = country;
    }
    if (carrierCode) {
      phoneNumber.carrierCode = carrierCode;
    }
    if (ext) {
      phoneNumber.ext = ext;
    }
    phoneNumber.__countryCallingCodeSource = countryCallingCodeSource;
    return phoneNumber;
  }
  var valid = (options.extended ? metadata2.hasSelectedNumberingPlan() : country) ? matchesEntirely(nationalNumber, metadata2.nationalNumberPattern()) : false;
  if (!options.extended) {
    return valid ? result(country, nationalNumber, ext) : {};
  }
  return {
    country,
    countryCallingCode,
    carrierCode,
    valid,
    possible: valid ? true : options.extended === true && metadata2.possibleLengths() && isPossibleNumber(nationalNumber, metadata2) ? true : false,
    phone: nationalNumber,
    ext
  };
}
function _extractFormattedPhoneNumber(text, extract, throwOnError) {
  if (!text) {
    return;
  }
  if (text.length > MAX_INPUT_STRING_LENGTH) {
    if (throwOnError) {
      throw new ParseError("TOO_LONG");
    }
    return;
  }
  if (extract === false) {
    return text;
  }
  var startsAt = text.search(PHONE_NUMBER_START_PATTERN);
  if (startsAt < 0) {
    return;
  }
  return text.slice(startsAt).replace(AFTER_PHONE_NUMBER_END_PATTERN, "");
}
function parseInput(text, v2, extract) {
  var number = extractFormattedPhoneNumberFromPossibleRfc3966NumberUri(text, {
    extractFormattedPhoneNumber: function extractFormattedPhoneNumber2(text2) {
      return _extractFormattedPhoneNumber(text2, extract, v2);
    }
  });
  if (!number) {
    return {};
  }
  if (!isViablePhoneNumber(number)) {
    if (isViablePhoneNumberStart(number)) {
      return {
        error: "TOO_SHORT"
      };
    }
    return {};
  }
  var withExtensionStripped = extractExtension(number);
  if (withExtensionStripped.ext) {
    return withExtensionStripped;
  }
  return {
    number
  };
}
function result(country, nationalNumber, ext) {
  var result2 = {
    country,
    phone: nationalNumber
  };
  if (ext) {
    result2.ext = ext;
  }
  return result2;
}
function parsePhoneNumber$3(formattedPhoneNumber, defaultCountry, defaultCallingCode, metadata2) {
  var _extractCountryCallin = extractCountryCallingCode(parseIncompletePhoneNumber(formattedPhoneNumber), defaultCountry, defaultCallingCode, metadata2.metadata), countryCallingCodeSource = _extractCountryCallin.countryCallingCodeSource, countryCallingCode = _extractCountryCallin.countryCallingCode, number = _extractCountryCallin.number;
  var country;
  if (countryCallingCode) {
    metadata2.selectNumberingPlan(countryCallingCode);
  } else if (number && (defaultCountry || defaultCallingCode)) {
    metadata2.selectNumberingPlan(defaultCountry, defaultCallingCode);
    if (defaultCountry) {
      country = defaultCountry;
    }
    countryCallingCode = defaultCallingCode || getCountryCallingCode(defaultCountry, metadata2.metadata);
  } else return {};
  if (!number) {
    return {
      countryCallingCodeSource,
      countryCallingCode
    };
  }
  var _extractNationalNumbe = extractNationalNumber(parseIncompletePhoneNumber(number), metadata2), nationalNumber = _extractNationalNumbe.nationalNumber, carrierCode = _extractNationalNumbe.carrierCode;
  var exactCountry = getCountryByCallingCode(countryCallingCode, {
    nationalNumber,
    defaultCountry,
    metadata: metadata2
  });
  if (exactCountry) {
    country = exactCountry;
    if (exactCountry === "001") ;
    else {
      metadata2.country(country);
    }
  }
  return {
    country,
    countryCallingCode,
    countryCallingCodeSource,
    nationalNumber,
    carrierCode
  };
}
function ownKeys$k(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$k(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$k(Object(source), true).forEach(function(key) {
      _defineProperty$5(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$k(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$5(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function parsePhoneNumberWithError(text, options, metadata2) {
  return parse(text, _objectSpread$k(_objectSpread$k({}, options), {}, {
    v2: true
  }), metadata2);
}
function ownKeys$j(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$j(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$j(Object(source), true).forEach(function(key) {
      _defineProperty$4(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$j(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$4(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray$2(arr, i) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$8(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$8(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen);
}
function _arrayLikeToArray$8(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit$2(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles$2(arr) {
  if (Array.isArray(arr)) return arr;
}
function normalizeArguments(args) {
  var _Array$prototype$slic = Array.prototype.slice.call(args), _Array$prototype$slic2 = _slicedToArray$2(_Array$prototype$slic, 4), arg_1 = _Array$prototype$slic2[0], arg_2 = _Array$prototype$slic2[1], arg_3 = _Array$prototype$slic2[2], arg_4 = _Array$prototype$slic2[3];
  var text;
  var options;
  var metadata2;
  if (typeof arg_1 === "string") {
    text = arg_1;
  } else throw new TypeError("A text for parsing must be a string.");
  if (!arg_2 || typeof arg_2 === "string") {
    if (arg_4) {
      options = arg_3;
      metadata2 = arg_4;
    } else {
      options = void 0;
      metadata2 = arg_3;
    }
    if (arg_2) {
      options = _objectSpread$j({
        defaultCountry: arg_2
      }, options);
    }
  } else if (isObject(arg_2)) {
    if (arg_3) {
      options = arg_2;
      metadata2 = arg_3;
    } else {
      metadata2 = arg_2;
    }
  } else throw new Error("Invalid second argument: ".concat(arg_2));
  return {
    text,
    options,
    metadata: metadata2
  };
}
function ownKeys$i(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$i(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$i(Object(source), true).forEach(function(key) {
      _defineProperty$3(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$i(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function parsePhoneNumber$2(text, options, metadata2) {
  if (options && options.defaultCountry && !isSupportedCountry(options.defaultCountry, metadata2)) {
    options = _objectSpread$i(_objectSpread$i({}, options), {}, {
      defaultCountry: void 0
    });
  }
  try {
    return parsePhoneNumberWithError(text, options, metadata2);
  } catch (error) {
    if (error instanceof ParseError) ;
    else {
      throw error;
    }
  }
}
function parsePhoneNumber$1() {
  var _normalizeArguments = normalizeArguments(arguments), text = _normalizeArguments.text, options = _normalizeArguments.options, metadata2 = _normalizeArguments.metadata;
  return parsePhoneNumber$2(text, options, metadata2);
}
function _classCallCheck$6(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$6(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$6(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$6(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var AsYouTypeState = /* @__PURE__ */ function() {
  function AsYouTypeState2(_ref) {
    var onCountryChange = _ref.onCountryChange, onCallingCodeChange = _ref.onCallingCodeChange;
    _classCallCheck$6(this, AsYouTypeState2);
    this.onCountryChange = onCountryChange;
    this.onCallingCodeChange = onCallingCodeChange;
  }
  _createClass$6(AsYouTypeState2, [{
    key: "reset",
    value: function reset(_ref2) {
      var country = _ref2.country, callingCode = _ref2.callingCode;
      this.international = false;
      this.missingPlus = false;
      this.IDDPrefix = void 0;
      this.callingCode = void 0;
      this.digits = "";
      this.resetNationalSignificantNumber();
      this.initCountryAndCallingCode(country, callingCode);
    }
  }, {
    key: "resetNationalSignificantNumber",
    value: function resetNationalSignificantNumber() {
      this.nationalSignificantNumber = this.getNationalDigits();
      this.nationalSignificantNumberMatchesInput = true;
      this.nationalPrefix = void 0;
      this.carrierCode = void 0;
      this.complexPrefixBeforeNationalSignificantNumber = void 0;
    }
  }, {
    key: "update",
    value: function update(properties) {
      for (var _i = 0, _Object$keys = Object.keys(properties); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        this[key] = properties[key];
      }
    }
  }, {
    key: "initCountryAndCallingCode",
    value: function initCountryAndCallingCode(country, callingCode) {
      this.setCountry(country);
      this.setCallingCode(callingCode);
    }
  }, {
    key: "setCountry",
    value: function setCountry(country) {
      this.country = country;
      this.onCountryChange(country);
    }
  }, {
    key: "setCallingCode",
    value: function setCallingCode(callingCode) {
      this.callingCode = callingCode;
      this.onCallingCodeChange(callingCode, this.country);
    }
  }, {
    key: "startInternationalNumber",
    value: function startInternationalNumber(country, callingCode) {
      this.international = true;
      this.initCountryAndCallingCode(country, callingCode);
    }
  }, {
    key: "appendDigits",
    value: function appendDigits(nextDigits) {
      this.digits += nextDigits;
    }
  }, {
    key: "appendNationalSignificantNumberDigits",
    value: function appendNationalSignificantNumberDigits(nextDigits) {
      this.nationalSignificantNumber += nextDigits;
    }
    /**
     * Returns the part of `this.digits` that corresponds to the national number.
     * Basically, all digits that have been input by the user, except for the
     * international prefix and the country calling code part
     * (if the number is an international one).
     * @return {string}
     */
  }, {
    key: "getNationalDigits",
    value: function getNationalDigits() {
      if (this.international) {
        return this.digits.slice((this.IDDPrefix ? this.IDDPrefix.length : 0) + (this.callingCode ? this.callingCode.length : 0));
      }
      return this.digits;
    }
  }, {
    key: "getDigitsWithoutInternationalPrefix",
    value: function getDigitsWithoutInternationalPrefix() {
      if (this.international) {
        if (this.IDDPrefix) {
          return this.digits.slice(this.IDDPrefix.length);
        }
      }
      return this.digits;
    }
  }]);
  return AsYouTypeState2;
}();
function _createForOfIteratorHelperLoose$5(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray$7(o)) || allowArrayLike) {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$7(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$7(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen);
}
function _arrayLikeToArray$7(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
var DIGIT_PLACEHOLDER = "x";
var DIGIT_PLACEHOLDER_MATCHER = new RegExp(DIGIT_PLACEHOLDER);
function repeat(string, times) {
  if (times < 1) {
    return "";
  }
  var result2 = "";
  while (times > 1) {
    if (times & 1) {
      result2 += string;
    }
    times >>= 1;
    string += string;
  }
  return result2 + string;
}
function cutAndStripNonPairedParens(string, cutBeforeIndex) {
  if (string[cutBeforeIndex] === ")") {
    cutBeforeIndex++;
  }
  return stripNonPairedParens(string.slice(0, cutBeforeIndex));
}
function stripNonPairedParens(string) {
  var dangling_braces = [];
  var i = 0;
  while (i < string.length) {
    if (string[i] === "(") {
      dangling_braces.push(i);
    } else if (string[i] === ")") {
      dangling_braces.pop();
    }
    i++;
  }
  var start = 0;
  var cleared_string = "";
  dangling_braces.push(string.length);
  for (var _i = 0, _dangling_braces = dangling_braces; _i < _dangling_braces.length; _i++) {
    var index = _dangling_braces[_i];
    cleared_string += string.slice(start, index);
    start = index + 1;
  }
  return cleared_string;
}
function populateTemplateWithDigits(template, position, digits) {
  for (var _iterator2 = _createForOfIteratorHelperLoose$5(digits.split("")), _step2; !(_step2 = _iterator2()).done; ) {
    var digit = _step2.value;
    if (template.slice(position + 1).search(DIGIT_PLACEHOLDER_MATCHER) < 0) {
      return;
    }
    position = template.search(DIGIT_PLACEHOLDER_MATCHER);
    template = template.replace(DIGIT_PLACEHOLDER_MATCHER, digit);
  }
  return [template, position];
}
function formatCompleteNumber(state, format2, _ref) {
  var metadata2 = _ref.metadata, shouldTryNationalPrefixFormattingRule = _ref.shouldTryNationalPrefixFormattingRule, getSeparatorAfterNationalPrefix = _ref.getSeparatorAfterNationalPrefix;
  var matcher = new RegExp("^(?:".concat(format2.pattern(), ")$"));
  if (matcher.test(state.nationalSignificantNumber)) {
    return formatNationalNumberWithAndWithoutNationalPrefixFormattingRule(state, format2, {
      metadata: metadata2,
      shouldTryNationalPrefixFormattingRule,
      getSeparatorAfterNationalPrefix
    });
  }
}
function canFormatCompleteNumber(nationalSignificantNumber, metadata2) {
  return checkNumberLength(nationalSignificantNumber, metadata2) === "IS_POSSIBLE";
}
function formatNationalNumberWithAndWithoutNationalPrefixFormattingRule(state, format2, _ref2) {
  var metadata2 = _ref2.metadata, shouldTryNationalPrefixFormattingRule = _ref2.shouldTryNationalPrefixFormattingRule, getSeparatorAfterNationalPrefix = _ref2.getSeparatorAfterNationalPrefix;
  state.nationalSignificantNumber;
  state.international;
  state.nationalPrefix;
  state.carrierCode;
  if (shouldTryNationalPrefixFormattingRule(format2)) {
    var formattedNumber = formatNationalNumber(state, format2, {
      useNationalPrefixFormattingRule: true,
      getSeparatorAfterNationalPrefix,
      metadata: metadata2
    });
    if (formattedNumber) {
      return formattedNumber;
    }
  }
  return formatNationalNumber(state, format2, {
    useNationalPrefixFormattingRule: false,
    getSeparatorAfterNationalPrefix,
    metadata: metadata2
  });
}
function formatNationalNumber(state, format2, _ref3) {
  var metadata2 = _ref3.metadata, useNationalPrefixFormattingRule = _ref3.useNationalPrefixFormattingRule, getSeparatorAfterNationalPrefix = _ref3.getSeparatorAfterNationalPrefix;
  var formattedNationalNumber = formatNationalNumberUsingFormat(state.nationalSignificantNumber, format2, {
    carrierCode: state.carrierCode,
    useInternationalFormat: state.international,
    withNationalPrefix: useNationalPrefixFormattingRule,
    metadata: metadata2
  });
  if (!useNationalPrefixFormattingRule) {
    if (state.nationalPrefix) {
      formattedNationalNumber = state.nationalPrefix + getSeparatorAfterNationalPrefix(format2) + formattedNationalNumber;
    } else if (state.complexPrefixBeforeNationalSignificantNumber) {
      formattedNationalNumber = state.complexPrefixBeforeNationalSignificantNumber + " " + formattedNationalNumber;
    }
  }
  if (isValidFormattedNationalNumber(formattedNationalNumber, state)) {
    return formattedNationalNumber;
  }
}
function isValidFormattedNationalNumber(formattedNationalNumber, state) {
  return parseDigits(formattedNationalNumber) === state.getNationalDigits();
}
function _classCallCheck$5(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$5(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$5(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$5(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var PatternParser = /* @__PURE__ */ function() {
  function PatternParser2() {
    _classCallCheck$5(this, PatternParser2);
  }
  _createClass$5(PatternParser2, [{
    key: "parse",
    value: function parse2(pattern) {
      this.context = [{
        or: true,
        instructions: []
      }];
      this.parsePattern(pattern);
      if (this.context.length !== 1) {
        throw new Error("Non-finalized contexts left when pattern parse ended");
      }
      var _this$context$ = this.context[0], branches = _this$context$.branches, instructions = _this$context$.instructions;
      if (branches) {
        return {
          op: "|",
          args: branches.concat([expandSingleElementArray(instructions)])
        };
      }
      if (instructions.length === 0) {
        throw new Error("Pattern is required");
      }
      if (instructions.length === 1) {
        return instructions[0];
      }
      return instructions;
    }
  }, {
    key: "startContext",
    value: function startContext(context) {
      this.context.push(context);
    }
  }, {
    key: "endContext",
    value: function endContext() {
      this.context.pop();
    }
  }, {
    key: "getContext",
    value: function getContext() {
      return this.context[this.context.length - 1];
    }
  }, {
    key: "parsePattern",
    value: function parsePattern(pattern) {
      if (!pattern) {
        throw new Error("Pattern is required");
      }
      var match = pattern.match(OPERATOR);
      if (!match) {
        if (ILLEGAL_CHARACTER_REGEXP.test(pattern)) {
          throw new Error("Illegal characters found in a pattern: ".concat(pattern));
        }
        this.getContext().instructions = this.getContext().instructions.concat(pattern.split(""));
        return;
      }
      var operator = match[1];
      var before = pattern.slice(0, match.index);
      var rightPart = pattern.slice(match.index + operator.length);
      switch (operator) {
        case "(?:":
          if (before) {
            this.parsePattern(before);
          }
          this.startContext({
            or: true,
            instructions: [],
            branches: []
          });
          break;
        case ")":
          if (!this.getContext().or) {
            throw new Error('")" operator must be preceded by "(?:" operator');
          }
          if (before) {
            this.parsePattern(before);
          }
          if (this.getContext().instructions.length === 0) {
            throw new Error('No instructions found after "|" operator in an "or" group');
          }
          var _this$getContext = this.getContext(), branches = _this$getContext.branches;
          branches.push(expandSingleElementArray(this.getContext().instructions));
          this.endContext();
          this.getContext().instructions.push({
            op: "|",
            args: branches
          });
          break;
        case "|":
          if (!this.getContext().or) {
            throw new Error('"|" operator can only be used inside "or" groups');
          }
          if (before) {
            this.parsePattern(before);
          }
          if (!this.getContext().branches) {
            if (this.context.length === 1) {
              this.getContext().branches = [];
            } else {
              throw new Error('"branches" not found in an "or" group context');
            }
          }
          this.getContext().branches.push(expandSingleElementArray(this.getContext().instructions));
          this.getContext().instructions = [];
          break;
        case "[":
          if (before) {
            this.parsePattern(before);
          }
          this.startContext({
            oneOfSet: true
          });
          break;
        case "]":
          if (!this.getContext().oneOfSet) {
            throw new Error('"]" operator must be preceded by "[" operator');
          }
          this.endContext();
          this.getContext().instructions.push({
            op: "[]",
            args: parseOneOfSet(before)
          });
          break;
        default:
          throw new Error("Unknown operator: ".concat(operator));
      }
      if (rightPart) {
        this.parsePattern(rightPart);
      }
    }
  }]);
  return PatternParser2;
}();
function parseOneOfSet(pattern) {
  var values = [];
  var i = 0;
  while (i < pattern.length) {
    if (pattern[i] === "-") {
      if (i === 0 || i === pattern.length - 1) {
        throw new Error("Couldn't parse a one-of set pattern: ".concat(pattern));
      }
      var prevValue = pattern[i - 1].charCodeAt(0) + 1;
      var nextValue = pattern[i + 1].charCodeAt(0) - 1;
      var value = prevValue;
      while (value <= nextValue) {
        values.push(String.fromCharCode(value));
        value++;
      }
    } else {
      values.push(pattern[i]);
    }
    i++;
  }
  return values;
}
var ILLEGAL_CHARACTER_REGEXP = /[\(\)\[\]\?\:\|]/;
var OPERATOR = new RegExp(
  // any of:
  "(\\||\\(\\?\\:|\\)|\\[|\\])"
);
function expandSingleElementArray(array) {
  if (array.length === 1) {
    return array[0];
  }
  return array;
}
function _createForOfIteratorHelperLoose$4(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray$6(o)) || allowArrayLike) {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$6(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$6(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen);
}
function _arrayLikeToArray$6(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _classCallCheck$4(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$4(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$4(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$4(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var PatternMatcher = /* @__PURE__ */ function() {
  function PatternMatcher2(pattern) {
    _classCallCheck$4(this, PatternMatcher2);
    this.matchTree = new PatternParser().parse(pattern);
  }
  _createClass$4(PatternMatcher2, [{
    key: "match",
    value: function match(string) {
      var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, allowOverflow = _ref.allowOverflow;
      if (!string) {
        throw new Error("String is required");
      }
      var result2 = _match(string.split(""), this.matchTree, true);
      if (result2 && result2.match) {
        delete result2.matchedChars;
      }
      if (result2 && result2.overflow) {
        if (!allowOverflow) {
          return;
        }
      }
      return result2;
    }
  }]);
  return PatternMatcher2;
}();
function _match(characters, tree, last) {
  if (typeof tree === "string") {
    var characterString = characters.join("");
    if (tree.indexOf(characterString) === 0) {
      if (characters.length === tree.length) {
        return {
          match: true,
          matchedChars: characters
        };
      }
      return {
        partialMatch: true
        // matchedChars: characters
      };
    }
    if (characterString.indexOf(tree) === 0) {
      if (last) {
        if (characters.length > tree.length) {
          return {
            overflow: true
          };
        }
      }
      return {
        match: true,
        matchedChars: characters.slice(0, tree.length)
      };
    }
    return;
  }
  if (Array.isArray(tree)) {
    var restCharacters = characters.slice();
    var i = 0;
    while (i < tree.length) {
      var subtree = tree[i];
      var result2 = _match(restCharacters, subtree, last && i === tree.length - 1);
      if (!result2) {
        return;
      } else if (result2.overflow) {
        return result2;
      } else if (result2.match) {
        restCharacters = restCharacters.slice(result2.matchedChars.length);
        if (restCharacters.length === 0) {
          if (i === tree.length - 1) {
            return {
              match: true,
              matchedChars: characters
            };
          } else {
            return {
              partialMatch: true
              // matchedChars: characters
            };
          }
        }
      } else {
        if (result2.partialMatch) {
          return {
            partialMatch: true
            // matchedChars: characters
          };
        } else {
          throw new Error("Unsupported match result:\n".concat(JSON.stringify(result2, null, 2)));
        }
      }
      i++;
    }
    if (last) {
      return {
        overflow: true
      };
    }
    return {
      match: true,
      matchedChars: characters.slice(0, characters.length - restCharacters.length)
    };
  }
  switch (tree.op) {
    case "|":
      var partialMatch;
      for (var _iterator = _createForOfIteratorHelperLoose$4(tree.args), _step; !(_step = _iterator()).done; ) {
        var branch = _step.value;
        var _result = _match(characters, branch, last);
        if (_result) {
          if (_result.overflow) {
            return _result;
          } else if (_result.match) {
            return {
              match: true,
              matchedChars: _result.matchedChars
            };
          } else {
            if (_result.partialMatch) {
              partialMatch = true;
            } else {
              throw new Error("Unsupported match result:\n".concat(JSON.stringify(_result, null, 2)));
            }
          }
        }
      }
      if (partialMatch) {
        return {
          partialMatch: true
          // matchedChars: ...
        };
      }
      return;
    case "[]":
      for (var _iterator2 = _createForOfIteratorHelperLoose$4(tree.args), _step2; !(_step2 = _iterator2()).done; ) {
        var _char = _step2.value;
        if (characters[0] === _char) {
          if (characters.length === 1) {
            return {
              match: true,
              matchedChars: characters
            };
          }
          if (last) {
            return {
              overflow: true
            };
          }
          return {
            match: true,
            matchedChars: [_char]
          };
        }
      }
      return;
    default:
      throw new Error("Unsupported instruction tree: ".concat(tree));
  }
}
function _createForOfIteratorHelperLoose$3(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray$5(o)) || allowArrayLike) {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$5(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$5(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen);
}
function _arrayLikeToArray$5(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _classCallCheck$3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$3(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$3(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$3(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var DUMMY_DIGIT = "9";
var LONGEST_NATIONAL_PHONE_NUMBER_LENGTH = 15;
var LONGEST_DUMMY_PHONE_NUMBER = repeat(DUMMY_DIGIT, LONGEST_NATIONAL_PHONE_NUMBER_LENGTH);
var NATIONAL_PREFIX_SEPARATORS_PATTERN = /[- ]/;
var CREATE_CHARACTER_CLASS_PATTERN = function() {
  return /\[([^\[\]])*\]/g;
};
var CREATE_STANDALONE_DIGIT_PATTERN = function() {
  return /\d(?=[^,}][^,}])/g;
};
var NON_ALTERING_FORMAT_REG_EXP = new RegExp("[" + VALID_PUNCTUATION + "]*\\$1[" + VALID_PUNCTUATION + "]*(\\$\\d[" + VALID_PUNCTUATION + "]*)*$");
var MIN_LEADING_DIGITS_LENGTH = 3;
var AsYouTypeFormatter = /* @__PURE__ */ function() {
  function AsYouTypeFormatter2(_ref) {
    _ref.state;
    var metadata2 = _ref.metadata;
    _classCallCheck$3(this, AsYouTypeFormatter2);
    this.metadata = metadata2;
    this.resetFormat();
  }
  _createClass$3(AsYouTypeFormatter2, [{
    key: "resetFormat",
    value: function resetFormat() {
      this.chosenFormat = void 0;
      this.template = void 0;
      this.nationalNumberTemplate = void 0;
      this.populatedNationalNumberTemplate = void 0;
      this.populatedNationalNumberTemplatePosition = -1;
    }
  }, {
    key: "reset",
    value: function reset(numberingPlan, state) {
      this.resetFormat();
      if (numberingPlan) {
        this.isNANP = numberingPlan.callingCode() === "1";
        this.matchingFormats = numberingPlan.formats();
        if (state.nationalSignificantNumber) {
          this.narrowDownMatchingFormats(state);
        }
      } else {
        this.isNANP = void 0;
        this.matchingFormats = [];
      }
    }
    /**
     * Formats an updated phone number.
     * @param  {string} nextDigits — Additional phone number digits.
     * @param  {object} state — `AsYouType` state.
     * @return {[string]} Returns undefined if the updated phone number can't be formatted using any of the available formats.
     */
  }, {
    key: "format",
    value: function format2(nextDigits, state) {
      var _this = this;
      if (canFormatCompleteNumber(state.nationalSignificantNumber, this.metadata)) {
        for (var _iterator = _createForOfIteratorHelperLoose$3(this.matchingFormats), _step; !(_step = _iterator()).done; ) {
          var format3 = _step.value;
          var formattedCompleteNumber = formatCompleteNumber(state, format3, {
            metadata: this.metadata,
            shouldTryNationalPrefixFormattingRule: function shouldTryNationalPrefixFormattingRule(format4) {
              return _this.shouldTryNationalPrefixFormattingRule(format4, {
                international: state.international,
                nationalPrefix: state.nationalPrefix
              });
            },
            getSeparatorAfterNationalPrefix: function getSeparatorAfterNationalPrefix(format4) {
              return _this.getSeparatorAfterNationalPrefix(format4);
            }
          });
          if (formattedCompleteNumber) {
            this.resetFormat();
            this.chosenFormat = format3;
            this.setNationalNumberTemplate(formattedCompleteNumber.replace(/\d/g, DIGIT_PLACEHOLDER), state);
            this.populatedNationalNumberTemplate = formattedCompleteNumber;
            this.populatedNationalNumberTemplatePosition = this.template.lastIndexOf(DIGIT_PLACEHOLDER);
            return formattedCompleteNumber;
          }
        }
      }
      return this.formatNationalNumberWithNextDigits(nextDigits, state);
    }
    // Formats the next phone number digits.
  }, {
    key: "formatNationalNumberWithNextDigits",
    value: function formatNationalNumberWithNextDigits(nextDigits, state) {
      var previouslyChosenFormat = this.chosenFormat;
      var newlyChosenFormat = this.chooseFormat(state);
      if (newlyChosenFormat) {
        if (newlyChosenFormat === previouslyChosenFormat) {
          return this.formatNextNationalNumberDigits(nextDigits);
        } else {
          return this.formatNextNationalNumberDigits(state.getNationalDigits());
        }
      }
    }
  }, {
    key: "narrowDownMatchingFormats",
    value: function narrowDownMatchingFormats(_ref2) {
      var _this2 = this;
      var nationalSignificantNumber = _ref2.nationalSignificantNumber, nationalPrefix = _ref2.nationalPrefix, international = _ref2.international;
      var leadingDigits = nationalSignificantNumber;
      var leadingDigitsPatternIndex = leadingDigits.length - MIN_LEADING_DIGITS_LENGTH;
      if (leadingDigitsPatternIndex < 0) {
        leadingDigitsPatternIndex = 0;
      }
      this.matchingFormats = this.matchingFormats.filter(function(format2) {
        return _this2.formatSuits(format2, international, nationalPrefix) && _this2.formatMatches(format2, leadingDigits, leadingDigitsPatternIndex);
      });
      if (this.chosenFormat && this.matchingFormats.indexOf(this.chosenFormat) === -1) {
        this.resetFormat();
      }
    }
  }, {
    key: "formatSuits",
    value: function formatSuits(format2, international, nationalPrefix) {
      if (nationalPrefix && !format2.usesNationalPrefix() && // !format.domesticCarrierCodeFormattingRule() &&
      !format2.nationalPrefixIsOptionalWhenFormattingInNationalFormat()) {
        return false;
      }
      if (!international && !nationalPrefix && format2.nationalPrefixIsMandatoryWhenFormattingInNationalFormat()) {
        return false;
      }
      return true;
    }
  }, {
    key: "formatMatches",
    value: function formatMatches(format2, leadingDigits, leadingDigitsPatternIndex) {
      var leadingDigitsPatternsCount = format2.leadingDigitsPatterns().length;
      if (leadingDigitsPatternsCount === 0) {
        return true;
      }
      leadingDigitsPatternIndex = Math.min(leadingDigitsPatternIndex, leadingDigitsPatternsCount - 1);
      var leadingDigitsPattern = format2.leadingDigitsPatterns()[leadingDigitsPatternIndex];
      if (leadingDigits.length < MIN_LEADING_DIGITS_LENGTH) {
        try {
          return new PatternMatcher(leadingDigitsPattern).match(leadingDigits, {
            allowOverflow: true
          }) !== void 0;
        } catch (error) {
          console.error(error);
          return true;
        }
      }
      return new RegExp("^(".concat(leadingDigitsPattern, ")")).test(leadingDigits);
    }
  }, {
    key: "getFormatFormat",
    value: function getFormatFormat(format2, international) {
      return international ? format2.internationalFormat() : format2.format();
    }
  }, {
    key: "chooseFormat",
    value: function chooseFormat(state) {
      var _this3 = this;
      var _loop = function _loop2() {
        var format2 = _step2.value;
        if (_this3.chosenFormat === format2) {
          return "break";
        }
        if (!NON_ALTERING_FORMAT_REG_EXP.test(_this3.getFormatFormat(format2, state.international))) {
          return "continue";
        }
        if (!_this3.createTemplateForFormat(format2, state)) {
          _this3.matchingFormats = _this3.matchingFormats.filter(function(_) {
            return _ !== format2;
          });
          return "continue";
        }
        _this3.chosenFormat = format2;
        return "break";
      };
      for (var _iterator2 = _createForOfIteratorHelperLoose$3(this.matchingFormats.slice()), _step2; !(_step2 = _iterator2()).done; ) {
        var _ret = _loop();
        if (_ret === "break") break;
        if (_ret === "continue") continue;
      }
      if (!this.chosenFormat) {
        this.resetFormat();
      }
      return this.chosenFormat;
    }
  }, {
    key: "createTemplateForFormat",
    value: function createTemplateForFormat(format2, state) {
      if (format2.pattern().indexOf("|") >= 0) {
        return;
      }
      var template = this.getTemplateForFormat(format2, state);
      if (template) {
        this.setNationalNumberTemplate(template, state);
        return true;
      }
    }
  }, {
    key: "getSeparatorAfterNationalPrefix",
    value: function getSeparatorAfterNationalPrefix(format2) {
      if (this.isNANP) {
        return " ";
      }
      if (format2 && format2.nationalPrefixFormattingRule() && NATIONAL_PREFIX_SEPARATORS_PATTERN.test(format2.nationalPrefixFormattingRule())) {
        return " ";
      }
      return "";
    }
  }, {
    key: "getInternationalPrefixBeforeCountryCallingCode",
    value: function getInternationalPrefixBeforeCountryCallingCode(_ref3, options) {
      var IDDPrefix = _ref3.IDDPrefix, missingPlus = _ref3.missingPlus;
      if (IDDPrefix) {
        return options && options.spacing === false ? IDDPrefix : IDDPrefix + " ";
      }
      if (missingPlus) {
        return "";
      }
      return "+";
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(state) {
      if (!this.template) {
        return;
      }
      var index = -1;
      var i = 0;
      var internationalPrefix = state.international ? this.getInternationalPrefixBeforeCountryCallingCode(state, {
        spacing: false
      }) : "";
      while (i < internationalPrefix.length + state.getDigitsWithoutInternationalPrefix().length) {
        index = this.template.indexOf(DIGIT_PLACEHOLDER, index + 1);
        i++;
      }
      return cutAndStripNonPairedParens(this.template, index + 1);
    }
  }, {
    key: "setNationalNumberTemplate",
    value: function setNationalNumberTemplate(template, state) {
      this.nationalNumberTemplate = template;
      this.populatedNationalNumberTemplate = template;
      this.populatedNationalNumberTemplatePosition = -1;
      if (state.international) {
        this.template = this.getInternationalPrefixBeforeCountryCallingCode(state).replace(/[\d\+]/g, DIGIT_PLACEHOLDER) + repeat(DIGIT_PLACEHOLDER, state.callingCode.length) + " " + template;
      } else {
        this.template = template;
      }
    }
    /**
     * Generates formatting template for a national phone number,
     * optionally containing a national prefix, for a format.
     * @param  {Format} format
     * @param  {string} nationalPrefix
     * @return {string}
     */
  }, {
    key: "getTemplateForFormat",
    value: function getTemplateForFormat(format2, _ref4) {
      var nationalSignificantNumber = _ref4.nationalSignificantNumber, international = _ref4.international, nationalPrefix = _ref4.nationalPrefix, complexPrefixBeforeNationalSignificantNumber = _ref4.complexPrefixBeforeNationalSignificantNumber;
      var pattern = format2.pattern();
      {
        pattern = pattern.replace(CREATE_CHARACTER_CLASS_PATTERN(), "\\d").replace(CREATE_STANDALONE_DIGIT_PATTERN(), "\\d");
      }
      var digits = LONGEST_DUMMY_PHONE_NUMBER.match(pattern)[0];
      if (nationalSignificantNumber.length > digits.length) {
        return;
      }
      var strictPattern = new RegExp("^" + pattern + "$");
      var nationalNumberDummyDigits = nationalSignificantNumber.replace(/\d/g, DUMMY_DIGIT);
      if (strictPattern.test(nationalNumberDummyDigits)) {
        digits = nationalNumberDummyDigits;
      }
      var numberFormat = this.getFormatFormat(format2, international);
      var nationalPrefixIncludedInTemplate;
      if (this.shouldTryNationalPrefixFormattingRule(format2, {
        international,
        nationalPrefix
      })) {
        var numberFormatWithNationalPrefix = numberFormat.replace(FIRST_GROUP_PATTERN, format2.nationalPrefixFormattingRule());
        if (parseDigits(format2.nationalPrefixFormattingRule()) === (nationalPrefix || "") + parseDigits("$1")) {
          numberFormat = numberFormatWithNationalPrefix;
          nationalPrefixIncludedInTemplate = true;
          if (nationalPrefix) {
            var i = nationalPrefix.length;
            while (i > 0) {
              numberFormat = numberFormat.replace(/\d/, DIGIT_PLACEHOLDER);
              i--;
            }
          }
        }
      }
      var template = digits.replace(new RegExp(pattern), numberFormat).replace(new RegExp(DUMMY_DIGIT, "g"), DIGIT_PLACEHOLDER);
      if (!nationalPrefixIncludedInTemplate) {
        if (complexPrefixBeforeNationalSignificantNumber) {
          template = repeat(DIGIT_PLACEHOLDER, complexPrefixBeforeNationalSignificantNumber.length) + " " + template;
        } else if (nationalPrefix) {
          template = repeat(DIGIT_PLACEHOLDER, nationalPrefix.length) + this.getSeparatorAfterNationalPrefix(format2) + template;
        }
      }
      if (international) {
        template = applyInternationalSeparatorStyle(template);
      }
      return template;
    }
  }, {
    key: "formatNextNationalNumberDigits",
    value: function formatNextNationalNumberDigits(digits) {
      var result2 = populateTemplateWithDigits(this.populatedNationalNumberTemplate, this.populatedNationalNumberTemplatePosition, digits);
      if (!result2) {
        this.resetFormat();
        return;
      }
      this.populatedNationalNumberTemplate = result2[0];
      this.populatedNationalNumberTemplatePosition = result2[1];
      return cutAndStripNonPairedParens(this.populatedNationalNumberTemplate, this.populatedNationalNumberTemplatePosition + 1);
    }
  }, {
    key: "shouldTryNationalPrefixFormattingRule",
    value: function shouldTryNationalPrefixFormattingRule(format2, _ref5) {
      var international = _ref5.international, nationalPrefix = _ref5.nationalPrefix;
      if (format2.nationalPrefixFormattingRule()) {
        var usesNationalPrefix = format2.usesNationalPrefix();
        if (usesNationalPrefix && nationalPrefix || !usesNationalPrefix && !international) {
          return true;
        }
      }
    }
  }]);
  return AsYouTypeFormatter2;
}();
function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$4(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$4(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen);
}
function _arrayLikeToArray$4(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit$1(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}
function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART = "[" + VALID_PUNCTUATION + VALID_DIGITS + "]+";
var VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART_PATTERN = new RegExp("^" + VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART + "$", "i");
var VALID_FORMATTED_PHONE_NUMBER_PART = "(?:[" + PLUS_CHARS + "][" + VALID_PUNCTUATION + VALID_DIGITS + "]*|[" + VALID_PUNCTUATION + VALID_DIGITS + "]+)";
var AFTER_PHONE_NUMBER_DIGITS_END_PATTERN = new RegExp("[^" + VALID_PUNCTUATION + VALID_DIGITS + "]+.*$");
var COMPLEX_NATIONAL_PREFIX = /[^\d\[\]]/;
var AsYouTypeParser = /* @__PURE__ */ function() {
  function AsYouTypeParser2(_ref) {
    var defaultCountry = _ref.defaultCountry, defaultCallingCode = _ref.defaultCallingCode, metadata2 = _ref.metadata, onNationalSignificantNumberChange = _ref.onNationalSignificantNumberChange;
    _classCallCheck$2(this, AsYouTypeParser2);
    this.defaultCountry = defaultCountry;
    this.defaultCallingCode = defaultCallingCode;
    this.metadata = metadata2;
    this.onNationalSignificantNumberChange = onNationalSignificantNumberChange;
  }
  _createClass$2(AsYouTypeParser2, [{
    key: "input",
    value: function input(text, state) {
      var _extractFormattedDigi = extractFormattedDigitsAndPlus(text), _extractFormattedDigi2 = _slicedToArray$1(_extractFormattedDigi, 2), formattedDigits = _extractFormattedDigi2[0], hasPlus = _extractFormattedDigi2[1];
      var digits = parseDigits(formattedDigits);
      var justLeadingPlus;
      if (hasPlus) {
        if (!state.digits) {
          state.startInternationalNumber();
          if (!digits) {
            justLeadingPlus = true;
          }
        }
      }
      if (digits) {
        this.inputDigits(digits, state);
      }
      return {
        digits,
        justLeadingPlus
      };
    }
    /**
     * Inputs "next" phone number digits.
     * @param  {string} digits
     * @return {string} [formattedNumber] Formatted national phone number (if it can be formatted at this stage). Returning `undefined` means "don't format the national phone number at this stage".
     */
  }, {
    key: "inputDigits",
    value: function inputDigits(nextDigits, state) {
      var digits = state.digits;
      var hasReceivedThreeLeadingDigits = digits.length < 3 && digits.length + nextDigits.length >= 3;
      state.appendDigits(nextDigits);
      if (hasReceivedThreeLeadingDigits) {
        this.extractIddPrefix(state);
      }
      if (this.isWaitingForCountryCallingCode(state)) {
        if (!this.extractCountryCallingCode(state)) {
          return;
        }
      } else {
        state.appendNationalSignificantNumberDigits(nextDigits);
      }
      if (!state.international) {
        if (!this.hasExtractedNationalSignificantNumber) {
          this.extractNationalSignificantNumber(state.getNationalDigits(), function(stateUpdate) {
            return state.update(stateUpdate);
          });
        }
      }
    }
  }, {
    key: "isWaitingForCountryCallingCode",
    value: function isWaitingForCountryCallingCode(_ref2) {
      var international = _ref2.international, callingCode = _ref2.callingCode;
      return international && !callingCode;
    }
    // Extracts a country calling code from a number
    // being entered in internatonal format.
  }, {
    key: "extractCountryCallingCode",
    value: function extractCountryCallingCode$1(state) {
      var _extractCountryCallin = extractCountryCallingCode("+" + state.getDigitsWithoutInternationalPrefix(), this.defaultCountry, this.defaultCallingCode, this.metadata.metadata), countryCallingCode = _extractCountryCallin.countryCallingCode, number = _extractCountryCallin.number;
      if (countryCallingCode) {
        state.setCallingCode(countryCallingCode);
        state.update({
          nationalSignificantNumber: number
        });
        return true;
      }
    }
  }, {
    key: "reset",
    value: function reset(numberingPlan) {
      if (numberingPlan) {
        this.hasSelectedNumberingPlan = true;
        var nationalPrefixForParsing = numberingPlan._nationalPrefixForParsing();
        this.couldPossiblyExtractAnotherNationalSignificantNumber = nationalPrefixForParsing && COMPLEX_NATIONAL_PREFIX.test(nationalPrefixForParsing);
      } else {
        this.hasSelectedNumberingPlan = void 0;
        this.couldPossiblyExtractAnotherNationalSignificantNumber = void 0;
      }
    }
    /**
     * Extracts a national (significant) number from user input.
     * Google's library is different in that it only applies `national_prefix_for_parsing`
     * and doesn't apply `national_prefix_transform_rule` after that.
     * https://github.com/google/libphonenumber/blob/a3d70b0487875475e6ad659af404943211d26456/java/libphonenumber/src/com/google/i18n/phonenumbers/AsYouTypeFormatter.java#L539
     * @return {boolean} [extracted]
     */
  }, {
    key: "extractNationalSignificantNumber",
    value: function extractNationalSignificantNumber(nationalDigits, setState) {
      if (!this.hasSelectedNumberingPlan) {
        return;
      }
      var _extractNationalNumbe = extractNationalNumberFromPossiblyIncompleteNumber(nationalDigits, this.metadata), nationalPrefix = _extractNationalNumbe.nationalPrefix, nationalNumber = _extractNationalNumbe.nationalNumber, carrierCode = _extractNationalNumbe.carrierCode;
      if (nationalNumber === nationalDigits) {
        return;
      }
      this.onExtractedNationalNumber(nationalPrefix, carrierCode, nationalNumber, nationalDigits, setState);
      return true;
    }
    /**
     * In Google's code this function is called "attempt to extract longer NDD".
     * "Some national prefixes are a substring of others", they say.
     * @return {boolean} [result] — Returns `true` if extracting a national prefix produced different results from what they were.
     */
  }, {
    key: "extractAnotherNationalSignificantNumber",
    value: function extractAnotherNationalSignificantNumber(nationalDigits, prevNationalSignificantNumber, setState) {
      if (!this.hasExtractedNationalSignificantNumber) {
        return this.extractNationalSignificantNumber(nationalDigits, setState);
      }
      if (!this.couldPossiblyExtractAnotherNationalSignificantNumber) {
        return;
      }
      var _extractNationalNumbe2 = extractNationalNumberFromPossiblyIncompleteNumber(nationalDigits, this.metadata), nationalPrefix = _extractNationalNumbe2.nationalPrefix, nationalNumber = _extractNationalNumbe2.nationalNumber, carrierCode = _extractNationalNumbe2.carrierCode;
      if (nationalNumber === prevNationalSignificantNumber) {
        return;
      }
      this.onExtractedNationalNumber(nationalPrefix, carrierCode, nationalNumber, nationalDigits, setState);
      return true;
    }
  }, {
    key: "onExtractedNationalNumber",
    value: function onExtractedNationalNumber(nationalPrefix, carrierCode, nationalSignificantNumber, nationalDigits, setState) {
      var complexPrefixBeforeNationalSignificantNumber;
      var nationalSignificantNumberMatchesInput;
      var nationalSignificantNumberIndex = nationalDigits.lastIndexOf(nationalSignificantNumber);
      if (nationalSignificantNumberIndex >= 0 && nationalSignificantNumberIndex === nationalDigits.length - nationalSignificantNumber.length) {
        nationalSignificantNumberMatchesInput = true;
        var prefixBeforeNationalNumber = nationalDigits.slice(0, nationalSignificantNumberIndex);
        if (prefixBeforeNationalNumber !== nationalPrefix) {
          complexPrefixBeforeNationalSignificantNumber = prefixBeforeNationalNumber;
        }
      }
      setState({
        nationalPrefix,
        carrierCode,
        nationalSignificantNumber,
        nationalSignificantNumberMatchesInput,
        complexPrefixBeforeNationalSignificantNumber
      });
      this.hasExtractedNationalSignificantNumber = true;
      this.onNationalSignificantNumberChange();
    }
  }, {
    key: "reExtractNationalSignificantNumber",
    value: function reExtractNationalSignificantNumber(state) {
      if (this.extractAnotherNationalSignificantNumber(state.getNationalDigits(), state.nationalSignificantNumber, function(stateUpdate) {
        return state.update(stateUpdate);
      })) {
        return true;
      }
      if (this.extractIddPrefix(state)) {
        this.extractCallingCodeAndNationalSignificantNumber(state);
        return true;
      }
      if (this.fixMissingPlus(state)) {
        this.extractCallingCodeAndNationalSignificantNumber(state);
        return true;
      }
    }
  }, {
    key: "extractIddPrefix",
    value: function extractIddPrefix(state) {
      var international = state.international, IDDPrefix = state.IDDPrefix, digits = state.digits;
      state.nationalSignificantNumber;
      if (international || IDDPrefix) {
        return;
      }
      var numberWithoutIDD = stripIddPrefix(digits, this.defaultCountry, this.defaultCallingCode, this.metadata.metadata);
      if (numberWithoutIDD !== void 0 && numberWithoutIDD !== digits) {
        state.update({
          IDDPrefix: digits.slice(0, digits.length - numberWithoutIDD.length)
        });
        this.startInternationalNumber(state, {
          country: void 0,
          callingCode: void 0
        });
        return true;
      }
    }
  }, {
    key: "fixMissingPlus",
    value: function fixMissingPlus(state) {
      if (!state.international) {
        var _extractCountryCallin2 = extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(state.digits, this.defaultCountry, this.defaultCallingCode, this.metadata.metadata), newCallingCode = _extractCountryCallin2.countryCallingCode;
        _extractCountryCallin2.number;
        if (newCallingCode) {
          state.update({
            missingPlus: true
          });
          this.startInternationalNumber(state, {
            country: state.country,
            callingCode: newCallingCode
          });
          return true;
        }
      }
    }
  }, {
    key: "startInternationalNumber",
    value: function startInternationalNumber(state, _ref3) {
      var country = _ref3.country, callingCode = _ref3.callingCode;
      state.startInternationalNumber(country, callingCode);
      if (state.nationalSignificantNumber) {
        state.resetNationalSignificantNumber();
        this.onNationalSignificantNumberChange();
        this.hasExtractedNationalSignificantNumber = void 0;
      }
    }
  }, {
    key: "extractCallingCodeAndNationalSignificantNumber",
    value: function extractCallingCodeAndNationalSignificantNumber(state) {
      if (this.extractCountryCallingCode(state)) {
        this.extractNationalSignificantNumber(state.getNationalDigits(), function(stateUpdate) {
          return state.update(stateUpdate);
        });
      }
    }
  }]);
  return AsYouTypeParser2;
}();
function extractFormattedPhoneNumber(text) {
  var startsAt = text.search(VALID_FORMATTED_PHONE_NUMBER_PART);
  if (startsAt < 0) {
    return;
  }
  text = text.slice(startsAt);
  var hasPlus;
  if (text[0] === "+") {
    hasPlus = true;
    text = text.slice("+".length);
  }
  text = text.replace(AFTER_PHONE_NUMBER_DIGITS_END_PATTERN, "");
  if (hasPlus) {
    text = "+" + text;
  }
  return text;
}
function _extractFormattedDigitsAndPlus(text) {
  var extractedNumber = extractFormattedPhoneNumber(text) || "";
  if (extractedNumber[0] === "+") {
    return [extractedNumber.slice("+".length), true];
  }
  return [extractedNumber];
}
function extractFormattedDigitsAndPlus(text) {
  var _extractFormattedDigi3 = _extractFormattedDigitsAndPlus(text), _extractFormattedDigi4 = _slicedToArray$1(_extractFormattedDigi3, 2), formattedDigits = _extractFormattedDigi4[0], hasPlus = _extractFormattedDigi4[1];
  if (!VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART_PATTERN.test(formattedDigits)) {
    formattedDigits = "";
  }
  return [formattedDigits, hasPlus];
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen);
}
function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var AsYouType = /* @__PURE__ */ function() {
  function AsYouType2(optionsOrDefaultCountry, metadata2) {
    _classCallCheck$1(this, AsYouType2);
    this.metadata = new Metadata(metadata2);
    var _this$getCountryAndCa = this.getCountryAndCallingCode(optionsOrDefaultCountry), _this$getCountryAndCa2 = _slicedToArray(_this$getCountryAndCa, 2), defaultCountry = _this$getCountryAndCa2[0], defaultCallingCode = _this$getCountryAndCa2[1];
    this.defaultCountry = defaultCountry;
    this.defaultCallingCode = defaultCallingCode;
    this.reset();
  }
  _createClass$1(AsYouType2, [{
    key: "getCountryAndCallingCode",
    value: function getCountryAndCallingCode(optionsOrDefaultCountry) {
      var defaultCountry;
      var defaultCallingCode;
      if (optionsOrDefaultCountry) {
        if (isObject(optionsOrDefaultCountry)) {
          defaultCountry = optionsOrDefaultCountry.defaultCountry;
          defaultCallingCode = optionsOrDefaultCountry.defaultCallingCode;
        } else {
          defaultCountry = optionsOrDefaultCountry;
        }
      }
      if (defaultCountry && !this.metadata.hasCountry(defaultCountry)) {
        defaultCountry = void 0;
      }
      return [defaultCountry, defaultCallingCode];
    }
    /**
     * Inputs "next" phone number characters.
     * @param  {string} text
     * @return {string} Formatted phone number characters that have been input so far.
     */
  }, {
    key: "input",
    value: function input(text) {
      var _this$parser$input = this.parser.input(text, this.state), digits = _this$parser$input.digits, justLeadingPlus = _this$parser$input.justLeadingPlus;
      if (justLeadingPlus) {
        this.formattedOutput = "+";
      } else if (digits) {
        this.determineTheCountryIfNeeded();
        if (this.state.nationalSignificantNumber) {
          this.formatter.narrowDownMatchingFormats(this.state);
        }
        var formattedNationalNumber;
        if (this.metadata.hasSelectedNumberingPlan()) {
          formattedNationalNumber = this.formatter.format(digits, this.state);
        }
        if (formattedNationalNumber === void 0) {
          if (this.parser.reExtractNationalSignificantNumber(this.state)) {
            this.determineTheCountryIfNeeded();
            var nationalDigits = this.state.getNationalDigits();
            if (nationalDigits) {
              formattedNationalNumber = this.formatter.format(nationalDigits, this.state);
            }
          }
        }
        this.formattedOutput = formattedNationalNumber ? this.getFullNumber(formattedNationalNumber) : this.getNonFormattedNumber();
      }
      return this.formattedOutput;
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this = this;
      this.state = new AsYouTypeState({
        onCountryChange: function onCountryChange(country) {
          _this.country = country;
        },
        onCallingCodeChange: function onCallingCodeChange(callingCode, country) {
          _this.metadata.selectNumberingPlan(country, callingCode);
          _this.formatter.reset(_this.metadata.numberingPlan, _this.state);
          _this.parser.reset(_this.metadata.numberingPlan);
        }
      });
      this.formatter = new AsYouTypeFormatter({
        state: this.state,
        metadata: this.metadata
      });
      this.parser = new AsYouTypeParser({
        defaultCountry: this.defaultCountry,
        defaultCallingCode: this.defaultCallingCode,
        metadata: this.metadata,
        state: this.state,
        onNationalSignificantNumberChange: function onNationalSignificantNumberChange() {
          _this.determineTheCountryIfNeeded();
          _this.formatter.reset(_this.metadata.numberingPlan, _this.state);
        }
      });
      this.state.reset({
        country: this.defaultCountry,
        callingCode: this.defaultCallingCode
      });
      this.formattedOutput = "";
      return this;
    }
    /**
     * Returns `true` if the phone number is being input in international format.
     * In other words, returns `true` if and only if the parsed phone number starts with a `"+"`.
     * @return {boolean}
     */
  }, {
    key: "isInternational",
    value: function isInternational() {
      return this.state.international;
    }
    /**
     * Returns the "calling code" part of the phone number when it's being input
     * in an international format.
     * If no valid calling code has been entered so far, returns `undefined`.
     * @return {string} [callingCode]
     */
  }, {
    key: "getCallingCode",
    value: function getCallingCode() {
      if (this.isInternational()) {
        return this.state.callingCode;
      }
    }
    // A legacy alias.
  }, {
    key: "getCountryCallingCode",
    value: function getCountryCallingCode2() {
      return this.getCallingCode();
    }
    /**
     * Returns a two-letter country code of the phone number.
     * Returns `undefined` for "non-geographic" phone numbering plans.
     * Returns `undefined` if no phone number has been input yet.
     * @return {string} [country]
     */
  }, {
    key: "getCountry",
    value: function getCountry() {
      var digits = this.state.digits;
      if (digits) {
        return this._getCountry();
      }
    }
    /**
     * Returns a two-letter country code of the phone number.
     * Returns `undefined` for "non-geographic" phone numbering plans.
     * @return {string} [country]
     */
  }, {
    key: "_getCountry",
    value: function _getCountry() {
      var country = this.state.country;
      return country;
    }
  }, {
    key: "determineTheCountryIfNeeded",
    value: function determineTheCountryIfNeeded() {
      if (!this.state.country || this.isCountryCallingCodeAmbiguous()) {
        this.determineTheCountry();
      }
    }
    // Prepends `+CountryCode ` in case of an international phone number
  }, {
    key: "getFullNumber",
    value: function getFullNumber(formattedNationalNumber) {
      var _this2 = this;
      if (this.isInternational()) {
        var prefix = function prefix2(text) {
          return _this2.formatter.getInternationalPrefixBeforeCountryCallingCode(_this2.state, {
            spacing: text ? true : false
          }) + text;
        };
        var callingCode = this.state.callingCode;
        if (!callingCode) {
          return prefix("".concat(this.state.getDigitsWithoutInternationalPrefix()));
        }
        if (!formattedNationalNumber) {
          return prefix(callingCode);
        }
        return prefix("".concat(callingCode, " ").concat(formattedNationalNumber));
      }
      return formattedNationalNumber;
    }
  }, {
    key: "getNonFormattedNationalNumberWithPrefix",
    value: function getNonFormattedNationalNumberWithPrefix() {
      var _this$state = this.state, nationalSignificantNumber = _this$state.nationalSignificantNumber, complexPrefixBeforeNationalSignificantNumber = _this$state.complexPrefixBeforeNationalSignificantNumber, nationalPrefix = _this$state.nationalPrefix;
      var number = nationalSignificantNumber;
      var prefix = complexPrefixBeforeNationalSignificantNumber || nationalPrefix;
      if (prefix) {
        number = prefix + number;
      }
      return number;
    }
  }, {
    key: "getNonFormattedNumber",
    value: function getNonFormattedNumber() {
      var nationalSignificantNumberMatchesInput = this.state.nationalSignificantNumberMatchesInput;
      return this.getFullNumber(nationalSignificantNumberMatchesInput ? this.getNonFormattedNationalNumberWithPrefix() : this.state.getNationalDigits());
    }
  }, {
    key: "getNonFormattedTemplate",
    value: function getNonFormattedTemplate() {
      var number = this.getNonFormattedNumber();
      if (number) {
        return number.replace(/[\+\d]/g, DIGIT_PLACEHOLDER);
      }
    }
  }, {
    key: "isCountryCallingCodeAmbiguous",
    value: function isCountryCallingCodeAmbiguous() {
      var callingCode = this.state.callingCode;
      var countryCodes = this.metadata.getCountryCodesForCallingCode(callingCode);
      return countryCodes && countryCodes.length > 1;
    }
    // Determines the country of the phone number
    // entered so far based on the country phone code
    // and the national phone number.
  }, {
    key: "determineTheCountry",
    value: function determineTheCountry() {
      this.state.setCountry(getCountryByCallingCode(this.isInternational() ? this.state.callingCode : this.defaultCallingCode, {
        nationalNumber: this.state.nationalSignificantNumber,
        defaultCountry: this.defaultCountry,
        metadata: this.metadata
      }));
    }
    /**
     * Returns a E.164 phone number value for the user's input.
     *
     * For example, for country `"US"` and input `"(222) 333-4444"`
     * it will return `"+12223334444"`.
     *
     * For international phone number input, it will also auto-correct
     * some minor errors such as using a national prefix when writing
     * an international phone number. For example, if the user inputs
     * `"+44 0 7400 000000"` then it will return an auto-corrected
     * `"+447400000000"` phone number value.
     *
     * Will return `undefined` if no digits have been input,
     * or when inputting a phone number in national format and no
     * default country or default "country calling code" have been set.
     *
     * @return {string} [value]
     */
  }, {
    key: "getNumberValue",
    value: function getNumberValue() {
      var _this$state2 = this.state, digits = _this$state2.digits, callingCode = _this$state2.callingCode, country = _this$state2.country, nationalSignificantNumber = _this$state2.nationalSignificantNumber;
      if (!digits) {
        return;
      }
      if (this.isInternational()) {
        if (callingCode) {
          return "+" + callingCode + nationalSignificantNumber;
        } else {
          return "+" + digits;
        }
      } else {
        if (country || callingCode) {
          var callingCode_ = country ? this.metadata.countryCallingCode() : callingCode;
          return "+" + callingCode_ + nationalSignificantNumber;
        }
      }
    }
    /**
     * Returns an instance of `PhoneNumber` class.
     * Will return `undefined` if no national (significant) number
     * digits have been entered so far, or if no `defaultCountry` has been
     * set and the user enters a phone number not in international format.
     */
  }, {
    key: "getNumber",
    value: function getNumber() {
      var _this$state3 = this.state, nationalSignificantNumber = _this$state3.nationalSignificantNumber, carrierCode = _this$state3.carrierCode, callingCode = _this$state3.callingCode;
      var country = this._getCountry();
      if (!nationalSignificantNumber) {
        return;
      }
      if (!country && !callingCode) {
        return;
      }
      if (country) {
        if (country === this.defaultCountry) {
          var metadata2 = new Metadata(this.metadata.metadata);
          metadata2.selectNumberingPlan(country);
          var _callingCode = metadata2.numberingPlan.callingCode();
          var ambiguousCountries = this.metadata.getCountryCodesForCallingCode(_callingCode);
          if (ambiguousCountries.length > 1) {
            var exactCountry = getCountryByNationalNumber(nationalSignificantNumber, {
              countries: ambiguousCountries,
              defaultCountry: this.defaultCountry,
              metadata: this.metadata.metadata
            });
            if (exactCountry) {
              country = exactCountry;
            }
          }
        }
      }
      var phoneNumber = new PhoneNumber(country || callingCode, nationalSignificantNumber, this.metadata.metadata);
      if (carrierCode) {
        phoneNumber.carrierCode = carrierCode;
      }
      return phoneNumber;
    }
    /**
     * Returns `true` if the phone number is "possible".
     * Is just a shortcut for `PhoneNumber.isPossible()`.
     * @return {boolean}
     */
  }, {
    key: "isPossible",
    value: function isPossible() {
      var phoneNumber = this.getNumber();
      if (!phoneNumber) {
        return false;
      }
      return phoneNumber.isPossible();
    }
    /**
     * Returns `true` if the phone number is "valid".
     * Is just a shortcut for `PhoneNumber.isValid()`.
     * @return {boolean}
     */
  }, {
    key: "isValid",
    value: function isValid() {
      var phoneNumber = this.getNumber();
      if (!phoneNumber) {
        return false;
      }
      return phoneNumber.isValid();
    }
    /**
     * @deprecated
     * This method is used in `react-phone-number-input/source/input-control.js`
     * in versions before `3.0.16`.
     */
  }, {
    key: "getNationalNumber",
    value: function getNationalNumber() {
      return this.state.nationalSignificantNumber;
    }
    /**
     * Returns the phone number characters entered by the user.
     * @return {string}
     */
  }, {
    key: "getChars",
    value: function getChars() {
      return (this.state.international ? "+" : "") + this.state.digits;
    }
    /**
     * Returns the template for the formatted phone number.
     * @return {string}
     */
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      return this.formatter.getTemplate(this.state) || this.getNonFormattedTemplate() || "";
    }
  }]);
  return AsYouType2;
}();
function getCountries(metadata2) {
  return new Metadata(metadata2).getCountries();
}
function formatIncompletePhoneNumber(value, optionsOrDefaultCountry, metadata2) {
  if (!metadata2) {
    metadata2 = optionsOrDefaultCountry;
    optionsOrDefaultCountry = void 0;
  }
  return new AsYouType(optionsOrDefaultCountry, metadata2).input(value);
}
function getPrefixForFormattingValueAsPhoneNumber(_ref) {
  var inputFormat = _ref.inputFormat, country = _ref.country, metadata2 = _ref.metadata;
  return inputFormat === "NATIONAL_PART_OF_INTERNATIONAL" ? "+".concat(getCountryCallingCode(country, metadata2)) : "";
}
function removePrefixFromFormattedPhoneNumber(value, prefix) {
  if (prefix) {
    value = value.slice(prefix.length);
    if (value[0] === " ") {
      value = value.slice(1);
    }
  }
  return value;
}
function parsePhoneNumberCharacter_(character, prevParsedCharacters, context) {
  if (context && context.ignoreRest) {
    return;
  }
  var emitEvent = function emitEvent2(eventName) {
    if (context) {
      switch (eventName) {
        case "end":
          context.ignoreRest = true;
          break;
      }
    }
  };
  return parsePhoneNumberCharacter(character, prevParsedCharacters, emitEvent);
}
function useInputKeyDownHandler(_ref) {
  var onKeyDown2 = _ref.onKeyDown, inputFormat = _ref.inputFormat;
  return reactExports.useCallback(function(event) {
    if (event.keyCode === BACKSPACE_KEY_CODE && inputFormat === "INTERNATIONAL") {
      if (event.target instanceof HTMLInputElement) {
        if (getCaretPosition(event.target) === LEADING_PLUS.length) {
          event.preventDefault();
          return;
        }
      }
    }
    if (onKeyDown2) {
      onKeyDown2(event);
    }
  }, [onKeyDown2, inputFormat]);
}
function getCaretPosition(element) {
  return element.selectionStart;
}
var BACKSPACE_KEY_CODE = 8;
var LEADING_PLUS = "+";
var _excluded$9 = ["onKeyDown", "country", "inputFormat", "metadata", "international", "withCountryCallingCode"];
function _extends$7() {
  _extends$7 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$7.apply(this, arguments);
}
function _objectWithoutProperties$8(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$8(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$8(source, excluded) {
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
function createInput$1(defaultMetadata) {
  function InputSmart2(_ref, ref) {
    var onKeyDown2 = _ref.onKeyDown, country = _ref.country, inputFormat = _ref.inputFormat, _ref$metadata = _ref.metadata, metadata2 = _ref$metadata === void 0 ? defaultMetadata : _ref$metadata;
    _ref.international;
    _ref.withCountryCallingCode;
    var rest = _objectWithoutProperties$8(_ref, _excluded$9);
    var format2 = reactExports.useCallback(function(value) {
      var formatter = new AsYouType(country, metadata2);
      var prefix = getPrefixForFormattingValueAsPhoneNumber({
        inputFormat,
        country,
        metadata: metadata2
      });
      var text = formatter.input(prefix + value);
      var template = formatter.getTemplate();
      if (prefix) {
        text = removePrefixFromFormattedPhoneNumber(text, prefix);
        if (template) {
          template = removePrefixFromFormattedPhoneNumber(template, prefix);
        }
      }
      return {
        text,
        template
      };
    }, [country, metadata2]);
    var _onKeyDown = useInputKeyDownHandler({
      onKeyDown: onKeyDown2,
      inputFormat
    });
    return /* @__PURE__ */ U.createElement(Input, _extends$7({}, rest, {
      ref,
      parse: parsePhoneNumberCharacter_,
      format: format2,
      onKeyDown: _onKeyDown
    }));
  }
  InputSmart2 = /* @__PURE__ */ U.forwardRef(InputSmart2);
  InputSmart2.propTypes = {
    /**
     * The parsed phone number.
     * "Parsed" not in a sense of "E.164"
     * but rather in a sense of "having only
     * digits and possibly a leading plus character".
     * Examples: `""`, `"+"`, `"+123"`, `"123"`.
     */
    value: PropTypes.string.isRequired,
    /**
     * A function of `value: string`.
     * Updates the `value` property.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * A function of `event: Event`.
     * Handles `keydown` events.
     */
    onKeyDown: PropTypes.func,
    /**
     * A two-letter country code for formatting `value`
     * as a national phone number (e.g. `(800) 555 35 35`).
     * E.g. "US", "RU", etc.
     * If no `country` is passed then `value`
     * is formatted as an international phone number.
     * (e.g. `+7 800 555 35 35`)
     * This property should've been called `defaultCountry`
     * because it only applies when the user inputs a phone number in a national format
     * and is completely ignored when the user inputs a phone number in an international format.
     */
    country: PropTypes.string,
    /**
     * The format that the input field value is being input/output in.
     */
    inputFormat: PropTypes.oneOf(["INTERNATIONAL", "NATIONAL_PART_OF_INTERNATIONAL", "NATIONAL", "INTERNATIONAL_OR_NATIONAL"]).isRequired,
    /**
     * `libphonenumber-js` metadata.
     */
    metadata: PropTypes.object
  };
  return InputSmart2;
}
const InputSmart = createInput$1();
var _excluded$8 = ["value", "onChange", "onKeyDown", "country", "inputFormat", "metadata", "inputComponent", "international", "withCountryCallingCode"];
function _extends$6() {
  _extends$6 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$6.apply(this, arguments);
}
function _objectWithoutProperties$7(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$7(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$7(source, excluded) {
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
function createInput(defaultMetadata) {
  function InputBasic2(_ref, ref) {
    var value = _ref.value, onChange2 = _ref.onChange, onKeyDown2 = _ref.onKeyDown, country = _ref.country, inputFormat = _ref.inputFormat, _ref$metadata = _ref.metadata, metadata2 = _ref$metadata === void 0 ? defaultMetadata : _ref$metadata, _ref$inputComponent = _ref.inputComponent, Input2 = _ref$inputComponent === void 0 ? "input" : _ref$inputComponent;
    _ref.international;
    _ref.withCountryCallingCode;
    var rest = _objectWithoutProperties$7(_ref, _excluded$8);
    var prefix = getPrefixForFormattingValueAsPhoneNumber({
      inputFormat,
      country,
      metadata: metadata2
    });
    var _onChange = reactExports.useCallback(function(event) {
      var newValue = parseIncompletePhoneNumber(event.target.value);
      if (newValue === value) {
        var newValueFormatted = format(prefix, newValue, country, metadata2);
        if (newValueFormatted.indexOf(event.target.value) === 0) {
          newValue = newValue.slice(0, -1);
        }
      }
      onChange2(newValue);
    }, [prefix, value, onChange2, country, metadata2]);
    var _onKeyDown = useInputKeyDownHandler({
      onKeyDown: onKeyDown2,
      inputFormat
    });
    return /* @__PURE__ */ U.createElement(Input2, _extends$6({}, rest, {
      ref,
      value: format(prefix, value, country, metadata2),
      onChange: _onChange,
      onKeyDown: _onKeyDown
    }));
  }
  InputBasic2 = /* @__PURE__ */ U.forwardRef(InputBasic2);
  InputBasic2.propTypes = {
    /**
     * The parsed phone number.
     * "Parsed" not in a sense of "E.164"
     * but rather in a sense of "having only
     * digits and possibly a leading plus character".
     * Examples: `""`, `"+"`, `"+123"`, `"123"`.
     */
    value: PropTypes.string.isRequired,
    /**
     * A function of `value: string`.
     * Updates the `value` property.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * A function of `event: Event`.
     * Handles `keydown` events.
     */
    onKeyDown: PropTypes.func,
    /**
     * A two-letter country code for formatting `value`
     * as a national phone number (e.g. `(800) 555 35 35`).
     * E.g. "US", "RU", etc.
     * If no `country` is passed then `value`
     * is formatted as an international phone number.
     * (e.g. `+7 800 555 35 35`)
     * This property should've been called `defaultCountry`
     * because it only applies when the user inputs a phone number in a national format
     * and is completely ignored when the user inputs a phone number in an international format.
     */
    country: PropTypes.string,
    /**
     * The format that the input field value is being input/output in.
     */
    inputFormat: PropTypes.oneOf(["INTERNATIONAL", "NATIONAL_PART_OF_INTERNATIONAL", "NATIONAL", "INTERNATIONAL_OR_NATIONAL"]).isRequired,
    /**
     * `libphonenumber-js` metadata.
     */
    metadata: PropTypes.object,
    /**
     * The `<input/>` component.
     */
    inputComponent: PropTypes.elementType
  };
  return InputBasic2;
}
const InputBasic = createInput();
function format(prefix, value, country, metadata2) {
  return removePrefixFromFormattedPhoneNumber(formatIncompletePhoneNumber(prefix + value, country, metadata2), prefix);
}
function getCountryFlag(country) {
  return getRegionalIndicatorSymbol(country[0]) + getRegionalIndicatorSymbol(country[1]);
}
function getRegionalIndicatorSymbol(letter) {
  return String.fromCodePoint(127462 - 65 + letter.toUpperCase().charCodeAt(0));
}
var _excluded$7 = ["value", "onChange", "options", "disabled", "readOnly"], _excluded2$2 = ["value", "options", "className", "iconComponent", "getIconAspectRatio", "arrowComponent", "unicodeFlags"];
function _createForOfIteratorHelperLoose$2(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike) {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _extends$5() {
  _extends$5 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$5.apply(this, arguments);
}
function _objectWithoutProperties$6(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$6(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$6(source, excluded) {
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
function CountrySelect(_ref) {
  var value = _ref.value, onChange2 = _ref.onChange, options = _ref.options, disabled = _ref.disabled, readOnly = _ref.readOnly, rest = _objectWithoutProperties$6(_ref, _excluded$7);
  var onChange_ = reactExports.useCallback(function(event) {
    var value2 = event.target.value;
    onChange2(value2 === "ZZ" ? void 0 : value2);
  }, [onChange2]);
  reactExports.useMemo(function() {
    return getSelectedOption(options, value);
  }, [options, value]);
  return /* @__PURE__ */ U.createElement("select", _extends$5({}, rest, {
    disabled: disabled || readOnly,
    readOnly,
    value: value || "ZZ",
    onChange: onChange_
  }), options.map(function(_ref2) {
    var value2 = _ref2.value, label = _ref2.label, divider = _ref2.divider;
    return /* @__PURE__ */ U.createElement("option", {
      key: divider ? "|" : value2 || "ZZ",
      value: divider ? "|" : value2 || "ZZ",
      disabled: divider ? true : false,
      style: divider ? DIVIDER_STYLE : void 0
    }, label);
  }));
}
CountrySelect.propTypes = {
  /**
   * A two-letter country code.
   * Example: "US", "RU", etc.
   */
  value: PropTypes.string,
  /**
   * A function of `value: string`.
   * Updates the `value` property.
   */
  onChange: PropTypes.func.isRequired,
  // `<select/>` options.
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    divider: PropTypes.bool
  })).isRequired,
  // `readonly` attribute doesn't work on a `<select/>`.
  // https://github.com/catamphetamine/react-phone-number-input/issues/419#issuecomment-1764384480
  // https://www.delftstack.com/howto/html/html-select-readonly/
  // To work around that, if `readOnly: true` property is passed
  // to this component, it behaves analogous to `disabled: true`.
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool
};
var DIVIDER_STYLE = {
  fontSize: "1px",
  backgroundColor: "currentColor",
  color: "inherit"
};
function CountrySelectWithIcon(_ref3) {
  var value = _ref3.value, options = _ref3.options, className2 = _ref3.className, Icon = _ref3.iconComponent;
  _ref3.getIconAspectRatio;
  var _ref3$arrowComponent = _ref3.arrowComponent, Arrow = _ref3$arrowComponent === void 0 ? DefaultArrowComponent : _ref3$arrowComponent, unicodeFlags = _ref3.unicodeFlags, rest = _objectWithoutProperties$6(_ref3, _excluded2$2);
  var selectedOption = reactExports.useMemo(function() {
    return getSelectedOption(options, value);
  }, [options, value]);
  return /* @__PURE__ */ U.createElement("div", {
    className: "PhoneInputCountry"
  }, /* @__PURE__ */ U.createElement(CountrySelect, _extends$5({}, rest, {
    value,
    options,
    className: classNames("PhoneInputCountrySelect", className2)
  })), selectedOption && (unicodeFlags && value ? /* @__PURE__ */ U.createElement("div", {
    className: "PhoneInputCountryIconUnicode"
  }, getCountryFlag(value)) : /* @__PURE__ */ U.createElement(Icon, {
    "aria-hidden": true,
    country: value,
    label: selectedOption.label,
    aspectRatio: unicodeFlags ? 1 : void 0
  })), /* @__PURE__ */ U.createElement(Arrow, null));
}
CountrySelectWithIcon.propTypes = {
  // Country flag component.
  iconComponent: PropTypes.elementType,
  // Select arrow component.
  arrowComponent: PropTypes.elementType,
  // Set to `true` to render Unicode flag icons instead of SVG images.
  unicodeFlags: PropTypes.bool
};
function DefaultArrowComponent() {
  return /* @__PURE__ */ U.createElement("div", {
    className: "PhoneInputCountrySelectArrow"
  });
}
function getSelectedOption(options, value) {
  for (var _iterator = _createForOfIteratorHelperLoose$2(options), _step; !(_step = _iterator()).done; ) {
    var option = _step.value;
    if (!option.divider) {
      if (isSameOptionValue(option.value, value)) {
        return option;
      }
    }
  }
}
function isSameOptionValue(value1, value2) {
  if (value1 === void 0 || value1 === null) {
    return value2 === void 0 || value2 === null;
  }
  return value1 === value2;
}
var _excluded$6 = ["country", "countryName", "flags", "flagUrl"];
function _extends$4() {
  _extends$4 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$4.apply(this, arguments);
}
function _objectWithoutProperties$5(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$5(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$5(source, excluded) {
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
function FlagComponent(_ref) {
  var country = _ref.country, countryName = _ref.countryName, flags = _ref.flags, flagUrl = _ref.flagUrl, rest = _objectWithoutProperties$5(_ref, _excluded$6);
  if (flags && flags[country]) {
    return flags[country]({
      title: countryName
    });
  }
  return /* @__PURE__ */ U.createElement("img", _extends$4({}, rest, {
    alt: countryName,
    role: countryName ? void 0 : "presentation",
    src: flagUrl.replace("{XX}", country).replace("{xx}", country.toLowerCase())
  }));
}
FlagComponent.propTypes = {
  // The country to be selected by default.
  // Two-letter country code ("ISO 3166-1 alpha-2").
  country: PropTypes.string.isRequired,
  // Will be HTML `title` attribute of the `<img/>`.
  countryName: PropTypes.string.isRequired,
  // Country flag icon components.
  // By default flag icons are inserted as `<img/>`s
  // with their `src` pointed to `country-flag-icons` gitlab pages website.
  // There might be cases (e.g. an offline application)
  // where having a large (3 megabyte) `<svg/>` flags
  // bundle is more appropriate.
  // `import flags from 'react-phone-number-input/flags'`.
  flags: PropTypes.objectOf(PropTypes.elementType),
  // A URL for a country flag icon.
  // By default it points to `country-flag-icons` gitlab pages website.
  flagUrl: PropTypes.string.isRequired
};
var _excluded$5 = ["aspectRatio"], _excluded2$1 = ["title"], _excluded3 = ["title"];
function _extends$3() {
  _extends$3 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$3.apply(this, arguments);
}
function _objectWithoutProperties$4(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$4(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$4(source, excluded) {
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
function InternationalIcon(_ref) {
  var aspectRatio = _ref.aspectRatio, rest = _objectWithoutProperties$4(_ref, _excluded$5);
  if (aspectRatio === 1) {
    return /* @__PURE__ */ U.createElement(InternationalIcon1x1, rest);
  } else {
    return /* @__PURE__ */ U.createElement(InternationalIcon3x2, rest);
  }
}
InternationalIcon.propTypes = {
  title: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number
};
function InternationalIcon3x2(_ref2) {
  var title = _ref2.title, rest = _objectWithoutProperties$4(_ref2, _excluded2$1);
  return /* @__PURE__ */ U.createElement("svg", _extends$3({}, rest, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 75 50"
  }), /* @__PURE__ */ U.createElement("title", null, title), /* @__PURE__ */ U.createElement("g", {
    className: "PhoneInputInternationalIconGlobe",
    stroke: "currentColor",
    fill: "none",
    strokeWidth: "2",
    strokeMiterlimit: "10"
  }, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    d: "M47.2,36.1C48.1,36,49,36,50,36c7.4,0,14,1.7,18.5,4.3"
  }), /* @__PURE__ */ U.createElement("path", {
    d: "M68.6,9.6C64.2,12.3,57.5,14,50,14c-7.4,0-14-1.7-18.5-4.3"
  }), /* @__PURE__ */ U.createElement("line", {
    x1: "26",
    y1: "25",
    x2: "74",
    y2: "25"
  }), /* @__PURE__ */ U.createElement("line", {
    x1: "50",
    y1: "1",
    x2: "50",
    y2: "49"
  }), /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    d: "M46.3,48.7c1.2,0.2,2.5,0.3,3.7,0.3c13.3,0,24-10.7,24-24S63.3,1,50,1S26,11.7,26,25c0,2,0.3,3.9,0.7,5.8"
  }), /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    d: "M46.8,48.2c1,0.6,2.1,0.8,3.2,0.8c6.6,0,12-10.7,12-24S56.6,1,50,1S38,11.7,38,25c0,1.4,0.1,2.7,0.2,4c0,0.1,0,0.2,0,0.2"
  })), /* @__PURE__ */ U.createElement("path", {
    className: "PhoneInputInternationalIconPhone",
    stroke: "none",
    fill: "currentColor",
    d: "M12.4,17.9c2.9-2.9,5.4-4.8,0.3-11.2S4.1,5.2,1.3,8.1C-2,11.4,1.1,23.5,13.1,35.6s24.3,15.2,27.5,11.9c2.8-2.8,7.8-6.3,1.4-11.5s-8.3-2.6-11.2,0.3c-2,2-7.2-2.2-11.7-6.7S10.4,19.9,12.4,17.9z"
  }));
}
InternationalIcon3x2.propTypes = {
  title: PropTypes.string.isRequired
};
function InternationalIcon1x1(_ref3) {
  var title = _ref3.title, rest = _objectWithoutProperties$4(_ref3, _excluded3);
  return /* @__PURE__ */ U.createElement("svg", _extends$3({}, rest, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 50 50"
  }), /* @__PURE__ */ U.createElement("title", null, title), /* @__PURE__ */ U.createElement("g", {
    className: "PhoneInputInternationalIconGlobe",
    stroke: "currentColor",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /* @__PURE__ */ U.createElement("path", {
    d: "M8.45,13A21.44,21.44,0,1,1,37.08,41.56"
  }), /* @__PURE__ */ U.createElement("path", {
    d: "M19.36,35.47a36.9,36.9,0,0,1-2.28-13.24C17.08,10.39,21.88.85,27.8.85s10.72,9.54,10.72,21.38c0,6.48-1.44,12.28-3.71,16.21"
  }), /* @__PURE__ */ U.createElement("path", {
    d: "M17.41,33.4A39,39,0,0,1,27.8,32.06c6.62,0,12.55,1.5,16.48,3.86"
  }), /* @__PURE__ */ U.createElement("path", {
    d: "M44.29,8.53c-3.93,2.37-9.86,3.88-16.49,3.88S15.25,10.9,11.31,8.54"
  }), /* @__PURE__ */ U.createElement("line", {
    x1: "27.8",
    y1: "0.85",
    x2: "27.8",
    y2: "34.61"
  }), /* @__PURE__ */ U.createElement("line", {
    x1: "15.2",
    y1: "22.23",
    x2: "49.15",
    y2: "22.23"
  })), /* @__PURE__ */ U.createElement("path", {
    className: "PhoneInputInternationalIconPhone",
    stroke: "transparent",
    fill: "currentColor",
    d: "M9.42,26.64c2.22-2.22,4.15-3.59.22-8.49S3.08,17,.93,19.17c-2.49,2.48-.13,11.74,9,20.89s18.41,11.5,20.89,9c2.15-2.15,5.91-4.77,1-8.71s-6.27-2-8.49.22c-1.55,1.55-5.48-1.69-8.86-5.08S7.87,28.19,9.42,26.64Z"
  }));
}
InternationalIcon1x1.propTypes = {
  title: PropTypes.string.isRequired
};
function isE164Number(value) {
  if (value.length < 2) {
    return false;
  }
  if (value[0] !== "+") {
    return false;
  }
  var i = 1;
  while (i < value.length) {
    var character = value.charCodeAt(i);
    if (character >= 48 && character <= 57) ;
    else {
      return false;
    }
    i++;
  }
  return true;
}
function validateE164Number(value) {
  if (!isE164Number(value)) {
    console.error("[react-phone-number-input] Expected the initial `value` to be a E.164 phone number. Got", value);
  }
}
function _createForOfIteratorHelperLoose$1(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike) {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function sortCountryOptions(options, order) {
  if (!order) {
    return options;
  }
  var optionsOnTop = [];
  var optionsOnBottom = [];
  var appendTo = optionsOnTop;
  var _loop = function _loop2() {
    var element = _step.value;
    if (element === "|") {
      appendTo.push({
        divider: true
      });
    } else if (element === "..." || element === "…") {
      appendTo = optionsOnBottom;
    } else {
      var countryCode;
      if (element === "🌐") {
        countryCode = void 0;
      } else {
        countryCode = element;
      }
      var index = options.indexOf(options.filter(function(option2) {
        return option2.value === countryCode;
      })[0]);
      var option = options[index];
      options.splice(index, 1);
      appendTo.push(option);
    }
  };
  for (var _iterator = _createForOfIteratorHelperLoose$1(order), _step; !(_step = _iterator()).done; ) {
    _loop();
  }
  return optionsOnTop.concat(options).concat(optionsOnBottom);
}
function getSupportedCountryOptions(countryOptions, metadata2) {
  if (countryOptions) {
    countryOptions = countryOptions.filter(function(option) {
      switch (option) {
        case "🌐":
        case "|":
        case "...":
        case "…":
          return true;
        default:
          return isCountrySupportedWithError(option, metadata2);
      }
    });
    if (countryOptions.length > 0) {
      return countryOptions;
    }
  }
}
function isCountrySupportedWithError(country, metadata2) {
  if (isSupportedCountry(country, metadata2)) {
    return true;
  } else {
    console.error("Country not found: ".concat(country));
    return false;
  }
}
function getSupportedCountries(countries, metadata2) {
  if (countries) {
    countries = countries.filter(function(country) {
      return isCountrySupportedWithError(country, metadata2);
    });
    if (countries.length === 0) {
      countries = void 0;
    }
  }
  return countries;
}
var _excluded$4 = ["country", "label", "aspectRatio"];
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$2.apply(this, arguments);
}
function _objectWithoutProperties$3(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$3(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$3(source, excluded) {
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
function createCountryIconComponent(_ref) {
  var flags = _ref.flags, flagUrl = _ref.flagUrl, FlagComponent2 = _ref.flagComponent, InternationalIcon$1 = _ref.internationalIcon;
  function CountryIcon(_ref2) {
    var country = _ref2.country, label = _ref2.label, aspectRatio = _ref2.aspectRatio, rest = _objectWithoutProperties$3(_ref2, _excluded$4);
    var _aspectRatio = InternationalIcon$1 === InternationalIcon ? aspectRatio : void 0;
    return /* @__PURE__ */ U.createElement("div", _extends$2({}, rest, {
      className: classNames("PhoneInputCountryIcon", {
        "PhoneInputCountryIcon--square": _aspectRatio === 1,
        "PhoneInputCountryIcon--border": country
      })
    }), country ? /* @__PURE__ */ U.createElement(FlagComponent2, {
      country,
      countryName: label,
      flags,
      flagUrl,
      className: "PhoneInputCountryIconImg"
    }) : /* @__PURE__ */ U.createElement(InternationalIcon$1, {
      title: label,
      aspectRatio: _aspectRatio,
      className: "PhoneInputCountryIconImg"
    }));
  }
  CountryIcon.propTypes = {
    country: PropTypes.string,
    label: PropTypes.string.isRequired,
    aspectRatio: PropTypes.number
  };
  return CountryIcon;
}
createCountryIconComponent({
  // Must be equal to `defaultProps.flagUrl` in `./PhoneInputWithCountry.js`.
  flagUrl: "https://purecatamphetamine.github.io/country-flag-icons/3x2/{XX}.svg",
  flagComponent: FlagComponent,
  internationalIcon: InternationalIcon
});
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function setRefsValue(refs, value) {
  for (var _iterator = _createForOfIteratorHelperLoose(refs), _step; !(_step = _iterator()).done; ) {
    var ref = _step.value;
    if (ref) {
      setRefValue(ref, value);
    }
  }
}
function setRefValue(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else {
    ref.current = value;
  }
}
var metadata = PropTypes.shape({
  country_calling_codes: PropTypes.object.isRequired,
  countries: PropTypes.object.isRequired
});
var labels = PropTypes.objectOf(PropTypes.string);
function getInternationalPhoneNumberPrefix(country, metadata2) {
  var prefix = "+" + getCountryCallingCode(country, metadata2);
  return prefix;
}
function getPreSelectedCountry(_ref) {
  var value = _ref.value, phoneNumber = _ref.phoneNumber, defaultCountry = _ref.defaultCountry, getAnyCountry = _ref.getAnyCountry, countries = _ref.countries, required = _ref.required, metadata2 = _ref.metadata;
  var country;
  if (phoneNumber && phoneNumber.country) {
    country = phoneNumber.country;
  } else if (defaultCountry) {
    if (!value || couldNumberBelongToCountry(value, defaultCountry, metadata2)) {
      country = defaultCountry;
    }
  }
  if (countries && countries.indexOf(country) < 0) {
    country = void 0;
  }
  if (!country && required && countries && countries.length > 0) {
    country = getAnyCountry();
  }
  return country;
}
function getCountrySelectOptions(_ref2) {
  var countries = _ref2.countries, countryNames = _ref2.countryNames, addInternationalOption = _ref2.addInternationalOption, compareStringsLocales = _ref2.compareStringsLocales, _compareStrings = _ref2.compareStrings;
  if (!_compareStrings) {
    _compareStrings = compareStrings;
  }
  var countrySelectOptions = countries.map(function(country) {
    return {
      value: country,
      // All `locale` country names included in this library
      // include all countries (this is checked at build time).
      // The only case when a country name might be missing
      // is when a developer supplies their own `labels` property.
      // To guard against such cases, a missing country name
      // is substituted by country code.
      label: countryNames[country] || country
    };
  });
  countrySelectOptions.sort(function(a, b) {
    return _compareStrings(a.label, b.label, compareStringsLocales);
  });
  if (addInternationalOption) {
    countrySelectOptions.unshift({
      label: countryNames.ZZ
    });
  }
  return countrySelectOptions;
}
function parsePhoneNumber(value, metadata2) {
  return parsePhoneNumber$1(value || "", metadata2);
}
function generateNationalNumberDigits(phoneNumber) {
  return phoneNumber.formatNational().replace(/\D/g, "");
}
function getPhoneDigitsForNewCountry(phoneDigits, _ref3) {
  var prevCountry = _ref3.prevCountry, newCountry = _ref3.newCountry, metadata2 = _ref3.metadata, useNationalFormat = _ref3.useNationalFormat;
  if (prevCountry === newCountry) {
    return phoneDigits;
  }
  if (!phoneDigits) {
    if (useNationalFormat) {
      return "";
    } else {
      if (newCountry) {
        return getInternationalPhoneNumberPrefix(newCountry, metadata2);
      }
      return "";
    }
  }
  if (newCountry) {
    if (phoneDigits[0] === "+") {
      if (useNationalFormat) {
        if (phoneDigits.indexOf("+" + getCountryCallingCode(newCountry, metadata2)) === 0) {
          return stripCountryCallingCode(phoneDigits, newCountry, metadata2);
        }
        return "";
      }
      if (prevCountry) {
        var newCountryPrefix = getInternationalPhoneNumberPrefix(newCountry, metadata2);
        if (phoneDigits.indexOf(newCountryPrefix) === 0) {
          return phoneDigits;
        } else {
          return newCountryPrefix;
        }
      } else {
        var defaultValue = getInternationalPhoneNumberPrefix(newCountry, metadata2);
        if (phoneDigits.indexOf(defaultValue) === 0) {
          return phoneDigits;
        }
        return defaultValue;
      }
    }
  } else {
    if (phoneDigits[0] !== "+") {
      return e164(phoneDigits, prevCountry, metadata2) || "";
    }
  }
  return phoneDigits;
}
function e164(number, country, metadata2) {
  if (!number) {
    return;
  }
  if (number[0] === "+") {
    if (number === "+") {
      return;
    }
    var asYouType = new AsYouType(country, metadata2);
    asYouType.input(number);
    return asYouType.getNumberValue();
  }
  if (!country) {
    return;
  }
  var partial_national_significant_number = getNationalSignificantNumberDigits(number, country, metadata2);
  return "+".concat(getCountryCallingCode(country, metadata2)).concat(partial_national_significant_number || "");
}
function trimNumber(number, country, metadata2) {
  var nationalSignificantNumberPart = getNationalSignificantNumberDigits(number, country, metadata2);
  if (nationalSignificantNumberPart) {
    var overflowDigitsCount = nationalSignificantNumberPart.length - getMaxNumberLength(country, metadata2);
    if (overflowDigitsCount > 0) {
      return number.slice(0, number.length - overflowDigitsCount);
    }
  }
  return number;
}
function getMaxNumberLength(country, metadata2) {
  metadata2 = new Metadata(metadata2);
  metadata2.selectNumberingPlan(country);
  return metadata2.numberingPlan.possibleLengths()[metadata2.numberingPlan.possibleLengths().length - 1];
}
function getCountryForPartialE164Number(partialE164Number, _ref4) {
  var country = _ref4.country, countries = _ref4.countries, defaultCountry = _ref4.defaultCountry, latestCountrySelectedByUser = _ref4.latestCountrySelectedByUser, required = _ref4.required, metadata2 = _ref4.metadata;
  if (partialE164Number === "+") {
    return country;
  }
  var derived_country = getCountryFromPossiblyIncompleteInternationalPhoneNumber(partialE164Number, metadata2);
  if (derived_country) {
    if (!countries || countries.indexOf(derived_country) >= 0) {
      return derived_country;
    } else {
      return void 0;
    }
  } else if (country) {
    if (couldNumberBelongToCountry(partialE164Number, country, metadata2)) {
      if (latestCountrySelectedByUser && couldNumberBelongToCountry(partialE164Number, latestCountrySelectedByUser, metadata2)) {
        return latestCountrySelectedByUser;
      } else if (defaultCountry && couldNumberBelongToCountry(partialE164Number, defaultCountry, metadata2)) {
        return defaultCountry;
      } else {
        if (!required) {
          return void 0;
        }
      }
    } else {
      if (!required) {
        return void 0;
      }
    }
  }
  return country;
}
function onPhoneDigitsChange(phoneDigits, _ref5) {
  var prevPhoneDigits = _ref5.prevPhoneDigits, country = _ref5.country, defaultCountry = _ref5.defaultCountry, latestCountrySelectedByUser = _ref5.latestCountrySelectedByUser, countryRequired = _ref5.countryRequired, getAnyCountry = _ref5.getAnyCountry, countries = _ref5.countries, international = _ref5.international, limitMaxLength = _ref5.limitMaxLength, countryCallingCodeEditable = _ref5.countryCallingCodeEditable, metadata2 = _ref5.metadata;
  if (international && countryCallingCodeEditable === false) {
    if (country) {
      var prefix = getInternationalPhoneNumberPrefix(country, metadata2);
      if (phoneDigits.indexOf(prefix) !== 0) {
        var _value;
        var hasStartedTypingInNationalNumberDigitsHavingInputValueSelected = phoneDigits && phoneDigits[0] !== "+";
        if (hasStartedTypingInNationalNumberDigitsHavingInputValueSelected) {
          phoneDigits = prefix + phoneDigits;
          _value = e164(phoneDigits, country, metadata2);
        } else {
          phoneDigits = prefix;
        }
        return {
          phoneDigits,
          value: _value,
          country
        };
      }
    }
  }
  if (international === false && country && phoneDigits && phoneDigits[0] === "+") {
    phoneDigits = convertInternationalPhoneDigitsToNational(phoneDigits, country, metadata2);
  }
  if (phoneDigits && country && limitMaxLength) {
    phoneDigits = trimNumber(phoneDigits, country, metadata2);
  }
  if (phoneDigits && phoneDigits[0] !== "+" && (!country || international)) {
    phoneDigits = "+" + phoneDigits;
  }
  if (!phoneDigits && prevPhoneDigits && prevPhoneDigits[0] === "+") {
    if (international) {
      country = void 0;
    } else {
      country = defaultCountry;
    }
  }
  if (phoneDigits === "+" && prevPhoneDigits && prevPhoneDigits[0] === "+" && prevPhoneDigits.length > "+".length) {
    country = void 0;
  }
  var value;
  if (phoneDigits) {
    if (phoneDigits[0] === "+") {
      if (phoneDigits === "+") {
        value = void 0;
      } else if (country && getInternationalPhoneNumberPrefix(country, metadata2).indexOf(phoneDigits) === 0) {
        value = void 0;
      } else {
        value = e164(phoneDigits, country, metadata2);
      }
    } else {
      value = e164(phoneDigits, country, metadata2);
    }
  }
  if (value) {
    country = getCountryForPartialE164Number(value, {
      country,
      countries,
      defaultCountry,
      latestCountrySelectedByUser,
      // `countryRequired` flag is not passed here.
      // Instead, it's explicitly checked a bit later in the code.
      required: false,
      metadata: metadata2
    });
    if (international === false && country && phoneDigits && phoneDigits[0] === "+") {
      phoneDigits = convertInternationalPhoneDigitsToNational(phoneDigits, country, metadata2);
      value = e164(phoneDigits, country, metadata2);
    }
  }
  if (!country && countryRequired) {
    country = defaultCountry || getAnyCountry();
  }
  return {
    // `phoneDigits` returned here are a "normalized" version of the original `phoneDigits`.
    // The returned `phoneDigits` shouldn't be used anywhere except for passing it as
    // `prevPhoneDigits` parameter to this same function on next input change event.
    phoneDigits,
    country,
    value
  };
}
function convertInternationalPhoneDigitsToNational(input, country, metadata2) {
  if (input.indexOf(getInternationalPhoneNumberPrefix(country, metadata2)) === 0) {
    var formatter = new AsYouType(country, metadata2);
    formatter.input(input);
    var phoneNumber = formatter.getNumber();
    if (phoneNumber) {
      return phoneNumber.formatNational().replace(/\D/g, "");
    } else {
      return "";
    }
  } else {
    return input.replace(/\D/g, "");
  }
}
function getCountryFromPossiblyIncompleteInternationalPhoneNumber(number, metadata2) {
  var formatter = new AsYouType(null, metadata2);
  formatter.input(number);
  return formatter.getCountry();
}
function compareStrings(a, b, locales) {
  if (String.prototype.localeCompare) {
    return a.localeCompare(b, locales);
  }
  return a < b ? -1 : a > b ? 1 : 0;
}
function stripCountryCallingCode(number, country, metadata2) {
  if (country) {
    var countryCallingCodePrefix = "+" + getCountryCallingCode(country, metadata2);
    if (number.length < countryCallingCodePrefix.length) {
      if (countryCallingCodePrefix.indexOf(number) === 0) {
        return "";
      }
    } else {
      if (number.indexOf(countryCallingCodePrefix) === 0) {
        return number.slice(countryCallingCodePrefix.length);
      }
    }
  }
  for (var _i = 0, _Object$keys = Object.keys(metadata2.country_calling_codes); _i < _Object$keys.length; _i++) {
    var country_calling_code = _Object$keys[_i];
    if (number.indexOf(country_calling_code) === "+".length) {
      return number.slice("+".length + country_calling_code.length);
    }
  }
  return "";
}
function getNationalSignificantNumberDigits(number, country, metadata2) {
  var formatter = new AsYouType(country, metadata2);
  formatter.input(number);
  var phoneNumber = formatter.getNumber();
  return phoneNumber && phoneNumber.nationalNumber;
}
function couldNumberBelongToCountry(number, country, metadata2) {
  var intlPhoneNumberPrefix = getInternationalPhoneNumberPrefix(country, metadata2);
  var i = 0;
  while (i < number.length && i < intlPhoneNumberPrefix.length) {
    if (number[i] !== intlPhoneNumberPrefix[i]) {
      return false;
    }
    i++;
  }
  return true;
}
function getInitialPhoneDigits(_ref6) {
  var value = _ref6.value, phoneNumber = _ref6.phoneNumber, defaultCountry = _ref6.defaultCountry, international = _ref6.international, useNationalFormat = _ref6.useNationalFormat, metadata2 = _ref6.metadata;
  if ((international === false || useNationalFormat) && phoneNumber && phoneNumber.country) {
    return generateNationalNumberDigits(phoneNumber);
  }
  if (!value && international && defaultCountry) {
    return getInternationalPhoneNumberPrefix(defaultCountry, metadata2);
  }
  return value;
}
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
function ownKeys$h(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$h(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$h(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$h(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$2(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function getPhoneInputWithCountryStateUpdateFromNewProps(props, prevProps, state) {
  var metadata2 = props.metadata, countries = props.countries, newDefaultCountry = props.defaultCountry, newValue = props.value, newReset = props.reset, international = props.international, displayInitialValueAsLocalNumber = props.displayInitialValueAsLocalNumber, initialValueFormat = props.initialValueFormat;
  var prevDefaultCountry = prevProps.defaultCountry, prevValue = prevProps.value, prevReset = prevProps.reset;
  state.country;
  var value = state.value, hasUserSelectedACountry = state.hasUserSelectedACountry, latestCountrySelectedByUser = state.latestCountrySelectedByUser;
  var _getInitialPhoneDigits = function _getInitialPhoneDigits2(parameters) {
    return getInitialPhoneDigits(_objectSpread$h(_objectSpread$h({}, parameters), {}, {
      international,
      useNationalFormat: displayInitialValueAsLocalNumber || initialValueFormat === "national",
      metadata: metadata2
    }));
  };
  if (newReset !== prevReset) {
    return {
      phoneDigits: _getInitialPhoneDigits({
        value: void 0,
        defaultCountry: newDefaultCountry
      }),
      value: void 0,
      country: newDefaultCountry,
      latestCountrySelectedByUser: void 0,
      hasUserSelectedACountry: void 0
    };
  }
  if (newDefaultCountry !== prevDefaultCountry) {
    var isNewDefaultCountrySupported = !newDefaultCountry || isCountrySupportedWithError(newDefaultCountry, metadata2);
    var noValueHasBeenEnteredByTheUser = (
      // By default, "no value has been entered" means `value` is `undefined`.
      !value || // When `international` is `true`, and some country has been pre-selected,
      // then the `<input/>` contains a pre-filled value of `+${countryCallingCode}${leadingDigits}`,
      // so in case of `international` being `true`, "the user hasn't entered anything" situation
      // doesn't just mean `value` is `undefined`, but could also mean `value` is `+${countryCallingCode}`.
      international && value === _getInitialPhoneDigits({
        value: void 0,
        defaultCountry: prevDefaultCountry
      })
    );
    var noValueHasBeenEntered = !newValue && noValueHasBeenEnteredByTheUser;
    if (!hasUserSelectedACountry && isNewDefaultCountrySupported && noValueHasBeenEntered) {
      return {
        country: newDefaultCountry,
        // If `phoneDigits` is empty, then automatically select the new `country`
        // and set `phoneDigits` to `+{getCountryCallingCode(newCountry)}`.
        // The code assumes that "no phone number has been entered by the user",
        // and no `value` property has been passed, so the `phoneNumber` parameter
        // of `_getInitialPhoneDigits({ value, phoneNumber, ... })` is `undefined`.
        phoneDigits: _getInitialPhoneDigits({
          value: void 0,
          defaultCountry: newDefaultCountry
        }),
        // `value` is `undefined` and it stays so.
        value: void 0
      };
    }
  }
  if (!valuesAreEqual(newValue, prevValue) && !valuesAreEqual(newValue, value)) {
    var phoneNumber;
    var parsedCountry;
    if (newValue) {
      if (newValue) {
        validateE164Number(newValue);
      }
      phoneNumber = parsePhoneNumber(newValue, metadata2);
      var supportedCountries = getSupportedCountries(countries, metadata2);
      if (phoneNumber && phoneNumber.country) {
        if (!supportedCountries || supportedCountries.indexOf(phoneNumber.country) >= 0) {
          parsedCountry = phoneNumber.country;
        }
      } else {
        parsedCountry = getCountryForPartialE164Number(newValue, {
          country: void 0,
          countries: supportedCountries,
          metadata: metadata2
        });
        if (!parsedCountry) {
          if (newDefaultCountry) {
            if (newValue.indexOf(getInternationalPhoneNumberPrefix(newDefaultCountry, metadata2)) === 0) {
              parsedCountry = newDefaultCountry;
            }
          }
        }
      }
    }
    var userCountrySelectionHistoryStateUpdate;
    if (newValue) {
      if (latestCountrySelectedByUser) {
        var couldNewValueCorrespondToLatestCountrySelectedByUser = parsedCountry ? latestCountrySelectedByUser === parsedCountry : couldNumberBelongToCountry(newValue, latestCountrySelectedByUser, metadata2);
        if (couldNewValueCorrespondToLatestCountrySelectedByUser) {
          if (!parsedCountry) {
            parsedCountry = latestCountrySelectedByUser;
          }
        } else {
          userCountrySelectionHistoryStateUpdate = {
            latestCountrySelectedByUser: void 0
          };
        }
      }
    } else {
      userCountrySelectionHistoryStateUpdate = {
        latestCountrySelectedByUser: void 0,
        hasUserSelectedACountry: void 0
      };
    }
    return _objectSpread$h(_objectSpread$h({}, userCountrySelectionHistoryStateUpdate), {}, {
      phoneDigits: _getInitialPhoneDigits({
        phoneNumber,
        value: newValue,
        defaultCountry: newDefaultCountry
      }),
      value: newValue,
      country: newValue ? parsedCountry : newDefaultCountry
    });
  }
}
function valuesAreEqual(value1, value2) {
  if (value1 === null) {
    value1 = void 0;
  }
  if (value2 === null) {
    value2 = void 0;
  }
  return value1 === value2;
}
var _excluded$3 = ["name", "disabled", "readOnly", "autoComplete", "style", "className", "inputRef", "inputComponent", "numberInputProps", "smartCaret", "countrySelectComponent", "countrySelectProps", "containerComponent", "containerComponentProps", "defaultCountry", "countries", "countryOptionsOrder", "labels", "flags", "flagComponent", "flagUrl", "addInternationalOption", "internationalIcon", "displayInitialValueAsLocalNumber", "initialValueFormat", "onCountryChange", "limitMaxLength", "countryCallingCodeEditable", "focusInputOnCountrySelection", "reset", "metadata", "international", "locales"];
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function ownKeys$g(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$g(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$g(Object(t), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$g(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
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
function _objectWithoutProperties$2(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$2(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$2(source, excluded) {
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
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var PhoneNumberInput_ = /* @__PURE__ */ function(_React$PureComponent) {
  function PhoneNumberInput_2(props) {
    var _this;
    _classCallCheck(this, PhoneNumberInput_2);
    _this = _callSuper(this, PhoneNumberInput_2, [props]);
    _defineProperty$1(_this, "setInputRef", function(instance) {
      setRefsValue([_this.props.inputRef, _this.inputRef], instance);
    });
    _defineProperty$1(_this, "isCountrySupportedWithError", function(country) {
      var metadata2 = _this.props.metadata;
      return isCountrySupportedWithError(country, metadata2);
    });
    _defineProperty$1(_this, "onCountryChange", function(newCountry) {
      var _this$props = _this.props, international = _this$props.international, metadata2 = _this$props.metadata, onChange2 = _this$props.onChange, focusInputOnCountrySelection = _this$props.focusInputOnCountrySelection;
      var _this$state = _this.state, prevPhoneDigits = _this$state.phoneDigits, prevCountry = _this$state.country;
      var newPhoneDigits = getPhoneDigitsForNewCountry(prevPhoneDigits, {
        prevCountry,
        newCountry,
        metadata: metadata2,
        // Convert the phone number to "national" format
        // when the user changes the selected country by hand.
        useNationalFormat: !international
      });
      var newValue = e164(newPhoneDigits, newCountry, metadata2);
      if (focusInputOnCountrySelection) {
        _this.inputRef.current.focus();
      }
      _this.setState({
        country: newCountry,
        latestCountrySelectedByUser: newCountry,
        hasUserSelectedACountry: true,
        phoneDigits: newPhoneDigits,
        value: newValue
      }, function() {
        onChange2(newValue);
      });
    });
    _defineProperty$1(_this, "onChange", function(_phoneDigits) {
      var _this$props2 = _this.props, defaultCountry = _this$props2.defaultCountry, onChange2 = _this$props2.onChange, addInternationalOption = _this$props2.addInternationalOption, international = _this$props2.international, limitMaxLength = _this$props2.limitMaxLength, countryCallingCodeEditable = _this$props2.countryCallingCodeEditable, metadata2 = _this$props2.metadata;
      var _this$state2 = _this.state, countries = _this$state2.countries, prevPhoneDigits = _this$state2.phoneDigits, currentlySelectedCountry = _this$state2.country, latestCountrySelectedByUser = _this$state2.latestCountrySelectedByUser;
      var _onPhoneDigitsChange = onPhoneDigitsChange(_phoneDigits, {
        prevPhoneDigits,
        country: currentlySelectedCountry,
        countryRequired: !addInternationalOption,
        defaultCountry,
        latestCountrySelectedByUser,
        getAnyCountry: function getAnyCountry() {
          return _this.getFirstSupportedCountry({
            countries
          });
        },
        countries,
        international,
        limitMaxLength,
        countryCallingCodeEditable,
        metadata: metadata2
      }), phoneDigits = _onPhoneDigitsChange.phoneDigits, country = _onPhoneDigitsChange.country, value = _onPhoneDigitsChange.value;
      var stateUpdate = {
        phoneDigits,
        value,
        country
      };
      if (latestCountrySelectedByUser && value && !couldNumberBelongToCountry(value, latestCountrySelectedByUser, metadata2)) {
        stateUpdate.latestCountrySelectedByUser = void 0;
      }
      if (countryCallingCodeEditable === false) {
        if (!value && phoneDigits === _this.state.phoneDigits) {
          stateUpdate.forceRerender = {};
        }
      }
      _this.setState(
        stateUpdate,
        // Update the new `value` property.
        // Doing it after the `state` has been updated
        // because `onChange()` will trigger `getDerivedStateFromProps()`
        // with the new `value` which will be compared to `state.value` there.
        function() {
          return onChange2(value);
        }
      );
    });
    _defineProperty$1(_this, "_onFocus", function() {
      return _this.setState({
        isFocused: true
      });
    });
    _defineProperty$1(_this, "_onBlur", function() {
      return _this.setState({
        isFocused: false
      });
    });
    _defineProperty$1(_this, "onFocus", function(event) {
      _this._onFocus();
      var onFocus2 = _this.props.onFocus;
      if (onFocus2) {
        onFocus2(event);
      }
    });
    _defineProperty$1(_this, "onBlur", function(event) {
      var onBlur = _this.props.onBlur;
      _this._onBlur();
      if (onBlur) {
        onBlur(event);
      }
    });
    _defineProperty$1(_this, "onCountryFocus", function(event) {
      _this._onFocus();
      var countrySelectProps = _this.props.countrySelectProps;
      if (countrySelectProps) {
        var onFocus2 = countrySelectProps.onFocus;
        if (onFocus2) {
          onFocus2(event);
        }
      }
    });
    _defineProperty$1(_this, "onCountryBlur", function(event) {
      _this._onBlur();
      var countrySelectProps = _this.props.countrySelectProps;
      if (countrySelectProps) {
        var onBlur = countrySelectProps.onBlur;
        if (onBlur) {
          onBlur(event);
        }
      }
    });
    _this.inputRef = /* @__PURE__ */ U.createRef();
    var _this$props3 = _this.props, _value = _this$props3.value;
    _this$props3.labels;
    var _international = _this$props3.international, _addInternationalOption = _this$props3.addInternationalOption, displayInitialValueAsLocalNumber = _this$props3.displayInitialValueAsLocalNumber, initialValueFormat = _this$props3.initialValueFormat, _metadata = _this$props3.metadata;
    var _this$props4 = _this.props, _defaultCountry = _this$props4.defaultCountry, _countries = _this$props4.countries;
    if (_defaultCountry) {
      if (!_this.isCountrySupportedWithError(_defaultCountry)) {
        _defaultCountry = void 0;
      }
    }
    if (_value) {
      validateE164Number(_value);
    }
    _countries = getSupportedCountries(_countries, _metadata);
    var phoneNumber = parsePhoneNumber(_value, _metadata);
    _this.CountryIcon = createCountryIconComponent(_this.props);
    var preSelectedCountry = getPreSelectedCountry({
      value: _value,
      phoneNumber,
      defaultCountry: _defaultCountry,
      required: !_addInternationalOption,
      countries: _countries || getCountries(_metadata),
      getAnyCountry: function getAnyCountry() {
        return _this.getFirstSupportedCountry({
          countries: _countries
        });
      },
      metadata: _metadata
    });
    _this.state = {
      // Workaround for `this.props` inside `getDerivedStateFromProps()`.
      props: _this.props,
      // The country selected.
      country: preSelectedCountry,
      // `countries` are stored in `this.state` because they're filtered.
      // For example, a developer might theoretically pass some unsupported
      // countries as part of the `countries` property, and because of that
      // the component uses `this.state.countries` (which are filtered)
      // instead of `this.props.countries`
      // (which could potentially contain unsupported countries).
      countries: _countries,
      // `phoneDigits` state property holds non-formatted user's input.
      // The reason is that there's no way of finding out
      // in which form should `value` be displayed: international or national.
      // E.g. if `value` is `+78005553535` then it could be input
      // by a user both as `8 (800) 555-35-35` and `+7 800 555 35 35`.
      // Hence storing just `value` is not sufficient for correct formatting.
      // E.g. if a user entered `8 (800) 555-35-35`
      // then value is `+78005553535` and `phoneDigits` are `88005553535`
      // and if a user entered `+7 800 555 35 35`
      // then value is `+78005553535` and `phoneDigits` are `+78005553535`.
      phoneDigits: getInitialPhoneDigits({
        value: _value,
        phoneNumber,
        defaultCountry: _defaultCountry,
        international: _international,
        useNationalFormat: displayInitialValueAsLocalNumber || initialValueFormat === "national",
        metadata: _metadata
      }),
      // `value` property is duplicated in state.
      // The reason is that `getDerivedStateFromProps()`
      // needs this `value` to compare to the new `value` property
      // to find out if `phoneDigits` needs updating:
      // If the `value` property was changed externally
      // then it won't be equal to `state.value`
      // in which case `phoneDigits` and `country` should be updated.
      value: _value
    };
    return _this;
  }
  _inherits(PhoneNumberInput_2, _React$PureComponent);
  return _createClass(PhoneNumberInput_2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var onCountryChange = this.props.onCountryChange;
      var defaultCountry = this.props.defaultCountry;
      var selectedCountry = this.state.country;
      if (onCountryChange) {
        if (defaultCountry) {
          if (!this.isCountrySupportedWithError(defaultCountry)) {
            defaultCountry = void 0;
          }
        }
        if (selectedCountry !== defaultCountry) {
          onCountryChange(selectedCountry);
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var onCountryChange = this.props.onCountryChange;
      var country = this.state.country;
      if (onCountryChange && country !== prevState.country) {
        onCountryChange(country);
      }
    }
  }, {
    key: "getCountrySelectOptions",
    value: function getCountrySelectOptions$1(_ref) {
      var countries = _ref.countries;
      var _this$props5 = this.props, international = _this$props5.international, countryCallingCodeEditable = _this$props5.countryCallingCodeEditable, countryOptionsOrder = _this$props5.countryOptionsOrder, addInternationalOption = _this$props5.addInternationalOption, labels2 = _this$props5.labels, locales = _this$props5.locales, metadata2 = _this$props5.metadata;
      return this.useMemoCountrySelectOptions(function() {
        return sortCountryOptions(getCountrySelectOptions({
          countries: countries || getCountries(metadata2),
          countryNames: labels2,
          addInternationalOption: international && countryCallingCodeEditable === false ? false : addInternationalOption,
          compareStringsLocales: locales
          // compareStrings
        }), getSupportedCountryOptions(countryOptionsOrder, metadata2));
      }, [countries, countryOptionsOrder, addInternationalOption, labels2, metadata2]);
    }
  }, {
    key: "useMemoCountrySelectOptions",
    value: function useMemoCountrySelectOptions(generator, dependencies) {
      if (!this.countrySelectOptionsMemoDependencies || !areEqualArrays(dependencies, this.countrySelectOptionsMemoDependencies)) {
        this.countrySelectOptionsMemo = generator();
        this.countrySelectOptionsMemoDependencies = dependencies;
      }
      return this.countrySelectOptionsMemo;
    }
  }, {
    key: "getFirstSupportedCountry",
    value: function getFirstSupportedCountry(_ref2) {
      var countries = _ref2.countries;
      var countryOptions = this.getCountrySelectOptions({
        countries
      });
      return countryOptions[0].value;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props, name = _this$props6.name, disabled = _this$props6.disabled, readOnly = _this$props6.readOnly, autoComplete = _this$props6.autoComplete, style = _this$props6.style, className2 = _this$props6.className;
      _this$props6.inputRef;
      var inputComponent = _this$props6.inputComponent, numberInputProps = _this$props6.numberInputProps, smartCaret = _this$props6.smartCaret, CountrySelectComponent = _this$props6.countrySelectComponent, countrySelectProps = _this$props6.countrySelectProps, ContainerComponent = _this$props6.containerComponent, containerComponentProps = _this$props6.containerComponentProps;
      _this$props6.defaultCountry;
      _this$props6.countries;
      _this$props6.countryOptionsOrder;
      var labels2 = _this$props6.labels;
      _this$props6.flags;
      _this$props6.flagComponent;
      _this$props6.flagUrl;
      _this$props6.addInternationalOption;
      _this$props6.internationalIcon;
      _this$props6.displayInitialValueAsLocalNumber;
      _this$props6.initialValueFormat;
      _this$props6.onCountryChange;
      _this$props6.limitMaxLength;
      _this$props6.countryCallingCodeEditable;
      _this$props6.focusInputOnCountrySelection;
      _this$props6.reset;
      var metadata2 = _this$props6.metadata, international = _this$props6.international;
      _this$props6.locales;
      var rest = _objectWithoutProperties$2(_this$props6, _excluded$3);
      var _this$state3 = this.state, country = _this$state3.country, countries = _this$state3.countries, phoneDigits = _this$state3.phoneDigits, isFocused = _this$state3.isFocused;
      var InputComponent = smartCaret ? InputSmart : InputBasic;
      var countrySelectOptions = this.getCountrySelectOptions({
        countries
      });
      return /* @__PURE__ */ U.createElement(ContainerComponent, _extends$1({
        style,
        className: classNames(className2, "PhoneInput", {
          "PhoneInput--focus": isFocused,
          "PhoneInput--disabled": disabled,
          "PhoneInput--readOnly": readOnly
        })
      }, containerComponentProps), /* @__PURE__ */ U.createElement(CountrySelectComponent, _extends$1({
        name: name ? "".concat(name, "Country") : void 0,
        "aria-label": labels2.country
      }, countrySelectProps, {
        value: country,
        options: countrySelectOptions,
        onChange: this.onCountryChange,
        onFocus: this.onCountryFocus,
        onBlur: this.onCountryBlur,
        disabled: disabled || countrySelectProps && countrySelectProps.disabled,
        readOnly: readOnly || countrySelectProps && countrySelectProps.readOnly,
        iconComponent: this.CountryIcon
      })), /* @__PURE__ */ U.createElement(InputComponent, _extends$1({
        ref: this.setInputRef,
        type: "tel",
        autoComplete
      }, numberInputProps, rest, {
        inputFormat: international === true ? "INTERNATIONAL" : international === false ? "NATIONAL" : "INTERNATIONAL_OR_NATIONAL",
        international: international ? true : void 0,
        withCountryCallingCode: international ? true : void 0,
        name,
        metadata: metadata2,
        country,
        value: phoneDigits || "",
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        disabled,
        readOnly,
        inputComponent,
        className: classNames("PhoneInputInput", numberInputProps && numberInputProps.className, rest.className)
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: (
      // `state` holds previous props as `props`, and also:
      // * `country` — The currently selected country, e.g. `"RU"`.
      // * `value` — The currently entered phone number (E.164), e.g. `+78005553535`.
      // * `phoneDigits` — The parsed `<input/>` value, e.g. `8005553535`.
      // (and a couple of other less significant properties)
      function getDerivedStateFromProps(props, state) {
        return _objectSpread$g({
          // Emulate `prevProps` via `state.props`.
          props
        }, getPhoneInputWithCountryStateUpdateFromNewProps(props, state.props, state));
      }
    )
  }]);
}(U.PureComponent);
var PhoneNumberInput$1 = /* @__PURE__ */ U.forwardRef(function(props, ref) {
  return /* @__PURE__ */ U.createElement(PhoneNumberInput_, _extends$1({}, withDefaultProps(props), {
    inputRef: ref
  }));
});
PhoneNumberInput$1.propTypes = {
  /**
   * Phone number in `E.164` format.
   *
   * Example:
   *
   * `"+12223333333"`
   *
   * Any "falsy" value like `undefined`, `null` or an empty string `""` is treated like "empty".
   */
  value: PropTypes.string,
  /**
   * A function of `value: string?`.
   *
   * Updates the `value` property as the user inputs a phone number.
   *
   * If the user erases the input value, the argument is `undefined`.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Toggles the `--focus` CSS class.
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * `onBlur` is usually passed by `redux-form`.
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Set to `true` to mark both the phone number `<input/>`
   * and the country `<select/>` as `disabled`.
   */
  disabled: PropTypes.bool,
  /**
   * Set to `true` to mark both the phone number `<input/>`
   * and the country `<select/>` as `readonly`.
   */
  readOnly: PropTypes.bool,
  /**
   * Sets `autoComplete` property for phone number `<input/>`.
   *
   * Web browser's "autocomplete" feature
   * remembers the phone number being input
   * and can also autofill the `<input/>`
   * with previously remembered phone numbers.
   *
   * https://developers.google.com
   * /web/updates/2015/06/checkout-faster-with-autofill
   *
   * For example, can be used to turn it off:
   *
   * "So when should you use `autocomplete="off"`?
   *  One example is when you've implemented your own version
   *  of autocomplete for search. Another example is any form field
   *  where users will input and submit different kinds of information
   *  where it would not be useful to have the browser remember
   *  what was submitted previously".
   */
  // (is `"tel"` by default)
  autoComplete: PropTypes.string,
  /**
   * Set to `"national"` to show the initial `value` in
   * "national" format rather than "international".
   *
   * For example, if `initialValueFormat` is `"national"`
   * and the initial `value="+12133734253"` is passed
   * then the `<input/>` value will be `"(213) 373-4253"`.
   *
   * By default, `initialValueFormat` is `undefined`,
   * meaning that if the initial `value="+12133734253"` is passed
   * then the `<input/>` value will be `"+1 213 373 4253"`.
   *
   * The reason for such default behaviour is that
   * the newer generation grows up when there are no stationary phones
   * and therefore everyone inputs phone numbers in international format
   * in their smartphones so people gradually get more accustomed to
   * writing phone numbers in international format rather than in local format.
   * Future people won't be using "national" format, only "international".
   */
  // (is `undefined` by default)
  initialValueFormat: PropTypes.oneOf(["national"]),
  // `displayInitialValueAsLocalNumber` property has been
  // superceded by `initialValueFormat` property.
  displayInitialValueAsLocalNumber: PropTypes.bool,
  /**
   * The country to be selected by default.
   * For example, can be set after a GeoIP lookup.
   *
   * Example: `"US"`.
   */
  // A two-letter country code ("ISO 3166-1 alpha-2").
  defaultCountry: PropTypes.string,
  /**
   * If specified, only these countries will be available for selection.
   *
   * Example:
   *
   * `["RU", "UA", "KZ"]`
   */
  countries: PropTypes.arrayOf(PropTypes.string),
  /**
   * Custom country `<select/>` option names.
   * Also some labels like "ext" and country `<select/>` `aria-label`.
   *
   * Example:
   *
   * `{ "ZZ": "Международный", RU: "Россия", US: "США", ... }`
   *
   * See the `locales` directory for examples.
   */
  labels,
  /**
   * Country `<select/>` options are sorted by their labels.
   * The default sorting function uses `a.localeCompare(b, locales)`,
   * and, if that's not available, falls back to simple `a > b` / `a < b`.
   * Some languages, like Chinese, support multiple sorting variants
   * (called "collations"), and the user might prefer one or another.
   * Also, sometimes the Operating System language is not always
   * the preferred language for a person using a website or an application,
   * so there should be a way to specify custom locale.
   * This `locales` property mimicks the `locales` argument of `Intl` constructors,
   * and can be either a Unicode BCP 47 locale identifier or an array of such locale identifiers.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
   */
  locales: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /*
   * Custom country `<select/>` options sorting function.
   * The default one uses `a.localeCompare(b)`, and,
   * if that's not available, falls back to simple `a > b`/`a < b`.
   * There have been requests to add custom sorter for cases
   * like Chinese language and "pinyin" (non-default) sorting order.
   * https://stackoverflow.com/questions/22907288/chinese-sorting-by-pinyin-in-javascript-with-localecompare
  compareStrings: PropTypes.func,
   */
  /**
   * A URL template of a country flag, where
   * "{XX}" is a two-letter country code in upper case,
   * or where "{xx}" is a two-letter country code in lower case.
   * By default it points to `country-flag-icons` gitlab pages website.
   * I imagine someone might want to download those country flag icons
   * and host them on their own servers instead
   * (all flags are available in the `country-flag-icons` library).
   * There's a catch though: new countries may be added in future,
   * so when hosting country flag icons on your own server
   * one should check the `CHANGELOG.md` every time before updating this library,
   * otherwise there's a possibility that some new country flag would be missing.
   */
  flagUrl: PropTypes.string,
  /**
   * Custom country flag icon components.
   * These flags will be used instead of the default ones.
   * The the "Flags" section of the readme for more info.
   *
   * The shape is an object where keys are country codes
   * and values are flag icon components.
   * Flag icon components receive the same properties
   * as `flagComponent` (see below).
   *
   * Example:
   *
   * `{ "RU": (props) => <img src="..."/> }`
   *
   * Example:
   *
   * `import flags from 'country-flag-icons/react/3x2'`
   *
   * `import PhoneInput from 'react-phone-number-input'`
   *
   * `<PhoneInput flags={flags} .../>`
   */
  flags: PropTypes.objectOf(PropTypes.elementType),
  /**
   * Country flag icon component.
   *
   * Takes properties:
   *
   * * `country: string` — The country code.
   * * `countryName: string` — The country name.
   * * `flagUrl: string` — The `flagUrl` property (see above).
   * * `flags: object` — The `flags` property (see above).
   */
  flagComponent: PropTypes.elementType,
  /**
   * Set to `false` to remove the "International" option from country `<select/>`.
   */
  addInternationalOption: PropTypes.bool,
  /**
   * "International" icon component.
   * Should have the same aspect ratio.
   *
   * Receives properties:
   *
   * * `title: string` — "International" country option label.
   */
  internationalIcon: PropTypes.elementType,
  /**
   * Can be used to place some countries on top of the list of country `<select/>` options.
   *
   * * `"XX"` — inserts an option for "XX" country.
   * * `"🌐"` — inserts "International" option.
   * * `"|"` — inserts a separator.
   * * `"..."` — inserts options for the rest of the countries (can be omitted, in which case it will be automatically added at the end).
   *
   * Example:
   *
   * `["US", "CA", "AU", "|", "..."]`
   */
  countryOptionsOrder: PropTypes.arrayOf(PropTypes.string),
  /**
   * `<Phone/>` component CSS style object.
   */
  style: PropTypes.object,
  /**
   * `<Phone/>` component CSS class.
   */
  className: PropTypes.string,
  /**
   * Country `<select/>` component.
   *
   * Receives properties:
   *
   * * `name: string?` — HTML `name` attribute.
   * * `value: string?` — The currently selected country code.
   * * `onChange(value: string?)` — Updates the `value`.
   * * `onFocus()` — Is used to toggle the `--focus` CSS class.
   * * `onBlur()` — Is used to toggle the `--focus` CSS class.
   * * `options: object[]` — The list of all selectable countries (including "International") each being an object of shape `{ value: string?, label: string }`.
   * * `iconComponent: PropTypes.elementType` — React component that renders a country icon: `<Icon country={value}/>`. If `country` is `undefined` then it renders an "International" icon.
   * * `disabled: boolean?` — HTML `disabled` attribute.
   * * `readOnly: boolean?` — HTML `readOnly` attribute.
   * * `tabIndex: (number|string)?` — HTML `tabIndex` attribute.
   * * `className: string` — CSS class name.
   */
  countrySelectComponent: PropTypes.elementType,
  /**
   * Country `<select/>` component props.
   * Along with the usual DOM properties such as `aria-label` and `tabIndex`,
   * some custom properties are supported, such as `arrowComponent` and `unicodeFlags`.
   */
  countrySelectProps: PropTypes.object,
  /**
   * Phone number `<input/>` component.
   *
   * Receives properties:
   *
   * * `value: string` — The formatted `value`.
   * * `onChange(event: Event)` — Updates the formatted `value` from `event.target.value`.
   * * `onFocus()` — Is used to toggle the `--focus` CSS class.
   * * `onBlur()` — Is used to toggle the `--focus` CSS class.
   * * Other properties like `type="tel"` or `autoComplete="tel"` that should be passed through to the DOM `<input/>`.
   *
   * Must also either use `React.forwardRef()` to "forward" `ref` to the `<input/>` or implement `.focus()` method.
   */
  inputComponent: PropTypes.elementType,
  /**
   * Phone number `<input/>` component props.
   */
  numberInputProps: PropTypes.object,
  /**
   * Wrapping `<div/>` component.
   *
   * Receives properties:
   *
   * * `style: object` — A component CSS style object.
   * * `className: string` — Classes to attach to the component, typically changes when component focuses or blurs.
   */
  containerComponent: PropTypes.elementType,
  /**
   * Wrapping `<div/>` component props.
   */
  containerComponentProps: PropTypes.object,
  /**
   * When the user attempts to insert a digit somewhere in the middle of a phone number,
   * the caret position is moved right before the next available digit skipping
   * any punctuation in between. This is called "smart" caret positioning.
   * Another case would be the phone number format changing as a result of
   * the user inserting the digit somewhere in the middle, which would require
   * re-positioning the caret because all digit positions have changed.
   * This "smart" caret positioning feature can be turned off by passing
   * `smartCaret={false}` property: use it in case of any possible issues
   * with caret position during phone number input.
   */
  // Is `true` by default.
  smartCaret: PropTypes.bool,
  /**
   * Set to `true` to force "international" phone number format.
   * Set to `false` to force "national" phone number format.
   * By default it's `undefined` meaning that it doesn't enforce any phone number format:
   * the user can input their phone number in either "national" or "international" format.
   */
  international: PropTypes.bool,
  /**
   * If set to `true`, the phone number input will get trimmed
   * if it exceeds the maximum length for the country.
   */
  limitMaxLength: PropTypes.bool,
  /**
   * If set to `false`, and `international` is `true`, then
   * users won't be able to erase the "country calling part"
   * of a phone number in the `<input/>`.
   */
  countryCallingCodeEditable: PropTypes.bool,
  /**
   * `libphonenumber-js` metadata.
   *
   * Can be used to pass custom `libphonenumber-js` metadata
   * to reduce the overall bundle size for those who compile "custom" metadata.
   */
  metadata,
  /**
   * Is called every time the selected country changes:
   * either programmatically or when user selects it manually from the list.
   */
  // People have been asking for a way to get the selected country.
  // @see  https://github.com/catamphetamine/react-phone-number-input/issues/128
  // For some it's just a "business requirement".
  // I guess it's about gathering as much info on the user as a website can
  // without introducing any addional fields that would complicate the form
  // therefore reducing "conversion" (that's a marketing term).
  // Assuming that the phone number's country is the user's country
  // is not 100% correct but in most cases I guess it's valid.
  onCountryChange: PropTypes.func,
  /**
   * If set to `false`, will not focus the `<input/>` component
   * when the user selects a country from the list of countries.
   * This can be used to conform to the Web Content Accessibility Guidelines (WCAG).
   * Quote:
   * "On input: Changing the setting of any user interface component
   *  does not automatically cause a change of context unless the user
   *  has been advised of the behaviour before using the component."
   */
  focusInputOnCountrySelection: PropTypes.bool
};
var defaultProps = {
  /**
   * Remember (and autofill) the value as a phone number.
   */
  autoComplete: "tel",
  /**
   * Country `<select/>` component.
   */
  countrySelectComponent: CountrySelectWithIcon,
  /**
   * Flag icon component.
   */
  flagComponent: FlagComponent,
  /**
   * By default, uses icons from `country-flag-icons` gitlab pages website.
   */
  // Must be equal to `flagUrl` in `./CountryIcon.js`.
  flagUrl: "https://purecatamphetamine.github.io/country-flag-icons/3x2/{XX}.svg",
  /**
   * Default "International" country `<select/>` option icon.
   */
  internationalIcon: InternationalIcon,
  /**
   * Phone number `<input/>` component.
   */
  inputComponent: "input",
  /**
   * Wrapping `<div/>` component.
   */
  containerComponent: "div",
  /**
   * Some users requested a way to reset the component:
   * both number `<input/>` and country `<select/>`.
   * Whenever `reset` property changes both number `<input/>`
   * and country `<select/>` are reset.
   * It's not implemented as some instance `.reset()` method
   * because `ref` is forwarded to `<input/>`.
   * It's also not replaced with just resetting `country` on
   * external `value` reset, because a user could select a country
   * and then not input any `value`, and so the selected country
   * would be "stuck", if not using this `reset` property.
   */
  // https://github.com/catamphetamine/react-phone-number-input/issues/300
  reset: PropTypes.any,
  /**
   *
   */
  /**
   * Set to `false` to use "basic" caret instead of the "smart" one.
   */
  smartCaret: true,
  /**
   * Whether to add the "International" option
   * to the list of countries.
   */
  addInternationalOption: true,
  /**
   * If set to `false`, and `international` is `true`, then
   * users won't be able to erase the "country calling part"
   * of a phone number in the `<input/>`.
   */
  countryCallingCodeEditable: true,
  /**
   * If set to `false`, will not focus the `<input/>` component
   * when the user selects a country from the list of countries.
   * This can be used to conform to the Web Content Accessibility Guidelines (WCAG).
   * Quote:
   * "On input: Changing the setting of any user interface component
   *  does not automatically cause a change of context unless the user
   *  has been advised of the behaviour before using the component."
   */
  focusInputOnCountrySelection: true
};
function withDefaultProps(props) {
  props = _objectSpread$g({}, props);
  for (var key in defaultProps) {
    if (props[key] === void 0) {
      props[key] = defaultProps[key];
    }
  }
  return props;
}
function areEqualArrays(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  var i = 0;
  while (i < a.length) {
    if (a[i] !== b[i]) {
      return false;
    }
    i++;
  }
  return true;
}
const defaultLabels = {
  "ext": "ext.",
  "country": "Phone number country",
  "phone": "Phone",
  "AB": "Abkhazia",
  "AC": "Ascension Island",
  "AD": "Andorra",
  "AE": "United Arab Emirates",
  "AF": "Afghanistan",
  "AG": "Antigua and Barbuda",
  "AI": "Anguilla",
  "AL": "Albania",
  "AM": "Armenia",
  "AO": "Angola",
  "AQ": "Antarctica",
  "AR": "Argentina",
  "AS": "American Samoa",
  "AT": "Austria",
  "AU": "Australia",
  "AW": "Aruba",
  "AX": "Åland Islands",
  "AZ": "Azerbaijan",
  "BA": "Bosnia and Herzegovina",
  "BB": "Barbados",
  "BD": "Bangladesh",
  "BE": "Belgium",
  "BF": "Burkina Faso",
  "BG": "Bulgaria",
  "BH": "Bahrain",
  "BI": "Burundi",
  "BJ": "Benin",
  "BL": "Saint Barthélemy",
  "BM": "Bermuda",
  "BN": "Brunei Darussalam",
  "BO": "Bolivia",
  "BQ": "Bonaire, Sint Eustatius and Saba",
  "BR": "Brazil",
  "BS": "Bahamas",
  "BT": "Bhutan",
  "BV": "Bouvet Island",
  "BW": "Botswana",
  "BY": "Belarus",
  "BZ": "Belize",
  "CA": "Canada",
  "CC": "Cocos (Keeling) Islands",
  "CD": "Congo, Democratic Republic of the",
  "CF": "Central African Republic",
  "CG": "Congo",
  "CH": "Switzerland",
  "CI": "Cote d'Ivoire",
  "CK": "Cook Islands",
  "CL": "Chile",
  "CM": "Cameroon",
  "CN": "China",
  "CO": "Colombia",
  "CR": "Costa Rica",
  "CU": "Cuba",
  "CV": "Cape Verde",
  "CW": "Curaçao",
  "CX": "Christmas Island",
  "CY": "Cyprus",
  "CZ": "Czech Republic",
  "DE": "Germany",
  "DJ": "Djibouti",
  "DK": "Denmark",
  "DM": "Dominica",
  "DO": "Dominican Republic",
  "DZ": "Algeria",
  "EC": "Ecuador",
  "EE": "Estonia",
  "EG": "Egypt",
  "EH": "Western Sahara",
  "ER": "Eritrea",
  "ES": "Spain",
  "ET": "Ethiopia",
  "FI": "Finland",
  "FJ": "Fiji",
  "FK": "Falkland Islands",
  "FM": "Federated States of Micronesia",
  "FO": "Faroe Islands",
  "FR": "France",
  "GA": "Gabon",
  "GB": "United Kingdom",
  "GD": "Grenada",
  "GE": "Georgia",
  "GF": "French Guiana",
  "GG": "Guernsey",
  "GH": "Ghana",
  "GI": "Gibraltar",
  "GL": "Greenland",
  "GM": "Gambia",
  "GN": "Guinea",
  "GP": "Guadeloupe",
  "GQ": "Equatorial Guinea",
  "GR": "Greece",
  "GS": "South Georgia and the South Sandwich Islands",
  "GT": "Guatemala",
  "GU": "Guam",
  "GW": "Guinea-Bissau",
  "GY": "Guyana",
  "HK": "Hong Kong",
  "HM": "Heard Island and McDonald Islands",
  "HN": "Honduras",
  "HR": "Croatia",
  "HT": "Haiti",
  "HU": "Hungary",
  "ID": "Indonesia",
  "IE": "Ireland",
  "IL": "Israel",
  "IM": "Isle of Man",
  "IN": "India",
  "IO": "British Indian Ocean Territory",
  "IQ": "Iraq",
  "IR": "Iran",
  "IS": "Iceland",
  "IT": "Italy",
  "JE": "Jersey",
  "JM": "Jamaica",
  "JO": "Jordan",
  "JP": "Japan",
  "KE": "Kenya",
  "KG": "Kyrgyzstan",
  "KH": "Cambodia",
  "KI": "Kiribati",
  "KM": "Comoros",
  "KN": "Saint Kitts and Nevis",
  "KP": "North Korea",
  "KR": "South Korea",
  "KW": "Kuwait",
  "KY": "Cayman Islands",
  "KZ": "Kazakhstan",
  "LA": "Laos",
  "LB": "Lebanon",
  "LC": "Saint Lucia",
  "LI": "Liechtenstein",
  "LK": "Sri Lanka",
  "LR": "Liberia",
  "LS": "Lesotho",
  "LT": "Lithuania",
  "LU": "Luxembourg",
  "LV": "Latvia",
  "LY": "Libya",
  "MA": "Morocco",
  "MC": "Monaco",
  "MD": "Moldova",
  "ME": "Montenegro",
  "MF": "Saint Martin (French Part)",
  "MG": "Madagascar",
  "MH": "Marshall Islands",
  "MK": "North Macedonia",
  "ML": "Mali",
  "MM": "Myanmar",
  "MN": "Mongolia",
  "MO": "Macao",
  "MP": "Northern Mariana Islands",
  "MQ": "Martinique",
  "MR": "Mauritania",
  "MS": "Montserrat",
  "MT": "Malta",
  "MU": "Mauritius",
  "MV": "Maldives",
  "MW": "Malawi",
  "MX": "Mexico",
  "MY": "Malaysia",
  "MZ": "Mozambique",
  "NA": "Namibia",
  "NC": "New Caledonia",
  "NE": "Niger",
  "NF": "Norfolk Island",
  "NG": "Nigeria",
  "NI": "Nicaragua",
  "NL": "Netherlands",
  "NO": "Norway",
  "NP": "Nepal",
  "NR": "Nauru",
  "NU": "Niue",
  "NZ": "New Zealand",
  "OM": "Oman",
  "OS": "South Ossetia",
  "PA": "Panama",
  "PE": "Peru",
  "PF": "French Polynesia",
  "PG": "Papua New Guinea",
  "PH": "Philippines",
  "PK": "Pakistan",
  "PL": "Poland",
  "PM": "Saint Pierre and Miquelon",
  "PN": "Pitcairn",
  "PR": "Puerto Rico",
  "PS": "Palestine",
  "PT": "Portugal",
  "PW": "Palau",
  "PY": "Paraguay",
  "QA": "Qatar",
  "RE": "Reunion",
  "RO": "Romania",
  "RS": "Serbia",
  "RU": "Russia",
  "RW": "Rwanda",
  "SA": "Saudi Arabia",
  "SB": "Solomon Islands",
  "SC": "Seychelles",
  "SD": "Sudan",
  "SE": "Sweden",
  "SG": "Singapore",
  "SH": "Saint Helena",
  "SI": "Slovenia",
  "SJ": "Svalbard and Jan Mayen",
  "SK": "Slovakia",
  "SL": "Sierra Leone",
  "SM": "San Marino",
  "SN": "Senegal",
  "SO": "Somalia",
  "SR": "Suriname",
  "SS": "South Sudan",
  "ST": "Sao Tome and Principe",
  "SV": "El Salvador",
  "SX": "Sint Maarten",
  "SY": "Syria",
  "SZ": "Swaziland",
  "TA": "Tristan da Cunha",
  "TC": "Turks and Caicos Islands",
  "TD": "Chad",
  "TF": "French Southern Territories",
  "TG": "Togo",
  "TH": "Thailand",
  "TJ": "Tajikistan",
  "TK": "Tokelau",
  "TL": "Timor-Leste",
  "TM": "Turkmenistan",
  "TN": "Tunisia",
  "TO": "Tonga",
  "TR": "Turkey",
  "TT": "Trinidad and Tobago",
  "TV": "Tuvalu",
  "TW": "Taiwan",
  "TZ": "Tanzania",
  "UA": "Ukraine",
  "UG": "Uganda",
  "UM": "United States Minor Outlying Islands",
  "US": "United States",
  "UY": "Uruguay",
  "UZ": "Uzbekistan",
  "VA": "Holy See (Vatican City State)",
  "VC": "Saint Vincent and the Grenadines",
  "VE": "Venezuela",
  "VG": "Virgin Islands, British",
  "VI": "Virgin Islands, U.S.",
  "VN": "Vietnam",
  "VU": "Vanuatu",
  "WF": "Wallis and Futuna",
  "WS": "Samoa",
  "XK": "Kosovo",
  "YE": "Yemen",
  "YT": "Mayotte",
  "ZA": "South Africa",
  "ZM": "Zambia",
  "ZW": "Zimbabwe",
  "ZZ": "International"
};
var _excluded$2 = ["metadata", "labels"];
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
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
function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
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
function createPhoneInput(defaultMetadata) {
  var PhoneInputDefault = /* @__PURE__ */ U.forwardRef(function(_ref, ref) {
    var _ref$metadata = _ref.metadata, metadata2 = _ref$metadata === void 0 ? defaultMetadata : _ref$metadata, _ref$labels = _ref.labels, labels2 = _ref$labels === void 0 ? defaultLabels : _ref$labels, rest = _objectWithoutProperties$1(_ref, _excluded$2);
    return /* @__PURE__ */ U.createElement(PhoneNumberInput$1, _extends({}, rest, {
      ref,
      metadata: metadata2,
      labels: labels2
    }));
  });
  PhoneInputDefault.propTypes = {
    metadata,
    labels
  };
  return PhoneInputDefault;
}
createPhoneInput();
const PhoneInput = createPhoneInput(metadata$1);
const PhoneNumberInput = ({ ...props }) => {
  const [value, setValue] = reactExports.useState();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PhoneInput,
    {
      onChange: setValue,
      countries: ["US"],
      addInternationalOption: false,
      limitMaxLength: true,
      className: "form-control",
      country: "US",
      style: {},
      defaultCountry: "US",
      placeholder: "Enter phone number",
      value,
      ...props
    }
  );
};
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function getDefaultExportFromCjs$1(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var invariant_1;
var hasRequiredInvariant;
function requireInvariant() {
  if (hasRequiredInvariant) return invariant_1;
  hasRequiredInvariant = 1;
  var NODE_ENV = process.env.NODE_ENV;
  var invariant2 = function invariant3(condition, format2, a, b, c, d, e, f) {
    if (NODE_ENV !== "production") {
      if (format2 === void 0) {
        throw new Error("invariant requires an error message argument");
      }
    }
    if (!condition) {
      var error;
      if (format2 === void 0) {
        error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(format2.replace(/%s/g, function() {
          return args[argIndex++];
        }));
        error.name = "Invariant Violation";
      }
      error.framesToPop = 1;
      throw error;
    }
  };
  invariant_1 = invariant2;
  return invariant_1;
}
var invariantExports = requireInvariant();
var invariant = /* @__PURE__ */ getDefaultExportFromCjs$1(invariantExports);
var MapContext = reactExports.createContext(null);
function useGoogleMap() {
  invariant(!!reactExports.useContext, "useGoogleMap is React hook and requires React version 16.8+");
  var map = reactExports.useContext(MapContext);
  invariant(!!map, "useGoogleMap needs a GoogleMap available up in the tree");
  return map;
}
function reduce(obj, fn, acc) {
  return Object.keys(obj).reduce(function reducer(newAcc, key) {
    return fn(newAcc, obj[key], key);
  }, acc);
}
function forEach(obj, fn) {
  Object.keys(obj).forEach((key) => {
    return fn(obj[key], key);
  });
}
function applyUpdaterToNextProps(updaterMap2, prevProps, nextProps, instance) {
  var map = {};
  var iter = (fn, key) => {
    var nextValue = nextProps[key];
    if (nextValue !== prevProps[key]) {
      map[key] = nextValue;
      fn(instance, nextValue);
    }
  };
  forEach(updaterMap2, iter);
  return map;
}
function registerEvents(props, instance, eventMap2) {
  var registeredList = reduce(eventMap2, function reducer(acc, googleEventName, onEventName) {
    if (typeof props[onEventName] === "function") {
      acc.push(google.maps.event.addListener(instance, googleEventName, props[onEventName]));
    }
    return acc;
  }, []);
  return registeredList;
}
function unregisterEvent(registered) {
  google.maps.event.removeListener(registered);
}
function unregisterEvents() {
  var events = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  events.forEach(unregisterEvent);
}
function applyUpdatersToPropsAndRegisterEvents(_ref) {
  var {
    updaterMap: updaterMap2,
    eventMap: eventMap2,
    prevProps,
    nextProps,
    instance
  } = _ref;
  var registeredEvents = registerEvents(nextProps, instance, eventMap2);
  applyUpdaterToNextProps(updaterMap2, prevProps, nextProps, instance);
  return registeredEvents;
}
var eventMap$i = {
  onDblClick: "dblclick",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMapTypeIdChanged: "maptypeid_changed",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseDown: "mousedown",
  onMouseUp: "mouseup",
  onRightClick: "rightclick",
  onTilesLoaded: "tilesloaded",
  onBoundsChanged: "bounds_changed",
  onCenterChanged: "center_changed",
  onClick: "click",
  onDrag: "drag",
  onHeadingChanged: "heading_changed",
  onIdle: "idle",
  onProjectionChanged: "projection_changed",
  onResize: "resize",
  onTiltChanged: "tilt_changed",
  onZoomChanged: "zoom_changed"
};
var updaterMap$i = {
  extraMapTypes(map, extra) {
    extra.forEach(function forEachExtra(it, i) {
      map.mapTypes.set(String(i), it);
    });
  },
  center(map, center2) {
    map.setCenter(center2);
  },
  clickableIcons(map, clickable) {
    map.setClickableIcons(clickable);
  },
  heading(map, heading) {
    map.setHeading(heading);
  },
  mapTypeId(map, mapTypeId) {
    map.setMapTypeId(mapTypeId);
  },
  options(map, options) {
    map.setOptions(options);
  },
  streetView(map, streetView) {
    map.setStreetView(streetView);
  },
  tilt(map, tilt) {
    map.setTilt(tilt);
  },
  zoom(map, zoom) {
    map.setZoom(zoom);
  }
};
function GoogleMapFunctional(_ref) {
  var {
    children,
    options,
    id,
    mapContainerStyle: mapContainerStyle2,
    mapContainerClassName,
    center: center2,
    // clickableIcons,
    // extraMapTypes,
    // heading,
    // mapTypeId,
    onClick,
    onDblClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseDown,
    onMouseUp,
    onRightClick,
    // onMapTypeIdChanged,
    // onTilesLoaded,
    // onBoundsChanged,
    onCenterChanged,
    // onHeadingChanged,
    // onIdle,
    // onProjectionChanged,
    // onResize,
    // onTiltChanged,
    // onZoomChanged,
    onLoad,
    onUnmount
  } = _ref;
  var [map, setMap] = reactExports.useState(null);
  var ref = reactExports.useRef(null);
  var [centerChangedListener, setCenterChangedListener] = reactExports.useState(null);
  var [dblclickListener, setDblclickListener] = reactExports.useState(null);
  var [dragendListener, setDragendListener] = reactExports.useState(null);
  var [dragstartListener, setDragstartListener] = reactExports.useState(null);
  var [mousedownListener, setMousedownListener] = reactExports.useState(null);
  var [mousemoveListener, setMousemoveListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  var [mouseupListener, setMouseupListener] = reactExports.useState(null);
  var [rightclickListener, setRightclickListener] = reactExports.useState(null);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [dragListener, setDragListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (options && map !== null) {
      map.setOptions(options);
    }
  }, [map, options]);
  reactExports.useEffect(() => {
    if (map !== null && typeof center2 !== "undefined") {
      map.setCenter(center2);
    }
  }, [map, center2]);
  reactExports.useEffect(() => {
    if (map && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(map, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  reactExports.useEffect(() => {
    if (map && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(map, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  reactExports.useEffect(() => {
    if (map && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(map, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  reactExports.useEffect(() => {
    if (map && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(map, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  reactExports.useEffect(() => {
    if (map && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(map, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  reactExports.useEffect(() => {
    if (map && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(map, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (map && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(map, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (map && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(map, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  reactExports.useEffect(() => {
    if (map && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(map, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  reactExports.useEffect(() => {
    if (map && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(map, "click", onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (map && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(map, "drag", onDrag));
    }
  }, [onDrag]);
  reactExports.useEffect(() => {
    if (map && onCenterChanged) {
      if (centerChangedListener !== null) {
        google.maps.event.removeListener(centerChangedListener);
      }
      setCenterChangedListener(google.maps.event.addListener(map, "center_changed", onCenterChanged));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    var map2 = ref.current === null ? null : new google.maps.Map(ref.current, options);
    setMap(map2);
    if (map2 !== null && onLoad) {
      onLoad(map2);
    }
    return () => {
      if (map2 !== null) {
        if (onUnmount) {
          onUnmount(map2);
        }
      }
    };
  }, []);
  return jsxRuntimeExports.jsx("div", {
    id,
    ref,
    style: mapContainerStyle2,
    className: mapContainerClassName,
    children: jsxRuntimeExports.jsx(MapContext.Provider, {
      value: map,
      children: map !== null ? children : null
    })
  });
}
reactExports.memo(GoogleMapFunctional);
class GoogleMap extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      map: null
    });
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "mapRef", null);
    _defineProperty(this, "getInstance", () => {
      if (this.mapRef === null) {
        return null;
      }
      return new google.maps.Map(this.mapRef, this.props.options);
    });
    _defineProperty(this, "panTo", (latLng) => {
      var map = this.getInstance();
      if (map) {
        map.panTo(latLng);
      }
    });
    _defineProperty(this, "setMapCallback", () => {
      if (this.state.map !== null) {
        if (this.props.onLoad) {
          this.props.onLoad(this.state.map);
        }
      }
    });
    _defineProperty(this, "getRef", (ref) => {
      this.mapRef = ref;
    });
  }
  componentDidMount() {
    var map = this.getInstance();
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$i,
      eventMap: eventMap$i,
      prevProps: {},
      nextProps: this.props,
      instance: map
    });
    this.setState(function setMap() {
      return {
        map
      };
    }, this.setMapCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.map !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$i,
        eventMap: eventMap$i,
        prevProps,
        nextProps: this.props,
        instance: this.state.map
      });
    }
  }
  componentWillUnmount() {
    if (this.state.map !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.map);
      }
      unregisterEvents(this.registeredEvents);
    }
  }
  render() {
    return jsxRuntimeExports.jsx("div", {
      id: this.props.id,
      ref: this.getRef,
      style: this.props.mapContainerStyle,
      className: this.props.mapContainerClassName,
      children: jsxRuntimeExports.jsx(MapContext.Provider, {
        value: this.state.map,
        children: this.state.map !== null ? this.props.children : null
      })
    });
  }
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c), u = i.value;
  } catch (n2) {
    return void e(n2);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function() {
    var t = this, e = arguments;
    return new Promise(function(r, o) {
      var a = n.apply(t, e);
      function _next(n2) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n2);
      }
      function _throw(n2) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n2);
      }
      _next(void 0);
    });
  };
}
function makeLoadScriptUrl(_ref) {
  var {
    googleMapsApiKey,
    googleMapsClientId,
    version = "weekly",
    language,
    region,
    libraries,
    channel,
    mapIds,
    authReferrerPolicy
  } = _ref;
  var params = [];
  invariant(googleMapsApiKey && googleMapsClientId || !(googleMapsApiKey && googleMapsClientId), "You need to specify either googleMapsApiKey or googleMapsClientId for @react-google-maps/api load script to work. You cannot use both at the same time.");
  if (googleMapsApiKey) {
    params.push("key=".concat(googleMapsApiKey));
  } else if (googleMapsClientId) {
    params.push("client=".concat(googleMapsClientId));
  }
  if (version) {
    params.push("v=".concat(version));
  }
  if (language) {
    params.push("language=".concat(language));
  }
  if (region) {
    params.push("region=".concat(region));
  }
  if (libraries && libraries.length) {
    params.push("libraries=".concat(libraries.sort().join(",")));
  }
  if (channel) {
    params.push("channel=".concat(channel));
  }
  if (mapIds && mapIds.length) {
    params.push("map_ids=".concat(mapIds.join(",")));
  }
  if (authReferrerPolicy) {
    params.push("auth_referrer_policy=".concat(authReferrerPolicy));
  }
  params.push("loading=async");
  params.push("callback=initMap");
  return "https://maps.googleapis.com/maps/api/js?".concat(params.join("&"));
}
var isBrowser = typeof document !== "undefined";
function injectScript(_ref) {
  var {
    url,
    id,
    nonce
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = _ref;
  if (!isBrowser) {
    return Promise.reject(new Error("document is undefined"));
  }
  return new Promise(function injectScriptCallback(resolve, reject) {
    var existingScript = document.getElementById(id);
    var windowWithGoogleMap = window;
    if (existingScript) {
      var dataStateAttribute = existingScript.getAttribute("data-state");
      if (existingScript.src === url && dataStateAttribute !== "error") {
        if (dataStateAttribute === "ready") {
          return resolve(id);
        } else {
          var originalInitMap = windowWithGoogleMap.initMap;
          var originalErrorCallback = existingScript.onerror;
          windowWithGoogleMap.initMap = function initMap() {
            if (originalInitMap) {
              originalInitMap();
            }
            resolve(id);
          };
          existingScript.onerror = function(err) {
            if (originalErrorCallback) {
              originalErrorCallback(err);
            }
            reject(err);
          };
          return;
        }
      } else {
        existingScript.remove();
      }
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.id = id;
    script.async = true;
    script.nonce = nonce || "";
    script.onerror = function onerror(err) {
      script.setAttribute("data-state", "error");
      reject(err);
    };
    windowWithGoogleMap.initMap = function onload() {
      script.setAttribute("data-state", "ready");
      resolve(id);
    };
    document.head.appendChild(script);
  }).catch((err) => {
    console.error("injectScript error: ", err);
    throw err;
  });
}
function isGoogleFontStyle(element) {
  var href = element.href;
  if (href && (href.indexOf("https://fonts.googleapis.com/css?family=Roboto") === 0 || href.indexOf("https://fonts.googleapis.com/css?family=Google+Sans+Text") === 0)) {
    return true;
  }
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.tagName.toLowerCase() === "style" && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.styleSheet && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.styleSheet.cssText && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.styleSheet.cssText.replace("\r\n", "").indexOf(".gm-style") === 0
  ) {
    element.styleSheet.cssText = "";
    return true;
  }
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.tagName.toLowerCase() === "style" && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.innerHTML && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.innerHTML.replace("\r\n", "").indexOf(".gm-style") === 0
  ) {
    element.innerHTML = "";
    return true;
  }
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.tagName.toLowerCase() === "style" && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !element.styleSheet && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !element.innerHTML
  ) {
    return true;
  }
  return false;
}
function preventGoogleFonts() {
  var head = document.getElementsByTagName("head")[0];
  if (head) {
    var trueInsertBefore = head.insertBefore.bind(head);
    head.insertBefore = function insertBefore(newElement, referenceElement) {
      if (!isGoogleFontStyle(newElement)) {
        Reflect.apply(trueInsertBefore, head, [newElement, referenceElement]);
      }
      return newElement;
    };
    var trueAppend = head.appendChild.bind(head);
    head.appendChild = function appendChild(textNode) {
      if (!isGoogleFontStyle(textNode)) {
        Reflect.apply(trueAppend, head, [textNode]);
      }
      return textNode;
    };
  }
}
var cleaningUp = false;
function DefaultLoadingElement() {
  return jsxRuntimeExports.jsx("div", {
    children: "Loading..."
  });
}
var defaultLoadScriptProps = {
  id: "script-loader",
  version: "weekly"
};
class LoadScript extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "check", null);
    _defineProperty(this, "state", {
      loaded: false
    });
    _defineProperty(this, "cleanupCallback", () => {
      delete window.google.maps;
      this.injectScript();
    });
    _defineProperty(this, "isCleaningUp", /* @__PURE__ */ _asyncToGenerator(function* () {
      function promiseCallback(resolve) {
        if (!cleaningUp) {
          resolve();
        } else {
          if (isBrowser) {
            var timer = window.setInterval(function interval() {
              if (!cleaningUp) {
                window.clearInterval(timer);
                resolve();
              }
            }, 1);
          }
        }
        return;
      }
      return new Promise(promiseCallback);
    }));
    _defineProperty(this, "cleanup", () => {
      cleaningUp = true;
      var script = document.getElementById(this.props.id);
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      Array.prototype.slice.call(document.getElementsByTagName("script")).filter(function filter(script2) {
        return typeof script2.src === "string" && script2.src.includes("maps.googleapis");
      }).forEach(function forEach2(script2) {
        if (script2.parentNode) {
          script2.parentNode.removeChild(script2);
        }
      });
      Array.prototype.slice.call(document.getElementsByTagName("link")).filter(function filter(link) {
        return link.href === "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans";
      }).forEach(function forEach2(link) {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
      Array.prototype.slice.call(document.getElementsByTagName("style")).filter(function filter(style) {
        return style.innerText !== void 0 && style.innerText.length > 0 && style.innerText.includes(".gm-");
      }).forEach(function forEach2(style) {
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      });
    });
    _defineProperty(this, "injectScript", () => {
      if (this.props.preventGoogleFontsLoading) {
        preventGoogleFonts();
      }
      invariant(!!this.props.id, 'LoadScript requires "id" prop to be a string: %s', this.props.id);
      var injectScriptOptions = {
        id: this.props.id,
        nonce: this.props.nonce,
        url: makeLoadScriptUrl(this.props)
      };
      injectScript(injectScriptOptions).then(() => {
        if (this.props.onLoad) {
          this.props.onLoad();
        }
        this.setState(function setLoaded() {
          return {
            loaded: true
          };
        });
        return;
      }).catch((err) => {
        if (this.props.onError) {
          this.props.onError(err);
        }
        console.error("\n          There has been an Error with loading Google Maps API script, please check that you provided correct google API key (".concat(this.props.googleMapsApiKey || "-", ") or Client ID (").concat(this.props.googleMapsClientId || "-", ") to <LoadScript />\n          Otherwise it is a Network issue.\n        "));
      });
    });
    _defineProperty(this, "getRef", (el) => {
      this.check = el;
    });
  }
  componentDidMount() {
    if (isBrowser) {
      if (window.google && window.google.maps && !cleaningUp) {
        console.error("google api is already presented");
        return;
      }
      this.isCleaningUp().then(this.injectScript).catch(function error(err) {
        console.error("Error at injecting script after cleaning up: ", err);
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.libraries !== prevProps.libraries) {
      console.warn("Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables");
    }
    if (isBrowser && prevProps.language !== this.props.language) {
      this.cleanup();
      this.setState(function setLoaded() {
        return {
          loaded: false
        };
      }, this.cleanupCallback);
    }
  }
  componentWillUnmount() {
    if (isBrowser) {
      this.cleanup();
      var timeoutCallback = () => {
        if (!this.check) {
          delete window.google;
          cleaningUp = false;
        }
      };
      window.setTimeout(timeoutCallback, 1);
      if (this.props.onUnmount) {
        this.props.onUnmount();
      }
    }
  }
  render() {
    return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [jsxRuntimeExports.jsx("div", {
        ref: this.getRef
      }), this.state.loaded ? this.props.children : this.props.loadingElement || jsxRuntimeExports.jsx(DefaultLoadingElement, {})]
    });
  }
}
_defineProperty(LoadScript, "defaultProps", defaultLoadScriptProps);
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
var previouslyLoadedUrl;
function useLoadScript(_ref) {
  var {
    id = defaultLoadScriptProps.id,
    version = defaultLoadScriptProps.version,
    nonce,
    googleMapsApiKey,
    googleMapsClientId,
    language,
    region,
    libraries,
    preventGoogleFontsLoading,
    channel,
    mapIds,
    authReferrerPolicy
  } = _ref;
  var isMounted = reactExports.useRef(false);
  var [isLoaded, setLoaded] = reactExports.useState(false);
  var [loadError, setLoadError] = reactExports.useState(void 0);
  reactExports.useEffect(function trackMountedState() {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  reactExports.useEffect(function applyPreventGoogleFonts() {
    if (isBrowser && preventGoogleFontsLoading) {
      preventGoogleFonts();
    }
  }, [preventGoogleFontsLoading]);
  reactExports.useEffect(function validateLoadedState() {
    if (isLoaded) {
      invariant(!!window.google, "useLoadScript was marked as loaded, but window.google is not present. Something went wrong.");
    }
  }, [isLoaded]);
  var url = makeLoadScriptUrl({
    version,
    googleMapsApiKey,
    googleMapsClientId,
    language,
    region,
    libraries,
    channel,
    mapIds,
    authReferrerPolicy
  });
  reactExports.useEffect(function loadScriptAndModifyLoadedState() {
    if (!isBrowser) {
      return;
    }
    function setLoadedIfMounted() {
      if (isMounted.current) {
        setLoaded(true);
        previouslyLoadedUrl = url;
      }
    }
    if (window.google && window.google.maps && previouslyLoadedUrl === url) {
      setLoadedIfMounted();
      return;
    }
    injectScript({
      id,
      url,
      nonce
    }).then(setLoadedIfMounted).catch(function handleInjectError(err) {
      if (isMounted.current) {
        setLoadError(err);
      }
      console.warn("\n        There has been an Error with loading Google Maps API script, please check that you provided correct google API key (".concat(googleMapsApiKey || "-", ") or Client ID (").concat(googleMapsClientId || "-", ")\n        Otherwise it is a Network issue.\n      "));
      console.error(err);
    });
  }, [id, url, nonce]);
  var prevLibraries = reactExports.useRef(void 0);
  reactExports.useEffect(function checkPerformance() {
    if (prevLibraries.current && libraries !== prevLibraries.current) {
      console.warn("Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables");
    }
    prevLibraries.current = libraries;
  }, [libraries]);
  return {
    isLoaded,
    loadError,
    url
  };
}
var _excluded$1 = ["loadingElement", "onLoad", "onError", "onUnmount", "children"];
var defaultLoadingElement = jsxRuntimeExports.jsx(DefaultLoadingElement, {});
function LoadScriptNext(_ref) {
  var {
    loadingElement,
    onLoad,
    onError,
    onUnmount,
    children
  } = _ref, hookOptions = _objectWithoutProperties(_ref, _excluded$1);
  var {
    isLoaded,
    loadError
  } = useLoadScript(hookOptions);
  reactExports.useEffect(function handleOnLoad() {
    if (isLoaded && typeof onLoad === "function") {
      onLoad();
    }
  }, [isLoaded, onLoad]);
  reactExports.useEffect(function handleOnError() {
    if (loadError && typeof onError === "function") {
      onError(loadError);
    }
  }, [loadError, onError]);
  reactExports.useEffect(function handleOnUnmount() {
    return () => {
      if (onUnmount) {
        onUnmount();
      }
    };
  }, [onUnmount]);
  return isLoaded ? children : loadingElement || defaultLoadingElement;
}
reactExports.memo(LoadScriptNext);
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var LoaderStatus;
(function(LoaderStatus2) {
  LoaderStatus2[LoaderStatus2["INITIALIZED"] = 0] = "INITIALIZED";
  LoaderStatus2[LoaderStatus2["LOADING"] = 1] = "LOADING";
  LoaderStatus2[LoaderStatus2["SUCCESS"] = 2] = "SUCCESS";
  LoaderStatus2[LoaderStatus2["FAILURE"] = 3] = "FAILURE";
})(LoaderStatus || (LoaderStatus = {}));
function ownKeys$f(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$f(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$f(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$f(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$h = {};
var updaterMap$h = {
  options(instance, options) {
    instance.setOptions(options);
  }
};
function TrafficLayerFunctional(_ref) {
  var {
    options,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    var trafficLayer = new google.maps.TrafficLayer(_objectSpread$f(_objectSpread$f({}, options), {}, {
      map
    }));
    setInstance(trafficLayer);
    if (onLoad) {
      onLoad(trafficLayer);
    }
    return () => {
      if (instance !== null) {
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.setMap(null);
      }
    };
  }, []);
  return null;
}
reactExports.memo(TrafficLayerFunctional);
class TrafficLayer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      trafficLayer: null
    });
    _defineProperty(this, "setTrafficLayerCallback", () => {
      if (this.state.trafficLayer !== null && this.props.onLoad) {
        this.props.onLoad(this.state.trafficLayer);
      }
    });
    _defineProperty(this, "registeredEvents", []);
  }
  componentDidMount() {
    var trafficLayer = new google.maps.TrafficLayer(_objectSpread$f(_objectSpread$f({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$h,
      eventMap: eventMap$h,
      prevProps: {},
      nextProps: this.props,
      instance: trafficLayer
    });
    this.setState(function setTrafficLayer() {
      return {
        trafficLayer
      };
    }, this.setTrafficLayerCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.trafficLayer !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$h,
        eventMap: eventMap$h,
        prevProps,
        nextProps: this.props,
        instance: this.state.trafficLayer
      });
    }
  }
  componentWillUnmount() {
    if (this.state.trafficLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.trafficLayer);
      }
      unregisterEvents(this.registeredEvents);
      this.state.trafficLayer.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(TrafficLayer, "contextType", MapContext);
function BicyclingLayerFunctional(_ref) {
  var {
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    var bicyclingLayer = new google.maps.BicyclingLayer();
    setInstance(bicyclingLayer);
    bicyclingLayer.setMap(map);
    if (onLoad) {
      onLoad(bicyclingLayer);
    }
    return () => {
      if (bicyclingLayer !== null) {
        if (onUnmount) {
          onUnmount(bicyclingLayer);
        }
        bicyclingLayer.setMap(null);
      }
    };
  }, []);
  return null;
}
reactExports.memo(BicyclingLayerFunctional);
class BicyclingLayer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      bicyclingLayer: null
    });
    _defineProperty(this, "setBicyclingLayerCallback", () => {
      if (this.state.bicyclingLayer !== null) {
        this.state.bicyclingLayer.setMap(this.context);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.bicyclingLayer);
        }
      }
    });
  }
  componentDidMount() {
    var bicyclingLayer = new google.maps.BicyclingLayer();
    this.setState(() => {
      return {
        bicyclingLayer
      };
    }, this.setBicyclingLayerCallback);
  }
  componentWillUnmount() {
    if (this.state.bicyclingLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.bicyclingLayer);
      }
      this.state.bicyclingLayer.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(BicyclingLayer, "contextType", MapContext);
function TransitLayerFunctional(_ref) {
  var {
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    var transitLayer = new google.maps.TransitLayer();
    setInstance(transitLayer);
    transitLayer.setMap(map);
    if (onLoad) {
      onLoad(transitLayer);
    }
    return () => {
      if (instance !== null) {
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.setMap(null);
      }
    };
  }, []);
  return null;
}
reactExports.memo(TransitLayerFunctional);
class TransitLayer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      transitLayer: null
    });
    _defineProperty(this, "setTransitLayerCallback", () => {
      if (this.state.transitLayer !== null) {
        this.state.transitLayer.setMap(this.context);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.transitLayer);
        }
      }
    });
  }
  componentDidMount() {
    var transitLayer = new google.maps.TransitLayer();
    this.setState(function setTransitLayer() {
      return {
        transitLayer
      };
    }, this.setTransitLayerCallback);
  }
  componentWillUnmount() {
    if (this.state.transitLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.transitLayer);
      }
      this.state.transitLayer.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(TransitLayer, "contextType", MapContext);
function ownKeys$e(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$e(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$e(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$e(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$g = {
  onCircleComplete: "circlecomplete",
  onMarkerComplete: "markercomplete",
  onOverlayComplete: "overlaycomplete",
  onPolygonComplete: "polygoncomplete",
  onPolylineComplete: "polylinecomplete",
  onRectangleComplete: "rectanglecomplete"
};
var updaterMap$g = {
  drawingMode(instance, drawingMode) {
    instance.setDrawingMode(drawingMode);
  },
  options(instance, options) {
    instance.setOptions(options);
  }
};
function DrawingManagerFunctional(_ref) {
  var {
    options,
    drawingMode,
    onCircleComplete,
    onMarkerComplete,
    onOverlayComplete,
    onPolygonComplete,
    onPolylineComplete,
    onRectangleComplete,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [circlecompleteListener, setCircleCompleteListener] = reactExports.useState(null);
  var [markercompleteListener, setMarkerCompleteListener] = reactExports.useState(null);
  var [overlaycompleteListener, setOverlayCompleteListener] = reactExports.useState(null);
  var [polygoncompleteListener, setPolygonCompleteListener] = reactExports.useState(null);
  var [polylinecompleteListener, setPolylineCompleteListener] = reactExports.useState(null);
  var [rectanglecompleteListener, setRectangleCompleteListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setDrawingMode(drawingMode !== null && drawingMode !== void 0 ? drawingMode : null);
    }
  }, [instance, drawingMode]);
  reactExports.useEffect(() => {
    if (instance && onCircleComplete) {
      if (circlecompleteListener !== null) {
        google.maps.event.removeListener(circlecompleteListener);
      }
      setCircleCompleteListener(google.maps.event.addListener(instance, "circlecomplete", onCircleComplete));
    }
  }, [instance, onCircleComplete]);
  reactExports.useEffect(() => {
    if (instance && onMarkerComplete) {
      if (markercompleteListener !== null) {
        google.maps.event.removeListener(markercompleteListener);
      }
      setMarkerCompleteListener(google.maps.event.addListener(instance, "markercomplete", onMarkerComplete));
    }
  }, [instance, onMarkerComplete]);
  reactExports.useEffect(() => {
    if (instance && onOverlayComplete) {
      if (overlaycompleteListener !== null) {
        google.maps.event.removeListener(overlaycompleteListener);
      }
      setOverlayCompleteListener(google.maps.event.addListener(instance, "overlaycomplete", onOverlayComplete));
    }
  }, [instance, onOverlayComplete]);
  reactExports.useEffect(() => {
    if (instance && onPolygonComplete) {
      if (polygoncompleteListener !== null) {
        google.maps.event.removeListener(polygoncompleteListener);
      }
      setPolygonCompleteListener(google.maps.event.addListener(instance, "polygoncomplete", onPolygonComplete));
    }
  }, [instance, onPolygonComplete]);
  reactExports.useEffect(() => {
    if (instance && onPolylineComplete) {
      if (polylinecompleteListener !== null) {
        google.maps.event.removeListener(polylinecompleteListener);
      }
      setPolylineCompleteListener(google.maps.event.addListener(instance, "polylinecomplete", onPolylineComplete));
    }
  }, [instance, onPolylineComplete]);
  reactExports.useEffect(() => {
    if (instance && onRectangleComplete) {
      if (rectanglecompleteListener !== null) {
        google.maps.event.removeListener(rectanglecompleteListener);
      }
      setRectangleCompleteListener(google.maps.event.addListener(instance, "rectanglecomplete", onRectangleComplete));
    }
  }, [instance, onRectangleComplete]);
  reactExports.useEffect(() => {
    invariant(!!google.maps.drawing, "Did you include prop libraries={['drawing']} in the URL? %s", google.maps.drawing);
    var drawingManager = new google.maps.drawing.DrawingManager(_objectSpread$e(_objectSpread$e({}, options), {}, {
      map
    }));
    if (drawingMode) {
      drawingManager.setDrawingMode(drawingMode);
    }
    if (onCircleComplete) {
      setCircleCompleteListener(google.maps.event.addListener(drawingManager, "circlecomplete", onCircleComplete));
    }
    if (onMarkerComplete) {
      setMarkerCompleteListener(google.maps.event.addListener(drawingManager, "markercomplete", onMarkerComplete));
    }
    if (onOverlayComplete) {
      setOverlayCompleteListener(google.maps.event.addListener(drawingManager, "overlaycomplete", onOverlayComplete));
    }
    if (onPolygonComplete) {
      setPolygonCompleteListener(google.maps.event.addListener(drawingManager, "polygoncomplete", onPolygonComplete));
    }
    if (onPolylineComplete) {
      setPolylineCompleteListener(google.maps.event.addListener(drawingManager, "polylinecomplete", onPolylineComplete));
    }
    if (onRectangleComplete) {
      setRectangleCompleteListener(google.maps.event.addListener(drawingManager, "rectanglecomplete", onRectangleComplete));
    }
    setInstance(drawingManager);
    if (onLoad) {
      onLoad(drawingManager);
    }
    return () => {
      if (instance !== null) {
        if (circlecompleteListener) {
          google.maps.event.removeListener(circlecompleteListener);
        }
        if (markercompleteListener) {
          google.maps.event.removeListener(markercompleteListener);
        }
        if (overlaycompleteListener) {
          google.maps.event.removeListener(overlaycompleteListener);
        }
        if (polygoncompleteListener) {
          google.maps.event.removeListener(polygoncompleteListener);
        }
        if (polylinecompleteListener) {
          google.maps.event.removeListener(polylinecompleteListener);
        }
        if (rectanglecompleteListener) {
          google.maps.event.removeListener(rectanglecompleteListener);
        }
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.setMap(null);
      }
    };
  }, []);
  return null;
}
reactExports.memo(DrawingManagerFunctional);
class DrawingManager extends reactExports.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      drawingManager: null
    });
    _defineProperty(this, "setDrawingManagerCallback", () => {
      if (this.state.drawingManager !== null && this.props.onLoad) {
        this.props.onLoad(this.state.drawingManager);
      }
    });
    invariant(!!google.maps.drawing, "Did you include prop libraries={['drawing']} in the URL? %s", google.maps.drawing);
  }
  componentDidMount() {
    var drawingManager = new google.maps.drawing.DrawingManager(_objectSpread$e(_objectSpread$e({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$g,
      eventMap: eventMap$g,
      prevProps: {},
      nextProps: this.props,
      instance: drawingManager
    });
    this.setState(function setDrawingManager() {
      return {
        drawingManager
      };
    }, this.setDrawingManagerCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.drawingManager !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$g,
        eventMap: eventMap$g,
        prevProps,
        nextProps: this.props,
        instance: this.state.drawingManager
      });
    }
  }
  componentWillUnmount() {
    if (this.state.drawingManager !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.drawingManager);
      }
      unregisterEvents(this.registeredEvents);
      this.state.drawingManager.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(DrawingManager, "contextType", MapContext);
function ownKeys$d(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$d(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$d(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$d(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$f = {
  onAnimationChanged: "animation_changed",
  onClick: "click",
  onClickableChanged: "clickable_changed",
  onCursorChanged: "cursor_changed",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDraggableChanged: "draggable_changed",
  onDragStart: "dragstart",
  onFlatChanged: "flat_changed",
  onIconChanged: "icon_changed",
  onMouseDown: "mousedown",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onPositionChanged: "position_changed",
  onRightClick: "rightclick",
  onShapeChanged: "shape_changed",
  onTitleChanged: "title_changed",
  onVisibleChanged: "visible_changed",
  onZindexChanged: "zindex_changed"
};
var updaterMap$f = {
  animation(instance, animation) {
    instance.setAnimation(animation);
  },
  clickable(instance, clickable) {
    instance.setClickable(clickable);
  },
  cursor(instance, cursor) {
    instance.setCursor(cursor);
  },
  draggable(instance, draggable) {
    instance.setDraggable(draggable);
  },
  icon(instance, icon) {
    instance.setIcon(icon);
  },
  label(instance, label) {
    instance.setLabel(label);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  opacity(instance, opacity) {
    instance.setOpacity(opacity);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  position(instance, position) {
    instance.setPosition(position);
  },
  shape(instance, shape) {
    instance.setShape(shape);
  },
  title(instance, title) {
    instance.setTitle(title);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  },
  zIndex(instance, zIndex) {
    instance.setZIndex(zIndex);
  }
};
var defaultOptions$5 = {};
function MarkerFunctional(_ref) {
  var {
    position,
    options,
    clusterer,
    noClustererRedraw,
    children,
    draggable,
    visible,
    animation,
    clickable,
    cursor,
    icon,
    label,
    opacity,
    shape,
    title,
    zIndex,
    onClick,
    onDblClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onMouseDown,
    onRightClick,
    onClickableChanged,
    onCursorChanged,
    onAnimationChanged,
    onDraggableChanged,
    onFlatChanged,
    onIconChanged,
    onPositionChanged,
    onShapeChanged,
    onTitleChanged,
    onVisibleChanged,
    onZindexChanged,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [dblclickListener, setDblclickListener] = reactExports.useState(null);
  var [dragendListener, setDragendListener] = reactExports.useState(null);
  var [dragstartListener, setDragstartListener] = reactExports.useState(null);
  var [mousedownListener, setMousedownListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  var [mouseupListener, setMouseupListener] = reactExports.useState(null);
  var [rightclickListener, setRightclickListener] = reactExports.useState(null);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [dragListener, setDragListener] = reactExports.useState(null);
  var [clickableChangedListener, setClickableChangedListener] = reactExports.useState(null);
  var [cursorChangedListener, setCursorChangedListener] = reactExports.useState(null);
  var [animationChangedListener, setAnimationChangedListener] = reactExports.useState(null);
  var [draggableChangedListener, setDraggableChangedListener] = reactExports.useState(null);
  var [flatChangedListener, setFlatChangedListener] = reactExports.useState(null);
  var [iconChangedListener, setIconChangedListener] = reactExports.useState(null);
  var [positionChangedListener, setPositionChangedListener] = reactExports.useState(null);
  var [shapeChangedListener, setShapeChangedListener] = reactExports.useState(null);
  var [titleChangedListener, setTitleChangedListener] = reactExports.useState(null);
  var [visibleChangedListener, setVisibleChangedListener] = reactExports.useState(null);
  var [zIndexChangedListener, setZindexChangedListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (typeof options !== "undefined" && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (typeof draggable !== "undefined" && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);
  reactExports.useEffect(() => {
    if (position && instance !== null) {
      instance.setPosition(position);
    }
  }, [instance, position]);
  reactExports.useEffect(() => {
    if (typeof visible !== "undefined" && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);
  reactExports.useEffect(() => {
    instance === null || instance === void 0 || instance.setAnimation(animation);
  }, [instance, animation]);
  reactExports.useEffect(() => {
    if (instance && clickable !== void 0) {
      instance.setClickable(clickable);
    }
  }, [instance, clickable]);
  reactExports.useEffect(() => {
    if (instance && cursor !== void 0) {
      instance.setCursor(cursor);
    }
  }, [instance, cursor]);
  reactExports.useEffect(() => {
    if (instance && icon !== void 0) {
      instance.setIcon(icon);
    }
  }, [instance, icon]);
  reactExports.useEffect(() => {
    if (instance && label !== void 0) {
      instance.setLabel(label);
    }
  }, [instance, label]);
  reactExports.useEffect(() => {
    if (instance && opacity !== void 0) {
      instance.setOpacity(opacity);
    }
  }, [instance, opacity]);
  reactExports.useEffect(() => {
    if (instance && shape !== void 0) {
      instance.setShape(shape);
    }
  }, [instance, shape]);
  reactExports.useEffect(() => {
    if (instance && title !== void 0) {
      instance.setTitle(title);
    }
  }, [instance, title]);
  reactExports.useEffect(() => {
    if (instance && zIndex !== void 0) {
      instance.setZIndex(zIndex);
    }
  }, [instance, zIndex]);
  reactExports.useEffect(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  reactExports.useEffect(() => {
    if (instance && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(instance, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  reactExports.useEffect(() => {
    if (instance && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(instance, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  reactExports.useEffect(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  reactExports.useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  reactExports.useEffect(() => {
    if (instance && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  reactExports.useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(instance, "drag", onDrag));
    }
  }, [onDrag]);
  reactExports.useEffect(() => {
    if (instance && onClickableChanged) {
      if (clickableChangedListener !== null) {
        google.maps.event.removeListener(clickableChangedListener);
      }
      setClickableChangedListener(google.maps.event.addListener(instance, "clickable_changed", onClickableChanged));
    }
  }, [onClickableChanged]);
  reactExports.useEffect(() => {
    if (instance && onCursorChanged) {
      if (cursorChangedListener !== null) {
        google.maps.event.removeListener(cursorChangedListener);
      }
      setCursorChangedListener(google.maps.event.addListener(instance, "cursor_changed", onCursorChanged));
    }
  }, [onCursorChanged]);
  reactExports.useEffect(() => {
    if (instance && onAnimationChanged) {
      if (animationChangedListener !== null) {
        google.maps.event.removeListener(animationChangedListener);
      }
      setAnimationChangedListener(google.maps.event.addListener(instance, "animation_changed", onAnimationChanged));
    }
  }, [onAnimationChanged]);
  reactExports.useEffect(() => {
    if (instance && onDraggableChanged) {
      if (draggableChangedListener !== null) {
        google.maps.event.removeListener(draggableChangedListener);
      }
      setDraggableChangedListener(google.maps.event.addListener(instance, "draggable_changed", onDraggableChanged));
    }
  }, [onDraggableChanged]);
  reactExports.useEffect(() => {
    if (instance && onFlatChanged) {
      if (flatChangedListener !== null) {
        google.maps.event.removeListener(flatChangedListener);
      }
      setFlatChangedListener(google.maps.event.addListener(instance, "flat_changed", onFlatChanged));
    }
  }, [onFlatChanged]);
  reactExports.useEffect(() => {
    if (instance && onIconChanged) {
      if (iconChangedListener !== null) {
        google.maps.event.removeListener(iconChangedListener);
      }
      setIconChangedListener(google.maps.event.addListener(instance, "icon_changed", onIconChanged));
    }
  }, [onIconChanged]);
  reactExports.useEffect(() => {
    if (instance && onPositionChanged) {
      if (positionChangedListener !== null) {
        google.maps.event.removeListener(positionChangedListener);
      }
      setPositionChangedListener(google.maps.event.addListener(instance, "position_changed", onPositionChanged));
    }
  }, [onPositionChanged]);
  reactExports.useEffect(() => {
    if (instance && onShapeChanged) {
      if (shapeChangedListener !== null) {
        google.maps.event.removeListener(shapeChangedListener);
      }
      setShapeChangedListener(google.maps.event.addListener(instance, "shape_changed", onShapeChanged));
    }
  }, [onShapeChanged]);
  reactExports.useEffect(() => {
    if (instance && onTitleChanged) {
      if (titleChangedListener !== null) {
        google.maps.event.removeListener(titleChangedListener);
      }
      setTitleChangedListener(google.maps.event.addListener(instance, "title_changed", onTitleChanged));
    }
  }, [onTitleChanged]);
  reactExports.useEffect(() => {
    if (instance && onVisibleChanged) {
      if (visibleChangedListener !== null) {
        google.maps.event.removeListener(visibleChangedListener);
      }
      setVisibleChangedListener(google.maps.event.addListener(instance, "visible_changed", onVisibleChanged));
    }
  }, [onVisibleChanged]);
  reactExports.useEffect(() => {
    if (instance && onZindexChanged) {
      if (zIndexChangedListener !== null) {
        google.maps.event.removeListener(zIndexChangedListener);
      }
      setZindexChangedListener(google.maps.event.addListener(instance, "zindex_changed", onZindexChanged));
    }
  }, [onZindexChanged]);
  reactExports.useEffect(() => {
    var markerOptions = _objectSpread$d(_objectSpread$d(_objectSpread$d({}, options || defaultOptions$5), clusterer ? defaultOptions$5 : {
      map
    }), {}, {
      position
    });
    var marker = new google.maps.Marker(markerOptions);
    if (clusterer) {
      clusterer.addMarker(marker, !!noClustererRedraw);
    } else {
      marker.setMap(map);
    }
    if (position) {
      marker.setPosition(position);
    }
    if (typeof visible !== "undefined") {
      marker.setVisible(visible);
    }
    if (typeof draggable !== "undefined") {
      marker.setDraggable(draggable);
    }
    if (typeof clickable !== "undefined") {
      marker.setClickable(clickable);
    }
    if (typeof cursor === "string") {
      marker.setCursor(cursor);
    }
    if (icon) {
      marker.setIcon(icon);
    }
    if (typeof label !== "undefined") {
      marker.setLabel(label);
    }
    if (typeof opacity !== "undefined") {
      marker.setOpacity(opacity);
    }
    if (shape) {
      marker.setShape(shape);
    }
    if (typeof title === "string") {
      marker.setTitle(title);
    }
    if (typeof zIndex === "number") {
      marker.setZIndex(zIndex);
    }
    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(marker, "dblclick", onDblClick));
    }
    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(marker, "dragend", onDragEnd));
    }
    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(marker, "dragstart", onDragStart));
    }
    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(marker, "mousedown", onMouseDown));
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(marker, "mouseout", onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(marker, "mouseover", onMouseOver));
    }
    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(marker, "mouseup", onMouseUp));
    }
    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(marker, "rightclick", onRightClick));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(marker, "click", onClick));
    }
    if (onDrag) {
      setDragListener(google.maps.event.addListener(marker, "drag", onDrag));
    }
    if (onClickableChanged) {
      setClickableChangedListener(google.maps.event.addListener(marker, "clickable_changed", onClickableChanged));
    }
    if (onCursorChanged) {
      setCursorChangedListener(google.maps.event.addListener(marker, "cursor_changed", onCursorChanged));
    }
    if (onAnimationChanged) {
      setAnimationChangedListener(google.maps.event.addListener(marker, "animation_changed", onAnimationChanged));
    }
    if (onDraggableChanged) {
      setDraggableChangedListener(google.maps.event.addListener(marker, "draggable_changed", onDraggableChanged));
    }
    if (onFlatChanged) {
      setFlatChangedListener(google.maps.event.addListener(marker, "flat_changed", onFlatChanged));
    }
    if (onIconChanged) {
      setIconChangedListener(google.maps.event.addListener(marker, "icon_changed", onIconChanged));
    }
    if (onPositionChanged) {
      setPositionChangedListener(google.maps.event.addListener(marker, "position_changed", onPositionChanged));
    }
    if (onShapeChanged) {
      setShapeChangedListener(google.maps.event.addListener(marker, "shape_changed", onShapeChanged));
    }
    if (onTitleChanged) {
      setTitleChangedListener(google.maps.event.addListener(marker, "title_changed", onTitleChanged));
    }
    if (onVisibleChanged) {
      setVisibleChangedListener(google.maps.event.addListener(marker, "visible_changed", onVisibleChanged));
    }
    if (onZindexChanged) {
      setZindexChangedListener(google.maps.event.addListener(marker, "zindex_changed", onZindexChanged));
    }
    setInstance(marker);
    if (onLoad) {
      onLoad(marker);
    }
    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (clickableChangedListener !== null) {
        google.maps.event.removeListener(clickableChangedListener);
      }
      if (cursorChangedListener !== null) {
        google.maps.event.removeListener(cursorChangedListener);
      }
      if (animationChangedListener !== null) {
        google.maps.event.removeListener(animationChangedListener);
      }
      if (draggableChangedListener !== null) {
        google.maps.event.removeListener(draggableChangedListener);
      }
      if (flatChangedListener !== null) {
        google.maps.event.removeListener(flatChangedListener);
      }
      if (iconChangedListener !== null) {
        google.maps.event.removeListener(iconChangedListener);
      }
      if (positionChangedListener !== null) {
        google.maps.event.removeListener(positionChangedListener);
      }
      if (titleChangedListener !== null) {
        google.maps.event.removeListener(titleChangedListener);
      }
      if (visibleChangedListener !== null) {
        google.maps.event.removeListener(visibleChangedListener);
      }
      if (zIndexChangedListener !== null) {
        google.maps.event.removeListener(zIndexChangedListener);
      }
      if (onUnmount) {
        onUnmount(marker);
      }
      if (clusterer) {
        clusterer.removeMarker(marker, !!noClustererRedraw);
      } else if (marker) {
        marker.setMap(null);
      }
    };
  }, []);
  var chx = reactExports.useMemo(() => {
    return children ? reactExports.Children.map(children, (child) => {
      if (!reactExports.isValidElement(child)) {
        return child;
      }
      var elementChild = child;
      return reactExports.cloneElement(elementChild, {
        anchor: instance
      });
    }) : null;
  }, [children, instance]);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
    children: chx
  }) || null;
}
reactExports.memo(MarkerFunctional);
class Marker extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
  }
  componentDidMount() {
    var _this = this;
    return _asyncToGenerator(function* () {
      var markerOptions = _objectSpread$d(_objectSpread$d(_objectSpread$d({}, _this.props.options || defaultOptions$5), _this.props.clusterer ? defaultOptions$5 : {
        map: _this.context
      }), {}, {
        position: _this.props.position
      });
      _this.marker = new google.maps.Marker(markerOptions);
      if (_this.props.clusterer) {
        _this.props.clusterer.addMarker(_this.marker, !!_this.props.noClustererRedraw);
      } else {
        _this.marker.setMap(_this.context);
      }
      _this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$f,
        eventMap: eventMap$f,
        prevProps: {},
        nextProps: _this.props,
        instance: _this.marker
      });
      if (_this.props.onLoad) {
        _this.props.onLoad(_this.marker);
      }
    })();
  }
  componentDidUpdate(prevProps) {
    if (this.marker) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$f,
        eventMap: eventMap$f,
        prevProps,
        nextProps: this.props,
        instance: this.marker
      });
    }
  }
  componentWillUnmount() {
    if (!this.marker) {
      return;
    }
    if (this.props.onUnmount) {
      this.props.onUnmount(this.marker);
    }
    unregisterEvents(this.registeredEvents);
    if (this.props.clusterer) {
      this.props.clusterer.removeMarker(this.marker, !!this.props.noClustererRedraw);
    } else if (this.marker) {
      this.marker.setMap(null);
    }
  }
  render() {
    var children = this.props.children ? reactExports.Children.map(this.props.children, (child) => {
      if (!reactExports.isValidElement(child)) {
        return child;
      }
      var elementChild = child;
      return reactExports.cloneElement(elementChild, {
        anchor: this.marker
      });
    }) : null;
    return children || null;
  }
}
_defineProperty(Marker, "contextType", MapContext);
var ClusterIcon = (
  /** @class */
  function() {
    function ClusterIcon2(cluster, styles) {
      cluster.getClusterer().extend(ClusterIcon2, google.maps.OverlayView);
      this.cluster = cluster;
      this.clusterClassName = this.cluster.getClusterer().getClusterClass();
      this.className = this.clusterClassName;
      this.styles = styles;
      this.center = void 0;
      this.div = null;
      this.sums = null;
      this.visible = false;
      this.boundsChangedListener = null;
      this.url = "";
      this.height = 0;
      this.width = 0;
      this.anchorText = [0, 0];
      this.anchorIcon = [0, 0];
      this.textColor = "black";
      this.textSize = 11;
      this.textDecoration = "none";
      this.fontWeight = "bold";
      this.fontStyle = "normal";
      this.fontFamily = "Arial,sans-serif";
      this.backgroundPosition = "0 0";
      this.cMouseDownInCluster = null;
      this.cDraggingMapByCluster = null;
      this.timeOut = null;
      this.setMap(cluster.getMap());
      this.onBoundsChanged = this.onBoundsChanged.bind(this);
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onClick = this.onClick.bind(this);
      this.onMouseOver = this.onMouseOver.bind(this);
      this.onMouseOut = this.onMouseOut.bind(this);
      this.onAdd = this.onAdd.bind(this);
      this.onRemove = this.onRemove.bind(this);
      this.draw = this.draw.bind(this);
      this.hide = this.hide.bind(this);
      this.show = this.show.bind(this);
      this.useStyle = this.useStyle.bind(this);
      this.setCenter = this.setCenter.bind(this);
      this.getPosFromLatLng = this.getPosFromLatLng.bind(this);
    }
    ClusterIcon2.prototype.onBoundsChanged = function() {
      this.cDraggingMapByCluster = this.cMouseDownInCluster;
    };
    ClusterIcon2.prototype.onMouseDown = function() {
      this.cMouseDownInCluster = true;
      this.cDraggingMapByCluster = false;
    };
    ClusterIcon2.prototype.onClick = function(event) {
      this.cMouseDownInCluster = false;
      if (!this.cDraggingMapByCluster) {
        var markerClusterer_1 = this.cluster.getClusterer();
        google.maps.event.trigger(markerClusterer_1, "click", this.cluster);
        google.maps.event.trigger(markerClusterer_1, "clusterclick", this.cluster);
        if (markerClusterer_1.getZoomOnClick()) {
          var maxZoom_1 = markerClusterer_1.getMaxZoom();
          var bounds_1 = this.cluster.getBounds();
          var map = markerClusterer_1.getMap();
          if (map !== null && "fitBounds" in map) {
            map.fitBounds(bounds_1);
          }
          this.timeOut = window.setTimeout(function() {
            var map2 = markerClusterer_1.getMap();
            if (map2 !== null) {
              if ("fitBounds" in map2) {
                map2.fitBounds(bounds_1);
              }
              var zoom = map2.getZoom() || 0;
              if (maxZoom_1 !== null && zoom > maxZoom_1) {
                map2.setZoom(maxZoom_1 + 1);
              }
            }
          }, 100);
        }
        event.cancelBubble = true;
        if (event.stopPropagation) {
          event.stopPropagation();
        }
      }
    };
    ClusterIcon2.prototype.onMouseOver = function() {
      google.maps.event.trigger(this.cluster.getClusterer(), "mouseover", this.cluster);
    };
    ClusterIcon2.prototype.onMouseOut = function() {
      google.maps.event.trigger(this.cluster.getClusterer(), "mouseout", this.cluster);
    };
    ClusterIcon2.prototype.onAdd = function() {
      var _a;
      this.div = document.createElement("div");
      this.div.className = this.className;
      if (this.visible) {
        this.show();
      }
      (_a = this.getPanes()) === null || _a === void 0 ? void 0 : _a.overlayMouseTarget.appendChild(this.div);
      var map = this.getMap();
      if (map !== null) {
        this.boundsChangedListener = google.maps.event.addListener(map, "bounds_changed", this.onBoundsChanged);
        this.div.addEventListener("mousedown", this.onMouseDown);
        this.div.addEventListener("click", this.onClick);
        this.div.addEventListener("mouseover", this.onMouseOver);
        this.div.addEventListener("mouseout", this.onMouseOut);
      }
    };
    ClusterIcon2.prototype.onRemove = function() {
      if (this.div && this.div.parentNode) {
        this.hide();
        if (this.boundsChangedListener !== null) {
          google.maps.event.removeListener(this.boundsChangedListener);
        }
        this.div.removeEventListener("mousedown", this.onMouseDown);
        this.div.removeEventListener("click", this.onClick);
        this.div.removeEventListener("mouseover", this.onMouseOver);
        this.div.removeEventListener("mouseout", this.onMouseOut);
        this.div.parentNode.removeChild(this.div);
        if (this.timeOut !== null) {
          window.clearTimeout(this.timeOut);
          this.timeOut = null;
        }
        this.div = null;
      }
    };
    ClusterIcon2.prototype.draw = function() {
      if (this.visible && this.div !== null && this.center) {
        var pos = this.getPosFromLatLng(this.center);
        this.div.style.top = pos !== null ? "".concat(pos.y, "px") : "0";
        this.div.style.left = pos !== null ? "".concat(pos.x, "px") : "0";
      }
    };
    ClusterIcon2.prototype.hide = function() {
      if (this.div) {
        this.div.style.display = "none";
      }
      this.visible = false;
    };
    ClusterIcon2.prototype.show = function() {
      var _a, _b, _c, _d, _e, _f;
      if (this.div && this.center) {
        var divTitle = this.sums === null || typeof this.sums.title === "undefined" || this.sums.title === "" ? this.cluster.getClusterer().getTitle() : this.sums.title;
        var bp = this.backgroundPosition.split(" ");
        var spriteH = parseInt(((_a = bp[0]) === null || _a === void 0 ? void 0 : _a.replace(/^\s+|\s+$/g, "")) || "0", 10);
        var spriteV = parseInt(((_b = bp[1]) === null || _b === void 0 ? void 0 : _b.replace(/^\s+|\s+$/g, "")) || "0", 10);
        var pos = this.getPosFromLatLng(this.center);
        this.div.className = this.className;
        this.div.setAttribute("style", "cursor: pointer; position: absolute; top: ".concat(pos !== null ? "".concat(pos.y, "px") : "0", "; left: ").concat(pos !== null ? "".concat(pos.x, "px") : "0", "; width: ").concat(this.width, "px; height: ").concat(this.height, "px; "));
        var img = document.createElement("img");
        img.alt = divTitle;
        img.src = this.url;
        img.width = this.width;
        img.height = this.height;
        img.setAttribute("style", "position: absolute; top: ".concat(spriteV, "px; left: ").concat(spriteH, "px"));
        if (!this.cluster.getClusterer().enableRetinaIcons) {
          img.style.clip = "rect(-".concat(spriteV, "px, -").concat(spriteH + this.width, "px, -").concat(spriteV + this.height, ", -").concat(spriteH, ")");
        }
        var textElm = document.createElement("div");
        textElm.setAttribute("style", "position: absolute; top: ".concat(this.anchorText[0], "px; left: ").concat(this.anchorText[1], "px; color: ").concat(this.textColor, "; font-size: ").concat(this.textSize, "px; font-family: ").concat(this.fontFamily, "; font-weight: ").concat(this.fontWeight, "; fontStyle: ").concat(this.fontStyle, "; text-decoration: ").concat(this.textDecoration, "; text-align: center; width: ").concat(this.width, "px; line-height: ").concat(this.height, "px"));
        if ((_c = this.sums) === null || _c === void 0 ? void 0 : _c.text) textElm.innerText = "".concat((_d = this.sums) === null || _d === void 0 ? void 0 : _d.text);
        if ((_e = this.sums) === null || _e === void 0 ? void 0 : _e.html) textElm.innerHTML = "".concat((_f = this.sums) === null || _f === void 0 ? void 0 : _f.html);
        this.div.innerHTML = "";
        this.div.appendChild(img);
        this.div.appendChild(textElm);
        this.div.title = divTitle;
        this.div.style.display = "";
      }
      this.visible = true;
    };
    ClusterIcon2.prototype.useStyle = function(sums) {
      this.sums = sums;
      var styles = this.cluster.getClusterer().getStyles();
      var style = styles[Math.min(styles.length - 1, Math.max(0, sums.index - 1))];
      if (style) {
        this.url = style.url;
        this.height = style.height;
        this.width = style.width;
        if (style.className) {
          this.className = "".concat(this.clusterClassName, " ").concat(style.className);
        }
        this.anchorText = style.anchorText || [0, 0];
        this.anchorIcon = style.anchorIcon || [this.height / 2, this.width / 2];
        this.textColor = style.textColor || "black";
        this.textSize = style.textSize || 11;
        this.textDecoration = style.textDecoration || "none";
        this.fontWeight = style.fontWeight || "bold";
        this.fontStyle = style.fontStyle || "normal";
        this.fontFamily = style.fontFamily || "Arial,sans-serif";
        this.backgroundPosition = style.backgroundPosition || "0 0";
      }
    };
    ClusterIcon2.prototype.setCenter = function(center2) {
      this.center = center2;
    };
    ClusterIcon2.prototype.getPosFromLatLng = function(latlng) {
      var pos = this.getProjection().fromLatLngToDivPixel(latlng);
      if (pos !== null) {
        pos.x -= this.anchorIcon[1];
        pos.y -= this.anchorIcon[0];
      }
      return pos;
    };
    return ClusterIcon2;
  }()
);
var Cluster$1 = (
  /** @class */
  function() {
    function Cluster2(markerClusterer) {
      this.markerClusterer = markerClusterer;
      this.map = this.markerClusterer.getMap();
      this.gridSize = this.markerClusterer.getGridSize();
      this.minClusterSize = this.markerClusterer.getMinimumClusterSize();
      this.averageCenter = this.markerClusterer.getAverageCenter();
      this.markers = [];
      this.center = void 0;
      this.bounds = null;
      this.clusterIcon = new ClusterIcon(this, this.markerClusterer.getStyles());
      this.getSize = this.getSize.bind(this);
      this.getMarkers = this.getMarkers.bind(this);
      this.getCenter = this.getCenter.bind(this);
      this.getMap = this.getMap.bind(this);
      this.getClusterer = this.getClusterer.bind(this);
      this.getBounds = this.getBounds.bind(this);
      this.remove = this.remove.bind(this);
      this.addMarker = this.addMarker.bind(this);
      this.isMarkerInClusterBounds = this.isMarkerInClusterBounds.bind(this);
      this.calculateBounds = this.calculateBounds.bind(this);
      this.updateIcon = this.updateIcon.bind(this);
      this.isMarkerAlreadyAdded = this.isMarkerAlreadyAdded.bind(this);
    }
    Cluster2.prototype.getSize = function() {
      return this.markers.length;
    };
    Cluster2.prototype.getMarkers = function() {
      return this.markers;
    };
    Cluster2.prototype.getCenter = function() {
      return this.center;
    };
    Cluster2.prototype.getMap = function() {
      return this.map;
    };
    Cluster2.prototype.getClusterer = function() {
      return this.markerClusterer;
    };
    Cluster2.prototype.getBounds = function() {
      var bounds = new google.maps.LatLngBounds(this.center, this.center);
      var markers = this.getMarkers();
      for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
        var marker = markers_1[_i];
        var position = marker.getPosition();
        if (position) {
          bounds.extend(position);
        }
      }
      return bounds;
    };
    Cluster2.prototype.remove = function() {
      this.clusterIcon.setMap(null);
      this.markers = [];
      delete this.markers;
    };
    Cluster2.prototype.addMarker = function(marker) {
      var _a;
      if (this.isMarkerAlreadyAdded(marker)) {
        return false;
      }
      if (!this.center) {
        var position = marker.getPosition();
        if (position) {
          this.center = position;
          this.calculateBounds();
        }
      } else {
        if (this.averageCenter) {
          var position = marker.getPosition();
          if (position) {
            var length_1 = this.markers.length + 1;
            this.center = new google.maps.LatLng((this.center.lat() * (length_1 - 1) + position.lat()) / length_1, (this.center.lng() * (length_1 - 1) + position.lng()) / length_1);
            this.calculateBounds();
          }
        }
      }
      marker.isAdded = true;
      this.markers.push(marker);
      var mCount = this.markers.length;
      var maxZoom = this.markerClusterer.getMaxZoom();
      var zoom = (_a = this.map) === null || _a === void 0 ? void 0 : _a.getZoom();
      if (maxZoom !== null && typeof zoom !== "undefined" && zoom > maxZoom) {
        if (marker.getMap() !== this.map) {
          marker.setMap(this.map);
        }
      } else if (mCount < this.minClusterSize) {
        if (marker.getMap() !== this.map) {
          marker.setMap(this.map);
        }
      } else if (mCount === this.minClusterSize) {
        for (var _i = 0, _b = this.markers; _i < _b.length; _i++) {
          var markerElement = _b[_i];
          markerElement.setMap(null);
        }
      } else {
        marker.setMap(null);
      }
      return true;
    };
    Cluster2.prototype.isMarkerInClusterBounds = function(marker) {
      if (this.bounds !== null) {
        var position = marker.getPosition();
        if (position) {
          return this.bounds.contains(position);
        }
      }
      return false;
    };
    Cluster2.prototype.calculateBounds = function() {
      this.bounds = this.markerClusterer.getExtendedBounds(new google.maps.LatLngBounds(this.center, this.center));
    };
    Cluster2.prototype.updateIcon = function() {
      var _a;
      var mCount = this.markers.length;
      var maxZoom = this.markerClusterer.getMaxZoom();
      var zoom = (_a = this.map) === null || _a === void 0 ? void 0 : _a.getZoom();
      if (maxZoom !== null && typeof zoom !== "undefined" && zoom > maxZoom) {
        this.clusterIcon.hide();
        return;
      }
      if (mCount < this.minClusterSize) {
        this.clusterIcon.hide();
        return;
      }
      if (this.center) {
        this.clusterIcon.setCenter(this.center);
      }
      this.clusterIcon.useStyle(this.markerClusterer.getCalculator()(this.markers, this.markerClusterer.getStyles().length));
      this.clusterIcon.show();
    };
    Cluster2.prototype.isMarkerAlreadyAdded = function(marker) {
      if (this.markers.includes) {
        return this.markers.includes(marker);
      }
      for (var i = 0; i < this.markers.length; i++) {
        if (marker === this.markers[i]) {
          return true;
        }
      }
      return false;
    };
    return Cluster2;
  }()
);
function CALCULATOR(markers, numStyles) {
  var count = markers.length;
  var numberOfDigits = count.toString().length;
  var index = Math.min(numberOfDigits, numStyles);
  return {
    text: count.toString(),
    index,
    title: ""
  };
}
var BATCH_SIZE = 2e3;
var BATCH_SIZE_IE = 500;
var IMAGE_PATH = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m";
var IMAGE_EXTENSION = "png";
var IMAGE_SIZES = [53, 56, 66, 78, 90];
var CLUSTERER_CLASS = "cluster";
var Clusterer = (
  /** @class */
  function() {
    function Clusterer2(map, optMarkers, optOptions) {
      if (optMarkers === void 0) {
        optMarkers = [];
      }
      if (optOptions === void 0) {
        optOptions = {};
      }
      this.getMinimumClusterSize = this.getMinimumClusterSize.bind(this);
      this.setMinimumClusterSize = this.setMinimumClusterSize.bind(this);
      this.getEnableRetinaIcons = this.getEnableRetinaIcons.bind(this);
      this.setEnableRetinaIcons = this.setEnableRetinaIcons.bind(this);
      this.addToClosestCluster = this.addToClosestCluster.bind(this);
      this.getImageExtension = this.getImageExtension.bind(this);
      this.setImageExtension = this.setImageExtension.bind(this);
      this.getExtendedBounds = this.getExtendedBounds.bind(this);
      this.getAverageCenter = this.getAverageCenter.bind(this);
      this.setAverageCenter = this.setAverageCenter.bind(this);
      this.getTotalClusters = this.getTotalClusters.bind(this);
      this.fitMapToMarkers = this.fitMapToMarkers.bind(this);
      this.getIgnoreHidden = this.getIgnoreHidden.bind(this);
      this.setIgnoreHidden = this.setIgnoreHidden.bind(this);
      this.getClusterClass = this.getClusterClass.bind(this);
      this.setClusterClass = this.setClusterClass.bind(this);
      this.getTotalMarkers = this.getTotalMarkers.bind(this);
      this.getZoomOnClick = this.getZoomOnClick.bind(this);
      this.setZoomOnClick = this.setZoomOnClick.bind(this);
      this.getBatchSizeIE = this.getBatchSizeIE.bind(this);
      this.setBatchSizeIE = this.setBatchSizeIE.bind(this);
      this.createClusters = this.createClusters.bind(this);
      this.onZoomChanged = this.onZoomChanged.bind(this);
      this.getImageSizes = this.getImageSizes.bind(this);
      this.setImageSizes = this.setImageSizes.bind(this);
      this.getCalculator = this.getCalculator.bind(this);
      this.setCalculator = this.setCalculator.bind(this);
      this.removeMarkers = this.removeMarkers.bind(this);
      this.resetViewport = this.resetViewport.bind(this);
      this.getImagePath = this.getImagePath.bind(this);
      this.setImagePath = this.setImagePath.bind(this);
      this.pushMarkerTo = this.pushMarkerTo.bind(this);
      this.removeMarker = this.removeMarker.bind(this);
      this.clearMarkers = this.clearMarkers.bind(this);
      this.setupStyles = this.setupStyles.bind(this);
      this.getGridSize = this.getGridSize.bind(this);
      this.setGridSize = this.setGridSize.bind(this);
      this.getClusters = this.getClusters.bind(this);
      this.getMaxZoom = this.getMaxZoom.bind(this);
      this.setMaxZoom = this.setMaxZoom.bind(this);
      this.getMarkers = this.getMarkers.bind(this);
      this.addMarkers = this.addMarkers.bind(this);
      this.getStyles = this.getStyles.bind(this);
      this.setStyles = this.setStyles.bind(this);
      this.addMarker = this.addMarker.bind(this);
      this.onRemove = this.onRemove.bind(this);
      this.getTitle = this.getTitle.bind(this);
      this.setTitle = this.setTitle.bind(this);
      this.repaint = this.repaint.bind(this);
      this.onIdle = this.onIdle.bind(this);
      this.redraw = this.redraw.bind(this);
      this.onAdd = this.onAdd.bind(this);
      this.draw = this.draw.bind(this);
      this.extend = this.extend.bind(this);
      this.extend(Clusterer2, google.maps.OverlayView);
      this.markers = [];
      this.clusters = [];
      this.listeners = [];
      this.activeMap = null;
      this.ready = false;
      this.gridSize = optOptions.gridSize || 60;
      this.minClusterSize = optOptions.minimumClusterSize || 2;
      this.maxZoom = optOptions.maxZoom || null;
      this.styles = optOptions.styles || [];
      this.title = optOptions.title || "";
      this.zoomOnClick = true;
      if (optOptions.zoomOnClick !== void 0) {
        this.zoomOnClick = optOptions.zoomOnClick;
      }
      this.averageCenter = false;
      if (optOptions.averageCenter !== void 0) {
        this.averageCenter = optOptions.averageCenter;
      }
      this.ignoreHidden = false;
      if (optOptions.ignoreHidden !== void 0) {
        this.ignoreHidden = optOptions.ignoreHidden;
      }
      this.enableRetinaIcons = false;
      if (optOptions.enableRetinaIcons !== void 0) {
        this.enableRetinaIcons = optOptions.enableRetinaIcons;
      }
      this.imagePath = optOptions.imagePath || IMAGE_PATH;
      this.imageExtension = optOptions.imageExtension || IMAGE_EXTENSION;
      this.imageSizes = optOptions.imageSizes || IMAGE_SIZES;
      this.calculator = optOptions.calculator || CALCULATOR;
      this.batchSize = optOptions.batchSize || BATCH_SIZE;
      this.batchSizeIE = optOptions.batchSizeIE || BATCH_SIZE_IE;
      this.clusterClass = optOptions.clusterClass || CLUSTERER_CLASS;
      if (navigator.userAgent.toLowerCase().indexOf("msie") !== -1) {
        this.batchSize = this.batchSizeIE;
      }
      this.timerRefStatic = null;
      this.setupStyles();
      this.addMarkers(optMarkers, true);
      this.setMap(map);
    }
    Clusterer2.prototype.onZoomChanged = function() {
      var _a, _b;
      this.resetViewport(false);
      if (((_a = this.getMap()) === null || _a === void 0 ? void 0 : _a.getZoom()) === (this.get("minZoom") || 0) || ((_b = this.getMap()) === null || _b === void 0 ? void 0 : _b.getZoom()) === this.get("maxZoom")) {
        google.maps.event.trigger(this, "idle");
      }
    };
    Clusterer2.prototype.onIdle = function() {
      this.redraw();
    };
    Clusterer2.prototype.onAdd = function() {
      var map = this.getMap();
      this.activeMap = map;
      this.ready = true;
      this.repaint();
      if (map !== null) {
        this.listeners = [google.maps.event.addListener(map, "zoom_changed", this.onZoomChanged), google.maps.event.addListener(map, "idle", this.onIdle)];
      }
    };
    Clusterer2.prototype.onRemove = function() {
      for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
        var marker = _a[_i];
        if (marker.getMap() !== this.activeMap) {
          marker.setMap(this.activeMap);
        }
      }
      for (var _b = 0, _c = this.clusters; _b < _c.length; _b++) {
        var cluster = _c[_b];
        cluster.remove();
      }
      this.clusters = [];
      for (var _d = 0, _e = this.listeners; _d < _e.length; _d++) {
        var listener = _e[_d];
        google.maps.event.removeListener(listener);
      }
      this.listeners = [];
      this.activeMap = null;
      this.ready = false;
    };
    Clusterer2.prototype.draw = function() {
      return;
    };
    Clusterer2.prototype.getMap = function() {
      return null;
    };
    Clusterer2.prototype.getPanes = function() {
      return null;
    };
    Clusterer2.prototype.getProjection = function() {
      return {
        fromContainerPixelToLatLng: function fromContainerPixelToLatLng() {
          return null;
        },
        fromDivPixelToLatLng: function fromDivPixelToLatLng() {
          return null;
        },
        fromLatLngToContainerPixel: function fromLatLngToContainerPixel() {
          return null;
        },
        fromLatLngToDivPixel: function fromLatLngToDivPixel() {
          return null;
        },
        getVisibleRegion: function getVisibleRegion() {
          return null;
        },
        getWorldWidth: function getWorldWidth() {
          return 0;
        }
      };
    };
    Clusterer2.prototype.setMap = function() {
      return;
    };
    Clusterer2.prototype.addListener = function() {
      return {
        remove: function remove() {
          return;
        }
      };
    };
    Clusterer2.prototype.bindTo = function() {
      return;
    };
    Clusterer2.prototype.get = function() {
      return;
    };
    Clusterer2.prototype.notify = function() {
      return;
    };
    Clusterer2.prototype.set = function() {
      return;
    };
    Clusterer2.prototype.setValues = function() {
      return;
    };
    Clusterer2.prototype.unbind = function() {
      return;
    };
    Clusterer2.prototype.unbindAll = function() {
      return;
    };
    Clusterer2.prototype.setupStyles = function() {
      if (this.styles.length > 0) {
        return;
      }
      for (var i = 0; i < this.imageSizes.length; i++) {
        this.styles.push({
          url: "".concat(this.imagePath + (i + 1), ".").concat(this.imageExtension),
          height: this.imageSizes[i] || 0,
          width: this.imageSizes[i] || 0
        });
      }
    };
    Clusterer2.prototype.fitMapToMarkers = function() {
      var markers = this.getMarkers();
      var bounds = new google.maps.LatLngBounds();
      for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
        var marker = markers_1[_i];
        var position = marker.getPosition();
        if (position) {
          bounds.extend(position);
        }
      }
      var map = this.getMap();
      if (map !== null && "fitBounds" in map) {
        map.fitBounds(bounds);
      }
    };
    Clusterer2.prototype.getGridSize = function() {
      return this.gridSize;
    };
    Clusterer2.prototype.setGridSize = function(gridSize) {
      this.gridSize = gridSize;
    };
    Clusterer2.prototype.getMinimumClusterSize = function() {
      return this.minClusterSize;
    };
    Clusterer2.prototype.setMinimumClusterSize = function(minimumClusterSize) {
      this.minClusterSize = minimumClusterSize;
    };
    Clusterer2.prototype.getMaxZoom = function() {
      return this.maxZoom;
    };
    Clusterer2.prototype.setMaxZoom = function(maxZoom) {
      this.maxZoom = maxZoom;
    };
    Clusterer2.prototype.getStyles = function() {
      return this.styles;
    };
    Clusterer2.prototype.setStyles = function(styles) {
      this.styles = styles;
    };
    Clusterer2.prototype.getTitle = function() {
      return this.title;
    };
    Clusterer2.prototype.setTitle = function(title) {
      this.title = title;
    };
    Clusterer2.prototype.getZoomOnClick = function() {
      return this.zoomOnClick;
    };
    Clusterer2.prototype.setZoomOnClick = function(zoomOnClick) {
      this.zoomOnClick = zoomOnClick;
    };
    Clusterer2.prototype.getAverageCenter = function() {
      return this.averageCenter;
    };
    Clusterer2.prototype.setAverageCenter = function(averageCenter) {
      this.averageCenter = averageCenter;
    };
    Clusterer2.prototype.getIgnoreHidden = function() {
      return this.ignoreHidden;
    };
    Clusterer2.prototype.setIgnoreHidden = function(ignoreHidden) {
      this.ignoreHidden = ignoreHidden;
    };
    Clusterer2.prototype.getEnableRetinaIcons = function() {
      return this.enableRetinaIcons;
    };
    Clusterer2.prototype.setEnableRetinaIcons = function(enableRetinaIcons) {
      this.enableRetinaIcons = enableRetinaIcons;
    };
    Clusterer2.prototype.getImageExtension = function() {
      return this.imageExtension;
    };
    Clusterer2.prototype.setImageExtension = function(imageExtension) {
      this.imageExtension = imageExtension;
    };
    Clusterer2.prototype.getImagePath = function() {
      return this.imagePath;
    };
    Clusterer2.prototype.setImagePath = function(imagePath) {
      this.imagePath = imagePath;
    };
    Clusterer2.prototype.getImageSizes = function() {
      return this.imageSizes;
    };
    Clusterer2.prototype.setImageSizes = function(imageSizes) {
      this.imageSizes = imageSizes;
    };
    Clusterer2.prototype.getCalculator = function() {
      return this.calculator;
    };
    Clusterer2.prototype.setCalculator = function(calculator) {
      this.calculator = calculator;
    };
    Clusterer2.prototype.getBatchSizeIE = function() {
      return this.batchSizeIE;
    };
    Clusterer2.prototype.setBatchSizeIE = function(batchSizeIE) {
      this.batchSizeIE = batchSizeIE;
    };
    Clusterer2.prototype.getClusterClass = function() {
      return this.clusterClass;
    };
    Clusterer2.prototype.setClusterClass = function(clusterClass) {
      this.clusterClass = clusterClass;
    };
    Clusterer2.prototype.getMarkers = function() {
      return this.markers;
    };
    Clusterer2.prototype.getTotalMarkers = function() {
      return this.markers.length;
    };
    Clusterer2.prototype.getClusters = function() {
      return this.clusters;
    };
    Clusterer2.prototype.getTotalClusters = function() {
      return this.clusters.length;
    };
    Clusterer2.prototype.addMarker = function(marker, optNoDraw) {
      this.pushMarkerTo(marker);
      if (!optNoDraw) {
        this.redraw();
      }
    };
    Clusterer2.prototype.addMarkers = function(markers, optNoDraw) {
      for (var key in markers) {
        if (Object.prototype.hasOwnProperty.call(markers, key)) {
          var marker = markers[key];
          if (marker) {
            this.pushMarkerTo(marker);
          }
        }
      }
      if (!optNoDraw) {
        this.redraw();
      }
    };
    Clusterer2.prototype.pushMarkerTo = function(marker) {
      var _this = this;
      if (marker.getDraggable()) {
        google.maps.event.addListener(marker, "dragend", function() {
          if (_this.ready) {
            marker.isAdded = false;
            _this.repaint();
          }
        });
      }
      marker.isAdded = false;
      this.markers.push(marker);
    };
    Clusterer2.prototype.removeMarker_ = function(marker) {
      var index = -1;
      if (this.markers.indexOf) {
        index = this.markers.indexOf(marker);
      } else {
        for (var i = 0; i < this.markers.length; i++) {
          if (marker === this.markers[i]) {
            index = i;
            break;
          }
        }
      }
      if (index === -1) {
        return false;
      }
      marker.setMap(null);
      this.markers.splice(index, 1);
      return true;
    };
    Clusterer2.prototype.removeMarker = function(marker, optNoDraw) {
      var removed = this.removeMarker_(marker);
      if (!optNoDraw && removed) {
        this.repaint();
      }
      return removed;
    };
    Clusterer2.prototype.removeMarkers = function(markers, optNoDraw) {
      var removed = false;
      for (var _i = 0, markers_2 = markers; _i < markers_2.length; _i++) {
        var marker = markers_2[_i];
        removed = removed || this.removeMarker_(marker);
      }
      if (!optNoDraw && removed) {
        this.repaint();
      }
      return removed;
    };
    Clusterer2.prototype.clearMarkers = function() {
      this.resetViewport(true);
      this.markers = [];
    };
    Clusterer2.prototype.repaint = function() {
      var oldClusters = this.clusters.slice();
      this.clusters = [];
      this.resetViewport(false);
      this.redraw();
      setTimeout(function timeout() {
        for (var _i = 0, oldClusters_1 = oldClusters; _i < oldClusters_1.length; _i++) {
          var oldCluster = oldClusters_1[_i];
          oldCluster.remove();
        }
      }, 0);
    };
    Clusterer2.prototype.getExtendedBounds = function(bounds) {
      var projection = this.getProjection();
      var trPix = projection.fromLatLngToDivPixel(
        // Turn the bounds into latlng.
        new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng())
      );
      if (trPix !== null) {
        trPix.x += this.gridSize;
        trPix.y -= this.gridSize;
      }
      var blPix = projection.fromLatLngToDivPixel(
        // Turn the bounds into latlng.
        new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng())
      );
      if (blPix !== null) {
        blPix.x -= this.gridSize;
        blPix.y += this.gridSize;
      }
      if (trPix !== null) {
        var point1 = projection.fromDivPixelToLatLng(trPix);
        if (point1 !== null) {
          bounds.extend(point1);
        }
      }
      if (blPix !== null) {
        var point2 = projection.fromDivPixelToLatLng(blPix);
        if (point2 !== null) {
          bounds.extend(point2);
        }
      }
      return bounds;
    };
    Clusterer2.prototype.redraw = function() {
      this.createClusters(0);
    };
    Clusterer2.prototype.resetViewport = function(optHide) {
      for (var _i = 0, _a = this.clusters; _i < _a.length; _i++) {
        var cluster = _a[_i];
        cluster.remove();
      }
      this.clusters = [];
      for (var _b = 0, _c = this.markers; _b < _c.length; _b++) {
        var marker = _c[_b];
        marker.isAdded = false;
        if (optHide) {
          marker.setMap(null);
        }
      }
    };
    Clusterer2.prototype.distanceBetweenPoints = function(p1, p2) {
      var R = 6371;
      var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
      var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    };
    Clusterer2.prototype.isMarkerInBounds = function(marker, bounds) {
      var position = marker.getPosition();
      if (position) {
        return bounds.contains(position);
      }
      return false;
    };
    Clusterer2.prototype.addToClosestCluster = function(marker) {
      var cluster;
      var distance = 4e4;
      var clusterToAddTo = null;
      for (var _i = 0, _a = this.clusters; _i < _a.length; _i++) {
        var clusterElement = _a[_i];
        cluster = clusterElement;
        var center2 = cluster.getCenter();
        var position = marker.getPosition();
        if (center2 && position) {
          var d = this.distanceBetweenPoints(center2, position);
          if (d < distance) {
            distance = d;
            clusterToAddTo = cluster;
          }
        }
      }
      if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
        clusterToAddTo.addMarker(marker);
      } else {
        cluster = new Cluster$1(this);
        cluster.addMarker(marker);
        this.clusters.push(cluster);
      }
    };
    Clusterer2.prototype.createClusters = function(iFirst) {
      var _this = this;
      if (!this.ready) {
        return;
      }
      if (iFirst === 0) {
        google.maps.event.trigger(this, "clusteringbegin", this);
        if (this.timerRefStatic !== null) {
          window.clearTimeout(this.timerRefStatic);
          delete this.timerRefStatic;
        }
      }
      var map = this.getMap();
      var bounds = map !== null && "getBounds" in map ? map.getBounds() : null;
      var zoom = (map === null || map === void 0 ? void 0 : map.getZoom()) || 0;
      var mapBounds = zoom > 3 ? new google.maps.LatLngBounds(bounds === null || bounds === void 0 ? void 0 : bounds.getSouthWest(), bounds === null || bounds === void 0 ? void 0 : bounds.getNorthEast()) : new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
      var extendedMapBounds = this.getExtendedBounds(mapBounds);
      var iLast = Math.min(iFirst + this.batchSize, this.markers.length);
      for (var i = iFirst; i < iLast; i++) {
        var marker = this.markers[i];
        if (marker && !marker.isAdded && this.isMarkerInBounds(marker, extendedMapBounds) && (!this.ignoreHidden || this.ignoreHidden && marker.getVisible())) {
          this.addToClosestCluster(marker);
        }
      }
      if (iLast < this.markers.length) {
        this.timerRefStatic = window.setTimeout(function() {
          _this.createClusters(iLast);
        }, 0);
      } else {
        this.timerRefStatic = null;
        google.maps.event.trigger(this, "clusteringend", this);
        for (var _i = 0, _a = this.clusters; _i < _a.length; _i++) {
          var cluster = _a[_i];
          cluster.updateIcon();
        }
      }
    };
    Clusterer2.prototype.extend = function(obj1, obj2) {
      return (function applyExtend(object) {
        for (var property in object.prototype) {
          var prop = property;
          this.prototype[prop] = object.prototype[prop];
        }
        return this;
      }).apply(obj1, [obj2]);
    };
    return Clusterer2;
  }()
);
function ownKeys$c(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$c(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$c(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$c(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$e = {
  onClick: "click",
  onClusteringBegin: "clusteringbegin",
  onClusteringEnd: "clusteringend",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover"
};
var updaterMap$e = {
  averageCenter(instance, averageCenter) {
    instance.setAverageCenter(averageCenter);
  },
  batchSizeIE(instance, batchSizeIE) {
    instance.setBatchSizeIE(batchSizeIE);
  },
  calculator(instance, calculator) {
    instance.setCalculator(calculator);
  },
  clusterClass(instance, clusterClass) {
    instance.setClusterClass(clusterClass);
  },
  enableRetinaIcons(instance, enableRetinaIcons) {
    instance.setEnableRetinaIcons(enableRetinaIcons);
  },
  gridSize(instance, gridSize) {
    instance.setGridSize(gridSize);
  },
  ignoreHidden(instance, ignoreHidden) {
    instance.setIgnoreHidden(ignoreHidden);
  },
  imageExtension(instance, imageExtension) {
    instance.setImageExtension(imageExtension);
  },
  imagePath(instance, imagePath) {
    instance.setImagePath(imagePath);
  },
  imageSizes(instance, imageSizes) {
    instance.setImageSizes(imageSizes);
  },
  maxZoom(instance, maxZoom) {
    instance.setMaxZoom(maxZoom);
  },
  minimumClusterSize(instance, minimumClusterSize) {
    instance.setMinimumClusterSize(minimumClusterSize);
  },
  styles(instance, styles) {
    instance.setStyles(styles);
  },
  title(instance, title) {
    instance.setTitle(title);
  },
  zoomOnClick(instance, zoomOnClick) {
    instance.setZoomOnClick(zoomOnClick);
  }
};
var defaultOptions$4 = {};
function MarkerClustererFunctional(props) {
  var {
    children,
    options,
    averageCenter,
    batchSizeIE,
    calculator,
    clusterClass,
    enableRetinaIcons,
    gridSize,
    ignoreHidden,
    imageExtension,
    imagePath,
    imageSizes,
    maxZoom,
    minimumClusterSize,
    styles,
    title,
    zoomOnClick,
    onClick,
    onClusteringBegin,
    onClusteringEnd,
    onMouseOver,
    onMouseOut,
    onLoad,
    onUnmount
  } = props;
  var [instance, setInstance] = reactExports.useState(null);
  var map = reactExports.useContext(MapContext);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [clusteringBeginListener, setClusteringBeginListener] = reactExports.useState(null);
  var [clusteringEndListener, setClusteringEndListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, eventMap$e.onMouseOut, onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, eventMap$e.onMouseOver, onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, eventMap$e.onClick, onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && onClusteringBegin) {
      if (clusteringBeginListener !== null) {
        google.maps.event.removeListener(clusteringBeginListener);
      }
      setClusteringBeginListener(google.maps.event.addListener(instance, eventMap$e.onClusteringBegin, onClusteringBegin));
    }
  }, [onClusteringBegin]);
  reactExports.useEffect(() => {
    if (instance && onClusteringEnd) {
      if (clusteringEndListener !== null) {
        google.maps.event.removeListener(clusteringEndListener);
      }
      setClusteringBeginListener(google.maps.event.addListener(instance, eventMap$e.onClusteringEnd, onClusteringEnd));
    }
  }, [onClusteringEnd]);
  reactExports.useEffect(() => {
    if (typeof averageCenter !== "undefined" && instance !== null) {
      updaterMap$e.averageCenter(instance, averageCenter);
    }
  }, [instance, averageCenter]);
  reactExports.useEffect(() => {
    if (typeof batchSizeIE !== "undefined" && instance !== null) {
      updaterMap$e.batchSizeIE(instance, batchSizeIE);
    }
  }, [instance, batchSizeIE]);
  reactExports.useEffect(() => {
    if (typeof calculator !== "undefined" && instance !== null) {
      updaterMap$e.calculator(instance, calculator);
    }
  }, [instance, calculator]);
  reactExports.useEffect(() => {
    if (typeof clusterClass !== "undefined" && instance !== null) {
      updaterMap$e.clusterClass(instance, clusterClass);
    }
  }, [instance, clusterClass]);
  reactExports.useEffect(() => {
    if (typeof enableRetinaIcons !== "undefined" && instance !== null) {
      updaterMap$e.enableRetinaIcons(instance, enableRetinaIcons);
    }
  }, [instance, enableRetinaIcons]);
  reactExports.useEffect(() => {
    if (typeof gridSize !== "undefined" && instance !== null) {
      updaterMap$e.gridSize(instance, gridSize);
    }
  }, [instance, gridSize]);
  reactExports.useEffect(() => {
    if (typeof ignoreHidden !== "undefined" && instance !== null) {
      updaterMap$e.ignoreHidden(instance, ignoreHidden);
    }
  }, [instance, ignoreHidden]);
  reactExports.useEffect(() => {
    if (typeof imageExtension !== "undefined" && instance !== null) {
      updaterMap$e.imageExtension(instance, imageExtension);
    }
  }, [instance, imageExtension]);
  reactExports.useEffect(() => {
    if (typeof imagePath !== "undefined" && instance !== null) {
      updaterMap$e.imagePath(instance, imagePath);
    }
  }, [instance, imagePath]);
  reactExports.useEffect(() => {
    if (typeof imageSizes !== "undefined" && instance !== null) {
      updaterMap$e.imageSizes(instance, imageSizes);
    }
  }, [instance, imageSizes]);
  reactExports.useEffect(() => {
    if (typeof maxZoom !== "undefined" && instance !== null) {
      updaterMap$e.maxZoom(instance, maxZoom);
    }
  }, [instance, maxZoom]);
  reactExports.useEffect(() => {
    if (typeof minimumClusterSize !== "undefined" && instance !== null) {
      updaterMap$e.minimumClusterSize(instance, minimumClusterSize);
    }
  }, [instance, minimumClusterSize]);
  reactExports.useEffect(() => {
    if (typeof styles !== "undefined" && instance !== null) {
      updaterMap$e.styles(instance, styles);
    }
  }, [instance, styles]);
  reactExports.useEffect(() => {
    if (typeof title !== "undefined" && instance !== null) {
      updaterMap$e.title(instance, title);
    }
  }, [instance, title]);
  reactExports.useEffect(() => {
    if (typeof zoomOnClick !== "undefined" && instance !== null) {
      updaterMap$e.zoomOnClick(instance, zoomOnClick);
    }
  }, [instance, zoomOnClick]);
  reactExports.useEffect(() => {
    if (!map) return;
    var clustererOptions = _objectSpread$c({}, options || defaultOptions$4);
    var clusterer = new Clusterer(map, [], clustererOptions);
    if (averageCenter) {
      updaterMap$e.averageCenter(clusterer, averageCenter);
    }
    if (batchSizeIE) {
      updaterMap$e.batchSizeIE(clusterer, batchSizeIE);
    }
    if (calculator) {
      updaterMap$e.calculator(clusterer, calculator);
    }
    if (clusterClass) {
      updaterMap$e.clusterClass(clusterer, clusterClass);
    }
    if (enableRetinaIcons) {
      updaterMap$e.enableRetinaIcons(clusterer, enableRetinaIcons);
    }
    if (gridSize) {
      updaterMap$e.gridSize(clusterer, gridSize);
    }
    if (ignoreHidden) {
      updaterMap$e.ignoreHidden(clusterer, ignoreHidden);
    }
    if (imageExtension) {
      updaterMap$e.imageExtension(clusterer, imageExtension);
    }
    if (imagePath) {
      updaterMap$e.imagePath(clusterer, imagePath);
    }
    if (imageSizes) {
      updaterMap$e.imageSizes(clusterer, imageSizes);
    }
    if (maxZoom) {
      updaterMap$e.maxZoom(clusterer, maxZoom);
    }
    if (minimumClusterSize) {
      updaterMap$e.minimumClusterSize(clusterer, minimumClusterSize);
    }
    if (styles) {
      updaterMap$e.styles(clusterer, styles);
    }
    if (title) {
      updaterMap$e.title(clusterer, title);
    }
    if (zoomOnClick) {
      updaterMap$e.zoomOnClick(clusterer, zoomOnClick);
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(clusterer, eventMap$e.onMouseOut, onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(clusterer, eventMap$e.onMouseOver, onMouseOver));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(clusterer, eventMap$e.onClick, onClick));
    }
    if (onClusteringBegin) {
      setClusteringBeginListener(google.maps.event.addListener(clusterer, eventMap$e.onClusteringBegin, onClusteringBegin));
    }
    if (onClusteringEnd) {
      setClusteringEndListener(google.maps.event.addListener(clusterer, eventMap$e.onClusteringEnd, onClusteringEnd));
    }
    setInstance(clusterer);
    if (onLoad) {
      onLoad(clusterer);
    }
    return () => {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (clusteringBeginListener !== null) {
        google.maps.event.removeListener(clusteringBeginListener);
      }
      if (clusteringEndListener !== null) {
        google.maps.event.removeListener(clusteringEndListener);
      }
      if (onUnmount) {
        onUnmount(clusterer);
      }
    };
  }, []);
  return instance !== null ? children(instance) || null : null;
}
reactExports.memo(MarkerClustererFunctional);
class ClustererComponent extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      markerClusterer: null
    });
    _defineProperty(this, "setClustererCallback", () => {
      if (this.state.markerClusterer !== null && this.props.onLoad) {
        this.props.onLoad(this.state.markerClusterer);
      }
    });
  }
  componentDidMount() {
    if (this.context) {
      var markerClusterer = new Clusterer(this.context, [], this.props.options);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$e,
        eventMap: eventMap$e,
        prevProps: {},
        nextProps: this.props,
        instance: markerClusterer
      });
      this.setState(() => {
        return {
          markerClusterer
        };
      }, this.setClustererCallback);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.state.markerClusterer) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$e,
        eventMap: eventMap$e,
        prevProps,
        nextProps: this.props,
        instance: this.state.markerClusterer
      });
    }
  }
  componentWillUnmount() {
    if (this.state.markerClusterer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.markerClusterer);
      }
      unregisterEvents(this.registeredEvents);
      this.state.markerClusterer.setMap(null);
    }
  }
  render() {
    return this.state.markerClusterer !== null ? this.props.children(this.state.markerClusterer) : null;
  }
}
_defineProperty(ClustererComponent, "contextType", MapContext);
function cancelHandler(event) {
  event.cancelBubble = true;
  if (event.stopPropagation) {
    event.stopPropagation();
  }
}
var InfoBox = (
  /** @class */
  function() {
    function InfoBox2(options) {
      if (options === void 0) {
        options = {};
      }
      this.getCloseClickHandler = this.getCloseClickHandler.bind(this);
      this.closeClickHandler = this.closeClickHandler.bind(this);
      this.createInfoBoxDiv = this.createInfoBoxDiv.bind(this);
      this.addClickHandler = this.addClickHandler.bind(this);
      this.getCloseBoxImg = this.getCloseBoxImg.bind(this);
      this.getBoxWidths = this.getBoxWidths.bind(this);
      this.setBoxStyle = this.setBoxStyle.bind(this);
      this.setPosition = this.setPosition.bind(this);
      this.getPosition = this.getPosition.bind(this);
      this.setOptions = this.setOptions.bind(this);
      this.setContent = this.setContent.bind(this);
      this.setVisible = this.setVisible.bind(this);
      this.getContent = this.getContent.bind(this);
      this.getVisible = this.getVisible.bind(this);
      this.setZIndex = this.setZIndex.bind(this);
      this.getZIndex = this.getZIndex.bind(this);
      this.onRemove = this.onRemove.bind(this);
      this.panBox = this.panBox.bind(this);
      this.extend = this.extend.bind(this);
      this.close = this.close.bind(this);
      this.draw = this.draw.bind(this);
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
      this.open = this.open.bind(this);
      this.extend(InfoBox2, google.maps.OverlayView);
      this.content = options.content || "";
      this.disableAutoPan = options.disableAutoPan || false;
      this.maxWidth = options.maxWidth || 0;
      this.pixelOffset = options.pixelOffset || new google.maps.Size(0, 0);
      this.position = options.position || new google.maps.LatLng(0, 0);
      this.zIndex = options.zIndex || null;
      this.boxClass = options.boxClass || "infoBox";
      this.boxStyle = options.boxStyle || {};
      this.closeBoxMargin = options.closeBoxMargin || "2px";
      this.closeBoxURL = options.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif";
      if (options.closeBoxURL === "") {
        this.closeBoxURL = "";
      }
      this.infoBoxClearance = options.infoBoxClearance || new google.maps.Size(1, 1);
      if (typeof options.visible === "undefined") {
        if (typeof options.isHidden === "undefined") {
          options.visible = true;
        } else {
          options.visible = !options.isHidden;
        }
      }
      this.isHidden = !options.visible;
      this.alignBottom = options.alignBottom || false;
      this.pane = options.pane || "floatPane";
      this.enableEventPropagation = options.enableEventPropagation || false;
      this.div = null;
      this.closeListener = null;
      this.moveListener = null;
      this.mapListener = null;
      this.contextListener = null;
      this.eventListeners = null;
      this.fixedWidthSet = null;
    }
    InfoBox2.prototype.createInfoBoxDiv = function() {
      var _this = this;
      var ignoreHandler = function ignoreHandler2(event) {
        event.returnValue = false;
        if (event.preventDefault) {
          event.preventDefault();
        }
        if (!_this.enableEventPropagation) {
          cancelHandler(event);
        }
      };
      if (!this.div) {
        this.div = document.createElement("div");
        this.setBoxStyle();
        if (typeof this.content === "string") {
          this.div.innerHTML = this.getCloseBoxImg() + this.content;
        } else {
          this.div.innerHTML = this.getCloseBoxImg();
          this.div.appendChild(this.content);
        }
        var panes = this.getPanes();
        if (panes !== null) {
          panes[this.pane].appendChild(this.div);
        }
        this.addClickHandler();
        if (this.div.style.width) {
          this.fixedWidthSet = true;
        } else {
          if (this.maxWidth !== 0 && this.div.offsetWidth > this.maxWidth) {
            this.div.style.width = this.maxWidth + "px";
            this.fixedWidthSet = true;
          } else {
            var bw = this.getBoxWidths();
            this.div.style.width = this.div.offsetWidth - bw.left - bw.right + "px";
            this.fixedWidthSet = false;
          }
        }
        this.panBox(this.disableAutoPan);
        if (!this.enableEventPropagation) {
          this.eventListeners = [];
          var events = ["mousedown", "mouseover", "mouseout", "mouseup", "click", "dblclick", "touchstart", "touchend", "touchmove"];
          for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var event_1 = events_1[_i];
            this.eventListeners.push(google.maps.event.addListener(this.div, event_1, cancelHandler));
          }
          this.eventListeners.push(google.maps.event.addListener(this.div, "mouseover", function() {
            if (_this.div) {
              _this.div.style.cursor = "default";
            }
          }));
        }
        this.contextListener = google.maps.event.addListener(this.div, "contextmenu", ignoreHandler);
        google.maps.event.trigger(this, "domready");
      }
    };
    InfoBox2.prototype.getCloseBoxImg = function() {
      var img = "";
      if (this.closeBoxURL !== "") {
        img = '<img alt=""';
        img += ' aria-hidden="true"';
        img += " src='" + this.closeBoxURL + "'";
        img += " align=right";
        img += " style='";
        img += " position: relative;";
        img += " cursor: pointer;";
        img += " margin: " + this.closeBoxMargin + ";";
        img += "'>";
      }
      return img;
    };
    InfoBox2.prototype.addClickHandler = function() {
      this.closeListener = this.div && this.div.firstChild && this.closeBoxURL !== "" ? google.maps.event.addListener(this.div.firstChild, "click", this.getCloseClickHandler()) : null;
    };
    InfoBox2.prototype.closeClickHandler = function(event) {
      event.cancelBubble = true;
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      google.maps.event.trigger(this, "closeclick");
      this.close();
    };
    InfoBox2.prototype.getCloseClickHandler = function() {
      return this.closeClickHandler;
    };
    InfoBox2.prototype.panBox = function(disablePan) {
      if (this.div && !disablePan) {
        var map = this.getMap();
        if (map instanceof google.maps.Map) {
          var xOffset = 0;
          var yOffset = 0;
          var bounds = map.getBounds();
          if (bounds && !bounds.contains(this.position)) {
            map.setCenter(this.position);
          }
          var mapDiv = map.getDiv();
          var mapWidth = mapDiv.offsetWidth;
          var mapHeight = mapDiv.offsetHeight;
          var iwOffsetX = this.pixelOffset.width;
          var iwOffsetY = this.pixelOffset.height;
          var iwWidth = this.div.offsetWidth;
          var iwHeight = this.div.offsetHeight;
          var padX = this.infoBoxClearance.width;
          var padY = this.infoBoxClearance.height;
          var projection = this.getProjection();
          var pixPosition = projection.fromLatLngToContainerPixel(this.position);
          if (pixPosition !== null) {
            if (pixPosition.x < -iwOffsetX + padX) {
              xOffset = pixPosition.x + iwOffsetX - padX;
            } else if (pixPosition.x + iwWidth + iwOffsetX + padX > mapWidth) {
              xOffset = pixPosition.x + iwWidth + iwOffsetX + padX - mapWidth;
            }
            if (this.alignBottom) {
              if (pixPosition.y < -iwOffsetY + padY + iwHeight) {
                yOffset = pixPosition.y + iwOffsetY - padY - iwHeight;
              } else if (pixPosition.y + iwOffsetY + padY > mapHeight) {
                yOffset = pixPosition.y + iwOffsetY + padY - mapHeight;
              }
            } else {
              if (pixPosition.y < -iwOffsetY + padY) {
                yOffset = pixPosition.y + iwOffsetY - padY;
              } else if (pixPosition.y + iwHeight + iwOffsetY + padY > mapHeight) {
                yOffset = pixPosition.y + iwHeight + iwOffsetY + padY - mapHeight;
              }
            }
          }
          if (!(xOffset === 0 && yOffset === 0)) {
            map.panBy(xOffset, yOffset);
          }
        }
      }
    };
    InfoBox2.prototype.setBoxStyle = function() {
      if (this.div) {
        this.div.className = this.boxClass;
        this.div.style.cssText = "";
        var boxStyle = this.boxStyle;
        for (var i in boxStyle) {
          if (Object.prototype.hasOwnProperty.call(boxStyle, i)) {
            this.div.style[i] = boxStyle[i];
          }
        }
        this.div.style.webkitTransform = "translateZ(0)";
        if (typeof this.div.style.opacity !== "undefined" && this.div.style.opacity !== "") {
          var opacity = parseFloat(this.div.style.opacity || "");
          this.div.style.msFilter = '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity * 100 + ')"';
          this.div.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        }
        this.div.style.position = "absolute";
        this.div.style.visibility = "hidden";
        if (this.zIndex !== null) {
          this.div.style.zIndex = this.zIndex + "";
        }
        if (!this.div.style.overflow) {
          this.div.style.overflow = "auto";
        }
      }
    };
    InfoBox2.prototype.getBoxWidths = function() {
      var bw = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      };
      if (!this.div) {
        return bw;
      }
      if (document.defaultView) {
        var ownerDocument = this.div.ownerDocument;
        var computedStyle = ownerDocument && ownerDocument.defaultView ? ownerDocument.defaultView.getComputedStyle(this.div, "") : null;
        if (computedStyle) {
          bw.top = parseInt(computedStyle.borderTopWidth || "", 10) || 0;
          bw.bottom = parseInt(computedStyle.borderBottomWidth || "", 10) || 0;
          bw.left = parseInt(computedStyle.borderLeftWidth || "", 10) || 0;
          bw.right = parseInt(computedStyle.borderRightWidth || "", 10) || 0;
        }
      } else if (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.documentElement.currentStyle
      ) {
        var currentStyle = this.div.currentStyle;
        if (currentStyle) {
          bw.top = parseInt(currentStyle.borderTopWidth || "", 10) || 0;
          bw.bottom = parseInt(currentStyle.borderBottomWidth || "", 10) || 0;
          bw.left = parseInt(currentStyle.borderLeftWidth || "", 10) || 0;
          bw.right = parseInt(currentStyle.borderRightWidth || "", 10) || 0;
        }
      }
      return bw;
    };
    InfoBox2.prototype.onRemove = function() {
      if (this.div && this.div.parentNode) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
      }
    };
    InfoBox2.prototype.draw = function() {
      this.createInfoBoxDiv();
      if (this.div) {
        var projection = this.getProjection();
        var pixPosition = projection.fromLatLngToDivPixel(this.position);
        if (pixPosition !== null) {
          this.div.style.left = pixPosition.x + this.pixelOffset.width + "px";
          if (this.alignBottom) {
            this.div.style.bottom = -(pixPosition.y + this.pixelOffset.height) + "px";
          } else {
            this.div.style.top = pixPosition.y + this.pixelOffset.height + "px";
          }
        }
        if (this.isHidden) {
          this.div.style.visibility = "hidden";
        } else {
          this.div.style.visibility = "visible";
        }
      }
    };
    InfoBox2.prototype.setOptions = function(options) {
      if (options === void 0) {
        options = {};
      }
      if (typeof options.boxClass !== "undefined") {
        this.boxClass = options.boxClass;
        this.setBoxStyle();
      }
      if (typeof options.boxStyle !== "undefined") {
        this.boxStyle = options.boxStyle;
        this.setBoxStyle();
      }
      if (typeof options.content !== "undefined") {
        this.setContent(options.content);
      }
      if (typeof options.disableAutoPan !== "undefined") {
        this.disableAutoPan = options.disableAutoPan;
      }
      if (typeof options.maxWidth !== "undefined") {
        this.maxWidth = options.maxWidth;
      }
      if (typeof options.pixelOffset !== "undefined") {
        this.pixelOffset = options.pixelOffset;
      }
      if (typeof options.alignBottom !== "undefined") {
        this.alignBottom = options.alignBottom;
      }
      if (typeof options.position !== "undefined") {
        this.setPosition(options.position);
      }
      if (typeof options.zIndex !== "undefined") {
        this.setZIndex(options.zIndex);
      }
      if (typeof options.closeBoxMargin !== "undefined") {
        this.closeBoxMargin = options.closeBoxMargin;
      }
      if (typeof options.closeBoxURL !== "undefined") {
        this.closeBoxURL = options.closeBoxURL;
      }
      if (typeof options.infoBoxClearance !== "undefined") {
        this.infoBoxClearance = options.infoBoxClearance;
      }
      if (typeof options.isHidden !== "undefined") {
        this.isHidden = options.isHidden;
      }
      if (typeof options.visible !== "undefined") {
        this.isHidden = !options.visible;
      }
      if (typeof options.enableEventPropagation !== "undefined") {
        this.enableEventPropagation = options.enableEventPropagation;
      }
      if (this.div) {
        this.draw();
      }
    };
    InfoBox2.prototype.setContent = function(content) {
      this.content = content;
      if (this.div) {
        if (this.closeListener) {
          google.maps.event.removeListener(this.closeListener);
          this.closeListener = null;
        }
        if (!this.fixedWidthSet) {
          this.div.style.width = "";
        }
        if (typeof content === "string") {
          this.div.innerHTML = this.getCloseBoxImg() + content;
        } else {
          this.div.innerHTML = this.getCloseBoxImg();
          this.div.appendChild(content);
        }
        if (!this.fixedWidthSet) {
          this.div.style.width = this.div.offsetWidth + "px";
          if (typeof content === "string") {
            this.div.innerHTML = this.getCloseBoxImg() + content;
          } else {
            this.div.innerHTML = this.getCloseBoxImg();
            this.div.appendChild(content);
          }
        }
        this.addClickHandler();
      }
      google.maps.event.trigger(this, "content_changed");
    };
    InfoBox2.prototype.setPosition = function(latLng) {
      this.position = latLng;
      if (this.div) {
        this.draw();
      }
      google.maps.event.trigger(this, "position_changed");
    };
    InfoBox2.prototype.setVisible = function(isVisible) {
      this.isHidden = !isVisible;
      if (this.div) {
        this.div.style.visibility = this.isHidden ? "hidden" : "visible";
      }
    };
    InfoBox2.prototype.setZIndex = function(index) {
      this.zIndex = index;
      if (this.div) {
        this.div.style.zIndex = index + "";
      }
      google.maps.event.trigger(this, "zindex_changed");
    };
    InfoBox2.prototype.getContent = function() {
      return this.content;
    };
    InfoBox2.prototype.getPosition = function() {
      return this.position;
    };
    InfoBox2.prototype.getZIndex = function() {
      return this.zIndex;
    };
    InfoBox2.prototype.getVisible = function() {
      var map = this.getMap();
      return typeof map === "undefined" || map === null ? false : !this.isHidden;
    };
    InfoBox2.prototype.show = function() {
      this.isHidden = false;
      if (this.div) {
        this.div.style.visibility = "visible";
      }
    };
    InfoBox2.prototype.hide = function() {
      this.isHidden = true;
      if (this.div) {
        this.div.style.visibility = "hidden";
      }
    };
    InfoBox2.prototype.open = function(map, anchor) {
      var _this = this;
      if (anchor) {
        this.position = anchor.getPosition();
        this.moveListener = google.maps.event.addListener(anchor, "position_changed", function() {
          var position = anchor.getPosition();
          _this.setPosition(position);
        });
        this.mapListener = google.maps.event.addListener(anchor, "map_changed", function() {
          _this.setMap(anchor.map);
        });
      }
      this.setMap(map);
      if (this.div) {
        this.panBox();
      }
    };
    InfoBox2.prototype.close = function() {
      if (this.closeListener) {
        google.maps.event.removeListener(this.closeListener);
        this.closeListener = null;
      }
      if (this.eventListeners) {
        for (var _i = 0, _a = this.eventListeners; _i < _a.length; _i++) {
          var eventListener = _a[_i];
          google.maps.event.removeListener(eventListener);
        }
        this.eventListeners = null;
      }
      if (this.moveListener) {
        google.maps.event.removeListener(this.moveListener);
        this.moveListener = null;
      }
      if (this.mapListener) {
        google.maps.event.removeListener(this.mapListener);
        this.mapListener = null;
      }
      if (this.contextListener) {
        google.maps.event.removeListener(this.contextListener);
        this.contextListener = null;
      }
      this.setMap(null);
    };
    InfoBox2.prototype.extend = function(obj1, obj2) {
      return (function applyExtend(object) {
        for (var property in object.prototype) {
          if (!Object.prototype.hasOwnProperty.call(this, property)) {
            this.prototype[property] = object.prototype[property];
          }
        }
        return this;
      }).apply(obj1, [obj2]);
    };
    return InfoBox2;
  }()
);
var _excluded = ["position"], _excluded2 = ["position"];
function ownKeys$b(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$b(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$b(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$b(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$d = {
  onCloseClick: "closeclick",
  onContentChanged: "content_changed",
  onDomReady: "domready",
  onPositionChanged: "position_changed",
  onZindexChanged: "zindex_changed"
};
var updaterMap$d = {
  options(instance, options) {
    instance.setOptions(options);
  },
  position(instance, position) {
    if (position instanceof google.maps.LatLng) {
      instance.setPosition(position);
    } else {
      instance.setPosition(new google.maps.LatLng(position.lat, position.lng));
    }
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  },
  zIndex(instance, zIndex) {
    instance.setZIndex(zIndex);
  }
};
var defaultOptions$3 = {};
function InfoBoxFunctional(_ref) {
  var {
    children,
    anchor,
    options,
    position,
    zIndex,
    onCloseClick,
    onDomReady,
    onContentChanged,
    onPositionChanged,
    onZindexChanged,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [closeClickListener, setCloseClickListener] = reactExports.useState(null);
  var [domReadyClickListener, setDomReadyClickListener] = reactExports.useState(null);
  var [contentChangedClickListener, setContentChangedClickListener] = reactExports.useState(null);
  var [positionChangedClickListener, setPositionChangedClickListener] = reactExports.useState(null);
  var [zIndexChangedClickListener, setZindexChangedClickListener] = reactExports.useState(null);
  var containerElementRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (map && instance !== null) {
      instance.close();
      if (anchor) {
        instance.open(map, anchor);
      } else if (instance.getPosition()) {
        instance.open(map);
      }
    }
  }, [map, instance, anchor]);
  reactExports.useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (position && instance !== null) {
      var positionLatLng = position instanceof google.maps.LatLng ? position : (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        new google.maps.LatLng(position.lat, position.lng)
      );
      instance.setPosition(positionLatLng);
    }
  }, [position]);
  reactExports.useEffect(() => {
    if (typeof zIndex === "number" && instance !== null) {
      instance.setZIndex(zIndex);
    }
  }, [zIndex]);
  reactExports.useEffect(() => {
    if (instance && onCloseClick) {
      if (closeClickListener !== null) {
        google.maps.event.removeListener(closeClickListener);
      }
      setCloseClickListener(google.maps.event.addListener(instance, "closeclick", onCloseClick));
    }
  }, [onCloseClick]);
  reactExports.useEffect(() => {
    if (instance && onDomReady) {
      if (domReadyClickListener !== null) {
        google.maps.event.removeListener(domReadyClickListener);
      }
      setDomReadyClickListener(google.maps.event.addListener(instance, "domready", onDomReady));
    }
  }, [onDomReady]);
  reactExports.useEffect(() => {
    if (instance && onContentChanged) {
      if (contentChangedClickListener !== null) {
        google.maps.event.removeListener(contentChangedClickListener);
      }
      setContentChangedClickListener(google.maps.event.addListener(instance, "content_changed", onContentChanged));
    }
  }, [onContentChanged]);
  reactExports.useEffect(() => {
    if (instance && onPositionChanged) {
      if (positionChangedClickListener !== null) {
        google.maps.event.removeListener(positionChangedClickListener);
      }
      setPositionChangedClickListener(google.maps.event.addListener(instance, "position_changed", onPositionChanged));
    }
  }, [onPositionChanged]);
  reactExports.useEffect(() => {
    if (instance && onZindexChanged) {
      if (zIndexChangedClickListener !== null) {
        google.maps.event.removeListener(zIndexChangedClickListener);
      }
      setZindexChangedClickListener(google.maps.event.addListener(instance, "zindex_changed", onZindexChanged));
    }
  }, [onZindexChanged]);
  reactExports.useEffect(() => {
    if (map) {
      var _ref2 = options || defaultOptions$3, {
        position: _position
      } = _ref2, infoBoxOptions = _objectWithoutProperties(_ref2, _excluded);
      var positionLatLng;
      if (_position && !(_position instanceof google.maps.LatLng)) {
        positionLatLng = new google.maps.LatLng(_position.lat, _position.lng);
      }
      var infoBox = new InfoBox(_objectSpread$b(_objectSpread$b({}, infoBoxOptions), positionLatLng ? {
        position: positionLatLng
      } : {}));
      containerElementRef.current = document.createElement("div");
      setInstance(infoBox);
      if (onCloseClick) {
        setCloseClickListener(google.maps.event.addListener(infoBox, "closeclick", onCloseClick));
      }
      if (onDomReady) {
        setDomReadyClickListener(google.maps.event.addListener(infoBox, "domready", onDomReady));
      }
      if (onContentChanged) {
        setContentChangedClickListener(google.maps.event.addListener(infoBox, "content_changed", onContentChanged));
      }
      if (onPositionChanged) {
        setPositionChangedClickListener(google.maps.event.addListener(infoBox, "position_changed", onPositionChanged));
      }
      if (onZindexChanged) {
        setZindexChangedClickListener(google.maps.event.addListener(infoBox, "zindex_changed", onZindexChanged));
      }
      infoBox.setContent(containerElementRef.current);
      if (anchor) {
        infoBox.open(map, anchor);
      } else if (infoBox.getPosition()) {
        infoBox.open(map);
      } else {
        invariant(false, "You must provide either an anchor or a position prop for <InfoBox>.");
      }
      if (onLoad) {
        onLoad(infoBox);
      }
    }
    return () => {
      if (instance !== null) {
        if (closeClickListener) {
          google.maps.event.removeListener(closeClickListener);
        }
        if (contentChangedClickListener) {
          google.maps.event.removeListener(contentChangedClickListener);
        }
        if (domReadyClickListener) {
          google.maps.event.removeListener(domReadyClickListener);
        }
        if (positionChangedClickListener) {
          google.maps.event.removeListener(positionChangedClickListener);
        }
        if (zIndexChangedClickListener) {
          google.maps.event.removeListener(zIndexChangedClickListener);
        }
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.close();
      }
    };
  }, []);
  return containerElementRef.current ? reactDomExports.createPortal(reactExports.Children.only(children), containerElementRef.current) : null;
}
reactExports.memo(InfoBoxFunctional);
class InfoBoxComponent extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "containerElement", null);
    _defineProperty(this, "state", {
      infoBox: null
    });
    _defineProperty(this, "open", (infoBox, anchor) => {
      if (anchor) {
        if (this.context !== null) {
          infoBox.open(this.context, anchor);
        }
      } else if (infoBox.getPosition()) {
        if (this.context !== null) {
          infoBox.open(this.context);
        }
      } else {
        invariant(false, "You must provide either an anchor or a position prop for <InfoBox>.");
      }
    });
    _defineProperty(this, "setInfoBoxCallback", () => {
      if (this.state.infoBox !== null && this.containerElement !== null) {
        this.state.infoBox.setContent(this.containerElement);
        this.open(this.state.infoBox, this.props.anchor);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.infoBox);
        }
      }
    });
  }
  componentDidMount() {
    var _ref3 = this.props.options || {}, {
      position
    } = _ref3, infoBoxOptions = _objectWithoutProperties(_ref3, _excluded2);
    var positionLatLng;
    if (position && !(position instanceof google.maps.LatLng)) {
      positionLatLng = new google.maps.LatLng(position.lat, position.lng);
    }
    var infoBox = new InfoBox(_objectSpread$b(_objectSpread$b({}, infoBoxOptions), positionLatLng ? {
      position: positionLatLng
    } : {}));
    this.containerElement = document.createElement("div");
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$d,
      eventMap: eventMap$d,
      prevProps: {},
      nextProps: this.props,
      instance: infoBox
    });
    this.setState({
      infoBox
    }, this.setInfoBoxCallback);
  }
  componentDidUpdate(prevProps) {
    var {
      infoBox
    } = this.state;
    if (infoBox !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$d,
        eventMap: eventMap$d,
        prevProps,
        nextProps: this.props,
        instance: infoBox
      });
    }
  }
  componentWillUnmount() {
    var {
      onUnmount
    } = this.props;
    var {
      infoBox
    } = this.state;
    if (infoBox !== null) {
      if (onUnmount) {
        onUnmount(infoBox);
      }
      unregisterEvents(this.registeredEvents);
      infoBox.close();
    }
  }
  render() {
    return this.containerElement ? reactDomExports.createPortal(reactExports.Children.only(this.props.children), this.containerElement) : null;
  }
}
_defineProperty(InfoBoxComponent, "contextType", MapContext);
var fastDeepEqual;
var hasRequiredFastDeepEqual;
function requireFastDeepEqual() {
  if (hasRequiredFastDeepEqual) return fastDeepEqual;
  hasRequiredFastDeepEqual = 1;
  fastDeepEqual = function equal2(a, b) {
    if (a === b) return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
      if (a.constructor !== b.constructor) return false;
      var length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0; ) if (!equal2(a[i], b[i])) return false;
        return true;
      }
      if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;
      for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
      for (i = length; i-- !== 0; ) {
        var key = keys[i];
        if (!equal2(a[key], b[key])) return false;
      }
      return true;
    }
    return a !== a && b !== b;
  };
  return fastDeepEqual;
}
var fastDeepEqualExports = requireFastDeepEqual();
var equal = /* @__PURE__ */ getDefaultExportFromCjs$1(fastDeepEqualExports);
var ARRAY_TYPES = [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
var VERSION = 1;
var HEADER_SIZE = 8;
class KDBush {
  /**
   * Creates an index from raw `ArrayBuffer` data.
   * @param {ArrayBuffer} data
   */
  static from(data) {
    if (!(data instanceof ArrayBuffer)) {
      throw new Error("Data must be an instance of ArrayBuffer.");
    }
    var [magic, versionAndType] = new Uint8Array(data, 0, 2);
    if (magic !== 219) {
      throw new Error("Data does not appear to be in a KDBush format.");
    }
    var version = versionAndType >> 4;
    if (version !== VERSION) {
      throw new Error("Got v".concat(version, " data when expected v").concat(VERSION, "."));
    }
    var ArrayType = ARRAY_TYPES[versionAndType & 15];
    if (!ArrayType) {
      throw new Error("Unrecognized array type.");
    }
    var [nodeSize] = new Uint16Array(data, 2, 1);
    var [numItems] = new Uint32Array(data, 4, 1);
    return new KDBush(numItems, nodeSize, ArrayType, data);
  }
  /**
   * Creates an index that will hold a given number of items.
   * @param {number} numItems
   * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
   * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
   * @param {ArrayBuffer} [data] (For internal use only)
   */
  constructor(numItems) {
    var nodeSize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 64;
    var ArrayType = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Float64Array;
    var data = arguments.length > 3 ? arguments[3] : void 0;
    if (isNaN(numItems) || numItems < 0) throw new Error("Unpexpected numItems value: ".concat(numItems, "."));
    this.numItems = +numItems;
    this.nodeSize = Math.min(Math.max(+nodeSize, 2), 65535);
    this.ArrayType = ArrayType;
    this.IndexArrayType = numItems < 65536 ? Uint16Array : Uint32Array;
    var arrayTypeIndex = ARRAY_TYPES.indexOf(this.ArrayType);
    var coordsByteSize = numItems * 2 * this.ArrayType.BYTES_PER_ELEMENT;
    var idsByteSize = numItems * this.IndexArrayType.BYTES_PER_ELEMENT;
    var padCoords = (8 - idsByteSize % 8) % 8;
    if (arrayTypeIndex < 0) {
      throw new Error("Unexpected typed array class: ".concat(ArrayType, "."));
    }
    if (data && data instanceof ArrayBuffer) {
      this.data = data;
      this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
      this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
      this._pos = numItems * 2;
      this._finished = true;
    } else {
      this.data = new ArrayBuffer(HEADER_SIZE + coordsByteSize + idsByteSize + padCoords);
      this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
      this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
      this._pos = 0;
      this._finished = false;
      new Uint8Array(this.data, 0, 2).set([219, (VERSION << 4) + arrayTypeIndex]);
      new Uint16Array(this.data, 2, 1)[0] = nodeSize;
      new Uint32Array(this.data, 4, 1)[0] = numItems;
    }
  }
  /**
   * Add a point to the index.
   * @param {number} x
   * @param {number} y
   * @returns {number} An incremental index associated with the added item (starting from `0`).
   */
  add(x, y) {
    var index = this._pos >> 1;
    this.ids[index] = index;
    this.coords[this._pos++] = x;
    this.coords[this._pos++] = y;
    return index;
  }
  /**
   * Perform indexing of the added points.
   */
  finish() {
    var numAdded = this._pos >> 1;
    if (numAdded !== this.numItems) {
      throw new Error("Added ".concat(numAdded, " items when expected ").concat(this.numItems, "."));
    }
    sort(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0);
    this._finished = true;
    return this;
  }
  /**
   * Search the index for items within a given bounding box.
   * @param {number} minX
   * @param {number} minY
   * @param {number} maxX
   * @param {number} maxY
   * @returns {number[]} An array of indices correponding to the found items.
   */
  range(minX, minY, maxX, maxY) {
    if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
    var {
      ids,
      coords,
      nodeSize
    } = this;
    var stack = [0, ids.length - 1, 0];
    var result2 = [];
    while (stack.length) {
      var axis = stack.pop() || 0;
      var right = stack.pop() || 0;
      var left = stack.pop() || 0;
      if (right - left <= nodeSize) {
        for (var i = left; i <= right; i++) {
          var _x = coords[2 * i];
          var _y = coords[2 * i + 1];
          if (_x >= minX && _x <= maxX && _y >= minY && _y <= maxY) result2.push(ids[i]);
        }
        continue;
      }
      var m = left + right >> 1;
      var x = coords[2 * m];
      var y = coords[2 * m + 1];
      if (x >= minX && x <= maxX && y >= minY && y <= maxY) result2.push(ids[m]);
      if (axis === 0 ? minX <= x : minY <= y) {
        stack.push(left);
        stack.push(m - 1);
        stack.push(1 - axis);
      }
      if (axis === 0 ? maxX >= x : maxY >= y) {
        stack.push(m + 1);
        stack.push(right);
        stack.push(1 - axis);
      }
    }
    return result2;
  }
  /**
   * Search the index for items within a given radius.
   * @param {number} qx
   * @param {number} qy
   * @param {number} r Query radius.
   * @returns {number[]} An array of indices correponding to the found items.
   */
  within(qx, qy, r) {
    if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
    var {
      ids,
      coords,
      nodeSize
    } = this;
    var stack = [0, ids.length - 1, 0];
    var result2 = [];
    var r2 = r * r;
    while (stack.length) {
      var axis = stack.pop() || 0;
      var right = stack.pop() || 0;
      var left = stack.pop() || 0;
      if (right - left <= nodeSize) {
        for (var i = left; i <= right; i++) {
          if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result2.push(ids[i]);
        }
        continue;
      }
      var m = left + right >> 1;
      var x = coords[2 * m];
      var y = coords[2 * m + 1];
      if (sqDist(x, y, qx, qy) <= r2) result2.push(ids[m]);
      if (axis === 0 ? qx - r <= x : qy - r <= y) {
        stack.push(left);
        stack.push(m - 1);
        stack.push(1 - axis);
      }
      if (axis === 0 ? qx + r >= x : qy + r >= y) {
        stack.push(m + 1);
        stack.push(right);
        stack.push(1 - axis);
      }
    }
    return result2;
  }
}
function sort(ids, coords, nodeSize, left, right, axis) {
  if (right - left <= nodeSize) return;
  var m = left + right >> 1;
  select(ids, coords, m, left, right, axis);
  sort(ids, coords, nodeSize, left, m - 1, 1 - axis);
  sort(ids, coords, nodeSize, m + 1, right, 1 - axis);
}
function select(ids, coords, k, left, right, axis) {
  while (right > left) {
    if (right - left > 600) {
      var n = right - left + 1;
      var m = k - left + 1;
      var z = Math.log(n);
      var s = 0.5 * Math.exp(2 * z / 3);
      var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
      var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
      var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      select(ids, coords, k, newLeft, newRight, axis);
    }
    var t = coords[2 * k + axis];
    var i = left;
    var j = right;
    swapItem(ids, coords, left, k);
    if (coords[2 * right + axis] > t) swapItem(ids, coords, left, right);
    while (i < j) {
      swapItem(ids, coords, i, j);
      i++;
      j--;
      while (coords[2 * i + axis] < t) i++;
      while (coords[2 * j + axis] > t) j--;
    }
    if (coords[2 * left + axis] === t) swapItem(ids, coords, left, j);
    else {
      j++;
      swapItem(ids, coords, j, right);
    }
    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }
}
function swapItem(ids, coords, i, j) {
  swap(ids, i, j);
  swap(coords, 2 * i, 2 * j);
  swap(coords, 2 * i + 1, 2 * j + 1);
}
function swap(arr, i, j) {
  var tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
function sqDist(ax, ay, bx, by) {
  var dx = ax - bx;
  var dy = ay - by;
  return dx * dx + dy * dy;
}
var defaultOptions$2 = {
  minZoom: 0,
  // min zoom to generate clusters on
  maxZoom: 16,
  // max zoom level to cluster the points on
  minPoints: 2,
  // minimum points to form a cluster
  radius: 40,
  // cluster radius in pixels
  extent: 512,
  // tile extent (radius is calculated relative to it)
  nodeSize: 64,
  // size of the KD-tree leaf node, affects performance
  log: false,
  // whether to log timing info
  // whether to generate numeric ids for input features (in vector tiles)
  generateId: false,
  // a reduce function for calculating custom cluster properties
  reduce: null,
  // (accumulated, props) => { accumulated.sum += props.sum; }
  // properties to use for individual points when running the reducer
  map: (props) => props
  // props => ({sum: props.my_value})
};
var fround = Math.fround || /* @__PURE__ */ ((tmp) => (x) => {
  tmp[0] = +x;
  return tmp[0];
})(new Float32Array(1));
var OFFSET_ZOOM = 2;
var OFFSET_ID = 3;
var OFFSET_PARENT = 4;
var OFFSET_NUM = 5;
var OFFSET_PROP = 6;
class Supercluster {
  constructor(options) {
    this.options = Object.assign(Object.create(defaultOptions$2), options);
    this.trees = new Array(this.options.maxZoom + 1);
    this.stride = this.options.reduce ? 7 : 6;
    this.clusterProps = [];
  }
  load(points) {
    var {
      log,
      minZoom,
      maxZoom
    } = this.options;
    if (log) console.time("total time");
    var timerId = "prepare ".concat(points.length, " points");
    if (log) console.time(timerId);
    this.points = points;
    var data = [];
    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      if (!p.geometry) continue;
      var [lng, lat] = p.geometry.coordinates;
      var x = fround(lngX(lng));
      var y = fround(latY(lat));
      data.push(
        x,
        y,
        // projected point coordinates
        Infinity,
        // the last zoom the point was processed at
        i,
        // index of the source feature in the original input array
        -1,
        // parent cluster id
        1
        // number of points in a cluster
      );
      if (this.options.reduce) data.push(0);
    }
    var tree = this.trees[maxZoom + 1] = this._createTree(data);
    if (log) console.timeEnd(timerId);
    for (var z = maxZoom; z >= minZoom; z--) {
      var now = +Date.now();
      tree = this.trees[z] = this._createTree(this._cluster(tree, z));
      if (log) console.log("z%d: %d clusters in %dms", z, tree.numItems, +Date.now() - now);
    }
    if (log) console.timeEnd("total time");
    return this;
  }
  getClusters(bbox, zoom) {
    var minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
    var minLat = Math.max(-90, Math.min(90, bbox[1]));
    var maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
    var maxLat = Math.max(-90, Math.min(90, bbox[3]));
    if (bbox[2] - bbox[0] >= 360) {
      minLng = -180;
      maxLng = 180;
    } else if (minLng > maxLng) {
      var easternHem = this.getClusters([minLng, minLat, 180, maxLat], zoom);
      var westernHem = this.getClusters([-180, minLat, maxLng, maxLat], zoom);
      return easternHem.concat(westernHem);
    }
    var tree = this.trees[this._limitZoom(zoom)];
    var ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
    var data = tree.data;
    var clusters = [];
    for (var id of ids) {
      var k = this.stride * id;
      clusters.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
    }
    return clusters;
  }
  getChildren(clusterId) {
    var originId = this._getOriginId(clusterId);
    var originZoom = this._getOriginZoom(clusterId);
    var errorMsg = "No cluster with the specified id.";
    var tree = this.trees[originZoom];
    if (!tree) throw new Error(errorMsg);
    var data = tree.data;
    if (originId * this.stride >= data.length) throw new Error(errorMsg);
    var r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
    var x = data[originId * this.stride];
    var y = data[originId * this.stride + 1];
    var ids = tree.within(x, y, r);
    var children = [];
    for (var id of ids) {
      var k = id * this.stride;
      if (data[k + OFFSET_PARENT] === clusterId) {
        children.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
      }
    }
    if (children.length === 0) throw new Error(errorMsg);
    return children;
  }
  getLeaves(clusterId, limit, offset) {
    limit = limit || 10;
    offset = offset || 0;
    var leaves = [];
    this._appendLeaves(leaves, clusterId, limit, offset, 0);
    return leaves;
  }
  getTile(z, x, y) {
    var tree = this.trees[this._limitZoom(z)];
    var z2 = Math.pow(2, z);
    var {
      extent,
      radius
    } = this.options;
    var p = radius / extent;
    var top = (y - p) / z2;
    var bottom = (y + 1 + p) / z2;
    var tile = {
      features: []
    };
    this._addTileFeatures(tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom), tree.data, x, y, z2, tile);
    if (x === 0) {
      this._addTileFeatures(tree.range(1 - p / z2, top, 1, bottom), tree.data, z2, y, z2, tile);
    }
    if (x === z2 - 1) {
      this._addTileFeatures(tree.range(0, top, p / z2, bottom), tree.data, -1, y, z2, tile);
    }
    return tile.features.length ? tile : null;
  }
  getClusterExpansionZoom(clusterId) {
    var expansionZoom = this._getOriginZoom(clusterId) - 1;
    while (expansionZoom <= this.options.maxZoom) {
      var children = this.getChildren(clusterId);
      expansionZoom++;
      if (children.length !== 1) break;
      clusterId = children[0].properties.cluster_id;
    }
    return expansionZoom;
  }
  _appendLeaves(result2, clusterId, limit, offset, skipped) {
    var children = this.getChildren(clusterId);
    for (var child of children) {
      var props = child.properties;
      if (props && props.cluster) {
        if (skipped + props.point_count <= offset) {
          skipped += props.point_count;
        } else {
          skipped = this._appendLeaves(result2, props.cluster_id, limit, offset, skipped);
        }
      } else if (skipped < offset) {
        skipped++;
      } else {
        result2.push(child);
      }
      if (result2.length === limit) break;
    }
    return skipped;
  }
  _createTree(data) {
    var tree = new KDBush(data.length / this.stride | 0, this.options.nodeSize, Float32Array);
    for (var i = 0; i < data.length; i += this.stride) tree.add(data[i], data[i + 1]);
    tree.finish();
    tree.data = data;
    return tree;
  }
  _addTileFeatures(ids, data, x, y, z2, tile) {
    for (var i of ids) {
      var k = i * this.stride;
      var isCluster = data[k + OFFSET_NUM] > 1;
      var tags = void 0, px = void 0, py = void 0;
      if (isCluster) {
        tags = getClusterProperties(data, k, this.clusterProps);
        px = data[k];
        py = data[k + 1];
      } else {
        var p = this.points[data[k + OFFSET_ID]];
        tags = p.properties;
        var [lng, lat] = p.geometry.coordinates;
        px = lngX(lng);
        py = latY(lat);
      }
      var f = {
        type: 1,
        geometry: [[Math.round(this.options.extent * (px * z2 - x)), Math.round(this.options.extent * (py * z2 - y))]],
        tags
      };
      var id = void 0;
      if (isCluster || this.options.generateId) {
        id = data[k + OFFSET_ID];
      } else {
        id = this.points[data[k + OFFSET_ID]].id;
      }
      if (id !== void 0) f.id = id;
      tile.features.push(f);
    }
  }
  _limitZoom(z) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+z), this.options.maxZoom + 1));
  }
  _cluster(tree, zoom) {
    var {
      radius,
      extent,
      reduce: reduce2,
      minPoints
    } = this.options;
    var r = radius / (extent * Math.pow(2, zoom));
    var data = tree.data;
    var nextData = [];
    var stride = this.stride;
    for (var i = 0; i < data.length; i += stride) {
      if (data[i + OFFSET_ZOOM] <= zoom) continue;
      data[i + OFFSET_ZOOM] = zoom;
      var x = data[i];
      var y = data[i + 1];
      var neighborIds = tree.within(data[i], data[i + 1], r);
      var numPointsOrigin = data[i + OFFSET_NUM];
      var numPoints = numPointsOrigin;
      for (var neighborId of neighborIds) {
        var k = neighborId * stride;
        if (data[k + OFFSET_ZOOM] > zoom) numPoints += data[k + OFFSET_NUM];
      }
      if (numPoints > numPointsOrigin && numPoints >= minPoints) {
        var wx = x * numPointsOrigin;
        var wy = y * numPointsOrigin;
        var clusterProperties = void 0;
        var clusterPropIndex = -1;
        var id = ((i / stride | 0) << 5) + (zoom + 1) + this.points.length;
        for (var _neighborId of neighborIds) {
          var _k = _neighborId * stride;
          if (data[_k + OFFSET_ZOOM] <= zoom) continue;
          data[_k + OFFSET_ZOOM] = zoom;
          var numPoints2 = data[_k + OFFSET_NUM];
          wx += data[_k] * numPoints2;
          wy += data[_k + 1] * numPoints2;
          data[_k + OFFSET_PARENT] = id;
          if (reduce2) {
            if (!clusterProperties) {
              clusterProperties = this._map(data, i, true);
              clusterPropIndex = this.clusterProps.length;
              this.clusterProps.push(clusterProperties);
            }
            reduce2(clusterProperties, this._map(data, _k));
          }
        }
        data[i + OFFSET_PARENT] = id;
        nextData.push(wx / numPoints, wy / numPoints, Infinity, id, -1, numPoints);
        if (reduce2) nextData.push(clusterPropIndex);
      } else {
        for (var j = 0; j < stride; j++) nextData.push(data[i + j]);
        if (numPoints > 1) {
          for (var _neighborId2 of neighborIds) {
            var _k2 = _neighborId2 * stride;
            if (data[_k2 + OFFSET_ZOOM] <= zoom) continue;
            data[_k2 + OFFSET_ZOOM] = zoom;
            for (var _j = 0; _j < stride; _j++) nextData.push(data[_k2 + _j]);
          }
        }
      }
    }
    return nextData;
  }
  // get index of the point from which the cluster originated
  _getOriginId(clusterId) {
    return clusterId - this.points.length >> 5;
  }
  // get zoom of the point from which the cluster originated
  _getOriginZoom(clusterId) {
    return (clusterId - this.points.length) % 32;
  }
  _map(data, i, clone) {
    if (data[i + OFFSET_NUM] > 1) {
      var props = this.clusterProps[data[i + OFFSET_PROP]];
      return clone ? Object.assign({}, props) : props;
    }
    var original = this.points[data[i + OFFSET_ID]].properties;
    var result2 = this.options.map(original);
    return clone && result2 === original ? Object.assign({}, result2) : result2;
  }
}
function getClusterJSON(data, i, clusterProps) {
  return {
    type: "Feature",
    id: data[i + OFFSET_ID],
    properties: getClusterProperties(data, i, clusterProps),
    geometry: {
      type: "Point",
      coordinates: [xLng(data[i]), yLat(data[i + 1])]
    }
  };
}
function getClusterProperties(data, i, clusterProps) {
  var count = data[i + OFFSET_NUM];
  var abbrev = count >= 1e4 ? "".concat(Math.round(count / 1e3), "k") : count >= 1e3 ? "".concat(Math.round(count / 100) / 10, "k") : count;
  var propIndex = data[i + OFFSET_PROP];
  var properties = propIndex === -1 ? {} : Object.assign({}, clusterProps[propIndex]);
  return Object.assign(properties, {
    cluster: true,
    cluster_id: data[i + OFFSET_ID],
    point_count: count,
    point_count_abbreviated: abbrev
  });
}
function lngX(lng) {
  return lng / 360 + 0.5;
}
function latY(lat) {
  var sin = Math.sin(lat * Math.PI / 180);
  var y = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;
  return y < 0 ? 0 : y > 1 ? 1 : y;
}
function xLng(x) {
  return (x - 0.5) * 360;
}
function yLat(y) {
  var y2 = (180 - y * 360) * Math.PI / 180;
  return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
class MarkerUtils {
  static isAdvancedMarkerAvailable(map) {
    return google.maps.marker && map.getMapCapabilities().isAdvancedMarkersAvailable === true;
  }
  static isAdvancedMarker(marker) {
    return google.maps.marker && marker instanceof google.maps.marker.AdvancedMarkerElement;
  }
  static setMap(marker, map) {
    if (this.isAdvancedMarker(marker)) {
      marker.map = map;
    } else {
      marker.setMap(map);
    }
  }
  static getPosition(marker) {
    if (this.isAdvancedMarker(marker)) {
      if (marker.position) {
        if (marker.position instanceof google.maps.LatLng) {
          return marker.position;
        }
        if (marker.position.lat && marker.position.lng) {
          return new google.maps.LatLng(marker.position.lat, marker.position.lng);
        }
      }
      return new google.maps.LatLng(null);
    }
    return marker.getPosition();
  }
  static getVisible(marker) {
    if (this.isAdvancedMarker(marker)) {
      return true;
    }
    return marker.getVisible();
  }
}
class Cluster {
  constructor(_ref) {
    var {
      markers,
      position
    } = _ref;
    this.markers = markers;
    if (position) {
      if (position instanceof google.maps.LatLng) {
        this._position = position;
      } else {
        this._position = new google.maps.LatLng(position);
      }
    }
  }
  get bounds() {
    if (this.markers.length === 0 && !this._position) {
      return;
    }
    var bounds = new google.maps.LatLngBounds(this._position, this._position);
    for (var marker of this.markers) {
      bounds.extend(MarkerUtils.getPosition(marker));
    }
    return bounds;
  }
  get position() {
    return this._position || this.bounds.getCenter();
  }
  /**
   * Get the count of **visible** markers.
   */
  get count() {
    return this.markers.filter((m) => MarkerUtils.getVisible(m)).length;
  }
  /**
   * Add a marker to the cluster.
   */
  push(marker) {
    this.markers.push(marker);
  }
  /**
   * Cleanup references and remove marker from map.
   */
  delete() {
    if (this.marker) {
      MarkerUtils.setMap(this.marker, null);
      this.marker = void 0;
    }
    this.markers.length = 0;
  }
}
class AbstractAlgorithm {
  constructor(_ref4) {
    var {
      maxZoom = 16
    } = _ref4;
    this.maxZoom = maxZoom;
  }
  /**
   * Helper function to bypass clustering based upon some map state such as
   * zoom, number of markers, etc.
   *
   * ```typescript
   *  cluster({markers, map}: AlgorithmInput): Cluster[] {
   *    if (shouldBypassClustering(map)) {
   *      return this.noop({markers})
   *    }
   * }
   * ```
   */
  noop(_ref5) {
    var {
      markers
    } = _ref5;
    return noop$1(markers);
  }
}
var noop$1 = (markers) => {
  var clusters = markers.map((marker) => new Cluster({
    position: MarkerUtils.getPosition(marker),
    markers: [marker]
  }));
  return clusters;
};
class SuperClusterAlgorithm extends AbstractAlgorithm {
  constructor(_a) {
    var {
      maxZoom,
      radius = 60
    } = _a, options = __rest(_a, ["maxZoom", "radius"]);
    super({
      maxZoom
    });
    this.state = {
      zoom: -1
    };
    this.superCluster = new Supercluster(Object.assign({
      maxZoom: this.maxZoom,
      radius
    }, options));
  }
  calculate(input) {
    var changed = false;
    var state = {
      zoom: input.map.getZoom()
    };
    if (!equal(input.markers, this.markers)) {
      changed = true;
      this.markers = [...input.markers];
      var points = this.markers.map((marker) => {
        var position = MarkerUtils.getPosition(marker);
        var coordinates = [position.lng(), position.lat()];
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates
          },
          properties: {
            marker
          }
        };
      });
      this.superCluster.load(points);
    }
    if (!changed) {
      if (this.state.zoom <= this.maxZoom || state.zoom <= this.maxZoom) {
        changed = !equal(this.state, state);
      }
    }
    this.state = state;
    if (changed) {
      this.clusters = this.cluster(input);
    }
    return {
      clusters: this.clusters,
      changed
    };
  }
  cluster(_ref10) {
    var {
      map
    } = _ref10;
    return this.superCluster.getClusters([-180, -90, 180, 90], Math.round(map.getZoom())).map((feature) => this.transformCluster(feature));
  }
  transformCluster(_ref11) {
    var {
      geometry: {
        coordinates: [lng, lat]
      },
      properties
    } = _ref11;
    if (properties.cluster) {
      return new Cluster({
        markers: this.superCluster.getLeaves(properties.cluster_id, Infinity).map((leaf) => leaf.properties.marker),
        position: {
          lat,
          lng
        }
      });
    }
    var marker = properties.marker;
    return new Cluster({
      markers: [marker],
      position: MarkerUtils.getPosition(marker)
    });
  }
}
class ClusterStats {
  constructor(markers, clusters) {
    this.markers = {
      sum: markers.length
    };
    var clusterMarkerCounts = clusters.map((a) => a.count);
    var clusterMarkerSum = clusterMarkerCounts.reduce((a, b) => a + b, 0);
    this.clusters = {
      count: clusters.length,
      markers: {
        mean: clusterMarkerSum / clusters.length,
        sum: clusterMarkerSum,
        min: Math.min(...clusterMarkerCounts),
        max: Math.max(...clusterMarkerCounts)
      }
    };
  }
}
class DefaultRenderer {
  /**
   * The default render function for the library used by {@link MarkerClusterer}.
   *
   * Currently set to use the following:
   *
   * ```typescript
   * // change color if this cluster has more markers than the mean cluster
   * const color =
   *   count > Math.max(10, stats.clusters.markers.mean)
   *     ? "#ff0000"
   *     : "#0000ff";
   *
   * // create svg url with fill color
   * const svg = window.btoa(`
   * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
   *   <circle cx="120" cy="120" opacity=".6" r="70" />
   *   <circle cx="120" cy="120" opacity=".3" r="90" />
   *   <circle cx="120" cy="120" opacity=".2" r="110" />
   *   <circle cx="120" cy="120" opacity=".1" r="130" />
   * </svg>`);
   *
   * // create marker using svg icon
   * return new google.maps.Marker({
   *   position,
   *   icon: {
   *     url: `data:image/svg+xml;base64,${svg}`,
   *     scaledSize: new google.maps.Size(45, 45),
   *   },
   *   label: {
   *     text: String(count),
   *     color: "rgba(255,255,255,0.9)",
   *     fontSize: "12px",
   *   },
   *   // adjust zIndex to be above other markers
   *   zIndex: 1000 + count,
   * });
   * ```
   */
  render(_ref14, stats, map) {
    var {
      count,
      position
    } = _ref14;
    var color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
    var svg = '<svg fill="'.concat(color, '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">\n<circle cx="120" cy="120" opacity=".6" r="70" />\n<circle cx="120" cy="120" opacity=".3" r="90" />\n<circle cx="120" cy="120" opacity=".2" r="110" />\n<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">').concat(count, "</text>\n</svg>");
    var title = "Cluster of ".concat(count, " markers"), zIndex = Number(google.maps.Marker.MAX_ZINDEX) + count;
    if (MarkerUtils.isAdvancedMarkerAvailable(map)) {
      var parser = new DOMParser();
      var svgEl = parser.parseFromString(svg, "image/svg+xml").documentElement;
      svgEl.setAttribute("transform", "translate(0 25)");
      var _clusterOptions = {
        map,
        position,
        zIndex,
        title,
        content: svgEl
      };
      return new google.maps.marker.AdvancedMarkerElement(_clusterOptions);
    }
    var clusterOptions = {
      position,
      zIndex,
      title,
      icon: {
        url: "data:image/svg+xml;base64,".concat(btoa(svg)),
        anchor: new google.maps.Point(25, 25)
      }
    };
    return new google.maps.Marker(clusterOptions);
  }
}
function extend(type1, type2) {
  for (var property in type2.prototype) {
    type1.prototype[property] = type2.prototype[property];
  }
}
class OverlayViewSafe {
  constructor() {
    extend(OverlayViewSafe, google.maps.OverlayView);
  }
}
var MarkerClustererEvents;
(function(MarkerClustererEvents2) {
  MarkerClustererEvents2["CLUSTERING_BEGIN"] = "clusteringbegin";
  MarkerClustererEvents2["CLUSTERING_END"] = "clusteringend";
  MarkerClustererEvents2["CLUSTER_CLICK"] = "click";
})(MarkerClustererEvents || (MarkerClustererEvents = {}));
var defaultOnClusterClickHandler = (_, cluster, map) => {
  map.fitBounds(cluster.bounds);
};
class MarkerClusterer extends OverlayViewSafe {
  constructor(_ref15) {
    var {
      map,
      markers = [],
      algorithmOptions = {},
      algorithm = new SuperClusterAlgorithm(algorithmOptions),
      renderer = new DefaultRenderer(),
      onClusterClick = defaultOnClusterClickHandler
    } = _ref15;
    super();
    this.markers = [...markers];
    this.clusters = [];
    this.algorithm = algorithm;
    this.renderer = renderer;
    this.onClusterClick = onClusterClick;
    if (map) {
      this.setMap(map);
    }
  }
  addMarker(marker, noDraw) {
    if (this.markers.includes(marker)) {
      return;
    }
    this.markers.push(marker);
    if (!noDraw) {
      this.render();
    }
  }
  addMarkers(markers, noDraw) {
    markers.forEach((marker) => {
      this.addMarker(marker, true);
    });
    if (!noDraw) {
      this.render();
    }
  }
  removeMarker(marker, noDraw) {
    var index = this.markers.indexOf(marker);
    if (index === -1) {
      return false;
    }
    MarkerUtils.setMap(marker, null);
    this.markers.splice(index, 1);
    if (!noDraw) {
      this.render();
    }
    return true;
  }
  removeMarkers(markers, noDraw) {
    var removed = false;
    markers.forEach((marker) => {
      removed = this.removeMarker(marker, true) || removed;
    });
    if (removed && !noDraw) {
      this.render();
    }
    return removed;
  }
  clearMarkers(noDraw) {
    this.markers.length = 0;
    if (!noDraw) {
      this.render();
    }
  }
  /**
   * Recalculates and draws all the marker clusters.
   */
  render() {
    var map = this.getMap();
    if (map instanceof google.maps.Map && map.getProjection()) {
      google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_BEGIN, this);
      var {
        clusters,
        changed
      } = this.algorithm.calculate({
        markers: this.markers,
        map,
        mapCanvasProjection: this.getProjection()
      });
      if (changed || changed == void 0) {
        var singleMarker = /* @__PURE__ */ new Set();
        for (var cluster of clusters) {
          if (cluster.markers.length == 1) {
            singleMarker.add(cluster.markers[0]);
          }
        }
        var groupMarkers = [];
        for (var _cluster2 of this.clusters) {
          if (_cluster2.marker == null) {
            continue;
          }
          if (_cluster2.markers.length == 1) {
            if (!singleMarker.has(_cluster2.marker)) {
              MarkerUtils.setMap(_cluster2.marker, null);
            }
          } else {
            groupMarkers.push(_cluster2.marker);
          }
        }
        this.clusters = clusters;
        this.renderClusters();
        requestAnimationFrame(() => groupMarkers.forEach((marker) => MarkerUtils.setMap(marker, null)));
      }
      google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_END, this);
    }
  }
  onAdd() {
    this.idleListener = this.getMap().addListener("idle", this.render.bind(this));
    this.render();
  }
  onRemove() {
    google.maps.event.removeListener(this.idleListener);
    this.reset();
  }
  reset() {
    this.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
    this.clusters.forEach((cluster) => cluster.delete());
    this.clusters = [];
  }
  renderClusters() {
    var stats = new ClusterStats(this.markers, this.clusters);
    var map = this.getMap();
    this.clusters.forEach((cluster) => {
      if (cluster.markers.length === 1) {
        cluster.marker = cluster.markers[0];
      } else {
        cluster.marker = this.renderer.render(cluster, stats, map);
        cluster.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
        if (this.onClusterClick) {
          cluster.marker.addListener(
            "click",
            /* istanbul ignore next */
            (event) => {
              google.maps.event.trigger(this, MarkerClustererEvents.CLUSTER_CLICK, cluster);
              this.onClusterClick(event, cluster, map);
            }
          );
        }
      }
      MarkerUtils.setMap(cluster.marker, map);
    });
  }
}
function ownKeys$a(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$a(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$a(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$a(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function useGoogleMarkerClusterer(options) {
  var map = useGoogleMap();
  var [markerClusterer, setMarkerClusterer] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (map && markerClusterer === null) {
      var markerCluster = new MarkerClusterer(_objectSpread$a(_objectSpread$a({}, options), {}, {
        map
      }));
      setMarkerClusterer(markerCluster);
    }
  }, [map]);
  return markerClusterer;
}
function GoogleMarkerClusterer(_ref) {
  var {
    children,
    options
  } = _ref;
  var markerClusterer = useGoogleMarkerClusterer(options);
  return markerClusterer !== null ? children(markerClusterer) : null;
}
reactExports.memo(GoogleMarkerClusterer);
var eventMap$c = {
  onCloseClick: "closeclick",
  onContentChanged: "content_changed",
  onDomReady: "domready",
  onPositionChanged: "position_changed",
  onZindexChanged: "zindex_changed"
};
var updaterMap$c = {
  options(instance, options) {
    instance.setOptions(options);
  },
  position(instance, position) {
    instance.setPosition(position);
  },
  zIndex(instance, zIndex) {
    instance.setZIndex(zIndex);
  }
};
function InfoWindowFunctional(_ref) {
  var {
    children,
    anchor,
    options,
    position,
    zIndex,
    onCloseClick,
    onDomReady,
    onContentChanged,
    onPositionChanged,
    onZindexChanged,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [closeclickListener, setCloseClickListener] = reactExports.useState(null);
  var [domreadyclickListener, setDomReadyClickListener] = reactExports.useState(null);
  var [contentchangedclickListener, setContentChangedClickListener] = reactExports.useState(null);
  var [positionchangedclickListener, setPositionChangedClickListener] = reactExports.useState(null);
  var [zindexchangedclickListener, setZindexChangedClickListener] = reactExports.useState(null);
  var containerElementRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.close();
      if (anchor) {
        instance.open(map, anchor);
      } else if (instance.getPosition()) {
        instance.open(map);
      }
    }
  }, [map, instance, anchor]);
  reactExports.useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (position && instance !== null) {
      instance.setPosition(position);
    }
  }, [position]);
  reactExports.useEffect(() => {
    if (typeof zIndex === "number" && instance !== null) {
      instance.setZIndex(zIndex);
    }
  }, [zIndex]);
  reactExports.useEffect(() => {
    if (instance && onCloseClick) {
      if (closeclickListener !== null) {
        google.maps.event.removeListener(closeclickListener);
      }
      setCloseClickListener(google.maps.event.addListener(instance, "closeclick", onCloseClick));
    }
  }, [onCloseClick]);
  reactExports.useEffect(() => {
    if (instance && onDomReady) {
      if (domreadyclickListener !== null) {
        google.maps.event.removeListener(domreadyclickListener);
      }
      setDomReadyClickListener(google.maps.event.addListener(instance, "domready", onDomReady));
    }
  }, [onDomReady]);
  reactExports.useEffect(() => {
    if (instance && onContentChanged) {
      if (contentchangedclickListener !== null) {
        google.maps.event.removeListener(contentchangedclickListener);
      }
      setContentChangedClickListener(google.maps.event.addListener(instance, "content_changed", onContentChanged));
    }
  }, [onContentChanged]);
  reactExports.useEffect(() => {
    if (instance && onPositionChanged) {
      if (positionchangedclickListener !== null) {
        google.maps.event.removeListener(positionchangedclickListener);
      }
      setPositionChangedClickListener(google.maps.event.addListener(instance, "position_changed", onPositionChanged));
    }
  }, [onPositionChanged]);
  reactExports.useEffect(() => {
    if (instance && onZindexChanged) {
      if (zindexchangedclickListener !== null) {
        google.maps.event.removeListener(zindexchangedclickListener);
      }
      setZindexChangedClickListener(google.maps.event.addListener(instance, "zindex_changed", onZindexChanged));
    }
  }, [onZindexChanged]);
  reactExports.useEffect(() => {
    var infoWindow = new google.maps.InfoWindow(options);
    setInstance(infoWindow);
    containerElementRef.current = document.createElement("div");
    if (onCloseClick) {
      setCloseClickListener(google.maps.event.addListener(infoWindow, "closeclick", onCloseClick));
    }
    if (onDomReady) {
      setDomReadyClickListener(google.maps.event.addListener(infoWindow, "domready", onDomReady));
    }
    if (onContentChanged) {
      setContentChangedClickListener(google.maps.event.addListener(infoWindow, "content_changed", onContentChanged));
    }
    if (onPositionChanged) {
      setPositionChangedClickListener(google.maps.event.addListener(infoWindow, "position_changed", onPositionChanged));
    }
    if (onZindexChanged) {
      setZindexChangedClickListener(google.maps.event.addListener(infoWindow, "zindex_changed", onZindexChanged));
    }
    infoWindow.setContent(containerElementRef.current);
    if (position) {
      infoWindow.setPosition(position);
    }
    if (zIndex) {
      infoWindow.setZIndex(zIndex);
    }
    if (anchor) {
      infoWindow.open(map, anchor);
    } else if (infoWindow.getPosition()) {
      infoWindow.open(map);
    } else {
      invariant(false, "You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.");
    }
    if (onLoad) {
      onLoad(infoWindow);
    }
    return () => {
      if (closeclickListener) {
        google.maps.event.removeListener(closeclickListener);
      }
      if (contentchangedclickListener) {
        google.maps.event.removeListener(contentchangedclickListener);
      }
      if (domreadyclickListener) {
        google.maps.event.removeListener(domreadyclickListener);
      }
      if (positionchangedclickListener) {
        google.maps.event.removeListener(positionchangedclickListener);
      }
      if (zindexchangedclickListener) {
        google.maps.event.removeListener(zindexchangedclickListener);
      }
      if (onUnmount) {
        onUnmount(infoWindow);
      }
      infoWindow.close();
    };
  }, []);
  return containerElementRef.current ? reactDomExports.createPortal(reactExports.Children.only(children), containerElementRef.current) : null;
}
reactExports.memo(InfoWindowFunctional);
class InfoWindow extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "containerElement", null);
    _defineProperty(this, "state", {
      infoWindow: null
    });
    _defineProperty(this, "open", (infoWindow, anchor) => {
      if (anchor) {
        infoWindow.open(this.context, anchor);
      } else if (infoWindow.getPosition()) {
        infoWindow.open(this.context);
      } else {
        invariant(false, "You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.");
      }
    });
    _defineProperty(this, "setInfoWindowCallback", () => {
      if (this.state.infoWindow !== null && this.containerElement !== null) {
        this.state.infoWindow.setContent(this.containerElement);
        this.open(this.state.infoWindow, this.props.anchor);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.infoWindow);
        }
      }
    });
  }
  componentDidMount() {
    var infoWindow = new google.maps.InfoWindow(this.props.options);
    this.containerElement = document.createElement("div");
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$c,
      eventMap: eventMap$c,
      prevProps: {},
      nextProps: this.props,
      instance: infoWindow
    });
    this.setState(() => {
      return {
        infoWindow
      };
    }, this.setInfoWindowCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.infoWindow !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$c,
        eventMap: eventMap$c,
        prevProps,
        nextProps: this.props,
        instance: this.state.infoWindow
      });
    }
  }
  componentWillUnmount() {
    if (this.state.infoWindow !== null) {
      unregisterEvents(this.registeredEvents);
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.infoWindow);
      }
      this.state.infoWindow.close();
    }
  }
  render() {
    return this.containerElement ? reactDomExports.createPortal(reactExports.Children.only(this.props.children), this.containerElement) : null;
  }
}
_defineProperty(InfoWindow, "contextType", MapContext);
function ownKeys$9(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$9(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$9(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$b = {
  onClick: "click",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMouseDown: "mousedown",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick"
};
var updaterMap$b = {
  draggable(instance, draggable) {
    instance.setDraggable(draggable);
  },
  editable(instance, editable) {
    instance.setEditable(editable);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  path(instance, path) {
    instance.setPath(path);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  }
};
var defaultOptions$1 = {};
function PolylineFunctional(_ref) {
  var {
    options,
    draggable,
    editable,
    visible,
    path,
    onDblClick,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onClick,
    onDrag,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [dblclickListener, setDblclickListener] = reactExports.useState(null);
  var [dragendListener, setDragendListener] = reactExports.useState(null);
  var [dragstartListener, setDragstartListener] = reactExports.useState(null);
  var [mousedownListener, setMousedownListener] = reactExports.useState(null);
  var [mousemoveListener, setMousemoveListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  var [mouseupListener, setMouseupListener] = reactExports.useState(null);
  var [rightclickListener, setRightclickListener] = reactExports.useState(null);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [dragListener, setDragListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (typeof options !== "undefined" && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (typeof draggable !== "undefined" && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);
  reactExports.useEffect(() => {
    if (typeof editable !== "undefined" && instance !== null) {
      instance.setEditable(editable);
    }
  }, [instance, editable]);
  reactExports.useEffect(() => {
    if (typeof visible !== "undefined" && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);
  reactExports.useEffect(() => {
    if (typeof path !== "undefined" && instance !== null) {
      instance.setPath(path);
    }
  }, [instance, path]);
  reactExports.useEffect(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  reactExports.useEffect(() => {
    if (instance && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(instance, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  reactExports.useEffect(() => {
    if (instance && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(instance, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  reactExports.useEffect(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  reactExports.useEffect(() => {
    if (instance && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(instance, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  reactExports.useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  reactExports.useEffect(() => {
    if (instance && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  reactExports.useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(instance, "drag", onDrag));
    }
  }, [onDrag]);
  reactExports.useEffect(() => {
    var polyline = new google.maps.Polyline(_objectSpread$9(_objectSpread$9({}, options || defaultOptions$1), {}, {
      map
    }));
    if (path) {
      polyline.setPath(path);
    }
    if (typeof visible !== "undefined") {
      polyline.setVisible(visible);
    }
    if (typeof editable !== "undefined") {
      polyline.setEditable(editable);
    }
    if (typeof draggable !== "undefined") {
      polyline.setDraggable(draggable);
    }
    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(polyline, "dblclick", onDblClick));
    }
    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(polyline, "dragend", onDragEnd));
    }
    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(polyline, "dragstart", onDragStart));
    }
    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(polyline, "mousedown", onMouseDown));
    }
    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(polyline, "mousemove", onMouseMove));
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(polyline, "mouseout", onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(polyline, "mouseover", onMouseOver));
    }
    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(polyline, "mouseup", onMouseUp));
    }
    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(polyline, "rightclick", onRightClick));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(polyline, "click", onClick));
    }
    if (onDrag) {
      setDragListener(google.maps.event.addListener(polyline, "drag", onDrag));
    }
    setInstance(polyline);
    if (onLoad) {
      onLoad(polyline);
    }
    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (onUnmount) {
        onUnmount(polyline);
      }
      polyline.setMap(null);
    };
  }, []);
  return null;
}
reactExports.memo(PolylineFunctional);
class Polyline extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      polyline: null
    });
    _defineProperty(this, "setPolylineCallback", () => {
      if (this.state.polyline !== null && this.props.onLoad) {
        this.props.onLoad(this.state.polyline);
      }
    });
  }
  componentDidMount() {
    var polyline = new google.maps.Polyline(_objectSpread$9(_objectSpread$9({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$b,
      eventMap: eventMap$b,
      prevProps: {},
      nextProps: this.props,
      instance: polyline
    });
    this.setState(function setPolyline() {
      return {
        polyline
      };
    }, this.setPolylineCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.polyline !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$b,
        eventMap: eventMap$b,
        prevProps,
        nextProps: this.props,
        instance: this.state.polyline
      });
    }
  }
  componentWillUnmount() {
    if (this.state.polyline === null) {
      return;
    }
    if (this.props.onUnmount) {
      this.props.onUnmount(this.state.polyline);
    }
    unregisterEvents(this.registeredEvents);
    this.state.polyline.setMap(null);
  }
  render() {
    return null;
  }
}
_defineProperty(Polyline, "contextType", MapContext);
function ownKeys$8(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$8(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$8(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$a = {
  onClick: "click",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMouseDown: "mousedown",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick"
};
var updaterMap$a = {
  draggable(instance, draggable) {
    instance.setDraggable(draggable);
  },
  editable(instance, editable) {
    instance.setEditable(editable);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  path(instance, path) {
    instance.setPath(path);
  },
  paths(instance, paths) {
    instance.setPaths(paths);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  }
};
function PolygonFunctional(_ref) {
  var {
    options,
    draggable,
    editable,
    visible,
    path,
    paths,
    onDblClick,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onClick,
    onDrag,
    onLoad,
    onUnmount,
    onEdit
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [dblclickListener, setDblclickListener] = reactExports.useState(null);
  var [dragendListener, setDragendListener] = reactExports.useState(null);
  var [dragstartListener, setDragstartListener] = reactExports.useState(null);
  var [mousedownListener, setMousedownListener] = reactExports.useState(null);
  var [mousemoveListener, setMousemoveListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  var [mouseupListener, setMouseupListener] = reactExports.useState(null);
  var [rightclickListener, setRightclickListener] = reactExports.useState(null);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [dragListener, setDragListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (typeof options !== "undefined" && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (typeof draggable !== "undefined" && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);
  reactExports.useEffect(() => {
    if (typeof editable !== "undefined" && instance !== null) {
      instance.setEditable(editable);
    }
  }, [instance, editable]);
  reactExports.useEffect(() => {
    if (typeof visible !== "undefined" && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);
  reactExports.useEffect(() => {
    if (typeof path !== "undefined" && instance !== null) {
      instance.setPath(path);
    }
  }, [instance, path]);
  reactExports.useEffect(() => {
    if (typeof paths !== "undefined" && instance !== null) {
      instance.setPaths(paths);
    }
  }, [instance, paths]);
  reactExports.useEffect(() => {
    if (instance && typeof onDblClick === "function") {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  reactExports.useEffect(() => {
    if (!instance) {
      return;
    }
    google.maps.event.addListener(instance.getPath(), "insert_at", () => {
      onEdit === null || onEdit === void 0 || onEdit(instance);
    });
    google.maps.event.addListener(instance.getPath(), "set_at", () => {
      onEdit === null || onEdit === void 0 || onEdit(instance);
    });
    google.maps.event.addListener(instance.getPath(), "remove_at", () => {
      onEdit === null || onEdit === void 0 || onEdit(instance);
    });
  }, [instance, onEdit]);
  reactExports.useEffect(() => {
    if (instance && typeof onDragEnd === "function") {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(instance, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  reactExports.useEffect(() => {
    if (instance && typeof onDragStart === "function") {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(instance, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  reactExports.useEffect(() => {
    if (instance && typeof onMouseDown === "function") {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  reactExports.useEffect(() => {
    if (instance && typeof onMouseMove === "function") {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(instance, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  reactExports.useEffect(() => {
    if (instance && typeof onMouseOut === "function") {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (instance && typeof onMouseOver === "function") {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (instance && typeof onMouseUp === "function") {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  reactExports.useEffect(() => {
    if (instance && typeof onRightClick === "function") {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  reactExports.useEffect(() => {
    if (instance && typeof onClick === "function") {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && typeof onDrag === "function") {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(instance, "drag", onDrag));
    }
  }, [onDrag]);
  reactExports.useEffect(() => {
    var polygon = new google.maps.Polygon(_objectSpread$8(_objectSpread$8({}, options), {}, {
      map
    }));
    if (path) {
      polygon.setPath(path);
    }
    if (paths) {
      polygon.setPaths(paths);
    }
    if (typeof visible !== "undefined") {
      polygon.setVisible(visible);
    }
    if (typeof editable !== "undefined") {
      polygon.setEditable(editable);
    }
    if (typeof draggable !== "undefined") {
      polygon.setDraggable(draggable);
    }
    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(polygon, "dblclick", onDblClick));
    }
    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(polygon, "dragend", onDragEnd));
    }
    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(polygon, "dragstart", onDragStart));
    }
    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(polygon, "mousedown", onMouseDown));
    }
    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(polygon, "mousemove", onMouseMove));
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(polygon, "mouseout", onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(polygon, "mouseover", onMouseOver));
    }
    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(polygon, "mouseup", onMouseUp));
    }
    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(polygon, "rightclick", onRightClick));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(polygon, "click", onClick));
    }
    if (onDrag) {
      setDragListener(google.maps.event.addListener(polygon, "drag", onDrag));
    }
    setInstance(polygon);
    if (onLoad) {
      onLoad(polygon);
    }
    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (onUnmount) {
        onUnmount(polygon);
      }
      polygon.setMap(null);
    };
  }, []);
  return null;
}
reactExports.memo(PolygonFunctional);
class Polygon extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
  }
  componentDidMount() {
    var polygonOptions = this.props.options || {};
    this.polygon = new google.maps.Polygon(polygonOptions);
    this.polygon.setMap(this.context);
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$a,
      eventMap: eventMap$a,
      prevProps: {},
      nextProps: this.props,
      instance: this.polygon
    });
    if (this.props.onLoad) {
      this.props.onLoad(this.polygon);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.polygon) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$a,
        eventMap: eventMap$a,
        prevProps,
        nextProps: this.props,
        instance: this.polygon
      });
    }
  }
  componentWillUnmount() {
    if (this.polygon) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.polygon);
      }
      unregisterEvents(this.registeredEvents);
      if (this.polygon) {
        this.polygon.setMap(null);
      }
    }
  }
  render() {
    return null;
  }
}
_defineProperty(Polygon, "contextType", MapContext);
function ownKeys$7(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$7(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$7(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$9 = {
  onBoundsChanged: "bounds_changed",
  onClick: "click",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMouseDown: "mousedown",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick"
};
var updaterMap$9 = {
  bounds(instance, bounds) {
    instance.setBounds(bounds);
  },
  draggable(instance, draggable) {
    instance.setDraggable(draggable);
  },
  editable(instance, editable) {
    instance.setEditable(editable);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  }
};
function RectangleFunctional(_ref) {
  var {
    options,
    bounds,
    draggable,
    editable,
    visible,
    onDblClick,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onClick,
    onDrag,
    onBoundsChanged,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [dblclickListener, setDblclickListener] = reactExports.useState(null);
  var [dragendListener, setDragendListener] = reactExports.useState(null);
  var [dragstartListener, setDragstartListener] = reactExports.useState(null);
  var [mousedownListener, setMousedownListener] = reactExports.useState(null);
  var [mousemoveListener, setMousemoveListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  var [mouseupListener, setMouseupListener] = reactExports.useState(null);
  var [rightClickListener, setRightClickListener] = reactExports.useState(null);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [dragListener, setDragListener] = reactExports.useState(null);
  var [boundsChangedListener, setBoundsChangedListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (typeof options !== "undefined" && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (typeof draggable !== "undefined" && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);
  reactExports.useEffect(() => {
    if (typeof editable !== "undefined" && instance !== null) {
      instance.setEditable(editable);
    }
  }, [instance, editable]);
  reactExports.useEffect(() => {
    if (typeof visible !== "undefined" && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);
  reactExports.useEffect(() => {
    if (typeof bounds !== "undefined" && instance !== null) {
      instance.setBounds(bounds);
    }
  }, [instance, bounds]);
  reactExports.useEffect(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  reactExports.useEffect(() => {
    if (instance && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(instance, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  reactExports.useEffect(() => {
    if (instance && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(instance, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  reactExports.useEffect(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  reactExports.useEffect(() => {
    if (instance && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(instance, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  reactExports.useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  reactExports.useEffect(() => {
    if (instance && onRightClick) {
      if (rightClickListener !== null) {
        google.maps.event.removeListener(rightClickListener);
      }
      setRightClickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  reactExports.useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(instance, "drag", onDrag));
    }
  }, [onDrag]);
  reactExports.useEffect(() => {
    if (instance && onBoundsChanged) {
      if (boundsChangedListener !== null) {
        google.maps.event.removeListener(boundsChangedListener);
      }
      setBoundsChangedListener(google.maps.event.addListener(instance, "bounds_changed", onBoundsChanged));
    }
  }, [onBoundsChanged]);
  reactExports.useEffect(() => {
    var rectangle = new google.maps.Rectangle(_objectSpread$7(_objectSpread$7({}, options), {}, {
      map
    }));
    if (typeof visible !== "undefined") {
      rectangle.setVisible(visible);
    }
    if (typeof editable !== "undefined") {
      rectangle.setEditable(editable);
    }
    if (typeof draggable !== "undefined") {
      rectangle.setDraggable(draggable);
    }
    if (typeof bounds !== "undefined") {
      rectangle.setBounds(bounds);
    }
    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(rectangle, "dblclick", onDblClick));
    }
    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(rectangle, "dragend", onDragEnd));
    }
    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(rectangle, "dragstart", onDragStart));
    }
    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(rectangle, "mousedown", onMouseDown));
    }
    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(rectangle, "mousemove", onMouseMove));
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(rectangle, "mouseout", onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(rectangle, "mouseover", onMouseOver));
    }
    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(rectangle, "mouseup", onMouseUp));
    }
    if (onRightClick) {
      setRightClickListener(google.maps.event.addListener(rectangle, "rightclick", onRightClick));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(rectangle, "click", onClick));
    }
    if (onDrag) {
      setDragListener(google.maps.event.addListener(rectangle, "drag", onDrag));
    }
    if (onBoundsChanged) {
      setBoundsChangedListener(google.maps.event.addListener(rectangle, "bounds_changed", onBoundsChanged));
    }
    setInstance(rectangle);
    if (onLoad) {
      onLoad(rectangle);
    }
    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      if (rightClickListener !== null) {
        google.maps.event.removeListener(rightClickListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      if (boundsChangedListener !== null) {
        google.maps.event.removeListener(boundsChangedListener);
      }
      if (onUnmount) {
        onUnmount(rectangle);
      }
      rectangle.setMap(null);
    };
  }, []);
  return null;
}
reactExports.memo(RectangleFunctional);
class Rectangle extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      rectangle: null
    });
    _defineProperty(this, "setRectangleCallback", () => {
      if (this.state.rectangle !== null && this.props.onLoad) {
        this.props.onLoad(this.state.rectangle);
      }
    });
  }
  componentDidMount() {
    var rectangle = new google.maps.Rectangle(_objectSpread$7(_objectSpread$7({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$9,
      eventMap: eventMap$9,
      prevProps: {},
      nextProps: this.props,
      instance: rectangle
    });
    this.setState(function setRectangle() {
      return {
        rectangle
      };
    }, this.setRectangleCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.rectangle !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$9,
        eventMap: eventMap$9,
        prevProps,
        nextProps: this.props,
        instance: this.state.rectangle
      });
    }
  }
  componentWillUnmount() {
    if (this.state.rectangle !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.rectangle);
      }
      unregisterEvents(this.registeredEvents);
      this.state.rectangle.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(Rectangle, "contextType", MapContext);
function ownKeys$6(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$6(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$6(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$8 = {
  onCenterChanged: "center_changed",
  onRadiusChanged: "radius_changed",
  onClick: "click",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMouseDown: "mousedown",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick"
};
var updaterMap$8 = {
  center(instance, center2) {
    instance.setCenter(center2);
  },
  draggable(instance, draggable) {
    instance.setDraggable(draggable);
  },
  editable(instance, editable) {
    instance.setEditable(editable);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  radius(instance, radius) {
    instance.setRadius(radius);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  }
};
var defaultOptions = {};
function CircleFunctional(_ref) {
  var {
    options,
    center: center2,
    radius,
    draggable,
    editable,
    visible,
    onDblClick,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onClick,
    onDrag,
    onCenterChanged,
    onRadiusChanged,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [dblclickListener, setDblclickListener] = reactExports.useState(null);
  var [dragendListener, setDragendListener] = reactExports.useState(null);
  var [dragstartListener, setDragstartListener] = reactExports.useState(null);
  var [mousedownListener, setMousedownListener] = reactExports.useState(null);
  var [mousemoveListener, setMousemoveListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  var [mouseupListener, setMouseupListener] = reactExports.useState(null);
  var [rightclickListener, setRightclickListener] = reactExports.useState(null);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [dragListener, setDragListener] = reactExports.useState(null);
  var [centerChangedListener, setCenterChangedListener] = reactExports.useState(null);
  var [radiusChangedListener, setRadiusChangedListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (typeof options !== "undefined" && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    if (typeof draggable !== "undefined" && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);
  reactExports.useEffect(() => {
    if (typeof editable !== "undefined" && instance !== null) {
      instance.setEditable(editable);
    }
  }, [instance, editable]);
  reactExports.useEffect(() => {
    if (typeof visible !== "undefined" && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);
  reactExports.useEffect(() => {
    if (typeof radius === "number" && instance !== null) {
      instance.setRadius(radius);
    }
  }, [instance, radius]);
  reactExports.useEffect(() => {
    if (typeof center2 !== "undefined" && instance !== null) {
      instance.setCenter(center2);
    }
  }, [instance, center2]);
  reactExports.useEffect(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  reactExports.useEffect(() => {
    if (instance && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(instance, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  reactExports.useEffect(() => {
    if (instance && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(instance, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  reactExports.useEffect(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  reactExports.useEffect(() => {
    if (instance && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(instance, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  reactExports.useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  reactExports.useEffect(() => {
    if (instance && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  reactExports.useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(instance, "drag", onDrag));
    }
  }, [onDrag]);
  reactExports.useEffect(() => {
    if (instance && onCenterChanged) {
      if (centerChangedListener !== null) {
        google.maps.event.removeListener(centerChangedListener);
      }
      setCenterChangedListener(google.maps.event.addListener(instance, "center_changed", onCenterChanged));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && onRadiusChanged) {
      if (radiusChangedListener !== null) {
        google.maps.event.removeListener(radiusChangedListener);
      }
      setRadiusChangedListener(google.maps.event.addListener(instance, "radius_changed", onRadiusChanged));
    }
  }, [onRadiusChanged]);
  reactExports.useEffect(() => {
    var circle = new google.maps.Circle(_objectSpread$6(_objectSpread$6({}, options || defaultOptions), {}, {
      map
    }));
    if (typeof radius === "number") {
      circle.setRadius(radius);
    }
    if (typeof center2 !== "undefined") {
      circle.setCenter(center2);
    }
    if (typeof radius === "number") {
      circle.setRadius(radius);
    }
    if (typeof visible !== "undefined") {
      circle.setVisible(visible);
    }
    if (typeof editable !== "undefined") {
      circle.setEditable(editable);
    }
    if (typeof draggable !== "undefined") {
      circle.setDraggable(draggable);
    }
    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(circle, "dblclick", onDblClick));
    }
    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(circle, "dragend", onDragEnd));
    }
    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(circle, "dragstart", onDragStart));
    }
    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(circle, "mousedown", onMouseDown));
    }
    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(circle, "mousemove", onMouseMove));
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(circle, "mouseout", onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(circle, "mouseover", onMouseOver));
    }
    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(circle, "mouseup", onMouseUp));
    }
    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(circle, "rightclick", onRightClick));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(circle, "click", onClick));
    }
    if (onDrag) {
      setDragListener(google.maps.event.addListener(circle, "drag", onDrag));
    }
    if (onCenterChanged) {
      setCenterChangedListener(google.maps.event.addListener(circle, "center_changed", onCenterChanged));
    }
    if (onRadiusChanged) {
      setRadiusChangedListener(google.maps.event.addListener(circle, "radius_changed", onRadiusChanged));
    }
    setInstance(circle);
    if (onLoad) {
      onLoad(circle);
    }
    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (centerChangedListener !== null) {
        google.maps.event.removeListener(centerChangedListener);
      }
      if (radiusChangedListener !== null) {
        google.maps.event.removeListener(radiusChangedListener);
      }
      if (onUnmount) {
        onUnmount(circle);
      }
      circle.setMap(null);
    };
  }, []);
  return null;
}
reactExports.memo(CircleFunctional);
class Circle extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      circle: null
    });
    _defineProperty(this, "setCircleCallback", () => {
      if (this.state.circle !== null && this.props.onLoad) {
        this.props.onLoad(this.state.circle);
      }
    });
  }
  componentDidMount() {
    var circle = new google.maps.Circle(_objectSpread$6(_objectSpread$6({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$8,
      eventMap: eventMap$8,
      prevProps: {},
      nextProps: this.props,
      instance: circle
    });
    this.setState(function setCircle() {
      return {
        circle
      };
    }, this.setCircleCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.circle !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$8,
        eventMap: eventMap$8,
        prevProps,
        nextProps: this.props,
        instance: this.state.circle
      });
    }
  }
  componentWillUnmount() {
    if (this.state.circle !== null) {
      var _this$state$circle;
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.circle);
      }
      unregisterEvents(this.registeredEvents);
      (_this$state$circle = this.state.circle) === null || _this$state$circle === void 0 || _this$state$circle.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(Circle, "contextType", MapContext);
function ownKeys$5(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$5(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$5(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$7 = {
  onClick: "click",
  onDblClick: "dblclick",
  onMouseDown: "mousedown",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick",
  onAddFeature: "addfeature",
  onRemoveFeature: "removefeature",
  onRemoveProperty: "removeproperty",
  onSetGeometry: "setgeometry",
  onSetProperty: "setproperty"
};
var updaterMap$7 = {
  add(instance, feature) {
    instance.add(feature);
  },
  addgeojson(instance, geojson, options) {
    instance.addGeoJson(geojson, options);
  },
  contains(instance, feature) {
    instance.contains(feature);
  },
  foreach(instance, callback) {
    instance.forEach(callback);
  },
  loadgeojson(instance, url, options, callback) {
    instance.loadGeoJson(url, options, callback);
  },
  overridestyle(instance, feature, style) {
    instance.overrideStyle(feature, style);
  },
  remove(instance, feature) {
    instance.remove(feature);
  },
  revertstyle(instance, feature) {
    instance.revertStyle(feature);
  },
  controlposition(instance, controlPosition) {
    instance.setControlPosition(controlPosition);
  },
  controls(instance, controls) {
    instance.setControls(controls);
  },
  drawingmode(instance, mode) {
    instance.setDrawingMode(mode);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  style(instance, style) {
    instance.setStyle(style);
  },
  togeojson(instance, callback) {
    instance.toGeoJson(callback);
  }
};
function DataFunctional(_ref) {
  var {
    options,
    onClick,
    onDblClick,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onAddFeature,
    onRemoveFeature,
    onRemoveProperty,
    onSetGeometry,
    onSetProperty,
    onLoad,
    onUnmount
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  var [dblclickListener, setDblclickListener] = reactExports.useState(null);
  var [mousedownListener, setMousedownListener] = reactExports.useState(null);
  var [mousemoveListener, setMousemoveListener] = reactExports.useState(null);
  var [mouseoutListener, setMouseoutListener] = reactExports.useState(null);
  var [mouseoverListener, setMouseoverListener] = reactExports.useState(null);
  var [mouseupListener, setMouseupListener] = reactExports.useState(null);
  var [rightclickListener, setRightclickListener] = reactExports.useState(null);
  var [clickListener, setClickListener] = reactExports.useState(null);
  var [addFeatureListener, setAddFeatureListener] = reactExports.useState(null);
  var [removeFeatureListener, setRemoveFeatureListener] = reactExports.useState(null);
  var [removePropertyListener, setRemovePropertyListener] = reactExports.useState(null);
  var [setGeometryListener, setSetGeometryListener] = reactExports.useState(null);
  var [setPropertyListener, setSetPropertyListener] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  reactExports.useEffect(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  reactExports.useEffect(() => {
    if (instance && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(instance, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  reactExports.useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  reactExports.useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  reactExports.useEffect(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  reactExports.useEffect(() => {
    if (instance && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  reactExports.useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  reactExports.useEffect(() => {
    if (instance && onAddFeature) {
      if (addFeatureListener !== null) {
        google.maps.event.removeListener(addFeatureListener);
      }
      setAddFeatureListener(google.maps.event.addListener(instance, "addfeature", onAddFeature));
    }
  }, [onAddFeature]);
  reactExports.useEffect(() => {
    if (instance && onRemoveFeature) {
      if (removeFeatureListener !== null) {
        google.maps.event.removeListener(removeFeatureListener);
      }
      setRemoveFeatureListener(google.maps.event.addListener(instance, "removefeature", onRemoveFeature));
    }
  }, [onRemoveFeature]);
  reactExports.useEffect(() => {
    if (instance && onRemoveProperty) {
      if (removePropertyListener !== null) {
        google.maps.event.removeListener(removePropertyListener);
      }
      setRemovePropertyListener(google.maps.event.addListener(instance, "removeproperty", onRemoveProperty));
    }
  }, [onRemoveProperty]);
  reactExports.useEffect(() => {
    if (instance && onSetGeometry) {
      if (setGeometryListener !== null) {
        google.maps.event.removeListener(setGeometryListener);
      }
      setSetGeometryListener(google.maps.event.addListener(instance, "setgeometry", onSetGeometry));
    }
  }, [onSetGeometry]);
  reactExports.useEffect(() => {
    if (instance && onSetProperty) {
      if (setPropertyListener !== null) {
        google.maps.event.removeListener(setPropertyListener);
      }
      setSetPropertyListener(google.maps.event.addListener(instance, "setproperty", onSetProperty));
    }
  }, [onSetProperty]);
  reactExports.useEffect(() => {
    if (map !== null) {
      var data = new google.maps.Data(_objectSpread$5(_objectSpread$5({}, options), {}, {
        map
      }));
      if (onDblClick) {
        setDblclickListener(google.maps.event.addListener(data, "dblclick", onDblClick));
      }
      if (onMouseDown) {
        setMousedownListener(google.maps.event.addListener(data, "mousedown", onMouseDown));
      }
      if (onMouseMove) {
        setMousemoveListener(google.maps.event.addListener(data, "mousemove", onMouseMove));
      }
      if (onMouseOut) {
        setMouseoutListener(google.maps.event.addListener(data, "mouseout", onMouseOut));
      }
      if (onMouseOver) {
        setMouseoverListener(google.maps.event.addListener(data, "mouseover", onMouseOver));
      }
      if (onMouseUp) {
        setMouseupListener(google.maps.event.addListener(data, "mouseup", onMouseUp));
      }
      if (onRightClick) {
        setRightclickListener(google.maps.event.addListener(data, "rightclick", onRightClick));
      }
      if (onClick) {
        setClickListener(google.maps.event.addListener(data, "click", onClick));
      }
      if (onAddFeature) {
        setAddFeatureListener(google.maps.event.addListener(data, "addfeature", onAddFeature));
      }
      if (onRemoveFeature) {
        setRemoveFeatureListener(google.maps.event.addListener(data, "removefeature", onRemoveFeature));
      }
      if (onRemoveProperty) {
        setRemovePropertyListener(google.maps.event.addListener(data, "removeproperty", onRemoveProperty));
      }
      if (onSetGeometry) {
        setSetGeometryListener(google.maps.event.addListener(data, "setgeometry", onSetGeometry));
      }
      if (onSetProperty) {
        setSetPropertyListener(google.maps.event.addListener(data, "setproperty", onSetProperty));
      }
      setInstance(data);
      if (onLoad) {
        onLoad(data);
      }
    }
    return () => {
      if (instance) {
        if (dblclickListener !== null) {
          google.maps.event.removeListener(dblclickListener);
        }
        if (mousedownListener !== null) {
          google.maps.event.removeListener(mousedownListener);
        }
        if (mousemoveListener !== null) {
          google.maps.event.removeListener(mousemoveListener);
        }
        if (mouseoutListener !== null) {
          google.maps.event.removeListener(mouseoutListener);
        }
        if (mouseoverListener !== null) {
          google.maps.event.removeListener(mouseoverListener);
        }
        if (mouseupListener !== null) {
          google.maps.event.removeListener(mouseupListener);
        }
        if (rightclickListener !== null) {
          google.maps.event.removeListener(rightclickListener);
        }
        if (clickListener !== null) {
          google.maps.event.removeListener(clickListener);
        }
        if (addFeatureListener !== null) {
          google.maps.event.removeListener(addFeatureListener);
        }
        if (removeFeatureListener !== null) {
          google.maps.event.removeListener(removeFeatureListener);
        }
        if (removePropertyListener !== null) {
          google.maps.event.removeListener(removePropertyListener);
        }
        if (setGeometryListener !== null) {
          google.maps.event.removeListener(setGeometryListener);
        }
        if (setPropertyListener !== null) {
          google.maps.event.removeListener(setPropertyListener);
        }
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.setMap(null);
      }
    };
  }, []);
  return null;
}
reactExports.memo(DataFunctional);
class Data extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      data: null
    });
    _defineProperty(this, "setDataCallback", () => {
      if (this.state.data !== null && this.props.onLoad) {
        this.props.onLoad(this.state.data);
      }
    });
  }
  componentDidMount() {
    if (this.context !== null) {
      var data = new google.maps.Data(_objectSpread$5(_objectSpread$5({}, this.props.options), {}, {
        map: this.context
      }));
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$7,
        eventMap: eventMap$7,
        prevProps: {},
        nextProps: this.props,
        instance: data
      });
      this.setState(() => {
        return {
          data
        };
      }, this.setDataCallback);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.state.data !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$7,
        eventMap: eventMap$7,
        prevProps,
        nextProps: this.props,
        instance: this.state.data
      });
    }
  }
  componentWillUnmount() {
    if (this.state.data !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.data);
      }
      unregisterEvents(this.registeredEvents);
      if (this.state.data) {
        this.state.data.setMap(null);
      }
    }
  }
  render() {
    return null;
  }
}
_defineProperty(Data, "contextType", MapContext);
function ownKeys$4(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$4(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$4(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$6 = {
  onClick: "click",
  onDefaultViewportChanged: "defaultviewport_changed",
  onStatusChanged: "status_changed"
};
var updaterMap$6 = {
  options(instance, options) {
    instance.setOptions(options);
  },
  url(instance, url) {
    instance.setUrl(url);
  },
  zIndex(instance, zIndex) {
    instance.setZIndex(zIndex);
  }
};
class KmlLayer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      kmlLayer: null
    });
    _defineProperty(this, "setKmlLayerCallback", () => {
      if (this.state.kmlLayer !== null && this.props.onLoad) {
        this.props.onLoad(this.state.kmlLayer);
      }
    });
  }
  componentDidMount() {
    var kmlLayer = new google.maps.KmlLayer(_objectSpread$4(_objectSpread$4({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$6,
      eventMap: eventMap$6,
      prevProps: {},
      nextProps: this.props,
      instance: kmlLayer
    });
    this.setState(function setLmlLayer() {
      return {
        kmlLayer
      };
    }, this.setKmlLayerCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.kmlLayer !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$6,
        eventMap: eventMap$6,
        prevProps,
        nextProps: this.props,
        instance: this.state.kmlLayer
      });
    }
  }
  componentWillUnmount() {
    if (this.state.kmlLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.kmlLayer);
      }
      unregisterEvents(this.registeredEvents);
      this.state.kmlLayer.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(KmlLayer, "contextType", MapContext);
function getOffsetOverride(containerElement, getPixelPositionOffset) {
  return typeof getPixelPositionOffset === "function" ? getPixelPositionOffset(containerElement.offsetWidth, containerElement.offsetHeight) : {
    x: 0,
    y: 0
  };
}
function createLatLng(inst, Type2) {
  return new Type2(inst.lat, inst.lng);
}
function createLatLngBounds(inst, Type2) {
  return new Type2(new google.maps.LatLng(inst.ne.lat, inst.ne.lng), new google.maps.LatLng(inst.sw.lat, inst.sw.lng));
}
function ensureOfType(inst, type, factory) {
  return inst instanceof type ? inst : factory(inst, type);
}
function ensureOfTypeBounds(inst, type, factory) {
  return inst instanceof type ? inst : factory(inst, type);
}
function getLayoutStylesByBounds(mapCanvasProjection, offset, bounds) {
  var ne = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getNorthEast());
  var sw = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getSouthWest());
  if (ne && sw) {
    return {
      left: "".concat(sw.x + offset.x, "px"),
      top: "".concat(ne.y + offset.y, "px"),
      width: "".concat(ne.x - sw.x - offset.x, "px"),
      height: "".concat(sw.y - ne.y - offset.y, "px")
    };
  }
  return {
    left: "-9999px",
    top: "-9999px"
  };
}
function getLayoutStylesByPosition(mapCanvasProjection, offset, position) {
  var point = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(position);
  if (point) {
    var {
      x,
      y
    } = point;
    return {
      left: "".concat(x + offset.x, "px"),
      top: "".concat(y + offset.y, "px")
    };
  }
  return {
    left: "-9999px",
    top: "-9999px"
  };
}
function getLayoutStyles(mapCanvasProjection, offset, bounds, position) {
  return bounds !== void 0 ? getLayoutStylesByBounds(mapCanvasProjection, offset, ensureOfTypeBounds(bounds, google.maps.LatLngBounds, createLatLngBounds)) : getLayoutStylesByPosition(mapCanvasProjection, offset, ensureOfType(position, google.maps.LatLng, createLatLng));
}
function arePositionsEqual(currentPosition, previousPosition) {
  return currentPosition.left === previousPosition.left && currentPosition.top === previousPosition.top && currentPosition.width === previousPosition.height && currentPosition.height === previousPosition.height;
}
function ownKeys$3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$3(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function createOverlay(container, pane, position, bounds, getPixelPositionOffset) {
  class Overlay extends google.maps.OverlayView {
    constructor(container2, pane2, position2, bounds2) {
      super();
      this.container = container2;
      this.pane = pane2;
      this.position = position2;
      this.bounds = bounds2;
    }
    onAdd() {
      var _this$getPanes;
      var pane2 = (_this$getPanes = this.getPanes()) === null || _this$getPanes === void 0 ? void 0 : _this$getPanes[this.pane];
      pane2 === null || pane2 === void 0 || pane2.appendChild(this.container);
    }
    draw() {
      var projection = this.getProjection();
      var offset = _objectSpread$3({}, this.container ? getOffsetOverride(this.container, getPixelPositionOffset) : {
        x: 0,
        y: 0
      });
      var layoutStyles = getLayoutStyles(projection, offset, this.bounds, this.position);
      for (var [key, value] of Object.entries(layoutStyles)) {
        this.container.style[key] = value;
      }
    }
    onRemove() {
      if (this.container.parentNode !== null) {
        this.container.parentNode.removeChild(this.container);
      }
    }
  }
  return new Overlay(container, pane, position, bounds);
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function convertToLatLngString(latLngLike) {
  if (!latLngLike) {
    return "";
  }
  var latLng = latLngLike instanceof google.maps.LatLng ? latLngLike : new google.maps.LatLng(latLngLike.lat, latLngLike.lng);
  return latLng + "";
}
function convertToLatLngBoundsString(latLngBoundsLike) {
  if (!latLngBoundsLike) {
    return "";
  }
  var latLngBounds = latLngBoundsLike instanceof google.maps.LatLngBounds ? latLngBoundsLike : new google.maps.LatLngBounds(new google.maps.LatLng(latLngBoundsLike.south, latLngBoundsLike.east), new google.maps.LatLng(latLngBoundsLike.north, latLngBoundsLike.west));
  return latLngBounds + "";
}
function OverlayViewFunctional(_ref) {
  var {
    position,
    bounds,
    mapPaneName,
    zIndex,
    onLoad,
    onUnmount,
    getPixelPositionOffset,
    children
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var container = reactExports.useMemo(() => {
    var div = document.createElement("div");
    div.style.position = "absolute";
    return div;
  }, []);
  var overlay = reactExports.useMemo(() => {
    return createOverlay(container, mapPaneName, position, bounds, getPixelPositionOffset);
  }, [container, mapPaneName, position, bounds]);
  reactExports.useEffect(() => {
    onLoad === null || onLoad === void 0 || onLoad(overlay);
    overlay === null || overlay === void 0 || overlay.setMap(map);
    return () => {
      onUnmount === null || onUnmount === void 0 || onUnmount(overlay);
      overlay === null || overlay === void 0 || overlay.setMap(null);
    };
  }, [map, overlay]);
  reactExports.useEffect(() => {
    container.style.zIndex = "".concat(zIndex);
  }, [zIndex, container]);
  return reactDomExports.createPortal(children, container);
}
reactExports.memo(OverlayViewFunctional);
class OverlayView extends reactExports.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "state", {
      paneEl: null,
      containerStyle: {
        // set initial position
        position: "absolute"
      }
    });
    _defineProperty(this, "updatePane", () => {
      var mapPaneName = this.props.mapPaneName;
      var mapPanes = this.overlayView.getPanes();
      invariant(!!mapPaneName, "OverlayView requires props.mapPaneName but got %s", mapPaneName);
      if (mapPanes) {
        this.setState({
          paneEl: mapPanes[mapPaneName]
        });
      } else {
        this.setState({
          paneEl: null
        });
      }
    });
    _defineProperty(this, "onAdd", () => {
      var _this$props$onLoad, _this$props;
      this.updatePane();
      (_this$props$onLoad = (_this$props = this.props).onLoad) === null || _this$props$onLoad === void 0 || _this$props$onLoad.call(_this$props, this.overlayView);
    });
    _defineProperty(this, "onPositionElement", () => {
      var mapCanvasProjection = this.overlayView.getProjection();
      var offset = _objectSpread$2({
        x: 0,
        y: 0
      }, this.containerRef.current ? getOffsetOverride(this.containerRef.current, this.props.getPixelPositionOffset) : {});
      var layoutStyles = getLayoutStyles(mapCanvasProjection, offset, this.props.bounds, this.props.position);
      if (!arePositionsEqual(layoutStyles, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        left: this.state.containerStyle.left,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        top: this.state.containerStyle.top,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        width: this.state.containerStyle.width,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        height: this.state.containerStyle.height
      })) {
        var _layoutStyles$top, _layoutStyles$left, _layoutStyles$width, _layoutStyles$height;
        this.setState({
          containerStyle: {
            top: (_layoutStyles$top = layoutStyles.top) !== null && _layoutStyles$top !== void 0 ? _layoutStyles$top : 0,
            left: (_layoutStyles$left = layoutStyles.left) !== null && _layoutStyles$left !== void 0 ? _layoutStyles$left : 0,
            width: (_layoutStyles$width = layoutStyles.width) !== null && _layoutStyles$width !== void 0 ? _layoutStyles$width : 0,
            height: (_layoutStyles$height = layoutStyles.height) !== null && _layoutStyles$height !== void 0 ? _layoutStyles$height : 0,
            position: "absolute"
          }
        });
      }
    });
    _defineProperty(this, "draw", () => {
      this.onPositionElement();
    });
    _defineProperty(this, "onRemove", () => {
      var _this$props$onUnmount, _this$props2;
      this.setState(() => ({
        paneEl: null
      }));
      (_this$props$onUnmount = (_this$props2 = this.props).onUnmount) === null || _this$props$onUnmount === void 0 || _this$props$onUnmount.call(_this$props2, this.overlayView);
    });
    this.containerRef = reactExports.createRef();
    var overlayView = new google.maps.OverlayView();
    overlayView.onAdd = this.onAdd;
    overlayView.draw = this.draw;
    overlayView.onRemove = this.onRemove;
    this.overlayView = overlayView;
  }
  componentDidMount() {
    this.overlayView.setMap(this.context);
  }
  componentDidUpdate(prevProps) {
    var prevPositionString = convertToLatLngString(prevProps.position);
    var positionString = convertToLatLngString(this.props.position);
    var prevBoundsString = convertToLatLngBoundsString(prevProps.bounds);
    var boundsString = convertToLatLngBoundsString(this.props.bounds);
    if (prevPositionString !== positionString || prevBoundsString !== boundsString) {
      this.overlayView.draw();
    }
    if (prevProps.mapPaneName !== this.props.mapPaneName) {
      this.updatePane();
    }
  }
  componentWillUnmount() {
    this.overlayView.setMap(null);
  }
  render() {
    var paneEl = this.state.paneEl;
    if (paneEl) {
      return reactDomExports.createPortal(jsxRuntimeExports.jsx("div", {
        ref: this.containerRef,
        style: this.state.containerStyle,
        children: reactExports.Children.only(this.props.children)
      }), paneEl);
    } else {
      return null;
    }
  }
}
_defineProperty(OverlayView, "FLOAT_PANE", "floatPane");
_defineProperty(OverlayView, "MAP_PANE", "mapPane");
_defineProperty(OverlayView, "MARKER_LAYER", "markerLayer");
_defineProperty(OverlayView, "OVERLAY_LAYER", "overlayLayer");
_defineProperty(OverlayView, "OVERLAY_MOUSE_TARGET", "overlayMouseTarget");
_defineProperty(OverlayView, "contextType", MapContext);
function noop() {
  return;
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$5 = {
  onDblClick: "dblclick",
  onClick: "click"
};
var updaterMap$5 = {
  opacity(instance, opacity) {
    instance.setOpacity(opacity);
  }
};
function GroundOverlayFunctional(_ref) {
  var {
    url,
    bounds,
    options,
    visible
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var imageBounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.south, bounds.west), new google.maps.LatLng(bounds.north, bounds.east));
  var groundOverlay = reactExports.useMemo(() => {
    return new google.maps.GroundOverlay(url, imageBounds, options);
  }, []);
  reactExports.useEffect(() => {
    if (groundOverlay !== null) {
      groundOverlay.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (typeof url !== "undefined" && groundOverlay !== null) {
      groundOverlay.set("url", url);
      groundOverlay.setMap(map);
    }
  }, [groundOverlay, url]);
  reactExports.useEffect(() => {
    if (typeof visible !== "undefined" && groundOverlay !== null) {
      groundOverlay.setOpacity(visible ? 1 : 0);
    }
  }, [groundOverlay, visible]);
  reactExports.useEffect(() => {
    var newBounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.south, bounds.west), new google.maps.LatLng(bounds.north, bounds.east));
    if (typeof bounds !== "undefined" && groundOverlay !== null) {
      groundOverlay.set("bounds", newBounds);
      groundOverlay.setMap(map);
    }
  }, [groundOverlay, bounds]);
  return null;
}
reactExports.memo(GroundOverlayFunctional);
class GroundOverlay extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      groundOverlay: null
    });
    _defineProperty(this, "setGroundOverlayCallback", () => {
      if (this.state.groundOverlay !== null && this.props.onLoad) {
        this.props.onLoad(this.state.groundOverlay);
      }
    });
  }
  componentDidMount() {
    invariant(!!this.props.url || !!this.props.bounds, "For GroundOverlay, url and bounds are passed in to constructor and are immutable after instantiated. This is the behavior of Google Maps JavaScript API v3 ( See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay) Hence, use the corresponding two props provided by `react-google-maps-api`, url and bounds. In some cases, you'll need the GroundOverlay component to reflect the changes of url and bounds. You can leverage the React's key property to remount the component. Typically, just `key={url}` would serve your need. See https://github.com/tomchentw/react-google-maps/issues/655");
    var groundOverlay = new google.maps.GroundOverlay(this.props.url, this.props.bounds, _objectSpread$1(_objectSpread$1({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$5,
      eventMap: eventMap$5,
      prevProps: {},
      nextProps: this.props,
      instance: groundOverlay
    });
    this.setState(function setGroundOverlay() {
      return {
        groundOverlay
      };
    }, this.setGroundOverlayCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.groundOverlay !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$5,
        eventMap: eventMap$5,
        prevProps,
        nextProps: this.props,
        instance: this.state.groundOverlay
      });
    }
  }
  componentWillUnmount() {
    if (this.state.groundOverlay) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.groundOverlay);
      }
      this.state.groundOverlay.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(GroundOverlay, "defaultProps", {
  onLoad: noop
});
_defineProperty(GroundOverlay, "contextType", MapContext);
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$4 = {};
var updaterMap$4 = {
  data(instance, data) {
    instance.setData(data);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  }
};
function HeatmapLayerFunctional(_ref) {
  var {
    data,
    onLoad,
    onUnmount,
    options
  } = _ref;
  var map = reactExports.useContext(MapContext);
  var [instance, setInstance] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!google.maps.visualization) {
      invariant(!!google.maps.visualization, 'Did you include prop libraries={["visualization"]} in useJsApiScript? %s', google.maps.visualization);
    }
  }, []);
  reactExports.useEffect(() => {
    invariant(!!data, "data property is required in HeatmapLayer %s", data);
  }, [data]);
  reactExports.useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  reactExports.useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  reactExports.useEffect(() => {
    var heatmapLayer = new google.maps.visualization.HeatmapLayer(_objectSpread(_objectSpread({}, options), {}, {
      data,
      map
    }));
    setInstance(heatmapLayer);
    if (onLoad) {
      onLoad(heatmapLayer);
    }
    return () => {
      if (instance !== null) {
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.setMap(null);
      }
    };
  }, []);
  return null;
}
reactExports.memo(HeatmapLayerFunctional);
class HeatmapLayer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      heatmapLayer: null
    });
    _defineProperty(this, "setHeatmapLayerCallback", () => {
      if (this.state.heatmapLayer !== null && this.props.onLoad) {
        this.props.onLoad(this.state.heatmapLayer);
      }
    });
  }
  componentDidMount() {
    invariant(!!google.maps.visualization, 'Did you include prop libraries={["visualization"]} to <LoadScript />? %s', google.maps.visualization);
    invariant(!!this.props.data, "data property is required in HeatmapLayer %s", this.props.data);
    var heatmapLayer = new google.maps.visualization.HeatmapLayer(_objectSpread(_objectSpread({}, this.props.options), {}, {
      data: this.props.data,
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$4,
      eventMap: eventMap$4,
      prevProps: {},
      nextProps: this.props,
      instance: heatmapLayer
    });
    this.setState(function setHeatmapLayer() {
      return {
        heatmapLayer
      };
    }, this.setHeatmapLayerCallback);
  }
  componentDidUpdate(prevProps) {
    unregisterEvents(this.registeredEvents);
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$4,
      eventMap: eventMap$4,
      prevProps,
      nextProps: this.props,
      instance: this.state.heatmapLayer
    });
  }
  componentWillUnmount() {
    if (this.state.heatmapLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.heatmapLayer);
      }
      unregisterEvents(this.registeredEvents);
      this.state.heatmapLayer.setMap(null);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(HeatmapLayer, "contextType", MapContext);
var eventMap$3 = {
  onCloseClick: "closeclick",
  onPanoChanged: "pano_changed",
  onPositionChanged: "position_changed",
  onPovChanged: "pov_changed",
  onResize: "resize",
  onStatusChanged: "status_changed",
  onVisibleChanged: "visible_changed",
  onZoomChanged: "zoom_changed"
};
var updaterMap$3 = {
  register(instance, provider, options) {
    instance.registerPanoProvider(provider, options);
  },
  links(instance, links) {
    instance.setLinks(links);
  },
  motionTracking(instance, motionTracking) {
    instance.setMotionTracking(motionTracking);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  pano(instance, pano) {
    instance.setPano(pano);
  },
  position(instance, position) {
    instance.setPosition(position);
  },
  pov(instance, pov) {
    instance.setPov(pov);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  },
  zoom(instance, zoom) {
    instance.setZoom(zoom);
  }
};
class StreetViewPanorama extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      streetViewPanorama: null
    });
    _defineProperty(this, "setStreetViewPanoramaCallback", () => {
      if (this.state.streetViewPanorama !== null && this.props.onLoad) {
        this.props.onLoad(this.state.streetViewPanorama);
      }
    });
  }
  componentDidMount() {
    var _this$context$getStre, _this$context;
    var streetViewPanorama = (_this$context$getStre = (_this$context = this.context) === null || _this$context === void 0 ? void 0 : _this$context.getStreetView()) !== null && _this$context$getStre !== void 0 ? _this$context$getStre : null;
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$3,
      eventMap: eventMap$3,
      prevProps: {},
      nextProps: this.props,
      instance: streetViewPanorama
    });
    this.setState(() => {
      return {
        streetViewPanorama
      };
    }, this.setStreetViewPanoramaCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.streetViewPanorama !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$3,
        eventMap: eventMap$3,
        prevProps,
        nextProps: this.props,
        instance: this.state.streetViewPanorama
      });
    }
  }
  componentWillUnmount() {
    if (this.state.streetViewPanorama !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.streetViewPanorama);
      }
      unregisterEvents(this.registeredEvents);
      this.state.streetViewPanorama.setVisible(false);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(StreetViewPanorama, "contextType", MapContext);
class StreetViewService extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      streetViewService: null
    });
    _defineProperty(this, "setStreetViewServiceCallback", () => {
      if (this.state.streetViewService !== null && this.props.onLoad) {
        this.props.onLoad(this.state.streetViewService);
      }
    });
  }
  componentDidMount() {
    var streetViewService = new google.maps.StreetViewService();
    this.setState(function setStreetViewService() {
      return {
        streetViewService
      };
    }, this.setStreetViewServiceCallback);
  }
  componentWillUnmount() {
    if (this.state.streetViewService !== null && this.props.onUnmount) {
      this.props.onUnmount(this.state.streetViewService);
    }
  }
  render() {
    return null;
  }
}
_defineProperty(StreetViewService, "contextType", MapContext);
var eventMap$2 = {
  onDirectionsChanged: "directions_changed"
};
var updaterMap$2 = {
  directions(instance, directions) {
    instance.setDirections(directions);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  panel(instance, panel) {
    instance.setPanel(panel);
  },
  routeIndex(instance, routeIndex) {
    instance.setRouteIndex(routeIndex);
  }
};
class DirectionsRenderer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      directionsRenderer: null
    });
    _defineProperty(this, "setDirectionsRendererCallback", () => {
      if (this.state.directionsRenderer !== null) {
        this.state.directionsRenderer.setMap(this.context);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.directionsRenderer);
        }
      }
    });
  }
  componentDidMount() {
    var directionsRenderer = new google.maps.DirectionsRenderer(this.props.options);
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$2,
      eventMap: eventMap$2,
      prevProps: {},
      nextProps: this.props,
      instance: directionsRenderer
    });
    this.setState(function setDirectionsRenderer() {
      return {
        directionsRenderer
      };
    }, this.setDirectionsRendererCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.directionsRenderer !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$2,
        eventMap: eventMap$2,
        prevProps,
        nextProps: this.props,
        instance: this.state.directionsRenderer
      });
    }
  }
  componentWillUnmount() {
    if (this.state.directionsRenderer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.directionsRenderer);
      }
      unregisterEvents(this.registeredEvents);
      if (this.state.directionsRenderer) {
        this.state.directionsRenderer.setMap(null);
      }
    }
  }
  render() {
    return null;
  }
}
_defineProperty(DirectionsRenderer, "contextType", MapContext);
var eventMap$1 = {
  onPlacesChanged: "places_changed"
};
var updaterMap$1 = {
  bounds(instance, bounds) {
    instance.setBounds(bounds);
  }
};
class StandaloneSearchBox extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "containerElement", reactExports.createRef());
    _defineProperty(this, "state", {
      searchBox: null
    });
    _defineProperty(this, "setSearchBoxCallback", () => {
      if (this.state.searchBox !== null && this.props.onLoad) {
        this.props.onLoad(this.state.searchBox);
      }
    });
  }
  componentDidMount() {
    invariant(!!google.maps.places, 'You need to provide libraries={["places"]} prop to <LoadScript /> component %s', google.maps.places);
    if (this.containerElement !== null && this.containerElement.current !== null) {
      var input = this.containerElement.current.querySelector("input");
      if (input !== null) {
        var searchBox = new google.maps.places.SearchBox(input, this.props.options);
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap: updaterMap$1,
          eventMap: eventMap$1,
          prevProps: {},
          nextProps: this.props,
          instance: searchBox
        });
        this.setState(function setSearchBox() {
          return {
            searchBox
          };
        }, this.setSearchBoxCallback);
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (this.state.searchBox !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$1,
        eventMap: eventMap$1,
        prevProps,
        nextProps: this.props,
        instance: this.state.searchBox
      });
    }
  }
  componentWillUnmount() {
    if (this.state.searchBox !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.searchBox);
      }
      unregisterEvents(this.registeredEvents);
    }
  }
  render() {
    return jsxRuntimeExports.jsx("div", {
      ref: this.containerElement,
      children: reactExports.Children.only(this.props.children)
    });
  }
}
_defineProperty(StandaloneSearchBox, "contextType", MapContext);
var eventMap = {
  onPlaceChanged: "place_changed"
};
var updaterMap = {
  bounds(instance, bounds) {
    instance.setBounds(bounds);
  },
  restrictions(instance, restrictions) {
    instance.setComponentRestrictions(restrictions);
  },
  fields(instance, fields) {
    instance.setFields(fields);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  types(instance, types) {
    instance.setTypes(types);
  }
};
class Autocomplete extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "containerElement", reactExports.createRef());
    _defineProperty(this, "state", {
      autocomplete: null
    });
    _defineProperty(this, "setAutocompleteCallback", () => {
      if (this.state.autocomplete !== null && this.props.onLoad) {
        this.props.onLoad(this.state.autocomplete);
      }
    });
  }
  componentDidMount() {
    var _this$containerElemen;
    invariant(!!google.maps.places, 'You need to provide libraries={["places"]} prop to <LoadScript /> component %s', google.maps.places);
    var input = (_this$containerElemen = this.containerElement.current) === null || _this$containerElemen === void 0 ? void 0 : _this$containerElemen.querySelector("input");
    if (input) {
      var autocomplete = new google.maps.places.Autocomplete(input, this.props.options);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps: {},
        nextProps: this.props,
        instance: autocomplete
      });
      this.setState(() => {
        return {
          autocomplete
        };
      }, this.setAutocompleteCallback);
    }
  }
  componentDidUpdate(prevProps) {
    unregisterEvents(this.registeredEvents);
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.autocomplete
    });
  }
  componentWillUnmount() {
    if (this.state.autocomplete !== null) {
      unregisterEvents(this.registeredEvents);
    }
  }
  render() {
    return jsxRuntimeExports.jsx("div", {
      ref: this.containerElement,
      className: this.props.className,
      children: reactExports.Children.only(this.props.children)
    });
  }
}
_defineProperty(Autocomplete, "defaultProps", {
  className: ""
});
_defineProperty(Autocomplete, "contextType", MapContext);
const mapContainerStyle = { width: "100%", height: "400px" };
const center = { lat: 37.7749, lng: -122.4194 };
const MapInput = ({
  onLocationSelect,
  initialAddress: propInitialAddress
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAouIjqr5Keqg40KQm9LT0uY-wZUAcT7oc",
    libraries: ["places"]
    // Required for autocomplete
  });
  const [marker, setMarker] = reactExports.useState(center);
  const [address, setAddress] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const searchBoxRef = reactExports.useRef();
  const inputRef = reactExports.useRef(null);
  const [initialAddress, setInitialAddress] = reactExports.useState(propInitialAddress);
  reactExports.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .gm-style-cc, .gm-style-cc + div, .gm-style-mtc,
      .gm-fullscreen-control, .gm-svpc, .gm-style img[alt="Google"],
      .gmnoprint a, .gmnoprint span, .gm-style > div > div > a,
      .gm-style div[style*="position: absolute; bottom: 0px; right: 0px;"],
      .gm-style-wtc {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
  }, []);
  reactExports.useEffect(() => {
    if (initialAddress) {
      fetchCoordinates(initialAddress);
    }
  }, [initialAddress]);
  const fetchCoordinates = async (address2) => {
    try {
      const response = await fetch(`/api/geocode?address=${encodeURIComponent(address2)}`);
      const data = await response.json();
      if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const newLocation = { lat: location.lat, lng: location.lng };
        setMarker(newLocation);
        fetchAddress(newLocation);
      }
    } catch (error2) {
      console.error("Error fetching coordinates:", error2);
      setError("Failed to fetch coordinates for the initial address.");
    }
  };
  const fetchAddress = async ({ lat, lng }) => {
    try {
      const response = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}`);
      const data = await response.json();
      if (data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setAddress(formattedAddress);
        if (inputRef.current) {
          inputRef.current.value = formattedAddress;
        }
        const addressComponents = data.results[0].address_components;
        const addressDetails = {
          street: "",
          city: "",
          state: "",
          shortState: "",
          zipCode: ""
        };
        addressComponents.forEach((component) => {
          if (component.types.includes("street_number")) {
            addressDetails.street = component.long_name;
          }
          if (component.types.includes("route")) {
            addressDetails.street += ` ${component.long_name}`;
          }
          if (component.types.includes("locality")) {
            addressDetails.city = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            addressDetails.state = component.long_name;
            addressDetails.shortState = component.short_name;
          }
          if (component.types.includes("postal_code")) {
            addressDetails.zipCode = component.long_name;
          }
        });
        onLocationSelect({ address: formattedAddress, lat, lng, ...addressDetails });
      }
    } catch (error2) {
      setError("Failed to fetch address. Please try again.");
    }
  };
  const getCurrentLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      setError("");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          setMarker(newLocation);
          fetchAddress(newLocation);
        },
        (error2) => {
          switch (error2.code) {
            case error2.PERMISSION_DENIED:
              setError("Location access denied. Please enable location services and try again.");
              break;
            case error2.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case error2.TIMEOUT:
              setError("The request to get location timed out.");
              break;
            default:
              setError("An unknown error occurred while fetching your location.");
          }
        },
        { timeout: 1e4 }
        // 10 seconds timeout
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };
  const handleMapClick = reactExports.useCallback((event) => {
    var _a, _b;
    const newLocation = {
      lat: ((_a = event == null ? void 0 : event.latLng) == null ? void 0 : _a.lat()) ?? 0,
      lng: ((_b = event == null ? void 0 : event.latLng) == null ? void 0 : _b.lng()) ?? 0
    };
    setMarker(newLocation);
    fetchAddress(newLocation);
  }, []);
  const handleMarkerDragEnd = (event) => {
    var _a, _b;
    const newLocation = {
      lat: ((_a = event == null ? void 0 : event.latLng) == null ? void 0 : _a.lat()) ?? 0,
      lng: ((_b = event == null ? void 0 : event.latLng) == null ? void 0 : _b.lng()) ?? 0
    };
    setMarker(newLocation);
    fetchAddress(newLocation);
  };
  const onSearchBoxLoad = (ref) => {
    searchBoxRef.current = ref;
  };
  const onPlacesChanged = () => {
    var _a, _b, _c, _d, _e;
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const countryComponent = (_a = place.address_components) == null ? void 0 : _a.find(
          (component) => component.types.includes("country")
        );
        if ((countryComponent == null ? void 0 : countryComponent.short_name) !== "US") {
          setError("Please select a location within the USA.");
          if (initialAddress && inputRef.current) {
            inputRef.current.value = "";
          }
          setInitialAddress("");
          return;
        }
        setError("");
        const newLocation = {
          lat: ((_c = (_b = place.geometry) == null ? void 0 : _b.location) == null ? void 0 : _c.lat()) || center.lat,
          lng: ((_e = (_d = place.geometry) == null ? void 0 : _d.location) == null ? void 0 : _e.lng()) || center.lng
        };
        setMarker(newLocation);
        fetchAddress(newLocation);
      }
    }
  };
  const mapStyles = [
    {
      featureType: "poi",
      // Points of interest (stores, landmarks, etc.)
      elementType: "all",
      stylers: [{ visibility: "off" }]
      // Hide all POIs
    },
    {
      featureType: "transit",
      // Traffic lights, bus stops, etc.
      elementType: "all",
      stylers: [{ visibility: "off" }]
      // Hide all transit features
    },
    {
      featureType: "road",
      // Roads and streets
      elementType: "labels",
      // Labels for roads
      stylers: [{ visibility: "on" }]
      // Show road labels
    },
    {
      featureType: "administrative",
      // City, state, and country labels
      elementType: "labels",
      // Labels for administrative areas
      stylers: [{ visibility: "on" }]
      // Show administrative labels
    },
    {
      featureType: "landscape",
      // Natural features like parks
      elementType: "all",
      stylers: [{ visibility: "on" }]
      // Hide landscape features
    }
  ];
  if (!isLoaded) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading Map..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", marginBottom: "10px", alignItems: "center", justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: "70%"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        StandaloneSearchBox,
        {
          onLoad: onSearchBoxLoad,
          onPlacesChanged,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Search for an address...",
              className: "form-control",
              style: { width: "100%", padding: "10px", marginRight: "10px" },
              ref: inputRef,
              autoComplete: "off"
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "secondary", onClick: getCurrentLocation, style: { padding: "10px" }, children: "Use Current Location" })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "red" }, children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GoogleMap,
      {
        mapContainerStyle,
        center: marker || center,
        zoom: 18,
        onClick: handleMapClick,
        options: {
          disableDefaultUI: true,
          // Removes all UI elements
          zoomControl: true,
          // Enables zoom buttons manually
          streetViewControl: false,
          // Disables Pegman (Street View)
          fullscreenControl: false,
          // Removes fullscreen button
          mapTypeControl: false,
          // Removes map type selection
          keyboardShortcuts: false,
          // Disables keyboard shortcuts
          styles: mapStyles,
          // Apply custom map styles
          restriction: {
            latLngBounds: {
              north: 49.38,
              south: 24.39,
              west: -124.84,
              east: -66.94
            },
            strictBounds: true
            // Prevents panning outside the bounds
          }
        },
        children: marker && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Marker,
          {
            icon: "",
            position: marker,
            draggable: true,
            onDragEnd: handleMarkerDragEnd
          }
        )
      }
    )
  ] });
};
export {
  DateInput as D,
  MapInput as M,
  PhoneNumberInput as P
};

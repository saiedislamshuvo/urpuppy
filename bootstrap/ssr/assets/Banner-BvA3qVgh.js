import { c as commonjsGlobal, b as requireReact, r as reactExports, q, U, j as jsxRuntimeExports, f as fe } from "../ssr.js";
import { a as SelectFilterInput, M as MobilePicker, B as BreedFilter } from "./BreedFilter-kQyA1QOo.js";
import { G as GenericModal } from "./GenericModal-Du41bhoJ.js";
import { S as StateFilter } from "./StateFilter-CWN9eHJ5.js";
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
import "./react-select.esm-BYLPphZM.js";
import "./index-ttmgawJR.js";
import "./extends-BwmuZ0dU.js";
import "./index-D7h8hQJR.js";
import "./floating-ui.dom-D9vmQZx1.js";
import "./Modal-BtmenwCz.js";
import "./index-DbhDZzck.js";
var lib = {};
var Range$1 = {};
var utils = {};
var types = {};
Object.defineProperty(types, "__esModule", { value: true });
types.Direction = void 0;
var Direction;
(function(Direction2) {
  Direction2["Right"] = "to right";
  Direction2["Left"] = "to left";
  Direction2["Down"] = "to bottom";
  Direction2["Up"] = "to top";
})(Direction || (types.Direction = Direction = {}));
(function(exports) {
  var __spreadArray2 = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.isIOS = exports.useThumbOverlap = exports.assertUnreachable = exports.voidFn = exports.getTrackBackground = exports.replaceAt = exports.schd = exports.translate = exports.getClosestThumbIndex = exports.translateThumbs = exports.getPaddingAndBorder = exports.getMargin = exports.checkInitialOverlap = exports.checkValuesAgainstBoundaries = exports.checkBoundaries = exports.isVertical = exports.relativeValue = exports.normalizeValue = exports.isStepDivisible = exports.isTouchEvent = exports.getStepDecimals = void 0;
  var react_1 = requireReact();
  var types_12 = types;
  var getStepDecimals = function(step) {
    var decimals = step.toString().split(".")[1];
    return decimals ? decimals.length : 0;
  };
  exports.getStepDecimals = getStepDecimals;
  function isTouchEvent(event) {
    return event.touches && event.touches.length || event.changedTouches && event.changedTouches.length;
  }
  exports.isTouchEvent = isTouchEvent;
  function isStepDivisible(min, max, step) {
    var res = (max - min) / step;
    var precision = 8;
    var roundedRes = Number(res.toFixed(precision));
    return parseInt(roundedRes.toString(), 10) === roundedRes;
  }
  exports.isStepDivisible = isStepDivisible;
  function normalizeValue(value, index, min, max, step, allowOverlap, values) {
    var BIG_NUM = 1e11;
    value = Math.round(value * BIG_NUM) / BIG_NUM;
    if (!allowOverlap) {
      var prev = values[index - 1];
      var next = values[index + 1];
      if (prev && prev > value)
        return prev;
      if (next && next < value)
        return next;
    }
    if (value > max)
      return max;
    if (value < min)
      return min;
    var remainder = Math.floor(value * BIG_NUM - min * BIG_NUM) % Math.floor(step * BIG_NUM);
    var closestLowerNum = Math.floor(value * BIG_NUM - Math.abs(remainder));
    var rounded = remainder === 0 ? value : closestLowerNum / BIG_NUM;
    var res = Math.abs(remainder / BIG_NUM) < step / 2 ? rounded : rounded + step;
    var decimalPlaces = (0, exports.getStepDecimals)(step);
    return parseFloat(res.toFixed(decimalPlaces));
  }
  exports.normalizeValue = normalizeValue;
  function relativeValue(value, min, max) {
    return (value - min) / (max - min);
  }
  exports.relativeValue = relativeValue;
  function isVertical(direction) {
    return direction === types_12.Direction.Up || direction === types_12.Direction.Down;
  }
  exports.isVertical = isVertical;
  function checkBoundaries(value, min, max) {
    if (min >= max) {
      throw new RangeError("min (".concat(min, ") is equal/bigger than max (").concat(max, ")"));
    }
    if (value < min) {
      throw new RangeError("value (".concat(value, ") is smaller than min (").concat(min, ")"));
    }
    if (value > max) {
      throw new RangeError("value (".concat(value, ") is bigger than max (").concat(max, ")"));
    }
  }
  exports.checkBoundaries = checkBoundaries;
  function checkValuesAgainstBoundaries(value, min, max) {
    if (value < min) {
      return min;
    }
    if (value > max) {
      return max;
    } else {
      return value;
    }
  }
  exports.checkValuesAgainstBoundaries = checkValuesAgainstBoundaries;
  function checkInitialOverlap(values) {
    if (values.length < 2)
      return;
    if (!values.slice(1).every(function(item, i) {
      return values[i] <= item;
    })) {
      throw new RangeError("values={[".concat(values, "]} needs to be sorted when allowOverlap={false}"));
    }
  }
  exports.checkInitialOverlap = checkInitialOverlap;
  function getMargin(element) {
    var style = window.getComputedStyle(element);
    return {
      top: parseInt(style["margin-top"], 10),
      bottom: parseInt(style["margin-bottom"], 10),
      left: parseInt(style["margin-left"], 10),
      right: parseInt(style["margin-right"], 10)
    };
  }
  exports.getMargin = getMargin;
  function getPaddingAndBorder(element) {
    var style = window.getComputedStyle(element);
    return {
      top: parseInt(style["padding-top"], 10) + parseInt(style["border-top-width"], 10),
      bottom: parseInt(style["padding-bottom"], 10) + parseInt(style["border-bottom-width"], 10),
      left: parseInt(style["padding-left"], 10) + parseInt(style["border-left-width"], 10),
      right: parseInt(style["padding-right"], 10) + parseInt(style["border-right-width"], 10)
    };
  }
  exports.getPaddingAndBorder = getPaddingAndBorder;
  function translateThumbs(elements, offsets, rtl) {
    var inverter = rtl ? -1 : 1;
    elements.forEach(function(element, index) {
      return translate(element, inverter * offsets[index].x, offsets[index].y);
    });
  }
  exports.translateThumbs = translateThumbs;
  function getClosestThumbIndex(thumbs, clientX, clientY, direction) {
    var thumbIndex = 0;
    var minThumbDistance = getThumbDistance(thumbs[0], clientX, clientY, direction);
    for (var i = 1; i < thumbs.length; i++) {
      var thumbDistance = getThumbDistance(thumbs[i], clientX, clientY, direction);
      if (thumbDistance < minThumbDistance) {
        minThumbDistance = thumbDistance;
        thumbIndex = i;
      }
    }
    return thumbIndex;
  }
  exports.getClosestThumbIndex = getClosestThumbIndex;
  function translate(element, x, y) {
    element.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
  }
  exports.translate = translate;
  var schd = function(fn) {
    var lastArgs = [];
    var frameId = null;
    var wrapperFn = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      lastArgs = args;
      if (frameId) {
        return;
      }
      frameId = requestAnimationFrame(function() {
        frameId = null;
        fn.apply(void 0, lastArgs);
      });
    };
    return wrapperFn;
  };
  exports.schd = schd;
  function replaceAt(values, index, value) {
    var ret = values.slice(0);
    ret[index] = value;
    return ret;
  }
  exports.replaceAt = replaceAt;
  function getTrackBackground(_a) {
    var values = _a.values, colors = _a.colors, min = _a.min, max = _a.max, _b = _a.direction, direction = _b === void 0 ? types_12.Direction.Right : _b, _c = _a.rtl, rtl = _c === void 0 ? false : _c;
    if (rtl && direction === types_12.Direction.Right) {
      direction = types_12.Direction.Left;
    } else if (rtl && types_12.Direction.Left) {
      direction = types_12.Direction.Right;
    }
    var progress = values.slice(0).sort(function(a, b) {
      return a - b;
    }).map(function(value) {
      return (value - min) / (max - min) * 100;
    });
    var middle = progress.reduce(function(acc, point, index) {
      return "".concat(acc, ", ").concat(colors[index], " ").concat(point, "%, ").concat(colors[index + 1], " ").concat(point, "%");
    }, "");
    return "linear-gradient(".concat(direction, ", ").concat(colors[0], " 0%").concat(middle, ", ").concat(colors[colors.length - 1], " 100%)");
  }
  exports.getTrackBackground = getTrackBackground;
  function voidFn() {
  }
  exports.voidFn = voidFn;
  function assertUnreachable(x) {
    throw new Error("Didn't expect to get here");
  }
  exports.assertUnreachable = assertUnreachable;
  var getThumbWidth = function(thumbEl, value, separator, decimalPlaces, valueToLabel) {
    if (valueToLabel === void 0) {
      valueToLabel = function(value2) {
        return value2;
      };
    }
    var width = Math.ceil(__spreadArray2([thumbEl], Array.from(thumbEl.children), true).reduce(function(width2, el) {
      var elWidth = Math.ceil(el.getBoundingClientRect().width);
      if (el.innerText && el.innerText.includes(separator) && el.childElementCount === 0) {
        var elClone = el.cloneNode(true);
        elClone.innerHTML = valueToLabel(value.toFixed(decimalPlaces));
        elClone.style.visibility = "hidden";
        document.body.appendChild(elClone);
        elWidth = Math.ceil(elClone.getBoundingClientRect().width);
        document.body.removeChild(elClone);
      }
      return elWidth > width2 ? elWidth : width2;
    }, thumbEl.getBoundingClientRect().width));
    return width;
  };
  var getOverlaps = function(index, offsets, thumbs, values, separator, decimalPlaces, valueToLabel) {
    if (valueToLabel === void 0) {
      valueToLabel = function(value) {
        return value;
      };
    }
    var overlaps = [];
    var buildOverlaps = function(thumbIndex) {
      var thumbXWidth = getThumbWidth(thumbs[thumbIndex], values[thumbIndex], separator, decimalPlaces, valueToLabel);
      var thumbX = offsets[thumbIndex].x;
      offsets.forEach(function(_a, siblingIndex) {
        var siblingX = _a.x;
        var siblingWidth = getThumbWidth(thumbs[siblingIndex], values[siblingIndex], separator, decimalPlaces, valueToLabel);
        if (thumbIndex !== siblingIndex && (thumbX >= siblingX && thumbX <= siblingX + siblingWidth || thumbX + thumbXWidth >= siblingX && thumbX + thumbXWidth <= siblingX + siblingWidth)) {
          if (!overlaps.includes(siblingIndex)) {
            overlaps.push(thumbIndex);
            overlaps.push(siblingIndex);
            overlaps = __spreadArray2(__spreadArray2([], overlaps, true), [thumbIndex, siblingIndex], false);
            buildOverlaps(siblingIndex);
          }
        }
      });
    };
    buildOverlaps(index);
    return Array.from(new Set(overlaps.sort()));
  };
  var useThumbOverlap = function(rangeRef, values, index, step, separator, valueToLabel) {
    if (step === void 0) {
      step = 0.1;
    }
    if (separator === void 0) {
      separator = " - ";
    }
    if (valueToLabel === void 0) {
      valueToLabel = function(value) {
        return value;
      };
    }
    var decimalPlaces = (0, exports.getStepDecimals)(step);
    var _a = (0, react_1.useState)({}), labelStyle = _a[0], setLabelStyle = _a[1];
    var _b = (0, react_1.useState)(valueToLabel(values[index].toFixed(decimalPlaces))), labelValue = _b[0], setLabelValue = _b[1];
    (0, react_1.useEffect)(function() {
      if (rangeRef) {
        var thumbs = rangeRef.getThumbs();
        if (thumbs.length < 1)
          return;
        var newStyle = {};
        var offsets_1 = rangeRef.getOffsets();
        var overlaps = getOverlaps(index, offsets_1, thumbs, values, separator, decimalPlaces, valueToLabel);
        var labelValue_1 = valueToLabel(values[index].toFixed(decimalPlaces));
        if (overlaps.length) {
          var offsetsX = overlaps.reduce(function(a, c, i, s) {
            return a.length ? __spreadArray2(__spreadArray2([], a, true), [offsets_1[s[i]].x], false) : [offsets_1[s[i]].x];
          }, []);
          if (Math.min.apply(Math, offsetsX) === offsets_1[index].x) {
            var labelValues_1 = [];
            overlaps.forEach(function(thumb) {
              labelValues_1.push(values[thumb].toFixed(decimalPlaces));
            });
            labelValue_1 = Array.from(new Set(labelValues_1.sort(function(a, b) {
              return parseFloat(a) - parseFloat(b);
            }))).map(valueToLabel).join(separator);
            var first = Math.min.apply(Math, offsetsX);
            var last = Math.max.apply(Math, offsetsX);
            var lastWidth = thumbs[overlaps[offsetsX.indexOf(last)]].getBoundingClientRect().width;
            newStyle.left = "".concat(Math.abs(first - (last + lastWidth)) / 2, "px");
            newStyle.transform = "translate(-50%, 0)";
          } else {
            newStyle.visibility = "hidden";
          }
        }
        setLabelValue(labelValue_1);
        setLabelStyle(newStyle);
      }
    }, [rangeRef, values]);
    return [labelValue, labelStyle];
  };
  exports.useThumbOverlap = useThumbOverlap;
  function getThumbDistance(thumbEl, clientX, clientY, direction) {
    var _a = thumbEl.getBoundingClientRect(), left = _a.left, top = _a.top, width = _a.width, height = _a.height;
    return isVertical(direction) ? Math.abs(clientY - (top + height / 2)) : Math.abs(clientX - (left + width / 2));
  }
  var isIOS = function() {
    var _a;
    var platform = ((_a = navigator.userAgentData) === null || _a === void 0 ? void 0 : _a.platform) || navigator.platform;
    return [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod"
    ].includes(platform) || // iPad on iOS 13 detection
    navigator.userAgent.includes("Mac") && "ontouchend" in document;
  };
  exports.isIOS = isIOS;
})(utils);
var __extends = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() {
      return m[k];
    } };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }
  __setModuleDefault(result, mod);
  return result;
};
var __spreadArray = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(Range$1, "__esModule", { value: true });
var React = __importStar(requireReact());
var utils_1 = utils;
var types_1 = types;
var INCREASE_KEYS = ["ArrowRight", "ArrowUp", "k", "PageUp"];
var DECREASE_KEYS = ["ArrowLeft", "ArrowDown", "j", "PageDown"];
var Range = (
  /** @class */
  function(_super) {
    __extends(Range2, _super);
    function Range2(props) {
      var _this = _super.call(this, props) || this;
      _this.trackRef = React.createRef();
      _this.thumbRefs = [];
      _this.state = {
        draggedTrackPos: [-1, -1],
        draggedThumbIndex: -1,
        thumbZIndexes: new Array(_this.props.values.length).fill(0).map(function(t, i) {
          return i;
        }),
        isChanged: false,
        markOffsets: []
      };
      _this.getOffsets = function() {
        var _a = _this.props, direction = _a.direction, values = _a.values, min = _a.min, max = _a.max;
        var trackElement = _this.trackRef.current;
        if (!trackElement) {
          console.warn("No track element found.");
          return [];
        }
        var trackRect = trackElement.getBoundingClientRect();
        var trackPadding = (0, utils_1.getPaddingAndBorder)(trackElement);
        return _this.getThumbs().map(function(thumb, index) {
          var thumbOffsets = { x: 0, y: 0 };
          var thumbRect = thumb.getBoundingClientRect();
          var thumbMargins = (0, utils_1.getMargin)(thumb);
          switch (direction) {
            case types_1.Direction.Right:
              thumbOffsets.x = (thumbMargins.left + trackPadding.left) * -1;
              thumbOffsets.y = ((thumbRect.height - trackRect.height) / 2 + trackPadding.top) * -1;
              thumbOffsets.x += trackRect.width * (0, utils_1.relativeValue)(values[index], min, max) - thumbRect.width / 2;
              return thumbOffsets;
            case types_1.Direction.Left:
              thumbOffsets.x = (thumbMargins.right + trackPadding.right) * -1;
              thumbOffsets.y = ((thumbRect.height - trackRect.height) / 2 + trackPadding.top) * -1;
              thumbOffsets.x += trackRect.width - trackRect.width * (0, utils_1.relativeValue)(values[index], min, max) - thumbRect.width / 2;
              return thumbOffsets;
            case types_1.Direction.Up:
              thumbOffsets.x = ((thumbRect.width - trackRect.width) / 2 + thumbMargins.left + trackPadding.left) * -1;
              thumbOffsets.y = -trackPadding.left;
              thumbOffsets.y += trackRect.height - trackRect.height * (0, utils_1.relativeValue)(values[index], min, max) - thumbRect.height / 2;
              return thumbOffsets;
            case types_1.Direction.Down:
              thumbOffsets.x = ((thumbRect.width - trackRect.width) / 2 + thumbMargins.left + trackPadding.left) * -1;
              thumbOffsets.y = -trackPadding.left;
              thumbOffsets.y += trackRect.height * (0, utils_1.relativeValue)(values[index], min, max) - thumbRect.height / 2;
              return thumbOffsets;
            default:
              return (0, utils_1.assertUnreachable)(direction);
          }
        });
      };
      _this.getThumbs = function() {
        if (_this.trackRef && _this.trackRef.current) {
          return Array.from(_this.trackRef.current.children).filter(function(el) {
            return el.hasAttribute("aria-valuenow");
          });
        }
        console.warn("No thumbs found in the track container. Did you forget to pass & spread the `props` param in renderTrack?");
        return [];
      };
      _this.getTargetIndex = function(e) {
        return _this.getThumbs().findIndex(function(child) {
          return child === e.target || child.contains(e.target);
        });
      };
      _this.addTouchEvents = function(e) {
        document.addEventListener("touchmove", _this.schdOnTouchMove, {
          passive: false
        });
        document.addEventListener("touchend", _this.schdOnEnd, {
          passive: false
        });
        document.addEventListener("touchcancel", _this.schdOnEnd, {
          passive: false
        });
      };
      _this.addMouseEvents = function(e) {
        document.addEventListener("mousemove", _this.schdOnMouseMove);
        document.addEventListener("mouseup", _this.schdOnEnd);
      };
      _this.onMouseDownTrack = function(e) {
        var _a;
        if (e.button !== 0 || (0, utils_1.isIOS)())
          return;
        e.persist();
        e.preventDefault();
        _this.addMouseEvents(e.nativeEvent);
        if (_this.props.values.length > 1 && _this.props.draggableTrack) {
          if (_this.thumbRefs.some(function(thumbRef) {
            var _a2;
            return (_a2 = thumbRef.current) === null || _a2 === void 0 ? void 0 : _a2.contains(e.target);
          }))
            return;
          _this.setState({
            draggedTrackPos: [e.clientX, e.clientY]
          }, function() {
            return _this.onMove(e.clientX, e.clientY);
          });
        } else {
          var draggedThumbIndex = (0, utils_1.getClosestThumbIndex)(_this.thumbRefs.map(function(t) {
            return t.current;
          }), e.clientX, e.clientY, _this.props.direction);
          (_a = _this.thumbRefs[draggedThumbIndex].current) === null || _a === void 0 ? void 0 : _a.focus();
          _this.setState({
            draggedThumbIndex
          }, function() {
            return _this.onMove(e.clientX, e.clientY);
          });
        }
      };
      _this.onResize = function() {
        (0, utils_1.translateThumbs)(_this.getThumbs(), _this.getOffsets(), _this.props.rtl);
        _this.calculateMarkOffsets();
      };
      _this.onTouchStartTrack = function(e) {
        var _a;
        e.persist();
        _this.addTouchEvents(e.nativeEvent);
        if (_this.props.values.length > 1 && _this.props.draggableTrack) {
          if (_this.thumbRefs.some(function(thumbRef) {
            var _a2;
            return (_a2 = thumbRef.current) === null || _a2 === void 0 ? void 0 : _a2.contains(e.target);
          }))
            return;
          _this.setState({
            draggedTrackPos: [e.touches[0].clientX, e.touches[0].clientY]
          }, function() {
            return _this.onMove(e.touches[0].clientX, e.touches[0].clientY);
          });
        } else {
          var draggedThumbIndex = (0, utils_1.getClosestThumbIndex)(_this.thumbRefs.map(function(t) {
            return t.current;
          }), e.touches[0].clientX, e.touches[0].clientY, _this.props.direction);
          (_a = _this.thumbRefs[draggedThumbIndex].current) === null || _a === void 0 ? void 0 : _a.focus();
          _this.setState({
            draggedThumbIndex
          }, function() {
            return _this.onMove(e.touches[0].clientX, e.touches[0].clientY);
          });
        }
      };
      _this.onMouseOrTouchStart = function(e) {
        if (_this.props.disabled)
          return;
        var isTouch = (0, utils_1.isTouchEvent)(e);
        if (!isTouch && e.button !== 0)
          return;
        var index = _this.getTargetIndex(e);
        if (index === -1)
          return;
        if (isTouch) {
          _this.addTouchEvents(e);
        } else {
          _this.addMouseEvents(e);
        }
        _this.setState({
          draggedThumbIndex: index,
          thumbZIndexes: _this.state.thumbZIndexes.map(function(t, i) {
            if (i === index) {
              return Math.max.apply(Math, _this.state.thumbZIndexes);
            }
            return t <= _this.state.thumbZIndexes[index] ? t : t - 1;
          })
        });
      };
      _this.onMouseMove = function(e) {
        e.preventDefault();
        _this.onMove(e.clientX, e.clientY);
      };
      _this.onTouchMove = function(e) {
        e.preventDefault();
        _this.onMove(e.touches[0].clientX, e.touches[0].clientY);
      };
      _this.onKeyDown = function(e) {
        var _a = _this.props, values = _a.values, onChange = _a.onChange, step = _a.step, rtl = _a.rtl, direction = _a.direction;
        var isChanged = _this.state.isChanged;
        var index = _this.getTargetIndex(e.nativeEvent);
        var inverter = rtl || direction === types_1.Direction.Left || direction === types_1.Direction.Down ? -1 : 1;
        if (index === -1)
          return;
        if (INCREASE_KEYS.includes(e.key)) {
          e.preventDefault();
          _this.setState({
            draggedThumbIndex: index,
            isChanged: true
          });
          onChange((0, utils_1.replaceAt)(values, index, _this.normalizeValue(values[index] + inverter * (e.key === "PageUp" ? step * 10 : step), index)));
        } else if (DECREASE_KEYS.includes(e.key)) {
          e.preventDefault();
          _this.setState({
            draggedThumbIndex: index,
            isChanged: true
          });
          onChange((0, utils_1.replaceAt)(values, index, _this.normalizeValue(values[index] - inverter * (e.key === "PageDown" ? step * 10 : step), index)));
        } else if (e.key === "Tab") {
          _this.setState({ draggedThumbIndex: -1 }, function() {
            if (isChanged) {
              _this.fireOnFinalChange();
            }
          });
        } else {
          if (isChanged) {
            _this.fireOnFinalChange();
          }
        }
      };
      _this.onKeyUp = function(e) {
        var isChanged = _this.state.isChanged;
        _this.setState({
          draggedThumbIndex: -1
        }, function() {
          if (isChanged) {
            _this.fireOnFinalChange();
          }
        });
      };
      _this.onMove = function(clientX, clientY) {
        var _a = _this.state, draggedThumbIndex = _a.draggedThumbIndex, draggedTrackPos = _a.draggedTrackPos;
        var _b = _this.props, direction = _b.direction, min = _b.min, max = _b.max, onChange = _b.onChange, values = _b.values, step = _b.step, rtl = _b.rtl;
        if (draggedThumbIndex === -1 && draggedTrackPos[0] === -1 && draggedTrackPos[1] === -1)
          return null;
        var trackElement = _this.trackRef.current;
        if (!trackElement)
          return null;
        var trackRect = trackElement.getBoundingClientRect();
        var trackLength = (0, utils_1.isVertical)(direction) ? trackRect.height : trackRect.width;
        if (draggedTrackPos[0] !== -1 && draggedTrackPos[1] !== -1) {
          var dX = clientX - draggedTrackPos[0];
          var dY = clientY - draggedTrackPos[1];
          var deltaValue = 0;
          switch (direction) {
            case types_1.Direction.Right:
            case types_1.Direction.Left:
              deltaValue = dX / trackLength * (max - min);
              break;
            case types_1.Direction.Down:
            case types_1.Direction.Up:
              deltaValue = dY / trackLength * (max - min);
              break;
            default:
              (0, utils_1.assertUnreachable)(direction);
          }
          if (rtl) {
            deltaValue *= -1;
          }
          if (Math.abs(deltaValue) >= step / 2) {
            for (var i = 0; i < _this.thumbRefs.length; i++) {
              if (values[i] === max && Math.sign(deltaValue) === 1 || values[i] === min && Math.sign(deltaValue) === -1)
                return;
              var thumbValue = values[i] + deltaValue;
              if (thumbValue > max)
                deltaValue = max - values[i];
              else if (thumbValue < min)
                deltaValue = min - values[i];
            }
            var newValues = values.slice(0);
            for (var i = 0; i < _this.thumbRefs.length; i++) {
              newValues = (0, utils_1.replaceAt)(newValues, i, _this.normalizeValue(values[i] + deltaValue, i));
            }
            _this.setState({
              draggedTrackPos: [clientX, clientY]
            });
            onChange(newValues);
          }
        } else {
          var newValue = 0;
          switch (direction) {
            case types_1.Direction.Right:
              newValue = (clientX - trackRect.left) / trackLength * (max - min) + min;
              break;
            case types_1.Direction.Left:
              newValue = (trackLength - (clientX - trackRect.left)) / trackLength * (max - min) + min;
              break;
            case types_1.Direction.Down:
              newValue = (clientY - trackRect.top) / trackLength * (max - min) + min;
              break;
            case types_1.Direction.Up:
              newValue = (trackLength - (clientY - trackRect.top)) / trackLength * (max - min) + min;
              break;
            default:
              (0, utils_1.assertUnreachable)(direction);
          }
          if (rtl) {
            newValue = max + min - newValue;
          }
          if (Math.abs(values[draggedThumbIndex] - newValue) >= step / 2) {
            onChange((0, utils_1.replaceAt)(values, draggedThumbIndex, _this.normalizeValue(newValue, draggedThumbIndex)));
          }
        }
      };
      _this.normalizeValue = function(value, index) {
        var _a = _this.props, min = _a.min, max = _a.max, step = _a.step, allowOverlap = _a.allowOverlap, values = _a.values;
        return (0, utils_1.normalizeValue)(value, index, min, max, step, allowOverlap, values);
      };
      _this.onEnd = function(e) {
        e.preventDefault();
        document.removeEventListener("mousemove", _this.schdOnMouseMove);
        document.removeEventListener("touchmove", _this.schdOnTouchMove);
        document.removeEventListener("mouseup", _this.schdOnEnd);
        document.removeEventListener("touchend", _this.schdOnEnd);
        document.removeEventListener("touchcancel", _this.schdOnEnd);
        if (_this.state.draggedThumbIndex === -1 && _this.state.draggedTrackPos[0] === -1 && _this.state.draggedTrackPos[1] === -1)
          return null;
        _this.setState({ draggedThumbIndex: -1, draggedTrackPos: [-1, -1] }, function() {
          _this.fireOnFinalChange();
        });
      };
      _this.fireOnFinalChange = function() {
        _this.setState({ isChanged: false });
        var _a = _this.props, onFinalChange = _a.onFinalChange, values = _a.values;
        if (onFinalChange) {
          onFinalChange(values);
        }
      };
      _this.updateMarkRefs = function(props2) {
        if (!props2.renderMark) {
          _this.numOfMarks = void 0;
          _this.markRefs = void 0;
          return;
        }
        _this.numOfMarks = (props2.max - props2.min) / _this.props.step;
        _this.markRefs = [];
        for (var i = 0; i < _this.numOfMarks + 1; i++) {
          _this.markRefs[i] = React.createRef();
        }
      };
      _this.calculateMarkOffsets = function() {
        if (!_this.props.renderMark || !_this.trackRef || !_this.numOfMarks || !_this.markRefs || _this.trackRef.current === null)
          return;
        var elStyles = window.getComputedStyle(_this.trackRef.current);
        var trackWidth = parseInt(elStyles.width, 10);
        var trackHeight = parseInt(elStyles.height, 10);
        var paddingLeft = parseInt(elStyles.paddingLeft, 10);
        var paddingTop = parseInt(elStyles.paddingTop, 10);
        var res = [];
        for (var i = 0; i < _this.numOfMarks + 1; i++) {
          var markHeight = 9999;
          var markWidth = 9999;
          if (_this.markRefs[i].current) {
            var markRect = _this.markRefs[i].current.getBoundingClientRect();
            markHeight = markRect.height;
            markWidth = markRect.width;
          }
          if (_this.props.direction === types_1.Direction.Left || _this.props.direction === types_1.Direction.Right) {
            res.push([
              Math.round(trackWidth / _this.numOfMarks * i + paddingLeft - markWidth / 2),
              -Math.round((markHeight - trackHeight) / 2)
            ]);
          } else {
            res.push([
              Math.round(trackHeight / _this.numOfMarks * i + paddingTop - markHeight / 2),
              -Math.round((markWidth - trackWidth) / 2)
            ]);
          }
        }
        _this.setState({ markOffsets: res });
      };
      if (props.step === 0) {
        throw new Error('"step" property should be a positive number');
      }
      _this.schdOnMouseMove = (0, utils_1.schd)(_this.onMouseMove);
      _this.schdOnTouchMove = (0, utils_1.schd)(_this.onTouchMove);
      _this.schdOnEnd = (0, utils_1.schd)(_this.onEnd);
      _this.thumbRefs = props.values.map(function() {
        return React.createRef();
      });
      _this.updateMarkRefs(props);
      return _this;
    }
    Range2.prototype.componentDidMount = function() {
      var _this = this;
      var _a = this.props, values = _a.values, min = _a.min, step = _a.step;
      this.resizeObserver = window.ResizeObserver ? new window.ResizeObserver(this.onResize) : {
        observe: function() {
          return window.addEventListener("resize", _this.onResize);
        },
        unobserve: function() {
          return window.removeEventListener("resize", _this.onResize);
        }
      };
      document.addEventListener("touchstart", this.onMouseOrTouchStart, {
        passive: false
      });
      document.addEventListener("mousedown", this.onMouseOrTouchStart, {
        passive: false
      });
      !this.props.allowOverlap && (0, utils_1.checkInitialOverlap)(this.props.values);
      this.props.values.forEach(function(value) {
        return (0, utils_1.checkBoundaries)(value, _this.props.min, _this.props.max);
      });
      this.resizeObserver.observe(this.trackRef.current);
      (0, utils_1.translateThumbs)(this.getThumbs(), this.getOffsets(), this.props.rtl);
      this.calculateMarkOffsets();
      values.forEach(function(value) {
        if (!(0, utils_1.isStepDivisible)(min, value, step)) {
          console.warn("The `values` property is in conflict with the current `step`, `min`, and `max` properties. Please provide values that are accessible using the min, max, and step values.");
        }
      });
    };
    Range2.prototype.componentDidUpdate = function(prevProps, prevState) {
      var _a = this.props, max = _a.max, min = _a.min, step = _a.step, values = _a.values, rtl = _a.rtl;
      if (prevProps.max !== max || prevProps.min !== min || prevProps.step !== step) {
        this.updateMarkRefs(this.props);
      }
      (0, utils_1.translateThumbs)(this.getThumbs(), this.getOffsets(), rtl);
      if (prevProps.max !== max || prevProps.min !== min || prevProps.step !== step || prevState.markOffsets.length !== this.state.markOffsets.length) {
        this.calculateMarkOffsets();
        values.forEach(function(value) {
          if (!(0, utils_1.isStepDivisible)(min, value, step)) {
            console.warn("The `values` property is in conflict with the current `step`, `min`, and `max` properties. Please provide values that are accessible using the min, max, and step values.");
          }
        });
      }
    };
    Range2.prototype.componentWillUnmount = function() {
      var options2 = {
        passive: false
      };
      document.removeEventListener("mousedown", this.onMouseOrTouchStart, options2);
      document.removeEventListener("mousemove", this.schdOnMouseMove);
      document.removeEventListener("touchmove", this.schdOnTouchMove);
      document.removeEventListener("touchstart", this.onMouseOrTouchStart);
      document.removeEventListener("mouseup", this.schdOnEnd);
      document.removeEventListener("touchend", this.schdOnEnd);
      this.resizeObserver.unobserve(this.trackRef.current);
    };
    Range2.prototype.render = function() {
      var _this = this;
      var _a = this.props, label = _a.label, labelledBy = _a.labelledBy, renderTrack = _a.renderTrack, renderThumb = _a.renderThumb, _b = _a.renderMark, renderMark = _b === void 0 ? function() {
        return null;
      } : _b, values = _a.values, min = _a.min, max = _a.max, allowOverlap = _a.allowOverlap, disabled = _a.disabled;
      var _c = this.state, draggedThumbIndex = _c.draggedThumbIndex, thumbZIndexes = _c.thumbZIndexes, markOffsets = _c.markOffsets;
      return renderTrack({
        props: {
          style: {
            // creates stacking context that prevents z-index applied to thumbs
            // interfere with other elements
            transform: "scale(1)",
            cursor: draggedThumbIndex > -1 ? "grabbing" : this.props.draggableTrack ? (0, utils_1.isVertical)(this.props.direction) ? "ns-resize" : "ew-resize" : values.length === 1 && !disabled ? "pointer" : "inherit"
          },
          onMouseDown: disabled ? utils_1.voidFn : this.onMouseDownTrack,
          onTouchStart: disabled ? utils_1.voidFn : this.onTouchStartTrack,
          ref: this.trackRef
        },
        isDragged: this.state.draggedThumbIndex > -1,
        disabled,
        children: __spreadArray(__spreadArray([], markOffsets.map(function(offset, index, arr) {
          return renderMark({
            props: {
              style: _this.props.direction === types_1.Direction.Left || _this.props.direction === types_1.Direction.Right ? {
                position: "absolute",
                left: "".concat(offset[0], "px"),
                marginTop: "".concat(offset[1], "px")
              } : {
                position: "absolute",
                top: "".concat(offset[0], "px"),
                marginLeft: "".concat(offset[1], "px")
              },
              key: "mark".concat(index),
              ref: _this.markRefs[index]
            },
            index
          });
        }), true), values.map(function(value, index) {
          var isDragged = _this.state.draggedThumbIndex === index;
          return renderThumb({
            index,
            value,
            isDragged,
            props: {
              style: {
                position: "absolute",
                zIndex: thumbZIndexes[index],
                cursor: disabled ? "inherit" : isDragged ? "grabbing" : "grab",
                userSelect: "none",
                touchAction: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none"
              },
              key: index,
              tabIndex: disabled ? void 0 : 0,
              "aria-valuemax": allowOverlap ? max : values[index + 1] || max,
              "aria-valuemin": allowOverlap ? min : values[index - 1] || min,
              "aria-valuenow": value,
              draggable: false,
              ref: _this.thumbRefs[index],
              "aria-label": label,
              "aria-labelledby": labelledBy,
              role: "slider",
              onKeyDown: disabled ? utils_1.voidFn : _this.onKeyDown,
              onKeyUp: disabled ? utils_1.voidFn : _this.onKeyUp
            }
          });
        }), true)
      });
    };
    Range2.defaultProps = {
      label: "Accessibility label",
      labelledBy: null,
      step: 1,
      direction: types_1.Direction.Right,
      rtl: false,
      disabled: false,
      allowOverlap: false,
      draggableTrack: false,
      min: 0,
      max: 100
    };
    return Range2;
  }(React.Component)
);
Range$1.default = Range;
(function(exports) {
  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.checkValuesAgainstBoundaries = exports.relativeValue = exports.useThumbOverlap = exports.Direction = exports.getTrackBackground = exports.Range = void 0;
  var Range_1 = __importDefault(Range$1);
  exports.Range = Range_1.default;
  var utils_12 = utils;
  Object.defineProperty(exports, "getTrackBackground", { enumerable: true, get: function() {
    return utils_12.getTrackBackground;
  } });
  Object.defineProperty(exports, "useThumbOverlap", { enumerable: true, get: function() {
    return utils_12.useThumbOverlap;
  } });
  Object.defineProperty(exports, "relativeValue", { enumerable: true, get: function() {
    return utils_12.relativeValue;
  } });
  Object.defineProperty(exports, "checkValuesAgainstBoundaries", { enumerable: true, get: function() {
    return utils_12.checkValuesAgainstBoundaries;
  } });
  var types_12 = types;
  Object.defineProperty(exports, "Direction", { enumerable: true, get: function() {
    return types_12.Direction;
  } });
})(lib);
const PriceFilter = ({ setPrice, range = [1, 1e4] }) => {
  const { props } = q();
  const price_filter_range = props.price_filter_range;
  const [priceRange, setValues] = U.useState(
    price_filter_range || range
  );
  const [min, max] = reactExports.useMemo(() => [
    (price_filter_range == null ? void 0 : price_filter_range[0]) ?? range[0],
    (price_filter_range == null ? void 0 : price_filter_range[1]) ?? range[1]
  ], [price_filter_range, range]);
  const trackBackground = reactExports.useMemo(() => lib.getTrackBackground({
    values: priceRange,
    colors: ["#ccc", "var(--bs-primary)", "#ccc"],
    min,
    max
  }), [priceRange, min, max]);
  const handlePriceChange = reactExports.useCallback((values) => {
    const newValues = values;
    setValues(newValues);
    setPrice((prev) => ({
      ...prev,
      price: {
        label: `$${Number(newValues[0]).toLocaleString()} - $${Number(newValues[1]).toLocaleString()}`,
        value: newValues
      }
    }));
  }, [setPrice]);
  const renderThumb = reactExports.useCallback(({ props: props2 }) => {
    const { key, ...restProps } = props2;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ...restProps,
        style: {
          ...restProps.style,
          height: "17px",
          width: "17px",
          borderRadius: "90px",
          boxShadow: "0px 0px 0px 5px rgba(232, 131, 37, 0.2)",
          backgroundColor: "var(--bs-primary)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      },
      key
    );
  }, []);
  const renderTrack = reactExports.useCallback(({ props: props2, children }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      onMouseDown: props2.onMouseDown,
      onTouchStart: props2.onTouchStart,
      style: {
        ...props2.style,
        height: "36px",
        display: "flex",
        width: "100%"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: props2.ref,
          style: {
            height: "5px",
            width: "100%",
            borderRadius: "4px",
            background: trackBackground,
            alignSelf: "center"
          },
          children
        }
      )
    }
  ), [trackBackground]);
  const priceDisplay = reactExports.useMemo(() => `$${priceRange[0].toLocaleString()} - $${priceRange[1].toLocaleString()}`, [priceRange]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-dollar.svg", alt: "Price filter" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "font-work-sans mb-0", children: "Price range" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dropdown", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "btn btn-primary p-0 bg-white border-0 text-dark fs-2 fw-normal shadow-none",
            "data-bs-toggle": "dropdown",
            "aria-expanded": "false",
            "data-bs-auto-close": "outside",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "e.g. (",
              priceDisplay,
              ")"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dropdown-menu p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mx-2",
            style: {
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              position: "relative"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                lib.Range,
                {
                  values: priceRange,
                  step: 0.1,
                  min,
                  max,
                  onChange: handlePriceChange,
                  renderTrack,
                  renderThumb
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: "-15px",
                    left: "0",
                    color: "var(--bs-secondary)",
                    fontSize: "12px",
                    fontFamily: "Arial, Helvetica Neue, Helvetica, sans-serif",
                    padding: "4px",
                    borderRadius: "4px",
                    backgroundColor: "var(--secondary-color)"
                  },
                  children: [
                    "$",
                    priceRange[0].toLocaleString()
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: "-15px",
                    right: "0",
                    color: "var(--bs-secondary)",
                    fontSize: "12px",
                    fontFamily: "Arial, Helvetica Neue, Helvetica, sans-serif",
                    padding: "4px",
                    borderRadius: "4px",
                    backgroundColor: "var(--secondary-color)"
                  },
                  children: [
                    "$",
                    priceRange[1].toLocaleString()
                  ]
                }
              )
            ]
          }
        ) })
      ] })
    ] })
  ] });
};
const PriceFilter$1 = reactExports.memo(PriceFilter);
const SelectMobile = ({
  loadOptions,
  selectedItem,
  handleInputChange,
  setIsModalOpen,
  options: options2,
  handleMobileInputChange
}) => {
  const isMobile = q().props.isMobile;
  return !isMobile ? /* @__PURE__ */ jsxRuntimeExports.jsx(SelectFilterInput, { options: options2, onChange: handleInputChange, value: selectedItem }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GenericModal, { title: "Choose breed", setIsModalOpen, centered: true, buttonTitle: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {}, className: "filter-custom-label", children: selectedItem == null ? void 0 : selectedItem.label }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(MobilePicker, { value: selectedItem, setMobileFilter: handleMobileInputChange, options: options2 }) });
};
const options$1 = [
  { value: "1", label: "Up to 1 week" },
  { value: "2", label: "Up to 2 Weeks" },
  { value: "4", label: "Up to 4 Weeks" },
  { value: "10", label: "Up to 10 Weeks" },
  { value: "18", label: "Up to 18 Weeks" },
  { value: "0", label: "Older than 18 Weeks" }
];
const AgeFilter = ({ setAge, defaultValue }) => {
  const [value, setValue] = reactExports.useState(options$1.find((option) => option.value === (defaultValue == null ? void 0 : defaultValue.value)));
  const handleInputChange = (e) => {
    setValue(e);
    setAge((prev) => ({
      ...prev,
      age: { label: e.label, value: e.value }
    }));
  };
  const isMobile = q().props.isMobile;
  const handleMobileInputChange = (selected) => {
    var _a;
    let selectedValue = isMobile ? ((_a = options$1.find((option) => (option == null ? void 0 : option.label) === selectedValue)) == null ? void 0 : _a.value) || 0 : selected.value;
    setAge((prev) => ({
      ...prev,
      age: { label: selectedValue, value: options$1.find((option) => option.value === (selectedValue == null ? void 0 : selectedValue.value)) }
    }));
    setValue({
      label: selected.value,
      value: selected.value
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-calendar.svg", alt: "urpuppy-img" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-box", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "font-work-sans mb-0", children: "Age" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectMobile,
        {
          title: "Age",
          handleMobileInputChange,
          selectedItem: value,
          options: options$1,
          handleInputChange
        }
      )
    ] })
  ] });
};
const options = [
  { value: "All", label: "All" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" }
];
const GenderFilter = ({ setGender, defaultValue }) => {
  const [selectedAge, setSelectedAge] = reactExports.useState(defaultValue);
  const [value, setValue] = reactExports.useState(defaultValue);
  const handleInputChange = (e) => {
    setValue(e);
    setGender((prev) => ({
      ...prev,
      gender: { label: e.label, value: e.value }
    }));
  };
  const handleMobileInputChange = (selected) => {
    setGender((prev) => ({
      ...prev,
      gender: { label: selected.value, value: selected.value }
    }));
    setValue({
      label: selected.value,
      value: selected.value
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-gender.svg", alt: "urpuppy-img" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-box", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "font-work-sans mb-0", children: "Sex" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectMobile,
        {
          title: "Gender",
          handleMobileInputChange,
          selectedItem: value,
          options,
          handleInputChange,
          value
        },
        "gender"
      )
    ] })
  ] });
};
const FilterBox = () => {
  const { props } = q();
  const { payload, isMobile } = props;
  const initialFilters = U.useMemo(() => {
    var _a, _b, _c, _d, _e, _f, _g;
    return {
      breed: { label: ((_a = payload == null ? void 0 : payload.filter) == null ? void 0 : _a.breed) ?? "e.g. (Breed)", value: ((_b = payload == null ? void 0 : payload.filter) == null ? void 0 : _b.breed) ?? "All" },
      gender: { label: ((_c = payload == null ? void 0 : payload.filter) == null ? void 0 : _c.gender) ?? "e.g. (Male)", value: ((_d = payload == null ? void 0 : payload.filter) == null ? void 0 : _d.gender) ?? "All" },
      age: { label: "1 week", value: ((_e = payload == null ? void 0 : payload.filter) == null ? void 0 : _e.age) ?? "0" },
      price: { label: "$1 - $2,500", value: [1, 25e4] },
      state: { label: ((_f = payload == null ? void 0 : payload.filter) == null ? void 0 : _f.state) ?? "e.g. (New York)", value: ((_g = payload == null ? void 0 : payload.filter) == null ? void 0 : _g.state) ?? "All" }
    };
  }, [payload == null ? void 0 : payload.filter]);
  const [filter, setFilter] = reactExports.useState(initialFilters);
  const handleSearch = (e) => {
    e.preventDefault();
    const flattenedPayload = Object.entries(filter).reduce((acc, [key, obj]) => {
      acc[key] = obj.value;
      return acc;
    }, {});
    fe.visit("/puppies", {
      data: { filter: flattenedPayload },
      only: ["puppies", "breed_filter_list", "state_filter_list", "has_search"],
      method: "get",
      preserveState: true,
      preserveScroll: true
    });
  };
  const renderFilterLabel = U.useCallback(() => {
    return Object.entries(filter).filter(([key]) => key !== "state" && key !== "price").map(([key, item], index, array) => /* @__PURE__ */ jsxRuntimeExports.jsxs(U.Fragment, { children: [
      item.label,
      index < array.length - 1 && " ・"
    ] }, key));
  }, [filter]);
  const renderDesktopFilters = U.useCallback(() => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid-filter d-none d-lg-block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center justify-content-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "breed d-flex gap-2 border-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreedFilter, { setBreed: setFilter, defaultValue: filter.breed }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sex d-flex gap-2 border-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GenderFilter, { setGender: setFilter, defaultValue: filter.gender }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "age d-flex gap-2 border-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AgeFilter, { setAge: setFilter, defaultValue: filter.age }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "price-range d-flex gap-2 border-end flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PriceFilter$1, { setPrice: setFilter }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "state d-flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StateFilter, { setState: setFilter, defaultValue: filter.state }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        onClick: handleSearch,
        className: "btn btn-primary round-48 flex-shrink-0 p-2 d-flex align-items-center justify-content-center",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-search.svg", alt: "urpuppy-img" })
      }
    )
  ] }) }), [filter, setFilter, handleSearch]);
  const renderMobileFilters = U.useCallback(() => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid-filter-mobile aos-init aos-animate dropdown d-grid d-lg-none", "data-aos": "fade-up", "data-aos-delay": "300", "data-aos-duration": "1000", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "btn btn-white bg-white py-6 d-flex align-items-center justify-content-between gap-4",
        "data-bs-toggle": "dropdown",
        "aria-expanded": "false",
        "data-bs-auto-close": "outside",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "breed d-flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-breed.svg", alt: "urpuppy-img" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-work-sans mb-0", children: "Find your puppy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fs-2 text-muted fw-normal", children: renderFilterLabel() })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              onClick: handleSearch,
              className: "btn btn-primary round-48 flex-shrink-0 p-2 d-flex align-items-center justify-content-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-search.svg", alt: "urpuppy-img" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dropdown-menu px-4 py-3 w-100 mt-n1", style: { zIndex: "999999999!important" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "breed d-flex gap-2 border-bottom py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreedFilter, { setBreed: setFilter, defaultValue: filter.breed }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sex d-flex gap-2 border-bottom py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GenderFilter, { setGender: setFilter, defaultValue: filter.gender }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "age d-flex gap-2 border-bottom py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AgeFilter, { setAge: setFilter, defaultValue: filter.age }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "price-range d-flex gap-2 border-bottom py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PriceFilter$1, { setPrice: setFilter }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "state d-flex gap-2 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StateFilter, { setState: setFilter, defaultValue: filter.state }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { onClick: handleSearch, className: "btn btn-primary w-100 d-flex align-items-center justify-content-center mt-3", children: "Search" })
    ] })
  ] }), [filter, setFilter, handleSearch, renderFilterLabel]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: isMobile ? renderMobileFilters() : renderDesktopFilters() });
};
const Banner = ({
  header = "Find Ur Perfect Puppy Today!",
  subheader = "Find Your Perfect Pup: Healthy, Happy Puppies from Trusted Breeders!",
  enable_filter = true,
  size = "lg"
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: size == "lg" ? "z-30 hero-section position-relative d-flex align-items-center" : "hero-section position-relative d-flex align-items-center pt-11 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: size == "lg" ? "container position-relative z-1" : "container position-relative z-1 mt-lg-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-xl-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h1",
      {
        className: "aos-init aos-animate text-white text-center fs-11 mb-1",
        "data-aos": "fade-up",
        "data-aos-delay": "100",
        "data-aos-duration": "1000",
        children: header
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: " aos-init aos-animate text-white text-center fs-7 mb-4 mb-lg-5",
        "data-aos": "fade-up",
        "data-aos-delay": "200",
        "data-aos-duration": "1000",
        children: subheader
      }
    ),
    enable_filter && /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBox, {})
  ] }) }) }) });
};
export {
  Banner as default
};

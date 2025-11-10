import { j as jsxRuntimeExports, r as reactExports, U, q } from "../ssr.js";
import { A as AsyncPaginate } from "./index-C9Hr-vST.js";
import { S as StateManagedSelect$1 } from "./react-select.esm-tWlRM8_L.js";
import { G as GenericModal } from "./GenericModal-BuSM2RnD.js";
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
    function V(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = w && e[w] || e[N];
      return typeof r == "function" ? r : null;
    }
    var P = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function d(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        $("error", e, t);
      }
    }
    function $(e, r, t) {
      {
        var n = P.ReactDebugCurrentFrame, c = n.getStackAddendum();
        c !== "" && (r += "%s", t = t.concat([c]));
        var v = t.map(function(s) {
          return String(s);
        });
        v.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, v);
      }
    }
    var J = false, M = false, q2 = false, ae = false, K = false, L;
    L = Symbol.for("react.module.reference");
    function pe(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === m || e === u || K || e === f || e === k || e === h || ae || e === S || J || M || q2 || typeof e == "object" && e !== null && (e.$$typeof === _ || e.$$typeof === C || e.$$typeof === E || e.$$typeof === R || e.$$typeof === p || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === L || e.getModuleId !== void 0));
    }
    function z(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var c = r.displayName || r.name || "";
      return c !== "" ? t + "(" + c + ")" : t;
    }
    function oe(e) {
      return e.displayName || "Context";
    }
    function j(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && d("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
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
      if (typeof e == "object")
        switch (e.$$typeof) {
          case R:
            var r = e;
            return oe(r) + ".Consumer";
          case E:
            var t = e;
            return oe(t._context) + ".Provider";
          case p:
            return z(e, e.render, "ForwardRef");
          case C:
            var n = e.displayName || null;
            return n !== null ? n : j(e.type) || "Memo";
          case _: {
            var c = e, v = c._payload, s = c._init;
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
          var e = {
            configurable: true,
            enumerable: true,
            value: Q,
            writable: true
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        Y++;
      }
    }
    function Ze() {
      {
        if (Y--, Y === 0) {
          var e = {
            configurable: true,
            enumerable: true,
            writable: true
          };
          Object.defineProperties(console, {
            log: D({}, e, {
              value: X
            }),
            info: D({}, e, {
              value: G
            }),
            warn: D({}, e, {
              value: Z
            }),
            error: D({}, e, {
              value: ie
            }),
            group: D({}, e, {
              value: se
            }),
            groupCollapsed: D({}, e, {
              value: a
            }),
            groupEnd: D({}, e, {
              value: T
            })
          });
        }
        Y < 0 && d("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var he = P.ReactCurrentDispatcher, ge;
    function ue(e, r, t) {
      {
        if (ge === void 0)
          try {
            throw Error();
          } catch (c) {
            var n = c.stack.trim().match(/\n( *(at )?)/);
            ge = n && n[1] || "";
          }
        return `
` + ge + e;
      }
    }
    var me = false, ce;
    {
      var Qe = typeof WeakMap == "function" ? WeakMap : Map;
      ce = new Qe();
    }
    function Ie(e, r) {
      if (!e || me)
        return "";
      {
        var t = ce.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
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
              n = x;
            }
            Reflect.construct(e, [], s);
          } else {
            try {
              s.call();
            } catch (x) {
              n = x;
            }
            e.call(s.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (x) {
            n = x;
          }
          e();
        }
      } catch (x) {
        if (x && n && typeof x.stack == "string") {
          for (var i = x.stack.split(`
`), O = n.stack.split(`
`), y = i.length - 1, b = O.length - 1; y >= 1 && b >= 0 && i[y] !== O[b]; )
            b--;
          for (; y >= 1 && b >= 0; y--, b--)
            if (i[y] !== O[b]) {
              if (y !== 1 || b !== 1)
                do
                  if (y--, b--, b < 0 || i[y] !== O[b]) {
                    var I = `
` + i[y].replace(" at new ", " at ");
                    return e.displayName && I.includes("<anonymous>") && (I = I.replace("<anonymous>", e.displayName)), typeof e == "function" && ce.set(e, I), I;
                  }
                while (y >= 1 && b >= 0);
              break;
            }
        }
      } finally {
        me = false, he.current = v, Ze(), Error.prepareStackTrace = c;
      }
      var B = e ? e.displayName || e.name : "", U2 = B ? ue(B) : "";
      return typeof e == "function" && ce.set(e, U2), U2;
    }
    function er(e, r, t) {
      return Ie(e, false);
    }
    function rr(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function le(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ie(e, rr(e));
      if (typeof e == "string")
        return ue(e);
      switch (e) {
        case k:
          return ue("Suspense");
        case h:
          return ue("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case p:
            return er(e.render);
          case C:
            return le(e.type, r, t);
          case _: {
            var n = e, c = n._payload, v = n._init;
            try {
              return le(v(c), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var ee = Object.prototype.hasOwnProperty, Ae = {}, Fe = P.ReactDebugCurrentFrame;
    function fe(e) {
      if (e) {
        var r = e._owner, t = le(e.type, e._source, r ? r.type : null);
        Fe.setExtraStackFrame(t);
      } else
        Fe.setExtraStackFrame(null);
    }
    function tr(e, r, t, n, c) {
      {
        var v = Function.call.bind(ee);
        for (var s in e)
          if (v(e, s)) {
            var i = void 0;
            try {
              if (typeof e[s] != "function") {
                var O = Error((n || "React class") + ": " + t + " type `" + s + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[s] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw O.name = "Invariant Violation", O;
              }
              i = e[s](r, s, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (y) {
              i = y;
            }
            i && !(i instanceof Error) && (fe(c), d("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, s, typeof i), fe(null)), i instanceof Error && !(i.message in Ae) && (Ae[i.message] = true, fe(c), d("Failed %s type: %s", t, i.message), fe(null));
          }
      }
    }
    var nr = Array.isArray;
    function Ee(e) {
      return nr(e);
    }
    function ar(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function or(e) {
      try {
        return Me(e), false;
      } catch {
        return true;
      }
    }
    function Me(e) {
      return "" + e;
    }
    function Ne(e) {
      if (or(e))
        return d("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ar(e)), Me(e);
    }
    var re = P.ReactCurrentOwner, ir = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    }, We, $e;
    function sr(e) {
      if (ee.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return false;
      }
      return e.ref !== void 0;
    }
    function ur(e) {
      if (ee.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return false;
      }
      return e.key !== void 0;
    }
    function cr(e, r) {
      if (typeof e.ref == "string" && re.current && r) ;
    }
    function lr(e, r) {
      {
        var t = function() {
          We || (We = true, d("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = true, Object.defineProperty(e, "key", {
          get: t,
          configurable: true
        });
      }
    }
    function fr(e, r) {
      {
        var t = function() {
          $e || ($e = true, d("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = true, Object.defineProperty(e, "ref", {
          get: t,
          configurable: true
        });
      }
    }
    var dr = function(e, r, t, n, c, v, s) {
      var i = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: l,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
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
        value: n
      }), Object.defineProperty(i, "_source", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: c
      }), Object.freeze && (Object.freeze(i.props), Object.freeze(i)), i;
    };
    function vr(e, r, t, n, c) {
      {
        var v, s = {}, i = null, O = null;
        t !== void 0 && (Ne(t), i = "" + t), ur(r) && (Ne(r.key), i = "" + r.key), sr(r) && (O = r.ref, cr(r, c));
        for (v in r)
          ee.call(r, v) && !ir.hasOwnProperty(v) && (s[v] = r[v]);
        if (e && e.defaultProps) {
          var y = e.defaultProps;
          for (v in y)
            s[v] === void 0 && (s[v] = y[v]);
        }
        if (i || O) {
          var b = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          i && lr(s, b), O && fr(s, b);
        }
        return dr(e, i, O, c, n, re.current, s);
      }
    }
    var be = P.ReactCurrentOwner, Ye = P.ReactDebugCurrentFrame;
    function H(e) {
      if (e) {
        var r = e._owner, t = le(e.type, e._source, r ? r.type : null);
        Ye.setExtraStackFrame(t);
      } else
        Ye.setExtraStackFrame(null);
    }
    var Re;
    Re = false;
    function _e(e) {
      return typeof e == "object" && e !== null && e.$$typeof === l;
    }
    function Le() {
      {
        if (be.current) {
          var e = j(be.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function pr(e) {
      {
        return "";
      }
    }
    var Ue = {};
    function hr(e) {
      {
        var r = Le();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Ve(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = true;
        var t = hr(r);
        if (Ue[t])
          return;
        Ue[t] = true;
        var n = "";
        e && e._owner && e._owner !== be.current && (n = " It was passed a child from " + j(e._owner.type) + "."), H(e), d('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), H(null);
      }
    }
    function Ge(e, r) {
      {
        if (typeof e != "object")
          return;
        if (Ee(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            _e(n) && Ve(n, r);
          }
        else if (_e(e))
          e._store && (e._store.validated = true);
        else if (e) {
          var c = V(e);
          if (typeof c == "function" && c !== e.entries)
            for (var v = c.call(e), s; !(s = v.next()).done; )
              _e(s.value) && Ve(s.value, r);
        }
      }
    }
    function gr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === p || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === C))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = j(r);
          tr(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !Re) {
          Re = true;
          var c = j(r);
          d("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", c || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && d("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function mr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            H(e), d("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), H(null);
            break;
          }
        }
        e.ref !== null && (H(e), d("Invalid attribute `ref` supplied to `React.Fragment`."), H(null));
      }
    }
    var He = {};
    function Be(e, r, t, n, c, v) {
      {
        var s = pe(e);
        if (!s) {
          var i = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (i += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var O = pr();
          O ? i += O : i += Le();
          var y;
          e === null ? y = "null" : Ee(e) ? y = "array" : e !== void 0 && e.$$typeof === l ? (y = "<" + (j(e.type) || "Unknown") + " />", i = " Did you accidentally export a JSX literal instead of a component?") : y = typeof e, d("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", y, i);
        }
        var b = vr(e, r, t, c, v);
        if (b == null)
          return b;
        if (s) {
          var I = r.children;
          if (I !== void 0)
            if (n)
              if (Ee(I)) {
                for (var B = 0; B < I.length; B++)
                  Ge(I[B], e);
                Object.freeze && Object.freeze(I);
              } else
                d("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ge(I, e);
        }
        if (ee.call(r, "key")) {
          var U2 = j(e), x = Object.keys(r).filter(function(Tr) {
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
        return e === m ? mr(b) : gr(b), b;
      }
    }
    function Er(e, r, t) {
      return Be(e, r, t, true);
    }
    function yr(e, r, t) {
      return Be(e, r, t, false);
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 d-flex align-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-breed.svg", alt: "Breed Icon" }) }),
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

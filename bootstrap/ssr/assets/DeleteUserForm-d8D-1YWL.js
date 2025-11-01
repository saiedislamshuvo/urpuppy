import { j as jsxRuntimeExports, r as reactExports, U as U$1, S as Se$1 } from "../ssr.js";
import { I as InputError } from "./InputError-BrGvvBAw.js";
import { I as InputLabel } from "./InputLabel-DAgP54zY.js";
import { s as s$2, K, L, y as y$2, n as n$2, o as o$3, a as o$4, b as s$3, u as u$2, t as t$2, T as T$1, l as l$2, p as p$2, f as f$6, F as Fe, c as u$3, z as ze, i as i$2, d as s$4, O as O$3 } from "./transition-BDjYCpGF.js";
import { r as reactDomExports } from "./index-D7h8hQJR.js";
import { T as TextInput } from "./TextInput-CTPfMhdJ.js";
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
function DangerButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function o$2(n2) {
  var e2, r2;
  return s$2.isServer ? null : n2 ? "ownerDocument" in n2 ? n2.ownerDocument : "current" in n2 ? (r2 = (e2 = n2.current) == null ? void 0 : e2.ownerDocument) != null ? r2 : document : null : document;
}
let e$2 = reactExports.createContext(void 0);
function a$a() {
  return reactExports.useContext(e$2);
}
let a$9 = "span";
var s$1 = ((e2) => (e2[e2.None = 1] = "None", e2[e2.Focusable = 2] = "Focusable", e2[e2.Hidden = 4] = "Hidden", e2))(s$1 || {});
function l$1(t2, r2) {
  var n2;
  let { features: d2 = 1, ...e2 } = t2, o2 = { ref: r2, "aria-hidden": (d2 & 2) === 2 ? true : (n2 = e2["aria-hidden"]) != null ? n2 : void 0, hidden: (d2 & 4) === 4 ? true : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(d2 & 4) === 4 && (d2 & 2) !== 2 && { display: "none" } } };
  return L()({ ourProps: o2, theirProps: e2, slot: {}, defaultTag: a$9, name: "Hidden" });
}
let f$5 = K(l$1);
let a$8 = reactExports.createContext(null);
a$8.displayName = "DescriptionContext";
function f$4() {
  let r2 = reactExports.useContext(a$8);
  if (r2 === null) {
    let e2 = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(e2, f$4), e2;
  }
  return r2;
}
function w$2() {
  let [r2, e2] = reactExports.useState([]);
  return [r2.length > 0 ? r2.join(" ") : void 0, reactExports.useMemo(() => function(t2) {
    let i2 = o$3((n2) => (e2((s2) => [...s2, n2]), () => e2((s2) => {
      let o2 = s2.slice(), p2 = o2.indexOf(n2);
      return p2 !== -1 && o2.splice(p2, 1), o2;
    }))), l2 = reactExports.useMemo(() => ({ register: i2, slot: t2.slot, name: t2.name, props: t2.props, value: t2.value }), [i2, t2.slot, t2.name, t2.props, t2.value]);
    return U$1.createElement(a$8.Provider, { value: l2 }, t2.children);
  }, [e2])];
}
let S$1 = "p";
function C$1(r2, e2) {
  let d2 = reactExports.useId(), t2 = a$a(), { id: i2 = `headlessui-description-${d2}`, ...l2 } = r2, n2 = f$4(), s2 = y$2(e2);
  n$2(() => n2.register(i2), [i2, n2.register]);
  let o2 = t2 || false, p2 = reactExports.useMemo(() => ({ ...n2.slot, disabled: o2 }), [n2.slot, o2]), D2 = { ref: s2, ...n2.props, id: i2 };
  return L()({ ourProps: D2, theirProps: l2, slot: p2, defaultTag: S$1, name: n2.name || "Description" });
}
let _$1 = K(C$1), H$2 = Object.assign(_$1, {});
var o$1 = ((r2) => (r2.Space = " ", r2.Enter = "Enter", r2.Escape = "Escape", r2.Backspace = "Backspace", r2.Delete = "Delete", r2.ArrowLeft = "ArrowLeft", r2.ArrowUp = "ArrowUp", r2.ArrowRight = "ArrowRight", r2.ArrowDown = "ArrowDown", r2.Home = "Home", r2.End = "End", r2.PageUp = "PageUp", r2.PageDown = "PageDown", r2.Tab = "Tab", r2))(o$1 || {});
let e$1 = reactExports.createContext(() => {
});
function C({ value: t2, children: o2 }) {
  return U$1.createElement(e$1.Provider, { value: t2 }, o2);
}
let a$7 = class a extends Map {
  constructor(t2) {
    super();
    this.factory = t2;
  }
  get(t2) {
    let e2 = super.get(t2);
    return e2 === void 0 && (e2 = this.factory(t2), this.set(t2, e2)), e2;
  }
};
function a$6(o2, r2) {
  let t2 = o2(), n2 = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return t2;
  }, subscribe(e2) {
    return n2.add(e2), () => n2.delete(e2);
  }, dispatch(e2, ...s2) {
    let i2 = r2[e2].call(t2, ...s2);
    i2 && (t2 = i2, n2.forEach((c2) => c2()));
  } };
}
function o(t2) {
  return reactExports.useSyncExternalStore(t2.subscribe, t2.getSnapshot, t2.getSnapshot);
}
let p$1 = new a$7(() => a$6(() => [], { ADD(r2) {
  return this.includes(r2) ? this : [...this, r2];
}, REMOVE(r2) {
  let e2 = this.indexOf(r2);
  if (e2 === -1) return this;
  let t2 = this.slice();
  return t2.splice(e2, 1), t2;
} }));
function x$1(r2, e2) {
  let t2 = p$1.get(e2), i2 = reactExports.useId(), h2 = o(t2);
  if (n$2(() => {
    if (r2) return t2.dispatch("ADD", i2), () => t2.dispatch("REMOVE", i2);
  }, [t2, r2]), !r2) return false;
  let s2 = h2.indexOf(i2), o$12 = h2.length;
  return s2 === -1 && (s2 = o$12, o$12 += 1), s2 === o$12 - 1;
}
let f$3 = /* @__PURE__ */ new Map(), u$1 = /* @__PURE__ */ new Map();
function h$1(t2) {
  var e2;
  let r2 = (e2 = u$1.get(t2)) != null ? e2 : 0;
  return u$1.set(t2, r2 + 1), r2 !== 0 ? () => m$3(t2) : (f$3.set(t2, { "aria-hidden": t2.getAttribute("aria-hidden"), inert: t2.inert }), t2.setAttribute("aria-hidden", "true"), t2.inert = true, () => m$3(t2));
}
function m$3(t2) {
  var i2;
  let r2 = (i2 = u$1.get(t2)) != null ? i2 : 1;
  if (r2 === 1 ? u$1.delete(t2) : u$1.set(t2, r2 - 1), r2 !== 1) return;
  let e2 = f$3.get(t2);
  e2 && (e2["aria-hidden"] === null ? t2.removeAttribute("aria-hidden") : t2.setAttribute("aria-hidden", e2["aria-hidden"]), t2.inert = e2.inert, f$3.delete(t2));
}
function y$1(t2, { allowed: r2, disallowed: e2 } = {}) {
  let i2 = x$1(t2, "inert-others");
  n$2(() => {
    var d2, c2;
    if (!i2) return;
    let a3 = o$4();
    for (let n2 of (d2 = e2 == null ? void 0 : e2()) != null ? d2 : []) n2 && a3.add(h$1(n2));
    let s2 = (c2 = r2 == null ? void 0 : r2()) != null ? c2 : [];
    for (let n2 of s2) {
      if (!n2) continue;
      let l2 = o$2(n2);
      if (!l2) continue;
      let o2 = n2.parentElement;
      for (; o2 && o2 !== l2.body; ) {
        for (let p2 of o2.children) s2.some((E2) => p2.contains(E2)) || a3.add(h$1(p2));
        o2 = o2.parentElement;
      }
    }
    return a3.dispose;
  }, [i2, r2, e2]);
}
function m$2(s2, n2, l2) {
  let i2 = s$3((t2) => {
    let e2 = t2.getBoundingClientRect();
    e2.x === 0 && e2.y === 0 && e2.width === 0 && e2.height === 0 && l2();
  });
  reactExports.useEffect(() => {
    if (!s2) return;
    let t2 = n2 === null ? null : n2 instanceof HTMLElement ? n2 : n2.current;
    if (!t2) return;
    let e2 = o$4();
    if (typeof ResizeObserver != "undefined") {
      let r2 = new ResizeObserver(() => i2.current(t2));
      r2.observe(t2), e2.add(() => r2.disconnect());
    }
    if (typeof IntersectionObserver != "undefined") {
      let r2 = new IntersectionObserver(() => i2.current(t2));
      r2.observe(t2), e2.add(() => r2.disconnect());
    }
    return () => e2.dispose();
  }, [n2, i2, s2]);
}
let f$2 = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e2) => `${e2}:not([tabindex='-1'])`).join(","), p = ["[data-autofocus]"].map((e2) => `${e2}:not([tabindex='-1'])`).join(",");
var F = ((n2) => (n2[n2.First = 1] = "First", n2[n2.Previous = 2] = "Previous", n2[n2.Next = 4] = "Next", n2[n2.Last = 8] = "Last", n2[n2.WrapAround = 16] = "WrapAround", n2[n2.NoScroll = 32] = "NoScroll", n2[n2.AutoFocus = 64] = "AutoFocus", n2))(F || {}), T = ((o2) => (o2[o2.Error = 0] = "Error", o2[o2.Overflow = 1] = "Overflow", o2[o2.Success = 2] = "Success", o2[o2.Underflow = 3] = "Underflow", o2))(T || {}), y = ((t2) => (t2[t2.Previous = -1] = "Previous", t2[t2.Next = 1] = "Next", t2))(y || {});
function b$1(e2 = document.body) {
  return e2 == null ? [] : Array.from(e2.querySelectorAll(f$2)).sort((r2, t2) => Math.sign((r2.tabIndex || Number.MAX_SAFE_INTEGER) - (t2.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function S(e2 = document.body) {
  return e2 == null ? [] : Array.from(e2.querySelectorAll(p)).sort((r2, t2) => Math.sign((r2.tabIndex || Number.MAX_SAFE_INTEGER) - (t2.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var h = ((t2) => (t2[t2.Strict = 0] = "Strict", t2[t2.Loose = 1] = "Loose", t2))(h || {});
function A(e2, r2 = 0) {
  var t2;
  return e2 === ((t2 = o$2(e2)) == null ? void 0 : t2.body) ? false : u$2(r2, { [0]() {
    return e2.matches(f$2);
  }, [1]() {
    let u2 = e2;
    for (; u2 !== null; ) {
      if (u2.matches(f$2)) return true;
      u2 = u2.parentElement;
    }
    return false;
  } });
}
var H$1 = ((t2) => (t2[t2.Keyboard = 0] = "Keyboard", t2[t2.Mouse = 1] = "Mouse", t2))(H$1 || {});
typeof window != "undefined" && typeof document != "undefined" && (document.addEventListener("keydown", (e2) => {
  e2.metaKey || e2.altKey || e2.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, true), document.addEventListener("click", (e2) => {
  e2.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e2.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, true));
function I$2(e2) {
  e2 == null || e2.focus({ preventScroll: true });
}
let w$1 = ["textarea", "input"].join(",");
function O$2(e2) {
  var r2, t2;
  return (t2 = (r2 = e2 == null ? void 0 : e2.matches) == null ? void 0 : r2.call(e2, w$1)) != null ? t2 : false;
}
function _(e2, r2 = (t2) => t2) {
  return e2.slice().sort((t2, u2) => {
    let o2 = r2(t2), c2 = r2(u2);
    if (o2 === null || c2 === null) return 0;
    let l2 = o2.compareDocumentPosition(c2);
    return l2 & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : l2 & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function P(e2, r2, { sorted: t2 = true, relativeTo: u2 = null, skipElements: o2 = [] } = {}) {
  let c2 = Array.isArray(e2) ? e2.length > 0 ? e2[0].ownerDocument : document : e2.ownerDocument, l2 = Array.isArray(e2) ? t2 ? _(e2) : e2 : r2 & 64 ? S(e2) : b$1(e2);
  o2.length > 0 && l2.length > 1 && (l2 = l2.filter((s2) => !o2.some((a3) => a3 != null && "current" in a3 ? (a3 == null ? void 0 : a3.current) === s2 : a3 === s2))), u2 = u2 != null ? u2 : c2.activeElement;
  let n2 = (() => {
    if (r2 & 5) return 1;
    if (r2 & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), x2 = (() => {
    if (r2 & 1) return 0;
    if (r2 & 2) return Math.max(0, l2.indexOf(u2)) - 1;
    if (r2 & 4) return Math.max(0, l2.indexOf(u2)) + 1;
    if (r2 & 8) return l2.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), M2 = r2 & 32 ? { preventScroll: true } : {}, m2 = 0, d2 = l2.length, i2;
  do {
    if (m2 >= d2 || m2 + d2 <= 0) return 0;
    let s2 = x2 + m2;
    if (r2 & 16) s2 = (s2 + d2) % d2;
    else {
      if (s2 < 0) return 3;
      if (s2 >= d2) return 1;
    }
    i2 = l2[s2], i2 == null || i2.focus(M2), m2 += n2;
  } while (i2 !== c2.activeElement);
  return r2 & 6 && O$2(i2) && i2.select(), 2;
}
function t$1() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function i$1() {
  return /Android/gi.test(window.navigator.userAgent);
}
function n$1() {
  return t$1() || i$1();
}
function i(t2, e2, o2, n2) {
  let u2 = s$3(o2);
  reactExports.useEffect(() => {
    if (!t2) return;
    function r2(m2) {
      u2.current(m2);
    }
    return document.addEventListener(e2, r2, n2), () => document.removeEventListener(e2, r2, n2);
  }, [t2, e2, n2]);
}
function s(t2, e2, o2, n2) {
  let i2 = s$3(o2);
  reactExports.useEffect(() => {
    if (!t2) return;
    function r2(d2) {
      i2.current(d2);
    }
    return window.addEventListener(e2, r2, n2), () => window.removeEventListener(e2, r2, n2);
  }, [t2, e2, n2]);
}
const E$1 = 30;
function R$1(p2, f2, C2) {
  let u2 = x$1(p2, "outside-click"), m2 = s$3(C2), s$12 = reactExports.useCallback(function(e2, n2) {
    if (e2.defaultPrevented) return;
    let r2 = n2(e2);
    if (r2 === null || !r2.getRootNode().contains(r2) || !r2.isConnected) return;
    let h$12 = function l2(o2) {
      return typeof o2 == "function" ? l2(o2()) : Array.isArray(o2) || o2 instanceof Set ? o2 : [o2];
    }(f2);
    for (let l2 of h$12) if (l2 !== null && (l2.contains(r2) || e2.composed && e2.composedPath().includes(l2))) return;
    return !A(r2, h.Loose) && r2.tabIndex !== -1 && e2.preventDefault(), m2.current(e2, r2);
  }, [m2, f2]), i$12 = reactExports.useRef(null);
  i(u2, "pointerdown", (t2) => {
    var e2, n2;
    i$12.current = ((n2 = (e2 = t2.composedPath) == null ? void 0 : e2.call(t2)) == null ? void 0 : n2[0]) || t2.target;
  }, true), i(u2, "mousedown", (t2) => {
    var e2, n2;
    i$12.current = ((n2 = (e2 = t2.composedPath) == null ? void 0 : e2.call(t2)) == null ? void 0 : n2[0]) || t2.target;
  }, true), i(u2, "click", (t2) => {
    n$1() || i$12.current && (s$12(t2, () => i$12.current), i$12.current = null);
  }, true);
  let a3 = reactExports.useRef({ x: 0, y: 0 });
  i(u2, "touchstart", (t2) => {
    a3.current.x = t2.touches[0].clientX, a3.current.y = t2.touches[0].clientY;
  }, true), i(u2, "touchend", (t2) => {
    let e2 = { x: t2.changedTouches[0].clientX, y: t2.changedTouches[0].clientY };
    if (!(Math.abs(e2.x - a3.current.x) >= E$1 || Math.abs(e2.y - a3.current.y) >= E$1)) return s$12(t2, () => t2.target instanceof HTMLElement ? t2.target : null);
  }, true), s(u2, "blur", (t2) => s$12(t2, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), true);
}
function n(...e2) {
  return reactExports.useMemo(() => o$2(...e2), [...e2]);
}
function E(n2, e2, a3, t2) {
  let i2 = s$3(a3);
  reactExports.useEffect(() => {
    n2 = n2 != null ? n2 : window;
    function r2(o2) {
      i2.current(o2);
    }
    return n2.addEventListener(e2, r2, t2), () => n2.removeEventListener(e2, r2, t2);
  }, [n2, e2, t2]);
}
function d$1() {
  let r2;
  return { before({ doc: e2 }) {
    var l2;
    let o2 = e2.documentElement, t2 = (l2 = e2.defaultView) != null ? l2 : window;
    r2 = Math.max(0, t2.innerWidth - o2.clientWidth);
  }, after({ doc: e2, d: o2 }) {
    let t2 = e2.documentElement, l2 = Math.max(0, t2.clientWidth - t2.offsetWidth), n2 = Math.max(0, r2 - l2);
    o2.style(t2, "paddingRight", `${n2}px`);
  } };
}
function d() {
  return t$1() ? { before({ doc: r2, d: n2, meta: c2 }) {
    function o2(a3) {
      return c2.containers.flatMap((l2) => l2()).some((l2) => l2.contains(a3));
    }
    n2.microTask(() => {
      var s2;
      if (window.getComputedStyle(r2.documentElement).scrollBehavior !== "auto") {
        let t2 = o$4();
        t2.style(r2.documentElement, "scrollBehavior", "auto"), n2.add(() => n2.microTask(() => t2.dispose()));
      }
      let a3 = (s2 = window.scrollY) != null ? s2 : window.pageYOffset, l2 = null;
      n2.addEventListener(r2, "click", (t2) => {
        if (t2.target instanceof HTMLElement) try {
          let e2 = t2.target.closest("a");
          if (!e2) return;
          let { hash: f2 } = new URL(e2.href), i2 = r2.querySelector(f2);
          i2 && !o2(i2) && (l2 = i2);
        } catch {
        }
      }, true), n2.addEventListener(r2, "touchstart", (t2) => {
        if (t2.target instanceof HTMLElement) if (o2(t2.target)) {
          let e2 = t2.target;
          for (; e2.parentElement && o2(e2.parentElement); ) e2 = e2.parentElement;
          n2.style(e2, "overscrollBehavior", "contain");
        } else n2.style(t2.target, "touchAction", "none");
      }), n2.addEventListener(r2, "touchmove", (t2) => {
        if (t2.target instanceof HTMLElement) {
          if (t2.target.tagName === "INPUT") return;
          if (o2(t2.target)) {
            let e2 = t2.target;
            for (; e2.parentElement && e2.dataset.headlessuiPortal !== "" && !(e2.scrollHeight > e2.clientHeight || e2.scrollWidth > e2.clientWidth); ) e2 = e2.parentElement;
            e2.dataset.headlessuiPortal === "" && t2.preventDefault();
          } else t2.preventDefault();
        }
      }, { passive: false }), n2.add(() => {
        var e2;
        let t2 = (e2 = window.scrollY) != null ? e2 : window.pageYOffset;
        a3 !== t2 && window.scrollTo(0, a3), l2 && l2.isConnected && (l2.scrollIntoView({ block: "nearest" }), l2 = null);
      });
    });
  } } : {};
}
function r$1() {
  return { before({ doc: e2, d: o2 }) {
    o2.style(e2.documentElement, "overflow", "hidden");
  } };
}
function m$1(e2) {
  let n2 = {};
  for (let t2 of e2) Object.assign(n2, t2(n2));
  return n2;
}
let a$5 = a$6(() => /* @__PURE__ */ new Map(), { PUSH(e2, n2) {
  var o2;
  let t2 = (o2 = this.get(e2)) != null ? o2 : { doc: e2, count: 0, d: o$4(), meta: /* @__PURE__ */ new Set() };
  return t2.count++, t2.meta.add(n2), this.set(e2, t2), this;
}, POP(e2, n2) {
  let t2 = this.get(e2);
  return t2 && (t2.count--, t2.meta.delete(n2)), this;
}, SCROLL_PREVENT({ doc: e2, d: n2, meta: t2 }) {
  let o2 = { doc: e2, d: n2, meta: m$1(t2) }, c2 = [d(), d$1(), r$1()];
  c2.forEach(({ before: r2 }) => r2 == null ? void 0 : r2(o2)), c2.forEach(({ after: r2 }) => r2 == null ? void 0 : r2(o2));
}, SCROLL_ALLOW({ d: e2 }) {
  e2.dispose();
}, TEARDOWN({ doc: e2 }) {
  this.delete(e2);
} });
a$5.subscribe(() => {
  let e2 = a$5.getSnapshot(), n2 = /* @__PURE__ */ new Map();
  for (let [t2] of e2) n2.set(t2, t2.documentElement.style.overflow);
  for (let t2 of e2.values()) {
    let o2 = n2.get(t2.doc) === "hidden", c2 = t2.count !== 0;
    (c2 && !o2 || !c2 && o2) && a$5.dispatch(t2.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", t2), t2.count === 0 && a$5.dispatch("TEARDOWN", t2);
  }
});
function a$4(r2, e2, n2 = () => ({ containers: [] })) {
  let f2 = o(a$5), o$12 = e2 ? f2.get(e2) : void 0, i2 = o$12 ? o$12.count > 0 : false;
  return n$2(() => {
    if (!(!e2 || !r2)) return a$5.dispatch("PUSH", e2, n2), () => a$5.dispatch("POP", e2, n2);
  }, [r2, e2]), i2;
}
function f$1(e2, c2, n2 = () => [document.body]) {
  let r2 = x$1(e2, "scroll-lock");
  a$4(r2, c2, (t2) => {
    var o2;
    return { containers: [...(o2 = t2.containers) != null ? o2 : [], n2] };
  });
}
function m(u2, t2) {
  let e2 = reactExports.useRef([]), r2 = o$3(u2);
  reactExports.useEffect(() => {
    let o2 = [...e2.current];
    for (let [a3, l2] of t2.entries()) if (e2.current[a3] !== l2) {
      let n2 = r2(t2, o2);
      return e2.current = t2, n2;
    }
  }, [r2, ...t2]);
}
function t(n2) {
  function e2() {
    document.readyState !== "loading" && (n2(), document.removeEventListener("DOMContentLoaded", e2));
  }
  typeof window != "undefined" && typeof document != "undefined" && (document.addEventListener("DOMContentLoaded", e2), e2());
}
let r = [];
t(() => {
  function e2(t2) {
    if (!(t2.target instanceof HTMLElement) || t2.target === document.body || r[0] === t2.target) return;
    let n2 = t2.target;
    n2 = n2.closest(f$2), r.unshift(n2 != null ? n2 : t2.target), r = r.filter((o2) => o2 != null && o2.isConnected), r.splice(10);
  }
  window.addEventListener("click", e2, { capture: true }), window.addEventListener("mousedown", e2, { capture: true }), window.addEventListener("focus", e2, { capture: true }), document.body.addEventListener("click", e2, { capture: true }), document.body.addEventListener("mousedown", e2, { capture: true }), document.body.addEventListener("focus", e2, { capture: true });
});
function c(t2) {
  let r2 = o$3(t2), e2 = reactExports.useRef(false);
  reactExports.useEffect(() => (e2.current = false, () => {
    e2.current = true, t$2(() => {
      e2.current && r2();
    });
  }), [r2]);
}
let e = reactExports.createContext(false);
function a$3() {
  return reactExports.useContext(e);
}
function l(o2) {
  return U$1.createElement(e.Provider, { value: o2.force }, o2.children);
}
function j(e2) {
  let l2 = a$3(), o2 = reactExports.useContext(H), [r2, u2] = reactExports.useState(() => {
    var i2;
    if (!l2 && o2 !== null) return (i2 = o2.current) != null ? i2 : null;
    if (s$2.isServer) return null;
    let t2 = e2 == null ? void 0 : e2.getElementById("headlessui-portal-root");
    if (t2) return t2;
    if (e2 === null) return null;
    let a3 = e2.createElement("div");
    return a3.setAttribute("id", "headlessui-portal-root"), e2.body.appendChild(a3);
  });
  return reactExports.useEffect(() => {
    r2 !== null && (e2 != null && e2.body.contains(r2) || e2 == null || e2.body.appendChild(r2));
  }, [r2, e2]), reactExports.useEffect(() => {
    l2 || o2 !== null && u2(o2.current);
  }, [o2, u2, l2]), r2;
}
let M = reactExports.Fragment, I$1 = K(function(l2, o2) {
  let { ownerDocument: r2 = null, ...u2 } = l2, t2 = reactExports.useRef(null), a3 = y$2(T$1((s2) => {
    t2.current = s2;
  }), o2), i2 = n(t2), f2 = r2 != null ? r2 : i2, p2 = j(f2), [n$12] = reactExports.useState(() => {
    var s2;
    return s$2.isServer ? null : (s2 = f2 == null ? void 0 : f2.createElement("div")) != null ? s2 : null;
  }), P2 = reactExports.useContext(g), b2 = l$2();
  n$2(() => {
    !p2 || !n$12 || p2.contains(n$12) || (n$12.setAttribute("data-headlessui-portal", ""), p2.appendChild(n$12));
  }, [p2, n$12]), n$2(() => {
    if (n$12 && P2) return P2.register(n$12);
  }, [P2, n$12]), c(() => {
    var s2;
    !p2 || !n$12 || (n$12 instanceof Node && p2.contains(n$12) && p2.removeChild(n$12), p2.childNodes.length <= 0 && ((s2 = p2.parentElement) == null || s2.removeChild(p2)));
  });
  let h2 = L();
  return b2 ? !p2 || !n$12 ? null : reactDomExports.createPortal(h2({ ourProps: { ref: a3 }, theirProps: u2, slot: {}, defaultTag: M, name: "Portal" }), n$12) : null;
});
function J(e2, l2) {
  let o2 = y$2(l2), { enabled: r2 = true, ownerDocument: u2, ...t2 } = e2, a3 = L();
  return r2 ? U$1.createElement(I$1, { ...t2, ownerDocument: u2, ref: o2 }) : a3({ ourProps: { ref: o2 }, theirProps: t2, slot: {}, defaultTag: M, name: "Portal" });
}
let X = reactExports.Fragment, H = reactExports.createContext(null);
function k$1(e2, l2) {
  let { target: o2, ...r2 } = e2, t2 = { ref: y$2(l2) }, a3 = L();
  return U$1.createElement(H.Provider, { value: o2 }, a3({ ourProps: t2, theirProps: r2, defaultTag: X, name: "Popover.Group" }));
}
let g = reactExports.createContext(null);
function le() {
  let e2 = reactExports.useContext(g), l2 = reactExports.useRef([]), o2 = o$3((t2) => (l2.current.push(t2), e2 && e2.register(t2), () => r2(t2))), r2 = o$3((t2) => {
    let a3 = l2.current.indexOf(t2);
    a3 !== -1 && l2.current.splice(a3, 1), e2 && e2.unregister(t2);
  }), u2 = reactExports.useMemo(() => ({ register: o2, unregister: r2, portals: l2 }), [o2, r2, l2]);
  return [l2, reactExports.useMemo(() => function({ children: a3 }) {
    return U$1.createElement(g.Provider, { value: u2 }, a3);
  }, [u2])];
}
let B = K(J), D$1 = K(k$1), oe = Object.assign(B, { Group: D$1 });
function a$2(o2, r2 = typeof document != "undefined" ? document.defaultView : null, t2) {
  let n2 = x$1(o2, "escape");
  E(r2, "keydown", (e2) => {
    n2 && (e2.defaultPrevented || e2.key === o$1.Escape && t2(e2));
  });
}
function f() {
  var t2;
  let [e2] = reactExports.useState(() => typeof window != "undefined" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [o2, c2] = reactExports.useState((t2 = e2 == null ? void 0 : e2.matches) != null ? t2 : false);
  return n$2(() => {
    if (!e2) return;
    function n2(r2) {
      c2(r2.matches);
    }
    return e2.addEventListener("change", n2), () => e2.removeEventListener("change", n2);
  }, [e2]), o2;
}
function R({ defaultContainers: l2 = [], portals: n$12, mainTreeNode: o2 } = {}) {
  let r2 = n(o2), u2 = o$3(() => {
    var i2, c2;
    let t2 = [];
    for (let e2 of l2) e2 !== null && (e2 instanceof HTMLElement ? t2.push(e2) : "current" in e2 && e2.current instanceof HTMLElement && t2.push(e2.current));
    if (n$12 != null && n$12.current) for (let e2 of n$12.current) t2.push(e2);
    for (let e2 of (i2 = r2 == null ? void 0 : r2.querySelectorAll("html > *, body > *")) != null ? i2 : []) e2 !== document.body && e2 !== document.head && e2 instanceof HTMLElement && e2.id !== "headlessui-portal-root" && (o2 && (e2.contains(o2) || e2.contains((c2 = o2 == null ? void 0 : o2.getRootNode()) == null ? void 0 : c2.host)) || t2.some((m2) => e2.contains(m2)) || t2.push(e2));
    return t2;
  });
  return { resolveContainers: u2, contains: o$3((t2) => u2().some((i2) => i2.contains(t2))) };
}
let a$1 = reactExports.createContext(null);
function O$1({ children: l2, node: n2 }) {
  let [o2, r2] = reactExports.useState(null), u2 = b(n2 != null ? n2 : o2);
  return U$1.createElement(a$1.Provider, { value: u2 }, l2, u2 === null && U$1.createElement(f$5, { features: s$1.Hidden, ref: (t2) => {
    var i2, c2;
    if (t2) {
      for (let e2 of (c2 = (i2 = o$2(t2)) == null ? void 0 : i2.querySelectorAll("html > *, body > *")) != null ? c2 : []) if (e2 !== document.body && e2 !== document.head && e2 instanceof HTMLElement && e2 != null && e2.contains(t2)) {
        r2(e2);
        break;
      }
    }
  } }));
}
function b(l2 = null) {
  var n2;
  return (n2 = reactExports.useContext(a$1)) != null ? n2 : l2;
}
var a2 = ((r2) => (r2[r2.Forwards = 0] = "Forwards", r2[r2.Backwards = 1] = "Backwards", r2))(a2 || {});
function u() {
  let e2 = reactExports.useRef(0);
  return s(true, "keydown", (r2) => {
    r2.key === "Tab" && (e2.current = r2.shiftKey ? 1 : 0);
  }, true), e2;
}
function U(o2) {
  if (!o2) return /* @__PURE__ */ new Set();
  if (typeof o2 == "function") return new Set(o2());
  let e2 = /* @__PURE__ */ new Set();
  for (let t2 of o2.current) t2.current instanceof HTMLElement && e2.add(t2.current);
  return e2;
}
let Z = "div";
var x = ((n2) => (n2[n2.None = 0] = "None", n2[n2.InitialFocus = 1] = "InitialFocus", n2[n2.TabLock = 2] = "TabLock", n2[n2.FocusLock = 4] = "FocusLock", n2[n2.RestoreFocus = 8] = "RestoreFocus", n2[n2.AutoFocus = 16] = "AutoFocus", n2))(x || {});
function $(o2, e2) {
  let t2 = reactExports.useRef(null), r2 = y$2(t2, e2), { initialFocus: s2, initialFocusFallback: a$12, containers: n$12, features: u$12 = 15, ...f2 } = o2;
  l$2() || (u$12 = 0);
  let l2 = n(t2);
  ee(u$12, { ownerDocument: l2 });
  let i2 = te(u$12, { ownerDocument: l2, container: t2, initialFocus: s2, initialFocusFallback: a$12 });
  re(u$12, { ownerDocument: l2, container: t2, containers: n$12, previousActiveElement: i2 });
  let R2 = u(), g2 = o$3((c2) => {
    let m2 = t2.current;
    if (!m2) return;
    ((G) => G())(() => {
      u$2(R2.current, { [a2.Forwards]: () => {
        P(m2, F.First, { skipElements: [c2.relatedTarget, a$12] });
      }, [a2.Backwards]: () => {
        P(m2, F.Last, { skipElements: [c2.relatedTarget, a$12] });
      } });
    });
  }), v = x$1(!!(u$12 & 2), "focus-trap#tab-lock"), N = p$2(), F$1 = reactExports.useRef(false), k2 = { ref: r2, onKeyDown(c2) {
    c2.key == "Tab" && (F$1.current = true, N.requestAnimationFrame(() => {
      F$1.current = false;
    }));
  }, onBlur(c2) {
    if (!(u$12 & 4)) return;
    let m2 = U(n$12);
    t2.current instanceof HTMLElement && m2.add(t2.current);
    let d2 = c2.relatedTarget;
    d2 instanceof HTMLElement && d2.dataset.headlessuiFocusGuard !== "true" && (I(m2, d2) || (F$1.current ? P(t2.current, u$2(R2.current, { [a2.Forwards]: () => F.Next, [a2.Backwards]: () => F.Previous }) | F.WrapAround, { relativeTo: c2.target }) : c2.target instanceof HTMLElement && I$2(c2.target)));
  } }, B2 = L();
  return U$1.createElement(U$1.Fragment, null, v && U$1.createElement(f$5, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: g2, features: s$1.Focusable }), B2({ ourProps: k2, theirProps: f2, defaultTag: Z, name: "FocusTrap" }), v && U$1.createElement(f$5, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: g2, features: s$1.Focusable }));
}
let D = K($), ye = Object.assign(D, { features: x });
function w(o2 = true) {
  let e2 = reactExports.useRef(r.slice());
  return m(([t2], [r$12]) => {
    r$12 === true && t2 === false && t$2(() => {
      e2.current.splice(0);
    }), r$12 === false && t2 === true && (e2.current = r.slice());
  }, [o2, r, e2]), o$3(() => {
    var t2;
    return (t2 = e2.current.find((r2) => r2 != null && r2.isConnected)) != null ? t2 : null;
  });
}
function ee(o2, { ownerDocument: e2 }) {
  let t2 = !!(o2 & 8), r2 = w(t2);
  m(() => {
    t2 || (e2 == null ? void 0 : e2.activeElement) === (e2 == null ? void 0 : e2.body) && I$2(r2());
  }, [t2]), c(() => {
    t2 && I$2(r2());
  });
}
function te(o2, { ownerDocument: e2, container: t2, initialFocus: r2, initialFocusFallback: s2 }) {
  let a3 = reactExports.useRef(null), n2 = x$1(!!(o2 & 1), "focus-trap#initial-focus"), u2 = f$6();
  return m(() => {
    if (o2 === 0) return;
    if (!n2) {
      s2 != null && s2.current && I$2(s2.current);
      return;
    }
    let f2 = t2.current;
    f2 && t$2(() => {
      if (!u2.current) return;
      let l2 = e2 == null ? void 0 : e2.activeElement;
      if (r2 != null && r2.current) {
        if ((r2 == null ? void 0 : r2.current) === l2) {
          a3.current = l2;
          return;
        }
      } else if (f2.contains(l2)) {
        a3.current = l2;
        return;
      }
      if (r2 != null && r2.current) I$2(r2.current);
      else {
        if (o2 & 16) {
          if (P(f2, F.First | F.AutoFocus) !== T.Error) return;
        } else if (P(f2, F.First) !== T.Error) return;
        if (s2 != null && s2.current && (I$2(s2.current), (e2 == null ? void 0 : e2.activeElement) === s2.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      a3.current = e2 == null ? void 0 : e2.activeElement;
    });
  }, [s2, n2, o2]), a3;
}
function re(o2, { ownerDocument: e2, container: t2, containers: r2, previousActiveElement: s2 }) {
  let a3 = f$6(), n2 = !!(o2 & 4);
  E(e2 == null ? void 0 : e2.defaultView, "focus", (u2) => {
    if (!n2 || !a3.current) return;
    let f2 = U(r2);
    t2.current instanceof HTMLElement && f2.add(t2.current);
    let l2 = s2.current;
    if (!l2) return;
    let i2 = u2.target;
    i2 && i2 instanceof HTMLElement ? I(f2, i2) ? (s2.current = i2, I$2(i2)) : (u2.preventDefault(), u2.stopPropagation(), I$2(l2)) : I$2(s2.current);
  }, true);
}
function I(o2, e2) {
  for (let t2 of o2) if (t2.contains(e2)) return true;
  return false;
}
var Oe = ((o2) => (o2[o2.Open = 0] = "Open", o2[o2.Closed = 1] = "Closed", o2))(Oe || {}), he = ((t2) => (t2[t2.SetTitleId = 0] = "SetTitleId", t2))(he || {});
let Se = { [0](e2, t2) {
  return e2.titleId === t2.id ? e2 : { ...e2, titleId: t2.id };
} }, k = reactExports.createContext(null);
k.displayName = "DialogContext";
function O(e2) {
  let t2 = reactExports.useContext(k);
  if (t2 === null) {
    let o2 = new Error(`<${e2} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o2, O), o2;
  }
  return t2;
}
function Ie(e2, t2) {
  return u$2(t2.type, Se, e2, t2);
}
let V = K(function(t2, o2) {
  let a3 = reactExports.useId(), { id: l$12 = `headlessui-dialog-${a3}`, open: i2, onClose: p2, initialFocus: d2, role: s2 = "dialog", autoFocus: f$22 = true, __demoMode: u2 = false, unmount: P2 = false, ...h2 } = t2, R$2 = reactExports.useRef(false);
  s2 = function() {
    return s2 === "dialog" || s2 === "alertdialog" ? s2 : (R$2.current || (R$2.current = true, console.warn(`Invalid role [${s2}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let c2 = u$3();
  i2 === void 0 && c2 !== null && (i2 = (c2 & i$2.Open) === i$2.Open);
  let T2 = reactExports.useRef(null), S2 = y$2(T2, o2), F2 = n(T2), g2 = i2 ? 0 : 1, [b$12, q] = reactExports.useReducer(Ie, { titleId: null, descriptionId: null, panelRef: reactExports.createRef() }), m2 = o$3(() => p2(false)), w2 = o$3((r2) => q({ type: 0, id: r2 })), D2 = l$2() ? g2 === 0 : false, [z, Q] = le(), Z2 = { get current() {
    var r2;
    return (r2 = b$12.panelRef.current) != null ? r2 : T2.current;
  } }, v = b(), { resolveContainers: I2 } = R({ mainTreeNode: v, portals: z, defaultContainers: [Z2] }), B2 = c2 !== null ? (c2 & i$2.Closing) === i$2.Closing : false;
  y$1(u2 || B2 ? false : D2, { allowed: o$3(() => {
    var r2, H2;
    return [(H2 = (r2 = T2.current) == null ? void 0 : r2.closest("[data-headlessui-portal]")) != null ? H2 : null];
  }), disallowed: o$3(() => {
    var r2;
    return [(r2 = v == null ? void 0 : v.closest("body > *:not(#headlessui-portal-root)")) != null ? r2 : null];
  }) }), R$1(D2, I2, (r2) => {
    r2.preventDefault(), m2();
  }), a$2(D2, F2 == null ? void 0 : F2.defaultView, (r2) => {
    r2.preventDefault(), r2.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), m2();
  }), f$1(u2 || B2 ? false : D2, F2, I2), m$2(D2, T2, m2);
  let [ee2, te2] = w$2(), oe$1 = reactExports.useMemo(() => [{ dialogState: g2, close: m2, setTitleId: w2, unmount: P2 }, b$12], [g2, b$12, m2, w2, P2]), U2 = reactExports.useMemo(() => ({ open: g2 === 0 }), [g2]), ne = { ref: S2, id: l$12, role: s2, tabIndex: -1, "aria-modal": u2 ? void 0 : g2 === 0 ? true : void 0, "aria-labelledby": b$12.titleId, "aria-describedby": ee2, unmount: P2 }, re2 = !f(), y2 = x.None;
  D2 && !u2 && (y2 |= x.RestoreFocus, y2 |= x.TabLock, f$22 && (y2 |= x.AutoFocus), re2 && (y2 |= x.InitialFocus));
  let le$1 = L();
  return U$1.createElement(s$4, null, U$1.createElement(l, { force: true }, U$1.createElement(oe, null, U$1.createElement(k.Provider, { value: oe$1 }, U$1.createElement(D$1, { target: T2 }, U$1.createElement(l, { force: false }, U$1.createElement(te2, { slot: U2 }, U$1.createElement(Q, null, U$1.createElement(ye, { initialFocus: d2, initialFocusFallback: T2, containers: I2, features: y2 }, U$1.createElement(C, { value: m2 }, le$1({ ourProps: ne, theirProps: h2, slot: U2, defaultTag: Me, features: Ge, visible: g2 === 0, name: "Dialog" })))))))))));
}), Me = "div", Ge = O$3.RenderStrategy | O$3.Static;
function ke(e2, t2) {
  let { transition: o2 = false, open: a3, ...l2 } = e2, i2 = u$3(), p2 = e2.hasOwnProperty("open") || i2 !== null, d2 = e2.hasOwnProperty("onClose");
  if (!p2 && !d2) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!p2) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!d2) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!i2 && typeof e2.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e2.open}`);
  if (typeof e2.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e2.onClose}`);
  return (a3 !== void 0 || o2) && !l2.static ? U$1.createElement(O$1, null, U$1.createElement(ze, { show: a3, transition: o2, unmount: l2.unmount }, U$1.createElement(V, { ref: t2, ...l2 }))) : U$1.createElement(O$1, null, U$1.createElement(V, { ref: t2, open: a3, ...l2 }));
}
let we = "div";
function Be(e2, t2) {
  let o2 = reactExports.useId(), { id: a3 = `headlessui-dialog-panel-${o2}`, transition: l2 = false, ...i2 } = e2, [{ dialogState: p2, unmount: d2 }, s2] = O("Dialog.Panel"), f2 = y$2(t2, s2.panelRef), u2 = reactExports.useMemo(() => ({ open: p2 === 0 }), [p2]), P2 = o$3((S2) => {
    S2.stopPropagation();
  }), h2 = { ref: f2, id: a3, onClick: P2 }, R2 = l2 ? Fe : reactExports.Fragment, c2 = l2 ? { unmount: d2 } : {}, T2 = L();
  return U$1.createElement(R2, { ...c2 }, T2({ ourProps: h2, theirProps: i2, slot: u2, defaultTag: we, name: "Dialog.Panel" }));
}
let Ue = "div";
function He(e2, t2) {
  let { transition: o2 = false, ...a3 } = e2, [{ dialogState: l2, unmount: i2 }] = O("Dialog.Backdrop"), p2 = reactExports.useMemo(() => ({ open: l2 === 0 }), [l2]), d2 = { ref: t2, "aria-hidden": true }, s2 = o2 ? Fe : reactExports.Fragment, f2 = o2 ? { unmount: i2 } : {}, u2 = L();
  return U$1.createElement(s2, { ...f2 }, u2({ ourProps: d2, theirProps: a3, slot: p2, defaultTag: Ue, name: "Dialog.Backdrop" }));
}
let Ne = "h2";
function We(e2, t2) {
  let o2 = reactExports.useId(), { id: a3 = `headlessui-dialog-title-${o2}`, ...l2 } = e2, [{ dialogState: i2, setTitleId: p2 }] = O("Dialog.Title"), d2 = y$2(t2);
  reactExports.useEffect(() => (p2(a3), () => p2(null)), [a3, p2]);
  let s2 = reactExports.useMemo(() => ({ open: i2 === 0 }), [i2]), f2 = { ref: d2, id: a3 };
  return L()({ ourProps: f2, theirProps: l2, slot: s2, defaultTag: Ne, name: "Dialog.Title" });
}
let $e = K(ke), je = K(Be);
K(He);
let Ye = K(We), yt = Object.assign($e, { Panel: je, Title: Ye, Description: H$2 });
function Modal({
  children,
  show = false,
  maxWidth = "2xl",
  closeable = true,
  onClose = () => {
  }
}) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };
  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl"
  }[maxWidth];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ze, { show, leave: "duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    yt,
    {
      as: "div",
      id: "modal",
      className: "fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0",
      onClose: close,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Fe,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gray-500/75" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Fe,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              je,
              {
                className: `mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`,
                children
              }
            )
          }
        )
      ]
    }
  ) });
}
function SecondaryButton({
  type = "button",
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      ...props,
      type,
      className: `inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function DeleteUserForm({
  className = ""
}) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = reactExports.useState(false);
  const passwordInput = reactExports.useRef(null);
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors
  } = Se$1({
    password: ""
  });
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const deleteUser = (e2) => {
    e2.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => {
        var _a;
        return (_a = passwordInput.current) == null ? void 0 : _a.focus();
      },
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
    clearErrors();
    reset();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Delete Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DangerButton, { onClick: confirmUserDeletion, children: "Delete Account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { show: confirmingUserDeletion, onClose: closeModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: deleteUser, className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Are you sure you want to delete your account?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputLabel,
          {
            htmlFor: "password",
            value: "Password",
            className: "sr-only"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e2) => setData("password", e2.target.value),
            className: "mt-1 block w-3/4",
            isFocused: true,
            placeholder: "Password"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputError,
          {
            message: errors.password,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: closeModal, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DangerButton, { className: "ms-3", disabled: processing, children: "Delete Account" })
      ] })
    ] }) })
  ] });
}
export {
  DeleteUserForm as default
};

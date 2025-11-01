import { U, r as reactExports, j as jsxRuntimeExports } from "../ssr.js";
import { a as autoUpdate, c as computePosition, o as offset, f as flip, s as shift, b as arrow } from "./floating-ui.dom-D9vmQZx1.js";
import { c as classNames } from "./index-DbhDZzck.js";
/*
* React Tooltip
* {@link https://github.com/ReactTooltip/react-tooltip}
* @copyright ReactTooltip Team
* @license MIT
*/
const h = "react-tooltip-core-styles", w = "react-tooltip-base-styles", b = { core: false, base: false };
function S({ css: e, id: t = w, type: o = "base", ref: l }) {
  var r, n;
  if (!e || "undefined" == typeof document || b[o]) return;
  if ("core" === o && "undefined" != typeof process && (null === (r = null === process || void 0 === process ? void 0 : process.env) || void 0 === r ? void 0 : r.REACT_TOOLTIP_DISABLE_CORE_STYLES)) return;
  if ("base" !== o && "undefined" != typeof process && (null === (n = null === process || void 0 === process ? void 0 : process.env) || void 0 === n ? void 0 : n.REACT_TOOLTIP_DISABLE_BASE_STYLES)) return;
  "core" === o && (t = h), l || (l = {});
  const { insertAt: i } = l;
  if (document.getElementById(t)) return;
  const c = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
  s.id = t, s.type = "text/css", "top" === i && c.firstChild ? c.insertBefore(s, c.firstChild) : c.appendChild(s), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(document.createTextNode(e)), b[o] = true;
}
const E = async ({ elementReference: e = null, tooltipReference: t = null, tooltipArrowReference: o = null, place: l = "top", offset: r = 10, strategy: n = "absolute", middlewares: i = [offset(Number(r)), flip({ fallbackAxisSideDirection: "start" }), shift({ padding: 5 })], border: c }) => {
  if (!e) return { tooltipStyles: {}, tooltipArrowStyles: {}, place: l };
  if (null === t) return { tooltipStyles: {}, tooltipArrowStyles: {}, place: l };
  const s = i;
  return o ? (s.push(arrow({ element: o, padding: 5 })), computePosition(e, t, { placement: l, strategy: n, middleware: s }).then(({ x: e2, y: t2, placement: o2, middlewareData: l2 }) => {
    var r2, n2;
    const i2 = { left: `${e2}px`, top: `${t2}px`, border: c }, { x: s2, y: a } = null !== (r2 = l2.arrow) && void 0 !== r2 ? r2 : { x: 0, y: 0 }, u = null !== (n2 = { top: "bottom", right: "left", bottom: "top", left: "right" }[o2.split("-")[0]]) && void 0 !== n2 ? n2 : "bottom", d = c && { borderBottom: c, borderRight: c };
    let p = 0;
    if (c) {
      const e3 = `${c}`.match(/(\d+)px/);
      p = (null == e3 ? void 0 : e3[1]) ? Number(e3[1]) : 1;
    }
    return { tooltipStyles: i2, tooltipArrowStyles: { left: null != s2 ? `${s2}px` : "", top: null != a ? `${a}px` : "", right: "", bottom: "", ...d, [u]: `-${4 + p}px` }, place: o2 };
  })) : computePosition(e, t, { placement: "bottom", strategy: n, middleware: s }).then(({ x: e2, y: t2, placement: o2 }) => ({ tooltipStyles: { left: `${e2}px`, top: `${t2}px` }, tooltipArrowStyles: {}, place: o2 }));
}, A = (e, t) => !("CSS" in window && "supports" in window.CSS) || window.CSS.supports(e, t), _ = (e, t, o) => {
  let l = null;
  const r = function(...r2) {
    const n = () => {
      l = null;
    };
    !l && (e.apply(this, r2), l = setTimeout(n, t));
  };
  return r.cancel = () => {
    l && (clearTimeout(l), l = null);
  }, r;
}, O = (e) => null !== e && !Array.isArray(e) && "object" == typeof e, k = (e, t) => {
  if (e === t) return true;
  if (Array.isArray(e) && Array.isArray(t)) return e.length === t.length && e.every((e2, o2) => k(e2, t[o2]));
  if (Array.isArray(e) !== Array.isArray(t)) return false;
  if (!O(e) || !O(t)) return e === t;
  const o = Object.keys(e), l = Object.keys(t);
  return o.length === l.length && o.every((o2) => k(e[o2], t[o2]));
}, T = (e) => {
  if (!(e instanceof HTMLElement || e instanceof SVGElement)) return false;
  const t = getComputedStyle(e);
  return ["overflow", "overflow-x", "overflow-y"].some((e2) => {
    const o = t.getPropertyValue(e2);
    return "auto" === o || "scroll" === o;
  });
}, L = (e) => {
  if (!e) return null;
  let t = e.parentElement;
  for (; t; ) {
    if (T(t)) return t;
    t = t.parentElement;
  }
  return document.scrollingElement || document.documentElement;
}, C = "undefined" != typeof window ? reactExports.useLayoutEffect : reactExports.useEffect, R = (e) => {
  e.current && (clearTimeout(e.current), e.current = null);
}, x = "DEFAULT_TOOLTIP_ID", N = { anchorRefs: /* @__PURE__ */ new Set(), activeAnchor: { current: null }, attach: () => {
}, detach: () => {
}, setActiveAnchor: () => {
} }, $ = reactExports.createContext({ getTooltipData: () => N });
function j(e = x) {
  return reactExports.useContext($).getTooltipData(e);
}
var z = { tooltip: "core-styles-module_tooltip__3vRRp", fixed: "core-styles-module_fixed__pcSol", arrow: "core-styles-module_arrow__cvMwQ", noArrow: "core-styles-module_noArrow__xock6", clickable: "core-styles-module_clickable__ZuTTB", show: "core-styles-module_show__Nt9eE", closing: "core-styles-module_closing__sGnxF" }, D = { tooltip: "styles-module_tooltip__mnnfp", arrow: "styles-module_arrow__K0L3T", dark: "styles-module_dark__xNqje", light: "styles-module_light__Z6W-X", success: "styles-module_success__A2AKt", warning: "styles-module_warning__SCK0X", error: "styles-module_error__JvumD", info: "styles-module_info__BWdHW" };
const q = ({ forwardRef: t, id: l, className: i, classNameArrow: c, variant: u = "dark", anchorId: d, anchorSelect: p, place: v = "top", offset: m = 10, events: h2 = ["hover"], openOnClick: w2 = false, positionStrategy: b2 = "absolute", middlewares: S2, wrapper: g, delayShow: A2 = 0, delayHide: O2 = 0, float: T2 = false, hidden: x2 = false, noArrow: N2 = false, clickable: $2 = false, closeOnEsc: I = false, closeOnScroll: B = false, closeOnResize: q2 = false, openEvents: H2, closeEvents: M2, globalCloseEvents: W, imperativeModeOnly: P, style: V, position: F, afterShow: K, afterHide: U$1, disableTooltip: X, content: Y, contentWrapperRef: G, isOpen: Z, defaultIsOpen: J = false, setIsOpen: Q, activeAnchor: ee, setActiveAnchor: te, border: oe, opacity: le, arrowColor: re, role: ne = "tooltip" }) => {
  var ie;
  const ce = reactExports.useRef(null), se = reactExports.useRef(null), ae = reactExports.useRef(null), ue = reactExports.useRef(null), de = reactExports.useRef(null), [pe, ve] = reactExports.useState({ tooltipStyles: {}, tooltipArrowStyles: {}, place: v }), [me, fe] = reactExports.useState(false), [ye, he] = reactExports.useState(false), [we, be] = reactExports.useState(null), Se = reactExports.useRef(false), ge = reactExports.useRef(null), { anchorRefs: Ee, setActiveAnchor: Ae } = j(l), _e = reactExports.useRef(false), [Oe, ke] = reactExports.useState([]), Te = reactExports.useRef(false), Le = w2 || h2.includes("click"), Ce = Le || (null == H2 ? void 0 : H2.click) || (null == H2 ? void 0 : H2.dblclick) || (null == H2 ? void 0 : H2.mousedown), Re = H2 ? { ...H2 } : { mouseover: true, focus: true, mouseenter: false, click: false, dblclick: false, mousedown: false };
  !H2 && Le && Object.assign(Re, { mouseenter: false, focus: false, mouseover: false, click: true });
  const xe = M2 ? { ...M2 } : { mouseout: true, blur: true, mouseleave: false, click: false, dblclick: false, mouseup: false };
  !M2 && Le && Object.assign(xe, { mouseleave: false, blur: false, mouseout: false });
  const Ne = W ? { ...W } : { escape: I || false, scroll: B || false, resize: q2 || false, clickOutsideAnchor: Ce || false };
  P && (Object.assign(Re, { mouseover: false, focus: false, mouseenter: false, click: false, dblclick: false, mousedown: false }), Object.assign(xe, { mouseout: false, blur: false, mouseleave: false, click: false, dblclick: false, mouseup: false }), Object.assign(Ne, { escape: false, scroll: false, resize: false, clickOutsideAnchor: false })), C(() => (Te.current = true, () => {
    Te.current = false;
  }), []);
  const $e = (e) => {
    Te.current && (e && he(true), setTimeout(() => {
      Te.current && (null == Q || Q(e), void 0 === Z && fe(e));
    }, 10));
  };
  reactExports.useEffect(() => {
    if (void 0 === Z) return () => null;
    Z && he(true);
    const e = setTimeout(() => {
      fe(Z);
    }, 10);
    return () => {
      clearTimeout(e);
    };
  }, [Z]), reactExports.useEffect(() => {
    if (me !== Se.current) if (R(de), Se.current = me, me) null == K || K();
    else {
      const e = ((e2) => {
        const t2 = e2.match(/^([\d.]+)(ms|s)$/);
        if (!t2) return 0;
        const [, o, l2] = t2;
        return Number(o) * ("ms" === l2 ? 1 : 1e3);
      })(getComputedStyle(document.body).getPropertyValue("--rt-transition-show-delay"));
      de.current = setTimeout(() => {
        he(false), be(null), null == U$1 || U$1();
      }, e + 25);
    }
  }, [me]);
  const Ie = (e) => {
    ve((t2) => k(t2, e) ? t2 : e);
  }, je = (e = A2) => {
    R(ae), ye ? $e(true) : ae.current = setTimeout(() => {
      $e(true);
    }, e);
  }, Be = (e = O2) => {
    R(ue), ue.current = setTimeout(() => {
      _e.current || $e(false);
    }, e);
  }, ze = (e) => {
    var t2;
    if (!e) return;
    const o = null !== (t2 = e.currentTarget) && void 0 !== t2 ? t2 : e.target;
    if (!(null == o ? void 0 : o.isConnected)) return te(null), void Ae({ current: null });
    A2 ? je() : $e(true), te(o), Ae({ current: o }), R(ue);
  }, De = () => {
    $2 ? Be(O2 || 100) : O2 ? Be() : $e(false), R(ae);
  }, qe = ({ x: e, y: t2 }) => {
    var o;
    const l2 = { getBoundingClientRect: () => ({ x: e, y: t2, width: 0, height: 0, top: t2, left: e, right: e, bottom: t2 }) };
    E({ place: null !== (o = null == we ? void 0 : we.place) && void 0 !== o ? o : v, offset: m, elementReference: l2, tooltipReference: ce.current, tooltipArrowReference: se.current, strategy: b2, middlewares: S2, border: oe }).then((e2) => {
      Ie(e2);
    });
  }, He = (e) => {
    if (!e) return;
    const t2 = e, o = { x: t2.clientX, y: t2.clientY };
    qe(o), ge.current = o;
  }, Me = (e) => {
    var t2;
    if (!me) return;
    const o = e.target;
    if (!o.isConnected) return;
    if (null === (t2 = ce.current) || void 0 === t2 ? void 0 : t2.contains(o)) return;
    [document.querySelector(`[id='${d}']`), ...Oe].some((e2) => null == e2 ? void 0 : e2.contains(o)) || ($e(false), R(ae));
  }, We = _(ze, 50), Pe = _(De, 50), Ve = (e) => {
    Pe.cancel(), We(e);
  }, Fe = () => {
    We.cancel(), Pe();
  }, Ke = reactExports.useCallback(() => {
    var e, t2;
    const o = null !== (e = null == we ? void 0 : we.position) && void 0 !== e ? e : F;
    o ? qe(o) : T2 ? ge.current && qe(ge.current) : (null == ee ? void 0 : ee.isConnected) && E({ place: null !== (t2 = null == we ? void 0 : we.place) && void 0 !== t2 ? t2 : v, offset: m, elementReference: ee, tooltipReference: ce.current, tooltipArrowReference: se.current, strategy: b2, middlewares: S2, border: oe }).then((e2) => {
      Te.current && Ie(e2);
    });
  }, [me, ee, Y, V, v, null == we ? void 0 : we.place, m, b2, F, null == we ? void 0 : we.position, T2]);
  reactExports.useEffect(() => {
    var e, t2;
    const o = new Set(Ee);
    Oe.forEach((e2) => {
      (null == X ? void 0 : X(e2)) || o.add({ current: e2 });
    });
    const l2 = document.querySelector(`[id='${d}']`);
    l2 && !(null == X ? void 0 : X(l2)) && o.add({ current: l2 });
    const r = () => {
      $e(false);
    }, n = L(ee), i2 = L(ce.current);
    Ne.scroll && (window.addEventListener("scroll", r), null == n || n.addEventListener("scroll", r), null == i2 || i2.addEventListener("scroll", r));
    let c2 = null;
    Ne.resize ? window.addEventListener("resize", r) : ee && ce.current && (c2 = autoUpdate(ee, ce.current, Ke, { ancestorResize: true, elementResize: true, layoutShift: true }));
    const s = (e2) => {
      "Escape" === e2.key && $e(false);
    };
    Ne.escape && window.addEventListener("keydown", s), Ne.clickOutsideAnchor && window.addEventListener("click", Me);
    const a = [], u2 = (e2) => Boolean((null == e2 ? void 0 : e2.target) && (null == ee ? void 0 : ee.contains(e2.target))), p2 = (e2) => {
      me && u2(e2) || ze(e2);
    }, v2 = (e2) => {
      me && u2(e2) && De();
    }, m2 = ["mouseover", "mouseout", "mouseenter", "mouseleave", "focus", "blur"], y = ["click", "dblclick", "mousedown", "mouseup"];
    Object.entries(Re).forEach(([e2, t3]) => {
      t3 && (m2.includes(e2) ? a.push({ event: e2, listener: Ve }) : y.includes(e2) && a.push({ event: e2, listener: p2 }));
    }), Object.entries(xe).forEach(([e2, t3]) => {
      t3 && (m2.includes(e2) ? a.push({ event: e2, listener: Fe }) : y.includes(e2) && a.push({ event: e2, listener: v2 }));
    }), T2 && a.push({ event: "pointermove", listener: He });
    const h3 = () => {
      _e.current = true;
    }, w3 = () => {
      _e.current = false, De();
    }, b3 = $2 && (xe.mouseout || xe.mouseleave);
    return b3 && (null === (e = ce.current) || void 0 === e || e.addEventListener("mouseover", h3), null === (t2 = ce.current) || void 0 === t2 || t2.addEventListener("mouseout", w3)), a.forEach(({ event: e2, listener: t3 }) => {
      o.forEach((o2) => {
        var l3;
        null === (l3 = o2.current) || void 0 === l3 || l3.addEventListener(e2, t3);
      });
    }), () => {
      var e2, t3;
      Ne.scroll && (window.removeEventListener("scroll", r), null == n || n.removeEventListener("scroll", r), null == i2 || i2.removeEventListener("scroll", r)), Ne.resize ? window.removeEventListener("resize", r) : null == c2 || c2(), Ne.clickOutsideAnchor && window.removeEventListener("click", Me), Ne.escape && window.removeEventListener("keydown", s), b3 && (null === (e2 = ce.current) || void 0 === e2 || e2.removeEventListener("mouseover", h3), null === (t3 = ce.current) || void 0 === t3 || t3.removeEventListener("mouseout", w3)), a.forEach(({ event: e3, listener: t4 }) => {
        o.forEach((o2) => {
          var l3;
          null === (l3 = o2.current) || void 0 === l3 || l3.removeEventListener(e3, t4);
        });
      });
    };
  }, [ee, Ke, ye, Ee, Oe, H2, M2, W, Le, A2, O2]), reactExports.useEffect(() => {
    var e, t2;
    let o = null !== (t2 = null !== (e = null == we ? void 0 : we.anchorSelect) && void 0 !== e ? e : p) && void 0 !== t2 ? t2 : "";
    !o && l && (o = `[data-tooltip-id='${l.replace(/'/g, "\\'")}']`);
    const r = new MutationObserver((e2) => {
      const t3 = [], r2 = [];
      e2.forEach((e3) => {
        if ("attributes" === e3.type && "data-tooltip-id" === e3.attributeName) {
          e3.target.getAttribute("data-tooltip-id") === l ? t3.push(e3.target) : e3.oldValue === l && r2.push(e3.target);
        }
        if ("childList" === e3.type) {
          if (ee) {
            const t4 = [...e3.removedNodes].filter((e4) => 1 === e4.nodeType);
            if (o) try {
              r2.push(...t4.filter((e4) => e4.matches(o))), r2.push(...t4.flatMap((e4) => [...e4.querySelectorAll(o)]));
            } catch (e4) {
            }
            t4.some((e4) => {
              var t5;
              return !!(null === (t5 = null == e4 ? void 0 : e4.contains) || void 0 === t5 ? void 0 : t5.call(e4, ee)) && (he(false), $e(false), te(null), R(ae), R(ue), true);
            });
          }
          if (o) try {
            const l2 = [...e3.addedNodes].filter((e4) => 1 === e4.nodeType);
            t3.push(...l2.filter((e4) => e4.matches(o))), t3.push(...l2.flatMap((e4) => [...e4.querySelectorAll(o)]));
          } catch (e4) {
          }
        }
      }), (t3.length || r2.length) && ke((e3) => [...e3.filter((e4) => !r2.includes(e4)), ...t3]);
    });
    return r.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-tooltip-id"], attributeOldValue: true }), () => {
      r.disconnect();
    };
  }, [l, p, null == we ? void 0 : we.anchorSelect, ee]), reactExports.useEffect(() => {
    Ke();
  }, [Ke]), reactExports.useEffect(() => {
    if (!(null == G ? void 0 : G.current)) return () => null;
    const e = new ResizeObserver(() => {
      setTimeout(() => Ke());
    });
    return e.observe(G.current), () => {
      e.disconnect();
    };
  }, [Y, null == G ? void 0 : G.current]), reactExports.useEffect(() => {
    var e;
    const t2 = document.querySelector(`[id='${d}']`), o = [...Oe, t2];
    ee && o.includes(ee) || te(null !== (e = Oe[0]) && void 0 !== e ? e : t2);
  }, [d, Oe, ee]), reactExports.useEffect(() => (J && $e(true), () => {
    R(ae), R(ue);
  }), []), reactExports.useEffect(() => {
    var e;
    let t2 = null !== (e = null == we ? void 0 : we.anchorSelect) && void 0 !== e ? e : p;
    if (!t2 && l && (t2 = `[data-tooltip-id='${l.replace(/'/g, "\\'")}']`), t2) try {
      const e2 = Array.from(document.querySelectorAll(t2));
      ke(e2);
    } catch (e2) {
      ke([]);
    }
  }, [l, p, null == we ? void 0 : we.anchorSelect]), reactExports.useEffect(() => {
    ae.current && (R(ae), je(A2));
  }, [A2]);
  const Ue = null !== (ie = null == we ? void 0 : we.content) && void 0 !== ie ? ie : Y, Xe = me && Object.keys(pe.tooltipStyles).length > 0;
  return reactExports.useImperativeHandle(t, () => ({ open: (e) => {
    if (null == e ? void 0 : e.anchorSelect) try {
      document.querySelector(e.anchorSelect);
    } catch (t2) {
      return void console.warn(`[react-tooltip] "${e.anchorSelect}" is not a valid CSS selector`);
    }
    be(null != e ? e : null), (null == e ? void 0 : e.delay) ? je(e.delay) : $e(true);
  }, close: (e) => {
    (null == e ? void 0 : e.delay) ? Be(e.delay) : $e(false);
  }, activeAnchor: ee, place: pe.place, isOpen: Boolean(ye && !x2 && Ue && Xe) })), ye && !x2 && Ue ? U.createElement(g, { id: l, role: ne, className: classNames("react-tooltip", z.tooltip, D.tooltip, D[u], i, `react-tooltip__place-${pe.place}`, z[Xe ? "show" : "closing"], Xe ? "react-tooltip__show" : "react-tooltip__closing", "fixed" === b2 && z.fixed, $2 && z.clickable), onTransitionEnd: (e) => {
    R(de), me || "opacity" !== e.propertyName || (he(false), be(null), null == U$1 || U$1());
  }, style: { ...V, ...pe.tooltipStyles, opacity: void 0 !== le && Xe ? le : void 0 }, ref: ce }, Ue, U.createElement(g, { className: classNames("react-tooltip-arrow", z.arrow, D.arrow, c, N2 && z.noArrow), style: { ...pe.tooltipArrowStyles, background: re ? `linear-gradient(to right bottom, transparent 50%, ${re} 50%)` : void 0 }, ref: se })) : null;
}, H = ({ content: t }) => U.createElement("span", { dangerouslySetInnerHTML: { __html: t } }), M = U.forwardRef(({ id: t, anchorId: l, anchorSelect: n, content: i, html: c, render: a, className: u, classNameArrow: d, variant: p = "dark", place: v = "top", offset: m = 10, wrapper: f = "div", children: h2 = null, events: w2 = ["hover"], openOnClick: b2 = false, positionStrategy: S2 = "absolute", middlewares: g, delayShow: E2 = 0, delayHide: _2 = 0, float: O2 = false, hidden: k2 = false, noArrow: T2 = false, clickable: L2 = false, closeOnEsc: C2 = false, closeOnScroll: R2 = false, closeOnResize: x2 = false, openEvents: N2, closeEvents: $2, globalCloseEvents: I, imperativeModeOnly: B = false, style: z2, position: D2, isOpen: M2, defaultIsOpen: W = false, disableStyleInjection: P = false, border: V, opacity: F, arrowColor: K, setIsOpen: U$1, afterShow: X, afterHide: Y, disableTooltip: G, role: Z = "tooltip" }, J) => {
  const [Q, ee] = reactExports.useState(i), [te, oe] = reactExports.useState(c), [le, re] = reactExports.useState(v), [ne, ie] = reactExports.useState(p), [ce, se] = reactExports.useState(m), [ae, ue] = reactExports.useState(E2), [de, pe] = reactExports.useState(_2), [ve, me] = reactExports.useState(O2), [fe, ye] = reactExports.useState(k2), [he, we] = reactExports.useState(f), [be, Se] = reactExports.useState(w2), [ge, Ee] = reactExports.useState(S2), [Ae, _e] = reactExports.useState(null), [Oe, ke] = reactExports.useState(null), Te = reactExports.useRef(P), { anchorRefs: Le, activeAnchor: Ce } = j(t), Re = (e) => null == e ? void 0 : e.getAttributeNames().reduce((t2, o) => {
    var l2;
    if (o.startsWith("data-tooltip-")) {
      t2[o.replace(/^data-tooltip-/, "")] = null !== (l2 = null == e ? void 0 : e.getAttribute(o)) && void 0 !== l2 ? l2 : null;
    }
    return t2;
  }, {}), xe = (e) => {
    const t2 = { place: (e2) => {
      var t3;
      re(null !== (t3 = e2) && void 0 !== t3 ? t3 : v);
    }, content: (e2) => {
      ee(null != e2 ? e2 : i);
    }, html: (e2) => {
      oe(null != e2 ? e2 : c);
    }, variant: (e2) => {
      var t3;
      ie(null !== (t3 = e2) && void 0 !== t3 ? t3 : p);
    }, offset: (e2) => {
      se(null === e2 ? m : Number(e2));
    }, wrapper: (e2) => {
      var t3;
      we(null !== (t3 = e2) && void 0 !== t3 ? t3 : f);
    }, events: (e2) => {
      const t3 = null == e2 ? void 0 : e2.split(" ");
      Se(null != t3 ? t3 : w2);
    }, "position-strategy": (e2) => {
      var t3;
      Ee(null !== (t3 = e2) && void 0 !== t3 ? t3 : S2);
    }, "delay-show": (e2) => {
      ue(null === e2 ? E2 : Number(e2));
    }, "delay-hide": (e2) => {
      pe(null === e2 ? _2 : Number(e2));
    }, float: (e2) => {
      me(null === e2 ? O2 : "true" === e2);
    }, hidden: (e2) => {
      ye(null === e2 ? k2 : "true" === e2);
    }, "class-name": (e2) => {
      _e(e2);
    } };
    Object.values(t2).forEach((e2) => e2(null)), Object.entries(e).forEach(([e2, o]) => {
      var l2;
      null === (l2 = t2[e2]) || void 0 === l2 || l2.call(t2, o);
    });
  };
  reactExports.useEffect(() => {
    ee(i);
  }, [i]), reactExports.useEffect(() => {
    oe(c);
  }, [c]), reactExports.useEffect(() => {
    re(v);
  }, [v]), reactExports.useEffect(() => {
    ie(p);
  }, [p]), reactExports.useEffect(() => {
    se(m);
  }, [m]), reactExports.useEffect(() => {
    ue(E2);
  }, [E2]), reactExports.useEffect(() => {
    pe(_2);
  }, [_2]), reactExports.useEffect(() => {
    me(O2);
  }, [O2]), reactExports.useEffect(() => {
    ye(k2);
  }, [k2]), reactExports.useEffect(() => {
    Ee(S2);
  }, [S2]), reactExports.useEffect(() => {
    Te.current !== P && console.warn("[react-tooltip] Do not change `disableStyleInjection` dynamically.");
  }, [P]), reactExports.useEffect(() => {
    "undefined" != typeof window && window.dispatchEvent(new CustomEvent("react-tooltip-inject-styles", { detail: { disableCore: "core" === P, disableBase: P } }));
  }, []), reactExports.useEffect(() => {
    var e;
    const o = new Set(Le);
    let r = n;
    if (!r && t && (r = `[data-tooltip-id='${t.replace(/'/g, "\\'")}']`), r) try {
      document.querySelectorAll(r).forEach((e2) => {
        o.add({ current: e2 });
      });
    } catch (e2) {
      console.warn(`[react-tooltip] "${r}" is not a valid CSS selector`);
    }
    const i2 = document.querySelector(`[id='${l}']`);
    if (i2 && o.add({ current: i2 }), !o.size) return () => null;
    const c2 = null !== (e = null != Oe ? Oe : i2) && void 0 !== e ? e : Ce.current, s = new MutationObserver((e2) => {
      e2.forEach((e3) => {
        var t2;
        if (!c2 || "attributes" !== e3.type || !(null === (t2 = e3.attributeName) || void 0 === t2 ? void 0 : t2.startsWith("data-tooltip-"))) return;
        const o2 = Re(c2);
        xe(o2);
      });
    }), a2 = { attributes: true, childList: false, subtree: false };
    if (c2) {
      const e2 = Re(c2);
      xe(e2), s.observe(c2, a2);
    }
    return () => {
      s.disconnect();
    };
  }, [Le, Ce, Oe, l, n]), reactExports.useEffect(() => {
    (null == z2 ? void 0 : z2.border) && console.warn("[react-tooltip] Do not set `style.border`. Use `border` prop instead."), V && !A("border", `${V}`) && console.warn(`[react-tooltip] "${V}" is not a valid \`border\`.`), (null == z2 ? void 0 : z2.opacity) && console.warn("[react-tooltip] Do not set `style.opacity`. Use `opacity` prop instead."), F && !A("opacity", `${F}`) && console.warn(`[react-tooltip] "${F}" is not a valid \`opacity\`.`);
  }, []);
  let Ne = h2;
  const $e = reactExports.useRef(null);
  if (a) {
    const t2 = a({ content: (null == Oe ? void 0 : Oe.getAttribute("data-tooltip-content")) || Q || null, activeAnchor: Oe });
    Ne = t2 ? U.createElement("div", { ref: $e, className: "react-tooltip-content-wrapper" }, t2) : null;
  } else Q && (Ne = Q);
  te && (Ne = U.createElement(H, { content: te }));
  const Ie = { forwardRef: J, id: t, anchorId: l, anchorSelect: n, className: classNames(u, Ae), classNameArrow: d, content: Ne, contentWrapperRef: $e, place: le, variant: ne, offset: ce, wrapper: he, events: be, openOnClick: b2, positionStrategy: ge, middlewares: g, delayShow: ae, delayHide: de, float: ve, hidden: fe, noArrow: T2, clickable: L2, closeOnEsc: C2, closeOnScroll: R2, closeOnResize: x2, openEvents: N2, closeEvents: $2, globalCloseEvents: I, imperativeModeOnly: B, style: z2, position: D2, isOpen: M2, defaultIsOpen: W, border: V, opacity: F, arrowColor: K, setIsOpen: U$1, afterShow: X, afterHide: Y, disableTooltip: G, activeAnchor: Oe, setActiveAnchor: (e) => ke(e), role: Z };
  return U.createElement(q, { ...Ie });
});
"undefined" != typeof window && window.addEventListener("react-tooltip-inject-styles", (e) => {
  e.detail.disableCore || S({ css: `:root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9;--rt-transition-show-delay:0.15s;--rt-transition-closing-delay:0.15s}.core-styles-module_tooltip__3vRRp{position:absolute;top:0;left:0;pointer-events:none;opacity:0;will-change:opacity}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{opacity:var(--rt-opacity);transition:opacity var(--rt-transition-show-delay)ease-out}.core-styles-module_closing__sGnxF{opacity:0;transition:opacity var(--rt-transition-closing-delay)ease-in}`, type: "core" }), e.detail.disableBase || S({ css: `
.styles-module_tooltip__mnnfp{padding:8px 16px;border-radius:3px;font-size:90%;width:max-content}.styles-module_arrow__K0L3T{width:8px;height:8px}[class*='react-tooltip__place-top']>.styles-module_arrow__K0L3T{transform:rotate(45deg)}[class*='react-tooltip__place-right']>.styles-module_arrow__K0L3T{transform:rotate(135deg)}[class*='react-tooltip__place-bottom']>.styles-module_arrow__K0L3T{transform:rotate(225deg)}[class*='react-tooltip__place-left']>.styles-module_arrow__K0L3T{transform:rotate(315deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}`, type: "base" });
});
const Tooltip = ({ id, tooltipMessage, content }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "example-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-tooltip-id": id, "data-tooltip-html": tooltipMessage, children: content }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      M,
      {
        clickable: true,
        id,
        place: "top",
        className: "example-rounded transition-opacity duration-300 ease-in-out",
        style: {
          background: "var(--bs-primary)",
          borderRadius: "6px",
          padding: "5px"
        }
      }
    )
  ] });
};
export {
  Tooltip as T
};

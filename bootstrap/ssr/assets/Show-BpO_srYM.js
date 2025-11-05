import { r as reactExports, j as jsxRuntimeExports, S as Se, q as q$1, J as Je, a as je, U as U$1 } from "../ssr.js";
import { A as Avatar } from "./Avatar-Bsv7zAP7.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { G as GenericModal } from "./GenericModal-Du41bhoJ.js";
import { P as PuppyCard } from "./Card-CnUy_aL9.js";
import { S as Swiper, a as SwiperSlide } from "./create-element-if-not-defined-BxImSDkK.js";
import { P as Pagination } from "./pagination-CxTwo8xt.js";
import { A as Autoplay } from "./autoplay-DKsRVzkf.js";
import { S as SellerCard } from "./SellerCard-CDG9hARm.js";
import { B as Button } from "./Button-C_TFTgI3.js";
import { L as Layout } from "./Layout-Drj2wi7W.js";
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
import "./Modal-BtmenwCz.js";
import "./index-DbhDZzck.js";
import "./index-D7h8hQJR.js";
import "./index-ttmgawJR.js";
import "./Tooltip-BCRubnSZ.js";
import "./floating-ui.dom-D9vmQZx1.js";
import "./index-DzrIk5T7.js";
const d = (r2) => {
}, h = "undefined" == typeof window ? reactExports.useEffect : reactExports.useLayoutEffect, m = (r2) => "number" == typeof r2 && r2 > 0, p = (r2) => m(r2) ? r2 : 0, L = (r2) => Math.round(100 * r2) / 100, O = (r2) => Math.round(2 * r2) / 2, g = (r2) => 0 === r2 ? 0 : -1 * L(r2);
const y = {};
const b = "rr--group", S = "rr--box", R = "rr--svg", M = "rr--reset", A = "rr--focus-reset", E = "rr--svg-stop-1", v = "rr--svg-stop-2", B = "rr--on", I = "rr--off", x = { ZOOM: "rr--fx-zoom", POSITION: "rr--fx-position", OPACITY: "rr--fx-opacity", COLORS: "rr--fx-colors" }, C = { SMALL: "rr--rx-sm", MEDIUM: "rr--rx-md", LARGE: "rr--rx-lg", FULL: "rr--rx-full" }, w = { SMALL: "rr--gap-sm", MEDIUM: "rr--gap-md", LARGE: "rr--gap-lg" }, D = { SMALL: "rr--space-sm", MEDIUM: "rr--space-md", LARGE: "rr--space-lg" }, N = "rr--pointer", $ = "rr--disabled", k = "rr--dir-y", F = "rr--dir-x", T = "rr--has-stroke", U = "rr--has-border", W = "rr--hf-box-on", P = "rr--hf-box-int", G = "rr--hf-box-off", K = "rr--hf-svg-on", X = "rr--hf-svg-off", Z = { FILL: "--rr--fill-on-color", BOX: "--rr--box-on-color", BORDER: "--rr--border-on-color", STROKE: "--rr--stroke-on-color" }, H = { FILL: "--rr--fill-off-color", BOX: "--rr--box-off-color", BORDER: "--rr--border-off-color", STROKE: "--rr--stroke-off-color" }, V = "--rr--border-width", j = "horizontal", Y = "vertical", z = "svg", q = "box", J = { NONE: "none", SMALL: "small", MEDIUM: "medium", LARGE: "large", FULL: "full" }, Q = { NONE: "none", ZOOM: "zoom", POSITION: "position", OPACITY: "opacity", COLORS: "colors" }, _ = { FILL: "activeFillColor", BOX: "activeBoxColor", BORDER: "activeBoxBorderColor", STROKE: "activeStrokeColor" }, rr = { FILL: "inactiveFillColor", BOX: "inactiveBoxColor", BORDER: "inactiveBoxBorderColor", STROKE: "inactiveStrokeColor" };
function er({ itemShapes: t2, testId: n2, itemStrokeWidth: c2 = 0, orientation: l2 = j, hasHF: u2 = false }) {
  const f2 = c2 > 0 ? -c2 / 2 : 0, d2 = c2 > 0 ? `${f2} ${f2}` : "0 0", m2 = reactExports.useId(), p2 = reactExports.useRef(null), [O2, y2] = reactExports.useState(null), [b2, S2] = reactExports.useState(false), M2 = reactExports.useRef(null), A2 = reactExports.useRef(null), B2 = reactExports.useCallback((r2) => {
    const { width: e2, height: t3, x: n3, y: o2 } = r2.getBBox();
    if (((...r3) => r3.every((r4) => "number" == typeof r4))(e2, t3, n3, o2)) {
      const r3 = `${d2} ${L(e2 + c2)} ${L(t3 + c2)}`, i2 = `${g(n3)} ${g(o2)}`;
      y2({ viewBox: r3, translateData: i2 });
    }
  }, [c2, d2]);
  return h(() => {
    if (p2.current) {
      const { width: r2, height: e2, x: t3, y: n3 } = p2.current.getBBox();
      if (0 === r2 && 0 === e2 && 0 === t3 && 0 === n3) {
        const r3 = function(r4) {
          if (!r4 || !r4.parentElement)
            return null;
          let e3 = r4 == null ? void 0 : r4.parentElement;
          for (; e3 && "none" !== window.getComputedStyle(e3).display; )
            e3 = e3.parentElement;
          return e3;
        }(p2.current);
        r3 && (A2.current = r3, S2(true));
      } else
        S2(false);
      B2(p2.current);
    }
  }, [t2, c2, u2]), h(() => {
    if (b2 && A2.current)
      return M2.current = new MutationObserver((r2, e2) => {
        r2.forEach(() => {
          "none" === window.getComputedStyle(A2.current).display || (B2(p2.current), e2.disconnect());
        });
      }), M2.current.observe(A2.current, { attributes: true }), () => {
        var _a;
        (_a = M2.current) == null ? void 0 : _a.disconnect();
      };
  }, [b2, B2]), jsxRuntimeExports.jsxs("svg", { "aria-hidden": "true", className: R, xmlns: "http://www.w3.org/2000/svg", viewBox: O2 ? O2.viewBox : "0 0 0 0", preserveAspectRatio: "xMidYMid meet", ...c2 > 0 ? { strokeWidth: c2 } : {}, ...n2, children: [u2 && jsxRuntimeExports.jsx("defs", { children: jsxRuntimeExports.jsxs("linearGradient", { id: m2, ...l2 === Y ? { gradientTransform: "rotate(90)" } : {}, children: [jsxRuntimeExports.jsx("stop", { className: E, offset: "50%" }), jsxRuntimeExports.jsx("stop", { className: v, offset: "50%" })] }) }), jsxRuntimeExports.jsx("g", { ref: p2, shapeRendering: "geometricPrecision", ...function() {
    if (O2) {
      const r2 = `translate(${O2 == null ? void 0 : O2.translateData})`;
      return "translate(0 0)" === r2 ? {} : { transform: r2 };
    }
    return { transform: void 0 };
  }(), ...u2 ? { fill: `url('#${m2}')` } : {}, children: t2 })] });
}
function tr(r2, e2, t2) {
  switch (e2) {
    case _.FILL:
      return r2[Z.FILL] = t2, true;
    case _.BOX:
      return r2[Z.BOX] = t2, true;
    case _.BORDER:
      return r2[Z.BORDER] = t2, true;
    case _.STROKE:
      return r2[Z.STROKE] = t2, true;
  }
  return false;
}
function nr(r2, e2, t2) {
  if (!tr(r2, e2, t2))
    switch (e2) {
      case rr.FILL:
        r2[H.FILL] = t2;
        break;
      case rr.BOX:
        r2[H.BOX] = t2;
        break;
      case rr.BORDER:
        r2[H.BORDER] = t2;
        break;
      case rr.STROKE:
        r2[H.STROKE] = t2;
    }
}
function or(r2, e2, t2) {
  const n2 = {};
  let o2;
  for (const [t3, o3] of Object.entries(r2))
    tr(n2, t3, o3[e2]);
  return t2 ? (o2 = Array(e2).fill({}), o2.push(n2)) : o2 = Array(e2 + 1).fill(n2), o2;
}
const ir = (r2) => `${r2} ${x.COLORS}`;
function ar({ className: r2, radius: e2, readOnly: t2, isDisabled: n2, isDynamic: o2, transition: i2, orientation: a2, absoluteBoxBorderWidth: s2, absoluteStrokeWidth: c2, spaceBetween: l2, spaceInside: u2 }) {
  const f2 = o2 ? N : "", d2 = function(r3) {
    switch (r3) {
      case J.SMALL:
        return w.SMALL;
      case J.MEDIUM:
        return w.MEDIUM;
      case J.LARGE:
        return w.LARGE;
      default:
        return "";
    }
  }(l2), h2 = function(r3) {
    switch (r3) {
      case J.SMALL:
        return D.SMALL;
      case J.MEDIUM:
        return D.MEDIUM;
      case J.LARGE:
        return D.LARGE;
      default:
        return "";
    }
  }(u2), m2 = !t2 && n2 ? $ : "", p2 = o2 && i2 !== Q.NONE ? function(r3) {
    switch (r3) {
      case Q.ZOOM:
        return ir(x.ZOOM);
      case Q.POSITION:
        return ir(x.POSITION);
      case Q.OPACITY:
        return ir(x.OPACITY);
      case Q.COLORS:
        return x.COLORS;
      default:
        return "";
    }
  }(i2) : "", L2 = a2 === Y ? k : F, O2 = function(r3) {
    switch (r3) {
      case J.SMALL:
        return C.SMALL;
      case J.MEDIUM:
        return C.MEDIUM;
      case J.LARGE:
        return C.LARGE;
      case J.FULL:
        return C.FULL;
      default:
        return "";
    }
  }(e2);
  return `${b} ${L2} ${c2 > 0 ? T : ""} ${s2 > 0 ? U : ""}
${p2} ${O2} ${f2} ${m2} ${d2}
${h2} ${r2}`.replace(/  +/g, " ").trimEnd();
}
function sr(r2, e2, t2) {
  return Array.from({ length: e2 }, (e3, n2) => r2 ? n2 === t2 ? B : I : n2 <= t2 ? B : I);
}
function cr(r2, e2, t2) {
  const n2 = Math.floor(O(r2));
  return Array.from({ length: e2 }, (r3, e3) => "box" === t2 ? e3 > n2 ? G : e3 === n2 ? P : W : e3 > n2 ? X : K);
}
function lr(r2, e2) {
  const t2 = {};
  m(e2) && (t2[V] = `${e2}px`);
  const n2 = Object.entries(r2);
  if (n2.length > 0)
    for (const [r3, e3] of n2)
      nr(t2, r3, e3);
  return t2;
}
const ur = [_.FILL, _.BOX, _.STROKE, _.BORDER];
function fr(r2, e2, t2 = false) {
  return Array.from({ length: r2 }, (n2, o2) => t2 && e2 < 0 ? o2 === r2 - 1 ? 0 : -1 : e2 <= 0 ? 0 === o2 ? 0 : -1 : e2 > 0 ? o2 === e2 ? 0 : -1 : void 0);
}
const dr = "@smastrom/react-rating", hr = (r2) => `[${dr}] - Nothing's returned from rendering. Reason: ${r2}.`;
function mr(r2, e2) {
  return r2.shouldRender = false, r2.reason = hr(e2), r2;
}
const pr = "itemShapes is not a valid JSX element";
const Lr = jsxRuntimeExports.jsx("polygon", { points: "25 9.02 16.4 7.75 12.46 0 8.59 7.79 0 9.14 6.21 15.23 4.85 23.81 12.55 19.79 20.3 23.74 18.85 15.17 25 9.02" });
jsxRuntimeExports.jsx("path", { d: "M12.5,18.16l-7.73,5.61,2.95-9.08L0,9.07H9.55S12.5,0,12.5,0l2.95,9.07h9.55l-7.73,5.62,2.95,9.08-7.73-5.61Z" });
jsxRuntimeExports.jsx("path", { d: "M112.46,57.88c-.23-.72-.88-1.22-1.63-1.27l-6.63-.46-2.45-6.19c-.27-.7-.95-1.16-1.7-1.16h0c-.75,0-1.42,.46-1.7,1.16l-2.5,6.23-6.58,.42c-.75,.05-1.4,.55-1.63,1.27-.24,.73,0,1.53,.58,2.02l5.07,4.28-1.51,5.92c-.21,.82,.1,1.69,.78,2.19,.66,.48,1.55,.5,2.24,.07l5.23-3.31h.02l5.63,3.56c.29,.19,.63,.29,.97,.29,1.02,0,1.83-.84,1.83-1.86,0-.16-.02-.31-.06-.47l-1.6-6.48,5.04-4.2c.59-.49,.82-1.29,.58-2.02Z" });
jsxRuntimeExports.jsx("path", { d: "M22.72,8.24h-6.68L13.97,1.88c-.81-2.51-2.13-2.51-2.95,0l-2.07,6.36H2.28c-2.63,0-3.04,1.25-.91,2.8l5.41,3.93-2.06,6.36c-.81,2.51,.25,3.28,2.39,1.73l5.41-3.93,5.41,3.93c2.13,1.55,3.2,.77,2.39-1.73l-2.07-6.36,5.41-3.93c2.13-1.55,1.72-2.8-.91-2.8Z" });
jsxRuntimeExports.jsx("path", { d: "M11.58,.77c.51-1.02,1.33-1.02,1.84,0l2.34,4.73c.5,1.02,1.84,2,2.98,2.16l5.22,.76c1.13,.17,1.39,.95,.57,1.75l-3.78,3.68c-.82,.8-1.33,2.37-1.14,3.5l.89,5.2c.19,1.13-.48,1.61-1.49,1.08l-4.67-2.45c-1.01-.53-2.67-.53-3.68,0l-4.67,2.46c-1.01,.53-1.68,.05-1.49-1.08l.89-5.2c.19-1.13-.32-2.7-1.14-3.5L.48,10.17c-.82-.8-.56-1.58,.57-1.75l5.22-.76c1.13-.16,2.47-1.14,2.98-2.16L11.58,.77h0Z" });
jsxRuntimeExports.jsx("path", { d: "M19.29,1.61c-2.15-2.15-5.63-2.15-7.78,0,0,0,0,0,0,0l-1.06,1.06-1.06-1.06C7.24-.54,3.76-.54,1.61,1.61-.54,3.76-.54,7.24,1.61,9.39l1.06,1.06,7.78,7.78,7.78-7.78,1.06-1.06c2.15-2.15,2.15-5.63,0-7.78,0,0,0,0,0,0Z" });
const Rr = { itemShapes: Lr, itemStrokeWidth: 2, activeFillColor: "#ffb23f", inactiveFillColor: "#fff7ed", activeStrokeColor: "#e17b21", inactiveStrokeColor: "#eda76a" }, Mr = reactExports.forwardRef(({ value: n2, items: o2 = 5, readOnly: l2 = false, onChange: m2 = d, onHoverChange: L2 = d, onFocus: g2 = d, onBlur: b2 = d, preventDefault: R2 = "all", isDisabled: E2 = false, highlightOnlySelected: v2 = false, orientation: B2 = j, spaceBetween: I2 = J.NONE, spaceInside: x2 = J.SMALL, radius: C2 = J.NONE, transition: w2 = Q.COLORS, itemStyles: D2 = Rr, isRequired: N2 = false, halfFillMode: $2 = z, visibleLabelId: k2, visibleItemLabelIds: F2, invisibleItemLabels: T2, invisibleLabel: U2 = l2 ? n2 > 0 ? `Rated ${n2} on ${o2}` : "Not rated" : "Rating Selection", resetLabel: W2 = "Reset rating", id: P2, className: G2, style: K2 }, X2) => {
  const Z2 = Array.from({ length: o2 }, (r2, e2) => e2 + 1), H2 = l2 && !Number.isInteger(n2), V2 = H2 && !v2, Y2 = H2 && v2 ? Math.round(n2) : n2, _2 = !l2 && !E2, rr2 = Y2 >= 0.25, tr2 = "string" == typeof G2 ? G2 : "", nr2 = $2 === q ? q : z, ir2 = V2 && !((r2) => Number.isInteger(O(r2)))(Y2), dr2 = !N2 && !l2, hr2 = N2 ? o2 : o2 + 1, Lr2 = V2 ? function(r2, e2) {
    const t2 = O(e2);
    return Number.isInteger(t2) ? r2.indexOf(t2) : Math.floor(t2);
  }(Z2, Y2) : Z2.indexOf(Y2), { staticColors: Or2, arrayColors: gr2, itemShapes: yr2, absoluteStrokeWidth: br2, absoluteBoxBorderWidth: Sr2 } = reactExports.useMemo(() => {
    const { itemShapes: r2, itemStrokeWidth: e2, boxBorderWidth: t2, ...n3 } = D2, o3 = function(r3) {
      const e3 = { ...r3 }, t3 = {}, n4 = Object.entries(e3);
      if (n4.length > 0)
        for (const [r4, o4] of n4)
          if (Array.isArray(o4) || "string" == typeof o4) {
            if (Array.isArray(o4))
              for (const n5 of ur)
                if (n5 === r4) {
                  const n6 = o4.filter((r5) => "string" == typeof r5);
                  n6.length > 0 && (t3[r4] = n6, delete e3[r4]);
                } else
                  delete e3[r4];
          } else
            delete e3[r4];
      return { arrayColors: t3, staticColors: e3 };
    }(n3);
    return { itemShapes: r2, absoluteStrokeWidth: p(e2), absoluteBoxBorderWidth: p(t2), ...o3 };
  }, [D2]), Mr2 = Object.keys(gr2).length > 0, Ar = reactExports.useCallback((r2, e2) => ({ dynamicClassNames: ir2 ? cr(Y2, o2, nr2) : sr(v2, o2, r2), dynamicCssVars: e2 && Mr2 ? or(gr2, r2, v2) : [] }), [gr2, Mr2, v2, nr2, ir2, o2, Y2]), Er = reactExports.useCallback(() => $r(fr(hr2, Lr2, !N2)), [Lr2, hr2, N2]), vr = reactExports.useRef(true), Br = reactExports.useRef(true), Ir = reactExports.useRef(null), xr = reactExports.useRef([]), Cr = reactExports.useRef(false), [wr, Dr] = reactExports.useState({ staticCssVars: lr(Or2, Sr2), ...Ar(Lr2, rr2) }), [Nr, $r] = reactExports.useState(() => _2 ? fr(hr2, Lr2, !N2) : []);
  h(() => {
    _2 && xr.current && (Cr.current = function(r2) {
      if (r2)
        return "rtl" === getComputedStyle(r2).getPropertyValue("direction");
      return false;
    }(xr.current[0]));
  }, [_2]), reactExports.useEffect(() => {
    if (!vr.current)
      return Dr({ staticCssVars: lr(Or2, Sr2), ...Ar(Lr2, rr2) });
    vr.current = false;
  }, [Or2, Ar, Sr2, Lr2, rr2]), reactExports.useEffect(() => {
    if (!Br.current && _2)
      return Er();
    Br.current = false;
  }, [_2, Er]);
  const { shouldRender: kr, reason: Fr } = function({ items: r2, itemShapes: e2 }) {
    const t2 = { shouldRender: true, reason: "" };
    if ("number" != typeof r2 || r2 < 1 || r2 > 10)
      return mr(t2, "items is invalid");
    if (!e2)
      return mr(t2, "itemStyles needs at least the property itemShapes set");
    if (!Array.isArray(e2) && !reactExports.isValidElement(e2))
      return mr(t2, pr);
    if (Array.isArray(e2)) {
      if (e2.length !== r2)
        return mr(t2, "itemShapes length mismatch");
      if (!e2.every((r3) => reactExports.isValidElement(r3)))
        return mr(t2, pr);
    }
    return t2;
  }({ items: o2, itemShapes: yr2 });
  if (!kr)
    return console.error(Fr), null;
  function Tr(r2, e2, t2 = () => {
  }) {
    xr.current.some((e3) => e3 === r2.relatedTarget) ? t2() : e2();
  }
  function Ur() {
    L2(0), Er();
  }
  function Wr(r2) {
    Tr(r2, () => {
      Ur();
    }), Dr({ ...wr, ...Ar(Lr2, rr2) });
  }
  function Pr(r2) {
    Tr(r2, () => {
      Ur(), b2();
    });
  }
  function Gr(r2, e2) {
    const t2 = !N2 && e2 === Z2.length ? 0 : e2 + 1;
    Tr(r2, () => {
      g2(), L2(t2);
    }, () => {
      L2(t2);
    });
  }
  function Kr(r2) {
    $r(fr(hr2, r2, !N2)), xr.current[r2].focus();
  }
  const Xr = ar({ className: tr2, radius: C2, readOnly: l2, isDisabled: E2, isDynamic: _2, transition: w2, orientation: B2, absoluteBoxBorderWidth: Sr2, absoluteStrokeWidth: br2, spaceBetween: I2, spaceInside: x2 });
  function Zr(r2) {
    return { ref: (e2) => xr.current[r2] = e2 };
  }
  function Hr(r2) {
    return { tabIndex: Nr[r2], onKeyDown: (e2) => function(r3, e3) {
      let t2 = 0;
      const n3 = N2 ? Z2.length - 1 : Z2.length, o3 = e3 - 1, i2 = e3 + 1, a2 = !N2 && e3 === Z2.length, s2 = 0 === e3 ? n3 : o3, c2 = n3 === e3 ? 0 : i2;
      switch (r3.code) {
        case "Shift":
        case "Tab":
          return true;
        case "ArrowDown":
        case "ArrowRight":
          return t2 = Cr.current ? s2 : c2, Kr(t2);
        case "ArrowUp":
        case "ArrowLeft":
          return t2 = Cr.current ? c2 : s2, Kr(t2);
        case "Enter":
        case "Space":
          return "all" !== R2 && "click" !== R2 || r3.preventDefault(), m2(a2 ? 0 : e3 + 1);
      }
      r3.stopPropagation();
    }(e2, r2) };
  }
  function Vr(r2) {
    return { onClick: (e2) => function(r3, e3) {
      "all" !== R2 && "keydown" !== R2 || r3.preventDefault(), r3.stopPropagation(), m2(N2 || Lr2 !== e3 ? e3 + 1 : 0);
    }(e2, r2), onMouseEnter: () => function(r3) {
      L2(r3 + 1), Dr({ ...wr, ...Ar(r3, true) });
    }(r2), onMouseLeave: Wr };
  }
  function jr(r2) {
    if (l2)
      return {};
    const e2 = {};
    if (Array.isArray(F2))
      e2["aria-labelledby"] = F2[r2];
    else {
      const t2 = Array.isArray(T2) ? T2 : Z2.map((r3, e3) => `Rate ${e3 + 1}`);
      e2["aria-label"] = t2[r2];
    }
    return E2 && (e2["aria-disabled"] = "true"), { role: "radio", "aria-checked": r2 + 1 === Y2, ...e2 };
  }
  function Yr(r2) {
    const e2 = { itemShapes: Array.isArray(yr2) ? yr2[r2] : yr2, itemStrokeWidth: br2, orientation: B2, hasHF: false, testId: {} };
    return ir2 && nr2 === z && (e2.hasHF = r2 === Lr2), e2;
  }
  return jsxRuntimeExports.jsx("div", { id: P2, className: Xr, style: { ...K2, ...wr.staticCssVars }, ref: function(r2) {
    _2 && !N2 && (Ir.current = r2), X2 && (X2.current = r2);
  }, ...function() {
    if (!l2) {
      const r2 = N2 && !E2, e2 = { role: "radiogroup", "aria-required": r2 };
      return r2 && (e2["aria-invalid"] = Y2 <= 0), "string" == typeof k2 && k2.length > 0 ? e2["aria-labelledby"] = k2 : e2["aria-label"] = U2, e2;
    }
    return { role: "img", "aria-label": U2 };
  }(), ...y, children: Z2.map((t2, n3) => {
    return jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [jsxRuntimeExports.jsx("div", { className: `${S} ${wr.dynamicClassNames[n3]}`, style: wr.dynamicCssVars[n3], ...jr(n3), ...(i2 = n3, _2 ? { ...Zr(i2), ...Hr(i2), ...Vr(i2), onFocus: (r2) => Gr(r2, i2), onBlur: (r2) => Pr(r2) } : {}), children: jsxRuntimeExports.jsx(er, { ...Yr(n3) }) }), dr2 && n3 === Z2.length - 1 && jsxRuntimeExports.jsx("div", { ...(o3 = n3 + 1, { className: M, role: "radio", "aria-label": W2, "aria-checked": 0 === Y2, onClick: () => m2(0), onFocus: (r2) => {
      var _a;
      Gr(r2, o3), (_a = Ir.current) == null ? void 0 : _a.classList.add(A);
    }, onBlur: (r2) => {
      var _a;
      Pr(r2), (_a = Ir.current) == null ? void 0 : _a.classList.remove(A);
    }, ...Hr(o3), ...Zr(o3), ...E2 ? { "aria-disabled": "true" } : {} }) })] }, t2);
    var o3, i2;
  }) });
});
Mr.displayName = "Rating";
const ReviewCard = ({ comment }) => {
  var _a, _b, _c;
  const CustomStar = /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" });
  const myStyles = {
    itemShapes: CustomStar,
    itemStrokeWidth: 2,
    activeFillColor: "var(--bs-primary)",
    activeStrokeColor: "#99F6E4",
    inactiveFillColor: "var(--bs-gray-400)"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Mr,
      {
        className: "card-rating",
        itemStyles: myStyles,
        style: { maxWidth: 120 },
        readOnly: true,
        value: comment.rating
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-dark swiper-no-swiping", children: comment.body }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: " position-relative overflow-hidden rounded-circle flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { size: "sm", image_url: ((_a = comment == null ? void 0 : comment.reviewer) == null ? void 0 : _a.avatar) ?? "", initial_name: ((_b = comment == null ? void 0 : comment.reviewer) == null ? void 0 : _b.initial_name) ?? "UP" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "fs-3 mb-0 swiper-no-swiping ", children: ((_c = comment == null ? void 0 : comment.reviewer) == null ? void 0 : _c.full_name) ?? "Deleted User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fs-2 swiper-no-swiping", children: comment.review_on })
      ] })
    ] })
  ] }) }) });
};
const ReviewForm = ({ breeder_id }) => {
  const { data, setData, post, reset, errors } = Se({
    rating: 0,
    body: ""
  });
  const user = q$1().props.auth.user;
  const CustomStar = /* @__PURE__ */ jsxRuntimeExports.jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M11.0008 16.75L4.82881 19.995L6.00781 13.122L1.00781 8.25495L7.90781 7.25495L10.9938 1.00195L14.0798 7.25495L20.9798 8.25495L15.9798 13.122L17.1588 19.995L11.0008 16.75Z", stroke: "#08314E", strokeOpacity: "0.8", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" });
  const myStyles = {
    itemShapes: CustomStar,
    itemStrokeWidth: 1,
    activeFillColor: "var(--bs-primary)",
    activeStrokeColor: "",
    inactiveStrokeColor: "transparent",
    inactiveFillColor: ""
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/comment/${breeder_id}`, {
      preserveScroll: true,
      onSuccess: () => {
        reset();
      }
    });
  };
  return user ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border post-reviews", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-3 mb-3 pb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-user-circle.svg", alt: "urpuppy-img", className: "flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "fs-3 mb-0", children: "Post a review" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fs-2", children: "Your opinion matters" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "list-unstyled mb-3 pb-1 d-flex align-items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Mr,
        {
          itemStyles: myStyles,
          style: { maxWidth: 125 },
          onChange: (value) => setData("rating", value),
          value: data.rating
        }
      ) }),
      errors.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
        "  ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-danger", children: errors.rating }),
        " "
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: data.body,
          onChange: (e) => setData("body", e.target.value),
          className: "form-control",
          id: "exampleFormControlTextarea1",
          placeholder: "Write a review"
        }
      ) }),
      errors.body && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-danger", children: errors.body }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-primary d-inline-flex align-items-center gap-2", children: [
        "Submit a Review ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/images/svgs/icon-plus.svg",
            alt: "urpuppy-img"
          }
        )
      ] }) })
    ] })
  ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Click to login", href: `/login?redirect=back`, children: " Login " }),
    "to post a review"
  ] });
};
const BreederJsonLd = ({ breeder, url }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Company",
    name: breeder.seo_title,
    description: breeder.seo_description ?? "",
    image: breeder.company_logo,
    url
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(je, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "script",
    {
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
    }
  ) });
};
const ReviewSlider = ({ children, slidesPerView = 2 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "review-slider position-relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Swiper,
    {
      spaceBetween: 20,
      autoplay: { delay: 3e3, disableOnInteraction: false },
      loop: true,
      pagination: {
        clickable: true,
        el: "#review-bullets"
      },
      className: "owl-carousel",
      modules: [Pagination, Autoplay],
      slidesPerView,
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "owl-carousel owl-theme position-relative", children: U$1.Children.map(children, (child, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { className: "owl-item", children: child }, index)) })
    }
  ) });
};
const Show = ({ breeder, puppies, url }) => {
  var _a;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { url, title: breeder.seo_title ?? breeder.full_name, description: breeder.seo_description ?? "", image: breeder.company_logo ?? "/logo.svg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreederJsonLd, { breeder, url }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-wrapper position-relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "hero-section position-relative d-flex align-items-center pt-11 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container position-relative z-1 pt-lg-1 mt-lg-3 mb-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-xl-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "text-white text-center fs-11 mb-1",
          "data-aos": "fade-up",
          "data-aos-delay": "100",
          "data-aos-duration": "1000",
          children: breeder.full_name
        }
      ) }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "golden-retriever py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Back", href: "/breeders", className: "text-primary", children: "Back" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-8 col-xl-9", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-xl-7 mb-4 mb-md-5 mb-xl-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "breeders-detail-img position-relative overflow-hidden rounded-1 me-xl-4",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: (breeder == null ? void 0 : breeder.company_logo) ?? "", alt: "company-logo", className: "w-100 object-fit-cover" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-xl-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "top-picks-details", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "about-golden-paws-breeders mb-4 pb-4 border-bottom", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-3 fs-8", children: [
                    "About ",
                    breeder.company_name
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6", children: breeder.company_about })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "company-details", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-6 fs-8", children: "Company Details" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hstack gap-6 mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fw-medium text-dark", children: "Name:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: breeder.company_name })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hstack gap-6 mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fw-medium text-dark", children: "Address:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: breeder.company_address })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hstack gap-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fw-medium text-dark", children: "Years in Business:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: breeder.company_established_on_label })
                  ] })
                ] })
              ] }) })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "andrews-listings mb-xl-4", children: [
              puppies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex justify-content-between\n                                            align-items-center\n\n                                            ", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "fs-5  ", children: [
                  breeder.full_name,
                  " Listings"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { href: `/all-puppies/${breeder.slug}`, variant: "white", children: "See All Listings" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: puppies.length > 0 && puppies.map((puppy, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyCard, { className: "col-md-6 col-xl-4 mb-4 mt-4 mb-xl-0", puppy }, index)) })
            ] }),
            breeder.comments && breeder.comments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border andrews-reviews", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "mb-6 fs-5 mb-3 pb-1", children: [
                breeder.first_name,
                "'s reviews"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "andrews-reviews-sloder position-relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "owl-carousel owl-theme", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ReviewSlider,
                  {
                    children: (_a = breeder.comments) == null ? void 0 : _a.map((comment, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { comment }, index))
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "review-bullets", className: "text-center flex" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewForm, { breeder_id: breeder.id })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-lg-4 col-xl-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SellerCard, { seller: {
              slug: breeder.slug,
              full_name: breeder.full_name,
              is_breeder: breeder.is_breeder,
              email: breeder.email,
              avatar: breeder.avatar,
              phone: (breeder == null ? void 0 : breeder.phone) ?? "",
              address: breeder.address,
              member_since: breeder.member_since,
              social_x: breeder.social_x,
              social_tiktok: breeder.social_tiktok,
              social_ig: breeder.social_ig,
              social_fb: breeder.social_fb
            } }),
            breeder.video && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "fs-5 mb-3 pb-1", children: "Breeder’s Insight" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "breeders-insight position-relative rounded-1 overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { style: {
                  minHeight: "300px"
                }, className: "w-100 h-100 object-fit-cover", src: breeder.video_thumbnail ?? "" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(GenericModal, { buttonTitle: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "position-absolute top-50 start-50 translate-middle z-2 btn btn-primary p-2 d-flex align-items-center justify-content-center round-72 rounded-circle flex-shrink-0", "data-bs-toggle": "modal", "data-bs-target": "#exampleModal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-play.svg", alt: "icon-play" }) }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("video", { controls: true, className: "w-100 ", autoPlay: true, style: {
                  height: "auto",
                  maxHeight: "60vh",
                  objectFit: "contain"
                }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: breeder.video }) }) }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "fs-5 mb-3 pb-1", children: [
                breeder.first_name,
                "'s Gallery"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row gx-6", children: breeder.gallery && breeder.gallery.map((image, index) => {
                const isSingleRow = index % 2 === 0;
                return isSingleRow ? (
                  // Render col-12 for every third item
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gallery position-relative overflow-hidden rounded-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: image,
                      alt: `Gallery image ${index}`,
                      className: "object-fit-cover w-100 h-100"
                    }
                  ) }) }) }, `row-${index}`)
                ) : (
                  // Render col-6 for the rest
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-6 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gallery position-relative overflow-hidden rounded-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: image,
                        alt: `Gallery image ${index}`,
                        style: {
                          minHeight: "100px",
                          height: "100px"
                        },
                        className: "object-fit-cover w-100 "
                      }
                    ) }) }),
                    breeder.gallery[index + 1] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-6 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gallery position-relative overflow-hidden rounded-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: breeder.gallery[index + 1],
                        style: {
                          minHeight: "100px",
                          height: "100px"
                        },
                        alt: `Gallery image ${index + 1}`,
                        className: "object-fit-cover w-100 "
                      }
                    ) }) })
                  ] }, `row-${index}`)
                );
              }) })
            ] }) })
          ] })
        ] })
      ] }) })
    ] })
  ] });
};
export {
  Show as default
};

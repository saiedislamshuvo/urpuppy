import { g as getDefaultExportFromCjs, c as commonjsGlobal, r as reactExports, q, j as jsxRuntimeExports, J as Je } from "../ssr.js";
import { A as Avatar } from "./Avatar-Bsv7zAP7.js";
import { V as Vt } from "./index-DzrIk5T7.js";
var aos = { exports: {} };
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(commonjsGlobal, function() {
    return function(e) {
      function t(o) {
        if (n[o]) return n[o].exports;
        var i = n[o] = { exports: {}, id: o, loaded: false };
        return e[o].call(i.exports, i, i.exports, t), i.loaded = true, i.exports;
      }
      var n = {};
      return t.m = e, t.c = n, t.p = "dist/", t(0);
    }([function(e, t, n) {
      function o(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }
      var i = Object.assign || function(e2) {
        for (var t2 = 1; t2 < arguments.length; t2++) {
          var n2 = arguments[t2];
          for (var o2 in n2) Object.prototype.hasOwnProperty.call(n2, o2) && (e2[o2] = n2[o2]);
        }
        return e2;
      }, r = n(1), a = (o(r), n(6)), u = o(a), c = n(7), s = o(c), f = n(8), d = o(f), l = n(9), p = o(l), m = n(10), b = o(m), v = n(11), y = o(v), g = n(14), h = o(g), w = [], k = false, x = { offset: 120, delay: 0, easing: "ease", duration: 400, disable: false, once: false, startEvent: "DOMContentLoaded", throttleDelay: 99, debounceDelay: 50, disableMutationObserver: false }, j = function() {
        var e2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        if (e2 && (k = true), k) return w = (0, y.default)(w, x), (0, b.default)(w, x.once), w;
      }, O = function() {
        w = (0, h.default)(), j();
      }, M = function() {
        w.forEach(function(e2, t2) {
          e2.node.removeAttribute("data-aos"), e2.node.removeAttribute("data-aos-easing"), e2.node.removeAttribute("data-aos-duration"), e2.node.removeAttribute("data-aos-delay");
        });
      }, S = function(e2) {
        return e2 === true || "mobile" === e2 && p.default.mobile() || "phone" === e2 && p.default.phone() || "tablet" === e2 && p.default.tablet() || "function" == typeof e2 && e2() === true;
      }, _ = function(e2) {
        x = i(x, e2), w = (0, h.default)();
        var t2 = document.all && !window.atob;
        return S(x.disable) || t2 ? M() : (x.disableMutationObserver || d.default.isSupported() || (console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '), x.disableMutationObserver = true), document.querySelector("body").setAttribute("data-aos-easing", x.easing), document.querySelector("body").setAttribute("data-aos-duration", x.duration), document.querySelector("body").setAttribute("data-aos-delay", x.delay), "DOMContentLoaded" === x.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ? j(true) : "load" === x.startEvent ? window.addEventListener(x.startEvent, function() {
          j(true);
        }) : document.addEventListener(x.startEvent, function() {
          j(true);
        }), window.addEventListener("resize", (0, s.default)(j, x.debounceDelay, true)), window.addEventListener("orientationchange", (0, s.default)(j, x.debounceDelay, true)), window.addEventListener("scroll", (0, u.default)(function() {
          (0, b.default)(w, x.once);
        }, x.throttleDelay)), x.disableMutationObserver || d.default.ready("[data-aos]", O), w);
      };
      e.exports = { init: _, refresh: j, refreshHard: O };
    }, function(e, t) {
    }, , , , , function(e, t) {
      (function(t2) {
        function n(e2, t3, n2) {
          function o2(t4) {
            var n3 = b2, o3 = v2;
            return b2 = v2 = void 0, k2 = t4, g2 = e2.apply(o3, n3);
          }
          function r2(e3) {
            return k2 = e3, h2 = setTimeout(f2, t3), M ? o2(e3) : g2;
          }
          function a2(e3) {
            var n3 = e3 - w2, o3 = e3 - k2, i2 = t3 - n3;
            return S ? j(i2, y2 - o3) : i2;
          }
          function c2(e3) {
            var n3 = e3 - w2, o3 = e3 - k2;
            return void 0 === w2 || n3 >= t3 || n3 < 0 || S && o3 >= y2;
          }
          function f2() {
            var e3 = O();
            return c2(e3) ? d2(e3) : void (h2 = setTimeout(f2, a2(e3)));
          }
          function d2(e3) {
            return h2 = void 0, _ && b2 ? o2(e3) : (b2 = v2 = void 0, g2);
          }
          function l2() {
            void 0 !== h2 && clearTimeout(h2), k2 = 0, b2 = w2 = v2 = h2 = void 0;
          }
          function p2() {
            return void 0 === h2 ? g2 : d2(O());
          }
          function m2() {
            var e3 = O(), n3 = c2(e3);
            if (b2 = arguments, v2 = this, w2 = e3, n3) {
              if (void 0 === h2) return r2(w2);
              if (S) return h2 = setTimeout(f2, t3), o2(w2);
            }
            return void 0 === h2 && (h2 = setTimeout(f2, t3)), g2;
          }
          var b2, v2, y2, g2, h2, w2, k2 = 0, M = false, S = false, _ = true;
          if ("function" != typeof e2) throw new TypeError(s);
          return t3 = u(t3) || 0, i(n2) && (M = !!n2.leading, S = "maxWait" in n2, y2 = S ? x(u(n2.maxWait) || 0, t3) : y2, _ = "trailing" in n2 ? !!n2.trailing : _), m2.cancel = l2, m2.flush = p2, m2;
        }
        function o(e2, t3, o2) {
          var r2 = true, a2 = true;
          if ("function" != typeof e2) throw new TypeError(s);
          return i(o2) && (r2 = "leading" in o2 ? !!o2.leading : r2, a2 = "trailing" in o2 ? !!o2.trailing : a2), n(e2, t3, { leading: r2, maxWait: t3, trailing: a2 });
        }
        function i(e2) {
          var t3 = "undefined" == typeof e2 ? "undefined" : c(e2);
          return !!e2 && ("object" == t3 || "function" == t3);
        }
        function r(e2) {
          return !!e2 && "object" == ("undefined" == typeof e2 ? "undefined" : c(e2));
        }
        function a(e2) {
          return "symbol" == ("undefined" == typeof e2 ? "undefined" : c(e2)) || r(e2) && k.call(e2) == d;
        }
        function u(e2) {
          if ("number" == typeof e2) return e2;
          if (a(e2)) return f;
          if (i(e2)) {
            var t3 = "function" == typeof e2.valueOf ? e2.valueOf() : e2;
            e2 = i(t3) ? t3 + "" : t3;
          }
          if ("string" != typeof e2) return 0 === e2 ? e2 : +e2;
          e2 = e2.replace(l, "");
          var n2 = m.test(e2);
          return n2 || b.test(e2) ? v(e2.slice(2), n2 ? 2 : 8) : p.test(e2) ? f : +e2;
        }
        var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e2) {
          return typeof e2;
        } : function(e2) {
          return e2 && "function" == typeof Symbol && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
        }, s = "Expected a function", f = NaN, d = "[object Symbol]", l = /^\s+|\s+$/g, p = /^[-+]0x[0-9a-f]+$/i, m = /^0b[01]+$/i, b = /^0o[0-7]+$/i, v = parseInt, y = "object" == ("undefined" == typeof t2 ? "undefined" : c(t2)) && t2 && t2.Object === Object && t2, g = "object" == ("undefined" == typeof self ? "undefined" : c(self)) && self && self.Object === Object && self, h = y || g || Function("return this")(), w = Object.prototype, k = w.toString, x = Math.max, j = Math.min, O = function() {
          return h.Date.now();
        };
        e.exports = o;
      }).call(t, /* @__PURE__ */ function() {
        return this;
      }());
    }, function(e, t) {
      (function(t2) {
        function n(e2, t3, n2) {
          function i2(t4) {
            var n3 = b2, o2 = v2;
            return b2 = v2 = void 0, O = t4, g2 = e2.apply(o2, n3);
          }
          function r2(e3) {
            return O = e3, h2 = setTimeout(f2, t3), M ? i2(e3) : g2;
          }
          function u2(e3) {
            var n3 = e3 - w2, o2 = e3 - O, i3 = t3 - n3;
            return S ? x(i3, y2 - o2) : i3;
          }
          function s2(e3) {
            var n3 = e3 - w2, o2 = e3 - O;
            return void 0 === w2 || n3 >= t3 || n3 < 0 || S && o2 >= y2;
          }
          function f2() {
            var e3 = j();
            return s2(e3) ? d2(e3) : void (h2 = setTimeout(f2, u2(e3)));
          }
          function d2(e3) {
            return h2 = void 0, _ && b2 ? i2(e3) : (b2 = v2 = void 0, g2);
          }
          function l2() {
            void 0 !== h2 && clearTimeout(h2), O = 0, b2 = w2 = v2 = h2 = void 0;
          }
          function p2() {
            return void 0 === h2 ? g2 : d2(j());
          }
          function m2() {
            var e3 = j(), n3 = s2(e3);
            if (b2 = arguments, v2 = this, w2 = e3, n3) {
              if (void 0 === h2) return r2(w2);
              if (S) return h2 = setTimeout(f2, t3), i2(w2);
            }
            return void 0 === h2 && (h2 = setTimeout(f2, t3)), g2;
          }
          var b2, v2, y2, g2, h2, w2, O = 0, M = false, S = false, _ = true;
          if ("function" != typeof e2) throw new TypeError(c);
          return t3 = a(t3) || 0, o(n2) && (M = !!n2.leading, S = "maxWait" in n2, y2 = S ? k(a(n2.maxWait) || 0, t3) : y2, _ = "trailing" in n2 ? !!n2.trailing : _), m2.cancel = l2, m2.flush = p2, m2;
        }
        function o(e2) {
          var t3 = "undefined" == typeof e2 ? "undefined" : u(e2);
          return !!e2 && ("object" == t3 || "function" == t3);
        }
        function i(e2) {
          return !!e2 && "object" == ("undefined" == typeof e2 ? "undefined" : u(e2));
        }
        function r(e2) {
          return "symbol" == ("undefined" == typeof e2 ? "undefined" : u(e2)) || i(e2) && w.call(e2) == f;
        }
        function a(e2) {
          if ("number" == typeof e2) return e2;
          if (r(e2)) return s;
          if (o(e2)) {
            var t3 = "function" == typeof e2.valueOf ? e2.valueOf() : e2;
            e2 = o(t3) ? t3 + "" : t3;
          }
          if ("string" != typeof e2) return 0 === e2 ? e2 : +e2;
          e2 = e2.replace(d, "");
          var n2 = p.test(e2);
          return n2 || m.test(e2) ? b(e2.slice(2), n2 ? 2 : 8) : l.test(e2) ? s : +e2;
        }
        var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e2) {
          return typeof e2;
        } : function(e2) {
          return e2 && "function" == typeof Symbol && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
        }, c = "Expected a function", s = NaN, f = "[object Symbol]", d = /^\s+|\s+$/g, l = /^[-+]0x[0-9a-f]+$/i, p = /^0b[01]+$/i, m = /^0o[0-7]+$/i, b = parseInt, v = "object" == ("undefined" == typeof t2 ? "undefined" : u(t2)) && t2 && t2.Object === Object && t2, y = "object" == ("undefined" == typeof self ? "undefined" : u(self)) && self && self.Object === Object && self, g = v || y || Function("return this")(), h = Object.prototype, w = h.toString, k = Math.max, x = Math.min, j = function() {
          return g.Date.now();
        };
        e.exports = n;
      }).call(t, /* @__PURE__ */ function() {
        return this;
      }());
    }, function(e, t) {
      function n(e2) {
        var t2 = void 0, o2 = void 0;
        for (t2 = 0; t2 < e2.length; t2 += 1) {
          if (o2 = e2[t2], o2.dataset && o2.dataset.aos) return true;
          if (o2.children && n(o2.children)) return true;
        }
        return false;
      }
      function o() {
        return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      }
      function i() {
        return !!o();
      }
      function r(e2, t2) {
        var n2 = window.document, i2 = o(), r2 = new i2(a);
        u = t2, r2.observe(n2.documentElement, { childList: true, subtree: true, removedNodes: true });
      }
      function a(e2) {
        e2 && e2.forEach(function(e3) {
          var t2 = Array.prototype.slice.call(e3.addedNodes), o2 = Array.prototype.slice.call(e3.removedNodes), i2 = t2.concat(o2);
          if (n(i2)) return u();
        });
      }
      Object.defineProperty(t, "__esModule", { value: true });
      var u = function() {
      };
      t.default = { isSupported: i, ready: r };
    }, function(e, t) {
      function n(e2, t2) {
        if (!(e2 instanceof t2)) throw new TypeError("Cannot call a class as a function");
      }
      function o() {
        return navigator.userAgent || navigator.vendor || window.opera || "";
      }
      Object.defineProperty(t, "__esModule", { value: true });
      var i = /* @__PURE__ */ function() {
        function e2(e3, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var o2 = t2[n2];
            o2.enumerable = o2.enumerable || false, o2.configurable = true, "value" in o2 && (o2.writable = true), Object.defineProperty(e3, o2.key, o2);
          }
        }
        return function(t2, n2, o2) {
          return n2 && e2(t2.prototype, n2), o2 && e2(t2, o2), t2;
        };
      }(), r = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i, a = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i, u = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i, c = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i, s = function() {
        function e2() {
          n(this, e2);
        }
        return i(e2, [{ key: "phone", value: function() {
          var e3 = o();
          return !(!r.test(e3) && !a.test(e3.substr(0, 4)));
        } }, { key: "mobile", value: function() {
          var e3 = o();
          return !(!u.test(e3) && !c.test(e3.substr(0, 4)));
        } }, { key: "tablet", value: function() {
          return this.mobile() && !this.phone();
        } }]), e2;
      }();
      t.default = new s();
    }, function(e, t) {
      Object.defineProperty(t, "__esModule", { value: true });
      var n = function(e2, t2, n2) {
        var o2 = e2.node.getAttribute("data-aos-once");
        t2 > e2.position ? e2.node.classList.add("aos-animate") : "undefined" != typeof o2 && ("false" === o2 || !n2 && "true" !== o2) && e2.node.classList.remove("aos-animate");
      }, o = function(e2, t2) {
        var o2 = window.pageYOffset, i = window.innerHeight;
        e2.forEach(function(e3, r) {
          n(e3, i + o2, t2);
        });
      };
      t.default = o;
    }, function(e, t, n) {
      function o(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }
      Object.defineProperty(t, "__esModule", { value: true });
      var i = n(12), r = o(i), a = function(e2, t2) {
        return e2.forEach(function(e3, n2) {
          e3.node.classList.add("aos-init"), e3.position = (0, r.default)(e3.node, t2.offset);
        }), e2;
      };
      t.default = a;
    }, function(e, t, n) {
      function o(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }
      Object.defineProperty(t, "__esModule", { value: true });
      var i = n(13), r = o(i), a = function(e2, t2) {
        var n2 = 0, o2 = 0, i2 = window.innerHeight, a2 = { offset: e2.getAttribute("data-aos-offset"), anchor: e2.getAttribute("data-aos-anchor"), anchorPlacement: e2.getAttribute("data-aos-anchor-placement") };
        switch (a2.offset && !isNaN(a2.offset) && (o2 = parseInt(a2.offset)), a2.anchor && document.querySelectorAll(a2.anchor) && (e2 = document.querySelectorAll(a2.anchor)[0]), n2 = (0, r.default)(e2).top, a2.anchorPlacement) {
          case "top-bottom":
            break;
          case "center-bottom":
            n2 += e2.offsetHeight / 2;
            break;
          case "bottom-bottom":
            n2 += e2.offsetHeight;
            break;
          case "top-center":
            n2 += i2 / 2;
            break;
          case "bottom-center":
            n2 += i2 / 2 + e2.offsetHeight;
            break;
          case "center-center":
            n2 += i2 / 2 + e2.offsetHeight / 2;
            break;
          case "top-top":
            n2 += i2;
            break;
          case "bottom-top":
            n2 += e2.offsetHeight + i2;
            break;
          case "center-top":
            n2 += e2.offsetHeight / 2 + i2;
        }
        return a2.anchorPlacement || a2.offset || isNaN(t2) || (o2 = t2), n2 + o2;
      };
      t.default = a;
    }, function(e, t) {
      Object.defineProperty(t, "__esModule", { value: true });
      var n = function(e2) {
        for (var t2 = 0, n2 = 0; e2 && !isNaN(e2.offsetLeft) && !isNaN(e2.offsetTop); ) t2 += e2.offsetLeft - ("BODY" != e2.tagName ? e2.scrollLeft : 0), n2 += e2.offsetTop - ("BODY" != e2.tagName ? e2.scrollTop : 0), e2 = e2.offsetParent;
        return { top: n2, left: t2 };
      };
      t.default = n;
    }, function(e, t) {
      Object.defineProperty(t, "__esModule", { value: true });
      var n = function(e2) {
        return e2 = e2 || document.querySelectorAll("[data-aos]"), Array.prototype.map.call(e2, function(e3) {
          return { node: e3 };
        });
      };
      t.default = n;
    }]);
  });
})(aos);
var aosExports = aos.exports;
const AOS = /* @__PURE__ */ getDefaultExportFromCjs(aosExports);
const AOSInit = () => {
  reactExports.useEffect(() => {
    AOS.init({
      once: true
    });
  }, []);
  return null;
};
const Footer = () => {
  var _a, _b, _c, _d, _e;
  const { settings } = q().props;
  q().props.auth.user;
  const footerLogo = (settings == null ? void 0 : settings.footer_logo) || "/logo.svg";
  const column1 = {
    title: (settings == null ? void 0 : settings.footer_coloum1_title) || "Find Ur Puppy",
    links: ((_a = settings == null ? void 0 : settings.footer_coloum1) == null ? void 0 : _a.length) > 0 ? settings.footer_coloum1 : [
      { title: "View All Puppies", link: "/puppies" },
      { title: "View All Breeds", link: "/breeds" }
    ]
  };
  const column2 = {
    title: (settings == null ? void 0 : settings.footer_coloum2_title) || "Accounts",
    links: ((_b = settings == null ? void 0 : settings.footer_coloum2) == null ? void 0 : _b.length) > 0 ? settings.footer_coloum2 : [
      { title: "Buyer Register", link: "/register" },
      { title: "Seller Register", link: "/register-seller" },
      { title: "Breeder Register", link: "/register-breeder" }
    ]
  };
  const column3 = {
    title: (settings == null ? void 0 : settings.footer_coloum3_title) || "About urpuppy",
    links: ((_c = settings == null ? void 0 : settings.footer_coloum3) == null ? void 0 : _c.length) > 0 ? settings.footer_coloum3 : [
      { title: "Blog", link: "/posts" },
      { title: "About Us", link: "/about-us" },
      { title: "Contact Us", link: "/contact-us" }
    ]
  };
  const column4 = {
    title: (settings == null ? void 0 : settings.footer_coloum4_title) || "Other",
    links: ((_d = settings == null ? void 0 : settings.footer_coloum4) == null ? void 0 : _d.length) > 0 ? settings.footer_coloum4 : [
      { title: "Privacy Policy", link: "/privacy-policy" },
      { title: "Terms of Use", link: "/terms-of-use" }
    ]
  };
  const socialMedia = ((_e = settings == null ? void 0 : settings.footer_social_media) == null ? void 0 : _e.length) > 0 ? settings.footer_social_media : [
    { icon: "fa-twitter", link: "https://x.com/UrpuppyDotCom" },
    { icon: "fa-facebook", link: "https://www.facebook.com/UrPuppyLLC" },
    { icon: "fa-instagram", link: "https://www.instagram.com/urpupppydotcom" }
  ];
  const socialIconMap = {
    "fa-twitter": "/images/svgs/icon-twitter.svg",
    "fa-facebook": "/images/svgs/icon-facebook.svg",
    "fa-instagram": "/images/svgs/icon-instagram.svg"
  };
  const copyrightText = (settings == null ? void 0 : settings.footer_copyright_text) || "©2025 Urpuppy.com, LLC. All Rights Reserved";
  const renderColumn = (column, colClass) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: colClass, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fw-semibold font-work-sans mb-6 text-white", children: column.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-unstyled footer-memu mb-0 mt-2", children: column.links.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: index < column.links.length - 1 ? "mb-6" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": item.title, href: item.link, className: "fs-3 d-block fw-normal", children: item.title }) }, index)) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "footer bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "footer-wrapper pt-7 pt-md-9 pt-lg-10 pb-md-5 pb-lg-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "footer-logo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "urpuppy", href: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: footerLogo, alt: "urpuppy-img" }) }) }) }),
      renderColumn(column1, "col-6 col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0 ps-lg-7"),
      renderColumn(column2, "col-6 col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0"),
      renderColumn(column3, "col-6 col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0"),
      renderColumn(column4, "col-6 col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0"),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fw-semibold font-work-sans mb-6 text-white", children: "Socials" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-unstyled d-flex align-items-center gap-6 social-icon mb-0 mt-2", children: socialMedia.map((social, index) => {
          var _a2, _b2, _c2, _d2, _e2;
          const iconSrc = ((_a2 = social.icon) == null ? void 0 : _a2.startsWith("/")) || ((_b2 = social.icon) == null ? void 0 : _b2.startsWith("http")) ? social.icon : socialIconMap[social.icon] || `/images/svgs/icon-${((_c2 = social.icon) == null ? void 0 : _c2.replace("fa-", "")) || "default"}.svg`;
          const isFontAwesome = ((_d2 = social.icon) == null ? void 0 : _d2.startsWith("fa-")) && !socialIconMap[social.icon];
          return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              rel: "nofollow",
              href: social.link,
              target: ((_e2 = social.link) == null ? void 0 : _e2.startsWith("http")) ? "_blank" : void 0,
              "data-bs-toggle": "tooltip",
              "data-bs-title": social.title || social.icon,
              className: "bg-white bg-opacity-10 d-flex align-items-center justify-content-center round-40 rounded-circle",
              children: isFontAwesome ? /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: social.icon }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: iconSrc, alt: social.title || social.icon })
            }
          ) }, index);
        }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-top   border-white border-opacity-10 py-3 d-md-flex align-items-center justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "d-flex align-items-center gap-2  mb-md-0 text-white fw-normal  opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: copyrightText }) }) })
  ] }) });
};
function ApplicationLogo(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { prefetch: true, "aria-label": "urpuppy", className: "navbar-brand py-0 me-0", href: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "165", height: "32", viewBox: "0 0 165 32", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21.4147 16.4564C21.5789 16.6023 21.7391 16.7519 21.8987 16.9028C21.9465 16.9478 21.9943 16.9929 22.0436 17.0394C24.0109 18.9372 25.3785 21.7523 25.4465 24.4851C25.4495 25.3008 25.2927 26.0629 24.7899 26.7228C24.7584 26.7695 24.7269 26.8163 24.6945 26.8644C23.9683 27.6225 22.9482 27.8131 21.9371 27.8507C20.8328 27.8799 19.7351 27.6643 18.6528 27.4748C18.4365 27.4374 18.2202 27.4003 18.0039 27.3632C17.8708 27.3403 17.7377 27.3173 17.6046 27.294C16.042 27.0227 14.6257 27.2381 13.0808 27.5096C9.13959 28.2 9.13959 28.2 7.76961 27.2624C7.05839 26.7405 6.72939 26.0437 6.59503 25.1897C6.35308 22.7368 7.44217 20.1714 8.91521 18.2517C8.95086 18.2049 8.98651 18.1582 9.02325 18.11C9.30401 17.7528 9.61276 17.4214 9.92727 17.0933C9.9977 17.0196 10.0673 16.9452 10.1369 16.8707C13.2425 13.6473 18.0896 13.5562 21.4147 16.4564Z", fill: "#E88325" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22.3092 4.8803C23.4356 5.9274 23.8585 7.43207 23.917 8.91732C23.9436 10.4169 23.5095 11.9633 22.4527 13.0714C21.8458 13.679 21.0831 14.0482 20.2177 14.06C19.3262 14.055 18.5512 13.6852 17.9163 13.0719C17.2905 12.3794 16.8945 11.5937 16.6616 10.6979C16.6441 10.6347 16.6267 10.5716 16.6087 10.5065C16.2646 9.03781 16.4412 7.24299 17.2239 5.92718C17.8079 5.04547 18.4891 4.34249 19.5503 4.07454C20.5896 3.87325 21.5215 4.20833 22.3092 4.8803Z", fill: "#E88325" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M14.101 5.0089C15.2613 6.21311 15.555 7.8366 15.5332 9.44215C15.4893 10.8381 14.9664 12.2576 13.9339 13.2338C13.2278 13.8451 12.4084 14.0947 11.4822 14.0529C10.6338 13.9798 9.90299 13.4665 9.35154 12.8561C8.31135 11.589 7.9817 9.87787 8.13772 8.28252C8.26932 7.12149 8.66228 6.01611 9.46064 5.14041C9.49686 5.09896 9.53307 5.05751 9.57038 5.0148C10.0158 4.53596 10.6139 4.19125 11.2609 4.06129C11.3162 4.04898 11.3162 4.04898 11.3727 4.03642C12.4096 3.8626 13.3578 4.33132 14.101 5.0089Z", fill: "#E88325" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M28.7586 11.8107C29.4381 12.3337 29.8563 13.0925 29.9724 13.9353C30.0263 14.6264 30.0156 15.3197 29.8087 15.9856C29.7902 16.0478 29.7716 16.1101 29.7525 16.1742C29.5208 16.881 29.1368 17.4577 28.6086 17.982C28.5712 18.0202 28.5338 18.0585 28.4952 18.0979C27.9264 18.6418 27.16 18.941 26.3719 18.9532C25.6249 18.9197 24.9791 18.6196 24.4726 18.0751C23.776 17.2147 23.6041 16.1832 23.7108 15.1105C23.8737 13.898 24.4156 12.8133 25.3742 12.0346C25.6362 11.8472 25.9097 11.6845 26.2083 11.5612C26.2452 11.545 26.2821 11.5289 26.3201 11.5123C27.118 11.2179 28.0642 11.3472 28.7586 11.8107Z", fill: "#E88325" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6.27972 11.7871C7.39137 12.5382 8.01036 13.5953 8.27429 14.8862C8.42053 15.8829 8.33004 16.9009 7.76968 17.7661C7.28323 18.3945 6.72594 18.8098 5.92513 18.9194C5.12903 19.0106 4.40295 18.7814 3.76052 18.3094C3.29899 17.9326 2.9331 17.5279 2.64177 17.0107C2.6173 16.9688 2.59282 16.927 2.56761 16.8838C2.41728 16.6094 2.31402 16.326 2.21899 16.0294C2.20748 15.9935 2.19597 15.9576 2.18412 15.9206C1.87143 14.9 1.96448 13.7486 2.40651 12.7853C2.76168 12.1295 3.30768 11.6537 4.02923 11.4368C4.81433 11.2854 5.58949 11.3776 6.27972 11.7871Z", fill: "#E88325" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M47.37 22.1041C46.1881 22.1041 45.1328 21.9019 44.2042 21.4976C43.2924 21.077 42.5242 20.5029 41.8995 19.775C41.2748 19.031 40.802 18.19 40.4812 17.2519C40.1604 16.2976 40 15.2867 40 14.2192V6.47993C40 6.20497 40.0253 5.96236 40.076 5.7521C40.1435 5.52566 40.2786 5.34774 40.4812 5.21835C40.7007 5.07278 41.0553 5 41.5449 5C42.0346 5 42.3807 5.07278 42.5833 5.21835C42.8028 5.34774 42.9379 5.52566 42.9885 5.7521C43.0561 5.96236 43.0898 6.21306 43.0898 6.50419V14.2192C43.0898 15.1088 43.2418 15.9337 43.5457 16.6939C43.8665 17.4379 44.3477 18.0363 44.9893 18.4892C45.6309 18.9421 46.4498 19.1685 47.446 19.1685C48.3409 19.1685 49.1091 18.9663 49.7507 18.562C50.3923 18.1576 50.882 17.5834 51.2196 16.8394C51.5742 16.0954 51.7515 15.2139 51.7515 14.195V6.35862C51.7515 6.09984 51.7768 5.8734 51.8275 5.67931C51.895 5.48522 52.0385 5.32348 52.258 5.19409C52.4775 5.0647 52.8236 5 53.2964 5C53.7861 5 54.1322 5.07278 54.3348 5.21835C54.5543 5.34774 54.6894 5.52566 54.74 5.7521C54.7907 5.97853 54.816 6.22923 54.816 6.50419V14.2678C54.816 15.3352 54.6556 16.3461 54.3348 17.3004C54.014 18.2385 53.5328 19.0715 52.8912 19.7993C52.2496 20.511 51.4645 21.077 50.5358 21.4976C49.6241 21.9019 48.5688 22.1041 47.37 22.1041Z", fill: "white" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M58.594 21.9828C58.1381 21.9828 57.8004 21.91 57.5809 21.7644C57.3783 21.6351 57.2517 21.4571 57.201 21.2307C57.1504 21.0043 57.1251 20.7536 57.1251 20.4786V11.4777C57.1251 11.1866 57.1504 10.9359 57.201 10.7256C57.2517 10.4992 57.3783 10.3294 57.5809 10.2161C57.8004 10.0868 58.1466 10.0221 58.6193 10.0221C59.0752 10.0221 59.4045 10.0787 59.6071 10.1919C59.8266 10.3051 59.9616 10.4507 60.0123 10.6286C60.0798 10.7903 60.1136 10.9521 60.1136 11.1138L59.911 11.5505C59.9954 11.4211 60.1136 11.2675 60.2656 11.0895C60.4175 10.8955 60.6201 10.7095 60.8734 10.5315C61.1267 10.3375 61.4306 10.1838 61.7851 10.0706C62.1397 9.94119 62.5618 9.87649 63.0515 9.87649C63.2541 9.87649 63.4651 9.90075 63.6846 9.94927C63.921 9.98162 64.1489 10.0382 64.3684 10.1191C64.6048 10.1838 64.8159 10.2728 65.0016 10.386C65.1873 10.4992 65.3309 10.6367 65.4322 10.7984C65.5335 10.944 65.5841 11.1138 65.5841 11.3079C65.5841 11.8255 65.449 12.2622 65.1789 12.618C64.9087 12.9738 64.5879 13.1517 64.2165 13.1517C63.9632 13.1517 63.7775 13.1275 63.6593 13.079C63.5411 13.0304 63.4398 12.9738 63.3554 12.9091C63.2878 12.8444 63.1781 12.7878 63.0261 12.7393C62.8911 12.6908 62.6716 12.6665 62.3677 12.6665C62.1144 12.6665 61.8527 12.707 61.5825 12.7878C61.3293 12.8687 61.0929 12.99 60.8734 13.1517C60.6539 13.3135 60.4766 13.5237 60.3415 13.7825C60.2065 14.0251 60.1389 14.3082 60.1389 14.6317V20.5271C60.1389 20.8021 60.1136 21.0528 60.0629 21.2792C60.0123 21.4895 59.8772 21.6593 59.6577 21.7887C59.4382 21.9181 59.0836 21.9828 58.594 21.9828Z", fill: "white" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M73.5123 21.813C72.685 21.813 71.9421 21.6674 71.2836 21.3763C70.642 21.069 70.0932 20.6484 69.6373 20.1147C69.1984 19.5648 68.8607 18.934 68.6243 18.2223C68.4048 17.5107 68.295 16.7424 68.295 15.9175C68.3119 15.0926 68.4386 14.3244 68.6749 13.6127C68.9113 12.8849 69.249 12.2541 69.688 11.7203C70.1439 11.1866 70.6926 10.7661 71.3342 10.4588C71.9758 10.1514 72.7019 9.99779 73.5123 9.99779C74.289 9.99779 75.015 10.1514 75.6904 10.4588C76.3826 10.7661 76.9905 11.1947 77.5139 11.7446C78.0542 12.2945 78.4763 12.9334 78.7802 13.6612C79.0841 14.3729 79.2361 15.1412 79.2361 15.966C79.2361 16.8071 79.0841 17.5834 78.7802 18.2951C78.4763 19.0068 78.0626 19.6295 77.5392 20.1632C77.0158 20.6808 76.408 21.0851 75.7157 21.3763C75.0234 21.6674 74.289 21.813 73.5123 21.813ZM68.447 26.8593C67.9911 26.8593 67.6534 26.7946 67.4339 26.6652C67.2144 26.5358 67.0794 26.366 67.0287 26.1557C66.9781 25.9454 66.9527 25.7028 66.9527 25.4279V11.4777C66.9527 11.2028 66.9781 10.9602 67.0287 10.7499C67.0794 10.5396 67.206 10.3698 67.4086 10.2404C67.6281 10.0948 67.9658 10.0221 68.4217 10.0221C68.8607 10.0221 69.2068 10.0868 69.4601 10.2161C69.7133 10.3455 69.8822 10.5639 69.9666 10.8712V25.4036C69.9835 25.6786 69.9581 25.9212 69.8906 26.1315C69.84 26.3579 69.7049 26.5358 69.4854 26.6652C69.2659 26.7946 68.9198 26.8593 68.447 26.8593ZM73.1071 19.0957C73.698 19.0957 74.2299 18.9663 74.7026 18.7075C75.1754 18.4326 75.5469 18.0606 75.817 17.5915C76.104 17.1063 76.2476 16.5645 76.2476 15.966C76.2476 15.3514 76.104 14.8096 75.817 14.3405C75.5469 13.8715 75.1754 13.5076 74.7026 13.2488C74.2299 12.9738 73.698 12.8363 73.1071 12.8363C72.533 12.8363 72.0096 12.9738 71.5368 13.2488C71.0641 13.5237 70.6842 13.8958 70.3971 14.3648C70.127 14.8177 69.9919 15.3514 69.9919 15.966C69.9919 16.5645 70.127 17.1063 70.3971 17.5915C70.6842 18.0606 71.0641 18.4326 71.5368 18.7075C72.0096 18.9663 72.533 19.0957 73.1071 19.0957Z", fill: "white" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M86.0357 21.9585C85.259 21.9585 84.5414 21.8291 83.8829 21.5704C83.2413 21.2954 82.6757 20.9072 82.186 20.4058C81.6964 19.9044 81.3165 19.306 81.0463 18.6105C80.7762 17.915 80.6411 17.1467 80.6411 16.3057V11.4777C80.6411 11.2028 80.6664 10.9602 80.7171 10.7499C80.7677 10.5235 80.9028 10.3455 81.1223 10.2161C81.3418 10.0868 81.6795 10.0221 82.1354 10.0221C82.625 10.0221 82.9712 10.0868 83.1738 10.2161C83.3933 10.3455 83.5283 10.5235 83.579 10.7499C83.6296 10.9763 83.655 11.227 83.655 11.502V16.3057C83.655 16.888 83.7563 17.3894 83.9589 17.8099C84.1784 18.2304 84.4907 18.562 84.896 18.8046C85.3012 19.031 85.7993 19.1442 86.3902 19.1442C86.9981 19.1442 87.513 19.031 87.9351 18.8046C88.3741 18.562 88.7118 18.2304 88.9482 17.8099C89.1846 17.3732 89.3028 16.8718 89.3028 16.3057V11.4535C89.3028 11.1785 89.3281 10.9359 89.3788 10.7256C89.4294 10.4992 89.5645 10.3294 89.784 10.2161C90.0035 10.0868 90.3496 10.0221 90.8224 10.0221C91.2951 10.0221 91.6328 10.0868 91.8354 10.2161C92.038 10.3455 92.1647 10.5235 92.2153 10.7499C92.2829 10.9763 92.3166 11.2189 92.3166 11.4777V20.5757C92.3166 20.8183 92.2829 21.0447 92.2153 21.255C92.1647 21.4652 92.0296 21.6351 91.8101 21.7644C91.6075 21.8938 91.2698 21.9585 90.797 21.9585C90.4594 21.9585 90.1892 21.9181 89.9866 21.8372C89.8009 21.7725 89.6573 21.6836 89.556 21.5704C89.4716 21.441 89.4125 21.3116 89.3788 21.1822C89.3619 21.0528 89.3534 20.9234 89.3534 20.794L89.556 20.139C89.4547 20.2845 89.3028 20.4624 89.1002 20.6727C88.8976 20.8668 88.6443 21.069 88.3404 21.2792C88.0533 21.4733 87.7156 21.6351 87.3273 21.7644C86.939 21.8938 86.5084 21.9585 86.0357 21.9585Z", fill: "white" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M100.719 21.813C99.8922 21.813 99.1492 21.6674 98.4908 21.3763C97.8492 21.069 97.3004 20.6484 96.8445 20.1147C96.4055 19.5648 96.0679 18.934 95.8315 18.2223C95.612 17.5107 95.5022 16.7424 95.5022 15.9175C95.5191 15.0926 95.6457 14.3244 95.8821 13.6127C96.1185 12.8849 96.4562 12.2541 96.8952 11.7203C97.3511 11.1866 97.8998 10.7661 98.5414 10.4588C99.183 10.1514 99.909 9.99779 100.719 9.99779C101.496 9.99779 102.222 10.1514 102.898 10.4588C103.59 10.7661 104.198 11.1947 104.721 11.7446C105.261 12.2945 105.683 12.9334 105.987 13.6612C106.291 14.3729 106.443 15.1412 106.443 15.966C106.443 16.8071 106.291 17.5834 105.987 18.2951C105.683 19.0068 105.27 19.6295 104.746 20.1632C104.223 20.6808 103.615 21.0851 102.923 21.3763C102.231 21.6674 101.496 21.813 100.719 21.813ZM95.6542 26.8593C95.1983 26.8593 94.8606 26.7946 94.6411 26.6652C94.4216 26.5358 94.2866 26.366 94.2359 26.1557C94.1853 25.9454 94.1599 25.7028 94.1599 25.4279V11.4777C94.1599 11.2028 94.1853 10.9602 94.2359 10.7499C94.2866 10.5396 94.4132 10.3698 94.6158 10.2404C94.8353 10.0948 95.173 10.0221 95.6289 10.0221C96.0679 10.0221 96.414 10.0868 96.6672 10.2161C96.9205 10.3455 97.0894 10.5639 97.1738 10.8712V25.4036C97.1907 25.6786 97.1653 25.9212 97.0978 26.1315C97.0471 26.3579 96.9121 26.5358 96.6926 26.6652C96.4731 26.7946 96.1269 26.8593 95.6542 26.8593ZM100.314 19.0957C100.905 19.0957 101.437 18.9663 101.91 18.7075C102.383 18.4326 102.754 18.0606 103.024 17.5915C103.311 17.1063 103.455 16.5645 103.455 15.966C103.455 15.3514 103.311 14.8096 103.024 14.3405C102.754 13.8715 102.383 13.5076 101.91 13.2488C101.437 12.9738 100.905 12.8363 100.314 12.8363C99.7402 12.8363 99.2168 12.9738 98.744 13.2488C98.2713 13.5237 97.8914 13.8958 97.6043 14.3648C97.3342 14.8177 97.1991 15.3514 97.1991 15.966C97.1991 16.5645 97.3342 17.1063 97.6043 17.5915C97.8914 18.0606 98.2713 18.4326 98.744 18.7075C99.2168 18.9663 99.7402 19.0957 100.314 19.0957Z", fill: "white" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M114.484 21.813C113.657 21.813 112.914 21.6674 112.255 21.3763C111.614 21.069 111.065 20.6484 110.609 20.1147C110.17 19.5648 109.832 18.934 109.596 18.2223C109.376 17.5107 109.267 16.7424 109.267 15.9175C109.283 15.0926 109.41 14.3244 109.646 13.6127C109.883 12.8849 110.221 12.2541 110.66 11.7203C111.115 11.1866 111.664 10.7661 112.306 10.4588C112.947 10.1514 113.673 9.99779 114.484 9.99779C115.261 9.99779 115.987 10.1514 116.662 10.4588C117.354 10.7661 117.962 11.1947 118.485 11.7446C119.026 12.2945 119.448 12.9334 119.752 13.6612C120.056 14.3729 120.208 15.1412 120.208 15.966C120.208 16.8071 120.056 17.5834 119.752 18.2951C119.448 19.0068 119.034 19.6295 118.511 20.1632C117.987 20.6808 117.38 21.0851 116.687 21.3763C115.995 21.6674 115.261 21.813 114.484 21.813ZM109.419 26.8593C108.963 26.8593 108.625 26.7946 108.405 26.6652C108.186 26.5358 108.051 26.366 108 26.1557C107.95 25.9454 107.924 25.7028 107.924 25.4279V11.4777C107.924 11.2028 107.95 10.9602 108 10.7499C108.051 10.5396 108.178 10.3698 108.38 10.2404C108.6 10.0948 108.937 10.0221 109.393 10.0221C109.832 10.0221 110.178 10.0868 110.432 10.2161C110.685 10.3455 110.854 10.5639 110.938 10.8712V25.4036C110.955 25.6786 110.93 25.9212 110.862 26.1315C110.812 26.3579 110.676 26.5358 110.457 26.6652C110.237 26.7946 109.891 26.8593 109.419 26.8593ZM114.079 19.0957C114.67 19.0957 115.201 18.9663 115.674 18.7075C116.147 18.4326 116.518 18.0606 116.789 17.5915C117.076 17.1063 117.219 16.5645 117.219 15.966C117.219 15.3514 117.076 14.8096 116.789 14.3405C116.518 13.8715 116.147 13.5076 115.674 13.2488C115.201 12.9738 114.67 12.8363 114.079 12.8363C113.505 12.8363 112.981 12.9738 112.508 13.2488C112.036 13.5237 111.656 13.8958 111.369 14.3648C111.099 14.8177 110.963 15.3514 110.963 15.966C110.963 16.5645 111.099 17.1063 111.369 17.5915C111.656 18.0606 112.036 18.4326 112.508 18.7075C112.981 18.9663 113.505 19.0957 114.079 19.0957Z", fill: "white" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M124.214 26.7622C123.674 26.5358 123.362 26.277 123.277 25.9859C123.193 25.7109 123.269 25.3389 123.505 24.8699L130.039 10.8469C130.276 10.3294 130.529 10.0221 130.799 9.92501C131.069 9.81179 131.483 9.8684 132.04 10.0948C132.564 10.3213 132.868 10.572 132.952 10.8469C133.053 11.1219 132.994 11.4939 132.775 11.9629L126.19 26.0587C125.97 26.5762 125.726 26.8755 125.455 26.9563C125.185 27.0534 124.772 26.9887 124.214 26.7622ZM126.57 20.8183L120.719 12.2056C120.415 11.7689 120.289 11.4049 120.339 11.1138C120.407 10.8227 120.677 10.5396 121.15 10.2647C121.673 9.95736 122.078 9.83605 122.366 9.90075C122.669 9.96545 122.973 10.2242 123.277 10.6771L127.912 17.5915L126.57 20.8183Z", fill: "white" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M135.059 22.9051C134.669 22.9051 134.395 22.8314 134.237 22.6838C134.079 22.5257 134 22.2516 134 21.8617C134 21.5876 134.032 21.3768 134.095 21.2292C134.169 21.0711 134.285 20.9552 134.443 20.8814C134.601 20.8076 134.812 20.7708 135.075 20.7708C135.465 20.7708 135.739 20.8498 135.897 21.0079C136.055 21.166 136.134 21.4453 136.134 21.8458C136.134 22.1094 136.097 22.3202 136.024 22.4783C135.96 22.6364 135.85 22.747 135.692 22.8103C135.544 22.8735 135.333 22.9051 135.059 22.9051Z", fill: "white" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M140.852 22.9368C140.346 22.9368 139.85 22.8524 139.365 22.6838C138.891 22.5046 138.459 22.2464 138.069 21.9091C137.689 21.5718 137.384 21.1607 137.152 20.6759C136.931 20.1805 136.82 19.6219 136.82 19C136.82 18.3781 136.931 17.8248 137.152 17.3399C137.384 16.8551 137.689 16.444 138.069 16.1067C138.448 15.7694 138.875 15.5112 139.35 15.332C139.824 15.1528 140.314 15.0632 140.82 15.0632C141.189 15.0632 141.537 15.1159 141.863 15.2213C142.201 15.3267 142.491 15.4532 142.733 15.6008C142.975 15.7484 143.149 15.8959 143.255 16.0435C143.392 16.17 143.508 16.2912 143.603 16.4071C143.697 16.5231 143.729 16.6653 143.697 16.834C143.666 16.9394 143.618 17.0395 143.555 17.1344C143.492 17.2187 143.413 17.3083 143.318 17.4032C143.065 17.6877 142.817 17.7931 142.575 17.7194C142.438 17.6456 142.301 17.5665 142.164 17.4822C142.027 17.3979 141.884 17.3188 141.737 17.2451C141.6 17.1607 141.458 17.0922 141.31 17.0395C141.162 16.9868 140.999 16.9605 140.82 16.9605C140.419 16.9605 140.061 17.0501 139.745 17.2292C139.439 17.3979 139.197 17.635 139.018 17.9407C138.849 18.2464 138.765 18.5995 138.765 19C138.765 19.4005 138.849 19.7589 139.018 20.0751C139.197 20.3808 139.439 20.6232 139.745 20.8024C140.05 20.971 140.398 21.0553 140.788 21.0553C140.978 21.0553 141.157 21.0343 141.326 20.9921C141.505 20.9394 141.663 20.8762 141.8 20.8024C141.937 20.7181 142.048 20.6337 142.132 20.5494C142.248 20.4756 142.354 20.4071 142.448 20.3439C142.543 20.2806 142.643 20.249 142.749 20.249C142.875 20.249 142.996 20.2964 143.112 20.3913C143.239 20.4756 143.376 20.6126 143.523 20.8024C143.66 20.9605 143.734 21.1133 143.745 21.2609C143.766 21.4084 143.734 21.5507 143.65 21.6877C143.576 21.8248 143.45 21.9513 143.271 22.0672C143.144 22.1937 142.954 22.3254 142.701 22.4625C142.459 22.5889 142.174 22.6996 141.848 22.7945C141.531 22.8893 141.199 22.9368 140.852 22.9368Z", fill: "white" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M148.58 23C148.074 23 147.579 22.9051 147.094 22.7154C146.62 22.5152 146.188 22.2358 145.798 21.8775C145.418 21.5191 145.112 21.0975 144.881 20.6126C144.659 20.1278 144.549 19.5955 144.549 19.0158C144.549 18.4572 144.654 17.9354 144.865 17.4506C145.076 16.9657 145.365 16.5389 145.734 16.17C146.103 15.8011 146.525 15.5165 146.999 15.3162C147.484 15.1054 148 15 148.549 15C149.286 15 149.956 15.1792 150.556 15.5375C151.157 15.8854 151.637 16.3597 151.995 16.9605C152.354 17.5613 152.533 18.2411 152.533 19C152.533 19.6008 152.422 20.1489 152.201 20.6443C151.979 21.1291 151.679 21.5507 151.3 21.9091C150.92 22.2569 150.493 22.5257 150.019 22.7154C149.555 22.9051 149.076 23 148.58 23ZM148.549 21.1344C148.896 21.1344 149.228 21.0501 149.545 20.8814C149.871 20.7022 150.135 20.4493 150.335 20.1225C150.546 19.7958 150.651 19.4111 150.651 18.9684C150.651 18.5573 150.556 18.1937 150.367 17.8775C150.188 17.5613 149.94 17.3136 149.624 17.1344C149.307 16.9552 148.944 16.8656 148.533 16.8656C148.143 16.8656 147.79 16.9605 147.473 17.1502C147.157 17.3294 146.904 17.5823 146.715 17.9091C146.535 18.2253 146.446 18.5837 146.446 18.9842C146.446 19.4269 146.546 19.8116 146.746 20.1383C146.946 20.4545 147.205 20.7022 147.521 20.8814C147.848 21.0501 148.19 21.1344 148.549 21.1344Z", fill: "white" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M154.534 22.8893C154.25 22.8893 154.039 22.8472 153.902 22.7628C153.775 22.6785 153.696 22.5626 153.665 22.415C153.633 22.2675 153.617 22.1094 153.617 21.9407V16.0277C153.617 15.859 153.633 15.7062 153.665 15.5692C153.696 15.4321 153.781 15.3215 153.918 15.2372C154.055 15.1528 154.271 15.1107 154.566 15.1107C154.872 15.1107 155.093 15.1739 155.23 15.3004C155.377 15.4269 155.451 15.6271 155.451 15.9012L155.309 16.3439C155.362 16.2279 155.451 16.1014 155.578 15.9644C155.704 15.8274 155.857 15.6904 156.036 15.5534C156.226 15.4163 156.437 15.3057 156.669 15.2213C156.9 15.137 157.143 15.0949 157.396 15.0949C157.744 15.0949 158.06 15.1528 158.344 15.2688C158.64 15.3847 158.898 15.5534 159.119 15.7747C159.351 15.996 159.551 16.2648 159.72 16.581C159.899 16.307 160.099 16.0593 160.321 15.8379C160.542 15.6061 160.8 15.4269 161.095 15.3004C161.391 15.1634 161.723 15.0949 162.092 15.0949C162.703 15.0949 163.214 15.2477 163.625 15.5534C164.047 15.859 164.363 16.2964 164.574 16.8656C164.795 17.4242 164.906 18.0935 164.906 18.8735V21.9407C164.906 22.1199 164.885 22.2833 164.843 22.4308C164.811 22.5679 164.727 22.6785 164.59 22.7628C164.463 22.8472 164.252 22.8893 163.957 22.8893C163.662 22.8893 163.446 22.8419 163.309 22.747C163.172 22.6627 163.088 22.552 163.056 22.415C163.024 22.2675 163.009 22.1041 163.009 21.9249V18.8577C163.009 18.4677 162.961 18.1304 162.866 17.8458C162.771 17.5613 162.629 17.3399 162.439 17.1818C162.26 17.0237 162.023 16.9447 161.728 16.9447C161.412 16.9447 161.138 17.0237 160.906 17.1818C160.684 17.3294 160.511 17.5455 160.384 17.83C160.258 18.1146 160.194 18.4625 160.194 18.8735V21.9565C160.194 22.1357 160.168 22.3043 160.115 22.4625C160.063 22.61 159.957 22.7207 159.799 22.7945C159.651 22.8788 159.435 22.9104 159.151 22.8893C158.887 22.8788 158.692 22.8261 158.566 22.7312C158.45 22.6364 158.376 22.5204 158.344 22.3834C158.323 22.2358 158.313 22.083 158.313 21.9249V18.8577C158.313 18.4677 158.265 18.1304 158.171 17.8458C158.076 17.5507 157.933 17.3294 157.744 17.1818C157.565 17.0237 157.322 16.9447 157.016 16.9447C156.69 16.9447 156.41 17.029 156.178 17.1976C155.957 17.3663 155.788 17.5929 155.673 17.8775C155.557 18.1621 155.499 18.4888 155.499 18.8577V21.9565C155.499 22.1252 155.478 22.2833 155.435 22.4308C155.404 22.5784 155.319 22.6891 155.182 22.7628C155.056 22.8472 154.84 22.8893 154.534 22.8893Z", fill: "white" })
  ] }) });
}
const AccountDropdownButton = ({ user }) => {
  const getRole = () => {
    if (user.is_breeder) {
      return "Breeder";
    }
    if (user.is_seller) {
      return "Seller";
    }
    if (user.is_superadmin) {
      return "Super Admin";
    }
    if (user.is_admin) {
      return "Admin";
    }
    return "Buyer";
  };
  const role = getRole();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dropdown position-relative user-profile-dropdown", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { rel: "nofollow", className: "btn btn-primary p-0 round-44 overflow-hidden rounded-circle d-flex align-items-center justify-content-center", href: "#", role: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { image_url: user.avatar, initial_name: user.initial_name, size: "sm" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "dropdown-menu dropdown-menu-end p-3", style: {
      width: "max-content"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-bottom pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "mb-0", children: [
        role,
        " Profile"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-6 my-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { image_url: user.avatar, initial_name: user.initial_name, size: "sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-0", children: user.full_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-0 fs-2 d-flex align-items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-mail-dark.svg", alt: "urpuppy-img", width: "14" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { rel: "nofollow", className: "text-muted", href: "mailto:support@urpuppy.com", children: user.email })
          ] })
        ] })
      ] }),
      ((user == null ? void 0 : user.is_seller) || (user == null ? void 0 : user.is_breeder)) && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Dashboard", prefetch: true, className: "dropdown-item rounded py-2", href: "/dashboard", children: "Dashboard" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Settings", prefetch: true, className: "dropdown-item rounded py-2", href: "/profile", children: "Settings" }) }),
      ((user == null ? void 0 : user.is_seller) || (user == null ? void 0 : user.is_breeder)) && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "My Subscription", className: "dropdown-item rounded py-2", href: "/my-subscription", children: "My Subscriptions" }) }),
      !((user == null ? void 0 : user.is_seller) || (user == null ? void 0 : user.is_breeder)) && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Saved Search", className: "dropdown-item rounded py-2", href: "/profile?tab=Saved Search", children: "Saved Search" }) }),
      ((user == null ? void 0 : user.is_seller) || (user == null ? void 0 : user.is_breeder)) && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "My Puppies", className: "dropdown-item rounded py-2", href: "/profile?tab=My Puppies", children: "My Puppies" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Je,
        {
          "aria-label": "Logout",
          method: "post",
          as: "button",
          href: "/logout",
          className: "btn btn-primary d-block w-100",
          children: "Logout"
        }
      ) })
    ] })
  ] });
};
const Navbarv2 = ({ type }) => {
  const [isSticky, setIsSticky] = reactExports.useState(false);
  const [_, setIsOffcanvasVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof document !== "undefined") {
      const sidebar = document.getElementById("offcanvasSidebar");
      if (sidebar) {
        import("./bootstrap.esm-B5nMRGNo.js").then(({ Offcanvas }) => {
          Offcanvas.getOrCreateInstance(sidebar);
        });
      }
    }
  }, []);
  const page = q().url;
  const toggleOffcanvas = () => {
    if (typeof document !== "undefined") {
      const sidebar = document.getElementById("offcanvasSidebar");
      if (!sidebar) {
        return;
      }
      setIsOffcanvasVisible((prev) => !prev);
    }
  };
  const closeOffcanvas = () => {
    setIsOffcanvasVisible(false);
  };
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSticky(window.scrollY > 50);
    }
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const user = q().props.auth.user;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: `main-header ${type == "secondary" ? "information-header" : ""} ${isSticky ? "sticky" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "navbar navbar-expand-xl py-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ApplicationLogo, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-xl-none d-flex align-items-center gap-3", children: [
        user && !(user.is_breeder || user.is_seller) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Compare", className: "position-relative me-1 d-xl-none", href: "/compares", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "20", height: "24", viewBox: "0 0 16 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 1H12C12.7956 1 13.5587 1.31607 14.1213 1.87868C14.6839 2.44129 15 3.20435 15 4V15M11 8V19L6 16L1 19V8C1 7.20435 1.31607 6.44129 1.87868 5.87868C2.44129 5.31607 3.20435 5 4 5H8C8.79565 5 9.55871 5.31607 10.1213 5.87868C10.6839 6.44129 11 7.20435 11 8Z", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Favorites", className: "position-relative me-1 d-xl-none", href: "/favorites", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/icon-heart-white.svg", alt: "urpuppy-img" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccountDropdownButton, { user }),
          " "
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "d-inline-block d-xl-none nav-toggler text-decoration-none fs-9 text-white",
            "data-bs-toggle": "offcanvas",
            "data-bs-target": "#offcanvasSidebar",
            "aria-controls": "offcanvasSidebar",
            onClick: toggleOffcanvas,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "icon icon-tabler icons-tabler-outline icon-tabler-menu-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 6l16 0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 12l16 0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 18l16 0" })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "collapse navbar-collapse justify-content-between", id: "menu-scroll", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "navbar-nav align-items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "nav-item nav-item-line ms-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Puppies for Sale", prefetch: true, className: `nav-link ${page == "puppies" ? "active" : ""}`, href: "/puppies", children: "Puppies for Sale" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Breeds", prefetch: true, className: `nav-link ${page.startsWith("/breeds") ? "active" : ""}`, href: "/breeds", children: "Breeds" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Breeders", prefetch: true, className: `nav-link ${page.startsWith("/breeders") ? "active" : ""}`, href: "/breeders", children: "Breeders" }) }),
          ((user == null ? void 0 : user.is_breeder) || (user == null ? void 0 : user.is_seller) || !user) && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "List Ur Puppy", prefetch: true, className: `nav-link ${page == "/puppies-listing/create" ? "active" : ""}`, "aria-current": "page", href: "/puppies-listing/create", children: "+ List Ur Puppy" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex align-items-center gap-6", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Compare", className: "position-relative me-1", href: "/compares", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "20", height: "24", viewBox: "0 0 16 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 1H12C12.7956 1 13.5587 1.31607 14.1213 1.87868C14.6839 2.44129 15 3.20435 15 4V15M11 8V19L6 16L1 19V8C1 7.20435 1.31607 6.44129 1.87868 5.87868C2.44129 5.31607 3.20435 5 4 5H8C8.79565 5 9.55871 5.31607 10.1213 5.87868C10.6839 6.44129 11 7.20435 11 8Z", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Favorites", className: "position-relative me-1", href: "/favorites", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/icon-heart-white.svg", alt: "urpuppy-img" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccountDropdownButton, { user })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: !user && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Login", preserveScroll: false, prefetch: true, className: "btn btn-white bg-white text-dark", href: "/login", children: "Login" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Je, { "aria-label": "Sign Up", preserveScroll: false, prefetch: true, className: "btn btn-primary d-flex align-items-center gap-2", href: "/register", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/icon-user.svg", alt: "urpuppy-img" }),
            " Sign Up"
          ] })
        ] }) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `offcanvas offcanvas-start `,
        tabIndex: -1,
        id: "offcanvasSidebar",
        "aria-labelledby": "offcanvasExampleLabel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "offcanvas-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "urpuppy", className: "navbar-brand py-0 me-0", href: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.svg", alt: "urpuppy-img" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "btn-close shadow-none text-reset ms-auto btn-close-white",
                "data-bs-dismiss": "offcanvas",
                "aria-label": "Close",
                onClick: closeOffcanvas
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "offcanvas-body pt-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "navbar-nav", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Puppies for Sale", prefetch: true, className: "nav-link text-white", href: "/puppies", children: "Puppies for Sale" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Breeds", prefetch: true, className: "nav-link text-white", href: "/breeds", children: "Breeds" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Breeders", prefetch: true, className: "nav-link text-white", href: "/breeders", children: "Breeders" }) }),
              ((user == null ? void 0 : user.is_seller) || !user) && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "List Ur Puppy", prefetch: true, className: "nav-link text-white", href: "/puppies-listing/create", children: "+ List Ur Puppy" }) }),
              user && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { className: "nav-link text-white", href: "/profile", children: "Profile" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Je,
                  {
                    method: "post",
                    as: "button",
                    href: "/logout",
                    style: {
                      background: "transparent",
                      color: "white",
                      margin: "0",
                      padding: "0",
                      border: "none"
                    },
                    children: "Logout"
                  }
                ) })
              ] })
            ] }),
            !user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center flex-column gap-3 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "Login", preserveScroll: false, prefetch: true, className: "btn btn-white bg-white text-dark w-100", href: "/login", children: "Login" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Je, { "aria-label": "Sign Up", preserveScroll: false, prefetch: true, className: "btn btn-primary d-flex align-items-center justify-content-center gap-2 w-100", href: "/register", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/icon-user.svg", alt: "urpuppy-img" }),
                " Sign Up"
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
};
const getErrorMessage = async (response, defaultMessage) => {
  try {
    const data = await response.json();
    if (data.message) return data.message;
    if (data.error) return data.error;
    if (data.errors && typeof data.errors === "object") {
      const firstError = Object.values(data.errors)[0];
      if (Array.isArray(firstError) && firstError.length > 0) {
        return firstError[0];
      }
      return String(firstError);
    }
    if (typeof data === "string") return data;
  } catch (e) {
  }
  return defaultMessage;
};
const FloatingChatPopup = ({ chatId, initialOtherUser, onMinimize, onClose }) => {
  const { auth } = q().props;
  const currentUser = auth == null ? void 0 : auth.user;
  const receiverIdRef = reactExports.useRef((initialOtherUser == null ? void 0 : initialOtherUser.id) || null);
  const [chat, setChat] = reactExports.useState(initialOtherUser ? {
    id: chatId || 0,
    name: "",
    other_user: initialOtherUser
  } : null);
  const [messages, setMessages] = reactExports.useState([]);
  const [messageText, setMessageText] = reactExports.useState("");
  const [attachments, setAttachments] = reactExports.useState([]);
  const [attachmentFiles, setAttachmentFiles] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isSending, setIsSending] = reactExports.useState(false);
  const messagesEndRef = reactExports.useRef(null);
  const fileInputRef = reactExports.useRef(null);
  const scrollToBottom = () => {
    var _a;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  reactExports.useEffect(() => {
    if (chatId) {
      if (initialOtherUser == null ? void 0 : initialOtherUser.id) {
        receiverIdRef.current = initialOtherUser.id;
      }
      if (initialOtherUser) {
        setChat({
          id: chatId,
          name: "",
          other_user: initialOtherUser
        });
      }
      loadChat();
    } else {
      setChat(null);
      setMessages([]);
      receiverIdRef.current = null;
    }
  }, [chatId]);
  reactExports.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  reactExports.useEffect(() => {
    if (!chatId) return;
    const interval = setInterval(() => {
      loadChat();
    }, 1e4);
    return () => clearInterval(interval);
  }, [chatId]);
  const loadChat = async () => {
    var _a, _b;
    if (!chatId) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/chat/${chatId}`, {
        credentials: "same-origin"
      });
      if (!response.ok) {
        throw new Error("Failed to load chat");
      }
      const data = await response.json();
      const otherUser = data.other_user || ((_a = data.chat) == null ? void 0 : _a.other_user) || initialOtherUser;
      if (data.chat) {
        setChat({
          ...data.chat,
          other_user: otherUser || data.chat.other_user
        });
        if (otherUser == null ? void 0 : otherUser.id) {
          receiverIdRef.current = otherUser.id;
        } else if ((_b = data.chat.other_user) == null ? void 0 : _b.id) {
          receiverIdRef.current = data.chat.other_user.id;
        }
      } else if (initialOtherUser && chatId) {
        setChat({
          id: chatId,
          name: "",
          other_user: initialOtherUser
        });
      }
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error loading chat:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newPreviewUrls = [];
    const newFiles = [];
    for (const file of Array.from(files)) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        Vt.error("Only image files are allowed (jpg, png, gif, webp)");
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        Vt.error("File size must be less than 5MB");
        continue;
      }
      const previewUrl = URL.createObjectURL(file);
      console.log("Created preview URL:", previewUrl, "for file:", file.name, "type:", file.type);
      newPreviewUrls.push(previewUrl);
      newFiles.push(file);
    }
    if (newPreviewUrls.length > 0) {
      console.log("Setting attachments:", [...attachments, ...newPreviewUrls]);
      setAttachments([...attachments, ...newPreviewUrls]);
      setAttachmentFiles([...attachmentFiles, ...newFiles]);
    }
  };
  const handleSendMessage = async () => {
    var _a;
    if (!messageText.trim() && attachments.length === 0 || !chatId || isSending) {
      return;
    }
    setIsSending(true);
    try {
      const receiverId = receiverIdRef.current || ((_a = chat == null ? void 0 : chat.other_user) == null ? void 0 : _a.id) || (initialOtherUser == null ? void 0 : initialOtherUser.id);
      if (!receiverId) {
        Vt.error("Cannot send message: receiver information is missing");
        setIsSending(false);
        return;
      }
      if (receiverId === (currentUser == null ? void 0 : currentUser.id)) {
        Vt.error("Cannot send message: receiver ID is the same as sender");
        setIsSending(false);
        return;
      }
      const uploadedAttachmentUrls = [];
      if (attachmentFiles.length > 0) {
        for (const file of attachmentFiles) {
          const formData = new FormData();
          formData.append("attachment", file);
          try {
            const uploadResponse = await fetch("/api/chat/upload-attachment", {
              method: "POST",
              headers: {
                "Accept": "application/json"
              },
              credentials: "same-origin",
              body: formData
            });
            if (!uploadResponse.ok) {
              const errorMessage = await getErrorMessage(uploadResponse, "Failed to upload attachment");
              throw new Error(errorMessage);
            }
            const uploadData = await uploadResponse.json();
            uploadedAttachmentUrls.push({
              url: uploadData.url,
              path: uploadData.path
            });
          } catch (error) {
            console.error("Error uploading attachment:", error);
            const errorMessage = error instanceof Error ? error.message : "Failed to upload attachment";
            Vt.error(errorMessage);
            setIsSending(false);
            return;
          }
        }
      }
      const response = await fetch(`/api/chat/${chatId}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify({
          message: messageText.trim() || null,
          receiver_id: receiverId,
          attachments: uploadedAttachmentUrls
        })
      });
      if (!response.ok) {
        const errorMessage = await getErrorMessage(response, "Failed to send message");
        throw new Error(errorMessage);
      }
      const data = await response.json();
      attachments.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
      await loadChat();
      setMessageText("");
      setAttachments([]);
      setAttachmentFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to send message. Please try again.";
      Vt.error(errorMessage);
    } finally {
      setIsSending(false);
    }
  };
  const removeAttachment = (index) => {
    const urlToRemove = attachments[index];
    if (urlToRemove && urlToRemove.startsWith("blob:")) {
      URL.revokeObjectURL(urlToRemove);
    }
    setAttachments(attachments.filter((_, i) => i !== index));
    setAttachmentFiles(attachmentFiles.filter((_, i) => i !== index));
  };
  if (!chatId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      padding: "40px 20px",
      textAlign: "center",
      color: "#666",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/images/svgs/icon-mail-dark.svg",
          alt: "Chat",
          width: "40",
          height: "40",
          style: { opacity: 0.5 }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { style: { marginBottom: "10px", color: "#333", fontWeight: "600" }, children: "No chat selected" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: 0, color: "#999", fontSize: "14px" }, children: "Click a chat button to start a conversation" })
    ] });
  }
  if (!chat) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex flex-column h-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-bottom bg-gray d-flex align-items-center justify-content-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-circle bg-secondary d-flex align-items-center justify-content-center", style: { width: "40px", height: "40px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/images/svgs/icon-mail-dark.svg",
              alt: "Chat",
              width: "20",
              height: "20",
              style: { opacity: 0.5 }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fw-bold", children: "New Conversation" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onMinimize,
              className: "btn btn-sm",
              style: {
                border: "none",
                background: "transparent",
                padding: "4px 8px",
                fontSize: "18px",
                lineHeight: "1",
                color: "#666"
              },
              "aria-label": "Minimize",
              title: "Minimize",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 8H14", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onClose,
              className: "btn-close",
              "aria-label": "Close",
              title: "Close"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-grow-1 overflow-auto p-3 d-flex flex-column align-items-center justify-content-center", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted text-center small", children: "Loading conversation..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted text-center small", children: "Start the conversation by sending a message" }) }),
      attachments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 border-top d-flex gap-2 flex-wrap", style: { maxHeight: "120px", overflowY: "auto" }, children: attachments.map((url, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "position-relative", style: { width: "80px", height: "80px", flexShrink: 0 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: url,
            alt: `Attachment ${index + 1}`,
            className: "rounded",
            style: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              border: "1px solid #dee2e6",
              display: "block",
              backgroundColor: "#f8f9fa",
              minWidth: "80px",
              minHeight: "80px"
            },
            onError: (e) => {
              console.error("Failed to load preview image:", url);
              e.currentTarget.style.display = "none";
            },
            onLoad: (e) => {
              console.log("Preview image loaded successfully:", url);
              e.currentTarget.style.display = "block";
            }
          },
          `img-${index}-${url}`
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => removeAttachment(index),
            className: "btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle",
            style: { width: "20px", height: "20px", padding: 0, fontSize: "12px", transform: "translate(30%, -30%)", zIndex: 10 },
            children: "×"
          }
        )
      ] }, `preview-${index}-${url}`)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-top d-flex gap-2 align-items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            ref: fileInputRef,
            onChange: handleFileSelect,
            accept: "image/jpeg,image/png,image/jpg,image/gif,image/webp",
            multiple: true,
            style: { display: "none" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            className: "btn btn-text btn-sm",
            title: "Upload attachment",
            children: "📎"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: messageText,
            onChange: (e) => setMessageText(e.target.value),
            onKeyPress: (e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            },
            placeholder: "Type a message...",
            className: "form-control",
            rows: 1,
            style: {
              backgroundColor: "#fff",
              resize: "none"
            },
            onFocus: (e) => {
              e.target.style.backgroundColor = "#fff";
            },
            onBlur: (e) => {
              e.target.style.backgroundColor = "#fff";
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleSendMessage,
            disabled: !messageText.trim() && attachments.length === 0 || isSending,
            className: "btn btn-primary",
            style: !messageText.trim() && attachments.length === 0 || isSending ? { opacity: 0.65 } : {},
            children: "Send"
          }
        )
      ] })
    ] });
  }
  if (chat && !chat.other_user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex flex-column h-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-bottom bg-gray d-flex align-items-center justify-content-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-circle bg-secondary d-flex align-items-center justify-content-center", style: { width: "40px", height: "40px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/images/svgs/icon-mail-dark.svg",
              alt: "Chat",
              width: "20",
              height: "20",
              style: { opacity: 0.5 }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fw-bold", children: "New Conversation" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onMinimize,
              className: "btn btn-sm",
              style: {
                border: "none",
                background: "transparent",
                padding: "4px 8px",
                fontSize: "18px",
                lineHeight: "1",
                color: "#666"
              },
              "aria-label": "Minimize",
              title: "Minimize",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 8H14", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onClose,
              className: "btn-close",
              "aria-label": "Close",
              title: "Close"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-grow-1 overflow-auto p-3 d-flex flex-column align-items-center justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted text-center small", children: "Start the conversation by sending a message" }) }),
      attachments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 border-top d-flex gap-2 flex-wrap", style: { maxHeight: "100px", overflowY: "auto" }, children: attachments.map((url, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "position-relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: url,
            alt: `Attachment ${index + 1}`,
            className: "rounded",
            style: { width: "60px", height: "60px", objectFit: "cover" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => removeAttachment(index),
            className: "btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle",
            style: { width: "20px", height: "20px", padding: 0, fontSize: "12px" },
            children: "×"
          }
        )
      ] }, index)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-top d-flex gap-2 align-items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            ref: fileInputRef,
            onChange: handleFileSelect,
            accept: "image/jpeg,image/png,image/jpg,image/gif,image/webp",
            multiple: true,
            style: { display: "none" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            className: "btn btn-outline-primary",
            title: "Upload attachment",
            children: "📎"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: messageText,
            onChange: (e) => setMessageText(e.target.value),
            onKeyPress: (e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            },
            placeholder: "Type a message...",
            className: "form-control",
            rows: 1,
            style: {
              backgroundColor: "#fff",
              resize: "none"
            },
            onFocus: (e) => {
              e.target.style.backgroundColor = "#fff";
            },
            onBlur: (e) => {
              e.target.style.backgroundColor = "#fff";
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleSendMessage,
            disabled: !messageText.trim() && attachments.length === 0 || isSending,
            className: "btn btn-primary",
            style: !messageText.trim() && attachments.length === 0 || isSending ? { opacity: 0.65 } : {},
            children: "Send"
          }
        )
      ] })
    ] });
  }
  if (!chat || !chat.other_user) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex flex-column h-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-bottom bg-gray d-flex align-items-center justify-content-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Avatar,
          {
            image_url: chat.other_user.avatar,
            initial_name: chat.other_user.name,
            size: "sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fw-bold", children: chat.other_user.name }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onMinimize,
            className: "btn btn-sm",
            style: {
              border: "none",
              background: "transparent",
              padding: "4px 8px",
              fontSize: "18px",
              lineHeight: "1",
              color: "#666"
            },
            "aria-label": "Minimize",
            title: "Minimize",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 8H14", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "btn-close",
            "aria-label": "Close",
            title: "Close"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-grow-1 overflow-auto p-3 d-flex flex-column gap-3",
        style: { maxHeight: "400px" },
        children: [
          isLoading && messages.length === 0 && chat ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted", children: "Loading messages..." }) : messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted", children: "No messages yet. Start the conversation!" }) : messages.map((message) => {
            const isOwnMessage = message.sender_id === (currentUser == null ? void 0 : currentUser.id);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `d-flex mb-2 ${isOwnMessage ? "justify-content-end" : "justify-content-start"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `p-3 rounded ${isOwnMessage ? "bg-primary text-white" : ""}`,
                    style: {
                      maxWidth: "70%",
                      backgroundColor: !isOwnMessage ? "#f5f5f5" : void 0
                    },
                    children: [
                      !isOwnMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "small mb-1", style: { opacity: 0.8 }, children: message.sender.name }),
                      message.attachments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 d-flex flex-column gap-2", children: message.attachments.map((attachment) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: attachment.file_path,
                          alt: attachment.file_name,
                          className: "img-fluid rounded",
                          style: { maxHeight: "200px", objectFit: "contain" }
                        },
                        attachment.id
                      )) }),
                      message.message && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: message.message }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "small mt-1", style: { opacity: 0.7 }, children: message.created_at_human })
                    ]
                  }
                )
              },
              message.id
            );
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
        ]
      }
    ),
    attachments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 border-top d-flex gap-2 flex-wrap", style: { maxHeight: "120px", overflowY: "auto" }, children: attachments.map((url, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "position-relative", style: { width: "80px", height: "80px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: url,
          alt: `Attachment ${index + 1}`,
          className: "rounded",
          style: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            border: "1px solid #dee2e6"
          },
          onError: (e) => {
            console.error("Failed to load preview image:", url);
            e.currentTarget.style.display = "none";
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => removeAttachment(index),
          className: "btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle",
          style: { width: "20px", height: "20px", padding: 0, fontSize: "12px", transform: "translate(30%, -30%)" },
          children: "×"
        }
      )
    ] }, index)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-top d-flex gap-2 align-items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "file",
          ref: fileInputRef,
          onChange: handleFileSelect,
          accept: "image/jpeg,image/png,image/jpg,image/gif,image/webp",
          multiple: true,
          style: { display: "none" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            var _a;
            return (_a = fileInputRef.current) == null ? void 0 : _a.click();
          },
          className: "btn btn-text btn-sm",
          title: "Upload attachment",
          children: "📎"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: messageText,
          onChange: (e) => setMessageText(e.target.value),
          onKeyPress: (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          },
          placeholder: "Type a message...",
          className: "form-control",
          rows: 1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleSendMessage,
          disabled: !messageText.trim() && attachments.length === 0 || isSending,
          className: "btn btn-primary",
          children: "Send"
        }
      )
    ] })
  ] });
};
const STORAGE_KEY = "floating_chat_state";
const FloatingChatButton = () => {
  const loadStoredState = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error loading chat state from localStorage:", error);
    }
    return null;
  };
  const storedState = loadStoredState();
  const { url } = q();
  const [unreadCount, setUnreadCount] = reactExports.useState(0);
  const [isOpen, setIsOpen] = reactExports.useState((storedState == null ? void 0 : storedState.isOpen) || false);
  const [currentChatId, setCurrentChatId] = reactExports.useState((storedState == null ? void 0 : storedState.chatId) || null);
  const [initialOtherUser, setInitialOtherUser] = reactExports.useState((storedState == null ? void 0 : storedState.initialOtherUser) || null);
  const [isVisible, setIsVisible] = reactExports.useState((storedState == null ? void 0 : storedState.isVisible) || false);
  const saveState = (chatId, otherUser, visible, open) => {
    try {
      if (chatId && visible) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          chatId,
          initialOtherUser: otherUser,
          isVisible: visible,
          isOpen: open
        }));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error saving chat state to localStorage:", error);
    }
  };
  reactExports.useEffect(() => {
    const shouldFetchChatCount = () => {
      const isOnChatPage = url.startsWith("/chat");
      return isOnChatPage || isOpen;
    };
    const fetchUnreadCount = async () => {
      if (!shouldFetchChatCount()) {
        return;
      }
      try {
        const response = await fetch("/api/chat/unread/count", {
          credentials: "same-origin"
        });
        const data = await response.json();
        setUnreadCount(data.total_unread || 0);
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };
    if (shouldFetchChatCount()) {
      fetchUnreadCount();
    }
    const interval = setInterval(fetchUnreadCount, 1e4);
    const handleOpenChat = (event) => {
      const customEvent = event;
      if (customEvent.detail && customEvent.detail.chatId) {
        const chatId = customEvent.detail.chatId;
        const otherUser = customEvent.detail.otherUser || null;
        setCurrentChatId(chatId);
        setInitialOtherUser(otherUser);
        setIsOpen(true);
        setIsVisible(true);
        saveState(chatId, otherUser, true, true);
      }
    };
    window.addEventListener("openChatPopup", handleOpenChat);
    return () => {
      clearInterval(interval);
      window.removeEventListener("openChatPopup", handleOpenChat);
    };
  }, [isOpen, url]);
  const toggleChat = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (currentChatId) {
      saveState(currentChatId, initialOtherUser, isVisible, newIsOpen);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
    setCurrentChatId(null);
    setInitialOtherUser(null);
    setIsVisible(false);
    localStorage.removeItem(STORAGE_KEY);
  };
  const handleMinimize = () => {
    setIsOpen(false);
    if (currentChatId) {
      saveState(currentChatId, initialOtherUser, isVisible, false);
    }
  };
  if (!isVisible) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: toggleChat,
        className: "position-fixed",
        style: {
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#ffb300",
          border: "none",
          color: "white",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1e3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.3s ease"
        },
        onMouseEnter: (e) => e.currentTarget.style.backgroundColor = "#ffc107",
        onMouseLeave: (e) => e.currentTarget.style.backgroundColor = "#ffb300",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-mail-dark.svg", alt: "Chat", width: "24", height: "24", style: { filter: "brightness(0) invert(1)" } }),
          unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                position: "absolute",
                top: "-5px",
                right: "-5px",
                backgroundColor: "#dc3545",
                color: "white",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold"
              },
              children: unreadCount > 9 ? "9+" : unreadCount
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        id: "floating-chat-popup",
        style: {
          position: "fixed",
          bottom: "90px",
          right: "20px",
          width: "400px",
          maxWidth: "calc(100vw - 40px)",
          height: "500px",
          maxHeight: "calc(100vh - 120px)",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FloatingChatPopup,
          {
            chatId: currentChatId,
            initialOtherUser,
            onMinimize: handleMinimize,
            onClose: handleClose
          }
        )
      }
    )
  ] });
};
function Layout({
  header,
  children,
  navType
}) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AOSInit, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbarv2, { type: navType }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { "scroll-region": "true", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingChatButton, {})
  ] });
}
export {
  Layout as L
};

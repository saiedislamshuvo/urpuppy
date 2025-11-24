import { j as jsxRuntimeExports, R as React } from "../ssr.js";
import { S as Swiper, a as SwiperSlide } from "./create-element-if-not-defined-CvWUKBFO.js";
import { P as Pagination } from "./pagination-UrZXYy2-.js";
import { A as Autoplay } from "./autoplay-B_dejtbc.js";
const BannerSlider = ({ children, slidesPerView = 5 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "banner-slider hero-section-inner-slider position-relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Swiper,
    {
      spaceBetween: 10,
      autoplay: { delay: 3e3, disableOnInteraction: false },
      loop: true,
      pagination: {
        clickable: true
      },
      className: "owl-carousel",
      modules: [Pagination, Autoplay],
      navigation: true,
      slidesPerView,
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "owl-carousel owl-theme position-relative", children: React.Children.map(children, (child, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { className: "owl-item", children: child }, index)) })
    }
  ) });
};
const SmallBannerWithContent = ({
  children,
  pill = "Featured Breed",
  title = "Ang buhay",
  background_image = "/images/breeds-slider/hero-inner-slider-1.jpg"
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "item d-flex align-items-end pb-5",
      style: {
        backgroundImage: `url(${background_image})`
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container position-relative z-2 pb-4 pb-lg-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge text-bg-info mb-6", children: pill }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-white fs-10 mb-3", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-lg-flex align-items-center gap-3", children })
      ] }) })
    }
  );
};
export {
  BannerSlider as B,
  SmallBannerWithContent as S
};

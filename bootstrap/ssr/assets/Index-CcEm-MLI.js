import { j as jsxRuntimeExports, U, J as Je, q, r as reactExports } from "../ssr.js";
import Banner from "./Banner-BbwcIKDD.js";
import { S as Swiper, a as SwiperSlide } from "./create-element-if-not-defined-BxImSDkK.js";
import { A as Autoplay } from "./autoplay-DKsRVzkf.js";
import { P as PuppyCard, C as CompareButton, F as FavoriteButton, G as Gender } from "./Card-Kjm6uc3j.js";
import { I as ImageSlider, L as List, G as GenIcon } from "./List-Dk8K1TKg.js";
import { S as ShareButton } from "./ShareButton-E7C8Yo7Y.js";
import { B as BreederCard } from "./BreederCard-Dgm9bW5t.js";
import { G as GenericModal } from "./GenericModal-BuSM2RnD.js";
import { L as Layout } from "./Layout-CVJc5AuP.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { S as SecondaryJumbotron } from "./SecondaryJumbotron-DjXmY8KD.js";
import { C as Card } from "./Card-DZU2LbEg.js";
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
import "./BreedFilter-BMG1NT-R.js";
import "./index-C9Hr-vST.js";
import "./react-select.esm-tWlRM8_L.js";
import "./setPrototypeOf-DxvfjWzF.js";
import "./extends-BwmuZ0dU.js";
import "./hoist-non-react-statics.cjs-BnF7CivY.js";
import "./index-DgY4nH2N.js";
import "./index-D7h8hQJR.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./StateFilter-65fOkPpU.js";
import "./Tooltip-fHI3Ksjq.js";
import "./index-DbhDZzck.js";
import "./index-BZNbmzld.js";
import "net";
import "./Modal-CCl1U1i1.js";
import "./divWithClassName-CPmFGv-w.js";
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
const Slider = ({ children, slidesPerView = 1, autoplay = false }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Swiper,
    {
      spaceBetween: 10,
      slidesPerView,
      loop: true,
      autoplay: autoplay ? { delay: 4e3, disableOnInteraction: false } : false,
      modules: [Autoplay],
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40
        },
        1368: {
          slidesPerView: 5,
          spaceBetween: 40
        }
      },
      children: U.Children.map(children, (child, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { children: child }, index))
    }
  ) });
};
const BreedCard = ({ breed }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", "data-aos": "fade-up", "data-aos-delay": "300", "data-aos-duration": "1000", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "featured-breeds-item", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Je, { "aria-label": "View Details", prefetch: true, cacheFor: "3m", href: breed.random_breeder_slug ? `/breeders/${breed.random_breeder_slug}` : `/breeds/${breed.slug}`, className: "featured-breeds-img mb-3 d-block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: breed.image, alt: "urpuppy-img" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Je,
      {
        "aria-label": "View Details",
        prefetch: true,
        cacheFor: "3m",
        href: `/puppies?filter[breed]=${breed.name}`,
        className: "btn btn-outline-extralight text-dark d-inline-flex align-items-center gap-2",
        children: [
          breed.name,
          " for Sale",
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-chev-right.svg", alt: "urpuppy-img", className: "w-auto", width: "6", height: "12" })
        ]
      }
    ) })
  ] }) });
};
const FeaturedBreeds = ({ featured_breeds }) => {
  const { settings } = q().props;
  const sectionTitle = (settings == null ? void 0 : settings.featured_section_title) || "Featured Breeds";
  const buttonText = (settings == null ? void 0 : settings.featured_button_text) || "View More Breeds";
  const buttonLink = (settings == null ? void 0 : settings.featured_button_link) || "/breeds";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    "     ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "featured-breeds py-7 py-md-9 mb-xl-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center justify-content-between mb-4 mb-lg-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-0", "data-aos": "fade-right", "data-aos-delay": "100", "data-aos-duration": "1000", children: sectionTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Je,
          {
            "artia-label": "View Details",
            className: "btn btn-outline-extralight btn-white text-dark d-none d-md-flex align-items-center gap-2",
            href: buttonLink,
            "data-aos": "fade-left",
            "data-aos-delay": "100",
            "data-aos-duration": "1000",
            children: buttonText
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "featured-breeds-slider", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "owl-carousel owl-theme", children: featured_breeds && featured_breeds.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { autoplay: true, slidesPerView: 1, children: featured_breeds.map((breed) => /* @__PURE__ */ jsxRuntimeExports.jsx(BreedCard, { breed }, breed.slug)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: "No featured breeds available at the moment." }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Je,
        {
          "aria-label": "View Details",
          className: "btn btn-outline-extralight btn-white text-dark d-flex d-md-none align-items-center justify-content-center gap-2 mt-4",
          href: buttonLink,
          "data-aos": "fade-up",
          "data-aos-delay": "100",
          "data-aos-duration": "1000",
          children: buttonText
        }
      )
    ] }) })
  ] });
};
const PuppySpotlight = ({ puppy_spotlights }) => {
  const { settings } = q().props;
  const sectionTitle = (settings == null ? void 0 : settings.spotlight_section_title) || "Puppy Spotlight";
  const buttonText = (settings == null ? void 0 : settings.spotlight_button_text) || "View More Breeds";
  const buttonLink = (settings == null ? void 0 : settings.spotlight_button_link) || "/puppies";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "puppy-spotlight bg-extralight py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center justify-content-between mb-4 mb-lg-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-0", "data-aos": "fade-right", "data-aos-delay": "100", "data-aos-duration": "1000", children: sectionTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Je,
        {
          className: "btn btn-outline-extralight btn-white bg-white border text-dark d-none d-md-flex align-items-center gap-2",
          href: buttonLink,
          "data-aos": "fade-left",
          "data-aos-delay": "100",
          "data-aos-duration": "1000",
          children: buttonText
        }
      )
    ] }),
    puppy_spotlights && puppy_spotlights.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row align-items-stretch", children: puppy_spotlights.map((puppy) => /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyCard, { location: "puppy-spotlight", className: "col-md-6 col-xl-3 mb-4 mb-xl-0", puppy, height: "310px" }, puppy.slug)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: "No puppy spotlights available at the moment." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Je,
      {
        className: "btn btn-outline-extralight btn-white bg-white border text-dark d-flex d-md-none align-items-center justify-content-center gap-2",
        href: buttonLink,
        "data-aos": "fade-up",
        "data-aos-delay": "100",
        "data-aos-duration": "1000",
        children: buttonText
      }
    )
  ] }) });
};
const TopPicks = ({ puppy }) => {
  var _a, _b, _c, _d;
  const { settings } = q().props;
  const sectionTitle = (settings == null ? void 0 : settings.picks_section_title) || "Top Picks For You";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "top-picks py-5 pb-4 py-md-9 mb-xl-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex align-items-center justify-content-between mb-4 mb-lg-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-0", "data-aos": "fade-right", "data-aos-delay": "100", "data-aos-duration": "1000", children: sectionTitle }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "top-picks-slider mb-4 mb-lg-0",
          "data-aos": "fade-right",
          "data-aos-delay": "100",
          "data-aos-duration": "1000",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "sync1", className: "owl-carousel owl-theme mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageSlider, { images: puppy.preview_images || [] }) })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "top-picks-details ms-xl-8", "data-aos": "fade-left", "data-aos-delay": "200", "data-aos-duration": "1000", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-start justify-content-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "fs-10", children: puppy.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CompareButton, { uniqueId: "top-picks" + puppy.id, sellerId: (_a = puppy.seller) == null ? void 0 : _a.id, puppyId: puppy.id, isCompared: puppy.is_compared }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FavoriteButton, { uniqueId: "top-picks" + puppy.id, sellerId: (_b = puppy.seller) == null ? void 0 : _b.id, puppyId: puppy.id, isFavorite: puppy.is_favorite }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShareButton, { slug: puppy.slug })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-map-pin.svg", alt: "urpuppy-img", width: "20", height: "20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: puppy.state || ((_c = puppy.seller) == null ? void 0 : _c.address) || "Location not available" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-paws-dark.svg", alt: "urpuppy-img", width: "20", height: "20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: (_d = puppy.breeds[0]) == null ? void 0 : _d.name })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-calendar.svg", alt: "urpuppy-img", width: "20", height: "20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: puppy.age })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gender, { gender: puppy.gender }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-eye.svg", alt: "urpuppy-img", width: "20", height: "20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-0", children: [
              puppy.view_count,
              " Views"
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-4 pb-4 mb-4 border-bottom", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fs-2 fw-medium", children: "Our price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-0", children: puppy.formatted_price })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Je, { prefetch: true, className: "btn btn-primary d-flex align-items-center gap-2", href: `/puppies/${puppy.slug}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-paws.svg", alt: "urpuppy-img" }),
            "View more"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-3 fs-8", children: [
          "About ",
          puppy.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3", children: puppy.description }),
        puppy.features && puppy.features.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-pill px-3 py-6 d-flex align-items-center align-items-start gap-6 bg-extralight mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-heart-plus.svg", alt: "urpuppy-img" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex flex-column gap-2", children: puppy.features.map((feature, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(List, { label: feature }, index)) })
        ] })
      ] }) })
    ] })
  ] }) });
};
const TrustedBreeders = ({ breeders }) => {
  const { settings } = q().props;
  const sectionTitle = (settings == null ? void 0 : settings.trusted_section_title) || "Trusted Breeders";
  const buttonText = (settings == null ? void 0 : settings.trusted_button_text) || "Explore All Breeders";
  const buttonLink = (settings == null ? void 0 : settings.trusted_button_link) || "/breeders";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "trusted-breeders bg-extralight py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center justify-content-between mb-4 mb-lg-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-0", "data-aos": "fade-right", "data-aos-delay": "100", "data-aos-duration": "1000", children: sectionTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Je,
        {
          className: "btn btn-outline-extralight btn-white bg-white border text-dark d-none d-md-flex align-items-center gap-2",
          href: buttonLink,
          "data-aos": "fade-left",
          "data-aos-delay": "200",
          "data-aos-duration": "1000",
          children: buttonText
        }
      )
    ] }),
    breeders && breeders.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: breeders.map((breeder) => /* @__PURE__ */ jsxRuntimeExports.jsx(BreederCard, { breeder }, breeder.slug)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: "No trusted breeders available at the moment." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Je,
      {
        className: "btn btn-outline-extralight btn-white bg-white border text-dark d-flex d-md-none align-items-center justify-content-center gap-2",
        href: buttonLink,
        "data-aos": "fade-up",
        "data-aos-delay": "100",
        "data-aos-duration": "1000",
        children: buttonText
      }
    )
  ] }) });
};
function FaPaw(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224zm-147.28-12.61c-10.4-34.65-42.44-57.09-71.56-50.13-29.12 6.96-44.29 40.69-33.89 75.34 10.4 34.65 42.44 57.09 71.56 50.13 29.12-6.96 44.29-40.69 33.89-75.34zm84.72-20.78c30.94-8.14 46.42-49.94 34.58-93.36s-46.52-72.01-77.46-63.87-46.42 49.94-34.58 93.36c11.84 43.42 46.53 72.02 77.46 63.87zm281.39-29.34c-29.12-6.96-61.15 15.48-71.56 50.13-10.4 34.65 4.77 68.38 33.89 75.34 29.12 6.96 61.15-15.48 71.56-50.13 10.4-34.65-4.77-68.38-33.89-75.34zm-156.27 29.34c30.94 8.14 65.62-20.45 77.46-63.87 11.84-43.42-3.64-85.21-34.58-93.36s-65.62 20.45-77.46 63.87c-11.84 43.42 3.64 85.22 34.58 93.36z" }, "child": [] }] })(props);
}
const NewArrivals = ({ new_arrivals }) => {
  const { settings } = q().props;
  const sectionTitle = (settings == null ? void 0 : settings.arrivals_section_title) || "New Arrivals!";
  const buttonText = (settings == null ? void 0 : settings.arrivals_button_text) || "Discover new";
  const buttonLink = (settings == null ? void 0 : settings.arrivals_button_link) || "/puppies";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "new-arrivals py-5 ", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center justify-content-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-0", "data-aos": "fade-right", "data-aos-delay": "100", "data-aos-duration": "1000", children: sectionTitle }),
      new_arrivals && new_arrivals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Je,
        {
          className: "btn btn-outline-extralight btn-white bg-white border text-dark d-none d-md-flex align-items-center gap-2",
          href: buttonLink,
          "data-aos": "fade-left",
          "data-aos-delay": "100",
          "data-aos-duration": "1000",
          children: buttonText
        }
      )
    ] }),
    !new_arrivals || new_arrivals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-5", "data-aos": "fade-up", "data-aos-delay": "100", "data-aos-duration": "1000", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaw, { className: "text-primary mb-3", style: { fontSize: "3rem", opacity: 0.5 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "No new arrivals at the moment. Check out our available puppies!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Je,
        {
          className: "btn btn-outline-extralight btn-white bg-white border text-dark d-inline-flex align-items-center gap-2",
          href: "/puppies",
          children: "View Puppies for Sale"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: new_arrivals.map((puppy, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyCard, { location: "new-arrivals", className: "col-md-6 col-xl-3 mb-4 mb-xl-0", puppy, height: "310px" }, puppy.slug)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Je,
        {
          className: "btn btn-outline-extralight btn-white bg-white border text-dark d-flex d-md-none align-items-center justify-content-center gap-2",
          href: buttonLink,
          "data-aos": "fade-up",
          "data-aos-delay": "100",
          "data-aos-duration": "1000",
          children: buttonText
        }
      )
    ] })
  ] }) });
};
const FooterVideos = ({ videos }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bringing-through-puppies bg-extralight py-7 py-md-5 py-xl-9", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex align-items-center justify-content-between mb-4 mb-lg-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-0 aos-init aos-animate", "data-aos": "fade-right", "data-aos-delay": "100", "data-aos-duration": "1000", children: "Bringing Joy Through Puppies" }) }),
    videos && videos.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: videos.map((video) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bringing-through-puppies-blog position-relative overflow-hidden rounded-1 mb-4 mb-lg-0 aos-init aos-animate", "data-aos": "fade-up", "data-aos-delay": "200", "data-aos-duration": "1000", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: video.video_thumbnail ?? "", alt: "urpuppy-img" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-3 position-relative z-1 position-absolute bottom-0 start-0 w-100 p-4 pt-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GenericModal, { buttonTitle: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "btn btn-primary p-2 d-flex align-items-center justify-content-center round-48 rounded-circle flex-shrink-0", "data-bs-toggle": "modal", "data-bs-target": "#exampleModal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "../images/svgs/icon-play.svg", alt: "urpuppy-img" }) }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            controls: true,
            className: "w-100",
            autoPlay: true,
            style: {
              height: "auto",
              maxHeight: "60vh",
              objectFit: "contain"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: video.url })
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-0 text-white fs-8", children: video.title })
      ] })
    ] }) }, video.url)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: "No videos available at the moment." }) })
  ] }) });
};
const BlogShowcase = ({ post_data }) => {
  const { settings } = q().props;
  const sectionTitle = (settings == null ? void 0 : settings.blogs_section_title) || "Latest Posts";
  const buttonText = (settings == null ? void 0 : settings.blogs_button_text) || "Discover new posts";
  const buttonLink = (settings == null ? void 0 : settings.blogs_button_link) || "/posts";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "new-arrivals py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container ", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center justify-content-between mb-4 mb-lg-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-0", "data-aos": "fade-right", "data-aos-delay": "100", "data-aos-duration": "1000", children: sectionTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Je,
        {
          className: "btn btn-outline-extralight btn-white bg-white border text-dark d-none d-md-flex align-items-center gap-2",
          href: buttonLink,
          "data-aos": "fade-left",
          "data-aos-delay": "100",
          "data-aos-duration": "1000",
          children: buttonText
        }
      )
    ] }),
    post_data && post_data.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: post_data.map((post, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { post }, post.slug)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0", children: "No blog posts available at the moment." }) })
  ] }) });
};
function Index({
  users,
  auth,
  laravelVersion,
  phpVersion,
  puppy_spotlights,
  top_pick_puppy,
  trusted_breeders,
  new_arrivals,
  featured_breeds,
  post_data,
  videos
}) {
  const [userState, setUserState] = reactExports.useState("");
  reactExports.useEffect(() => {
    setUserState(users);
  }, [users]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Banner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: "Home" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-wrapper position-relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedBreeds, { featured_breeds: featured_breeds || [] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PuppySpotlight, { puppy_spotlights: puppy_spotlights || [] }),
      top_pick_puppy && /* @__PURE__ */ jsxRuntimeExports.jsx(TopPicks, { puppy: top_pick_puppy }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrustedBreeders, { breeders: trusted_breeders || [] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NewArrivals, { new_arrivals: new_arrivals || [] }),
      videos && videos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(FooterVideos, { videos }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BlogShowcase, { post_data: post_data || [] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-extralight  py-md-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryJumbotron, {}) }) })
    ] })
  ] }) });
}
export {
  Index as default
};

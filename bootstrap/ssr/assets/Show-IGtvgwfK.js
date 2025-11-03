import { r as reactExports, j as jsxRuntimeExports, a as je, q, f as fe } from "../ssr.js";
import { B as Button } from "./Button-C_TFTgI3.js";
import { L as Layout } from "./Layout-BlHTUbAr.js";
import PostCommentCard from "./PostCommentCard-C5LyY61Z.js";
import PostCommentForm from "./PostCommentForm-CPCOToLD.js";
import { F as FacebookShareButton, T as TwitterShareButton } from "./index-BZNbmzld.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { P as Pagination } from "./Pagination-DXd8plba.js";
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
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
import "./index-DbhDZzck.js";
import "net";
function CopyToClipboard({ link }) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: "#",
      rel: "nofollow",
      onClick: handleCopy,
      className: "btn btn-outline-extralight border btn-white text-dark d-flex align-items-center gap-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-link-dark.svg", alt: "Link Icon" }),
        copied ? "Copied!" : "Copy link"
      ]
    }
  );
}
const JsonLdArticle = ({ post }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "image": [post.banner_url],
    "datePublished": post.published_at,
    "dateModified": post.updated_at,
    "author": {
      "@type": "Person",
      "name": post.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "UrPuppy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://urpuppy.com/logo.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://urpuppy.com/posts/${post.slug}`
    },
    "description": post.excerpt
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(je, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "script",
    {
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
    }
  ) });
};
const Show = ({ post, comments, is_liked, is_unliked, url }) => {
  var _a, _b;
  const { props } = q();
  const user = props.auth.user;
  const currentUrl = `https://urpuppy.com/posts/${post.slug}`;
  const [localLikeCount, setLocalLikeCount] = reactExports.useState(post.like_count);
  const [localUnlikeCount, setLocalUnlikeCount] = reactExports.useState(post.unlike_count);
  const [localIsLiked, setLocalIsLiked] = reactExports.useState(is_liked);
  const [localIsUnliked, setLocalIsUnliked] = reactExports.useState(is_unliked);
  const handleReact = (type) => {
    const previousLikeCount = localLikeCount;
    const previousUnlikeCount = localUnlikeCount;
    const previousIsLiked = localIsLiked;
    const previousIsUnliked = localIsUnliked;
    if (type === "Like") {
      setLocalLikeCount(previousIsLiked ? previousLikeCount - 1 : previousLikeCount + 1);
      setLocalIsLiked(!previousIsLiked);
      if (previousIsUnliked) {
        setLocalUnlikeCount(previousUnlikeCount - 1);
        setLocalIsUnliked(false);
      }
    } else {
      setLocalUnlikeCount(previousIsUnliked ? previousUnlikeCount - 1 : previousUnlikeCount + 1);
      setLocalIsUnliked(!previousIsUnliked);
      if (previousIsLiked) {
        setLocalLikeCount(previousLikeCount - 1);
        setLocalIsLiked(false);
      }
    }
    fe.post(`/posts/${post.id}/react/${type}`, {}, {
      onSuccess: () => {
      },
      onError: () => {
        setLocalLikeCount(previousLikeCount);
        setLocalUnlikeCount(previousUnlikeCount);
        setLocalIsLiked(previousIsLiked);
        setLocalIsUnliked(previousIsUnliked);
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { navType: "secondary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { url: currentUrl, title: post.title, description: post.excerpt ?? post.title, image: post.banner_url }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(JsonLdArticle, { post }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "puppy-spotlight py-7 py-md-5 py-xl-9", id: "scroll-target", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { backgroundColor: "rgba(0, 122, 255, 0.1)", color: "rgba(0, 122, 255, 1)", fontWeight: "500" }, className: "btn py-1 mb-3", children: post.category.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-2", children: post.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fs-4", children: post.excerpt })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex flex-column flex-sm-column flex-md-row align-items-center justify-content-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex gap-3 mb-2", children: [
          ((_a = post.author) == null ? void 0 : _a.photo_url) ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { alt: post.author.name, src: (_b = post.author) == null ? void 0 : _b.photo_url, className: "rounded-circle object-fit-cover", width: "50", height: "50" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "34", height: "34", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", className: "rounded-circle icon icon-tabler icons-tabler-outline icon-tabler-user", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { style: { marginBottom: "unset" }, className: "btn-link fs-5 font-work-sans", children: post.author.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Author" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex justify-content-center align-items-center mb-2 gap-md-4 gap-3", style: { height: "24px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-time.svg", alt: "time", width: "18", height: "18" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { marginBottom: "0.5px" }, className: "fs-3", children: post.published_at_formatted })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "1px", background: "rgba(8, 49, 78, 0.4)", height: "12px" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                className: "bg-white border-0",
                onClick: (e) => {
                  e.preventDefault();
                  handleReact("Like");
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    style: { filter: localIsLiked ? "brightness(0) saturate(100%) invert(43%) sepia(91%) saturate(2636%) hue-rotate(195deg) brightness(96%) contrast(104%)" : "" },
                    src: "../images/svgs/icon-like.svg",
                    alt: "like",
                    width: "18",
                    height: "18"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { marginBottom: "0.5px" }, className: "fs-3", children: localLikeCount })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "1px", background: "rgba(8, 49, 78, 0.4)", height: "12px" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                className: "bg-white border-0",
                onClick: (e) => {
                  e.preventDefault();
                  handleReact("Unlike");
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-dislike.svg", alt: "dislike", width: "18", height: "18" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { marginBottom: "0.5px" }, className: "fs-3", children: localUnlikeCount })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "1px", background: "rgba(8, 49, 78, 0.4)", height: "12px" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "../images/svgs/icon-eye.svg", alt: "eye", width: "18", height: "18" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-0 fs-3", children: [
              post.view_count,
              " Views"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rounded-2 mb-4 mt-4",
          style: {
            backgroundImage: `url('${post.banner_url}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "500px"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "904px", margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: post.content } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 mt-8", style: { background: "rgba(8, 49, 78, 0.1)", width: "100%", height: "1px" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex mb-8 flex-column flex-md-row text-center", style: { justifyContent: "space-between" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fs-3 mt-4 mb-4", style: { color: "rgba(8, 49, 78, 0.8)" }, children: "Share this blog:" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex gap-2 justify-content-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CopyToClipboard, { link: currentUrl }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FacebookShareButton, { url: currentUrl, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { rel: "nofollow", href: "", "data-bs-toggle": "tooltip", "data-bs-title": "Instagram", className: "bg-white border bg-opacity-10 d-flex align-items-center justify-content-center round-40 rounded-circle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-facebook-dark.svg", alt: "facebook" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TwitterShareButton, { url: currentUrl, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { rel: "nofollow", href: "#", "data-bs-toggle": "tooltip", "data-bs-title": "Instagram", className: "bg-white border bg-opacity-10 d-flex align-items-center justify-content-center round-40 rounded-circle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: "/images/svgs/icon-twitter-dark.svg", alt: "twitter" }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", id: "comments", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-4", children: "Comments" }),
          user ? /* @__PURE__ */ jsxRuntimeExports.jsx(PostCommentForm, { post_id: post.id }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mb-4", href: "/register", children: "Signup to Comment" }),
          comments.data.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: comments.data.map((comment, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCommentCard, { comment }, index)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pagination, { links: comments.links, target: "comments" })
        ] }) })
      ] })
    ] }) })
  ] });
};
export {
  Show as default
};

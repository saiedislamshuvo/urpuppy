import { j as jsxRuntimeExports, q, r as reactExports } from "../ssr.js";
import { T as Tooltip } from "./Tooltip-BuYpnPkl.js";
import { A as Avatar } from "./Avatar-Bsv7zAP7.js";
import { V as Vt } from "./index-DzrIk5T7.js";
const SocialMediaButtons = ({ igUrl, xUrl, fbUrl, tiktokUrl, webUrl }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-unstyled d-flex align-items-center justify-content-center gap-6 social-icon mb-0", children: [
    fbUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        tooltipMessage: "Facebook",
        content: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            rel: "nofollow",
            target: "_blank",
            href: fbUrl,
            className: "border d-flex align-items-center justify-content-center round-36 rounded-circle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-facebook-dark.svg", alt: "urpuppy-img" })
          }
        ),
        id: `fburl`
      }
    ) }),
    xUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        tooltipMessage: "X",
        content: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            rel: "nofollow",
            target: "_blank",
            href: xUrl,
            "data-bs-toggle": "tooltip",
            "data-bs-title": "Twitter",
            className: "border d-flex align-items-center justify-content-center round-36 rounded-circle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-twitter-dark.svg", alt: "urpuppy-img" })
          }
        ),
        id: "xurl"
      }
    ) }),
    tiktokUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        tooltipMessage: "Tiktok",
        content: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            rel: "nofollow",
            target: "_blank",
            href: tiktokUrl,
            "data-bs-toggle": "tooltip",
            "data-bs-title": "Tiktok",
            className: "border d-flex align-items-center justify-content-center round-36 rounded-circle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-tiktok-dark.svg", alt: "urpuppy-img" })
          }
        ),
        id: "tiktokurl"
      }
    ) }),
    igUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        tooltipMessage: "Instagram",
        content: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            rel: "nofollow",
            target: "_blank",
            href: igUrl,
            "data-bs-toggle": "tooltip",
            "data-bs-title": "Instagram",
            className: "border d-flex align-items-center justify-content-center round-36 rounded-circle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-instagram-dark.svg", alt: "urpuppy-img" })
          }
        ),
        id: "igurl"
      }
    ) }),
    webUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        tooltipMessage: "Website",
        content: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            rel: "nofollow",
            target: "_blank",
            href: webUrl,
            "data-bs-toggle": "tooltip",
            "data-bs-title": "Website",
            className: "border d-flex align-items-center justify-content-center round-36 rounded-circle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-globe-dark.svg", alt: "urpuppy-img" })
          }
        ),
        id: "weburl"
      }
    ) })
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
const ChatButton = ({
  senderId,
  receiverId,
  puppyId,
  className
}) => {
  const { auth } = q().props;
  const currentUser = auth == null ? void 0 : auth.user;
  if ((currentUser == null ? void 0 : currentUser.id) === receiverId) {
    return null;
  }
  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify({
          receiver_id: receiverId,
          puppy_id: puppyId || null
        })
      });
      if (!response.ok) {
        const errorMessage = await getErrorMessage(response, "Failed to create chat");
        throw new Error(errorMessage);
      }
      const data = await response.json();
      const event = new CustomEvent("openChatPopup", {
        detail: {
          chatId: data.chat_id,
          otherUser: data.other_user || null
        }
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Error creating chat:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to start conversation. Please try again.";
      Vt.error(errorMessage);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: handleClick,
      className: className || "btn btn-primary w-100 hstack justify-content-center gap-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-mail-dark.svg", alt: "chat", width: "16", height: "16", style: { filter: "brightness(0) invert(1)" } }),
        "Chat"
      ]
    }
  );
};
const SellerCard = ({
  seller
}) => {
  const { auth } = q().props;
  const currentUser = auth == null ? void 0 : auth.user;
  const [emailVisible, setEmailVisible] = reactExports.useState(false);
  const [phoneVisible, setPhoneVisible] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center position-relative mb-6 mx-auto d-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { image_url: seller.avatar }),
      seller.is_breeder && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "position-absolute bottom-0 end-0 d-block round-24 rounded-circle bg-primary d-flex align-items-center justify-content-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-paws.svg", alt: "urpuppy-img", width: "16", height: "16" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "fs-5 text-center", children: seller.full_name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center justify-content-center gap-2 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-map-pin.svg", alt: "urpuppy-img", width: "20", height: "20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fs-2", children: seller.address })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center justify-content-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-user-dark.svg", alt: "urpuppy-img", width: "14", height: "14" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-0 fs-2", children: [
          "Member since: ",
          seller.member_since
        ] })
      ] }),
      (seller.is_breeder || seller.is_seller) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center justify-content-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-paws-dark.svg", alt: "paw-icon", width: "14", height: "14" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 fs-2", children: seller.is_breeder && seller.is_seller ? "Breeder & Seller" : seller.is_breeder ? "Breeder" : "Seller" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      !emailVisible ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          onClick: () => setEmailVisible(true),
          style: { userSelect: "text" },
          className: "btn btn-outline-extralight btn-white text-dark hstack justify-content-center gap-2 mb-6 pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-mail-dark.svg", alt: "urpuppy-img" }),
            "Show Email Address"
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: " btn-outline-extralight btn-white text-dark hstack justify-content-center gap-2 mb-6", children: seller.email }),
      !phoneVisible ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          onClick: () => setPhoneVisible(true),
          className: "btn btn-outline-extralight btn-white text-dark hstack justify-content-center gap-2 mb-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/images/svgs/icon-call.svg", alt: "urpuppy-img" }),
            "Show Phone Number"
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: " btn-outline-extralight btn-white text-dark hstack justify-content-center gap-2 mb-4", children: seller.phone_formatted }),
      currentUser && (seller == null ? void 0 : seller.id) && currentUser.id !== seller.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ChatButton,
        {
          senderId: currentUser.id,
          receiverId: seller.id,
          className: "btn btn-primary w-100 hstack justify-content-center gap-2 mb-4"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center", children: "Follow me:" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SocialMediaButtons,
      {
        igUrl: seller == null ? void 0 : seller.social_ig,
        xUrl: seller.social_x,
        fbUrl: seller.social_fb,
        tiktokUrl: seller.social_tiktok,
        webUrl: seller.website
      }
    )
  ] }) });
};
export {
  SellerCard as S
};

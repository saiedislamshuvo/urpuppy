import { q, r as reactExports, j as jsxRuntimeExports } from "../ssr.js";
import { D as DashboardLayout } from "./DashboardLayout-BM9ATkSy.js";
import { A as Avatar } from "./Avatar-Bsv7zAP7.js";
import { V as Vt } from "./index-DzrIk5T7.js";
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
import "./Layout-DRA0jG_Q.js";
import "./MetaTags-D4JDM_I7.js";
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
const ChatIndex = ({ chats: initialChats }) => {
  const { auth } = q().props;
  const currentUser = auth == null ? void 0 : auth.user;
  const [chats, setChats] = reactExports.useState(initialChats || []);
  const [selectedChatId, setSelectedChatId] = reactExports.useState(null);
  const [selectedChat, setSelectedChat] = reactExports.useState(null);
  const [messages, setMessages] = reactExports.useState([]);
  const [messageText, setMessageText] = reactExports.useState("");
  const [attachments, setAttachments] = reactExports.useState([]);
  const [attachmentFiles, setAttachmentFiles] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isSending, setIsSending] = reactExports.useState(false);
  const messagesEndRef = reactExports.useRef(null);
  const messagesContainerRef = reactExports.useRef(null);
  const fileInputRef = reactExports.useRef(null);
  const scrollToBottom = (force = false) => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    if (force || isNearBottom) {
      container.scrollTop = container.scrollHeight;
    }
  };
  reactExports.useEffect(() => {
    scrollToBottom(false);
  }, [messages]);
  reactExports.useEffect(() => {
    if (selectedChatId) {
      loadChat();
      setTimeout(() => scrollToBottom(true), 100);
    }
  }, [selectedChatId]);
  reactExports.useEffect(() => {
    if (!selectedChatId) return;
    const interval = setInterval(() => {
      loadChat();
    }, 2e4);
    return () => clearInterval(interval);
  }, [selectedChatId]);
  const loadChat = async () => {
    if (!selectedChatId) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/chat/${selectedChatId}`, {
        credentials: "same-origin"
      });
      const data = await response.json();
      setSelectedChat(data.chat);
      setMessages(data.messages);
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
    if (!messageText.trim() && attachments.length === 0 || !selectedChatId || isSending) {
      return;
    }
    setIsSending(true);
    try {
      const receiverId = (_a = selectedChat == null ? void 0 : selectedChat.other_user) == null ? void 0 : _a.id;
      if (!receiverId) {
        Vt.error("Cannot send message: receiver information is missing");
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
      const response = await fetch(`/api/chat/${selectedChatId}/message`, {
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
      setMessageText("");
      setAttachments([]);
      setAttachmentFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      await loadChat();
      setTimeout(() => scrollToBottom(true), 100);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to send message";
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
  const getLastMessagePreview = (chat) => {
    if (!chat.last_message) return "No messages yet";
    if (chat.last_message.has_attachments && !chat.last_message.message) {
      return "📎 Attachment";
    }
    return chat.last_message.message || "📎 Attachment";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { activeTab: "Chat", metaTitle: "Chat", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 mb-md-5", children: "Chat" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", style: { height: "600px", overflowY: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body p-0", children: chats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center text-muted", children: "No conversations yet" }) : chats.map((chat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onClick: () => setSelectedChatId(chat.id),
          className: `p-3 border-bottom cursor-pointer`,
          style: {
            cursor: "pointer",
            backgroundColor: selectedChatId === chat.id ? "#f5f5f5" : "transparent"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Avatar,
              {
                image_url: chat.other_user.avatar,
                initial_name: chat.other_user.name,
                size: "sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-grow-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex justify-content-between align-items-center mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-0", children: chat.other_user.name }),
                chat.unread_count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge bg-primary rounded-pill", children: chat.unread_count })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 text-muted small", style: {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }, children: getLastMessagePreview(chat) }),
              chat.last_message && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { className: "text-muted", children: new Date(chat.last_message.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              }) })
            ] })
          ] })
        },
        chat.id
      )) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-lg-8", children: selectedChatId && selectedChat ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card border", style: { height: "600px", display: "flex", flexDirection: "column" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header border-bottom d-flex align-items-center justify-content-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Avatar,
              {
                image_url: selectedChat.other_user.avatar,
                initial_name: selectedChat.other_user.name,
                size: "sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "mb-0", children: selectedChat.other_user.name }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                const event = new CustomEvent("openChatPopup", {
                  detail: {
                    chatId: selectedChatId,
                    otherUser: selectedChat.other_user
                  }
                });
                window.dispatchEvent(event);
              },
              className: "btn btn-sm btn-outline-primary d-flex align-items-center gap-1",
              title: "Open in popup",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 3V13M3 8H13", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "d-none d-md-inline", children: "Open in Popup" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: messagesContainerRef, className: "card-body flex-grow-1 overflow-auto p-3", children: [
          isLoading && messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted", children: "Loading..." }) : messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted", children: "No messages yet. Start the conversation!" }) : messages.map((message) => {
            const isOwnMessage = message.sender_id === (currentUser == null ? void 0 : currentUser.id);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `mb-3 d-flex ${isOwnMessage ? "justify-content-end" : "justify-content-start"}`,
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
                      message.attachments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2", children: message.attachments.map((attachment) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: attachment.file_path,
                          alt: attachment.file_name,
                          className: "img-fluid rounded",
                          style: { maxHeight: "200px" }
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
        ] }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-footer border-top p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex gap-2 align-items-center", children: [
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
        ] }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card border", style: { height: "600px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body d-flex align-items-center justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { children: "Select a conversation to start chatting" }) }) }) }) })
    ] })
  ] });
};
export {
  ChatIndex as default
};

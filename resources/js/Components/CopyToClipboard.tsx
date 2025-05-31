import { useState } from "react";

export default function CopyToClipboard({link} : {
    link: string
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <a
      href="#"
            rel='nofollow'
      onClick={handleCopy}
      className="btn btn-outline-extralight border btn-white text-dark d-flex align-items-center gap-2"
    >
      <img src="/images/svgs/icon-link-dark.svg" alt="Link Icon" />
      {copied ? "Copied!" : "Copy link"}
    </a>
  );
}


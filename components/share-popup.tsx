// components/SharePopup.tsx
"use client";

import { FC, useState, useEffect } from "react";
import { Copy, Check, X } from "lucide-react";
import {
  FaXTwitter,
  FaFacebook,
  FaPinterest,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa6";
import { type Collab } from "@/types"; // Make sure this path is correct
import { AnimatePresence, motion } from "framer-motion";

interface SharePopupProps {
  isOpen: boolean;
  onClose: () => void;
  collab: Pick<Collab, "title" | "slug" | "imageUrl">;
}

const SharePopup: FC<SharePopupProps> = ({ isOpen, onClose, collab }) => {
  const [hasCopied, setHasCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // Construct the full URL only on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/collab/${collab.slug}`);
    }
  }, [collab.slug]);

  // Reset copy state when popup is reopened
  useEffect(() => {
    if (isOpen) {
      setHasCopied(false);
    }
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(
    `Check out this collab: ${collab.title}`
  );
  const encodedImageUrl = encodeURIComponent(collab.imageUrl?.toString() || "");

  const socialPlatforms = [
    {
      name: "X",
      icon: FaXTwitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "Pinterest",
      icon: FaPinterest,
      url: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImageUrl}&description=${encodedTitle}`,
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  return (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 transition-opacity" />
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 , transition: { duration: 0.2 } }}
        exit={{ opacity: 0, y: 200 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-bold text-gray-900">
            Share this Collab
          </h2>
          <p className="mt-1 text-sm text-gray-500 truncate">
            Sharing: {collab.title}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center sm:grid-cols-5">
            {socialPlatforms.map(({ name, icon: Icon, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-lg p-3 text-gray-700 transition-colors hover:bg-gray-100"
              >
                <Icon size={32} />
                <span className="text-xs font-medium">{name}</span>
              </a>
            ))}
            {/* Special case for Instagram */}
            <button
              onClick={handleCopy}
              className="flex flex-col items-center gap-2 rounded-lg p-3 text-gray-700 transition-colors hover:bg-gray-100"
              title="Copy link for Instagram"
            >
              <FaInstagram size={32} />
              <span className="text-xs font-medium">Instagram</span>
            </button>
          </div>

          <div className="mt-8">
            <label
              htmlFor="share-link"
              className="text-sm font-medium text-gray-700"
            >
              Or copy link
            </label>
            <div className="mt-2 flex items-center gap-2">
              <input
                id="share-link"
                type="text"
                readOnly
                value={shareUrl}
                className="w-full py-1 px-2 border grow rounded-md border-gray-300 bg-gray-50 text-sm shadow-sm"
              />
              <button
                onClick={handleCopy}
                className={`flex shrink-0 items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors ${
                  hasCopied
                    ? "bg-green-600"
                    : "bg-yellow-600 hover:bg-yellow-700"
                }`}
              >
                {hasCopied ? <Check size={16} /> : <Copy size={16} />}
                {hasCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SharePopup;

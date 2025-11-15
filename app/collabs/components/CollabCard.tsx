// components/CollabCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { ThumbsUp, Eye, Globe, ArrowUp } from "lucide-react";
import { $Enums, Tag, UserTypes } from "@prisma/client"; // Ensure you import your prisma types
import { CollabForCard } from "@/app/actions/collabsOps";

// --- DEFINE THE EXPECTED PROPS ---
// This ensures type safety. Create a similar type where you fetch data.

interface CollabCardProps {
  item: CollabForCard;
}

const CollabCard: FC<CollabCardProps> = ({ item }) => {
  const CollabMedia = ({ src, alt }: { src: string | null; alt: string }) => {
    const isVideo = src?.endsWith(".mp4");
    const sourceUrl = src || "/images/main.jpg"; // Fallback image

    if (isVideo) {
      return (
        <video
          src={sourceUrl}
          autoPlay
          muted
          loop
          className="h-full w-full object-cover"
        />
      );
    }
    return (
      <img
        src={sourceUrl}
        alt={alt}
        style={{ objectFit: "cover" }}
        className="transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
    );
  };

  // A small component to render the user type with a specific style
  const UserTypePill = ({ type }: { type: UserTypes }) => {
    const styles = {
      Individual: "bg-blue-100 text-blue-800",
      Brand: "bg-purple-100 text-purple-800",
      Creator: "bg-green-100 text-green-800",
      Investor: "bg-yellow-100 text-yellow-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-sm font-bold uppercase ${
          styles[type] || "bg-gray-100 text-gray-800"
        }`}
      >
        {type}
      </span>
    );
  };

  return (
    // The main link wrapper
    <Link href={`/collabs/${item.slug}`}>
      <div className="group flex flex-col h-full overflow-hidden rounded-xl">
        {/* --- Image Section with Simplified Hover Effect --- */}
        <div className="relative w-full aspect-4/5 overflow-hidden">
          <CollabMedia src={item.imageUrl} alt={item.title} />

          {/* New Simplified Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 rounded-full border border-white/50 bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              <Globe size={16} />
              <span>Visit</span>
            </div>
          </div>
        </div>

        {/* --- Details Section (Always Visible Below Image) --- */}
        <div className="p-4 bg-white border-x border-b rounded-b-xl flex flex-col grow">
          {/* Top Row: User Type & Author */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <UserTypePill type={item.type} />
            {item.author && (
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-500">
                  {item.author.username}
                </p>
                <img
                  src={item.author.image || "/images/avatar-placeholder.png"}
                  alt={item.author.username || ""}
                  width={24}
                  height={24}
                  className="rounded-full aspect-square object-cover"
                />
              </div>
            )}
          </div>

          {/* Main Title */}
          <div className="flex justify-between p-3 items-center grow">
            <div>
              {" "}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              {/* Tags */}
              {item.tags?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag.name}
                      className="rounded-full bg-gray-100 px-3 py-2 text-xs text-gray-700"
                    >
                      #{tag.name.toLowerCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div
              className="text-4xl gap-1.5 grid"
              title={`${item.upvotes} upvotes`}
            >
              <span className="font-semibold">{item.upvotes}</span>
              <span className="text-sm text-gray-700">Upvotes</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollabCard;

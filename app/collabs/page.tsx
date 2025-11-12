"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ThumbsUp, Eye, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PinterestGrid from "@/components/gridsystem";
import { GridItem } from "@/components/gridsystem";
import { Tiro_Devanagari_Marathi } from "next/font/google";
import hangover from "@/public/hangover.svg";

export const Tiro_Devanagari_MarathiFont = Tiro_Devanagari_Marathi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-manjari",
});

import { Collab, CollabTag } from "@prisma/client";
import { fetchCollabs } from "../actions/collabsOps";
import { toastError } from "@/lib/toast";

export type CollabWithTags = Collab & { tags: CollabTag[] };

export default function GridPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [collabs, setCollabs] = useState<CollabWithTags[]>([]);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    window.location.href = `/collabs/search?query=${encodeURIComponent(query)}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    // Fetch collabs from the API
    const fetchData = async () => {
      const collabsData = await fetchCollabs();
      if (collabsData.data) setCollabs(collabsData.data);
      else toastError("Failed to load collabs", "Network Error");
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen  py-32 sm:py-44 text-center">
      <div className="mx-auto max-w-7xl">
        <h1
          className={`${Tiro_Devanagari_MarathiFont.className} text-4xl sm:text-5xl`}
        >
          Our Gallery
        </h1>
        <p className="max-w-sm mx-auto text-sm mb-8 mt-1 opacity-80">
          Explore a curated collection of collaborative projects and
          inspirations from our vibrant community.
        </p>

        {/* search bar */}
        <div className="mb-36 relative w-fit mx-auto  px-4 flex flex-col items-center">
          <div className="relative w-full min-w-sm">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search collabs"
              className="
        w-full rounded-full border bg-gray-300 border-gray-400
        px-4 py-3 text-gray-800 text-sm
        focus:border-gray-600 focus:outline-none
        shadow-sm transition z-10
      "
            />
          </div>
        </div>

        <PinterestGrid>
          {collabs.map((item, idx) => (
            <GridItem key={item.id}>
              <div
                onClick={() => setHoveredId(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative h-full w-full overflow-hidden rounded"
              >
                {item.imageUrl?.endsWith(".mp4") ? (
                  <video
                    src={item.imageUrl}
                    autoPlay
                    muted
                    loop
                    className="transition-transform duration-300 ease-in-out h-full aspect-video w-full object-cover mb-10 rounded-2xl"
                  />
                ) : (
                  <img
                    src={item.imageUrl || "/images/main.jpg"}
                    alt={item.title}
                    className="transition-transform max-h-96 duration-300 ease-in-out h-full w-full object-cover mb-10 rounded-2xl"
                  />
                )}

                {/* Hover overlay */}
                <AnimatePresence mode="wait">
                  {hoveredId === item.id && (
                    <motion.div
                      key="overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="
              absolute inset-0 flex flex-col justify-between
              bg-black/60 text-white transition-all duration-300 ease-in-out
              p-2 sm:p-6
            "
                    >
                      {/* --- TOP SECTION --- */}
                      <div className="text-left px-2 sm:px-0">
                        <h3 className="text-lg sm:text-2xl font-bold">
                          {item.title}
                        </h3>
                        {item.subtitle && (
                          <p className="text-xs sm:text-sm text-white/80 mt-1">
                            {item.subtitle}
                          </p>
                        )}
                      </div>

                      <div>
                        {/* --- BOTTOM SECTION --- */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3 sm:mt-0">
                          {/* Tags */}
                          {item.tags?.length ? (
                            <div className="flex flex-wrap gap-2">
                              {item.tags.map((tag: CollabTag) => (
                                <span
                                  key={tag.id}
                                  className="rounded-full bg-white/20 px-3 py-1 text-[10px] sm:text-xs"
                                >
                                  {tag.name}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div />
                          )}

                          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                            <Link
                              href={`/collabs/${item.slug}`}
                              className="group flex h-9 sm:h-10 px-3 items-center justify-center rounded-full border border-white/50"
                            >
                              <ArrowUpRight size={18} />
                              <span
                                className="
                        grid overflow-hidden whitespace-nowrap
                        transition-all duration-300 ease-in-out
                        max-w-0 group-hover:max-w-md
                        group-hover:ml-1 group-hover:pr-1
                      "
                              >
                                Visit
                              </span>
                            </Link>
                          </div>
                        </div>

                        {/* metrics */}
                        <div className="hidden md:flex items-center gap-3 text-xs sm:text-sm text-white/90 rounded-full bg-white/20 px-3 py-1 text-[10px] w-fit">
                          <div className="flex items-center gap-1">
                            <ThumbsUp size={14} className="text-blue-300" />
                            <span>{item.upvotes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye size={14} className="text-green-300" />
                            <span>{item.views}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <p>{item.title}</p>
            </GridItem>
          ))}
        </PinterestGrid>
      </div>
    </main>
  );
}

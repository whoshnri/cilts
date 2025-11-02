"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ThumbsUp, Eye, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PinterestGrid from "@/components/gridsystem";
import { GridItem } from "@/components/gridsystem";
import { Tiro_Devanagari_Marathi } from "next/font/google";

export const Tiro_Devanagari_MarathiFont = Tiro_Devanagari_Marathi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-manjari",
});

import image from "@/public/images/main.jpg";

const items = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  title: `Item #${i + 1}`,
  subtitle: "This is a sample subtitle for the item.",
  description:
    "This is a sample description for the item. It gives more context about what this gallery item represents and encourages user interaction.",
  link: "https://example.com",
  tags: ["Tag1", "Tag2", "Tag3"],
  imageUrl: image,
  upvotes: Math.floor(Math.random() * 500) + 10,
  views: Math.floor(Math.random() * 3000) + 100,
  comments: Math.floor(Math.random() * 100),
  span: Math.floor(Math.random() * (40 - 20 + 1)) + 20,
}));

export default function GridPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    if (!query.trim()) return;
    console.log("Searching for:", query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="min-h-screen  py-32 sm:py-44 text-center">
      <div className="mx-auto max-w-7xl">
        <h1
          className={`${Tiro_Devanagari_MarathiFont.className} text-4xl sm:text-5xl`}
        >
          Our Gallery
        </h1>
        <p className="max-w-sm mx-auto text-xs mb-8 mt-1 opacity-80">
          Explore a curated collection of collaborative projects and
          inspirations from our vibrant community.
        </p>

        {/* search bar */}
        <div className="mb-16 px-4 flex flex-col items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search collabs"
            className="
          w-full max-w-md rounded-full border border-gray-300
          px-4 py-2 text-gray-800 text-sm
          focus:border-yellow-500 focus:outline-none
          shadow-sm transition
        "
          />

          <p className="mt-2 text-xs text-gray-500">
            Press <kbd className="text-yellow-600">Enter</kbd> to search
          </p>
        </div>

        <PinterestGrid>
          {items.map((item) => (
            <GridItem key={item.id} span={item.span}>
              <div
                onClick={() => setHoveredId(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative h-full w-full overflow-hidden rounded"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                  placeholder="blur"
                  className="transition-transform duration-300 ease-in-out hover:scale-105 h-full "
                />

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
                              {item.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-white/20 px-3 py-1 text-[10px] sm:text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div />
                          )}

                          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                            {/* Metrics */}

                            {/* Visit Button */}
                            {item.link && (
                              <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
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
                            )}
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
                          <div className="flex items-center gap-1">
                            <MessageCircle
                              size={14}
                              className="text-yellow-300"
                            />
                            <span>{item.comments}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </GridItem>
          ))}
        </PinterestGrid>
      </div>
    </main>
  );
}

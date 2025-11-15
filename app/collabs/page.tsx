// app/gallery/page.tsx (or wherever your GridPage is)
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PinterestGrid, { GridItem } from "@/components/gridsystem"; // Your masonry components
import { Tiro_Devanagari_Marathi } from "next/font/google";
import CollabCard from "@/app/collabs/components/CollabCard";
import { fetchCollabs, CollabForCard } from "../actions/collabsOps";
import { toastError } from "@/lib/toast";

export const Tiro_Devanagari_MarathiFont = Tiro_Devanagari_Marathi({
  subsets: ["latin"],
  weight: "400",
});


export default function GridPage() {
  const router = useRouter(); // Use the App Router's hook
  const [collabs, setCollabs] = useState<CollabForCard[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const spanPattern = [28, 35, 42, 31, 38];
  // Search handlers
  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await fetchCollabs();
      if (result.data) {
        setCollabs(result.data);
      } else {
        toastError("Failed to Load", result.message || "Could not fetch collaborations.");
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen py-32 sm:py-44 text-center">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className={`${Tiro_Devanagari_MarathiFont.className} text-4xl sm:text-5xl`}>
          The Gallery
        </h1>
        <p className="max-w-md mx-auto text-sm mb-12 mt-2 opacity-80">
          Explore a curated collection of collaborative projects and inspirations from our vibrant community.
        </p>

        <div className="mb-20 mx-auto max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search all collabs..."
            className="w-full rounded-full border bg-gray-100 border-gray-300 px-5 py-3 text-gray-800 text-sm focus:border-black focus:ring-black focus:outline-none shadow-sm transition"
          />
        </div>

        {/* --- LOADING STATE --- */}
        {isLoading ? (
          <LoadingSkeletons />
        ) : (
          <PinterestGrid>
            {collabs.map((item, index) => {
              const span = spanPattern[index % spanPattern.length];
              return (
                <GridItem key={item.id} span={span}>
                  <CollabCard item={item} />
                </GridItem>
              );
            })}
          </PinterestGrid>
        )}
      </div>
    </main>
  );
}

// --- LOADING SKELETON COMPONENT ---
const LoadingSkeletons = () => {
  const spanPattern = [28, 35, 42, 31, 38];
  return (
    <PinterestGrid>
      {Array.from({ length: 9 }).map((_, index) => {
        const span = spanPattern[index % spanPattern.length];
        return (
          <GridItem key={index} span={span}>
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        </GridItem>
      );
    })}
  </PinterestGrid>
)}
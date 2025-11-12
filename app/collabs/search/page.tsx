"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { getRecentCollabs, searchCollabs } from "@/app/actions/searchOps";
import { Prisma } from "@prisma/client";
import { use } from "react";
import { Suspense } from "react";

type CollabWithDetails = Prisma.CollabGetPayload<typeof collabWithDetails>;
const collabWithDetails = Prisma.validator<Prisma.CollabDefaultArgs>()({
  include: {
    author: { select: { username: true, image: true } },
    _count: { select: { comments: true } },
  },
});

export default function SearchResultsPage() {
  return(
  <Suspense>
    <ResultsPage />
  </Suspense>
);
}

export function ResultsPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";

  const [collabs, setCollabs] = useState<CollabWithDetails[] | null>(null);
  const [headingText, setHeadingText] = useState("");
  const [subText, setSubText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [offset, setOffset] = useState(0); // For pagination if needed

  useEffect(() => {
    startTransition(() => {
      setIsLoading(true);

      const fetchData = async () => {
        if (query) {
          const results = await searchCollabs(query, offset);
          if (results !== null && results.length > 0) {
            setHeadingText(`Results for "${query}"`);
            setSubText(null);
            setCollabs(results);
          } else {
            setHeadingText(`No results for "${query}"`);
            setSubText(
              "Try a different search, or explore some of our recent collabs below."
            );
            // Fetch fallback content
            const fallbackCollabs = await getRecentCollabs();
            setCollabs(fallbackCollabs);
          }
        } else {
          setHeadingText("Explore Collaborations");
          setSubText("Browse the latest ideas from our community.");
          const recentCollabs = await getRecentCollabs();
          setCollabs(recentCollabs);
        }
      };

      fetchData().finally(() => setIsLoading(false));
    });
  }, [query]);

  return (
    <div className="container mx-auto py-24 sm:py-32 px-4">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {headingText ? headingText : "Loading..."}
        </h1>
        {subText && (
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            {subText ? subText : ""}
          </p>
        )}
      </div>
      {isLoading ? <LoadingSkeleton /> : <CollabGrid collabs={collabs} />}
    </div>
  );
}

// ===================================
//  UI Sub-components
// ===================================

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="bg-white/80 border rounded-xl shadow-sm animate-pulse"
      >
        <div className="aspect-video bg-gray-200"></div>
        <div className="p-5">
          <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-full mt-3 bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 mt-2 bg-gray-200 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

const CollabGrid = ({ collabs }: { collabs: CollabWithDetails[] | null }) => {
  if (!collabs || collabs.length === 0) {
    return <p className="text-gray-500">No collaborations found.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {collabs.map((collab) => (
        <CollabCard key={collab.id} collab={collab} />
      ))}
    </div>
  );
};

const CollabMedia = ({ src, alt }: { src: string | null; alt: string }) => {
  const isVideo = src?.endsWith(".mp4");
  const sourceUrl = src || "/images/placeholder.jpg"; // Provide a default placeholder

  return (
    <div className="absolute inset-0 w-full h-full">
      {isVideo ? (
        <video
          src={sourceUrl}
          autoPlay
          muted
          loop
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={sourceUrl}
          alt={alt}
          style={{ objectFit: "cover" }}
          className="group-hover:scale-105 transition-transform duration-300"
        />
      )}
    </div>
  );
};

const CollabCard = ({ collab }: { collab: CollabWithDetails }) => {
  return (
    <Link href={`/collab/${collab.slug}`} className="group block">
      <div className="flex flex-col h-full bg-white border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1">
        <div className="relative aspect-video">
          <CollabMedia src={collab.imageUrl} alt={collab.title} />
        </div>
        <div className="flex flex-col grow p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-black">
            {collab.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {collab.subtitle}
          </p>
          <div className="grow"></div>
          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            {collab.author ? (
              <div className="flex items-center gap-2">
                <img
                  src={collab.author.image || "/images/avatar-placeholder.png"}
                  alt={collab.author.username || "Author"}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <p className="text-xs font-medium text-gray-500">
                  {collab.author.username}
                </p>
              </div>
            ) : (
              <div />
            )}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {/* CRITICAL FIX: Accessing upvotes from the _count object */}
              <span className="flex items-center gap-1">
                <Heart size={14} /> {collab.upvotes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={14} /> {collab._count.comments}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

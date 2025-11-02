// components/MyWorks.tsx
"use client";

import { FC, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { type EmblaOptionsType } from "embla-carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectCard, { Project } from "./collabcardHome";

// Import your images
import snowyMountain from "@/public/images/main.jpg";
import swirlingOcean from "@/public/images/main.jpg";
import sandDunes from "@/public/images/main.jpg";
import rockyCoast from "@/public/images/main.jpg";

// Define the data for the projects
const projects: Project[] = [
  {
    id: 1,
    title: "Frozen Lakes",
    description: "Discovering the serene beauty of winter landscapes.",
    image: snowyMountain,
    tags: ["Landscape", "Winter"],
    link: "/collabs/this-is-a-test-collab",
  },
  {
    id: 2,
    title: "Ocean's Fury",
    description: "The raw power and mesmerizing patterns of the sea.",
    image: swirlingOcean,
    tags: ["Ocean", "Aerial"],
    link: "/collabs/this-is-a-test-collab"
  },
  {
    id: 3,
    title: "Dancing Dunes",
    description:
      "Capturing the breathtaking beauty of sand dunes through artistic lensmanship.",
    image: sandDunes,
    tags: ["Photography", "Art Direction"],
    link: "/collabs/this-is-a-test-collab"
  },
  {
    id: 4,
    title: "Coastal Guardians",
    description: "Ancient rock formations standing tall against the tides.",
    image: rockyCoast,
    tags: ["Coastline", "Nature"],
    link: "/collabs/this-is-a-test-collab"
  },
  {
    id: 5,
    title: "Mountain Majesty",
    description: "The silent grandeur of towering peaks.",
    image: snowyMountain,
    tags: ["Mountains", "Adventure"],
    link: "/collabs/this-is-a-test-collab"
  },
  {
    id: 6,
    title: "Desert Waves",
    description: "Ripples of sand stretching to the horizon.",
    image: sandDunes,
    tags: ["Desert", "Travel"],
    link: "/collabs/this-is-a-test-collab"
  },
];

// Define Embla carousel options for better readability
const emblaOptions: EmblaOptionsType = {
  align: "start",
};

const MyWorks: FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="w-full max-w-6xl mx-auto rounded-t-4xl bg-[#f4f4f4] py-20 mt-20 px-4 sm:px-7">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Moved Prev button to the left for mobile consistency */}
          <button
            onClick={scrollPrev}
            className="group hidden h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:bg-gray-800 hover:text-white md:flex"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="max-w-md text-center">
            <h2 className={`font-serif text-4xl sm:text-5xl font-medium text-gray-800`}>
              Featured Collabs
            </h2>
            <p className="mt-4 text-sm text-gray-600">
              Explore some of the most exciting collaborations pitched by our
              community. Upvote your favorites and help shape the future of
              culture!
            </p>
          </div>
          <button
            onClick={scrollNext}
            className="group hidden h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:bg-gray-800 hover:text-white md:flex"
          >
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Carousel Viewport: CRITICAL FIX - Must be 'overflow-hidden' */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* Carousel Track */}
          <div className="flex gap-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="shrink-0 basis-full md:basis-1/2 lg:basis-1/3"
                onMouseEnter={() => setHoveredItemId(project.id)}
                onMouseLeave={() => setHoveredItemId(null)} // Reset hover on leave
              >
                <ProjectCard project={project} hoveredItemId={hoveredItemId} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="mt-8 flex justify-center gap-4 md:hidden">
          <button
            onClick={scrollPrev}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:bg-gray-800 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:bg-gray-800 hover:text-white"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyWorks;

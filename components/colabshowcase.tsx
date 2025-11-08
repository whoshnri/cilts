// components/MyWorks.tsx
"use client";

import { FC, useCallback, useState, useEffect, use } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { type EmblaOptionsType } from "embla-carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectCard, { Project } from "./collabcardHome";
import { fetchFeaturedCollabs } from "@/app/actions/collabsOps";


// Define Embla carousel options for better readability
const emblaOptions: EmblaOptionsType = {
  align: "start",
};

const MyWorks: FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);


  useEffect(() => {
    const fetchProjects = async () => {
      const data = await fetchFeaturedCollabs()
      if( data.status === "success" ) {
        const projs = data.data
        setProjects(projs)
      }
    };

    fetchProjects();
  }, []);



  return (
    <section className="w-full max-w-8xl mx-auto rounded-t-4xl bg-white py-20 mt-20 px-4 sm:px-7">
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
        <div className="overflow-hidden max-w-5xl mx-auto" ref={emblaRef}>
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

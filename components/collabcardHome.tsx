import Image, { StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FC } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  tags: string[];
  link?: string;
}

interface ProjectCardProps {
  project: Project;
  hoveredItemId: number | null;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, hoveredItemId }) => {
  return (
    <div className="relative h-96 w-full shrink-0 overflow-hidden rounded-3xl">
      <Image
        src={project.image}
        alt={project.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 ease-in-out"
        placeholder="blur"
      />
      {/* Render overlay and text only if the card is active */}
      {project.id === hoveredItemId && (
        <AnimatePresence mode="wait">
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
         className="absolute inset-0 flex flex-col justify-between bg-black/60 p-6 text-white transition-all duration-300 ease-in-out">
          <div>
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <p className="mt-2 max-w-xs text-sm text-white/80">
              {project.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/20 px-3 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* --- MODIFIED LINK ELEMENT --- */}
            <Link
              href={project.link || "#"}
              className="group flex h-10 px-3 items-center justify-center rounded-full border border-white/50"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Icon */}
              <div className="">
                <ArrowUpRight size={20} />
              </div>

              {/* Text that slides out on hover */}
              <span
                className="
                  grid
                  overflow-hidden
                  whitespace-nowrap
                  transition-all duration-300 ease-in-out
                  max-w-0
                  group-hover:max-w-md
                  group-hover:ml-1
                  group-hover:pr-1
                "
              >
                Visit
              </span>
            </Link>
          </div>
        </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ProjectCard;
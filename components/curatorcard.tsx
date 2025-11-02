// components/CuratorCard.tsx
import { FC } from "react";
import Image, { StaticImageData } from "next/image";
import logo from "@/public/logo.svg";
import curatorImage from "@/public/images/main.jpg";

const CuratorCard: FC = () => {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto max-w-4xl">
        {/* Main card container */}
        <div className="relative rounded-t-3xl md:rounded-3xl bg-[#f5f3ef] px-8 py-10 md:py-4">
          
          {/* Decorative SVG Arc in the corner */}
          <svg
            className="absolute top-0 right-0 h-48 w-48 opacity-50"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M200 100C200 44.7715 155.228 0 100 0"
              stroke="#1E1E1E"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <circle cx="177" cy="23" r="4" fill="#1E1E1E" />
          </svg>

          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
            
            {/* Curator Image with Gradient Background */}
            <div className="w-48 shrink-0 rounded-2xl bg-linear-to-br from-yellow-300 to-zinc-400 p-2 md:w-56">
              <Image
                src={curatorImage}
                alt={`Photo of Timmy`}
                className="h-full w-full rounded-xl object-cover"
                placeholder="blur"
              />
            </div>

            {/* Curator Details */}
            <div className="flex flex-col text-center md:text-left">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
                Meet the Curator
              </h2>
              <p className="font-serif text-2xl font-medium text-gray-800 md:text-3xl">
                "{`Curating ideas that shape the future.`}"
              </p>
              <div className="mt-8 flex items-center justify-center gap-4 md:justify-start">
                <Image
                  src={logo}
                  alt={`Logo`}
                  className="h-6 w-auto"
                />
                <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  {`Timmy, Curator`}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratorCard;
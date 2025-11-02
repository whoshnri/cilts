

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyWorks from "@/components/colabshowcase";
import NewsletterSignup from "@/components/newletter";
import CuratorCard from "@/components/curatorcard";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center relative overflow-hidden px-4 pt-32  md:pt-44 py-10 sm:px-6 lg:px-8">
        {/* landing image */}
       
        <main className="text-center max-w-2xl">
          <p className="border rounded-full w-fit px-3 py-1 flex items-center justify-center text-sm font-bold mb-8 mx-auto gap-2 bg-yellow-500 text-white border-black/30">
            <AutoAwesomeIcon fontSize="small" />
            First of its kind
          </p>
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-serif`}
          >
            If it should exist, it will.
          </h1>

          <p className="mt-5 text-base sm:text-lg font-semibold text-[#3d3d3d] max-w-md mx-auto">
            Pitch dream collabs. Upvote what matters. Shape culture.
          </p>
        <div className="flex items-center gap-2 justify-center mt-8  ">
          <Link
            href={"/collabs"}
            className="text-xs sm:text-sm rounded-lg text-yellow-600 bg-white group cursor-pointer w-fit px-2 font-semibold py-3.5  hover:bg-white/80 hover:text-yellow-600"
          >
            Explore Pitches
          </Link>
          <Link
            href={"/collabs/new"}
            className="text-xs sm:text-sm rounded-lg bg-yellow-600 text-white group cursor-pointer w-fit px-2 font-semibold py-3.5 hover:bg-yellow-700 hover:text-white"
          >
            Create a Pitch
          </Link>
          </div>
        </main>
      </div>


      {/* collab showcase */}
      <MyWorks />


      {/* newsletter signup */}
      <NewsletterSignup />


      {/* curator card */}
      <CuratorCard

      />
    </>
  );
}
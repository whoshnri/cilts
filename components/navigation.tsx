// components/Navigation.tsx
"use client";

import Image from "next/image";
import logo from "@/public/logo.svg";
import { SearchIcon, X, Menu } from "lucide-react";
import { useState, useRef, useEffect, FC, RefObject } from "react";
import { gsap } from "gsap";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick"; // Adjust the path as needed
import Link from "next/link";

const Navigation: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close search bar on outside click
  useOutsideClick(searchRef as RefObject<HTMLDivElement>, () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
  });

  // Close mobile menu on outside click
  useOutsideClick(navRef as RefObject<HTMLElement>, () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  });

  // GSAP animation for the search bar
  useEffect(() => {
    if (isSearchOpen) {
      gsap.to(searchRef.current, {
        width: "200px", // Animate to a fixed width or percentage
        padding: "0.5rem 1rem",
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(searchRef.current, {
        width: "2.5rem", // 40px (same as h-10 w-10)
        padding: "0.5rem",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isSearchOpen]);

  // GSAP animation for the mobile menu dropdown
  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.3, ease: "power2.inOut" }
      );
    }
  }, [isMenuOpen]);

  return (
    <nav className="w-full fixed top-5 left-0 z-50 " ref={navRef}>
      <div className="max-w-6xl mx-auto py-3 px-4 sm:px-6 flex md:grid md:grid-cols-3 justify-between items-center">
        {/* Left: Logo */}
        <Link href={"/"} className="flex items-center w-fit rounded-xl">
          <Image src={logo} alt="Logo" className="h-4 md:h-8 w-auto" priority />
        </Link>

        {/* Center: Nav links (Desktop) */}
        <div className="hidden md:flex grow items-center justify-center ">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search collabs"
              className="border-gray-100 border text-sm outline-none placeholder:text-gray-500 w-full py-2 px-4 rounded-full focus:ring-1 focus:ring-yellow-50 focus:border-transparent backdrop-blur-2xl"
            />
            <SearchIcon className="absolute h-5 w-5 text-gray-500 top-1/2 right-4 transform -translate-y-1/2" />
          </div>
        </div>

        {/* Right: Auth buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium md:justify-self-end-safe">
          <Link
            href={"/collabs"}
            className="text-gray-700 bg-transparent rounded-xl p-2 backdrop-blur-2xl px-2  hover:underline cursor-pointer transition"
          >
            Collabs
          </Link>
          <Link
            href={"/auth"}
            className="text-gray-700 bg-transparent rounded-xl p-2 backdrop-blur-2xl px-2  hover:underline cursor-pointer transition"
          >
            Sign in
          </Link>
          <Link
            href={"/leaderboard"}
            className="bg-yellow-500 backdrop-blur-2xl text-white px-5 py-2 rounded-md hover:bg-yellow-600 cursor-pointer transition"
          >
            Leaderboard
          </Link>
        </div>

        {/* Mobile: Search and Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <div
            ref={searchRef}
            className="relative h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 overflow-hidden"
          >
            <input
              type="text"
              className={`bg-transparent outline-none w-full h-full text-xs ${
                isSearchOpen ? "block" : "hidden"
              }`}
              placeholder="Search collabs"
            />
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              {isSearchOpen ? <X size={20} /> : <SearchIcon size={20} />}
            </button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full -z-10 left-0 right-0 rounded-xl mx-auto bg-white backdrop-blur-2xl shadow-lg p-6"
        >
          <div className="flex flex-col items-center gap-6 text-lg font-medium">
             <Link
            href={"/collabs"}
            className="text-gray-700 hover:underline cursor-pointer transition border-b pb-2 w-full "
          >
            Collabs
          </Link>
            <Link
              href={"/auth"}
              className="text-gray-700 hover:underline cursor-pointer transition border-b pb-2 w-full "
            >
              Sign in
            </Link>
            <Link
              href={"/leaderboard"}
              className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 cursor-pointer transition w-full"
            >
              Leaderboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

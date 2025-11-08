// components/Navigation.tsx
"use client";

import Image from "next/image";
import logo from "@/public/logo.svg";
import { SearchIcon, X, Menu, User2Icon } from "lucide-react";
import { useState, useRef, useEffect, FC, RefObject } from "react";
import { gsap } from "gsap";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick"; // Adjust the path as needed
import Link from "next/link";
import { getCurrentUser, logoutUser } from "@/app/actions/authOps";
import { User } from "@prisma/client";

const Navigation: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);

  useOutsideClick(searchRef as RefObject<HTMLDivElement>, () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
  });

  useEffect(() => {
    async function checkLoginStatus() {
      const user = await getCurrentUser();

      if (user) {
        setLoggedIn(true);
        setUser(user);
      } else {
        setLoggedIn(false);
      }
    }

    checkLoginStatus();
  }, []);

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
  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.status !== "success") {
      alert("Logout failed. Please try again.");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <nav
      ref={navRef}
    >
      <div className="max-w-6xl mx-auto py-3 px-4 sm:px-6 flex md:grid md:grid-cols-3 justify-between items-center ">
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
            className="text-gray-700 bg-transparent rounded-xl p-2 backdrop-blur-2xl px-2  hover:bg-white/80 cursor-pointer transition"
          >
            Collabs
          </Link>
          {!loggedIn && (
            <Link
              href={"/auth"}
              className="text-gray-700 bg-transparent rounded-xl p-2 backdrop-blur-2xl px-2  hover:bg-white/80 cursor-pointer transition"
            >
              Sign in
            </Link>
          )}
          <Link
            href={"/leaderboard"}
            className="bg-black backdrop-blur-2xl text-white px-5 py-2 rounded-md hover:bg-black/80 cursor-pointer transition"
          >
            Leaderboard
          </Link>
          {/* user name if logged in */}
          {loggedIn && (
            <Link
              href={"/profile"}
              className={`text-gray-700 bg-transparent rounded-xl w-10 h-10 backdrop-blur-2xl ${
                user?.image ? "p-1" : "p-2.5"
              }  hover:bg-white/80 cursor-pointer transition`}
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt="User Avatar"
                  className="w-full h-full rounded-full"
                />
              ) : (
                <User2Icon className="w-full h-full text-black" />
              )}
            </Link>
          )}
        </div>

        {/* Mobile: Search and Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <div
            ref={searchRef}
            className="relative h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 overflow-hidden"
          >
            <input
              type="text"
              className={`bg-transparent backdrop-blur-2xl outline-none w-full h-full text-xs ${
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
          {loggedIn && (
            <Link
              href={"/profile"}
              className="text-gray-700 bg-transparent rounded-xl p-2 backdrop-blur-2xl px-2  hover:bg-white/80 cursor-pointer transition"
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt="User Avatar"
                  className="w-5 h-5 rounded-full"
                />
              ) : (
                <User2Icon className="w-5 h-5 text-black" />
              )}
            </Link>
          )}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full -z-10 left-0 right-0 rounded-xl mx-auto bg-zinc-200 backdrop-blur-2xl shadow-lg p-6"
        >
          <div className="flex flex-col items-center gap-6 text-lg font-medium">
            <Link
              href={"/collabs"}
              className="text-gray-700 hover:bg-white/80 cursor-pointer transition border-b pb-2 w-full "
            >
              Collabs
            </Link>
            {!loggedIn && (
              <Link
                href={"/auth"}
                className="text-gray-700 hover:bg-white/80 cursor-pointer transition border-b pb-2 w-full "
              >
                Sign in
              </Link>
            )}
            <Link
              href={"/leaderboard"}
              className="text-gray-700 hover:bg-white/80 cursor-pointer transition border-b pb-2 w-full"
            >
              Leaderboard
            </Link>
            {loggedIn && <button
              onClick={handleLogout}
              className={`w-full text-left bg-red-500 text-white hover:bg-red-600 cursor-pointer font-semibold p-3 rounded-lg transition-colors `}
            >
              Log Out
            </button>}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

// components/Footer.tsx
"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Github, Linkedin } from "lucide-react";

// Assuming you have a logo file in your public directory
import logo from "@/public/logo.svg";

const Footer: FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Thank you for subscribing!");
  };

  return (
    <footer className="bg-white text-gray-800 rounded-t-3xl">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-16 md:grid-cols-12">
          
          {/* Column 1: Logo, Mission, and Socials */}
          <div className="md:col-span-12 lg:col-span-4">
            <Link href="/" className="mb-6 inline-block">
              <Image src={logo} alt="CILTS Logo" width={100} height={40} />
            </Link>
            <p className="mb-6 max-w-sm text-sm text-gray-600">
              A platform to pitch dream collaborations, upvote what matters, and shape the future of culture.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-gray-500 transition-colors hover:text-yellow-600" />
              </Link>
              <Link href="#" aria-label="GitHub">
                <Github className="h-6 w-6 text-gray-500 transition-colors hover:text-yellow-600" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-gray-500 transition-colors hover:text-yellow-600" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-4 lg:col-span-4">
            <p className="mb-4 font-semibold tracking-wide">Quick Links</p>
            <ul className="space-y-3 text-sm">
              <li><Link href="/careers" className="text-gray-600 transition-colors hover:text-yellow-600 hover:underline">Collabs Library</Link></li>
              <li><Link href="/leaderboard" className="text-gray-600 transition-colors hover:text-yellow-600 hover:underline">Leaderboard</Link></li>
              <li><Link href="/contact" className="text-gray-600 transition-colors hover:text-yellow-600 hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="md:col-span-4 lg:col-span-4">
            <p className="mb-4 font-semibold tracking-wide">Stay in the Loop</p>
            <p className="mb-4 text-sm text-gray-600">
              Join our newsletter to get the latest updates and featured collaborations.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  placeholder="Enter your email"
                  required
                  type="email"
                  className="w-full grow rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
                <button
                  type="submit"
                  className="rounded-md bg-yellow-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-yellow-700"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col-reverse justify-between border-t pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CILTS, Inc. All rights reserved.
          </p>
          <div className="mb-4 flex space-x-6 text-sm text-gray-600 sm:mb-0">
            <Link href="/terms" className="hover:text-yellow-600 hover:underline">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-yellow-600 hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
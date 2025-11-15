// components/Footer.tsx
"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Github, Linkedin } from "lucide-react";
import { toastSuccess} from '@/lib/toast'
import logo from "@/public/logo.svg";

const Footer: FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    if(email) {
      toastSuccess("Subscribed!", `Thank you, ${email} has been added to our mailing list.`);
      event.currentTarget.reset(); // Clear the form
    }
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
              <Link href="#" aria-label="Twitter"><Twitter className="h-6 w-6 text-gray-500 transition-colors hover:text-black" /></Link>
              <Link href="#" aria-label="GitHub"><Github className="h-6 w-6 text-gray-500 transition-colors hover:text-black" /></Link>
              <Link href="#" aria-label="LinkedIn"><Linkedin className="h-6 w-6 text-gray-500 transition-colors hover:text-black" /></Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-4 lg:col-span-4">
            <p className="mb-4 font-semibold tracking-wide">Quick Links</p>
            <ul className="space-y-3 text-sm">
              <li><Link href="/library" className="text-gray-600 transition-colors hover:text-black hover:underline">Collabs Library</Link></li>
              <li><Link href="/leaderboard" className="text-gray-600 transition-colors hover:text-black hover:underline">Leaderboard</Link></li>
              <li><Link href="/contact" className="text-gray-600 transition-colors hover:text-black hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Newsletter Signup */}
          <div className="md:col-span-4 lg:col-span-4">
            <p className="mb-4 font-semibold tracking-wide">Stay in the Loop</p>
            <p className="mb-4 text-sm text-gray-600">Join our newsletter to get the latest updates and featured collaborations.</p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input name="email" placeholder="Enter your email" required type="email" className="w-full grow rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-black focus:ring-black" />
                <button type="submit" className="rounded-md bg-black px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        {/* --- NEW: Disclaimer & IP Notice Section --- */}
        <div className="mt-16 border-t pt-10">
            <h2 className="font-semibold text-base text-gray-800 mb-4">Disclaimer & IP Notice</h2>
            <div className="text-xs text-gray-500 space-y-3">
                <p>
                    All concepts featured on Collabs I’d Love To See (CILTS) are community-generated and intended for creative inspiration only. Unless stated otherwise, CILTS has no direct affiliation with the brands, artists, or entities mentioned. All trademarks, visuals, and names remain the exclusive property of their rightful owners.
                </p>
                <p>
                    By submitting an idea, contributors retain full ownership of their IP, grant CILTS a non-exclusive license to display the concept, and may request removal at any time via <Link href="mailto:legal@cilts.co" className="font-semibold text-gray-600 hover:text-black hover:underline">legal@cilts.co</Link>. CILTS does not commercialize user ideas without explicit consent. Any infringement claims will be reviewed within 7 working days in accordance with global IP protection laws.
                </p>
            </div>
        </div>


        {/* Final Bottom Bar */}
        <div className="mt-12 flex flex-col-reverse justify-between border-t pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Collabs I’d Love To See. All Rights Reserved.
          </p>
          <div className="mb-4 flex space-x-6 text-sm text-gray-600 sm:mb-0">
            <Link href="/terms" className="hover:text-black hover:underline">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-black hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
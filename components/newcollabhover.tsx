"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AddCollabButton() {
  return (
    <Link href="/collabs/new">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        className="
          fixed bottom-8 right-8
          z-100
          flex h-14 w-14 items-center justify-center
          rounded-xl bg-black text-white shadow-lg
          cursor-pointer transition-all duration-300 ease-in-out
          hover:bg-black/90
        "
      >
        <Plus size={26} strokeWidth={2.5} />
      </motion.div>
    </Link>
  );
}

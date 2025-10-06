"use client";

import { motion } from "framer-motion";

export default function UpcomingEvent() {
  return (
    <div className="w-full bg-[#C4A54A] text-white py-2 overflow-hidden">
      <motion.div
        className="whitespace-nowrap text-md"
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 60,
          ease: "linear",
        }}
      >
        UPCOMING EVENT IN DECEMBER 2025 — Donation of back packs, exercise
        books, pencil cases, pens, pencils, and other writing aids to 200 pupils
        — ESTIMATED COST: GHS 47,000.00 (≈ USD 3,900)
      </motion.div>
    </div>
  );
}

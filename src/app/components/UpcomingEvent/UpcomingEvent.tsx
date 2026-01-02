"use client";

import { motion } from "framer-motion";

interface UpcomingEventProps {
  content?: string;
}

export default function UpcomingEvent({ content }: UpcomingEventProps) {
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
        {content ||
          "UPCOMING EVENT — Details will be announced soon. Stay tuned!"}
      </motion.div>
    </div>
  );
}

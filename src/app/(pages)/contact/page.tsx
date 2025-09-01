"use client";

import Layout from "@/app/components/Layouts/AppLayout";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-[#c4a54a] mb-4"
        >
          Coming Soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gray-400 text-lg md:text-xl max-w-xl"
        >
          We’re crafting something amazing for you. Stay tuned!
        </motion.p>
      </div>
    </Layout>
  );
}

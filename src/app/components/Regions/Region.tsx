"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Map from "../../../../public/images/Map.png";

export default function Regions() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const mapVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-white py-10 px-6 md:px-14">
      <motion.div
        className="flex flex-col items-center justify-center text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h3
          variants={itemVariants}
          className="text-[23px] md:text-[33px] text-[#0e372d] font-semibold"
        >
          Projects by Region
        </motion.h3>

        <motion.p
          variants={itemVariants}
          className="w-full md:w-[85%] text-[#0e372d] mt-3 leading-relaxed"
        >
          We are currently operating in four regions across Ghana, focusing on
          impactful projects that identigy and unlock potentials. Our dedicated
          teams work closely with local communities to identify needs and
          implement sustainable solutions.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mt-6"
        >
          {[
            "Greater Accra Region",
            "Ashanti Region",
            "Western Region",
            "Eastern Region",
            "Central Region",
          ].map((region, i) => (
            <motion.p
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.05, color: "#0e372d" }}
              className="text-[18px] text-[#c4a54a] font-semibold transition-all duration-200 cursor-pointer"
            >
              {region}
            </motion.p>
          ))}
        </motion.div>

        <motion.div className="max-w-[350px] mt-6" variants={mapVariants}>
          <Image
            className="w-full h-auto object-contain"
            src={Map}
            alt="Ghana Map"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

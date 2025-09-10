"use client";

import Image, { StaticImageData } from "next/image";
import { motion, Variants } from "framer-motion";

import Org1 from "../../../../public/images/org1.png";
import Org2 from "../../../../public/images/org2.png";
import Org3 from "../../../../public/images/org3.png";
import Org4 from "../../../../public/images/org4.png";
import Org5 from "../../../../public/images/org5.png";

const organizations: { image: StaticImageData; title: string }[] = [
  { image: Org1, title: "Organization 1" },
  { image: Org2, title: "Organization 2" },
  { image: Org3, title: "Organization 3" },
  { image: Org4, title: "Organization 4" },
  { image: Org5, title: "Organization 5" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, when: "beforeChildren" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function Organization() {
  return (
    <div className="h-full py-10 px-6 md:px-14">
      <motion.div
        className="flex flex-wrap justify-center md:justify-between items-center gap-6 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {organizations.map((org, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            className="flex-1 basis-1/2 sm:basis-1/3 md:basis-1/5 max-w-[100px]"
          >
            <Image
              className="w-full h-auto object-contain"
              src={org.image}
              alt={org.title}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

"use client";

import Image, { StaticImageData } from "next/image";
import { motion, Variants } from "framer-motion";

import Image1 from "../../../../public/images/g1.svg";
import Image2 from "../../../../public/images/g2.svg";
import Image3 from "../../../../public/images/g3.svg";
import Image4 from "../../../../public/images/g4.svg";
import Image5 from "../../../../public/images/g5.svg";
import Image6 from "../../../../public/images/g6.svg";

type GalleryImage = {
  id: number;
  image: StaticImageData;
};

export const ImagessData: GalleryImage[] = [
  { id: 1, image: Image1 },
  { id: 2, image: Image2 },
  { id: 3, image: Image3 },
  { id: 4, image: Image4 },
  { id: 5, image: Image5 },
  { id: 6, image: Image6 },
];

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Gallery() {
  return (
    <section className="py-10 px-6 md:px-14">
      <h2 className="text-[23px] text-center text-black md:text-[33px] font-semibold">
        Our Gallery
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-3 lg:grid-rows-2 
             gap-y-5 md:gap-5 lg:gap-10 place-items-center md:place-items-stretch mt-5 md:mt-7"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {ImagessData.map((img) => (
          <motion.div
            key={img.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="overflow-hidden rounded-[15px] shadow-md cursor-pointer max-w-[416px] max-h-[416px]"
          >
            <Image
              src={img.image}
              alt={`Gallery ${img.id}`}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

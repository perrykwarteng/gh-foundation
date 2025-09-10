"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Education from "../../../../public/icons/edu.svg";
import Water from "../../../../public/icons/water.svg";
import Health from "../../../../public/icons/health.svg";
import Community from "../../../../public/icons/com.svg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Into() {
  return (
    <>
      <section className="bg-[#F8F9FA] py-10 px-6 md:px-14">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="flex gap-4 items-start"
            variants={itemVariants}
          >
            <Image src={Education} alt="education" className="w-10 h-10" />
            <div>
              <h3 className="text-[20px] text-black font-bold">Education</h3>
              <p className="mt-2 text-gray-500">
                Fermentum nisl accumsan nisi <br /> sapien in vitae
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-4 items-start"
            variants={itemVariants}
          >
            <Image src={Water} alt="clean water" className="w-10 h-10" />
            <div>
              <h3 className="text-[20px] text-black font-bold">Clean Water</h3>
              <p className="mt-2 text-gray-500">
                Ultricies lacus turpis proin <br /> tempor faucibus
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-4 items-start"
            variants={itemVariants}
          >
            <Image src={Health} alt="health care" className="w-10 h-10" />
            <div>
              <h3 className="text-[20px] text-black font-bold">Health Care</h3>
              <p className="mt-2 text-gray-500">
                Adipiscing in vitae necposue eget <br /> fringilla a morbi
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-4 items-start"
            variants={itemVariants}
          >
            <Image src={Community} alt="communities" className="w-10 h-10" />
            <div>
              <h3 className="text-[20px] text-black font-bold">
                Local Communities
              </h3>
              <p className="mt-2 text-gray-500">
                Nunc tristique quis leo duis gravida <br /> volutpat vitae
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

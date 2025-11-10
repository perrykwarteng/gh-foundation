"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Education from "../../../../public/icons/edu.svg";
import Sustainable from "../../../../public/icons/sustainable.svg";
import Training from "../../../../public/icons/Training.svg";
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
              <h3 className="text-[20px] text-[#0e372d] font-bold">
                Educational Support
              </h3>
              <p className="mt-2 text-gray-500">
                Raise funds and donate books, computers, and
                <br /> supplies to under-resourced schools.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-4 items-start"
            variants={itemVariants}
          >
            <Image src={Sustainable} alt="clean water" className="w-10 h-10" />
            <div>
              <h3 className="text-[20px] text-[#0e372d] font-bold">
                Sustainable Impact
              </h3>
              <p className="mt-2 text-gray-500">
                Begin with 3 school donations yearly, <br /> aiming to expand to
                monthly outreach.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-4 items-start"
            variants={itemVariants}
          >
            <Image src={Training} alt="health care" className="w-10 h-10" />
            <div>
              <h3 className="text-[20px] text-[#0e372d] font-bold">
                Vocational Training
              </h3>
              <p className="mt-2 text-gray-500">
                Provide women with vocational and <br /> entrepreneurship
                training for sustainable income.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-4 items-start"
            variants={itemVariants}
          >
            <Image src={Community} alt="communities" className="w-10 h-10" />
            <div>
              <h3 className="text-[20px] text-[#0e372d] font-bold">
                School Partnerships
              </h3>
              <p className="mt-2 text-gray-500">
                Partner with local authorities <br /> to support schools across
                Ghana’s 5 regions.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

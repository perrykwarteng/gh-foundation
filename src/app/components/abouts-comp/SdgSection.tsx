"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SDGImage from "../../../../public/images/sdg.jpg";

export default function SDGsSection() {
  return (
    <section className="bg-[#f9fafb] py-12 px-6 md:px-14 flex flex-col md:flex-row items-center overflow-hidden">
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-[#0e372d] font-bold text-[25px] md:text-[35px]">
          Golden Height Foundation & the SDGs
        </h2>
        <p className="text-gray-700 mt-3 leading-relaxed">
          Golden Height Foundation contributes to the United Nations Sustainable
          Development Goals (SDGs), focusing on four priorities supported by
          strong partnerships.
        </p>

        {/* SDG 1 */}
        <div className="mt-6">
          <h3 className="font-semibold text-[#0e372d] text-lg">
            • SDG 1 – No Poverty
          </h3>
          <p className="text-gray-600 mt-2">
            We reduce the financial burden on families by supporting children’s
            education and equipping women with income-generating skills, helping
            break the cycle of poverty.
          </p>
        </div>

        {/* SDG 4 */}
        <div className="mt-6">
          <h3 className="font-semibold text-[#0e372d] text-lg">
            • SDG 4 – Quality Education
          </h3>
          <p className="text-gray-600 mt-2">
            We bridge the rural-urban education gap by providing libraries,
            computer labs, learning materials, and upgraded classrooms — giving
            every child the opportunity to learn and thrive.
          </p>
        </div>

        {/* SDG 5 */}
        <div className="mt-6">
          <h3 className="font-semibold text-[#0e372d] text-lg">
            • SDG 5 – Gender Equality
          </h3>
          <p className="text-gray-600 mt-2">
            Through vocational training, financial literacy, and
            entrepreneurship support, we empower women to achieve independence,
            build livelihoods, and lead change in their communities.
          </p>
        </div>

        {/* SDG 8 */}
        <div className="mt-6">
          <h3 className="font-semibold text-[#0e372d] text-lg">
            • SDG 8 – Decent Work & Economic Growth
          </h3>
          <p className="text-gray-600 mt-2">
            We create pathways for women and youth to access dignified work,
            entrepreneurship, and economic resilience, driving inclusive growth
            in rural communities.
          </p>
        </div>

        {/* Enabler */}
        <div className="mt-6">
          <h3 className="font-semibold text-[#0e372d] text-lg">
            Our Enabler – SDG 17: Partnerships for the Goals
          </h3>
          <p className="text-gray-600 mt-2">
            We collaborate with local communities, international donors, NGOs,
            corporates, and universities. These partnerships bring resources,
            expertise, and sustainability, amplifying our impact across all
            goals.
          </p>
        </div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="w-full max-w-[500px] aspect-square relative rounded-[20px] overflow-hidden shadow-md">
          <Image
            src={SDGImage}
            alt="Sustainable Development Goals"
            fill
            className="object-cover rounded-[20px]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}

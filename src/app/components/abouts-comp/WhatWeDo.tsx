"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import WhatWeDoImg from "../../../../public/images/wwd.jpg";

export default function WhatWeDo() {
  return (
    <section className="h-full bg-white flex flex-col md:flex-row py-10 px-6 md:px-14 overflow-hidden">
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="w-full max-w-[500px] aspect-square rounded-[20px] relative overflow-hidden">
          <Image
            src={WhatWeDoImg}
            alt="What We Do"
            fill
            className="object-cover rounded-[20px]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </motion.div>

      <motion.div
        className="w-full md:w-1/1 mt-8 md:mt-0"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="px-5">
          <h2 className="text-[#0e372d] font-bold text-[25px] md:text-[35px]">
            What We Do
          </h2>

          {/* Item 1 */}
          <div className="mt-6">
            <h3 className="font-semibold text-[#0e372d] text-lg">
              1. Educational Support for Pupils
            </h3>
            <p className="text-gray-600 mt-2">
              Golden Height addresses the resource gap in rural schools by
              equipping classrooms with solar-powered computer labs, libraries,
              and digital content. We provide backpacks, stationery, and
              teaching aids to ensure pupils are well-prepared, while also
              upgrading classrooms and reading corners into safe, engaging
              learning spaces. To enhance delivery, we train teachers in digital
              and computer skills, nurturing creativity and problem-solving
              among pupils.
            </p>
          </div>

          {/* Item 2 */}
          <div className="mt-6">
            <h3 className="font-semibold text-[#0e372d] text-lg">
              2. Partnerships with Schools, Communities & Donors
            </h3>
            <p className="text-gray-600 mt-2">
              We collaborate with the Ghana Education Service, PTAs, and local
              leaders to identify schools most in need. Our partnerships extend
              to international donor agencies, NGOs, corporate sponsors, and
              universities, ensuring interventions are well-resourced and
              sustainable. Together, we align local initiatives with global
              development goals, creating long-lasting impact.
            </p>
          </div>

          {/* Item 3 */}
          <div className="mt-6">
            <h3 className="font-semibold text-[#0e372d] text-lg">
              3. Women’s Vocational Training & Empowerment
            </h3>
            <p className="text-gray-600 mt-2">
              We empower rural women with practical vocational skills in
              soap-making, catering, tailoring, and beadwork, while also
              providing training in financial literacy, bookkeeping, and digital
              marketing. By supporting women-led cooperatives and enterprises,
              we help reduce poverty, strengthen family stability, and foster
              leadership in communities.
            </p>
          </div>

          {/* Item 4 */}
          <div className="mt-6">
            <h3 className="font-semibold text-[#0e372d] text-lg">
              4. Sustainable & Scalable Impact
            </h3>
            <p className="text-gray-600 mt-2">
              Our model begins with three annual school donations, allowing for
              measurable impact, and gradually scales toward monthly outreach
              programs. By leveraging solar energy and community ownership, we
              reinvest in libraries, computer labs, and women’s cooperatives,
              creating a cycle of empowerment where children access quality
              education, women achieve sustainable incomes, and entire
              communities thrive.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

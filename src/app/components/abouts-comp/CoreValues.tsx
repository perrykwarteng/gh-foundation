"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Scale,
  Lightbulb,
  ShieldCheck,
  Users,
  HeartHandshake,
  Leaf,
  Star,
} from "lucide-react";

const values = [
  {
    icon: <Scale className="w-8 h-8 text-white" />,
    title: "Equity",
    description:
      "We believe every child and woman deserves equal access to opportunities, regardless of geography or background.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-white" />,
    title: "Innovation",
    description:
      "We apply creative, sustainable solutions — from solar-powered computer labs to digital tools for women — to bridge gaps in education and livelihoods.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    title: "Integrity",
    description:
      "We operate with transparency, accountability, and trust in managing resources, partnerships, and community relationships.",
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: "Empowerment",
    description:
      "We enable pupils to succeed academically and women to achieve economic independence, fostering confidence and resilience.",
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-white" />,
    title: "Collaboration",
    description:
      "We work hand-in-hand with schools, communities, government agencies, corporate sponsors, and international donor agencies to amplify impact.",
  },
  {
    icon: <Leaf className="w-8 h-8 text-white" />,
    title: "Sustainability",
    description:
      "We design projects that endure, reinvesting solar energy savings and cooperative income into continuous growth for schools and women.",
  },
  {
    icon: <Star className="w-8 h-8 text-white" />,
    title: "Excellence",
    description:
      "We are committed to delivering high-quality programs, ensuring measurable outcomes that inspire learning, leadership, and long-term transformation.",
  },
];

export default function CoreValues() {
  return (
    <section className="bg-white py-16 px-6 md:px-14">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-[#0e372d] font-bold text-[28px] md:text-[40px]">
          Core Values of Golden Height Foundation
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Our principles guide everything we do, ensuring that our work brings
          lasting transformation to children, women, and communities.
        </p>
      </motion.div>

      {/* Values Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((val, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#0e372d] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-start"
          >
            <div className="bg-[#158467] p-3 rounded-xl">{val.icon}</div>
            <h3 className="text-white font-semibold text-xl mt-4">
              {val.title}
            </h3>
            <p className="text-gray-200 text-sm mt-2">{val.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

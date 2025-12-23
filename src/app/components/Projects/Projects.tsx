"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import SingleProject from "../Single-Project/SingleProject";

import {
  fetchProjects,
  PROJECTS_FALLBACK,
  type Project,
} from "@/app/lib/projects-content";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, when: "beforeChildren" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS_FALLBACK);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await fetchProjects();
        if (mounted) setProjects(data);
      } catch {
        if (mounted) setProjects(PROJECTS_FALLBACK);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="py-10 px-6 md:px-14 bg-white">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[25px] text-[#0e372d] font-semibold">
          Upcoming Events
        </h3>

        <Link href="/projects" className="inline-block">
          <button
            type="button"
            className="border-2 text-[#0e372d] font-medium border-[#0e372d] hover:bg-[#0e372d] hover:text-white px-4 md:px-6 py-1 md:py-2 rounded-[10px] transition duration-300 ease-in-out"
          >
            More Projects
          </button>
        </Link>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center md:place-items-stretch"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.slice(0, 3).map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <SingleProject
              image={project.image}
              title={project.title}
              description={project.description}
              goal={project.goal}
              raised={project.raised}
              donations={project.donations}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

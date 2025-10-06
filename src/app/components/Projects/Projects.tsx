"use client";

import { motion, Variants } from "framer-motion";
import { StaticImageData } from "next/image";
import SingleProject from "../Single-Project/SingleProject";

import Project1 from "../../../../public/images/project1.jpeg";
import Project2 from "../../../../public/icons/projectImg2.svg";
import Project3 from "../../../../public/icons/projectImg3.svg";

type Project = {
  id: number;
  image: StaticImageData;
  title: string;
  description: string;
  goal: number;
  raised: number;
  donations: number;
};

export const projectsData: Project[] = [
  {
    id: 1,
    image: Project1,
    title: "Donation to Schools",
    description:
      "Your contribution will put smiles on faces, light hope in young hearts, and provide the foundation for brighter futures.",
    goal: 47000,
    raised: 0,
    donations: 0,
  },
  {
    id: 2,
    image: Project2,
    title: "Education for Every Child",
    description:
      "Supporting schools with books, uniforms, and tuition for underprivileged children.",
    goal: 15000,
    raised: 6000,
    donations: 9,
  },
  {
    id: 3,
    image: Project3,
    title: "Healthcare Access",
    description:
      "Building mobile clinics to provide essential healthcare in remote villages.",
    goal: 20000,
    raised: 12000,
    donations: 22,
  },
];

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
  return (
    <div className="py-10 px-6 md:px-14 bg-white">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[25px] text-[#0e372d] font-semibold">
          Upcoming Events
        </h3>
        <button className="border-2 text-[#0e372d] font-medium border-[#0e372d] hover:bg-[#0e372d] hover:text-white px-4 md:px-6 py-1 md:py-2 rounded-[10px] transition duration-300 ease-in-out">
          More Projects
        </button>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center md:place-items-stretch"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projectsData.map((project) => (
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

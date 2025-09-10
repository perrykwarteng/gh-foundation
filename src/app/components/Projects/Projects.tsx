"use client";

import { motion, Variants } from "framer-motion";
import { StaticImageData } from "next/image";
import SingleProject from "../Single-Project/SingleProject";

import Project1 from "../../../../public/icons/projectImg.svg";
import Project2 from "../../../../public/icons/projectImg2.svg";
import Project3 from "../../../../public/icons/projectImg3.svg";
import Project4 from "../../../../public/icons/projectImg4.svg";
import Project5 from "../../../../public/icons/projectImg5.svg";
import Project6 from "../../../../public/icons/projectImg6.svg";

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
    title: "Clean Water for All",
    description:
      "Providing clean and safe water to rural communities for better health and wellbeing.",
    goal: 12000,
    raised: 8000,
    donations: 14,
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
  {
    id: 4,
    image: Project4,
    title: "Feeding the Hungry",
    description:
      "Daily meals for street children and vulnerable families in urban communities.",
    goal: 10000,
    raised: 7500,
    donations: 18,
  },
  {
    id: 5,
    image: Project5,
    title: "Shelter & Housing",
    description:
      "Constructing affordable housing for families displaced by floods and disasters.",
    goal: 25000,
    raised: 14000,
    donations: 12,
  },
  {
    id: 6,
    image: Project6,
    title: "Women Empowerment",
    description:
      "Training women in vocational skills and entrepreneurship for sustainable income.",
    goal: 18000,
    raised: 9000,
    donations: 15,
  },
];

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

export default function Projects() {
  return (
    <div className="py-10 px-6 md:px-14 h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-[25px] font-semibold">Latest Causes</h3>
        <div>
          <button className="border-2 text-[#0e372d] font-medium border-[#0e372d] hover:bg-[#0e372d] hover:text-white px-4 md:px-6 py-1 md:py-2 rounded-[10px] transition duration-200">
            More Projects
          </button>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-3 lg:grid-rows-2 
             gap-y-5 md:gap-5 lg:gap-10 place-items-center md:place-items-stretch mt-7"
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

"use client";

import { useState } from "react";
import Layout from "@/app/components/Layouts/AppLayout";
import { motion } from "framer-motion";
import SingleProject from "@/app/components/Single-Project/SingleProject";
import ProjectModal from "../../components/Modal/Modal";

import Project1 from "../../../../public/icons/projectImg.svg";
import Project2 from "../../../../public/icons/projectImg2.svg";
import Project3 from "../../../../public/icons/projectImg3.svg";
import Project4 from "../../../../public/icons/projectImg4.svg";
import Project5 from "../../../../public/icons/projectImg5.svg";
import Project6 from "../../../../public/icons/projectImg6.svg";
import { StaticImageData } from "next/image";
import HeroText from "@/app/components/Hero-text/Hero-text";

type Project = {
  id: number;
  image: StaticImageData;
  title: string;
  description: string;
  goal: number;
  raised: number;
  donations: number;
};

const projectsData: Project[] = [
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

export default function ProjectPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Layout>
      <div className="py-10 px-6 md:px-14 bg-white h-full">
        <HeroText
          title="Projects"
          description="Discover the various initiatives and projects we are undertaking to create lasting impact in communities."
          breadcrumb={[{ name: "Home", href: "/" }, { name: "Projects" }]}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 md:gap-5 lg:gap-10 mt-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projectsData.map((project) => (
            <motion.div key={project.id}>
              <SingleProject
                {...project}
                onView={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </motion.div>

        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      </div>
    </Layout>
  );
}

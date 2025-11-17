"use client";

import { useState } from "react";
import Layout from "@/app/components/Layouts/AppLayout";
import { motion } from "framer-motion";
import SingleProject from "@/app/components/Single-Project/SingleProject";
import ProjectModal from "../../components/Modal/Modal";

import Project1 from "../../../../public/images/project1.jpeg";
import Project2 from "../../../../public/icons/projectImg2.svg";

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
    goal: 0,
    raised: 0,
    donations: 9,
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

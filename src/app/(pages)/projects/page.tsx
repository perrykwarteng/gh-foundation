"use client";

import { useEffect, useState } from "react";
import Layout from "@/app/components/Layouts/AppLayout";
import { motion } from "framer-motion";
import SingleProject from "@/app/components/Single-Project/SingleProject";
import ProjectModal from "../../components/Modal/Modal";
import HeroText from "@/app/components/Hero-text/Hero-text";

import {
  fetchProjects,
  PROJECTS_FALLBACK,
  type Project,
} from "@/app/lib/projects-content";

export default function ProjectPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectsData, setProjectsData] =
    useState<Project[]>(PROJECTS_FALLBACK);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchProjects(); 
      if (mounted) setProjectsData(data);
    })();
    return () => {
      mounted = false;
    };
  }, []);

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

"use client";
import AboutInfo from "@/app/components/abouts-comp/AboutInfo";
import AboutOrganization from "@/app/components/abouts-comp/AboutOrganization";
import HeroVideo from "@/app/components/abouts-comp/HeroVideo";
import { resolveSrcs } from "@/app/components/abouts-comp/types";
import VideoLightbox from "@/app/components/abouts-comp/VideoLightbox";
import Blog from "@/app/components/Blog/Blog";
import HeroText from "@/app/components/Hero-text/Hero-text";
import Layout from "@/app/components/Layouts/AppLayout";
import Regions from "@/app/components/Regions/Region";
import Stats from "@/app/components/Stats/Stats";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import WhatWeDo from "@/app/components/abouts-comp/WhatWeDo";
import CoreValues from "@/app/components/abouts-comp/CoreValues";

export default function About() {
  const [showVideo, setShowVideo] = useState(false);

  const s = resolveSrcs(null);
  const videoSrc = "/sample.mp4";

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <Layout>
      <section className="relative w-full bg-white overflow-hidden">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <HeroText
            title="About Us"
            description="Learn more about our mission, vision, and the values that drive us to transform lives through love and generosity."
            breadcrumb={[{ name: "Home", href: "/" }, { name: "About" }]}
          />
        </motion.div>

        {/* <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-5 md:mt-8"
        >
          <Stats color="bg-[#F8F9FA]" />
        </motion.div> */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AboutInfo />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AboutOrganization />
        </motion.div>
        <CoreValues />
        <WhatWeDo />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="video"
        >
          <HeroVideo src={s.hero} onPlay={() => setShowVideo(true)} />
          <VideoLightbox
            open={showVideo}
            onClose={() => setShowVideo(false)}
            src={videoSrc}
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Regions />
        </motion.div>

        {/* <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Blog />
        </motion.div> */}
      </section>
    </Layout>
  );
}

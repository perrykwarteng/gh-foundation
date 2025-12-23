"use client";
import AboutInfo from "@/app/components/abouts-comp/AboutInfo";
import AboutOrganization from "@/app/components/abouts-comp/AboutOrganization";
import HeroVideo from "@/app/components/abouts-comp/HeroVideo";
import { resolveSrcs } from "@/app/components/abouts-comp/types";
import VideoLightbox from "@/app/components/abouts-comp/VideoLightbox";
import HeroText from "@/app/components/Hero-text/Hero-text";
import Layout from "@/app/components/Layouts/AppLayout";
import Regions from "@/app/components/Regions/Region";
import { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import WhatWeDo from "@/app/components/abouts-comp/WhatWeDo";
import CoreValues from "@/app/components/abouts-comp/CoreValues";
import SDGsSection from "@/app/components/abouts-comp/SdgSection";
import { useAboutContent } from "@/app/hooks/useAboutContent";
import { strapiUrl } from "@/app/lib/about-content";

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

  const { data } = useAboutContent();

  const extracted = useMemo(() => {
    const blocks = data?.data?.content || [];

    const storyBlock = blocks.find((b) => b?.id === 4);
    const storyText =
      storyBlock?.content?.[0]?.children?.map((c) => c?.text || "").join("") ||
      "";

    const storyImage = strapiUrl(storyBlock?.image?.url);

    const sdgBlock = blocks.find((b) => b?.id === 6);
    const sdgTextLead =
      sdgBlock?.content?.[0]?.children?.map((c) => c?.text || "").join("") ||
      "";

    const allLines =
      sdgBlock?.content
        ?.map((p) => p?.children?.map((c) => c?.text || "").join("") || "")
        .filter(Boolean) || [];

    const findAfter = (needle: string) => {
      const idx = allLines.findIndex((x) => x.includes(needle));
      return idx >= 0 ? allLines[idx + 1] || "" : "";
    };

    return {
      title: data?.data?.title || "About Us",
      description:
        data?.data?.description ||
        "Learn more about our mission, vision, and the values that drive us to transform lives through love and generosity.",
      storyText,
      storyImage,
      sdgLead: sdgTextLead,
      sdg1: findAfter("SDG 1"),
      sdg4: findAfter("SDG 4"),
      sdg5: findAfter("SDG 5"),
      sdg8: findAfter("SDG 8"),
      sdg17: findAfter("SDG 17"),
    };
  }, [data]);

  return (
    <Layout>
      <section className="relative w-full bg-white overflow-hidden">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <HeroText
            title={extracted.title}
            description={extracted.description}
            breadcrumb={[{ name: "Home", href: "/" }, { name: "About" }]}
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AboutInfo storyText={extracted.storyText} storyImage={extracted.storyImage} />
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

        <SDGsSection
          lead={extracted.sdgLead}
          sdg1={extracted.sdg1}
          sdg4={extracted.sdg4}
          sdg5={extracted.sdg5}
          sdg8={extracted.sdg8}
          sdg17={extracted.sdg17}
        />

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
      </section>
    </Layout>
  );
}


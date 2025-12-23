"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type StrapiImage = {
  url?: string;
  formats?: {
    large?: { url?: string };
    medium?: { url?: string };
    small?: { url?: string };
    thumbnail?: { url?: string };
  };
};

type HeroBlock = {
  __component?: "blocks.hero-section" | string;
  heading?: string;
  description?: string;
  images?: StrapiImage[];
};

type HomepageResponse = {
  data?: {
    blocks?: HeroBlock[];
  };
};

type Slide = { img: string };

type HeroContent = {
  heading: string;
  description: string;
  slides: Slide[];
};

const API_BASE = process.env.NEXT_PUBLIC_BASE_API || "";
const ASSET_BASE = API_BASE.replace(/\/api\/?$/, "");

const API_PATH =
  "/homepage?populate[blocks][on][blocks.hero-section][populate][images]=true&populate[blocks][on][blocks.info-block][populate][image]=true&populate[testimonials]=true&populate[partners][populate][logo]=true";

function toAbsoluteAssetUrl(maybeRelative?: string) {
  if (!maybeRelative) return "";
  if (maybeRelative.startsWith("http")) return maybeRelative;
  if (!ASSET_BASE) return maybeRelative;
  return `${ASSET_BASE}${maybeRelative}`;
}

function pickBestImageUrl(img?: StrapiImage) {
  const u =
    img?.formats?.large?.url ||
    img?.formats?.medium?.url ||
    img?.formats?.small?.url ||
    img?.formats?.thumbnail?.url ||
    img?.url ||
    "";
  return toAbsoluteAssetUrl(u);
}

export const Hero = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    drag: true,
    mode: "free-snap",
    slides: { perView: 1, spacing: 0 },
  });

  const fallback = useMemo<HeroContent>(
    () => ({
      heading: "Unlocking Potential, Transforming Communities",
      description:
        "At Golden Height Foundation, we believe that every individual has untapped potential waiting to be unlocked. Through education, empowerment, and collaboration, we provide the tools and support needed to transform lives. When individuals grow and succeed, entire communities thrive. Our mission is simple: by empowering one person at a time, we create lasting, meaningful change that ripples through generations. Together, we are shaping a brighter, more inclusive future for all.",
      slides: [
        { img: "/images/Slide1.jpg" },
        { img: "/images/Slide2.jpg" },
        { img: "/images/Slide3.jpg" },
        { img: "/images/Slide4.jpg" },
      ],
    }),
    []
  );

  const [content, setContent] = useState<HeroContent>(fallback);

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        const res = await fetch(`${API_BASE}${API_PATH}`, {
          cache: "no-store",
          signal: ctrl.signal,
        });

        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const json = (await res.json()) as HomepageResponse;

        const blocks = json?.data?.blocks ?? [];
        const hero = blocks.find(
          (b) => b?.__component === "blocks.hero-section"
        );

        const apiHeading = hero?.heading?.trim() || "";
        const apiDescription = hero?.description?.trim() || "";

        const apiImages: StrapiImage[] = Array.isArray(hero?.images)
          ? hero.images
          : [];

        const apiSlides = apiImages
          .map((img) => pickBestImageUrl(img))
          .filter((url): url is string => Boolean(url))
          .map((url) => ({ img: url }));

        setContent({
          heading: apiHeading || fallback.heading,
          description: apiDescription || fallback.description,
          slides: apiSlides.length ? apiSlides : fallback.slides,
        });
      } catch (err) {
        // Don't override state on abort
        if (err instanceof DOMException && err.name === "AbortError") return;
        setContent(fallback);
      }
    })();

    return () => ctrl.abort();
  }, [fallback]);

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);

    return () => clearInterval(interval);
  }, [instanceRef]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay },
    }),
  };

  const headingParts = useMemo(() => {
    const raw = content.heading || "";
    const parts = raw.split(",");
    return {
      parts,
      hasComma: parts.length > 1,
      first: parts[0] ?? "",
      rest: parts.slice(1).join(",").trim(),
    };
  }, [content.heading]);

  return (
    <div className="relative w-full h-[65vh] sm:h-[85vh] md:h-[90vh] lg:h-[100vh] overflow-hidden">
      <div ref={sliderRef} className="keen-slider w-full h-full">
        {content.slides.map((slide, index) => (
          <div
            key={index}
            className="keen-slider__slide relative w-full h-full"
          >
            <Image
              src={slide.img}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
              unoptimized
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/40 sm:bg-black/50 flex flex-col justify-center px-4 sm:px-6 md:px-14">
        <motion.h1
          className="text-white text-3xl sm:text-5xl md:text-7xl lg:text-5xl font-bold leading-tight"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          {headingParts.hasComma ? (
            <>
              {headingParts.first}, <br />
              {headingParts.rest}
            </>
          ) : (
            content.heading
          )}
        </motion.h1>

        <motion.p
          className="text-gray-300 w-full md:w-1/2 lg:w-[45%] mt-5 md:mt-7 text-sm sm:text-base md:text-lg"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
        >
          {content.description}
        </motion.p>
      </div>
    </div>
  );
};

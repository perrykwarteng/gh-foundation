"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { useEffect } from "react";
import { motion } from "framer-motion";

import Spon1 from "../../../../public/icons/spon1.svg";
import Spon2 from "../../../../public/icons/spon2.svg";

export const Hero = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    drag: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 0,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  const slides = [
    { img: "/images/Slide1.jpg" },
    { img: "/images/Slide2.jpg" },
    { img: "/images/Slide3.jpg" },
    { img: "/images/Slide4.jpg" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay },
    }),
  };

  return (
    <div className="relative w-full h-[65vh] sm:h-[85vh] md:h-[90vh] lg:h-[100vh] overflow-hidden">
      <div ref={sliderRef} className="keen-slider w-full h-full">
        {slides.map((slide, index) => (
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
          Unlocking Potential, <br /> Transforming Communities
        </motion.h1>

        <motion.p
          className="text-gray-300 w-full md:w-1/2 lg:w-[35%] mt-5 md:mt-7 text-sm sm:text-base md:text-lg"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
        >
          At Golden Height Foundation, we believe that every individual has
          untapped potential waiting to be unlocked. Through education,
          empowerment, and collaboration, we provide the tools and support
          needed to transform lives. When individuals grow and succeed, entire
          communities thrive. Our mission is simple: by empowering one person at
          a time, we create lasting, meaningful change that ripples through
          generations. Together, we are shaping a brighter, more inclusive
          future for all,
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row sm:items-center gap-5 mt-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
        >
          {/* <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <p className="text-[#c4a54a] text-2xl sm:text-3xl font-semibold">
                $1 284 528
              </p>
              <p className="text-gray-300 text-sm sm:text-base">Donation</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <p className="text-[#c4a54a] text-2xl sm:text-3xl font-semibold">
              12 460
            </p>
            <p className="text-gray-300 text-sm sm:text-base">People Helped</p>
          </div> */}
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-3 mt-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
        >
          {/* <Image src={Spon1} alt="1" className="w-16 sm:w-20" />
          <Image src={Spon2} alt="2" className="w-16 sm:w-20" />
          <Image src={Spon1} alt="3" className="w-16 sm:w-20" />
          <Image src={Spon2} alt="4" className="w-16 sm:w-20" /> */}
        </motion.div>
      </div>
    </div>
  );
};

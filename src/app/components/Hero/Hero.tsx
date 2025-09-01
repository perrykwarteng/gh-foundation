"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { useEffect } from "react";

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

  return (
    <div className="relative w-full h-[90vh] sm:h-[80vh] md:h-[90vh] lg:h-[90vh] overflow-hidden">
      {/* Slider */}
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
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
              unoptimized
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/40 sm:bg-black/50 flex flex-col justify-center px-6 sm:px-6 md:px-14">
        <h1 className="text-white text-4xl md:text-[90px] font-bold">
          Give Hope, <br /> Save Lives
        </h1>
        <p className="text-gray-300 w-full md:w-[35%] mt-5">
          Libero mauris sed sed proin. Blandit aliquet ipsum faucibus dictum
          natoque arcu. Potenti ante sed in amet massa aliquet. Enim dui urna
          mauris volutpat
        </p>

        <div className="flex items-center gap-5 mt-3">
          <div className="">
            <div className="flex flex-col md:flex-row md:items-center md:gap-3">
              <p className="text-[#c4a54a] text-[30px] font-semibold">
                $1 284 528
              </p>
              <p className="text-gray-300">Donation</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-3">
            <p className="text-[#c4a54a] text-[30px] font-semibold">12 460</p>
            <p className="text-gray-300">People Helped</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="">
            <Image src={Spon1} alt="1" />
          </div>
          <div className="">
            <Image src={Spon2} alt="2" />
          </div>
          <div className="">
            <Image src={Spon1} alt="3" />
          </div>
          <div className="">
            <Image src={Spon2} alt="4" />
          </div>
        </div>
      </div>
    </div>
  );
};

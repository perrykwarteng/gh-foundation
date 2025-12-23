"use client";

import Image from "next/image";
import TestimonialImg from "../../../../public/images/T1.jpg";
import QuoteImg from "../../../../public/icons/Quote.svg";
import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { motion } from "framer-motion";

const testimonials = [
  {
    message:
      "Sollicitudin vitae diam senectus molestie cras in gravida egestas ac. Tortor condimentum suspendisse duis et velit donec turpis interdum elit.",
    name: "George Henry",
    role: "Donor",
  },
  {
    message:
      "Tincidunt ultrices eu vitae ut velit purus urna in. Ut maecenas amet ac dignissim vulputate viverra maecenas tempus in.",
    name: "Sarah Johnson",
    role: "Volunteer",
  },
  {
    message:
      "Cursus euismod nulla habitasse cras vitae sollicitudin iaculis pellentesque.",
    name: "Michael Smith",
    role: "Partner",
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 15 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      instanceRef.current?.next();
    }, 6000);
    return () => clearInterval(timer);
  }, [instanceRef]);

  return (
    <section className="bg-[#F8F9FA] h-full py-10 px-6 md:px-14">
      <div className="flex flex-col md:flex-row gap-x-7">
        <div className="w-full md:max-w-[50%]">
          <div className="max-w-[80px]">
            <Image src={QuoteImg} alt="quote image" />
          </div>
          <h3 className="text-[28px] text-[#0e372d] md:text-[34px] font-semibold mt-5 lg:mt-10 mb-3 leading-snug">
            Together, we can change lives for the better
          </h3>

          <div ref={sliderRef} className="keen-slider w-full max-w-2xl">
            {testimonials.map((t, i) => (
              <div key={i} className="keen-slider__slide">
                <p className="text-gray-700 md:mt-3 lg:mt-8">{t.message}</p>
                <div className="pt-4 lg:pt-7">
                  <p className="font-bold text-[#c4a54a]">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4 gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === idx ? "bg-[#c4a54a]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="w-full md:max-w-[50%] mt-8 md:mt-0"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src={TestimonialImg}
            alt="Testimonial Image"
            className="w-full h-auto rounded-[15px]"
          />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import Image1 from "../../../../public/icons/project-complete.svg";
import Image2 from "../../../../public/icons/monthly.svg";
import Image3 from "../../../../public/icons/partner.svg";
import Image4 from "../../../../public/icons/donation.svg";

type Stats = {
  id: number;
  image: StaticImageData;
  tally: string;
  text: string;
};

export const StatData: Stats[] = [
  { id: 1, image: Image1, tally: "1200", text: "Projects completed" },
  { id: 2, image: Image2, tally: "100", text: "Monthly Donate" },
  { id: 3, image: Image3, tally: "480", text: "Partners Worldwide" },
  { id: 4, image: Image4, tally: "10000", text: "Donations received" },
];

function CountUp({
  target,
  duration = 2000,
  startCounting,
}: {
  target: number;
  duration?: number;
  startCounting: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let start = 0;
    const end = target;
    const increment = end / (duration / 16);

    const handle = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(handle);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(handle);
  }, [target, duration, startCounting]);

  return <>{count.toLocaleString()}+</>;
}

function StatCard({ image, tally, text }: Stats) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center gap-1.5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Image src={image} alt={text} />
      <h4 className="text-[30px] text-black font-semibold">
        <CountUp target={parseInt(tally)} startCounting={inView} />
      </h4>
      <p className="text-gray-500">{text}</p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="py-10 px-6 md:px-14">
      <div className="grid gap-y-8 md:gap-y-0 md:grid-cols-2 lg:grid-cols-4 place-content-stretch">
        {StatData.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>
    </section>
  );
}

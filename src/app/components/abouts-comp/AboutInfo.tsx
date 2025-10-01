"use client";

import Image from "next/image";

import InfoImg from "../../../../public/images/Ab4.jpg";
import InfoProfile from "../../../../public/images/team/Mavis.jpeg";

export default function AboutInfo() {
  return (
    <section className="py-10 px-6 md:px-14 h-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-14">
        <div className="w-full md:w-[50%]">
          <Image
            src={InfoImg}
            className="rounded-[15px]"
            alt="About Golden Height Foundation"
          />
        </div>
        <div className="w-full md:w-[50%]">
          <h3 className="text-[30px] text-[#0e372d] md:text-[25px] lg:text-[38px] font-semibold">
            Make a Difference, Support Those in Need.
          </h3>
          <p className="text-gray-500 mt-3">
            Golden Height Foundation (GHF) was born out of a lifelong passion
            for helping others, a passion I carried with me from childhood. But
            in June 2019, that passion transformed into a clear mission. One
            sunny afternoon, I took my daughters to a popular hotel pool in Cape
            Coast, Ghana. As we waited for the pool to be cleaned, I noticed
            five children, between ten and fifteen years old, sitting quietly
            and watching. When the pool was ready, my daughters splashed in with
            joy, but the others stayed seated. Curious, I asked why they
            weren&apos;t swimming. The eldest shyly replied that they were
            waiting until evening, when the pool attendant would let them swim
            for less because they couldn&apos;t afford the full price. Later, as
            I read a colourful picture book to my baby, those same children drew
            closer, fascinated by the images. Their faces lit up as they called
            out words and flipped through more books I brought out. That moment
            stayed with me. As a mother and a woman who could afford to bring my
            children out for such experiences, I couldn&apos;t help but wonder
            about the mothers of those children. Perhaps they would have loved
            to be there too, but lacked the means. Or maybe they didn&apos;t
            even know where their children were at that time, a stark reminder
            of the hardships many families face. That thought stirred a wave of
            gratitude, empathy, and responsibility in me.
          </p>

          <div className="flex items-center gap-2 mt-4 md:mt-10">
            <Image
              src={InfoProfile}
              alt="Dr (Mrs) Mavis Opoku Boadu"
              className="w-[80px] h-[80px] rounded-full"
            />
            <div>
              <h4 className="text-[#0e372d] font-semibold">
                Dr (Mrs) Mavis Opoku Boadu
              </h4>
              <p className="text-[13px] text-[#c4a54a]">
                Founder/Executive Director
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

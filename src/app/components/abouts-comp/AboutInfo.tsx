"use client";

import Image from "next/image";
import InfoImg from "../../../../public/images/Ab4.jpg";
import InfoProfile from "../../../../public/images/team/Mavis.jpeg";

export default function AboutInfo({
  storyText,
  storyImage,
}: {
  storyText?: string;
  storyImage?: string;
}) {
  const finalText =
    storyText?.trim() ||
    "Golden Height Foundation (GHF) was born out of a lifelong passion for helping others...";

  return (
    <section className="py-10 px-6 md:px-14 h-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-14">
        <div className="w-full md:w-[50%]">
          {storyImage ? (
            <img
              src={storyImage}
              alt="About Golden Height Foundation"
              className="rounded-[15px] w-full h-auto"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  (InfoImg as any).src || "/images/Ab4.jpg";
              }}
            />
          ) : (
            <Image
              src={InfoImg}
              className="rounded-[15px]"
              alt="About Golden Height Foundation"
            />
          )}
        </div>

        <div className="w-full md:w-[50%]">
          <h3 className="text-[30px] text-[#0e372d] md:text-[25px] lg:text-[38px] font-semibold">
            Our Story
          </h3>

          <p className="text-gray-500 mt-3">{finalText}</p>

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

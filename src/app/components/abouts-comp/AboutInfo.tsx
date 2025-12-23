"use client";

import Image, { type StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";

import InfoImg from "../../../../public/images/Ab4.jpg";
import InfoProfile from "../../../../public/images/team/Mavis.jpeg";

type AboutInfoProps = {
  storyText?: string;
  storyImage?: string;
};

function makeAssetUrl(path?: string) {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const baseRaw = (process.env.NEXT_PUBLIC_BASE_API || "")
    .trim()
    .replace(/\/$/, "");

  const origin = baseRaw.endsWith("/api") ? baseRaw.slice(0, -4) : baseRaw;

  const normalized = path.startsWith("/api/uploads/")
    ? path.replace("/api", "")
    : path;

  if (!origin) return normalized;

  return normalized.startsWith("/")
    ? `${origin}${normalized}`
    : `${origin}/${normalized}`;
}

export default function AboutInfo({ storyText, storyImage }: AboutInfoProps) {
  const finalText =
    storyText?.trim() ||
    "Golden Height Foundation (GHF) was born out of a lifelong passion for helping others...";

  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    setImgSrc(makeAssetUrl(storyImage));
  }, [storyImage]);

  return (
    <section className="py-10 px-6 md:px-14 h-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-14">
        <div className="w-full md:w-[50%]">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[15px]">
            <Image
              src={imgSrc || (InfoImg as StaticImageData)}
              alt="About Golden Height Foundation"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={!imgSrc}
              unoptimized={Boolean(imgSrc)}
              onError={() => setImgSrc("")}
            />
          </div>
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
              width={80}
              height={80}
              className="w-[80px] h-[80px] rounded-full object-cover"
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

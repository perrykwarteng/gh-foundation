"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type SingleBlogProps = {
  image: StaticImageData | string; 
  date: string;
  title: string;
  description: string;
  link: string;
};

export default function SingleBlog({
  image,
  date,
  title,
  description,
  link,
}: SingleBlogProps) {
  const isString = typeof image === "string";

  return (
    <Link href={link} className="group block">
      <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
        {isString ? (
          <img
            src={image || "/images/B1.svg"}
            alt={title}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        ) : (
          <Image
            src={image}
            alt={title}
            className="w-full h-auto object-cover"
            width={1200}
            height={600}
          />
        )}

        <div className="p-4">
          <p className="text-xs text-gray-500">{date}</p>
          <h3 className="mt-2 font-bold text-[#0e372d]">{title}</h3>
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </Link>
  );
}

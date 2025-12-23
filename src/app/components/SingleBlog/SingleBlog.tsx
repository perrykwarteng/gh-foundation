"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  image: string;
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
}: Props) {
  const [src, setSrc] = useState(image || "/images/B1.svg");

  useEffect(() => {
    setSrc(image || "/images/B1.svg");
  }, [image]);

  return (
    <Link href={link} className="group block">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
        {/* IMAGE */}
        <div className="relative w-full aspect-[4/3] bg-gray-100">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   25vw"
            onError={() => setSrc("/images/B1.svg")}
          />
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <p className="text-xs text-gray-500">{date}</p>

          <h3 className="mt-2 text-[#0e372d] font-semibold text-sm line-clamp-2">
            {title}
          </h3>

          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
}

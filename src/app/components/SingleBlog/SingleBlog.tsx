import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import Calendar from "../../../../public/icons/calendar.svg";
import Arrow from "../../../../public/icons/arrow-right.svg";

type SingleBlogProps = {
  image: StaticImageData;
  date: string;
  title: string;
  description: string;
  link?: string;
};

export default function SingleBlog({
  image,
  date,
  title,
  description,
  link = "#",
}: SingleBlogProps) {
  return (
    <div className="Card h-full max-w-[416px] rounded-[10px] bg-white shadow-sm">
      <div className="w-full max-h-[280px]">
        <Image
          className="rounded-t-[10px] w-full h-full object-cover"
          src={image}
          alt={title}
        />
      </div>

      <div className="max-h-[360px] p-3.5 md:p-5">
        <div className="flex gap-1 items-center">
          <Image src={Calendar} alt="calendar icon" />
          <p className="text-gray-500 text-[13px]">{date}</p>
        </div>

        <h3 className="text-[17px] text-[#0e372d] md:text-[20px] font-bold">
          {title}
        </h3>

        <p className="text-gray-500 mt-2">{description}</p>

        <div className="w-full mt-3.5">
          <Link
            href={link}
            className="flex gap-1 items-center cursor-pointer transition-all duration-150 text-gray-600 hover:text-[#0e372d]"
          >
            Read more <Image src={Arrow} alt="arrow icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}

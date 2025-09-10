import Image, { StaticImageData } from "next/image";

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
    <div className="Card max-w-[416px] bg-white">
      <div className="w-full max-h-[280px]">
        <Image
          className="rounded-t-[10px] w-full h-auto"
          src={image}
          alt={title}
        />
      </div>

      <div className="max-h-[360px] p-3.5 md:p-5 shadow-sm rounded-b-[10px]">
        <div className="flex gap-1 items-center">
          <Image src={Calendar} alt="calendar icon" />
          <p className="text-gray-500 text-[13px]">{date}</p>
        </div>

        <h3 className="text-[17px] text-[#0e372d] md:text-[20px] font-bold">
          {title}
        </h3>

        <p className="text-gray-500 mt-2">{description}</p>

        <div className="w-full mt-3.5">
          <a
            href={link}
            className="flex gap-1 items-center cursor-pointer transition-all duration-150 hover:text-[#0e372d]"
          >
            Read more <Image src={Arrow} alt="arrow icon" />
          </a>
        </div>
      </div>
    </div>
  );
}

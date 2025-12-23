import Image, { StaticImageData } from "next/image";

type ProjectCardProps = {
  image: StaticImageData | string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  donations: number;
  buttonText?: string;
  onView?: () => void;
};

export default function SingleProject({
  image,
  title,
  description,
  goal,
  raised,
  donations,
  onView,
}: ProjectCardProps) {
  const isRemote = typeof image === "string" && image.startsWith("http");

  return (
    <div className="Card max-w-[416px] bg-white">
      <div className="Image w-full h-[280px] relative overflow-hidden">
        {isRemote ? (
          <Image
            src={image as string}
            alt={title}
            fill
            className="rounded-t-[10px] object-cover"
            sizes="(max-width: 768px) 100vw, 416px"
          />
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-t-[10px] object-cover"
            sizes="(max-width: 768px) 100vw, 416px"
          />
        )}
      </div>

      <div className="max:h-[360px] p-3.5 md:p-5 shadow-sm rounded-b-[10px]">
        <h3 className="text-[20px] text-[#0e372d] md:text-[25px] font-bold">
          {title}
        </h3>
        <p className="text-gray-500 mt-2">{description}</p>

        <div className="font-semibold text-[#0e372d] flex items-center justify-between mt-2.5">
          <p>Goal: Ghs{goal}</p>
          <p>{donations}</p>
        </div>

        <div className="text-[13px] text-gray-500 flex items-center justify-between">
          <p>Raised: Ghs{raised}</p>
          <p>donations</p>
        </div>

        <div className="w-full mt-3.5">
          <button
            onClick={onView}
            className="w-full mt-3 bg-[#C4A54A] text-white px-4 py-2 rounded-lg hover:bg-black transition"
          >
            View Project
          </button>
        </div>
      </div>
    </div>
  );
}

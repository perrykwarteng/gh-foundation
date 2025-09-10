import Image, { StaticImageData } from "next/image";
type ProjectCardProps = {
  image: StaticImageData | string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  donations: number;
  buttonText?: string;
  onButtonClick?: () => void;
};
export default function SingleProject({
  image,
  title,
  description,
  goal,
  raised,
  donations,
}: ProjectCardProps) {
  return (
    <>
      <div className="Card max-w-[416px] bg-white">
        <div className="Image w-full max:h-[280px]">
          <Image
            className="rounded-t-[10px] w-full h-auto"
            src={image}
            alt={title}
          />
        </div>
        <div className="max:h-[360px] p-3.5 md:p-5 shadow-sm rounded-b-[10px]">
          <h3 className="text-[20px] text-[#0e372d] md:text-[25px] font-bold">
            {title}
          </h3>
          <p className="text-gray-500 mt-2">{description}</p>
          <div className="font-semibold flex items-center justify-between mt-2.5">
            <p>Goal: ${goal}</p>
            <p>{donations}</p>
          </div>
          <div className="text-[13px] text-gray-500 flex items-center justify-between">
            <p>Raised: ${raised}</p>
            <p>donations</p>
          </div>
          <div className="w-full mt-3.5">
            <button className="w-full bg-[#c4a54a] hover:bg-black text-white font-medium px-4 md:px-6 py-1 md:py-2 rounded-[10px] transition-all duration-150">
              View Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

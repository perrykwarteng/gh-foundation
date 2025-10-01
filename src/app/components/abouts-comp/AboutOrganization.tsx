import Image from "next/image";

import SideImg from "../../../../public/images/Ab2.jpg";
import SideImg2 from "../../../../public/images/Ab1.jpg";
import MissionImg from "../../../../public/icons/mission.svg";
import VisionImg from "../../../../public/icons/vission.svg";

export default function AboutOrganization() {
  return (
    <div className="py-10 px-6 md:px-14 h-full">
      <div className="flex items-center gap-8">
        <div className="w-full md:w-[50%]">
          <h3 className="text-[23px] md:text-[35px] font-semibold text-[#0e372d]">
            About our Organization
          </h3>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <Image src={MissionImg} alt="Mission Image" />
              <p className="text-[22px] text-gray-800 font-semibold">
                Our Mission
              </p>
            </div>
            <p className="mt-2 text-gray-500">
              Golden Height Foundation, based in Cape Coast, Ghana, mobilizes
              resources from individuals, faith groups, governmental bodies,
              NGOs, and civil society both locally and internationally, to
              transform lives in rural communities. Inspired by Frederick
              Douglass&apos; words: “It is easier to build strong children than
              to repair broken men.”
            </p>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2">
              <Image src={VisionImg} alt="Mission Image" />
              <p className="text-[22px] text-gray-800 font-semibold">
                Our Vision
              </p>
            </div>
            <p className="mt-2 text-gray-500">
              We envision a world where every child has access to quality
              education and every woman is empowered to become self-reliant,
              confident, and capable of shaping a brighter future. We believe
              every person carries a gem within, and with the right support,
              they can rise to golden heights.
            </p>
          </div>
        </div>
        <div className="w-full md:w-[50%] flex gap-5">
          <div className="max-w-[318px] max-h-[560px]">
            <Image
              className="w-full h-full rounded-[15px]"
              src={SideImg}
              alt="side"
            />
          </div>
          <div className="">
            <Image className="w-full h-full rounded-[15px]" src={SideImg2} alt="side" />
          </div>
        </div>
      </div>
    </div>
  );
}

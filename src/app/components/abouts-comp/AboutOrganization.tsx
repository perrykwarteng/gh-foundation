import Image from "next/image";

import SideImg from "../../../../public/icons/AboutSideImg.svg";
import MissionImg from "../../../../public/icons/mission.svg";
import VisionImg from "../../../../public/icons/vission.svg";
import ValuesImg from "../../../../public/icons/values.svg";

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
              Amet id in tristique bibendum justo netus augue id. Nunc tristique
              quis leo duis gravida volutpat vitae quam quam. Ultrices urna nec
              massa commodo
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
              Amet id in tristique bibendum justo netus augue id. Nunc tristique
              quis leo duis gravida volutpat vitae quam quam. Ultrices urna nec
              massa commodo
            </p>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2">
              <Image src={ValuesImg} alt="Mission Image" />
              <p className="text-[22px] text-gray-800 font-semibold">
                Our Values
              </p>
            </div>
            <p className="mt-2 text-gray-500">
              Amet id in tristique bibendum justo netus augue id. Nunc tristique
              quis leo duis gravida volutpat vitae quam quam. Ultrices urna nec
              massa commodo
            </p>
          </div>
        </div>
        <div className="w-full md:w-[50%] flex gap-5">
          <div className="max-w-[318px] max-h-[560px]">
            <Image className="w-full h-full" src={SideImg} alt="side" />
          </div>
          <div className="">
            <Image className="w-full h-full" src={SideImg} alt="side" />
          </div>
        </div>
      </div>
    </div>
  );
}

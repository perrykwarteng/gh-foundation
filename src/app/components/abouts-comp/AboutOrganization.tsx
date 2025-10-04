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
              &quot;Transforming rural communities by equipping pupils with
              access to modern computer labs and libraries, as well as
              empowering women with vocational skills and resources to create
              sustainable livelihoods.&quot;
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
              &quot;A future where every rural child learns in a well-equipped
              school and every woman is empowered to build sustainable
              livelihoods and transform their communities.&quot;
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
            <Image
              className="w-full h-full rounded-[15px]"
              src={SideImg2}
              alt="side"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

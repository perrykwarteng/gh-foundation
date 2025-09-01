import Image from "next/image";

import Education from "../../../../public/icons/edu.svg";
import Water from "../../../../public/icons/water.svg";
import Health from "../../../../public/icons/health.svg";
import Community from "../../../../public/icons/com.svg";

export default function Into() {
  return (
    <>
      <section className="bg-[#F8F9FA] py-10 px-6 md:px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Education */}
          <div className="flex gap-4 items-start">
            <Image src={Education} alt="education" className="w-10 h-10" />
            <div>
              <h3 className="text-[20px] font-bold">Education</h3>
              <p className="mt-2 text-gray-500">
                Fermentum nisl accumsan nisi <br /> sapien in vitae
              </p>
            </div>
          </div>

          {/* Clean Water */}
          <div className="flex gap-4 items-start">
            <Image src={Water} alt="clean water" className="w-10 h-10" />
            <div>
              <h3 className="text-[20px] font-bold">Clean Water</h3>
              <p className="mt-2 text-gray-500">
                Ultricies lacus turpis proin <br /> tempor faucibus
              </p>
            </div>
          </div>

          {/* Health Care */}
          <div className="flex gap-4 items-start">
            <Image src={Health} alt="health care" className="w-10 h-10" />
            <div>
              <h3 className="text-[20px] font-bold">Health Care</h3>
              <p className="mt-2 text-gray-500">
                Adipiscing in vitae necposue eget <br /> fringilla a morbi
              </p>
            </div>
          </div>

          {/* Communities */}
          <div className="flex gap-4 items-start">
            <Image src={Community} alt="communities" className="w-10 h-10" />
            <div>
              <h3 className="text-[20px] font-bold">Local Communities</h3>
              <p className="mt-2 text-gray-500">
                Nunc tristique quis leo duis gravida <br /> volutpat vitae
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

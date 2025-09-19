import Image from "next/image";

import InfoImg from "../../../../public/icons/AboutImg.svg";
import InfoProfile from "../../../../public/icons/profile.svg";

export default function AboutInfo() {
  return (
    <section className="py-10 px-6 md:px-14 h-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-14">
        <div className="w-full md:w-[50%]">
          <Image src={InfoImg} alt="" />
        </div>
        <div className="w-full md:w-[50%]">
          <h3 className="text-[30px] text-[#0e372d] md:text-[25px] lg:text-[38px] font-semibold">
            Make a Difference, Support Those in Need.
          </h3>
          <p className="text-gray-500 mt-3">
            Libero dictum ut purus ut vel sit egestas. Amet id in tristique
            bibendum justo netus augue id. Nunc tristique quis leo duis gravida
            volutpat vitae quam quam. Ultrices urna nec massa commodo id sit
            diam amet et. Libero dictum ut purus ut vel sit egestas. Ut ac
            mattis senectus ac suspendisse vitae vel nulla eleifend. Est eros
            facilisi aenean nisl a. Vitae et fusce purus consectetur. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Quae soluta
            voluptates labore aperiam earum distinctio.
          </p>

          <div className=" flex items-center gap-2 mt-4 md:mt-10">
            <Image src={InfoProfile} alt="" />
            <div className="">
              <h4 className="text-[#0e372d] font-semibold">Felipe Vaughn</h4>
              <p className="text-[13px] text-[#c4a54a]">Founder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

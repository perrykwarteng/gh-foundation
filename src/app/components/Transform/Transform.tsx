import Image from "next/image";
import React from "react";

import TransformImg from "../../../../public/images/Img1.jpg";

export default function Transform() {
  return (
    <>
      <section className="h-full md:h-screen bg-white flex flex-col md:flex-row items-center justify-center py-10 px-6 md:px-14">
        <div className="w-full md:w-[50%]">
          <div className="w-full md:max-w-[500px] aspect-square rounded-[20px] relative overflow-hidden">
            <Image
              src={TransformImg}
              alt="Transform Image"
              fill
              className="object-cover rounded-[20px]"
            />
            {/* <div className="absolute inset-0 bg-black/40 rounded-[20px]"></div> */}
          </div>
        </div>

        <div className="w-full md:w-[50%]">
          <div className="px-5">
            <h2 className="text-black font-bold text-[25px] md:text-[35px] mt-6 md:mt-0">
              Transforming Good Intentions into Good Actions
            </h2>
            <p className="text-gray-500 mt-5">
              Lorem ipsum dolor sit amet consectetur. Amet id in tristique
              bibendum justo netus augue id. Nunc tristique quis leo duis
              gravida volutpat vitae quam quam. Ultrices urna nec massa commodo
              id sit diam amet et. Libero dictum ut purus ut vel sit egestas. Ut
              ac mattis senectus ac suspendisse vitae vel nulla eleifend. Est
              eros facilisi aenean nisl a. Vitae et fusce purus consectetur
            </p>
            <div className="flex flex-col md:flex-row md:items-center gap-10 mt-6">
              <div className="">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#c4a54a] text-white">
                    1
                  </div>
                  <p className="font-semibold text-black">Choose your cause</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#c4a54a] text-white">
                    2
                  </div>
                  <p className="font-semibold text-black">
                    Register on our website
                  </p>
                </div>
              </div>
              <div className="">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#c4a54a] text-white">
                    3
                  </div>
                  <p className="font-semibold text-black">
                    Donate the amount you like
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#c4a54a] text-white">
                    4
                  </div>
                  <p className="font-semibold text-black">
                    Stay tuned about cause
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

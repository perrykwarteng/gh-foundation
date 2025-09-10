"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import TransformImg from "../../../../public/images/Img1.jpg";

export default function Transform() {
  return (
    <section className="h-full md:h-screen bg-white flex flex-col md:flex-row items-center justify-center py-10 px-6 md:px-14 overflow-hidden">
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="w-full max-w-[500px] aspect-square rounded-[20px] relative overflow-hidden">
          <Image
            src={TransformImg}
            alt="Transform Image"
            fill
            className="object-cover rounded-[20px]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 mt-8 md:mt-0"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="px-5">
          <h2 className="text-black font-bold text-[25px] md:text-[35px]">
            Transforming Good Intentions into Good Actions
          </h2>
          <p className="text-gray-500 mt-5">
            Lorem ipsum dolor sit amet consectetur. Amet id in tristique
            bibendum justo netus augue id. Nunc tristique quis leo duis gravida
            volutpat vitae quam quam. Ultrices urna nec massa commodo id sit
            diam amet et. Libero dictum ut purus ut vel sit egestas. Ut ac
            mattis senectus ac suspendisse vitae vel nulla eleifend. Est eros
            facilisi aenean nisl a. Vitae et fusce purus consectetur
          </p>

          <motion.div
            className="flex flex-col md:flex-row md:items-center gap-10 mt-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#0e372d] text-white text-sm">
                  1
                </div>
                <p className="font-semibold text-black">Choose your cause</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#0e372d] text-white text-sm">
                  2
                </div>
                <p className="font-semibold text-black">
                  Register on our website
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#0e372d] text-white text-sm">
                  3
                </div>
                <p className="font-semibold text-black">
                  Donate the amount you like
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#0e372d] text-white text-sm">
                  4
                </div>
                <p className="font-semibold text-black">
                  Stay tuned about cause
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import FAQS from "@/app/components/FAQ/Faqs";
import HeroText from "@/app/components/Hero-text/Hero-text";
import Layout from "@/app/components/Layouts/AppLayout";
import { motion } from "framer-motion";
import Image from "next/image";

import PhoneImg from "../../../../public/icons/phone.svg";
import ClockImg from "../../../../public/icons/clock.svg";
import MailImg from "../../../../public/icons/mail.svg";
import Facebook from "../../../../public/icons/Facebook.svg";
import X from "../../../../public/icons/X.svg";
import Instagram from "../../../../public/icons/Instagram.svg";
import ContactImg from "../../../../public/images/ContactImg.svg";
import Link from "next/link";

export default function Contact() {
  return (
    <Layout>
      <div className="py-10 px-6 md:px-14 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroText
            title="Contact Us"
            description="You are more than welcome to leave your contact info and we will be in touch shortly"
            breadcrumb={[{ name: "Home", href: "/" }, { name: "Contact" }]}
          />
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row my-10 gap-8 md:gap-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="bg-black w-full md:w-[40%] px-6 md:px-8 py-8 rounded-2xl md:rounded-none"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h3 className="text-white font-semibold text-3xl md:text-[40px] leading-tight">
              Share love, <br /> donate hope.
            </h3>
            <p className="text-gray-400 mt-3 text-sm md:text-base leading-relaxed">
              Golden Height Foundation (GHF) was born out of a lifelong passion
              for helping others — a passion I carried from childhood. In June
              2019, that passion transformed into a clear mission.
            </p>

            <p className="text-white font-medium mt-8 mb-4 text-sm md:text-base">
              De Rosetta Premises, Forecourt Valco Hall, University of Cape
              Coast, Cape Coast
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-x-3">
                <Image src={PhoneImg} alt="phone icon" />
                <p className="text-white text-sm md:text-base">
                  (+233) 55 685 3499
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <Image src={MailImg} alt="mail icon" />
                <p className="text-white text-sm md:text-base">
                  info@goldenheight.org
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <Image src={ClockImg} alt="clock icon" />
                <p className="text-white text-sm md:text-base">
                  Mon-Fri: 8:00am - 6:00pm
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 mt-10">
              <Link href="#">
                <Image
                  src={Facebook}
                  alt="Facebook Icon"
                  className="opacity-60 hover:opacity-100 transition duration-200"
                />
              </Link>
              <Link href="#">
                <Image
                  src={X}
                  alt="X Icon"
                  className="opacity-60 hover:opacity-100 transition duration-200"
                />
              </Link>
              <Link href="#">
                <Image
                  src={Instagram}
                  alt="Instagram Icon"
                  className="opacity-60 hover:opacity-100 transition duration-200"
                />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-[60%] bg-white px-6 md:px-8 py-8 rounded-2xl md:rounded-none shadow-md"
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-black font-semibold mb-2">
                    First Name
                  </label>
                  <input
                    className="w-full h-12 rounded-md bg-white border border-neutral-200 px-4 outline-none focus:ring-2 focus:ring-[#C4A54A]/40 focus:border-[#C4A54A]/60 placeholder-neutral-400"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label className="block text-black font-semibold mb-2">
                    Last Name
                  </label>
                  <input
                    className="w-full h-12 rounded-md bg-white border border-neutral-200 px-4 outline-none focus:ring-2 focus:ring-[#C4A54A]/40 focus:border-[#C4A54A]/60 placeholder-neutral-400"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-black font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    className="w-full h-12 rounded-md bg-white border border-neutral-200 px-4 outline-none focus:ring-2 focus:ring-[#C4A54A]/40 focus:border-[#C4A54A]/60 placeholder-neutral-400"
                    placeholder="Email Address"
                    type="email"
                  />
                </div>
                <div>
                  <label className="block text-black font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    className="w-full h-12 rounded-md bg-white border border-neutral-200 px-4 outline-none focus:ring-2 focus:ring-[#C4A54A]/40 focus:border-[#C4A54A]/60 placeholder-neutral-400"
                    placeholder="Phone Number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-black font-semibold mb-2">
                  Subject
                </label>
                <input
                  className="w-full h-12 rounded-md bg-white border border-neutral-200 px-4 outline-none focus:ring-2 focus:ring-[#C4A54A]/40 focus:border-[#C4A54A]/60 placeholder-neutral-400"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="block text-black font-semibold mb-2">
                  Message
                </label>
                <textarea
                  className="w-full min-h-[180px] rounded-md bg-white border border-neutral-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C4A54A]/40 focus:border-[#C4A54A]/60 placeholder-neutral-400 resize-y"
                  placeholder="Message"
                />
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center px-8 h-12 rounded-xl bg-[#C4A54A] text-white font-semibold tracking-wide shadow-[0_10px_20px_rgba(196,165,74,0.35)] hover:brightness-95 transition"
                >
                  SEND MESSAGE
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full max-w-[1296px] aspect-[16/5] mx-auto my-5"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src={ContactImg}
            alt="Contact Section"
            className="w-full h-full object-cover rounded-lg"
            priority
          />
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row items-start gap-8 md:gap-x-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="w-full md:w-[30%]">
            <h3 className="text-[#0e372d] font-semibold text-3xl md:text-[45px] leading-tight">
              Frequently <br className="hidden md:block" /> Asked{" "}
              <br className="hidden md:block" /> Questions
            </h3>
            <p className="text-black mt-3 text-base md:text-lg">
              Lorem ipsum dolor sit amet.
            </p>
          </div>

          <div className="w-full md:w-[70%] flex-1 mt-2">
            <FAQS />
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

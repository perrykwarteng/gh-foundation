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
import Tiktok from "../../../../public/icons/tiktok.png";
import { Linkedin } from "lucide-react";
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
            <h3 className="text-white capitalize font-semibold text-3xl md:text-[40px] leading-tight">
              Unlocking Potential, <br />
              Transforming Communities
            </h3>
            <p className="text-gray-400 mt-3 text-sm md:text-base leading-relaxed">
              Golden Height Foundation is more than a charity, it is a movement
              of empathy, hope and action. By supporting children and empowering
              women, we aim to build stronger families and brighter communities
              where everyone can rise beyond limits, toward golden heights.
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
                  info@goldenheightfoundation.org
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
              <Link
                href="https://www.web.facebook.com/profile.php?id=100075729007289"
                target="_blank"
              >
                <Image
                  src={Facebook}
                  alt="Facebook Icon"
                  className="opacity-50 hover:opacity-100 transition-all duration-100"
                />
              </Link>
              <Link
                href="https://www.linkedin.com/company/golden-height-foundation/about/"
                target="_blank"
                className="bg-white w-6 h-6 flex items-center justify-center rounded-full opacity-50 hover:opacity-100 transition-all duration-100"
              >
                <Linkedin className="text-black w-3.5 h-3.5" />
              </Link>

              <Link
                href="https://x.com/Goldenheight_gh?t=LViynigxig2P7iVUDZc_tg&s=08"
                target="_blank"
              >
                <Image
                  src={X}
                  alt="X Icon"
                  className="opacity-50 hover:opacity-100 transition-all duration-100"
                />
              </Link>
              <Link
                href="https://www.instagram.com/goldenheightfoundation/"
                target="_blank"
              >
                <Image
                  src={Instagram}
                  alt="Instagram Icon"
                  className="opacity-50 hover:opacity-100 transition-all duration-100"
                />
              </Link>
              <Link
                href="https://www.tiktok.com/@golden.height.fou?_t=ZM-9006aRS1mWq&_r=1"
                target="_blank"
                className="bg-white w-6 h-6 flex items-center justify-center rounded-full opacity-50 hover:opacity-100 transition-all duration-100"
              >
                <Image
                  src={Tiktok}
                  alt="Instagram Icon"
                  className="w-3.5 h-3.5"
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
            <form
              action="mailto:info@goldenheightfoundation.org?cc=moboadu@goldenheightfoundation.org"
              method="post"
              encType="text/plain"
              className="space-y-6"
            >
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

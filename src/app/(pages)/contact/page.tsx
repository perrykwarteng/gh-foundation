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
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/contact-messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: formData }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(
        "Thank you for your submission and we will contact you shortly!"
      );
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  

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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-black font-semibold mb-2">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full h-12 rounded-md bg-white border border-neutral-200 px-4"
                  />
                </div>
                <div>
                  <label className="block text-black font-semibold mb-2">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
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
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full h-12 rounded-md bg-white border border-neutral-200 px-4 outline-none focus:ring-2 focus:ring-[#C4A54A]/40 focus:border-[#C4A54A]/60 placeholder-neutral-400"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="block text-black font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full min-h-[180px] rounded-md bg-white border border-neutral-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C4A54A]/40 focus:border-[#C4A54A]/60 placeholder-neutral-400 resize-y"
                  placeholder="Message"
                />
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-8 h-12 rounded-xl bg-[#C4A54A] text-white font-semibold"
                >
                  {loading ? "SENDING..." : "SEND MESSAGE"}
                </motion.button>
                {success && (
                  <p className="text-green-600 font-medium ms-3">{success}</p>
                )}
                {error && (
                  <p className="text-red-600 font-medium ms-3">{error}</p>
                )}
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

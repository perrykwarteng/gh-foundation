"use client";

import { useEffect, useState } from "react";
import HeroText from "@/app/components/Hero-text/Hero-text";
import Layout from "@/app/components/Layouts/AppLayout";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";

import PhoneImg from "../../../../public/icons/phone.svg";
import ClockImg from "../../../../public/icons/clock.svg";
import MailImg from "../../../../public/icons/mail.svg";
import Facebook from "../../../../public/icons/Facebook.svg";
import X from "../../../../public/icons/X.svg";
import Instagram from "../../../../public/icons/Instagram.svg";
import Tiktok from "../../../../public/icons/tiktok.png";
import ContactImg from "../../../../public/images/ContactImg.svg";

type Faq = {
  id: number;
  question: string;
  answer: string;
};

type ContactPageData = {
  title: string;
  description: string;
  heading: string;
  paragraph: string;
  contact: {
    address: string;
    phone: string;
    email: string;
    workingHours: string;
  };
  faqs: Faq[];
};

const FALLBACK_DATA: ContactPageData = {
  title: "Contact Us",
  description:
    "You are more than welcome to leave your contact info and we will be in touch shortly",
  heading: "Unlocking Potential, Transforming Communities",
  paragraph:
    "Golden Height Foundation is more than a charity, it is a movement of empathy, hope and action. By supporting children and empowering women, we aim to build stronger families and brighter communities where everyone can rise beyond limits, toward golden heights.",
  contact: {
    address:
      "De Rosetta Premises, Forecourt Valco Hall, University of Cape Coast, Cape Coast",
    phone: "(+233) 55 685 3499",
    email: "info@goldenheightfoundation.org",
    workingHours: "Mon-Fri: 8:00am - 6:00pm",
  },
  faqs: [
    {
      id: 1,
      question: "What charities can I give to?",
      answer:
        "You can give to a wide variety of registered charities including education, health, poverty alleviation, and environmental organizations.",
    },
    {
      id: 2,
      question: "How do I track my donations?",
      answer:
        "Once you donate, you will receive an email confirmation. You can also log into your account to view a full donation history.",
    },
    {
      id: 3,
      question: "Are my donations tax deductible?",
      answer:
        "Yes, all donations made through our platform are tax deductible, and you will receive a statement at the end of the year.",
    },
    {
      id: 4,
      question: "Can I set up recurring donations?",
      answer:
        "Absolutely! You can set up weekly, monthly, or yearly recurring donations, and manage them anytime from your account dashboard.",
    },
  ],
};

const FAQSInline = ({ faqs }: { faqs: Faq[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full">
      {faqs.map((faq, index) => (
        <div
          key={faq.id}
          className={`${
            openIndex === index
              ? "bg-[#F8F9FA] rounded-2xl p-6 md:p-8"
              : "p-6 md:p-8"
          } mb-4 transition-all`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-xl text-[#0e372d] md:text-[22px] font-semibold">
                {faq.question}
              </h3>
              {openIndex === index && (
                <p className="mt-3 text-neutral-600 leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
            <button
              aria-label="Toggle FAQ"
              onClick={() => toggleFaq(index)}
              className={`${
                openIndex === index
                  ? "shrink-0 h-9 w-9 rounded-full bg-[#C4A54A] text-white grid place-items-center transition"
                  : "shrink-0 h-9 w-9 rounded-full border-2 text-black grid place-items-center transition"
              }`}
            >
              {openIndex === index ? "−" : "+"}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default function Contact() {
  const [pageData, setPageData] = useState<ContactPageData>(FALLBACK_DATA);
  const [contentError, setContentError] = useState(false);

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

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/contact-page?populate[faq]=true&populate[heading]=true&populate[paragraph]=true&populate[contact]=true`
        );
        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();
        const data = json?.data;

        setPageData({
          title: data?.title ?? FALLBACK_DATA.title,
          description: data?.description ?? FALLBACK_DATA.description,
          heading: data?.heading?.title ?? FALLBACK_DATA.heading,
          paragraph:
            data?.paragraph?.content?.[0]?.children?.[0]?.text ??
            FALLBACK_DATA.paragraph,
          contact: {
            address: data?.contact?.address ?? FALLBACK_DATA.contact.address,
            phone: data?.contact?.phone ?? FALLBACK_DATA.contact.phone,
            email: data?.contact?.email ?? FALLBACK_DATA.contact.email,
            workingHours:
              data?.contact?.workingHours ?? FALLBACK_DATA.contact.workingHours,
          },
          faqs: data?.faq ?? FALLBACK_DATA.faqs,
        });
      } catch (err) {
        console.error("Failed to fetch contact page:", err);
        setContentError(true);
      }
    };

    fetchPageData();
  }, []);

  return (
    <Layout>
      <div className="py-10 px-6 md:px-14 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroText
            title={pageData.title}
            description={pageData.description}
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
              {pageData.heading}
            </h3>
            <p className="text-gray-400 mt-3 text-sm md:text-base leading-relaxed">
              {pageData.paragraph}
            </p>

            <p className="text-white font-medium mt-8 mb-4 text-sm md:text-base">
              {pageData.contact.address}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-x-3">
                <Image src={PhoneImg} alt="phone icon" />
                <p className="text-white text-sm md:text-base">
                  {pageData.contact.phone}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <Image src={MailImg} alt="mail icon" />
                <p className="text-white text-sm md:text-base">
                  {pageData.contact.email}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <Image src={ClockImg} alt="clock icon" />
                <p className="text-white text-sm md:text-base">
                  {pageData.contact.workingHours}
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
              <Link href="https://x.com/Goldenheight_gh" target="_blank">
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
                href="https://www.tiktok.com/@golden.height.fou"
                target="_blank"
                className="bg-white w-6 h-6 flex items-center justify-center rounded-full opacity-50 hover:opacity-100 transition-all duration-100"
              >
                <Image src={Tiktok} alt="TikTok" className="w-3.5 h-3.5" />
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
                    className="w-full h-12 rounded-md text-black bg-white border border-neutral-200 px-4"
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
                    className="w-full h-12 rounded-md text-black bg-white border border-neutral-200 px-4 outline-none focus:ring-2 focus:ring-[#C4A54A]/40 focus:border-[#C4A54A]/60 placeholder-neutral-400"
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
                    className="w-full h-12 rounded-md text-black bg-white border border-neutral-200 px-4 outline-none focus:ring-2 focus:ring-[#C4A54A]/40 focus:border-[#C4A54A]/60 placeholder-neutral-400"
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
                    className="w-full h-12 rounded-md text-black bg-white border border-neutral-200 px-4 outline-none focus:ring-2 focus:ring-[#C4A54A]/40 focus:border-[#C4A54A]/60 placeholder-neutral-400"
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
                  className="w-full h-12 rounded-md text-black bg-white border border-neutral-200 px-4 outline-none focus:ring-2 focus:ring-[#C4A54A]/40 focus:border-[#C4A54A]/60 placeholder-neutral-400"
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
                  className="w-full min-h-[180px] text-black rounded-md bg-white border border-neutral-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C4A54A]/40 focus:border-[#C4A54A]/60 placeholder-neutral-400 resize-y"
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
          className="flex flex-col md:flex-row items-start gap-8 md:gap-x-10 mt-10"
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
            {contentError && (
              <p className="text-orange-500 mt-2 text-sm">
                Showing cached content due to network issues.
              </p>
            )}
          </div>

          <div className="w-full md:w-[70%] flex-1 mt-2">
            <FAQSInline faqs={pageData.faqs} />
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

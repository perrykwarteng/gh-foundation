"use client";

import React, { useMemo } from "react";
import Layout from "@/app/components/Layouts/AppLayout";
import HeroText from "@/app/components/Hero-text/Hero-text";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { Linkedin, Twitter, Github } from "lucide-react";

import GabrielImg from "../../../../public/images/team/Gabriel.jpeg";
import MavisImg from "../../../../public/images/team/Mavis.jpeg";
import RosettaImg from "../../../../public/images/team/Rosetta.jpeg";
import PrinceImg from "../../../../public/images/team/Prince.jpeg";
import MatthewImg from "../../../../public/images/team/Matthew.jpeg";
import IsaacImg from "../../../../public/images/team/Isaac.jpeg";

export type Person = {
  image?: StaticImageData | null;
  id: string;
  name: string;
  title: string;
  group: "Founders" | "Leadership" | "Team" | "Volunteers" | string;
  bio?: string;
  email?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
};

export default function Team() {
  const people: Person[] = useMemo(
    () => [
      {
        id: "p1",
        name: "Dr (Mrs) Mavis Opoku Boadu (CA)",
        title: "Founder/Executive Director",
        group: "Founder",
        image: MavisImg,
        bio: "Dr. (Mrs.) Mavis Opoku-Boadu is a distinguished Chartered Accountant, Financial Consultant, and Philanthropist whose passion extends far beyond numbers. A dynamic Motivational Speaker, Moderator, and devoted Advocate for Children and Women, she embodies compassion in action. Drawing on her rich experience as a mother, wife, and professional, Mavis blends expertise with empathy, transforming lives through purpose-driven leadership. At the Golden Height Foundation, she champions education, women’s empowerment, and community transformation, guided by an unwavering belief that every child and woman deserves the chance to learn, rise, and thrive.",
        socials: {
          linkedin: "https://www.linkedin.com/in/dr-mrs-mavis-opoku-boadu",
        },
      },
      {
        id: "p2",
        name: "Dr Prince Akowuah Aning",
        title: "Strategy Advisor",
        group: "Leadership",
        image: PrinceImg,
        bio: "Dr. Prince Aning is a strategist, academic, and managing consultant with extensive business experience in Africa and the UK. Holding a PhD from the UK focused on business innovation in challenging environments, he lectures at Ashesi University and the University of Utah, and advises growth-oriented SMEs across Africa. A passionate advocate for Africa’s economic transformation, he provides research-backed insights on strategy, entrepreneurship, and industrial policy. At Golden Height Foundation, Dr. Aning brings his expertise to strengthen strategic planning, sustainability, and impact-driven growth.",
        socials: {
          linkedin: "https://linkedin.com/in/prince",
          twitter: "https://twitter.com/prince",
        },
      },
      {
        id: "p3",
        name: "Mrs Rosetta Marfowaa Asare",
        title: "Donor & Partnerships Manager",
        group: "Leadership",
        image: RosettaImg,
        bio: "Rosetta Asare is a Senior Financial Analyst with over five years of experience in financial planning, forecasting, and executive reporting across organizations such as Veolia Water Technologies & Solutions and Canada Pension Plan Investments. Holding an MBA in Financial Management, she specializes in transforming complex data into clear, actionable strategies. Beyond her corporate career, Rosetta serves as Donor and Partnerships Manager at Golden Height Foundation, advancing its mission to unlock potential through education, empowerment, and collaboration. To her, Golden Height is more than an organization it’s a movement rooted in dignity and lasting change.",
        socials: {
          linkedin: "https://linkedin.com/in/rosetta",
          twitter: "https://twitter.com/rosetta",
        },
      },
      {
        id: "p5",
        name: "Mr Matthew Amissah (CA)",
        title: "Treasurer",
        group: "Leadership",
        image: MatthewImg,
        bio: "Matthew oversees the financial management of the foundation, Having a strong background in finance and management, Matthew ensures sound financial planning, compliance, and strategic decision-making to support the company’s growth objectives. He holds an MBA (Finance) and is a member of the Institute of Chartered Accountants, Ghana (ICAG). Amissah is a charismatic leader, a dedicated team player, and a goal-oriented professional committed to excellence and organizational success.",
        socials: {
          linkedin: "https://linkedin.com/in/matthew",
          twitter: "https://twitter.com/matthew",
        },
      },
      {
        id: "p6",
        name: "Mr Gabriel Annan Dowuona (MSc. IT)",
        title: "Programs Coordinator",
        group: "Leadership",
        image: GabrielImg,
        bio: "Gabriel Annan Dowuona is a computer engineer with over 15years experience in IT Support, IT Project Management, Database Management, Computer networking, Systems Administration, and Cloud Computing. He is a certified Professional Ethical Hacker, Amazon Cloud Practitioner, A member of Internet Society, A member of the Information Technology and Disaster Resource Center, A certified Cybersecurity Practitioner with the Cybersecurity Authority Ghana.",
        socials: {
          linkedin: "https://linkedin.com/in/gadowuona",
        },
      },
      {
        id: "p7",
        name: "Mr Isaac Yeboah Nsaful",
        title: "Head on Administration & Training",
        group: "Leadership",
        bio: "An accomplished administrator with proven expertise in organizational management, staff development, and operational efficiency within the Foundation. Adept at designing and implementing training programmes that build capacity and drive institutional performance. Committed to fostering excellence, accountability, and sustainable growth across all administrative and training functions of the Foundation.",
        image: IsaacImg,
        socials: {
          linkedin: "https://linkedin.com/in/",
        },
      },
    ],
    []
  );

  return (
    <Layout>
      <div className="min-h-screen bg-white text-black">
        {/* Header */}
        <header className="py-10 px-6 md:px-14 bg-gradient-to-b from-neutral-50 to-white">
          <HeroText
            title="Our Team"
            description="Meet the dedicated individuals working passionately behind the scenes to drive our mission and create meaningful impact."
            breadcrumb={[{ name: "Home", href: "/" }, { name: "Our Team" }]}
          />
        </header>

        {/* Team Sections */}
        <main className="py-10 px-6 md:px-14">
          <TeamSection
            title="Founder"
            people={people.filter((p) => p.group === "Founder")}
            highlight
          />
          <TeamSection
            title="Leadership"
            people={people.filter((p) => p.group === "Leadership")}
          />
          <TeamSection
            title="Team"
            people={people.filter((p) => p.group === "Team")}
          />
          <TeamSection
            title="Volunteers"
            people={people.filter((p) => p.group === "Volunteers")}
            subtle
          />
        </main>
      </div>
    </Layout>
  );
}

function TeamSection({
  title,
  people,
  subtle = false,
}: {
  title: string;
  people: Person[];
  highlight?: boolean;
  subtle?: boolean;
}) {
  if (!people.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-6"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#0e372d] h-6 w-1.5 rounded-full" />
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {title}
        </h2>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-3 xl:grid-cols-4 gap-8"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {people.map((p) => (
          <Card key={p.id} person={p} subtle={subtle} />
        ))}
      </motion.div>
    </motion.section>
  );
}

function Card({ person, subtle }: { person: Person; subtle?: boolean }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
      className="group relative rounded-[15px] border border-neutral-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0e372d] to-emerald-500" />

      <div className="flex justify-center mt-8">
        <div className="relative w-50 h-50 rounded-full overflow-hidden border-4 border-white shadow-md">
          {person.image ? (
            <Image
              src={person.image}
              alt={person.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          ) : (
            <Avatar name={person.name} />
          )}
        </div>
      </div>

      <div className="px-4 pb-6 pt-4 text-center">
        <h3 className="text-xl font-semibold text-[#0e372d] group-hover:text-emerald-700 transition">
          {person.name}
        </h3>
        <p
          className={`text-sm mt-1 ${
            subtle ? "text-neutral-500" : "text-neutral-600"
          }`}
        >
          {person.title}
        </p>
        <p className="text-xs text-neutral-400 uppercase tracking-wide">
          {person.group}
        </p>

        {person.bio && (
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            {person.bio}
          </p>
        )}

        {person.socials && (
          <div className="flex justify-center gap-5 mt-5">
            {person.socials.linkedin && (
              <a
                href={person.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-[#0e372d] transition-colors"
              >
                <Linkedin size={20} />
              </a>
            )}
            {person.socials.twitter && (
              <a
                href={person.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-[#0e372d] transition-colors"
              >
                <Twitter size={20} />
              </a>
            )}
            {person.socials.github && (
              <a
                href={person.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-[#0e372d] transition-colors"
              >
                <Github size={20} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-full h-80 bg-neutral-100 border-b border-neutral-200 grid place-items-center text-neutral-700 text-4xl font-semibold">
      {initials}
    </div>
  );
}

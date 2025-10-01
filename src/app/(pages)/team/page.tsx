"use client";

import React, { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Layout from "@/app/components/Layouts/AppLayout";
import HeroText from "@/app/components/Hero-text/Hero-text";
import Blog from "@/app/components/Blog/Blog";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

import GabrielImg from "../../../../public/images/team/Gabriel.jpeg";
import MavisImg from "../../../../public/images/team/Mavis.jpeg";
import RosettaImg from "../../../../public/images/team/Rosetta.jpeg";
import PrinceImg from "../../../../public/images/team/Prince.jpeg";

export type Person = {
  image?: StaticImageData | null;
  id: string;
  name: string;
  title: string;
  group: "Founders" | "Leadership" | "Team" | "Volunteers" | string;
  email?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
};

export default function Team() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<TeamGroup | "All">("All");

  const roles: TeamGroup[] = ["Founders", "Leadership", "Team", "Volunteers"];

  const people: Person[] = useMemo(
    () => [
      // ------- FOUNDERS -------
      {
        id: "p1",
        name: "Dr (Mrs) Mavis Opoku Boadu",
        title: "Founder/Executive Director",
        group: "Founders",
        image: MavisImg,
        socials: { linkedin: "#", twitter: "#" },
      },
      // ------- LEADERSHIP -------
      {
        id: "p2",
        name: "Dr Prince Akowuah Aning",
        title: "Strategy Advisor",
        group: "Leadership",
        image: PrinceImg,
        socials: { linkedin: "#" },
      },
      {
        id: "p3",
        name: "Mrs Rosetta Marfowaa Asare",
        title: "Doner & Partnerships Manager",
        group: "Leadership",
        image: RosettaImg,
        socials: { linkedin: "#" },
      },
      {
        id: "p5",
        name: "Mr Matthew Amissah",
        title: "Treasurer",
        group: "Leadership",
      },
      {
        id: "p6",
        name: "Mr Gabriel",
        title: "",
        group: "Leadership",
        image: GabrielImg,
        socials: { linkedin: "#" },
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    return people.filter((p) => {
      const matchQuery =
        !qLower ||
        `${p.name} ${p.title} ${p.group}`.toLowerCase().includes(qLower);
      const matchRole = role === "All" || p.group === role;
      return matchQuery && matchRole;
    });
  }, [people, q, role]);

  return (
    <Layout>
      <div className="min-h-screen bg-white text-black">
        <header className="py-10 px-6 md:px-14 bg-gradient-to-b from-neutral-50 to-white">
          <HeroText
            title="Our Team"
            description="Meet the dedicated individuals working passionately behind the scenes to drive our mission and create meaningful impact."
            breadcrumb={[{ name: "Home", href: "/" }, { name: "Our Team" }]}
          />
        </header>

        <main className="py-10 px-6 md:px-14">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch justify-end sm:items-center gap-3"
          >
            {/* Search */}
            <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 h-12 w-full sm:w-[360px]">
              <Search className="h-5 w-5 text-neutral-500" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name, role or group…"
                className="w-full outline-none placeholder-neutral-400"
              />
            </div>

            {/* Role select */}
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as TeamGroup | "All")}
                className="appearance-none pr-10 pl-4 h-12 rounded-xl border border-neutral-200 bg-white text-sm font-medium"
              >
                <option value="All">All</option>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            </div>
          </motion.div>

          {/* Team sections */}
          <TeamSection
            title="Founders"
            people={filtered.filter((p) => p.group === "Founders")}
            highlight
          />
          <TeamSection
            title="Leadership"
            people={filtered.filter((p) => p.group === "Leadership")}
          />
          <TeamSection
            title="Team"
            people={filtered.filter((p) => p.group === "Team")}
          />
          <TeamSection
            title="Volunteers"
            people={filtered.filter((p) => p.group === "Volunteers")}
            subtle
          />
        </main>
      </div>
    </Layout>
  );
}

// ---------------- Team Section ----------------
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
      className="mt-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#0e372d] h-6 w-1.5 rounded-full" />
        <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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

// ---------------- Card ----------------
function Card({ person, subtle }: { person: Person; subtle?: boolean }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        show: { opacity: 1, scale: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition"
    >
      <div className="flex items-center gap-4">
        {person.image ? (
          <Image
            src={person.image}
            alt={person.name}
            className="w-[48px] h-[48px] rounded-full object-cover"
          />
        ) : (
          <Avatar name={person.name} />
        )}
        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            {person.name}
          </h3>
          <p
            className={`text-sm ${
              subtle ? "text-neutral-500" : "text-neutral-600"
            }`}
          >
            {person.title}
          </p>
          <p className="mt-0.5 text-xs text-neutral-400">{person.group}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------- Avatar ----------------
function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="h-14 w-14 rounded-full bg-neutral-100 border border-neutral-200 grid place-items-center text-neutral-700 font-semibold">
      {initials}
    </div>
  );
}

// ---------------- Team Groups ----------------
type TeamGroup = "Founders" | "Leadership" | "Team" | "Volunteers";

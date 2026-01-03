"use client";

import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/app/components/Layouts/AppLayout";
import HeroText from "@/app/components/Hero-text/Hero-text";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Twitter, Github } from "lucide-react";

type ApiTeamMember = {
  id: number;
  name?: string | null;
  title?: string | null;
  group?: string | null;
  bio?: string | null;
  image?: {
    url?: string | null;
    alternativeText?: string | null;
    formats?: {
      thumbnail?: { url?: string | null };
      small?: { url?: string | null };
      medium?: { url?: string | null };
    } | null;
  } | null;
  social?: {
    linkedInLink?: string | null;
    xLink?: string | null;
    facebookLink?: string | null;
    instagramLink?: string | null;
    tiktokLink?: string | null;
  } | null;
};

export type Person = {
  imageUrl?: string | null;
  id: string;
  name: string;
  title: string;
  group: string;
  bio?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
};

function normalizeGroup(group?: string | null) {
  const g = (group || "").trim();
  if (!g) return "Team";

  const cleaned = g.replace(/\s+/g, " ").trim();

  const lower = cleaned.toLowerCase();
  if (lower === "founder" || lower === "founders") return "Founder";
  if (lower === "leadership") return "Leadership";
  if (lower === "team") return "Team";
  if (lower === "volunteers" || lower === "volunteers ") return "Volunteers";
  if (lower === "board of trustees") return "Board of Trustees";

  return cleaned;
}

function getStrapiBase() {
  const strapi = (process.env.NEXT_PUBLIC_BASE_API_STRAPI || "").replace(
    /\/$/,
    ""
  );
  // const api = (process.env.NEXT_PUBLIC_BASE_API || "").replace(/\/$/, "");

  return strapi || "";
}

function withAbsoluteUrl(path?: string | null) {
  if (!path) return null;

  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const base = getStrapiBase();
  if (!base) return null;

  const b = base.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

function pickBestImageUrl(img?: ApiTeamMember["image"]) {
  if (!img) return null;

  const medium = img.formats?.medium?.url;
  const small = img.formats?.small?.url;
  const thumb = img.formats?.thumbnail?.url;
  const original = img.url;

  return withAbsoluteUrl(medium || small || original || thumb || null);
}

export default function Team() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const apiBase = (process.env.NEXT_PUBLIC_BASE_API || "").replace(
          /\/$/,
          ""
        );
        if (!apiBase) {
          throw new Error("NEXT_PUBLIC_BASE_API is not set.");
        }

        const endpoint =
          `${apiBase}/team-page` +
          `?populate[team][populate][image]=true&populate[team][populate][social]=true`;

        const res = await fetch(endpoint, { cache: "no-store" });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const json = await res.json();

        const apiTeam: ApiTeamMember[] = json?.data?.team ?? [];

        const mapped: Person[] = apiTeam.map((m) => {
          const name = (m.name || "").trim() || "Unnamed Member";
          const title = (m.title || "").trim() || "Team Member";
          const group = normalizeGroup(m.group);

          const imageUrl = pickBestImageUrl(m.image);

          const linkedin = m.social?.linkedInLink || undefined;
          const twitter = m.social?.xLink || undefined;

          const socials =
            linkedin || twitter
              ? {
                  linkedin,
                  twitter,
                }
              : undefined;

          return {
            id: String(m.id),
            name,
            title,
            group,
            bio: (m.bio || "").trim() || undefined,
            imageUrl,
            socials,
          };
        });

        if (!cancelled) setPeople(mapped);
      } catch (e: unknown) {
        const message =
          e instanceof Error ? e.message : "Failed to load team members.";
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const grouped = useMemo(() => {
    const buckets = new Map<string, Person[]>();
    for (const p of people) {
      const key = normalizeGroup(p.group);
      buckets.set(key, [...(buckets.get(key) || []), p]);
    }
    return buckets;
  }, [people]);

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
          {loading && (
            <div className="text-neutral-600">Loading team members…</div>
          )}

          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
              <div className="text-sm text-red-600 mt-1">
                Showing no data because the API failed.
              </div>
            </div>
          )}

          {!loading && !error && people.length === 0 && (
            <div className="text-neutral-600">No team members found yet.</div>
          )}

          {!loading && !error && (
            <>
              <TeamSection
                title="Founder"
                people={grouped.get("Founder") || []}
                highlight
              />
              <TeamSection
                title="Leadership"
                people={grouped.get("Leadership") || []}
              />
              <TeamSection title="Team" people={grouped.get("Team") || []} />
              <TeamSection
                title="Volunteers"
                people={grouped.get("Volunteers") || []}
                subtle
              />
              <TeamSection
                title="Board of Trustees"
                people={grouped.get("Board of Trustees") || []}
                subtle
              />
            </>
          )}
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
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
        <div className="relative w-[128px] h-[128px] rounded-full overflow-hidden border-4 border-white shadow-md bg-neutral-100">
          {person.imageUrl ? (
            <Image
              src={person.imageUrl}
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
          {person.title || "Team Member"}
        </p>

        <p className="text-xs text-neutral-400 uppercase tracking-wide">
          {person.group || "Team"}
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
                aria-label="LinkedIn"
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
                aria-label="Twitter/X"
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
                aria-label="GitHub"
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
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="w-full h-full grid place-items-center text-neutral-700 text-3xl font-semibold">
      {initials || "?"}
    </div>
  );
}

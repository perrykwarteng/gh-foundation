"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Layout from "@/app/components/Layouts/AppLayout";
import HeroText from "@/app/components/Hero-text/Hero-text";
import { ImagessData, GalleryItem } from "./gallery-data";

const ACCENT = "#c4a54a";
const DEEP = "#0e372d";

const MasonryItem: React.FC<{ item: GalleryItem }> = ({ item }) => {
  return (
    <figure className="mb-4 break-inside-avoid rounded-2xl overflow-hidden shadow-sm bg-white">
      {item.type === "image" ? (
        <Image
          src={item.src}
          alt={item.alt ?? "Gallery image"}
          className="w-full h-auto object-cover"
          width={600}
          height={400}
        />
      ) : (
        <video
          controls
          preload="metadata"
          poster={item.poster}
          className="w-full h-auto"
        >
          <source src={item.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </figure>
  );
};

const FilterPill: React.FC<{
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-full border transition-all text-sm md:text-base whitespace-nowrap shadow-sm"
    style={{
      background: active ? ACCENT : "#ffffff",
      color: active ? "#0b0b0b" : DEEP,
      borderColor: active ? ACCENT : DEEP,
    }}
  >
    {label}
  </button>
);

export default function Gallery() {
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [visible, setVisible] = useState(6);

  useEffect(() => {
    setVisible(10);
  }, [filter]);

  const filtered = useMemo(() => {
    if (filter === "all") return ImagessData;
    return ImagessData.filter((m) => m.type === filter);
  }, [filter]);

  const toShow = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  return (
    <Layout>
      <main className="min-h-screen bg-white py-10 px-6 md:px-14">
        <HeroText
          breadcrumb={[{ name: "Home", href: "/" }, { name: "Gallery" }]}
          title="Gallery"
          description="A clean, light masonry grid with filters for images and videos."
        />

        <div className="flex justify-end">
          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <FilterPill
              label="All"
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />
            <FilterPill
              label="Images"
              active={filter === "image"}
              onClick={() => setFilter("image")}
            />
            <FilterPill
              label="Videos"
              active={filter === "video"}
              onClick={() => setFilter("video")}
            />
          </div>
        </div>

        <section className="max-w-7xl mx-auto mt-8">
          <div className="[&>*]:mb-4">
            <style>{`
              @media (min-width: 640px) { .masonry { column-count: 2; column-gap: 1rem; } }
              @media (min-width: 1024px) { .masonry { column-count: 3; column-gap: 1rem; } }
              @media (min-width: 1280px) { .masonry { column-count: 4; column-gap: 1.25rem; } }
            `}</style>

            <div className="masonry">
              {toShow.map((item) => (
                <MasonryItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="flex justify-center my-10">
            <button
              onClick={() =>
                setVisible((v) => Math.min(v + 3, filtered.length))
              }
              disabled={!canLoadMore}
              className={`px-6 py-3 rounded-xl font-medium shadow-sm border transition-all ${
                canLoadMore
                  ? "hover:translate-y-[-1px]"
                  : "opacity-50 cursor-not-allowed"
              }`}
              style={{
                background: canLoadMore ? "#ffffff" : "#f0f0ea",
                color: DEEP,
                borderColor: ACCENT,
              }}
            >
              {canLoadMore ? "Load more" : "All items loaded"}
            </button>
          </div>
        </section>
      </main>
    </Layout>
  );
}

"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import WhatWeDoImg from "../../../../public/images/wwd.jpg";
import {
  ABOUT_FALLBACK,
  fetchAboutContent,
  strapiUrl,
  type AboutApiResponse,
} from "@/app/lib/about-content";

type Item = { title: string; body: string };

type RichTextChild = { text?: string };

type RichTextBlock = {
  content?: {
    children?: RichTextChild[];
  }[];
};

type WhatWeDoBlock = {
  id?: number;
  image?: { url?: string };
  content?: RichTextBlock["content"];
};

function pickBestImageUrl(imageUrl?: string) {
  const u = strapiUrl(imageUrl);
  return u && typeof u === "string" ? u : "";
}

function extractTextFromBlock(block?: RichTextBlock): string[] {
  const nodes = block?.content ?? [];
  return nodes
    .map((p) =>
      (p?.children ?? []).map((c) => (c?.text ? String(c.text) : "")).join("")
    )
    .map((t) => t.trim())
    .filter(Boolean);
}

function buildWhatWeDoItems(lines: string[]): Item[] {
  const items: Item[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isHeading = /^\d+\.\s+/.test(line);
    if (!isHeading) continue;

    const title = line;
    const body =
      lines[i + 1] && !/^\d+\.\s+/.test(lines[i + 1]) ? lines[i + 1] : "";

    items.push({ title, body });
  }
  return items;
}

const DEFAULT_ITEMS: Item[] = [
  {
    title: "1. Educational Support for Pupils",
    body: "Golden Height addresses the resource gap in rural schools by equipping classrooms with solar-powered computer labs, libraries, and digital content. We provide backpacks, stationery, and teaching aids to ensure pupils are well-prepared, while also upgrading classrooms and reading corners into safe, engaging learning spaces. To enhance delivery, we train teachers in digital and computer skills, nurturing creativity and problem-solving among pupils.",
  },
  {
    title: "2. Partnerships with Schools, Communities & Donors",
    body: "We collaborate with the Ghana Education Service, PTAs, and local leaders to identify schools most in need. Our partnerships extend to international donor agencies, NGOs, corporate sponsors, and universities, ensuring interventions are well-resourced and sustainable. Together, we align local initiatives with global development goals, creating long-lasting impact.",
  },
  {
    title: "3. Women’s Vocational Training & Empowerment",
    body: "We empower rural women with practical vocational skills in soap-making, catering, tailoring, and beadwork, while also providing training in financial literacy, bookkeeping, and digital marketing. By supporting women-led cooperatives and enterprises, we help reduce poverty, strengthen family stability, and foster leadership in communities.",
  },
  {
    title: "4. Sustainable & Scalable Impact",
    body: "Our model begins with three annual school donations, allowing for measurable impact, and gradually scales toward monthly outreach programs. By leveraging solar energy and community ownership, we reinvest in libraries, computer labs, and women’s cooperatives, creating a cycle of empowerment where children access quality education, women achieve sustainable incomes, and entire communities thrive.",
  },
];

export default function WhatWeDo() {
  const [apiData, setApiData] = useState<AboutApiResponse | null>(null);

  // ✅ image fallback state (reliable for next/image)
  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const result = await fetchAboutContent();
        if (mounted) setApiData(result);
      } catch {
        if (mounted) setApiData(ABOUT_FALLBACK);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const { imageUrl, items } = useMemo(() => {
    const blocks = (apiData?.data?.content ?? []) as WhatWeDoBlock[];
    const wwdBlock = blocks.find((b) => b?.id === 5);

    const img = pickBestImageUrl(wwdBlock?.image?.url);

    const lines = wwdBlock ? extractTextFromBlock(wwdBlock) : [];
    const parsedItems = lines.length ? buildWhatWeDoItems(lines) : [];

    return {
      imageUrl: img,
      items: parsedItems.length ? parsedItems : DEFAULT_ITEMS,
    };
  }, [apiData]);

  // ✅ keep imgSrc in sync with API URL
  useEffect(() => {
    setImgSrc(imageUrl || "");
  }, [imageUrl]);

  return (
    <section className="h-full bg-white flex flex-col md:flex-row py-10 px-6 md:px-14 overflow-hidden">
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="w-full max-w-[500px] aspect-square rounded-[20px] relative overflow-hidden">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt="What We Do"
              fill
              className="object-cover rounded-[20px]"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => {
                setImgSrc(
                  (WhatWeDoImg as { src: string }).src || "/images/wwd.jpg"
                );
              }}
            />
          ) : (
            <Image
              src={WhatWeDoImg}
              alt="What We Do"
              fill
              className="object-cover rounded-[20px]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </div>
      </motion.div>

      <motion.div
        className="w-full md:w-1/1 mt-8 md:mt-0"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="px-5">
          <h2 className="text-[#0e372d] font-bold text-[25px] md:text-[35px]">
            What We Do
          </h2>

          {items.map((it, idx) => (
            <div key={idx} className="mt-6">
              <h3 className="font-semibold text-[#0e372d] text-lg">
                {it.title}
              </h3>
              <p className="text-gray-600 mt-2">{it.body}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

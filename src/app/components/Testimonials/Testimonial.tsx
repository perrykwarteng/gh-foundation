"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import TransformImg from "../../../../public/images/Ab3.jpg";

type HomepageResponse = {
  data?: {
    blocks?: Array<any>;
  };
};

const API_PATH =
  "/homepage?populate[blocks][on][blocks.hero-section][populate][images]=true&populate[blocks][on][blocks.info-block][populate][image]=true&populate[testimonials]=true&populate[partners][populate][logo]=true";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "";

function toAbsoluteUrl(maybeRelative?: string) {
  if (!maybeRelative) return "";
  if (maybeRelative.startsWith("http")) return maybeRelative;
  if (!BASE_API) return maybeRelative;
  return `${BASE_API}${maybeRelative}`;
}

function extractPlainTextFromRich(nodes: any[]): {
  paragraph: string;
  list: string[];
} {
  let paragraph = "";
  const list: string[] = [];

  for (const node of nodes || []) {
    if (node?.type === "paragraph") {
      const t =
        node?.children
          ?.map((c: any) => c?.text || "")
          .join("")
          ?.trim() || "";
      if (t && !paragraph) paragraph = t;
    }

    if (node?.type === "list") {
      const items = node?.children || [];
      for (const li of items) {
        if (li?.type !== "list-item") continue;
        const itemText =
          li?.children
            ?.map((c: any) => c?.text || "")
            .join("")
            ?.trim() || "";
        if (itemText) list.push(itemText);
      }
    }
  }

  return { paragraph, list };
}

export default function Transform() {
  const fallback = useMemo(
    () => ({
      heading: "Transforming Good Intentions into Good Actions",
      paragraph:
        "Golden Height Foundation empowers children with books and learning tools, supports women with vocational training, and partners with schools across Ghana. Starting with three school donations yearly, we aim to expand our impact and create sustainable change for families and communities.",
      points: [
        "Empower Children",
        "Support Women",
        "Partner for Change",
        "Create Lasting Impact",
      ],
      imageSrc: TransformImg,
      imageRemote: "",
    }),
    []
  );

  const [content, setContent] = useState(fallback);

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        const res = await fetch(`${BASE_API}${API_PATH}`, {
          cache: "no-store",
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const json = (await res.json()) as HomepageResponse;

        const blocks = json?.data?.blocks ?? [];
        const info = blocks.find(
          (b: any) => b?.__component === "blocks.info-block"
        );

        const apiHeading = info?.heading?.trim();

        const rich = Array.isArray(info?.content) ? info.content : [];
        const { paragraph, list } = extractPlainTextFromRich(rich);

        const remoteImgUrl = toAbsoluteUrl(
          info?.image?.url || info?.image?.formats?.large?.url
        );

        setContent({
          heading: apiHeading || fallback.heading,
          paragraph: paragraph || fallback.paragraph,
          points: list.length ? list.slice(0, 4) : fallback.points,
          imageSrc: fallback.imageSrc,
          imageRemote: remoteImgUrl || "",
        });
      } catch {
        setContent(fallback);
      }
    })();

    return () => ctrl.abort();
  }, [fallback]);

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
            src={content.imageRemote || content.imageSrc}
            alt="Transform Image"
            fill
            className="object-cover rounded-[20px]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            unoptimized={Boolean(content.imageRemote)}
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
          <h2 className="text-[#0e372d] font-bold text-[25px] md:text-[35px]">
            {content.heading}
          </h2>

          <p className="text-gray-500 mt-5">{content.paragraph}</p>

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
                <p className="font-semibold text-[#0e372d]">
                  {content.points[0] || "Empower Children"}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#0e372d] text-white text-sm">
                  2
                </div>
                <p className="font-semibold text-[#0e372d]">
                  {content.points[1] || "Support Women"}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#0e372d] text-white text-sm">
                  3
                </div>
                <p className="font-semibold text-[#0e372d]">
                  {content.points[2] || "Partner for Change"}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#0e372d] text-white text-sm">
                  4
                </div>
                <p className="font-semibold text-[#0e372d]">
                  {content.points[3] || "Create Lasting Impact"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

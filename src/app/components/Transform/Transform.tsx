"use client";

import Image, { type StaticImageData } from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import TransformImg from "../../../../public/images/Ab3.jpg";

/* ================= TYPES ================= */

type StrapiImage = {
  url?: string;
  formats?: {
    large?: { url?: string };
    medium?: { url?: string };
    small?: { url?: string };
    thumbnail?: { url?: string };
  };
};

type RichTextChild = { text?: string };

type ParagraphNode = {
  type: "paragraph";
  children?: RichTextChild[];
};

type ListItemNode = {
  type: "list-item";
  children?: RichTextChild[];
};

type ListNode = {
  type: "list";
  children?: ListItemNode[];
};

type RichTextNode = ParagraphNode | ListNode | { type?: string; children?: unknown };

type InfoBlock = {
  __component?: "blocks.info-block" | string;
  heading?: string;
  content?: RichTextNode[];
  image?: StrapiImage | null;
};

type HomepageResponse = {
  data?: {
    blocks?: InfoBlock[];
  };
};

type TransformContent = {
  heading: string;
  paragraph: string;
  points: string[];
  imageSrc: StaticImageData;
  imageRemote: string;
};

/* ================= CONFIG ================= */

const API_PATH =
  "/homepage?populate[blocks][on][blocks.hero-section][populate][images]=true&populate[blocks][on][blocks.info-block][populate][image]=true&populate[testimonials]=true&populate[partners][populate][logo]=true";

const BASE_API_RAW = (process.env.NEXT_PUBLIC_BASE_API || "")
  .trim()
  .replace(/\/$/, "");

/**
 * API base: used for fetch calls
 * Example env: https://api.goldenheightfoundation.org/api
 */
function joinApi(path: string) {
  if (!BASE_API_RAW) return path;

  const hasApiSuffix = BASE_API_RAW.endsWith("/api");
  const pathHasApiPrefix = path.startsWith("/api/");

  if (hasApiSuffix && pathHasApiPrefix) {
    return `${BASE_API_RAW}${path.replace("/api", "")}`;
  }
  return `${BASE_API_RAW}${path}`;
}

/**
 * Asset base: used for images/files
 * https://api.../api -> https://api...
 */
const ASSET_BASE = BASE_API_RAW.endsWith("/api")
  ? BASE_API_RAW.slice(0, -4)
  : BASE_API_RAW;

/* ================= HELPERS ================= */

function toAbsoluteUrl(maybeRelative?: string) {
  if (!maybeRelative) return "";
  if (maybeRelative.startsWith("http://") || maybeRelative.startsWith("https://"))
    return maybeRelative;

  // normalize "/api/uploads/.." to "/uploads/.."
  const normalized = maybeRelative.startsWith("/api/uploads/")
    ? maybeRelative.replace("/api", "")
    : maybeRelative;

  if (!ASSET_BASE) return normalized;

  return normalized.startsWith("/")
    ? `${ASSET_BASE}${normalized}`
    : `${ASSET_BASE}/${normalized}`;
}

function isParagraphNode(node: RichTextNode): node is ParagraphNode {
  return (node as ParagraphNode)?.type === "paragraph";
}

function isListNode(node: RichTextNode): node is ListNode {
  return (node as ListNode)?.type === "list";
}

function extractPlainTextFromRich(nodes: RichTextNode[] = []) {
  let paragraph = "";
  const list: string[] = [];

  for (const node of nodes) {
    if (isParagraphNode(node)) {
      const t = (node.children ?? [])
        .map((c: RichTextChild) => c?.text ?? "")
        .join("")
        .trim();

      if (t && !paragraph) paragraph = t;
    }

    if (isListNode(node)) {
      const items = node.children ?? [];
      for (const li of items) {
        if (li.type !== "list-item") continue;

        const itemText = (li.children ?? [])
          .map((c: RichTextChild) => c?.text ?? "")
          .join("")
          .trim();

        if (itemText) list.push(itemText);
      }
    }
  }

  return { paragraph, list };
}

/* ================= COMPONENT ================= */

export default function Transform() {
  const fallback = useMemo<TransformContent>(
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

  const [content, setContent] = useState<TransformContent>(fallback);

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        const res = await fetch(joinApi(API_PATH), {
          cache: "no-store",
          signal: ctrl.signal,
        });

        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const json = (await res.json()) as HomepageResponse;

        const blocks = json?.data?.blocks ?? [];
        const info = blocks.find((b) => b?.__component === "blocks.info-block");

        const apiHeading = info?.heading?.trim() || "";

        const rich = Array.isArray(info?.content) ? info.content : [];
        const { paragraph, list } = extractPlainTextFromRich(rich);

        const remoteImgUrl = toAbsoluteUrl(
          info?.image?.formats?.large?.url ||
            info?.image?.formats?.medium?.url ||
            info?.image?.formats?.small?.url ||
            info?.image?.formats?.thumbnail?.url ||
            info?.image?.url
        );

        setContent({
          heading: apiHeading || fallback.heading,
          paragraph: paragraph || fallback.paragraph,
          points: list.length ? list.slice(0, 4) : fallback.points,
          imageSrc: fallback.imageSrc,
          imageRemote: remoteImgUrl || "",
        });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
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
            // keep if you don't want optimization for remote
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

import Link from "next/link";
import Image from "next/image";
import Layout from "@/app/components/Layouts/AppLayout";
import { notFound } from "next/navigation";

import {
  fetchNews,
  formatDate,
  getNewsBySlugFromList,
  type StrapiImage,
} from "@/app/lib/news-content";

function getBaseApiRaw() {
  return (process.env.NEXT_PUBLIC_BASE_API || "").trim().replace(/\/$/, "");
}

function getOriginBase() {
  const base = getBaseApiRaw();
  return base.endsWith("/api") ? base.slice(0, -4) : base;
}

function strapiAssetUrl(path?: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const origin = getOriginBase();
  if (!origin) return path;

  return path.startsWith("/") ? `${origin}${path}` : `${origin}/${path}`;
}

function pickBestImageUrl(img?: StrapiImage | null) {
  if (!img) return "";
  const fmts = img.formats;

  const preferred =
    fmts?.large?.url ||
    fmts?.medium?.url ||
    fmts?.small?.url ||
    fmts?.thumbnail?.url ||
    img.url ||
    "";

  return strapiAssetUrl(preferred);
}

type RichTextChild = { text?: string };

type HeadingBlock = {
  __component?: "blocks.heading";
  id?: number;
  title?: string;
};

type ParagraphWithImageBlock = {
  __component?: "blocks.paragraph-with-image";
  id?: number;
  content?: Array<{
    type?: string;
    children?: RichTextChild[];
  }>;
  imageLandscape?: boolean;
  reversed?: boolean;
  image?: StrapiImage | null;
};

type ParagraphBlock = {
  __component?: "blocks.paragraph";
  id?: number;
  content?: Array<{ children?: RichTextChild[] }>;
};

type LinkBlock = {
  __component?: "elements.link";
  id?: number;
  text?: string | null;
  href?: string | null;
  isExternal?: boolean;
};

type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ParagraphWithImageBlock
  | LinkBlock
  | { __component?: string; id?: number };

function toText(nodes?: Array<{ children?: RichTextChild[] }>) {
  return (
    nodes
      ?.map((p) => (p?.children ?? []).map((c) => c?.text ?? "").join(""))
      .join("\n")
      .trim() ?? ""
  );
}

function RenderBlocks({ blocks }: { blocks?: unknown }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <div className="space-y-6">
      {(blocks as ContentBlock[]).map((b, idx) => {
        const type = b?.__component;

        if (type === "blocks.heading") {
          const block = b as HeadingBlock;
          if (!block?.title) return null;
          return (
            <h2
              key={block.id ?? idx}
              className="text-2xl font-semibold text-[#0e372d]"
            >
              {block.title}
            </h2>
          );
        }

        if (type === "blocks.paragraph") {
          const block = b as ParagraphBlock;
          const text = toText(block.content);
          if (!text) return null;
          return (
            <p
              key={block.id ?? idx}
              className="text-gray-700 leading-relaxed whitespace-pre-wrap"
            >
              {text}
            </p>
          );
        }

        if (type === "blocks.paragraph-with-image") {
          const block = b as ParagraphWithImageBlock;
          const text = toText(block.content as any);
          const imgSrc = pickBestImageUrl(block.image);

          return (
            <div
              key={block.id ?? idx}
              className={`flex flex-col gap-4 ${
                block.reversed ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {text && (
                <div className="md:w-1/2 text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {text}
                </div>
              )}

              {imgSrc && (
                <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={imgSrc}
                    alt={block.image?.alternativeText || "Content image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>
          );
        }

        if (type === "elements.link") {
          const block = b as LinkBlock;
          const href = (block?.href || "").trim();
          if (!href) return null;

          const text = (block?.text || "").trim() || href;

          return (
            <Link
              key={block.id ?? idx}
              href={href}
              target={block.isExternal ? "_blank" : undefined}
              rel={block.isExternal ? "noopener noreferrer" : undefined}
              className="text-[#0e372d] font-medium underline"
            >
              {text}
            </Link>
          );
        }

        return null;
      })}
    </div>
  );
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const list = await fetchNews();
  const article = getNewsBySlugFromList(list, slug);

  if (!article) {
    notFound();
  }

  const imageSrc = article.image || "/images/B1.svg";

  return (
    <Layout>
      <main className="min-h-screen bg-[#f7f7f3] py-10 px-6 md:px-14">
        <article className="max-w-3xl mx-auto">
          {/* keep/remove this block depending on your preference */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm mb-6 hover:opacity-80"
            style={{ color: "#0e372d" }}
          >
            <span>← Back</span>
          </Link>

          <h1
            className="text-3xl md:text-4xl font-bold leading-tight"
            style={{ color: "#0e372d" }}
          >
            {article.title}
          </h1>

          {article.description && (
            <p className="mt-3 text-base text-gray-700 leading-relaxed">
              {article.description}
            </p>
          )}

          <p className="mt-2 text-sm" style={{ color: "#3b4a45" }}>
            {formatDate(article.date)}
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl shadow-sm bg-white">
            <Image
              src={imageSrc}
              alt={article.title}
              className="w-full h-auto object-cover"
              loading="lazy"
              width={1200}
              height={700}
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          <div className="mt-8">
            {"rawContent" in (article as any) &&
            Array.isArray((article as any).rawContent) &&
            (article as any).rawContent.length ? (
              <RenderBlocks blocks={(article as any).rawContent} />
            ) : (
              <div className="prose prose-neutral max-w-none">
                <div style={{ whiteSpace: "pre-wrap" }}>{article.content}</div>
              </div>
            )}
          </div>
        </article>
      </main>
    </Layout>
  );
}

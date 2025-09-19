// app/(pages)/news/[slug]/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/app/components/Layouts/AppLayout";
import { BRAND, getNewsBySlug, formatDate, NEWS } from "../news-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return NEWS.map(({ slug }) => ({ slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
    return null;
  }

  return (
    <Layout>
      <main className="min-h-screen bg-[#f7f7f3] py-10 px-6 md:px-14">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm mb-6 hover:opacity-80"
            style={{ color: BRAND.DEEP }}
          >
            <span>← Back</span>
          </Link>

          <h1
            className="text-3xl md:text-4xl font-bold leading-tight"
            style={{ color: BRAND.DEEP }}
          >
            {article.title}
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#3b4a45" }}>
            {formatDate(article.date)}
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl shadow-sm bg-white">
            <Image
              src={article.image}
              alt={article.title}
              className="w-full h-auto"
              width={1200}
              height={600}
            />
          </div>

          <div className="prose prose-neutral max-w-none mt-6">
            <div style={{ whiteSpace: "pre-wrap" }}>{article.content}</div>
          </div>
        </article>
      </main>
    </Layout>
  );
}

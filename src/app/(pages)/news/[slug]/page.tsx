import React from "react";
import Link from "next/link";
import Layout from "@/app/components/Layouts/AppLayout";
import { notFound } from "next/navigation";

import {
  fetchNews,
  formatDate,
  getNewsBySlugFromList,
} from "@/app/lib/news-content";

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
    return null;
  }

  const imageSrc = article.image || "/images/B1.svg";

  return (
    <Layout>
      <main className="min-h-screen bg-[#f7f7f3] py-10 px-6 md:px-14">
        <article className="max-w-3xl mx-auto">
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

          <p className="mt-2 text-sm" style={{ color: "#3b4a45" }}>
            {formatDate(article.date)}
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl shadow-sm bg-white">
            <img
              src={imageSrc}
              alt={article.title}
              className="w-full h-auto object-cover"
              loading="lazy"
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

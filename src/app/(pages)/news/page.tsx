"use client";

import SingleBlog from "@/app/components/SingleBlog/SingleBlog";
import Layout from "@/app/components/Layouts/AppLayout";
import HeroText from "@/app/components/Hero-text/Hero-text";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  fetchNews,
  formatDate,
  NEWS_FALLBACK,
  type NewsItem,
} from "@/app/lib/news-content";

export default function News() {
  const [news, setNews] = useState<NewsItem[]>(NEWS_FALLBACK);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchNews();
      if (mounted) setNews(data);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Layout>
      <div className="py-10 px-6 md:px-14 bg-white">
        <HeroText
          title="News & Updates"
          description="Latest announcements, launches, and stories."
          breadcrumb={[{ name: "Home", href: "/" }, { name: "Our News" }]}
        />
      </div>

      <main className="min-h-screen bg-[#f7f7f3] py-10 px-6 md:px-14">
        <section className="max-w-7xl mx-auto">
          <motion.div
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.15,
                  duration: 0.6,
                  ease: "easeOut",
                },
              },
            }}
          >
            {news.map((n) => (
              <motion.div
                key={n.slug}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <SingleBlog
                  image={n.image}
                  date={formatDate(n.date)}
                  title={n.title}
                  description={n.description}
                  link={`/news/${n.slug}`}
                />

                <div
                  className="mt-2 h-0.5 w-0 group-hover:w-full transition-all"
                  style={{ background: "#c4a54a" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </Layout>
  );
}

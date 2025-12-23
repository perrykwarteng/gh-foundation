export type StrapiImage = {
  url?: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
};

export type NewsApiItem = {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  publishedAt?: string;
  createdAt?: string;
  coverImage?: StrapiImage | null;
  content?: any[];
};

export type NewsApiResponse = {
  data?: NewsApiItem[];
  meta?: any;
};

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string; 
  content: string;
};

const CACHE_KEY = "news_page_cache_v1";

function getBaseApiRaw() {
  return (process.env.NEXT_PUBLIC_BASE_API || "").trim().replace(/\/$/, "");
}

function getApiBase() {
  return getBaseApiRaw();
}

function getOriginBase() {
  const base = getBaseApiRaw();
  return base.endsWith("/api") ? base.slice(0, -4) : base;
}

function joinApi(endpointPath: string) {
  const apiBase = getApiBase();
  if (!apiBase) return endpointPath;

  const hasApiSuffix = apiBase.endsWith("/api");
  const endpointHasApiPrefix = endpointPath.startsWith("/api/");

  if (hasApiSuffix && endpointHasApiPrefix) {
    return `${apiBase}${endpointPath.replace("/api", "")}`;
  }

  return `${apiBase}${endpointPath}`;
}

export function strapiAssetUrl(path?: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const origin = getOriginBase();
  if (!origin) return path;

  return path.startsWith("/") ? `${origin}${path}` : `${origin}/${path}`;
}

function safeJsonParse<T>(value: string | null): T | null {
  try {
    if (!value) return null;
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function getCached(): NewsApiResponse | null {
  if (typeof window === "undefined") return null;
  return safeJsonParse<NewsApiResponse>(localStorage.getItem(CACHE_KEY));
}

function setCached(data: NewsApiResponse) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
  }
}

function pickBestImageUrl(img?: StrapiImage | null) {
  if (!img) return "";
  const fmts = img.formats || {};
  const preferred =
    fmts.medium?.url || fmts.small?.url || fmts.large?.url || img.url || "";
  return strapiAssetUrl(preferred); 
}

function extractTextFromBlocks(blocks: any[]): string {
  if (!Array.isArray(blocks)) return "";

  const out: string[] = [];

  for (const b of blocks) {
    const type = b?.__component;

    if (type === "blocks.heading") {
      const t = (b?.title || "").trim();
      if (t) out.push(`\n### ${t}\n`);
    }

    if (type === "blocks.paragraph" || type === "blocks.paragraph-with-image") {
      const nodes = b?.content ?? [];
      const txt = nodes
        .map((p: any) =>
          (p?.children ?? [])
            .map((c: any) => (c?.text ? String(c.text) : ""))
            .join("")
        )
        .join("\n")
        .trim();
      if (txt) out.push(txt);
    }

    if (type === "elements.link") {
      const text = (b?.text || "").trim();
      const href = (b?.href || "").trim();
      if (href) out.push(text ? `${text}: ${href}` : href);
    }
  }

  return out.join("\n\n").trim();
}

export const NEWS_FALLBACK: NewsItem[] = [
  {
    slug: "donation-to-ucc-basic-school",
    title: "Donation to UCC Basic School",
    date: "2025-12-16",
    description: "Donations of learning materials",
    image: "/images/B1.svg",
    content: "Updates will appear here when the network is available.",
  },
];

export function mapNewsApiToNewsItems(json: NewsApiResponse): NewsItem[] {
  const arr = json?.data ?? [];

  return arr
    .filter((n) => n?.slug && n?.title)
    .map((n) => {
      const slug = String(n.slug);
      const title = String(n.title);

      const date =
        String(n.publishedAt || n.createdAt || "").slice(0, 10) || "";

      const description = (n.description || "").trim() || "Latest update.";

      const image = pickBestImageUrl(n.coverImage) || "/images/B1.svg";

      const content = extractTextFromBlocks(n.content || []) || description;

      return { slug, title, date, description, image, content };
    });
}

export async function fetchNews(): Promise<NewsItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const endpoint =
      "/api/news-pages?populate[coverImage][populate]=*&populate[content][on][blocks.heading][populate]=*&populate[content][on][blocks.paragraph]=*&populate[content][on][blocks.paragraph-with-image][populate]=*&populate[content][on][elements.link]=*";

    const url = joinApi(endpoint);

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = (await res.json()) as NewsApiResponse;
    if (!json?.data?.length) throw new Error("Bad data");

    setCached(json);

    const mapped = mapNewsApiToNewsItems(json);
    return mapped.length ? mapped : NEWS_FALLBACK;
  } catch {
    const cached = getCached();
    if (cached?.data?.length) {
      const mapped = mapNewsApiToNewsItems(cached);
      if (mapped.length) return mapped;
    }
    return NEWS_FALLBACK;
  } finally {
    clearTimeout(timeout);
  }
}

export function getNewsBySlugFromList(list: NewsItem[], slug: string) {
  return list.find((n) => n.slug === slug) || null;
}

export function formatDate(d: string) {
  try {
    const date = new Date(d);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return d;
  }
}

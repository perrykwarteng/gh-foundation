// ✅ about-content.ts (FULL CODE — strict types + fixes ALL Strapi image URLs)

export type StrapiImage = {
  url?: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;

  // strict-safe: allow known keys + any extra
  formats?: {
    large?: { url?: string; width?: number; height?: number };
    medium?: { url?: string; width?: number; height?: number };
    small?: { url?: string; width?: number; height?: number };
    thumbnail?: { url?: string; width?: number; height?: number };
    [key: string]:
      | { url?: string; width?: number; height?: number }
      | undefined;
  };
};

type RichTextChild = { text?: string; type?: string };
type RichTextNode = { type?: string; children?: RichTextChild[] };

export type AboutContentBlock = {
  __component?: string;
  id?: number;
  reversed?: boolean;
  imageLandscape?: boolean;
  image?: StrapiImage | null;
  content?: RichTextNode[];
};

export type AboutApiResponse = {
  data?: {
    title?: string;
    description?: string;
    content?: AboutContentBlock[];
  };
};

const CACHE_KEY = "about_page_cache_v1";

/* ===================== BASE HELPERS ===================== */

function getBaseApiRaw() {
  return (process.env.NEXT_PUBLIC_BASE_API || "").trim().replace(/\/$/, "");
}

/**
 * ✅ API base for fetch endpoints
 * Example env: https://api.goldenheightfoundation.org/api
 */
function getApiBase() {
  return getBaseApiRaw();
}

/**
 * ✅ Origin base for assets (remove /api)
 * https://api.goldenheightfoundation.org/api -> https://api.goldenheightfoundation.org
 */
function getOriginBase() {
  const base = getBaseApiRaw();
  return base.endsWith("/api") ? base.slice(0, -4) : base;
}

/**
 * ✅ Join API endpoint safely (avoids /api/api)
 */
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

/**
 * ✅ Use this for IMAGES/UPLOADS
 * - keeps absolute URL unchanged
 * - normalizes /api/uploads -> /uploads
 * - prefixes with ORIGIN (NOT /api)
 */
export function strapiUrl(path?: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const normalized = path.startsWith("/api/uploads/")
    ? path.replace("/api", "")
    : path;

  const origin = getOriginBase();
  if (!origin) return normalized;

  return normalized.startsWith("/")
    ? `${origin}${normalized}`
    : `${origin}/${normalized}`;
}

/* ===================== CACHE HELPERS ===================== */

function safeJsonParse<T>(value: string | null): T | null {
  try {
    if (!value) return null;
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function getCachedAbout(): AboutApiResponse | null {
  if (typeof window === "undefined") return null;
  return safeJsonParse<AboutApiResponse>(localStorage.getItem(CACHE_KEY));
}

export function setCachedAbout(data: AboutApiResponse): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // keep silent
  }
}

/* ===================== FALLBACK ===================== */

export const ABOUT_FALLBACK: AboutApiResponse = {
  data: {
    title: "About Us",
    description:
      "Learn more about our mission, vision, and the values that drive us to transform lives through love and generosity.",
    content: [
      {
        __component: "blocks.paragraph-with-image",
        id: 4,
        reversed: false,
        imageLandscape: true,
        image: { url: "/uploads/Ab4_ae72ae3e1d.jpg" },
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Golden Height Foundation (GHF) was born out of a lifelong passion for helping others...",
              },
            ],
          },
        ],
      },
    ],
  },
};

/* ===================== FETCH ===================== */

export async function fetchAboutContent(): Promise<AboutApiResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const endpoint =
      "/about?populate[content][on][blocks.paragraph-with-image][populate]=image";

    const url = joinApi(endpoint);

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = (await res.json()) as AboutApiResponse;
    if (!json?.data?.content?.length) throw new Error("Bad data");

    setCachedAbout(json);
    return json;
  } catch {
    const cached = getCachedAbout();
    if (cached?.data?.content?.length) return cached;

    return ABOUT_FALLBACK;
  } finally {
    clearTimeout(timeout);
  }
}

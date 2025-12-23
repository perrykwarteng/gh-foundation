export type StrapiImage = {
  url?: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
};

export type AboutApiResponse = {
  data?: {
    title?: string;
    description?: string;
    content?: Array<{
      __component?: string;
      id?: number;
      reversed?: boolean;
      imageLandscape?: boolean;
      image?: StrapiImage;
      content?: Array<{
        type?: string;
        children?: Array<{ text?: string; type?: string }>;
      }>;
    }>;
  };
};

const CACHE_KEY = "about_page_cache_v1";

function getBaseApi() {
  return (process.env.NEXT_PUBLIC_BASE_API || "").trim().replace(/\/$/, "");
}

export function strapiUrl(path?: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const base = getBaseApi();
  if (!base) return path;

  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

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

export function setCachedAbout(data: AboutApiResponse) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {}
}

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

export async function fetchAboutContent(): Promise<AboutApiResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const endpoint =
      "/about?populate[content][on][blocks.paragraph-with-image][populate]=image";

    const base = getBaseApi();
    const url = base ? `${base}${endpoint}` : endpoint;

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

export type GalleryApiImage = {
  url?: string;
  alternativeText?: string | null;
  caption?: string | null;
  formats?: Record<string, { url: string; width: number; height: number }>;
};

export type GalleryApiItem = {
  id?: number;
  caption?: string | null;
  altText?: string | null;
  image?: GalleryApiImage | null;

  videoUrl?: string | null;
  posterUrl?: string | null;
};

export type GalleryApiResponse = {
  data?: Array<{
    id?: number;
    gallery?: GalleryApiItem[];
    media?: any[];
  }>;
};

export type GalleryItem = {
  id: number | string;
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
};

const CACHE_KEY = "gallery_page_cache_v1";

function getBaseApi() {
  return (process.env.NEXT_PUBLIC_BASE_API || "").trim().replace(/\/$/, "");
}

export function apiUrl(path?: string) {
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

export function getCachedGallery(): GalleryApiResponse | null {
  if (typeof window === "undefined") return null;
  return safeJsonParse<GalleryApiResponse>(localStorage.getItem(CACHE_KEY));
}

export function setCachedGallery(data: GalleryApiResponse) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
  }
}


export const GALLERY_FALLBACK: GalleryItem[] = [
  { id: 1, type: "image", src: "/images/g1.svg", alt: "Gallery image" },
  { id: 2, type: "image", src: "/images/g2.svg", alt: "Gallery image" },
  { id: 3, type: "image", src: "/images/g3.svg", alt: "Gallery image" },
  { id: 4, type: "image", src: "/images/g4.svg", alt: "Gallery image" },
  { id: 5, type: "image", src: "/images/g5.svg", alt: "Gallery image" },
  { id: 6, type: "image", src: "/images/g6.svg", alt: "Gallery image" },
  {
    id: "v1",
    type: "video",
    src: "https://cdn.coverr.co/videos/coverr-city-sunset-3315/1080p.mp4",
    poster:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    alt: "City sunset video",
  },
];

function pickBestImageUrl(img?: GalleryApiImage | null) {
  if (!img) return "";
  const fmts = img.formats || {};
  const preferred =
    fmts.medium?.url || fmts.small?.url || fmts.large?.url || img.url || "";
  return apiUrl(preferred);
}

export function mapGalleryApiToItems(json: GalleryApiResponse): GalleryItem[] {
  const page = json?.data?.[0];
  const gallery = page?.gallery || [];

  const items: GalleryItem[] = [];

  for (const g of gallery) {
    const src = pickBestImageUrl(g?.image || null);
    if (!src) continue;

    items.push({
      id: g?.id ?? src,
      type: "image",
      src,
      alt: g?.altText || g?.caption || "Gallery image",
    });
  }

  return items;
}

export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const endpoint =
      "/gallery-pages?populate[gallery][populate]=*&populate[media][populate]=*";

    const base = getBaseApi();
    const url = base ? `${base}${endpoint}` : endpoint;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = (await res.json()) as GalleryApiResponse;

    if (!json?.data?.length) throw new Error("Bad data");

    setCachedGallery(json);

    const mapped = mapGalleryApiToItems(json);
    return mapped.length ? mapped : GALLERY_FALLBACK;
  } catch {
    const cached = getCachedGallery();
    if (cached?.data?.length) {
      const mapped = mapGalleryApiToItems(cached);
      if (mapped.length) return mapped;
    }

    return GALLERY_FALLBACK;
  } finally {
    clearTimeout(timeout);
  }
}
